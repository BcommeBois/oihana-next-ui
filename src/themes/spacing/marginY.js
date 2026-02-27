import getMargin , { VERTICAL } from './margin' ;

/**
 * Generates responsive vertical margin class definitions.
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
 * getMarginY( 4 ) ;
 * // → { 'my-4': true }
 *
 * getMarginY( { xs: 2 , md: 4 } ) ;
 * // → { 'my-2': true , 'md:my-4': true }
 * ```
 */
export const getMarginY = ( value , options = {} ) =>
    getMargin( value , { ...options , direction: VERTICAL } ) ;

export default getMarginY ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| my-auto  | sm:my-auto | md:my-auto | lg:my-auto | xl:my-auto | 2xl:my-auto |
| my-px    | sm:my-px   | md:my-px   | lg:my-px   | xl:my-px   | 2xl:my-px   |
| my-0     | sm:my-0    | md:my-0    | lg:my-0    | xl:my-0    | 2xl:my-0    |
| my-0.5   | sm:my-0.5  | md:my-0.5  | lg:my-0.5  | xl:my-0.5  | 2xl:my-0.5  |
| my-1     | sm:my-1    | md:my-1    | lg:my-1    | xl:my-1    | 2xl:my-1    |
| my-1.5   | sm:my-1.5  | md:my-1.5  | lg:my-1.5  | xl:my-1.5  | 2xl:my-1.5  |
| my-2     | sm:my-2    | md:my-2    | lg:my-2    | xl:my-2    | 2xl:my-2    |
| my-2.5   | sm:my-2.5  | md:my-2.5  | lg:my-2.5  | xl:my-2.5  | 2xl:my-2.5  |
| my-3     | sm:my-3    | md:my-3    | lg:my-3    | xl:my-3    | 2xl:my-3    |
| my-3.5   | sm:my-3.5  | md:my-3.5  | lg:my-3.5  | xl:my-3.5  | 2xl:my-3.5  |
| my-4     | sm:my-4    | md:my-4    | lg:my-4    | xl:my-4    | 2xl:my-4    |
| my-5     | sm:my-5    | md:my-5    | lg:my-5    | xl:my-5    | 2xl:my-5    |
| my-6     | sm:my-6    | md:my-6    | lg:my-6    | xl:my-6    | 2xl:my-6    |
| my-7     | sm:my-7    | md:my-7    | lg:my-7    | xl:my-7    | 2xl:my-7    |
| my-8     | sm:my-8    | md:my-8    | lg:my-8    | xl:my-8    | 2xl:my-8    |
| my-9     | sm:my-9    | md:my-9    | lg:my-9    | xl:my-9    | 2xl:my-9    |
| my-10    | sm:my-10   | md:my-10   | lg:my-10   | xl:my-10   | 2xl:my-10   |
| my-11    | sm:my-11   | md:my-11   | lg:my-11   | xl:my-11   | 2xl:my-11   |
| my-12    | sm:my-12   | md:my-12   | lg:my-12   | xl:my-12   | 2xl:my-12   |
| my-14    | sm:my-14   | md:my-14   | lg:my-14   | xl:my-14   | 2xl:my-14   |
| my-16    | sm:my-16   | md:my-16   | lg:my-16   | xl:my-16   | 2xl:my-16   |
| my-20    | sm:my-20   | md:my-20   | lg:my-20   | xl:my-20   | 2xl:my-20   |
| my-24    | sm:my-24   | md:my-24   | lg:my-24   | xl:my-24   | 2xl:my-24   |
| my-28    | sm:my-28   | md:my-28   | lg:my-28   | xl:my-28   | 2xl:my-28   |
| my-32    | sm:my-32   | md:my-32   | lg:my-32   | xl:my-32   | 2xl:my-32   |
| my-36    | sm:my-36   | md:my-36   | lg:my-36   | xl:my-36   | 2xl:my-36   |
| my-40    | sm:my-40   | md:my-40   | lg:my-40   | xl:my-40   | 2xl:my-40   |
| my-44    | sm:my-44   | md:my-44   | lg:my-44   | xl:my-44   | 2xl:my-44   |
| my-48    | sm:my-48   | md:my-48   | lg:my-48   | xl:my-48   | 2xl:my-48   |
| my-52    | sm:my-52   | md:my-52   | lg:my-52   | xl:my-52   | 2xl:my-52   |
| my-56    | sm:my-56   | md:my-56   | lg:my-56   | xl:my-56   | 2xl:my-56   |
| my-60    | sm:my-60   | md:my-60   | lg:my-60   | xl:my-60   | 2xl:my-60   |
| my-64    | sm:my-64   | md:my-64   | lg:my-64   | xl:my-64   | 2xl:my-64   |
| my-72    | sm:my-72   | md:my-72   | lg:my-72   | xl:my-72   | 2xl:my-72   |
| my-80    | sm:my-80   | md:my-80   | lg:my-80   | xl:my-80   | 2xl:my-80   |
| my-96    | sm:my-96   | md:my-96   | lg:my-96   | xl:my-96   | 2xl:my-96   |
*/