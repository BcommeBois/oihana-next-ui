'use client' ;

import { useCallback , useEffect , useId , useLayoutEffect , useRef , useState } from 'react' ;

import useHoverIntent from '../hooks/useHoverIntent' ;
import useMergeRefs   from '../hooks/useMergeRefs' ;

import cn from '../themes/helpers/cn' ;

import { getFloatingTooltipClassNames , getFloatingTooltipStyle , getTooltipArrowClassNames , getTooltipArrowStyle , TOOLTIP_TRIGGER } from '../themes/components/tooltip' ;
import placeFloating from '../themes/helpers/placeFloating' ;

import Portal from './Portal' ;

/**
 * A tooltip that no overflow can cut.
 *
 * The bubble is drawn in a **portal** and positioned against its trigger, which
 * is the only arrangement that survives a scrolling list, a table cell or a
 * block truncating its own title — see {@link module:themes/components/tooltip}
 * for why the CSS one cannot. It is reached through `<Tooltip float>` rather
 * than imported directly ; this module exists so that path has somewhere to live.
 *
 * ### It obeys the placement it is given
 *
 * `position` and `align` carry the names and the values of the CSS path, and
 * mean the same thing : the side the bubble opens on, and where it sits along
 * the other axis. The side asked for is the side used — the facing one is taken
 * only when the page leaves no room, never as a preference — and what the
 * placement settled on is written on the bubble as `data-position` and
 * `data-align`, so a fallback can be seen rather than guessed.
 *
 * @module components/FloatingTip
 *
 * @param {Object} props
 * @param {import('../themes/components/tooltip').TooltipAlignment} [props.align='center'] - Where the bubble sits along the axis it does not open on.
 * @param {React.ReactNode} props.children - The trigger.
 * @param {string} [props.className] - Extra classes for the trigger.
 * @param {string} [props.color='neutral'] - Fill of the bubble.
 * @param {number} [props.delay=400] - Milliseconds a pointer must dwell.
 * @param {React.ElementType} [props.as='div'] - Trigger element type.
 * @param {boolean} [props.open] - Hold the bubble open, hover or no hover. It then follows the page on scroll and resize, having no hover to be closed by.
 * @param {import('../themes/components/tooltip').TooltipPosition} [props.position='top'] - The side of the trigger the bubble opens on, **by preference**.
 * @param {React.ReactNode} [props.tip] - What the bubble says. Nothing means no tooltip.
 * @param {React.Ref} [props.ref] - Forwarded to the trigger, beside the one the bubble anchors to.
 */
