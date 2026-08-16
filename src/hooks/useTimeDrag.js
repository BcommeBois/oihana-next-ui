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

/** Time runs down the screen and the cross axis names days — the time grid. */
export const VERTICAL = 'vertical' ;

/** Time runs across and the cross axis names resources — the timeline. */
export const HORIZONTAL = 'horizontal' ;

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
 * **A creation that never left its step is a click.** A finger has no other way
 * of pointing at an empty slot than to press on it, and a press that dwells is
 * what a long press is made of — so the gesture ripens into a drag without the
 * finger having asked for one. Treated as a drawn range it would produce a
 * one-step event where the very same tap on a mouse produces `createDuration`.
 * So it is given the slot it fell in and the length a click is worth, which is
 * exactly what the lane's own `onClick` does with a pointer that never travelled.
 *
 * **Only a move changes lane.** A resized edge and a drawn range stay in the lane
 * they started in : a range that jumped sideways as it grew would be impossible
 * to aim.
 *
 * ### One projection, two axes
 *
 * A time grid runs time down the screen and names days across it ; a resource
 * timeline runs time across and names resources down. `orientation` says which,
 * and everything else follows from the two coordinates it swaps — the hit-test
 * that finds a lane, the coordinate that carries time, and the edge of the axis
 * that is its zero. Written as two hooks it would be two of every bug.
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
 * @param {Object} props.axisRef - Ref to the element whose leading edge is the zero of the time axis — its top when time runs down, its inline start when it runs across.
 * @param {Object} [props.bodyRef] - Ref to the scrolling area, for the edge auto-scroll.
 * @param {number} [props.createDuration] - Minutes a creation that never travelled stands for. Defaults to one snap step ; pass the view's own so a tap and a click agree.
 * @param {Array<number>} [props.days] - Local midnight of each column, in order. Vertical only : a timeline has one continuous axis and no days.
 * @param {number} [props.lanes] - How many rows the cross axis holds. Horizontal only.
 * @param {'vertical'|'horizontal'} [props.orientation='vertical'] - Which way time runs. Vertical, the cross axis names days ; horizontal, it names resources.
 * @param {number} [props.minDuration] - Shortest span a gesture may produce. Defaults to one snap step.
 * @param {Function} [props.onCreate] - `( { start , end , lane } ) => void`, called once on release.
 * @param {Function} [props.onMove] - `( event , { start , end , lane } ) => void`, called once on release.
 * @param {Function} [props.onResize] - `( event , { start , end , lane } ) => void`, called once on release.
 * @param {import('../helpers/schedule/timeScale').TimeScale} props.scale - The conversion in force.
 *
 * @returns {{ isDragging: boolean, laneRef: Function, preview: Object|null, slotAt: Function, start: Function }}
 *          `laneRef( index )` is the ref of a lane — a day column, or a resource
 *          row ; `start( pointerEvent , payload )` opens a gesture ; `preview` is
 *          where the drag is right now, in `offset` / `size` along the axis and
 *          `lead` / `span` across the lane ; `slotAt` answers what a plain click
 *          landed on.
 *
 * @example
 * ```jsx
 * const drag = useTimeDrag({ axisRef , bodyRef , days , onMove : moveEvent , scale }) ;
 *
 * <div ref={ drag.laneRef( index ) }>
 *     <button onPointerDown={ look => drag.start( look , { mode : MOVE , event , segment , offset , size } ) } />
 * </div>
 * ```
 */
