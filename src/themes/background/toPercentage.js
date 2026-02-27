/**
 * Gradient ending position utilities for Tailwind CSS.
 *
 * @module themes/backgrounds/toPercentage
 * @see https://tailwindcss.com/docs/background-image#linear-gradients
 *
 * @safelist
 * to-0% to-5% to-10% to-15% to-20% to-25% to-30%
 * to-35% to-40% to-45% to-50% to-55% to-60% to-65%
 * to-70% to-75% to-80% to-85% to-90% to-95% to-100%
 */

import percentages from '../enums/percentages' ;

/**
 * Generates gradient ending position class definition.
 *
 * @param {import('../enums/percentages').Percentage} value - Percentage value.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getToPercentage( '100%' ) ;
 * // → { 'to-100%': true }
 * ```
 */
const getToPercentage = ( value ) =>
    percentages.includes( value ) ? { [`to-${ value }`] : true } : {} ;

export default getToPercentage ;