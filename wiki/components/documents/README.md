# Documents

A PDF in the page : every page in a scrolling column, a toolbar, zoom, print, download and full
screen — on a phone as on a desktop, which an `<iframe>` cannot do. And a PDF **made from
data** : an invoice, a sheet of labels, written as a React component, previewed as it is
typed, downloaded, sent to an API, or rendered by the server. Two engines, pdf.js through
`react-pdf` to read and `@react-pdf/renderer` to write, both **optional** : an application
that never opens a document installs nothing, one that only reads installs one.

| | |
|---|---|
| `PdfViewer` | the viewer : a document, its pages, its toolbar |
| `PdfToolbar` | the controls, drawn by the viewer or by you inside it |
| `PdfPanel` | the viewer in a side panel — full screen on a phone |
| `PdfThumbnails`, `PdfSearch` | the column of miniatures and the search field, drawn by the viewer when opened |
| `PdfPasswordModal` | the dialog a protected document opens |
| `DocumentFrame` | the four states a viewer needs : loading, failed, empty, engine missing |
| `PdfPreview`, `PdfDownloadButton` | a document of `@react-pdf/renderer` shown in the viewer as it changes, or generated on click and saved |
| `PdfQRCode`, `PdfBarcode` | the codes inside a generated document, drawn by the library's own encoders |
| `components/documents/engine` | the one module that names `react-pdf` ; `preloadPdf()`, `loadPdf()` |
| `components/documents/engine/renderer` | the one module that names `@react-pdf/renderer` ; `renderToBlob()`, `preloadRenderer()` |
| `hooks/usePdfDocument` | the generation behind `PdfPreview` : a blob and its url, again after each change |
| `helpers/pdf` | `toPdfSource`, `nextZoom`, `mostVisiblePage`, `findInText`, `renderPagesToImages`, `printImages`, `units`, `registerFonts`, `uploadPdf` — pure, tested |

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

## Creating a document

```bash
bun add @react-pdf/renderer
```

Nothing to serve : the writer carries its own fonts and reaches for no file. It weighs
**1.4 MB minified** — three times the reader —, so the library loads it **only when a
document is generated**, never when a page opens ; a page that shows an invoice's preview
pays for it once, a page that offers a download pays for it on the click.

### A template

A document is a React component made of the engine's primitives — `Document`, `Page`,
`View` (flexbox, through yoga), `Text` (which flows and paginates), `Image`, `Link`, the
`Svg` family — styled with an object close to CSS but **not CSS** : no `<table>`, no grid,
no selectors. An invoice is rows of `View`s ; the ones here —
[`InvoiceDocument`](../../../src/demo/documents/pdf/InvoiceDocument.jsx),
[`LabelSheetDocument`](../../../src/demo/documents/pdf/LabelSheetDocument.jsx),
[`NoteDocument`](../../../src/demo/documents/pdf/NoteDocument.jsx) — are **recipes to copy**,
not components of the library : every business has its own invoice.

Three things a template of yours keeps from them :

- **It is pure.** Words come in as props, amounts and dates are formatted with `Intl` from a
  `locale` prop — `formatNumber( value , locale , { style : 'currency' , currency } )` is the
  library's and runs anywhere — so a route handler with no React context renders it as the
  page does.
- **It imports `@react-pdf/renderer` at its top**, which is why a page imports *it* lazily :
  `import( './InvoiceDocument' )` in an effect, the component kept in state, the element built
  only once it is there. The engine and the template arrive together, after the page.
- **Its footer is `fixed`**, so every page carries the codes and « page n / N » through
  `<Text render={ ( { pageNumber , totalPages } ) => … } />` ; its totals are `wrap={ false }`,
  so they never split across a page.

Hyphenation is **off** : the engine hyphenates English, with Knuth's patterns, whatever the
language, and a French invoice came out with words broken where no reader expects a hyphen.
`loadRenderer( { hyphenate : true } )` keeps the engine's own — on the first call, which
decides. A route handler sets `Font.registerHyphenationCallback( word => [ word ] )` itself.

### Preview, download, upload

```jsx
import PdfPreview        from 'oihana-next-ui/components/documents/PdfPreview' ;
import PdfDownloadButton from 'oihana-next-ui/components/documents/PdfDownloadButton' ;

const element = useMemo( () => <Invoice invoice={ invoice } labels={ labels } locale={ locale } /> , [ invoice , labels , locale ] ) ;

<PdfPreview className="h-[70vh]" document={ element } fileName="facture-2026-0042.pdf" onGenerated={ ( { blob } ) => { last.current = blob ; } } />
<PdfDownloadButton color="primary" document={ element } fileName="facture-2026-0042.pdf" />
```

