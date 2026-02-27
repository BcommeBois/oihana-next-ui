/**
 * Gradient middle position utilities for Tailwind CSS.
 *
 * @module themes/backgrounds/viaPercentage
 * @see https://tailwindcss.com/docs/background-image#linear-gradients
 *
 * @safelist
 * via-0% via-5% via-10% via-15% via-20% via-25% via-30%
 * via-35% via-40% via-45% via-50% via-55% via-60% via-65%
 * via-70% via-75% via-80% via-85% via-90% via-95% via-100%
 */

import percentages from '../enums/percentages' ;

/**
 * Generates gradient middle position class definition.
 *
 * @param {import('../enums/percentages').Percentage} value - Percentage value.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getViaPercentage( '50%' ) ;
 * // → { 'via-50%': true }
 * ```
 */
const getViaPercentage = ( value ) =>
    percentages.includes( value ) ? { [`via-${ value }`] : true } : {} ;

export default getViaPercentage ;