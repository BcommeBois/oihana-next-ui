import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import { allSizes } from './sizes' ;

/**
 * Generates responsive height class definitions.
 *
 * @param {import('./sizes').Size | import('./sizes').ResponsiveSize} value - Height value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/height
 *
 * @example
 * ```js
 * getHeight( '16' ) ;
 * // → { 'h-16': true }
 *
 * getHeight( 'full' ) ;
 * // → { 'h-full': true }
 *
 * getHeight( { xs: 'auto' , md: '1/2' , lg: 'full' } ) ;
 * // → { 'h-auto': true , 'md:h-1/2': true , 'lg:h-full': true }
 * ```
 */
const getHeight = getResponsiveDefinition
(
    create( 'h-' ) ,
    ( value ) => allSizes.includes( value )
) ;

export default getHeight ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- |
| h-auto   | sm:h-auto  | md:h-auto  | lg:h-auto  | xl:h-auto  | 2xl:h-auto  |
| h-fit    | sm:h-fit   | md:h-fit   | lg:h-fit   | xl:h-fit   | 2xl:h-fit   |
| h-full   | sm:h-full  | md:h-full  | lg:h-full  | xl:h-full  | 2xl:h-full  |
| h-max    | sm:h-max   | md:h-max   | lg:h-max   | xl:h-max   | 2xl:h-max   |
| h-min    | sm:h-min   | md:h-min   | lg:h-min   | xl:h-min   | 2xl:h-min   |
| h-px     | sm:h-px    | md:h-px    | lg:h-px    | xl:h-px    | 2xl:h-px    |
| h-0      | sm:h-0     | md:h-0     | lg:h-0     | xl:h-0     | 2xl:h-0     |
| h-0.5    | sm:h-0.5   | md:h-0.5   | lg:h-0.5   | xl:h-0.5   | 2xl:h-0.5   |
| h-1      | sm:h-1     | md:h-1     | lg:h-1     | xl:h-1     | 2xl:h-1     |
| h-1.5    | sm:h-1.5   | md:h-1.5   | lg:h-1.5   | xl:h-1.5   | 2xl:h-1.5   |
| h-2      | sm:h-2     | md:h-2     | lg:h-2     | xl:h-2     | 2xl:h-2     |
| h-2.5    | sm:h-2.5   | md:h-2.5   | lg:h-2.5   | xl:h-2.5   | 2xl:h-2.5   |
| h-3      | sm:h-3     | md:h-3     | lg:h-3     | xl:h-3     | 2xl:h-3     |
| h-3.5    | sm:h-3.5   | md:h-3.5   | lg:h-3.5   | xl:h-3.5   | 2xl:h-3.5   |
| h-4      | sm:h-4     | md:h-4     | lg:h-4     | xl:h-4     | 2xl:h-4     |
| h-5      | sm:h-5     | md:h-5     | lg:h-5     | xl:h-5     | 2xl:h-5     |
| h-6      | sm:h-6     | md:h-6     | lg:h-6     | xl:h-6     | 2xl:h-6     |
| h-7      | sm:h-7     | md:h-7     | lg:h-7     | xl:h-7     | 2xl:h-7     |
| h-8      | sm:h-8     | md:h-8     | lg:h-8     | xl:h-8     | 2xl:h-8     |
| h-9      | sm:h-9     | md:h-9     | lg:h-9     | xl:h-9     | 2xl:h-9     |
| h-10     | sm:h-10    | md:h-10    | lg:h-10    | xl:h-10    | 2xl:h-10    |
| h-11     | sm:h-11    | md:h-11    | lg:h-11    | xl:h-11    | 2xl:h-11    |
| h-12     | sm:h-12    | md:h-12    | lg:h-12    | xl:h-12    | 2xl:h-12    |
| h-14     | sm:h-14    | md:h-14    | lg:h-14    | xl:h-14    | 2xl:h-14    |
| h-16     | sm:h-16    | md:h-16    | lg:h-16    | xl:h-16    | 2xl:h-16    |
| h-20     | sm:h-20    | md:h-20    | lg:h-20    | xl:h-20    | 2xl:h-20    |
| h-24     | sm:h-24    | md:h-24    | lg:h-24    | xl:h-24    | 2xl:h-24    |
| h-28     | sm:h-28    | md:h-28    | lg:h-28    | xl:h-28    | 2xl:h-28    |
| h-32     | sm:h-32    | md:h-32    | lg:h-32    | xl:h-32    | 2xl:h-32    |
| h-36     | sm:h-36    | md:h-36    | lg:h-36    | xl:h-36    | 2xl:h-36    |
| h-40     | sm:h-40    | md:h-40    | lg:h-40    | xl:h-40    | 2xl:h-40    |
| h-44     | sm:h-44    | md:h-44    | lg:h-44    | xl:h-44    | 2xl:h-44    |
| h-48     | sm:h-48    | md:h-48    | lg:h-48    | xl:h-48    | 2xl:h-48    |
| h-52     | sm:h-52    | md:h-52    | lg:h-52    | xl:h-52    | 2xl:h-52    |
| h-56     | sm:h-56    | md:h-56    | lg:h-56    | xl:h-56    | 2xl:h-56    |
| h-60     | sm:h-60    | md:h-60    | lg:h-60    | xl:h-60    | 2xl:h-60    |
| h-64     | sm:h-64    | md:h-64    | lg:h-64    | xl:h-64    | 2xl:h-64    |
| h-72     | sm:h-72    | md:h-72    | lg:h-72    | xl:h-72    | 2xl:h-72    |
| h-80     | sm:h-80    | md:h-80    | lg:h-80    | xl:h-80    | 2xl:h-80    |
| h-96     | sm:h-96    | md:h-96    | lg:h-96    | xl:h-96    | 2xl:h-96    |
| h-1/2    | sm:h-1/2   | md:h-1/2   | lg:h-1/2   | xl:h-1/2   | 2xl:h-1/2   |
| h-1/3    | sm:h-1/3   | md:h-1/3   | lg:h-1/3   | xl:h-1/3   | 2xl:h-1/3   |
| h-2/3    | sm:h-2/3   | md:h-2/3   | lg:h-2/3   | xl:h-2/3   | 2xl:h-2/3   |
| h-1/4    | sm:h-1/4   | md:h-1/4   | lg:h-1/4   | xl:h-1/4   | 2xl:h-1/4   |
| h-2/4    | sm:h-2/4   | md:h-2/4   | lg:h-2/4   | xl:h-2/4   | 2xl:h-2/4   |
| h-3/4    | sm:h-3/4   | md:h-3/4   | lg:h-3/4   | xl:h-3/4   | 2xl:h-3/4   |
| h-1/5    | sm:h-1/5   | md:h-1/5   | lg:h-1/5   | xl:h-1/5   | 2xl:h-1/5   |
| h-2/5    | sm:h-2/5   | md:h-2/5   | lg:h-2/5   | xl:h-2/5   | 2xl:h-2/5   |
| h-3/5    | sm:h-3/5   | md:h-3/5   | lg:h-3/5   | xl:h-3/5   | 2xl:h-3/5   |
| h-4/5    | sm:h-4/5   | md:h-4/5   | lg:h-4/5   | xl:h-4/5   | 2xl:h-4/5   |
| h-1/6    | sm:h-1/6   | md:h-1/6   | lg:h-1/6   | xl:h-1/6   | 2xl:h-1/6   |
| h-2/6    | sm:h-2/6   | md:h-2/6   | lg:h-2/6   | xl:h-2/6   | 2xl:h-2/6   |
| h-3/6    | sm:h-3/6   | md:h-3/6   | lg:h-3/6   | xl:h-3/6   | 2xl:h-3/6   |
| h-4/6    | sm:h-4/6   | md:h-4/6   | lg:h-4/6   | xl:h-4/6   | 2xl:h-4/6   |
| h-5/6    | sm:h-5/6   | md:h-5/6   | lg:h-5/6   | xl:h-5/6   | 2xl:h-5/6   |
| h-1/12   | sm:h-1/12  | md:h-1/12  | lg:h-1/12  | xl:h-1/12  | 2xl:h-1/12  |
| h-2/12   | sm:h-2/12  | md:h-2/12  | lg:h-2/12  | xl:h-2/12  | 2xl:h-2/12  |
| h-3/12   | sm:h-3/12  | md:h-3/12  | lg:h-3/12  | xl:h-3/12  | 2xl:h-3/12  |
| h-4/12   | sm:h-4/12  | md:h-4/12  | lg:h-4/12  | xl:h-4/12  | 2xl:h-4/12  |
| h-5/12   | sm:h-5/12  | md:h-5/12  | lg:h-5/12  | xl:h-5/12  | 2xl:h-5/12  |
| h-6/12   | sm:h-6/12  | md:h-6/12  | lg:h-6/12  | xl:h-6/12  | 2xl:h-6/12  |
| h-7/12   | sm:h-7/12  | md:h-7/12  | lg:h-7/12  | xl:h-7/12  | 2xl:h-7/12  |
| h-8/12   | sm:h-8/12  | md:h-8/12  | lg:h-8/12  | xl:h-8/12  | 2xl:h-8/12  |
| h-9/12   | sm:h-9/12  | md:h-9/12  | lg:h-9/12  | xl:h-9/12  | 2xl:h-9/12  |
| h-10/12  | sm:h-10/12 | md:h-10/12 | lg:h-10/12 | xl:h-10/12 | 2xl:h-10/12 |
| h-11/12  | sm:h-11/12 | md:h-11/12 | lg:h-11/12 | xl:h-11/12 | 2xl:h-11/12 |
*/