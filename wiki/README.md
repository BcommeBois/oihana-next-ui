# Oihana Next UI — wiki

The long-form documentation : what a family of components is for, which one to reach for,
and the compositions that only make sense across several of them.

It lives here rather than in `src/` on purpose. **The source stays code** — the JSDoc in
each file is the API reference, and it is the only place props, defaults and examples are
written, since a second copy diverges within two commits. This wiki holds what no single
file can say : the shape of a group, and the recipes.

## Contents

### Setting up

- [`display/application`](display/application/README.md) — what an application does once, at its
  root : `ApplicationProviders` apart from the `Dashboard` chrome, the configuration imported on
  the client, the order of the stack, the theme and the language agreed before the first frame,
  the keys kept on the device — and the release that empties them.

### Components

- [`components/barcodes`](components/barcodes/README.md) — QR codes and linear barcodes drawn
  by the library (Code 128, EAN, UPC-A, GS1-128, ITF-14), exported as SVG or PNG ; codes read
  with the camera — the browser's own detector or ZXing in WebAssembly, served by your
  application and kept offline — or typed at the keyboard, all normalized to one reading, GS1
  elements included.
- [`components/charts`](components/charts/README.md) — the twelve nivo charts, fitted to the
  DaisyUI theme : which one answers which question, **what to install for each**, the legend
  drawn in HTML under the frame, palettes, SVG against canvas, and what a page pays to carry
  the first one. Plus [adding a chart](components/charts/adding-a-chart.md) — for the
  thirteenth, and the traps that cost the most.
- [`components/maps`](components/maps/README.md) — maps on MapLibre GL, fitted to the theme :
  what to install and why version 5, markers and clusters, popups, routes and zones, searching
  an address, the user's position, and coordinates named everywhere.
- [`components/media`](components/media/README.md) — files and photos coming in : the native file
  field, the drop zone that checks before it takes, the photo taken on the spot, and the
  shrinking that strips the metadata — position included — without leaving a photo on its side.
- [`components/metrics`](components/metrics/README.md) — compact dashboard readings meant
  to sit inside a card or a table cell : category bar and bullet graph, bar list, tracker,
  sparkline, delta, legend.
- [`components/scheduler`](components/scheduler/README.md) — events on a time axis : agenda,
  day and week grid, month, resource timeline, the panel that reads and edits one, and the
  gestures that move them. Plus [schema.org, on the wire](components/scheduler/schema-org.md)
  — reading JSON-LD payloads and writing patches back.

### Contexts

- [`contexts/locale`](contexts/locale/README.md) — translations : bundles whose leaves carry the
  languages, reading them with `useI18n` and `NO_LOCALE`, merging the labels the library ships,
  the server side, numbers and dates by locale, and content written in several languages.
- [`contexts/navigation`](contexts/navigation/README.md) — the menu as data, its labels by id,
  the groups that stay open, the one active link ; links, `LinkPending` and the screen-wide
  transition of `BusyNavigationProvider` ; state in the URL, with or without the server ; and
  `BackLink smart`, which brings a list back as it was left.
- [`contexts/feedback`](contexts/feedback/README.md) — a sound and a vibration that tell what
  just happened without looking : `useFeedbackSignal`, what browsers allow, and the
  `FeedbackProvider` master switch kept on the device, with `SoundButton`.

## Conventions

- **One folder per group**, mirroring the path under `src/` — `components/metrics` here
  documents `src/components/metrics` there.
- **A `README.md` per group**, which GitHub renders on opening the folder. A group large
  enough to need it adds a page beside it for a subject that would otherwise swallow the
  guide — `scheduler` does, for schema.org, and `charts` for adding a thirteenth. **A page per component, on the other hand, would
  only be the JSDoc copied**, and a copy is a thing that goes stale.
- **English**, like the JSDoc and the changelog.
- **No props tables.** They are a copy of the JSDoc, and a copy is a thing that goes stale.
  Link to the source instead, and spend the space on the *why*.

## See also

- [`README.md`](../README.md) — install, requirements, Tailwind and DaisyUI setup, release.
- [`CHANGELOG.md`](../CHANGELOG.md) — what changed, and why it went that way.
- `/components` and `/modules` in the demo app — every component, running ; `/scenarios` —
  screens of use that bring several together : a CRM, dashboards, a checkout, logistics.
