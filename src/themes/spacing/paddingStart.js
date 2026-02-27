import getPadding , { START } from './padding' ;

/**
 * Generates responsive start (inline-start) padding class definitions.
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
 * getPaddingStart( 4 ) ;
 * // → { 'ps-4': true }
 *
 * getPaddingStart( { xs: 2 , md: 4 } ) ;
 * // → { 'ps-2': true , 'md:ps-4': true }
 * ```
 */
export const getPaddingStart = ( value , options = {} ) =>
    getPadding( value , { ...options , direction: START } ) ;

export default getPaddingStart ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| ps-px     | sm:ps-px    | md:ps-px    | lg:ps-px    | xl:ps-px    | 2xl:ps-px    |
| ps-0      | sm:ps-0     | md:ps-0     | lg:ps-0     | xl:ps-0     | 2xl:ps-0     |
| ps-0.5    | sm:ps-0.5   | md:ps-0.5   | lg:ps-0.5   | xl:ps-0.5   | 2xl:ps-0.5   |
| ps-1      | sm:ps-1     | md:ps-1     | lg:ps-1     | xl:ps-1     | 2xl:ps-1     |
| ps-1.5    | sm:ps-1.5   | md:ps-1.5   | lg:ps-1.5   | xl:ps-1.5   | 2xl:ps-1.5   |
| ps-2      | sm:ps-2     | md:ps-2     | lg:ps-2     | xl:ps-2     | 2xl:ps-2     |
| ps-2.5    | sm:ps-2.5   | md:ps-2.5   | lg:ps-2.5   | xl:ps-2.5   | 2xl:ps-2.5   |
| ps-3      | sm:ps-3     | md:ps-3     | lg:ps-3     | xl:ps-3     | 2xl:ps-3     |
| ps-3.5    | sm:ps-3.5   | md:ps-3.5   | lg:ps-3.5   | xl:ps-3.5   | 2xl:ps-3.5   |
| ps-4      | sm:ps-4     | md:ps-4     | lg:ps-4     | xl:ps-4     | 2xl:ps-4     |
| ps-5      | sm:ps-5     | md:ps-5     | lg:ps-5     | xl:ps-5     | 2xl:ps-5     |
| ps-6      | sm:ps-6     | md:ps-6     | lg:ps-6     | xl:ps-6     | 2xl:ps-6     |
| ps-7      | sm:ps-7     | md:ps-7     | lg:ps-7     | xl:ps-7     | 2xl:ps-7     |
| ps-8      | sm:ps-8     | md:ps-8     | lg:ps-8     | xl:ps-8     | 2xl:ps-8     |
| ps-9      | sm:ps-9     | md:ps-9     | lg:ps-9     | xl:ps-9     | 2xl:ps-9     |
| ps-10     | sm:ps-10    | md:ps-10    | lg:ps-10    | xl:ps-10    | 2xl:ps-10    |
| ps-11     | sm:ps-11    | md:ps-11    | lg:ps-11    | xl:ps-11    | 2xl:ps-11    |
| ps-12     | sm:ps-12    | md:ps-12    | lg:ps-12    | xl:ps-12    | 2xl:ps-12    |
| ps-14     | sm:ps-14    | md:ps-14    | lg:ps-14    | xl:ps-14    | 2xl:ps-14    |
| ps-16     | sm:ps-16    | md:ps-16    | lg:ps-16    | xl:ps-16    | 2xl:ps-16    |
| ps-20     | sm:ps-20    | md:ps-20    | lg:ps-20    | xl:ps-20    | 2xl:ps-20    |
| ps-24     | sm:ps-24    | md:ps-24    | lg:ps-24    | xl:ps-24    | 2xl:ps-24    |
| ps-28     | sm:ps-28    | md:ps-28    | lg:ps-28    | xl:ps-28    | 2xl:ps-28    |
| ps-32     | sm:ps-32    | md:ps-32    | lg:ps-32    | xl:ps-32    | 2xl:ps-32    |
| ps-36     | sm:ps-36    | md:ps-36    | lg:ps-36    | xl:ps-36    | 2xl:ps-36    |
| ps-40     | sm:ps-40    | md:ps-40    | lg:ps-40    | xl:ps-40    | 2xl:ps-40    |
| ps-44     | sm:ps-44    | md:ps-44    | lg:ps-44    | xl:ps-44    | 2xl:ps-44    |
| ps-48     | sm:ps-48    | md:ps-48    | lg:ps-48    | xl:ps-48    | 2xl:ps-48    |
| ps-52     | sm:ps-52    | md:ps-52    | lg:ps-52    | xl:ps-52    | 2xl:ps-52    |
| ps-56     | sm:ps-56    | md:ps-56    | lg:ps-56    | xl:ps-56    | 2xl:ps-56    |
| ps-60     | sm:ps-60    | md:ps-60    | lg:ps-60    | xl:ps-60    | 2xl:ps-60    |
| ps-64     | sm:ps-64    | md:ps-64    | lg:ps-64    | xl:ps-64    | 2xl:ps-64    |
| ps-72     | sm:ps-72    | md:ps-72    | lg:ps-72    | xl:ps-72    | 2xl:ps-72    |
| ps-80     | sm:ps-80    | md:ps-80    | lg:ps-80    | xl:ps-80    | 2xl:ps-80    |
| ps-96     | sm:ps-96    | md:ps-96    | lg:ps-96    | xl:ps-96    | 2xl:ps-96    |
*/