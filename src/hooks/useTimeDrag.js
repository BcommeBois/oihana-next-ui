'use client' ;

import { useCallback , useMemo , useRef , useState } from 'react' ;

import usePointerDrag from './usePointerDrag' ;

/**
 * Moving an event on a time axis : pixels in, an instant out.
 *
 * {@link module:hooks/usePointerDrag} owns the gesture and knows nothing of
 * time ; this hook owns the arithmetic and knows nothing of pointers. What it
 * adds is the projection — a vertical position read back through
 * {@link module:helpers/schedule/timeScale} becomes an hour, a horizontal one
 * becomes a day — and the rule that a drag **previews** and commits once.
 *
 * ### Why nothing is laid out again until the release
 *
 * Recomputing the overlap columns on every frame would be correct and unusable :
 * the blocks around the pointer would re-share their width mid-gesture and the
 * one being dragged would jump out from under the finger. So the original stays
 * where it is, greyed, a single preview follows the pointer, and the layout
 * settles once — on release, from the committed values.
 *
 * ### The day comes from the columns, not from the arithmetic
 *
 * Which day the pointer is over is decided by hit-testing the column elements,
 * not by dividing the width. Columns keep a floor width and the area scrolls, the
 * writing direction may be right-to-left, and neither has to be thought about
 * again if the question is simply « which of these boxes contains x ».
 *
 * @module hooks/useTimeDrag
 *
 * @param {Object} props
 * @param {Object} props.axisRef - Ref to the element whose top edge is the zero of the axis.
 * @param {Object} [props.bodyRef] - Ref to the scrolling area, for the edge auto-scroll.
 * @param {Array<number>} props.days - Local midnight of each column, in order.
 * @param {Function} [props.onMove] - `( event , { start , end } ) => void`, called once on release.
 * @param {import('../helpers/schedule/timeScale').TimeScale} props.scale - The conversion in force.
 *
 * @returns {{ columnRef: Function, isDragging: boolean, preview: Object|null, start: Function }}
 *          `columnRef( index )` is the ref of a day column, `start( pointerEvent , payload )`
 *          opens a gesture, and `preview` is where the dragged block is right now.
 *
 * @example
 * ```jsx
 * const drag = useTimeDrag({ axisRef , bodyRef , days , onMove : moveEvent , scale }) ;
 *
 * <div ref={ drag.columnRef( index ) }>
 *     <button onPointerDown={ look => drag.start( look , { event , segment , top , height } ) } />
 * </div>
 * ```
 */
const useTimeDrag = ( props = {} ) =>
{
    const { axisRef , bodyRef , days , onMove , scale } = props ;

    const [ preview , setPreview ] = useState( null ) ;

    // The last column the pointer was over, kept so a gesture wandering outside
    // the grid holds its day instead of snapping back to the first one.
    const column = useRef( 0 ) ;
    const grab   = useRef( 0 ) ;
    const nodes  = useRef( [] ) ;

    const columnRef = useMemo( () =>
    {
        const refs = ( days ?? [] ).map( ( _ , index ) => ( node ) => { nodes.current[ index ] = node ; } ) ;

        return ( index ) => refs[ index ] ;
    }
    , [ days ] ) ;

    /**
     * Where the dragged event would land, given a pointer position.
     *
     * @param {Object} context - What `usePointerDrag` reports.
     * @returns {Object|null} The preview, or `null` when there is nothing to place.
     */
    const project = useCallback( ( { payload , x , y } ) =>
    {
        const axis = axisRef?.current ;

        if ( !axis || !payload || !days?.length )
        {
            return null ;
        }

        const rect = axis.getBoundingClientRect() ;

        const over = nodes.current.findIndex( ( node ) =>
        {
            const box = node?.getBoundingClientRect() ;
            return box ? x >= box.left && x < box.right : false ;
        } ) ;

        if ( over !== -1 )
        {
            column.current = over ;
        }

        const index = Math.min( Math.max( column.current , 0 ) , days.length - 1 ) ;

        // The block follows the pointer by the point it was taken by, and stays
        // whole : a gesture must never push an event half out of its own axis.
        const offset = Math.min
        (
            Math.max( 0 , y - rect.top - grab.current ) ,
            Math.max( 0 , scale.size - payload.height ) ,
        ) ;

        const segmentStart = scale.snap( scale.timeAt( offset , days[ index ] ) ) ;
        const shift        = segmentStart - payload.segment.start ;

        return {
            dayIndex     : index ,
            end          : payload.event.end + shift ,
            event        : payload.event ,
            height       : payload.height ,
            id           : payload.event.id ,
            left         : payload.left ,
            segmentEnd   : payload.segment.end + shift ,
            segmentStart ,
            shift ,
            start        : payload.event.start + shift ,
            top          : scale.offsetOf( segmentStart ) ,
            width        : payload.width ,
        } ;
    }
    , [ axisRef , days , scale ] ) ;

    const drag = usePointerDrag
    ({
        cursor   : 'grabbing' ,
        onCancel : () => setPreview( null ) ,
        onMove   : ( context ) => setPreview( project( context ) ) ,
        onStart  : ( context ) => setPreview( project( context ) ) ,
        scrollRef : bodyRef ,

        onEnd : ( context ) =>
        {
            const landing = project( context ) ;

            setPreview( null ) ;

            // A gesture that ends where it began is not a move, and reporting it
            // would have an application save what it already had.
            if ( landing && landing.shift !== 0 )
            {
                onMove?.( context.payload.event , { end : landing.end , start : landing.start } ) ;
            }
        } ,
    }) ;

    /**
     * Opens a gesture on an event block.
     *
     * @param {React.PointerEvent} look - The `pointerdown`.
     * @param {Object} payload - `{ event , segment , top , height , left , width }`, the block as it is drawn.
     */
    const start = useCallback( ( look , payload ) =>
    {
        const axis = axisRef?.current ;

        if ( !axis || !payload )
        {
            return ;
        }

        // Where inside the block it was taken — the whole reason a dragged event
        // does not jump so its start meets the pointer.
        grab.current   = look.clientY - axis.getBoundingClientRect().top - payload.top ;
        column.current = payload.dayIndex ?? 0 ;

        drag.start( look , payload ) ;
    }
    , [ axisRef , drag ] ) ;

    return { columnRef , isDragging : drag.isDragging , preview , start } ;
} ;

export default useTimeDrag ;
