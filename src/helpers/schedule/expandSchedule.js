/**
 * Turns a repeating rule into the occurrences that fall inside a window.
 *
 * This covers the **declarative** tier of recurrence — the one schema.org
 * defines as a `Schedule` : a set of properties selecting days, not an
 * `RRULE:` string to parse. `byDay` and its neighbours describe which days of
 * the week, of the month or of the year a series lands on, and expanding them
 * over a visible week is a filter over that week's days.
 *
 * Two axes are easy to conflate, and the vocabulary is explicit about them :
 *
 * - `startDate` / `endDate` bound **the validity of the rule** — the season the
 *   series runs in ;
 * - `startTime` / `endTime` give **the time of each occurrence**.
 *
 * A series with no `startTime` produces all-day occurrences ; one with a
 * `startTime` produces timed ones, on the same days.
 *
 * The rule is only ever expanded over the window being looked at, so an
 * open-ended weekly series costs a scan of that window and nothing more.
 *
 * @module helpers/schedule/expandSchedule
 */

import dayjs from '../date/configureDayjs' ;

import { normalizeDaysOfWeek } from './dayOfWeek' ;
import { atTimeOfDay , parseInstant } from './parseInstant' ;
import { parseDuration } from './parseDuration' ;
import { DEFAULT_DURATION } from './normalizeEvent' ;

const DAY = 24 * 60 * 60 * 1000 ;

/**
 * Ceiling on the day-by-day scan. Reached only by a rule that selects nothing
 * while bounded by a `repeatCount` — without it, such a rule would spin forever
 * looking for matches that never come.
 */
const MAX_SCAN_DAYS = 366 * 5 ;

/** The properties that make an object a repeating rule rather than a dated event. */
const SELECTORS = [ 'byDay' , 'byMonth' , 'byMonthDay' , 'byMonthWeek' ] ;

/**
 * Whether an object carries a repeating rule.
 *
 * Presence of a selector — or of a bare `repeatFrequency` — is what decides,
 * never the `@type`. This is what lets a house subtype that carries `byDay`
 * expand like a `Schedule` without ever being declared as one.
 *
 * @param {*} source
 * @returns {boolean}
 */
export const isSchedule = ( source ) =>
{
    if ( source === null || typeof source !== 'object' )
    {
        return false ;
    }
    return SELECTORS.some( key => source[ key ] !== undefined && source[ key ] !== null )
        || ( source.repeatFrequency !== undefined && source.repeatFrequency !== null ) ;
} ;

/**
 * Collects the rules an object carries : the ones nested under `eventSchedule`
 * — which schema.org allows to repeat, hence the array — and the object itself
 * when the schedule properties sit flat on it, as a thesaurus term or any other
 * house subtype spells them.
 *
 * @param {*} source
 * @returns {Array<Object>} Possibly empty.
 */
export const readSchedules = ( source ) =>
{
    if ( source === null || typeof source !== 'object' )
    {
        return [] ;
    }

    const nested = source.eventSchedule ;

    if ( nested !== undefined && nested !== null )
    {
        return ( Array.isArray( nested ) ? nested : [ nested ] ).filter( item => item !== null && typeof item === 'object' ) ;
    }

    return isSchedule( source ) ? [ source ] : [] ;
} ;

/** Normalises a scalar-or-array of integers into a Set, dropping anything unreadable. */
const toIntegerSet = ( value ) =>
{
    if ( value === null || value === undefined )
    {
        return null ;
    }

    const items = Array.isArray( value ) ? value : [ value ] ;
    const set   = new Set() ;

    for ( const item of items )
    {
        const number = Number( item ) ;
        if ( Number.isInteger( number ) )
        {
            set.add( number ) ;
        }
    }

    return set ;
} ;

/** The days, and the instants, a rule explicitly excludes. */
const readExceptions = ( value ) =>
{
    const days     = new Set() ;
    const instants = new Set() ;

    if ( value === null || value === undefined )
    {
        return { days , instants } ;
    }

    for ( const item of ( Array.isArray( value ) ? value : [ value ] ) )
    {
        const instant = parseInstant( item ) ;

        if ( instant === null )
        {
            continue ;
        }

        // A bare `Date` excludes the whole day ; a `DateTime` excludes only the
        // occurrence starting at that very instant.
        if ( instant.dateOnly )
        {
            days.add( dayjs( instant.ms ).format( 'YYYY-MM-DD' ) ) ;
        }
        else
        {
            instants.add( instant.ms ) ;
        }
    }

    return { days , instants } ;
} ;

/**
 * @typedef {Object} Occurrence
 * @property {number}  start  - Inclusive start, in milliseconds.
 * @property {number}  end    - Exclusive end, in milliseconds.
 * @property {boolean} allDay - The rule gave no time of day.
 * @property {string}  date   - `YYYY-MM-DD` of the occurrence, used to name it.
 */

/**
 * Expands one rule over a window.
 *
 * @param {Object} schedule - An object carrying the `Schedule` properties.
 * @param {Object} options
 * @param {{start: number, end: number}} options.window - The visible span, in milliseconds.
 * @param {boolean} [options.allDayEndInclusive=true]   - Kept for symmetry with the rest of the group ; a rule's own `endDate` bounds its validity and is always read as a whole day.
 * @param {number}  [options.defaultDuration=3600000]   - Length of a timed occurrence that states no end.
 * @returns {Array<Occurrence>} Ordered by start.
 *
 * @example
 * expandSchedule
 * (
 *     { byDay : [ '…#Tuesday' , '…#Thursday' ] , startTime : '18:00' , duration : 'PT2H' } ,
 *     { window : { start : mondayMs , end : nextMondayMs } }
 * )
 * // → two occurrences, Tuesday and Thursday, 18:00 → 20:00
 */
