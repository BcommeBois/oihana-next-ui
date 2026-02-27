import getInset , { END } from './inset' ;

/**
 * Generates responsive inline-end position class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Inset value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative inset.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/top-right-end-left
 *
 * @example
 * ```js
 * getEnd( 4 ) ;
 * // → { 'end-4': true }
 *
 * getEnd( -2 ) ;
 * // → { '-end-2': true }
 *
 * getEnd( { xs: 0 , md: 4 } ) ;
 * // → { 'end-0': true , 'md:end-4': true }
 * ```
 */
export const getEnd = ( value , options = {} ) =>
    getInset( value , { ...options , direction: END } ) ;

export default getEnd ;

/* Tailwindcss safe list
| ------XS------ | -------SM------- | -------MD------- | -------LG------- | -------XL------— | -------XXL------- |
| end-auto    | sm:end-auto   | md:end-auto   | lg:end-auto   | xl:end-auto   | 2xl:end-auto   |
| end-px      | sm:end-px     | md:end-px     | lg:end-px     | xl:end-px     | 2xl:end-px     |
| end-0       | sm:end-0      | md:end-0      | lg:end-0      | xl:end-0      | 2xl:end-0      |
| end-0.5     | sm:end-0.5    | md:end-0.5    | lg:end-0.5    | xl:end-0.5    | 2xl:end-0.5    |
| end-1       | sm:end-1      | md:end-1      | lg:end-1      | xl:end-1      | 2xl:end-1      |
| end-1.5     | sm:end-1.5    | md:end-1.5    | lg:end-1.5    | xl:end-1.5    | 2xl:end-1.5    |
| end-2       | sm:end-2      | md:end-2      | lg:end-2      | xl:end-2      | 2xl:end-2      |
| end-2.5     | sm:end-2.5    | md:end-2.5    | lg:end-2.5    | xl:end-2.5    | 2xl:end-2.5    |
| end-3       | sm:end-3      | md:end-3      | lg:end-3      | xl:end-3      | 2xl:end-3      |
| end-3.5     | sm:end-3.5    | md:end-3.5    | lg:end-3.5    | xl:end-3.5    | 2xl:end-3.5    |
| end-4       | sm:end-4      | md:end-4      | lg:end-4      | xl:end-4      | 2xl:end-4      |
| end-5       | sm:end-5      | md:end-5      | lg:end-5      | xl:end-5      | 2xl:end-5      |
| end-6       | sm:end-6      | md:end-6      | lg:end-6      | xl:end-6      | 2xl:end-6      |
| end-7       | sm:end-7      | md:end-7      | lg:end-7      | xl:end-7      | 2xl:end-7      |
| end-8       | sm:end-8      | md:end-8      | lg:end-8      | xl:end-8      | 2xl:end-8      |
| end-9       | sm:end-9      | md:end-9      | lg:end-9      | xl:end-9      | 2xl:end-9      |
| end-10      | sm:end-10     | md:end-10     | lg:end-10     | xl:end-10     | 2xl:end-10     |
| end-11      | sm:end-11     | md:end-11     | lg:end-11     | xl:end-11     | 2xl:end-11     |
| end-12      | sm:end-12     | md:end-12     | lg:end-12     | xl:end-12     | 2xl:end-12     |
| end-14      | sm:end-14     | md:end-14     | lg:end-14     | xl:end-14     | 2xl:end-14     |
| end-16      | sm:end-16     | md:end-16     | lg:end-16     | xl:end-16     | 2xl:end-16     |
| end-20      | sm:end-20     | md:end-20     | lg:end-20     | xl:end-20     | 2xl:end-20     |
| end-24      | sm:end-24     | md:end-24     | lg:end-24     | xl:end-24     | 2xl:end-24     |
| end-28      | sm:end-28     | md:end-28     | lg:end-28     | xl:end-28     | 2xl:end-28     |
| end-32      | sm:end-32     | md:end-32     | lg:end-32     | xl:end-32     | 2xl:end-32     |
| end-36      | sm:end-36     | md:end-36     | lg:end-36     | xl:end-36     | 2xl:end-36     |
| end-40      | sm:end-40     | md:end-40     | lg:end-40     | xl:end-40     | 2xl:end-40     |
| end-44      | sm:end-44     | md:end-44     | lg:end-44     | xl:end-44     | 2xl:end-44     |
| end-48      | sm:end-48     | md:end-48     | lg:end-48     | xl:end-48     | 2xl:end-48     |
| end-52      | sm:end-52     | md:end-52     | lg:end-52     | xl:end-52     | 2xl:end-52     |
| end-56      | sm:end-56     | md:end-56     | lg:end-56     | xl:end-56     | 2xl:end-56     |
| end-60      | sm:end-60     | md:end-60     | lg:end-60     | xl:end-60     | 2xl:end-60     |
| end-64      | sm:end-64     | md:end-64     | lg:end-64     | xl:end-64     | 2xl:end-64     |
| end-72      | sm:end-72     | md:end-72     | lg:end-72     | xl:end-72     | 2xl:end-72     |
| end-80      | sm:end-80     | md:end-80     | lg:end-80     | xl:end-80     | 2xl:end-80     |
| end-96      | sm:end-96     | md:end-96     | lg:end-96     | xl:end-96     | 2xl:end-96     |
| end-full    | sm:end-full   | md:end-full   | lg:end-full   | xl:end-full   | 2xl:end-full   |
| end-1/2     | sm:end-1/2    | md:end-1/2    | lg:end-1/2    | xl:end-1/2    | 2xl:end-1/2    |
| end-1/3     | sm:end-1/3    | md:end-1/3    | lg:end-1/3    | xl:end-1/3    | 2xl:end-1/3    |
| end-2/3     | sm:end-2/3    | md:end-2/3    | lg:end-2/3    | xl:end-2/3    | 2xl:end-2/3    |
| end-1/4     | sm:end-1/4    | md:end-1/4    | lg:end-1/4    | xl:end-1/4    | 2xl:end-1/4    |
| end-2/4     | sm:end-2/4    | md:end-2/4    | lg:end-2/4    | xl:end-2/4    | 2xl:end-2/4    |
| end-3/4     | sm:end-3/4    | md:end-3/4    | lg:end-3/4    | xl:end-3/4    | 2xl:end-3/4    |
| end-1/5     | sm:end-1/5    | md:end-1/5    | lg:end-1/5    | xl:end-1/5    | 2xl:end-1/5    |
| end-2/5     | sm:end-2/5    | md:end-2/5    | lg:end-2/5    | xl:end-2/5    | 2xl:end-2/5    |
| end-3/5     | sm:end-3/5    | md:end-3/5    | lg:end-3/5    | xl:end-3/5    | 2xl:end-3/5    |
| end-4/5     | sm:end-4/5    | md:end-4/5    | lg:end-4/5    | xl:end-4/5    | 2xl:end-4/5    |
| end-1/6     | sm:end-1/6    | md:end-1/6    | lg:end-1/6    | xl:end-1/6    | 2xl:end-1/6    |
| end-2/6     | sm:end-2/6    | md:end-2/6    | lg:end-2/6    | xl:end-2/6    | 2xl:end-2/6    |
| end-3/6     | sm:end-3/6    | md:end-3/6    | lg:end-3/6    | xl:end-3/6    | 2xl:end-3/6    |
| end-4/6     | sm:end-4/6    | md:end-4/6    | lg:end-4/6    | xl:end-4/6    | 2xl:end-4/6    |
| end-5/6     | sm:end-5/6    | md:end-5/6    | lg:end-5/6    | xl:end-5/6    | 2xl:end-5/6    |
| end-1/12    | sm:end-1/12   | md:end-1/12   | lg:end-1/12   | xl:end-1/12   | 2xl:end-1/12   |
| end-2/12    | sm:end-2/12   | md:end-2/12   | lg:end-2/12   | xl:end-2/12   | 2xl:end-2/12   |
| end-3/12    | sm:end-3/12   | md:end-3/12   | lg:end-3/12   | xl:end-3/12   | 2xl:end-3/12   |
| end-4/12    | sm:end-4/12   | md:end-4/12   | lg:end-4/12   | xl:end-4/12   | 2xl:end-4/12   |
| end-5/12    | sm:end-5/12   | md:end-5/12   | lg:end-5/12   | xl:end-5/12   | 2xl:end-5/12   |
| end-6/12    | sm:end-6/12   | md:end-6/12   | lg:end-6/12   | xl:end-6/12   | 2xl:end-6/12   |
| end-7/12    | sm:end-7/12   | md:end-7/12   | lg:end-7/12   | xl:end-7/12   | 2xl:end-7/12   |
| end-8/12    | sm:end-8/12   | md:end-8/12   | lg:end-8/12   | xl:end-8/12   | 2xl:end-8/12   |
| end-9/12    | sm:end-9/12   | md:end-9/12   | lg:end-9/12   | xl:end-9/12   | 2xl:end-9/12   |
| end-10/12   | sm:end-10/12  | md:end-10/12  | lg:end-10/12  | xl:end-10/12  | 2xl:end-10/12  |
| end-11/12   | sm:end-11/12  | md:end-11/12  | lg:end-11/12  | xl:end-11/12  | 2xl:end-11/12  |
*/