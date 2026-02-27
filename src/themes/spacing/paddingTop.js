import getPadding , { TOP } from './padding' ;

/**
 * Generates responsive top padding class definitions.
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
 * getPaddingTop( 4 ) ;
 * // → { 'pt-4': true }
 *
 * getPaddingTop( { xs: 2 , md: 4 } ) ;
 * // → { 'pt-2': true , 'md:pt-4': true }
 * ```
 */
export const getPaddingTop = ( value , options = {} ) =>
    getPadding( value , { ...options , direction: TOP } ) ;

export default getPaddingTop ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| pt-px     | sm:pt-px    | md:pt-px    | lg:pt-px    | xl:pt-px    | 2xl:pt-px    |
| pt-0      | sm:pt-0     | md:pt-0     | lg:pt-0     | xl:pt-0     | 2xl:pt-0     |
| pt-0.5    | sm:pt-0.5   | md:pt-0.5   | lg:pt-0.5   | xl:pt-0.5   | 2xl:pt-0.5   |
| pt-1      | sm:pt-1     | md:pt-1     | lg:pt-1     | xl:pt-1     | 2xl:pt-1     |
| pt-1.5    | sm:pt-1.5   | md:pt-1.5   | lg:pt-1.5   | xl:pt-1.5   | 2xl:pt-1.5   |
| pt-2      | sm:pt-2     | md:pt-2     | lg:pt-2     | xl:pt-2     | 2xl:pt-2     |
| pt-2.5    | sm:pt-2.5   | md:pt-2.5   | lg:pt-2.5   | xl:pt-2.5   | 2xl:pt-2.5   |
| pt-3      | sm:pt-3     | md:pt-3     | lg:pt-3     | xl:pt-3     | 2xl:pt-3     |
| pt-3.5    | sm:pt-3.5   | md:pt-3.5   | lg:pt-3.5   | xl:pt-3.5   | 2xl:pt-3.5   |
| pt-4      | sm:pt-4     | md:pt-4     | lg:pt-4     | xl:pt-4     | 2xl:pt-4     |
| pt-5      | sm:pt-5     | md:pt-5     | lg:pt-5     | xl:pt-5     | 2xl:pt-5     |
| pt-6      | sm:pt-6     | md:pt-6     | lg:pt-6     | xl:pt-6     | 2xl:pt-6     |
| pt-7      | sm:pt-7     | md:pt-7     | lg:pt-7     | xl:pt-7     | 2xl:pt-7     |
| pt-8      | sm:pt-8     | md:pt-8     | lg:pt-8     | xl:pt-8     | 2xl:pt-8     |
| pt-9      | sm:pt-9     | md:pt-9     | lg:pt-9     | xl:pt-9     | 2xl:pt-9     |
| pt-10     | sm:pt-10    | md:pt-10    | lg:pt-10    | xl:pt-10    | 2xl:pt-10    |
| pt-11     | sm:pt-11    | md:pt-11    | lg:pt-11    | xl:pt-11    | 2xl:pt-11    |
| pt-12     | sm:pt-12    | md:pt-12    | lg:pt-12    | xl:pt-12    | 2xl:pt-12    |
| pt-14     | sm:pt-14    | md:pt-14    | lg:pt-14    | xl:pt-14    | 2xl:pt-14    |
| pt-16     | sm:pt-16    | md:pt-16    | lg:pt-16    | xl:pt-16    | 2xl:pt-16    |
| pt-20     | sm:pt-20    | md:pt-20    | lg:pt-20    | xl:pt-20    | 2xl:pt-20    |
| pt-24     | sm:pt-24    | md:pt-24    | lg:pt-24    | xl:pt-24    | 2xl:pt-24    |
| pt-28     | sm:pt-28    | md:pt-28    | lg:pt-28    | xl:pt-28    | 2xl:pt-28    |
| pt-32     | sm:pt-32    | md:pt-32    | lg:pt-32    | xl:pt-32    | 2xl:pt-32    |
| pt-36     | sm:pt-36    | md:pt-36    | lg:pt-36    | xl:pt-36    | 2xl:pt-36    |
| pt-40     | sm:pt-40    | md:pt-40    | lg:pt-40    | xl:pt-40    | 2xl:pt-40    |
| pt-44     | sm:pt-44    | md:pt-44    | lg:pt-44    | xl:pt-44    | 2xl:pt-44    |
| pt-48     | sm:pt-48    | md:pt-48    | lg:pt-48    | xl:pt-48    | 2xl:pt-48    |
| pt-52     | sm:pt-52    | md:pt-52    | lg:pt-52    | xl:pt-52    | 2xl:pt-52    |
| pt-56     | sm:pt-56    | md:pt-56    | lg:pt-56    | xl:pt-56    | 2xl:pt-56    |
| pt-60     | sm:pt-60    | md:pt-60    | lg:pt-60    | xl:pt-60    | 2xl:pt-60    |
| pt-64     | sm:pt-64    | md:pt-64    | lg:pt-64    | xl:pt-64    | 2xl:pt-64    |
| pt-72     | sm:pt-72    | md:pt-72    | lg:pt-72    | xl:pt-72    | 2xl:pt-72    |
| pt-80     | sm:pt-80    | md:pt-80    | lg:pt-80    | xl:pt-80    | 2xl:pt-80    |
| pt-96     | sm:pt-96    | md:pt-96    | lg:pt-96    | xl:pt-96    | 2xl:pt-96    |
*/