`PdfPreview` generates the document 300 ms after its last change (`delay`) and hands the blob
to **`PdfViewer`** — never to the engine's own `PDFViewer`, an `<iframe>`, one page on an
iPhone. While the first one is generated the frame says so ; while a later one is, the previous
stays on screen with a thin bar above it. Every prop of the viewer passes : `toolbarProps`,
`fit`, `fileName` for its download button. **`document` is compared by identity** : an element
written inline is a new one on every render, and would generate forever — `useMemo` it on its
data, or let the React Compiler do it. `usePdfDocument( element , { delay } )` is the hook
underneath, for a preview of your own shape : `{ blob , url , loading , error , regenerate }`.

`PdfDownloadButton` generates **on the click** and saves under `fileName`, a spinner meanwhile.
`renderToBlob( element )` from the engine module is the same, outside React.

To store it, `uploadPdf( url , blob , { fileName , fields , headers } )` sends a multipart form
— the file in `file`, the other fields beside it — and throws on a server that says no, with
`status` and `response` on the error. The blob is the one `onGenerated` gave, or
`renderToBlob`'s.

### Codes in a document

```jsx
import PdfQRCode  from 'oihana-next-ui/components/documents/pdf/PdfQRCode' ;
import PdfBarcode from 'oihana-next-ui/components/documents/pdf/PdfBarcode' ;
import { mm }     from 'oihana-next-ui/helpers/pdf/units' ;

<PdfQRCode size={ mm( 18 ) } value={ paymentUrl } />
<PdfBarcode value={ invoice.number } width={ mm( 50 ) } />
<PdfBarcode format="ean_13" value="9501101530003" />
```

They are primitives of the engine, drawn with the library's own encoders — `encodeQRCode`,
`layoutBarcode`, the same grid and the same path as `QRCode` and `Barcode` on screen — into an
`<Svg>`. **Import them from a template only** : like a template, they import
`@react-pdf/renderer` at their top. A barcode's module is 0.33 mm by default, the narrowest a
laser printer draws cleanly ; `width` sets it from the room the code has instead.

### Fonts

The engine's standard faces — Helvetica, Times, Courier — carry the Latin accents and the
euro sign, and need no file : a document set in them is ready. A face of your own is
registered once with `registerFonts( Font , { family , fonts : [ { src , fontWeight } ] } )` —
TTF, OTF or WOFF, **not WOFF2** —, which remembers what it registered : a component or a route
that calls it on every pass registers nothing twice. `Font` is the engine's, from
`loadRenderer()` in the browser or imported in a route.

### Millimetres

A PDF is in points, 72 to the inch ; a label is in millimetres. `helpers/pdf/units` gives
`mm()`, `cm()`, `inch()`, `toMm()`, the usual `PAGE_SIZES` and `pageSize( 'A4' )` for a
`<Page size>` — or `pageSize( { width : 99.1 , height : 38.1 } )` for one label. The sheet of
labels in the demo places each label absolutely from the grid of its stationery reference
(page, label, margins, gaps), so a long name never shifts the next one : what a `print:`
stylesheet used to approximate, now a file the printer takes as it is.

### On the server

The same template renders in a route handler, with no browser in the loop — an API that
stores the invoice itself, or mails it :

```js
// app/api/documents/invoice/route.js
import { Font , renderToBuffer } from '@react-pdf/renderer' ;
import Invoice from '@/documents/Invoice' ;

Font.registerHyphenationCallback( word => [ word ] ) ;

export async function POST( request )
{
    const { invoice , labels , locale } = await request.json() ;
    const buffer = await renderToBuffer( <Invoice invoice={ invoice } labels={ labels } locale={ locale } /> ) ;
    return new Response( buffer , { headers : { 'Content-Type' : 'application/pdf' } } ) ;
}
```

Add **`serverExternalPackages : [ '@react-pdf/renderer' ]`** to `next.config` : the writer is
Node code that reads its fonts and streams from `node_modules`, not something to bundle. From
there, `fetch( API , { body : formData } )` to the application's own back end is the same
multipart `uploadPdf` sends from the browser. The demo's
[`/api/documents/invoice`](../../../src/app/api/documents/invoice/route.js) is this route, and
the E-commerce › Invoice scenario sends the same data to it and opens what comes back in a
`PdfPanel`.

## 🚨 Why not an `<iframe>`

On a desktop, `<iframe src="file.pdf">` shows the browser's reader. **On an iPhone it shows the
first page only** — a WebKit bug since iOS 8 — and **on Android Chrome it downloads the file**
instead of showing it. Neither takes a header for a document behind an API. An `<iframe>` is a
desktop-only fallback ; the viewer is the same everywhere.

## Offline

The reader's files are kept by the service worker after their first fetch ; the writer needs
none, and is a chunk of the application like any other. **The documents
themselves are not** : whether a PDF opened once is kept for a yard with no network is the
application's decision, not the library's.

## What is not here

Editing a PDF received — merging, numbering, stamping a signature, filling a form — is a
third engine, on the roadmap.
