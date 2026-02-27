/**
 * Flex shrink utilities for Tailwind CSS.
 *
 * @module themes/layout/flexShrink
 */

import getResponsiveDefinition from '../helpers/getResponsiveDefinition' ;

/**
 * Valid flex shrink values.
 *
 * `true` generates the base `shrink` class (shrink: 1).
 *
 * @type {(number | string | boolean)[]}
 */
export const validValues = [ 0 , 1 , '0' , '1' , true ] ;

/**
 * Creates a flex shrink class definition.
 *
 * @param {number | string | boolean} value - Shrink value. `true` for default (1).
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
        ? { [ `${ prefix }${ imp }shrink` ]: true }
        : { [ `${ prefix }${ imp }shrink-0` ]: true } ;
} ;

/**
 * Generates responsive flex shrink class definitions.
 *
 * @param {number | string | boolean | import('../sizing/sizes').ResponsiveSize} value - Shrink or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/flex-shrink
 *
 * @example
 * ```js
 * getFlexShrink( true ) ;
 * // → { 'shrink': true }
 *
 * getFlexShrink( 0 ) ;
 * // → { 'shrink-0': true }
 * ```
 */
const getFlexShrink = getResponsiveDefinition( create , value => validValues.includes( value ) ) ;

export default getFlexShrink ;

/* Tailwindcss safe list
| --------XS--------- | --------SM----------- | --------MD----------- | --------LG----------- | --------XL----------- | --------XXL----------- |
| shrink              | sm:shrink             | md:shrink             | lg:shrink             | xl:shrink             | 2xl:shrink             |
| shrink-0            | sm:shrink-0           | md:shrink-0           | lg:shrink-0           | xl:shrink-0           | 2xl:shrink-0           |
*/