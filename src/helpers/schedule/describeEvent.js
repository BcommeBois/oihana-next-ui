/**
 * Saying an event out loud.
 *
 * ### Why this is a module and not a template in each view
 *
 * A block on a time grid prints its title and its start ; that is all a reader
 * *sees*, and it is all a screen reader would get — no end, no day, no status.
 * So the label has to be written, and the moment it is written twice it says two
 * different things : the tooltip one sentence, the `aria-label` another, and the
 * day one of them forgets a cancellation nobody notices, because nobody reads
 * both. **One function, several callers.**
 *
 * ### The span is the hard part, and it already existed
 *
 * `describeSpan` is the panel's own `formatSpan`, moved here — it was the only
 * place in the family that said a period the way a person would, and the labels
 * needed exactly that. An all-day span is held with an **exclusive** end, so the
 * last day covered is the one before it : printing the raw end names a day the
 * event does not cover, which is the single most confusing thing a calendar can
 * tell someone who cannot see the bar.
 *
 * @module helpers/schedule/describeEvent
 */

import dayjs from '../date/configureDayjs' ;

/**
 * Fills the `{name}` slots of a locale sentence.
 *
 * A sentence read out loud needs its own word order — « déplacé au 12 août » and
 * « moved to 12 August » do not put the same thing first — so the announcements
 * are templates rather than words concatenated in the component. Two
 * substitutions, no engine.
 *
 * @param {string} template - The sentence, with `{event}` / `{when}` slots.
 * @param {Object} [values] - What to put in them.
 * @returns {string}
 *
 * @example
 * fill( '{event} moved to {when}' , { event : 'Workshop' , when : 'Wednesday, 14:00 – 15:30' } )
 */
export const fill = ( template , values = {} ) => Object
    .entries( values )
    .reduce( ( text , [ key , value ] ) => text.replaceAll( `{${ key }}` , value ?? '' ) , template ?? '' ) ;

/**
 * Says when something happens, the way one would say it out loud.
 *
 * @param {Object} span - `{ start , end , allDay }`, in milliseconds.
 * @param {Object} [options]
 * @param {Object} [options.labels] - The scheduler's locale, for `allDay`.
 * @param {string} [options.lang='en'] - Active locale.
 * @returns {string}
 *
 * @example
 * describeSpan({ start , end })                  // → 'mercredi 12 août 2026 · 14:00 – 15:30'
 * describeSpan({ start , end , allDay : true })  // → 'mercredi 12 août 2026 · Journée'
 */
export const describeSpan = ( span , options = {} ) =>
{
    const { labels , lang = 'en' } = options ;

    if ( !span || !Number.isFinite( span.start ) )
    {
        return '' ;
    }

    const from = dayjs( span.start ).locale( lang ) ;

    // An all-day span ends at the following midnight, which is not a day anybody
    // would name : the last day covered is the one before it.
    const to = dayjs( span.allDay ? span.end - 1 : span.end ).locale( lang ) ;

    const sameDay = from.isSame( to , 'day' ) ;

    if ( span.allDay )
    {
        return sameDay
            ? `${ from.format( 'dddd LL' ) } · ${ labels?.allDay ?? '' }`.trim()
            : `${ from.format( 'LL' ) } – ${ to.format( 'LL' ) }` ;
    }

    return sameDay
        ? `${ from.format( 'dddd LL' ) } · ${ from.format( 'HH:mm' ) } – ${ to.format( 'HH:mm' ) }`
        : `${ from.format( 'LLL' ) } – ${ to.format( 'LLL' ) }` ;
} ;

/**
 * The accessible name of an event, as a block, a chip or a row.
 *
 * When a `segment` is given it is **that piece** that is described — the
 * Wednesday of a three-day conference is drawn on Wednesday, and telling a
 * reader it runs to Friday when their focus is on one column is a lie of
 * placement. The piece says it continues instead, exactly as the visible card
 * does.
 *
 * @param {import('./normalizeEvent').ScheduleEvent} event - The record.
 * @param {Object} [options]
 * @param {Object} [options.labels] - The scheduler's locale.
 * @param {string} [options.lang='en'] - Active locale.
 * @param {Object} [options.segment] - The piece being drawn, when the view cuts events per day.
 * @returns {string}
 *
 * @example
 * describeEvent( event , { labels , lang } )
 * // → 'Atelier reliure, mercredi 12 août 2026 · 14:00 – 15:30, Annulé'
 */
export const describeEvent = ( event , options = {} ) =>
{
    const { labels , lang = 'en' , segment } = options ;

    if ( !event )
    {
        return '' ;
    }

    const span = segment
        ? { allDay : event.allDay , end : segment.end , start : segment.start }
        : event ;

    const parts = [ event.title , describeSpan( span , { labels , lang } ) ] ;

    if ( segment && ( segment.continuesBefore || segment.continuesAfter ) )
    {
        parts.push( labels?.continues ) ;
    }

    // `scheduled` is the absence of news, and announcing it on every single event
    // is how a reader learns to stop listening to the end of the sentence.
    if ( event.status && event.status !== 'scheduled' )
    {
        parts.push( labels?.statuses?.[ event.status ] ?? event.status ) ;
    }

    return parts.filter( Boolean ).join( ', ' ) ;
} ;

/**
 * The accessible name of a day cell : the date, and how much is on it.
 *
 * A month cell prints a number. Read out, « 12 » is not a date and says nothing
 * of what the cell is holding — which is the whole reason one would open it.
 *
 * @param {number} day - Local midnight.
 * @param {number} [count=0] - How many events the day holds.
 * @param {Object} [options]
 * @param {Object} [options.labels] - The scheduler's locale.
 * @param {string} [options.lang='en'] - Active locale.
 * @returns {string}
 *
 * @example
 * describeDay( day , 3 , { labels , lang } )  // → 'mercredi 12 août 2026, 3 événements'
 */
export const describeDay = ( day , count = 0 , options = {} ) =>
{
    const { labels , lang = 'en' } = options ;

    const date = dayjs( day ).locale( lang ).format( 'dddd LL' ) ;

    if ( !count )
    {
        return date ;
    }

    // One key each rather than a plural engine : two forms are what these two
    // languages need, and a library that guesses plurals for every locale it has
    // never seen guesses wrong.
    const noun = count === 1 ? labels?.a11y?.event : labels?.a11y?.events ;

    return `${ date }, ${ count }${ noun ? ` ${ noun }` : '' }` ;
} ;

export default describeEvent ;
