import getPadding , { HORIZONTAL } from './padding' ;

/**
 * Generates responsive horizontal (inline) padding class definitions.
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
 * getPaddingX( 4 ) ;
 * // → { 'px-4': true }
 *
 * getPaddingX( { xs: 2 , md: 4 } ) ;
 * // → { 'px-2': true , 'md:px-4': true }
 * ```
 */
export const getPaddingX = ( value , options = {} ) =>
    getPadding( value , { ...options , direction: HORIZONTAL } ) ;

export default getPaddingX ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| px-px     | sm:px-px    | md:px-px    | lg:px-px    | xl:px-px    | 2xl:px-px    |
| px-0      | sm:px-0     | md:px-0     | lg:px-0     | xl:px-0     | 2xl:px-0     |
| px-0.5    | sm:px-0.5   | md:px-0.5   | lg:px-0.5   | xl:px-0.5   | 2xl:px-0.5   |
| px-1      | sm:px-1     | md:px-1     | lg:px-1     | xl:px-1     | 2xl:px-1     |
| px-1.5    | sm:px-1.5   | md:px-1.5   | lg:px-1.5   | xl:px-1.5   | 2xl:px-1.5   |
| px-2      | sm:px-2     | md:px-2     | lg:px-2     | xl:px-2     | 2xl:px-2     |
| px-2.5    | sm:px-2.5   | md:px-2.5   | lg:px-2.5   | xl:px-2.5   | 2xl:px-2.5   |
| px-3      | sm:px-3     | md:px-3     | lg:px-3     | xl:px-3     | 2xl:px-3     |
| px-3.5    | sm:px-3.5   | md:px-3.5   | lg:px-3.5   | xl:px-3.5   | 2xl:px-3.5   |
| px-4      | sm:px-4     | md:px-4     | lg:px-4     | xl:px-4     | 2xl:px-4     |
| px-5      | sm:px-5     | md:px-5     | lg:px-5     | xl:px-5     | 2xl:px-5     |
| px-6      | sm:px-6     | md:px-6     | lg:px-6     | xl:px-6     | 2xl:px-6     |
| px-7      | sm:px-7     | md:px-7     | lg:px-7     | xl:px-7     | 2xl:px-7     |
| px-8      | sm:px-8     | md:px-8     | lg:px-8     | xl:px-8     | 2xl:px-8     |
| px-9      | sm:px-9     | md:px-9     | lg:px-9     | xl:px-9     | 2xl:px-9     |
| px-10     | sm:px-10    | md:px-10    | lg:px-10    | xl:px-10    | 2xl:px-10    |
| px-11     | sm:px-11    | md:px-11    | lg:px-11    | xl:px-11    | 2xl:px-11    |
| px-12     | sm:px-12    | md:px-12    | lg:px-12    | xl:px-12    | 2xl:px-12    |
| px-14     | sm:px-14    | md:px-14    | lg:px-14    | xl:px-14    | 2xl:px-14    |
| px-16     | sm:px-16    | md:px-16    | lg:px-16    | xl:px-16    | 2xl:px-16    |
| px-20     | sm:px-20    | md:px-20    | lg:px-20    | xl:px-20    | 2xl:px-20    |
| px-24     | sm:px-24    | md:px-24    | lg:px-24    | xl:px-24    | 2xl:px-24    |
| px-28     | sm:px-28    | md:px-28    | lg:px-28    | xl:px-28    | 2xl:px-28    |
| px-32     | sm:px-32    | md:px-32    | lg:px-32    | xl:px-32    | 2xl:px-32    |
| px-36     | sm:px-36    | md:px-36    | lg:px-36    | xl:px-36    | 2xl:px-36    |
| px-40     | sm:px-40    | md:px-40    | lg:px-40    | xl:px-40    | 2xl:px-40    |
| px-44     | sm:px-44    | md:px-44    | lg:px-44    | xl:px-44    | 2xl:px-44    |
| px-48     | sm:px-48    | md:px-48    | lg:px-48    | xl:px-48    | 2xl:px-48    |
| px-52     | sm:px-52    | md:px-52    | lg:px-52    | xl:px-52    | 2xl:px-52    |
| px-56     | sm:px-56    | md:px-56    | lg:px-56    | xl:px-56    | 2xl:px-56    |
| px-60     | sm:px-60    | md:px-60    | lg:px-60    | xl:px-60    | 2xl:px-60    |
| px-64     | sm:px-64    | md:px-64    | lg:px-64    | xl:px-64    | 2xl:px-64    |
| px-72     | sm:px-72    | md:px-72    | lg:px-72    | xl:px-72    | 2xl:px-72    |
| px-80     | sm:px-80    | md:px-80    | lg:px-80    | xl:px-80    | 2xl:px-80    |
| px-96     | sm:px-96    | md:px-96    | lg:px-96    | xl:px-96    | 2xl:px-96    |
*/