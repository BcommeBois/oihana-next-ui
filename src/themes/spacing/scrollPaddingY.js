import getScrollPadding , { VERTICAL } from './scrollPadding' ;

/**
 * Generates responsive vertical (block) scroll padding class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Scroll padding value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/scroll-padding
 *
 * @example
 * ```js
 * getScrollPaddingY( 4 ) ;
 * // → { 'scroll-py-4': true }
 *
 * getScrollPaddingY( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-py-2': true , 'md:scroll-py-4': true }
 * ```
 */
export const getScrollPaddingY = ( value , options = {} ) =>
    getScrollPadding( value , { ...options , direction: VERTICAL } ) ;

export default getScrollPaddingY ;

/* Tailwindcss safe list
| -------XS------- | --------SM-------- | --------MD-------- | --------LG-------- | --------XL-------— | --------XXL-------- |
| scroll-py-px     | sm:scroll-py-px    | md:scroll-py-px    | lg:scroll-py-px    | xl:scroll-py-px    | 2xl:scroll-py-px    |
| scroll-py-0      | sm:scroll-py-0     | md:scroll-py-0     | lg:scroll-py-0     | xl:scroll-py-0     | 2xl:scroll-py-0     |
| scroll-py-0.5    | sm:scroll-py-0.5   | md:scroll-py-0.5   | lg:scroll-py-0.5   | xl:scroll-py-0.5   | 2xl:scroll-py-0.5   |
| scroll-py-1      | sm:scroll-py-1     | md:scroll-py-1     | lg:scroll-py-1     | xl:scroll-py-1     | 2xl:scroll-py-1     |
| scroll-py-1.5    | sm:scroll-py-1.5   | md:scroll-py-1.5   | lg:scroll-py-1.5   | xl:scroll-py-1.5   | 2xl:scroll-py-1.5   |
| scroll-py-2      | sm:scroll-py-2     | md:scroll-py-2     | lg:scroll-py-2     | xl:scroll-py-2     | 2xl:scroll-py-2     |
| scroll-py-2.5    | sm:scroll-py-2.5   | md:scroll-py-2.5   | lg:scroll-py-2.5   | xl:scroll-py-2.5   | 2xl:scroll-py-2.5   |
| scroll-py-3      | sm:scroll-py-3     | md:scroll-py-3     | lg:scroll-py-3     | xl:scroll-py-3     | 2xl:scroll-py-3     |
| scroll-py-3.5    | sm:scroll-py-3.5   | md:scroll-py-3.5   | lg:scroll-py-3.5   | xl:scroll-py-3.5   | 2xl:scroll-py-3.5   |
| scroll-py-4      | sm:scroll-py-4     | md:scroll-py-4     | lg:scroll-py-4     | xl:scroll-py-4     | 2xl:scroll-py-4     |
| scroll-py-5      | sm:scroll-py-5     | md:scroll-py-5     | lg:scroll-py-5     | xl:scroll-py-5     | 2xl:scroll-py-5     |
| scroll-py-6      | sm:scroll-py-6     | md:scroll-py-6     | lg:scroll-py-6     | xl:scroll-py-6     | 2xl:scroll-py-6     |
| scroll-py-7      | sm:scroll-py-7     | md:scroll-py-7     | lg:scroll-py-7     | xl:scroll-py-7     | 2xl:scroll-py-7     |
| scroll-py-8      | sm:scroll-py-8     | md:scroll-py-8     | lg:scroll-py-8     | xl:scroll-py-8     | 2xl:scroll-py-8     |
| scroll-py-9      | sm:scroll-py-9     | md:scroll-py-9     | lg:scroll-py-9     | xl:scroll-py-9     | 2xl:scroll-py-9     |
| scroll-py-10     | sm:scroll-py-10    | md:scroll-py-10    | lg:scroll-py-10    | xl:scroll-py-10    | 2xl:scroll-py-10    |
| scroll-py-11     | sm:scroll-py-11    | md:scroll-py-11    | lg:scroll-py-11    | xl:scroll-py-11    | 2xl:scroll-py-11    |
| scroll-py-12     | sm:scroll-py-12    | md:scroll-py-12    | lg:scroll-py-12    | xl:scroll-py-12    | 2xl:scroll-py-12    |
| scroll-py-14     | sm:scroll-py-14    | md:scroll-py-14    | lg:scroll-py-14    | xl:scroll-py-14    | 2xl:scroll-py-14    |
| scroll-py-16     | sm:scroll-py-16    | md:scroll-py-16    | lg:scroll-py-16    | xl:scroll-py-16    | 2xl:scroll-py-16    |
| scroll-py-20     | sm:scroll-py-20    | md:scroll-py-20    | lg:scroll-py-20    | xl:scroll-py-20    | 2xl:scroll-py-20    |
| scroll-py-24     | sm:scroll-py-24    | md:scroll-py-24    | lg:scroll-py-24    | xl:scroll-py-24    | 2xl:scroll-py-24    |
| scroll-py-28     | sm:scroll-py-28    | md:scroll-py-28    | lg:scroll-py-28    | xl:scroll-py-28    | 2xl:scroll-py-28    |
| scroll-py-32     | sm:scroll-py-32    | md:scroll-py-32    | lg:scroll-py-32    | xl:scroll-py-32    | 2xl:scroll-py-32    |
| scroll-py-36     | sm:scroll-py-36    | md:scroll-py-36    | lg:scroll-py-36    | xl:scroll-py-36    | 2xl:scroll-py-36    |
| scroll-py-40     | sm:scroll-py-40    | md:scroll-py-40    | lg:scroll-py-40    | xl:scroll-py-40    | 2xl:scroll-py-40    |
| scroll-py-44     | sm:scroll-py-44    | md:scroll-py-44    | lg:scroll-py-44    | xl:scroll-py-44    | 2xl:scroll-py-44    |
| scroll-py-48     | sm:scroll-py-48    | md:scroll-py-48    | lg:scroll-py-48    | xl:scroll-py-48    | 2xl:scroll-py-48    |
| scroll-py-52     | sm:scroll-py-52    | md:scroll-py-52    | lg:scroll-py-52    | xl:scroll-py-52    | 2xl:scroll-py-52    |
| scroll-py-56     | sm:scroll-py-56    | md:scroll-py-56    | lg:scroll-py-56    | xl:scroll-py-56    | 2xl:scroll-py-56    |
| scroll-py-60     | sm:scroll-py-60    | md:scroll-py-60    | lg:scroll-py-60    | xl:scroll-py-60    | 2xl:scroll-py-60    |
| scroll-py-64     | sm:scroll-py-64    | md:scroll-py-64    | lg:scroll-py-64    | xl:scroll-py-64    | 2xl:scroll-py-64    |
| scroll-py-72     | sm:scroll-py-72    | md:scroll-py-72    | lg:scroll-py-72    | xl:scroll-py-72    | 2xl:scroll-py-72    |
| scroll-py-80     | sm:scroll-py-80    | md:scroll-py-80    | lg:scroll-py-80    | xl:scroll-py-80    | 2xl:scroll-py-80    |
| scroll-py-96     | sm:scroll-py-96    | md:scroll-py-96    | lg:scroll-py-96    | xl:scroll-py-96    | 2xl:scroll-py-96    |
*/