export const expandSchedule = ( schedule , { window , defaultDuration = DEFAULT_DURATION } = {} ) =>
{
    if ( schedule === null || typeof schedule !== 'object' || !window )
    {
        return [] ;
    }

    const days        = normalizeDaysOfWeek( schedule.byDay ) ;
    const months      = toIntegerSet( schedule.byMonth ) ;
    const monthDays   = toIntegerSet( schedule.byMonthDay ) ;
    const monthWeeks  = toIntegerSet( schedule.byMonthWeek ) ;
    const exceptions  = readExceptions( schedule.exceptDate ) ;

    // A rule that names its days and names none of them runs on no day at all —
    // a series defined but not yet scheduled. That is not the same as a rule
    // which says nothing about its days, and it must not fall through to
    // « every day ».
    if ( days !== null && days.length === 0 )
    {
        return [] ;
    }

    const hasSelector = days !== null || months !== null || monthDays !== null || monthWeeks !== null ;

    const validFrom    = parseInstant( schedule.startDate )?.ms ?? null ;
    const validThrough = parseInstant( schedule.endDate )?.ms ?? null ;

    const repeatCount = Number.isInteger( Number( schedule.repeatCount ) ) ? Number( schedule.repeatCount ) : null ;
    const frequency   = parseDuration( schedule.repeatFrequency ) ;

    const duration = parseDuration( schedule.duration ) ;

    const build = ( dayMs ) =>
    {
        const date  = dayjs( dayMs ).format( 'YYYY-MM-DD' ) ;
        const start = atTimeOfDay( dayMs , schedule.startTime ) ;

        if ( exceptions.days.has( date ) )
        {
            return null ;
        }

        const allDay = start === null ;
        const from   = start ?? dayjs( dayMs ).startOf( 'day' ).valueOf() ;

        if ( exceptions.instants.has( from ) )
        {
            return null ;
        }

        let to = atTimeOfDay( dayMs , schedule.endTime ) ;

        if ( to !== null && to <= from )
        {
            // An end before its start means the occurrence runs past midnight.
            to += DAY ;
        }

        if ( to === null )
        {
            to = duration !== null ? from + duration : ( allDay ? from + DAY : from + defaultDuration ) ;
        }

        return { start : from , end : to , allDay , date } ;
    } ;

    const matches = ( day ) =>
    {
        if ( days !== null )
        {
            const weekday = day.day() ;
            const ordinal = Math.ceil( day.date() / 7 ) ;
            const hit     = days.some( entry => entry.day === weekday && ( entry.ordinal === null || entry.ordinal === ordinal ) ) ;

            if ( !hit )
            {
                return false ;
            }
        }

        if ( months !== null && !months.has( day.month() + 1 ) )
        {
            return false ;
        }

        if ( monthDays !== null && !monthDays.has( day.date() ) )
        {
            return false ;
        }

        // The nth occurrence of this weekday within its month — 1 for days 1 to 7,
        // 2 for days 8 to 14, and so on. Meant to be paired with `byDay`.
        if ( monthWeeks !== null && !monthWeeks.has( Math.ceil( day.date() / 7 ) ) )
        {
            return false ;
        }

        return true ;
    } ;

    const occurrences = [] ;

    // A pure stride : no selector, just « every so often from the start date ».
    if ( !hasSelector && frequency !== null && frequency > 0 && validFrom !== null )
    {
        let cursor = validFrom ;
        let count  = 0 ;

        while ( cursor < window.end && count < MAX_SCAN_DAYS )
        {
            if ( repeatCount !== null && count >= repeatCount )
            {
                break ;
            }
            if ( validThrough !== null && cursor > validThrough )
            {
                break ;
            }

            if ( cursor >= window.start )
            {
                const built = build( cursor ) ;
                if ( built !== null )
                {
                    // The stride carries its own time of day ; keep it rather than
                    // snapping the occurrence to midnight.
                    occurrences.push({ ...built , start : cursor , end : built.end - built.start + cursor , allDay : false }) ;
                }
            }

            cursor += frequency ;
            count  += 1 ;
        }

        return occurrences ;
    }

    // Day-by-day selection. A `repeatCount` counts from the rule's own start, not
    // from the window — otherwise a three-session series would come back every
    // week the user navigates to.
    const counting = repeatCount !== null && validFrom !== null ;
    const scanFrom = counting ? validFrom : Math.max( window.start , validFrom ?? window.start ) ;

    let cursor  = dayjs( scanFrom ).startOf( 'day' ) ;
    let scanned = 0 ;
    let matched = 0 ;

    while ( scanned < MAX_SCAN_DAYS )
    {
        const dayMs = cursor.valueOf() ;

        if ( dayMs >= window.end && ( !counting || matched >= repeatCount ) )
        {
            break ;
        }
        if ( validThrough !== null && dayMs > validThrough )
        {
            break ;
        }
        if ( counting && matched >= repeatCount )
        {
            break ;
        }

        if ( ( validFrom === null || dayMs >= dayjs( validFrom ).startOf( 'day' ).valueOf() ) && matches( cursor ) )
        {
            matched += 1 ;

            if ( dayMs >= dayjs( window.start ).startOf( 'day' ).valueOf() && dayMs < window.end )
            {
                const built = build( dayMs ) ;

                if ( built !== null && built.end > window.start )
                {
                    occurrences.push( built ) ;
                }
            }
        }

        cursor   = cursor.add( 1 , 'day' ) ;
        scanned += 1 ;
    }

    return occurrences ;
} ;

export default expandSchedule ;
