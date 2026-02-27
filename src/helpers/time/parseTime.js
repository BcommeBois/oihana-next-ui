import isInt    from 'vegas-js-core/src/isInt'
import notEmpty from 'vegas-js-core/src/strings/notEmpty'

import clip from 'vegas-js-core/src/numbers/clip'

import { AM , PM } from './meridies'

/**
 * Parse a time expression string into its components.
 *
 * Supports multiple formats:
 * - 24-hour format: "14:30", "23:59:59", "12:34:56.789"
 * - 12-hour format: "2:30 PM", "11:45:30 AM", "12:00 AM"
 *
 * @param {string} expression - Time string to parse
 * @param {boolean} [ampm=false] - Force 12-hour format interpretation
 * @returns {Array} Tuple of [hour, minute, second, millisecond, meridiem, isAmPm]
 *   - hour {number} - Hour (0-23 for 24h, 1-12 for 12h format)
 *   - minute {number} - Minute (0-59)
 *   - second {number|undefined} - Second (0-59) or undefined if not provided
 *   - millisecond {number|undefined} - Millisecond (0-999) or undefined if not provided
 *   - meridiem {string|undefined} - 'AM' or 'PM' if 12-hour format, undefined otherwise
 *   - isAmPm {boolean} - True if 12-hour format was detected or forced
 *
 * @example
 * parseTime('14:30')           // [14, 30, undefined, undefined, undefined, false]
 * parseTime('2:30 PM')         // [2, 30, undefined, undefined, 'PM', true]
 * parseTime('12:00 AM')        // [12, 0, undefined, undefined, 'AM', true]  // Minuit en 12h
 * parseTime('12:00 PM')        // [12, 0, undefined, undefined, 'PM', true]  // Midi en 12h
 * parseTime('23:59:59.999')    // [23, 59, 59, 999, undefined, false]
 * parseTime('11:45:30 AM')     // [11, 45, 30, undefined, 'AM', true]
 *
 * @example
 * // Conversion to 24-hour format
 * const [h, m, s, ms, mer] = parseTime('2:30 PM');
 * const hour24 = mer === 'PM' && h !== 12 ? h + 12 : mer === 'AM' && h === 12 ? 0 : h;
 * // hour24 = 14
 */
const parseTime = (expression , ampm = false ) =>
{
	if( notEmpty( expression ) )
	{
		let hour        ;
		let minute      ;
		let second      ;
		let millisecond ;

		let meridiem , more ;

		expression = expression.toUpperCase() ;

		if( expression.endsWith( AM ) )
		{
			ampm       = true ;
			meridiem   = AM ;
			expression = expression.slice(0,-2) ;
		}
		else if( expression.endsWith( PM ) )
		{
			ampm       = true ;
			meridiem   = PM ;
			expression = expression.slice(0,-2) ;
		}

		expression = expression.trim() ;

		( [ hour , minute , more ] = expression.split( ':' ) ) ;

		hour   = parseInt( hour ) ;
		minute = parseInt( minute ) ;

		if( notEmpty( more ) )
		{
			( [ second , millisecond ] = more.split('.') ) ;
			second      = parseInt( second ) ;
			millisecond = parseInt( millisecond  ) ;
		}

		hour        = isInt(hour)        ? clip( hour , ampm ? 1 : 0 , ampm ? 12 : 23 ) : ampm ? 1 : 0 ;
		minute      = isInt(minute)      ? clip( minute , 0 , 59  ) : 0 ;
		second      = isInt(second)      ? clip( second , 0 , 59  ) : undefined ;
		millisecond = isInt(millisecond) ? clip( millisecond , 0 , 999 ) : undefined ;

		return [ hour , minute , second , millisecond , meridiem , ampm ] ;
	}

	return []  ;
}

export default parseTime ;