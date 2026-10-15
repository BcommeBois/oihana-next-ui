# Offline : the outbox

Writing without a network. A screen in a warehouse, a van or a customer's cellar records what
was done — a receipt, a count, a signed report — and must not lose it because the network is
gone at that moment. The outbox keeps each action on the device, sends it when the server can
be reached, in order, and never twice.

```jsx
import OutboxProvider from 'oihana-next-ui/contexts/outbox/provider'
import useOutbox      from 'oihana-next-ui/contexts/outbox/useOutbox'
import OutboxBanner   from 'oihana-next-ui/display/OutboxBanner'
import OutboxList     from 'oihana-next-ui/display/OutboxList'
import httpTransport  from 'oihana-next-ui/offline/outbox/httpTransport'
```

The lab mounts one over all its pages ([`src/demo/offline/LabOutbox.jsx`](../../src/demo/offline/LabOutbox.jsx))
and shows it on a test bench, Modules › Offline › Outbox, against a test route that behaves like
an idempotent API ([`src/app/api/outbox/[kind]/route.js`](../../src/app/api/outbox/[kind]/route.js)).

## What it is, and what it is not

**A queue of intentions**, not a synchronised database. Each item says « do this » — create this
receipt, add this line — and the server stays the one that decides : prices, stock, rules. Nothing
is merged on the device, nothing is replicated back. That is what lets it work with a plain REST
API, and with an application that never calls its API from the browser.

It is **sent in the foreground** : at mount, when the server answers again, when the page comes
back to the front, when a waiting item comes due. Background Sync exists in Chrome only — never
on an iPhone — so the queue does not count on it.

## Two layers

| Layer | Where | What |
|---|---|---|
| The core | `oihana-next-ui/offline/*` | the queue, its rules, IndexedDB (`idb`), the sender, `httpTransport` — **no React** |
| The screen | `contexts/outbox`, `display/Outbox*` | `OutboxProvider`, `useOutbox`, the banner, the list |

The core imports nothing but `idb` and itself, and a test keeps it so : an application without
React can use `createOutbox` directly, and the core can leave for a package of its own the day
something else needs it.

## Setting it up

```jsx
'use client' ;

<OutboxProvider
    name     = "wms"                  // the IndexedDB database : one per application
    scope    = { user.id }            // the account : another account's items are kept, never sent
    send     = { send }               // how an item reaches the server — below
    onSettle = { item => item.status === 'rejected' && toast( describe( item ) , 'error' ) }
>
    <App />
</OutboxProvider>
```

Mount it **once, high** — under `ApplicationProviders`, above the pages — so an action queued on
one page keeps waiting, and keeps showing, on the next. `send`, `onSettle` and `onConflict` are
read at each use : inline functions are fine. `options` (backoff, attempts, limits) are read
once.

## The transport : the one thing that differs

The queue does not know how to reach a server. `send( item , refs , { files , signal } )` does,
and it is the application's.

**An API called from the browser** — `httpTransport` :

```js
const send = httpTransport({
    base    : 'https://api.example.com' ,
    headers : () => ( { Authorization : `Bearer ${ getToken() }` } ) ,   // read at each send : a token changes
}) ;

await enqueue( { kind : 'receipts' , target : order , payload : { body : receipt } } ) ;
// → POST https://api.example.com/receipts, Idempotency-Key: <item id>
```

The payload describes the request : `{ url , method , body , headers }`, `url` defaulting to the
kind. With files, the request becomes a multipart form — the body in a `payload` field, each file
under its own.

**An application that never calls its API from the browser** — Server Actions. Their ids change
with every build, so the queue never stores one : it stores a business `kind`, and the transport
finds the action when it sends.

```js
import { createQuote , addQuoteLine } from './actions' ;

const actions = { quote : createQuote , line : addQuoteLine } ;

const send = ( item , refs ) => actions[ item.kind ]( item.id , item.payload , refs ) ;
```

The action receives the item's id as its idempotency key, and throws `{ status , code , message }`
when it refuses. Files are better sent by a Route Handler — `httpTransport` for those kinds — than
through a Server Action's body limit.

## Queuing

