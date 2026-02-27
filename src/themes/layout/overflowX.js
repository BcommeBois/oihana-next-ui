import getOverflow , { HORIZONTAL } from './overflow' ;

/**
 * Generates responsive horizontal overflow class definitions.
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
 * getOverflowX( 'auto' ) ;
 * // → { 'overflow-x-auto': true }
 * ```
 */
export const getOverflowX = ( value , options = {} ) =>
    getOverflow( value , { ...options , direction: HORIZONTAL } ) ;

export default getOverflowX ;

/* Tailwindcss safe list
| --------XS------------ | --------SM-------------- | --------MD-------------- | --------LG-------------- | --------XL-------------- | --------XXL-------------- |
| overflow-x-auto        | sm:overflow-x-auto       | md:overflow-x-auto       | lg:overflow-x-auto       | xl:overflow-x-auto       | 2xl:overflow-x-auto       |
| overflow-x-clip        | sm:overflow-x-clip       | md:overflow-x-clip       | lg:overflow-x-clip       | xl:overflow-x-clip       | 2xl:overflow-x-clip       |
| overflow-x-hidden      | sm:overflow-x-hidden     | md:overflow-x-hidden     | lg:overflow-x-hidden     | xl:overflow-x-hidden     | 2xl:overflow-x-hidden     |
| overflow-x-scroll      | sm:overflow-x-scroll     | md:overflow-x-scroll     | lg:overflow-x-scroll     | xl:overflow-x-scroll     | 2xl:overflow-x-scroll     |
| overflow-x-visible     | sm:overflow-x-visible    | md:overflow-x-visible    | lg:overflow-x-visible    | xl:overflow-x-visible    | 2xl:overflow-x-visible    |
*/