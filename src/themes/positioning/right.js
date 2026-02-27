import getInset , { RIGHT } from './inset' ;

/**
 * Generates responsive right position class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Inset value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative inset.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/top-right-right-left
 *
 * @example
 * ```js
 * getRight( 4 ) ;
 * // → { 'right-4': true }
 *
 * getRight( -2 ) ;
 * // → { '-right-2': true }
 *
 * getRight( { xs: 0 , md: 4 } ) ;
 * // → { 'right-0': true , 'md:right-4': true }
 * ```
 */
export const getRight = ( value , options = {} ) =>
    getInset( value , { ...options , direction: RIGHT } ) ;

export default getRight ;

/* Tailwindcss safe list
| ------XS------ | -------SM------- | -------MD------- | -------LG------- | -------XL------— | -------XXL------- |
| right-auto    | sm:right-auto   | md:right-auto   | lg:right-auto   | xl:right-auto   | 2xl:right-auto   |
| right-px      | sm:right-px     | md:right-px     | lg:right-px     | xl:right-px     | 2xl:right-px     |
| right-0       | sm:right-0      | md:right-0      | lg:right-0      | xl:right-0      | 2xl:right-0      |
| right-0.5     | sm:right-0.5    | md:right-0.5    | lg:right-0.5    | xl:right-0.5    | 2xl:right-0.5    |
| right-1       | sm:right-1      | md:right-1      | lg:right-1      | xl:right-1      | 2xl:right-1      |
| right-1.5     | sm:right-1.5    | md:right-1.5    | lg:right-1.5    | xl:right-1.5    | 2xl:right-1.5    |
| right-2       | sm:right-2      | md:right-2      | lg:right-2      | xl:right-2      | 2xl:right-2      |
| right-2.5     | sm:right-2.5    | md:right-2.5    | lg:right-2.5    | xl:right-2.5    | 2xl:right-2.5    |
| right-3       | sm:right-3      | md:right-3      | lg:right-3      | xl:right-3      | 2xl:right-3      |
| right-3.5     | sm:right-3.5    | md:right-3.5    | lg:right-3.5    | xl:right-3.5    | 2xl:right-3.5    |
| right-4       | sm:right-4      | md:right-4      | lg:right-4      | xl:right-4      | 2xl:right-4      |
| right-5       | sm:right-5      | md:right-5      | lg:right-5      | xl:right-5      | 2xl:right-5      |
| right-6       | sm:right-6      | md:right-6      | lg:right-6      | xl:right-6      | 2xl:right-6      |
| right-7       | sm:right-7      | md:right-7      | lg:right-7      | xl:right-7      | 2xl:right-7      |
| right-8       | sm:right-8      | md:right-8      | lg:right-8      | xl:right-8      | 2xl:right-8      |
| right-9       | sm:right-9      | md:right-9      | lg:right-9      | xl:right-9      | 2xl:right-9      |
| right-10      | sm:right-10     | md:right-10     | lg:right-10     | xl:right-10     | 2xl:right-10     |
| right-11      | sm:right-11     | md:right-11     | lg:right-11     | xl:right-11     | 2xl:right-11     |
| right-12      | sm:right-12     | md:right-12     | lg:right-12     | xl:right-12     | 2xl:right-12     |
| right-14      | sm:right-14     | md:right-14     | lg:right-14     | xl:right-14     | 2xl:right-14     |
| right-16      | sm:right-16     | md:right-16     | lg:right-16     | xl:right-16     | 2xl:right-16     |
| right-20      | sm:right-20     | md:right-20     | lg:right-20     | xl:right-20     | 2xl:right-20     |
| right-24      | sm:right-24     | md:right-24     | lg:right-24     | xl:right-24     | 2xl:right-24     |
| right-28      | sm:right-28     | md:right-28     | lg:right-28     | xl:right-28     | 2xl:right-28     |
| right-32      | sm:right-32     | md:right-32     | lg:right-32     | xl:right-32     | 2xl:right-32     |
| right-36      | sm:right-36     | md:right-36     | lg:right-36     | xl:right-36     | 2xl:right-36     |
| right-40      | sm:right-40     | md:right-40     | lg:right-40     | xl:right-40     | 2xl:right-40     |
| right-44      | sm:right-44     | md:right-44     | lg:right-44     | xl:right-44     | 2xl:right-44     |
| right-48      | sm:right-48     | md:right-48     | lg:right-48     | xl:right-48     | 2xl:right-48     |
| right-52      | sm:right-52     | md:right-52     | lg:right-52     | xl:right-52     | 2xl:right-52     |
| right-56      | sm:right-56     | md:right-56     | lg:right-56     | xl:right-56     | 2xl:right-56     |
| right-60      | sm:right-60     | md:right-60     | lg:right-60     | xl:right-60     | 2xl:right-60     |
| right-64      | sm:right-64     | md:right-64     | lg:right-64     | xl:right-64     | 2xl:right-64     |
| right-72      | sm:right-72     | md:right-72     | lg:right-72     | xl:right-72     | 2xl:right-72     |
| right-80      | sm:right-80     | md:right-80     | lg:right-80     | xl:right-80     | 2xl:right-80     |
| right-96      | sm:right-96     | md:right-96     | lg:right-96     | xl:right-96     | 2xl:right-96     |
| right-full    | sm:right-full   | md:right-full   | lg:right-full   | xl:right-full   | 2xl:right-full   |
| right-1/2     | sm:right-1/2    | md:right-1/2    | lg:right-1/2    | xl:right-1/2    | 2xl:right-1/2    |
| right-1/3     | sm:right-1/3    | md:right-1/3    | lg:right-1/3    | xl:right-1/3    | 2xl:right-1/3    |
| right-2/3     | sm:right-2/3    | md:right-2/3    | lg:right-2/3    | xl:right-2/3    | 2xl:right-2/3    |
| right-1/4     | sm:right-1/4    | md:right-1/4    | lg:right-1/4    | xl:right-1/4    | 2xl:right-1/4    |
| right-2/4     | sm:right-2/4    | md:right-2/4    | lg:right-2/4    | xl:right-2/4    | 2xl:right-2/4    |
| right-3/4     | sm:right-3/4    | md:right-3/4    | lg:right-3/4    | xl:right-3/4    | 2xl:right-3/4    |
| right-1/5     | sm:right-1/5    | md:right-1/5    | lg:right-1/5    | xl:right-1/5    | 2xl:right-1/5    |
| right-2/5     | sm:right-2/5    | md:right-2/5    | lg:right-2/5    | xl:right-2/5    | 2xl:right-2/5    |
| right-3/5     | sm:right-3/5    | md:right-3/5    | lg:right-3/5    | xl:right-3/5    | 2xl:right-3/5    |
| right-4/5     | sm:right-4/5    | md:right-4/5    | lg:right-4/5    | xl:right-4/5    | 2xl:right-4/5    |
| right-1/6     | sm:right-1/6    | md:right-1/6    | lg:right-1/6    | xl:right-1/6    | 2xl:right-1/6    |
| right-2/6     | sm:right-2/6    | md:right-2/6    | lg:right-2/6    | xl:right-2/6    | 2xl:right-2/6    |
| right-3/6     | sm:right-3/6    | md:right-3/6    | lg:right-3/6    | xl:right-3/6    | 2xl:right-3/6    |
| right-4/6     | sm:right-4/6    | md:right-4/6    | lg:right-4/6    | xl:right-4/6    | 2xl:right-4/6    |
| right-5/6     | sm:right-5/6    | md:right-5/6    | lg:right-5/6    | xl:right-5/6    | 2xl:right-5/6    |
| right-1/12    | sm:right-1/12   | md:right-1/12   | lg:right-1/12   | xl:right-1/12   | 2xl:right-1/12   |
| right-2/12    | sm:right-2/12   | md:right-2/12   | lg:right-2/12   | xl:right-2/12   | 2xl:right-2/12   |
| right-3/12    | sm:right-3/12   | md:right-3/12   | lg:right-3/12   | xl:right-3/12   | 2xl:right-3/12   |
| right-4/12    | sm:right-4/12   | md:right-4/12   | lg:right-4/12   | xl:right-4/12   | 2xl:right-4/12   |
| right-5/12    | sm:right-5/12   | md:right-5/12   | lg:right-5/12   | xl:right-5/12   | 2xl:right-5/12   |
| right-6/12    | sm:right-6/12   | md:right-6/12   | lg:right-6/12   | xl:right-6/12   | 2xl:right-6/12   |
| right-7/12    | sm:right-7/12   | md:right-7/12   | lg:right-7/12   | xl:right-7/12   | 2xl:right-7/12   |
| right-8/12    | sm:right-8/12   | md:right-8/12   | lg:right-8/12   | xl:right-8/12   | 2xl:right-8/12   |
| right-9/12    | sm:right-9/12   | md:right-9/12   | lg:right-9/12   | xl:right-9/12   | 2xl:right-9/12   |
| right-10/12   | sm:right-10/12  | md:right-10/12  | lg:right-10/12  | xl:right-10/12  | 2xl:right-10/12  |
| right-11/12   | sm:right-11/12  | md:right-11/12  | lg:right-11/12  | xl:right-11/12  | 2xl:right-11/12  |
*/