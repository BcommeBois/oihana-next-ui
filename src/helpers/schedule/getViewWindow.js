/**
 * The span of time a view is looking at, and how far one step of navigation moves.
 *
 * Every view answers the same two questions differently : a week starts on the
 * locale's first day and lasts seven, a month grid starts before the first of the
 * month and runs six weeks so it stays rectangular, and an agenda simply runs
 * forward from wherever it is anchored. Putting both answers in one place is what
 * lets the shell drive any view without knowing which one it is holding.
 *
 * @module helpers/schedule/getViewWindow
 */

import dayjs from '../date/configureDayjs' ;

import { normalizeWeekday } from '../date/weekdays' ;

/** Chronological list, grouped by day, running forward from the anchor. */
export const AGENDA = 'agenda' ;

/** One day on a time grid. */
export const DAY = 'day' ;

/** Seven days on a time grid. */
export const WEEK = 'week' ;

/** A rectangular month grid, six weeks tall. */
export const MONTH = 'month' ;

/** One day, resources down the side and time across. */
export const TIMELINE = 'timeline' ;

/** Every view the family will hold, in the order they read from tightest to widest. */
export const views = [ AGENDA , DAY , WEEK , MONTH , TIMELINE ] ;

/**
 * @typedef {Object} ViewWindow
 * @property {number} start - Inclusive start of the span, in milliseconds.
 * @property {number} end   - Exclusive end, in milliseconds.
 * @property {number} days  - How many days the span covers.
 */

/**
 * The span a view shows for a given anchor date.
 *
 * @param {string} view - One of {@link views}.
 * @param {import('dayjs').ConfigType} date - The anchor.
 * @param {Object} [options]
 * @param {number} [options.days=7] - Length of the agenda window ; ignored by every other view.
 * @param {number|string} [options.weekStartsOn] - Force the first day of week ; defaults to the locale.
 * @returns {ViewWindow}
 *
 * @example
 * getViewWindow( 'week' , new Date() )              // the seven days of the current week
 * getViewWindow( 'agenda' , new Date() , { days : 14 } ) // the next fortnight
 */
export const getViewWindow = ( view , date , { days = 7 , weekStartsOn } = {} ) =>
{
    const anchor = dayjs( date ).startOf( 'day' ) ;

    const startOfWeek = ( day ) =>
    {
        const first = normalizeWeekday( weekStartsOn ) ;
        return first === null ? day.startOf( 'week' ) : day.subtract( ( day.day() - first + 7 ) % 7 , 'day' ) ;
    } ;

    const span = ( from , length ) => ({ start : from.valueOf() , end : from.add( length , 'day' ).valueOf() , days : length }) ;

    switch ( view )
    {
        case DAY :
        case TIMELINE :
            return span( anchor , 1 ) ;

        case WEEK :
            return span( startOfWeek( anchor ) , 7 ) ;

        // Six weeks, always : a month grid that changed height from month to month
        // would make the page jump on every navigation.
        case MONTH :
            return span( startOfWeek( anchor.startOf( 'month' ) ) , 42 ) ;

        default :
            return span( anchor , Math.max( 1 , Math.round( days ) ) ) ;
    }
} ;

/**
 * Moves the anchor by one step of a view.
 *
 * A month steps by a month rather than by six weeks, so navigating twice from
 * January lands on March and not on some day in the middle of February.
 *
 * @param {string} view - One of {@link views}.
 * @param {import('dayjs').ConfigType} date - The current anchor.
 * @param {number} direction - `1` forward, `-1` back.
 * @param {Object} [options]
 * @param {number} [options.days=7] - Step of the agenda view.
 * @returns {Date} The new anchor.
 *
 * @example
 * stepViewDate( 'week' , date , 1 ) // the same weekday, seven days later
 */
export const stepViewDate = ( view , date , direction , { days = 7 } = {} ) =>
{
    const anchor = dayjs( date ) ;

    switch ( view )
    {
        case DAY :
        case TIMELINE :
            return anchor.add( direction , 'day' ).toDate() ;

        case WEEK :
            return anchor.add( direction , 'week' ).toDate() ;

        case MONTH :
            return anchor.add( direction , 'month' ).toDate() ;

        default :
            return anchor.add( direction * Math.max( 1 , Math.round( days ) ) , 'day' ).toDate() ;
    }
} ;

export default getViewWindow ;
