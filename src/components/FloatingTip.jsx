'use client' ;

import { useId , useLayoutEffect , useRef , useState } from 'react' ;

import useHoverIntent from '../hooks/useHoverIntent' ;
import useMergeRefs   from '../hooks/useMergeRefs' ;

import { getFloatingTooltipClassNames , getFloatingTooltipStyle , getTooltipArrowClassNames , tooltipArrowStyle } from '../themes/components/tooltip' ;
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
 * @module components/FloatingTip
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The trigger.
 * @param {string} [props.className] - Extra classes for the trigger.
 * @param {string} [props.color='neutral'] - Fill of the bubble.
 * @param {number} [props.delay=400] - Milliseconds a pointer must dwell.
 * @param {React.ElementType} [props.as='div'] - Trigger element type.
 * @param {React.ReactNode} [props.tip] - What the bubble says. Nothing means no tooltip.
 * @param {React.Ref} [props.ref] - Forwarded to the trigger, beside the one the bubble anchors to.
 */
const FloatingTip =
({
    as ,
    children ,
    className ,
    color = 'neutral' ,
    delay = 400 ,
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

    // Placed before the browser paints, so the bubble is never seen at the wrong
    // spot on its way to the right one.
    useLayoutEffect( () =>
    {
        if ( !isOpen || !bubbleRef.current || !anchorRef.current )
        {
            setAt( null ) ;
            return ;
        }

        setAt( placeFloating
        (
            anchorRef.current.getBoundingClientRect() ,
            bubbleRef.current.getBoundingClientRect() ,
            { height : window.innerHeight , width : window.innerWidth } ,
        ) ) ;
    }
    , [ anchorRef , isOpen ] ) ;

    useLayoutEffect( () =>
    {
        if ( !isOpen || !anchorRef.current )
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
    , [ anchorRef , isOpen ] ) ;

    return (
        <>
            <Component
                ref             = { mergedRef }
                aria-describedby = { isOpen ? id : undefined }
                className       = { className }
                { ...rest }
                { ...handlers }
            >
                { children }
            </Component>

            { isOpen && !!tip && (
                <Portal containerRef={ host ? { current : host } : undefined }>
                    <div
                        ref       = { bubbleRef }
                        id        = { id }
                        role      = "tooltip"
                        className = { getFloatingTooltipClassNames() }
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
                                className   = { `${ getTooltipArrowClassNames() } ${ at.direction === 'top' ? '' : 'rotate-180' }`.trim() }
                                style       = {{
                                    ...tooltipArrowStyle ,
                                    backgroundColor : getFloatingTooltipStyle( color ).backgroundColor ,
                                    insetInlineStart : 'calc(50% - 5px)' ,
                                    ...( at.direction === 'top' ? { bottom : -4 } : { top : -4 } ) ,
                                }}
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
