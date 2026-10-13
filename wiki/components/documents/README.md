# Documents

A PDF in the page : every page in a scrolling column, a toolbar, zoom, print, download and full
screen — on a phone as on a desktop, which an `<iframe>` cannot do. The engine is pdf.js,
reached through `react-pdf`, both **optional** : an application that never opens a document
installs nothing.

| | |
|---|---|
| `PdfViewer` | the viewer : a document, its pages, its toolbar |
| `PdfToolbar` | the controls, drawn by the viewer or by you inside it |
| `PdfPanel` | the viewer in a side panel — full screen on a phone |
| `PdfThumbnails`, `PdfSearch` | the column of miniatures and the search field, drawn by the viewer when opened |
| `PdfPasswordModal` | the dialog a protected document opens |
| `DocumentFrame` | the four states a viewer needs : loading, failed, empty, engine missing |
| `components/documents/engine` | the one module that names `react-pdf` ; `preloadPdf()`, `loadPdf()` |
| `helpers/pdf` | `toPdfSource`, `nextZoom`, `mostVisiblePage`, `findInText`, `renderPagesToImages`, `printImages` — pure, tested |

## Setting up

```bash
bun add react-pdf
```

Then serve the engine's files yourself. pdf.js parses in a web worker and reaches, at run
time, for its WebAssembly decoders, its standard fonts and its character maps. By default it
looks for them on a CDN — no document offline, a third party on every first open, a strict
Content-Security-Policy that blocks it. `oihana-copy-pdfjs-assets` copies them under
`public/pdfjs/<version>/`, and the viewer asks for that very folder :

```json
{
    "scripts": {
        "predev":   "oihana-copy-pdfjs-assets",
        "prebuild": "oihana-copy-pdfjs-assets"
    }
}
```

```gitignore
/public/pdfjs/
```

The folder is named after the version `react-pdf` pins — not after a `pdfjs-dist` your
application may have installed for itself : pdf.js refuses an API and a worker of two
versions, and the script resolves the engine **from `react-pdf`** so that can never happen.
Absent, the script says so and exits `0`. The offline service worker keeps `/pdfjs/`
cache-first, beside `/zxing/`.

## The viewer

```jsx
import PdfViewer from 'oihana-next-ui/components/documents/PdfViewer' ;

<PdfViewer className="h-[70vh]" source="/documents/invoice.pdf" />
```

The viewer **fills the box it is given** : set the height on it, through `className`, or put
it in a panel that has one. `source` is a url, a `URL`, a `File` or a `Blob` (dropped, picked,
generated), an `ArrayBuffer` or a `Uint8Array`, or — for a document behind an API —
`{ url , headers , credentials }` :

```jsx
<PdfViewer
    className = "h-full"
    fileName  = "facture-2026-0042.pdf"
    source    = { { url : `${ API }/documents/42` , headers : { Authorization : `Bearer ${ token }` } } }
/>
```

pdf.js sends the headers itself and keeps its range requests : a long document starts showing
before it is fully downloaded, where a `fetch` by hand would wait for the last byte.

### What the reader gets

- **Every page, only the near ones drawn.** The pages are white placeholders of their true
  size from the first paint — the scrollbar and the page numbers are right at once — and a
  page becomes a canvas when it comes within a screen of the viewport (`margin`), a placeholder
  again when it leaves, which frees it. Two hundred pages on a phone cost what three do.
- **Fit and zoom.** At zoom `1` a page is fitted to the frame's width (`fit="width"`, the
  default), to its height (`"page"`), or drawn at its real size (`"none"`). The toolbar steps
  through ½ … 3× ; `defaultZoom` / `zoom` / `onZoomChange` as usual.
- **The current page** follows the scroll — the page showing the most of itself, not the
  first one touching the frame — and `onPageChange( page )` says it. `initialPage` opens
  elsewhere than page 1 ; links inside the document scroll to their page.
- **Print** prints from inside the page, on a phone as on a desktop : every page is drawn at
  `printDpi` (150 by default) into one reused canvas, kept as a JPEG, and handed to the
  browser's print dialog ; past `printLimit` pages (200) the viewer refuses with a notice and
  `onPrintRefused`. **Open in a tab** hands the document to the browser's own reader.
  **Download** saves it under `fileName`, then the file's own name, then the title the
  document carries, always ending in `.pdf`.
