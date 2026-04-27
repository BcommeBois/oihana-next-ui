# Oihana Next UI — Changelog

A modular Next.js UI component library built with React 19, Tailwind CSS v4 and DaisyUI v5.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

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