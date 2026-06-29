'use client' ;

import { useEffect , useLayoutEffect , useRef , useState } from 'react' ;

import clamp from 'vegas-js-core/src/maths/clamp';

import cn from '../themes/helpers/cn' ;

import useBreakpoint from '../themes/hooks/useBreakpoint' ;

import Portal from './Portal' ;

/** Always render as a dropdown anchored to the trigger. */
export const DROPDOWN = 'dropdown' ;

/** Always render as a (bottom-sheet on mobile) modal. */
export const MODAL = 'modal' ;

/** Dropdown on `md`+ screens, modal below. */
export const RESPONSIVE = 'responsive' ;

const GAP = 6 ;

/**
 * Responsive popover that hosts arbitrary content (a calendar, a time picker, a
 * menu…) as either a dropdown anchored to a trigger or a modal, with an optional
 * Apply / Cancel footer.
 *
 * - **dropdown** — portaled, `position: fixed` panel anchored to the trigger. The
 *   opening `direction` (top / bottom) and `placement` (start / center / end) come
 *   from {@link module:themes/hooks/useDropdownPosition} (computed from where the
 *   trigger sits in the viewport); the panel is then clamped to stay fully on-screen.
 *   No clipping by overflow ancestors. Dismissed on outside click / `Escape` /
 *   scroll / resize.
 * - **modal** — portaled bottom-sheet on mobile (centered card on `sm`+), `w-fit`
 *   so it hugs the content. Dismissed on backdrop click / `Escape`.
 *
 * `display='responsive'` (default) picks dropdown on `md`+ and modal below.
 *
 * @module components/Popover
 *
 * @param {Object} props
 * @param {React.RefObject<HTMLElement>} props.anchorRef - The trigger element to anchor to.
 * @param {boolean} props.isOpen - Open state.
 * @param {() => void} props.onClose - Close handler.
 * @param {'responsive'|'dropdown'|'modal'} [props.display='responsive'] - Display mode.
 * @param {'top'|'bottom'} [props.direction='bottom'] - Opening direction (from useDropdownPosition).
 * @param {'start'|'center'|'end'} [props.placement='start'] - Horizontal alignment (from useDropdownPosition).
 * @param {string} [props.panelClassName] - Extra classes for the panel.
 * @param {boolean} [props.showFooter=false] - Render the Apply / Cancel footer.
 * @param {() => void} [props.onApply] - Apply button handler.
 * @param {() => void} [props.onCancel] - Cancel button handler.
 * @param {boolean} [props.applyDisabled=false] - Disable the Apply button.
 * @param {string} [props.applyLabel='Apply'] - Apply button label.
 * @param {string} [props.cancelLabel='Cancel'] - Cancel button label.
 * @param {React.ReactNode} props.children - The popover content.
 */
