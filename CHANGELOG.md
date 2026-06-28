# Oihana Next UI — Changelog

A modular Next.js UI component library built with React 19, Tailwind CSS v4 and DaisyUI v5.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

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
- **Shortcuts** (opt-in `shortcuts`) — a presets list (Today, Last 7 days, This month… in range mode; Today / Yesterday / Tomorrow in single mode), or a custom array. On `sm`+ it is a vertical column with a divider; on **mobile** it collapses to a single-row, finger-swipeable strip (native scroll + edge fade) that scrolls *within* the calendar's width without widening it. The shortcut matching the current selection is highlighted; labels are overridable for i18n (the demo localizes them via `useLang`).
- **Quick month / year navigation** — the header month / year label is now clickable : the month opens a 4×3 grid of the 12 localized months, the year opens a 4×3 grid of 12 years paged ±12 (years → month → day chaining), so a far date is a few clicks away instead of dozens of month steps. `min` / `max` disable out-of-range months / years. In the **dual-month** view each column is independent — opening the picker in one column keeps the other on its days, and picking keeps the two months consecutive. New **`defaultMonth`** prop sets the month shown on first render when there is no value.
- Calendar internals under `components/dates/calendar/` (`Header`, `Weekdays`, `Day`, `MonthGrid`, `MonthsGrid`, `YearsGrid`, `Shortcuts`) + helpers `helpers/date/{configureDayjs,getMonthMatrix,shortcuts}.js` (6×7 month grid + localized weekday labels + default presets). dayjs plugins `localeData` / `weekday` / `isBetween` are registered once in `configureDayjs`. **No new runtime dependency** (no react-day-picker / date-fns).
- Theme generator `themes/components/calendar.js` (`getCalendarClasses` + `getCalendarDayClasses` + `getCalendarCellClasses` for the month / year cells, covering the selected / today / outside / disabled / range modifiers).
- Lab — new **Dates** tab (`/lab/dates`, Form section) with `DateDemo`; navigation + locale (fr / en) entries.

**Components — Date input pickers (new)**
- New **`InputDatePicker`** (`components/inputs/InputDatePicker.jsx`) — the masked `InputDate` paired with the visual `Calendar` in a responsive popover. The field and the calendar share one value (typing updates the calendar; picking a day fills the field and closes), a clear `×` button shows when the field has a value, and `min` / `max` flow to both. Popover via `display`: a **dropdown** anchored to the field on `md`+ screens, a centered **modal** on mobile — force either with `display="dropdown" | "modal"`. `calendarProps` forwards shortcuts etc.
- New **`InputDateRangePicker`** (`components/inputs/InputDateRangePicker.jsx`) — the range mirror: the masked `InputDateRange` paired with the `Calendar` in `range` mode (dual-month `months="auto"`, single on mobile). Maps the field's `{ start, end }` ↔ the calendar's `{ from, to }`, builds the string as `formatDateForMode(from) + rangeSeparator + formatDateForMode(to)`, and **only closes once the range is complete** (both endpoints). A partial first-day pick keeps the calendar as the source of truth without touching the field (no re-parse wipe). Forwards `dateSeparator` / `rangeSeparator` / `minLength` / `maxLength` / `allowReversedRange` to the field and `min` / `max` / `calendarProps` (shortcuts…) to the calendar; clear `×` and the same responsive `display` modes. The dropdown panel is wider (~620px) for the dual-month view.
- New **`CalendarPopover`** (`components/dates/CalendarPopover.jsx`) — the responsive host shared by both pickers: a portaled `position: fixed` dropdown whose direction / placement come from `useDropdownPosition` (viewport-aware) and which is clamped on-screen (dismissed on outside-click / `Escape` / scroll), or a portaled **centered modal** (`w-fit`, hugging the calendar). New helper `helpers/date/formatDateForMode.js` (`Date` → the input's formatted string).

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