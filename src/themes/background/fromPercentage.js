/**
 * Gradient starting position utilities for Tailwind CSS.
 *
 * @module themes/backgrounds/fromPercentage
 * @see https://tailwindcss.com/docs/background-image#linear-gradients
 *
 * @safelist
 * from-0% from-5% from-10% from-15% from-20% from-25% from-30%
 * from-35% from-40% from-45% from-50% from-55% from-60% from-65%
 * from-70% from-75% from-80% from-85% from-90% from-95% from-100%
 */

import percentages from '../enums/percentages' ;

/**
 * Generates gradient starting position class definition.
 *
 * @param {import('../enums/percentages').Percentage} value - Percentage value.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getFromPercentage( '60%' ) ;
 * // → { 'from-60%': true }
 * ```
 */
const getFromPercentage = ( value ) =>
    percentages.includes( value ) ? { [`from-${ value }`] : true } : {} ;

export default getFromPercentage ;