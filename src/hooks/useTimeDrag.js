'use client' ;

import { useCallback , useMemo , useRef , useState } from 'react' ;

import usePointerDrag from './usePointerDrag' ;

/** Drawing a new range on an empty column. */
export const CREATE = 'create' ;

/** Moving a whole event, length kept. */
export const MOVE = 'move' ;

/** Dragging the closing edge. */
export const RESIZE_END = 'resize-end' ;

/** Dragging the opening edge. */
export const RESIZE_START = 'resize-start' ;

/**
 * Dragging on a time axis : pixels in, an instant out.
 *
 * {@link module:hooks/usePointerDrag} owns the gesture and knows nothing of
 * time ; this hook owns the arithmetic and knows nothing of pointers. What it
 * adds is the projection — a vertical position read back through
 * {@link module:helpers/schedule/timeScale} becomes an hour, a horizontal one
 * becomes a day — and the rule that a drag **previews** and commits once.
 *
 * ### Four gestures, one projection
 *
 * Moving, dragging either edge and drawing a new range are the same calculation
 * differently anchored — each turns a pointer position into a `{ start , end }`
 * pair. Written as separate hooks they would be three previews, three clamps and
 * three places to fix the same bug, so they are one hook and a `mode` :
 *
 * | Mode | What the pointer decides |
 * |---|---|
 * | `move` | the start, minus where the block was taken by ; the length follows |
 * | `resize-start` | the opening edge ; the closing one holds |
 * | `resize-end` | the closing edge ; the opening one holds |
 * | `create` | one bound, the press having fixed the other |
 *
 * **Only a move changes day.** A resized edge and a drawn range stay in the
 * column they started in : a range that jumped sideways as it grew would be
 * impossible to aim.
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
 * @param {number} [props.minDuration] - Shortest span a gesture may produce. Defaults to one snap step.
 * @param {Function} [props.onCreate] - `( { start , end } ) => void`, called once on release.
 * @param {Function} [props.onMove] - `( event , { start , end } ) => void`, called once on release.
 * @param {Function} [props.onResize] - `( event , { start , end } ) => void`, called once on release.
 * @param {import('../helpers/schedule/timeScale').TimeScale} props.scale - The conversion in force.
 *
 * @returns {{ columnRef: Function, isDragging: boolean, preview: Object|null, slotAt: Function, start: Function }}
 *          `columnRef( index )` is the ref of a day column, `start( pointerEvent , payload )`
 *          opens a gesture, `preview` is where the drag is right now, and `slotAt`
 *          answers what a plain click landed on.
 *
 * @example
 * ```jsx
 * const drag = useTimeDrag({ axisRef , bodyRef , days , onMove : moveEvent , scale }) ;
 *
 * <div ref={ drag.columnRef( index ) }>
 *     <button onPointerDown={ look => drag.start( look , { mode : MOVE , event , segment , top , height } ) } />
 * </div>
 * ```
 */
