'use client' ;

/**
 * A panel rising from the bottom of the screen, dismissed by a swipe down.
 *
 * What a dropdown anchored to a corner cannot be on a device held in two hands :
 * the rows fall where the thumb already is, and they span the width instead of
 * hanging off one edge. It carries NO content of its own — the sheet is the
 * surface, what goes on it belongs to the product.
 *
 * ### 🔑 The box is neutralised, the inner panel IS the sheet
 *
 * daisyUI animates `modal-bottom` on its own, but only for a `<dialog>` that was
 * in the DOM *before* it opened — one created already open has no starting state
 * to run from, so the transition never plays. Rather than fight that, the
 * `modal-box` gives up its background, padding and shadow to a `motion.div`
 * which carries them and owns the movement.
 *
 * ### 🔑 `animate={ false }` is not a detail
 *
 * A sheet that appears because the WINDOW was resized past a breakpoint must
 * not slide : nothing was asked for, and a surface arriving unbidden reads as a
 * glitch. Only one opened by a tap rises.
 *
 * ### 🚨 Closing is a REQUEST, not an act
 *
 * A `<dialog>` closes in the frame it is asked to, which makes every dismissal a
 * disappearance : nothing tells a reader whether their swipe worked or the sheet
 * simply blinked out. So every exit — the swipe, the backdrop, Escape, and
 * whatever the content calls — sets the panel falling, and the dialog closes
 * when the movement rests. Which is why the backdrop and Escape are taken back
 * from `Modal` here : left to it, both would close outright and skip the fall.
 *
 * ### 🔑 How the CONTENT asks to close
 *
 * A sheet's rows close it too — a link that navigates, a button that acts — and
 * they must fall like the rest rather than vanish. So `children` may be a
 * FUNCTION, called with `{ close }` :
 *
 * ```jsx
 * <BottomSheet onClose={ … }>
 *     { ( { close } ) => <Link href="/somewhere" onClick={ close }>…</Link> }
 * </BottomSheet>
 * ```
 *
 * ⚠️ **`close` is the request, not `onClose`.** Calling the latter from inside
 * would close the dialog outright and skip the fall, which is the one thing
 * this component is for. A node rather than a function still works, for content
 * that closes nothing.
 *
 * ⚠️ **Mounted means open.** There is no `open` prop : render it when the sheet
 * should be there, and let `onClose` take it away. A sheet kept mounted and
 * hidden would hold a `<dialog>` over the page for nothing.
 *
 * @module components/modals/BottomSheet
 *
 * @param {Object} props
 * @param {boolean} [props.animate=true] - Play the rise. `false` for a sheet that only appeared because the viewport crossed a breakpoint.
 * @param {string} [props.ariaLabel] - The dialog's accessible name. It draws no header, so nothing else names it.
 * @param {React.ReactNode|function({ close : Function }) : React.ReactNode} [props.children] - What goes on the sheet. A function is called with `{ close }`, the request its own rows close through.
 * @param {string} [props.className] - Added to the panel, after its own looks.
 * @param {string} [props.maxWidth='max-w-md'] - The cap : full width at a tablet's 1000 pixels reads as a broken layout.
 * @param {Function} [props.onClose] - Called once the panel has finished falling.
 * @param {boolean} [props.showHandle=true] - The grab bar, which says the sheet can be pulled down where no label could.
 * @param {number} [props.threshold=80] - Downward travel, in pixels, past which it closes.
 * @param {Object} [props.transition] - The `motion` transition of the rise and the fall.
 * @param {number} [props.velocityThreshold=0.5] - Downward velocity that closes it whatever the distance — a flick.
 *
 * @example
 * ```jsx
 * { isOpen && (
 *     <BottomSheet ariaLabel="Menu" onClose={ () => setOpen( false ) }>
 *         { ( { close } ) => <MyRows onPick={ close } /> }
 *     </BottomSheet>
 * ) }
 * ```
 */

import { useCallback , useEffect , useRef , useState } from 'react' ;

import { motion } from 'motion/react' ;

import { useDrag } from '@use-gesture/react' ;

import Modal from './Modal' ;

import cn from '../../themes/helpers/cn' ;

/**
 * Downward travel, in pixels, past which the sheet closes.
 *
 * ⚠️ The same pair as {@link module:display/ui/Sidebar}'s swipe-to-close, on
 * purpose : two surfaces dismissed by the same gesture must answer to the same
 * hand. (They are spelled twice for now — `Sidebar` carries its own defaults.)
 *
 * @type {number}
 */
