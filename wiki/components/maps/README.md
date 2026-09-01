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

### Grading the bubbles

A bubble's size already says how much it holds, in three steps. `clusterPalette` gives it a
colour to match :

```jsx
<MapMarkers cluster clusterPalette="brand" items={ sites } />
```

It resolves through the same `usePalette` the charts and the scheduler use, in **sequential**
mode — a ramp where more reads as stronger, pushed lighter on a dark background and darker on a
light one so nothing sinks into the tiles. There are exactly as many colours as size steps, so
the two cues always agree : a bigger bubble is never a paler one.

Takes a palette name — `'brand'`, `'theme'`, `'nivo'` — or explicit colours. It wins over
`clusterColor`, which stays what it was : one theme token for every bubble.

**A ramp returns hex values, not tokens**, so the fill goes inline and the text colour is
computed from it by contrast — a hex carries no `-content` pair to lean on. `readableOn` is
exported from `helpers/colors` for anything else with the same problem.

## Saying what a point is

A bubble is **anchored to coordinates, not to an element** — it stays glued to its ground while
the map pans. That is what separates it from `Popover`, which follows a DOM node and would have
to be repositioned every frame during a pan.

```jsx
<Map { ...centre } mapStyle={ style }>
    <MapMarker { ...point } onClick={ () => setOpen( site ) } />

    { open && (
        <MapPopup { ...fromSchema( open ) } offset={ [ 0 , -12 ] } onClose={ () => setOpen( null ) }>
            <Card title={ open.name } actions={ <Button>Open</Button> }>…</Card>
        </MapPopup>
    ) }
</Map>
```

**Anything goes inside** : a `Card`, a `Button`, an image, a sentence. The engine's own padding
is removed so the content decides its own — a `Card` sits in it without a frame inside a frame.
`anchor`, `offset`, `maxWidth`, `closeOnClick`, `closeOnMove`, `showCloseButton` and the two
class props take care of the rest, and the close cross is ours, so it matches `Modal` and
`Popover` rather than being a third one that looks almost like them.

**A bubble is not a modal, and the choice is not aesthetic.** The bubble answers *what is this
point* without leaving the map ; a modal answers *let us work on this record*. Opening a modal
from a marker needs nothing new — `onClick` is already there on `MapMarker`, `MapCluster` and a
route's stops.

**🚨 Theming it needs the important modifier, against the habit of this codebase.** The rule
elsewhere is that a Tailwind utility beats DaisyUI, because DaisyUI nests its rules in
`@layer utilities` where unlayered content wins. **MapLibre's stylesheet is not layered at all**,
and unlayered declarations beat every layer whatever the specificity — so a plain utility loses
and the popup stays white on a dark theme. Every class in `getMapPopupClassNames` carries a `!`
for that reason, and the tip is eight classes because MapLibre colours one border side per
anchor.

## Searching from inside the map

```jsx
<MapSearch geocode={ ban } onSelect={ setPlace } />
```

`InputAddressSearch` in a `MapControl`, and nothing more. **The geocoder is still injected**, so
the same field searches addresses at a service or **your own records in your own data** — both
answer `Place` objects, and neither is the library's business.

**Two shapes, and the reason is not taste.** The map frame clips its contents, so on a short map
the suggestion list is cut off at the bottom edge — five suggestions do not fit under 320 pixels
of height. `variant="inline"` is what a wide map wants ; `variant="modal"` is what a short one,
or a phone, needs, its dialog opening in the browser's top layer where no `overflow` can reach
it.

Choosing a result flies the map to it and calls `onSelect( place , point )`. No marker is
dropped — that is the caller's call, and `MapMarker` is right there.

## Where the user is

Two answers, because there are two questions.

**On the map**, `controls={{ geolocate : true }}` adds `MapGeolocate` — **ours**, a `Button` in a
`MapControl`, on the hook below. It draws the dot and, by default, the accuracy circle : a
translucent disc of the margin the browser reports, in real metres, so it grows and shrinks with
the zoom. A bare dot on a desktop fix five kilometres wide reads as a certainty.

```jsx
<Map { ...point } mapStyle={ style }>
    <MapGeolocate track position="bottom-left" />
</Map>
```

`track` makes the button a toggle that follows until pressed again ; without it, one press
locates and centres, and that is the end of it. Two states, where the engine's own control has
five — the third being « the watch runs but you dragged the map away », which costs two more
appearances and is understood by nobody who sees it.

The engine ships a control too, and it is not used : a control whose click we could not make
fire is worth less than a small one we own end to end — and this one takes the theme.

### A corner for our own controls

`MapControl` is the primitive underneath, and geolocation is only its first passenger :

```jsx
<MapControl position="bottom-left">
    <Button icon={ MdLayers } onClick={ toggleLayers } />
</MapControl>
```

Four corners, `top-left` by default because the engine's controls hold the top-right.
`bottom-right` sits higher than its siblings : the source credit lives in that corner, and
covering a licence condition is not an option. The box wraps its children exactly, so the map
stays draggable everywhere it does not actually cover.

**Off the map**, `useGeolocation` answers the same question with nothing to draw — which is what
an address form needs :