```js
const { enqueue } = useOutbox() ;

const quote = await enqueue( { kind : 'quote' , payload : { body : { customer } } } ) ;

for ( const line of lines )
{
    await enqueue( { kind : 'line' , dependsOn : [ quote.id ] , payload : { body : line } } ) ;
}
```

- **`dependsOn`** — the lines wait for the quote, then receive its result in `refs` : the server's
  number, unknown when the lines were queued. Putting it where it belongs is the transport's job
  (`httpTransport`'s `prepare( item , refs )`, or the action's third argument) : only the
  application knows where it goes. If the quote is refused, its lines are **blocked** ; retried,
  they follow.
- **`target`** — a second pending item of the same kind and target **replaces** the first : the
  corrected receipt leaves, not both. One already on its way cannot be recalled : the new one
  waits for it (`after`), and leaves whatever its outcome.
- **`files`** — `{ name , type , field , bytes }`, bytes as a `Blob`, a typed array or an
  `ArrayBuffer`. They are stored as `ArrayBuffer`s beside the item — WebKit may invalidate a
  stored `Blob`. Beyond a soft limit (200 MB) files are refused with a `quota` error ; JSON never
  is.

Never queue a function, a class instance or a Server Action itself : an item is data.

## What the server has to do

1. 🔑 **Honour `Idempotency-Key`.** The id is born on the device and goes out with every attempt.
   A connection cut after the server created the record but before the answer arrived is
   retried : the server must answer that replay with what it answered the first time — never a
   second record. Without it, every bad moment on the field makes a duplicate.
2. **Say why it refuses**, in a JSON body : `{ code , message }` (or `{ error : { code , message } }`).
   The code reaches the list and the banner, where the application gives it words (`reasons`).
3. **409 or 412** when the target changed meanwhile (the document left its draft state, it was
   edited elsewhere) ; **422** when the action itself is wrong.

## What happens to a failure

| The server says | The item | Counted as an attempt |
|---|---|---|
| nothing (no network) | waits for the network ; the round stops | no |
| 401 | waits for the application to sign in again ; the round stops | no |
| 408, 425, 429, 5xx, a timeout | tried again later : 30 s, doubling, up to 15 min | yes — 10, then refused as `exhausted` |
| 409, 412 | `conflict` : `onConflict( item , error )` may answer `retry`, `reject` or `done` | yes |
| any other 4xx | `rejected`, with the server's code : a person decides | yes |

Refused, conflicting and blocked items stay until someone retries or abandons them. Sent items
keep their result a day — what `Open` hands to the application — then go.

## Showing it

- **`OutboxBanner`** — one sentence : nothing while the queue is empty, the actions waiting
  (offline : « sent when the network is back »), the first refusal and its reason with a button
  to the list. Its props take over from the provider — for a mock-up, or a queue kept elsewhere.
- **`OutboxList`** — the screen « waiting to be sent » : each action named by its kind
  (`labels`, `describe`), its status, why it did not leave ; **Retry**, **Abandon** (pressed
  twice, no dialog), **Open**. Another account's actions are listed apart, untouchable.
- **A counter on an icon** — `useOutbox().counts` in an `Indicator`.
- **A toast when an action is refused** — the application's, from `onSettle`. The library's
  components never toast : the banner is a status, read politely.

## Accounts and signing out

`scope` is the signed-in account. Another account's items are kept and never sent — a shared
terminal does not send Paul's work under Julie's name — and they leave when their account signs
in again. On a voluntary sign-out, `clear()` the queue only when nothing waits in it ; otherwise
the application says what will be lost, or keeps it for the next sign-in.

## Testing

The rules are pure and run on `memoryRepository()` ; the IndexedDB repository runs on
`fake-indexeddb` under Bun ([`tests/offline/`](../../tests/offline)). In a browser : developer
tools → Application → IndexedDB shows the queue, and Network → Offline cuts it for real.

## What stays with the application

The `kind → action` registry and where a dependency's result goes ; the words for its kinds and
its API's codes ; when to toast ; the « waiting to be sent » screen around `OutboxList` ; what to
do on sign-out ; and the server's idempotency.

Reading offline — keeping what was seen to show it without a network — and a page served when a
navigation fails are not part of this module.
