# Adding a chart

For the thirteenth. nivo has a good deal more than the twelve wrapped here — Bump, AreaBump,
Stream, TreeMap, Tree, Sankey, Sunburst — and each one is a couple of hours of wiring once
you know where the traps are.

This page is the traps. The shape of the group is in the [guide](README.md).

## 1. The package goes in **three** places

```jsonc
// package.json
"peerDependencies"     : { "@nivo/stream" : "^0.99.0" } ,   // the consumer's contract
"peerDependenciesMeta" : { "@nivo/stream" : { "optional" : true } } ,
"devDependencies"      : { "@nivo/stream" : "^0.99.0" }     // so the lab can render it
```

🚨 **Forgetting `optional` is the one that hurts.** npm 7+, pnpm and bun install plain peers
automatically, so every consumer would get every nivo package whether they draw a chart or
not — and the real damage is not the download. Two copies of `@nivo/core` mean two sets of
its React contexts, and tooltips and theming break in ways that take an afternoon to trace
back here.

**Declare what you import, not what you rely on.** `PieChart` lists `@nivo/arcs` even though
`@nivo/pie` already depends on it, because the wrapper imports `ArcLabelComponent` from it
directly. A package reached by name is a package to declare, whoever else installs it.

## 2. Read the real names before writing a line

```bash
ls node_modules/@nivo/stream/dist/types/
```

**They differ per chart, and a wrong key fails silently or at runtime**, never at build. Each
of these cost a debugging session :

- `LineChart` uses `seriesColor` and `series.color` — **not** `serieColor`.
- `RadarChart` takes `sliceTooltip`, not `tooltip`.
- `RadialBarChart` colours by **category**, not by serie — so the palette needs as many
  colours as there are distinct `x` values, and `data.length` is the wrong count.
- `HeatMapChart`'s cell datum says `serieId`, singular, where the line chart says `seriesId`.

The types folder is the source of truth. The website is a rendering of it, and it lags.

## 3. Wire the shared layer

```jsx
const theme  = useChartTheme( { overrides : themeOverrides } )
const colors = usePalette( { palette , count : resolvedKeys.length } )

const { margin : resolvedMargin , axisBottom , axisLeft } = useChartLayout
({
    kind : CARTESIAN ,       // or RADIAL, or GRID
    margin , xAxis , yAxis ,
})
```

**`kind` picks the margin strategy**, and picking the wrong one does not clip a label — it
quietly shrinks the plotted shape, which is far easier to miss.

| | For | What eats the box |
|---|---|---|
| `CARTESIAN` | Axes bottom and left | Axis titles, rotated ticks |
| `RADIAL` | Drawn in a circle, no axes | The labels drawn *outside* the shape |
| `GRID` | Labels above and to the left | The column and row labels |

⚠️ **`RADIAL` charts must declare `outsideLabels` when they draw any.** `RadialBarChart` did
not for months : its radial axis prints ticks outside the rings, and the room the in-SVG
legend happened to reserve was covering for it. The day the legend moved out, the last tick
was clipped by the frame.

## 4. Build the legend

`useChartLegend` wants the series names and the colours, **in the same order** — which every
chart already holds side by side, `usePalette` handing them back in the order nivo assigns
them.

```jsx
const legendProps = useChartLegend
({
    colors ,
    legend ,
    names  : resolvedKeys ,
    values : legendValues ,     // optional, and see below
})

// …
<ChartFrame legend={ legendProps } … >
```

**Memoise the names.** A `data.map( d => d.id )` written inline is a new array on every
render and defeats the hook's memo — the same identity trap as an inline `ignore` list or an
inline `overrides` object, met from a third side.

**Only pass `values` if the chart has an honest one.** It is off by default, but when a
caller turns it on the figure has to mean something : the datum's own on a partition, the sum
of the key over every index on a series chart, and **nothing at all** where neither applies.
`LineChart` and `RadarChart` deliberately pass none — summing a curve's `y`, or a profile's
values across axes that measure different things, produces a number rather than a total.
That is a judgement to make per chart, not a line to copy.

**A quantitative chart passes `scale` instead of `names`** :

```jsx
const bounds = useMemo( () => getValueBounds( data?.map( d => d?.value ) ) , [ data ] )

const legendProps = useChartLegend( { colors , legend , scale : bounds } )
```

nivo keeps the domain it computes to itself, so a legend drawn outside the SVG has to read
the data again — an explicit `minValue` / `maxValue` still winning where the chart has one.

## 5. The six wiring touch-points

The same list every component in this library follows, in order :

1. **Theme generator** — `src/themes/charts/…` if the chart needs one of its own. Most do
   not : the shared layer covers margins, axes, palettes and the nivo theme.
2. **Component** — `src/components/charts/XChart.jsx`. `'use client'`, `displayName`,
   `nivoProps` spread **last**, and `ChartFrame` around it.
3. **Demo** — a card in the matching `src/demo/charts/*Demo.jsx`.
4. **Lab page** — already there : `/lab/charts` (cartesian), `/lab/circulars`, `/lab/grids`.
   A new chart joins the page its `kind` belongs to rather than opening a fourth.
5. **Nav registry** — nothing to do, the three pages are registered.
6. **Locale** — nothing to do either, for the same reason.

Points 4 to 6 are free for a chart, which is the upside of the three pages being organised by
kind. Only 2 and 3 are real work.

**Published code uses relative imports only.** `src/components` and `src/themes` may not use
the `@/` alias — it does not survive publication. Demo and app code may.

## 6. Two decisions to take deliberately

**Does it print a value on the mark ?** If so, colour it from the mark darkened and let the
theme's halo do the rest — `labelOutlineWidth` is already on by default. But check what nivo
defaults `*TextColor` to first : `PolarBarChart` was printing its labels in `base-content` on
a coloured arc for months, because it enabled the labels without setting the colour and
nivo's own default reads the theme.

**Does it draw labels outside the shape ?** Then `outsideLabels : true`, and read § 3 again.

## 7. Before opening the pull request

- [ ] Package in **all three** places, `optional` included.
- [ ] Prop and datum names read from `dist/types/`, not from the website.
- [ ] `kind` matches what the chart actually draws.
- [ ] `ariaLabel` documented in the JSDoc — the development warning fires without one.
- [ ] `animate` forced off under `prefers-reduced-motion`, like its eleven neighbours.
- [ ] `loading` and the empty state pass through `ChartFrame`.
- [ ] A demo card on the page for its kind.
- [ ] **Bundled, not just linted.** Neither Biome nor a syntax check resolves imports — a
      mass refactor once broke an import in `LineChart` and nothing caught it :

      ```bash
      npx esbuild src/components/charts/XChart.jsx --bundle --packages=external --loader:.js=jsx --outfile=/dev/null
      ```

- [ ] An entry in `CHANGELOG.md` under `## [Unreleased]`, and the install table in the
      [guide](README.md#installing--nothing-is-installed-for-you) updated.

## See also

- [the guide](README.md) — what the group is, the contract, the legend, the palettes.
- `src/components/charts/BarChart.jsx` — the shortest complete example of the shape.
- `src/components/charts/PieChart.jsx` — the awkward one : two kinds of label sharing a
  single theme node, and what it took to give only one of them a halo.