```jsx
const { error , isDenied , position , request } = useGeolocation() ;
```

It returns `latitude` and `longitude` flat, the same names as everything else, so a fix spreads
straight into a `Map` or a `MapMarker`. It follows `useMediaPermission`'s shape —
`permissionState`, `isGranted`, `isDenied`, `isLoading`, `request` — and adds `position`,
`error`, `stop` and `watching`.

**Nothing happens until you ask.** Mounting reads the permission state, which does not prompt ;
the browser dialog appears on `request()`. A hook that asked on mount would put a permission
prompt in front of anyone who merely loaded the page, which is how users learn to click *block*.

**A refusal is a state, not an error to swallow** : `isDenied`, with `error.kind` of `refused`,
`unavailable`, `timeout` or `unsupported`. Say something about each — a button that silently
does nothing is the worst of the outcomes.

## Editing a position

`InputGeoPoint` is the whole control : two masked fields and a draggable marker, all writing the
same `{ latitude , longitude }`.

```jsx
<InputGeoPoint mapStyle={ style } value={ point } onChange={ setPoint } />
```

**The field only lets go of what it holds when it loses focus.** `48.8` is not yet a latitude,
so a marker jumping at every keystroke would make the field unusable — the display and the model
are two values that meet on blur, the arrangement `InputCurrency` arrived at first.

**Display rounds, storage does not.** Six decimals is about eleven centimetres, which is finer
than any address needs — but rounding on the way *in*, then showing the rounded figure, then
writing that back walks the point a little further on every round trip. So `MapPicker` keeps
what the engine gave it, and only the field rounds.

**A half-filled point draws nothing.** `{ latitude : 48.85 }` alone would open the map on the
Gulf of Guinea, which is a real place and not the one meant.

Two smaller pieces sit underneath, and both are useful alone :

| Component | Where | What it is |
|---|---|---|
| `MapPicker` | `components/maps` | The map and its draggable marker, no fields |
| `InputCoordinate` | `components/inputs` | One masked axis, **no map dependency at all** |

`InputGeoPoint` lives with the maps rather than with the inputs, although it is a form control :
it carries the engine with it, and `components/inputs` has no dependency and must keep none.

**Dragging only, never a click on the map.** Setting the point wherever the map is clicked reads
as a convenience until the first time someone taps to dismiss something and silently moves a
customer's address.

**The map follows a value it did not cause, and only that one.** A drag moves the marker and
never the map — pulling the ground from under the hand doing the dragging is unusable. A point
arriving from anywhere else, an address search above all, is flown to : choosing an address in
Amiens while the map shows Paris would otherwise drop the marker off-screen and look like
nothing happened. `follow={ false }` turns it off, `followZoom` says how close to land.

## Searching for an address

**The library ships no provider.** `InputAddressSearch` takes a function and knows nothing about
who answers it — which country, which terms, which quality is an application's decision.

```js
geocode( query , { signal } ) => Promise< Place[] >
```

`Place` objects, so `fromSchema` reads the answer with no translation, and a selection hands back
the whole address rather than only its point.

**The signal is not an optimisation.** Without it a slow first request lands after a fast second
one, and the list shows results for what was being typed two words ago.

### The BAN adapter, shipped beside

One provider *is* shipped, as an adapter nothing imports on its own :

```jsx
import ban from 'oihana-next-ui/helpers/geo/adapters/ban'

<InputAddressSearch geocode={ ban } onSelect={ setPlace } />
```

`api-adresse.data.gouv.fr` — free, no key, no account, and better on French addresses than any
international service. Useless outside France, which is exactly why it is not wired in.

It takes `{ limit , params }` too : `params` reaches the BAN's own filters, `postcode`,
`citycode`, `type`, or `lat` / `lon` to bias results towards a region.

### In a form

`InputGeoPoint` takes the same function and grows a search field above its two others :

```jsx
<InputGeoPoint geocode={ ban } value={ point } onChange={ setPoint } onSelectAddress={ setAddress } />
```

That is the whole gesture — type an address, take a suggestion, then drag the marker because the
geocoder landed in the middle of the street. Without a `geocode`, nothing changes and no search
appears.

**It is a real combobox** : `aria-expanded`, `aria-controls`, `aria-activedescendant`, arrow keys
that wrap both ways, Enter to take the highlighted one, Escape to close, and focus that never
leaves the field. The options are deliberately *not* focusable — that is what the
activedescendant pattern is, and making them focusable would break it.

## Geometry the DOM cannot hold

A route is a line and an area is a polygon : neither is an element, so both go through the
engine's own layers. `MapGeoJSON` is the primitive.

```jsx
<Map { ...centre } mapStyle={ style }>
    <MapGeoJSON color="error" data={ zone } />
</Map>
```

**A layer is styled in the engine's paint spec, not in Tailwind.** `line-color` is a string the
engine reads once, and a theme token means nothing to it — so the token is resolved against the
colours the theme context extracts from the CSS variables, which is the very mechanism the
charts have used since the beginning. Change the theme and the layer repaints. Anything that is
not a known token — a hex carried by the data, an `oklch()` — goes through untouched.

