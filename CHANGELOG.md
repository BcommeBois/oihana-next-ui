# Oihana Next UI — Changelog

A modular Next.js UI component library built with React 19, Tailwind CSS v4 and DaisyUI v5.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

**Tooltip — the floating path obeys the placement it is given**

- **`float` and `position` / `align` used to be mutually exclusive, and the two halves of one need with them.** The CSS path escapes no overflow and obeys its placement ; the floating path escapes everything and obeyed nothing — `align` and `position` were read off the props and never forwarded, so a bubble asked for `bottom` opened above its trigger. The side was decided by one hard-coded preference for the top, which is why nobody had seen it : there is room above a trigger everywhere except at the very top of a window.
- **The two paths now read alike**, same names, same values, same meaning — which is what lets a bubble move from one to the other without being rewritten. Four sides and three alignments on both, with daisyUI's own semantics : the alignment slides along the inline axis under a `top` or `bottom` bubble and along the block axis beside a `left` or `right` one, and the tail sits the same half-rem from the matching edge.
- **A flip is a fallback, never a preference.** The side asked for is the side used ; the facing one is taken only when the window leaves no room there, and when neither side has any the bubble stays where it was sent and is clamped. Clamping along the other axis is not a flip either : the alignment asked for is honoured, then bounded — a bubble half off the screen is unreadable, and no alignment is worth that. **What the placement settled on is written on the bubble**, as `data-position` and `data-align`, so a fallback is a thing to look at rather than to guess.
- **`open` was being dropped too** — same three lines, same omission, and `<Tooltip float open>` simply never opened. It works, and it **follows the page** on scroll and resize : a hovered bubble is closed when the page moves under it, because the reader has left, but one held open has no such exit and a portaled element does not travel with its trigger.
- **The tail follows the trigger, which it did not.** It was nailed to the middle of the bubble, so it already pointed at nothing whenever the bubble was pulled back from an edge of the window — a defect older than this change, and one that `align` would have turned from an exception into the rule. It now follows the trigger when the bubble is centred on it, and sits at the aligned edge otherwise — daisyUI's own two regimes. Aiming at the middle of the trigger in every case does the opposite of what was asked on a trigger wider than its bubble : that middle falls outside, and the tail is pushed against the corner **facing** the edge that was aligned on.
- **`placeFloating` gained the horizontal axis and an arrow, and lost nothing.** Its defaults — above, centred — reproduce the previous arithmetic to the pixel, clamped bounds included, so the two callers inside the scheduler are untouched. It is still pure, still the whole of the placement, and still the only part of this that can be reasoned about without a browser.
- **The floating trigger shrinks onto its content, but only when the component chose the element.** DaisyUI declares `.tooltip { display: inline-block }`, so the CSS path never had this problem ; the floating trigger carries no class, and a bare `div` stretches to its container — the whole width of a table column, say, which is then the box the bubble aligns on. It is given that display back **unless `as` names the element**, because a caller who names one owns its display, and `.btn` is `inline-flex` in daisyUI's own stylesheet : turning it into something else silently would be this bug's own family.
- **`start` and `end` are edges of the reading flow rather than of the screen**, as they are in daisyUI's stylesheet, so they trade places on the inline axis of a right-to-left trigger. Read off the trigger rather than off the document — a right-to-left island in a left-to-right page aligns with what surrounds it — the way `useTimeDrag` already reads it.
- **Two things the floating path does not carry, now said out loud in its JSDoc** : rich `tooltip-content` children, which are the CSS path's alone — a floating bubble says what `tip` says, and such a child would be rendered inside the trigger, visible for good — and the opening transition, a portaled element having nothing to transition from.
- **The demo shows the four sides against the three alignments on the floating path**, and — the point the JSDoc can only assert — a table where the same badge is tooltipped twice, once through an anchor as wide as its cell and once through one that hugs the badge. The bubble aligns on the anchor ; which of the two is meant is the caller's to say, and no default can tell them apart.

**Charts — the legend leaves the SVG** *(the chantier, in four lots — all twelve charts)*

*Lot 4 — what the move made dead, removed.*

- **`themes/charts/legends` is gone.** Its presets translated a position into a dozen nivo fields — `anchor`, `direction`, `translateX/Y`, `itemWidth`, `symbolShape` — and nothing reads them any more. `resolveLegend` is the one piece that outlived them, the `legend` prop still taking the same four shapes it always did, and it moved into `themes/charts/legendItems` beside the builders that use it. **The module no longer exists at `oihana-next-ui/themes/charts/legends`** ; nothing in the library imported it but its own margin builders, and the guide had not been written yet to name it.
- **`LEGEND_SPACE` went with it, and so did the three legend branches of the margin builders.** `getChartMargin`, `getRadialMargin` and `getGridMargin` no longer take a `legend` at all. They took a band of 52 px out of the plot under the chart, or 132 beside it, before anyone knew how long the text would be — and that band had been hiding three placement defects, all of which surfaced and were fixed in the second lot.
- **`getChartLayout` and `useChartLayout` resolve a margin and axes, and no longer a legend.** Their `legend` and `continuousLegend` parameters are gone with the `legends` they returned. What is left is genuinely coupled : an axis derives its title offset from the resolved margin, which was always the reason the two were computed in one pass.
- **`AXIS_LEGEND_SPACE` stays, and is not the same thing** — it is the room an axis *title* needs, which no legend ever paid for.

*Lots 1 to 3 — the mechanism, and the twelve charts.*

*Lot 3 — the three quantitative charts, and the `MetricScale` they needed : `HeatMapChart`, `CalendarChart`, `TimeRangeChart`.*

- **A quantity is not legended by a list of names, so `MetricLegend` could not serve it.** `MetricScale` is the house component for it : the colour ramp as a row of bands, and the two ends of the range written under them. It lives beside `MetricLegend` in `components/metrics`, borrows its text sizes rather than restating them — the two sit in the same slot under the same charts and have to read alike — and takes the same theme tokens, so a scale can be aligned on the ramp of the chart next to it.
- **The bands are discrete, and that is not a stylistic call.** These charts hand nivo a `type : 'quantize'` and an *array* of colours, so a cell's colour is one bucket among N rather than a point on a ramp. A smooth gradient would have been prettier and would have misstated how the colours are handed out.
- **Only the two ends are written.** Five buckets have six boundaries, and printing them all turns a 224 px bar into a line of unreadable figures. The ends give the bar its direction, which is what a reader needs ; a `ticks` prop can add the rest the day somebody asks.
- **The bounds are read off the data, because nivo keeps the ones it computes to itself.** These charts let it work the domain out unless `minValue` / `maxValue` say otherwise, and a legend drawn outside the SVG cannot ask. `getValueBounds` walks the values once — an explicit pair still wins where the chart has one, and `TimeRangeChart`, which states none, always reads.
- **One `legend` prop, two shapes behind it.** `useChartLegend` returns a scale instead of a list when it is given one, and `ChartFrame` draws either in the same slot with the same four placements. A caller never has to know which kind its chart happens to be. The one thing that differs is the centring : `MetricLegend` is a flex row, where `justify-center` centres the entries, while `MetricScale` is a bounded column whose main axis is vertical and which `mx-auto` puts in the middle.
- **`CalendarChart` and `TimeRangeChart` keep `legend={ false }` as their default**, as they always had — a frieze of days is read without one. The lab card turns it on so the scale can be seen.
- **`MetricScale` has its own page in the metrics lab**, `MetricScaleDemo`, alongside `MetricLegend`'s : ramp, orientations, sizes, a scale with no bounds at all, and token colours against CSS ones.
- **Nothing reads `getChartLegends`, `getContinuousLegends` or `LEGEND_SPACE` any more.** All twelve charts are off them, and the `legend` and `continuousLegend` parameters of the three margin builders are now dead weight. They go together in the fourth and last lot.

*Lots 1 and 2 — the mechanism, and the nine categorical charts.*

*Lot 2 — the six circular charts : `PieChart`, `WaffleChart`, `PolarBarChart`, `ChordChart`, `RadialBarChart`, `RadarChart`.*

- **A partition states its own figure, a series chart states a total, and one chart states nothing.** `PieChart` and `WaffleChart` hold one datum per entry, so their legend value is that datum's — the only shape where it needs no summing. `PolarBarChart` sums its key over the twelve indexes, exactly as `BarChart` does, being that chart wrapped around a circle. And **`RadarChart` offers no automatic value at all**, for `LineChart`'s reason : a key carries one figure per axis and the axes measure different things, so adding a wine's `fruity` to its `bitter` yields a number, not a total.
- **`ChordChart` totals what *leaves* an entity, skipping the diagonal.** `data[ i ][ i ]` is a flow from an entity to itself : zero in a well-formed matrix, but counted it would inflate the figure with something naming nothing.
- **`RadialBarChart` was already building the list it needed and throwing it away.** Its `countCategories` walked every serie into a `Set` and returned only its size — because nivo colors radial bars by category rather than by serie, and that size is how many colors the palette must yield. It is now `readCategories`, returning the names *and* their totals from the same pass, on a `Map` so the order they were met in stays the order the palette is handed out in. The count is a `.length`.
- **The six grow like the three before them** — `getRadialMargin` reserved up to 132 px on a side for a legend that is no longer there.
- **The room reserved for labels drawn outside a circle is no longer the same on all four sides.** It was one figure, 56 px, on the reasoning that such labels stick out in every direction — true sideways, where the room has to hold a word, and wrong above and below, where a label sticks out by its *line height*. On a circular chart that error is not free : the shape is sized by whichever inner dimension is smaller, which in a box wider than it is tall is the height, so every over-reserved pixel top and bottom **shrinks the circle and leaves a visible band under it**. The vertical figure is now 24. It went unnoticed for as long as the legend sat inside the SVG, whose reserved room swallowed the excess ; drawing it in HTML took that room away and left the band in plain sight.
- **`RadialBarChart` had labels outside its shape all along and never said so.** Its radial axis prints ticks outside the rings and the serie names to their left, but it asked `useChartLayout` for no outside room — the 52 px reserved under the chart for the legend happened to cover them. Without it the last tick was clipped by the frame. It now declares `outsideLabels`, which is what it always was.
- **`ChartFrame` gains `maxHeight`, which is what makes `aspect` usable on a circular chart.** A radial shape takes its radius from the *smaller* inner dimension, so a box with a fixed `height` wastes on a phone exactly what it saves on a desktop : the circle shrinks with the width while the box keeps its height, and what is left over becomes two empty bands. A `ChordChart` at `height={ 620 }` on a 375 px screen drew a radius of 116 between **194 px of nothing above and 194 below**. With `aspect="1/1" maxHeight={ 620 }` the same card is 375 × 375 on the phone — 72 px above and below, 245 px reclaimed — and still 896 × 620 on the desktop, pixel for pixel what it was. Every circular card of the lab is on that pair now.
- **`maxHeight` is a new prop rather than `height` quietly becoming a ceiling.** Reading `height` as the cap of an `aspect` was the shorter change and the wrong one : the twelve wrappers each carry their own `height` default, so a caller passing `aspect` alone would have been silently capped at 400 — or at 420 on `MarimekkoChart` — by a number they never wrote. `aspect` keeps taking precedence over `height`, exactly as its JSDoc always said.
- **A half circle leaves a band no automatic margin can reclaim, and the lab card now says so with its arithmetic.** nivo centres the whole circle in the plot area and draws only the swept part, so a `startAngle`/`endAngle` pair spanning the top half leaves the bottom half empty by construction. Nothing in the margin builders knows the swept angles, so the room is taken back with a negative `margin.bottom` — the escape hatch meant for exactly this. The band left under the arc is **`( height - top + bottom ) / 2`, whatever the width** : the centre sits at the middle of the plot area and the plot area is pushed below the frame, while the radius stays capped by the width. Which is why a narrower screen only opens the gap *above* the arc and leaves the one underneath where it was — and why moving that band is moving one number.

*Lot 1 — the mechanism, and the three cartesian charts : `BarChart`, `LineChart`, `MarimekkoChart`.*

- **nivo placed its legend from three fixed numbers, none of which can know how long the text is** : the room reserved in the margin (`LEGEND_SPACE` — 52 px under the chart, 132 beside it), the width of an item (`itemWidth` 90), and the absence of any wrapping. A short name wasted a third of the plot, a long one collided with its neighbour, and a narrow screen clipped the row. Drawn in HTML the placement is flex rather than arithmetic, the text wraps, and nothing is guessed.
- **A migrated chart no longer asks the margin to reserve anything**, so the plot gets that room back — up to 132 px on the side, 52 underneath. **The three charts of this lot grow visibly.** That is the fix rather than a side effect, but it is the change to look at first.
- **The legend is drawn outside the `role="img"`, which is the second defect it fixes.** That role collapses everything under it into a single labelled image, so an in-SVG legend was never readable by a screen reader — only `ariaLabel` was ever announced. Out here it is an ordinary `<ul>`, read as text.
- **`ChartFrame` carries it**, being the one file all twelve charts pass through — and only when there is one : with no legend it renders byte for byte what it rendered before, no wrapper, which is what leaves the nine charts still to migrate strictly untouched.
- **The legend is placed in reading order, never flipped with `flex-*-reverse`.** In `top` and `left` it is written before the chart in the DOM, because a screen reader follows the DOM and not the painted layout. The four positions are four literal class pairs rather than one string built from the position — Tailwind v4 scans source text, and a class assembled from a variable never appears in it.
- **The `legend` prop keeps its shape** — `false`, `true`, a position, an object — and all four positions still work, `right` and `left` now being a flex row with the legend in `vertical`. What changes is what the object holds : `position`, `values`, `valueFormatter`, `marker`, `orientation`, `size`, `className`, `items` instead of nivo's `itemWidth` / `symbolShape` / `translateX`. The old escape hatch survives as `nivoProps={{ legends : [ … ] }}` for anyone who wants the in-SVG legend back.
- **`values` prints each series' total beside its name, and is off by default** — because what that total *means* is not the same from one chart to the next. On a partition it is the datum's own value ; on a series chart the sum of the key over every index, which is the right reading for a stack ; **and on a line chart nothing at all**, since summing the `y` of a curve is not a total of anything. `LineChart` therefore offers no automatic value, and `values` as a function `( name , index ) => value` covers every case the chart cannot answer for itself.
- **`LineChart` legends itself with a stroke rather than a dot.** A curve is named by a line — `MetricLegend` has had the three mark shapes from the start, this is the first caller to ask for another one. `legend={{ marker }}` overrides it.
- **An empty frame carries no legend**, even when its entries could be built : `MarimekkoChart` forces the empty state on an incomplete accessor while its `dimensions` are perfectly readable, and a legend under a "no data" panel names nothing.
- **What this costs, stated once** : a legend inside the SVG travels with the chart when it is exported as an image, an HTML one does not. There is no export in the library today ; the day there is, this is where it will be paid.
- **Under the chart is the house placement, and the demos now say so.** Eight cards across the three lab pages asked for `legend="right"` ; they all fall back on the default, which was already `'bottom'` on ten of the twelve charts. A legend beside the plot reads differently on a phone and on a desktop, and the point of moving it into HTML was to get one reading on both.
- **The four placements all stay, and the library picks none of them for the application** — including responsively. A breakpoint at which a side legend should drop underneath is a fact about the page the chart sits in, not about the chart, so it belongs to the caller ; guessing one here would have been a default nobody could see and everybody would have to undo. The `Line` card of the lab carries a selector that walks the four, `false` included, which is where they are tried rather than in eight cards each frozen on one.
- **`getChartLegends`, `getContinuousLegends` and `LEGEND_SPACE` are untouched and still in use** — nine charts read them. They go when the last caller does, in the fourth lot.


**Charts — the data labels get the halo the axis ticks have had all along**

- **The amount printed inside a bar, a cell or an arc now carries an outline**, the same treatment `buildChartTheme` has been giving the axis ticks since the charts shipped. nivo renders `outline*` as a stroked copy of the glyphs underneath (`@nivo/text`), so it reads as a halo rather than a backing plate and never masks the mark it is printed on. Two new parameters on `buildChartTheme` and `useChartTheme` say it : `labelOutlineWidth` (`2`, the figure the ticks already spend) and `labelOutlineColor`.
- **The halo of a data label is NOT the halo of a tick, and that is the whole point.** A halo has to contrast with the **text** it surrounds, not with the page behind it — and the two only coincide for the ticks. A tick is written in `base-content`, which flips with the theme, so `surface` is the right answer for it. A data label is written in the mark's own colour *darkened* — `darker 1.8` in `BarChart`, `darker 2` in `PieChart` and `HeatMapChart`, none of them the caller's to choose — so it is **dark in both themes, on a fill that is light in both themes**. Taken from `base-100` its halo would paint dark ink outlined in dark and thicken the glyphs into a blot, which is worse than no halo. It is light always, and slightly translucent so the mark still reads through the stroke : a fully opaque outline carves a white channel out of the arc it sits on.
- **The alpha is in the colour, not in `outlineOpacity`, and that is a constraint rather than a preference.** `drawCanvasText` only sets `strokeStyle` and `lineWidth` — it ignores `outlineOpacity`, which the svg path alone honours as `strokeOpacity`. `BarChart`, `HeatMapChart` and `PieChart` all have a `renderer="canvas"` branch, so an opacity spelled as a theme field would have given two different results depending on the renderer, silently. Hence `rgb(255 255 255 / 0.85)`.
- **Unlike the tick halo it needs no first-paint guard.** The tick one is held at width `0` until `surface` is resolved from the DOM, because a stroke in an unknown colour would outline the glyphs in whatever `currentColor` happens to be. The label halo waits on nothing : its colour is a literal, and the text it surrounds comes from the mark rather than from the theme.
- **`labels.text` is not the node of « labels sitting on a mark », which is the trap this had to be written around.** nivo reads that single node for the bar labels, the heatmap labels and the arc labels — but also for the **pie link labels** and the **chord labels**, which are written in `base-content` out on the page background, exactly like a tick. Left global, the halo would have circled light text in white in dark mode, in the two places it was supposed to protect from precisely that.
- **`ChordChart` therefore passes `labelOutlineWidth : 0`.** Every one of its labels sits outside the ring, and it has no label on a mark to lose. One line, and the caller's own `theme` overrides still merge last.
- **`PieChart` takes its halo off the theme entirely and puts it on the arc label itself.** It draws both kinds from that one node, and a halo the leader labels also take is not a trade worth making : they are light text on the page background in dark mode, and a light halo does not thicken them, it **erases** them into a white pill. So the chart passes `labelOutlineWidth : 0` — leader labels back to plain text, like an axis tick — and the labels inside the arcs get theirs from an `arcLabelsComponent`. `arcLabelOutline={ false }` removes it.
- **That component is nivo's own arc label in a `<g>` that carries four inherited paint properties**, not a label layer rewritten by hand. `stroke`, `stroke-width`, `stroke-linejoin` and `paint-order` all inherit, so the wrapper reaches the label's `<text>` and nothing else — no other element is inside it — and `paint-order: stroke fill` puts the stroke behind the fill, which is the whole difference between a halo and a smear. It is what nivo does by drawing a stroked copy underneath, expressed in one element instead of two. `@nivo/arcs` joins the optional peers to name what was already installed : every `@nivo/pie` depends on it.
- **The canvas renderer takes no component and therefore has no halo there.** It is the renderer past a couple of thousand arcs, none of which carries a readable label, and buying it back would have meant giving the leader labels the halo again.
- **`PolarBarChart` printed its labels in `base-content` on a coloured arc**, alone among the four charts with labels on marks : it enables `arcLabels` without setting `arcLabelsTextColor`, so nivo fell back to its own default, which reads the theme. It takes `darker 1.8` like `BarChart`. That is a **visible change** wherever `arcLabels` is on, and a legibility defect fixed on its own account — the halo would have been useless over text that flips with the theme.
- **`MarimekkoChart`, `WaffleChart`, `RadialBarChart` and `RadarChart` are untouched**, and the reason is worth recording : the first two never route their text through `@nivo/text`, so an outline in the theme would be inert ; `RadialBarChart` ships `enableLabels: false` ; and `RadarChart` writes its captions in `axis.ticks.text`, which has had its halo from the start.
- **The `PolarBar` demo now draws its labels**, with an `arcLabelsSkipRadius` that keeps the thinnest bands out of it — a change of default that no page exercises is a change nobody can look at.


## [0.14.0] — 2026-08-22

**Metrics — the bars of a `BarList` can grow in, one after the other**

- **`reveal` starts every bar at nothing and lets it grow to its width**, each row leaving `revealStagger` milliseconds (60 by default) after the one above it. Off unless asked for. It is not a new animation : it is the `transition-[width]` `animated` already used, started from zero — the two describe the same movement at two different moments, and the second costs what the first cost, which is nothing.
- **`revealFade` adds a fade of the whole row** — label and value included — to the bar growing under them. Off by default, and deliberately a second switch rather than part of the first : the bar is the data, and a value column that fades on every arrival pulls the eye to the numbers rather than to the shape they make. The row obeys the same discipline as the bar, the frame that hides it being instantaneous and only the frame that brings it back carrying a transition, and it leaves on the same delay so the two read as one arrival.
- **No animation library was pulled in, and `StaggerList` could not be reused.** The existing motion helper wraps each child in a `motion.div`, and a `BarList` is a **subgrid** — the `<ol>` sets the columns, each `<li>` inherits them through `grid-cols-subgrid`. An intervening `div` becomes the grid item in the `<li>`'s place, the columns fall out of alignment, and `<div>` is not a valid child of `<ol>` either. The pattern was reused, the component could not be.
- **Changing how the entrance looks replays it**, as does turning it on : `reveal` and `revealFade` are part of what identifies one pass, so a list does not wait for the next occasion to show what was just asked of it.
- **Two triggers, one automatic and one manual.** `loading` falling back to `false` replays the entrance — that is the shape of an API call, and it means nothing has to be wired for the common case. `revealKey` replays it whenever its value changes, for everything that never raises a loading flag. Mounting the list plays it too, being a first appearance.
- **A change of `data` deliberately does *not* replay it.** A parent writing `data={ items.map( … ) }` builds a new array on every render, so a list restarting on identity would never stop. Rows are keyed on `key ?? name`, so re-sorting an unchanged list stays still as well.
- **The frame that pins the bars back to nothing is the one frame they must not animate.** On a first appearance there is no previous width and nothing can transition, but on a replay the bars are already full : reset with the transition in place, they ease *down* to zero — staggered — while the next frame is already asking them to grow, and two contradictory transitions fight over the same property. The reset is therefore instantaneous, `animated` included, which is what `still` says in `getBarListBar`.
- **The per-row delay is an inline style, not a `delay-*` class.** Built from an index, such a class never appears literally in a source file, and Tailwind v4 — which scans source text — would never emit it. The same trap as the pattern safelist, met from the other side.
- **The delay is dropped once the entrance is over**, at `stagger × (rows - 1) + 500 ms`. Left in place it would stagger every later value change too, which is nonsense for a refresh : a reveal is an arrival, an update is not.
- **Ignored under `prefers-reduced-motion`**, through the `useMedia` the charts already use.

**Application — the `<body>` stops repainting its own children**

- **`*:text-base-content` is gone from the root layout, and nothing replaces it.** It did not colour `<body>` and let the page inherit : it compiled to `.\*\:text-base-content > *` and **imposed** the colour on every direct child as a declaration of that child's own. It had been there since the first commit, with no reason on record.
- **DaisyUI already colours the document, one level higher.** Its base layer ships `:root,[data-theme]{background-color:var(--root-bg);color:var(--color-base-content)}`, and the plugin is configured with `root: ":root"`. `<html>` is therefore already `base-content` and the whole tree inherits it — `<body>`, its direct children, and every portal with them, since CSS inheritance follows the DOM and not the React tree.
- **From there the rule could only be a duplicate or a defect, never a gain.** A child asking for no colour already inherited the same value ; a child asking for its own met a declaration of equal specificity on the same property, settled by stylesheet order — and Tailwind v4 emits variant utilities *after* plain ones, so the `<body>` won. That is what cost `SplashScreen` two `!important` before 0.13.0 : the `!` was buying order, not specificity. **The symptom was removed then, the cause only now.**
- **The blast radius was always one level deep.** Only the direct children of `<body>` were ever concerned — the splash overlay, the dashboard root, and whatever portals onto `document.body` (`Popover`, `Modal`, `SidePanel`, `InputColor`, toasts). None of them sets a text colour on its portaled root today, so this is expected to change nothing on screen. That is the point : a trap is removed, not a behaviour.
- **The neighbouring `bg-base-100` is deliberately kept.** DaisyUI gives `:root` the same `--root-bg`, but a background is painted rather than inherited, and a `<body>` that paints nothing lets the one behind it show through — which the scroll gutter and the overscroll bounce can make visible. That is demonstrable, not deducible, so it was left alone.

**Tooltips — a disabled flag stops talking**

- **`FlagItem` showed its tooltip over a flag that could not be clicked.** Its `Tooltip` was given `show={ showTooltip }` and never looked at `disabled`, so hovering a disabled flag still opened the bubble. It now reads `show={ showTooltip && !disabled }`, the wording already in place in `Button`, `LinkButton` and `MenuLink`.
- **The bubble opens on the wrapper, which is why a disabled trigger cannot stop it.** DaisyUI's rule is `.tooltip:hover`, and `.tooltip` is the element *around* the control ; meanwhile `.btn:is(:disabled,[disabled],[aria-disabled=true])` takes `pointer-events: none`, so the pointer passes straight through the button and lands on the very wrapper that opens the tooltip. Disabling a control therefore does not quiet its bubble — **it hands the hover to it**. `FlagItem` put `pointer-events-none` on its own `<a>` as well, which made the path certain rather than incidental.
- **`FlagMenu` inherited the defect wholesale**, since it passes its `disabled` down to every flag : a language menu switched off kept naming each of its languages under the cursor.
- **The rest of the library was audited and holds.** `Button`, `LinkButton`, `MenuLink` and `InputTime` already pass their state to `show`, and `LangDropDown` is closed by `hasMultiple`. `InputAction` is silent too, but for another reason worth writing down : its `tooltip` classes sit **on the disabled `<button>` itself**, which `pointer-events: none` makes unhoverable — there is no wrapper to catch what the button refuses.
- **No new prop was added.** A `disabled` on `Tooltip` would only be `show` negated and spelled differently ; the rule is stated in the JSDoc of `show` instead, where the next caller wrapping a disabled trigger will meet it.

## [0.13.0] — 2026-08-19

**Application — the three spellings of one workaround are gone**

- **Five places wrote a pattern by hand and then repaired what it broke, each in its own dialect** : `text-base-content/10 *:text-base-content` in the sidebar, `**:text-base-content` in the navbar — every descendant, not merely the direct children — `text-base-content/20! *:text-base-content!` in the splash screen with two `!important`, and `*:text-base-content` beside `pattern-topography` on the home page and in the JSDoc example that copies it. Three spellings, one problem : the tint a pattern needs was landing on the element, and the content was inheriting it. They now say `after:text-base-300/20` and nothing else, the same way the generator does since patterns started tinting their own pseudo-element.
- **The `!important` in the splash screen made no sense until the `<body>` was read.** Nothing in `SplashScreen` competes for a text colour — its root gets `cn( 'flex grow flex-col min-h-screen' , className )` and no more. The fight came from one floor up : `<body>` carries `*:text-base-content`, which lands on the splash root, and two `text-*` utilities of equal specificity are settled by stylesheet order. The `!` was buying that order. Once the tint moves to `after:`, the two utilities no longer touch the same property and the `!` has nothing left to win — **its removal is the clearest signal the conversion took**.
- **The `<body>` keeps its `*:text-base-content`, deliberately.** It carries no pattern, so nothing here makes it removable, and a rule whose purpose is not established is not a rule to delete on the way past. It is named here so the next reader starts where this one finished.
- **The navbar is the one to look at twice.** `**:` forced *every* descendant to `base-content`, including any that asked for another colour and lost the tie. Dropping it can give those colours back — an improvement, and still a visible change.

**Navbar — the tooltips of the top bar stop leaving the window**

- **A bar pinned to the top of the window opens its tooltips upwards, into nothing.** The fullscreen and theme buttons carried a name from the accessibility sweep, and a name in a bubble that renders off-screen is a name nobody reads. They open **downwards** now, and **end-aligned** : `tooltip-end` cancels the centring transform and pins the bubble's inline-end edge to the trigger's, so it grows leftwards from a control that already sits at the end of the bar and cannot run past the edge. The property is logical, not physical — in RTL it flips to the other side, which stays right for a button that flips with it.
- **It is set where the buttons are placed, not inside them.** Neither button is inherently a top-right button — they are used in the lab pages too, where opening downwards-and-left would be arbitrary. Placement is a fact about the surrounding bar, so it is stated in `Navbar`.
- **`LangDropDown`, between the two, gets the same line although it never showed the defect** : its `tooltipPosition` already defaulted to `bottom`, which is why it never opened upwards — but its alignment was centred and free to overflow to the right. The three now state the rule together, rather than one of them quietly relying on a default the others do not share.
- **The floating tooltip was not needed.** `Tooltip` has a portaled path written precisely because the daisyUI bubble is blind to the edges of the window ; pinning the end edge of a bubble to a trigger already at the end edge removes the question instead of computing an answer to it, and it costs no portal.

**Effects — a pattern no longer tints what sits on top of it**

- **The tint moves from the element to the pseudo-element the pattern is actually painted on.** `getPatternColor` returned `text-base-content/20` ; it returns `after:text-base-content/20`. The plugin fills a `::after` with `background-color: currentColor` and masks it with the SVG, so that colour was only ever there to feed `currentColor` — but it sat on the element, where `color` is inherited, and **every child came out at the opacity of the pattern**. At `/20` that is very nearly invisible, which is how it was found : a demo cell with two lines of perfectly ordinary text that could not be read.
- **The two rules never meet, and that is the whole reason this shape was chosen.** The obvious fix — `after:bg-*` — sets `background-color` on the same pseudo-element the plugin already sets `background-color` on : same specificity, same target, and the winner decided by where Tailwind happens to order two utilities. `after:text-*` sets `color` instead, which `currentColor` then resolves against. Different properties, no race, nothing to verify in a browser about which one landed.
- **The safelist is not optional here, and the old behaviour was surviving by accident.** The colour is built from a base name and one of three opacities, so it never appears literally in any source file — and Tailwind v4 scans source *text*, comments included. `text-primary/20` existed in the build for exactly one reason : it is quoted in a JSDoc `@example` further up the same file. The classes are now listed in full in a trailing table, the way `themes/effects/shadow.js` lists its shadows — sixteen colours by three opacities, which is every value `getPatternOpacity` can return.
- **A custom `color` has to be scoped the same way** — `after:text-base-300/20`, not `text-base-300/20` — and the JSDoc says so where the option is documented.
- **The demos drop the workaround added a lot ago.** Their patterned containers hold plain text with no colour of its own again, which makes them the place the defect would reappear first.
- **The six hand-written workarounds in the application are untouched, deliberately.** `*:text-base-content` in the sidebar, the app layout and the home page, `**:text-base-content` in the navbar, `*:text-base-content!` in the splash screen — three spellings of the same fix for the same problem. None of them calls `getBackgroundPattern` : they are literal class strings, they keep working exactly as they did, and converting them is a change to the application's own chrome rather than to the library.

**Config — the sidebar's settings now describe the sidebar**

- **`SidebarConfig` documented seven properties ; `Sidebar` reads three.** `backgroundColor`, `backgroundPattern`, `shadow` and `width` were named in the typedef and read by nothing — the fossil of a design that went another way, since the object right underneath expresses all four in its `className` (`bg-base-200`, `w-8/12 lg:w-68`, `pattern-lines-diagonal-right`). Meanwhile `className` and `swipe`, the two keys the component actually uses, were **not documented at all**. The typedef says what is read now, and the reason the surface travels as a class is written down beside it — `navbar` and `splashScreen` do the same, so there is one way to say it and it is a Tailwind class.
- **`version={ { show: false } }` was in the JSDoc example and did nothing.** `<Version />` was rendered unconditionally, and `version` was not even destructured. That is worse than an undocumented option : it is a promise the documentation teaches. `Sidebar` honours it now, on the exact shape it already uses for `navigation`, with `show` defaulting to `true` so nothing moves for anyone who never set it. **`show` exists nowhere else** — `Version` reads its own `ui.version` but has no way to be hidden — which is what made this one worth wiring rather than deleting.
- **`logo` and `homePath` are gone from `Sidebar`, and that is the opposite decision on purpose.** They were accepted and ignored just like `version` — but `Logo` reads `ui.logo` itself and already has `show`, `href` and `className`, so honouring them would have been a *second* address for one thing, needing a rule for which wins. The same reasoning that deleted the four ghosts deletes these two. Nothing changes at runtime : they were ignored before and they are absent now. The `LogoConfig` / `LogoProp` typedefs went with them — a duplicate of what `@configs/ui/logo.js` owns — and the JSDoc example says where the logo is configured instead of showing a property that never worked.
- **Two `noUnusedVariables` errors leave the file with them**, which is how the third case was found at all : the lint had been reporting `logo` and `homePath` as dead the whole time.
- **Found on the way, and it earns the pattern lot its keep** : the tint of a background pattern is worked around by hand in **six** places, in three different spellings — `*:text-base-content` in the sidebar, the app layout and the home page, `**:text-base-content` in the navbar, and `*:text-base-content!` with an `!important` in the splash screen. None of them goes through `getBackgroundPattern`, so they are literal classes that a fix in the generator would not touch — which makes that fix smaller than it looked, not larger.

**Layouts — two properties that were documented and did nothing**

- **`elevation` and `backgroundPattern` were declared, typed in the JSDoc and forwarded to the generator by all four of `Grid`, `Flex`, `Masonry` and `Layout` — and `getLayoutClassNames` destructures a fixed list with no rest parameter, so neither name was in it.** They fell on the floor. No class, no warning, nothing in the DOM. `git log -S` dates them to `c3495f1 First commit` : they have never worked once. **A prop that throws is found in a minute ; a prop that silently produces nothing gets blamed on the Tailwind scanner, on the cascade, on the theme** — anywhere but on the twenty lines of destructuring that never mentioned it.
- **`elevation` becomes `shadow`.** Every other layout property carries the name of the theme module that serves it — `backgroundColor`, `borderRadius`, `gap`, `overflowX`. `elevation` was a Material word with no `elevation` module behind it, and the reader had to guess which of the two shadow generators it meant. Nothing breaks in the renaming, for the exact reason this entry exists : the old name never emitted a class, so nobody can be depending on it.
- **`shadow.js` and not `dropShadow.js`.** `drop-shadow-*` is a filter that follows the alpha of the shape — it is for a glyph, an icon, a cut-out PNG. A layout container is a rectangle, and asking for a filter on it buys a compositing layer to draw the shadow `box-shadow` already draws.
- **The documented type was wrong too.** `{string|number}` — and a number is rejected by `shadows.includes( value )`, which returns `{}` without a word. The set is the eight Tailwind sizes plus `true` for the bare `shadow`, and that is what the four components now say.
- **What comes free with `getShadow` is the pseudo-classes** : `shadow={ { value : 'sm' , hover : '2xl' } }` is a card that lifts under the pointer, written once and passing through the same `getPseudoClassDefinition` as every colour in the library.
- **`backgroundPattern` could not be wired the same way, and that is worth saying because the naive version looks right.** `getBackgroundPattern` returns a **class string**, not a class-definition object like every other generator here. Spread into the object literal by `applyIfDefined` it would have become `{ 0 : 't' , 1 : 'e' , 2 : 'x' … }` — one key per letter, and a fistful of single-character classes in the markup. It travels as its own argument to `cn()` instead, beside `beforeClassName` and `className`.
- **Its position among those arguments is a decision, not an order of writing.** A pattern emits a tint of its own — `text-base-content/20` — and `textColor` emits a `text-*` in the same tailwind-merge group, where the last one wins. The pattern goes **first**, so a `textColor` stated by hand beats the colour the pattern picked for itself. Whoever wants the opposite has the object form, `{ pattern , color }`, which says the tint explicitly.
- **`Table` gains both without a line being written for it**, `getTableClassNames` spreading `...layoutProps` like the others — which is the argument for fixing this in the shared generator rather than four times in four components.
- `/lab/flex` and `/lab/grid` each gain a **Shadow & Background Pattern** section : the scale, the hover form, a pattern on its own, and a pattern given a base colour.
- **`GridItem` gets them too, and it had to be asked for.** It destructures its properties explicitly rather than spreading a rest into its generator — which is a deliberate design and not an oversight, since a cell chooses what it exposes — so the shared fix reached it through no door. On a cell the two properties say something a container cannot : *this* tile is raised, *that* one is textured, which is the difference between a flat bento and one with a lead tile. `/lab/grid` shows exactly that, and the page's props table gains both.
- **A patterned container tints its own content, and that is worth knowing before it is met.** The plugin paints the pattern on an `::after` in `background-color: currentColor` and masks it, so the colour class exists only to feed that `currentColor` — and it sits on the element, where **everything inside inherits it**. Text dropped into a patterned container with no colour of its own comes out at the opacity of the pattern, which at `/20` is very nearly invisible. It is said now in the JSDoc of `getBackgroundPattern` and on the page where it is met, and the demos state their colours. **The real fix is a candidate for its own lot** — colouring the pseudo-element with `after:bg-*` rather than the element — and it turns on a cascade order that has to be seen in a browser rather than reasoned about.
- **One neighbour is deliberately left for its own lot** : [`@configs/ui/sidebar.js`](src/@configs/ui/sidebar.js) documents a `backgroundPattern` that nothing reads — the same defect, one floor up, and one that wants an audit before a line is written.

