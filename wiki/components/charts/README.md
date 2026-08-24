# `charts`

Twelve chart components wrapping [nivo](https://nivo.rocks), fitted to the DaisyUI theme :
automatic margins, a legend drawn in HTML under the frame, empty and loading states, and a
tooltip that follows the design tokens.

```jsx
import BarChart  from 'oihana-next-ui/components/charts/BarChart'
import LineChart from 'oihana-next-ui/components/charts/LineChart'
import PieChart  from 'oihana-next-ui/components/charts/PieChart'
```

## What this group is not

- **Not `components/metrics/`.** Those are micro-visualizations meant to sit *inside* a card
  or a table cell — a sparkline is 80×24 pixels of SVG and carries no dependency at all.
  A chart fills a frame, has axes or arcs, a tooltip layer and a responsive container, and
  brings a nivo package with it. Reach for `metrics` first : most dashboard readings do not
  need a chart.
- **Not a re-export of nivo.** The public API is ours — `data`, `height` / `aspect`,
  `legend`, `palette`, `margin`, `theme`, `xAxis` / `yAxis` — and it stays ours across
  versions. Every component keeps `nivoProps` as the escape hatch, spread **last** onto the
  nivo component, so anything not exposed is still reachable without forking the wrapper.

## The twelve

| Component | The question it answers | `kind` |
|---|---|---|
| `LineChart` | How does it move over time, or across an ordered axis ? | cartesian |
| `BarChart` | How do these compare, side by side or stacked ? | cartesian |
| `MarimekkoChart` | How do they compare when the categories are not the same size ? | cartesian |
| `PieChart` | How is a whole divided, in a handful of parts ? | radial |
| `WaffleChart` | How much of a target is reached, and what is missing ? | radial |
| `RadarChart` | How do a few profiles compare on the same dimensions ? | radial |
| `RadialBarChart` | The same bars, wrapped into concentric rings | radial |
| `PolarBarChart` | A bar chart on a **cyclical** index — twelve months where December neighbours January | radial |
| `ChordChart` | What flows *between* entities, in both directions ? | radial |
| `HeatMapChart` | Where are the highs in a row × column matrix ? | grid |
| `CalendarChart` | What happened, day by day, over a year ? | grid |
| `TimeRangeChart` | The same grid, over an arbitrary span rather than a whole year | grid |

`ChartFrame` and `ChartTooltip` are infrastructure : the first is what every chart is built
on, the second is what their tooltips render through.

Everything is a client component (`'use client'`).

## Installing — nothing is installed for you

**The nivo packages are optional peer dependencies.** Nothing arrives with
`oihana-next-ui` : install the ones for the charts you actually use, and the failure when
you forget is a build-time `Module not found`, not a runtime surprise.

| Chart | `npm i` |
|---|---|
| `LineChart` | `@nivo/line` |
| `BarChart` | `@nivo/bar` |
| `MarimekkoChart` | `@nivo/marimekko` |
| `PieChart` | `@nivo/pie @nivo/arcs` |
| `WaffleChart` | `@nivo/waffle` |
| `RadarChart` | `@nivo/radar` |
| `RadialBarChart` | `@nivo/radial-bar` |
| `PolarBarChart` | `@nivo/polar-bar` |
| `ChordChart` | `@nivo/chord` |
| `HeatMapChart` | `@nivo/heatmap` |
| `CalendarChart` **and** `TimeRangeChart` | `@nivo/calendar` |

Two entries in that table are worth a second look.

**`TimeRangeChart` needs no package of its own** — it ships inside `@nivo/calendar`, so a
project already drawing a calendar gets it for nothing.

**`PieChart` names `@nivo/arcs` although `@nivo/pie` already depends on it.** It is listed
because the wrapper *imports* it directly, for the arc label it wraps in a halo — and a
package you import is a package you declare, whoever else happens to install it.

**`optional` is not decoration.** Left off, npm 7+, pnpm and bun would install every peer
automatically, and the real cost is not the download : two copies of `@nivo/core` mean two
sets of its React contexts, which breaks tooltips and theming in ways that take an afternoon
to diagnose.

## The contract every chart holds

| Prop | |
|---|---|
| `data` | Native nivo shape, per chart. Deliberately not normalized : one shape to learn is the nivo docs, two is ours *and* theirs |
| `height` / `aspect` / `maxHeight` | The frame's box — see [Sizing](#sizing) |
| `legend` | `false`, a position, or an object — see [The legend](#the-legend) |
| `palette` | `'nivo'`, `'brand'`, `'theme'`, or your own array |
| `margin` | Merged **over** the computed one, so `margin={{ left : 90 }}` overrides one side |
| `theme` | A partial nivo theme, deeply merged over the DaisyUI one |
| `animate` | Forced off under `prefers-reduced-motion`, everywhere, without asking |
| `loading` · `emptyLabel` · `emptyState` | The two states every chart fed by an API needs |
| `ariaLabel` / `ariaLabelledBy` / `ariaDescribedBy` | See [Accessibility](#accessibility) |
| `nivoProps` | The escape hatch, spread last |

Three things diverge on purpose, and each would read as a bug undocumented.

- **`renderer` exists on seven of the twelve** — `BarChart`, `CalendarChart`, `ChordChart`,
  `HeatMapChart`, `LineChart`, `PieChart`, `WaffleChart`. nivo ships no canvas renderer for
  the other five, so the prop would be a lie.
- **`LineChart` has no `valueFormat`.** It has `xFormat` and `yFormat`, because a line has
  two axes to format and one prop could only serve one of them.
- **`legend` defaults to `false` on `CalendarChart` and `TimeRangeChart`**, and to
  `'bottom'` on the ten others. A frieze of days is read without a legend ; turn it on with
  `legend="bottom"` when the scale matters.

## Sizing

`height` gives the frame a fixed box. **`aspect` is usually better** — the chart keeps its
proportions across breakpoints instead of being squashed — and on a **circular** chart it is
close to mandatory.

A radial shape takes its radius from the *smaller* inner dimension. A fixed height therefore
wastes on a phone exactly what it saves on a desktop : the circle shrinks with the width
while the box keeps its height, and what is left over becomes two empty bands.

```jsx
<ChordChart data={ data } height={ 620 } />                     {/* 375 px wide : radius 116, 194 px of nothing above and below */}
<ChordChart data={ data } aspect="1/1" maxHeight={ 620 } />      {/* 375 × 375 on the phone, 896 × 620 on the desktop */}
```

`maxHeight` is what makes `aspect` usable on a wide card : without it the box grows as tall
as it is wide. `aspect` takes precedence over `height` — the two are alternatives, and
`maxHeight` is the ceiling on either.

## The legend

**It is HTML, drawn by `ChartFrame` under the chart, not inside the SVG.** nivo places its
own from three fixed numbers — the room reserved in the margin, the width of an item, and no
wrapping at all — none of which can know how long the text is. Drawn outside, the placement
is flex rather than arithmetic, the text wraps, and it leaves the `role="img"` that was
hiding it from screen readers.

```jsx
legend = { false }                                   // none
legend = "bottom"                                    // the default on ten of the twelve
legend = "top" | "right" | "left"                    // right and left stand it in a column beside the chart
legend = {{ position : 'bottom' , values : true } }  // the object form
```

The object takes `position`, `values`, `valueFormatter`, `marker`, `orientation`, `size`,
`className`, `items`, and `ticks` on a quantitative chart. **The four placements all stay,
and the library picks none of them responsively** : the breakpoint at which a side legend
should drop underneath is a fact about the page the chart sits in, not about the chart.

**`values` prints each series' total beside its name, and is off by default** — because what
that total *means* is not the same from one chart to the next.

| | What a legend value is |
|---|---|
| `PieChart`, `WaffleChart` | The datum's own figure. One datum per entry, nothing to sum |
| `BarChart`, `PolarBarChart`, `MarimekkoChart`, `RadialBarChart` | The sum of the key over every index — the right reading for a stack |
| `ChordChart` | What *leaves* the entity, the diagonal skipped : `data[i][i]` is a flow to itself |
| **`LineChart`, `RadarChart`** | **Nothing.** Summing the `y` of a curve is not a total ; nor is adding a wine's `fruity` to its `bitter`, the axes measuring different things |

`values` also takes a function, `( name , index ) => value`, which is how the last two get
one when the caller knows what it means.

**A quantitative chart legends itself with a scale, not a list.** `HeatMapChart`,
`CalendarChart` and `TimeRangeChart` hand nivo a `type : 'quantize'` and an *array* of
colours, so a cell's colour is one bucket among N. Their legend is a
[`MetricScale`](../metrics/README.md) — the ramp as discrete bands, the two ends of the range
underneath, and `legend={{ ticks : true }}` to print the bucket boundaries instead. Same
prop, same placements ; a caller never has to know which of the two shapes its chart takes.

## Palettes

```jsx
palette = "nivo"                          // the default
palette = "brand"                         // derived from the DaisyUI theme
palette = "theme"                         // the semantic tokens — primary, secondary, accent…
palette = [ '#4E79A7' , '#F28E2C' ]       // your own
```

**`nivo` is the default, on purpose**, and `brand` — generated from the theme — is available
beside it. `brand` falls back to a hand-tuned palette past **six series** : brand identity
and categorical distinguishability are incompatible past about five, and `usePalette` already
warns when the ceiling is crossed.

**Three charts take a *sequential* palette instead** — `HeatMapChart`, `CalendarChart` and
`TimeRangeChart`. Cells encode a quantity, so the colours have to be ordered rather than
mutually distinguishable, and those three take a `steps` prop for how many buckets the ramp
holds.

⚠️ **`palette="nivo"` ignores `steps` on those three** : its sequential ramp is a fixed array
of four. Ask for `brand` when the number of buckets matters.

## Colours are resolved to hex, never `var()`

nivo emits theme colours two different ways — inline styles for texts, where `var()`
resolves, but *presentation attributes* for grid and axis lines, where it is not specified
to. Canvas cannot resolve `var()` at all. `useChartTheme` therefore reads the DaisyUI tokens
from the DOM and feeds resolved values, which keeps a single code path across both
renderers and follows the light / dark toggle without any work from the caller.

## The value printed on a mark

`BarChart`, `HeatMapChart`, `PieChart` and `PolarBarChart` print their figure **inside** the
mark, in the mark's own colour darkened — and over a light halo, so it stays legible on a
saturated fill.

That halo is light in *both* themes, deliberately : a halo has to contrast with the **text**
it surrounds, not with the page behind it. Taken from `base-100` it would outline dark ink in
dark and thicken the glyphs into a blot. `labelOutlineWidth` and `labelOutlineColor` on
`useChartTheme` are where it is tuned, `0` removing it.

## SVG or canvas

The seven charts with a `renderer` prop draw SVG by default. Switch past roughly **two
thousand marks** :

```jsx
<BarChart data={ data } renderer="canvas" />
```

What you give up is the DOM : no per-mark CSS, and — on `PieChart` — no halo behind the arc
labels, since the canvas path takes no component override. At two thousand arcs no label is
readable anyway.

## Weight, and `next/dynamic`

Measured with esbuild, minified and gzipped, React external :

| | |
|---|---|
| One chart (`BarChart`) | **141 kB** |
| Four charts (`Bar`, `Pie`, `Line`, `Radar`) | **175 kB** |

**The first chart is the expensive one** — it drags nivo's core, the scales and `chroma-js`
in with it — and each one after costs roughly ten. So the question is never "how many
charts", it is whether the page needs the first one at all.

Below the fold, load it lazily :

```jsx
const BarChart = dynamic( () => import( 'oihana-next-ui/components/charts/BarChart' ) , { ssr : false } )
```

`ssr: false` is not superstition : nivo's responsive components measure their parent, which
has no size on the server.

## The shared layer

Six pieces carry everything the twelve have in common. Reach for them directly when writing
a thirteenth — see [adding a chart](adding-a-chart.md).

| | |
|---|---|
| `ChartFrame` | The box, `role="img"`, the empty and loading states, and the legend |
| `useChartLayout` | Margin **and** axes in one pass — an axis derives its title offset from the resolved margin, which is why they are computed together |
| `useChartTheme` | The nivo theme from the DaisyUI tokens |
| `useChartLegend` | The `legend` prop resolved into what `ChartFrame` draws — a list of names, or a scale |
| `usePalette` | Categorical or sequential colours, memoised |
| `ChartTooltip` | The tooltip body, in DaisyUI classes rather than in restated hex |

`useChartLayout` dispatches on `kind` — `CARTESIAN`, `RADIAL` or `GRID`, exported from
`themes/charts/layout` — over three margin strategies. A chart declares *what kind of thing
it is* and gets the right one, instead of importing a builder itself.

## Accessibility

**An SVG chart is invisible to a screen reader without a text alternative**, and nivo's own
aria support is uneven across its packages — three of them accept only `role`. So the
attributes go on `ChartFrame` rather than on the nivo component, which makes them uniform
and independent of what each package implements.

```jsx
<BarChart data={ data } ariaLabel="Revenue per quarter, 2024 against 2023" />
```

`ariaLabel` is **recommended and warned about in development**, not enforced : pass it, or
`ariaLabelledBy` pointing at a visible heading. `role="img"` collapses the SVG internals into
one labelled image, which is what you want — hundreds of unlabelled paths are noise — and it
suits these charts because they are hover-driven rather than keyboard-interactive.

Two details that follow from it :

- **The role steps aside while the frame is empty.** Collapsing the subtree is right for a
  chart and wrong for a placeholder : it made the empty text unreadable, and would swallow
  anything richer put in its place.
- **The legend is drawn outside the role**, which is the second reason it left the SVG : as
  an ordinary list it is read as text.

## Recipes

### A chart in a card, sized by its width

```jsx
<Card>
    <CardBody>
        <h3 className="text-lg font-semibold">Turnover per billing company</h3>
        <PieChart
            ariaLabel     = "Turnover split across billing companies"
            arcLinkLabels = { false }
            aspect        = "1/1"
            data          = { rows }
            legend        = {{ values : true }}
            maxHeight     = { 420 }
            valueFormat   = { value => formatPrice( value ) }
        />
    </CardBody>
</Card>
```

`arcLinkLabels={ false }` reclaims the margin the leader lines needed and grows the circle ;
the legend under the chart names the shares and states their size, which is what the leader
lines were doing less well.

### A chart fed by an API

```jsx
<LineChart
    ariaLabel  = "Daily sessions over the last ninety days"
    data       = { data ?? [] }
    emptyLabel = "No session over that period"
    loading    = { isFetching }
    xScale     = "time"
    xAxis      = {{ legend : 'date' }}
/>
```

The frame keeps its size through all three states, so the page does not jump when the data
lands. `xScale="time"` formats the ticks in the active locale, and takes care of the one trap
worth automating : nivo needs a `format` to parse string dates and must **not** receive one
for real `Date` objects, and getting it wrong yields an empty chart with no error.

### Aligning something else on a chart's palette

```jsx
const colors = usePalette( { palette : 'nivo' , count : rows.length } )

<MetricLegend items={ rows.map( ( row , index ) => ( { … , color : colors[ index ] } ) ) } />
```

`usePalette` hands the colours back in the order nivo assigns them, so index `i` of one
belongs with index `i` of the other. This is how a hand-built legend, a table of the same
rows, or a set of sparklines stays aligned with the chart above it.

## See also

- [adding a chart](adding-a-chart.md) — the thirteenth, and the traps that cost the most.
- [`components/metrics`](../metrics/README.md) — the smaller readings, and `MetricLegend` /
  `MetricScale`, which the charts draw their legends with.
- `/lab/charts`, `/lab/circulars`, `/lab/grids` in the demo app — the twelve, running, with a
  palette picker.