const useTimeDrag = ( props = {} ) =>
{
    const { axisRef , bodyRef , days , minDuration , onCreate , onMove , onResize , scale } = props ;

    const [ preview , setPreview ] = useState( null ) ;

    // The last column the pointer was over, kept so a gesture wandering outside
    // the grid holds its day instead of snapping back to the first one.
    const column = useRef( 0 ) ;
    const grab   = useRef( 0 ) ;
    const anchor = useRef( 0 ) ;
    const nodes  = useRef( [] ) ;

    const columnRef = useMemo( () =>
    {
        const refs = ( days ?? [] ).map( ( _ , index ) => ( node ) => { nodes.current[ index ] = node ; } ) ;

        return ( index ) => refs[ index ] ;
    }
    , [ days ] ) ;

    const step    = scale ? scale.snapMinutes * 60 * 1000 : 0 ;
    const minimum = minDuration ?? step ;

    /**
     * The instant at a pointer position, within a given column.
     *
     * @param {number} clientY - Viewport coordinate.
     * @param {number} dayIndex - Which column it is read in.
     * @param {boolean} [floor=false] - Land on the step the position falls *in*, rather than on the nearest one. What a click wants ; a dragged edge wants the nearest.
     * @returns {number|null}
     */
    const instantAt = useCallback( ( clientY , dayIndex , floor = false ) =>
    {
        const axis = axisRef?.current ;

        if ( !axis || !days?.length )
        {
            return null ;
        }

        const rect  = axis.getBoundingClientRect() ;
        const index = Math.min( Math.max( dayIndex ?? 0 , 0 ) , days.length - 1 ) ;

        const offset = Math.min( Math.max( 0 , clientY - rect.top ) , scale.size ) ;
        const raw    = scale.timeAt( offset , days[ index ] ) ;

        return floor ? Math.floor( raw / step ) * step : scale.snap( raw ) ;
    }
    , [ axisRef , days , scale , step ] ) ;

    /** What a plain click on an empty column landed on. */
    const slotAt = useCallback( ( clientY , dayIndex ) => instantAt( clientY , dayIndex , true ) , [ instantAt ] ) ;

    /**
     * Where the gesture would land, given a pointer position.
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

        const { mode } = payload ;

        // Only a move changes day. An edge that jumped columns as it was pulled,
        // or a range that slid sideways as it grew, could not be aimed at all.
        if ( mode === MOVE )
        {
            const over = nodes.current.findIndex( ( node ) =>
            {
                const box = node?.getBoundingClientRect() ;
                return box ? x >= box.left && x < box.right : false ;
            } ) ;

            if ( over !== -1 )
            {
                column.current = over ;
            }
        }

        const index = Math.min( Math.max( column.current , 0 ) , days.length - 1 ) ;

        // The instants the drawn axis begins and ends at, on this day. Every
        // gesture is held inside them : what falls outside is not on screen, and a
        // gesture must never push an event where the reader cannot see it land.
        const from = scale.timeAt( 0 , days[ index ] ) ;
        const to   = scale.timeAt( scale.size , days[ index ] ) ;

        const segment = payload.segment ;

        let segmentStart ;
        let segmentEnd ;

        if ( mode === MOVE )
        {
            const length = segment.end - segment.start ;

            segmentStart = Math.max( from , Math.min( instantAt( y - grab.current , index ) , to - length ) ) ;
            segmentEnd   = segmentStart + length ;
        }
        else if ( mode === RESIZE_END )
        {
            segmentStart = segment.start ;
            segmentEnd   = Math.min( to , Math.max( instantAt( y , index ) , segmentStart + minimum ) ) ;
        }
        else if ( mode === RESIZE_START )
        {
            segmentEnd   = segment.end ;
            segmentStart = Math.max( from , Math.min( instantAt( y , index ) , segmentEnd - minimum ) ) ;
        }
        else
        {
            const here = instantAt( y , index ) ;

            segmentStart = Math.min( anchor.current , here ) ;
            segmentEnd   = Math.max( anchor.current , here ) ;

            // A range drawn in one flick is a real intent, not a mistake : it is
            // given the shortest length the grid accepts rather than refused.
            if ( segmentEnd - segmentStart < minimum )
            {
                segmentEnd   = Math.min( to , segmentStart + minimum ) ;
                segmentStart = Math.max( from , segmentEnd - minimum ) ;
            }
        }

        const top    = scale.offsetOf( segmentStart ) ;
        const bottom = scale.offsetOf( segmentEnd - 1 ) ;

        const event = payload.event ;

        return {
            dayIndex : index ,
            // Both edges are reported against the *event*, not against the piece
            // on screen : a gesture on the Wednesday of a three-day event moves
            // that event, and the segment was only ever how it was drawn.
            end      : mode === CREATE ? segmentEnd
                     : mode === RESIZE_START ? event.end
                     : event.end + ( segmentEnd - segment.end ) ,
            event ,
            height   : Math.max( 14 , bottom - top ) ,
            id       : event?.id ,
            left     : payload.left ?? 0 ,
            mode ,
            segmentEnd ,
            segmentStart ,
            start    : mode === CREATE ? segmentStart
                     : mode === RESIZE_END ? event.start
                     : event.start + ( segmentStart - segment.start ) ,
            top ,
            width    : payload.width ?? 1 ,
        } ;
    }
    , [ axisRef , days , instantAt , minimum , scale ] ) ;

    const drag = usePointerDrag
    ({
        cursor    : 'grabbing' ,
        onCancel  : () => setPreview( null ) ,
        onMove    : ( context ) => setPreview( project( context ) ) ,
        onStart   : ( context ) => setPreview( project( context ) ) ,
        scrollRef : bodyRef ,

        onEnd : ( context ) =>
        {
            const landing = project( context ) ;

            setPreview( null ) ;

            if ( !landing )
            {
                return ;
            }

            const { end , event , mode , start } = landing ;

            if ( mode === CREATE )
            {
                onCreate?.({ end , start }) ;
                return ;
            }

            // A gesture that ends where it began is not a change, and reporting it
            // would have an application save what it already had.
            if ( !event || ( start === event.start && end === event.end ) )
            {
                return ;
            }

            ( mode === MOVE ? onMove : onResize )?.( event , { end , start }) ;
        } ,
    }) ;

    /**
     * Opens a gesture.
     *
     * @param {React.PointerEvent} look - The `pointerdown`.
     * @param {Object} payload - `{ mode , dayIndex }`, plus `{ event , segment , top , height , left , width }` for anything but a creation.
     */
    const start = useCallback( ( look , payload ) =>
    {
        const axis = axisRef?.current ;

        if ( !axis || !payload )
        {
            return ;
        }

        column.current = payload.dayIndex ?? 0 ;

        if ( payload.mode === MOVE )
        {
            // Where inside the block it was taken — the whole reason a dragged
            // event does not jump so its start meets the pointer.
            grab.current = look.clientY - axis.getBoundingClientRect().top - payload.top ;
        }

        if ( payload.mode === CREATE )
        {
            anchor.current = instantAt( look.clientY , payload.dayIndex ) ;
        }

        drag.start( look , payload ) ;
    }
    , [ axisRef , drag , instantAt ] ) ;

    return { columnRef , isDragging : drag.isDragging , preview , slotAt , start } ;
} ;

export default useTimeDrag ;
