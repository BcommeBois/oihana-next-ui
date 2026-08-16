/**
 * The conversion between an instant and a position, and back.
 *
 * Everything a time grid draws comes from two numbers : where an event starts on
 * the axis, and how long it is. Everything a drag produces is the reverse — a
 * pixel offset that has to become a time. Both live here, as one small object
 * built once per view, so the week grid and the resource timeline share the same
 * arithmetic and only differ by which axis they map it onto.
 *
 * The snap step and the slot height are deliberately separate settings : a grid
 * ruled every thirty minutes while a drag lands on the quarter hour is the usual
 * arrangement, not an inconsistency.
 *
 * @module helpers/schedule/timeScale
 */

import dayjs from '../date/configureDayjs' ;

const MINUTE = 60 * 1000 ;
const HOUR   = 60 * MINUTE ;

/**
 * @typedef {Object} TimeScale
 * @property {number} dayStart      - Minutes from midnight where the axis begins.
 * @property {number} dayEnd        - Minutes from midnight where it ends.
 * @property {number} pixelsPerHour - Zoom.
 * @property {number} snapMinutes   - Step a dragged or resized edge lands on.
 * @property {number} size          - Full length of the axis, in pixels.
 * @property {(ms: number) => number} offsetOf   - Position of an instant, within its own day.
 * @property {(ms: number, end: number) => number} lengthOf - Length of a span, in pixels.
 * @property {(offset: number, day: number) => number} timeAt - The instant at a position of a given day.
 * @property {(ms: number) => number} snap - Nearest step.
 */

/**
 * Builds a scale.
 *
 * @param {Object} [options]
 * @param {number} [options.dayStart=0]        - Minutes from midnight where the axis begins (`8 * 60` for an 8am grid).
 * @param {number} [options.dayEnd=1440]       - Minutes from midnight where it ends.
 * @param {number} [options.pixelsPerHour=48]  - Zoom.
 * @param {number} [options.snapMinutes=15]    - Step a dragged edge lands on.
 * @returns {TimeScale}
 *
 * @example
 * const scale = createTimeScale({ dayStart : 8 * 60 , dayEnd : 20 * 60 , pixelsPerHour : 48 }) ;
 *
 * scale.size                        // → 576
 * scale.offsetOf( nineFifteen )     // → 60
 * scale.timeAt( 60 , dayMs )        // → the same 09:15
 * scale.snap( someInstant )         // → to the quarter hour
 */
export const createTimeScale = ( options = {} ) =>
{
    const {
        dayStart      = 0 ,
        dayEnd        = 24 * 60 ,
        pixelsPerHour = 48 ,
        snapMinutes   = 15 ,
    } = options ;

    // A zero-length or inverted axis would make every event land at the same
    // place and every drag divide by zero.
    const from = Math.max( 0 , Math.min( dayStart , 24 * 60 ) ) ;
    const to   = Math.max( from + 1 , Math.min( dayEnd , 24 * 60 ) ) ;

    const perMinute = pixelsPerHour / 60 ;
    const step      = Math.max( 1 , snapMinutes ) * MINUTE ;

    /** Minutes elapsed since the local midnight of the instant's own day. */
    const minutesOfDay = ( ms ) => ( ms - dayjs( ms ).startOf( 'day' ).valueOf() ) / MINUTE ;

    const offsetOf = ( ms ) => ( minutesOfDay( ms ) - from ) * perMinute ;

    const lengthOf = ( start , end ) => Math.max( 0 , ( end - start ) / HOUR * pixelsPerHour ) ;

    const timeAt = ( offset , day ) =>
        dayjs( day ).startOf( 'day' ).valueOf() + ( from + offset / perMinute ) * MINUTE ;

    const snap = ( ms ) => Math.round( ms / step ) * step ;

    return Object.freeze
    ({
        dayStart      : from ,
        dayEnd        : to ,
        pixelsPerHour ,
        snapMinutes   : Math.max( 1 , snapMinutes ) ,
        size          : ( to - from ) * perMinute ,
        offsetOf ,
        lengthOf ,
        timeAt ,
        snap ,
    }) ;
} ;

/**
 * A scale over a **span**, rather than over the hours of a day.
 *
 * The time grid asks « where in its own day does this instant fall » — every
 * column is a day and the axis repeats. A resource timeline asks something
 * simpler and larger : « where in *the window* does this instant fall », the
 * window being a day of hours or a week of days. One row, one continuous axis,
 * and no notion of a day at all.
 *
 * It answers the same three questions as {@link createTimeScale} and can stand
 * in for it wherever those are all that is asked — `timeAt` accepts and ignores
 * the day argument its cousin needs, which is what lets one drag hook drive both.
 *
 * @param {Object} options
 * @param {number} options.start - Instant the axis begins at.
 * @param {number} options.end   - Instant it ends at.
 * @param {number} options.size  - Its length, in pixels.
 * @param {number} [options.snapMinutes=15] - Step a dragged edge lands on.
 * @returns {import('./timeScale').TimeScale}
 *
 * @example
 * const scale = createSpanScale({ start : monday , end : nextMonday , size : 1400 }) ;
 * scale.offsetOf( wednesdayNoon ) // → its pixel along the week
 */
export const createSpanScale = ( options = {} ) =>
{
    const { end , size = 0 , snapMinutes = 15 , start } = options ;

    // A zero-length window would divide by zero and put every event in the same
    // place ; a minute is the smallest span worth drawing at all.
    const from = start ;
    const to   = Math.max( start + MINUTE , end ) ;

    const perMs = size / ( to - from ) ;
    const step   = Math.max( 1 , snapMinutes ) * MINUTE ;

    return Object.freeze
    ({
        dayStart      : 0 ,
        dayEnd        : 24 * 60 ,
        pixelsPerHour : perMs * HOUR ,
        snapMinutes   : Math.max( 1 , snapMinutes ) ,
        size ,
        start         : from ,
        end           : to ,
        offsetOf : ( ms ) => ( ms - from ) * perMs ,
        lengthOf : ( a , b ) => Math.max( 0 , ( b - a ) * perMs ) ,
        timeAt   : ( offset ) => from + offset / perMs ,
        snap     : ( ms ) => Math.round( ms / step ) * step ,
    }) ;
} ;

export default createTimeScale ;
