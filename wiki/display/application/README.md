# Setting up an application

What a Next application does once, at its root, to use the library : the context stack, the
theme painted before the first frame, the language agreed between server and client, the keys
kept on the device — and the chrome, mounted where it belongs.

```jsx
import ApplicationProviders from 'oihana-next-ui/display/ApplicationProviders'
import Dashboard            from 'oihana-next-ui/display/ui/Dashboard'
import getThemeScript       from 'oihana-next-ui/contexts/themes/getThemeScript'
```

The demo app of this repository is set up exactly this way : [`src/app/layout.jsx`](../../../src/app/layout.jsx)
and [`src/display/Application.jsx`](../../../src/display/Application.jsx) are the reference.

## Three pieces, three jobs

| Piece | What it is | Where it goes |
|---|---|---|
| `ApplicationProviders` | the contexts every route needs — and **nothing visible** | the root layout |
| `Dashboard` | the chrome : sidebar drawer, navbar | the layouts that show it — often not the root |
| `Application` | this package's own root : the two above, fed with **its own** configuration | the demo app only |

🔑 **Keep the contracts apart from the chrome.** A login, an invitation, an activation screen
read the same configuration, language and theme as the rest, but must not mount a dashboard.
Put `ApplicationProviders` at the root, and `Dashboard` in the layout of the authenticated
routes.

## The root layout

```jsx
// app/layout.jsx — a Server Component
import { cookies } from 'next/headers'

import getThemeScript from 'oihana-next-ui/contexts/themes/getThemeScript'
import config         from '@/configs'
import Providers      from './Providers'

export default async function RootLayout ( { children } )
{
    const initialLang = ( await cookies() ).get( 'lang' )?.value ?? config.defaultLang ;

    return (
        <html lang={ initialLang } suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={ { __html : getThemeScript( { light : config.light , dark : config.dark } ) } } />
            </head>
            <body suppressHydrationWarning>
                <Providers initialLang={ initialLang }>{ children }</Providers>
            </body>
        </html>
    ) ;
}
```

```jsx
// app/Providers.jsx
'use client' ;

import ApplicationProviders from 'oihana-next-ui/display/ApplicationProviders'

import config     from '@/configs'
import languages  from '@/configs/languages'
import locale     from '@/locale'
import navigation from '@/configs/navigation'

const Providers = ( { children , initialLang } ) => (
    <ApplicationProviders
        config               = { config }
        feedbackStorageKey   = "my-app:feedback"
        initialLang          = { initialLang }
        languages            = { languages }
        locale               = { locale }
        navigation           = { navigation }
        navigationStorageKey = "my-app:nav:v1"
    >
        { children }
    </ApplicationProviders>
) ;

export default Providers ;
```

🚨 **The configuration is imported on the client side, never passed down from the server.** A
navigation tree carries its icons — components, that is functions — and Next refuses to hand a
function from a Server Component to a Client Component.
So the server layout passes what it alone knows — the language read from the cookie — and a
small client component imports the rest.

🚨 **Nothing is guessed.** Every setting arrives as a prop. One left out leaves its provider on its
own defaults — never on this package's lab configuration, which would give your application the
wrong navigation and the wrong labels without a word.

## The stack, in order

The order is load-bearing : the configuration is read by everything, the language decides which
locale is resolved, the theme paints before anything is measured, and the leaves are what a page
talks to.

| Provider | What a component reads from it |
|---|---|
| `ConfigProvider` | the configuration — `useConfig( 'ui.sidebar' )` reads a dotted path |
| `LangProvider` | the current language and the list — `useLang` |
| `LocaleProvider` | the translations — `useI18n( 'path.to.bundle' )` |
| `ThemeProvider` | light or dark — `useThemes()` gives `{ isDark , toggleIsDark }` |
| `ApplicationProvider` | the shell's state : navbar and sidebar shown, the root's classes |
| `FullScreenProvider` | `useFullscreen()`, derived from the document, so Escape reports itself. **`fullscreenLockEscape`** keeps the Escape key for the page in full screen (Keyboard Lock API, Chrome and Edge) : a dialog or a viewer closes on Escape, full screen is left through the button or by holding Escape — off by default, and `escapeLocked` says whether it took |
| `NavigationProvider` | the menu tree, its open groups, its mode |
| `LoadingProvider` | one global `loading` flag — `useLoading` |
| `ToastProvider` | `useToast()` — `toast( message , level )` |
| `FeedbackProvider` | the device's sound and vibration — see the [feedback guide](../../contexts/feedback/README.md) |
| `SelectProvider` | the selection of a list, for the lists that offer one |

