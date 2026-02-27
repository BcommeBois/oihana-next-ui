import getMargin , { BOTTOM } from './margin' ;

/**
 * Generates responsive bottom margin class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Margin value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/margin
 *
 * @example
 * ```js
 * getMarginBottom( 4 ) ;
 * // → { 'mb-4': true }
 *
 * getMarginBottom( { xs: 2 , md: 4 } ) ;
 * // → { 'mb-2': true , 'md:mb-4': true }
 * ```
 */
export const getMarginBottom = ( value , options = {} ) =>
    getMargin( value , { ...options , direction: BOTTOM } ) ;

export default getMarginBottom ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| mb-auto  | sm:mb-auto | md:mb-auto | lg:mb-auto | xl:mb-auto | 2xl:mb-auto |
| mb-px    | sm:mb-px   | md:mb-px   | lg:mb-px   | xl:mb-px   | 2xl:mb-px   |
| mb-0     | sm:mb-0    | md:mb-0    | lg:mb-0    | xl:mb-0    | 2xl:mb-0    |
| mb-0.5   | sm:mb-0.5  | md:mb-0.5  | lg:mb-0.5  | xl:mb-0.5  | 2xl:mb-0.5  |
| mb-1     | sm:mb-1    | md:mb-1    | lg:mb-1    | xl:mb-1    | 2xl:mb-1    |
| mb-1.5   | sm:mb-1.5  | md:mb-1.5  | lg:mb-1.5  | xl:mb-1.5  | 2xl:mb-1.5  |
| mb-2     | sm:mb-2    | md:mb-2    | lg:mb-2    | xl:mb-2    | 2xl:mb-2    |
| mb-2.5   | sm:mb-2.5  | md:mb-2.5  | lg:mb-2.5  | xl:mb-2.5  | 2xl:mb-2.5  |
| mb-3     | sm:mb-3    | md:mb-3    | lg:mb-3    | xl:mb-3    | 2xl:mb-3    |
| mb-3.5   | sm:mb-3.5  | md:mb-3.5  | lg:mb-3.5  | xl:mb-3.5  | 2xl:mb-3.5  |
| mb-4     | sm:mb-4    | md:mb-4    | lg:mb-4    | xl:mb-4    | 2xl:mb-4    |
| mb-5     | sm:mb-5    | md:mb-5    | lg:mb-5    | xl:mb-5    | 2xl:mb-5    |
| mb-6     | sm:mb-6    | md:mb-6    | lg:mb-6    | xl:mb-6    | 2xl:mb-6    |
| mb-7     | sm:mb-7    | md:mb-7    | lg:mb-7    | xl:mb-7    | 2xl:mb-7    |
| mb-8     | sm:mb-8    | md:mb-8    | lg:mb-8    | xl:mb-8    | 2xl:mb-8    |
| mb-9     | sm:mb-9    | md:mb-9    | lg:mb-9    | xl:mb-9    | 2xl:mb-9    |
| mb-10    | sm:mb-10   | md:mb-10   | lg:mb-10   | xl:mb-10   | 2xl:mb-10   |
| mb-11    | sm:mb-11   | md:mb-11   | lg:mb-11   | xl:mb-11   | 2xl:mb-11   |
| mb-12    | sm:mb-12   | md:mb-12   | lg:mb-12   | xl:mb-12   | 2xl:mb-12   |
| mb-14    | sm:mb-14   | md:mb-14   | lg:mb-14   | xl:mb-14   | 2xl:mb-14   |
| mb-16    | sm:mb-16   | md:mb-16   | lg:mb-16   | xl:mb-16   | 2xl:mb-16   |
| mb-20    | sm:mb-20   | md:mb-20   | lg:mb-20   | xl:mb-20   | 2xl:mb-20   |
| mb-24    | sm:mb-24   | md:mb-24   | lg:mb-24   | xl:mb-24   | 2xl:mb-24   |
| mb-28    | sm:mb-28   | md:mb-28   | lg:mb-28   | xl:mb-28   | 2xl:mb-28   |
| mb-32    | sm:mb-32   | md:mb-32   | lg:mb-32   | xl:mb-32   | 2xl:mb-32   |
| mb-36    | sm:mb-36   | md:mb-36   | lg:mb-36   | xl:mb-36   | 2xl:mb-36   |
| mb-40    | sm:mb-40   | md:mb-40   | lg:mb-40   | xl:mb-40   | 2xl:mb-40   |
| mb-44    | sm:mb-44   | md:mb-44   | lg:mb-44   | xl:mb-44   | 2xl:mb-44   |
| mb-48    | sm:mb-48   | md:mb-48   | lg:mb-48   | xl:mb-48   | 2xl:mb-48   |
| mb-52    | sm:mb-52   | md:mb-52   | lg:mb-52   | xl:mb-52   | 2xl:mb-52   |
| mb-56    | sm:mb-56   | md:mb-56   | lg:mb-56   | xl:mb-56   | 2xl:mb-56   |
| mb-60    | sm:mb-60   | md:mb-60   | lg:mb-60   | xl:mb-60   | 2xl:mb-60   |
| mb-64    | sm:mb-64   | md:mb-64   | lg:mb-64   | xl:mb-64   | 2xl:mb-64   |
| mb-72    | sm:mb-72   | md:mb-72   | lg:mb-72   | xl:mb-72   | 2xl:mb-72   |
| mb-80    | sm:mb-80   | md:mb-80   | lg:mb-80   | xl:mb-80   | 2xl:mb-80   |
| mb-96    | sm:mb-96   | md:mb-96   | lg:mb-96   | xl:mb-96   | 2xl:mb-96   |
*/