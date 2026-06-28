import dayjs from './configureDayjs' ;

/**
 * Formats a `Date` into the masked-input string for a given `InputDate` mode.
 *
 * The mode tokens (`dd` / `mm` / `yy` / `yyyy`) map 1:1 to dayjs tokens once
 * upper-cased (`DD` / `MM` / `YY` / `YYYY`); the `/` placeholders are replaced
 * with the actual `separator`.
 *
 * @param {Date|null} date - The date to format.
 * @param {string} [mode='dd/mm/yyyy'] - One of the `dateModes` values.
 * @param {string} [separator='/'] - Segment separator ('/', '.', '-').
 * @returns {string} The formatted string (e.g. '25/12/2024'), or '' when no date.
 *
 * @example
 * formatDateForMode(new Date('2024-12-25'), 'dd/mm/yyyy')      // '25/12/2024'
 * formatDateForMode(new Date('2024-12-25'), 'yyyy/mm/dd', '-') // '2024-12-25'
 */
export const formatDateForMode = ( date , mode = 'dd/mm/yyyy' , separator = '/' ) =>
{
    if ( !date )
    {
        return '' ;
    }
    const format = mode.toUpperCase().replace( /[/.\-]/g , separator ) ;
    return dayjs( date ).format( format ) ;
} ;

export default formatDateForMode ;
