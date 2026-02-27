/**
 * Flex grow utilities for Tailwind CSS.
 *
 * @module themes/layout/flexGrow
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

/**
 * Valid flex grow values.
 *
 * `true` generates the base `grow` class (grow: 1).
 *
 * @type {(number | string | boolean)[]}
 */
export const validValues = [ 0 , 1 , '0' , '1' , true ] ;

/**
 * Creates a flex grow class definition.
 *
 * @param {number | string | boolean} value - Grow value. `true` for default (1).
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Responsive prefix.
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 */
const create = ( value , { prefix = '' , important = false } = {} ) =>
{
    const imp = important ? '!' : '' ;

    return ( value === true || value === 1 || value === '1' )
        ? { [ `${ prefix }${ imp }grow` ]: true }
        : { [ `${ prefix }${ imp }grow-0` ]: true } ;
} ;

/**
 * Generates responsive flex grow class definitions.
 *
 * @param {number | string | boolean | import('../sizing/sizes').ResponsiveSize} value - Grow or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/flex-grow
 *
 * @example
 * ```js
 * getFlexGrow( true ) ;
 * // → { 'grow': true }
 *
 * getFlexGrow( 0 ) ;
 * // → { 'grow-0': true }
 * ```
 */
const getFlexGrow = getResponsiveDefinition( create , value => validValues.includes( value ) ) ;

export default getFlexGrow ;

/* Tailwindcss safe list
| --------XS--------- | --------SM----------- | --------MD----------- | --------LG----------- | --------XL----------- | --------XXL----------- |
| grow                | sm:grow               | md:grow               | lg:grow               | xl:grow               | 2xl:grow               |
| grow-0              | sm:grow-0             | md:grow-0             | lg:grow-0             | xl:grow-0             | 2xl:grow-0             |
*/