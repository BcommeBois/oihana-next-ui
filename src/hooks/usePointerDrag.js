'use client' ;

import { useCallback , useEffect , useRef , useState } from 'react' ;

/**
 * The pointer half of a drag : press, move, release — and everything that goes
 * wrong in between.
 *
 * A drag-and-drop library reorders a list ; it does not position anything on a
 * continuous axis. Every calendar that lets an event be moved or stretched —
 * FullCalendar, MUI X, Bryntum — writes that gesture in pointer events by hand,
 * for the same reason : what a scheduler drags is a **coordinate**, not a rank.
 * This hook owns that gesture and knows nothing of what it is dragging. The
 * meaning is the caller's, through `payload`.
 *
 * ### What it takes care of, and why each part is there
 *
 * - **An activation threshold** — a press that never travels four pixels is a
 *   click, and an event that opens *and* moves on the same gesture is one that
 *   does neither reliably.
 * - **A long press on touch** — a finger cannot hover, and it also has to be able
 *   to scroll the page. The press is what tells the two apart. Until it fires,
 *   scrolling wins ; the first real movement cancels the press.
 * - **The scroll fight** — once the drag is on, `touchmove` is preventable only
 *   from a non-passive listener, which React's synthetic handlers cannot be. So
 *   one is attached natively, for the length of the gesture and no longer.
 * - **Edge auto-scroll** — a grid showing eight hours of a day cannot otherwise
 *   move an event from the morning to the evening.
 * - **The click that follows** — a browser fires `click` after `pointerup` even
 *   when the pointer travelled. It is swallowed once, in the capture phase, so a
 *   dragged element does not also open whatever a click opens.
 *
 * @module hooks/usePointerDrag
 *
 * @param {Object} [props]
 * @param {string}   [props.cursor] - Cursor worn by the whole page while dragging. The pointer is over the surface being crossed, not over the thing being moved, so the class on the handle no longer says anything.
 * @param {number}   [props.edge=48] - Distance from a scrolling edge at which auto-scroll starts, in pixels.
 * @param {number}   [props.longPress=400] - Milliseconds a touch must dwell before it becomes a drag.
 * @param {Function} [props.onCancel] - Called with the context when a started drag is abandoned — `Escape`, a lost pointer.
 * @param {Function} [props.onEnd] - Called with the context on release. Where the commit belongs.
 * @param {Function} [props.onMove] - Called with the context on every move, and on every auto-scroll frame.
 * @param {Function} [props.onStart] - Called with the context once the gesture becomes a drag.
 * @param {Object}   [props.scrollRef] - Ref to the scrolling element the edges belong to.
 * @param {number}   [props.speed=16] - Pixels per frame at the very edge.
 * @param {number}   [props.threshold=4] - Pixels a pointer must travel to become a drag.
 * @param {number}   [props.tolerance=10] - Pixels a touch may wander before the long press is called off.
 *
 * @returns {{ start: Function, cancel: Function, payload: any, isDragging: boolean }}
 *          `start( pointerEvent , payload )` is called from `onPointerDown` ;
 *          `payload` is what was passed to it, and `null` while nothing is dragging.
 *
 * @example
 * ```jsx
 * const drag = usePointerDrag
 * ({
 *     scrollRef ,
 *     onMove : ({ payload , dy }) => setPreview( payload.start + dy * msPerPixel ) ,
 *     onEnd  : ({ payload }) => commit( payload ) ,
 * }) ;
 *
 * <div onPointerDown={ look => drag.start( look , { start } ) } />
 * ```
 *
 * @remarks
 * The gesture lives in a ref, not in state : a drag updates dozens of times a
 * second and re-rendering the whole view on each would make the thing it drags
 * lag behind the pointer. Only `isDragging` and `payload` are state, and they
 * change twice per gesture.
 */