export const SHEET_SWIPE_DISTANCE = 80 ;

/** Downward velocity that closes it whatever the distance — a flick. @type {number} */
export const SHEET_SWIPE_VELOCITY = 0.5 ;

/**
 * Short and eased-out : a surface that lingers reads as lag. The curve
 * front-loads the distance, so the movement is read as « it is already there »
 * rather than watched.
 *
 * @type {{ type : string , duration : number , ease : number[] }}
 */
export const SHEET_TRANSITION = { type : 'tween' , duration : 0.26 , ease : [ 0.2 , 0.8 , 0.2 , 1 ] } ;

/** The panel's own looks, before a caller's `className`. @type {string} */
export const SHEET_PANEL = 'rounded-t-box bg-base-100 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-2xl touch-pan-y' ;

const BottomSheet =
({
    animate = true ,
    ariaLabel ,
    children ,
    className ,
    maxWidth = 'max-w-md' ,
    onClose ,
    showHandle = true ,
    threshold = SHEET_SWIPE_DISTANCE ,
    transition = SHEET_TRANSITION ,
    velocityThreshold = SHEET_SWIPE_VELOCITY ,
}) =>
{
    const dialogRef = useRef( null ) ;
    const panelRef  = useRef( null ) ;

    const [ leaving , setLeaving ] = useState( false ) ;

    const requestClose = useCallback( () => setLeaving( true ) , [] ) ;

    const attachDialog = useCallback( ( node ) =>
    {
        dialogRef.current = node ;

        if ( node && !node.open )
        {
            node.showModal() ;
        }
    } , [] ) ;

    useEffect( () =>
    {
        const node = dialogRef.current ;

        if ( !node )
        {
            return ;
        }

        const handleCancel = ( event ) =>
        {
            event.preventDefault() ;
            requestClose() ;
        } ;

        // Anything outside the panel is backdrop — no class name to depend on,
        // and the sheet's own controls are excluded by construction.
        const handleClick = ( event ) =>
        {
            if ( panelRef.current && !panelRef.current.contains( event.target ) )
            {
                requestClose() ;
            }
        } ;

        node.addEventListener( 'cancel' , handleCancel ) ;
        node.addEventListener( 'click'  , handleClick ) ;

        return () =>
        {
            node.removeEventListener( 'cancel' , handleCancel ) ;
            node.removeEventListener( 'click'  , handleClick ) ;
        } ;
    } , [ requestClose ] ) ;

    // Runs when the fall is over — and only then.
    const handleRest = () =>
    {
        if ( !leaving )
        {
            return ;
        }

        dialogRef.current?.close() ;
        onClose?.() ;
    } ;

    useDrag
    (
        ( { movement : [ , my ] , velocity : [ , vy ] , direction : [ , dy ] , last } = {} ) =>
        {
            const isDownSwipe = dy > 0 ;

            if ( last && isDownSwipe && ( my > threshold || Math.abs( vy ) > velocityThreshold ) )
            {
                requestClose() ;
            }
        } ,
        {
            target        : panelRef ,
            axis          : 'y' ,
            filterTaps    : true ,
            preventScroll : false ,
            pointer       : { touch : true , mouse : false } ,
            eventOptions  : { passive : false } ,
        }
    ) ;

    return (
        <Modal
            aria-label           = { ariaLabel }
            contentClassName     = "p-0"
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth             = { maxWidth }
            modalBoxClassName    = "bg-transparent p-0 shadow-none overflow-hidden"
            onClose              = { onClose }
            placement            = "bottom"
            ref                  = { attachDialog }
            showFooter           = { false }
            showHeader           = { false }
        >
            <motion.div
                animate             = { leaving ? { y : '100%' } : { y : 0 } }
                className           = { cn( SHEET_PANEL , className ) }
                initial             = { animate ? { y : '100%' } : false }
                onAnimationComplete = { handleRest }
                ref                 = { panelRef }
                transition          = { transition }
            >

                { showHandle && (
                    <span aria-hidden="true" className="mx-auto mb-2 block h-1 w-10 rounded-full bg-base-300" />
                ) }

                { typeof children === 'function' ? children( { close : requestClose } ) : children }

            </motion.div>
        </Modal>
    ) ;
} ;

BottomSheet.displayName = 'BottomSheet' ;

export default BottomSheet ;
