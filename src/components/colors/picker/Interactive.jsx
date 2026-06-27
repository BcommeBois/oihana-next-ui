'use client' ;

import { useCallback , useEffect , useRef } from 'react' ;

import clamp from 'vegas-js-core/src/maths/clamp' ;

import cn from '../../../themes/helpers/cn' ;

/**
 * Returns the pointer position relative to `element`, normalised to 0–1.
 */
const getRelativePosition = ( element , event ) =>
{
    const rect = element.getBoundingClientRect() ;

    let clientX ;
    let clientY ;

    if ( 'touches' in event )
    {
        const touch = event.touches[ 0 ] || event.changedTouches[ 0 ] ;
        clientX = touch.clientX ;
        clientY = touch.clientY ;
    }
    else
    {
        clientX = event.clientX ;
        clientY = event.clientY ;
    }

    return {
        left : clamp( ( clientX - rect.left ) / rect.width  , 0 , 1 ) ,
        top  : clamp( ( clientY - rect.top  ) / rect.height , 0 , 1 ) ,
    } ;
} ;

/**
 * Low-level draggable surface for the color picker controls.
 *
 * Normalises mouse, touch and arrow-key input to a `{ left, top }` position in
 * the 0–1 range and forwards it via `onMove` / `onKey`. Structurally adapted
 * from react-beautiful-color (MIT, © ozergokalpsezer).
 *
 * @module components/colors/picker/Interactive
 *
 * @param {Object} props
 * @param {(pos: { left: number, top: number }) => void} props.onMove - Called on drag with the normalised position.
 * @param {() => void} [props.onMoveEnd] - Called when the drag ends.
 * @param {(offset: { left: number, top: number }) => void} [props.onKey] - Called on arrow keys with a normalised offset.
 * @param {React.ReactNode} props.children - The visual layers + pointer.
 * @param {string} [props.className] - Extra classes.
 */
const Interactive = ({ onMove , onMoveEnd , onKey , children , className , ...ariaProps }) =>
{
    const container = useRef( null ) ;
    const isPressed = useRef( false ) ;

    const handleMove = useCallback( event =>
    {
        if ( !isPressed.current || !container.current )
        {
            return ;
        }
        event.preventDefault() ;
        onMove( getRelativePosition( container.current , event ) ) ;
    }
    , [ onMove ] ) ;

    const handleMoveEnd = useCallback( () =>
    {
        isPressed.current = false ;
        onMoveEnd?.() ;
        document.removeEventListener( 'mousemove' , handleMove ) ;
        document.removeEventListener( 'mouseup'   , handleMoveEnd ) ;
        document.removeEventListener( 'touchmove' , handleMove ) ;
        document.removeEventListener( 'touchend'  , handleMoveEnd ) ;
    }
    , [ handleMove , onMoveEnd ] ) ;

    const handleMoveStart = useCallback( event =>
    {
        const element = container.current ;
        if ( !element )
        {
            return ;
        }
        event.preventDefault() ;
        isPressed.current = true ;
        onMove( getRelativePosition( element , event.nativeEvent ) ) ;
        document.addEventListener( 'mousemove' , handleMove ) ;
        document.addEventListener( 'mouseup'   , handleMoveEnd ) ;
        document.addEventListener( 'touchmove' , handleMove , { passive : false } ) ;
        document.addEventListener( 'touchend'  , handleMoveEnd ) ;
    }
    , [ onMove , handleMove , handleMoveEnd ] ) ;

    const handleKeyDown = useCallback( event =>
    {
        if ( !onKey )
        {
            return ;
        }
        const code = event.which || event.keyCode ;
        if ( code < 37 || code > 40 )
        {
            return ;
        }
        event.preventDefault() ;
        onKey({
            left : code === 39 ? 0.05 : code === 37 ? -0.05 : 0 ,
            top  : code === 40 ? 0.05 : code === 38 ? -0.05 : 0 ,
        }) ;
    }
    , [ onKey ] ) ;

    // Safety net : drop any lingering document listeners on unmount.
    useEffect( () => () =>
    {
        document.removeEventListener( 'mousemove' , handleMove ) ;
        document.removeEventListener( 'mouseup'   , handleMoveEnd ) ;
        document.removeEventListener( 'touchmove' , handleMove ) ;
        document.removeEventListener( 'touchend'  , handleMoveEnd ) ;
    }
    , [ handleMove , handleMoveEnd ] ) ;

    return (
        <div
            ref          = { container }
            className    = { cn( 'absolute inset-0 touch-none outline-none' , 'focus:[&_.color-pointer]:scale-110' , className ) }
            onMouseDown  = { handleMoveStart }
            onTouchStart = { handleMoveStart }
            onKeyDown    = { handleKeyDown }
            tabIndex     = { 0 }
            role         = "slider"
            { ...ariaProps }
        >
            { children }
        </div>
    ) ;
} ;

Interactive.displayName = 'Interactive' ;

export default Interactive ;
