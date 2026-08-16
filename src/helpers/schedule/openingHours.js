/**
 * When something is open, read from `OpeningHoursSpecification` as it stands.
 *
 * The vocabulary is consumed unchanged — `dayOfWeek`, `opens`, `closes`,
 * `validFrom`, `validThrough` — because inventing a second way to say « open on
 * Tuesdays from nine to six » would leave two of them to reconcile the day the
 * slot picker needs the same answer. **This module only says when a thing is
 * open.** Turning that into free slots is a different question, and a different
 * lot : here it draws a shade behind a row, there it will offer appointments.
 *
 * @module helpers/schedule/openingHours
 */

import dayjs from '../date/configureDayjs' ;

import { atTimeOfDay , parseInstant } from './parseInstant' ;
import { normalizeDaysOfWeek } from './dayOfWeek' ;

/**
 * @typedef {Object} OpenRange
 * @property {number} start - Inclusive, in milliseconds.
 * @property {number} end   - Exclusive, in milliseconds.
 */

/** Reads the specifications an object carries, in any of the shapes it may. */
export const readOpeningHours = ( value ) =>
{
    if ( value === null || value === undefined )
    {
        return [] ;
    }

    const list = Array.isArray( value ) ? value : [ value ] ;

    return list.filter( item => item !== null && typeof item === 'object' ) ;
} ;

/**
 * Whether a specification applies on a given day.
 *
 * `validFrom` / `validThrough` bound the *season* a rule belongs to — summer
 * hours, a temporary closure — and are read as whole days, since that is what
 * they mean.
 *
 * @param {Object} specification
 * @param {number} day - Local midnight of the day, in milliseconds.
 * @returns {boolean}
 */
export const appliesOn = ( specification , day ) =>
{
    const from    = parseInstant( specification.validFrom ) ;
    const through = parseInstant( specification.validThrough ) ;

    if ( from !== null && day < dayjs( from.ms ).startOf( 'day' ).valueOf() )
    {
        return false ;
    }

    if ( through !== null && day > dayjs( through.ms ).startOf( 'day' ).valueOf() )
    {
        return false ;
    }

    const weekdays = normalizeDaysOfWeek( specification.dayOfWeek ) ;

    // `null` is « nothing was said », and a rule naming no day holds every day.
    // An **empty** list is not the same thing — it was said, and it names none,
    // so it opens on no day at all. The adapter draws that distinction on
    // `byDay` already ; it means the same here.
    if ( weekdays === null )
    {
        return true ;
    }

    return weekdays.some( entry => entry.day === dayjs( day ).day() ) ;
} ;

/**
 * The open ranges of one day.
 *
 * @param {*} availability - One `OpeningHoursSpecification`, or several.
 * @param {number} day - Local midnight of the day, in milliseconds.
 * @returns {Array<OpenRange>} Ordered, and merged where they touch or overlap.
 *
 * @example
 * openRangesOf( { dayOfWeek : 'Tuesday' , opens : '09:00' , closes : '18:00' } , tuesday )
 * // → [ { start : tuesday 09:00 , end : tuesday 18:00 } ]
 */
export const openRangesOf = ( availability , day ) =>
{
    const ranges = [] ;

    for ( const specification of readOpeningHours( availability ) )
    {
        if ( !appliesOn( specification , day ) )
        {
            continue ;
        }

        const opens  = atTimeOfDay( day , specification.opens ) ;
        const closes = atTimeOfDay( day , specification.closes ) ;

        if ( opens === null )
        {
            continue ;
        }

        // A closing time at or before the opening one is a day that runs past
        // midnight — the range is clipped at the end of its own day, which is as
        // far as a row of this day can draw it.
        const end = closes === null || closes <= opens ? dayjs( day ).add( 1 , 'day' ).valueOf() : closes ;

        ranges.push({ end , start : opens }) ;
    }

    ranges.sort( ( a , b ) => a.start - b.start ) ;

    // Two rules that touch are one opening : « 09:00–12:00 » and « 12:00–18:00 »
    // drawn as two bands would print a closure at noon that nobody declared.
    const merged = [] ;

    for ( const range of ranges )
    {
        const last = merged[ merged.length - 1 ] ;

        if ( last && range.start <= last.end )
        {
            last.end = Math.max( last.end , range.end ) ;
            continue ;
        }

        merged.push({ ...range }) ;
    }

    return merged ;
} ;

/**
 * The **closed** ranges of one day — what a view actually shades.
 *
 * The complement is what gets drawn, so a resource that declares nothing shades
 * nothing : silence is not a closure, and hatching a whole row because a payload
 * omitted its hours would state something the data never said.
 *
 * @param {*} availability
 * @param {number} day - Local midnight, in milliseconds.
 * @returns {Array<OpenRange>}
 *
 * @example
 * closedRangesOf( spec , monday ) // → [ 00:00–09:00 , 18:00–24:00 ]
 */
export const closedRangesOf = ( availability , day ) =>
{
    const open = openRangesOf( availability , day ) ;

    if ( open.length === 0 )
    {
        return [] ;
    }

    const end = dayjs( day ).add( 1 , 'day' ).valueOf() ;

    const closed = [] ;
    let cursor = day ;

    for ( const range of open )
    {
        if ( range.start > cursor )
        {
            closed.push({ end : range.start , start : cursor }) ;
        }

        cursor = Math.max( cursor , range.end ) ;
    }

    if ( cursor < end )
    {
        closed.push({ end , start : cursor }) ;
    }

    return closed ;
} ;

export default openRangesOf ;
