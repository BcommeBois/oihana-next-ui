import getPadding , { BOTTOM } from './padding' ;

/**
 * Generates responsive bottom padding class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Padding value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/padding
 *
 * @example
 * ```js
 * getPaddingBottom( 4 ) ;
 * // → { 'pb-4': true }
 *
 * getPaddingBottom( { xs: 2 , md: 4 } ) ;
 * // → { 'pb-2': true , 'md:pb-4': true }
 * ```
 */
export const getPaddingBottom = ( value , options = {} ) =>
    getPadding( value , { ...options , direction: BOTTOM } ) ;

export default getPaddingBottom ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| pb-px     | sm:pb-px    | md:pb-px    | lg:pb-px    | xl:pb-px    | 2xl:pb-px    |
| pb-0      | sm:pb-0     | md:pb-0     | lg:pb-0     | xl:pb-0     | 2xl:pb-0     |
| pb-0.5    | sm:pb-0.5   | md:pb-0.5   | lg:pb-0.5   | xl:pb-0.5   | 2xl:pb-0.5   |
| pb-1      | sm:pb-1     | md:pb-1     | lg:pb-1     | xl:pb-1     | 2xl:pb-1     |
| pb-1.5    | sm:pb-1.5   | md:pb-1.5   | lg:pb-1.5   | xl:pb-1.5   | 2xl:pb-1.5   |
| pb-2      | sm:pb-2     | md:pb-2     | lg:pb-2     | xl:pb-2     | 2xl:pb-2     |
| pb-2.5    | sm:pb-2.5   | md:pb-2.5   | lg:pb-2.5   | xl:pb-2.5   | 2xl:pb-2.5   |
| pb-3      | sm:pb-3     | md:pb-3     | lg:pb-3     | xl:pb-3     | 2xl:pb-3     |
| pb-3.5    | sm:pb-3.5   | md:pb-3.5   | lg:pb-3.5   | xl:pb-3.5   | 2xl:pb-3.5   |
| pb-4      | sm:pb-4     | md:pb-4     | lg:pb-4     | xl:pb-4     | 2xl:pb-4     |
| pb-5      | sm:pb-5     | md:pb-5     | lg:pb-5     | xl:pb-5     | 2xl:pb-5     |
| pb-6      | sm:pb-6     | md:pb-6     | lg:pb-6     | xl:pb-6     | 2xl:pb-6     |
| pb-7      | sm:pb-7     | md:pb-7     | lg:pb-7     | xl:pb-7     | 2xl:pb-7     |
| pb-8      | sm:pb-8     | md:pb-8     | lg:pb-8     | xl:pb-8     | 2xl:pb-8     |
| pb-9      | sm:pb-9     | md:pb-9     | lg:pb-9     | xl:pb-9     | 2xl:pb-9     |
| pb-10     | sm:pb-10    | md:pb-10    | lg:pb-10    | xl:pb-10    | 2xl:pb-10    |
| pb-11     | sm:pb-11    | md:pb-11    | lg:pb-11    | xl:pb-11    | 2xl:pb-11    |
| pb-12     | sm:pb-12    | md:pb-12    | lg:pb-12    | xl:pb-12    | 2xl:pb-12    |
| pb-14     | sm:pb-14    | md:pb-14    | lg:pb-14    | xl:pb-14    | 2xl:pb-14    |
| pb-16     | sm:pb-16    | md:pb-16    | lg:pb-16    | xl:pb-16    | 2xl:pb-16    |
| pb-20     | sm:pb-20    | md:pb-20    | lg:pb-20    | xl:pb-20    | 2xl:pb-20    |
| pb-24     | sm:pb-24    | md:pb-24    | lg:pb-24    | xl:pb-24    | 2xl:pb-24    |
| pb-28     | sm:pb-28    | md:pb-28    | lg:pb-28    | xl:pb-28    | 2xl:pb-28    |
| pb-32     | sm:pb-32    | md:pb-32    | lg:pb-32    | xl:pb-32    | 2xl:pb-32    |
| pb-36     | sm:pb-36    | md:pb-36    | lg:pb-36    | xl:pb-36    | 2xl:pb-36    |
| pb-40     | sm:pb-40    | md:pb-40    | lg:pb-40    | xl:pb-40    | 2xl:pb-40    |
| pb-44     | sm:pb-44    | md:pb-44    | lg:pb-44    | xl:pb-44    | 2xl:pb-44    |
| pb-48     | sm:pb-48    | md:pb-48    | lg:pb-48    | xl:pb-48    | 2xl:pb-48    |
| pb-52     | sm:pb-52    | md:pb-52    | lg:pb-52    | xl:pb-52    | 2xl:pb-52    |
| pb-56     | sm:pb-56    | md:pb-56    | lg:pb-56    | xl:pb-56    | 2xl:pb-56    |
| pb-60     | sm:pb-60    | md:pb-60    | lg:pb-60    | xl:pb-60    | 2xl:pb-60    |
| pb-64     | sm:pb-64    | md:pb-64    | lg:pb-64    | xl:pb-64    | 2xl:pb-64    |
| pb-72     | sm:pb-72    | md:pb-72    | lg:pb-72    | xl:pb-72    | 2xl:pb-72    |
| pb-80     | sm:pb-80    | md:pb-80    | lg:pb-80    | xl:pb-80    | 2xl:pb-80    |
| pb-96     | sm:pb-96    | md:pb-96    | lg:pb-96    | xl:pb-96    | 2xl:pb-96    |
*/