Two more are mounted **where they are needed**, not here : `BusyNavigationProvider` around a list
whose filters drive the URL, and `PreviousPathProvider` in a layout that must survive the moves it
remembers — both in the [navigation guide](../../contexts/navigation/README.md).

## The first frame

**The theme is painted before React runs.** `getThemeScript( { light , dark } )` returns a tiny
inline script for `<head>` : it reads the stored choice — the `theme` key of `localStorage`, else
the system's `prefers-color-scheme` — and sets `data-theme` on `<html>` before the first paint.
Without it, a dark-theme reader gets a white flash on every load. `light` and `dark` are the
names of two daisyUI themes. The script changes attributes the server did not render : hence
`suppressHydrationWarning` on `<html>` and `<body>`.

**The language is agreed before React runs too.** `LangProvider` keeps the choice in a `lang`
cookie as well as in storage. The server reads the cookie, hands it down as `initialLang`, and
the first client render shows the same language — no flash of the default one.

**`splashScreen`** (optional) covers the first paint and fades once mounted. It lets clicks
through on its way out : a veil must not swallow the click of someone already reading.

## What is kept on the device

| Key | Kept by | Set it |
|---|---|---|
| `lang` | `LangProvider` (and its cookie) | — |
| `theme` | the theme script and `ThemeProvider` | — |
| `<navigationStorageKey>` | the menu's open groups | **per application** |
| `<feedbackStorageKey>:sound`, `:vibration`, `:volume` | `FeedbackProvider` | **per application** |
| `versionCheck.storageKey` | the version check | **per application** |

Name the keys per application : two applications served from one origin share one storage.

🚨 **A new version empties the storage.** When `config.version` changes, `ApplicationProviders`
clears `localStorage` and `sessionStorage` — a fresh start after a release — **except the keys
listed** in `config.versionCheck.keepLocal` and `keepSession` — by name, or by a prefix ending
with `*`. The default is `[ 'lang' , 'theme' ]` : the sound settings and the menu's state are lost
on every release unless you add them.

```js
versionCheck :
{
    storageKey : 'my-app-version' ,
    // A prefix ending with * keeps every key under it : a setting added later is kept too.
    keepLocal  : [ 'lang' , 'theme' , 'my-app:nav:v1' , 'my-app:feedback:*' ] ,
}
```

## The chrome

```jsx
// app/(app)/layout.jsx
'use client' ;

import Dashboard from 'oihana-next-ui/display/ui/Dashboard'

const Layout = ( { children } ) => (
    <Dashboard navbarProps={ { controls : { sound : true } } }>
        { children }
    </Dashboard>
) ;

export default Layout ;
```

- `layout` — `aside` (the default : the navbar inside the content, beside the sidebar) or `top`
  (the navbar across the whole width, above the drawer).
- `navbarProps.controls` — the built-in buttons : `fullscreen`, `lang` and `theme` shown by
  default, `sound` **opt-in**. `navbarProps.right` adds the application's own.
- `ui.dashboard`, `ui.sidebar`, `ui.navbar`, `ui.logo` in the configuration dress the shell — the
  sidebar's width and pattern, the navbar's look — so a page never has to.

## Offline and updates

- `oihana-inject-version` writes `src/version.js`, `public/version.json` and `public/sw.js` from
  your `package.json` — its `version`, and its `pwa` block (`offline`, `cachePrefix`). Run it
  before `dev` and `build`.
- `<ServiceWorker />` (`display/ServiceWorker`), anywhere under the providers, registers it —
  **in production only**, by default : on a development server it registers nothing and removes
  any worker still controlling the origin (`localhost` is shared by every project), so the hot
  reload never fights a cached page. `enabled` tries a worker on a development server anyway ;
  `useServiceWorkerUpdate` and `UpdateModal` take the same option.
- With `pwa.offline`, pages are cached for offline use ; the barcode reader's WebAssembly too,
  when it is served — see the [barcodes guide](../../components/barcodes/README.md).

## Without the providers

A component reached outside the stack does not throw where it can help it : `useFeedback()`
returns `null` and every signal plays, `useNumberFormat()` falls back to the default locale, a
label read through `useI18n` falls back to the component's own English. That is a safety net,
not a set-up : mount the stack.
