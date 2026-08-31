# `maps`

Maps built on [MapLibre GL](https://maplibre.org), fitted to the DaisyUI theme : an explicit
frame with loading and empty states, markers drawn in the DOM so they take the theme tokens,
and the source attribution the data licence requires.

```jsx
import Map        from 'oihana-next-ui/components/maps/Map'
import MapMarker  from 'oihana-next-ui/components/maps/MapMarker'
import MapMarkers from 'oihana-next-ui/components/maps/MapMarkers'
import fromSchema from 'oihana-next-ui/helpers/geo/fromSchema'
```

## Installing — nothing is installed for you

**Both packages are optional peer dependencies**, exactly like the nivo packages behind
`charts`. Nothing arrives with `oihana-next-ui`, and the failure when you forget is a
build-time `Module not found`.

| What you use | `npm i` |
|---|---|
| Anything in `components/maps` | `maplibre-gl @vis.gl/react-maplibre` |
| `MapMarkers` with `cluster` | the above, plus `supercluster` |
| `helpers/geo/*` only | nothing — they have no dependency at all |

**`maplibre-gl` is pinned to the 5 line, and that is not conservatism.** Version 6 splits its
web worker into a separate `maplibre-gl-worker.mjs` and resolves it as a sibling of
`import.meta.url` at runtime. Under a bundler that relocates the chunk — Next with Turbopack,
among others — that sibling does not exist : the request 404s, the dev server answers with its
HTML page, and the browser refuses it with *"non-JavaScript MIME type of text/html"*. The map
mounts, the controls appear, and **no tile is ever drawn**. Version 5 inlines its worker as a
blob and has no such file, so it just works.

Nothing in your `next.config` fixes version 6 : the worker URL is computed from a string at
runtime, so no bundler can see it to rewrite it. The escape hatch, if you ever need 6, is to
copy that worker into `public/` and pass `mapProps={{ workerUrl : '/maplibre-gl-worker.mjs' }}`.

The engine's stylesheet is imported for you, once, by `components/maps/engine`. A bundler that
does not handle CSS imports from `node_modules` will need
`import 'maplibre-gl/dist/maplibre-gl.css'` somewhere of its own.

## Configuring the map

**A map needs a style URL, and the library never guesses one.** `mapStyle` is a required prop :
where it comes from is your application's business, not the library's.

```jsx
<Map { ...point } mapStyle={ process.env.NEXT_PUBLIC_MAP_STYLE } />
```

### Do you need an account ?

**No.** [OpenFreeMap](https://openfreemap.org) serves OpenStreetMap data with no registration,
no API key and no usage cap, and allows commercial use :

```
NEXT_PUBLIC_MAP_STYLE = https://tiles.openfreemap.org/styles/liberty
```

It is funded by donations and carries no SLA. That is the right answer for a lab, and to start
with ; the day an outage becomes a customer incident, move to a provider that sells a guarantee
(MapTiler, Stadia Maps) or host the tiles yourself from a PMTiles archive. **Both are a change
of URL, not a change of code.**

Do **not** point this at `tile.openstreetmap.org`. Its usage policy forbids sustained
application use, offers no SLA, and states that access may be withdrawn without notice.

### About the key, when you have one

**A tile key is always public.** It leaves from the browser with every tile request, so it is
readable in the network tab whatever you do. `NEXT_PUBLIC_` is not carelessness — it is the only
possibility.

What protects a key is **restricting it to your domains** in the provider's dashboard, not
hiding it. Put the full style URL, key included, in `.env.local` ; never in `.env.example`,
which is committed. If your provider charges by volume and you want a ceiling, proxy the tiles
through a route of your own — that, and only that, actually hides the key.

## Attribution is a licence condition

OpenStreetMap data is under ODbL and the credit is required, not polite.

**The engine prints it, and it is better at it than we would be.** MapLibre's attribution
control reads the credit from the style's sources *and* from the TileJSON those sources point
to — which is where a provider actually declares it. OpenFreeMap's style file shows nothing on
its own ; the line comes from `https://tiles.openfreemap.org/planet`, and the control fetches it.

So the frame draws nothing by default. `attribution` on `Map` changes who prints what :

| Value | Result |
|---|---|
| *omitted* | The engine's control, responsive — collapses on a narrow map |
| `"compact"` | The engine's control collapsed to a button that expands on click |
| `true` | The engine's control forced open |
| a string or node | The engine's control off, yours drawn instead — `OSM_ATTRIBUTION` is exported for the usual line |
| `false` | Neither. **ODbL still requires the credit somewhere on the page** — this only says it is not here |

## Drawing a collection

`MapMarkers` takes the payloads, not points : it calls `fromSchema` itself and drops what it
cannot place, so one address a geocoder never resolved does not cost the other two hundred their
map.

```jsx
<Map { ...centre } mapStyle={ style }>
    <MapMarkers
        cluster
        items       = { sites }
        markerProps = { ( site ) => BY_TYPE[ site['@type'] ] }
        onSelect    = { ( site ) => open( site ) }
    />
</Map>
```

`markerProps` is how a marker learns what it is — it gets the source object and returns props
merged into the `MapMarker`. The mapping from a business type to a colour stays in the
application, where it belongs ; the component stays data-driven.

**Clustering is off by default**, because it changes where the points appear and that is not a
component's decision to make. Turned on, it groups through `supercluster` — the very algorithm
MapLibre embeds — called in plain JavaScript rather than read back from rendered tiles, which is
what lets the bubbles stay DOM elements styled from the theme. A bubble opens on click, easing
to the zoom at which it comes apart.

`cluster` also takes an object, passed straight to supercluster : `{ radius , maxZoom ,
minPoints }`.

## Coordinates are named, everywhere

Every component and every helper speaks `latitude` and `longitude`, flat — which is also what
`@vis.gl/react-maplibre` takes, so a point spreads straight through :

```jsx
<Map { ...fromSchema( place ) } mapStyle={ style }>
    <MapMarker { ...fromSchema( place ) } title={ place.name } />
</Map>
```

**The only place that handles `[ longitude , latitude ]` arrays is `parseGeoShape`**, converting
schema.org's text geometries to GeoJSON. That is deliberate : a swapped pair does not raise
anything, it draws the right shape in the wrong country, and named coordinates cannot be swapped
by accident.

## The `geo` helpers

They have no dependency, so they can be used — and read — without a map anywhere in sight.

| Helper | What it does |
|---|---|
| `fromSchema( source , { prefer } )` | A `Place`, `GeoCoordinates` or anything carrying a pair → `{ latitude , longitude , elevation , source }`, or `null` |
| `parseGeoShape( shape )` | A `GeoShape` → a GeoJSON `Feature`. A circle becomes a `Point` with `properties.radius` |
| `toGeoJSON( sources , { prefer , properties } )` | A list of places → a `FeatureCollection` of points |
| `formatCoordinates( point , { format , digits } )` | `decimal` or `dms` notation |

**`prefer` exists because a `Place` says it twice.** schema.org lets it carry both a `geo`
object and its own flat `latitude` / `longitude`, and a back office can emit either. `geo` wins
by default ; `{ prefer : 'flat' }` inverts it.

Nothing here reads `@type`. An object carrying a coordinate pair is a point whatever it calls
itself, which is what lets a house subtype work without being declared on this side.

## What this group is not

- **Not a re-export of MapLibre.** The public API is ours — `latitude`, `longitude`, `bounds`,
  `zoom`, `mapStyle`, `controls`, plus the frame props `charts` already uses. Every component
  keeps `mapProps`, spread **last** onto the engine, so anything not exposed is still reachable.
- **Not a vector-layer renderer.** Markers are DOM elements : they take `color` and `size` like
  a `Badge` and follow the theme, at the cost of holding a few hundred points rather than a few
  thousand. A layer path would hold far more, at the price of a style written in the engine's
  paint spec — out of reach of Tailwind and of the theme tokens — so it waits for a dataset that
  actually needs it.
- **Not a controlled viewport.** `latitude`, `longitude` and `zoom` say where the map *opens* ;
  changing them afterwards does not move it. Use the ref — `ref.current.flyTo( … )` — until the
  lot that needs a controlled viewport lands.

## Accessibility

`ariaLabel` names the frame, which then renders as a `<section>` — a labelled region, which is
what a map is. Without a label the frame is a plain `div`, because an unnamed region is a defect
rather than a neutral default.

A marker with an `onClick` is a real `<button>`, named by its `title`. A marker without one is
`role="img"` with the same name, so a screen reader hears something other than "graphic".
