'use client' ;

import { useCallback , useEffect , useRef , useState } from 'react' ;

/**
 * Telling a deliberate hover from a pointer merely passing through.
 *
 * A tooltip that opens the instant a pointer touches its trigger turns a row of
 * eight blocks into eight bubbles flashing in sequence. The delay is what makes
 * the difference between « the reader stopped here » and « the pointer went
 * past » — and it belongs on the way **in** only : once a bubble is up, the
 * reader has asked for it, and taking it away must feel immediate.
 *
 * ### Three ways to open, and one that must not
 *
 * A **mouse** hovers, and waits out the delay. A **keyboard** focuses, and opens
 * at once — a reader who tabbed to a control has already committed, and a delay
 * there is only a stutter. A **finger** does neither : there is no hovering on a
 * touch screen, and a tap has somewhere better to go — the panel, the link, the
 * button underneath. Opening on touch would put a bubble between the reader and
 * what they meant to press.
 *
 * @module hooks/useHoverIntent
 *
 * @param {Object} [props]
 * @param {number} [props.delay=400] - Milliseconds a pointer must dwell before opening.
 * @param {boolean} [props.disabled=false] - Never open.
 * @param {Function} [props.onOpenChange] - Called with the new state.
 *
 * @returns {{ anchorRef: Object, close: Function, isOpen: boolean, triggerProps: Object }}
 *          Spread `triggerProps` onto the element being described.
 *
 * @example
 * ```jsx
 * const { anchorRef , isOpen , triggerProps } = useHoverIntent() ;
 *
 * <button ref={ anchorRef } { ...triggerProps }>Hover me</button>
 * { isOpen && <Bubble anchor={ anchorRef.current } /> }
 * ```
 */
const useHoverIntent = ( props = {} ) =>
{
    const { delay = 400 , disabled = false , onOpenChange } = props ;

    const [ isOpen , setIsOpen ] = useState( false ) ;

    const anchorRef = useRef( null ) ;
    const timer     = useRef( 0 ) ;

    const change = useCallback( ( next ) =>
    {
        setIsOpen( current =>
        {
            if ( current !== next )
            {
                onOpenChange?.( next ) ;
            }

            return next ;
        } ) ;
    }
    , [ onOpenChange ] ) ;

    const close = useCallback( () =>
    {
        clearTimeout( timer.current ) ;
        change( false ) ;
    }
    , [ change ] ) ;

    const open = useCallback( ( now ) =>
    {
        if ( disabled )
        {
            return ;
        }

        clearTimeout( timer.current ) ;

        if ( now )
        {
            change( true ) ;
            return ;
        }

        timer.current = setTimeout( () => change( true ) , delay ) ;
    }
    , [ change , delay , disabled ] ) ;

    // A bubble anchored to something that has since scrolled away points at
    // nothing. Closing is the honest answer ; following would ask every scroll
    // frame to recompute a position nobody is reading.
    useEffect( () =>
    {
        if ( !isOpen )
        {
            return ;
        }

        const dismiss = () => close() ;

        const key = ( pressed ) =>
        {
            if ( pressed.key === 'Escape' )
            {
                close() ;
            }
        } ;

        window.addEventListener( 'scroll' , dismiss , true ) ;
        window.addEventListener( 'resize' , dismiss ) ;
        window.addEventListener( 'keydown' , key ) ;

        return () =>
        {
            window.removeEventListener( 'scroll' , dismiss , true ) ;
            window.removeEventListener( 'resize' , dismiss ) ;
            window.removeEventListener( 'keydown' , key ) ;
        } ;
    }
    , [ close , isOpen ] ) ;

    useEffect( () => () => clearTimeout( timer.current ) , [] ) ;

    const triggerProps =
    {
        // A finger produces `pointerenter` too, immediately before its tap. The
        // pointer type is the only thing that tells them apart.
        onPointerEnter : ( look ) => { if ( look.pointerType !== 'touch' ) { open( false ) ; } } ,
        onPointerLeave : close ,
        onPointerDown  : close ,
        onFocus        : () => open( true ) ,
        onBlur         : close ,
    } ;

    return { anchorRef , close , isOpen , triggerProps } ;
} ;

export default useHoverIntent ;
