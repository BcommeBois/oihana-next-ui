import getOverflow , { VERTICAL } from './overflow' ;

/**
 * Generates responsive vertical overflow class definitions.
 *
 * @param {import('./overflow').OverflowValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/overflow
 *
 * @example
 * ```js
 * getOverflowY( 'scroll' ) ;
 * // → { 'overflow-y-scroll': true }
 * ```
 */
export const getOverflowY = ( value , options = {} ) =>
    getOverflow( value , { ...options , direction: VERTICAL } ) ;

export default getOverflowY ;

/* Tailwindcss safe list
| --------XS------------ | --------SM-------------- | --------MD-------------- | --------LG-------------- | --------XL-------------- | --------XXL-------------- |
| overflow-y-auto        | sm:overflow-y-auto       | md:overflow-y-auto       | lg:overflow-y-auto       | xl:overflow-y-auto       | 2xl:overflow-y-auto       |
| overflow-y-clip        | sm:overflow-y-clip       | md:overflow-y-clip       | lg:overflow-y-clip       | xl:overflow-y-clip       | 2xl:overflow-y-clip       |
| overflow-y-hidden      | sm:overflow-y-hidden     | md:overflow-y-hidden     | lg:overflow-y-hidden     | xl:overflow-y-hidden     | 2xl:overflow-y-hidden     |
| overflow-y-scroll      | sm:overflow-y-scroll     | md:overflow-y-scroll     | lg:overflow-y-scroll     | xl:overflow-y-scroll     | 2xl:overflow-y-scroll     |
| overflow-y-visible     | sm:overflow-y-visible    | md:overflow-y-visible    | lg:overflow-y-visible    | xl:overflow-y-visible    | 2xl:overflow-y-visible    |
*/