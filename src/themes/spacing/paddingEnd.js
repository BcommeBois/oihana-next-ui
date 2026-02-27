import getPadding , { END } from './padding' ;

/**
 * Generates responsive end (inline-end) padding class definitions.
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
 * getPaddingEnd( 4 ) ;
 * // → { 'pe-4': true }
 *
 * getPaddingEnd( { xs: 2 , md: 4 } ) ;
 * // → { 'pe-2': true , 'md:pe-4': true }
 * ```
 */
export const getPaddingEnd = ( value , options = {} ) =>
    getPadding( value , { ...options , direction: END } ) ;

export default getPaddingEnd ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| pe-px     | sm:pe-px    | md:pe-px    | lg:pe-px    | xl:pe-px    | 2xl:pe-px    |
| pe-0      | sm:pe-0     | md:pe-0     | lg:pe-0     | xl:pe-0     | 2xl:pe-0     |
| pe-0.5    | sm:pe-0.5   | md:pe-0.5   | lg:pe-0.5   | xl:pe-0.5   | 2xl:pe-0.5   |
| pe-1      | sm:pe-1     | md:pe-1     | lg:pe-1     | xl:pe-1     | 2xl:pe-1     |
| pe-1.5    | sm:pe-1.5   | md:pe-1.5   | lg:pe-1.5   | xl:pe-1.5   | 2xl:pe-1.5   |
| pe-2      | sm:pe-2     | md:pe-2     | lg:pe-2     | xl:pe-2     | 2xl:pe-2     |
| pe-2.5    | sm:pe-2.5   | md:pe-2.5   | lg:pe-2.5   | xl:pe-2.5   | 2xl:pe-2.5   |
| pe-3      | sm:pe-3     | md:pe-3     | lg:pe-3     | xl:pe-3     | 2xl:pe-3     |
| pe-3.5    | sm:pe-3.5   | md:pe-3.5   | lg:pe-3.5   | xl:pe-3.5   | 2xl:pe-3.5   |
| pe-4      | sm:pe-4     | md:pe-4     | lg:pe-4     | xl:pe-4     | 2xl:pe-4     |
| pe-5      | sm:pe-5     | md:pe-5     | lg:pe-5     | xl:pe-5     | 2xl:pe-5     |
| pe-6      | sm:pe-6     | md:pe-6     | lg:pe-6     | xl:pe-6     | 2xl:pe-6     |
| pe-7      | sm:pe-7     | md:pe-7     | lg:pe-7     | xl:pe-7     | 2xl:pe-7     |
| pe-8      | sm:pe-8     | md:pe-8     | lg:pe-8     | xl:pe-8     | 2xl:pe-8     |
| pe-9      | sm:pe-9     | md:pe-9     | lg:pe-9     | xl:pe-9     | 2xl:pe-9     |
| pe-10     | sm:pe-10    | md:pe-10    | lg:pe-10    | xl:pe-10    | 2xl:pe-10    |
| pe-11     | sm:pe-11    | md:pe-11    | lg:pe-11    | xl:pe-11    | 2xl:pe-11    |
| pe-12     | sm:pe-12    | md:pe-12    | lg:pe-12    | xl:pe-12    | 2xl:pe-12    |
| pe-14     | sm:pe-14    | md:pe-14    | lg:pe-14    | xl:pe-14    | 2xl:pe-14    |
| pe-16     | sm:pe-16    | md:pe-16    | lg:pe-16    | xl:pe-16    | 2xl:pe-16    |
| pe-20     | sm:pe-20    | md:pe-20    | lg:pe-20    | xl:pe-20    | 2xl:pe-20    |
| pe-24     | sm:pe-24    | md:pe-24    | lg:pe-24    | xl:pe-24    | 2xl:pe-24    |
| pe-28     | sm:pe-28    | md:pe-28    | lg:pe-28    | xl:pe-28    | 2xl:pe-28    |
| pe-32     | sm:pe-32    | md:pe-32    | lg:pe-32    | xl:pe-32    | 2xl:pe-32    |
| pe-36     | sm:pe-36    | md:pe-36    | lg:pe-36    | xl:pe-36    | 2xl:pe-36    |
| pe-40     | sm:pe-40    | md:pe-40    | lg:pe-40    | xl:pe-40    | 2xl:pe-40    |
| pe-44     | sm:pe-44    | md:pe-44    | lg:pe-44    | xl:pe-44    | 2xl:pe-44    |
| pe-48     | sm:pe-48    | md:pe-48    | lg:pe-48    | xl:pe-48    | 2xl:pe-48    |
| pe-52     | sm:pe-52    | md:pe-52    | lg:pe-52    | xl:pe-52    | 2xl:pe-52    |
| pe-56     | sm:pe-56    | md:pe-56    | lg:pe-56    | xl:pe-56    | 2xl:pe-56    |
| pe-60     | sm:pe-60    | md:pe-60    | lg:pe-60    | xl:pe-60    | 2xl:pe-60    |
| pe-64     | sm:pe-64    | md:pe-64    | lg:pe-64    | xl:pe-64    | 2xl:pe-64    |
| pe-72     | sm:pe-72    | md:pe-72    | lg:pe-72    | xl:pe-72    | 2xl:pe-72    |
| pe-80     | sm:pe-80    | md:pe-80    | lg:pe-80    | xl:pe-80    | 2xl:pe-80    |
| pe-96     | sm:pe-96    | md:pe-96    | lg:pe-96    | xl:pe-96    | 2xl:pe-96    |
*/