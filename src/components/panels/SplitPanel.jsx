'use client' ;

import { useEffect , useId , useRef } from 'react' ;

import { MdOutlineClose as CloseIcon } from 'react-icons/md' ;

import cn from '../../themes/helpers/cn' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import useValue      from '../../hooks/useValue' ;
import useBreakpoint from '../../themes/hooks/useBreakpoint' ;

import breakpoints , { LG } from '../../themes/enums/breakpoints' ;

/**
 * @typedef {'start' | 'end'} SplitPanelAlign
 */

export const START = 'start' ;
export const END   = 'end' ;

/**
 * Responsive `drawer-open` classes. Kept as whole literals so Tailwind's scanner
 * sees them — a template-built class name would never be emitted.
 */
const OPEN_CLASS =
{
    sm    : 'sm:drawer-open' ,
    md    : 'md:drawer-open' ,
    lg    : 'lg:drawer-open' ,
    xl    : 'xl:drawer-open' ,
    '2xl' : '2xl:drawer-open' ,
} ;

/**
 * Drops the overlay z-index once the panel is pinned. Same literal-per-breakpoint rule
 * as {@link OPEN_CLASS}.
 *
 * The elevated z-index only makes sense while the panel floats over the content. Pinned,
 * it is an ordinary sticky column : keeping it raised would let it paint over unrelated
 * overlays sitting earlier in the document — including another panel's.
 */
const PINNED_Z_CLASS =
{
    sm    : 'sm:z-auto' ,
    md    : 'md:z-auto' ,
    lg    : 'lg:z-auto' ,
    xl    : 'xl:z-auto' ,
    '2xl' : '2xl:z-auto' ,
} ;

/**
 * Applied for one frame while the breakpoint flips. Kept a whole literal so Tailwind
 * emits it even though it is only ever added through `classList`.
 */
const FREEZE_CLASS = 'transition-none' ;

/**
 * Side region that **shares the width** with its content instead of covering it: an
 * invoice detail next to the invoice list, an inspector next to a canvas, a filter
 * column next to results.
 *
 * At and above `breakpoint` the panel is a permanent, sticky column and the content
 * shrinks to make room. Below it, the panel collapses to an overlay driven by `open`.
 * Both states come from DaisyUI's `drawer` + `drawer-end` + `{bp}:drawer-open`.
 *
 * ### SplitPanel or SidePanel ?
 *
 * `SidePanel` is an overlay: it covers the page, makes it inert and locks scrolling —
 * right for a cart or a confirmation flow. `SplitPanel` never covers anything on a wide
 * screen, so the user can keep reading the list the panel describes. Pick `SplitPanel`
 * whenever the panel and the content are meant to be looked at **together**.
 *
 * ### Nesting inside an app shell
 *
 * Safe to nest in the `drawer-content` of a `Dashboard` / `Drawer` shell: DaisyUI scopes
 * every drawer selector to siblings (`.drawer-end > .drawer-toggle ~ .drawer-side`), and
 * the toggle id comes from `useId`, so the inner panel never drives the outer one.
 *
 * ### Height
 *
 * DaisyUI gives `.drawer-side` a `100dvh` height in both states. In a bounded layout — a
 * card, or a page sitting under a navbar — override it through `sideClassName`
 * (e.g. `"lg:h-[calc(100dvh-4rem)]"`), which is DaisyUI's own answer for bounded drawers.
 *
 * ### Caveat
 *
 * Below the breakpoint the panel is `position: fixed`, so a `transform`, `filter` or
 * `will-change` on an ancestor would make that ancestor its containing block and break
 * the overlay. Above the breakpoint it is `sticky` and immune.
 *
 * @param {Object} props
 * @param {SplitPanelAlign} [props.align='end'] - Edge the panel sits on.
 * @param {import('../../themes/enums/breakpoints').BreakpointKey} [props.breakpoint='lg'] - At and above this width the panel becomes a permanent column.
 * @param {React.ReactNode} props.children - Main content, beside the panel.
 * @param {string} [props.className] - Extra classes on the root grid.
 * @param {string} [props.closeAriaLabel] - Accessible name of the dismiss overlay and of the corner button. Defaults to the i18n `close` key read at `path`, then `'Close panel'`.
 * @param {string} [props.path='components.splitPanel'] - i18n path the `close` label is read from.
 * @param {string} [props.contentClassName] - Extra classes on the content area.
 * @param {boolean} [props.defaultOpen=false] - Initial open state, uncontrolled mode.
 * @param {(open: boolean) => void} [props.onOpenChange] - Called with the next open state when the user opens or dismisses the overlay.
 * @param {boolean} [props.open] - Controlled open state. Only meaningful below `breakpoint` — above it the panel is always visible.
 * @param {React.ReactNode} props.panel - Panel content.
 * @param {string} [props.panelClassName] - Extra classes on the panel itself.
 * @param {React.Ref} [props.ref] - Forwarded to the root.
 * @param {boolean} [props.showCloseButton=true] - Render a dismiss button in the panel corner while it overlays. Dropped once pinned, where there is nothing to close.
 * @param {string} [props.sideClassName] - Extra classes on the panel wrapper (`drawer-side`) — where to override height or z-index.
 * @param {string} [props.width='w-[85%] sm:w-80'] - Panel width. While overlaying it has to leave a strip of `drawer-overlay` uncovered : that strip *is* the tap-to-dismiss surface, so a full-width value would trap the panel open. Hence the 85% on the smallest screens — and keep `showCloseButton` on if you override it with something full-width.
 *
 * @see https://daisyui.com/components/drawer
 *
 * @example Invoice list with its detail panel
 * ```jsx
 * const [ open , setOpen ] = useState( false ) ;
 *
 * <SplitPanel
 *     open         = { open }
 *     onOpenChange = { setOpen }
 *     panel        = { <InvoiceDetail invoice={ selected } /> }
 * >
 *     <InvoiceList onSelect={ invoice => { select( invoice ) ; setOpen( true ) ; } } />
 * </SplitPanel>
 * ```
 */
