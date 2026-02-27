import getMargin , { LEFT } from './margin' ;

/**
 * Generates responsive left margin class definitions.
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
 * getMarginLeft( 4 ) ;
 * // → { 'ml-4': true }
 *
 * getMarginLeft( { xs: 2 , md: 4 } ) ;
 * // → { 'ml-2': true , 'md:ml-4': true }
 * ```
 */
export const getMarginLeft = ( value , options = {} ) =>
    getMargin( value , { ...options , direction: LEFT } ) ;

export default getMarginLeft ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| ml-auto  | sm:ml-auto | md:ml-auto | lg:ml-auto | xl:ml-auto | 2xl:ml-auto |
| ml-px    | sm:ml-px   | md:ml-px   | lg:ml-px   | xl:ml-px   | 2xl:ml-px   |
| ml-0     | sm:ml-0    | md:ml-0    | lg:ml-0    | xl:ml-0    | 2xl:ml-0    |
| ml-0.5   | sm:ml-0.5  | md:ml-0.5  | lg:ml-0.5  | xl:ml-0.5  | 2xl:ml-0.5  |
| ml-1     | sm:ml-1    | md:ml-1    | lg:ml-1    | xl:ml-1    | 2xl:ml-1    |
| ml-1.5   | sm:ml-1.5  | md:ml-1.5  | lg:ml-1.5  | xl:ml-1.5  | 2xl:ml-1.5  |
| ml-2     | sm:ml-2    | md:ml-2    | lg:ml-2    | xl:ml-2    | 2xl:ml-2    |
| ml-2.5   | sm:ml-2.5  | md:ml-2.5  | lg:ml-2.5  | xl:ml-2.5  | 2xl:ml-2.5  |
| ml-3     | sm:ml-3    | md:ml-3    | lg:ml-3    | xl:ml-3    | 2xl:ml-3    |
| ml-3.5   | sm:ml-3.5  | md:ml-3.5  | lg:ml-3.5  | xl:ml-3.5  | 2xl:ml-3.5  |
| ml-4     | sm:ml-4    | md:ml-4    | lg:ml-4    | xl:ml-4    | 2xl:ml-4    |
| ml-5     | sm:ml-5    | md:ml-5    | lg:ml-5    | xl:ml-5    | 2xl:ml-5    |
| ml-6     | sm:ml-6    | md:ml-6    | lg:ml-6    | xl:ml-6    | 2xl:ml-6    |
| ml-7     | sm:ml-7    | md:ml-7    | lg:ml-7    | xl:ml-7    | 2xl:ml-7    |
| ml-8     | sm:ml-8    | md:ml-8    | lg:ml-8    | xl:ml-8    | 2xl:ml-8    |
| ml-9     | sm:ml-9    | md:ml-9    | lg:ml-9    | xl:ml-9    | 2xl:ml-9    |
| ml-10    | sm:ml-10   | md:ml-10   | lg:ml-10   | xl:ml-10   | 2xl:ml-10   |
| ml-11    | sm:ml-11   | md:ml-11   | lg:ml-11   | xl:ml-11   | 2xl:ml-11   |
| ml-12    | sm:ml-12   | md:ml-12   | lg:ml-12   | xl:ml-12   | 2xl:ml-12   |
| ml-14    | sm:ml-14   | md:ml-14   | lg:ml-14   | xl:ml-14   | 2xl:ml-14   |
| ml-16    | sm:ml-16   | md:ml-16   | lg:ml-16   | xl:ml-16   | 2xl:ml-16   |
| ml-20    | sm:ml-20   | md:ml-20   | lg:ml-20   | xl:ml-20   | 2xl:ml-20   |
| ml-24    | sm:ml-24   | md:ml-24   | lg:ml-24   | xl:ml-24   | 2xl:ml-24   |
| ml-28    | sm:ml-28   | md:ml-28   | lg:ml-28   | xl:ml-28   | 2xl:ml-28   |
| ml-32    | sm:ml-32   | md:ml-32   | lg:ml-32   | xl:ml-32   | 2xl:ml-32   |
| ml-36    | sm:ml-36   | md:ml-36   | lg:ml-36   | xl:ml-36   | 2xl:ml-36   |
| ml-40    | sm:ml-40   | md:ml-40   | lg:ml-40   | xl:ml-40   | 2xl:ml-40   |
| ml-44    | sm:ml-44   | md:ml-44   | lg:ml-44   | xl:ml-44   | 2xl:ml-44   |
| ml-48    | sm:ml-48   | md:ml-48   | lg:ml-48   | xl:ml-48   | 2xl:ml-48   |
| ml-52    | sm:ml-52   | md:ml-52   | lg:ml-52   | xl:ml-52   | 2xl:ml-52   |
| ml-56    | sm:ml-56   | md:ml-56   | lg:ml-56   | xl:ml-56   | 2xl:ml-56   |
| ml-60    | sm:ml-60   | md:ml-60   | lg:ml-60   | xl:ml-60   | 2xl:ml-60   |
| ml-64    | sm:ml-64   | md:ml-64   | lg:ml-64   | xl:ml-64   | 2xl:ml-64   |
| ml-72    | sm:ml-72   | md:ml-72   | lg:ml-72   | xl:ml-72   | 2xl:ml-72   |
| ml-80    | sm:ml-80   | md:ml-80   | lg:ml-80   | xl:ml-80   | 2xl:ml-80   |
| ml-96    | sm:ml-96   | md:ml-96   | lg:ml-96   | xl:ml-96   | 2xl:ml-96   |
*/