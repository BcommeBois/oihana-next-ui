import getPadding , { VERTICAL } from './padding' ;

/**
 * Generates responsive vertical (block) padding class definitions.
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
 * getPaddingY( 4 ) ;
 * // → { 'py-4': true }
 *
 * getPaddingY( { xs: 2 , md: 4 } ) ;
 * // → { 'py-2': true , 'md:py-4': true }
 * ```
 */
export const getPaddingY = ( value , options = {} ) =>
    getPadding( value , { ...options , direction: VERTICAL } ) ;

export default getPaddingY ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| py-px     | sm:py-px    | md:py-px    | lg:py-px    | xl:py-px    | 2xl:py-px    |
| py-0      | sm:py-0     | md:py-0     | lg:py-0     | xl:py-0     | 2xl:py-0     |
| py-0.5    | sm:py-0.5   | md:py-0.5   | lg:py-0.5   | xl:py-0.5   | 2xl:py-0.5   |
| py-1      | sm:py-1     | md:py-1     | lg:py-1     | xl:py-1     | 2xl:py-1     |
| py-1.5    | sm:py-1.5   | md:py-1.5   | lg:py-1.5   | xl:py-1.5   | 2xl:py-1.5   |
| py-2      | sm:py-2     | md:py-2     | lg:py-2     | xl:py-2     | 2xl:py-2     |
| py-2.5    | sm:py-2.5   | md:py-2.5   | lg:py-2.5   | xl:py-2.5   | 2xl:py-2.5   |
| py-3      | sm:py-3     | md:py-3     | lg:py-3     | xl:py-3     | 2xl:py-3     |
| py-3.5    | sm:py-3.5   | md:py-3.5   | lg:py-3.5   | xl:py-3.5   | 2xl:py-3.5   |
| py-4      | sm:py-4     | md:py-4     | lg:py-4     | xl:py-4     | 2xl:py-4     |
| py-5      | sm:py-5     | md:py-5     | lg:py-5     | xl:py-5     | 2xl:py-5     |
| py-6      | sm:py-6     | md:py-6     | lg:py-6     | xl:py-6     | 2xl:py-6     |
| py-7      | sm:py-7     | md:py-7     | lg:py-7     | xl:py-7     | 2xl:py-7     |
| py-8      | sm:py-8     | md:py-8     | lg:py-8     | xl:py-8     | 2xl:py-8     |
| py-9      | sm:py-9     | md:py-9     | lg:py-9     | xl:py-9     | 2xl:py-9     |
| py-10     | sm:py-10    | md:py-10    | lg:py-10    | xl:py-10    | 2xl:py-10    |
| py-11     | sm:py-11    | md:py-11    | lg:py-11    | xl:py-11    | 2xl:py-11    |
| py-12     | sm:py-12    | md:py-12    | lg:py-12    | xl:py-12    | 2xl:py-12    |
| py-14     | sm:py-14    | md:py-14    | lg:py-14    | xl:py-14    | 2xl:py-14    |
| py-16     | sm:py-16    | md:py-16    | lg:py-16    | xl:py-16    | 2xl:py-16    |
| py-20     | sm:py-20    | md:py-20    | lg:py-20    | xl:py-20    | 2xl:py-20    |
| py-24     | sm:py-24    | md:py-24    | lg:py-24    | xl:py-24    | 2xl:py-24    |
| py-28     | sm:py-28    | md:py-28    | lg:py-28    | xl:py-28    | 2xl:py-28    |
| py-32     | sm:py-32    | md:py-32    | lg:py-32    | xl:py-32    | 2xl:py-32    |
| py-36     | sm:py-36    | md:py-36    | lg:py-36    | xl:py-36    | 2xl:py-36    |
| py-40     | sm:py-40    | md:py-40    | lg:py-40    | xl:py-40    | 2xl:py-40    |
| py-44     | sm:py-44    | md:py-44    | lg:py-44    | xl:py-44    | 2xl:py-44    |
| py-48     | sm:py-48    | md:py-48    | lg:py-48    | xl:py-48    | 2xl:py-48    |
| py-52     | sm:py-52    | md:py-52    | lg:py-52    | xl:py-52    | 2xl:py-52    |
| py-56     | sm:py-56    | md:py-56    | lg:py-56    | xl:py-56    | 2xl:py-56    |
| py-60     | sm:py-60    | md:py-60    | lg:py-60    | xl:py-60    | 2xl:py-60    |
| py-64     | sm:py-64    | md:py-64    | lg:py-64    | xl:py-64    | 2xl:py-64    |
| py-72     | sm:py-72    | md:py-72    | lg:py-72    | xl:py-72    | 2xl:py-72    |
| py-80     | sm:py-80    | md:py-80    | lg:py-80    | xl:py-80    | 2xl:py-80    |
| py-96     | sm:py-96    | md:py-96    | lg:py-96    | xl:py-96    | 2xl:py-96    |
*/