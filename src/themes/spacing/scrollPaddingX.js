import getScrollPadding , { HORIZONTAL } from './scrollPadding' ;

/**
 * Generates responsive horizontal (inline) scroll padding class definitions.
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
 * getScrollPaddingX( 4 ) ;
 * // → { 'scroll-px-4': true }
 *
 * getScrollPaddingX( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-px-2': true , 'md:scroll-px-4': true }
 * ```
 */
export const getScrollPaddingX = ( value , options = {} ) =>
    getScrollPadding( value , { ...options , direction: HORIZONTAL } ) ;

export default getScrollPaddingX ;

/* Tailwindcss safe list
| -------XS------- | --------SM-------- | --------MD-------- | --------LG-------- | --------XL-------— | --------XXL-------- |
| scroll-px-px     | sm:scroll-px-px    | md:scroll-px-px    | lg:scroll-px-px    | xl:scroll-px-px    | 2xl:scroll-px-px    |
| scroll-px-0      | sm:scroll-px-0     | md:scroll-px-0     | lg:scroll-px-0     | xl:scroll-px-0     | 2xl:scroll-px-0     |
| scroll-px-0.5    | sm:scroll-px-0.5   | md:scroll-px-0.5   | lg:scroll-px-0.5   | xl:scroll-px-0.5   | 2xl:scroll-px-0.5   |
| scroll-px-1      | sm:scroll-px-1     | md:scroll-px-1     | lg:scroll-px-1     | xl:scroll-px-1     | 2xl:scroll-px-1     |
| scroll-px-1.5    | sm:scroll-px-1.5   | md:scroll-px-1.5   | lg:scroll-px-1.5   | xl:scroll-px-1.5   | 2xl:scroll-px-1.5   |
| scroll-px-2      | sm:scroll-px-2     | md:scroll-px-2     | lg:scroll-px-2     | xl:scroll-px-2     | 2xl:scroll-px-2     |
| scroll-px-2.5    | sm:scroll-px-2.5   | md:scroll-px-2.5   | lg:scroll-px-2.5   | xl:scroll-px-2.5   | 2xl:scroll-px-2.5   |
| scroll-px-3      | sm:scroll-px-3     | md:scroll-px-3     | lg:scroll-px-3     | xl:scroll-px-3     | 2xl:scroll-px-3     |
| scroll-px-3.5    | sm:scroll-px-3.5   | md:scroll-px-3.5   | lg:scroll-px-3.5   | xl:scroll-px-3.5   | 2xl:scroll-px-3.5   |
| scroll-px-4      | sm:scroll-px-4     | md:scroll-px-4     | lg:scroll-px-4     | xl:scroll-px-4     | 2xl:scroll-px-4     |
| scroll-px-5      | sm:scroll-px-5     | md:scroll-px-5     | lg:scroll-px-5     | xl:scroll-px-5     | 2xl:scroll-px-5     |
| scroll-px-6      | sm:scroll-px-6     | md:scroll-px-6     | lg:scroll-px-6     | xl:scroll-px-6     | 2xl:scroll-px-6     |
| scroll-px-7      | sm:scroll-px-7     | md:scroll-px-7     | lg:scroll-px-7     | xl:scroll-px-7     | 2xl:scroll-px-7     |
| scroll-px-8      | sm:scroll-px-8     | md:scroll-px-8     | lg:scroll-px-8     | xl:scroll-px-8     | 2xl:scroll-px-8     |
| scroll-px-9      | sm:scroll-px-9     | md:scroll-px-9     | lg:scroll-px-9     | xl:scroll-px-9     | 2xl:scroll-px-9     |
| scroll-px-10     | sm:scroll-px-10    | md:scroll-px-10    | lg:scroll-px-10    | xl:scroll-px-10    | 2xl:scroll-px-10    |
| scroll-px-11     | sm:scroll-px-11    | md:scroll-px-11    | lg:scroll-px-11    | xl:scroll-px-11    | 2xl:scroll-px-11    |
| scroll-px-12     | sm:scroll-px-12    | md:scroll-px-12    | lg:scroll-px-12    | xl:scroll-px-12    | 2xl:scroll-px-12    |
| scroll-px-14     | sm:scroll-px-14    | md:scroll-px-14    | lg:scroll-px-14    | xl:scroll-px-14    | 2xl:scroll-px-14    |
| scroll-px-16     | sm:scroll-px-16    | md:scroll-px-16    | lg:scroll-px-16    | xl:scroll-px-16    | 2xl:scroll-px-16    |
| scroll-px-20     | sm:scroll-px-20    | md:scroll-px-20    | lg:scroll-px-20    | xl:scroll-px-20    | 2xl:scroll-px-20    |
| scroll-px-24     | sm:scroll-px-24    | md:scroll-px-24    | lg:scroll-px-24    | xl:scroll-px-24    | 2xl:scroll-px-24    |
| scroll-px-28     | sm:scroll-px-28    | md:scroll-px-28    | lg:scroll-px-28    | xl:scroll-px-28    | 2xl:scroll-px-28    |
| scroll-px-32     | sm:scroll-px-32    | md:scroll-px-32    | lg:scroll-px-32    | xl:scroll-px-32    | 2xl:scroll-px-32    |
| scroll-px-36     | sm:scroll-px-36    | md:scroll-px-36    | lg:scroll-px-36    | xl:scroll-px-36    | 2xl:scroll-px-36    |
| scroll-px-40     | sm:scroll-px-40    | md:scroll-px-40    | lg:scroll-px-40    | xl:scroll-px-40    | 2xl:scroll-px-40    |
| scroll-px-44     | sm:scroll-px-44    | md:scroll-px-44    | lg:scroll-px-44    | xl:scroll-px-44    | 2xl:scroll-px-44    |
| scroll-px-48     | sm:scroll-px-48    | md:scroll-px-48    | lg:scroll-px-48    | xl:scroll-px-48    | 2xl:scroll-px-48    |
| scroll-px-52     | sm:scroll-px-52    | md:scroll-px-52    | lg:scroll-px-52    | xl:scroll-px-52    | 2xl:scroll-px-52    |
| scroll-px-56     | sm:scroll-px-56    | md:scroll-px-56    | lg:scroll-px-56    | xl:scroll-px-56    | 2xl:scroll-px-56    |
| scroll-px-60     | sm:scroll-px-60    | md:scroll-px-60    | lg:scroll-px-60    | xl:scroll-px-60    | 2xl:scroll-px-60    |
| scroll-px-64     | sm:scroll-px-64    | md:scroll-px-64    | lg:scroll-px-64    | xl:scroll-px-64    | 2xl:scroll-px-64    |
| scroll-px-72     | sm:scroll-px-72    | md:scroll-px-72    | lg:scroll-px-72    | xl:scroll-px-72    | 2xl:scroll-px-72    |
| scroll-px-80     | sm:scroll-px-80    | md:scroll-px-80    | lg:scroll-px-80    | xl:scroll-px-80    | 2xl:scroll-px-80    |
| scroll-px-96     | sm:scroll-px-96    | md:scroll-px-96    | lg:scroll-px-96    | xl:scroll-px-96    | 2xl:scroll-px-96    |
*/