### Routes

```jsx
<MapRoute stops={ places } color={ route.color } geometry={ path } />
```

**It draws a geometry, it never computes an itinerary.** Working out the road between two
addresses is a call to a routing service and belongs nowhere near a display component. Given a
`geometry`, it draws that road, solid. Given none, it joins the stops with straight **dashed**
segments — the dashes saying *this is an order of passage, not a road*. A solid line there would
be a lie about a path nobody computed.

**The order comes from the data.** `position` in the house schema, read through
`helpers/geo/fromRoute` — which takes a `position` accessor for a payload that nests it, because
guessing a property name works right up until the first API that nests it differently. The rank
is printed inside each marker : a route whose order is invisible is a cloud of points.

**The colour may come from the data too.** A `DeliveryRouteTerm` carries a hex, and it reaches
the line and the markers alike — the marker painting it inline and computing its text by
contrast, since a hex has no `-content` pair. A theme token takes the class path instead.

`fit` brings the map to the whole route on mount, because a route almost always overflows the
opening view. **Only one route per map should carry it** : two would fight over the view and the
last one mounted would win.

### Zones

```jsx
<MapZone shape={ place.geo } color={ area.color } />
```

It takes what an application actually has : the `GeoShape` its API returned, the `Place` holding
one in `geo`, or GeoJSON it built itself.

**A circle becomes a polygon here, and that is the whole component.** `parseGeoShape` keeps a
`GeoShape.circle` as a centre and a radius — faithful to schema.org and impossible to fill,
since a point has no inside. So it is approximated as a polygon in real coordinates, which grows
with the zoom and survives a rotation where a disc of fixed pixels would not.

The approximation is flat-earth, and measured rather than assumed : **0.11 % at 1.5 km, 0.06 %
at 50 km, 0.23 % at 100 km**. At a two-kilometre delivery radius that is two metres. Past a few
hundred kilometres a geodesic library is the right tool, and no delivery area has needed one.

### Drawing them

```jsx
<Map { ...centre } mapStyle={ style }>
    <MapDraw defaultValue={ zones } onChange={ setZones } />
</Map>
```

**The three modes are exactly the three `GeoShape` members** — polygon, rectangle, circle — plus
a select mode that edits and deletes. Terra Draw offers a dozen : freehand, sector, sensor,
line, marker. Offering those would let someone spend ten minutes on a shape that saving would
lose, so they are left out.

**What comes out is what the store keeps.** `onChange` receives `GeoShape` objects rather than
GeoJSON : that is what a back office holds, and `parseGeoShape` converts the other way whenever
a caller needs it. Emitting GeoJSON instead would put the axis inversion in every application
rather than in one place.

**A drawn circle goes back as a circle.** Terra Draw records what drew each feature —
`properties.mode` — and its circle mode keeps `radiusKilometers`, so a four-kilometre radius
survives as a centre and a radius instead of becoming sixty-four numbers nobody can edit. The
centre is recovered from the ring and comes back exact.

**`defaultValue` seeds, it does not control.** A drawing surface holds work in progress, and
pushing a new value into it mid-gesture would take the shape out from under the hand drawing it.

Both packages are **optional peers** and are imported only when the component mounts, so a page
that never draws pays for neither.

| What you use | `npm i` |
|---|---|
| `MapDraw` | `terra-draw terra-draw-maplibre-gl-adapter` |

### Writing a shape back

`toGeoShape` is the way back, and it lives in `parseGeoShape`'s own file so the two halves of the
same inversion are read side by side — anywhere else, one could be corrected without the other.

```js
toGeoShape( feature ) ; // → { '@type' : 'GeoShape' , polygon : '48.845 2.32 …' }
```

A round trip returns the same member : the shape that was read is recorded in
`properties.shape`, so a box comes back a box rather than the polygon it was drawn as.

Two differences are expected, and neither loses anything. A polygon's first point is repeated at
the end, GeoJSON requiring a closed ring where schema.org only recommends one. And **trailing
zeros do not survive** — `48.900` comes back `48.9` — because once the text has been read as a
number the two are the same number, and nothing says how many decimals to write. Float noise is
trimmed to twelve significant digits, so `2.32` does not come back as `2.3200000000000003`.

**A store detecting changes by comparing strings will see an untouched shape as modified.**
Compare numbers, or compare against what a round trip produces rather than against what was
first received.

**A `MultiPolygon` is a known gap** : `MapGeoJSON` filters its fill on `Polygon`, so a multi
would be outlined and not filled. To be lifted the day a payload carries one.

## Coordinates are named, everywhere

Every component and every helper speaks `latitude` and `longitude`, flat — which is also what
`@vis.gl/react-maplibre` takes, so a point spreads straight through :

```jsx
<Map { ...fromSchema( place ) } mapStyle={ style }>
    <MapMarker { ...fromSchema( place ) } title={ place.name } />
</Map>
```

`Map` and `MapMarker` absorb everything else the point carries — `elevation`, `source`,
`accuracy` and the rest — so none of it reaches the DOM. The list they share lives in
`helpers/geo/pointFields` ; a new field on a point shape has to be added there too.

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
