# Oihana Next UI — Changelog

A modular Next.js UI component library built with React 19, Tailwind CSS v4 and DaisyUI v5.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

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

**Lab**

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