const usePointerDrag = ( props = {} ) =>
{
    const {
        cursor ,
        edge      = 48 ,
        longPress = 400 ,
        onCancel ,
        onEnd ,
        onMove ,
        onStart ,
        scrollRef ,
        speed     = 16 ,
        threshold = 4 ,
        tolerance = 10 ,
    } = props ;

    const [ payload , setPayload ] = useState( null ) ;

    const gesture = useRef( null ) ;
    const frame   = useRef( 0 ) ;

    // A gesture in flight must not answer to the closures of the render it began
    // in : the callbacks are read through a ref, so the window listeners can be
    // installed once and still call the current ones.
    const settings = useRef( null ) ;

    useEffect( () =>
    {
        settings.current = { cursor , edge , longPress , onCancel , onEnd , onMove , onStart , scrollRef , speed , threshold , tolerance } ;
    } ) ;

    /** What every callback receives. */
    const context = useCallback( () =>
    {
        const current = gesture.current ;

        return {
            dx          : current.x - current.originX ,
            dy          : current.y - current.originY ,
            payload     : current.payload ,
            pointerType : current.pointerType ,
            x           : current.x ,
            y           : current.y ,
        } ;
    }
    , [] ) ;

    /**
     * Scrolls while the pointer sits near an edge, and re-reports the position :
     * the pointer has not moved, but what is under it has.
     */
    const autoScroll = useCallback( () =>
    {
        const current = gesture.current ;

        if ( !current?.active )
        {
            return ;
        }

        const node = settings.current.scrollRef?.current ;

        if ( node )
        {
            const { edge : band , speed : rate } = settings.current ;
            const rect = node.getBoundingClientRect() ;

            const above = band - ( current.y - rect.top ) ;
            const below = band - ( rect.bottom - current.y ) ;

            let delta = 0 ;

            if ( above > 0 )
            {
                delta = -rate * Math.min( 1 , above / band ) ;
            }
            else if ( below > 0 )
            {
                delta = rate * Math.min( 1 , below / band ) ;
            }

            if ( delta !== 0 )
            {
                const before = node.scrollTop ;

                node.scrollTop = before + delta ;

                if ( node.scrollTop !== before )
                {
                    settings.current.onMove?.( context() ) ;
                }
            }
        }

        frame.current = requestAnimationFrame( autoScroll ) ;
    }
    , [ context ] ) ;

    /** Turns a press into a drag. */
    const activate = useCallback( () =>
    {
        const current = gesture.current ;

        if ( !current || current.active )
        {
            return ;
        }

        current.active = true ;

        clearTimeout( current.timer ) ;

        // A drag that selects the text it passes over looks broken. Both
        // properties are restored by `finish`, whichever way the gesture ends.
        document.body.style.userSelect = 'none' ;

        if ( settings.current.cursor )
        {
            document.body.style.cursor = settings.current.cursor ;
        }

        setPayload( current.payload ) ;
        settings.current.onStart?.( context() ) ;

        frame.current = requestAnimationFrame( autoScroll ) ;
    }
    , [ autoScroll , context ] ) ;

    /**
     * Ends the gesture, and swallows the click a release is about to produce.
     *
     * @param {boolean} committed - `true` on a release, `false` on `Escape` or a lost pointer.
     */
    const finish = useCallback( ( committed ) =>
    {
        const current = gesture.current ;

        if ( !current )
        {
            return ;
        }

        clearTimeout( current.timer ) ;
        cancelAnimationFrame( frame.current ) ;

        current.detach() ;

        if ( current.active )
        {
            document.body.style.userSelect = '' ;
            document.body.style.cursor     = '' ;

            ( committed ? settings.current.onEnd : settings.current.onCancel )?.( context() ) ;

            // `click` follows `pointerup` in the same task, so a timeout of zero
            // always runs after it — the listener never outlives the gesture.
            const swallow = ( look ) =>
            {
                look.preventDefault() ;
                look.stopPropagation() ;
            } ;

            window.addEventListener( 'click' , swallow , { capture : true , once : true } ) ;
            setTimeout( () => window.removeEventListener( 'click' , swallow , { capture : true } ) , 0 ) ;
        }

        gesture.current = null ;

        setPayload( null ) ;
    }
    , [ context ] ) ;

    /**
     * Opens a gesture. Nothing is a drag yet : a mouse has to travel, a finger has
     * to dwell.
     *
     * @param {React.PointerEvent} look - The `pointerdown` that started it.
     * @param {*} [data] - Whatever the caller needs back in the callbacks.
     */
    const start = useCallback( ( look , data ) =>
    {
        // Only the primary button, and never two pointers at once.
        if ( gesture.current || ( look.pointerType === 'mouse' && look.button !== 0 ) )
        {
            return ;
        }

        const move = ( pointer ) =>
        {
            const current = gesture.current ;

            if ( !current || pointer.pointerId !== current.pointerId )
            {
                return ;
            }

            current.x = pointer.clientX ;
            current.y = pointer.clientY ;

            if ( current.active )
            {
                settings.current.onMove?.( context() ) ;
                return ;
            }

            const distance = Math.hypot( current.x - current.originX , current.y - current.originY ) ;

            // A finger that travels before the press has ripened is scrolling,
            // and taking that gesture away would make the view unscrollable
            // wherever an event happens to sit.
            if ( current.pointerType === 'mouse' )
            {
                if ( distance >= settings.current.threshold )
                {
                    activate() ;
                }
            }
            else if ( distance > settings.current.tolerance )
            {
                finish( false ) ;
            }
        } ;

        const up = ( pointer ) =>
        {
            if ( gesture.current && pointer.pointerId === gesture.current.pointerId )
            {
                finish( true ) ;
            }
        } ;

        const abort = ( pointer ) =>
        {
            if ( gesture.current && pointer.pointerId === gesture.current.pointerId )
            {
                finish( false ) ;
            }
        } ;

        const key = ( pressed ) =>
        {
            if ( pressed.key === 'Escape' )
            {
                finish( false ) ;
            }
        } ;

        // React attaches its handlers passively, so the one listener that has to
        // refuse a scroll is attached natively — and only while a drag is on.
        const block = ( touch ) =>
        {
            if ( gesture.current?.active && touch.cancelable )
            {
                touch.preventDefault() ;
            }
        } ;

        const detach = () =>
        {
            window.removeEventListener( 'pointermove'   , move ) ;
            window.removeEventListener( 'pointerup'     , up ) ;
            window.removeEventListener( 'pointercancel' , abort ) ;
            window.removeEventListener( 'keydown'       , key ) ;
            window.removeEventListener( 'touchmove'     , block , { passive : false } ) ;
        } ;

        gesture.current =
        {
            active      : false ,
            detach ,
            originX     : look.clientX ,
            originY     : look.clientY ,
            payload     : data ,
            pointerId   : look.pointerId ,
            pointerType : look.pointerType ,
            timer       : 0 ,
            x           : look.clientX ,
            y           : look.clientY ,
        } ;

        window.addEventListener( 'pointermove'   , move ) ;
        window.addEventListener( 'pointerup'     , up ) ;
        window.addEventListener( 'pointercancel' , abort ) ;
        window.addEventListener( 'keydown'       , key ) ;
        window.addEventListener( 'touchmove'     , block , { passive : false } ) ;

        if ( look.pointerType !== 'mouse' )
        {
            gesture.current.timer = setTimeout( activate , settings.current.longPress ) ;
        }
    }
    , [ activate , context , finish ] ) ;

    /** Abandons the gesture from the outside — a view unmounting, a view changing. */
    const cancel = useCallback( () => finish( false ) , [ finish ] ) ;

    useEffect( () => () =>
    {
        gesture.current?.detach() ;
        clearTimeout( gesture.current?.timer ) ;
        cancelAnimationFrame( frame.current ) ;

        if ( gesture.current?.active )
        {
            document.body.style.userSelect = '' ;
            document.body.style.cursor     = '' ;
        }
    }
    , [] ) ;

    return { cancel , isDragging : payload !== null , payload , start } ;
} ;

export default usePointerDrag ;