const SplitPanel =
({
    align = END ,
    breakpoint = LG ,
    children ,
    className ,
    closeAriaLabel ,
    contentClassName ,
    defaultOpen = false ,
    onOpenChange ,
    open ,
    panel ,
    panelClassName ,
    path = 'components.splitPanel' ,
    ref ,
    showCloseButton = true ,
    sideClassName ,
    width = 'w-[85%] sm:w-80' ,
}) =>
{
    const panelId = useId() ;

    // Same resolution order as `Modal` : the explicit prop first, then the i18n
    // bundle, then the English last resort — non-throwable, so the panel renders
    // with no LocaleProvider in the tree.
    const { close : closeFromI18n = 'Close panel' } = useI18n( path , NO_LOCALE , false ) ;

    const closeLabel = closeAriaLabel ?? closeFromI18n ;

    const [ isOpen , setOpen ] = useValue( defaultOpen , open , onOpenChange ) ;

    // Above the breakpoint DaisyUI hides the toggle and pins the panel open, so the
    // checkbox no longer drives the layout — but a *checked* toggle inside a
    // `drawer-open` grid still emits `--page-scroll-lock: revert-layer` on `:root`,
    // which competes with the lock an open Modal sets. Forcing it unchecked once the
    // panel is pinned keeps it out of that arbitration entirely.
    const isPinned = useBreakpoint( breakpoint ) ;

    const sideRef  = useRef( null ) ;
    const asideRef = useRef( null ) ;

    // `useValue` rebuilds its setter on every render ; keeping it behind a ref lets the
    // Escape listener below subscribe once per open instead of once per render.
    const setOpenRef = useRef( setOpen ) ;

    useEffect( () =>
    {
        setOpenRef.current = setOpen ;
    } ) ;

    // Escape closes the panel while it overlays. Pinned, there is nothing to close.
    //
    // The overlay strip and the close button are pointer affordances only — without this
    // a keyboard user who opened the panel has no way out at all.
    useEffect( () =>
    {
        if ( isPinned || !isOpen || typeof document === 'undefined' )
        {
            return ;
        }

        const handleKeyDown = ( event ) =>
        {
            if ( event.key !== 'Escape' )
            {
                return ;
            }

            // A dialog or popover sits in the top layer, i.e. above this panel, so it
            // owns Escape : closing underneath it would dismiss two surfaces at once.
            // `:popover-open` can be unsupported — fall back to the dialog-only lookup
            // rather than throwing, same as `Popover`.
            let topLayer = null ;

            try
            {
                topLayer = document.querySelector( 'dialog[open], [popover]:popover-open' ) ;
            }
            catch
            {
                topLayer = document.querySelector( 'dialog[open]' ) ;
            }

            if ( topLayer )
            {
                return ;
            }

            setOpenRef.current?.( false ) ;
        } ;

        document.addEventListener( 'keydown' , handleKeyDown ) ;

        return () => document.removeEventListener( 'keydown' , handleKeyDown ) ;
    }
    , [ isOpen , isPinned ] ) ;

    // Crossing the breakpoint swaps `.drawer-side` between its overlay and its pinned
    // geometry — `translate` 100% ↔ 0, plus `opacity` and `width` — and DaisyUI puts a
    // transition on all three. The media-query flip therefore *animates*: resizing past
    // the breakpoint looks exactly like the panel sliding shut on its own. Killing the
    // transitions for one frame makes the swap instant.
    //
    // Done imperatively, synchronously inside the media listener : a React state update
    // would be scheduled and could land after the browser has already painted the new
    // breakpoint — too late to suppress anything. Only the two elements DaisyUI actually
    // transitions are touched (the side wrapper and the panel), through a class rather
    // than inline styles, so nothing a caller set on its own content is clobbered.
    useEffect( () =>
    {
        const width = breakpoints[ breakpoint ] ;

        if ( !width || typeof window === 'undefined' )
        {
            return ;
        }

        const mq = window.matchMedia( `(min-width: ${ width })` ) ;

        const handleChange = () =>
        {
            const nodes = [ sideRef.current , asideRef.current ].filter( Boolean ) ;

            if ( nodes.length === 0 )
            {
                return ;
            }

            nodes.forEach( node => { node.classList.add( FREEZE_CLASS ) ; } ) ;

            requestAnimationFrame( () =>
            {
                requestAnimationFrame( () =>
                {
                    nodes.forEach( node => { node.classList.remove( FREEZE_CLASS ) ; } ) ;
                } ) ;
            } ) ;
        } ;

        mq.addEventListener( 'change' , handleChange ) ;

        return () => mq.removeEventListener( 'change' , handleChange ) ;
    }
    , [ breakpoint ] ) ;

    const classNames = cn
    (
        'drawer' ,
        OPEN_CLASS[ breakpoint ] ,
        { 'drawer-end' : align === END } ,
        className ,
    ) ;

    // `relative` — same reason as the app-shell Drawer : the DaisyUI `.drawer` grid is
    // positioned while `.drawer-content` is not, so an absolutely-positioned descendant
    // would anchor on the grid, *above* this area, and escape a scroll clip set through
    // `contentClassName`. Anchoring it here keeps the clip intact.
    const contentClassNames = cn
    (
        'drawer-content relative min-w-0' ,
        contentClassName ,
    ) ;

    // z-40 while overlaying : over page content, under the app-shell sidebar (z-50) and
    // modals. Dropped back to `auto` once pinned — see PINNED_Z_CLASS.
    const sideClassNames = cn
    (
        'drawer-side z-40' ,
        PINNED_Z_CLASS[ breakpoint ] ,
        sideClassName ,
    ) ;

    // `relative` — containing block for the close button below.
    const panelClassNames = cn
    (
        'relative min-h-full bg-base-200' ,
        width ,
        panelClassName ,
    ) ;

    return (
        <div className={ classNames } ref={ ref }>

            <input
                id        = { panelId }
                className = "drawer-toggle"
                type      = "checkbox"
                checked   = { isPinned ? false : isOpen }
                onChange  = { event => setOpen( event.target.checked ) }
            />

            <div className={ contentClassNames }>
                { children }
            </div>

            <div className={ sideClassNames } ref={ sideRef }>

                <label
                    htmlFor    = { panelId }
                    className  = "drawer-overlay"
                    aria-label = { closeLabel }
                />

                <aside className={ panelClassNames } ref={ asideRef }>

                    {/* A label rather than a button : it drives the very same toggle as the
                        overlay, so there is one dismiss mechanism, not two. */}
                    { showCloseButton && !isPinned && (
                        <label
                            htmlFor    = { panelId }
                            className  = "btn btn-sm btn-circle btn-ghost absolute top-2 end-2 z-1"
                            aria-label = { closeLabel }
                        >
                            <CloseIcon size={ 18 } />
                        </label>
                    ) }

                    { panel }

                </aside>

            </div>

        </div>
    ) ;
} ;

SplitPanel.displayName = 'SplitPanel' ;

export default SplitPanel ;
