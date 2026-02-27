import getInset , { LEFT } from './inset' ;

/**
 * Generates responsive left position class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Inset value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative inset.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/top-right-left-left
 *
 * @example
 * ```js
 * getLeft( 4 ) ;
 * // → { 'left-4': true }
 *
 * getLeft( -2 ) ;
 * // → { '-left-2': true }
 *
 * getLeft( { xs: 0 , md: 4 } ) ;
 * // → { 'left-0': true , 'md:left-4': true }
 * ```
 */
export const getLeft = ( value , options = {} ) =>
    getInset( value , { ...options , direction: LEFT } ) ;

export default getLeft ;

/* Tailwindcss safe list
| ------XS------ | -------SM------- | -------MD------- | -------LG------- | -------XL------— | -------XXL------- |
| left-auto    | sm:left-auto   | md:left-auto   | lg:left-auto   | xl:left-auto   | 2xl:left-auto   |
| left-px      | sm:left-px     | md:left-px     | lg:left-px     | xl:left-px     | 2xl:left-px     |
| left-0       | sm:left-0      | md:left-0      | lg:left-0      | xl:left-0      | 2xl:left-0      |
| left-0.5     | sm:left-0.5    | md:left-0.5    | lg:left-0.5    | xl:left-0.5    | 2xl:left-0.5    |
| left-1       | sm:left-1      | md:left-1      | lg:left-1      | xl:left-1      | 2xl:left-1      |
| left-1.5     | sm:left-1.5    | md:left-1.5    | lg:left-1.5    | xl:left-1.5    | 2xl:left-1.5    |
| left-2       | sm:left-2      | md:left-2      | lg:left-2      | xl:left-2      | 2xl:left-2      |
| left-2.5     | sm:left-2.5    | md:left-2.5    | lg:left-2.5    | xl:left-2.5    | 2xl:left-2.5    |
| left-3       | sm:left-3      | md:left-3      | lg:left-3      | xl:left-3      | 2xl:left-3      |
| left-3.5     | sm:left-3.5    | md:left-3.5    | lg:left-3.5    | xl:left-3.5    | 2xl:left-3.5    |
| left-4       | sm:left-4      | md:left-4      | lg:left-4      | xl:left-4      | 2xl:left-4      |
| left-5       | sm:left-5      | md:left-5      | lg:left-5      | xl:left-5      | 2xl:left-5      |
| left-6       | sm:left-6      | md:left-6      | lg:left-6      | xl:left-6      | 2xl:left-6      |
| left-7       | sm:left-7      | md:left-7      | lg:left-7      | xl:left-7      | 2xl:left-7      |
| left-8       | sm:left-8      | md:left-8      | lg:left-8      | xl:left-8      | 2xl:left-8      |
| left-9       | sm:left-9      | md:left-9      | lg:left-9      | xl:left-9      | 2xl:left-9      |
| left-10      | sm:left-10     | md:left-10     | lg:left-10     | xl:left-10     | 2xl:left-10     |
| left-11      | sm:left-11     | md:left-11     | lg:left-11     | xl:left-11     | 2xl:left-11     |
| left-12      | sm:left-12     | md:left-12     | lg:left-12     | xl:left-12     | 2xl:left-12     |
| left-14      | sm:left-14     | md:left-14     | lg:left-14     | xl:left-14     | 2xl:left-14     |
| left-16      | sm:left-16     | md:left-16     | lg:left-16     | xl:left-16     | 2xl:left-16     |
| left-20      | sm:left-20     | md:left-20     | lg:left-20     | xl:left-20     | 2xl:left-20     |
| left-24      | sm:left-24     | md:left-24     | lg:left-24     | xl:left-24     | 2xl:left-24     |
| left-28      | sm:left-28     | md:left-28     | lg:left-28     | xl:left-28     | 2xl:left-28     |
| left-32      | sm:left-32     | md:left-32     | lg:left-32     | xl:left-32     | 2xl:left-32     |
| left-36      | sm:left-36     | md:left-36     | lg:left-36     | xl:left-36     | 2xl:left-36     |
| left-40      | sm:left-40     | md:left-40     | lg:left-40     | xl:left-40     | 2xl:left-40     |
| left-44      | sm:left-44     | md:left-44     | lg:left-44     | xl:left-44     | 2xl:left-44     |
| left-48      | sm:left-48     | md:left-48     | lg:left-48     | xl:left-48     | 2xl:left-48     |
| left-52      | sm:left-52     | md:left-52     | lg:left-52     | xl:left-52     | 2xl:left-52     |
| left-56      | sm:left-56     | md:left-56     | lg:left-56     | xl:left-56     | 2xl:left-56     |
| left-60      | sm:left-60     | md:left-60     | lg:left-60     | xl:left-60     | 2xl:left-60     |
| left-64      | sm:left-64     | md:left-64     | lg:left-64     | xl:left-64     | 2xl:left-64     |
| left-72      | sm:left-72     | md:left-72     | lg:left-72     | xl:left-72     | 2xl:left-72     |
| left-80      | sm:left-80     | md:left-80     | lg:left-80     | xl:left-80     | 2xl:left-80     |
| left-96      | sm:left-96     | md:left-96     | lg:left-96     | xl:left-96     | 2xl:left-96     |
| left-full    | sm:left-full   | md:left-full   | lg:left-full   | xl:left-full   | 2xl:left-full   |
| left-1/2     | sm:left-1/2    | md:left-1/2    | lg:left-1/2    | xl:left-1/2    | 2xl:left-1/2    |
| left-1/3     | sm:left-1/3    | md:left-1/3    | lg:left-1/3    | xl:left-1/3    | 2xl:left-1/3    |
| left-2/3     | sm:left-2/3    | md:left-2/3    | lg:left-2/3    | xl:left-2/3    | 2xl:left-2/3    |
| left-1/4     | sm:left-1/4    | md:left-1/4    | lg:left-1/4    | xl:left-1/4    | 2xl:left-1/4    |
| left-2/4     | sm:left-2/4    | md:left-2/4    | lg:left-2/4    | xl:left-2/4    | 2xl:left-2/4    |
| left-3/4     | sm:left-3/4    | md:left-3/4    | lg:left-3/4    | xl:left-3/4    | 2xl:left-3/4    |
| left-1/5     | sm:left-1/5    | md:left-1/5    | lg:left-1/5    | xl:left-1/5    | 2xl:left-1/5    |
| left-2/5     | sm:left-2/5    | md:left-2/5    | lg:left-2/5    | xl:left-2/5    | 2xl:left-2/5    |
| left-3/5     | sm:left-3/5    | md:left-3/5    | lg:left-3/5    | xl:left-3/5    | 2xl:left-3/5    |
| left-4/5     | sm:left-4/5    | md:left-4/5    | lg:left-4/5    | xl:left-4/5    | 2xl:left-4/5    |
| left-1/6     | sm:left-1/6    | md:left-1/6    | lg:left-1/6    | xl:left-1/6    | 2xl:left-1/6    |
| left-2/6     | sm:left-2/6    | md:left-2/6    | lg:left-2/6    | xl:left-2/6    | 2xl:left-2/6    |
| left-3/6     | sm:left-3/6    | md:left-3/6    | lg:left-3/6    | xl:left-3/6    | 2xl:left-3/6    |
| left-4/6     | sm:left-4/6    | md:left-4/6    | lg:left-4/6    | xl:left-4/6    | 2xl:left-4/6    |
| left-5/6     | sm:left-5/6    | md:left-5/6    | lg:left-5/6    | xl:left-5/6    | 2xl:left-5/6    |
| left-1/12    | sm:left-1/12   | md:left-1/12   | lg:left-1/12   | xl:left-1/12   | 2xl:left-1/12   |
| left-2/12    | sm:left-2/12   | md:left-2/12   | lg:left-2/12   | xl:left-2/12   | 2xl:left-2/12   |
| left-3/12    | sm:left-3/12   | md:left-3/12   | lg:left-3/12   | xl:left-3/12   | 2xl:left-3/12   |
| left-4/12    | sm:left-4/12   | md:left-4/12   | lg:left-4/12   | xl:left-4/12   | 2xl:left-4/12   |
| left-5/12    | sm:left-5/12   | md:left-5/12   | lg:left-5/12   | xl:left-5/12   | 2xl:left-5/12   |
| left-6/12    | sm:left-6/12   | md:left-6/12   | lg:left-6/12   | xl:left-6/12   | 2xl:left-6/12   |
| left-7/12    | sm:left-7/12   | md:left-7/12   | lg:left-7/12   | xl:left-7/12   | 2xl:left-7/12   |
| left-8/12    | sm:left-8/12   | md:left-8/12   | lg:left-8/12   | xl:left-8/12   | 2xl:left-8/12   |
| left-9/12    | sm:left-9/12   | md:left-9/12   | lg:left-9/12   | xl:left-9/12   | 2xl:left-9/12   |
| left-10/12   | sm:left-10/12  | md:left-10/12  | lg:left-10/12  | xl:left-10/12  | 2xl:left-10/12  |
| left-11/12   | sm:left-11/12  | md:left-11/12  | lg:left-11/12  | xl:left-11/12  | 2xl:left-11/12  |
*/