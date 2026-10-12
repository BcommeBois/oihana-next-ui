/**
 * The GS1 application identifiers that carry a date, `YYMMDD`.
 *
 * (11) production, (12) due, (13) packaging, (15) best before, (16) sell by,
 * (17) expiration.
 *
 * @type {string[]}
 */
export const GS1_DATE_AIS = [ '11' , '12' , '13' , '15' , '16' , '17' ] ;

/**
 * The number of days in a month.
 * @param {number} year
 * @param {number} month - 1 to 12.
 * @returns {number}
 */
const daysIn = ( year , month ) => new Date( Date.UTC( year , month , 0 ) ).getUTCDate() ;

const pad = value => String( value ).padStart( 2 , '0' ) ;

/**
 * A GS1 date, `YYMMDD`, as an ISO date : `261231` → `2026-12-31`.
 *
 * Two traps, both set by the GS1 General Specifications :
 *
 * - 🔑 **The century slides.** Two digits of year are read within a window
 *   around today : a year more than 50 years ahead is in the past century, a
 *   year more than 49 years back is in the next one. In 2026, `75` is 2075 and
 *   `77` is 1977.
 * - 🔑 **Day `00` is the last day of the month** — a label giving a month
 *   only : `260200` is 2026-02-28, `280200` 2028-02-29.
 *
 * Pure : the day the window slides around is given in `today`.
 *
 * @module helpers/barcodes/parseGS1Date
 *
 * @param {string} value - Six digits, `YYMMDD`.
 * @param {Object} [options]
 * @param {Date} [options.today=new Date()] - The day the century window is set around.
 * @returns {?string} `YYYY-MM-DD`, or `null` for anything that is no date.
 *
 * @example
 * ```js
 * parseGS1Date( '261231' ) ; // '2026-12-31'
 * parseGS1Date( '270400' ) ; // '2027-04-30'
 * parseGS1Date( '261331' ) ; // null
 * ```
 */
const parseGS1Date = ( value , { today = new Date() } = {} ) =>
{
    const text = String( value ?? '' ) ;

    if ( !/^\d{6}$/.test( text ) )
    {
        return null ;
    }

    const yy    = Number( text.slice( 0 , 2 ) ) ;
    const month = Number( text.slice( 2 , 4 ) ) ;
    const day   = Number( text.slice( 4 , 6 ) ) ;

    if ( month < 1 || month > 12 )
    {
        return null ;
    }

    const current = today.getFullYear() ;
    const century = Math.floor( current / 100 ) * 100 ;
    const gap     = yy - ( current % 100 ) ;

    const year = century + yy + ( gap >= 51 ? -100 : gap <= -50 ? 100 : 0 ) ;

    const last = daysIn( year , month ) ;

    if ( day > last )
    {
        return null ;
    }

    return `${ year }-${ pad( month ) }-${ pad( day === 0 ? last : day ) }` ;
} ;

export default parseGS1Date ;
