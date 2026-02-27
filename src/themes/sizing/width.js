import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import { allSizes } from './sizes' ;

/**
 * Generates responsive width class definitions.
 *
 * @param {import('./sizes').Size | import('./sizes').ResponsiveSize} value - Width value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/width
 *
 * @example
 * ```js
 * getWidth( 'full' ) ;
 * // → { 'w-full': true }
 *
 * getWidth( { xs: 'full' , md: '1/2' , lg: '1/3' } ) ;
 * // → { 'w-full': true , 'md:w-1/2': true , 'lg:w-1/3': true }
 * ```
 */
const getWidth = getResponsiveDefinition
(
    create( 'w-' ) ,
    ( value ) => allSizes.includes( value )
) ;

export default getWidth ;

/* Tailwindcss safe list
| ---XS--- | ----SM---- | ----MD---- | ----LG---- | ----XL---— | ----XXL---- | ----------------------------------------------------------------------------- |
| w-auto   | sm:w-auto  | md:w-auto  | lg:w-auto  | xl:w-auto  | 2xl:w-auto  | !w-auto   | after:!w-auto  | before:!w-auto  | after:w-auto  | before:w-auto  |
| w-fit    | sm:w-fit   | md:w-fit   | lg:w-fit   | xl:w-fit   | 2xl:w-fit   | !w-fit    | after:!w-fit   | before:!w-fit   | after:w-fit   | before:w-fit   |
| w-full   | sm:w-full  | md:w-full  | lg:w-full  | xl:w-full  | 2xl:w-full  | !w-full   | after:!w-full  | before:!w-full  | after:w-full  | before:w-full  |
| w-max    | sm:w-max   | md:w-max   | lg:w-max   | xl:w-max   | 2xl:w-max   | !w-max    | after:!w-max   | before:!w-max   | after:w-max   | before:w-max   |
| w-min    | sm:w-min   | md:w-min   | lg:w-min   | xl:w-min   | 2xl:w-min   | !w-min    | after:!w-min   | before:!w-min   | after:w-min   | before:w-min   |
| w-px     | sm:w-px    | md:w-px    | lg:w-px    | xl:w-px    | 2xl:w-px    | !w-px     | after:!w-px    | before:!w-px    | after:w-px    | before:w-px    |
| w-0      | sm:w-0     | md:w-0     | lg:w-0     | xl:w-0     | 2xl:w-0     | !w-0      | after:!w-0     | before:!w-0     | after:w-0     | before:w-0     |
| w-0.5    | sm:w-0.5   | md:w-0.5   | lg:w-0.5   | xl:w-0.5   | 2xl:w-0.5   | !w-0.5    | after:!w-0.5   | before:!w-0.5   | after:w-0.5   | before:w-0.5   |
| w-1      | sm:w-1     | md:w-1     | lg:w-1     | xl:w-1     | 2xl:w-1     | !w-1      | after:!w-1     | before:!w-1     | after:w-1     | before:w-1     |
| w-1.5    | sm:w-1.5   | md:w-1.5   | lg:w-1.5   | xl:w-1.5   | 2xl:w-1.5   | !w-1.5    | after:!w-1.5   | before:!w-1.5   | after:w-1.5   | before:w-1.5   |
| w-2      | sm:w-2     | md:w-2     | lg:w-2     | xl:w-2     | 2xl:w-2     | !w-2      | after:!w-2     | before:!w-2     | after:w-2     | before:w-2     |
| w-2.5    | sm:w-2.5   | md:w-2.5   | lg:w-2.5   | xl:w-2.5   | 2xl:w-2.5   | !w-2.5    | after:!w-2.5   | before:!w-2.5   | after:w-2.5   | before:w-2.5   |
| w-3      | sm:w-3     | md:w-3     | lg:w-3     | xl:w-3     | 2xl:w-3     | !w-3      | after:!w-3     | before:!w-3     | after:w-3     | before:w-3     |
| w-3.5    | sm:w-3.5   | md:w-3.5   | lg:w-3.5   | xl:w-3.5   | 2xl:w-3.5   | !w-3.5    | after:!w-3.5   | before:!w-3.5   | after:w-3.5   | before:w-3.5   |
| w-4      | sm:w-4     | md:w-4     | lg:w-4     | xl:w-4     | 2xl:w-4     | !w-4      | after:!w-4     | before:!w-4     | after:w-4     | before:w-4     |
| w-5      | sm:w-5     | md:w-5     | lg:w-5     | xl:w-5     | 2xl:w-5     | !w-5      | after:!w-5     | before:!w-5     | after:w-5     | before:w-5     |
| w-6      | sm:w-6     | md:w-6     | lg:w-6     | xl:w-6     | 2xl:w-6     | !w-6      | after:!w-6     | before:!w-6     | after:w-6     | before:w-6     |
| w-7      | sm:w-7     | md:w-7     | lg:w-7     | xl:w-7     | 2xl:w-7     | !w-7      | after:!w-7     | before:!w-7     | after:w-7     | before:w-7     |
| w-8      | sm:w-8     | md:w-8     | lg:w-8     | xl:w-8     | 2xl:w-8     | !w-8      | after:!w-8     | before:!w-8     | after:w-8     | before:w-8     |
| w-9      | sm:w-9     | md:w-9     | lg:w-9     | xl:w-9     | 2xl:w-9     | !w-9      | after:!w-9     | before:!w-9     | after:w-9     | before:w-9     |
| w-10     | sm:w-10    | md:w-10    | lg:w-10    | xl:w-10    | 2xl:w-10    | !w-10     | after:!w-10    | before:!w-10    | after:w-10    | before:w-10    |
| w-11     | sm:w-11    | md:w-11    | lg:w-11    | xl:w-11    | 2xl:w-11    | !w-11     | after:!w-11    | before:!w-11    | after:w-11    | before:w-11    |
| w-12     | sm:w-12    | md:w-12    | lg:w-12    | xl:w-12    | 2xl:w-12    | !w-12     | after:!w-12    | before:!w-12    | after:w-12    | before:w-12    |
| w-14     | sm:w-14    | md:w-14    | lg:w-14    | xl:w-14    | 2xl:w-14    | !w-14     | after:!w-14    | before:!w-14    | after:w-14    | before:w-14    |
| w-16     | sm:w-16    | md:w-16    | lg:w-16    | xl:w-16    | 2xl:w-16    | !w-16     | after:!w-16    | before:!w-16    | after:w-16    | before:w-16    |
| w-20     | sm:w-20    | md:w-20    | lg:w-20    | xl:w-20    | 2xl:w-20    | !w-20     | after:!w-20    | before:!w-20    | after:w-20    | before:w-20    |
| w-24     | sm:w-24    | md:w-24    | lg:w-24    | xl:w-24    | 2xl:w-24    | !w-24     | after:!w-24    | before:!w-24    | after:w-24    | before:w-24    |
| w-28     | sm:w-28    | md:w-28    | lg:w-28    | xl:w-28    | 2xl:w-28    | !w-28     | after:!w-28    | before:!w-28    | after:w-28    | before:w-28    |
| w-32     | sm:w-32    | md:w-32    | lg:w-32    | xl:w-32    | 2xl:w-32    | !w-32     | after:!w-32    | before:!w-32    | after:w-32    | before:w-32    |
| w-36     | sm:w-36    | md:w-36    | lg:w-36    | xl:w-36    | 2xl:w-36    | !w-36     | after:!w-36    | before:!w-36    | after:w-36    | before:w-36    |
| w-40     | sm:w-40    | md:w-40    | lg:w-40    | xl:w-40    | 2xl:w-40    | !w-40     | after:!w-40    | before:!w-40    | after:w-40    | before:w-40    |
| w-44     | sm:w-44    | md:w-44    | lg:w-44    | xl:w-44    | 2xl:w-44    | !w-44     | after:!w-44    | before:!w-44    | after:w-44    | before:w-44    |
| w-48     | sm:w-48    | md:w-48    | lg:w-48    | xl:w-48    | 2xl:w-48    | !w-48     | after:!w-48    | before:!w-48    | after:w-48    | before:w-48    |
| w-52     | sm:w-52    | md:w-52    | lg:w-52    | xl:w-52    | 2xl:w-52    | !w-52     | after:!w-52    | before:!w-52    | after:w-52    | before:w-52    |
| w-56     | sm:w-56    | md:w-56    | lg:w-56    | xl:w-56    | 2xl:w-56    | !w-56     | after:!w-56    | before:!w-56    | after:w-56    | before:w-56    |
| w-60     | sm:w-60    | md:w-60    | lg:w-60    | xl:w-60    | 2xl:w-60    | !w-60     | after:!w-60    | before:!w-60    | after:w-60    | before:w-60    |
| w-64     | sm:w-64    | md:w-64    | lg:w-64    | xl:w-64    | 2xl:w-64    | !w-64     | after:!w-64    | before:!w-64    | after:w-64    | before:w-64    |
| w-72     | sm:w-72    | md:w-72    | lg:w-72    | xl:w-72    | 2xl:w-72    | !w-72     | after:!w-72    | before:!w-72    | after:w-72    | before:w-72    |
| w-80     | sm:w-80    | md:w-80    | lg:w-80    | xl:w-80    | 2xl:w-80    | !w-80     | after:!w-80    | before:!w-80    | after:w-80    | before:w-80    |
| w-96     | sm:w-96    | md:w-96    | lg:w-96    | xl:w-96    | 2xl:w-96    | !w-96     | after:!w-96    | before:!w-96    | after:w-96    | before:w-96    |
| w-1/2    | sm:w-1/2   | md:w-1/2   | lg:w-1/2   | xl:w-1/2   | 2xl:w-1/2   | !w-1/2    | after:!w-1/2   | before:!w-1/2   | after:w-1/2   | before:w-1/2   |
| w-1/3    | sm:w-1/3   | md:w-1/3   | lg:w-1/3   | xl:w-1/3   | 2xl:w-1/3   | !w-1/3    | after:!w-1/3   | before:!w-1/3   | after:w-1/3   | before:w-1/3   |
| w-2/3    | sm:w-2/3   | md:w-2/3   | lg:w-2/3   | xl:w-2/3   | 2xl:w-2/3   | !w-2/3    | after:!w-2/3   | before:!w-2/3   | after:w-2/3   | before:w-2/3   |
| w-1/4    | sm:w-1/4   | md:w-1/4   | lg:w-1/4   | xl:w-1/4   | 2xl:w-1/4   | !w-1/4    | after:!w-1/4   | before:!w-1/4   | after:w-1/4   | before:w-1/4   |
| w-2/4    | sm:w-2/4   | md:w-2/4   | lg:w-2/4   | xl:w-2/4   | 2xl:w-2/4   | !w-2/4    | after:!w-2/4   | before:!w-2/4   | after:w-2/4   | before:w-2/4   |
| w-3/4    | sm:w-3/4   | md:w-3/4   | lg:w-3/4   | xl:w-3/4   | 2xl:w-3/4   | !w-3/4    | after:!w-3/4   | before:!w-3/4   | after:w-3/4   | before:w-3/4   |
| w-1/5    | sm:w-1/5   | md:w-1/5   | lg:w-1/5   | xl:w-1/5   | 2xl:w-1/5   | !w-1/5    | after:!w-1/5   | before:!w-1/5   | after:w-1/5   | before:w-1/5   |
| w-2/5    | sm:w-2/5   | md:w-2/5   | lg:w-2/5   | xl:w-2/5   | 2xl:w-2/5   | !w-2/5    | after:!w-2/5   | before:!w-2/5   | after:w-2/5   | before:w-2/5   |
| w-3/5    | sm:w-3/5   | md:w-3/5   | lg:w-3/5   | xl:w-3/5   | 2xl:w-3/5   | !w-3/5    | after:!w-3/5   | before:!w-3/5   | after:w-3/5   | before:w-3/5   |
| w-4/5    | sm:w-4/5   | md:w-4/5   | lg:w-4/5   | xl:w-4/5   | 2xl:w-4/5   | !w-4/5    | after:!w-4/5   | before:!w-4/5   | after:w-4/5   | before:w-4/5   |
| w-1/6    | sm:w-1/6   | md:w-1/6   | lg:w-1/6   | xl:w-1/6   | 2xl:w-1/6   | !w-1/6    | after:!w-1/6   | before:!w-1/6   | after:w-1/6   | before:w-1/6   |
| w-2/6    | sm:w-2/6   | md:w-2/6   | lg:w-2/6   | xl:w-2/6   | 2xl:w-2/6   | !w-2/6    | after:!w-2/6   | before:!w-2/6   | after:w-2/6   | before:w-2/6   |
| w-3/6    | sm:w-3/6   | md:w-3/6   | lg:w-3/6   | xl:w-3/6   | 2xl:w-3/6   | !w-3/6    | after:!w-3/6   | before:!w-3/6   | after:w-3/6   | before:w-3/6   |
| w-4/6    | sm:w-4/6   | md:w-4/6   | lg:w-4/6   | xl:w-4/6   | 2xl:w-4/6   | !w-4/6    | after:!w-4/6   | before:!w-4/6   | after:w-4/6   | before:w-4/6   |
| w-5/6    | sm:w-5/6   | md:w-5/6   | lg:w-5/6   | xl:w-5/6   | 2xl:w-5/6   | !w-5/6    | after:!w-5/6   | before:!w-5/6   | after:w-5/6   | before:w-5/6   |
| w-1/12   | sm:w-1/12  | md:w-1/12  | lg:w-1/12  | xl:w-1/12  | 2xl:w-1/12  | !w-1/12   | after:!w-1/12  | before:!w-1/12  | after:w-1/12  | before:w-1/12  |
| w-2/12   | sm:w-2/12  | md:w-2/12  | lg:w-2/12  | xl:w-2/12  | 2xl:w-2/12  | !w-2/12   | after:!w-2/12  | before:!w-2/12  | after:w-2/12  | before:w-2/12  |
| w-3/12   | sm:w-3/12  | md:w-3/12  | lg:w-3/12  | xl:w-3/12  | 2xl:w-3/12  | !w-3/12   | after:!w-3/12  | before:!w-3/12  | after:w-3/12  | before:w-3/12  |
| w-4/12   | sm:w-4/12  | md:w-4/12  | lg:w-4/12  | xl:w-4/12  | 2xl:w-4/12  | !w-4/12   | after:!w-4/12  | before:!w-4/12  | after:w-4/12  | before:w-4/12  |
| w-5/12   | sm:w-5/12  | md:w-5/12  | lg:w-5/12  | xl:w-5/12  | 2xl:w-5/12  | !w-5/12   | after:!w-5/12  | before:!w-5/12  | after:w-5/12  | before:w-5/12  |
| w-6/12   | sm:w-6/12  | md:w-6/12  | lg:w-6/12  | xl:w-6/12  | 2xl:w-6/12  | !w-6/12   | after:!w-6/12  | before:!w-6/12  | after:w-6/12  | before:w-6/12  |
| w-7/12   | sm:w-7/12  | md:w-7/12  | lg:w-7/12  | xl:w-7/12  | 2xl:w-7/12  | !w-7/12   | after:!w-7/12  | before:!w-7/12  | after:w-7/12  | before:w-7/12  |
| w-8/12   | sm:w-8/12  | md:w-8/12  | lg:w-8/12  | xl:w-8/12  | 2xl:w-8/12  | !w-8/12   | after:!w-8/12  | before:!w-8/12  | after:w-8/12  | before:w-8/12  |
| w-9/12   | sm:w-9/12  | md:w-9/12  | lg:w-9/12  | xl:w-9/12  | 2xl:w-9/12  | !w-9/12   | after:!w-9/12  | before:!w-9/12  | after:w-9/12  | before:w-9/12  |
| w-10/12  | sm:w-10/12 | md:w-10/12 | lg:w-10/12 | xl:w-10/12 | 2xl:w-10/12 | !w-10/12  | after:!w-10/12 | before:!w-10/12 | after:w-10/12 | before:w-10/12 |
| w-11/12  | sm:w-11/12 | md:w-11/12 | lg:w-11/12 | xl:w-11/12 | 2xl:w-11/12 | !w-11/12  | after:!w-11/12 | before:!w-11/12 | after:w-11/12 | before:w-11/12 |
*/