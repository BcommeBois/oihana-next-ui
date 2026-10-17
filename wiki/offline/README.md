# Offline

A screen in a warehouse, a van or a customer's cellar records what was done — a receipt, a count,
a signed report — and must not lose it because the network is gone at that moment ; it must
still show the customer it is standing in front of, and still open when the page was never
visited. This guide is the whole of it : what the library does, piece by piece, and what stays
with the application.

## Everything offline, at a glance

| Need | Pieces | Section |
|---|---|---|
| **Writing** without a network | the outbox : `OutboxProvider`, `useOutbox`, `OutboxBanner`, `OutboxList` | [below](#what-it-is-and-what-it-is-not) |
| **Reading** without a network | the reserve : `OfflineStoreProvider`, `useOfflineRecord`, `useOfflineQuery` | [Reading offline](#reading-offline--the-reserve) |
| **Searching** without a network | `query`, `describe` on the reserve | [Searching offline](#searching-offline) |
| **A page never visited** | the service worker's shell, `pwa.offlineShell` | [When a navigation fails](#when-a-navigation-fails--the-shell) |
| **Knowing the network is there** | `useOnline`, `ConnectionStatus` — the server asked, not the Wi-Fi | [`hooks/useOnline`](../../src/hooks/useOnline.js) |
| **Scanning, reading a PDF** | the engines served by the application and kept by the worker | [barcodes](../components/barcodes/README.md), [documents](../components/documents/README.md) |
| **A screen that stays on** | `useWakeLock`, `WakeLockToggle` | [`hooks/useWakeLock`](../../src/hooks/useWakeLock.js) |

Small preferences — theme, language, sound — are **not** kept here : they live in a cookie and
`localStorage`, read before the first frame and by the server. IndexedDB is for volume : the
queue, its files, the reserve.

## The outbox and the reserve

Writing without a network, and reading without one. The outbox keeps each action on the device,
sends it when the server can be reached, in order, and never twice. The reserve keeps what was
seen or prepared, to read it and search it when the network is gone.

```jsx
import OutboxProvider from 'oihana-next-ui/contexts/outbox/provider'
import useOutbox      from 'oihana-next-ui/contexts/outbox/useOutbox'
import OutboxBanner   from 'oihana-next-ui/display/OutboxBanner'
import OutboxList     from 'oihana-next-ui/display/OutboxList'
import httpTransport  from 'oihana-next-ui/offline/outbox/httpTransport'

import OfflineStoreProvider from 'oihana-next-ui/contexts/offlineStore/provider'
import useOfflineStore      from 'oihana-next-ui/contexts/offlineStore/useOfflineStore'
import useOfflineRecord     from 'oihana-next-ui/hooks/useOfflineRecord'
import useOfflineQuery      from 'oihana-next-ui/hooks/useOfflineQuery'
```

The lab mounts both over all its pages ([`src/demo/offline/LabOutbox.jsx`](../../src/demo/offline/LabOutbox.jsx))
and shows them under Modules › Offline : the outbox on a test bench, against a test route that
behaves like an idempotent API ([`src/app/api/outbox/[kind]/route.js`](../../src/app/api/outbox/[kind]/route.js)) ;
the reserve on two hundred parcels of wood, searched on the server online and on the device
offline. Its shell is [`/offline`](../../src/demo/offline/OfflineShellDemo.jsx).

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
- **`uses`** — `[ [ kind , key ] ]`, the reserve records the action needs : the customer a quote
  is for. The reserve keeps them while the action waits, whatever their age.
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
2. **Say why it refuses**, in a JSON body — or nested in its `error` member. `httpTransport` reads :
   - **the reason** — a stable code, `snake_case` — in `reason`, else in `code` when it is a
     string. A numeric `code` is the HTTP status copied, not a reason : it is ignored ;
   - **the message** in `details`, else `detail` (RFC 9457 Problem Details), else `message`, else
     `title`, else the status text.

   ```json
   {
       "status"  : "error" ,
       "code"    : 422 ,
       "message" : "Unprocessable Entity" ,
       "details" : "This unit was already shipped." ,
       "reason"  : "unit_already_consumed"
   }
   ```

   gives `lastError : { status : 422 , code : 'unit_already_consumed' , message : 'This unit was
   already shipped.' }` ; `{ code : 'unit_already_consumed' , message : '…' }` gives the same.
   The reason reaches the list and the banner, where the application gives it words (`reasons`).
   Another shape : pass your own `readError( response )` to `httpTransport`.
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

The status decides what happens ; the reason only gives it words — shown on a refused item, and
on one waiting for its next attempt :

```jsx
const reasons =
{
    idempotency_key_reused : 'Already sent with other content : queue it again' ,   // 422, refused
    idempotency_key_in_use : 'The server is still handling the first attempt' ,     // 429, retried
    rate_limited           : 'The server asks to slow down' ,                       // 429, retried
    unit_already_consumed  : 'This unit was already shipped' ,                      // 422, refused
} ;

<OutboxList reasons={ reasons } />
```

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

## Reading offline : the reserve

The outbox writes ; the reserve reads. It keeps records on the device — what a page saw, what a
morning prepared — and searches them when the server cannot.

```jsx
<OutboxProvider name="wms" send={ send }>
    <OfflineStoreProvider name="wms">        {/* the same database */}
        <App />
    </OfflineStoreProvider>
</OutboxProvider>
```

```js
const { remember , rememberMany } = useOfflineStore() ;

await remember( 'parcel' , parcel.id , parcel ) ;                                   // seen : kept 7 days
await rememberMany( 'parcel' , day.map( value => ( { key : value.id , value } ) ) ,
                    { pinned : true } ) ;                                          // prepared : kept until unpinned

const { value , seenAt , expired , found } = useOfflineRecord( 'parcel' , id ) ;
```

- **What to keep is the application's** : the records a page shows, the customers of the day's
  appointments, the catalogue. The library ages them and sweeps them — the expired first, then
  the oldest over a soft limit (100 MB) — never a pinned record, never one a waiting action
  `uses`.
- **An expired record is still read.** Old data beats none ; the screen says when it was seen,
  and reads the server again when it can. `token` is the application's own mark of freshness (a
  harvest token, a version), kept and handed back untouched.
- **`ttl`** and **`softLimit`** are options of the provider : an application may read them from
  its own configuration.

### Searching offline

The server's query language does not come to the device : the reserve has the records the
device kept, not the database. The search offline is **simpler, and says so**.

```js
describe( 'parcel' , { text : [ 'number' , 'product' , 'essence' , 'location' ] , where : [ 'essence' , 'state' ] , sort : 'number' } ) ;

const { items , total } = useOfflineQuery( 'parcel' ,
    { text , where : { state : [ 'intact' , 'opened' ] , volume : { gte : 1 } } , sort : '-receivedAt' , limit : 20 } ,
    { enabled : !online } ) ;
```

- `text` : every word found in the declared fields, accents and case ignored — « chene » finds
  « Chêne ».
- `where` : a value, a list of values, or operators (`gt`, `gte`, `lt`, `lte`, `ne`, `in`), by
  dotted path (`address.city`).
- `sort` : one key or several, texts in the order of the language (« A-2 » before « A-10 »).

**One request, two sources.** The screen builds one description of its search ; online the
application sends it to its API, offline to `useOfflineQuery`. And it **says which** : « Offline
search — among your 240 customers prepared », so that « no result » never reads as « does not
exist ». A filter only the server can answer (real-time stock, an aggregate) is greyed out
offline, with a word of why — not hidden.

## When a navigation fails : the shell

The outbox and the reserve live in pages ; offline, a page has to open first. With `pwa.offline`
the service worker keeps each page visited, Next's scripts and styles (their names change with
every build, so a kept copy never goes stale) and the application's images and fonts, and opens
them without a network.

A page reached **by a link** counts as visited too. `next/link` fetches a page's data, never its
HTML, so the worker would not see it ; `ServiceWorker` and `useServiceWorkerUpdate` post each
page shown to the worker (`useServiceWorkerPageCache`), which fetches and keeps its HTML once per
page and per version, in the background.

A page **never visited** has nothing to open : that is what the shell is for.

```json
"pwa" : { "offline" : true , "cachePrefix" : "wms" , "offlineShell" : "/offline" }
```

- **At install**, the worker keeps the shell and the scripts, styles and images its HTML names — so it
  renders and runs with no network at all. A shell that cannot be fetched (installed offline)
  does not stop the install.
- **A navigation that fails** gets the copy of the page if it was visited ; else a **redirect**
  to `/offline?from=<the page asked for>`, served from the cache ; without a shell, the home page
  if kept, else a short page the worker writes itself — never the browser's error screen.
- **A redirect, not the shell under the address asked for** : the address and the page shown
  agree, which Next's router needs to hydrate.
- **`next/link`** asks for data (`?_rsc=`), not a page : when that fails, Next falls back to a
  full navigation, which reaches the worker.
- **Every release starts afresh** : the worker's cache is named after the version, and the old
  ones are deleted when the new worker takes over. The reserve and the queue live in IndexedDB,
  which the worker never touches.

The shell is a page of the application : what it shows is yours. A useful one says the page asked
for needs the network (with **Retry**), lists what waits to be sent (`OutboxList`), and points to
what can still be read (the reserve). Read `?from=` as a path of the application only — never
send the reader to an address taken from the URL.

The worker is registered in production builds only : try it on `next build && next start`, then
developer tools → Network → Offline.
