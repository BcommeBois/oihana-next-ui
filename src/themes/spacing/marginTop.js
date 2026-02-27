import getMargin , { TOP } from './margin' ;

/**
 * Generates responsive top margin class definitions.
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
 * getMarginTop( 4 ) ;
 * // → { 'mt-4': true }
 *
 * getMarginTop( { xs: 2 , md: 4 } ) ;
 * // → { 'mt-2': true , 'md:mt-4': true }
 * ```
 */
export const getMarginTop = ( value , options = {} ) =>
    getMargin( value , { ...options , direction: TOP } ) ;

export default getMarginTop ;


/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| mt-auto  | sm:mt-auto | md:mt-auto | lg:mt-auto | xl:mt-auto | 2xl:mt-auto |
| mt-px    | sm:mt-px   | md:mt-px   | lg:mt-px   | xl:mt-px   | 2xl:mt-px   |
| mt-0     | sm:mt-0    | md:mt-0    | lg:mt-0    | xl:mt-0    | 2xl:mt-0    |
| mt-0.5   | sm:mt-0.5  | md:mt-0.5  | lg:mt-0.5  | xl:mt-0.5  | 2xl:mt-0.5  |
| mt-1     | sm:mt-1    | md:mt-1    | lg:mt-1    | xl:mt-1    | 2xl:mt-1    |
| mt-1.5   | sm:mt-1.5  | md:mt-1.5  | lg:mt-1.5  | xl:mt-1.5  | 2xl:mt-1.5  |
| mt-2     | sm:mt-2    | md:mt-2    | lg:mt-2    | xl:mt-2    | 2xl:mt-2    |
| mt-2.5   | sm:mt-2.5  | md:mt-2.5  | lg:mt-2.5  | xl:mt-2.5  | 2xl:mt-2.5  |
| mt-3     | sm:mt-3    | md:mt-3    | lg:mt-3    | xl:mt-3    | 2xl:mt-3    |
| mt-3.5   | sm:mt-3.5  | md:mt-3.5  | lg:mt-3.5  | xl:mt-3.5  | 2xl:mt-3.5  |
| mt-4     | sm:mt-4    | md:mt-4    | lg:mt-4    | xl:mt-4    | 2xl:mt-4    |
| mt-5     | sm:mt-5    | md:mt-5    | lg:mt-5    | xl:mt-5    | 2xl:mt-5    |
| mt-6     | sm:mt-6    | md:mt-6    | lg:mt-6    | xl:mt-6    | 2xl:mt-6    |
| mt-7     | sm:mt-7    | md:mt-7    | lg:mt-7    | xl:mt-7    | 2xl:mt-7    |
| mt-8     | sm:mt-8    | md:mt-8    | lg:mt-8    | xl:mt-8    | 2xl:mt-8    |
| mt-9     | sm:mt-9    | md:mt-9    | lg:mt-9    | xl:mt-9    | 2xl:mt-9    |
| mt-10    | sm:mt-10   | md:mt-10   | lg:mt-10   | xl:mt-10   | 2xl:mt-10   |
| mt-11    | sm:mt-11   | md:mt-11   | lg:mt-11   | xl:mt-11   | 2xl:mt-11   |
| mt-12    | sm:mt-12   | md:mt-12   | lg:mt-12   | xl:mt-12   | 2xl:mt-12   |
| mt-14    | sm:mt-14   | md:mt-14   | lg:mt-14   | xl:mt-14   | 2xl:mt-14   |
| mt-16    | sm:mt-16   | md:mt-16   | lg:mt-16   | xl:mt-16   | 2xl:mt-16   |
| mt-20    | sm:mt-20   | md:mt-20   | lg:mt-20   | xl:mt-20   | 2xl:mt-20   |
| mt-24    | sm:mt-24   | md:mt-24   | lg:mt-24   | xl:mt-24   | 2xl:mt-24   |
| mt-28    | sm:mt-28   | md:mt-28   | lg:mt-28   | xl:mt-28   | 2xl:mt-28   |
| mt-32    | sm:mt-32   | md:mt-32   | lg:mt-32   | xl:mt-32   | 2xl:mt-32   |
| mt-36    | sm:mt-36   | md:mt-36   | lg:mt-36   | xl:mt-36   | 2xl:mt-36   |
| mt-40    | sm:mt-40   | md:mt-40   | lg:mt-40   | xl:mt-40   | 2xl:mt-40   |
| mt-44    | sm:mt-44   | md:mt-44   | lg:mt-44   | xl:mt-44   | 2xl:mt-44   |
| mt-48    | sm:mt-48   | md:mt-48   | lg:mt-48   | xl:mt-48   | 2xl:mt-48   |
| mt-52    | sm:mt-52   | md:mt-52   | lg:mt-52   | xl:mt-52   | 2xl:mt-52   |
| mt-56    | sm:mt-56   | md:mt-56   | lg:mt-56   | xl:mt-56   | 2xl:mt-56   |
| mt-60    | sm:mt-60   | md:mt-60   | lg:mt-60   | xl:mt-60   | 2xl:mt-60   |
| mt-64    | sm:mt-64   | md:mt-64   | lg:mt-64   | xl:mt-64   | 2xl:mt-64   |
| mt-72    | sm:mt-72   | md:mt-72   | lg:mt-72   | xl:mt-72   | 2xl:mt-72   |
| mt-80    | sm:mt-80   | md:mt-80   | lg:mt-80   | xl:mt-80   | 2xl:mt-80   |
| mt-96    | sm:mt-96   | md:mt-96   | lg:mt-96   | xl:mt-96   | 2xl:mt-96   |
*/