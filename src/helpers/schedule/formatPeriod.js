/**
 * The label a scheduler toolbar shows for the span it is looking at.
 *
 * Naive concatenation gives « 10 août 2026 – 16 août 2026 », which repeats the
 * month and the year for no reason. What is dropped depends on what the two
 * bounds have in common, and the three cases are worth spelling out because a
 * span crossing a year is exactly the one a quick implementation gets wrong :
 *
 * - same month  → « 10 – 16 août 2026 »
 * - same year   → « 28 août – 3 septembre 2026 »
 * - neither     → « 28 décembre 2026 – 3 janvier 2027 »
 *
 * The end is read as **inclusive** — the toolbar names the last day covered, not
 * the exclusive instant the window ends at.
 *
 * @module helpers/schedule/formatPeriod
 */

import dayjs from '../date/configureDayjs' ;

/**
 * @param {{start: number, end: number}} window - The span, whose `end` is exclusive.
 * @param {Object} [options]
 * @param {string} [options.lang='en'] - Active locale code.
 * @param {string} [options.view] - Current view ; `'month'` names the month of the anchor rather than the grid's span.
 * @param {import('dayjs').ConfigType} [options.date] - The anchor, used by the month view.
 * @returns {string}
 *
 * @example
 * formatPeriod({ start , end } , { lang : 'fr' }) // → '10 – 16 août 2026'
 */
export const formatPeriod = ( window , { lang = 'en' , view , date } = {} ) =>
{
    if ( !window )
    {
        return '' ;
    }

    // A month grid spills into the neighbouring months on both sides ; naming that
    // span would read « 27 juillet – 6 septembre » for what everyone calls August.
    if ( view === 'month' )
    {
        return dayjs( date ?? window.start ).locale( lang ).format( 'MMMM YYYY' ) ;
    }

    const from = dayjs( window.start ).locale( lang ) ;
    const to   = dayjs( window.end ).locale( lang ).subtract( 1 , 'day' ) ;

    if ( from.isSame( to , 'day' ) )
    {
        return from.format( 'D MMMM YYYY' ) ;
    }

    if ( from.isSame( to , 'month' ) )
    {
        return `${ from.format( 'D' ) } – ${ to.format( 'D MMMM YYYY' ) }` ;
    }

    if ( from.isSame( to , 'year' ) )
    {
        return `${ from.format( 'D MMMM' ) } – ${ to.format( 'D MMMM YYYY' ) }` ;
    }

    return `${ from.format( 'D MMMM YYYY' ) } – ${ to.format( 'D MMMM YYYY' ) }` ;
} ;

export default formatPeriod ;
