import getPadding , { LEFT } from './padding' ;

/**
 * Generates responsive left padding class definitions.
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
 * getPaddingLeft( 4 ) ;
 * // → { 'pl-4': true }
 *
 * getPaddingLeft( { xs: 2 , md: 4 } ) ;
 * // → { 'pl-2': true , 'md:pl-4': true }
 * ```
 */
export const getPaddingLeft = ( value , options = {} ) =>
    getPadding( value , { ...options , direction: LEFT } ) ;

export default getPaddingLeft ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| pl-px     | sm:pl-px    | md:pl-px    | lg:pl-px    | xl:pl-px    | 2xl:pl-px    |
| pl-0      | sm:pl-0     | md:pl-0     | lg:pl-0     | xl:pl-0     | 2xl:pl-0     |
| pl-0.5    | sm:pl-0.5   | md:pl-0.5   | lg:pl-0.5   | xl:pl-0.5   | 2xl:pl-0.5   |
| pl-1      | sm:pl-1     | md:pl-1     | lg:pl-1     | xl:pl-1     | 2xl:pl-1     |
| pl-1.5    | sm:pl-1.5   | md:pl-1.5   | lg:pl-1.5   | xl:pl-1.5   | 2xl:pl-1.5   |
| pl-2      | sm:pl-2     | md:pl-2     | lg:pl-2     | xl:pl-2     | 2xl:pl-2     |
| pl-2.5    | sm:pl-2.5   | md:pl-2.5   | lg:pl-2.5   | xl:pl-2.5   | 2xl:pl-2.5   |
| pl-3      | sm:pl-3     | md:pl-3     | lg:pl-3     | xl:pl-3     | 2xl:pl-3     |
| pl-3.5    | sm:pl-3.5   | md:pl-3.5   | lg:pl-3.5   | xl:pl-3.5   | 2xl:pl-3.5   |
| pl-4      | sm:pl-4     | md:pl-4     | lg:pl-4     | xl:pl-4     | 2xl:pl-4     |
| pl-5      | sm:pl-5     | md:pl-5     | lg:pl-5     | xl:pl-5     | 2xl:pl-5     |
| pl-6      | sm:pl-6     | md:pl-6     | lg:pl-6     | xl:pl-6     | 2xl:pl-6     |
| pl-7      | sm:pl-7     | md:pl-7     | lg:pl-7     | xl:pl-7     | 2xl:pl-7     |
| pl-8      | sm:pl-8     | md:pl-8     | lg:pl-8     | xl:pl-8     | 2xl:pl-8     |
| pl-9      | sm:pl-9     | md:pl-9     | lg:pl-9     | xl:pl-9     | 2xl:pl-9     |
| pl-10     | sm:pl-10    | md:pl-10    | lg:pl-10    | xl:pl-10    | 2xl:pl-10    |
| pl-11     | sm:pl-11    | md:pl-11    | lg:pl-11    | xl:pl-11    | 2xl:pl-11    |
| pl-12     | sm:pl-12    | md:pl-12    | lg:pl-12    | xl:pl-12    | 2xl:pl-12    |
| pl-14     | sm:pl-14    | md:pl-14    | lg:pl-14    | xl:pl-14    | 2xl:pl-14    |
| pl-16     | sm:pl-16    | md:pl-16    | lg:pl-16    | xl:pl-16    | 2xl:pl-16    |
| pl-20     | sm:pl-20    | md:pl-20    | lg:pl-20    | xl:pl-20    | 2xl:pl-20    |
| pl-24     | sm:pl-24    | md:pl-24    | lg:pl-24    | xl:pl-24    | 2xl:pl-24    |
| pl-28     | sm:pl-28    | md:pl-28    | lg:pl-28    | xl:pl-28    | 2xl:pl-28    |
| pl-32     | sm:pl-32    | md:pl-32    | lg:pl-32    | xl:pl-32    | 2xl:pl-32    |
| pl-36     | sm:pl-36    | md:pl-36    | lg:pl-36    | xl:pl-36    | 2xl:pl-36    |
| pl-40     | sm:pl-40    | md:pl-40    | lg:pl-40    | xl:pl-40    | 2xl:pl-40    |
| pl-44     | sm:pl-44    | md:pl-44    | lg:pl-44    | xl:pl-44    | 2xl:pl-44    |
| pl-48     | sm:pl-48    | md:pl-48    | lg:pl-48    | xl:pl-48    | 2xl:pl-48    |
| pl-52     | sm:pl-52    | md:pl-52    | lg:pl-52    | xl:pl-52    | 2xl:pl-52    |
| pl-56     | sm:pl-56    | md:pl-56    | lg:pl-56    | xl:pl-56    | 2xl:pl-56    |
| pl-60     | sm:pl-60    | md:pl-60    | lg:pl-60    | xl:pl-60    | 2xl:pl-60    |
| pl-64     | sm:pl-64    | md:pl-64    | lg:pl-64    | xl:pl-64    | 2xl:pl-64    |
| pl-72     | sm:pl-72    | md:pl-72    | lg:pl-72    | xl:pl-72    | 2xl:pl-72    |
| pl-80     | sm:pl-80    | md:pl-80    | lg:pl-80    | xl:pl-80    | 2xl:pl-80    |
| pl-96     | sm:pl-96    | md:pl-96    | lg:pl-96    | xl:pl-96    | 2xl:pl-96    |
*/