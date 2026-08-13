# `metrics`

Micro-visualizations : compact, dependency-free readings meant to sit **inside** a card, a
table cell or a list row rather than to fill a chart frame.

```jsx
import CategoryBar  from 'oihana-next-ui/components/metrics/CategoryBar'
import BarList      from 'oihana-next-ui/components/metrics/BarList'
import Tracker      from 'oihana-next-ui/components/metrics/Tracker'
import Sparkline    from 'oihana-next-ui/components/metrics/Sparkline'
import Delta        from 'oihana-next-ui/components/metrics/Delta'
import MetricLegend from 'oihana-next-ui/components/metrics/MetricLegend'
```

## What this group is not

- **Not `components/charts/`.** Those wrap nivo and carry its peer dependencies ; a chart
  has axes, a legend, a tooltip layer and a responsive container. Nothing here needs any of
  it — a sparkline is 80×24 pixels of SVG, and a tracker is a row of `<div>`s.
- **Not `components/progress/`.** `Progress` and `RadialProgress` mirror the DaisyUI
  components one to one : one value against a maximum. A `CategoryBar` is a *partition*, and
  a bullet is a value against *qualitative bands*. Reach for `Progress` when there is a
  single quantity to report and nothing to compare it to.

## The components

| Component | The question it answers | Reach for it when |
|---|---|---|
| `CategoryBar` | How is a whole divided ? | A budget across categories, a quota across plans, storage across file types |
| `CategoryBar` + `measure` | Where does this value fall ? | A bullet graph : a value read against poor / fair / good bands, with a target |
| `BarList` | Which items lead ? | Top pages, top referrers, top error codes — the everyday analytics panel |
| `Tracker` | What happened, event by event ? | Ninety days of uptime, the last fifty builds, a month of backups |
| `Sparkline` | Which way is it going ? | The trend next to a number, in a tile or a table cell |
| `Delta` | How much did it change, and is that good news ? | The variation under a KPI |
| `MetricLegend` | What do the colours mean ? | Under a category bar, next to a tracker, below a row of sparklines |

Everything is a client component (`'use client'`) and forwards `ref` plus any extra props to
its root element.

## The rules that hold across the group

**Colours take three forms**, everywhere, through the shared `resolveColor` helper :

```jsx
<CategoryBar values={ [ 60 , 40 ] } colors={ [ 'primary' , 'base-300' ] } />        {/* theme token   */}
<CategoryBar values={ [ 60 , 40 ] } colors={ [ 'bg-base-content/30' , … ] } />      {/* utility class */}
<CategoryBar values={ [ 60 , 40 ] } colors={ [ '#4E79A7' , '#F28E2C' ] } />         {/* any CSS colour */}
```

A **theme token** follows the DaisyUI theme and needs no dark-mode variant — this is the
default and it is what makes the group free of `dark:` classes entirely. A **utility class**
is how a *translucent* tint is reached (`bg-base-content/20` is no token, and as an inline
style it would be nonsense) ; it reads on any surface, in both themes. **Any other CSS
colour** lands as an inline style, which is how a component gets aligned with the palette of
a chart next to it.

**Size props are responsive**, scalar or per breakpoint : `size="lg"` or
`size={ { xs : 'xs' , lg : 'lg' } }`, where `xs` is the prefix-less default. Same for
`MetricLegend`'s `orientation`.

**Tooltips are DaisyUI's**, rendered through `::before` / `::after` — CSS only, no state, no
portal, no ninety React roots for ninety blocks. The price is that any `overflow-hidden`
ancestor clips them, which is why nothing in this group clips : segments round their own
corners, and a tracker drops the blocks that do not fit rather than hiding them.

**Data-driven components take `items` *or* the raw form**, never both — the shape used by
`Dropdown`, `Tabs`, `Stats` and `Steps`. `CategoryBar` takes `values` (numbers) or `items`
(named, which unlocks per-segment tooltips and the legend).

**The degenerate cases are handled, not left to divide by zero** : a zero total renders an
empty track rather than `NaN%` widths, negative values are floored, a value outside an
imposed domain is pinned to it, and `BarList` falls back to `EmptyState`.

## Recipes

### 1. The KPI tile

There is **no KPI component**, on purpose : `Stat` already documents both slots — `figure`
is "any node shown on the trailing edge", `description` is "usually a trend". The tile is a
composition, not a file.

```jsx
import Stats     from 'oihana-next-ui/components/stats/Stats'
import Stat      from 'oihana-next-ui/components/stats/Stat'
import Sparkline from 'oihana-next-ui/components/metrics/Sparkline'
import Delta     from 'oihana-next-ui/components/metrics/Delta'

<Stats direction={ { xs : 'vertical' , lg : 'horizontal' } }>

    <Stat
        title       = "Visiteurs"
        value       = "12 480"
        figure      = { <Sparkline data={ visits } colorByTrend showLast /> }
        description = { <Delta from={ 11_140 } to={ 12_480 } /> }
    />

    <Stat
        title       = "Taux d'erreur"
        value       = "0,8 %"
        figure      = { <Sparkline data={ errors } variant="area" color="error" /> }
        description = { <Delta from={ 1.4 } to={ 0.8 } inverted /> }
    />

</Stats>
```

Two things carry the weight here. `Delta`'s **`inverted`** says that falling is the good
news : it swaps the colours and *never* the arrow — the error rate shows a downward arrow,
in green. And `from` / `to` work the change out rather than leaving the caller to divide,
using the **absolute** starting value as the denominator, so a metric climbing back from a
negative baseline does not come out falling.

### 2. The bullet graph