**Layouts — `GridItem`, a cell that can say where it sits**

- **`Grid` has always described the container and nothing described the child.** Columns, rows, flow, gaps, alignment — all of it was there, and then a cell that had to cover two columns fell back to a literal `col-span-2` written in the calling code. The demos are where it shows : the « Grid as Article » block of `/lab/grid` was building a header-main-sidebar-footer layout out of hand-written classes, which is exactly the layout a grid component is for. It builds it out of `GridItem` now.
- **The work had been started and left.** `themes/layout/colSpan.js` was already written — responsive, validated, its Tailwind safe-list table typed out in full at the bottom of the file — and imported by **nothing** : no component used it, and `themes/layout/index.js` did not even export it. In the same vein `getLayoutClassNames` has carried `alignSelf`, `justifySelf` and `placeSelf` from the start, three properties that only mean something on a grid or flex *child*, with no child component able to reach them. This lot is mostly the act of connecting what was already built.
- **Three generators join it** — `rowSpan`, `colStart`, `rowStart` — on the exact patron of `colSpan` : a `create( value , { prefix , important } )`, an exported array of valid values, `getResponsiveDefinition`, and the safe-list table in a trailing comment, which is the convention of `themes/layout/` where `themes/border/` and `themes/components/` use a `@safelist` block in the JSDoc.
- **The ranges are deliberately asymmetric, and the reason is a cost somebody else pays.** `colSpan` reaches 12, `rowSpan` stops at 6 ; `colStart` reaches 13, `rowStart` stops at 7. Every one of these classes is emitted for six breakpoints whether an application uses it or not, and it lands in the bundle of **every consumer scanning `node_modules`** — 180 new classes here, 252 for the symmetric version. Twelve columns is a grid convention ; seven rows is not a layout anyone has asked for. **The start values go one past the spans on purpose** : twelve columns have thirteen grid lines, and the thirteenth is the only way to pin a cell to the right edge.
- **Classes rather than CSS variables**, which is how some libraries carry spans and how this one will not : an inline `style` cannot hold a media query, so a span expressed as a variable is a span that cannot be responsive. The safe-list is the price of `colSpan={ { xs: 1, md: 2 } }` working at all.
- **`getGridItemClassNames` prepends no base class**, where `getGridClassNames` prepends `grid`. A container is a grid by definition ; a cell is whatever display it is given.
- **`as` takes a component, so `<GridItem as={ Card } colSpan={2} rowSpan={2} />` is the whole of a bento card** — placement on the cell, shell on the card, card props travelling through `rest`. It is the reason no `BentoCard` was written : `Card` already has the figure, the `image-full`, the title, the actions and the heading level, and a second component wrapping it would only have had a `className` to add.
- **New `container`, off by default.** Spans answer to the viewport — a four column grid only exists past `md` — but a cell's *content* answers to the cell : a 2×2 hero and a 1×1 cell sit at the same viewport width and at two very different widths of their own. `container` opts the cell into a container query so its content can respond in `@md:` instead of `md:`, which is the lesson the scheduler chantier already paid for. It stays opt-in because a containment context has side effects nobody asked for.
- **`colStart` / `rowStart` and `flow="dense"` move a cell on screen without moving it in the DOM**, and the DOM is what a screen reader reads and what the tab key follows. That is said in the JSDoc and on the page rather than left for someone to discover : reorder the children when you can, and place them only when you cannot.
- **`/lab/grid` gains a `Grid Item` section** — spans, explicit placement including a deliberate overlap, the responsive form, the same six cells with and without `dense` so the backfilled hole is visible, cell alignment, a real bento of `Card`s, and two cells at one viewport width proving what `container` is for.

**Accessibility — every icon-only button now says what it is**

- **A sweep of all 103 buttons in `src/components` and `src/display`**, comments and JSDoc excluded. Most carry their name as visible text and needed nothing ; `Button` has emitted `aria-label={ title ?? i18n.title }` all along, so the mechanism was never missing — what was missing was a handful of components never filling it.
- **`FullscreenButton` and `ThemeButton` had no accessible name at all.** Two swaps of two icons with no text : announced as « button », full stop. Each now carries a default `path` — `components.buttons.fullscreen` and `.theme` — on the very pattern the eleven existing button locales already use. The theme toggle says what it **does** rather than what it will become : « Basculer le thème » is true in both directions, where « switch to dark » would be wrong for the frame before the theme is known, and a name that changes under a focus is one a screen reader may read twice.
- **`Alert`'s close cross** gets a name too, with `closeLabel` and `path` to override it — `Modal` and `Popover` had theirs, the alert did not. The glyph is `aria-hidden`, and the label goes on both `aria-label` and `title` : one for a screen reader, the other for a pointer.
- **A `DockItem` hiding its label** rendered its icon alone. The label it was already given is now read out when it is not printed — and left alone when it is, since a name repeating the text beside it is said twice.
- **`DisplayDropDown`'s trigger** had a native `title` only, which is a fallback name rather than a stated one. It now carries both.
- **The JSDoc examples of `Button` and `ListRow` taught the defect** — `<Button icon={ MdSearch } shape="circle" />` with nothing naming it is what gets copied. They name their buttons now, and the one that is icon-only says why.
- **No development-time warning was added**, deliberately : the convention that a concrete button ships a default `path` is already followed nine times out of nine — `LessButton`, `MoreButton` and the seven built on `MotionButton` all carry theirs, which reaches `Button` through the wrappers untouched. `InputButton` and `MotionButton` are generic bases and stay unnamed on purpose : their name belongs one level up, where the button knows what it does.

**Components — `Calendar` — a month that fills what it is given**

- **A day cell is no longer a fixed square.** `btn-square` sets width *and* height in pixels, so a month shrink-wrapped and could never be given a width : put in a wide card it sat against the left edge, and the `SlotPicker` built last week had to centre it as a consolation. The seven columns are now `minmax( var(--cal-cell-min) , var(--cal-cell-max) )` and the cell takes its column, square by ratio.
- **The floor is measured, not chosen.** `.btn-sm` sets `--size: calc( var(--size-field) * 8 )` and `.btn-square` makes that the width, so the floor is written as that same calculation rather than as `2rem` — it keeps following the theme, exactly as `rounded-field` does. **It is what guarantees the non-regression** : where nothing imposes a width — the `w-fit` panel of a picker's popover — a `minmax()` track reports its min, so the grid falls back to seven of these and the calendar is pixel-for-pixel what it always was. The three pickers were not touched.
- **New `cellMax` and `cellMin`**, carried as **CSS variables on the root rather than as generated classes** : a class holding a computed length has to survive the scanner that emits it, and a value coming from a prop never does — the reasoning `Aura` already follows for its duration. A number is pixels ; anything else passes through.
  - **Setting `cellMax` to the floor stops the month growing**, which is how the behaviour is turned off. One prop, two uses, and no second switch to explain — a boolean would have been wrong anyway, since the `SlotPicker` wants the month fluid *when it is stacked* and natural beside its slots, which is a container query and not a flag.
- **Three things had to follow, and none of them is optional** — they are defects the change itself creates. The **quick month and year grids** lose their fixed `sm:w-60`, which would have made the panel shrink the moment the header was clicked and jump back on picking ; **two months share the width** they are given rather than the first taking it ; and the cell drops `.btn`'s own `height` and `padding-inline`, without which it comes out wider than it is tall.
- **Two months sit further apart.** One rem was enough between two content-sized months ; now that each fills its half, the space between them is all that tells the eye where one ends and the next begins.
- `/lab/dates` gains a **Width** section : a box to drag wider, the same month at three ceilings including the one that switches it off, and the two-month case at full width.

**Components — `scheduler` — what is *free*, which is a different question**

- **New `helpers/schedule/computeFreeSlots`**, pure, verified with 27 assertions. Every other module of this family reads what is scheduled and places it ; this one reads the same two things — the hours something is open, and what already sits in them — and answers with the gaps. **Booking an appointment is not editing an event** : there is nothing to edit yet, and the whole problem is finding where the new thing may go.
  - **It consumes `OpeningHoursSpecification` through the lot-8 reader**, unchanged. A second way to say « open on Tuesdays from nine to six » would be two of them to reconcile the first time a payload said it once.
  - **Silence is not an opening.** A resource declaring no hours gets **no slots at all** — the timeline shades the complement of what is declared and therefore shades nothing when nothing is said, but offering an appointment needs the opposite, a *positive* statement. Without one, three in the morning is bookable. **`defaultAvailability`** says « nine to six » once, for everything that stayed silent.
  - **The buffer inflates what is taken, never the opening bounds.** A quarter of an hour of cleaning after a booking is not a quarter of an hour of cleaning after the doors open — taken off the bounds instead, it would eat the first slot of the day, which nothing precedes. There is an assertion whose only job is to catch that.
  - **A slot starts at the opening, not at the round hour** : a room opening at 09:10 offers 09:10, 09:40, 10:10. Rounding would invent a rule the data never stated, and lose the first slot doing it. And **a slot that would run past closing is not offered** — the half of this class of bug that everyone writes and nobody tests.
  - **`granularity` is separate from `duration`.** Finer, the candidates overlap : deliberately, and that is what real booking systems do. Equal, they follow one another — the default, and the simple case.
  - **`now` is a parameter and the clock is never read inside.** A pure function reading the time is neither testable nor replayable, and reading it while rendering is a hydration mismatch on every load — the lesson `useNow` carries. `lead` adds the notice an application requires.
  - **`computeFreeSlotsByResource`** answers the same question of several rows at once, because the busy list has to be split per resource first — which is where the mistake is otherwise made. Each row is read for **its own** hours, so a workshop opening at two simply starts later with nothing to declare, and a row with nothing free **stays in the answer** : « that room is full » is an answer.
- **New `SlotPicker`** — a month, and the free slots of the day it points at, side by side or stacked according to **the component's own width**. `groupBy="halfDay"` splits at noon ; `resources` gives one group per row ; `markEmptyDays` strikes out the days with nothing free, which costs a scan of the month shown and is therefore asked for rather than assumed. It **reports and does not book** : `onChange` hands back `{ start , end , resourceId? }` and stops there, the identity of a new object coming from the server exactly as it has since events became creatable.
- **New `SlotPickerPanel`** — the same picker in a window that has to be answered. **A shell changes the contract** : inline, a chosen slot is reported at once ; in a modal there is nothing else on screen, so the selection is a **draft** until the footer confirms it. A window that booked on the first tap would punish a mis-tap, and one that only highlighted would leave a reader unable to tell whether anything had happened. The chosen time is written **in the footer**, where a thumb reads it without hunting the grid for a highlighted button three rows up.
- **`busy` is taken as given, and the demo says out loud where the filtering belongs.** A cancelled booking still blocks until it is dropped — and **an all-day entry blocks the whole day**, midnight to midnight, which is the one that surprises everybody : the library's programme carries an exhibition running from the 10th to the 17th, and handed over as an occupation it empties the picker for that entire week. A correct answer to a badly-posed question, since an exhibition in the hall does not stop a room being booked at two. Whether either really holds a slot is a business rule and not arithmetic, so it stays with the application — and it is now written in the JSDoc of both, in the group's guide, and under the demo.
- A sixth lab page, `/lab/schedulerSlots`, on the fixture the family already has : the library's three rooms with the hours the timeline already shades with, and its programme as the busy list — read through `fromSchemaList`, since a normalized record is already the `{ start , end }` the picker wants. The rooms keep **weekday hours**, so a week-end is a day with nothing free and `markEmptyDays` has something to strike out ; `hidePast` is off across the page, the payload being dated August 2026 and therefore entirely past — which is exactly what turning it off is for.
- The group's guide gains the component it was written a lot too early to know about, and the helper table gains `computeFreeSlots`.

**Wiki — `components/scheduler`, the group's guide**

- **New [`wiki/components/scheduler/README.md`](wiki/components/scheduler/README.md)** — what the group is, what it is deliberately **not** (`Calendar` and the seven date inputs *choose a date* ; the six `Sortable*` and `Kanban` *reorder a list*, and what a scheduler drags is a coordinate, not a rank), which view answers which question, the seven rules that hold across it — each of which cost a defect to learn — four recipes, and a gesture table saying for every action what a **mouse**, a **finger** and a **keyboard** each do, which no JSDoc gives in one glance.
- **New [`wiki/components/scheduler/schema-org.md`](wiki/components/scheduler/schema-org.md)** — the page one opens while wiring an API. The single idea the whole adapter rests on (**it reads properties, never `@type`**, which is what makes a house subtype work undeclared), identity, and the four traps of the vocabulary : a bare `Date` **is** the all-day signal and its end is inclusive where a date-time's is exclusive ; a `Schedule` bounds its *validity* with `startDate` and gives its occurrences' *hours* with `startTime`, two axes constantly conflated ; a `Reservation` carries no dates at all and its subtypes disagree on where they live ; and a span must be written back under the properties it was read from. Ends on how to extend it for a type of your own — the short answer being that there is nothing to declare.
- **The accessibility section says what is refused, and why** : no `role="grid"`, no arrow navigation between blocks or month cells, no keyboard move for an all-day chip, no touch handle. Half-kept promises are worse for a screen reader than absent ones, and a guide that lists only what works is how they get made.
- **Both pages inventory the pure half** — twenty `helpers/schedule` modules and six hooks, one line each — which nothing listed until now, though it is the part usable with no component at all. Still **no props tables** anywhere : the JSDoc is the reference, and a copy diverges within two commits.
- The wiki index and the root `README.md` follow ; the index's convention gains the case a second page beside a group's guide is legitimate — a subject that would otherwise swallow it — as against a page per component, which would only be the JSDoc copied.

**Components — `scheduler` — the keyboard, and saying out loud what a screen shows**

- **The focus is visible.** Every event in every view has been a `<button>` for several lots and **not one of them showed where the focus was** — tabbing through a week was a walk in the dark. One outline for the family, taken from `barList`'s, and drawn **inside** a placed block : an outline offset outwards lands on the card next to it, so on a busy day the ring of the focused block reads as a border of its neighbour.
- **New `helpers/schedule/describeEvent`, and every block now says what it is.** A card prints a title and a start ; read out loud that is half an event, with no end, no day and no cancellation — and a month cell announced « 12 », which is not even a date. One function writes that sentence for the label and for the tooltip, because the moment it is written twice it says two different things, and nobody reads both. `describeSpan` is the panel's own `formatSpan`, moved there rather than copied. Verified with 25 assertions, French and English.
- **An event can be moved and stretched from the keyboard.** On a focused block the arrows shift it by a snap step, `Shift` and an arrow pull its closing edge, and the arrows across the axis change its day — or, on a timeline, its resource. **Nothing is written before `Enter`** and `Escape` puts it back : a key that committed would turn crossing a morning into ten writes, ten round trips and ten chances for one of them to fail halfway. It is the contract the drag already had.
  - **The arrows follow the layout, not the indexes.** In a right-to-left reading the column on the right is the earlier one, and someone looking at the screen presses towards what they can see.
  - `useTimeDrag` gained `adjust()` **and no second preview** : the keyboard writes into the very state the pointer does, so a view draws one thing and never learns which of the two put it there. Two builders would have drifted apart by the second fix.
  - The permissions are the same ones : a locked event, an occurrence of a recurring rule and a `movable` left off all refuse the arrows exactly as they refuse a drag.
- **A live region, the first in the library.** A block that moves is an answer to whoever can look at it — the focus has not gone anywhere, so a screen reader has no reason to say a word, and an `aria-label` changing under a focus already there is not reliably read either. Every keyboard step is announced, and so is every committed change whatever gesture made it : moved, resized, created, deleted. The sentences are **templates** (`'{event} moved to {when}'`) rather than words concatenated in the component, because a sentence read out loud needs its own word order in each language.
- **The structure says what it is, and refuses what it is not.** The grid and the timeline are named regions ; a day column and a resource row are named groups, so a reader landing on a block knows which day or which room they are in ; the hour gutter, the ruler, the rules, the now marker and the drag handles are hidden from the reader, being decoration that would bury what they came for. **No `role="grid"`** — that role promises navigation from cell to cell, and a promise an interface does not keep is worse for a screen reader than no promise at all. What is not done is written down as not done.

**Components — `scheduler` — the finger, and one prop for « the reader may change this »**

- **New `interactive` on `Scheduler`** — one prop turning on `movable`, `resizable`, `creatable` **and** `details`. The four rather than three : without the panel, `resizable` promises a finger a gesture it cannot make, since the handles are eight pixels wide and only exist under a hover. Each of the four still wins when it is passed on its own, so `interactive` with `resizable={ false }` is a calendar one may move things around in but not stretch.
- **⚠️ Defect fixed : the agenda could not open anything.** `Scheduler` never passed `onEventClick` to `SchedulerAgenda`, and its rows were neither buttons nor clickable — so on a phone, which is shown the agenda by default, **a booking was unreachable**: `details` opened no panel, and there is no axis to draw on nor edge to pull to compensate. A row is now a `<button>` where something listens, and stays a paragraph where nothing does. A `renderEvent` block is untouched : a custom row is the application's markup.
- **A tap that dwells is a click, not a one-step range.** A finger has no way of pointing at an empty slot other than pressing on it, and a press that lingers is exactly what a long press is made of — so the gesture ripened into a creation nobody asked to draw, and produced a fifteen-minute event where the very same tap with a mouse produces `createDuration`. `useTimeDrag` now gives a creation that **never left the step it landed in** the slot it fell in and the length a click is worth, which is what the lane's own `onClick` already did. Same rule on the time grid and on the timeline.
- **The month can be filled in** — `creatable` puts a create in the **day panel**, not on the cell. A cell opens its day, and a day carrying three bookings has to be readable before anything is added to it ; making an empty cell create and a busy one open would be two gestures wearing one costume. What it creates is **an all-day event on that day** : a month has no hours, and deciding that an appointment starts at nine would be an invention — the form that opens next is where an hour is chosen.
- **A create command in the toolbar**, as soon as `creatable` (`showCreateButton` removes it). Drawing a range is a pointer gesture and three of the five views cannot offer one ; it is also the gesture a keyboard has no honest equivalent for — a focusable empty column would be seven tab stops a week, each guessing an hour. So **creating is a command**, in the one place every view shares. It aims at the next whole hour of the day being looked at, and the form corrects it. The clock is read in the handler and never during a render.
- **`allDay` travels with a creation.** `useEventEditor` reads it off the range, and the plain-object patch now carries the flag itself — without it, ticking « all day » moved the bounds and said nothing about what they had become, so the record came back timed.
- The tooltip demo gained the case that was written and never shown : **a floating bubble inside a `<dialog>`**, which is what the portal into the top layer exists for.

**Components — `Tooltip` — a bubble no overflow can cut**

- **New `float` prop.** DaisyUI draws its tooltip in a pseudo-element of the trigger : that is what makes it free, and what makes it **clipped by any ancestor hiding its overflow** — a scrolling list, a table cell, a block truncating its own title — and blind to the edges of the window, so near one it leaves the screen rather than flipping. Neither is a prop that was missing ; both are properties of where the bubble lives. `float` moves it into a **portal** and places it against its trigger. **The CSS path stays the default** : it costs nothing and is right wherever nothing clips it.
  - **It portals into an open `<dialog>` when the trigger is inside one.** A modal dialog paints in the browser's top layer, above every `z-index` there is, so a bubble on the body would be under it — the same reasoning `Popover` already follows.
  - **Measured, not estimated.** A tooltip's size is its text's, known only once rendered ; guessing it puts the bubble a few pixels off and, near an edge, makes it flip the wrong way. The first pass is invisible, the second is placed.
  - **The look is daisyUI's, taken from its stylesheet rather than approximated** : `.875rem` on a `1.25` leading, centred, `max-content` width capped at twenty rem, and its own ten-by-four wave for the tail. A rotated diamond beside a daisyUI bubble reads as a different component.
  - **The fill comes from the theme's variables, not from utility classes.** DaisyUI writes `color: var(--color-neutral-content)` in its stylesheet and never a utility, and for a portaled element that is the sturdier choice : a class has to survive the scanner that generates it and the merge that combines it, a variable is read at paint time and can be dropped by neither.
- **New `hooks/useHoverIntent`.** A tooltip opening the instant a pointer touches its trigger turns a row of eight blocks into eight bubbles flashing in sequence. The delay belongs on the way **in** only — once a bubble is up, the reader asked for it, and taking it away must feel immediate. **Focus opens it at once** (a reader who tabbed there has already committed) and **touch never does** : there is no hovering on a touch screen, and a tap has somewhere better to go than under a bubble.
- **New `themes/helpers/placeFloating`**, pure and verified with 7 assertions : preferred side, the flip when it does not fit, the clamp at either edge, a bubble wider than the window, and the case where neither side has room. All of them are what « aligns elegantly depending on where you are in the page » actually amounts to, and none of them is visible in a screenshot.
- `role="tooltip"` and `aria-describedby`, and the trigger's own handlers are **chained** rather than replaced — a trigger is very often the element that also drags or clicks, and a bubble left hanging over a gesture in progress is the bug that arrangement invites.
- **The scheduler's cards and blocks now use it**, in the time grid as in the timeline : `tooltip` was the browser's own precisely because the themed one would have been cut off twice. **New `tooltipColor`** sets the bubble's fill — **one colour for the whole scheduler, never one per event** : an event's colour is as often a free CSS value as a token, and nothing guarantees a text is legible on it. Only a token and its `-content` pair are a contrast the theme promises, which is the rule the month view already taught us.

**Components — `scheduler` — the resource timeline**

- **New `SchedulerTimeline`, and `timeline` joins `builtViews`.** The week grid with its axis pivoted, which was the second decision of the whole family and is now the one that pays : **`layoutOverlaps` comes back unchanged** — what it returned as columns sharing a width becomes lanes sharing a row's height. Two bookings of the same room at the same hour cannot share the width, because the width is the time.
- **`useTimeDrag` gained an `orientation` rather than a twin.** One projection, two axes : the coordinate that carries time, the one that names a lane, and the edge of the axis that is its zero. The four gestures of the previous lots work on the timeline without a line added. Its geometry is now named `offset` / `size` along the axis and `lead` / `span` across the lane — after neither `top` nor `left`, since a grid and a timeline read the same preview upside down from each other.
- **New `createSpanScale`.** A timeline has **one continuous axis** where a grid has a day repeated per column, so an event crossing midnight is one bar and never two. It answers the same questions as `createTimeScale` and ignores the day argument its cousin needs — which is what lets one hook drive both.
- **Two scales, and the window decides** — `timelineDays` gives a day of hours or a week of days, exactly as one time grid already serves Day and Week.
- **New `resources` prop, and `helpers/schedule/resources`.** A list of events cannot supply what a plan needs : **the order** (a grid that rearranges itself as bookings come and go cannot be read twice), **the empty rows** (a room free all day is an answer, and deriving rows from bookings is what makes that answer disappear) and **the names**. Derivation stays as a fallback — useful to look at a payload, never to plan with. An event pointing at a row nobody declared still lands somewhere rather than vanishing.
- **Moving a card to another row changes its resource**, and **no schema.org property means « resource »** : an accessor read it, and inverting an accessor is not something a library can guess. Plain objects write `resourceId` ; schema mode reports the new row in the change descriptor for the application to write, unless **`setResourceId`** says how.
- **New `helpers/schedule/openingHours`** — `OpeningHoursSpecification` read as it stands, because inventing a second way to say « open on Tuesdays from nine to six » would leave two of them to reconcile the day the slot picker needs the same answer. It shades, and computes nothing : free slots are a different question. **A resource declaring no hours is not shaded at all** — silence is not a closure. Two touching rules are one opening, so `09:00–12:00` and `12:00–18:00` do not print a closure at noon nobody declared.
- **The palette legend leaves the backlog**, where it had been waiting since the palette lot for a source to give resources names. The demo builds it on `MetricLegend` from the same declared list, in the same order.
- **`tooltip` says what a block tells on hover** — `false` removes it, `( event ) => string` writes it. Deliberately the browser's own rather than the themed one : a themed tooltip lives in a pseudo-element, and a block clips its own overflow to truncate its title, so it would be cut off — and cut off again at the edge of the scrolling area.
- **It opens on the working hours, not on midnight** — `scrollTime`, the lesson the time grid learned two lots ago. The bounds stay whole, since narrowing them would hide a night shift ; only the scroll position moves, which costs nothing to correct and everything to miss.
- **A day label sits in the middle of its day, an hour mark on its hour.** Centring both the same way put « Tue 11 » on the boundary between Monday and Tuesday, and lost the left half of the very first mark off the edge of the axis.
- **Under twenty-six pixels a block prints nothing but its colour**, and **writes its title beside itself** the way a Gantt chart labels a task — a sibling rather than a child, since the block clips its own overflow, and inert so it never comes between the reader and the bar. A week of days makes an hour worth a handful of pixels : arithmetic that is right and a rendering that is not, since the padding, the radius and the inline rule turned a legitimate sliver into what looked like a fault. **`showNarrowLabels`** turns those labels off for a dense plan, where neighbouring ones would run into one another and say less than the bars alone.
- Verified with 14 assertions over the two new pure modules before handing over — the order, the empty rows, the orphan row, the merging of touching openings, and the closure that must not be invented at noon.

**Components — `scheduler` — writing an event**

- **⚠️ Defect fixed : a span was written back under the wrong properties.** `toSchemaPatch` always emitted `startDate` / `endDate`, which was right while only `Event` was readable. Since reservations became readable, moving a lodging booking wrote `startDate` onto an object whose dates live in `checkinTime` / `checkoutTime` — and since the reader tries `startDate` first, the object was left with **two legal spans contradicting each other**, the newer one silently winning. `toSchemaPatch` now takes the property names, and the record's `span` supplies them. A `TaxiReservation`, which names a pickup and no end, gets no invented end property.
- **New `useEventEditor`** — the draft, the validation and the single patch, without an interface. **The draft is not the event** : nothing is written before `submit`, the event does not move while its form is being filled, and abandoning costs nothing — which is the whole difference between an editor and a gesture. What comes out is only what changed, **spelled the way it was read**.
- **`SchedulerEventPanel` gains an edit mode**, in the same shell : two components would share the placement, the header and the footer, then diverge at the first fix. `Edit` appears only where the permissions grant it, and the footer follows the mode.
  - **Deleting confirms in place** — the button becomes `Confirm` and forgets after four seconds. A modal inside a modal is a dead end.
  - **Creating is editing an event that does not exist yet** : a drawn range whose `onEventCreate` returns nothing opens the same form, already filled with that range, and saving adds it. The one-line path of lot 6 — return an object and it is added — is untouched.
- **The date and time controls of the form open as a modal, not as a dropdown** (`pickerDisplay`, `'modal'` by default, overridable per descriptor with `display`). The form is a panel that scrolls, and an anchored dropdown inside a scrolling panel is the one arrangement that goes wrong. `Popover` finds the open `<dialog>` the form lives in and portals into it, which is what keeps the picker above the top layer instead of under it.
- **New `SchedulerEventField`** routes every type to a control the library already ships : `Input`, `TextArea`, `Select`, `Checkbox`, `InputDateTimePicker`, `InputDatePicker`, `InputUrl`, `InputEmail`, `InputColor`. **The colour offers the theme's tokens first**, because those are what a theme actually guarantees — they follow it into dark, where a hex value picked in daylight does not — with a free colour underneath.
- **Two things the editor refuses, and neither is a shortcoming.**
  - **Dates belonging to a linked object.** A reservation does not own the hours of the concert it points at ; rewriting them would reschedule that concert for everyone who booked it. Shown, locked, and said out loud. The gestures refuse it too, and it is **one predicate** — the day a special case genuinely needs the nested write, it is an option rather than a rewrite.
  - **Object values.** A `Place` put through a text field comes back a string, the `@type`, the identity and the address gone with nothing looking broken. **`editable : true` on the descriptor lifts the lock** and says the application supplies a control of its own through `renderField` — which the demo shows with a select of rooms handing back a whole `Place`.
- **A descriptor may be `editOnly`** — worth changing, not worth printing. A colour is the plain case and the default : `#EF4444` tells a reader nothing the dot beside the title has not already said.
- **The dot beside a title now carries a token colour too.** It only ever read the inline style, so an event coloured `info` showed grey while one coloured `#EF4444` showed red. **New `resolveDotColor` and `dotMap`** give the eight tokens at full strength — `colorMap` washes its fill to 20 % so text stays legible on top of it, and on six pixels that wash is indistinguishable from grey. The month view's density dots had the same defect and are fixed with it.
- **Saving goes back to reading, updated**, rather than closing everything : the panel underneath is the answer to « did that take ? ». A creation still closes — there is nothing underneath to return to, and the event has just appeared on the grid.
- **The header says what is being done while editing** — `editTitle` / `createTitle`, from the locale and overridable, because an application that books appointments does not edit « an event ».
- Validation stays to what a library can honestly check — a required field, an end after its start — and `validate( draft )` carries the rules only an application knows.
- The month demo finally exercises **`weekStartsOn`**, which has driven the week columns, the month grid and its headers since lot 2 without any example ever showing it.

**Components — `scheduler` — reading an event, and who is allowed to**

- **New `SchedulerEventPanel`**, and `details` on `Scheduler` to open it on a click. Consulting is not editing, and it is the common case — a booking is looked at far more often than it is changed — so the panel reads first and says what it knows plainly.
  - **It is a `Modal`, so it has placements.** `middle` by default and full screen below `md` ; `placement="end"` turns the same panel into a side sheet that leaves the calendar visible, `bottom` into a tray. None of that is this component's code.
  - **Built in *and* composable.** `details` wires it up, `onEventClick` keeps firing, and the component is exported for a window of your own — with `fields` as a **function of the event** (one set of rows per subtype), `renderField` for one row and `children` for the whole body.
- **New `getEventPermissions`.** One accessor — `'read'` / `'edit'`, or `{ read , edit , move , resize , remove }` — because rights answer a single question and five accessors would ask it five times. It gates the panel **and the gestures** : a read-only event neither drags nor stretches, and the mutators refuse it too, so application code cannot walk in through the back door. **New `permissionsOf` and `canResize` on `useScheduler`.**
  - **It hides nothing, deliberately.** Nothing is filtered out of the views : an event withheld client-side is still in the payload, so dropping it here would look like protection while being none. What is not to be shown is not to be sent.
- **New `helpers/schedule/datePairs` — a `Reservation` becomes readable.** The subtypes disagree on where the span lives, and they disagree on purpose : a table is booked for a `startTime`, a room from a `checkinTime`, a taxi at a `pickupTime` with no end at all, and a flight has no dates of its own because they belong to the flight it points at. So the answer stays structural, like the rest of the adapter — **an ordered list of property pairs, tried in turn, extended by whoever has a subtype of their own**, plus an `unwrap` list for the objects that hold the dated one. Still no `@type` read anywhere.
  - **`reservationStatus` is read as its own vocabulary**, since `readStatus` would have answered `scheduled` to all of it — including to a cancellation. Only what genuinely maps is mapped : the normalized status decides how a block is *drawn*, not what it means to a business, and a pending booking has no honest third way of being drawn. **New `getStatus`** hands the question over entirely.
  - The record gained `span` — which properties its dates were read from, and on which object — which is what lets an editor write back in the spelling it read.
- **`configureDayjs` gains `localizedFormat`.** Without it `LL` and `LLL` are not formats, they are the letters themselves — a date printed as « jeudi LL ». They are also the only way to write a date in the order a locale actually uses, so anything spelling one out needs them.
- **An event is named by what it points at, when it has no name of its own.** A reservation very often carries none : what has a name is the concert, the inn or the restaurant it links to. The linked object is asked **even when the dates were found on the reservation itself** — precisely the case a lodging booking presents, with its own `checkinTime` and a name that only exists over in `reservationFor`.
- **No stand-in title.** An event that names itself heads its own panel ; one that does not is better headed by nothing than by the word for nothing.
- **The event's colour sits beside its name, in the header**, rather than in front of the date. In the body it indented the first line by its own width, and every label under it stopped lining up with anything.

**Components — `Modal` — a header with no title**

- **The close button now holds the end of its row even when there is no title.** It was the only child of a flex row and sat at the *start* of the header, which is the one place a close button never belongs. A titled header is unaffected — its `flex-1` title was already doing the pushing.
- **A side panel is sized by `width`, never by `maxWidth`** — daisyUI sizes `start` / `end` placements by their content, so the panel supplies a sensible one rather than letting the box follow its own longest line.
- **New `helpers/schedule/eventFields`.** The hard part of a panel is not its layout, it is **reading a value without knowing what it is** : `location` accepts plain text, a `Place`, a `PostalAddress` or a `VirtualLocation`. A panel printing `[object Object]` over real data has failed at its only job, so everything goes through `formatValue` — and what it cannot name is drawn as nothing rather than as noise. A row with nothing in it costs the reader more than an absent one.

**Components — `scheduler` — stretching and drawing**

- **New `resizable` prop.** A block's edges are pulled from a handle that appears along them. Two rules decide whether a handle is there at all : an edge is only offered **where it is real** — the middle day of a three-day event has no start to pull and the last has no end — and **a card under 28 px shows only its closing handle**, since two eight-pixel strips on a twenty-four pixel card would leave eight pixels to take the block by, giving the resize by taking the move away.
- **New `creatable` prop.** A range drawn on an empty column becomes a new event, and **a plain click is a range of `createDuration`** rather than a second callback : the activation threshold already tells a click from a drag, and asking for a rectangle to book eleven o'clock would be a needlessly precise gesture.
  - **The identity of a new event is the application's, never this library's.** An invented id is an invented collision, and the real key comes from the server. So `onEventCreate({ start , end })` reports the range and **what it returns decides** : an object is added, nothing at all means the application took it from there — which is exactly what opening an editor looks like. Mind that `x => ({ … })` returns the object and `x => { … }` returns nothing.
  - A range drawn in one flick is given the shortest length the grid accepts rather than refused : it is a real intent, not a mistake.
- **New `isEventResizable`**, falling back to `isEventMovable`. The recurrence guard applies to a stretch exactly as it does to a move.
- **`useTimeDrag` now carries four modes rather than spawning three hooks.** Moving, dragging either edge and drawing a range are the same calculation differently anchored — each turns a pointer position into a `{ start , end }` pair. Written apart they would have been three previews, three clamps and three places to fix the same bug. **Only a move changes day** : an edge that jumped columns as it was pulled, or a range that slid sideways as it grew, could not be aimed at all.
- **Stretching and drawing are for pointers that hover, and say so.** A finger cannot aim at an eight-pixel handle, and drawing a range with one would fight the page scroll. The handles are hidden **and inert** under `hover: hover` — a handle that only *looked* absent would still swallow the press meant to move the block — and the touch equivalents belong to the editor. The keyboard path for creating is a command and not a focusable column ; it is not claimed before it exists.

**Components — `scheduler` — moving an event**

