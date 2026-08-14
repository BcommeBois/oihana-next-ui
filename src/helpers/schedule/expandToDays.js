/**
 * Cuts events into the day-sized pieces a grid can draw.
 *
 * A time grid has one column per day, so an event running from Tuesday evening
 * to Thursday morning is not one rectangle but three : the tail of Tuesday, the
 * whole of Wednesday, the head of Thursday. Each piece knows whether it
 * continues past its own edges, which is what lets a view round only the corners
 * that are real ends and draw an arrow on the others.
 *
 * The cut follows **local** midnights, because that is where the grid draws its
 * lines.
 *
 * @module helpers/schedule/expandToDays
 */

import dayjs from '../date/configureDayjs' ;

/**
 * @typedef {Object} DaySegment
 * @property {import('./normalizeEvent').ScheduleEvent} event - The event this piece belongs to.
 * @property {number}  day             - Local midnight opening the day, in milliseconds.
 * @property {number}  start           - Start of the piece, clipped to the day.
 * @property {number}  end             - Exclusive end of the piece, clipped to the day.
 * @property {boolean} continuesBefore - The event started before this day.
 * @property {boolean} continuesAfter  - The event runs past this day.
 */

/**
 * @param {Array<import('./normalizeEvent').ScheduleEvent>} events
 * @param {{start: number, end: number}} window - The visible span, in milliseconds.
 * @returns {Array<DaySegment>} Ordered by day, then by start.
 *
 * @example
 * const segments = expandToDays( events , { start : mondayMs , end : nextMondayMs } ) ;
 * const tuesday  = segments.filter( segment => segment.day === tuesdayMs ) ;
 */
export const expandToDays = ( events , window ) =>
{
    if ( !Array.isArray( events ) || !window )
    {
        return [] ;
    }

    const segments = [] ;

    for ( const event of events )
    {
        if ( event === null || typeof event !== 'object' )
        {
            continue ;
        }

        // Outside the window entirely. The comparison is half-open on both sides,
        // so an event ending exactly at the window's start is out.
        if ( event.end <= window.start || event.start >= window.end )
        {
            continue ;
        }

        const from = Math.max( event.start , window.start ) ;
        const to   = Math.min( event.end , window.end ) ;

        let cursor = dayjs( from ).startOf( 'day' ) ;

        while ( cursor.valueOf() < to )
        {
            const day     = cursor.valueOf() ;
            const nextDay = cursor.add( 1 , 'day' ).valueOf() ;

            const start = Math.max( event.start , day ) ;
            const end   = Math.min( event.end , nextDay ) ;

            // A zero-length piece is what an event ending exactly at midnight
            // produces on the following day. It has nothing to draw.
            if ( end > start )
            {
                segments.push
                ({
                    event ,
                    day ,
                    start ,
                    end ,
                    continuesBefore : event.start < day ,
                    continuesAfter  : event.end > nextDay ,
                }) ;
            }

            cursor = cursor.add( 1 , 'day' ) ;
        }
    }

    return segments.sort( ( a , b ) => a.day - b.day || a.start - b.start || b.end - a.end ) ;
} ;

export default expandToDays ;
