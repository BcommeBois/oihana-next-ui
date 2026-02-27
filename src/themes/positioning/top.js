import getInset , { TOP } from './inset' ;

/**
 * Generates responsive top position class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Inset value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative inset.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/top-right-top-left
 *
 * @example
 * ```js
 * getTop( 4 ) ;
 * // → { 'top-4': true }
 *
 * getTop( -2 ) ;
 * // → { '-top-2': true }
 *
 * getTop( { xs: 0 , md: 4 } ) ;
 * // → { 'top-0': true , 'md:top-4': true }
 * ```
 */
export const getTop = ( value , options = {} ) =>
    getInset( value , { ...options , direction: TOP } ) ;

export default getTop ;

/* Tailwindcss safe list
| ------XS------ | -------SM------- | -------MD------- | -------LG------- | -------XL------— | -------XXL------- |
| top-auto    | sm:top-auto   | md:top-auto   | lg:top-auto   | xl:top-auto   | 2xl:top-auto   |
| top-px      | sm:top-px     | md:top-px     | lg:top-px     | xl:top-px     | 2xl:top-px     |
| top-0       | sm:top-0      | md:top-0      | lg:top-0      | xl:top-0      | 2xl:top-0      |
| top-0.5     | sm:top-0.5    | md:top-0.5    | lg:top-0.5    | xl:top-0.5    | 2xl:top-0.5    |
| top-1       | sm:top-1      | md:top-1      | lg:top-1      | xl:top-1      | 2xl:top-1      |
| top-1.5     | sm:top-1.5    | md:top-1.5    | lg:top-1.5    | xl:top-1.5    | 2xl:top-1.5    |
| top-2       | sm:top-2      | md:top-2      | lg:top-2      | xl:top-2      | 2xl:top-2      |
| top-2.5     | sm:top-2.5    | md:top-2.5    | lg:top-2.5    | xl:top-2.5    | 2xl:top-2.5    |
| top-3       | sm:top-3      | md:top-3      | lg:top-3      | xl:top-3      | 2xl:top-3      |
| top-3.5     | sm:top-3.5    | md:top-3.5    | lg:top-3.5    | xl:top-3.5    | 2xl:top-3.5    |
| top-4       | sm:top-4      | md:top-4      | lg:top-4      | xl:top-4      | 2xl:top-4      |
| top-5       | sm:top-5      | md:top-5      | lg:top-5      | xl:top-5      | 2xl:top-5      |
| top-6       | sm:top-6      | md:top-6      | lg:top-6      | xl:top-6      | 2xl:top-6      |
| top-7       | sm:top-7      | md:top-7      | lg:top-7      | xl:top-7      | 2xl:top-7      |
| top-8       | sm:top-8      | md:top-8      | lg:top-8      | xl:top-8      | 2xl:top-8      |
| top-9       | sm:top-9      | md:top-9      | lg:top-9      | xl:top-9      | 2xl:top-9      |
| top-10      | sm:top-10     | md:top-10     | lg:top-10     | xl:top-10     | 2xl:top-10     |
| top-11      | sm:top-11     | md:top-11     | lg:top-11     | xl:top-11     | 2xl:top-11     |
| top-12      | sm:top-12     | md:top-12     | lg:top-12     | xl:top-12     | 2xl:top-12     |
| top-14      | sm:top-14     | md:top-14     | lg:top-14     | xl:top-14     | 2xl:top-14     |
| top-16      | sm:top-16     | md:top-16     | lg:top-16     | xl:top-16     | 2xl:top-16     |
| top-20      | sm:top-20     | md:top-20     | lg:top-20     | xl:top-20     | 2xl:top-20     |
| top-24      | sm:top-24     | md:top-24     | lg:top-24     | xl:top-24     | 2xl:top-24     |
| top-28      | sm:top-28     | md:top-28     | lg:top-28     | xl:top-28     | 2xl:top-28     |
| top-32      | sm:top-32     | md:top-32     | lg:top-32     | xl:top-32     | 2xl:top-32     |
| top-36      | sm:top-36     | md:top-36     | lg:top-36     | xl:top-36     | 2xl:top-36     |
| top-40      | sm:top-40     | md:top-40     | lg:top-40     | xl:top-40     | 2xl:top-40     |
| top-44      | sm:top-44     | md:top-44     | lg:top-44     | xl:top-44     | 2xl:top-44     |
| top-48      | sm:top-48     | md:top-48     | lg:top-48     | xl:top-48     | 2xl:top-48     |
| top-52      | sm:top-52     | md:top-52     | lg:top-52     | xl:top-52     | 2xl:top-52     |
| top-56      | sm:top-56     | md:top-56     | lg:top-56     | xl:top-56     | 2xl:top-56     |
| top-60      | sm:top-60     | md:top-60     | lg:top-60     | xl:top-60     | 2xl:top-60     |
| top-64      | sm:top-64     | md:top-64     | lg:top-64     | xl:top-64     | 2xl:top-64     |
| top-72      | sm:top-72     | md:top-72     | lg:top-72     | xl:top-72     | 2xl:top-72     |
| top-80      | sm:top-80     | md:top-80     | lg:top-80     | xl:top-80     | 2xl:top-80     |
| top-96      | sm:top-96     | md:top-96     | lg:top-96     | xl:top-96     | 2xl:top-96     |
| top-full    | sm:top-full   | md:top-full   | lg:top-full   | xl:top-full   | 2xl:top-full   |
| top-1/2     | sm:top-1/2    | md:top-1/2    | lg:top-1/2    | xl:top-1/2    | 2xl:top-1/2    |
| top-1/3     | sm:top-1/3    | md:top-1/3    | lg:top-1/3    | xl:top-1/3    | 2xl:top-1/3    |
| top-2/3     | sm:top-2/3    | md:top-2/3    | lg:top-2/3    | xl:top-2/3    | 2xl:top-2/3    |
| top-1/4     | sm:top-1/4    | md:top-1/4    | lg:top-1/4    | xl:top-1/4    | 2xl:top-1/4    |
| top-2/4     | sm:top-2/4    | md:top-2/4    | lg:top-2/4    | xl:top-2/4    | 2xl:top-2/4    |
| top-3/4     | sm:top-3/4    | md:top-3/4    | lg:top-3/4    | xl:top-3/4    | 2xl:top-3/4    |
| top-1/5     | sm:top-1/5    | md:top-1/5    | lg:top-1/5    | xl:top-1/5    | 2xl:top-1/5    |
| top-2/5     | sm:top-2/5    | md:top-2/5    | lg:top-2/5    | xl:top-2/5    | 2xl:top-2/5    |
| top-3/5     | sm:top-3/5    | md:top-3/5    | lg:top-3/5    | xl:top-3/5    | 2xl:top-3/5    |
| top-4/5     | sm:top-4/5    | md:top-4/5    | lg:top-4/5    | xl:top-4/5    | 2xl:top-4/5    |
| top-1/6     | sm:top-1/6    | md:top-1/6    | lg:top-1/6    | xl:top-1/6    | 2xl:top-1/6    |
| top-2/6     | sm:top-2/6    | md:top-2/6    | lg:top-2/6    | xl:top-2/6    | 2xl:top-2/6    |
| top-3/6     | sm:top-3/6    | md:top-3/6    | lg:top-3/6    | xl:top-3/6    | 2xl:top-3/6    |
| top-4/6     | sm:top-4/6    | md:top-4/6    | lg:top-4/6    | xl:top-4/6    | 2xl:top-4/6    |
| top-5/6     | sm:top-5/6    | md:top-5/6    | lg:top-5/6    | xl:top-5/6    | 2xl:top-5/6    |
| top-1/12    | sm:top-1/12   | md:top-1/12   | lg:top-1/12   | xl:top-1/12   | 2xl:top-1/12   |
| top-2/12    | sm:top-2/12   | md:top-2/12   | lg:top-2/12   | xl:top-2/12   | 2xl:top-2/12   |
| top-3/12    | sm:top-3/12   | md:top-3/12   | lg:top-3/12   | xl:top-3/12   | 2xl:top-3/12   |
| top-4/12    | sm:top-4/12   | md:top-4/12   | lg:top-4/12   | xl:top-4/12   | 2xl:top-4/12   |
| top-5/12    | sm:top-5/12   | md:top-5/12   | lg:top-5/12   | xl:top-5/12   | 2xl:top-5/12   |
| top-6/12    | sm:top-6/12   | md:top-6/12   | lg:top-6/12   | xl:top-6/12   | 2xl:top-6/12   |
| top-7/12    | sm:top-7/12   | md:top-7/12   | lg:top-7/12   | xl:top-7/12   | 2xl:top-7/12   |
| top-8/12    | sm:top-8/12   | md:top-8/12   | lg:top-8/12   | xl:top-8/12   | 2xl:top-8/12   |
| top-9/12    | sm:top-9/12   | md:top-9/12   | lg:top-9/12   | xl:top-9/12   | 2xl:top-9/12   |
| top-10/12   | sm:top-10/12  | md:top-10/12  | lg:top-10/12  | xl:top-10/12  | 2xl:top-10/12  |
| top-11/12   | sm:top-11/12  | md:top-11/12  | lg:top-11/12  | xl:top-11/12  | 2xl:top-11/12  |
*/