- **New `movable` prop, off unless asked for.** A timed block in the day and week views can be dragged to another hour or another day. Everything the write needs was already there — `moveEvent`, its optimistic revert, `timeScale.timeAt()` and `snap()` — and what was missing was only the gesture.
  - **The gesture is written in pointer events, not in a drag-and-drop library.** A drag-and-drop library reorders a list ; a scheduler drags a **coordinate**. Every calendar that lets an event be moved or stretched — FullCalendar, MUI X, Bryntum — writes that by hand for the same reason, and the resize to come needs the same primitive : one engine on one surface rather than two fighting over the same block.
  - **Nothing is laid out again before the release.** The original stays where it is, greyed, and a single preview follows the pointer. Re-sharing the overlap columns on every frame would be correct and unusable — the blocks around the pointer would shuffle mid-gesture and the one being dragged would jump out from under the finger. The layout settles once, from the committed values.
  - **`snapMinutes` (15 by default) is independent of `slotDuration`.** A grid ruled every half hour while a drag lands on the quarter is the usual arrangement.
  - **The day comes from hit-testing the columns**, not from dividing the width : the columns keep a floor and the area scrolls, and the writing direction may be right-to-left. Neither has to be thought about again.
- **New `isEventMovable` accessor.** Whether the application lets go of an event — a past slot, a cancelled booking, a lock of its own. **The recurrence guard applies whatever it answers** : an occurrence of a recurring rule is never offered as draggable, since writing the patch would move the whole series. A gesture that would quietly do nothing on release is worse than one that was never offered — the reader is left believing the move was saved. **New `canMove` on `useScheduler`** is where that question is answered.
- **New `hooks/usePointerDrag`** — the gesture, knowing nothing of what it drags.
  - **An activation threshold**, so a press that never travels is still a click and an event does not open *and* move on the same gesture.
  - **A long press on touch**, because a finger cannot hover and also has to be able to scroll. Until the press ripens, scrolling wins ; the first real movement calls it off. Once the drag is on, the scroll is refused from a **non-passive `touchmove` listener** — which React's synthetic handlers cannot be — attached for the length of the gesture and no longer.
  - **Edge auto-scroll**, without which a grid showing eight hours cannot move an event from the morning to the evening, and **`Escape` to abandon**.
  - **The click that follows a release is swallowed once**, in the capture phase, so a dragged block does not also open whatever a click opens. Consumers have nothing to do about it.
  - The gesture lives in a **ref, not in state** : it updates dozens of times a second, and re-rendering the view on each would make the thing it drags lag behind the pointer.
- **New `hooks/useTimeDrag`**, the projection between the two : a vertical position becomes an hour, a horizontal one a day, and the whole move is reported **once**, on release, only if it actually moved.
- **`getSchedulerEventClasses` gains `movable`, `ghost` and `dragging`.** The movable state is deliberately **without `touch-none`** : a surface that refuses to scroll wherever an event happens to sit makes a busy day unreachable on a phone. The scroll is refused later, once the press has said this is a drag.
- The all-day band and the month bars stay read-only : they move by the day, which is a different projection.

**Components — `scheduler` — the time grid**

- **New `SchedulerTimeGrid`.** The view where an event stops being a row and becomes a **placed rectangle** : `top` from its start, `height` from its length, and a width shared with whatever overlaps it. It is the first thing to exercise `createTimeScale` and `layoutOverlaps`, both shipped with the headless core and until now never drawn from.
  - **It serves Day and Week alike.** The window already says whether there is one column or seven ; nothing else differs, so nothing else was written twice.
  - **Three bands, one of them scrolling.** The day names and the all-day band stay put while the hours slide under them. An all-day event has no place on an hour axis — it would have to span the whole of it — so it goes into a band above.
  - **The bounds stay the full day by default**, and `scrollTime` decides where the grid lands on mount. Narrowing the axis to office hours would silently hide a night incident or an on-call shift ; a scroll position costs nothing to correct.
  - **`slotDuration` and the zoom are separate settings**, as the grid step and the drag snap will be : a grid ruled every thirty minutes while a drag lands on the quarter hour is the usual arrangement, not an inconsistency.
  - **Narrow, the columns keep a floor and the area scrolls sideways.** Squeezing seven days into a phone does not make a week readable, it makes it wrong — which is what the agenda is for.
  - A one-minute event still gets a clickable height, and an event falling outside the drawn axis is dropped rather than clamped onto an edge it never touched.
  - **A card too short for two lines now prints one.** Half an hour at the default zoom is twenty-four pixels, and two lines of `text-xs` want thirty-four : the title used to be drawn over its own time and the pair cut through the middle. Below the threshold the card puts its title and its start time on a single line instead — **what does not fit is not printed, rather than printed and sliced**. The threshold is in pixels and not in minutes on purpose : what decides is the room there is, and the same half hour is comfortable at ninety-six pixels an hour. Padding and leading moved out of the base class and into the mode, so the mode wins the cascade rather than fighting it. Every card also gained a `title`, which gives back in full what a narrow column truncates.
  - **The single line is centred in its card**, not hung from the top. A stacked card fills its own height, so where its text begins is where the event begins ; one line in a card twice as tall only looks dropped in. The two texts still share a baseline between themselves.
- **`layoutMonthBars` becomes `layoutBars`, with a `columns` option.** The all-day band is the month grid's problem exactly — bars spanning columns, stacked on rails — differing only in that a month asks for rows of seven while a band asks for a single row as wide as the view. One option, and the helper serves both. Renamed while nothing is published, since it would have meant a time grid importing something called *month*.
- **New `hooks/useNow`**, for anything drawing *now*. **It starts at `null` on purpose** : a server and a browser cannot render the same clock, and reading the time during the first render mismatches on hydration at every load. The first value lands after mount, and an indicator appearing a frame late is better than one flashing at the wrong minute before correcting itself.
- `day` and `week` join `builtViews`.

**Hooks — ⚠️ breaking — `useChartPalette` is now `usePalette`**

- **`hooks/useChartPalette` is removed and replaced by `hooks/usePalette`.** Same signature, same result, no alias kept : nothing outside this library imports it yet, and a deprecated shim nobody needs is a debt taken on for free.
  - **Migration is one line per file** : `import usePalette from '…/hooks/usePalette'`, and rename the call. The twelve chart components were migrated with it.
  - **Why** : the hook never did anything chart-specific. It turns a palette name into colours that read against the current background — which a scheduler colouring its resources needs exactly as much as a chart colouring its series. The name was the only thing tying it to one group, and it was about to make a second group import something called *chart*.

**Components — `scheduler` — colouring by resource**

- **New `palette` prop.** Eight DaisyUI tokens are enough while colouring *an event*. They stop being enough the moment the colour means a room, a round or a category : fifteen rounds cannot each have their own. The palette answers the count, through the same `usePalette` the charts use — so a scheduler and a chart side by side speak the same chromatic language, and both follow the theme into dark.
- **New `getColorKey`, which answers the harder half : stability.** A colour handed out in order of appearance drifts — navigate to a week where the Blue Room happens to come first and every room shifts one place. **New `helpers/schedule/assignColors` sorts the keys before indexing them**, so the mapping depends on the *set* of keys and not on what the current window contains nor on the order the payload arrived in. A key added later only moves what sorts after it ; **`colorKeys`** passes an explicit order and freezes the mapping for good.
  - `getColorKey` receives the **source**, not the normalized record : what decides a colour is almost always a business property — `location.id`, `assignedPOS._key` — that only the source carries.
  - It **defaults to the event's resource**, which is the usual intent : `palette="brand"` on its own already gives one colour per room.
  - **The data's own colour always wins.** An event carrying `color` keeps it — the palette only answers for what the data left unsaid, which is what lets it be switched on without rewriting the events that already had one. The rule holds on both paths, JSON-LD and plain objects.
  - The palette **cycles** rather than running out : more keys than colours is a legibility problem, not a crash, and the application is better placed to decide whether to widen the palette or group the keys.
- The demo carries the same **palette selector** the charts pages use — promoted from `demo/charts/` to `demo/` now that two groups share it, with the hint line made a prop.
- Not done, and deliberately : **no legend**. `MetricLegend` already exists and the demo shows how to compose one, but a legend is only worth an API once the names it shows come from somewhere — and they come from the application.

**Components — `scheduler` — the month view**

- **New `SchedulerMonth`.** Six weeks, always, with events laid on **rails**. An exhibition running from the 10th to the 16th reads as *one bar crossing the week*, not as seven chips — which is why this view needs a placement of its own rather than the overlap columns the time grid will use.
  - **New `helpers/schedule/layoutMonthBars`.** Where `layoutOverlaps` shares a width between things happening at once, this allocates *vertical order over a seven-column axis* : a bar claims a rail for its whole crossing and keeps it at one height. Longest first, so a span across the row claims its rail before the single days do — otherwise it would have to weave between them and could not stay level. A week is solved on its own, since a bar cannot cross the end of a row.
  - **What does not fit is counted per day, not per week.** Past `maxEventsPerDay`, a bar is not drawn and every day it covered counts one hidden event ; two days of the same row rarely hide the same number. The figure is **computed rather than measured** : measuring costs a render pass and gets the first one wrong.
  - **The cells reserve the height the rails take.** The bars are an overlay ; letting them float over the day numbers is the classic way a month grid becomes unreadable at the first busy week.
  - **Narrow, it stops naming things.** Seven columns need roughly ninety pixels each before a title is worth printing. Below that — a container query, so a panel on a wide screen behaves like a phone — the cells show **density dots** and the whole cell opens the day. A better target for a finger than an eight-pixel « +2 more ».
  - **Clicking a day opens all of it**, hidden events included : a list showing only the overflow would make the reader rebuild the day in their head. A dropdown placed by `useDropdownPosition` on a wide screen, a full-screen modal on a phone. One `useDropdownPosition` serves forty-two possible anchors — its `ref` is a plain one, pointed at whichever cell was activated.
- **New `SchedulerEvent`**, the compact form of an event, shared from here on : a month cell today, the all-day band and the timeline rows later. It becomes a `<button>` only when a view gives it an `onSelect` — an inert chip should not announce itself as a control. A chip cut at the edge of a week loses its corner and its rule on that side, so a span over two rows reads as one event.
  - **Two sizes.** `sm` is calibrated for a month cell, where the rail height is fixed ; `md` is for a list — the day popover — where the same text at the cell's size is simply too small to read, especially on a phone where that list owns the screen.
- `month` joins `builtViews`, so the view switcher appears with nothing else to change.

**Components — `scheduler` — contrast**

- **An event's text is no longer the token's colour, and this was a real defect.** A theme only guarantees a contrast *within its own pairs* : `base-content` reads on the `base-*` surfaces, `<token>-content` reads on `<token>`. Nothing promises that `text-warning` is legible on a wash of `warning` — and it is not, in either theme, which is how a calendar ends up with events one has to squint at. The hue now lives where it cannot hurt : a 20 % wash for the fill and the inline-start rule at full strength, which is what carries the colour at a glance. The label stays `base-content`.
- Ten more readings raised along with it : grid lines to `base-300`, day numbers to `/80`, days outside the month from `/35` to `/50`, weekday headings from `/50` to `/70`, today's cell from `primary/5` to `/10`, a past event from `opacity-60` to `75`. The default colour of an event naming none is `base-200` rather than `base-100`, which was invisible on the surface it sat on.

**Components — `Popover` — full-screen modals**

- **New `fullScreen` prop** (opt-in, modal mode only) : the panel fills the viewport instead of hugging its content. Right when the content is a list of unknown length — a day's events, an editor — where a card growing with its content is worse than one that simply owns the screen. The dropdown is untouched.
- **A full-screen panel heads and foots itself**, with a new `title` and a close button where every dialog puts one, plus a Close button at the bottom for the thumb that will never reach the top of a phone. A panel hiding everything behind it has to show the way out rather than expect it to be remembered. Labels come from the locale (`close`, new in `components.picker`) and are overridable through `closeLabel`.

**Components — new `components/scheduler` group — the shell and its first view**

- **New `Scheduler` component.** A calendar of events : what is scheduled, when, and — once the gestures land — where it moves to. It owns the three pieces of state a scheduler has, **each controlled or uncontrolled on its own** : the events, the current view, and the date being looked at. An application commonly owns the events and leaves the navigation to the component, which two coupled props would have made impossible.
  - **`onChange` hands back objects in the shape they came in.** JSON-LD stays JSON-LD ; the normalized records are a read-only projection the views consume and never leak into the value. A component returning its own internal shape would force every application to convert twice.
  - **`schema` switches the adapter on**, and nothing else changes : the same component reads plain `{ id, start, end }` objects or a schema.org payload, house subtypes included, since the adapter reads properties and never `@type`.
  - **One component, several views.** A phone does not want seven columns fifty pixels wide, it wants a list — a different *view*, not a different component. `views` and a `defaultView` are all an application says. **`views` is filtered against the views that are actually built**, so asking for one that has not landed yet cannot put a tab in the switcher that leads nowhere ; the list grows on its own as the lots ship, and a development warning names what was dropped.
- **New `useScheduler` hook**, the same contract as `useKanban` : moves apply optimistically in uncontrolled mode and a rejected promise returned by `onChange` restores the previous state. It exposes the mutators the gestures will call — `moveEvent`, `resizeEvent`, `updateEvent`, `addEvent`, `removeEvent` — each producing a single `change` carrying the record, its source, the span before and after, and the patch that was written.
  - **`updateEvent` merges the source's own properties**, under the names they have server-side, so a house subtype's property is written without anything here knowing it exists.
  - **A move on one occurrence of a recurring rule is refused**, with a development warning. Writing the patch anyway would move the whole series : that is the « this occurrence or all the following » problem, which belongs to the RRULE tier and is deliberately out of scope. Silently corrupting a rule is the worst of the three possible behaviours.
  - **The span is written back in the spelling it came in** — a schema.org patch under `schema`, plain `Date` objects otherwise. `resourceId` is only written in plain mode : under `schema` an accessor read it and nothing says which property named it, so the change descriptor carries the value and inverting it stays the application's call.
- **New `SchedulerAgenda` view.** What is happening, in order, grouped by day. No time axis, so an event is a row rather than a rectangle — which is what makes it the view that survives a narrow screen.
  - **It answers to its own width, not to the viewport's.** The times sit in a fixed gutter when there is room across and move onto a line above the card when there is not. A viewport breakpoint would have been wrong for two of the three cases that matter : the same component sits full-width on a phone, in a 360-pixel panel beside a desktop layout, and in a sidebar, and all three want the same treatment for the same reason. The break and the dash separating the two bounds answer to the same container query, so the text exists once in the DOM and is never duplicated for a screen reader.
  - **An event spanning several days shows in each of them**, cut at local midnights by `expandToDays`, and the pieces that are not real ends say so — a reader is never told that a conference starts again every morning.
  - **Empty days are dropped by default** : an agenda lists what happens, and a column of « nothing scheduled » is noise. `showEmptyDays` keeps them, for an agenda used as a record rather than as a list. When the **whole** period is empty, one `EmptyState` says so rather than nothing at all.
  - All-day events sort first within their day : they frame the ones that have an hour.
- **New `SchedulerToolbar`**, rendered by `Scheduler` unless `toolbar={ false }` and exported for an application that wants to place it itself. **The view switcher disappears when there is only one view** — a tab bar with a single tab states nothing and takes a row to do it. The chevrons are `aria-hidden` and the accessible name comes from the locale, since a screen reader reads `‹` as punctuation.
- **New `themes/components/scheduler` generator.** An event's colour is a whole literal per DaisyUI token — the tint, the inline-start rule and the text kept together so the three can never disagree — and any other CSS colour becomes an inline style whose tint is built with `color-mix`, so a hex behaves like a token. Cards use **`rounded-field` rather than `rounded-box`** : the theme gives three radii and the one for boxes is meant for a card or a modal, while an event is closer to a field — which is what `Calendar` already gives its day cells.
- **New `helpers/schedule/getViewWindow`**, which answers for every view the two questions the shell asks : the span being looked at, and how far one step of navigation moves. A month grid is **always six weeks tall**, so navigating never makes the page jump, and it steps by a month rather than by six weeks, so twice from January lands in March.
- **New `helpers/schedule/formatPeriod`.** « 10 – 16 août 2026 », « 28 août – 3 septembre 2026 », « 28 décembre 2026 – 3 janvier 2027 » : what is dropped depends on what the two bounds share, and the span crossing a year is the one a quick implementation gets wrong. The month view names its month rather than its grid, which would otherwise read « 27 juillet – 6 septembre » for what everyone calls August.
- **New `@locale/components/scheduler`** (fr / en), read at `components.scheduler`.

**Lab — the scheduler splits in two pages**

- **`/lab/scheduler` is the agenda, `/lab/schedulerModel` is the model and its adapter.** They answer different questions — one shows a component, the other shows the numbers it is drawn from — and a single entry named after one of them was naming half a page. Flat sibling routes grouped by the navigation, the arrangement the chart pages already use.
- Both pages tighten their padding on a phone : three nested levels of `p-4` left a third of a narrow screen to the content.
- **The narrow example runs inside DaisyUI's `mockup-phone`**, and takes no prop the wide ones do not : it stacks because its container is narrow, which is the whole demonstration. The mockup's display is `overflow: hidden` and its camera overlays the same grid area, so the scrolling belongs to an inner box and the top padding is what clears the notch.

**Helpers — new `helpers/schedule` group — the headless core of the scheduler family**

- **New `helpers/schedule/` group.** Everything a calendar of events computes before anything is drawn : reading a payload, expanding a recurrence, cutting events into days, sharing the width of a column between events that overlap, and converting between an instant and a position. All of it is pure — no React, no class names — so the week grid, the resource timeline and any view that comes later share one arithmetic instead of three.
- **`fromSchema` / `fromSchemaList` read schema.org JSON-LD** into the nine-field record the views consume : `id`, `title`, `start`, `end`, `allDay`, `resourceId`, `status`, `color`, `previousStart` — plus `source`, **the original object, untouched**, which is what actually gets rendered. The vocabulary is polymorphic by design (`location` accepts four types, `duration` two, `startDate` is *either* a date *or* an instant) and a layout engine recomputing positions dozens of times per second cannot afford to untangle that per frame. `start` and `end` are milliseconds for the same reason.
  - **The adapter reads properties, never `@type`.** An object carrying `byDay` expands as a repeating rule whether it is called `Schedule` or anything else ; an object carrying `startDate` becomes a dated event. Nothing in the group knows the name of a single application type, so extending a vocabulary server-side costs nothing here. When an object carries both, the rule wins — as the vocabulary prescribes.
  - **A bare `Date` is the all-day signal.** `startDate` accepts `"2026-08-14"` and `"2026-08-14T09:00:00Z"` on the same property, and nothing but the shape of the string tells a day from an instant. Parsing goes through dayjs rather than `new Date()`, which reads the first as UTC midnight and the second as local time and would drift half of a mixed payload by the timezone offset.
  - **New `allDayEndInclusive` option, `true` by default.** The ambiguity only exists for a bare `Date` end : iCal reads it as exclusive, a reader of « from the 10th to the 12th » includes the 12th. Internally `end` is always an exclusive instant, which is what makes `end - start` a length and two adjacent events not overlap ; the option decides only how a bare date becomes that instant.
  - `duration` resolves an end when there is no `endDate`, from an ISO 8601 string, a `QuantitativeValue` with a UN/CEFACT unit code, or a plain number of milliseconds. `eventStatus` becomes a `status` a theme can style. `previousStartDate` is carried through — enough to draw the ghost of a rescheduled event's former slot.
  - **Identity is a default, not a rule** : `identifier`, then `id`, then `url`, with `getEventId` as the documented way out for a store whose real key sits elsewhere. Same contract as `getItemId` on `Kanban`.
  - **A resource reference of `0` means « none ».** Back offices routinely encode absence that way, and a resolved object is as common as a bare reference ; both are reduced by `resolveResourceId` so no timeline ever grows a phantom row named `0`.
- **`expandSchedule` covers the declarative tier of recurrence** — `byDay`, `byMonth`, `byMonthDay`, `byMonthWeek`, `repeatFrequency`, `repeatCount`, `exceptDate` — over the visible window only, so an open-ended weekly series costs a scan of that window and nothing more. Rules nested under `eventSchedule` (which schema.org allows to repeat, hence the array) and rules flattened onto the object itself are both accepted. Parsing `RRULE:` strings is deliberately out of scope.
  - **`startDate`/`endDate` bound the validity of the rule ; `startTime`/`endTime` give the time of each occurrence.** Two axes the vocabulary is explicit about and that are easy to conflate : a series with no `startTime` produces all-day occurrences, one with a `startTime` produces timed ones on the same days.
  - **`byDay: []` is not `byDay: null`.** An empty list means a series defined but scheduled on no day ; `null` means nothing was said about its days. Both produce nothing, and an editor needs to know which it is holding.
  - `repeatCount` is counted from the rule's own start rather than from the window, so a three-session series does not come back every week the user navigates to.
  - Each occurrence is named `id@YYYY-MM-DD`, which makes two Tuesdays two distinct React keys while `source` still points at the one rule they came from.
- **New `dayOfWeek` helper for the `DayOfWeek` vocabulary.** A day is spelled three ways in the wild and a payload mixes them : GoodRelations URIs (`…v1#Tuesday`), schema.org URIs, and iCal text (`TU`, `2TU` for the second Tuesday of a month). All three reduce to a weekday number, delegating the final conversion to the existing `normalizeWeekday` — the URI fragment already matches the three-letter prefix it expects, so `helpers/date/weekdays` needed no change at all.
  - **`PublicHolidays` is reported, not mapped.** It is a legal `DayOfWeek` member and it is not a weekday. It is dropped from an expansion with a development warning rather than silently becoming a number or, worse, vanishing without a word.
- **`layoutOverlaps` shares the width of a column** between events that overlap, in three passes : collision groups, greedy column assignment, then expansion to the right while the next columns are free. That third pass is what separates a legible agenda from a row of narrow slices, and it is the part most consistently underestimated — two overlapping meetings are trivial, five partially nested ones are not. Positions come back as fractions of the column, so a view multiplies them by whatever width it has and never measures anything. The input array is never mutated.
- **`expandToDays` cuts events at local midnights**, since a grid draws one column per day. Each piece says whether it continues past its own edges, which is what lets a view round only the corners that are real ends.
- **`createTimeScale` is the conversion between an instant and a position, and back** — the shared arithmetic of the week grid and the resource timeline, which differ only by the axis it is projected onto. The slot height and the snap step are separate settings on purpose : a grid ruled every thirty minutes while a drag lands on the quarter hour is the usual arrangement, not an inconsistency.
- **`toSchemaPatch` closes the loop.** An adapter that only reads leaves every application to write the conversion back by hand and to get the all-day rule wrong doing it. What comes out is a **patch** — the properties that changed — never an object rebuilt from nine normalized fields, which would drop everything the vocabulary carried and the adapter did not need. The formats match the ones the API pins : `YYYY-MM-DD` for a whole day, millisecond Zulu for an instant. Reading a payload and writing it straight back is a no-op.
- **`normalizeEvent` is the same destination without the JSON-LD**, for a consumer whose events already use these field names.

**Helpers — `helpers/date/configureDayjs`**

- **Five plugins added** — `duration`, `isSameOrBefore`, `isSameOrAfter`, `minMax` and `isoWeek` — all of them already present in the dependency and needed by the schedule helpers. The three existing ones are untouched.

**Lab — new `/lab/scheduler` page**

- **New showcase, which will grow one lot at a time.** It opens on the calculation rather than on a view, because everything drawn later is read off it : eleven deliberately awkward JSON-LD entries go through the adapter and come out as a table of records, with the week navigable and `allDayEndInclusive` on a toggle. The overlap columns and the time scale are shown as numbers for the same reason.
- **The fixture is entirely fictional** — the programme of a town library, under a reserved `example.org` vocabulary. It exists to be difficult : a series scheduled on no day, one scheduled on public holidays, a room reference encoded as a zero, an end date whose inclusiveness is a convention, a house type nothing in the helpers knows about, and a rule nested in an `eventSchedule` array.

## [0.12.1] — 2026-08-13

**Documentation — long-form guides move to a `wiki/`**

- **New `wiki/` at the root of the repository**, with an index and one folder per group mirroring the path under `src/`. The guide shipped in `0.12.0` sat in `src/components/metrics/`, where it read as a source file that is not one : **`src/` stays code**. The JSDoc in each file remains the API reference, and the wiki holds what no single file can say — the shape of a group, which component to reach for, and the recipes that span several of them.
- **`src/components/metrics/README.md` → `wiki/components/metrics/README.md`**, moved as it was : only its links were rewritten. The root `README.md` now points at the wiki rather than into the sources.
- Consequence worth knowing : the guide **no longer ships with the npm package**, since `files` carries `src` and not `wiki`. It stays one click away on GitHub, and the JSDoc — which does ship — is unaffected.

**Build — Tailwind stops scanning markdown**

- **`@source not "**/*.md"` in `src/app/global.css`.** Automatic source detection scans every file that is neither gitignored nor binary, so the class names quoted in prose — the wiki, the changelog, the readmes — were generating CSS nobody asked for. The markdown rendered by the lab is content rather than markup and carries no class names, so nothing on screen depends on it.

## [0.12.0] — 2026-08-13

**Components — new `metrics` group — `CategoryBar`**

- **New `components/metrics/` group.** Micro-visualisations : compact, dependency-free readings meant to sit inside a card or a table cell. They are deliberately *not* in `components/charts/`, which carries the nivo peer dependencies, nor in `components/progress/`, which mirrors the DaisyUI components one to one.
- **New `CategoryBar` component.** A horizontal bar splitting a total into proportional segments — a budget across categories, a quota across plans, a score across bands. Not a progress bar: `Progress` reports one value against a maximum, this shows how a whole is *divided*.
  - **Colours are theme tokens** (`'primary'`, `'success'`, `'base-300'`…), so the bar follows the DaisyUI theme and needs no dark-mode variant. Any other CSS colour — a hex, an `oklch()`, a variable — is accepted too and lands as an inline style, which is how a bar gets aligned with the palette of a chart next to it.
  - **Two ways to label it, for two screen widths.** `showLabels` draws the running totals above the bar, in the manner of a ruler; a label that cannot fit is dropped rather than overlapped. `showLegend` — which needs `items`, since it has names to show — wraps onto as many rows as it needs, and is the better answer on a narrow screen. Both default to `false`: a bar embedded in a card usually has a heading already.
  - **`items` unlocks per-segment tooltips**, on top of the legend: `[ { name, value, color, tooltip } ]`, taking precedence over `values`. This follows the items-or-children shape of `Dropdown`, `Tabs`, `Stats` and `Steps`.
  - **`marker` points at a threshold**, with an optional tooltip, and takes the colour of the segment it lands on. Its value is clamped into the bar, and `animated` eases it to its new position instead of jumping.
  - **`size` is responsive**, scalar or per breakpoint: `size={ { xs : 'xs', lg : 'lg' } }` gives a thin bar on mobile and a thick one from `lg` up.
  - **A zero total renders an empty track** rather than a row of `NaN%` widths, and negative values are floored to zero so they cannot corrupt the denominator every segment divides by.
  - **`role="img"` sits on the bar, not on the container.** The role collapses its whole subtree, and the labels and legend are text worth reading on their own — the same lesson `ChartFrame`'s empty state taught. The label is derived from the data and overridable through `ariaLabel`.
- **New `themes/components/categoryBar` generator**, with `sizes`, `DEFAULT_COLORS` and the usual `after` / `before` / `beforeClassName` / `className` escape hatches.
- **New `themes/components/helpers/resolveBarColor` helper.** Resolves a colour into a class definition when it is a DaisyUI token, and into an inline `backgroundColor` otherwise. Shared, so every future bar-shaped component in `metrics` accepts the same two forms.
- **Segments round their own outer corners** rather than being clipped by an `overflow-hidden` track. The clipping track is the obvious implementation and a trap here: the DaisyUI tooltip renders through `::before` / `::after`, so a tooltip attached to a segment would be cut off by that very overflow.

**Components — `metrics` — `BarList`**

- **New `BarList` component.** A ranked list of values, each drawn as a bar as wide as its share — top pages, top referrers, top error codes. `sortOrder` defaults to `'descending'`, since a bar list is a ranking; `'none'` keeps the order the data came in.
  - **New `max` prop.** Bar widths are relative to the largest value, so the leader always fills its row and the shape of the distribution is what one reads. `max` imposes the scale instead, which is the only way two lists side by side can be compared — normalised each on its own leader, they show the same picture for very different numbers.
  - **`color` applies to the list and to a single row**, through `item.color`. Theme tokens and free CSS colours are both accepted, via the shared `resolveBarColor`. The bar is a tint rather than a solid fill, since the label sits on top of it.
  - **New per-row `icon`**, the favicon-or-flag every analytics panel ends up wanting, and **`showPercentage`**, which appends each value's share of the total in a muted span.
  - **`size` is responsive**, scalar or per breakpoint. The scale is row height, which on a touch screen is also the size of the target: `lg` clears the 40px mark.
  - **`loading` shows as many skeleton rows as the data will have**, so the panel does not jump when the query lands, and an empty list falls back to `EmptyState` — `emptyLabel` / `emptyProps` for the default one, `emptyState` to replace it.
  - **One interactive element per row, at most.** `href` turns the row into a link — a `Link`, or a plain anchor with `target="_blank" rel="noreferrer"` under `external` — and `onSelect` turns it into a button when there is no `href`. A row with neither stays inert. The value cell stays outside the interactive element, as the bar width is measured on the label column alone.
  - **The list is an `<ol>` of `<li>`**, with the bar `aria-hidden`: it is a decorative restatement of the value already written next to it.
- **New `themes/components/barList` generator**, and a `BarListRow` part, both exported for a caller who needs to build the rows themselves.
- **Rows are subgrids.** The list is a two-column grid and every row spans both columns through `grid-cols-subgrid`, so bars and values share the same columns by construction. Laid out as two independent columns — the obvious implementation — the two sides only stay aligned through margins copied by hand on both sides, and drift apart the moment a row changes height.

**Components — `metrics` — `Tracker`**

- **New `Tracker` component.** A strip of blocks, one per observation, where the colour carries the state — ninety days of uptime, the last fifty builds, a month of backups. The shape of a status page.
  - **New `status` per block**, a theme token (`'success'`, `'warning'`, `'error'`, `'base-300'`…) rather than a raw Tailwind class, so the strip follows the DaisyUI theme and needs no dark-mode variant on every one of its blocks. Any other CSS colour is accepted too, through the shared `resolveBarColor`. `defaultStatus` colours a block nothing is known about.
  - **Blocks that cannot be read are dropped, not squeezed.** Ninety blocks across a phone leave each one about three pixels wide: unreadable, and impossible to tap. The track measures itself and keeps as many of the **most recent** blocks as fit at `minBlockWidth` (6px by default), so the same `data` works on a phone and on a dashboard. `maxBlocks` caps it further when the number is known in advance.
  - **The measurement is of the container, not of the viewport.** A tracker inside a narrow side panel on a wide screen gets it right, where a breakpoint could not — and a narrow container keeps the same block count whatever the window does.
  - **New `startLabel` / `endLabel` bounds and `summary`**, the status-page pattern. Both bounds accept a node *or* a `( visible, total ) => node` function: after truncation a fixed "90 days ago" would be a lie, and only the component knows how many blocks are on screen.
  - **The tooltip is the DaisyUI one, which is pure CSS** — an attribute on the block, no state and no portal. That is what lets a track carry ninety of them without ninety React components watching their own hover.
  - **The strip is an `<ol>` of `<li>`**, each block labelled by its tooltip. When no block has anything to say the whole strip goes `aria-hidden`: ninety mute list items teach a screen reader nothing, and the bounds and summary are real text that carries the meaning.
  - **`size` is responsive**, scalar or per breakpoint.
- **New `themes/components/tracker` generator**, and a `TrackerBlock` part, both exported.
- **Nothing in the track clips.** Blocks are flex items that always fit, so the track needs no `overflow-hidden` — which is what leaves the tooltip free to appear above a block. Dropping what will not fit is the component's job, not the stylesheet's: `overflow-x: hidden` forces `overflow-y` to `auto`, so a clipping track would have cut the tooltips off vertically as well.

**Components — `metrics` — `Sparkline`**

- **New `Sparkline` component.** An inline chart glyph — the shape of a series, small enough to sit next to a number. Explicitly not a chart: no axes, no legend, no tooltip, no interaction. It answers "which way is this going" at a glance, and when the reader needs to know *when* or *how much*, that is `LineChart` or `BarChart` in the `charts` group.
  - **Nothing is measured.** The geometry is drawn in a fixed viewBox that CSS stretches to the available width through `preserveAspectRatio="none"`, so the markup renders identically on the server and on the client and a table can hold fifty of these without fifty resize observers. `vector-effect="non-scaling-stroke"` keeps the line at its pixel width whatever the stretch, and the end dot is a zero-length round-capped stroke rather than a `<circle>`, which the same stretch would turn into an ellipse.
  - **One component, a `variant` prop** — `'line'`, `'area'`, `'bar'`. The area is the line closed onto its baseline, and `fill` picks `'gradient'`, `'solid'` or `'none'`.
  - **The domain is the data, not zero.** A sparkline exists to show a shape, and anchoring the scale at zero flattens the very variation it was drawn for. `min` and `max` impose a domain when several sparklines must be read against each other; values outside it flatten against the bound rather than escaping the box.
  - **A missing measurement is not a zero.** Any non-finite entry is a gap, and gaps break the line unless `connectNulls` says otherwise. `data` takes bare numbers or `{ value }` objects.
  - **New `colorByTrend`**, which colours from the direction of travel — success rising, error falling, `base-content` when flat. The flat case deliberately avoids the default colour: under `colorByTrend` the colour *is* the message, and `primary` is red in some themes, where "no direction" would read as "falling".
  - **New `showLast`**, marking the last measurement — including when the series ends on a gap.
  - **Decorative by default.** Sitting beside a title and a number that are already read aloud, the glyph adds nothing a screen reader can use, so it is `aria-hidden`; `ariaLabel` makes it a described `role="img"` instead.
  - Empty series draw a muted baseline rather than an `EmptyState`, which makes no sense at 24px tall; a single point draws a point; a flat series draws its mid line, with half-height bars and an area filled to the floor so the glyph still reads as data.
- **New `themes/components/sparkline` generator**, with `sizes`, `variants`, `fills`, `TREND_COLORS` and the viewBox constants.
- **`resolveBarColor` is now one of two wrappers over a new `resolveColor( value , { getter , styleProp } )`**, joined by `resolveTextColor`. Which CSS property carries a colour changes with the mark — a bar paints its background, an SVG paints `currentColor` — and the token-or-inline-style rule is now stated once instead of being copied per component. `resolveBarColor` keeps its signature, so nothing that used it changed.

**Components — `metrics` — `Delta`**

- **New `Delta` component.** A change, its direction, and the verdict on it — the two being deliberately kept apart. The *direction* is a fact and the arrow states it; the *judgement* depends on the metric and the colour states that. More visitors is good news; more errors, more churn, more latency, more cost is not.
  - **New `inverted` prop**, for the metrics where falling is the good news. Its rule is worth stating plainly: **it swaps the colours, never the arrow.** An error rate that fell shows a downward arrow, in green. Swapping the arrow too would make the component lie about the data.
  - **`value` is a ratio** under the default `format="percent"` — `0.124` reads as `+12.4 %` — and the raw number under `format="number"`. Being explicit about it is what keeps the classic factor-of-100 mistake out.
  - **New `from` / `to`**, which work the change out rather than leaving the caller to divide. The denominator is the **absolute** starting value, so a metric climbing back from a negative baseline does not come out falling, and growth from zero — which has no ratio — is reported as unavailable rather than as an invented `+100 %`.
  - **Numbers are formatted in the reader's language**, through `Intl.NumberFormat` and the language of the surrounding `LangProvider` — which resolves it server-side from a cookie, so the decimal separator is settled before hydration rather than after it. The context is read defensively rather than through `useLang`, which throws: a library component has no business requiring a provider just to print a number, and outside one it falls back to a **fixed** locale rather than to the runtime default, which would reintroduce the mismatch. `locale` overrides it, `valueFormatter` replaces it.
  - **New `variant`** — `'badge'` (default, on top of `Badge`, so `size` and `style` come with it) or bare `'text'`, which is what sits under a number in a `Stat` without weighing it down.
  - **New `neutralThreshold`**, default `0`: above it, a change smaller than the threshold reads as no change at all, because `+0.2 %` is noise rather than a trend.
  - **A missing value renders a quiet dash**, so a tile whose data has not landed yet keeps its layout.
  - **The sign always lives in the text**, never in the arrow alone, which is decorative and hidden: a change read out without its direction is worse than no change at all. `ariaLabel` adds context through an `sr-only` line rather than through `aria-label`, which a plain `span` does not expose — and inventing a `role="img"` over a piece of text would be worse than the spare sentence a screen reader actually wants.
