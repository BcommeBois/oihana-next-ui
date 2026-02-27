import getMargin , { RIGHT } from './margin' ;

/**
 * Generates responsive right margin class definitions.
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
 * getMarginRight( 4 ) ;
 * // → { 'mr-4': true }
 *
 * getMarginRight( { xs: 2 , md: 4 } ) ;
 * // → { 'mr-2': true , 'md:mr-4': true }
 * ```
 */
export const getMarginRight = ( value , options = {} ) =>
    getMargin( value , { ...options , direction: RIGHT } ) ;

export default getMarginRight ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| mr-auto  | sm:mr-auto | md:mr-auto | lg:mr-auto | xl:mr-auto | 2xl:mr-auto |
| mr-px    | sm:mr-px   | md:mr-px   | lg:mr-px   | xl:mr-px   | 2xl:mr-px   |
| mr-0     | sm:mr-0    | md:mr-0    | lg:mr-0    | xl:mr-0    | 2xl:mr-0    |
| mr-0.5   | sm:mr-0.5  | md:mr-0.5  | lg:mr-0.5  | xl:mr-0.5  | 2xl:mr-0.5  |
| mr-1     | sm:mr-1    | md:mr-1    | lg:mr-1    | xl:mr-1    | 2xl:mr-1    |
| mr-1.5   | sm:mr-1.5  | md:mr-1.5  | lg:mr-1.5  | xl:mr-1.5  | 2xl:mr-1.5  |
| mr-2     | sm:mr-2    | md:mr-2    | lg:mr-2    | xl:mr-2    | 2xl:mr-2    |
| mr-2.5   | sm:mr-2.5  | md:mr-2.5  | lg:mr-2.5  | xl:mr-2.5  | 2xl:mr-2.5  |
| mr-3     | sm:mr-3    | md:mr-3    | lg:mr-3    | xl:mr-3    | 2xl:mr-3    |
| mr-3.5   | sm:mr-3.5  | md:mr-3.5  | lg:mr-3.5  | xl:mr-3.5  | 2xl:mr-3.5  |
| mr-4     | sm:mr-4    | md:mr-4    | lg:mr-4    | xl:mr-4    | 2xl:mr-4    |
| mr-5     | sm:mr-5    | md:mr-5    | lg:mr-5    | xl:mr-5    | 2xl:mr-5    |
| mr-6     | sm:mr-6    | md:mr-6    | lg:mr-6    | xl:mr-6    | 2xl:mr-6    |
| mr-7     | sm:mr-7    | md:mr-7    | lg:mr-7    | xl:mr-7    | 2xl:mr-7    |
| mr-8     | sm:mr-8    | md:mr-8    | lg:mr-8    | xl:mr-8    | 2xl:mr-8    |
| mr-9     | sm:mr-9    | md:mr-9    | lg:mr-9    | xl:mr-9    | 2xl:mr-9    |
| mr-10    | sm:mr-10   | md:mr-10   | lg:mr-10   | xl:mr-10   | 2xl:mr-10   |
| mr-11    | sm:mr-11   | md:mr-11   | lg:mr-11   | xl:mr-11   | 2xl:mr-11   |
| mr-12    | sm:mr-12   | md:mr-12   | lg:mr-12   | xl:mr-12   | 2xl:mr-12   |
| mr-14    | sm:mr-14   | md:mr-14   | lg:mr-14   | xl:mr-14   | 2xl:mr-14   |
| mr-16    | sm:mr-16   | md:mr-16   | lg:mr-16   | xl:mr-16   | 2xl:mr-16   |
| mr-20    | sm:mr-20   | md:mr-20   | lg:mr-20   | xl:mr-20   | 2xl:mr-20   |
| mr-24    | sm:mr-24   | md:mr-24   | lg:mr-24   | xl:mr-24   | 2xl:mr-24   |
| mr-28    | sm:mr-28   | md:mr-28   | lg:mr-28   | xl:mr-28   | 2xl:mr-28   |
| mr-32    | sm:mr-32   | md:mr-32   | lg:mr-32   | xl:mr-32   | 2xl:mr-32   |
| mr-36    | sm:mr-36   | md:mr-36   | lg:mr-36   | xl:mr-36   | 2xl:mr-36   |
| mr-40    | sm:mr-40   | md:mr-40   | lg:mr-40   | xl:mr-40   | 2xl:mr-40   |
| mr-44    | sm:mr-44   | md:mr-44   | lg:mr-44   | xl:mr-44   | 2xl:mr-44   |
| mr-48    | sm:mr-48   | md:mr-48   | lg:mr-48   | xl:mr-48   | 2xl:mr-48   |
| mr-52    | sm:mr-52   | md:mr-52   | lg:mr-52   | xl:mr-52   | 2xl:mr-52   |
| mr-56    | sm:mr-56   | md:mr-56   | lg:mr-56   | xl:mr-56   | 2xl:mr-56   |
| mr-60    | sm:mr-60   | md:mr-60   | lg:mr-60   | xl:mr-60   | 2xl:mr-60   |
| mr-64    | sm:mr-64   | md:mr-64   | lg:mr-64   | xl:mr-64   | 2xl:mr-64   |
| mr-72    | sm:mr-72   | md:mr-72   | lg:mr-72   | xl:mr-72   | 2xl:mr-72   |
| mr-80    | sm:mr-80   | md:mr-80   | lg:mr-80   | xl:mr-80   | 2xl:mr-80   |
| mr-96    | sm:mr-96   | md:mr-96   | lg:mr-96   | xl:mr-96   | 2xl:mr-96   |
*/