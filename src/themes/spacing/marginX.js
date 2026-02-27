import getMargin , { HORIZONTAL } from './margin' ;

/**
 * Generates responsive horizontal margin class definitions.
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
 * getMarginX( 4 ) ;
 * // → { 'mx-4': true }
 *
 * getMarginX( { xs: 2 , md: 4 } ) ;
 * // → { 'mx-2': true , 'md:mx-4': true }
 * ```
 */
export const getMarginX = ( value , options = {} ) =>
    getMargin( value , { ...options , direction: HORIZONTAL } ) ;

export default getMarginX ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| mx-auto  | sm:mx-auto | md:mx-auto | lg:mx-auto | xl:mx-auto | 2xl:mx-auto |
| mx-px    | sm:mx-px   | md:mx-px   | lg:mx-px   | xl:mx-px   | 2xl:mx-px   |
| mx-0     | sm:mx-0    | md:mx-0    | lg:mx-0    | xl:mx-0    | 2xl:mx-0    |
| mx-0.5   | sm:mx-0.5  | md:mx-0.5  | lg:mx-0.5  | xl:mx-0.5  | 2xl:mx-0.5  |
| mx-1     | sm:mx-1    | md:mx-1    | lg:mx-1    | xl:mx-1    | 2xl:mx-1    |
| mx-1.5   | sm:mx-1.5  | md:mx-1.5  | lg:mx-1.5  | xl:mx-1.5  | 2xl:mx-1.5  |
| mx-2     | sm:mx-2    | md:mx-2    | lg:mx-2    | xl:mx-2    | 2xl:mx-2    |
| mx-2.5   | sm:mx-2.5  | md:mx-2.5  | lg:mx-2.5  | xl:mx-2.5  | 2xl:mx-2.5  |
| mx-3     | sm:mx-3    | md:mx-3    | lg:mx-3    | xl:mx-3    | 2xl:mx-3    |
| mx-3.5   | sm:mx-3.5  | md:mx-3.5  | lg:mx-3.5  | xl:mx-3.5  | 2xl:mx-3.5  |
| mx-4     | sm:mx-4    | md:mx-4    | lg:mx-4    | xl:mx-4    | 2xl:mx-4    |
| mx-5     | sm:mx-5    | md:mx-5    | lg:mx-5    | xl:mx-5    | 2xl:mx-5    |
| mx-6     | sm:mx-6    | md:mx-6    | lg:mx-6    | xl:mx-6    | 2xl:mx-6    |
| mx-7     | sm:mx-7    | md:mx-7    | lg:mx-7    | xl:mx-7    | 2xl:mx-7    |
| mx-8     | sm:mx-8    | md:mx-8    | lg:mx-8    | xl:mx-8    | 2xl:mx-8    |
| mx-9     | sm:mx-9    | md:mx-9    | lg:mx-9    | xl:mx-9    | 2xl:mx-9    |
| mx-10    | sm:mx-10   | md:mx-10   | lg:mx-10   | xl:mx-10   | 2xl:mx-10   |
| mx-11    | sm:mx-11   | md:mx-11   | lg:mx-11   | xl:mx-11   | 2xl:mx-11   |
| mx-12    | sm:mx-12   | md:mx-12   | lg:mx-12   | xl:mx-12   | 2xl:mx-12   |
| mx-14    | sm:mx-14   | md:mx-14   | lg:mx-14   | xl:mx-14   | 2xl:mx-14   |
| mx-16    | sm:mx-16   | md:mx-16   | lg:mx-16   | xl:mx-16   | 2xl:mx-16   |
| mx-20    | sm:mx-20   | md:mx-20   | lg:mx-20   | xl:mx-20   | 2xl:mx-20   |
| mx-24    | sm:mx-24   | md:mx-24   | lg:mx-24   | xl:mx-24   | 2xl:mx-24   |
| mx-28    | sm:mx-28   | md:mx-28   | lg:mx-28   | xl:mx-28   | 2xl:mx-28   |
| mx-32    | sm:mx-32   | md:mx-32   | lg:mx-32   | xl:mx-32   | 2xl:mx-32   |
| mx-36    | sm:mx-36   | md:mx-36   | lg:mx-36   | xl:mx-36   | 2xl:mx-36   |
| mx-40    | sm:mx-40   | md:mx-40   | lg:mx-40   | xl:mx-40   | 2xl:mx-40   |
| mx-44    | sm:mx-44   | md:mx-44   | lg:mx-44   | xl:mx-44   | 2xl:mx-44   |
| mx-48    | sm:mx-48   | md:mx-48   | lg:mx-48   | xl:mx-48   | 2xl:mx-48   |
| mx-52    | sm:mx-52   | md:mx-52   | lg:mx-52   | xl:mx-52   | 2xl:mx-52   |
| mx-56    | sm:mx-56   | md:mx-56   | lg:mx-56   | xl:mx-56   | 2xl:mx-56   |
| mx-60    | sm:mx-60   | md:mx-60   | lg:mx-60   | xl:mx-60   | 2xl:mx-60   |
| mx-64    | sm:mx-64   | md:mx-64   | lg:mx-64   | xl:mx-64   | 2xl:mx-64   |
| mx-72    | sm:mx-72   | md:mx-72   | lg:mx-72   | xl:mx-72   | 2xl:mx-72   |
| mx-80    | sm:mx-80   | md:mx-80   | lg:mx-80   | xl:mx-80   | 2xl:mx-80   |
| mx-96    | sm:mx-96   | md:mx-96   | lg:mx-96   | xl:mx-96   | 2xl:mx-96   |
*/