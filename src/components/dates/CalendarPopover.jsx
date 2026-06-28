'use client' ;

import { useEffect , useLayoutEffect , useRef , useState } from 'react' ;

import cn from '../../themes/helpers/cn' ;
import useBreakpoint from '../../themes/hooks/useBreakpoint' ;

import Portal from '../Portal' ;

/** Always render as a dropdown anchored to the field. */
export const DROPDOWN = 'dropdown' ;

/** Always render as a (bottom-sheet on mobile) modal. */
export const MODAL = 'modal' ;

/** Dropdown on `md`+ screens, modal below. */
export const RESPONSIVE = 'responsive' ;

const GAP = 6 ;

/**
 * Responsive popover that hosts a {@link module:components/dates/Calendar} for the
 * date input pickers.
 *
 * - **dropdown** — portaled, `position: fixed` panel anchored under (or above) the
 *   field, flipped/clamped to stay in the viewport. No clipping by overflow
 *   ancestors. Closes on outside click / `Escape` / scroll / resize.
 * - **modal** — portaled bottom-sheet on mobile (centered card on `sm`+), with a
 *   backdrop. Closes on backdrop click / `Escape`.
 *
 * `display='responsive'` (default) picks dropdown on `md`+ and modal below.
 *
 * @module components/dates/CalendarPopover
 *
 * @param {Object} props
 * @param {React.RefObject<HTMLElement>} props.anchorRef - The field element to anchor to.
 * @param {boolean} props.isOpen - Open state.
 * @param {() => void} props.onClose - Close handler.
 * @param {'responsive'|'dropdown'|'modal'} [props.display='responsive'] - Display mode.
 * @param {string} [props.panelClassName] - Extra classes for the panel.
 * @param {React.ReactNode} props.children - The calendar.
 */
const CalendarPopover =
({
    anchorRef ,
    isOpen ,
    onClose ,
    display = RESPONSIVE ,
    panelClassName ,
    children ,
}) =>
{
    const isMdUp  = useBreakpoint( 'md' ) ;
    const asModal = display === MODAL || ( display === RESPONSIVE && !isMdUp ) ;

    const panelRef = useRef( null ) ;
    const [ coords , setCoords ] = useState( null ) ;

    // ---- Dropdown positioning (fixed, from the anchor rect).
    useLayoutEffect( () =>
    {
        if ( !isOpen || asModal || !anchorRef?.current || !panelRef.current )
        {
            return ;
        }

        const rect   = anchorRef.current.getBoundingClientRect() ;
        const panelW = panelRef.current.offsetWidth ;
        const panelH = panelRef.current.offsetHeight ;
        const vw     = window.innerWidth ;
        const vh     = window.innerHeight ;

        // Below the field, or above when there isn't enough room below.
        let top = rect.bottom + GAP ;
        if ( top + panelH > vh && rect.top - GAP - panelH >= 0 )
        {
            top = rect.top - GAP - panelH ;
        }

        // Left-aligned, clamped to keep the panel inside the viewport.
        let left = rect.left ;
        if ( left + panelW > vw - GAP )
        {
            left = Math.max( GAP , vw - GAP - panelW ) ;
        }

        setCoords({ top , left }) ;
    }
    , [ isOpen , asModal , anchorRef ] ) ;

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

        const onViewportChange = () =>
        {
            if ( !asModal )
            {
                onClose?.() ;
            }
        } ;

        document.addEventListener( 'keydown' , onKey ) ;
        document.addEventListener( 'mousedown' , onPointerDown ) ;
        window.addEventListener( 'resize' , onViewportChange ) ;
        window.addEventListener( 'scroll' , onViewportChange , true ) ;

        return () =>
        {
            document.removeEventListener( 'keydown' , onKey ) ;
            document.removeEventListener( 'mousedown' , onPointerDown ) ;
            window.removeEventListener( 'resize' , onViewportChange ) ;
            window.removeEventListener( 'scroll' , onViewportChange , true ) ;
        } ;
    }
    , [ isOpen , asModal , onClose , anchorRef ] ) ;

    if ( !isOpen )
    {
        return null ;
    }

    if ( asModal )
    {
        return (
            <Portal>
                <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
                    <div className="absolute inset-0 bg-black/40" onClick={ onClose } />
                    <div
                        ref       = { panelRef }
                        className = { cn( 'relative z-10 w-full max-w-sm border border-base-300 bg-base-100 p-3 shadow-xl rounded-t-box sm:rounded-box' , panelClassName ) }
                    >
                        { children }
                    </div>
                </div>
            </Portal>
        ) ;
    }

    return (
        <Portal>
            <div
                ref       = { panelRef }
                className = { cn( 'fixed z-[60] w-fit max-w-[calc(100vw-12px)] overflow-x-auto border border-base-300 bg-base-100 p-3 shadow-lg rounded-box' , panelClassName ) }
                style     = { coords ? { top : coords.top , left : coords.left } : { top : 0 , left : 0 , visibility : 'hidden' } }
            >
                { children }
            </div>
        </Portal>
    ) ;
} ;

CalendarPopover.displayName = 'CalendarPopover' ;

export default CalendarPopover ;
