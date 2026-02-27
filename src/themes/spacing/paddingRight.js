import getPadding , { RIGHT } from './padding' ;

/**
 * Generates responsive right padding class definitions.
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
 * getPaddingRight( 4 ) ;
 * // → { 'pr-4': true }
 *
 * getPaddingRight( { xs: 2 , md: 4 } ) ;
 * // → { 'pr-2': true , 'md:pr-4': true }
 * ```
 */
export const getPaddingRight = ( value , options = {} ) =>
    getPadding( value , { ...options , direction: RIGHT } ) ;

export default getPaddingRight ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| pr-px     | sm:pr-px    | md:pr-px    | lg:pr-px    | xl:pr-px    | 2xl:pr-px    |
| pr-0      | sm:pr-0     | md:pr-0     | lg:pr-0     | xl:pr-0     | 2xl:pr-0     |
| pr-0.5    | sm:pr-0.5   | md:pr-0.5   | lg:pr-0.5   | xl:pr-0.5   | 2xl:pr-0.5   |
| pr-1      | sm:pr-1     | md:pr-1     | lg:pr-1     | xl:pr-1     | 2xl:pr-1     |
| pr-1.5    | sm:pr-1.5   | md:pr-1.5   | lg:pr-1.5   | xl:pr-1.5   | 2xl:pr-1.5   |
| pr-2      | sm:pr-2     | md:pr-2     | lg:pr-2     | xl:pr-2     | 2xl:pr-2     |
| pr-2.5    | sm:pr-2.5   | md:pr-2.5   | lg:pr-2.5   | xl:pr-2.5   | 2xl:pr-2.5   |
| pr-3      | sm:pr-3     | md:pr-3     | lg:pr-3     | xl:pr-3     | 2xl:pr-3     |
| pr-3.5    | sm:pr-3.5   | md:pr-3.5   | lg:pr-3.5   | xl:pr-3.5   | 2xl:pr-3.5   |
| pr-4      | sm:pr-4     | md:pr-4     | lg:pr-4     | xl:pr-4     | 2xl:pr-4     |
| pr-5      | sm:pr-5     | md:pr-5     | lg:pr-5     | xl:pr-5     | 2xl:pr-5     |
| pr-6      | sm:pr-6     | md:pr-6     | lg:pr-6     | xl:pr-6     | 2xl:pr-6     |
| pr-7      | sm:pr-7     | md:pr-7     | lg:pr-7     | xl:pr-7     | 2xl:pr-7     |
| pr-8      | sm:pr-8     | md:pr-8     | lg:pr-8     | xl:pr-8     | 2xl:pr-8     |
| pr-9      | sm:pr-9     | md:pr-9     | lg:pr-9     | xl:pr-9     | 2xl:pr-9     |
| pr-10     | sm:pr-10    | md:pr-10    | lg:pr-10    | xl:pr-10    | 2xl:pr-10    |
| pr-11     | sm:pr-11    | md:pr-11    | lg:pr-11    | xl:pr-11    | 2xl:pr-11    |
| pr-12     | sm:pr-12    | md:pr-12    | lg:pr-12    | xl:pr-12    | 2xl:pr-12    |
| pr-14     | sm:pr-14    | md:pr-14    | lg:pr-14    | xl:pr-14    | 2xl:pr-14    |
| pr-16     | sm:pr-16    | md:pr-16    | lg:pr-16    | xl:pr-16    | 2xl:pr-16    |
| pr-20     | sm:pr-20    | md:pr-20    | lg:pr-20    | xl:pr-20    | 2xl:pr-20    |
| pr-24     | sm:pr-24    | md:pr-24    | lg:pr-24    | xl:pr-24    | 2xl:pr-24    |
| pr-28     | sm:pr-28    | md:pr-28    | lg:pr-28    | xl:pr-28    | 2xl:pr-28    |
| pr-32     | sm:pr-32    | md:pr-32    | lg:pr-32    | xl:pr-32    | 2xl:pr-32    |
| pr-36     | sm:pr-36    | md:pr-36    | lg:pr-36    | xl:pr-36    | 2xl:pr-36    |
| pr-40     | sm:pr-40    | md:pr-40    | lg:pr-40    | xl:pr-40    | 2xl:pr-40    |
| pr-44     | sm:pr-44    | md:pr-44    | lg:pr-44    | xl:pr-44    | 2xl:pr-44    |
| pr-48     | sm:pr-48    | md:pr-48    | lg:pr-48    | xl:pr-48    | 2xl:pr-48    |
| pr-52     | sm:pr-52    | md:pr-52    | lg:pr-52    | xl:pr-52    | 2xl:pr-52    |
| pr-56     | sm:pr-56    | md:pr-56    | lg:pr-56    | xl:pr-56    | 2xl:pr-56    |
| pr-60     | sm:pr-60    | md:pr-60    | lg:pr-60    | xl:pr-60    | 2xl:pr-60    |
| pr-64     | sm:pr-64    | md:pr-64    | lg:pr-64    | xl:pr-64    | 2xl:pr-64    |
| pr-72     | sm:pr-72    | md:pr-72    | lg:pr-72    | xl:pr-72    | 2xl:pr-72    |
| pr-80     | sm:pr-80    | md:pr-80    | lg:pr-80    | xl:pr-80    | 2xl:pr-80    |
| pr-96     | sm:pr-96    | md:pr-96    | lg:pr-96    | xl:pr-96    | 2xl:pr-96    |
*/