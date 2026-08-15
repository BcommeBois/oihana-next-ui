/**
 * Places events on rails over a row of day columns.
 *
 * Two views need this, and they need the same thing : an exhibition running from
 * the 10th to the 16th has to read as **one bar crossing the row**, not as seven
 * separate chips. That means reserving a horizontal track — a *rail* — for the
 * whole crossing, and keeping it at the same height for every day it covers.
 *
 * A month grid asks for rows of seven. The all-day band of a time grid asks for a
 * single row as wide as the view — one column in a day view, seven in a week —
 * which is the whole of the `columns` option.
 *
 * This is a different problem from {@link module:helpers/schedule/layoutOverlaps},
 * which shares a width between things happening at once. Here nothing shares :
 * each bar takes the full height of its rail and spans whole columns, and what is
 * being allocated is vertical order over a seven-column axis.
 *
 * A week is solved on its own, because a bar cannot cross the end of a row.
 *
 * ### What does not fit
 *
 * A cell can only show so many rails. Past `maxRails`, a bar is dropped and every
 * day it would have covered counts one more hidden event — which is what the
 * « +2 more » of each cell is counting. The count is **per day**, not per week :
 * two days of the same row rarely hide the same number.
 *
 * @module helpers/schedule/layoutBars
 */

import dayjs from '../date/configureDayjs' ;

/** A week, when nothing says otherwise. */
export const DAYS_PER_WEEK = 7 ;

/**
 * @typedef {Object} Bar
 * @property {import('./normalizeEvent').ScheduleEvent} event - The event drawn.
 * @property {number}  column          - First column it occupies.
 * @property {number}  span            - How many columns it covers.
 * @property {number}  rail            - Its height in the cell, 0 being the topmost.
 * @property {boolean} continuesBefore - It started before this week row.
 * @property {boolean} continuesAfter  - It runs past this week row.
 */

/**
 * @typedef {Object} BarRow
 * @property {number[]}   days   - The local midnights of the row.
 * @property {Bar[]} bars   - What is drawn, already placed.
 * @property {number[]}   hidden - Per column, how many events did not fit.
 * @property {number}     rails  - How many rails the row actually uses.
 */

/**
 * @param {Array<import('./normalizeEvent').ScheduleEvent>} events
 * @param {{start: number, end: number}} window - The span being laid out, from {@link module:helpers/schedule/getViewWindow}.
 * @param {Object} [options]
 * @param {number} [options.maxRails=3] - How many rails a row can show before it starts counting instead.
 * @param {number} [options.columns=7] - Days per row. Seven for a month grid ; the width of the view for the all-day band of a time grid.
 * @returns {Array<BarRow>}
 *
 * @example
 * // A month grid : six rows of seven
 * layoutBars( events , monthWindow , { maxRails : 3 } )
 *
 * // The all-day band of a week : one row of seven, and nothing hidden
 * layoutBars( allDayEvents , weekWindow , { columns : 7 , maxRails : Infinity } )
 */
export const layoutBars = ( events , window , { maxRails = 3 , columns = DAYS_PER_WEEK } = {} ) =>
{
    if ( !window )
    {
        return [] ;
    }

    const list = Array.isArray( events ) ? events : [] ;

    // Longest first : a bar crossing the row must claim its rail before the
    // single days do, or it would have to weave between them and could not stay
    // at one height. Ties go to the earlier start, then to a stable id order so
    // two renders of the same data never disagree.
    const sorted = [ ...list ].sort( ( a , b ) =>
        ( b.end - b.start ) - ( a.end - a.start )
        || a.start - b.start
        || String( a.id ).localeCompare( String( b.id ) ) ) ;

    const rows = [] ;

    let cursor = dayjs( window.start ).startOf( 'day' ) ;

    while ( cursor.valueOf() < window.end )
    {
        const days = [] ;

        for ( let index = 0 ; index < columns ; index++ )
        {
            days.push( cursor.add( index , 'day' ).valueOf() ) ;
        }

        const rowStart = days[ 0 ] ;
        const rowEnd   = cursor.add( columns , 'day' ).valueOf() ;

        const bars   = [] ;
        const hidden = new Array( columns ).fill( 0 ) ;

        // rails[ n ] is the set of columns already taken at that height.
        const rails = [] ;

        for ( const event of sorted )
        {
            if ( event.end <= rowStart || event.start >= rowEnd )
            {
                continue ;
            }

            const from = Math.max( event.start , rowStart ) ;
            const to   = Math.min( event.end , rowEnd ) ;

            const first = dayjs( from ).startOf( 'day' ).diff( dayjs( rowStart ) , 'day' ) ;

            // The end is exclusive : an event finishing exactly at midnight belongs
            // to the day before, not to the one it touches.
            const last = dayjs( to - 1 ).startOf( 'day' ).diff( dayjs( rowStart ) , 'day' ) ;

            const start = Math.max( 0 , first ) ;
            const span  = Math.min( columns - 1 , last ) - start + 1 ;

            if ( span <= 0 )
            {
                continue ;
            }

            const fits = ( rail ) =>
            {
                for ( let index = start ; index < start + span ; index++ )
                {
                    if ( rail.has( index ) )
                    {
                        return false ;
                    }
                }
                return true ;
            } ;

            let rail = rails.findIndex( fits ) ;

            if ( rail === -1 )
            {
                rail = rails.length ;
                rails.push( new Set() ) ;
            }

            // Past the cap the bar is not drawn, and each day it covered says so.
            if ( rail >= maxRails )
            {
                for ( let index = start ; index < start + span ; index++ )
                {
                    hidden[ index ] += 1 ;
                }
                continue ;
            }

            for ( let index = start ; index < start + span ; index++ )
            {
                rails[ rail ].add( index ) ;
            }

            bars.push
            ({
                event ,
                column          : start ,
                span ,
                rail ,
                continuesBefore : event.start < rowStart ,
                continuesAfter  : event.end > rowEnd ,
            }) ;
        }

        rows.push
        ({
            days ,
            bars  : bars.sort( ( a , b ) => a.rail - b.rail || a.column - b.column ) ,
            hidden ,
            rails : Math.min( rails.length , maxRails ) ,
        }) ;

        cursor = cursor.add( columns , 'day' ) ;
    }

    return rows ;
} ;

/**
 * Every event touching one day, in reading order — what the « +N more » opens on.
 *
 * The cell shows what fits ; this returns the lot, hidden ones included, because a
 * list showing only the overflow would make the reader rebuild the day in their head.
 *
 * @param {Array<import('./normalizeEvent').ScheduleEvent>} events
 * @param {number} day - Any instant within the target day.
 * @returns {Array<import('./normalizeEvent').ScheduleEvent>}
 */
export const eventsOfDay = ( events , day ) =>
{
    const from = dayjs( day ).startOf( 'day' ).valueOf() ;
    const to   = dayjs( from ).add( 1 , 'day' ).valueOf() ;

    return ( Array.isArray( events ) ? events : [] )
        .filter( event => event.end > from && event.start < to )
        .sort( ( a , b ) =>
            Number( b.allDay ) - Number( a.allDay )
            || a.start - b.start
            || b.end - a.end ) ;
} ;

export default layoutBars ;