const Popover =
({
    anchorRef ,
    isOpen ,
    onClose ,
    display = RESPONSIVE ,
    direction = 'bottom' ,
    placement = 'start' ,
    panelClassName ,
    showFooter = false ,
    onApply ,
    onCancel ,
    applyDisabled = false ,
    applyLabel = 'Apply' ,
    cancelLabel = 'Cancel' ,
    children ,
}) =>
{
    const isMdUp  = useBreakpoint( 'md' ) ;
    const asModal = display === MODAL || ( display === RESPONSIVE && !isMdUp ) ;

    const panelRef = useRef( null ) ;
    const [ coords , setCoords ] = useState( null ) ;

    // ---- Dropdown positioning (fixed, from the anchor rect + computed direction/placement).
    useLayoutEffect( () =>
    {
        if ( !isOpen || asModal || !anchorRef?.current || !panelRef.current )
        {
            return ;
        }

        const rect = anchorRef.current.getBoundingClientRect() ;
        const pw   = panelRef.current.offsetWidth ;
        const ph   = panelRef.current.offsetHeight ;
        const vw   = window.innerWidth ;
        const vh   = window.innerHeight ;

        let top = direction === 'top' ? rect.top - GAP - ph : rect.bottom + GAP ;
        let left = placement === 'end'
            ? rect.right - pw
            : placement === 'center'
                ? rect.left + rect.width / 2 - pw / 2
                : rect.left ;

        top  = clamp( top  , GAP , Math.max( GAP , vh - ph - GAP ) ) ;
        left = clamp( left , GAP , Math.max( GAP , vw - pw - GAP ) ) ;

        setCoords({ top , left }) ;
    }
    , [ isOpen , asModal , anchorRef , direction , placement ] ) ;

    // ---- Dismiss : outside click, Escape, scroll / resize (dropdown only).
    useEffect( () =>
    {
        if ( !isOpen )
        {
            return ;
        }

        const onKey = ( event ) =>
        {
            if ( event.key === 'Escape' )
            {
                onClose?.() ;
            }
        } ;

        const onPointerDown = ( event ) =>
        {
            if ( panelRef.current?.contains( event.target ) || anchorRef?.current?.contains( event.target ) )
            {
                return ;
            }
            onClose?.() ;
        } ;

        const onResize = () =>
        {
            if ( !asModal )
            {
                onClose?.() ;
            }
        } ;

        // Page scroll closes the dropdown (it would detach from the anchor) — but a
        // scroll **inside** the panel (e.g. a time-picker column, or the columns'
        // auto-centering) must NOT close it.
        const onScroll = ( event ) =>
        {
            if ( asModal || panelRef.current?.contains( event.target ) )
            {
                return ;
            }
            onClose?.() ;
        } ;

        document.addEventListener( 'keydown'   , onKey         ) ;
        document.addEventListener( 'mousedown' , onPointerDown ) ;

        window.addEventListener( 'resize' , onResize ) ;
        window.addEventListener( 'scroll' , onScroll , true ) ;

        return () =>
        {
            document.removeEventListener( 'keydown' , onKey ) ;
            document.removeEventListener( 'mousedown' , onPointerDown ) ;

            window.removeEventListener( 'resize' , onResize ) ;
            window.removeEventListener( 'scroll' , onScroll , true ) ;
        } ;
    }
    , [ isOpen , asModal , onClose , anchorRef ] ) ;

    if ( !isOpen )
    {
        return null ;
    }

    const footer = showFooter
        ? (
            <div className="mt-3 flex justify-end gap-2 border-t border-base-300 pt-3">
                <button type="button" className="btn btn-ghost btn-sm" onClick={ onCancel }>
                    { cancelLabel }
                </button>
                <button type="button" className="btn btn-primary btn-sm" disabled={ applyDisabled } onClick={ onApply }>
                    { applyLabel }
                </button>
            </div>
        )
        : null ;

    if ( asModal )
    {
        return (
            <Portal>
                <div className="fixed inset-0 z-60 flex items-center justify-center p-3">
                    <div className="absolute inset-0 bg-black/40" onClick={ onClose } />
                    <div
                        ref       = { panelRef }
                        className = { cn( 'relative z-10 w-fit max-w-full border border-base-300 bg-base-100 p-3 shadow-xl rounded-box' , panelClassName ) }
                    >
                        { children }
                        { footer }
                    </div>
                </div>
            </Portal>
        ) ;
    }

    return (
        <Portal>
            <div
                ref       = { panelRef }
                className = { cn( 'fixed z-60 w-fit max-w-[calc(100vw-12px)] border border-base-300 bg-base-100 p-3 shadow-lg rounded-box' , panelClassName ) }
                style     = { coords ? { top : coords.top , left : coords.left } : { top : 0 , left : 0 , visibility : 'hidden' } }
            >
                { children }
                { footer }
            </div>
        </Portal>
    ) ;
} ;

Popover.displayName = 'Popover' ;

export default Popover ;
