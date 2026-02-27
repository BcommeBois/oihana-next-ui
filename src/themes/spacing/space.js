import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;
import resolveNegative         from '../helpers/resolveNegative';

import { lazyFixedSizes } from '../sizing/sizes' ;

export const HORIZONTAL = 'x' ;
export const VERTICAL   = 'y' ;

/**
 * Valid space directions.
 *
 * @type {(string)[]}
 */
export const directions = [ HORIZONTAL , VERTICAL ] ;

/**
 * Creates a space-between class definition.
 *
 * @param {string|number} value - Space value.
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Responsive breakpoint prefix.
 * @param {('x'|'y'|null)} [options.direction=null] - Axis direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative spacing.
 * @param {boolean} [options.reversed=false] - Reverse child order.
 *
 * @returns {Object} Class definition object.
 */
const create =
(
    value ,
    {
        prefix = '' ,
        direction = null ,
        important = false ,
        negative = false ,
        reversed = false
    } = {}
) =>
{
    const axis    = directions.includes( direction ) ? `-${ direction }` : '' ;
    const imp     = important ? '!' : '' ;
    const hasAxis = direction === HORIZONTAL || direction === VERTICAL ;

    ( { value , negative } = resolveNegative( value , negative ) ) ;

    const neg = negative ? '-' : '' ;

    return {
        [ `${ prefix }${ imp }${ neg }space${ axis }-${ value }` ] : true ,
        [ `${ prefix }${ imp }space${ axis }-reverse` ]            : reversed && hasAxis ,
    } ;
} ;

/**
 * Generates responsive space-between class definitions.
 *
 * @param {string|number|Object} value - Space value or responsive object.
 * @param {Object} [options]
 * @param {('x'|'y'|null)} [options.direction=null] - Axis direction.
 * @param {boolean} [options.reversed=false] - Reverse child order.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/space
 *
 * @example
 * ```js
 * getSpace( '4' , { direction: 'x' } ) ;
 * // → { 'space-x-4': true , 'space-x-reverse': false }
 *
 * getSpace( '2' , { direction: 'y' , reversed: true } ) ;
 * // → { 'space-y-2': true , 'space-y-reverse': true }
 *
 * getSpace( { xs: '2' , md: '4' } , { direction: 'x' } ) ;
 * // → { 'space-x-2': true , ... , 'md:space-x-4': true , ... }
 *
 * // Negative spacing
 *
 * getSpace( 4 , { direction: 'x' , negative: true } ) ;
 * // → { '-space-x-4': true , '-space-x-reverse': false }
 *
 * getSpace( -4 , { direction: 'y' } ) ;
 * // → { '-space-y-4': true , '-space-y-reverse': false }
 *
 * getSpace( '-4' , { direction: 'x' } ) ;
 * // → { '-space-x-4': true , '-space-x-reverse': false }
 *
 * getSpace( -2 , { direction: 'x' , reversed: true , important: true } ) ;
 * // → { '!-space-x-2': true , '!space-x-reverse': true }
 * ```
 */
const getSpace = getResponsiveDefinition
(
    create ,
    value => lazyFixedSizes.includes( value )
) ;

export default getSpace ;