const useTimeDrag = ( props = {} ) =>
{
    const { axisRef , bodyRef , createDuration , days , lanes , minDuration , onCreate , onMove , onResize , orientation = VERTICAL , scale } = props ;

    // Which pointer coordinate carries time, and which one names a lane. Every
    // difference between a time grid and a resource timeline reduces to this.
    const across = orientation === HORIZONTAL ;

    // The cross axis of a time grid is its days ; of a timeline, its rows. The
    // hook needs only how many there are, and — vertically — which day each is.
    const count = across ? ( lanes ?? 0 ) : ( days?.length ?? 0 ) ;

    const [ preview , setPreview ] = useState( null ) ;

    // The last lane the pointer was over, kept so a gesture wandering outside the
    // grid holds it instead of snapping back to the first one.
    const column = useRef( 0 ) ;
    const grab   = useRef( 0 ) ;
    const anchor = useRef( 0 ) ;
    const nodes  = useRef( [] ) ;

    // Where a creation was pressed, floored to the step it fell in — what the
    // gesture becomes if the pointer never leaves that step.
    const slot = useRef( 0 ) ;

    const laneRef = useMemo( () =>
    {
        const refs = Array.from( { length : count } , ( _ , index ) => ( node ) => { nodes.current[ index ] = node ; } ) ;

        return ( index ) => refs[ index ] ;
    }
    , [ count ] ) ;

    const step    = scale ? scale.snapMinutes * 60 * 1000 : 0 ;
    const minimum = minDuration ?? step ;

    // What a press worth a click stands for. Without a view saying otherwise it
    // is one step, which is what a range drawn in a flick already gets.
    const clickSpan = createDuration ? createDuration * 60 * 1000 : minimum ;

    /**
     * The instant at a pointer position, read along the time axis.
     *
     * @param {number} along - The viewport coordinate that carries time : `clientY` on a grid, `clientX` on a timeline.
     * @param {number} lane - Which lane it is read in. A timeline's lanes are rows of one continuous axis, so it changes nothing there ; a grid's are days, and it decides which one.
     * @param {boolean} [floor=false] - Land on the step the position falls *in*, rather than on the nearest one. What a click wants ; a dragged edge wants the nearest.
     * @returns {number|null}
     */
    const instantAt = useCallback( ( along , lane , floor = false ) =>
    {
        const axis = axisRef?.current ;

        if ( !axis || count === 0 )
        {
            return null ;
        }

        const rect  = axis.getBoundingClientRect() ;
        const index = Math.min( Math.max( lane ?? 0 , 0 ) , count - 1 ) ;

        const offset = Math.min( Math.max( 0 , along - ( across ? rect.left : rect.top ) ) , scale.size ) ;

        // A span scale takes and ignores the day ; a day scale needs it. Passing
        // it either way is what lets one projection serve both axes.
        const raw = scale.timeAt( offset , across ? null : days[ index ] ) ;

        return floor ? Math.floor( raw / step ) * step : scale.snap( raw ) ;
    }
    , [ across , axisRef , count , days , scale , step ] ) ;

    /** What a plain click on an empty lane landed on. */
    const slotAt = useCallback( ( along , lane ) => instantAt( along , lane , true ) , [ instantAt ] ) ;

    /**
     * Where the gesture would land, given a pointer position.
     *
     * @param {Object} context - What `usePointerDrag` reports.
     * @returns {Object|null} The preview, or `null` when there is nothing to place.
     */
    const project = useCallback( ( { payload , x , y } ) =>
    {
        const axis = axisRef?.current ;

        if ( !axis || !payload || count === 0 )
        {
            return null ;
        }

        const { mode } = payload ;

        // The coordinate that carries time, and the one that names a lane.
        const along = across ? x : y ;

        // Only a move changes lane — day on a grid, resource on a timeline. An
        // edge that jumped lanes as it was pulled, or a range that slid sideways
        // as it grew, could not be aimed at all.
        if ( mode === MOVE )
        {
            const over = nodes.current.findIndex( ( node ) =>
            {
                const box = node?.getBoundingClientRect() ;

                if ( !box )
                {
                    return false ;
                }

                return across ? y >= box.top && y < box.bottom : x >= box.left && x < box.right ;
            } ) ;

            if ( over !== -1 )
            {
                column.current = over ;
            }
        }

        const index = Math.min( Math.max( column.current , 0 ) , count - 1 ) ;

        const day = across ? null : days[ index ] ;

        // The instants the drawn axis begins and ends at. Every gesture is held
        // inside them : what falls outside is not on screen, and a gesture must
        // never push an event where the reader cannot see it land.
        const from = scale.timeAt( 0 , day ) ;
        const to   = scale.timeAt( scale.size , day ) ;

        const segment = payload.segment ;

        let segmentStart ;
        let segmentEnd ;

        if ( mode === MOVE )
        {
            const length = segment.end - segment.start ;

            segmentStart = Math.max( from , Math.min( instantAt( along - grab.current , index ) , to - length ) ) ;
            segmentEnd   = segmentStart + length ;
        }
        else if ( mode === RESIZE_END )
        {
            segmentStart = segment.start ;
            segmentEnd   = Math.min( to , Math.max( instantAt( along , index ) , segmentStart + minimum ) ) ;
        }
        else if ( mode === RESIZE_START )
        {
            segmentEnd   = segment.end ;
            segmentStart = Math.max( from , Math.min( instantAt( along , index ) , segmentEnd - minimum ) ) ;
        }
        else
        {
            const here = instantAt( along , index ) ;

            if ( here === anchor.current )
            {
                // Nothing was drawn : the pointer never left the step it landed
                // in. That is a click — and a click points at a **slot**, so it
                // takes the step it fell in and the length a click is worth,
                // rather than the nearest step and one snap of it.
                segmentStart = Math.max( from , Math.min( slot.current , to - clickSpan ) ) ;
                segmentEnd   = segmentStart + clickSpan ;
            }
            else
            {
                segmentStart = Math.min( anchor.current , here ) ;
                segmentEnd   = Math.max( anchor.current , here ) ;

                // A range drawn in one flick is a real intent, not a mistake : it
                // is given the shortest length the grid accepts rather than refused.
                if ( segmentEnd - segmentStart < minimum )
                {
                    segmentEnd   = Math.min( to , segmentStart + minimum ) ;
                    segmentStart = Math.max( from , segmentEnd - minimum ) ;
                }
            }
        }

        const head = scale.offsetOf( segmentStart ) ;
        const tail = scale.offsetOf( segmentEnd - 1 ) ;

        const event = payload.event ;

        // `offset` / `size` run **along** the time axis, `lead` / `span` across
        // the lane as fractions of its thickness. Naming them after neither `top`
        // nor `left` is what lets a grid and a timeline read the same preview.
        return {
            lane     : index ,
            // Both edges are reported against the *event*, not against the piece
            // on screen : a gesture on the Wednesday of a three-day event moves
            // that event, and the segment was only ever how it was drawn.
            end      : mode === CREATE ? segmentEnd
                     : mode === RESIZE_START ? event.end
                     : event.end + ( segmentEnd - segment.end ) ,
            event ,
            id       : event?.id ,
            lead     : payload.lead ?? 0 ,
            mode ,
            offset   : head ,
            segmentEnd ,
            segmentStart ,
            size     : Math.max( 14 , tail - head ) ,
            span     : payload.span ?? 1 ,
            start    : mode === CREATE ? segmentStart
                     : mode === RESIZE_END ? event.start
                     : event.start + ( segmentStart - segment.start ) ,
        } ;
    }
    , [ across , axisRef , clickSpan , count , days , instantAt , minimum , scale ] ) ;

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
                // The lane travels with the range : on a timeline it names the
                // resource the event is being drawn on, which nothing else knows.
                onCreate?.({ end , lane : landing.lane , start }) ;
                return ;
            }

            // A gesture that ends where it began is not a change, and reporting it
            // would have an application save what it already had.
            if ( !event || ( start === event.start && end === event.end ) )
            {
                return ;
            }

            // The lane travels with every gesture, not only with a creation : a
            // move on a timeline changes the resource, and reading it back off
            // the preview would read a state already being torn down.
            ( mode === MOVE ? onMove : onResize )?.( event , { end , lane : landing.lane , start }) ;
        } ,
    }) ;

    /**
     * Opens a gesture.
     *
     * @param {React.PointerEvent} look - The `pointerdown`.
     * @param {Object} payload - `{ mode , lane }`, plus `{ event , segment , offset , size , lead , span }` for anything but a creation.
     */
    const start = useCallback( ( look , payload ) =>
    {
        const axis = axisRef?.current ;

        if ( !axis || !payload )
        {
            return ;
        }

        column.current = payload.lane ?? 0 ;

        const rect = axis.getBoundingClientRect() ;

        if ( payload.mode === MOVE )
        {
            // Where inside the block it was taken — the whole reason a dragged
            // event does not jump so its start meets the pointer.
            grab.current = ( across ? look.clientX - rect.left : look.clientY - rect.top ) - payload.offset ;
        }

        if ( payload.mode === CREATE )
        {
            const at = across ? look.clientX : look.clientY ;

            anchor.current = instantAt( at , payload.lane ) ;
            slot.current   = instantAt( at , payload.lane , true ) ;
        }

        drag.start( look , payload ) ;
    }
    , [ across , axisRef , drag , instantAt ] ) ;

    return { isDragging : drag.isDragging , laneRef , preview , slotAt , start } ;
} ;

export default useTimeDrag ;
