import getMargin , { END } from './margin' ;

/**
 * Generates responsive end (inline-end) margin class definitions.
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
 * getMarginEnd( 4 ) ;
 * // → { 'me-4': true }
 *
 * getMarginEnd( { xs: 2 , md: 4 } ) ;
 * // → { 'me-2': true , 'md:me-4': true }
 * ```
 */
export const getMarginEnd = ( value , options = {} ) =>
    getMargin( value , { ...options , direction: END } ) ;

export default getMarginEnd ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| me-auto  | sm:me-auto | md:me-auto | lg:me-auto | xl:me-auto | 2xl:me-auto |
| me-px    | sm:me-px   | md:me-px   | lg:me-px   | xl:me-px   | 2xl:me-px   |
| me-0     | sm:me-0    | md:me-0    | lg:me-0    | xl:me-0    | 2xl:me-0    |
| me-0.5   | sm:me-0.5  | md:me-0.5  | lg:me-0.5  | xl:me-0.5  | 2xl:me-0.5  |
| me-1     | sm:me-1    | md:me-1    | lg:me-1    | xl:me-1    | 2xl:me-1    |
| me-1.5   | sm:me-1.5  | md:me-1.5  | lg:me-1.5  | xl:me-1.5  | 2xl:me-1.5  |
| me-2     | sm:me-2    | md:me-2    | lg:me-2    | xl:me-2    | 2xl:me-2    |
| me-2.5   | sm:me-2.5  | md:me-2.5  | lg:me-2.5  | xl:me-2.5  | 2xl:me-2.5  |
| me-3     | sm:me-3    | md:me-3    | lg:me-3    | xl:me-3    | 2xl:me-3    |
| me-3.5   | sm:me-3.5  | md:me-3.5  | lg:me-3.5  | xl:me-3.5  | 2xl:me-3.5  |
| me-4     | sm:me-4    | md:me-4    | lg:me-4    | xl:me-4    | 2xl:me-4    |
| me-5     | sm:me-5    | md:me-5    | lg:me-5    | xl:me-5    | 2xl:me-5    |
| me-6     | sm:me-6    | md:me-6    | lg:me-6    | xl:me-6    | 2xl:me-6    |
| me-7     | sm:me-7    | md:me-7    | lg:me-7    | xl:me-7    | 2xl:me-7    |
| me-8     | sm:me-8    | md:me-8    | lg:me-8    | xl:me-8    | 2xl:me-8    |
| me-9     | sm:me-9    | md:me-9    | lg:me-9    | xl:me-9    | 2xl:me-9    |
| me-10    | sm:me-10   | md:me-10   | lg:me-10   | xl:me-10   | 2xl:me-10   |
| me-11    | sm:me-11   | md:me-11   | lg:me-11   | xl:me-11   | 2xl:me-11   |
| me-12    | sm:me-12   | md:me-12   | lg:me-12   | xl:me-12   | 2xl:me-12   |
| me-14    | sm:me-14   | md:me-14   | lg:me-14   | xl:me-14   | 2xl:me-14   |
| me-16    | sm:me-16   | md:me-16   | lg:me-16   | xl:me-16   | 2xl:me-16   |
| me-20    | sm:me-20   | md:me-20   | lg:me-20   | xl:me-20   | 2xl:me-20   |
| me-24    | sm:me-24   | md:me-24   | lg:me-24   | xl:me-24   | 2xl:me-24   |
| me-28    | sm:me-28   | md:me-28   | lg:me-28   | xl:me-28   | 2xl:me-28   |
| me-32    | sm:me-32   | md:me-32   | lg:me-32   | xl:me-32   | 2xl:me-32   |
| me-36    | sm:me-36   | md:me-36   | lg:me-36   | xl:me-36   | 2xl:me-36   |
| me-40    | sm:me-40   | md:me-40   | lg:me-40   | xl:me-40   | 2xl:me-40   |
| me-44    | sm:me-44   | md:me-44   | lg:me-44   | xl:me-44   | 2xl:me-44   |
| me-48    | sm:me-48   | md:me-48   | lg:me-48   | xl:me-48   | 2xl:me-48   |
| me-52    | sm:me-52   | md:me-52   | lg:me-52   | xl:me-52   | 2xl:me-52   |
| me-56    | sm:me-56   | md:me-56   | lg:me-56   | xl:me-56   | 2xl:me-56   |
| me-60    | sm:me-60   | md:me-60   | lg:me-60   | xl:me-60   | 2xl:me-60   |
| me-64    | sm:me-64   | md:me-64   | lg:me-64   | xl:me-64   | 2xl:me-64   |
| me-72    | sm:me-72   | md:me-72   | lg:me-72   | xl:me-72   | 2xl:me-72   |
| me-80    | sm:me-80   | md:me-80   | lg:me-80   | xl:me-80   | 2xl:me-80   |
| me-96    | sm:me-96   | md:me-96   | lg:me-96   | xl:me-96   | 2xl:me-96   |
*/