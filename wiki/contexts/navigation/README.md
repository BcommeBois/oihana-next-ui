# `navigation` — the menu, the links and the way back

How an application describes its menu, how the active link is found, how a navigation that
takes time says so, how a URL holds a page's state, and how « back » returns a reader to where
they were.

```jsx
import NavigationProvider     from 'oihana-next-ui/contexts/navigation/provider'
import BusyNavigationProvider from 'oihana-next-ui/contexts/busyNavigation/provider'
import PreviousPathProvider   from 'oihana-next-ui/contexts/previousPath/provider'
import Link                   from 'oihana-next-ui/components/links/Link'
import BackLink               from 'oihana-next-ui/components/links/BackLink'
import useShallowParam        from 'oihana-next-ui/hooks/useShallowParam'
```

`NavigationProvider` sits in the stack `ApplicationProviders` mounts — see
[setting up an application](../../display/application/README.md). The other two are mounted
**where they are needed**, below.

## Describing the menu

The menu is data : an array of items, read by the sidebar and the navbar.

```js
import { COLLAPSE , LINK } from 'oihana-next-ui/contexts/navigation/types'

const navigation =
[
    { id : 'home' , type : LINK , Icon : HomeIcon , path : '/home' } ,
    {
        id    : 'sales' ,
        type  : COLLAPSE ,
        Icon  : SalesIcon ,
        items :
        [
            { id : 'customers' , type : LINK , Icon : CustomersIcon , path : '/sales/customers' } ,
            { id : 'pipeline'  , type : LINK , Icon : PipelineIcon  , path : '/sales/pipeline' } ,
        ] ,
    } ,
] ;
```

- **Four types** : `LINK`, `COLLAPSE` (a group, nested as deep as needed), `TITLE` and `DIVIDER`.
- 🔑 **The labels are not in the tree.** Each item is named by its `id`, read from the
  `navigation` bundle of the translations — `{ fr : { customers : 'Clients' } , en : … }` — so
  the menu follows the language without being rebuilt. See the
  [translations guide](../locale/README.md).
- The tree carries components (the icons) : import it on the client side, never pass it down
  from a Server Component.

### Which groups are open

`navigationMode` on `ApplicationProviders` (`defaultMode` on the provider) decides how a group
starts : `open`, `closed`, or `auto` — open when it holds the current page. An item's own
`defaultOpen` wins. What the reader opens and closes is remembered under
`navigationStorageKey` — name it per application, and version it (`'my-app:nav:v1'`) so a new
shape of menu can start afresh.

### The active link

🔑 **One link is active : the longest path that matches the current route.** A nested
destination, `/sales/customers/42`, lights `/sales/customers`, and does not light `/sales` as
well. The groups that hold it open in `auto` mode.

## Links

`components/links/Link` wraps `next/link` with what a menu needs :

- `activeClassName` and `exact` — `exact={ false }` lights a section link from any page below
  it ; the root is always judged exactly, or it would light everywhere. An active link carries
  `aria-current`, and a click on the page you are on does nothing.
- `LinkButton` and `LinkCard` — a link dressed as a button or a card.
- `LinkTabs` — tabs that are links, one route per tab.

## A navigation that takes time

A server page that fetches its data shows nothing new until the answer comes. Two tools say
« it is coming » :

- **`LinkPending`**, inside a link : trades its icon for a spinner from the click to the first
  render of the destination. `navigationPendingIndicator` on `ApplicationProviders` puts it on
  every link of the menu. Off by default — on a route with a `loading.js`, the spinner lives
  milliseconds.
- **`BusyNavigationProvider`**, around a screen whose controls change the URL — pagination,
  sort, period, filters, search :

```jsx
<BusyNavigationProvider>
    <Toolbar />              {/* its controls call navigate( href ) or run( work ) */}
    <BusySurface>
        <Table rows={ rows } />
    </BusySurface>
    <Pagination />
</BusyNavigationProvider>
```

🔑 **One transition for the whole screen.** When each control owns a private transition, only
that control greys out, while the figures underneath stay on screen, unchanged and wrong. Pushed
through one, every control feeds a single `busy`, and `BusySurface` says the data is being
replaced. `busy` is held for a short floor (400 ms) : a fast answer would otherwise flicker by
unseen, which teaches the reader that nothing happened.

- `navigate( href )` pushes without scrolling — a list is replaced where it stands.
- `run( work )` is the same transition for what is not a push : a Server Action and a
  `router.refresh()`. ⚠️ What follows an `await` is no longer inside the transition : wrap a
  router call made after one in `run` again.

The provider is a Client Component, but its children need not be : the table can stay on the
server.

## State in the URL

What a reader can share or come back to belongs in the address : the page of a list, its sort,
its filters. Two ways to write it :

- **`router.push`** (or `navigate`) — for what the **server** reads : the page re-renders and
  fetches.
- **`useShallowParam( name , initial )`** — for what only the **browser** uses : a sort of rows
  already loaded, a tab. It rewrites the address with `history.replaceState` : the link stays
  copyable, the server is asked nothing. 🚨 Never on a parameter the server reads : the screen
  would show one thing while the URL claims another.

The shell sends the page to the top when the route changes — except for the query parameters
named in `ui.dashboard.scrollReset.ignore`, which a page changes in place.

## The way back

`PreviousPathProvider` remembers the page that was left — **the whole URL, query included**.
That is the point : a list keeps its page and its criteria in the query, and the pathname alone
would send a reader back to the first page of a list they had walked deep into.

```jsx
<BackLink href="/sales/customers" label="Customers" smart />
```

- `href` alone — a fixed destination ;
- **`smart`** — the same, unless the page that was left *is* that page : then its own URL is used,
  query included, and the list comes back as it was read ;
- `history` — pops the browser history. The weakest of the three : the history and « the page
  rendered before » part company as soon as an entry is replaced, and the link then shows one
  destination on hover and goes to another.

🚨 **Mount the provider high enough to survive the moves it remembers** — a layout, never a page :
mounted inside a page, it is unmounted by the very navigation it is there to see. The demo app
mounts it in the layout of a route group shared by all its sections, so a move from one section
to another keeps it.

## Seeing it run

The demo app's own menu is a full example — [`src/@configs/navigation.js`](../../../src/@configs/navigation.js)
and the `navigation` bundle in [`src/@locale/navigation.js`](../../../src/@locale/navigation.js).
`/components/links` shows active links and `BackLink smart`, `/components/menus` the collapse
persistence, `/components/pagination` the URL-driven pagination, and `/components/inputs?filter=search`
a search under a `BusyNavigationProvider`.