- **Search** (the toolbar's magnifier, or Ctrl+F with the viewer focused) finds words without
  caring for case or accents, a partial word accepted, counts them, highlights them in the text
  layer, and walks them with Enter / Shift+Enter. It needs the text layer.
- **Thumbnails** open in a column beside the pages on a desktop (closed by default) ;
  **rotate** turns the whole document by quarter turns. With the viewer focused : Page Up /
  Page Down, Home / End, `+` / `−`, `r`.
- **Full screen** covers the application's window with the viewer — never the browser's own
  full screen, which is the application's to take or not. The same on every device, an iPhone
  included ; `Escape` leaves. When the application is already in the browser's full screen, `Escape`
  closes the viewer and leaves that full screen alone (Keyboard Lock API : Chrome, Edge) ;
  elsewhere one `Escape` closes both. An application that keeps the key for every dialog turns
  on `fullscreenLockEscape` once, at its root — see
  [setting up an application](../../display/application/README.md) — and the viewer leaves the
  lock to it.
- **A protected document** asks its password in a dialog, and asks again when the one given
  is wrong ; giving up shows the failed state.
- `onLoad( { pages , title , pdf } )`, `onError( error )`, `onRenderedChange( count )` — the
  last one is what the demo's « pages drawn » counter reads.

### The toolbar

`toolbar="top"` (default), `"bottom"` or `"both"` draws `PdfToolbar` ; `false` draws none.
`toolbarProps` chooses what it shows — `showZoom`, `showFit`, `showThumbnails`, `showSearch`,
`showRotate`, `showOpenInTab`, `showPrint`, `showDownload`, `showFullscreen` — and `tooltips`
(on by default, opening below a top bar and above a bottom one). Inside the
viewer, a toolbar of your own reads the viewer through `usePdfViewer()` — page and pages,
zoom, fit, full screen, and the gestures `goTo`, `zoomIn`, `zoomOut`, `setFit`, `download`,
`print`, `toggleFullscreen` :

```jsx
import PdfToolbar from 'oihana-next-ui/components/documents/PdfToolbar' ;

<PdfViewer className="h-96" source={ file } toolbar={ false }>
    <PdfToolbar showFullscreen={ false } showPrint={ false } />
</PdfViewer>
```

The same gestures sit on the viewer's `ref` (`goTo`, `zoomIn`, `download`… and `pdf`, the
open pdf.js document) for a button that lives outside it.

The words — the toolbar's names, the states, the password dialog — come from the
`components.document` bundle (fr / en) ; `path` points at another.

### In a panel

`PdfPanel` is the shape of a document opened from a list : a `SidePanel` anchored to the end
of the screen on a desktop, the whole screen on a phone (`fullScreenBreakpoint="sm"`), with the
viewer inside. It opens and closes as every modal does, with `useModal`, takes every prop of
`PdfViewer`, titles itself after the document, and pins the application's actions under the
viewer through `footerNode` :

```jsx
import PdfPanel from 'oihana-next-ui/components/documents/PdfPanel' ;
import useModal from 'oihana-next-ui/components/modals/hooks/useModal' ;

const { modalRef , open , close } = useModal() ;
const viewer = useRef( null ) ;

<Button onClick={ open }>Open the invoice</Button>

<PdfPanel
    fileName   = "facture-2026-0042.pdf"
    footerNode = { <Button onClick={ () => viewer.current?.download() }>Download</Button> }
    ref        = { modalRef }
    source     = { { url , headers : { Authorization : `Bearer ${ token }` } } }
    viewerRef  = { viewer }
/>
```

### Without the engine

Where `react-pdf` is not installed, the viewer says so and offers « Open in a tab » when the
source is a url — the browser's reader needs no engine. `preloadPdf()` from the engine module
warms the engine up on a page that lists documents, so the first one opens without waiting,
and says `false` where there is no engine.

## 🚨 Why not an `<iframe>`

On a desktop, `<iframe src="file.pdf">` shows the browser's reader. **On an iPhone it shows the
first page only** — a WebKit bug since iOS 8 — and **on Android Chrome it downloads the file**
instead of showing it. Neither takes a header for a document behind an API. An `<iframe>` is a
desktop-only fallback ; the viewer is the same everywhere.

## Offline

The engine's files are kept by the service worker after their first fetch. **The documents
themselves are not** : whether a PDF opened once is kept for a yard with no network is the
application's decision, not the library's.

## What is not here

Creating a PDF from data, and editing one, are separate engines, on the roadmap.
