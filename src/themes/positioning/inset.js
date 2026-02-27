/**
 * Inset (position) utilities for Tailwind CSS.
 *
 * @module themes/positioning/inset
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;
import resolveNegative         from '../helpers/resolveNegative' ;

import { lazyFixedSizes , percentageSizes } from '../sizing/sizes' ;

/**
 * @typedef {'b' | 'e' | 'l' | 'r' | 's' | 't' | 'x' | 'y'} InsetDirection
 */

export const BOTTOM     = 'b' ;
export const END        = 'e' ;
export const LEFT       = 'l' ;
export const RIGHT      = 'r' ;
export const START      = 's' ;
export const TOP        = 't' ;
export const HORIZONTAL = 'x' ;
export const VERTICAL   = 'y' ;

/**
 * Valid inset directions.
 * @type {InsetDirection[]}
 */
export const directions = [ BOTTOM , END , LEFT , RIGHT , START , TOP , HORIZONTAL , VERTICAL ] ;

/**
 * Mapping between direction codes and class prefixes.
 * @type {Object.<string, string>}
 */
const DIRECTION_MAP =
{
    [ BOTTOM ]     : 'bottom-' ,
    [ END ]        : 'end-' ,
    [ LEFT ]       : 'left-' ,
    [ RIGHT ]      : 'right-' ,
    [ START ]      : 'start-' ,
    [ TOP ]        : 'top-' ,
    [ HORIZONTAL ] : 'inset-x-' ,
    [ VERTICAL ]   : 'inset-y-' ,
} ;

/**
 * Valid inset values.
 * @type {(string | number)[]}
 */
export const validValues =
    [
        ...lazyFixedSizes ,
        ...percentageSizes ,
        'auto' ,
    ] ;

/**
 * Creates an inset class definition.
 *
 * @param {string | number} value - The inset value.
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Responsive prefix.
 * @param {InsetDirection | null} [options.direction=null] - Inset direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative inset.
 *
 * @returns {Object} Class definition object.
 */
const create = ( value , { prefix = '' , direction = null , important = false , negative = false } = {} ) =>
{
    const imp = important ? '!' : '' ;
    const def = DIRECTION_MAP[ direction ] || 'inset-' ;

    ( { value , negative } = resolveNegative( value , negative ) ) ;

    const neg = negative ? '-' : '' ;

    return { [ `${ prefix }${ imp }${ neg }${ def }${ value }` ]: true } ;
} ;

/**
 * Generates responsive inset class definitions.
 *
 * Supports negative values either via the `negative` option
 * or by passing a negative numeric value directly.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Inset value or responsive object.
 * @param {Object} [options]
 * @param {InsetDirection | null} [options.direction=null] - Inset direction.
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative inset.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/top-right-bottom-left
 *
 * @example
 * ```js
 * getInset( 4 ) ;
 * // → { 'inset-4': true }
 *
 * getInset( 'auto' ) ;
 * // → { 'inset-auto': true }
 *
 * getInset( 4 , { direction: 't' } ) ;
 * // → { 'top-4': true }
 *
 * getInset( 2 , { direction: 'x' } ) ;
 * // → { 'inset-x-2': true }
 *
 * getInset( '1/2' , { direction: 'l' } ) ;
 * // → { 'left-1/2': true }
 *
 * getInset( { xs: 2 , md: 4 , lg: 8 } ) ;
 * // → { 'inset-2': true , 'md:inset-4': true , 'lg:inset-8': true }
 *
 * // Negative inset
 *
 * getInset( -4 ) ;
 * // → { '-inset-4': true }
 *
 * getInset( -2 , { direction: 't' } ) ;
 * // → { '-top-2': true }
 *
 * getInset( 4 , { direction: 'r' , negative: true , important: true } ) ;
 * // → { '!-right-4': true }
 * ```
 */
const getInset = getResponsiveDefinition
(
    create ,
    ( value ) =>
    {
        if ( typeof value === 'number' )
        {
            return validValues.includes( Math.abs( value ) ) ;
        }
        if ( typeof value === 'string' && value.startsWith( '-' ) )
        {
            return validValues.includes( value.slice( 1 ) ) ;
        }
        return validValues.includes( value ) ;
    }
) ;

export default getInset ;