Stephen Few's answer to the dashboard gauge. The bands are the qualitative ranges, the
measure is the value, the marker is the target.

```jsx
import CategoryBar from 'oihana-next-ui/components/metrics/CategoryBar'

import { QUALITATIVE_COLORS } from 'oihana-next-ui/themes/components/categoryBar'

const BANDS = [ 50 , 30 , 20 ] // poor up to 50, fair up to 80, good up to 100

{ [ 'sales' , 'margin' , 'satisfaction' ].map( key => (
    <div className="flex flex-col gap-1" key={ key }>
        <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium">{ labels[ key ] }</span>
            <span className="tabular-nums text-base-content/60">{ `${ actual[ key ] } / ${ target[ key ] }` }</span>
        </div>
        <CategoryBar
            colors  = { QUALITATIVE_COLORS }
            marker  = { { value : target[ key ] , tooltip : `Objectif : ${ target[ key ] }` } }
            measure = { actual[ key ] }
            size    = "lg"
            values  = { BANDS }
        />
    </div>
) ) }
```

Three of them on the same bands compare at a glance — which is the whole argument for the
shape, and what no round gauge does. Notes worth knowing :

- `measure` takes a number, or `{ animated, color, ring, tooltip, value }`.
- It turns `contiguous` on by itself : the gaps between segments are taken *on top* of their
  percentage widths, so a band announced at 60 % would end slightly left of the 60 % mark,
  while the measure lands exactly where the scale says. On a partition nobody notices ; on a
  bullet, comparing the tip of the measure to a band boundary **is** the reading.
- `max` extends the scale past the bands, and the remainder stays visible. It can only
  extend, never squeeze : a shorter scale would push the last band off the track.
- `QUALITATIVE_COLORS` are tints of `base-content` rather than `base-*` surfaces, which
  vanish on a card of the same tone. They are **not** the default — swapping a palette on the
  presence of a prop makes a component impossible to predict.
- Size `md` is the practical floor : the measure is half the track, and half of a thin track
  is a hairline.

### 3. The status page

```jsx
import Tracker from 'oihana-next-ui/components/metrics/Tracker'

const counts = key => days.filter( day => day.status === key ).length

<Tracker
    data       = { days.map( day => ( { key : day.id , status : STATUS[ day.state ] , tooltip : day.label } ) ) }
    endLabel   = "aujourd'hui"
    hoverEffect
    legend     = {[
        { name : 'Opérationnel' , status : 'success' , value : counts( 'up' ) } ,
        { name : 'Dégradé'      , status : 'warning' , value : counts( 'slow' ) } ,
        { name : 'Panne'        , status : 'error'   , value : counts( 'down' ) } ,
    ]}
    startLabel = { visible => `il y a ${ visible } jours` }
    summary    = "99,2 % de disponibilité"
/>
```

Ninety blocks across a phone leave each one about three pixels wide, so the track **measures
its own container** and keeps as many of the *most recent* blocks as fit at `minBlockWidth`.
The container, not the viewport : a tracker in a narrow side panel on a wide screen gets it
right, where a breakpoint would not. `startLabel` receives the number of blocks actually
shown, which is why it is a function.

The legend counts are computed by the caller on purpose : the strip drops what does not fit,
so a count derived by the component would describe either the period or the screen, and
never obviously which of the two.

### 4. The analytics panel

```jsx
import BarList from 'oihana-next-ui/components/metrics/BarList'

<BarList
    data           = { pages }              /* [ { name , value , href , icon } ] */
    loading        = { isLoading }
    onSelect       = { item => router.push( `/analytics?page=${ item.name }` ) }
    showPercentage
    valueFormatter = { value => `${ value } vues` }
/>
```

Bar widths are relative to the **largest value**, not to the total, so the leader always
fills its row and the shape of the distribution is what one reads. Pass `max` to impose the
scale instead : two lists sharing a `max` become comparable, which they never are when each
normalizes on its own leader.

One interactive element per row, at most : `href` makes it a link, `onSelect` makes it a
button when there is no `href`, and a row with neither stays inert. `loading` shows as many
skeleton rows as the data will have, so the panel does not jump when the query lands.

## Accessibility

The part no screenshot shows, and the reason these are components rather than snippets.

- **`CategoryBar`** carries `role="img"` with a label derived from the data — on the *bar*,
  not on the container, since a role collapses its whole subtree and the labels and legend
  are text worth reading on their own. With a `measure` it becomes a **`role="meter"`** with
  `aria-valuemin` / `aria-valuemax` / `aria-valuenow` / `aria-valuetext`. A native `<meter>`
  is not an option : it is a replaced element that draws a gauge of its own and would never
  paint the bands.
- **`BarList`** is an `<ol>` of `<li>`, with the bar `aria-hidden` — it is a decorative
  restatement of the value written next to it.
- **`Tracker`** is an `<ol>` too, with a label per block ; a strip whose blocks say nothing
  hides itself instead, since ninety unlabelled list items teach a screen reader nothing —
  the bounds and the summary carry the meaning in that case.
- **`Sparkline`** is hidden by default and becomes a described `role="img"` as soon as
  `ariaLabel` is given : a glyph with no text alternative is noise.
- **`Delta`** always writes the sign in the text, never in the arrow alone, which is
  decorative and hidden. `ariaLabel` adds context through an `sr-only` line rather than
  through `aria-label`, which a plain `<span>` does not expose.

## See also

- The live demos : `/lab/metrics` — one tab per component.
- `CHANGELOG.md`, whose `metrics` entries record why each decision went the way it did.
- The JSDoc in each file is the API reference : props, defaults and examples live there
  rather than in a table here, which would diverge within two commits.
