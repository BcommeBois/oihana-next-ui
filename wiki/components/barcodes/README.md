# `barcodes`

QR codes and linear barcodes **drawn** by the library, and codes **read** with the camera or
typed at the keyboard — with one reading, whatever produced it.

```jsx
import QRCode         from 'oihana-next-ui/components/barcodes/QRCode'
import Barcode        from 'oihana-next-ui/components/barcodes/Barcode'
import BarcodeScanner from 'oihana-next-ui/components/barcodes/BarcodeScanner'
import InputScan      from 'oihana-next-ui/components/inputs/InputScan'
```

The two halves are independent : a page that only prints labels never loads a byte of the
reader, and a page that only scans never loads an encoder.

## Installing

| What you use | What it needs |
|---|---|
| `QRCode`, `matrixToSvg`, `matrixToPng` | nothing — [`qr`](https://github.com/paulmillr/qr) is a regular dependency of the library |
| `Barcode`, every linear encoder, `barcodeToSvg`, `barcodeToPng` | nothing — the encoders are written in the library |
| `BarcodeScanner`, `InputScan`'s camera | `zxing-wasm` (an **optional peer**), for the browsers without a native detector |
| `normalizeScan`, `readTypedCode`, `parseGS1Date`, the GS1 helpers | nothing |

**Why the linear codes are home-made and the QR code is not.** Code 128, EAN and ITF are tables
and a checksum : a few hundred lines, tested module by module against the standards and read back
by an independent reader. A QR code is Reed–Solomon error correction, eight masks and their
penalty scoring — work a small, audited package does better than a copy would.

## Drawing a code

`QRCode` and `Barcode` render an inline SVG : sharp at any size, printable, themable. Both draw a
**light plate** with their quiet zone inside the SVG, so a code on a dark theme still scans — a
reader needs light around the code, not the page's background.

```jsx
<QRCode value="https://example.com/r/42" size="lg" />

<Barcode value="400638133393" format="ean_13" />              // the check digit is added
<Barcode value="(01)09501101530003(17)261231(10)LOT-42" format="gs1_128" />
<Barcode value="1540014128876" format="itf_14" bearer="frame" />
```

**Which format answers which need :**

| Need | Format |
|---|---|
| A link, a ticket, anything a phone scans | `QRCode` — and its accessible name is never its content |
| An internal reference, letters and digits | `code_128` |
| A product in a shop | `ean_13`, `ean_8`, `upc_a` |
| A logistics label : GTIN, lot, expiry, quantity, SSCC | `gs1_128` |
| A carton, printed straight on corrugated board | `itf_14`, with its bearer bars |

A content the format refuses throws nothing at render : the component calls `onError` with a
`BarcodeContentError` whose `reason` says why — `characters`, `length`, `checkDigit`, `syntax` —
and `data.ai` names the GS1 element at fault. A QR code past its capacity gives a
`QRCodeCapacityError` ; `measureQRCode` tells beforehand whether a text fits.

### Sending a code to a server

The drawing and the export share one path : what the page shows is what the file contains.

- `barcodeToSvg( symbol , options )` and `matrixToSvg( matrix , options )` return an SVG
  **string**. They run anywhere — in a route handler, on the server — and are what to store or
  attach.
- `barcodeToPng` and `matrixToPng` resolve to a PNG `Blob`. They need a canvas, so the browser
  only, and they wait for the font of the human-readable text before drawing it.

```js
import encodeBarcode from 'oihana-next-ui/helpers/barcodes/encodeBarcode'
import layoutBarcode from 'oihana-next-ui/helpers/barcodes/layoutBarcode'
import barcodeToSvg  from 'oihana-next-ui/helpers/barcodes/barcodeToSvg'
import encodeQRCode  from 'oihana-next-ui/helpers/barcodes/encodeQRCode'
import matrixToSvg   from 'oihana-next-ui/helpers/barcodes/matrixToSvg'

const label = barcodeToSvg( layoutBarcode( encodeBarcode( 'ABC-1234' ) ) , { scale : 3 } ) ;
const link  = matrixToSvg( encodeQRCode( 'https://example.com' ) , { scale : 10 } ) ;
```

### GS1-128, read as on the label

A GS1-128 is written the way it is printed : every application identifier in parentheses,
`(01)09501101530003(10)LOT-42`. The encoder places FNC1 at the start and after every element of
variable length that is not the last, checks the predefined lengths and check digits
(`GS1_PREDEFINED`), and the common variable ones (`GS1_VARIABLE`) for their length and kind.
`gs1Text` prints the line under the bars `spaced`, as GS1 does, or `compact`.

## Reading with the camera

```jsx
<BarcodeScanner onDetect={ ( { value , format , gs1 , elements } ) => handle( value ) } />
```

🔑 **One code, one call.** A code held in view is reported once, then again only after it has
left the view for `dedupeDelay` (1.5 s). 🔑 **The camera is held only while it films** : it opens
when the scanner is active and the page visible, and every track stops when either stops — a
hidden tab keeps no camera light on.

### Two engines, one API

`createDetector( formats , { engine } )` (in `components/barcodes/engine`) picks the reader :

- **the browser's own `BarcodeDetector`** when it reads every requested format — Chrome on
  Android and macOS ;
- **ZXing compiled to WebAssembly** otherwise — every iPhone, Firefox, Chrome on Windows.

`engine="zxing"` forces the second (the path of an iPhone, worth replaying on Android),
`engine="native"` refuses it. The scanner draws its own states — opening, refused with how to
allow it, no camera, no HTTPS — with a retry where one can help.

⚠️ **The camera needs HTTPS.** `localhost` counts as secure on the computer ; a phone opening
`http://<your-ip>:3000` is refused. Test on a phone through a deployed preview, or with
`next dev --experimental-https`.

### Serve the reader yourself

🚨 **Left to its defaults, `zxing-wasm` fetches its 1 MB binary from a CDN** : no reading without a
network, a third-party request on the first scan, and a strict CSP blocks it. The library ships a
command that copies it into your `public/` :

```json
{
  "scripts": {
    "predev":   "oihana-copy-zxing-wasm",
    "prebuild": "oihana-copy-zxing-wasm"
  }
}
```

It writes `public/zxing/<zxing-wasm version>/` — the folder carries the version, so an upgrade
never pairs a new loader with a cached old binary — and removes older folders. Ignore
`/public/zxing/` in git. Without `zxing-wasm` installed it says so and exits `0`.

### Offline

The offline service worker template answers `/zxing/` **cache-first** : once fetched, the reader
stays. To have it there before the network goes, call `preloadScanner()` while online — it does
nothing on a device whose native detector reads every format, unless forced. Native detection
runs on the device too ; whether an Android phone needs its Google services for it is something
to check in flight mode, on the real device.

## One reading, whatever read it

The engines disagree about GS1. Android's native detector puts the AIM symbology identifier in
the text (`]C1…`), ZXing keeps it apart, and the standard API has no field for it at all — which
is why the library calls ZXing directly rather than through a `BarcodeDetector` ponyfill : a
ponyfill must return what the standard returns, and so throws away the one thing that tells a
GS1-128 from a plain Code 128.

`normalizeScan` turns every reading into the same object :

| Field | What it is |
|---|---|
| `value` | the data alone — **the field to use** |
| `rawValue` | the text as the engine gave it |
| `format` | the Barcode Detection API name : a GS1-128 is `code_128`, an ITF-14 is `itf` |
| `symbology` | the AIM identifier, `]C1`, `]E0`…, wherever it came from |
| `gs1` | whether the code carries GS1 data |
| `elements` | its GS1 elements, `[ { ai , data } ]`, or `null` |

`splitGS1` cuts an element string as readers return it — elements run together, a GS character
after each variable-length one — and gives `null` rather than a guess when it cannot.
`parseGS1Date( 'YYMMDD' )` reads the dates of (11) to (17) : the century slides around today as
GS1 sets it, and day `00` is the last day of the month.

## A scan field

`InputScan` is an `Input` with a camera button stuck to it : the camera opens in a window on a
computer, full screen on a phone, and the field takes what is typed, sent with Enter.

```jsx
<InputScan
    label    = "Location"
    onScan   = { ( { value , source } ) => goTo( value ) }
    validate = { ( { value } ) => /^H\d-\d{2}-[A-Z]$/.test( value ) || 'Not a location code.' }
/>
```

- 🔑 **Enter is taken**, so a scan field inside a `<form>` never submits it.
- `onScan` gets the same reading from both sources, plus `source` — `'camera'` or `'keyboard'`.
  A GS1 string typed as on a label is checked and split by `readTypedCode`, and gives the very
  `value` a camera would have read.
- 🔑 **The library knows no trade.** Which codes a screen accepts is the screen's : `validate`
  returns `true` or a message ; refused, the message shows and `onReject` is called.
- A hardware scanner (a « wedge » typing like a keyboard) will join as a third `source` without
  changing the API.

## Sound and vibration

None of these components makes a sound. Pair them with `useFeedbackSignal` — `success` in
`onScan`, `error` in `onReject` — see the [feedback guide](../../contexts/feedback/README.md).

## Seeing it run

`/modules/barcodes`, `/modules/scanner` and `/modules/scanField` in the demo app, and the
logistics scenarios — `/scenarios/logistics/picking`, `/receiving`, `/inventory` — where every
label is drawn on the page to be scanned from a phone.