- **New `themes/components/delta` generator.** The "no change" colour differs between the two variants on purpose: a badge takes a *badge* colour, where `neutral` reads as a muted chip, and bare text takes a *text* colour, where `base-content` is simply the body colour it would have had. `base-content` is not a badge modifier at all.

**Components — `metrics` — `MetricLegend`**

- **New `MetricLegend` component**, extracted from `CategoryBar`'s internal legend and shared from there. A coloured mark, a name, and — when there is one — a value: what sits under a category bar, next to a tracker, or below a row of sparklines.
  - **The value is optional, and that is the whole difference between two kinds of legend.** A partition names its shares and states their size; a set of series only names its colours. An entry with no `value` renders its name alone rather than an invented zero, and `0` is still a value like any other.
  - **New `marker` prop** — `'dot'` (default), `'square'`, or `'line'`, a short stroke for a legend sitting under a set of sparklines, where a dot says nothing about which curve it stands for.
  - **`orientation` and `size` are responsive**, scalar or per breakpoint: `orientation={ { xs : 'vertical', md : 'horizontal' } }` stacks the entries on a phone and lines them up from `md` up. Both orientations set every layout property rather than the difference between them — a `flex-wrap` left over from the horizontal default would keep wrapping a column.
  - **The default size reproduces what the legend already was** (`xs`, `sm` from the `sm` breakpoint up), so the existing `CategoryBar` legend is unchanged to the pixel.
  - **Per-entry `tooltip`**, through the DaisyUI tooltip, like the segments of a category bar.
- **`CategoryBar` now renders that component**, with `showLegend` and `legendClassName` untouched, plus a new **`legendProps`** to reach the legend's `marker`, `orientation` and `size`. `themes/components/categoryBar` loses its three legend exports accordingly.
- **New `Tracker` `legend` prop** — `[ { name, status, value, tooltip } ]`, drawn under the bounds row, with `legendClassName` and `legendProps` alongside it. **The counts are the caller's to compute**, deliberately: the strip drops the blocks that do not fit its container, so a count derived by the component would describe either the period or the screen, and never obviously which of the two.
- **New `themes/components/metricLegend` generator**, with the usual `after` / `before` / `beforeClassName` / `className` escape hatches.

**Components — `metrics` — `CategoryBar` reads as a bullet graph**

- **New `measure` prop.** Given one, the segments stop being shares of a whole and become the *qualitative bands* of a bullet graph — Stephen Few's answer to the dashboard gauge: the measure is drawn over them as a thin rule from zero, `marker` becomes the target, and three of them stacked on a shared `max` compare at a glance, which no gauge does. Takes a number, or `{ animated, color, ring, tooltip, value }` when there is more to say than the value.
- **New `max` prop**, the scale the bar is drawn against — the same word, and the same meaning, as `BarList`'s. It can only **extend** the domain past the segments, never squeeze them: allowed to shrink it, it would push the last bands off the end of the track, and there is no honest way to draw that. The part of the domain no band covers is filled, and the last band stops square rather than rounding into it.
- **New `contiguous` prop, on by default under `measure`.** The segments are flex items sized in percentages of the whole track, so the gaps between them are taken *on top* of those percentages: a band announced at 60 % ends slightly left of the 60 % mark, and the drift accumulates rightwards, while the marker and the measure — positioned on the track itself — land exactly where the scale says. Nobody notices on a partition; on a bullet, comparing the tip of the measure to a band boundary **is** the reading.
- **New `xl` size**, because a measure drawn inside the track needs a track thick enough to still show the band under it. The measure is half the track, and `md` is the practical floor for a bullet.
- **A measure makes the bar a meter, and it is now typed as one**: `role="meter"` with `aria-valuemin` / `aria-valuemax` / `aria-valuenow` / `aria-valuetext`, where a plain partition keeps `role="img"`. Each role is a literal in its own branch rather than computed, so static analysis can still check it against the attributes that go with it. A native `<meter>` is not an option: it is a replaced element that draws a gauge of its own and treats its children as fallback content, so the bands, the measure and the marker would never be painted.
- **The measure defaults to `primary`, and the bands to nothing at all.** Few drew the measure in black over grey bands, on paper, where black *was* the ink; on a themed screen the same bar reads as a slab and hides the bands it exists to be compared against. Here the measure is the data — the role `primary` already plays for `Sparkline` and `BarList` — and the bands are muted ground. `QUALITATIVE_COLORS` is exported for them but deliberately **not** made the default: swapping a palette on the presence of a prop is the kind of magic that makes a component impossible to predict.
- **`QUALITATIVE_COLORS` are tints of `base-content`**, not `base-*` surfaces. A surface token only reads against *other* surfaces — `base-200` bands vanish on a `base-200` card, which is exactly where a bullet ends up. A tint of the content colour is drawn against whatever it sits on and flips with the theme on its own, with no `dark:` variant and nothing to re-tune per card.
- **`resolveColor` takes a ready-made utility class**, through a new `prefix` option wired into `resolveBarColor` (`bg-`) and `resolveTextColor` (`text-`). This is what makes *translucent* colours reachable at all: `base-content/20` is no theme token, and as an inline style it would be nonsense, yet it is the only kind of colour that reads on any surface in both themes. The three forms a colour can now take are a theme token, a utility class, or any CSS colour.

**Documentation — the `metrics` guide**