const FloatingTip =
({
    align ,
    as ,
    children ,
    className ,
    color = 'neutral' ,
    delay = 400 ,
    open ,
    position ,
    ref ,
    tip ,
    ...rest
}) =>
{
    const Component = as || 'div' ;

    const id = useId() ;

    const bubbleRef = useRef( null ) ;

    const [ at , setAt ] = useState( null ) ;

    // A modal `<dialog>` paints in the browser's **top layer**, above every
    // z-index there is. A bubble portaled to the body would be under it — so
    // when the trigger lives inside one, the bubble goes in there too. The same
    // reasoning `Popover` already follows.
    const [ host , setHost ] = useState( null ) ;

    const { anchorRef , isOpen , triggerProps } = useHoverIntent({ delay , disabled : !tip }) ;

    // `open` holds the bubble up ; it does not hold it down. Same reading as the
    // CSS path, where `tooltip-open` is added on `true` and nothing is taken away
    // otherwise.
    const shown = open === true || isOpen ;

    // The bubble needs the trigger to measure it, and the caller may need it for
    // reasons of its own. Dropping theirs silently is the kind of omission that
    // is found three components later.
    const mergedRef = useMergeRefs( anchorRef , ref ) ;

    // The trigger is very often the element that also drags, clicks or opens
    // something. Letting the caller's handler replace the tooltip's would leave a
    // bubble hanging over a gesture in progress, so the two are **chained** —
    // ours first, since it only ever closes.
    const handlers = {} ;

    for ( const name of [ 'onPointerEnter' , 'onPointerLeave' , 'onPointerDown' , 'onFocus' , 'onBlur' ] )
    {
        const mine  = triggerProps[ name ] ;
        const yours = rest[ name ] ;

        handlers[ name ] = yours
            ? ( look ) => { mine( look ) ; yours( look ) ; }
            : mine ;
    }

    const place = useCallback( () =>
    {
        if ( !bubbleRef.current || !anchorRef.current )
        {
            return ;
        }

        setAt( placeFloating
        (
            anchorRef.current.getBoundingClientRect() ,
            bubbleRef.current.getBoundingClientRect() ,
            { height : window.innerHeight , width : window.innerWidth } ,
            {
                align ,
                position ,
                // `start` and `end` are edges of the reading flow, and the flow is
                // the trigger's own rather than the document's — a right-to-left
                // island in a left-to-right page aligns with what surrounds it.
                // Read the way `useTimeDrag` already reads it.
                rtl : getComputedStyle( anchorRef.current ).direction === 'rtl' ,
            } ,
        ) ) ;
    }
    , [ align , anchorRef , position ] ) ;

    // Placed before the browser paints, so the bubble is never seen at the wrong
    // spot on its way to the right one.
    useLayoutEffect( () =>
    {
        if ( !shown )
        {
            setAt( null ) ;
            return ;
        }

        place() ;
    }
    , [ place , shown ] ) ;

    // A hovered bubble is closed when the page moves under it — the reader has
    // left, and following would ask every scroll frame to recompute a position
    // nobody is reading. One held up by `open` has no such exit : nothing is
    // being hovered, and a portaled element does not travel with its trigger. So
    // that one follows, which is the same measurement over again.
    useEffect( () =>
    {
        if ( !shown || open !== true )
        {
            return ;
        }

        const follow = () => place() ;

        window.addEventListener( 'scroll' , follow , true ) ;
        window.addEventListener( 'resize' , follow ) ;

        return () =>
        {
            window.removeEventListener( 'scroll' , follow , true ) ;
            window.removeEventListener( 'resize' , follow ) ;
        } ;
    }
    , [ open , place , shown ] ) ;

    useLayoutEffect( () =>
    {
        if ( !shown || !anchorRef.current )
        {
            return ;
        }

        // `:popover-open` is not everywhere yet, and an unknown selector throws
        // rather than missing — so the dialog-only lookup is the fallback.
        try
        {
            setHost( anchorRef.current.closest( 'dialog[open], [popover]:popover-open' ) ) ;
        }
        catch
        {
            setHost( anchorRef.current.closest( 'dialog[open]' ) ) ;
        }
    }
    , [ anchorRef , shown ] ) ;

    return (
        <>
            <Component
                ref             = { mergedRef }
                aria-describedby = { shown ? id : undefined }
                // The shrinking class goes on the element **this** component
                // chose. An `as` names one the caller owns, display included.
                className       = { cn( !as && TOOLTIP_TRIGGER , className ) }
                { ...rest }
                { ...handlers }
            >
                { children }
            </Component>

            { shown && !!tip && (
                <Portal containerRef={ host ? { current : host } : undefined }>
                    <div
                        ref       = { bubbleRef }
                        id        = { id }
                        role      = "tooltip"
                        className = { getFloatingTooltipClassNames() }
                        // What the placement settled on, rather than what it was
                        // asked for : a fallback is then a thing to look at.
                        data-align    = { at?.align }
                        data-position = { at?.direction }
                        style     = {{
                            ...getFloatingTooltipStyle( color ) ,
                            // Rendered to be measured, not to be seen : the first
                            // pass has no position yet, and a bubble flashing at
                            // the top left corner is worse than none.
                            ...( at === null
                                ? { left : 0 , opacity : 0 , top : 0 }
                                : { left : at.left , top : at.top } ) ,
                        }}
                    >
                        { tip }

                        { at !== null && (
                            <span
                                aria-hidden = "true"
                                className   = { getTooltipArrowClassNames({ direction : at.direction }) }
                                style       = { getTooltipArrowStyle({ arrow : at.arrow , color , direction : at.direction }) }
                            />
                        ) }
                    </div>
                </Portal>
            ) }
        </>
    ) ;
} ;

FloatingTip.displayName = 'FloatingTip' ;

export default FloatingTip ;
