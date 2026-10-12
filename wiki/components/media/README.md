# `media`

Files and photos coming into an application : chosen, dropped from the desktop, or taken on the
spot — checked, shrunk and stripped **before** they leave the page.

```jsx
import FileInput    from 'oihana-next-ui/components/inputs/FileInput'
import FileDropzone from 'oihana-next-ui/components/media/FileDropzone'
import PhotoCapture from 'oihana-next-ui/components/media/PhotoCapture'
import resizeImage  from 'oihana-next-ui/helpers/images/resizeImage'
```

Nothing to install : the browser does the decoding, the canvas the encoding. Sending the files,
keeping them while the network is away, and their upload progress are the application's.

## Which one to reach for

| Need | Component |
|---|---|
| A file field in a form, the native look | `FileInput` (daisyUI's `file-input`) — `onChange( files )` receives the files, not the event |
| Files dragged from the desktop, checked before they are taken | `FileDropzone` |
| A photo taken now, on a phone | `PhotoCapture` |
| Shrinking an image you already hold | `resizeImage` |

## Taking a photo

`PhotoCapture` is a large button that opens the back camera of a phone at once — the file
chooser on a desktop — and thumbnails of what was taken, each with its weight and a remove
button. `max` sets how many ; `allowGallery` (off) adds a button for a photo already taken.

```jsx
<PhotoCapture label="Damage" max={ 3 } onChange={ setPhotos } resize={ { maxSize : 1200 } } />
```

Every photo goes through `resizeImage` before it reaches `onChange` : a 5 MB photo leaves as a few
hundred KB.

## Shrinking, and what goes with it

`resizeImage( file , { maxSize , quality , type } )` — 1600 pixels, 0.8 and JPEG by default —
decodes the image, draws it no larger than `maxSize` on a canvas (never enlarged) and encodes it
again.

🔑 **The metadata always goes.** Encoding from a canvas writes the pixels and nothing else : the
EXIF of the original — camera, date, **position** — is not in the result. A property, not an
accident : it holds for every image, a small JPEG included, which makes it a privacy guarantee
rather than a side effect.

🚨 **The photo is turned before its EXIF goes.** A phone often stores its pixels unrotated and
says how to turn them in the EXIF. Remove the EXIF without applying it, and the photo comes out
lying on its side. The image is decoded with `imageOrientation : 'from-image'`, which applies the
turn to the pixels first.

Two more things the helper handles :

- a browser that cannot encode the asked type — WebP in an older Safari — silently gives a PNG ;
  the result is then encoded again as JPEG ;
- a transparent PNG turned to JPEG gets a white background, not a black one.

A HEIC photo cannot be decoded by Chrome on a desktop : `ImageResizeError` with `reason`
`'decode'`, which the components turn into a message rather than a crash.

### Keeping the position anyway

`PhotoCapture`'s `readLocation` (off) reads the position from the original **before** it is
shrunk and gives it apart, as data : `location : { latitude , longitude , elevation? }` — the
names of schema.org's `GeoCoordinates`, so it can be sent as is. ⚠️ Most photos have none : iOS
takes the position out before a page sees the file, and an Android camera only records one when
its own setting says so. When the position matters, ask the browser for it at the moment of the
photo instead.

`helpers/images/exif` — `hasExif` and `readGpsLocation` — read only what is needed from the
first 128 KB of a file, never write, and treat anything malformed as nothing there.

## Dropping files

`FileDropzone` is a zone files are dragged onto, and also a button : a click, Enter or Space
opens the chooser, and on a phone — where nothing can be dragged onto a page — a tap does.

```jsx
<FileDropzone
    accept   = ".pdf,application/pdf"
    helper   = "PDF, 5 MB at most"
    maxFiles = { 3 }
    maxSize  = { 5 * 1024 * 1024 }
    onChange = { setDocuments }
    onReject = { rejections => console.log( rejections ) }
/>
```

🔑 **Every file is checked before it is taken** : `accept` (the syntax of a file input),
`maxSize` / `minSize`, `maxFiles`, the dimensions of an image (decoded only when such a rule is
set) and `validate( file )`, a rule of your own. A file refused never enters the list : it shows
under the zone with its reason, worded with its weight and the limit, and `onReject` is called.
`resize` (off) passes the images through `resizeImage`.

While files hover the zone, the browser tells their types but not their names nor weights : the
zone says « refused » only for a type it is sure of, and checks everything else on the drop.

🚨 **A file dropped beside the zone does nothing.** Left alone, a browser opens a file dropped on a
page — and the page, with whatever was typed in it, is gone. While a zone is mounted, a file
dropped anywhere it does not take is ignored.

The checks are pure functions, usable without the component : `helpers/files/matchAccept`,
`checkFiles` with its reasons (`FILE_REFUSALS`), and `formatFileSize` — `7,2 Mo`, `7.2 MB`.

## In a form

`PhotoCapture` and `FileDropzone` both take `name` : the files they hold — the **shrunk** ones —
are then sent by a plain `<form>`, through a hidden file input filled with `DataTransfer`. No
JavaScript upload is needed for a classic form.

Both give each file a preview `url` that lives as long as the component : it is released when the
file is removed and on unmount. Keep the `file`, not the `url`.

## Seeing it run

`/components/fileInput`, `/components/dropzone` and `/components/photo` in the demo app — the
photo page compares an original and its shrunk copy, EXIF present then gone. In the scenarios,
the CRM's customer sheet takes documents, and the receiving and picking screens take photos.