- **New `src/components/metrics/README.md`**, the first per-group guide — shipped with the package (`files` carries all of `src`) and rendered by GitHub when browsing the folder, so it sits next to the code it describes rather than in a documentation tree that rots on its own.
- It covers what the group is **not** (`charts/`, which carries the nivo peer dependencies; `progress/`, which mirrors DaisyUI one to one), a table of the seven readings and the question each answers, and the rules that hold across all of them: the three forms a colour takes, responsive size props, the CSS-only DaisyUI tooltip and the `overflow` constraint that comes with it, `items`-or-raw, and the degenerate cases that are handled rather than left to divide by zero.
- **Four recipes, with complete code**: the KPI tile (`Stat`'s `figure` and `description` slots, hence still no KPI component), the bullet graph, the status page, and the analytics panel.
- **An accessibility section**, which is the part no screenshot shows and the reason these are components rather than snippets.
- **No hand-copied props table**: the JSDoc in each file is the API reference, and a table restating it diverges within two commits.

**Demo — `/lab/metrics`**

- **The page filters down to one component.** Six sections had grown past what one scroll can hold, so a tab row — the `Tabs` component, controlled, with `aria-selected` carrying the state — keeps a single demo on screen; `All` still shows everything, which is what makes the sections comparable. The row scrolls horizontally on a phone rather than wrapping.
- **New `MetricLegend` demo** covering the marker shapes, the responsive orientation, the sizes, entries without a value, free colours, the legend inside `CategoryBar`, and the recipe the `line` marker exists for: three sparklines in one tile, each identified by a stroke of its own colour.
- **New legend section in the `Tracker` demo**, with the counts worked out by the demo itself.
- **Three bullet sections in the `CategoryBar` demo** — the reading itself, on neutral bands and on saturated ones; an explicit domain with the remainder showing; and three indicators on one scale, which is the argument for the shape. Plus a **measure colour** section putting the three accepted forms side by side, and `xl` added to the thickness row.
- **New showcase page** listing the `metrics` components, with a `CategoryBar` demo covering thickness, labels, marker, named segments and legend, free colours, and the edge cases, a `BarList` demo covering formatting, sizes, colours, the shared scale, clickable rows and links, and the loading and empty states, a `Tracker` demo covering states, heights, bounds, the explicit cap, and the same ninety days at three container widths, and a `Sparkline` demo covering variants, heights, domain, fill, trend colouring, the edge cases, and a **KPI tile recipe** — `Stats` + `Stat` with the sparkline in its `figure`, and a `Delta` demo covering `inverted`, both variants, the formats and their localization, the neutral band, `from` / `to`, and the missing value. The recipe is complete at the end of the `Delta` demo: sparkline in `figure`, delta in `description`, and **still no KPI component** — `Stat` already documents both slots.
- **New `demo` locale namespace** (`@locale/demo/`), for strings that belong to a demo rather than to a page. The page itself is localized under `app.lab.metrics`, like the rest of the lab.

## [0.11.0] — 2026-08-09

**Components — `Calendar` — blocking whole weekdays**

- **New `disabledWeekdays` prop.** Blocking every Saturday and Sunday was only reachable through the function form of `disabledDates` — `d => [ 0 , 6 ].includes( d.getDay() )` — which works but is neither documented nor discoverable, and forces a per-day predicate call where a set lookup does. The prop takes `0`–`6` (0 = Sunday) or `'sun'`…`'sat'`, alone or in an array, and combines with `disabledDates` and the `min` / `max` bounds. Weekday numbers are **absolute**: they do not follow `weekStartsOn`, so the same value always designates the same day whatever the locale renders first.
  - In range mode the rule behaves exactly like a blackout date: by default a selection stops before the first blocked day, so week-ends off means no range longer than a working week. `allowDisabledInRange` lifts that, unchanged.
- **New `createDisabledModel` helper (`@/helpers/date/createDisabledModel`).** One place now decides whether a day is selectable, from every rule at once, and — this is what it adds over `createDisabledMatcher` — says *which* rule matched. `createDisabledMatcher` is untouched and still exported; it became the blackout branch of the model.
- **`normalizeWeekday` moved to `@/helpers/date/weekdays`**, next to the new `normalizeWeekdays`, since it is no longer the week-grid's private business. It is still re-exported from `@/helpers/date/getMonthMatrix`, so existing imports are unaffected.

**Components — `Calendar` — blocking months and years**

- **New `disabledMonths` and `disabledYears` props.** Until now the quick month and year pickers only knew the `min` / `max` bounds — there was no way to say "never August" or "nothing from 2030 on". Blocking a month meant blacking out each of its days one by one, which greyed the day grid but left the month's own button live in the picker, so the user landed on a fully struck-through month with nothing telling them why. `disabledMonths` takes a month index (0–11, every year), a `{ year, month }` pair, an array of those or a `( year, month )` predicate; `disabledYears` takes a year, a `{ from, to }` range with either bound optional, an array or a `( year )` predicate — the same grammar `disabledDates` already used.
- **Rules cascade downwards.** A blocked year blocks its twelve months and all their days; a blocked month blocks its days. Each level reports the reason it inherited, so a day greyed out because its year is off says `'year'`, not `'blackout'`.
- **Navigation stays free.** Blocked ≠ unreachable: the `‹ ›` arrows still walk through a blocked month to reach the next one. Only `min` / `max` ever bound navigation — see below.
- **New opt-in `deriveEmptyMonths`.** The reverse direction — a month whose every day happens to be blacked out showing as blocked in the quick picker — costs a scan of that month, so it stays off by default. When on, such a month is reported as a *blackout* rather than as a month rule and is struck through accordingly: nothing declares it blocked, its contents do. It is never applied to years; twelve month scans per cell over a twelve-year page is not a price a quick picker should pay.
- **The bounds cascade compares integers, not dates.** The year/month check runs once per day cell; building a dayjs there allocated forty-two objects a month for a pair of comparisons.

**Components — `Calendar` — internal grids**

- **`MonthsGrid` and `YearsGrid` take a `getMonthReason` / `getYearReason` callback** in place of their `minDay` / `maxDay` and `minYear` / `maxYear` props. They had been re-deriving from the bounds what the model already knows, and could not have seen the new rules at all. Both are internal parts of `Calendar`; a call site importing them directly must pass the callback instead.
- **`getCalendarCellClasses` takes a `disabledReason`**, and strikes a cell through only when it is explicitly `'blackout'`. Called with `disabled` alone it renders exactly as before — the opposite default to the day cells, because a month or a year cell is structural by nature.

**Components — `Calendar` — navigation stops at the bounds**

- **The `‹ ›` arrows no longer walk out of `min` / `max`.** They were never disabled: with bounds set, one could page forever into months where every day was greyed out, and nothing said the bound had been passed. All three levels are now bounded — the month arrows, the year chevrons of the quick month picker, and the 12-year pagination of the year picker. The rule is simply never to bring into view a month, year or page that is entirely outside the bounds, which in the dual-month view accounts for both columns.
  - *Visible change*: a `Calendar` given `min` and / or `max` now disables the corresponding arrows at the edge. One without bounds navigates as freely as before.
- **Only `min` / `max` ever bound navigation.** A month or a year blocked by `disabledMonths` / `disabledYears` stays reachable on purpose: blocked is not unreachable, and the month behind a blocked one has to be reachable too.

**Components — `Calendar` — a day crossed by a range**

- **A blocked day spanned by a range is no longer painted as part of it.** Under `allowDisabledInRange` such a day got the full `bg-primary/20` fill of the selection, claiming a day the selection does not contain. It now keeps the band's square corners — so the span still reads as one range — over a neutral `bg-base-300` fill instead of the primary one. With week-ends blocked, a fortnight shows them as two gaps inside the band, which is what the value actually holds.
  - This is the whole of the "third range mode" the audit raised. A `'skip'` semantic on top of `allowDisabledInRange` would have added API for something the caller already knows: it wrote the rule.

**Components — `Calendar` — how a blocked day looks**

- **A blocked day is now struck through only when it is an exception.** Every non-selectable cell used to get `line-through`, which reads right for a public holiday and turns the grid into a checkerboard once whole weekdays are blocked. `getCalendarDayClasses` takes a `disabledReason` — `'bounds'`, `'weekday'` or `'blackout'` — and reserves the line-through for the last one; structural blocks are muted and inert, nothing more. Called with `disabled` alone and no reason, it renders exactly as before.
  - *Visible change*: days outside `min` / `max` lose their line-through and stay muted. They were never an exception either.
- **A range preview no longer runs past `min` / `max`.** The cap that stops a range before the first blocked day only consulted the blackout dates, so hovering beyond a bound previewed a range that the click then refused. It now consults the whole model.

**Components — the three date pickers — the rules reach the field**

- **`disabledDates`, `disabledWeekdays`, `disabledMonths` and `disabledYears` are now first-class props** of `InputDatePicker`, `InputDateRangePicker` and `InputDateTimePicker`, forwarded to the `Calendar` before the `calendarProps` spread — which therefore still overrides them, like `min` / `max` already did. They were reachable only through `calendarProps`, undocumented as such, and invisible to the field itself.
- **New opt-in `strict`: the keyboard no longer accepts what the click refuses.** A date typed into the masked field never goes through the grid, so a blocked day could be entered by hand and emitted through `onDate` / `onDateRange` / `onDateTime` as if it had been picked. The blackout was an interaction constraint of the calendar, not a constraint on the value. With `strict`, such a date is refused instead: the handler stays silent, the text stays in the field, the field goes into error, and the optional `onDisabledDate` is called with what was refused. Default `false` — nothing changes for an existing call site.
  - The message is localizable (`components.picker.*.disabled`, fr + en) and overridable per field with `disabledLabel`.
  - `error` becomes an explicit prop on the three pickers rather than travelling in `rest`, so `strict` can take the field over without discarding a host-supplied message when it is not refusing.
  - On the range picker, `strict` validates the **endpoints**, not the span: whether a range may cross a blocked day is `allowDisabledInRange`'s business, and that belongs to the grid. On the date-time picker it applies to the date part only; the time columns are not filtered.
- **New `useDisabledModel` hook (`@/hooks/useDisabledModel`)**, so the three pickers build the model once, from the `Date` bounds rather than from dayjs instances that are rebuilt on every render.

## [0.10.0] — 2026-08-07

**Components — inputs — the `onChange` contract**

- **`InputCurrency` and `InputCardNumber` could not retain a single keystroke.** Both read their handler argument as `event?.target?.value ?? ''`, but `Input` never hands its `onChange` the DOM event: it routes the event through `useTransformValue`, which emits the transformed *value*. So `event.target` was `undefined`, the fallback returned `''`, and the parse that followed produced `NaN` — writing an empty value straight back into the controlled field on every keypress. Neither component had ever worked; the defect dates from the first commit. `InputCardNumber` was reached despite its mask, and reported `unknown` to `onCardTypeChange` for every card.
- **New `readInputValue` helper (`@/helpers/react/readInputValue`).** Eleven sibling components already carried the same fallback, hand-written in three slightly different variants — the two that got it wrong differed from the eleven precisely because each copy was rewritten rather than imported. All thirteen now call one helper, which accepts a DOM event or a bare value, and lets numbers through (a `process` prop may legitimately produce one before `onChange` fires).
- **The contract is now documented** on `Input`, `TextArea` and `useTransformValue`: their `onChange` receives the value, never the event. The helper alone treats the symptom; the missing sentence is what let three components guess right and two guess wrong.
- **`InputPercentage` is unaffected — and was never broken.** It passes `onChange` straight to `Input`, but it also passes `process`, so `useTransformValue` calls it with `process( transformed )` — a number, exactly as its JSDoc claims. Only its doc changed, to say that an empty field yields `null`.

**Components — `InputCurrency` — masked display**

- **The mask no longer collapses while you type.** `InputCurrency` fed its parsed *number* back to `Input` as the controlled value, so React overwrote Maskito's string with `String( value )` on every keystroke: the postfix and the thousand separators vanished during entry and only reappeared on blur — `1 234,50 €` typed back as `1234.5`. The masked string and the numeric model are now two distinct things. While the field holds focus Maskito owns the string; out of focus the display follows the model, so a value from the host, a stepper click and the blur normalization all reformat as before.
- **`onBlur` and `onFocus` are now explicit props rather than members of `rest`.** They were spread onto `Input` *after* the internal handler, silently replacing it — a call site passing its own `onBlur` lost the blur normalization without any sign. Both now run: the component's first, the host's after.
  - *Migration*: a call site passing neither is unaffected. One passing `onBlur` will now also see the value normalized on blur, which is what it was meant to get.

**Components — inputs — handlers swallowed by the props spread**

The `InputCurrency` blur fix above turned out to be one instance of a pattern: a component sets its own handler on the element and then spreads `{ ...rest }` after it, so a call site passing that same handler replaces the internal one outright. No warning, no type error — the component's own logic simply stops running. Three cases were reachable from outside the library.

- **`InputCounter` — a host-supplied `onBlur` disabled the blur normalization.** Passing `onBlur` meant the value was no longer clamped to `min` / `max` nor rounded to `precision` when the field lost focus. The component's own `rest.onBlur?.()` call was dead code: it sat inside a handler that could never run in that case.
- **`InputUrl` — a host-supplied `onBlur` disabled `autoProtocol`.** Same shape: the `https://` prefix was never added, and the same dead `rest.onBlur?.()` call.
- **`InputSearch` — a host-supplied `onKeyDown` stopped Enter from triggering `onSearch`.** This one was a pure replacement — the internal handler never chained the host's, so the two could not coexist in either direction.

All three now take the handler as an explicit prop and call it after their own, the idiom `InputAction` already used. A call site passing nothing is unaffected; one that passed a handler gets the behaviour it should have had all along, in addition to its own.

The same shape sat in `Input`, `TextArea` and `InputPin` — the three base components — where nothing had yet triggered it. Closing it there is what stops the next component from inheriting it.

- **`Input` and `TextArea` take `onBlur` as an explicit prop.** It used to travel in the props spread and land on the element after `onBlur={ handleTransformBlur }`, so passing one turned off `processOnBlur` and `revertOnBlurIfInvalid` for that field — silently, since `useTransformValue` was still being handed the very handler it would never get to call. Both now run: the hook's blur pass first, the call site's handler last, exactly as `useTransformValue` always intended.
- **`InputPin` spreads `{ ...rest }` first rather than last**, the way `TextAreaCode` already did. Placed last it overrode the per-box handlers — arrow-key navigation, paste-to-fill, select-on-focus — and, worse, the `maxLength={ 1 }` that makes the component a row of single-character boxes at all.
  - *Migration*: a call site passing `onBlur` to `Input` or `TextArea` will now also get the hook's blur processing, which is what it was documented to get. One relying on props in `rest` to override `InputPin`'s own input attributes will no longer win that contest — pass the component's own props instead.
- **The nine escape-hatch props stop being able to unplug their component.** `pickerProps`, `modalProps`, `calendarProps` (three pickers), `inputProps` (`I18nInput`, `InputModal`), `textAreaProps` and `textAreaMarkdownProps` were all spread *after* the handler wiring them to their host, so a handler passed through one of them replaced it: colour selection, date picking, the i18n write, `openOnFocus`, the colour modal's Apply. Each component's own handler is now applied after the spread. Everything else — `shortcuts`, `months`, `presets`, `maxWidth`, `value`, `min`, `max` — stays overridable exactly as before, which is the whole point of an escape hatch and the only way anything in the repo uses them.
- **Four of those props were not documented at all**, and the five that were said nothing about what may be passed. Each now states which handler it cannot replace. `modalProps` keeps its documented power to override the Modal's defaults, narrowed to the presentation ones: `onAgree` is wiring, not a default.
- **`Tilt` kept neither its handlers nor its styles.** Passing `onMouseMove` or `onMouseLeave` removed the tilt outright, since those two handlers *are* the effect. `style` mattered just as much and was easier to reach for: the element carries the `perspective` and the `transition` the effect depends on, and a call site setting a margin replaced both. Handlers chain now, and the caller's `style` merges over the effect's rather than displacing it.

**Documentation**

- **`Range` and `ListRow` now say what their callback receives.** Auditing the value-versus-event contract turned up two callbacks documented too thinly to act on: `Range.onChange` (a `number`, or the sorted `[start, end]` tuple in `range` mode — never the DOM event) and `ListRow.onClick` (called with no arguments at all, and only while the row is not `disabled`). Both were correct in code and unguessable from the doc, which is the shape every bug in this release started from.

**Lab**

- **The controlled `TextArea` demo threw on the first keystroke.** It read `event.target.value` from a handler `TextArea` calls with the value, so `event.target` was `undefined` and the property access raised a `TypeError` — the same contract the two input components got wrong, except here it crashed the tab outright instead of quietly emptying a field. It takes the value directly now, and carries a probe of its own.
- **New `ValueProbe`, and probes in the currency, card and percentage demos.** The currency demo rendered the component eleven times and asserted nothing about typing — which is exactly how a field that discarded every keystroke stayed invisible for so long. The probe prints the value a field hands back and its type; the currency demo pairs a controlled field with an uncontrolled one so both paths through `useValue` are visible at once.

**Components — picker family (i18n) — BREAKING**

- **`Popover` now localizes its footer.** `applyLabel` and `cancelLabel` resolve prop → i18n bundle at the new `path` prop (default `components.picker`) → English last resort, the same three steps `Modal` took in 0.9.0. They were hardcoded `'Apply'` / `'Cancel'` in the signature, so every picker built on `Popover` had to restate them — and every *app* screen had to restate them again on top.
- **BREAKING — `InputTimePicker`, `InputDateRangePicker` and `InputDateTimePicker` no longer declare their own `applyLabel` / `cancelLabel` defaults.** They forwarded hardcoded values to `Popover` unconditionally, shadowing it exactly as the modal presets shadowed `Modal`. The two footer buttons are now left undefined and `Popover` answers for them.
- **Each picker keeps only the labels that name *what* is picked**, read from its own sub-block: `clear` and `open` from `components.picker.{date,dateRange,dateTime,time}`. A shared « Effacer » would tell a screen reader nothing — « Effacer la période » does.
- **`InputColor` is the exception, and reads `apply` / `cancel` itself.** It opens a `Modal` rather than a `Popover`, so deferring would have given it the modal vocabulary (« OK ») instead of the picker one (« Appliquer »). Its `clearLabel` and `title` come from `components.picker.color`.
- `InputDatePicker` joins the same chain for `clearLabel` / `triggerLabel`, though it never had a footer to begin with.
- New **`@locale/components/picker.js`** bundle (`fr` / `en`): the two footer labels, plus one sub-block per picker.
  - *Migration*: a call site passing its own labels is unaffected. One relying on the implicit defaults without a `components.picker` bundle keeps the same English last resort.

- **`TimeColumns` and `ColorPicker` localize the labels their hosts never exposed.** The "Now" button (`components.picker.time.now`), the preset-palette heading and the eyedropper aria-label (`components.picker.color.{presets,eyeDropper}`) were hardcoded English — and, worse, **unreachable from the outside**: neither time picker forwarded `nowLabel`, and `InputColor` exposes `presetsLabel` / `eyeDropperLabel` only through the `pickerProps` escape hatch. Reading them from the bundle is what makes them localizable at all, not merely convenient. « Now » was visible in the date-time picker of every French screen.

**Components — accessible names (i18n)**

- **The five sortable components share one `handle` key.** `SortableFlexItem`, `SortableGridItem`, `SortableListRow`, `SortableTableRow` and `SortableTreeItem` each declared the identical `'Drag to reorder'` string. They now read `components.sortable.handle`, and `SortableTreeItem` its `toggle` alongside — a handle is a handle whatever it drags, and naming it five times is five chances to drift.
- **`InputPassword` and `InputCounter` / `InputCurrency` localize their controls** through the new `components.input` bundle (`password.{show,hide}`, `counter.{decrease,increase}`). Like the sortable handles, no host ever passed them, so a screen reader announced "Show password" and "Increase" on an otherwise French form.
- New **`@locale/components/sortable.js`** and **`@locale/components/input.js`** bundles (`fr` / `en`).
- Nothing here is visible copy — these are `aria-label` (and `title`) values only, so no screen changes. Each keeps its prop as an override and its English string as a last resort, the same three-step resolution as `Modal` and `Popover`.

**Lab**

- The three picker demos stop hardcoding `applyLabel="Appliquer"` / `cancelLabel="Annuler"` (and `title`). They were masking the very resolution they should exercise — switching the lab language and reopening a picker is now the regression test.

## [0.9.0] — 2026-08-05

**Components — modal family (i18n) — BREAKING**

- **`Modal` now localizes its own labels.** `agree`, `disagree` and `closeTitle` each resolve in three steps: the explicit prop first, then the i18n bundle read at the new `path` prop (default `components.modal`), then an English last resort. Until now the three were hardcoded English defaults in the signature, so **every single call site had to re-supply them** or leak an English label — a forgotten `disagree` surfaced a stray "Cancel" in an otherwise French dialog, and `closeTitle` was so easy to overlook that a consuming app had it on 2 modals out of 39. Leave the props out and the modal localizes itself; pass one for the genuinely one-off label a bundle should not carry.
- The bundle lookup is **non-throwable** (`useI18n( path , NO_LOCALE , false )`), unlike `Pagination`'s: a `Modal` renders on public pages that may sit outside any `LocaleProvider`, and the English last resort covers that case rather than crashing.
- New **`@locale/components/modal.js`** bundle (`fr` / `en`), carrying the base `agree` / `disagree` / `close` and one sub-block per preset.

- **BREAKING — `ConfirmModal`, `AlertModal` and `InputModal` no longer declare their own label defaults.** They used to destructure `agree = 'Confirm'` / `'OK'` / `'Apply'` and `disagree = 'Cancel'` and forward them **unconditionally**, so `Modal` always received a defined value and could never tell "not supplied" from "supplied". That shadowing is what made the fix above impossible without touching them. Each preset now owns only the label that genuinely differs from the base — its `agree`, read from `components.modal.{confirm,alert,input}` — and leaves `disagree` and the close button to `Modal`. `InputModal.actionLabel` follows the same rule (`components.modal.input.action`).
  - *Migration*: a call site that already passes its own labels is unaffected. One that relied on the implicit defaults **without** a `components.modal` bundle now reads `'OK'` where `ConfirmModal` used to read `'Confirm'` — declare the bundle, or pass `agree` explicitly.
  - `AlertModal` also stops forwarding `disagreeColor`, which was inert next to its `showDisagree={false}`.
- Presets no longer inject their footer props when a **`footerNode`** is present. They previously forwarded `agreeColor`, `showAgree` and friends in every case, which tripped `Modal`'s development warning with a list of prop names the caller had never written.

**Components — `Modal` (footer)**

- **Fixed — `footerClassName` was applied twice**, on the sticky footer wrapper *and* on the inner `modal-action` row through `getModalActionClasses`. A single `justify-between` or `px-4` landed on two nested elements at once. It now goes to the `modal-action` row only, which is what call sites actually aim at, and the wrapper stops building its class list by string concatenation — the one spot in the file bypassing `cn()`, and therefore tailwind-merge.

**Components — `SplitPanel`**

- `closeAriaLabel` joins the same resolution chain, reading `close` from the new `components.splitPanel` bundle at the new `path` prop. Its hardcoded default was `'close panel'` — untranslated, and lowercase where every other accessible name in the library is capitalized.

**Contexts**

- New **`contexts/locale/noLocale.js`** exporting `NO_LOCALE`, the frozen empty object handed to `useI18n` when no bundle is expected to answer. Hoisted so every component passes the same reference across renders instead of allocating a fresh `{}` each time.

**Locales**

- Removed `@locale/components/buttons/inputClear.js` — byte-for-byte identical to `clear.js`, and referenced by no component. `clear.js` also declared its object as `const inputClear`, a copy-paste slip.

**Lab**

- `/lab/modals` gains a **Localized labels** block: a `Modal`, a `ConfirmModal` and an `AlertModal` with no label prop whatsoever. Switching the lab language and reopening them is the regression test for the whole resolution chain, including the accessible name of the header close button.

## [0.8.1] — 2026-08-02

**Components — `InputDate` / `InputDateRange` (parse-effect loop fix)**
- **Fixed — an inline `onDate` / `onDateRange` handler could loop the page** ("Maximum update depth exceeded", met in production in a quote-creation modal). The parse effect keys on the handler, which parents recreate on every render — `InputDatePicker` does, and apps pass inline arrows — so it re-ran on every parent render and re-emitted a **fresh `Date` instance** each time; any non-idempotent setState in the handler then fed the next render, closing the loop. A ref now stamps the last emitted value (`getTime()`, a `start:end` pair for the range, or `null`) and the handler is only called when the parsed value **actually changed**. The first emission on mount is preserved, including `null` for an empty field.
- `min` / `max` join the parse-effect deps — they take part in parsing and were missing, and the stamp guard makes their per-render identity churn (`min={ new Date() }`) harmless.
- Audited and left alone, already sound : `InputDateTimePicker` keeps `onDateTime` out of its effect deps, `useTime` bails out through `usePrevious`, and `InputDatePicker`'s per-render handlers are fine once the emission is idempotent.

**Lab**
- `/lab/dates` gains a regression block : both pickers wired to inline handlers doing a never-idempotent setState (a counter plus a fresh object) — the exact shape that looped. The visible emit counters must settle at one emit on mount, plus one per real change.

## [0.8.0] — 2026-07-30

**Components — `Steps` / `Step` (new)**
- New **`Steps`** and **`Step`** (`components/steps/`) — an ordered process on DaisyUI's `steps`: a checkout funnel, a multi-part form. `Steps` takes `items` or raw `<Step>` children, the same pair of shapes `Dropdown`, `Tabs` and `Stats` accept.
- **`current` does the colouring.** In raw DaisyUI you place `step-primary` by hand on every step already reached. Here an index or an item `id` drives it, through **three independent colours** so the three states can be told apart: `color` for the steps behind (default `primary`), `currentColor` for the one in progress (falls back to `color`), `upcomingColor` for those ahead (omitted leaves DaisyUI's grey). An item's own `color` beats all three, and leaving `current` unset disables the automatic colouring entirely.
- **Fixed the progress bar ending one step early.** DaisyUI tints the connector reaching a step only when the step before it carries the same colour — that pairing *is* the filled bar. Give the current step a colour of its own and the segment leading up to it drops back to grey, even though that ground has been covered. The connector reaching the current step is therefore coloured with `color`, independently of the bubble, through a `before:bg-* before:text-*` literal per colour (the connector's `border: 1px solid` takes its colour from `color`, so both have to be set). The bar now runs to where the user stands and the bubble alone marks the state. Skipped on the first step, which has no connector, and on any step carrying its own `color` — there the caller has taken over. Also exposed as `connectorColor` on `Step` for the composed form.
- **Steps can be activated.** An item with `onClick` renders its label as a `<button>`, one with `href` as a `next/link` — the pattern `Dropdown` already uses. `href` plus `disabled` falls back to a disabled button, a disabled link being no such thing.
- **The container is an `<ol>`, not DaisyUI's `<ul>`**, since a process is ordered and the CSS only ever targets classes — the change is free. The step at `current` carries **`aria-current="step"`**: without it a screen reader reads a flat list of labels with no idea where the user stands, and the numbered bubble is no help, being generated by a CSS counter and therefore neither selectable nor reliably announced.
- **Three mutually exclusive ways to fill the bubble**, in DaisyUI's own order: `icon` *replaces* it (the selector is `& > .step-icon, &:not(:has(.step-icon)):after`, so the pseudo-element and its counter step aside), `content` feeds `data-content` and overrides the counter (an empty string blanks the bubble), otherwise the counter numbers the step.
- `direction` accepts a breakpoint object like `Stats`, through `getResponsiveDefinition` — worth reaching for, since `.steps` is an `inline-grid` with `overflow: auto hidden` and would otherwise scroll sideways on a narrow screen instead of stacking.

**Themes — `themes/components/step.js` (new)**
- `getStepsClasses`, `getStepClasses` and `getStepIconClasses`. Step colours are a **closed DaisyUI set** of eight, not the open `textColor` map, because `step-*` also tints the connector — so only the classes DaisyUI ships can work.

**Lab**
- New **`/lab/steps`** page under *Display*: a live funnel with Previous / Next, the three colour rows and labels that can be clicked to go back; the three bubble mechanisms; direction with its responsive form; and free per-step colours with no `current` at all.

**Components — `ChartFrame` (empty state on `EmptyState`, and an accessibility fix it exposed)**
- **Fixed — the empty state was unreadable to a screen reader.** The frame carries `role="img"`, which collapses its whole subtree into one labelled image. That is right for a chart and wrong for a placeholder: only `ariaLabel` was ever announced, the empty text never was, and anything richer put in its place — a description, a retry button, a live region — would have been swallowed silently. The role and its label now **step aside while the frame is empty**, so the text inside speaks for itself. Loading keeps the role: the frame still stands in for the chart that is coming, nothing readable is hidden, and `aria-busy` needs a role to sit on.
- **The default empty state is now an `EmptyState`** instead of a bespoke centred line, so charts share the look and the structure of every other empty surface in the library. Visible change: the label goes from muted, normal weight to the `EmptyState` title — semibold at full contrast.
- **New `emptyProps`**, spread onto that default `EmptyState` for an icon, a description, actions or `announce`. It is reachable **on `ChartFrame` itself only**: the fourteen chart wrappers forward `emptyLabel` and `emptyState` and were deliberately left untouched, so from a chart a rich empty state goes through `emptyState={ <EmptyState … /> }`.
- The role is still written as a **literal in two return branches** rather than computed. A conditional `role` reads better but blinds the ARIA lint rule — which is exactly how the `aria-busy` / `aria-label` mismatch a first attempt introduced here got caught.
- **Lab** — `/lab/charts` gains a second empty chart next to the existing one, carrying an icon, a description and a *Réinitialiser* button. That composition was impossible before: the button sat under `role="img"` and could not be reached.

**Components — `Stats` / `Stat` (new)**
- New **`Stats`** and **`Stat`** (`components/stats/`) — KPI blocks on DaisyUI's `stats`. `Stats` takes `items` or raw `<Stat>` children, the same pair of shapes `Dropdown` and `Tabs` accept. `Stat` has five optional slots: `title`, `value`, `description`, `figure`, `actions`.
- **Every part takes its own colour.** DaisyUI exposes no colour modifier on the stat parts — its own examples drop plain utilities on them and routinely tint the value and the description differently. So `titleColor`, `valueColor`, `descriptionColor` and `figureColor` each stand alone, while `color` acts as the shared accent for the value and the figure and loses to any of them. They resolve through the existing `themes/colors/textColor` map, so all 25 theme colours are available and no private map was added.
- **The figure is rendered last in the DOM, and hidden from assistive technology.** DaisyUI places every part with an explicit `grid-column` / `grid-row` rather than by source order, so moving the figure to the end changes nothing visually while letting a screen reader announce "Mentions, 25.6k" instead of opening on a bare number — which is what DaisyUI's own third example does. `aria-hidden` because an icon beside an already-labelled number adds nothing; `figureDecorative={ false }` when it does carry information, such as an avatar naming whose stat it is.
- **`direction` accepts a breakpoint object**, through the same `getResponsiveDefinition` helper as the `rating` and `tab` sizes: `direction={{ xs: 'vertical', lg: 'horizontal' }}` emits `stats-vertical lg:stats-horizontal`. Hence the `@safelist` block — those classes are assembled at runtime. No `2xl`, DaisyUI ships none.
- **Two DaisyUI behaviours documented rather than papered over.** `.stats` is an `inline-grid`, so it hugs its content and a full-width band needs `w-full`; and it carries `overflow-x: auto`, so blocks **scroll sideways rather than wrap** once they outgrow the container. Kept faithful for now — an explicit option to switch the overflow mode is a follow-up, once the demo has been lived with.

**Themes — `themes/components/stat.js` (new)**
- `getStatsClasses` and `getStatClasses` plus the five part generators. The part generators are built from one internal factory, since they differ only by their base class and all accept the same optional colour.

**Lab**
- New **`/lab/stat`** page under *Display*: the band and its slots, a live four-row colour picker showing per-part precedence, direction with its responsive form and a deliberately narrow container to expose the horizontal overflow, then centring and actions.

**Components — `EmptyState` (new)**
- New **`EmptyState`** (`components/EmptyState.jsx`) — the placeholder shown where content would be: an empty list, a search with no result, a panel before its first item. Four optional slots (`icon`, `title`, `description`, `actions`), each dropped entirely when its prop is falsy.
- **A house component, but not a new vocabulary.** DaisyUI has no empty-state primitive, so the classes are plain Tailwind on theme tokens. The naming follows what the chart family already established through `ChartFrame` (`emptyLabel`, `emptyState`), so the words stay the same across the library.
- **New `announce` (opt-in, default off).** An empty state that appears *in response to an action* — a search returning nothing, a filter narrowed too far — is a status message: without `role="status"` a screen reader says nothing at all and the user types into silence. But on the first render of a list that simply has no items yet, announcing it is noise. The distinction is the caller's, so the prop is explicit rather than inferred.
- **The title renders as a `<p>`, not a heading** — the opposite call from `Card`, deliberately. A card is a block of content that earns a place in the document outline; an empty state is a status message, and defaulting it to `h2` would pollute the outline of every page holding a list. `titleAs` covers the case where the empty state genuinely owns a region.
- **The size scale is about breathing room, not type.** `sm` / `md` / `lg` drive vertical spacing and icon scale while the description keeps its size — an empty state inside a `SidePanel` or a table cell cannot take the space a full-page one does. The icon is sized through the container's font size, which works because `react-icons` renders at `1em` and keeps working for any other node.
- The icon is marked `aria-hidden`: it restates the title, so announcing it would only repeat.

**Themes — `themes/components/emptyState.js` (new)**
- `getEmptyStateClasses` plus the four part generators (icon, title, description, actions), on the same shape as the rest of the family. The description carries `max-w-prose` so a long explanation does not stretch across a wide container into an unreadable single line.

**Lab**
- New **`/lab/emptyState`** page under *Display*: the anatomy next to its bare minimum, the three sizes including one nested in a `Card`, and a live filter whose no-result state is the announced one.

**Components — `Card` (new)**
- New **`Card`** (`components/Card.jsx`) — the DaisyUI card shell driven by slots (`image`, `title`, children, `actions`), like the rest of the library. Every slot whose prop is falsy is dropped entirely, so an image-less card emits no empty `<figure>` and no phantom actions row.
- **`image` takes a node, not a source.** A `next/image`, a plain `<img>`, an SVG — or our own `Picture`, whose corner and center slots then lay a badge or a play button over the photo without `Card` needing an overlay API of its own.
- **New `titleAs` (default `h2`).** DaisyUI hard-codes its title as an `<h2>`. A card lives inside a list, in the middle of a document outline, so leaving every card at `h2` breaks that outline as soon as one is nested under an existing `h2`. A deliberate divergence from `Modal`, which keeps its `<h3>` hard-coded — a dialog is an isolated heading context, a card is not.
- **`side` accepts a breakpoint, not just a boolean.** `side="lg"` gives the vertical-on-mobile, horizontal-on-desktop layout DaisyUI documents. Whole class literals per breakpoint, and the prop stops at `xl` because DaisyUI ships no `2xl` variant.
- **New `input` slot for selectable cards.** DaisyUI turns a card into a selection control through `:has()` — a checked checkbox or radio lights the card outline, and the input is hidden with `appearance: none`. The rule matches **direct children of the card**, so the input cannot travel through `children`, which lands inside `card-body`. Pair it with `as="label"` to make the whole block clickable.
- **The selection outline is drawn in `currentColor`**, 2px outside the card — so a card with light text gets a light outline, invisible on a light page. Not something the API can hint at and not documented upstream, so the JSDoc gives the fix: drive it with a text colour on the root and restore the body colour through `bodyClassName`.
- **`card-actions` defaults to `justify-end`**, which is what every example in the DaisyUI docs pairs it with — better a default than a class to repeat at every call site. Overridable through `actionsClassName`.

**Themes — `themes/components/card.js` (completed)**
- The generator already existed and, checked against DaisyUI 5.7.4, was **correct and complete on the root class** — it was simply imported by nothing. Completed rather than rewritten: the `after` / `before` parameters the rest of the family takes, the three part generators (`getCardBodyClasses`, `getCardTitleClasses`, `getCardActionsClasses`), and `side` accepting a breakpoint.
- **The default export and the `getCardClassNames` name are unchanged.** It is published through `./themes/*`, and `labelBadge.js` already carries the same suffix — two naming conventions coexist in the codebase and churning one buys nothing.

**Lab**
- New **`/lab/card`** page under *Display*: slots and their empty states, sizes and styles, the figure in its four arrangements, the heading level, and the selectable form with a live checkbox and radio group.
- The demo runs `Picture` in **`fill`** mode. In its default mode `Picture` lays the image out at its intrinsic pixel size inside an `inline-block` over a `bg-base-300`, which in a card figure means an image ignoring the card width and grey bands showing through — and `card-side` stretches the `Picture` container without reaching the `<img>` one level below. Worth knowing before dropping a `Picture` into any fixed-width container.

**Components — `Indicator` (new)**
- New **`Indicator`** (`components/Indicator.jsx`) — anchors a floating item (a counter, a status dot, a "new" flag) on a corner of whatever it wraps. Sits flat next to `Badge` / `Tooltip` / `Status`, the same family of small display primitives. `align` (`start` / `center` / `end`, default `end`) crossed with `position` (`top` / `middle` / `bottom`, default `top`).
- **It is the positioning mechanism, not the content.** The item is any node — typically a `Badge` or a `Status` — so `Indicator` composes with the existing badges instead of competing with them.
- **A falsy `item` renders no `indicator-item` at all**, so a cart at zero shows no pill rather than a "0". `item={ count > 0 && <Badge>{ count }</Badge> }` is the intended shape, and no extra `show` prop was added for it.
- **Placement modifiers belong on the item, not on the container.** They only set the CSS variables `.indicator-item` reads, which is exactly what lets several items sit at different corners of one container — hence the exported **`IndicatorItem`** for that case, alongside the single-item `item` prop.
- **The item is wrapped in `indicator-item` rather than becoming it.** DaisyUI writes `<span class="indicator-item badge">`, which would mean merging class names into the caller's own node through a brittle `cloneElement`. One extra DOM level costs less and accepts any node as an item.
- **Accessibility is documented rather than abstracted.** The item renders before the anchored content, so a screen reader announces "3, Cart" — and a bare number out of context means nothing. The JSDoc spells out the two correct shapes: the control carrying the whole accessible name with an `aria-hidden` pill, or a pill that names itself.
- **Width caveat.** DaisyUI makes the container `inline-flex` at `width: max-content`, so it hugs its child: wrapping a full-width control shrinks it back unless the width is restated on the container.
- **No responsive placement.** DaisyUI ships `sm:indicator-end` and friends, but the case is rare and supporting it would cost a thirty-class `@safelist` — deliberately left out until something asks for it.

**Themes — `themes/components/indicator.js` (new)**
- `getIndicatorClasses` / `getIndicatorItemClasses`, on the same generator shape as the rest of the family. Alignments and positions reuse the existing `enums/alignments` (`start` / `center` / `end`) and `enums/positions` (`top` / `middle` / `bottom`) — those names already match DaisyUI's, so the component introduces no new vocabulary.

**Lab**
- New **`/lab/indicator`** page under *Display*: the nine align × position combinations, a live cart counter demonstrating the empty state, three pills on a single container, and the `max-content` width trap shown side by side with its fix.

**Components — `Tabs` (accessible tabs, new)**
- New **`Tabs`** (`components/tabs/Tabs.jsx`) — data-driven like `Dropdown` (`items` of `{ id, label, icon, content, disabled }`), controlled or uncontrolled through the house `useValue` hook. Styles `box` / `border` / `lift` (or none), sizes `xs`→`xl` including per-breakpoint objects, and `top` / `bottom` placement.
- **Implements the WAI-ARIA tabs pattern**, which is the bulk of the work and the part a screenshot cannot show: `role="tablist"` / `tab` / `tabpanel`, roving tabindex so `Tab` enters on the selected tab and leaves immediately instead of walking the whole row, Left / Right arrows with wrap-around, `Home` / `End`, and disabled tabs skipped. New `activation` prop — `automatic` (default, arrow selects, the WAI-ARIA recommendation for light panels) or `manual` (arrow moves focus, `Enter` / `Space` selects).
- **The selected state is carried by `aria-selected` alone.** DaisyUI styles `[aria-selected=true]` natively alongside `.tab-active`, so one attribute drives both the look and the accessible state — there is no second class to keep in sync with it.
- **Panels interleave with tabs in the DOM.** DaisyUI reveals a panel through `.tab:is(…) + .tab-content`, so each panel is emitted as the immediate sibling of its own tab rather than grouped after the row. The panel element is always rendered, even when `lazy` defers its children: `tabs-lift` corner rules count siblings, and a missing panel would shift them.
- **New `lazy` (default off).** Off reproduces DaisyUI — every panel mounted, inactive ones hidden — which is what preserves a form's state across tab switches. On, a panel's children are mounted at its first selection and stay mounted.
- **No orientation prop.** DaisyUI 5 dropped `tabs-vertical` (`--tabs-direction` is always `row`), so exposing one would only offer a setting that breaks the layout — same call as `PagedMenu` being vertical-only.
- **Icons are spaced.** DaisyUI leaves `.tab` gapless and expects the caller to space an icon by hand, so an icon sat flush against its label. The generator emits `gap-2`, DaisyUI's own `menu` spacing — tabs are navigation, not buttons (`.375rem`). A label-only tab is unaffected, and `className` still wins.

**Themes — `themes/components/tab.js` (new)**
- New `getTabsClasses` / `getTabClasses` / `getTabContentClasses`, built on the same shape as the other generators (`after` / `before` / `beforeClassName` / `className`, exported constants, `sizes` / `styles` / `placements` arrays and typedefs). Responsive sizes go through `getResponsiveDefinition`, hence the `@safelist` block at the top of the module — those classes are assembled at runtime and the scanner would never see them.

**Components — `TextAreaMarkdown` (tab preview rebuilt on `Tabs`)**
- **Fixed — the tab-mode preview had no container styling.** It carried **`tabs-boxed`**, a DaisyUI 4 class the v5 renamed `tabs-box`, so the tab row rendered unstyled. Same leftover as the `menu-active` fix in 0.7.6.
- **The hand-rolled tabs are gone**, replaced by `<Tabs>` — which also means the mode gains keyboard navigation it never had. As a side effect the editor **keeps its caret and scroll position** when switching back from the preview: the previous implementation unmounted the `TextArea` on every switch.

**Lab**
- New **`/lab/tabs`** page under *Navigation*: the four styles, sizes and placement, a keyboard section with a disabled tab and an `activation` switch, a deferred-mount section that stamps each panel with its render order, and tabs composed inside a `SidePanel`.

**Components — `SplitPanel` (the overlay could not be dismissed)**
- **Fixed — on a phone the panel opened and never closed.** The only way out was DaisyUI's `drawer-overlay` strip, but the default `width` was `w-full` below `sm` : the panel covered that strip entirely, leaving nothing to tap. The default now stops at **`w-[85%]`** on the smallest screens so the strip stays reachable, and the JSDoc spells out that a full-width value traps the panel open — it is not something a caller can guess.
- **New `showCloseButton` (default on).** A dismiss button in the panel corner while it overlays, dropped once the panel is pinned and there is nothing left to close. It is a `<label>` pointing at the same checkbox as the overlay, so the component keeps a single dismiss mechanism rather than two to hold in sync.
- **`Escape` now closes the overlay.** The real defect behind the report : the overlay strip and the close button are both pointer affordances, so a keyboard user who opened the panel had no way out at all. The handler stands down when a `<dialog>` or an open popover sits in the top layer above the panel — that surface owns `Escape`, and firing underneath it would dismiss two at once.
- **Lab** — the second `/lab/panels` section no longer passes a full-width panel.

**Components — `charts` (new family, lots C0 + C1)**
- New **`BarChart`** and **`LineChart`** (`components/charts/`), the first two of a nine-chart family (Line, Bar, StackBar, Pie, RadialBar, Radar, Waffle, Calendar, Chord). **StackBar is not a separate component** — it is `<BarChart stacked />`, which maps to nivo's `groupMode="stacked"`.
- **Built on nivo, wrapped rather than re-exported.** The public API is ours (`data`, `height` / `aspect`, `renderer`, `palette`, `legend`, `animate`, `margin`, `theme`, `xAxis` / `yAxis`), with `nivoProps` spread last as the escape hatch. nivo stays an implementation detail we can swap or fork — which matters, because upstream ships releases slowly (0.99.0 dates from May 2025, while `master` is still active).
- **Why nivo and not a hand-rolled engine.** It is the only library covering all nine charts in one visual system — recharts and Observable Plot have no Chord, Waffle, RadialBar or Calendar. Measured with esbuild (minified + gzip, React external): the **eight nivo packages together weigh 142 kB, less than recharts alone at 158 kB**; a single chart costs ~70 kB and each additional one ~5–15 kB, since the d3 / react-spring / lodash core is shared. Rebuilding the equivalent means ~24 700 lines of TypeScript across 271 files (13 300 for the charts, 11 400 for the shared engine — axes, scales, colors, legends, tooltips, arcs, voronoi).
- **`@nivo/bar` and `@nivo/line` are optional peer dependencies**, not hard ones. `peerDependencies` alone would not help — npm ≥ 7, pnpm and bun all auto-install peers — so they are paired with **`peerDependenciesMeta.optional`**, which suppresses both the install and the missing-peer warning, plus `devDependencies` for the lab. The point is less the ~14 MB install than **avoiding a duplicated `@nivo/core`** in a consumer that already depends on nivo: two copies mean two sets of nivo's React contexts, and tooltips and theming break silently.
- **Charts fail at build time, not at runtime, when nivo is absent.** The library publishes raw source, so a consumer's bundler only resolves `@nivo/*` if it actually imports a chart — anyone using only `Button` or `Input` never sees them.

**Themes — `themes/charts/` (chart chrome)**
- New **`useChartTheme`** (`hooks/`) building nivo's `theme` object from the active DaisyUI theme. It targets DaisyUI 5, where `--color-base-content` already holds a complete color — the DaisyUI 4 form (`oklch(var(--bc))`) produces invalid CSS here.
- **Colors are injected resolved (hex), never as `var()`.** nivo emits theme colors two ways: inline styles for texts, where `var()` resolves, but **presentation attributes** (`stroke="…"`) for grid and axis lines, where support is not specified — and canvas renderers cannot resolve `var()` at all. Resolved values keep one code path across SVG and canvas. They come from the existing `extractThemeColorsFromDOM` / `useThemeColors`, so charts follow the light/dark toggle with no work from the caller.
- **The first frame is neutral, not wrong.** Theme colors are read from the DOM in an effect, so they are empty on the first render; every color falls back to `currentColor` or `transparent` instead of nivo's default black.
- New **`useChartPalette`** and `themes/charts/palettes.js`: `nivo` (default, nivo's own scheme), `brand` (derived from the theme's `primary` by hue rotation with lightness/chroma modulation), `theme` (DaisyUI semantics), or an explicit array. **`brand` switches to a hand-tuned palette past 6 series**, with a dev warning: measured minimum ΔE across all pairs drops to 10.0 at 6 series and 10.4 at 8 — and nivo's own scheme is worse (7.4). Distinguishability comes from hue spread, which is exactly what walks away from brand hues, so the two goals cannot both hold past ~5 series. Interpolating `primary → secondary → accent` was measured at ΔE 5 for 8 series and rejected: a smooth gradient is right for *sequential* data, wrong for *categorical*.
- **Marks are separated from the background by their border, not by the palette.** No categorical palette reaches the WCAG 3:1 non-text ratio on these themes — nivo sits at 1.25:1 on a light background, Tableau10 at 1.50:1 — so every mark carries a `darker 0.8` border.
- New **`getChartMargin`** (`themes/charts/margins.js`) computing margins from axis titles, tick rotation and legend side, replacing the hardcoded `margin={{ top: 40, right: 80, bottom: 80, left: 80 }}` that had to be re-tuned by hand on every chart. The `margin` prop still overrides, side by side.
- New **`getChartLegends`** (`themes/charts/legends.js`) reducing nivo's dozen positional fields to `legend={ position }`. Placement is derived from the **already-computed margin**, so the legend always lands in the room reserved for it. Item colors are left unset so nivo inherits `theme.legends` — a hardcoded `itemTextColor: '#999'` disappears in the dark theme.
- New **`getChartAxis`** (`themes/charts/axes.js`) mapping `xAxis` / `yAxis` onto `axisBottom` / `axisLeft` and computing `legendOffset`. `xAxis` is always the bottom axis and `yAxis` the left one, whatever `layout` is. On a time scale, ticks are formatted through `Intl` seeded with the active dayjs locale, so day/month order follows the locale instead of being frozen.

**Components — `ChartFrame`, `ChartTooltip`**
- New **`ChartFrame`** owning the sizing box (`height` or `aspect`): nivo's `Responsive*` components measure their parent, and a parent with no resolved height measures zero — which otherwise means a `<div className="w-full h-[500px]">` around every chart.
- New **`ChartTooltip`**, plain HTML with DaisyUI classes rather than nivo's inline-styled tooltip, so it inherits the design tokens in both themes instead of restating background, border, radius and shadow. `buildChartTheme` neutralizes `theme.tooltip.container` so this component owns the whole look. Takes a single row or several, which is what a stacked bar or a line slice needs.
- **`animate` is forced off under `prefers-reduced-motion`**, and `useMesh` (the voronoi hover mesh) is forced on for `LineChart` — disabling it only degrades hovering.
- **Lab** — new **`/lab/charts`** page (under *Graphiques*): Line with 5 series, Line on a time axis, Bar, StackBar with 6 series and a horizontal Bar, plus a palette selector to compare `brand` / `theme` / `nivo` against the light and dark themes.

**Components — `PieChart`, `RadialBarChart` (lot C2)**
- New **`PieChart`** (SVG and canvas). `innerRadius` drives the hole and **defaults to `0.5`, i.e. a donut** — the middle of a pie carries no information, and slices are compared by angle either way; pass `0` for a full pie. Arc link labels are on by default and read `id (value)`; `arcLinkLabel` overrides the accessor.
- New **`RadialBarChart`**, one ring per serie, for comparing a few series across the same few categories where a grouped bar chart reads as a wall. **SVG only — nivo ships no canvas renderer for it**, so the component has no `renderer` prop. Colors are resolved per *category*, not per serie, which is how nivo assigns them.
- **Arc label colors go through `{ theme: 'labels.text.fill' }`** rather than a hardcoded value, so they follow the DaisyUI theme like the rest of the chrome.
- New **`getRadialMargin`** (`themes/charts/margins.js`) for charts drawn in a circle. `getChartMargin` reasons about axes, which these do not have: here the box is eaten by the arc link labels and the legend. Getting it wrong does not clip a label, it silently shrinks the circle — so link-label room is reserved on all four sides, and turning the labels off reclaims it and grows the chart.
- **New `labelFontWeight`** on `useChartTheme` / `buildChartTheme` (default `500`), applied to `theme.labels.text` — the single path nivo uses for arc labels, pie link labels and bar labels alike. Data labels sit on top of colored marks rather than on the background, so they carry more weight than the chrome, which stays at the normal weight to remain in the background. **The rendered weight depends on what the app font ships**: a family without the requested face snaps to its nearest available one — Lato, for instance, jumps straight from 400 to 700 with nothing in between.
- **Lab** — the charts lab is now split in two pages under *Graphiques*: **`/lab/charts`** (*Lignes & barres*) and the new **`/lab/circulars`** (*Circulaires*, Pie and RadialBar). The palette selector and section header moved to shared `PalettePicker` / `Section` demo components rather than being duplicated per page.

**Components — `RadarChart`, `WaffleChart` (lot C3)**
- New **`RadarChart`**, plotting several series over the same dimensions, one spoke each — for comparing *profiles* rather than magnitudes. **SVG only**, so no `renderer` prop; past a handful of series the polygons stop being readable anyway. Hovering selects a whole spoke rather than one point, so the tooltip lists every series at once through `ChartTooltip`'s multi-row form.
- New **`WaffleChart`**, a grid of `rows × columns` cells, which reads small proportions better than a pie — counting cells beats comparing thin angles. **`total` is deliberately not derived from the data**: values summing below it leave empty cells, which is what lets a waffle show "42 % of a target" instead of only a breakdown. Empty cells take a DaisyUI theme color rather than a fixed grey, so they survive the dark theme. SVG and canvas; nivo's third HTML renderer is not exposed.
- **`getRadialMargin`'s `arcLinkLabels` option is now `outsideLabels`.** The behaviour is unchanged, but the function now serves radar and waffle too, and the old name only made sense for a pie. Unreleased, so no migration.
- **Lab** — Radar joins **`/lab/circulars`** (with a second instance showing `gridShape="linear"`), and a new **`/lab/grids`** page (*Grilles*) hosts Waffle — the page Calendar will join in C4.

**Components — `CalendarChart`, `TimeRangeChart`, `ChordChart` (lot C4)**
- New **`CalendarChart`** (SVG and canvas) — one cell per day between `from` and `to`, the contribution-graph shape — and **`TimeRangeChart`** (SVG only), the same grid over an arbitrary span rather than whole calendar years, for the last few weeks where a year of empty cells would be noise. Both ship in `@nivo/calendar`, so `TimeRangeChart` costs no extra dependency.
- **New sequential palettes.** These charts map a *quantity* to a color, so `getChartColors` is actively wrong for them: a categorical palette maximizes the distance between adjacent entries, which on a quantitative scale destroys the ordering the reader needs. `getSequentialColors` builds an ordered ramp instead, and `useChartPalette` takes a `sequential` flag to pick it. The ramp flips with the theme — pale to deep on a light background, deep to bright on a dark one — so the low end never sinks into the canvas.
- **Day-grid structural colors now come from the theme** (`themes/charts/calendar.js`). `emptyColor`, `dayBorderColor` and `monthBorderColor` are plain nivo props rather than theme paths, and nivo defaults them to `#fff` and `#000` — left alone, the dark theme renders a black grid on a black background. Borders take the *surface* color on purpose: the cells are separated by gaps of background, not by drawn strokes.
- New **`ChordChart`** (SVG and canvas), showing flows *between* entities rather than values *of* entities. **`data` is a square matrix**, the only chart in the family with that shape: `data[i][j]` is the flow from `keys[i]` to `keys[j]`. It has two tooltips because there are two things to hover — an arc (one entity's total) and a ribbon (one flow, listed in both directions).
- New **`getGridMargin`** (`themes/charts/margins.js`) for charts that label their columns *above* the grid and their rows to its *left* — the mirror of `getChartMargin`, which puts them bottom and left. The uniform inset `getRadialMargin` gives suits a pie, whose content is all inside the circle; on a grid it clipped the month labels instead of shrinking the grid. TimeRange reserves 86 px on the left for spelled-out weekday names.
- **Lab** — Calendar and TimeRange join **`/lab/grids`**, Chord joins **`/lab/circulars`**.

**Components — `HeatMapChart` (lot C5)**
- New **`HeatMapChart`** (SVG and canvas) — a matrix of cells colored by value, for spotting where a quantity concentrates across two dimensions at once.
- **Colors are a scale config here, not a list.** nivo takes a continuous color scale for this chart rather than an array of series colors, so the sequential ramp is wrapped in a `quantize` config: discrete buckets, which read better than a smooth gradient when a cell has to be mapped back to a value.
- **New `getContinuousLegends`** (`themes/charts/legends.js`). A quantitative scale has no discrete entries to list, so it needs a gradient bar with ticks — nivo models that as a different shape entirely (`length`, `thickness`, `ticks` instead of `itemWidth` and `symbolShape`), which no amount of sharing with the categorical builder would reconcile. The `legend` prop behaves the same from the outside.
- **`getChartAxis` now handles a top axis.** The axis title always sits further out than the ticks, so its offset points away from the plot area — which means it flips sign on the top side. It was previously computed for bottom and left only, and a heatmap labels its columns on top.
- **Lab** — HeatMap joins **`/lab/grids`**, with a second instance showing `labels={false}` and a right-hand legend.

**Components — `PolarBarChart`, `MarimekkoChart` (lot C6)**
- New **`PolarBarChart`**, taking the same data as `BarChart` — one object per index, one key per series — and laying the bars around a circle instead of along an axis. The rose or coxcomb shape, for cyclical indices where wind directions or months read better wrapped than in a straight line. **Not the same chart as `RadialBarChart`**, which draws one concentric ring per serie; here every bar radiates from the center and the circle is divided by index.
- New **`MarimekkoChart`**, a stacked bar chart where each bar's *thickness* carries a value too, so it shows a breakdown and a weight at once. It takes **three separate accessors** — `id` names each bar, `value` drives its thickness, `dimensions` lists the stacked slices — which is what makes it unusual: a bar can be thin and tall or thick and short, and both readings matter. `offset="expand"` normalizes every bar to the same length, turning the stacks into percentages while thickness keeps the absolute weight.
- Both are **SVG only** — nivo ships no canvas renderer for either.
- **Lab** — PolarBar joins **`/lab/circulars`**, Marimekko joins **`/lab/charts`** (with a second instance showing `offset="expand"`).

**Components — empty and loading states for every chart (lot C7)**
- **`ChartFrame` now owns the empty and loading states**, so all fourteen charts get them at once instead of every call site guarding by hand. A chart fed from an API previously rendered a blank frame while loading and an *indistinguishable* blank frame when the query came back empty. New props, forwarded by every chart: **`loading`** (renders a `Skeleton`), **`emptyLabel`** (text, defaults to `No data`) and **`emptyState`** (replaces the default entirely). The box keeps its size in all three states, so the page does not jump when data lands.
- New **`isChartDataEmpty`** (`helpers/charts/`). The family carries four data shapes and "empty" differs in each — a series chart whose entries all hold empty `data` arrays has plenty of objects and nothing to plot. It recognizes flat lists, nested series and matrices; a matrix of zeros counts as empty, since a chord with no flow anywhere draws nothing.
- **The two fragile shapes are now guarded rather than left to throw.** `ChordChart` takes a square matrix that nivo indexes against `keys` without checking the two agree, and `MarimekkoChart` reads three separate accessors that nivo dereferences without checking they exist — in both cases a malformed input threw mid-render instead of drawing nothing. New `isChordDataValid` and `isMarimekkoDataValid` catch it up front, show the empty state, and warn in development with the specific reason.
- **Fixed a name collision found while wiring this.** The four grid charts held a local `empty` carrying the *color* of empty cells; passing that to the frame's new `empty` flag would have made a colour string act as a truthy "no data", showing the empty state permanently. The colour local is now `emptyCell`.
- **Lab** — a section on `/lab/charts` toggles a loading state and shows an empty chart side by side with a populated one.

**Components — chart accessibility and API sweep (lot C8)**
- **Every chart now takes `ariaLabel`, `ariaLabelledBy` and `ariaDescribedBy`**, and warns in development when it has neither of the first two — an SVG chart without a text alternative is simply absent for a screen reader.
- **The ARIA attributes go on `ChartFrame`, not on the nivo component, because nivo's own support is uneven**: `@nivo/pie`, `@nivo/calendar` and `@nivo/marimekko` accept only `role`, with no `ariaLabel`. Forwarding to nivo would have left four of the twelve charts silently without an alternative. On the wrapper they are uniform and independent of what each package implements. The frame carries `role="img"`, which hides the SVG internals from assistive technology — hundreds of unlabelled paths are noise, and the label is the readable summary that replaces them. It also sets `aria-busy` while loading.
- **API sweep across the twelve charts.** An audit of the destructured props showed most of the variation is legitimate — `radialAxis` only means something on a polar chart, `from`/`to` only on a day grid — and turned up four real gaps, now closed: `valueFormat` was missing from `CalendarChart` and `TimeRangeChart` though nivo supports it; `LineChart` gained `xFormat` and `yFormat`, its equivalent of `valueFormat`; and the day and month border widths on the calendar charts were hardcoded to `2` instead of being exposed. Sixteen props are now common to all twelve.
- **Deliberate differences, for the record**: `renderer` is absent from `MarimekkoChart`, `PolarBarChart`, `RadarChart`, `RadialBarChart` and `TimeRangeChart` because nivo ships no canvas renderer for them; `legend` defaults to `false` on the calendar charts and `'bottom'` elsewhere; `ChordChart` keeps `arcBorderWidth` and `ribbonBorderWidth` rather than one `borderWidth`, since it draws two different borders.
- **Lab** — every chart in the three lab pages now carries a real `ariaLabel` describing what it shows rather than which chart it is.

**Themes — `useChartLayout` (lot C9, internal refactor)**
- New **`getChartLayout`** (`themes/charts/layout.js`) and its hook **`useChartLayout`**, resolving a chart's **margin, legends and axes in one pass**. These three are not neighbouring concerns but dependent ones: the legend is placed from the resolved margin, and each axis derives its title offset from it. That dependency is why the same four memos appeared in every chart, and why the coupling was re-derived by hand each time. A chart now declares *what kind of thing it is* — `'cartesian'`, `'radial'` or `'grid'` — instead of importing the matching margin builder itself.
- **No public API change.** The twelve charts expose exactly the same props; this is internal. Verified by comparing the resolved margin, legends and axes across ten configurations before and after: **29 of 30 outputs identical**, the single difference being the fix below.
- **Fixed — a cartesian chart with no `xAxis` or `yAxis` prop rendered with no axes at all.** An omitted axis resolved to `null`, which tells nivo to draw nothing, so `<BarChart data indexBy />` came out with bars and no tick labels. Axes are now shown by default, matching nivo's own behaviour; hide one explicitly with `xAxis={ false }` or `xAxis={{ hide : true }}`.
- The chart bodies drop from 39 memos to 13 — the remainder being genuinely chart-specific work such as inferring series keys or resolving a scale. The point is less the ~110 lines than the localization: this exact coupling had already changed in three of the previous lots, touching several files each time.

**App — body font moves from Lato to Nunito**
- **Lato ships no weight between 400 and 700.** That is a hard limit of the family, not a loading choice, and it meant chart data labels could not sit one step above the chrome without jumping to full bold. **Nunito** carries 200–900, so `labelFontWeight` at its intended `500` renders as an actual intermediate weight; its rounded terminals also sit closer to the product's identity than a neutral grotesque would. `themes/fonts/lato.js` stays published for consumers — it is simply no longer loaded by the app.
- **Fixed — `global-error.jsx` used a different font from the rest of the app.** It replaces the root layout when that layout throws, so it declares its own fonts, and it was pinned to Inter regardless of what `--font-sans` pointed at. The variable therefore resolved to nothing on that page and the global error screen silently fell back to `sans-serif`. It now loads the same font as the layout.

**Components — `SidePanel` (off-canvas side panel, new)**
- New **`SidePanel`** (`components/panels/SidePanel.jsx`) — a **full-height panel sliding in from the start or end edge** of the viewport, for product carts, invoice details or filter panels. It is a thin preset over **`Modal`** (same shape as `ConfirmModal` / `AlertModal`), because DaisyUI's **`modal-start` / `modal-end`** placements already style a full-height panel with its slide transition — `SidePanel` only fixes their sizing defaults and picks sensible values. Defaults: `placement="end"`, `width="w-full sm:w-[28rem]"`, `fullScreenBreakpoint="sm"` (full-screen sheet on phones). Every other `Modal` prop is forwarded.
- **Built on `<dialog>`, not on the DaisyUI `drawer`.** The panel opens in the browser's **top layer**, so it sits above any page `z-index` — an app-shell `drawer-side` included — and is immune to the `position:fixed` containing block a transformed ancestor would otherwise create. `.drawer-side` is a plain `position:fixed` element with `z-index:10`, so a drawer-based panel would have to arbitrate stacking by hand, and would break inside any animated wrapper.
- **Stacks natively.** A confirmation modal can be opened above the panel by giving the inner one **`portal`** — the existing escape hatch for DOM-nested dialogs, which the browser's native nested-dialog handling would otherwise close together with its ancestor.
- **Modal by design.** The page behind the panel is inert and scroll-locked. A *modeless* panel — one the user keeps open while still working in the page — is deliberately **not** an option here: DaisyUI's `modal` class is a full-viewport overlay that dims the page, catches every click and locks `:root` scrolling through `:root:has()`, which no class on the element can undo. It needs its own shell and will land as its own component.
- **Lab** — new **`/lab/panels`** page (under *Actions*): placement + switchable widths, and a cart with a pinned total and a stacked removal confirmation.

**Components — `SplitPanel` (inline side region, new)**
- New **`SplitPanel`** (`components/panels/SplitPanel.jsx`) — a side region that **shares the width** with its content instead of covering it: an invoice detail next to the invoice list, an inspector next to a canvas, a filter column next to results. At and above `breakpoint` (default `lg`) it is a permanent sticky column and the content shrinks to make room; below it, it folds into a dismissible overlay driven by `open` / `onOpenChange` — or uncontrolled through `defaultOpen`, via the house `useValue` hook. Built on DaisyUI's `drawer` + `drawer-end` + `{bp}:drawer-open`.
- **Complements `SidePanel`, does not replace it.** `SidePanel` is an overlay: it covers the page, makes it inert and locks scrolling — right for a cart or a confirmation flow. `SplitPanel` never covers anything on a wide screen, so the panel and the content it describes can be read together. That distinction is what the removed `modeless` flag was really reaching for.
- **Safe to nest inside an app shell.** DaisyUI scopes every drawer selector to siblings (`.drawer-end > .drawer-toggle ~ .drawer-side`) and the toggle id comes from `useId`, so an inner panel never drives the outer `Dashboard` / `Drawer` one.
- **The toggle is forced unchecked once the panel is pinned.** Above the breakpoint DaisyUI hides the checkbox and shows the panel regardless, but a *checked* toggle inside a `drawer-open` grid still emits `--page-scroll-lock: revert-layer` on `:root`, competing with the lock an open `Modal` sets. Forcing it unchecked keeps the component out of that arbitration.
- **Transitions are frozen for one frame while the breakpoint flips.** Crossing it swaps `.drawer-side` between its overlay and pinned geometry — `translate` 100% ↔ 0, plus `opacity` and `width` — and DaisyUI transitions all three, so resizing past the breakpoint looked exactly like the panel sliding shut on its own. A `matchMedia` listener drops `transition-none` on the two transitioned elements and restores it after a double `requestAnimationFrame`. Done imperatively because a React state update could land after the browser has already painted the new breakpoint, and through a class rather than inline styles so nothing a caller set on its own content is clobbered.
- **The overlay z-index is dropped once pinned.** The panel carries `z-40` while floating (over page content, under the app-shell sidebar and modals) plus a `{bp}:z-auto` that returns it to the normal flow when it becomes a column — otherwise a pinned panel painted over unrelated overlays sitting earlier in the document.
- **Height stays with the caller.** DaisyUI gives `.drawer-side` a `100dvh` height in both states; in a bounded layout override it through `sideClassName` (e.g. `"lg:h-[calc(100dvh-4rem)]"`), which is DaisyUI's own answer for bounded drawers.
- **Lab** — new **SplitPanel** sections on `/lab/panels` (renamed *Panel Components*, the two components separated by a `Divider`): an invoice list with its detail column and a start / end switch, plus a second instance at `breakpoint="md"`.

**Themes — `getModalBoxClasses` (sizing for the `start` / `end` placements)**
- **New `width` option.** DaisyUI sizes side panels `width:auto`, i.e. shrink-to-fit, so a panel would jump in width as its content changed (an emptying cart, a list still loading). `width` pins it. It applies to the `start` / `end` placements only.
- **`h-dvh` replaces DaisyUI's `100vh`** on side placements: `100vh` ignores the mobile URL bar, which pushed the bottom of the panel — a `footerNode` call to action, typically — under the fold on iOS.
- **`maxWidth` is now ignored for side placements**, where it has no meaning, and `width` takes over. Strictly additive otherwise: `getModalBoxClasses` has a single caller (`Modal`) and no existing modal uses `placement="start"` or `"end"`, so every other placement emits exactly the same classes as before.

**Components — `Modal` (new `width` prop, `usePopover` documented)**
- **New `width` prop**, forwarded to `getModalBoxClasses` and honored by the `start` / `end` placements only. Elsewhere `maxWidth` still governs. No behavior change for existing modals.
- **`usePopover` is now documented for what it actually does.** It was introduced as "non-blocking, for light panels", which oversells it: the root keeps the `modal` class, a full-viewport overlay that still dims the page, still catches every click through its backdrop, and still locks `:root` scrolling via `:root:has()` — none of which a class on the element can undo. It also self-closes when a `<dialog>` opens above it in the top layer. The JSDoc says so and points at `SplitPanel` for a panel the user works alongside. Documentation only, no behavior change.

## [0.7.6] — 2026-07-21

**Components — `Dropdown` (generic menu-in-a-dropdown, new)**
- New reusable **`Dropdown`** (`components/dropDowns/Dropdown.jsx`) — composes the DaisyUI `dropdown` shell with a **`<ul class="dropdown-content menu">`** panel, unlike the bespoke `LangDropDown` / `DisplayDropDown` (which render a `card` of buttons). Data-driven items reuse the native menu modifiers: **`menu-active`** for the active row, **`menu-disabled`** for a disabled one, **`menu-title`** for a section heading; a `divider` type draws a separator. An item with `href` renders a `next/link`, otherwise a `<button>`.
- Controlled open state with the proven pattern from `DisplayDropDown` (toggle on trigger, close on outside click / Escape / item select), optional viewport-aware **`autoPosition`** (`useDropdownPosition`), and `placement` / `direction` via `getDropdownClassNames`. Trigger is either the default `btn` (from `label` / `triggerIcon`) or a custom node / render function.
- The root is sized to its trigger (`w-fit`) so the panel anchors on the trigger even inside a stretching flex parent.
- A **custom trigger node is wrapped in a real `<button>`** (not a `role="button"` div): clicking it takes focus, which is what drives DaisyUI's `dropdown-content` reveal — its `@starting-style` opacity transition fires reliably via `:focus` / `:focus-within`, so the panel now opens for custom triggers (e.g. an avatar) too.
- **Lab** — new **« Dropdown (menu-in-a-dropdown) »** section on `/lab/menus`.

**Components — `PagedMenu` (drill-down navigation, new — DaisyUI `menu-paged`)**
- New **`PagedMenu`** (`components/menus/PagedMenu.jsx`) — a **vertical drill-down menu** built on DaisyUI 5.7's **`menu-paged`** modifier: only one level shows at a time, and an open group's `<summary>` turns into a **Back** button. Pure CSS (`:has(details[open])`) — **no JavaScript state**. It reuses the data-driven navigation model (`link` / `collapse` / `divider` / `title` items) and the recursive `Menu` renderer. Usable standalone (`import PagedMenu from 'oihana-next-ui/components/menus/PagedMenu'`).
- **Vertical only** — `menu-paged` is a vertical pattern (horizontal breaks the reveal), so orientation is intentionally not exposed.
- **`getMenuClasses` gains a `paged` flag** (`themes/navigation/menu.js`) → emits `menu-paged`.
- **`Collapse` gains a paged branch.** A new `PagedContext` (`display/ui/navigation/PagedContext.js`, default `false`) tells `Collapse` to render its `<details>` **native and uncontrolled** (starts closed, toggled by the browser) instead of forcing it open or reading the `NavigationProvider`. Additive and opt-in: every existing menu (sidebar, persistence demo) is unaffected.
- **Lab** — new **« Paged menu (menu-paged) »** section on `/lab/menus` (a 3-level drill-down: Produits → Électronique → Téléphones/Ordinateurs).

**Navigation — `menu-title` sections (new item type)**
- **New `title` navigation item type.** The data-driven navigation model now accepts `{ type: 'title', label, Icon?, className? }`, rendered as a non-interactive **`<li class="menu-title">`** section heading, so a menu can group its items under labelled sections alongside `link` / `collapse` / `divider`. New `TITLE` constant in `contexts/navigation/types.js`, new `display/ui/navigation/Title.jsx`, wired into the item registry. Labels are localized automatically through `mapI18nItem` (via the item `id`), like every other item. `menu-title` is a native DaisyUI class — no safelist entry needed.
- **Lab** — new **« Menu sections (menu-title) »** section on `/lab/menus` (a sidebar-style structured menu combining titles, links, a divider and a collapse).

**Dependencies**
- Bumped **DaisyUI 5.6.2 → 5.7.0** (adds the `menu-paged` modifier), Tailwind CSS 4.3.1 → 4.3.3, React / React-DOM 19.2.3 → 19.2.7, motion 12.42.0 → 12.42.2, react-icons 5.6.0 → 5.7.0, sanitize-html 2.17.5 → 2.17.6.

**Components — MenuNavigation (native DaisyUI active state)**
- **Fixed — the active menu item now uses `menu-active`.** `MenuLink` applied the bare `active` class, a DaisyUI 4 leftover that DaisyUI 5's menu no longer styles, so the active item rendered with no highlight. It now emits **`menu-active`**, the correct DaisyUI 5 modifier. No API change.
- **Lab** — new **« État actif (menu-active) »** card on `/lab/menus` (the middle item points to the current route, so the native active style is always visible). The main sidebar (`display/ui/navigation`) is untouched — it keeps its subtle custom active style by design and can still opt into the native look via `activeClassName="menu-active"`.

## [0.7.5] — 2026-07-20

**Components — Drawer (phantom scroll fix)**
- **Fixed — stray scrollable overflow inside a Drawer.** `drawer-content` now carries `relative`, making it the containing block of its absolutely-positioned descendants (e.g. `Pagination`'s `sr-only` live region). Without it, such a descendant anchored on the daisyUI `.drawer` grid instead — which sits *above* the scroll container, so `overflow-y-auto` could not clip it. It settled at its static position (bottom of a long list) and inflated the drawer's scrollable height, letting any outer scroll wrapper drift through empty space. Anchoring on `drawer-content` restores the clip. No API change.

## [0.7.4] — 2026-07-16

**Hooks — `useResetScroll` (instant scroll reset on route change)**
- **Fixed — white band on navigation.** The default `behavior` changed from `'smooth'` to `'auto'`. On a route change the outgoing (longer) page stays mounted while the incoming (shorter) RSC arrives ; a smooth animation therefore ran *during* the page swap and, mid-animation, exposed an unpainted band below the new, shorter content until the scroll landed at the top. An instant reset jumps to the top before the swap, so the content is already aligned — no band. `Drawer` (the only consumer) benefits with no code change. Callers that genuinely want a smooth *intra-page* reset (same content height, no page substitution) can still pass `behavior='smooth'` explicitly.

## [0.7.3] — 2026-07-10

**Hooks — `useServiceWorkerUpdate` (PWA « update available » detection)**
- **New hook** driving the canonical PWA update flow. It registers the Service Worker, watches for a newer worker parking in `waiting` (`updatefound` → `installed` with an existing `controller`), and exposes reactive `updateAvailable` + an imperative `applyUpdate()` that posts `SKIP_WAITING` to the waiting worker and reloads exactly once on `controllerchange`. Optionally reads a `/version.json` manifest (no-store) to surface the *next* version number. Proactively calls `registration.update()` on a timer and on tab refocus so long-lived tabs notice a release without a navigation. Renders no UI — the consuming app owns the modal / banner and its i18n. Exposes a named `SKIP_WAITING_MESSAGE` for the SW contract. `ServiceWorker` stays for register-only use.

**Scaffolds — Service Worker templates + `inject-version`**
- **Update-ready by default.** `sw.minimal.template.js` / `sw.offline.template.js` no longer call `skipWaiting()` unconditionally — the new worker waits and swaps on a `{ type: 'SKIP_WAITING' }` message, which is what `useServiceWorkerUpdate` drives.
- **Injectable cache prefix.** `CACHE_NAME` now uses a `__CACHE_PREFIX__` placeholder instead of a hard-coded `oihana-ui`. `inject-version` reads `package.json` `pwa.cachePrefix` (default `app`) and also emits `public/version.json`. Consuming apps set their own prefix in `package.json` — no more hand-editing the copied template.

## [0.7.2] — 2026-07-10

**Components — Popover (dialog accessibility)**
- **The floating panel is now a proper dialog.** It gets **`role="dialog"`** (plus **`aria-modal="true"`** in the modal / bottom-sheet branch), and new **`ariaLabel`** / **`ariaLabelledBy`** props give it an accessible name. Previously the trigger advertised `aria-haspopup="dialog"` but the panel had no dialog semantics.
- **Focus management.** On open, focus moves **into** the panel (a new **`initialFocusRef`** prop, else the panel itself — `tabIndex={-1}`) ; on close, focus is **restored** to whatever held it when the popover opened (the trigger). In the modal branch, **Tab is trapped** inside the panel (new **`trapFocus`** prop, defaulting to `true` as a modal / `false` as a dropdown).
- Fully backward-compatible — every consumer (`InputDatePicker`, `InputTimePicker`, `InputDateRangePicker`, `InputDateTimePicker`, `Pagination`) benefits without code changes. The pagination « go to page » dialog now passes `ariaLabel` + `initialFocusRef`, replacing its own focus effect.

**Components — Pagination (mobile overflow fix + opt-in compact mode)**
- **Fixed — no more horizontal page scroll on narrow widths.** When the pagination sits inside a flex parent, the `nav` could not shrink (`min-width: auto`), so the `.join` strip + the right-hand `label` (« Page 1 / 214 ») were laid out on a single line that pushed the whole page into a horizontal scroll and sent the label off-screen. The `nav` is now bounded (`w-full min-w-0 max-w-full`), so `flex-wrap` drops the label to its own line instead of overflowing — **no scroll container, no scrollbar**. Desktop is unchanged; the compact mode below is the intended path for genuinely tiny screens.
- **Added — opt-in `compact` layout.** New **`compact`** (force) and **`compactBelow`** (`'sm' | 'md' | … | false`, default **`false`** — the responsive switch is **off by default**) collapse the strip to **`‹ page control ›`** (previous / page control / next) for small screens.
- **Added — jump to page.** In compact mode, **`jumpMode='input'`** (default) shows an inline, clamped number input (Enter / blur commits), and **`jumpMode='modal'`** shows a trigger that opens a `Popover` — a dropdown on desktop, a bottom-sheet on mobile — with a page field and a Go / Cancel footer.
- **i18n** — new keys `cancel`, `go`, `of`, `pageNumber` (fr / en), and the default label separator (« of » / « sur ») is now driven by the `of` key instead of being **hard-coded in English**.
- **a11y — page changes are now always announced.** A single visually-hidden `aria-live="polite"` region announces « Page X of Y » on every change, in **every** layout — including the default (no visible `label`) and compact modes, where screen-reader users previously got **no feedback**. The visible `label` is now purely visual (its own `aria-live` is dropped) so nothing is double-spoken.
- **a11y — the « … » range indicator is now decorative** (`aria-hidden`) instead of a labelled `role="separator"`, so assistive tech skips the noise (the first / last boundary buttons already expose the jump).
- **a11y — the jump dialog focuses the page field on open** (via effect, not `autoFocus`).
- **Added — range summary (`showRange`).** Shows the item range (« 1–48 of 10269 ») as the label instead of « Page X of Y » — the layout / positioning is shared with the existing `label` (a custom `labelFormat` still wins).
- **Added — items-per-page selector (`pageSizes` + `onLimitChange`).** When `pageSizes` (e.g. `[24, 48, 96, 200]`) is passed, a compact `<select>` is rendered ; changing it fires `onLimitChange( limit, paginationData )`. New i18n key `perPage` (fr / en). In compact mode the summary + selector stack on their own row above the controls.
- **Lab** — new **« Compact (mobile-safe) »** and **« Range Summary & Page Size »** sections on `/lab/pagination`.

## [0.7.1] — 2026-07-09

**Components — LabelBadge (accessibility, robustness, truncation)**
- **Empty segment guard** — a side whose content is `null` / `undefined` is **no longer rendered**, so omitting `label` (or `value`) no longer leaves an **empty padded neutral nub** ; the badge now **degrades to a single pill**. The `outline` left divider (`border-l`) is dropped when the value stands alone (new `divider` flag threaded through `resolveSegment` / `getLabelBadgeSegment`).
- **Accessible name** — when `label` and `value` are plain strings, an accessible name (`"<label>: <value>"`) is derived and, on the default (non-interactive) `span`, a **`role="img"`** is set so the badge is announced as a single unit instead of relying on generic-container `aria-label` (which screen readers ignore). A caller-supplied `aria-label` / `role` still wins ; on `as="a"` no `role="img"` is forced (the link already carries the name).
- **Truncation** — new **`maxValueWidth`** prop (number → px, or a CSS width) truncates a long value (`truncate`) and adds a native **`title`** tooltip with the full text — useful for long repo paths / branch names.
- **Docs** — JSDoc now states that **decorative icons** in `label` / `value` should be marked `aria-hidden` (or given a `title`) by the caller ; the lab demo marks its icons accordingly and gains a **« Truncation & Single-sided »** section.

## [0.7.0] — 2026-07-09

**Components — LabelBadge (two-sided « shields.io » badge, new — a neutral label + a colored value)**
- New **`LabelBadge`** (`components/LabelBadge.jsx`) — a **two-sided badge** in the shields.io style : a **label** segment on the left and a **value** segment on the right, each with its own color. Built on the DaisyUI **`.badge` shell** (`p-0 gap-0 overflow-hidden`) so **radius (`--radius-selector`), height, spacing, font-size and border all follow the current theme** ; the two inner segments fill the shell and are **clipped to the theme radius** (flat inner corners, rounded outer corners, no double border). Usable **standalone** (`import LabelBadge from 'oihana-next-ui/components/LabelBadge'`).
- **Colors on both sides** — **`color`** (right) and **`labelColor`** (left, default `neutral`) each accept **either a DaisyUI token** (`primary`, `secondary`, `accent`, `info`, `success`, `warning`, `error`, `neutral` → `bg-*` + `text-*-content`) **or any custom CSS color** (`#cb3837`, `oklch(…)`, …) applied through an **inline style**. **`textColor`** / **`labelTextColor`** force the text color of each segment when needed (e.g. dark text on a light custom fill).
- **Style variants** — **`style`** = `solid` (default), **`soft`** (`/15` tint + colored text, `color-mix` for custom colors) or **`outline`** (transparent fill, colored text, `border-l` divider). **Sizes** `xs → xl` reuse the `badge-*` classes, so the pill scales exactly like `Badge` (segment horizontal padding scales with the size).
- **Content & element** — `label` and `value` (or `children`) accept any **ReactNode**, so an icon fits naturally on either side ; each segment carries a `gap-1` so an **icon + text** label is spaced correctly (flex collapses a literal whitespace node). **`as`** / `href` render the badge as a link (`<LabelBadge as="a" …>`), plus `className` / `labelClassName` / `valueClassName` escape hatches (merged through `tailwind-merge`).
- **No wrap** — like `Badge` (see 0.6.1), the shell inherits **`whitespace-nowrap`** from the shared `getBadgeClassNames`, and since `white-space` cascades, **both segments stay single-line** even at `size="xs"` with a multi-word label — the pill keeps its natural width instead of wrapping and overflowing its fixed height.
- New generator **`themes/components/labelBadge.js`** — `getLabelBadgeClassNames` (the shell), `getLabelBadgeSegment` (per-segment className + inline style) and `resolveSegment` (DaisyUI token → classes / custom CSS color → `style`). Color/size class names are kept as **full literals** so Tailwind's scanner picks them up.

**Lab**
- New **« LabelBadge Examples »** section on `/lab/badges` (below the existing `Badge` demo, split by a `Divider`) : a shields.io recreation (GitHub / Demo links with icons, npm / downloads / license), the full **size** and **DaisyUI color** matrices, **custom CSS colors** (hex + `oklch`), the three **style variants**, and **custom label colors** (token vs CSS, forced `labelTextColor`, combined with `soft` / `outline`).

## [0.6.1] — 2026-07-09

**Fixed**
- **Badge** — a badge no longer **wraps and overflows** its fixed-height pill. `.badge` (daisyUI v5) has a fixed `height` and no `white-space`, so a multi-word label (e.g. « Sur commande ») in a narrow container (a mobile table cell) wrapped to a second line that spilled outside the pill. `getBadgeClassNames` now adds a base **`whitespace-nowrap`** — kept single-line by default and **overridable** (`className='whitespace-normal'` wins through `tailwind-merge`).

## [0.6.0] — 2026-07-08

**Components — Range / DualRange (dual-thumb range, new — pick a start and an end)**
- New **`DualRange`** (`components/ranges/DualRange.jsx`) — a **dual-thumb range** : two draggable handles pick a **start** and an **end** value. `value` / `defaultValue` are a **`[start, end]`** tuple and **`onChange` receives a `[start, end]`** pair (always ordered). Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`) on the existing pattern. **Horizontal only** for now (the `orientation` / `height` / marker props of the single-thumb mode do not apply). Usable **standalone** (`import DualRange from 'oihana-next-ui/components/ranges/DualRange'`) or through `Range`.
- **`Range`** gains a **`range`** prop (default `false`) that **delegates to `DualRange`** — a convenience switch on the existing component. The single-thumb mode is **strictly unchanged**.
- **The handles cannot cross** — the start is clamped to the end (`Math.min`) and the end to the start (`Math.max`), so they may **touch but never swap**, and the internal state stays an ordered `[start, end]` pair. When both handles jam together the **z-index of the start handle is raised in the upper half of the track** so it never stays trapped under the end handle — the pair can always be pulled apart again from either extremity.
- Built as **two stacked DaisyUI `range` inputs** : DaisyUI's own progress fill is neutralised (`--range-fill: 0`) and its track background removed, then a **rail + a colored selection bar** are drawn behind, keeping the **native (accessible) thumbs** on top. The full DaisyUI vocabulary still applies — **`color`** (via `getBackgroundColor` for the selection bar), **`size`** (`xs → xl`, thumb + track sized accordingly), **`min` / `max` / `step`**, **`disabled`**, plus the shared chrome (`label`, `helper` / `error`, `showValue` with `top` / `inline` / `bottom`, `formatValue` applied to both bounds and joined as « start – end »).
- New co-located **`components/ranges/styles/Range.module.css`** holding the dual-thumb overrides (neutralised fill / track, pointer-events scoped to the thumbs).

**Components — DualRange (accessibility, `minGap`, `onChangeEnd`, click-to-move)**
- **Accessibility** — each handle now gets a **distinct accessible name** and a **formatted value** for assistive tech (the two overlapping `<input type="range">` were previously announced as two identical, unlabeled sliders reading the raw number). Each thumb gets an **`aria-label`** (`« <label> — start »` / `« <label> — end »`, or `« Range start »` / `« Range end »` without a label) and an **`aria-valuetext`** built from `formatValue` (e.g. « €250 » instead of « 250 »). Two optional props, **`startAriaLabel`** / **`endAriaLabel`**, override the names (useful for i18n). Native keyboard support (arrow keys) was already there ; this only adds the announced semantics.
- **`minGap`** (default `0`) — the minimum distance kept between the two handles. The non-crossing clamp is extended so the start stops at `end - minGap` and the end at `start + minGap` : useful for a price filter that must not let start and end collapse onto the same value. Assumes `max - min >= minGap`.
- **`onChangeEnd`** — called once with the ordered `[start, end]` when the interaction **ends** (pointer up / touch end / key up), alongside `onChange` which keeps firing on every drag tick. Lets consumers run expensive work (an API-backed filter, a heavy recompute) on release instead of on every pixel.
- **Click on the rail** — clicking / tapping the rail (or the selection bar) now moves the **nearest handle** to that position, matching the native single-thumb range behaviour that the two-input trick had removed (the inputs are `pointer-events:none` except for their thumbs). A pointerdown that lands on a thumb is still handled by the native drag ; only clicks on the track jump the closest handle (snapped to `step`, clamped by `minGap`), firing `onChange` + `onChangeEnd`. The track shows a `cursor-pointer` when enabled.

**Lab**
- New **« Dual Range (start + end) »** section on `/lab/ranges` : a simple uncontrolled range, a **controlled** price range (with a live `Badge` readout and a reset button), an inline-value year range, the full **color** and **size** matrices, `helper` / `error` states, and a disabled example.

## [0.4.0] — 2026-07-05

**Components — Trees (SortableTree / SortableTreeItem, new — multi-level drag-and-drop reorder)**
- New **`SortableTree`** (`components/trees/SortableTree.jsx`) — a multi-level list whose nodes can be **reordered among siblings** and **reparented** (indent / outdent) by drag and drop (pointer and touch ; keyboard reparenting is planned). Dragging a row **vertically** reorders it ; dragging it **horizontally** projects its target depth from the pointer's position, and the target parent is derived from it. Dragging a folder moves its **whole subtree** (collapsed during the drag), which also makes it structurally impossible to drop a node into its own descendants. The depth at any position is clamped so the tree stays valid (you cannot go deeper than one level below the row above, nor shallower than the row below). The whole tree is **one value** — a nested array `[ { id , children : [...] } ]` — controlled (`items` + `onChange`) or uncontrolled (`defaultItems`) ; a move produces a single `onChange( nextTree , change )` with `change = { item , fromParent , toParent , fromIndex , toIndex }`, and in uncontrolled mode a rejected promise **restores the previous tree** (optimistic revert). Nodes are declared through `renderNode( item , { depth , collapsed , childCount } )` returning a `SortableTreeItem`. Props : `indent` (px per level, default 24), `defaultCollapsed`, `handle`, `disabled`, `getItemId`. The DnD engine (`@dnd-kit/react`) stays fully encapsulated.
- New **`SortableTreeItem`** (`components/trees/SortableTreeItem.jsx`) — the draggable row : a drag handle (default), an automatic expand/collapse chevron when the node has children, and arbitrary content. The whole card is indented per depth via `margin-inline-start` (no wasted left gutter), and follows the projected depth live while dragged. Lifted style while dragged (`TREE_ITEM_DRAGGING`).
- **Nesting rules** — **`maxDepth`** caps the nesting depth (a dragged folder counts its own subtree height against the limit, so its children never overflow), and **`canNest( draggedItem , parentItem | null )`** decides whether a node may become a child of a given parent (`null` = top level, e.g. « only folders accept children » or type rules) : when it rejects the projected parent the drop **walks up to the nearest valid ancestor**, and if none is valid at that position the drop is refused.
- **Drop indicator** — a horizontal insertion **line** now shows where the node will land **and at which depth** (indented to the projected depth), rendered above/below the hovered row depending on drag direction ; it turns **red** when the drop is forbidden by `canNest`. The dragged card dims slightly (`opacity-80`) while in transit. (This feedback matters because tree rows deliberately do not visually reshuffle during the drag.)
- **Collapse control** — new **`collapsible`** prop (default `true` ; `false` hides the chevrons and keeps every node expanded — combine with `disabled` for a fully static, read-only tree) and **controlled collapse** via **`collapsed`** + **`onCollapsedChange`** (on the `useValue` pattern, alongside the existing `defaultCollapsed`), enabling expand-all / collapse-all from the parent.
- New **`useSortableTree`** hook (`hooks/useSortableTree.js`) — the tree-state plumbing : nested tree controlled/uncontrolled on the `useValue` pattern, with the optimistic apply-then-revert commit.
- New **`helpers/treeUtils.js`** — pure `flattenTree` / `buildTree` / `removeChildrenOf` / `getProjection` (depth + parent projection, with the `maxDepth` / `canNest` rules) powering the flatten → project → rebuild cycle (a single sortable container of indented rows, rebuilt into a nested tree on drop).
- New **`helpers/trees/insertNode.js`** & **`helpers/trees/removeNode.js`** — immutable helpers for the controlled `items` : `insertNode( tree , parentId , node )` inserts a node under a given parent id (or at the top level when `null`), `removeNode( tree , id )` removes a node and its subtree. Both take optional `getId` / `getChildren` / `setChildren` accessors (defaulting to `id` / `children`).
- Theme — new **`themes/components/tree.js`** module : `getTreeClasses` / `getTreeItemClasses` / `getTreeToggleClasses` / `getTreeHandleClasses` / `getTreeDropIndicatorClasses` generators + `TREE*` constants.

**Lab**
- New **« Arbre » / « Tree »** entry (`/lab/tree`, list-tree icon) in the Layouts section (nav + fr/en labels) with `SortableTreeDemo` : a file-tree example (reorder + indent / outdent + collapse), a **controlled** tree with a live structure preview, an **async change** simulating an API call with a « Simulate API failure » toggle showing the optimistic revert, a **max-depth** example, a **`canNest` (folders-only)** example, an **expand-all / collapse-all** example (controlled collapse), a **frozen tree** (`disabled` + `collapsible={false}`), and an **add / remove** example (a « + » per folder inserts a child into it via `insertNode`, a « × » deletes any node via `removeNode`, reordering still works). Full alphabetical props reference.

**Components — Modal (portaled-descendant lifecycle fix)**
- Fix — **a `Modal` rendered inside another `Modal` through a *portaled* child** (the `InputColor` picker, a date-picker `Popover`, a nested `<Modal portal>`) **no longer closes its ancestor** when the inner one is dismissed (Apply / Cancel / backdrop / Escape). A portaled child is a DOM **sibling** but stays a **React-tree descendant**, so React bubbles its `<dialog>` `close` / `cancel` (and popover `toggle`) events up to the **ancestor** modal's handlers — firing the ancestor's `onClose` and dismissing it. The lifecycle handlers wired to the dialog (`onClose`, `onCancel`, `onKeyDown`) and the popover `onToggle` are now **scoped to the modal's own node** : an event whose target is not this modal's own `<dialog>` is ignored via a plain `return` (never `stopPropagation`, so the event keeps bubbling — composable with 3+ nested modals and blocking no third-party listener). `handleKeyDown` uses DOM **containment** (`currentTarget.contains(target)`) since a keydown targets a child input, not the dialog. The host's `disableEscapeKeyDown` no longer swallows the **inner picker's** Escape either. This was latent because the demos' host modals carried an inert `onClose` (`onClose?.()` = no-op) — any consumer with a real `onClose` triggered it. The cascade « closing a child modal closes its parent » was an accidental side effect, never an API : wire it explicitly in the child's `onClose` if you actually want it.
- **`onClose` / `onAgree` / `onCancel` now receive the originating `event`** (previously called with no argument), so consumers can inspect it — non-breaking (the extra argument is simply ignored by existing callbacks). JSDoc for the three callbacks documented accordingly.

## [0.3.0] — 2026-07-04

**Components — Kanban (Kanban / KanbanColumn / KanbanCard, new — drag-and-drop board)**
- New **`Kanban`** (`components/kanban/Kanban.jsx`) — a kanban board : cards **reorder within a column and move across columns** by drag and drop (pointer, touch and keyboard), columns accept cards **even when empty** (highlighted while hovered). The whole board is **one value** — an array of columns `[ { id , title , items : [...] } ]` — controlled (`columns` + `onChange`) or uncontrolled (`defaultColumns`). Any move produces a **single `onChange( nextColumns , change )`** call with `change = { item , fromColumn , toColumn , fromIndex , toIndex }` : pose `nextColumns` as-is, and/or use `change` for a targeted API call ; in uncontrolled mode a rejected promise **restores the previous board** (optimistic revert). Cards are declared through `renderCard( item , column , index )` returning a `KanbanCard` (`id` / `index` / `group` / `disabled` injected) ; `renderHeader` / `renderFooter` customize columns ; stable ids via `item.id` / `column.id` or `getItemId` / `getColumnId`. While a card is dragged the board keeps a **live snapshot in sync with the engine** (`onDragOver` + `@dnd-kit/helpers`'s `move`) and the consumer state is committed **once, on drop** — the commit is computed by diffing the committed state against the final snapshot by card id, making it immune to React remounts when a card crosses columns.
- New **`KanbanColumn`** (`components/kanban/KanbanColumn.jsx`) — droppable column : default header (title + count `Badge`), card body accepting drops even when empty (visual `ring` feedback), optional `footer` slot (e.g. an « add card » button).
- New **`KanbanCard`** (`components/kanban/KanbanCard.jsx`) — the draggable card (whole-card drag) : `title` or arbitrary `children`, lifted style while dragged.
- Theme — new **`themes/components/kanban.js`** module : `getKanbanClasses` / `getKanbanColumnClasses` / `getKanbanColumnBodyClasses` / `getKanbanCardClasses` generators + `KANBAN*` constants.

**Hooks — useKanban (new)**
- New **`useKanban`** (`hooks/useKanban.js`) — the board-state plumbing : columns controlled/uncontrolled on the `useValue` pattern, `moveItem( fromColumn , toColumn , fromIndex , toIndex )` handling intra- and cross-column moves immutably (reuses `arrayMove`), optimistic apply-then-revert around `onChange`.

**Dependencies**
- New runtime dependency **`@dnd-kit/helpers`**, **pinned exactly to `0.5.0`** (aligned with `@dnd-kit/react`) — its `move()` helper keeps the live board snapshot in sync with the engine during cross-column drags.

**Lab**
- New **« Kanban » section** in the navigation (fr « Kanban » / en « Kanban ») with a **« Tableau » / « Board »** entry (`/lab/kanban`, kanban icon) : `KanbanDemo` with a basic uncontrolled board (4 columns, « Done » starting empty), a **controlled** board with live per-column counts, an **async change** simulating an API call with a « Simulate API failure » toggle showing the full-board optimistic revert, and a props reference table.

**Components — Kanban (reorderable columns)**
- **`Kanban`** gains a **`reorderableColumns`** prop (default `false`) : when enabled, the **columns themselves can be reordered by dragging their header** (grab cursor, `touch-none`), while their body stays reserved for card drags. Off by default — existing boards are strictly unchanged.
- **`onChange` change payload now carries a `type` discriminant** (non-breaking addition) : `{ type : 'card' , item , fromColumn , toColumn , fromIndex , toIndex }` for a card move, `{ type : 'column' , column , fromIndex , toIndex }` for a column move — both with the same optimistic apply-then-revert contract. `useKanban` gains the matching **`moveColumn( fromIndex , toIndex )`**.
- Under the hood, **`KanbanColumn`** switches from a plain droppable to a unified sortable (type `'column'`, accepting cards and columns, low collision priority, dragging disabled unless `sortable`) — card-drop behaviour is unchanged, and a dragged column keeps its lifted style (`KANBAN_COLUMN_DRAG`).

**Lab**
- Three new examples on `/lab/kanban` : **Reorderable Columns** (with a live readout of the last `change`, discriminating card vs column moves), **Project Board** (rich cards composed with `Avatar`, tags and due-date `Badge` — showcasing `renderCard` freedom), and **Editable Board** (an « Add a card » button per column via `renderFooter` and a remove button on each card — plain `setState`, the board is your data).

**Components — Layouts (SortableMasonry, new — drag-and-drop masonry)**
- New **`SortableMasonry`** (`components/layouts/SortableMasonry.jsx`) — a masonry layout whose items can be **reordered by drag and drop** (pointer, touch and keyboard), **including across columns**. `Masonry` itself is untouched : its round-robin distribution (`index % columns`) cannot round-trip an arbitrary drop back to a flat order, so the sortable variant distributes **sequentially** (the first ⌈N/C⌉ items fill the first column, and so on) — the flat order is the concatenation of the columns, and any drop translates into a single `onReorder( items , { from , to , item } )` with **flat indexes**. **The invariant is the order, not the column assignment** : after a drop the list is recomposed then evenly redistributed, so an item close to a column boundary may shift to the neighbouring column (documented in the JSDoc and the demo). Same API and optimistic-revert contract as `SortableGrid` (`items` / `defaultItems`, `renderItem` returning a **`SortableGridItem`** — reused as-is, no new item component — `getItemId`, `disabled`, `handle`), plus the Masonry props (responsive `columns`, `gap` / `gapX` / `gapY`, `columnClassName`). Cross-column mechanics inherited from Kanban : live snapshot synced on `onDragOver` via `@dnd-kit/helpers`' `move()`, commit on drop computed by **diffing flat orders by item id** (immune to React remounts), internal droppable columns accepting items even when empty (highlighted while hovered, `SORTABLE_COLUMN_OVER` / `getSortableColumnClasses` added to `themes/components/sortable.js`).
- Refactor — the responsive column-count resolution of `Masonry` (cascade `xxl → xs`) is extracted into a shared **`resolveColumnCount`** helper (`themes/helpers/resolveColumnCount.js`), consumed by both `Masonry` (behaviour strictly unchanged) and `SortableMasonry`.

**Lab**
- New `SortableMasonryDemo` on `/lab/masonry` (below the Masonry demo) : a **variable-heights** sortable masonry (responsive 2/3 columns) with an explanatory note about rebalancing, a **controlled** variant with the live flat order readout, a **Disabled Dragging** example (global « Disable all dragging » toggle via the container `disabled` prop + per-item 🔒 locks showing that an explicit item `disabled` wins over the injected one — and a note that disabled ≠ pinned), an **async reorder** with a « Simulate API failure » toggle showing the optimistic revert, and a props reference table.

**Components — Layouts (SortableTable / SortableTableRow, new — drag-and-drop row reorder)**
- New **`SortableTable`** (`components/layouts/SortableTable.jsx`) — a `Table` whose **rows reorder by drag and drop** (pointer, touch and keyboard), closing the wave-2 sortable family. **Data-driven** : rows are declared through `renderRow( item , index )` returning a `SortableTableRow` (`id` / `index` / `handle` / `disabled` injected, stable ids via `item.id` / `getItemId`) — the raw free-markup `Table` stays unchanged. **`head` / `foot` are arrays of column contents** : the component renders the `<thead>` / `<tfoot>` rows itself and **automatically prepends the empty `<th>`** matching the drag-handle column. Controlled (`items` + `onReorder`) or uncontrolled (`defaultItems`) with the same `onReorder( items , { from , to , item } )` optimistic-revert contract as the rest of the family. Every other prop is forwarded to `Table` (`zebra`, `pinRows`, `pinCols`, `size`, `scrollable`, `containerClassName`, …).
- New **`SortableTableRow`** (`components/layouts/SortableTableRow.jsx`) — the draggable `<tr>` : children are the `<td>` cells ; **`handle` defaults to `true`** (like `SortableListRow` — table rows usually hold interactive content) with an auto-prepended handle cell (keyboard-focusable button, `touch-none`) ; `handle={false}` makes the whole row draggable with no extra cell. Lifted style while dragged (`SORTABLE_TABLE_ROW_DRAG` — background + shadow, suited to a `<tr>`) via the new `getSortableTableRowClasses` generator in `themes/components/sortable.js`.

**Lab**
- Fix — the **« Table » navigation entry was missing** : the `/lab/table` page and its fr/en labels existed, but the link was absent from the Layouts section of the navigation registry — the page was only reachable by direct URL. Added (`LuTable` icon).
- New `SortableTableDemo` on `/lab/table` (below the Table demo) : sortable table with drag handles (avatars), **whole-row dragging** on a controlled `zebra` table with live order readout (with a note that zebra stripes follow DOM positions), a **sticky-header** example (`pinRows` + vertical scroll container), an **async reorder** with a « Simulate API failure » toggle showing the optimistic revert, and a props reference table.

## [0.2.17] — 2026-07-04

**Components — Popover (nested-in-Modal fix) & date / time pickers**
- Fix — **the Popover-based pickers (`InputDatePicker`, `InputDateRangePicker`, `InputTimePicker`, `InputDateTimePicker`) now work inside a `Modal`**. The Popover panel was portaled to `document.body` : under an open modal `<dialog>` that subtree is **inert** and paints **below the top layer**, so the calendar / time columns opened invisible and unclickable. The panel now portals **into the ancestor `dialog[open]`** of its anchor when one exists (children of a modal dialog stay interactive and paint within its top-layer entry — same technique as the toast provider) ; standalone usage still portals to `document.body`, strictly unchanged. The panel being `position: fixed`, it stays out of the `.modal` grid flow and its viewport coordinates remain valid. **No API change** — the four pickers are fixed at once.
- Fix — **`Popover`** : the `Escape` handler now **consumes the key** (`preventDefault`) — without it, once the panel is reachable inside a modal, `Escape` closed the picker **and** triggered the host dialog's native cancel (both surfaces closed). `Escape` now dismisses the topmost surface only : the picker when open, then the host modal.
- **`InputModal`** now accepts and forwards the **`portal`** prop to its `Modal` (it passes an explicit prop list, so `portal` could not reach the dialog before) — enabling `InputModal`-in-`Modal` usage, like `AlertModal` / `ConfirmModal` which already forward every prop.
- Lab — new **`PickersInModalDemo`** regression demo on `/lab/dates` (« Pickers inside a Modal ») : an « Éditer » host modal containing an `InputDatePicker`, an `InputTimePicker` and a deferred-commit `InputDateTimePicker` (`footer`, French labels), with the acceptance checklist (panel above the modal and clickable, picks update the fields, `Escape` ordering, outside-click, standalone unchanged).

**Components — Modal (rules-of-hooks fix)**
- Fix — **`Modal`** called `useBreakpoint` **conditionally** (`fullScreenBreakpoint ? useBreakpoint( … ) : true`) : if `fullScreenBreakpoint` appeared or disappeared between two renders of the same instance, the hook order broke (React crash). The hook is now called unconditionally with a fallback key, its result ignored when no breakpoint is requested — behaviour strictly unchanged.

**Components — Popover / Modal / InputModal (cleanups)**
- **`Popover`** : the host lookup now also recognises an **open popover element** (`dialog[open], [popover]:popover-open`) — a picker anchored inside a `usePopover`-mode `Modal` portals into that top-layer host too (same invisibility issue as the modal-dialog case). Guarded with a fallback to the dialog-only selector on browsers without `:popover-open` support.
- A11y — `Modal` : the header close button carries an explicit `type="button"` (inside a `<form>` it could submit the form) ; the `usePopover` variant carries `role="dialog"` (it already had `aria-labelledby`). The backdrop click-to-dismiss surfaces (`Modal`, `Popover`) are documented as decorative via targeted `biome-ignore` justifications — `Escape` is the keyboard equivalent.
- Cleanup — `InputModal` : dropped an unused `close` binding. **`biome lint` is now clean** on `Modal` / `Popover` / `InputModal`.

**Components — Pickers (localizable aria-labels / labels)**
- The icon buttons of the picker family now expose **localizable labels** instead of hardcoded English, in the spirit of the existing `applyLabel` / `cancelLabel` : `InputDatePicker`, `InputDateRangePicker`, `InputTimePicker`, `InputDateTimePicker` and `InputColor` gain **`clearLabel`** (clear button aria-label) and the four date/time pickers gain **`triggerLabel`** (open-picker button aria-label). `ColorPicker` gains **`eyeDropperLabel`** (eyedropper aria-label) and **`presetsLabel`** (the visible « Presets » heading). All default to their previous English strings — **every existing usage is unchanged**.
- Refactor — **`InputDateTimePicker`** drops its local `daysInMonth` copy and delegates to **`vegas-js-core`**'s `daysInMonth` (a thin adapter bridges the arg order / 0-based month, and keeps a leap-year fallback so February stays permissive while the year is still being typed). Verified identical on 96 cases (null/undefined/leap/century years × 12 months) — **behaviour unchanged**.

**Components — Layouts (SortableGrid / SortableGridItem, new — drag-and-drop reorder)**
- New **`SortableGrid`** (`components/layouts/SortableGrid.jsx`) — a `Grid` whose items can be **reordered by drag and drop** (pointer, touch and keyboard), the 2D sibling of `SortableList` with the **same API** : controlled (`items` + `onReorder`) or uncontrolled (`defaultItems`) with **optimistic revert** when `onReorder( items , { from , to , item } )` returns a rejected promise ; `renderItem( item , index )` returning a `SortableGridItem` (`id` / `index` / `handle` / `disabled` injected, explicit props win) ; stable ids via `item.id` or `getItemId`. Every other prop is forwarded to `Grid` (responsive `cols`, `gap`, alignment, …) and items **FLIP-animate** across rows and columns. Built on the same encapsulated engine and the shared `useSortableList` hook. Designed for grids of **uniform cells** flowing in DOM order — `col-span` / `row-span` items and `flow="dense"` are documented as not guaranteed.
- New **`SortableGridItem`** (`components/layouts/SortableGridItem.jsx`) — the draggable cell (`as` configurable, default `div`) : renders its children in a positioned wrapper with a lifted style while dragged (`SORTABLE_ITEM_DRAGGING`), plus an optional **overlay drag handle** (translucent button in the top-right corner, keyboard-focusable, `touch-none`). **Unlike `SortableListRow`, `handle` defaults to `false`** — grabbing the whole card is the natural grid UX ; enable `handle` for cards holding interactive content (buttons, links).
- Theme — new **`themes/components/sortable.js`** module shared by the sortable layout components : `getSortableItemClasses` / `getSortableItemHandleClasses` generators + `SORTABLE_ITEM` / `SORTABLE_ITEM_DRAGGING` / `SORTABLE_ITEM_HANDLE` constants (the list generators stay in `themes/components/list.js`).

**Components — Layouts (Grid — ref fix + doc fix)**
- Fix — **`Grid`** destructured its `ref` prop but **never attached it** to the rendered element : any `ref` passed to a `Grid` was silently swallowed. The ref now reaches the root element — required by the DnD layer and useful everywhere.
- Doc — the responsive `cols` JSDoc example showed an **array** (`cols={[1, 2, 3]}`), a format `getGridCols` silently ignores (no `grid-cols-*` class emitted) ; the documented responsive form is an **object** — `cols={{ xs: 1, md: 2, xl: 3 }}`.

**Lab**
- New `SortableGridDemo` on `/lab/grid` (below the Grid demo) : responsive sortable photo gallery (`cols={ { xs : 2 , md : 3 , xl : 4 } }`, whole cards draggable, images `draggable={false}`), **controlled** grid with live order readout, **overlay drag handles** variant (cards with a favorite button), **async reorder** with a « Simulate API failure » toggle showing the optimistic revert, and a props reference table.

**Components — Layouts (SortableFlex / SortableFlexItem, new — drag-and-drop reorder)**
- New **`SortableFlex`** (`components/layouts/SortableFlex.jsx`) — a `Flex` whose items can be **reordered by drag and drop** (pointer, touch and keyboard), completing the wave-1 sortable family (`SortableList` / `SortableGrid`) with the **same API** : controlled (`items` + `onReorder`) or uncontrolled (`defaultItems`) with **optimistic revert** on rejected `onReorder` promise, `renderItem` returning a `SortableFlexItem` (`id` / `index` / `handle` / `disabled` injected), stable ids via `getItemId`. Every other prop is forwarded to `Flex` (`direction`, `wrap`, `gap`, alignment, …) — suited to **reorderable tags, chips, pills and toolbars**, horizontal, vertical (`direction="col"`) or wrapping rows. Same encapsulated engine, same shared `useSortableList` hook.
- New **`SortableFlexItem`** (`components/layouts/SortableFlexItem.jsx`) — the draggable item (`as` configurable) : lifted style while dragged, and an optional **inline drag handle** rendered as the first child in the flow (`btn-xs`, keyboard-focusable, `touch-none`) — suited to compact chips where the grid's overlay handle would cover the content. Like `SortableGridItem`, `handle` defaults to `false` (whole items draggable).
- Theme — `themes/components/sortable.js` gains the **`getSortableInlineHandleClasses`** generator and the `SORTABLE_ITEM_HANDLE_INLINE` constant.

**Lab**
- New `SortableFlexDemo` on `/lab/flex` (below the Flex demo) : **wrapping reorderable tags** (whole chips draggable), **controlled pills** with live `A → B → …` order readout and index-aware rendering, a **vertical `direction="col"`** stacked example, **inline drag handles** on removable chips (the `×` button stays clickable, dragging only from the handle), **async reorder** with a « Simulate API failure » toggle showing the optimistic revert, and a props reference table.

## [0.2.16] — 2026-07-04

**Components — Lists (SortableList / SortableListRow, new — drag-and-drop reorder)**
- New **`SortableList`** (`components/lists/SortableList.jsx`) — a `List` whose rows can be **reordered by drag and drop** (pointer, touch and keyboard). Works **controlled** (`items` + `onReorder`) or **uncontrolled** (`defaultItems`) ; in uncontrolled mode reorders are **optimistic** : `onReorder( items , { from , to , item } )` may return a promise, and a rejection (e.g. a failed API call) **restores the previous order** automatically. Rows are declared through `renderItem( item , index )` returning a `SortableListRow` — `SortableList` injects `id` / `index` / `handle` / `disabled` into it (explicit props win). Items need a **stable unique id** (`item.id` by default, customizable via `getItemId`). Other props (`className`, `as`, …) are forwarded to `List`. The DnD engine (`@dnd-kit/react`, new dnd-kit architecture) is **fully encapsulated — it never appears in the public API**, so the foundation can evolve without breaking consumers.
- New **`SortableListRow`** (`components/lists/SortableListRow.jsx`) — the draggable row : accepts **all `ListRow` props**, plus `handle` (default `true` — renders an accessible **drag-handle button** (`aria-label` via `handleLabel`, keyboard-focusable, `touch-none` so mobile scroll and drag don't fight) injected before `leading` ; `handle={false}` makes the **whole row draggable**), `handleClassName` and `group`. While dragged, the row gets a lifted style (shadow + ring, `LIST_ROW_DRAGGING`) and items **FLIP-animate** into their new positions (provided by the engine). Keyboard reordering works out of the box (Tab to a handle, Enter to lift, arrows to move, Enter to drop).
- Theme — `themes/components/list.js` gains the **`getSortableListRowClasses`** / **`getSortableHandleClasses`** generators and the `LIST_ROW_DRAGGING` / `SORTABLE_HANDLE` constants.

**Hooks — useSortableList (new)**
- New **`useSortableList`** (`hooks/useSortableList.js`) — the order-state plumbing of sortable collections, following the `useValue` controlled/uncontrolled pattern : `{ defaultItems , items , onReorder }` → `{ items , reorder( from , to ) , isControlled }`, with the optimistic apply-then-revert behaviour described above. Also exports a pure **`arrayMove`** helper. Designed to be reused by the upcoming `SortableGrid` / `SortableFlex`.

**Components — Lists (List / ListRow — ref + rest props)**
- **`List`** and **`ListRow`** now accept a **`ref`** (React 19 ref-as-prop) and **forward arbitrary props** (`...rest`) to their root element — required by the DnD layer (node refs, ARIA attributes, sensor listeners) and useful for any integration. **All existing usages unchanged.**

**Dependencies**
- New runtime dependency **`@dnd-kit/react`**, **pinned exactly to `0.5.0`** (the actively-developed new dnd-kit architecture ; pinned deliberately while it is 0.x semver — bumps are reviewed manually).

**Lab**
- New `SortableListDemo` on `/lab/lists` (below the List demo) : uncontrolled list with drag handles, **controlled** list with whole-row dragging and live order readout, **async reorder** simulating an API call with a « Simulate API failure » toggle showing the optimistic revert, and a props reference table.

**Components — Modal (`portal` prop, new) & Inputs (InputColor — nested-modal fix)**
- Fix — **`InputColor` used inside another `Modal` no longer closes the host modal** when the picker is used (saturation / hue drag, presets, hex field, eyedropper) or dismissed (Apply / Cancel / ×, backdrop, `Escape`). The picker `<dialog>` was a DOM descendant of the host `<dialog>` — two DOM-nested modal dialogs trigger the browser's **native** nested-dialog handling, which closes the ancestor and cannot be intercepted from JS. The picker modal is now **portaled to `document.body`** : the two dialogs are siblings in the top layer, `Escape` closes the topmost first (the picker when open, then the host), and only the picker's own dismissals close it. `ColorPicker` / `Interactive` are untouched and standalone `InputColor` behaviour is strictly unchanged.
- New — **`Modal`** accepts an optional **`portal`** prop (default `false`) : renders the modal through the existing `Portal` component onto `document.body`, detached from the parent DOM subtree, after mount (SSR / hydration-safe — until mounted the dialog renders in place, closed and invisible ; `useModal`'s ref setter re-attaches its listeners on the node swap). Works in `usePopover` mode too. **Reusable for any modal-in-modal** (`InputModal`, edit forms…) — `InputColor` passes it by default (overridable via `modalProps`).
- Fix — **`useModal`** : the `toggle` listener now ignores `<dialog>` nodes — modern browsers fire `toggle` on dialogs too (not only on popover elements), so `onOpen` / `onClose` were called **twice** per open / close.
- Lab — new **`InputColorInModalDemo`** regression demo in `ColorDemo` (`/lab/colors`, « InputColor inside a Modal ») : an « Éditer » host modal containing a live `InputColor` and a deferred-commit one (`footer` + `clearable`, French labels), covering the full acceptance checklist (drag, presets, hex, every dismissal path, `Escape` ordering, clear, live vs deferred commit).

## [0.2.15] — 2026-07-04

**Components — Inputs (InputColor — Apply / Cancel footer, deferred commit)**
- **`InputColor`** now accepts an optional **`footer`** prop (default `false`) : when enabled, the picker modal gains an **Apply / Cancel footer** and switches to a **deferred commit** — the picker edits a draft seeded from the current value when the modal opens ; **Apply** commits the draft to the value, while **Cancel**, the backdrop, `Escape` or the header close button all discard it (the draft is re-seeded on the next open). Without `footer`, the live behaviour is strictly unchanged (every drag / pick updates the value immediately).
- The buttons are **localizable** via **`applyLabel`** / **`cancelLabel`** (defaults `'Apply'` / `'Cancel'`) — same prop names as the date / time pickers (`InputDateTimePicker`…), mapped onto the existing standard footer of the `Modal` (`agree` / `disagree` / `onAgree`) : no new UI, no change to `Modal` / `ColorPicker`, **all existing usages unchanged**.
- Lab — new « Deferred commit (footer) » example in `ColorDemo` (`/lab/colors`) : a controlled `InputColor` with `footer`, French labels (`Appliquer` / `Annuler`), localized modal title and live selected-value readout.

## [0.2.14] — 2026-07-04

**Components — Inputs (InputColor — `clearable` prop)**
- **`InputColor`** now accepts an optional **`clearable`** prop (default `false`) : when enabled and the field has a value, a ghost `×` button appears **left of the picker trigger** (same pattern and placement as `InputDatePicker` / `InputTimePicker` / `InputDateTimePicker`). Clicking it resets the value to `''` — the button then disappears, the preview swatch falls back to the neutral state, and the button follows the `disabled` state. Implemented through the existing `actions` array slot of the base `Input` (`actions = [ clearButton , trigger ]`) — no change to `Input` / `InputHexColor` and **all existing usages are unchanged**.
- Lab — new « Clearable color » example in `ColorDemo` (`/lab/colors`) : a controlled `InputColor` with `clearable`, live selected-value readout.

## [0.2.13] — 2026-07-03

**Components — I18n (I18nTextAreaMarkdown, new)**
- New **`I18nTextAreaMarkdown`** (`components/i18n/I18nTextAreaMarkdown.jsx`) — a single Markdown editor for a multi-language rich-text field, third member of the I18n family (`I18nInput` / `I18nTextArea`). The value is a `{ [lang]: string }` map ; a `FlagMenu` above the editor swaps **both the editor content and the Markdown preview** to the active language, and each language with non-empty content carries a dot indicator. The whole map is **one value** (single dirty signal for the parent form). Built on the shared `useI18nField` hook. Forwards every other prop to `TextAreaMarkdown` (`showPreview`, `previewPosition`, `markdownProps`, helper, error, autosize, minRows, maxRows, …).
- Lab — new `I18nTextAreaMarkdownDemo` (controlled `{ fr, en }` « Description » with side-by-side preview + live JSON preview, `previewPosition="tab"` variant, disabled variant), wired into the TextArea lab « I18n Markdown » tab (`/lab/textareas`).

**Components — TextArea (TextAreaMarkdown — controlled mode fix)**
- Fix — **`TextAreaMarkdown`** is now truly controllable : `defaultValue` / `value` / `onChange` are managed through the `useValue` hook instead of a local `useState` frozen on `defaultValue`. Previously a parent-provided `value` was silently overridden by the internal state — the change handler bubbled up but an external value push (e.g. an I18n wrapper swapping languages, a form reset) never reached the editor nor the preview. Uncontrolled usages (`defaultValue` only) are strictly unchanged.
- Fix — the Write / Preview tab buttons now carry `type="button"` : inside a `<form>`, clicking a tab used to **submit the form** (a button's default type is `submit`).
- Fix — the « Preview » heading of the split view renders as a styled `<span>` instead of a `<label>` without `htmlFor` (same a11y fix as `I18nTextArea` in 0.2.11) ; the `ref` is now forwarded in split view too (it only reached the textarea in tab mode) ; added the missing `displayName`.

**Components — I18n (I18nInput, new)**
- New **`I18nInput`** (`components/i18n/I18nInput.jsx`) — a single `Input` for a multi-language text field, the input twin of `I18nTextArea`. The value is a `{ [lang]: string }` map ; a `FlagMenu` above the input swaps the edited language, and each language with non-empty content carries a dot indicator so the user sees at a glance which translations are filled. The whole map is **one value** (single dirty signal for the parent form). Languages default to the `useLang` context (`['fr', 'en']`), the active language to the current UI language ; both overridable via `languages` / `defaultLang`. Forwards every other prop to `Input` (icon, helper, error, placeholder, color, size, actions, maxLength, transform, …). Note : HTML5 validation props (`required`, `pattern`, `minLength`, …) only apply to the **currently visible language** — the flag indicators carry the overall completeness (documented in the jsdoc).
- Lab — new `I18nInputDemo` (controlled `{ fr, en }` « Titre » field with live JSON preview, « Slogan » with icon + `maxLength`, disabled variant), wired into the Inputs lab « I18n » tab (`/lab/inputs`, Text category).

**Hooks — useI18nField (new)**
- New **`useI18nField`** (`hooks/useI18nField.js`) — the shared plumbing of multi-language fields, extracted from `I18nTextArea` : language-list resolution (props → `useLang` context → `['fr','en']`), initial active language (`defaultLang` → current UI lang → first), per-language « filled » indicators for the `FlagMenu`, active-language value extraction and `{ ...value , [lang] : text }` merge. The change handler accepts either a raw value or a DOM change event, so it plugs directly onto any field component (`Input` emits raw values, a native `<textarea>` emits events).
- Refactor — **`I18nTextArea`** now consumes `useI18nField` (behaviour and API strictly unchanged) ; `I18nInput` and `I18nTextArea` share the exact same logic, and future I18n fields (`I18nTextAreaMarkdown`, …) will build on the same hook.

**Components — Menu (FlagItem — indicator alignment fix)**
- Fix — **`FlagItem`** now always renders the daisyUI `indicator` wrapper and only toggles the dot inside it, so every flag shares the same DOM structure. Previously the wrapper was conditional : flags **with** a dot (`inline-flex`, baseline-aligned) sat a few pixels lower than flags **without** one (plain block `<li>`), visibly misaligning the `FlagMenu` as soon as a single language was filled. Also keeps the DOM stable while typing (no re-mount when a language flips empty ↔ filled). Benefits every `FlagMenu` with indicators (`I18nInput`, `I18nTextArea`, …).

## [0.2.12] — 2026-07-02

**Components — FAB / Speed Dial (new)**
- New **`Fab`** (`components/menus/Fab.jsx`) — a Floating Action Button that sticks to a corner of the screen (daisyUI `.fab`, `position: fixed` by default) and reveals its Speed Dial buttons on focus/hover. The open/close behaviour is **pure CSS — no client state**. The trigger is rendered as a focusable `<div tabindex="0" role="button">` (not a `<button>`) to work around a Safari focus bug, per daisyUI's recommendation. Built on top of `Button`, so every sub-button inherits icon / color / shape / tooltip / i18n support. Data-driven via an `actions` array (`{ id, icon, text, label, color, circle, onClick, tooltip, tooltipPosition }`) or fully composable via `children`. Props: `icon` / `label` / `color` / `size` (trigger, default `lg`), `flower` (quarter-circle arc, up to 4 actions), `position` (default `fixed`; `absolute` / `relative` to embed), `mainAction` **or** `closeButton` (mutually-exclusive slot shown when open), `className` / `actionClassName`. In vertical mode an action's `label` is a side label; in `flower` mode it becomes the button's tooltip.
- Theme generator **`themes/components/fab.js`** (`getFabClasses`) — `fab` base + optional `fab-flower` modifier + position (via `getPosition`, default `fixed`). Exports the `FAB` / `FAB_FLOWER` / `FAB_CLOSE` / `FAB_MAIN_ACTION` constants. **No new runtime dependency.**
- Lab — new **FAB** tab (`/lab/fab`, Actions section) with `FabDemo` (vertical, icons, labels, rectangle buttons, close button, main action, single FAB, flower, flower + icons/tooltips — each in a `relative` frame so the FAB sits in the corner instead of floating over the page); navigation + locale (fr/en « FAB ») entries.

**Components — Skeleton (new)**
- New **`Skeleton`** (`components/Skeleton.jsx`) — a placeholder for a component's loading state (daisyUI `.skeleton`). Shape, size and radius come from utility classes passed via `className` (`h-32 w-32`, `rounded-full`, `h-4 w-28`…), mirroring the daisyUI usage. Props: `as` (element type, default `div`), `text` (bool → adds `skeleton-text`, animating the text color instead of the background — the "AI is thinking…" case), `children`; forwards every other prop. Renders as plain markup with no client state.
- Theme generator **`themes/components/skeleton.js`** (`getSkeletonClasses`) — `skeleton` base + optional `skeleton-text` modifier (via `text`). Exports the `SKELETON` / `SKELETON_TEXT` constants. **No new runtime dependency.**
- Lab — new **Skeleton** tab (`/lab/skeleton`, Feedback section) with `SkeletonDemo` (basic square, circle-with-content avatar, rectangle-with-content card, animated gradient text, custom element); navigation + locale (fr/en « Skeleton ») entries.

## [0.2.11] — 2026-07-02

**Components — Menu (FlagMenu — `languages` prop)**
- **`FlagMenu`** now accepts an optional **`languages`** prop to override the rendered language list. When omitted it falls back to the `useLang` context languages, so **all existing usages are unchanged** (fully backward-compatible). This makes the flag list the single source of truth for callers that need a custom set independent of the global context.
- **`I18nTextArea`** now forwards its `languages` prop to `FlagMenu`, so the rendered flags, the filled-indicators map and the initial active language all derive from the **same** list (fixes the earlier mismatch where `languages` drove only the indicators).
- Cleanup — `FlagMenu` items are now keyed by their language code instead of the array index (`noArrayIndexKey`), which is stable now that the list can vary.
- Lab — new « Langues custom » example in `FlagMenuDemo` (`/lab/menus`) rendering `['fr','en','es','de','it']` regardless of the context.

**Components — I18n (I18nText, new)**
- New **`I18nText`** (`components/i18n/I18nText.jsx`) — resolves ONE locale string client-side via `useI18n`, so it reacts instantly to a language switch (no navigation, no frozen server-resolved prop). Renders as plain text (a JSX child). Props: `path` (locale bundle), `field` (dot-path within the bundle), `fallback` (rendered when the field is missing), `args` (positional values for `fastformat` interpolation `{0}`, `{1}`, …). Returns `null` when the field is missing and no `fallback` is given.
- Lab — new `I18nTextDemo` in the Typography tab (`/lab/typography`) showing a plain string, `args` interpolation and a `fallback` case ; values update live when the app's global language is switched (no in-demo toggle needed — it reacts to the existing flag menu).
- New **`app.lab.i18n`** demo locale bundle (`@locale/app/lab/i18n.js`, fr/en: `title` / `intro` / `count` pattern) registered in the lab locale index.
- Cleanup — removed a dead `BadgeDemo` import from the Typography lab page (never rendered).

**Components — I18n (I18nTextArea, new)**
- New **`I18nTextArea`** (`components/i18n/I18nTextArea.jsx`) — a single `TextArea` for a multi-language text field. The value is a `{ [lang]: string }` map ; a `FlagMenu` above the textarea swaps the edited language, and each language with non-empty content carries a dot indicator so the user sees at a glance which translations are filled. The whole map is **one value** (single dirty signal for the parent form). Languages default to the `useLang` context (`['fr', 'en']`), the active language to the current UI language ; both overridable via `languages` / `defaultLang`. Forwards every other prop to `TextArea` (label, helper, error, autosize, minRows, maxRows, placeholder, disabled, …).
- Lab — new `I18nTextAreaDemo` (controlled `{ fr, en }` field with live JSON preview + a disabled variant), wired into the TextArea lab « I18n » tab (`/lab/textareas`).
- The `languages` prop drives the rendered flags, the filled-indicators map and the initial active language consistently (it is forwarded to `FlagMenu` — see the FlagMenu entry above).
- Fix — the group heading now renders as a styled `<span>` instead of a `<label>` without `htmlFor` (it labels the flags + textarea group, not a single control), fixing the `noLabelWithoutControl` a11y lint.

**Components — Input (InputAction, new)**
- New **`InputAction`** (`components/inputs/InputAction.jsx`) — a text input with a single trailing action button, built on the `Input` `actions` slot (daisyUI `.join`, `btn-square`). Typical use : a `+` button to commit the current draft into a parent collection (tags, allowed IPs, …). Pressing **Enter** fires `onAction` (cancellable via `submitOnEnter={false}`); the button carries an optional daisyUI tooltip, colour/style (`actionColor` / `actionStyle`), `actionDisabled`, `actionType` and an a11y `actionAriaLabel` (falls back to `actionTooltip`). Inherits the input's `error` (button turns `btn-error`) and `disabled` state. Forwards every other prop to `Input` (label, helper, placeholder, masks, …).
- Lab — new `InputActionDemo` (tag-list builder: commit on `+`/Enter, `actionDisabled` while empty, coloured/custom-icon action, Enter-disabled variant, error state, disabled field), wired into the Inputs lab « Action » tab (`/lab/inputs`, Text category).
- Fix — jsdoc `@module` corrected from `components/inputs/ActionInput` to `components/inputs/InputAction`.

**Components — Button (RevokeButton, new)**
- New **`RevokeButton`** (`components/buttons/RevokeButton.jsx`) — a *soft-cancel* affordance mirroring `RemoveButton` but with semantics for actions that flip a document to a `cancelled` state while keeping the audit trail (invitation / session / policy-assignment revoke), where `RemoveButton` would be misleading because the row stays in the database. Pre-configured `MdRemoveCircle` icon + `Jump` motion; forwards every `MotionButton`/`Button` prop (`color`, `shape`, `size`, `motion`, `motionProps`, …). Defaults: `color="primary"`, `shape="circle"`, `size="md"`, i18n `path="components.buttons.revoke"`.
- New **`revoke`** locale (`@locale/components/buttons/revoke.js`, fr « Révoquer » / en « Revoke ») registered in the buttons locale index — resolves the button's label / title / tooltip.
- Lab — `RevokeButton` added to `ButtonDemo` (Buttons tab, `/lab/buttons`), one instance per daisyUI color.
- Fix — `RevokeButton` now imports `Jump` / `MotionButton` via **relative paths** (like its sibling buttons) instead of the `oihana-next-ui/…` self-package specifier.

## [0.2.10] — 2026-07-01

**Components — Button / IconBox (inline icon style)**
- **`IconBox`** accepte désormais une prop **`style`** (`React.CSSProperties`) appliquée à la `<div>` conteneur ; le SVG hérite de la couleur via `currentColor`. Utile pour un réglage ponctuel (taille, marge, couleur inline) sans passer par une classe.
- **`Button`** expose une prop **`iconStyle`** transmise à `IconBox` (`style`), pour styliser le wrapper de l'icône en inline sans toucher au `iconClassName`.

## [0.2.9] — 2026-07-01

**Components — Accordion (new)**
- New **`Accordion`** (`components/layouts/Accordion.jsx`) — a data-driven wrapper over `Collapse` for show/hide lists. Takes an `items` array (`{ id, title, content, defaultOpen, disabled, className }`) and renders one `Collapse` per item. Exclusive by default (`mode="radio"` with a shared **auto-generated `name`** via `useId`, so multiple accordions on a page never clash); `allowMultiple` switches items to independent `checkbox` mode (several open at once). Props: `icon` (`arrow` / `plus`, applied to every item), `join` (items joined with shared border radius), `name` override, plus `className` / `itemClassName` / `titleClassName` / `contentClassName`. Sensible daisyUI defaults (item border, `font-semibold` title, `text-sm` content), all overridable. **No new theme generator** — reuses `themes/components/collapse.js`.
- Lab — new **Accordion** tab (`/lab/accordion`, Layouts section) with `AccordionDemo` (arrow / plus / allowMultiple / join / disabled item); navigation + locale (fr « Accordéon » / en « Accordion ») entries.
- Note: the searchable `details` variant (exclusive `<details name>`) is intentionally out of scope for now (would require `Collapse` to forward `name` to `<details>`); the radio/checkbox modes cover the common cases.

**Components — Dock (new)**
- New **`Dock`** (`components/menus/Dock.jsx`) — daisyUI `dock` (bottom navigation / bottom bar). Data-driven `items` array (`{ id, label, href, icon, onClick, active }`) or composable `DockItem` children. Items with an `href` render as Next links with active state auto-detected from the pathname (override via `active`); items with only `onClick` render as `<button>`. Props: `size` (`xs` / `sm` / `md` / `lg` / `xl`, responsive object supported), `position` (default `fixed`; pass `relative` / `static` to embed), `showLabel`, plus `itemClassName`. Custom colours via `className` (e.g. `bg-neutral text-neutral-content`).
- New **`DockItem`** (`components/menus/DockItem.jsx`) — single link/button entry with `icon` + optional `.dock-label`, usable standalone.
- Theme generator **`themes/components/dock.js`** (`getDockClasses` / `getDockItemClasses`) — `dock` base + responsive size (via `getResponsiveDefinition`, safelisted) + `position` (via `getPosition`, default `fixed`) + `dock-active` modifier. **No new runtime dependency.**
- Lab — new **Dock** tab (`/lab/dock`, Navigation section) with `DockDemo` (contained in a mobile-like `relative` frame: sizes / labels off / custom colours / composable + action button); navigation + locale (fr / en « Dock ») entries.
- Note: for iOS add `<meta name="viewport" content="viewport-fit=cover">` to the root layout, and pad the page bottom so content is not hidden behind the fixed dock.

**Components — Breadcrumbs (new)**
- New **`Breadcrumbs`** (`components/menus/Breadcrumbs.jsx`) — daisyUI `breadcrumbs` wrapper rendered as a semantic `<nav aria-label="breadcrumb"><ul>`. Two usage modes: **data-driven** via an `items` array (`{ id, label, href, icon }`) — the common case — or **composable** `BreadcrumbItem` children. Items with an `href` render as clickable links (through the existing `Link`, so `aria-current` / active state come for free); items without one render as a plain `<span>` (the current page). Props: `size` (`xs` / `sm` / `md` / `lg`, default `sm`), `maxWidth` (e.g. `max-w-xs`) to enable horizontal scrolling, plus `itemClassName` / `linkClassName` pass-throughs.
- New **`BreadcrumbItem`** (`components/menus/BreadcrumbItem.jsx`) — single `<li>` entry with optional leading `icon` (wrapped `inline-flex items-center gap-2`), usable standalone for custom breadcrumbs.
- Theme generator **`themes/components/breadcrumbs.js`** (`getBreadcrumbsClasses`) — `breadcrumbs` base + size map + optional `maxWidth`. **No new runtime dependency.**
- Lab — new **Breadcrumbs** tab (`/lab/breadcrumbs`, Navigation section) with `BreadcrumbsDemo` (items / icons / composable / sizes / max-width scroll); navigation + locale (fr « Fil d'Ariane » / en « Breadcrumbs ») entries.

**Components — Modal popover mode (new)**
- **`Modal`** gains an opt-in **`usePopover`** prop — the modal renders through the native HTML Popover API (`popover` element) instead of `<dialog>`. It can be opened **declaratively** (a `<button popovertarget={id}>`, no JavaScript — new `id` prop) or through `useModal`, closes on `Escape` and backdrop click, and is **non-blocking** (it does not trap focus or block the page — for light panels, not for blocking confirmations). Default (`usePopover={false}`) is unchanged: still a `<dialog>`. daisyUI 5.6 already styles `.modal:popover-open`, so no theme change was needed.
- **`useModal`** auto-adapts to the element kind (reads its `popover` attribute): `open` / `close` call `showPopover()` / `hidePopover()` for popovers and `showModal()` / `close()` for dialogs, syncing `isOpen` from the `toggle` event (popover, including declarative opens) or the `close` event (dialog). Fully backward compatible.

**Fixes — InputModal**
- `openOnFocus` no longer gets stuck reopening : closing the modal returned focus to the input, which re-fired `focus` and reopened it. Guarded on `isOpen` (still true at the focus-return moment) so the auto-reopen is skipped; a deliberate re-focus still opens it.
- The action button (Browse / Clock…) now matches the field height — it dropped the forced `size="sm"`, takes the input `size` and a `join-item` class so it sits flush with the field (like the date / time pickers). New `size` prop forwarded to both the field and the button.

## [0.2.8] — 2026-06-29

**Components — Date-time picker (new)**
- New **`InputDateTimePicker`** (`components/inputs/InputDateTimePicker.jsx`) — a single masked `JJ/MM/AAAA HH:MM` field paired with a popover that hosts the `Calendar` **and** `TimeColumns` side by side. Combines the building blocks of `InputDatePicker` and `InputTimePicker`. The value is the combined string (e.g. `"25/12/2026 14:30"`, or with a trailing `AM` / `PM` when `ampm`) with the parsed `Date` via **`onDateTime`**. The popover stays open (date + time take several picks) and closes on outside-click / `Escape`, or via the optional Apply / Cancel **`footer`** (deferred commit). `ampm` adds an AM/PM toggle + column; `useSeconds`, `minuteStep` / `secondStep`, `min` / `max` (date bound), `mode` / `separator`, `calendarProps`, and the responsive `display` are all supported.
- The combined field mask enforces the segment ranges — first digits constrained while typing (month `0-1`, day `0-3`, hour `0-2` / `0-1` in 12h, minute / second `0-5`) and a postprocessor clamps complete segments (month ≤ 12, hour ≤ 23 / 12, minute / second ≤ 59). The day is clamped to the **days-in-month** once day + month are entered (28 / 29 / 30 / 31 — February uses the year for the leap check), for any mode order. The hour bounds follow `ampm` (1–12) vs 24-hour (0–23).

**Components — Time picker (new, dependency-free)**
- New **`TimeColumns`** (`components/times/TimeColumns.jsx`) — a self-contained, column/list time picker built on the existing `Time` class + `useTime` hook (no analog clock). Hours and minutes, with optional **seconds** and an **AM/PM** column (`ampm`), stepped by `minuteStep` / `secondStep`, bounded by `min` / `max` (24-hour), plus a **Now** shortcut. Controlled / uncontrolled, sharing the value semantics of `InputTime` (`value` / `onChange` string + `onTime` `Time`). The selected value is brought into view only when off-screen, so clicking a visible value never moves the column and a manual scroll is not undone.
- Column subcomponent `components/times/timecolumns/TimeColumn.jsx` (presentational scroll column) + helper `helpers/time/getTimeColumns.js` (pure column descriptors with per-option `selected` / `disabled`, bounds checked against 24-hour `min` / `max`). Theme generator `themes/components/timePicker.js` (`getTimeColumnsClasses` / `getTimeColumnClasses` / `getTimeOptionClasses`). **No new runtime dependency.**
- New **`InputTimePicker`** (`components/inputs/InputTimePicker.jsx`) — the masked `InputTime` paired with `TimeColumns` in the responsive `Popover` (the time mirror of `InputDatePicker`). The field and the columns share one value; unlike the date picker the popover does **not** close on each pick (time needs several taps) — it closes on outside-click / `Escape`, or via the optional Apply / Cancel **`footer`** (`'never'` default / `'always'` / `'mobile'` / `'desktop'`, deferred commit like `InputDateRangePicker`). `ampm` keeps the field's AM/PM toggle in sync with the picker's AM/PM column; clear `×`, `min` / `max`, `minuteStep` / `secondStep`, `useSeconds`.
- `InputTime` gains an `actions` prop — extra action button(s) appended **after** the AM/PM toggle (used by `InputTimePicker` for its clear / trigger buttons; backward compatible).
- Lab — new **Time** tab (`/lab/times`, Form section) with `TimeDemo` (`TimeColumns` + `InputTimePicker`); navigation + locale (fr / en) entries. The temporary time demos were removed from the `inputs` tab.

**Changed — generic `Popover`**
- Extracted the date pickers' responsive host into a generic **`Popover`** (`components/Popover.jsx`) — same Portal + dropdown / modal + viewport-clamped positioning + optional Apply / Cancel footer, now reusable by any picker (the upcoming time picker included). `InputDatePicker` / `InputDateRangePicker` retargeted to it, no behaviour change. **Breaking (path):** `components/dates/CalendarPopover` is removed — import `components/Popover` instead (`DROPDOWN` / `MODAL` / `RESPONSIVE` exports unchanged).
- `Popover` dropdown no longer closes on a scroll that happens **inside** the panel — only a page scroll (which would detach it from the anchor) dismisses it. Fixes the time picker closing instantly when scrolling a column or auto-centering (and a latent issue for any scrollable popover content).

## [0.2.7] — 2026-06-28

**Components — Color picker (new, dependency-free)**
- New **`InputColor`** (`components/inputs/InputColor.jsx`) — a hex field with a live colour preview that opens a visual picker inside a `Modal` (centered, responsive, works on mobile). Controlled / uncontrolled, `alpha`, sizes, and every `InputHexColor` prop forwarded. The modal picker opens in the **horizontal** layout by default (square left, controls right) and folds back to vertical on small screens; new `orientation` / `collapse` props are forwarded to the `ColorPicker` and the modal width adapts (`max-w-md` horizontal / `max-w-xs` vertical). Set `orientation="vertical"` for the stacked layout.
- New **`ColorPicker`** (`components/colors/ColorPicker.jsx`) — a self-contained, hand-rolled picker: saturation/brightness square + hue (+ optional alpha) tracks, an editable hex field, an eyedropper (native EyeDropper API — progressive, auto-hidden where unsupported, e.g. mobile) and a preset palette. Mouse, touch and keyboard. Keeps HSVA as the source of truth, so dragging into black/grey never loses the hue. Toggles: `alpha` / `showInput` / `showPresets` / `showEyeDropper` / `presets`.
- `ColorPicker` **layout** — new `orientation` prop (`vertical` default / `horizontal`, reusing `HORIZONTAL` / `VERTICAL` from `enums/orientations`). Horizontal puts the square on the left and the tracks / input / presets in a right-hand column. A `collapse` prop controls the responsive fold back to vertical: `viewport` (default, the `sm` 640px breakpoint), `container` (a `@container` query reacting to the picker's own width, folds < `@md` 448px), or `never`. CSS-only (no JS / no `matchMedia`), SSR-safe. The interactive sub-controls are untouched; the default vertical layout is byte-for-byte unchanged.
- New **`ColorIndicator`** (`components/colors/ColorIndicator.jsx`) — a presentational colour swatch (xs–xl, with an empty state), used by the picker presets.
- Picker internals under `components/colors/picker/` (`Interactive`, `Saturation`, `Hue`, `Alpha`, `Pointer`) — pointer geometry adapted from react-beautiful-color (MIT).
- New colour helpers `helpers/colors/{rgbToHsv,hsvToRgb,hexToHsva,hsvaToHex}.js` (HSV ↔ RGB ↔ hex), composing with `vegas-js-core` hex↔rgb. **No new runtime dependency.**
- Theme generator `themes/components/colorPicker.js` (`getColorPickerClasses` — now `orientation` / `collapse`-aware, `getColorPickerSurfaceClasses` for the square + column structural classes, `getColorIndicatorClasses`, `DEFAULT_PRESETS`, and the `VIEWPORT` / `CONTAINER` / `NEVER` collapse constants). Responsive / container-query classes shipped via a `@safelist` block.
- Lab — new **Colors** tab (`/lab/colors`, Form section) with `ColorDemo`; navigation + locale (fr / en) entries.

**Components — Calendar (new, dependency-free, dayjs)**
- New **`Calendar`** (`components/dates/Calendar.jsx`) — a self-contained, dayjs-based month calendar. **Single** date or **range** selection (`mode="single" | "range"`), one or **two** months (`months={1 | 2 | 'auto'}` — `'auto'` shows 2 on `md`+ screens, 1 on mobile), with a live hover preview while picking a range. Controlled / uncontrolled via `useValue` (single → `Date`, range → `{ from, to }`), `min` / `max` bounds, and an opt-in **`clearable`** (re-click the selected day / a range endpoint, or press `Escape`, to clear). **Locale-aware** via `useLang()`: month / weekday names and the **first day of week** follow the active language (fr / en), reusing the dayjs locale set by the LangProvider. Selected / today / range / out-of-range days use daisyUI **theme** colours (out-of-range = readable muted + line-through, inert). The input pickers land next.
- **Shortcuts** (opt-in `shortcuts`) — a presets list (Today, Last 7 days, This month… in range mode; Today / Yesterday / Tomorrow in single mode), or a custom array. On `sm`+ it is a vertical column with a divider; on **mobile** it collapses to a single-row, finger-swipeable strip (native scroll + edge fade) that scrolls *within* the calendar's width without widening it. The shortcut matching the current selection is highlighted; labels are overridable for i18n (the demo localizes them via `useLang`). Custom items may carry an **`Icon`** (shown before the label) and **`{ divider: true }`** separators (a vertical rule in the mobile strip, a horizontal one in the column).
- **Quick month / year navigation** — the header month / year label is now clickable : the month opens a 4×3 grid of the 12 localized months, the year opens a 4×3 grid of 12 years paged ±12 (years → month → day chaining), so a far date is a few clicks away instead of dozens of month steps. `min` / `max` disable out-of-range months / years. In the **dual-month** view each column is independent — opening the picker in one column keeps the other on its days, and picking keeps the two months consecutive. New **`defaultMonth`** prop sets the month shown on first render when there is no value.
- **Blackout dates** — new **`disabledDates`** prop blocks specific days (holidays / unavailable dates) : a `Date`, a `{ from, to }` range (inclusive, open-ended if `from` or `to` is omitted), an array of those, or a predicate `(date) => boolean` (e.g. disable weekends). Blocked days render struck-through and inert and can't be range endpoints. By default a range **stops before** the first blocked day (the hover preview is capped and the selection commits exactly what is previewed); new **`allowDisabledInRange`** lets a range span blocked days. New helper `helpers/date/matchDisabledDate.js` (`createDisabledMatcher`). Pass it to the field pickers via `calendarProps`.
- **Week start override** — new **`weekStartsOn`** prop forces the first day of week (a number `0`–`6` with `0` = Sunday, or `'sun'`…`'sat'`) independently of the locale (which still drives it by default). `getMonthMatrix` / `getWeekdayLabels` take the new argument and a `normalizeWeekday` helper is exported.
- Calendar internals under `components/dates/calendar/` (`Header`, `Weekdays`, `Day`, `MonthGrid`, `MonthsGrid`, `YearsGrid`, `Shortcuts`) + helpers `helpers/date/{configureDayjs,getMonthMatrix,shortcuts}.js` (6×7 month grid + localized weekday labels + default presets). dayjs plugins `localeData` / `weekday` / `isBetween` are registered once in `configureDayjs`. **No new runtime dependency** (no react-day-picker / date-fns).
- Theme generator `themes/components/calendar.js` (`getCalendarClasses` + `getCalendarDayClasses` + `getCalendarCellClasses` for the month / year cells, covering the selected / today / outside / disabled / range modifiers).
- Lab — new **Dates** tab (`/lab/dates`, Form section) with `DateDemo`; navigation + locale (fr / en) entries.

**Components — Date input pickers (new)**
- New **`InputDatePicker`** (`components/inputs/InputDatePicker.jsx`) — the masked `InputDate` paired with the visual `Calendar` in a responsive popover. The field and the calendar share one value (typing updates the calendar; picking a day fills the field and closes), a clear `×` button shows when the field has a value, and `min` / `max` flow to both. Popover via `display`: a **dropdown** anchored to the field on `md`+ screens, a centered **modal** on mobile — force either with `display="dropdown" | "modal"`. `calendarProps` forwards shortcuts etc.
- New **`InputDateRangePicker`** (`components/inputs/InputDateRangePicker.jsx`) — the range mirror: the masked `InputDateRange` paired with the `Calendar` in `range` mode (dual-month `months="auto"`, single on mobile). Maps the field's `{ start, end }` ↔ the calendar's `{ from, to }`, builds the string as `formatDateForMode(from) + rangeSeparator + formatDateForMode(to)`, and **only closes once the range is complete** (both endpoints). A partial first-day pick keeps the calendar as the source of truth without touching the field (no re-parse wipe). Forwards `dateSeparator` / `rangeSeparator` / `minLength` / `maxLength` / `allowReversedRange` to the field and `min` / `max` / `calendarProps` (shortcuts…) to the calendar; clear `×` and the same responsive `display` modes. The dropdown panel is wider (~620px) for the dual-month view.
- **Apply / Cancel footer** (`InputDateRangePicker`) — opt-in **`footer`** prop (`'never'` default / `'always'` / `'mobile'` / `'desktop'`, plus `true` / `false` aliases) renders a confirm footer and switches to **deferred commit**: picking only updates a draft, the field commits on **Apply** and reverts on **Cancel** / `Escape` / outside-click (a snapshot is taken when the popover opens). `'mobile'` / `'desktop'` toggle on the `md` breakpoint so the behaviour matches what is shown. Labels via `applyLabel` / `cancelLabel`.
- New **`CalendarPopover`** (`components/dates/CalendarPopover.jsx`) — the responsive host shared by both pickers: a portaled `position: fixed` dropdown whose direction / placement come from `useDropdownPosition` (viewport-aware) and which is clamped on-screen (dismissed on outside-click / `Escape` / scroll), or a portaled **centered modal** (`w-fit`, hugging the calendar). Optional **Apply / Cancel footer** (`showFooter` + `onApply` / `onCancel` / `applyDisabled` / `applyLabel` / `cancelLabel`), rendered in both the modal and dropdown. New helper `helpers/date/formatDateForMode.js` (`Date` → the input's formatted string).

---

## [0.2.6] — 2026-06-27

**Components — Tooltip alignment forwarded by wrappers**
- The daisyUI 5.6 tooltip `align` (added on `Tooltip` in 0.2.5) is now reachable through every component that wraps a `Tooltip`, via a new `tooltipAlign` pass-through prop: `Button`, `LinkButton`, `LangDropDown`, `MenuLink`, `MenuNavigation`, `FlagItem`, `FlagMenu`, `InputTime`. `SwapButton` already forwarded it transparently through `...rest`.
- Lab — `/lab/tooltips` gains a wrapper example (Button, wide trigger) demoing `tooltipAlign` start / center / end.

**Fixes — FlagMenu / FlagItem (tooltip)**
- `FlagItem` — the tooltip text and colour were forwarded as `label` / `level`, but `Tooltip` only reads `tip` (sets `data-tip`) and `color`. Both were dropped, so every flag tooltip was empty and uncoloured. Same class of bug as the earlier `MenuLink` fix. Now forwarded as `tip` / `color`.
- `FlagMenu` — `tooltipColor` was never wired through to `FlagItem` (absent from the props and the JSDoc). Added the pass-through so the flag tooltips can be coloured.

---

## [0.2.5] — 2026-06-27

**Navigation — active link (longest match wins)**
- The active sidebar / menu link is now resolved as the **single longest matching path**, so a destination nested under another no longer lights up its parent. On `/me/customers`, only `/me/customers` is active — `/me` is not. Matching is **segment-aware** (`/me` no longer matches `/menu`), and a nested detail route keeps its parent link active (`/me/customers/137` → `/me/customers`).
  - `contexts/navigation/helpers/isPathMatch.js` *(new)* — segment-aware matcher, the single source of truth for "active" (`/` only matches `/`).
  - `contexts/navigation/helpers/findActiveLinkPath.js` *(new)* — walks the tree and returns the longest matching `LINK` path (`null` when nothing matches).
  - `contexts/navigation/provider.js` — derives `activePath` (memoised on the navigation tree + pathname) and exposes it on the navigation context.
  - `display/ui/navigation/Link.jsx` — active state is now `path === activePath`, with a defensive fallback to a local `isPathMatch` when a `Link` is rendered without a `NavigationProvider`.
  - `contexts/navigation/helpers/containsActivePath.js` — collapses now use the same segment-aware matcher, so open / active-ancestor stays consistent with the link highlight.
- No API change and no breaking change for consumers — navigation trees need no new field (no `exact` / `excludes`); the resolution is fully automatic.

**Components — Tooltip (alignment)**
- Added the daisyUI 5.6 tooltip **alignment** modifiers (`tooltip-start` / `tooltip-center` / `tooltip-end`), independent from the position axis.
  - `themes/components/tooltip.js` — new `align` parameter in `getTooltipClassNames()`, reusing the shared `START` / `CENTER` / `END` constants from `enums/alignments` (re-exported).
  - `components/Tooltip.jsx` — new `align` prop.
- Lab — new `/lab/tooltips` showcase (Feedback → Tooltips) demoing positions, alignments, colours and rich content.

**Components — Range (vertical)**
- Added the daisyUI 5.6 **vertical range** (`range-vertical`).
  - `themes/components/range.js` — new `orientation` parameter in `getRangeClasses()`, reusing `HORIZONTAL` / `VERTICAL` from `enums/orientations` (horizontal stays the default, no modifier).
  - `components/ranges/Range.jsx` — new `orientation` prop ; in vertical mode the input drops `w-full` and is wrapped in a height container (new `height` prop, default `h-64`) so the CSS `clamp()` height resolves. Markers are not rendered in vertical mode (documented).
- Lab — `/lab/ranges` showcase gains a vertical section (colours, sizes, custom height, value).

**Components — Rating (responsive size)**
- The Rating `size` now accepts a responsive breakpoint→size object (daisyUI 5.6 made `rating-*` size modifiers responsive).
  - `themes/components/rating.js` — `size` resolved through `getResponsiveDefinition(create('rating-'))` (same helper as menu / gap), replacing the static map ; `xs` is the prefix-less default. A `@safelist` ships the responsive `sm:rating-*` … `2xl:rating-*` classes.
  - `components/rating/Rating.jsx` — `size` prop widened (scalar or responsive object). Scalar usage is unchanged (no breaking change).
- Lab — `/lab/rating` showcase gains a responsive-size example.

**Fixes**
- `MenuLink` — the tooltip text was forwarded as `label`, but `Tooltip` only reads `tip` (which sets the required `data-tip`). The text was dropped, so the bubble was empty wherever `MenuLink` / `MenuNavigation` enabled `showTooltip`. Now forwarded as `tip`.

---

## [0.2.4] — 2026-06-26

**Components — Aura (new)**
- New **Aura** component (daisyUI 5.6) — a border light effect that wraps any content.
  - `themes/effects/aura.js` — `getAuraClasses()` generator following the library conventions (`after` / `before` / `beforeClassName` / `className`), with exported constants for every variant, size and trigger (no magic strings).
  - `components/Aura.jsx` — wrapper exposing `variant` (`dual` / `rainbow` / `holo` / `gold` / `silver` / `glow`), `size` (`xs`–`xl`), `color` and `background` (resolved from the colour constants via `getTextColor` / `getBackgroundColor`).
  - **`trigger="hover"`** (extension over daisyUI, which is always-on) — the aura stays dark at rest and only lights up / animates on hover. Built on `currentColor`, so the wrapped content must set its own text colour. A Tailwind safe list ships the dynamic `hover:text-*` classes.
  - **`duration`** is driven by the `--tw-duration` CSS variable applied inline, which is JIT-proof (a runtime `duration-[Nms]` class would never be emitted by Tailwind).
- Lab — new `/lab/effects` showcase (Display → Effects) demoing variants, custom colours, the hover trigger, sizes and durations.

**Components — Megamenu (new)**
- New **Megamenu** component (daisyUI 5.6) — a large navigation bar where each item opens a native popover.
  - `themes/navigation/megamenu.js` — `getMegamenuClasses()` generator (library conventions + exported constants for `width`, `size`, vertical) with a Tailwind safe list for the static modifiers.
  - `components/menus/Megamenu.jsx` — data-driven (`items`, max 10), each entry rendering a trigger + popover. Unique HTML ids are derived from `useId()` (no manual wiring), content via `items[].content` (ReactNode) or the `items[].links` sugar (renders a `menu`).
  - Modifiers : `width` (`wide` / `full`), `size` (`xs`–`xl`), `responsive` (mobile trigger button + `max-sm:megamenu-vertical`), `vertical`.
  - **Multiple megamenus coexist on a page** — basic ones anchor each popover to its own trigger (DOM-order anchor resolution), and `wide` / `full` get a **unique per-instance anchor name** (inline `anchor-name` / `position-anchor`, JIT-proof), instead of daisyUI's shared `--megamenu` which would collide.
  - Requires a browser with popover + CSS anchor positioning support (progressive enhancement, no polyfill).
- Lab — new `/lab/megamenu` showcase (Navigation → Megamenu) demoing responsive small menus, wide, full-in-navbar and the five sizes coexisting.

---

## [0.2.3] — 2026-06-24

**Packaging (fix)**
- The published surface now uses **relative imports everywhere** instead of the `@/` alias. The `@/` alias is only resolved inside this repo (via `jsconfig.json`) — an external consumer importing the package could not resolve those modules, which broke at runtime. Fixed across every module reachable from a published entry point:
  - `components/layouts/InfiniteScroll` and `hooks/useInfiniteScroll` (introduced with the `@/` alias in 0.2.2).
  - Pre-existing cases surfaced while auditing: `display/Application` (`@/@configs`, `@/@locale`, …), `@configs/index`, `@configs/navigation`, `@configs/ui/splashScreen` (`@/version`, `@/contexts/...`) and `@locale/index`.
  - `src/app` and `src/demo` keep the `@/` alias on purpose : they are dev / showcase code, never imported by a consumer, and run inside this repo.

**Hooks**
- `useInfiniteScroll` — JSDoc now documents that `onLoadMore` must be **re-entrancy safe**. Because the `loading` state is asynchronous, React StrictMode's double-invoke and IntersectionObserver bursts can call it again before `loading` flips ; guard with a synchronous ref to avoid loading the same page twice (which produces duplicate React keys).

**Lab / Demo (fix)**
- InfiniteScroll demo — both loaders (forward list and reverse chat) now use a synchronous `useRef` re-entrancy guard instead of relying on the async `loading` state. Fixes the *"Encountered two children with the same key"* warnings caused by the initial page being loaded twice under React StrictMode.

---

## [0.2.2] — 2026-06-24

**Components**
- `InfiniteScroll` (`components/layouts`) — New headless wrapper that loads more content as the user scrolls towards the edge of a list. Renders its `children` then watches a sentinel element via `IntersectionObserver`. Props: `hasMore`, `loading`, `onLoadMore`, `loader`, `endMessage`, `rootMargin`, `threshold`, plus `scrollable` (the container becomes the scroll viewport and the observer root) and `reverse` (chat-like mode). In `reverse` mode the container is laid out bottom-to-top (`flex flex-col-reverse`) so older items load when scrolling up while the scroll stays anchored at the bottom — no scroll jump on prepend ; children are expected newest-first. Loading is paused while `loading` is true and stops once `hasMore` is false. `onLoadMore` should be stable (`useCallback`).

**Hooks**
- `useInfiniteScroll` — New hook backing `<InfiniteScroll>`. Attaches a continuous `IntersectionObserver` to a sentinel `ref` and calls `onLoadMore` when it enters view, with `hasMore` / `loading` guards and a custom `root` (ref or element) for scrollable containers. Exports `DEFAULT_ROOT_MARGIN` (`'200px'`) and `DEFAULT_THRESHOLD` (`0`).

**Helpers**
- `resolveRefElement` (`helpers/react`) — New utility that resolves a DOM element from either a React ref object or a raw element (or `null`). Useful for any observer / focus API that expects a DOM node.

**Lab / Demo**
- New « Infinite Scroll » page on `/lab/infiniteScroll` (under *Layouts*) with two demos: a forward scrollable container lazily loading 75 items by pages of 15 (loading indicator + end-of-list message), and a `reverse` chat panel (DaisyUI `chat` bubbles) that loads older messages by pages of 8 when scrolling up, keeping the latest message pinned at the bottom.
- Navigation entry and locale labels added (`fr` : « Scroll infini », `en` : « Infinite Scroll »).

---

## [0.2.1] — 2026-05-09

**Components**
- `Modal` — New `footerNode` prop for the « sticky custom footer + scrollable content » layout. When set, the modal-box switches to a vertical flex column: the header stays at the top, the content area grows and scrolls internally, and `footerNode` is rendered in a dedicated `shrink-0` slot pinned at the bottom (with `border-t` and `bg-base-100`). No more `!important` overrides on `contentClassName` / `modalBoxClassName` to achieve this pattern. The standard `agree` / `disagree` footer path is unchanged when `footerNode` is not provided.
- `Modal` — `footerNode` has full precedence over the standard footer props. When `footerNode` is set, the following props are ignored: `agree`, `disagree`, `agreeColor`, `disagreeColor`, `agreeIcon`, `disagreeIcon`, `showAgree`, `showDisagree`, `showFooter`, `footerReverse`, `footerClassName`, `footerOptions`, `onAgree`, `onCancel`. A `console.warn` is emitted in development if any of them are passed alongside `footerNode`.
- `Modal` — Tighter vertical padding on the `modal-box` (`px-4 py-1` instead of DaisyUI's default `padding: 1.5rem`). Removes ~20px of dead space above the header and below the footer for every modal in the library, which previously stacked with the header / footer wrapper paddings.
- `Modal` — Full JSDoc block added at the top of the file (description, two `@example` blocks, prop table for the most relevant props).

**Themes**
- `getModalBoxClasses` — New `flexLayout` boolean option that adds `flex flex-col overflow-hidden` to the modal-box. Used internally by `<Modal>` when `footerNode` is provided.

**Lab / Demo**
- New « Custom Footer Node » section on `/lab/modals` with three explanatory sub-blocks (when to use, precedence rules, before/after recipe in `mockup-code`) and a live example: a 25-input form inside a `<Modal footerNode={...}>` with a status text + Cancel + Save footer that stays pinned while the form scrolls.

**Migration note for consumers**

If you were using the manual recipe to get a sticky custom footer:

```jsx
// Before — 5 ! markers, fragile
<Modal
    contentClassName  = "!overflow-hidden !p-0 flex flex-col flex-1 min-h-0"
    modalBoxClassName = "!overflow-hidden flex flex-col"
    showFooter        = { false }
>
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 ...">
        { /* form fields */ }
    </div>
    <div className="shrink-0 flex border-t bg-base-100 ...">
        { /* status + Cancel + Save */ }
    </div>
</Modal>
```

…you can now collapse it to:

```jsx
<Modal
    title      = "Edit profile"
    footerNode = { <FormFooter ... /> }
>
    <form className="flex flex-col gap-4">
        { /* form fields */ }
    </form>
</Modal>
```

The library handles the flex column layout, the internal scroll on the content area, and the sticky footer slot. `AlertModal`, `ConfirmModal` and `InputModal` are intentionally **not** extended with `footerNode` for now — their value lies in the standardised footer.

---

## [0.2.0] — 2026-05-08

**Contexts**
- `NavigationProvider` — Add collapse state persistence. Three new props: `defaultMode` (`'open'` | `'closed'` | `'auto'`, default `'open'` — preserves the legacy behaviour) and an opt-in `storageKey` that mirrors per-id collapse state to `localStorage` (versioned payload, SSR-safe hydration, never throws on storage failures). The context value is extended, not replaced; existing `useNavigation()` consumers keep working untouched.
- `NavigationProvider` — Follow-the-route behaviour in `'auto'` mode: real pathname transitions force-open every collapse whose subtree contains the new path and persist the change. Initial mount and reload still respect the persisted choice, so a manually closed branch stays closed on the page it was closed on.
- `mapI18nItem` — Propagate `defaultOpen` so per-item open/closed overrides on `COLLAPSE` items reach `<Collapse>` instead of being silently dropped.

**Display**
- `Collapse` — New props `id`, `open`, `defaultOpen`, `onToggle`, `activeAncestorClassName`. Three usage modes: legacy (no props ⇒ `<details open>` strict), provider-managed (`id` + `NavigationProvider`), or fully controlled (`open`). Summaries whose subtree contains the current pathname get a `font-semibold` weight bump (overridable). Exposes `data-nav-id` and `data-active-ancestor` for consumer styling.
- `Link` — Replace the DaisyUI `active` class with a softer default (`bg-base-content/10 font-medium`) that works in both light and dark themes and stays visually quieter next to the new ancestor marker. Add `activeClassName` prop for custom overrides.

**Hooks**
- `useNavigationCollapse(id, item?)` — Public hook exposing `{ open, toggle, set }` for a single collapse, useful for custom UIs (expand-all controls, alternative skins) without depending on `<Collapse>` directly.

**Lab / Demo**
- New `CollapsePersistenceDemo` on `/lab/menus` — three side-by-side `NavigationProvider` cards covering the feature matrix (`'open'` without storage, `'closed'` with storage, `'auto'` with storage and a per-item `defaultOpen=false` override) and a live `localStorage` inspector per card.
- Lab sidebar — Wired with `defaultMode='auto'` and `storageKey='oihana-next-ui:lab:nav'` so the persistence and follow-the-route behaviours are exercised end-to-end on the live navigation tree.

**Follow-ups (not in this release)**
- Cross-tab synchronisation via the `storage` event.
- Public `expandAll` / `collapseAll` action on the provider.
- Custom open/close animation beyond the native `<details>` toggle.

---

## [0.1.47] — 2026-04-27

**Contexts**
- `ToastProvider` — Toasts now reliably render above any open native `<dialog>` modal, including stacked modals. The implementation was reworked from a popover-based top-layer trick to a stable React portal whose target DOM node is moved imperatively into the topmost open `<dialog>` (or back to `document.body` when none is open). This sidesteps Chromium's ranking of modal `<dialog>` above manual popovers and avoids the modal-inertness rule that was blocking toast clicks.

**Display**
- `SplashScreen` (in `Application`) — Add `pointer-events-none` on the splash overlay so the page underneath stays interactive (scroll, clicks) during the splash fade-in / fade-out (~1.4 s on every refresh). The splash has no interactive content, so blocking input was pure UX friction.

**Lab / Demo**
- New `ToastOverModalDemo` in the modals showcase (`/lab/modals`) with a 9-position alignment switcher (top / middle / bottom × start / center / end) and a stress-test sub-section that fires a toast then auto-stacks 3 modals to validate the topmost-dialog portal behavior end-to-end.

**Docs / Tooling**
- `package.json` — `version` script now also stages `public/sw.js` (rewritten by `inject-version`) and `package.json` (rewritten by `generate-exports`), so the release commit is complete.
- `README` — Drop the dead `build:lib` / `build:lib:watch` sections (no such scripts exist; the package publishes raw `src/`). Restructure the Release section with a step-by-step patch release walkthrough and clearer pre-release docs.

---

## [0.1.46] — 2026-04-22

**Components**
- `InputHexColor` — Fix double `#` prefix displayed when used in controlled mode (`format` and `process` are now idempotent).
- `InputHexColor` — Add `length` prop (3, 4, 6 or 8) to constrain input length; overrides the default derived from `alpha` and, when set, validation requires the exact length.

**Chore / Security**
- Dependencies bump: `next` 16.2.3, `@maskito/*` 5.2.2, `motion` 12.38, `dayjs` 1.11.20, `react-is` 19.2.5, `sanitize-html` 2.17.3, `validator` 13.15.35, `tailwindcss` 4.2.4, `@tailwindcss/postcss` 4.2.4, `@types/node` 25.6, `@types/sanitize-html` 2.16.1.
- `jsconfig.json` — Add `"jsx": "react"` compiler option.

---

## [0.1.35] — 2026-03-06

**Hooks**
- hooks/useDisplayPreference : Persists the display mode preference for a given page key.

## [0.1.32] — 2026-03-06

**Components**
- components/dropDowns/DisplayDropDown

## [0.1.32] — 2026-03-06

**Components**
- components/headers/PageHeader

## [0.1.31] — 2026-03-06

**Components**
- PictureFix the priority property

## [0.1.30] — 2026-03-06

**I18n**
- Adds a metadatas injector engine based on the i18n helpers. 

## [0.1.28] — 2026-03-05

**Layouts**
- `Themes` — Add the DaisyUI 'card' component helper.~~

## [0.1.27] — 2026-03-05

**Layouts**
- `Layout` — Add the 'masonry' display mode.

#### Components

## [0.1.13] — 2026-03-04

Remove the index.js files in the contexts.

## [0.1.12] — 2026-03-04

Refactoring and optimization.

#### Hooks

- `useInView` — Hook that detects when an element enters the viewport.

## [0.1.0] — 2026-02-27

### Added

#### Components

- `Alert` — Alert component with DaisyUI styles
- `Arrow` — Positioned arrow indicator
- `Badge` — Badge component
- `Button` — Base button component
- `Divider` — Horizontal/vertical divider
- `Loading` — Loading indicator wrapper
- `Logo` — Logo display component
- `Portal` — React portal wrapper
- `Status` — Status indicator component
- `Tooltip` — Tooltip component

**Avatars**
- `Avatar` — Single avatar component
- `AvatarGroup` — Avatar group with overflow count

**Buttons**
- `AddButton`, `ClearButton`, `CopyButton`, `DownloadButton`, `FullscreenButton`
- `InputButton`, `InputClearButton`, `LessButton`, `MoreButton`, `MotionButton`
- `RefreshButton`, `RemoveButton`, `SaveButton`, `SwapButton`, `ThemeButton`

**Checkboxes**
- `Checkbox` — Checkbox input component
- `Toggle` — Toggle switch component

**Dropdowns**
- `LangDropDown` — Language selector dropdown

**Icons**
- `Flag` — Country flag icon
- `IconBox` — Icon container with sizing and color props

**Images**
- `Picture` — Next.js Image wrapper with loading state and dark mode support (lazy mode in options)
- `ThemedImage` — Image with automatic light/dark source switching

**Inputs**
- `Input` — Base input component
- `InputCardCVV`, `InputCardExpiry`, `InputCardNumber` — Credit card inputs with masking
- `InputClear` — Input with clear button
- `InputCounter` — Numeric counter input
- `InputCurrency` — Currency formatted input
- `InputDate`, `InputDateRange` — Date picker inputs
- `InputEmail` — Email input with validation
- `InputHexColor` — Hex color input
- `InputPassword` — Password input with show/hide toggle
- `InputPercentage` — Percentage input
- `InputPin` — PIN code input
- `InputSearch` — Search input
- `InputTime` — Time picker input
- `InputUrl` — URL input with validation
- `TextArea`, `TextAreaCode`, `TextAreaMarkdown` — Textarea variants

**Labels**
- `DescriptionLabel`, `ErrorLabel`, `HelperLabel`

**Layouts**
- `Collapse` — Collapsible panel
- `Flex` — Flexbox layout helper
- `Grid` — CSS Grid layout helper
- `Layout` — Page layout wrapper
- `Masonry` — Masonry grid layout
- `Table` — Table layout component

**Links**
- `BackLink`, `Link`, `LinkButton`

**Lists**
- `List`, `ListRow`

**Menus**
- `FlagItem`, `FlagMenu`, `MenuLink`, `MenuNavigation`

**Modals**
- `AlertModal`, `ConfirmModal`, `InputModal`, `Modal`

**Network**
- `NetworkState` — Network connectivity indicator

**Paginations**
- `Pagination`, `PaginationRange`

**Progress**
- `Progress` — Linear progress bar
- `RadialProgress` — Circular progress indicator

**PWA**
- `SplashScreenLinks` — PWA splash screen link tags

**Radios**
- `Radio`, `RadioGroup`

**Ranges**
- `Range` — Range slider component

**Rating**
- `IconRating`, `NumberRating`, `Rating`

**Selects**
- `Select` — Select dropdown component

**Spinners**

40+ animated spinner components — Battery, Bear, Bike, Book, Bounce, BouncingBlocks, Chase, Circle, CircleFade, Clock, Coffee, Corners, Down, Flow, Fold, FourSquares, Grid, IceCream, Image, Kit, MagnifyingGlass, MatrixRain, MouseWheel, Notes, Pacman, Padlock, Plane, Pulse, Quote, Speak, Spin, Spot, Swing, Up, Wave, Wifi — each with its own CSS stylesheet.

**Typography**
- `Blockquote`, `CodeBlock`, `CodeBlockWithToast`
- `H1`–`H6` — Heading components
- `Markdown` — Full Markdown renderer with custom renderers
- `Paragraph`, `Typography`

---

#### Contexts

- `ApplicationContext` — Global application state provider
- `ConfigContext` — Application configuration provider
- `FullscreenContext` — Fullscreen mode provider
- `LangContext` — Language selection provider
- `LoadingContext` — Global loading state provider
- `LocaleContext` — i18n / localization provider
- `NavigationContext` — Navigation state provider
- `SelectContext` — Select state provider
- `ThemesContext` — Dark/light theme provider with flash-free switching and CSS variable extraction
- `ToastContext` — Toast notification provider

---

#### Hooks

- `useActiveLink` — Active navigation link detection
- `useArray` — Array state management utilities
- `useCallbackState` — State with callback on change
- `useClipboard` — Clipboard read/write
- `useDebouncedValue` — Debounced value hook
- `useDelayedState` — State with delay
- `useDisclosure` — Open/close state management
- `useEvent` — Stable event handler
- `useForceUpdate` — Force component re-render
- `useIsMounted` — Mount state detection
- `useMediaPermission` — Media device permission handling
- `useMergeRefs` — Merge multiple React refs
- `useObjectState` — Object state with partial updates
- `usePointerInteractions` — Pointer event interactions
- `useRatingValue` — Rating value management
- `useResetScroll` — Scroll position reset on navigation
- `useSanitize` — HTML sanitization hook
- `useTimeout` — Timeout with automatic cleanup
- `useTransformValue` — Value transformation hook
- `useValue` — Controlled/uncontrolled value management
- `useVersionCheck` — App version update detection

---

#### Motion Components

- `FadeIn` — Fade in animation wrapper
- `Jump` — Jump animation wrapper
- `LetterReveal` — Letter-by-letter reveal animation
- `Motion` — Base motion wrapper
- `ScrollReveal` — Scroll-triggered reveal animation
- `SlideDown`, `SlideUp`, `SlideLeft`, `SlideRight` — Directional slide animations
- `StaggerList` — Staggered list animation
- `Tilt` — 3D tilt effect on hover
- `WordReveal` — Word-by-word reveal animation

---

#### Themes

- Complete Tailwind CSS v4 class name helper system covering colors, borders, spacing, layout, typography, positioning, sizing, and effects
- DaisyUI component class name helpers for all DaisyUI components
- Catppuccin DaisyUI theme (`themes/daisyui/catppuccin.css`)
- Background patterns Tailwind plugin with 80+ patterns
- PatternCraft Tailwind plugin
- Font helpers for Bitter, Cinzel, Courier Prime, Inter, Lato, Merriweather, Montserrat, Nunito, Open Sans, Poppins, Raleway, Red Hat Mono, Roboto
- `cn` — Class name merge utility (clsx + tailwind-merge)
- `extractThemeColorsFromDOM` — Runtime CSS variable color extraction
- Theme hooks: `useBreakpoint`, `useBreakpoints`, `usePrefersDark`, `useThemeColor`, `useThemeColors`

---

#### Helpers

- Date utilities — `parseISO`, `dateModes`
- Time utilities — `Time`, `formatTime`, `parseTime`, `convertTo12Hour`, `convertTo24Hour`
- Color utilities — `validateHexColor`
- Promise utilities — `delay`, `postpone`
- HTML utilities — `parseHtml`
- Storage utilities
- Validator utilities — `isLink`, `isMailTo`, `isTelLink`
- React utilities — `isElementType`
- Format utilities — `formatByName`, `formatWithValue`