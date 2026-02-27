import getMargin , { START } from './margin' ;

/**
 * Generates responsive start (inline-start) margin class definitions.
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
 * getMarginStart( 4 ) ;
 * // → { 'ms-4': true }
 *
 * getMarginStart( { xs: 2 , md: 4 } ) ;
 * // → { 'ms-2': true , 'md:ms-4': true }
 * ```
 */
export const getMarginStart = ( value , options = {} ) =>
    getMargin( value , { ...options , direction: START } ) ;

export default getMarginStart ;


/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| ms-auto  | sm:ms-auto | md:ms-auto | lg:ms-auto | xl:ms-auto | 2xl:ms-auto |
| ms-px    | sm:ms-px   | md:ms-px   | lg:ms-px   | xl:ms-px   | 2xl:ms-px   |
| ms-0     | sm:ms-0    | md:ms-0    | lg:ms-0    | xl:ms-0    | 2xl:ms-0    |
| ms-0.5   | sm:ms-0.5  | md:ms-0.5  | lg:ms-0.5  | xl:ms-0.5  | 2xl:ms-0.5  |
| ms-1     | sm:ms-1    | md:ms-1    | lg:ms-1    | xl:ms-1    | 2xl:ms-1    |
| ms-1.5   | sm:ms-1.5  | md:ms-1.5  | lg:ms-1.5  | xl:ms-1.5  | 2xl:ms-1.5  |
| ms-2     | sm:ms-2    | md:ms-2    | lg:ms-2    | xl:ms-2    | 2xl:ms-2    |
| ms-2.5   | sm:ms-2.5  | md:ms-2.5  | lg:ms-2.5  | xl:ms-2.5  | 2xl:ms-2.5  |
| ms-3     | sm:ms-3    | md:ms-3    | lg:ms-3    | xl:ms-3    | 2xl:ms-3    |
| ms-3.5   | sm:ms-3.5  | md:ms-3.5  | lg:ms-3.5  | xl:ms-3.5  | 2xl:ms-3.5  |
| ms-4     | sm:ms-4    | md:ms-4    | lg:ms-4    | xl:ms-4    | 2xl:ms-4    |
| ms-5     | sm:ms-5    | md:ms-5    | lg:ms-5    | xl:ms-5    | 2xl:ms-5    |
| ms-6     | sm:ms-6    | md:ms-6    | lg:ms-6    | xl:ms-6    | 2xl:ms-6    |
| ms-7     | sm:ms-7    | md:ms-7    | lg:ms-7    | xl:ms-7    | 2xl:ms-7    |
| ms-8     | sm:ms-8    | md:ms-8    | lg:ms-8    | xl:ms-8    | 2xl:ms-8    |
| ms-9     | sm:ms-9    | md:ms-9    | lg:ms-9    | xl:ms-9    | 2xl:ms-9    |
| ms-10    | sm:ms-10   | md:ms-10   | lg:ms-10   | xl:ms-10   | 2xl:ms-10   |
| ms-11    | sm:ms-11   | md:ms-11   | lg:ms-11   | xl:ms-11   | 2xl:ms-11   |
| ms-12    | sm:ms-12   | md:ms-12   | lg:ms-12   | xl:ms-12   | 2xl:ms-12   |
| ms-14    | sm:ms-14   | md:ms-14   | lg:ms-14   | xl:ms-14   | 2xl:ms-14   |
| ms-16    | sm:ms-16   | md:ms-16   | lg:ms-16   | xl:ms-16   | 2xl:ms-16   |
| ms-20    | sm:ms-20   | md:ms-20   | lg:ms-20   | xl:ms-20   | 2xl:ms-20   |
| ms-24    | sm:ms-24   | md:ms-24   | lg:ms-24   | xl:ms-24   | 2xl:ms-24   |
| ms-28    | sm:ms-28   | md:ms-28   | lg:ms-28   | xl:ms-28   | 2xl:ms-28   |
| ms-32    | sm:ms-32   | md:ms-32   | lg:ms-32   | xl:ms-32   | 2xl:ms-32   |
| ms-36    | sm:ms-36   | md:ms-36   | lg:ms-36   | xl:ms-36   | 2xl:ms-36   |
| ms-40    | sm:ms-40   | md:ms-40   | lg:ms-40   | xl:ms-40   | 2xl:ms-40   |
| ms-44    | sm:ms-44   | md:ms-44   | lg:ms-44   | xl:ms-44   | 2xl:ms-44   |
| ms-48    | sm:ms-48   | md:ms-48   | lg:ms-48   | xl:ms-48   | 2xl:ms-48   |
| ms-52    | sm:ms-52   | md:ms-52   | lg:ms-52   | xl:ms-52   | 2xl:ms-52   |
| ms-56    | sm:ms-56   | md:ms-56   | lg:ms-56   | xl:ms-56   | 2xl:ms-56   |
| ms-60    | sm:ms-60   | md:ms-60   | lg:ms-60   | xl:ms-60   | 2xl:ms-60   |
| ms-64    | sm:ms-64   | md:ms-64   | lg:ms-64   | xl:ms-64   | 2xl:ms-64   |
| ms-72    | sm:ms-72   | md:ms-72   | lg:ms-72   | xl:ms-72   | 2xl:ms-72   |
| ms-80    | sm:ms-80   | md:ms-80   | lg:ms-80   | xl:ms-80   | 2xl:ms-80   |
| ms-96    | sm:ms-96   | md:ms-96   | lg:ms-96   | xl:ms-96   | 2xl:ms-96   |
*/