/* Tailwindcss safe list
| -----XS----- | ------SM------ | ------MD------ | ------LG------ | ------XL-----— | ------XXL------ |
| inset-auto   | sm:inset-auto  | md:inset-auto  | lg:inset-auto  | xl:inset-auto  | 2xl:inset-auto  |
| inset-px     | sm:inset-px    | md:inset-px    | lg:inset-px    | xl:inset-px    | 2xl:inset-px    |
| inset-0      | sm:inset-0     | md:inset-0     | lg:inset-0     | xl:inset-0     | 2xl:inset-0     |
| inset-0.5    | sm:inset-0.5   | md:inset-0.5   | lg:inset-0.5   | xl:inset-0.5   | 2xl:inset-0.5   |
| inset-1      | sm:inset-1     | md:inset-1     | lg:inset-1     | xl:inset-1     | 2xl:inset-1     |
| inset-1.5    | sm:inset-1.5   | md:inset-1.5   | lg:inset-1.5   | xl:inset-1.5   | 2xl:inset-1.5   |
| inset-2      | sm:inset-2     | md:inset-2     | lg:inset-2     | xl:inset-2     | 2xl:inset-2     |
| inset-2.5    | sm:inset-2.5   | md:inset-2.5   | lg:inset-2.5   | xl:inset-2.5   | 2xl:inset-2.5   |
| inset-3      | sm:inset-3     | md:inset-3     | lg:inset-3     | xl:inset-3     | 2xl:inset-3     |
| inset-3.5    | sm:inset-3.5   | md:inset-3.5   | lg:inset-3.5   | xl:inset-3.5   | 2xl:inset-3.5   |
| inset-4      | sm:inset-4     | md:inset-4     | lg:inset-4     | xl:inset-4     | 2xl:inset-4     |
| inset-5      | sm:inset-5     | md:inset-5     | lg:inset-5     | xl:inset-5     | 2xl:inset-5     |
| inset-6      | sm:inset-6     | md:inset-6     | lg:inset-6     | xl:inset-6     | 2xl:inset-6     |
| inset-7      | sm:inset-7     | md:inset-7     | lg:inset-7     | xl:inset-7     | 2xl:inset-7     |
| inset-8      | sm:inset-8     | md:inset-8     | lg:inset-8     | xl:inset-8     | 2xl:inset-8     |
| inset-9      | sm:inset-9     | md:inset-9     | lg:inset-9     | xl:inset-9     | 2xl:inset-9     |
| inset-10     | sm:inset-10    | md:inset-10    | lg:inset-10    | xl:inset-10    | 2xl:inset-10    |
| inset-11     | sm:inset-11    | md:inset-11    | lg:inset-11    | xl:inset-11    | 2xl:inset-11    |
| inset-12     | sm:inset-12    | md:inset-12    | lg:inset-12    | xl:inset-12    | 2xl:inset-12    |
| inset-14     | sm:inset-14    | md:inset-14    | lg:inset-14    | xl:inset-14    | 2xl:inset-14    |
| inset-16     | sm:inset-16    | md:inset-16    | lg:inset-16    | xl:inset-16    | 2xl:inset-16    |
| inset-20     | sm:inset-20    | md:inset-20    | lg:inset-20    | xl:inset-20    | 2xl:inset-20    |
| inset-24     | sm:inset-24    | md:inset-24    | lg:inset-24    | xl:inset-24    | 2xl:inset-24    |
| inset-28     | sm:inset-28    | md:inset-28    | lg:inset-28    | xl:inset-28    | 2xl:inset-28    |
| inset-32     | sm:inset-32    | md:inset-32    | lg:inset-32    | xl:inset-32    | 2xl:inset-32    |
| inset-36     | sm:inset-36    | md:inset-36    | lg:inset-36    | xl:inset-36    | 2xl:inset-36    |
| inset-40     | sm:inset-40    | md:inset-40    | lg:inset-40    | xl:inset-40    | 2xl:inset-40    |
| inset-44     | sm:inset-44    | md:inset-44    | lg:inset-44    | xl:inset-44    | 2xl:inset-44    |
| inset-48     | sm:inset-48    | md:inset-48    | lg:inset-48    | xl:inset-48    | 2xl:inset-48    |
| inset-52     | sm:inset-52    | md:inset-52    | lg:inset-52    | xl:inset-52    | 2xl:inset-52    |
| inset-56     | sm:inset-56    | md:inset-56    | lg:inset-56    | xl:inset-56    | 2xl:inset-56    |
| inset-60     | sm:inset-60    | md:inset-60    | lg:inset-60    | xl:inset-60    | 2xl:inset-60    |
| inset-64     | sm:inset-64    | md:inset-64    | lg:inset-64    | xl:inset-64    | 2xl:inset-64    |
| inset-72     | sm:inset-72    | md:inset-72    | lg:inset-72    | xl:inset-72    | 2xl:inset-72    |
| inset-80     | sm:inset-80    | md:inset-80    | lg:inset-80    | xl:inset-80    | 2xl:inset-80    |
| inset-96     | sm:inset-96    | md:inset-96    | lg:inset-96    | xl:inset-96    | 2xl:inset-96    |
| inset-full   | sm:inset-full  | md:inset-full  | lg:inset-full  | xl:inset-full  | 2xl:inset-full  |
| inset-1/2    | sm:inset-1/2   | md:inset-1/2   | lg:inset-1/2   | xl:inset-1/2   | 2xl:inset-1/2   |
| inset-1/3    | sm:inset-1/3   | md:inset-1/3   | lg:inset-1/3   | xl:inset-1/3   | 2xl:inset-1/3   |
| inset-2/3    | sm:inset-2/3   | md:inset-2/3   | lg:inset-2/3   | xl:inset-2/3   | 2xl:inset-2/3   |
| inset-1/4    | sm:inset-1/4   | md:inset-1/4   | lg:inset-1/4   | xl:inset-1/4   | 2xl:inset-1/4   |
| inset-2/4    | sm:inset-2/4   | md:inset-2/4   | lg:inset-2/4   | xl:inset-2/4   | 2xl:inset-2/4   |
| inset-3/4    | sm:inset-3/4   | md:inset-3/4   | lg:inset-3/4   | xl:inset-3/4   | 2xl:inset-3/4   |
| inset-1/5    | sm:inset-1/5   | md:inset-1/5   | lg:inset-1/5   | xl:inset-1/5   | 2xl:inset-1/5   |
| inset-2/5    | sm:inset-2/5   | md:inset-2/5   | lg:inset-2/5   | xl:inset-2/5   | 2xl:inset-2/5   |
| inset-3/5    | sm:inset-3/5   | md:inset-3/5   | lg:inset-3/5   | xl:inset-3/5   | 2xl:inset-3/5   |
| inset-4/5    | sm:inset-4/5   | md:inset-4/5   | lg:inset-4/5   | xl:inset-4/5   | 2xl:inset-4/5   |
| inset-1/6    | sm:inset-1/6   | md:inset-1/6   | lg:inset-1/6   | xl:inset-1/6   | 2xl:inset-1/6   |
| inset-2/6    | sm:inset-2/6   | md:inset-2/6   | lg:inset-2/6   | xl:inset-2/6   | 2xl:inset-2/6   |
| inset-3/6    | sm:inset-3/6   | md:inset-3/6   | lg:inset-3/6   | xl:inset-3/6   | 2xl:inset-3/6   |
| inset-4/6    | sm:inset-4/6   | md:inset-4/6   | lg:inset-4/6   | xl:inset-4/6   | 2xl:inset-4/6   |
| inset-5/6    | sm:inset-5/6   | md:inset-5/6   | lg:inset-5/6   | xl:inset-5/6   | 2xl:inset-5/6   |
| inset-1/12   | sm:inset-1/12  | md:inset-1/12  | lg:inset-1/12  | xl:inset-1/12  | 2xl:inset-1/12  |
| inset-2/12   | sm:inset-2/12  | md:inset-2/12  | lg:inset-2/12  | xl:inset-2/12  | 2xl:inset-2/12  |
| inset-3/12   | sm:inset-3/12  | md:inset-3/12  | lg:inset-3/12  | xl:inset-3/12  | 2xl:inset-3/12  |
| inset-4/12   | sm:inset-4/12  | md:inset-4/12  | lg:inset-4/12  | xl:inset-4/12  | 2xl:inset-4/12  |
| inset-5/12   | sm:inset-5/12  | md:inset-5/12  | lg:inset-5/12  | xl:inset-5/12  | 2xl:inset-5/12  |
| inset-6/12   | sm:inset-6/12  | md:inset-6/12  | lg:inset-6/12  | xl:inset-6/12  | 2xl:inset-6/12  |
| inset-7/12   | sm:inset-7/12  | md:inset-7/12  | lg:inset-7/12  | xl:inset-7/12  | 2xl:inset-7/12  |
| inset-8/12   | sm:inset-8/12  | md:inset-8/12  | lg:inset-8/12  | xl:inset-8/12  | 2xl:inset-8/12  |
| inset-9/12   | sm:inset-9/12  | md:inset-9/12  | lg:inset-9/12  | xl:inset-9/12  | 2xl:inset-9/12  |
| inset-10/12  | sm:inset-10/12 | md:inset-10/12 | lg:inset-10/12 | xl:inset-10/12 | 2xl:inset-10/12 |
| inset-11/12  | sm:inset-11/12 | md:inset-11/12 | lg:inset-11/12 | xl:inset-11/12 | 2xl:inset-11/12 |
*/