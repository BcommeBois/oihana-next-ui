import getInset , { START } from './inset' ;

/**
 * Generates responsive inline-start position class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Inset value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative inset.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/top-right-start-left
 *
 * @example
 * ```js
 * getStart( 4 ) ;
 * // → { 'start-4': true }
 *
 * getStart( -2 ) ;
 * // → { '-start-2': true }
 *
 * getStart( { xs: 0 , md: 4 } ) ;
 * // → { 'start-0': true , 'md:start-4': true }
 * ```
 */
export const getStart = ( value , options = {} ) =>
    getInset( value , { ...options , direction: START } ) ;

export default getStart ;

/* Tailwindcss safe list
| ------XS------ | -------SM------- | -------MD------- | -------LG------- | -------XL------— | -------XXL------- |
| start-auto    | sm:start-auto   | md:start-auto   | lg:start-auto   | xl:start-auto   | 2xl:start-auto   |
| start-px      | sm:start-px     | md:start-px     | lg:start-px     | xl:start-px     | 2xl:start-px     |
| start-0       | sm:start-0      | md:start-0      | lg:start-0      | xl:start-0      | 2xl:start-0      |
| start-0.5     | sm:start-0.5    | md:start-0.5    | lg:start-0.5    | xl:start-0.5    | 2xl:start-0.5    |
| start-1       | sm:start-1      | md:start-1      | lg:start-1      | xl:start-1      | 2xl:start-1      |
| start-1.5     | sm:start-1.5    | md:start-1.5    | lg:start-1.5    | xl:start-1.5    | 2xl:start-1.5    |
| start-2       | sm:start-2      | md:start-2      | lg:start-2      | xl:start-2      | 2xl:start-2      |
| start-2.5     | sm:start-2.5    | md:start-2.5    | lg:start-2.5    | xl:start-2.5    | 2xl:start-2.5    |
| start-3       | sm:start-3      | md:start-3      | lg:start-3      | xl:start-3      | 2xl:start-3      |
| start-3.5     | sm:start-3.5    | md:start-3.5    | lg:start-3.5    | xl:start-3.5    | 2xl:start-3.5    |
| start-4       | sm:start-4      | md:start-4      | lg:start-4      | xl:start-4      | 2xl:start-4      |
| start-5       | sm:start-5      | md:start-5      | lg:start-5      | xl:start-5      | 2xl:start-5      |
| start-6       | sm:start-6      | md:start-6      | lg:start-6      | xl:start-6      | 2xl:start-6      |
| start-7       | sm:start-7      | md:start-7      | lg:start-7      | xl:start-7      | 2xl:start-7      |
| start-8       | sm:start-8      | md:start-8      | lg:start-8      | xl:start-8      | 2xl:start-8      |
| start-9       | sm:start-9      | md:start-9      | lg:start-9      | xl:start-9      | 2xl:start-9      |
| start-10      | sm:start-10     | md:start-10     | lg:start-10     | xl:start-10     | 2xl:start-10     |
| start-11      | sm:start-11     | md:start-11     | lg:start-11     | xl:start-11     | 2xl:start-11     |
| start-12      | sm:start-12     | md:start-12     | lg:start-12     | xl:start-12     | 2xl:start-12     |
| start-14      | sm:start-14     | md:start-14     | lg:start-14     | xl:start-14     | 2xl:start-14     |
| start-16      | sm:start-16     | md:start-16     | lg:start-16     | xl:start-16     | 2xl:start-16     |
| start-20      | sm:start-20     | md:start-20     | lg:start-20     | xl:start-20     | 2xl:start-20     |
| start-24      | sm:start-24     | md:start-24     | lg:start-24     | xl:start-24     | 2xl:start-24     |
| start-28      | sm:start-28     | md:start-28     | lg:start-28     | xl:start-28     | 2xl:start-28     |
| start-32      | sm:start-32     | md:start-32     | lg:start-32     | xl:start-32     | 2xl:start-32     |
| start-36      | sm:start-36     | md:start-36     | lg:start-36     | xl:start-36     | 2xl:start-36     |
| start-40      | sm:start-40     | md:start-40     | lg:start-40     | xl:start-40     | 2xl:start-40     |
| start-44      | sm:start-44     | md:start-44     | lg:start-44     | xl:start-44     | 2xl:start-44     |
| start-48      | sm:start-48     | md:start-48     | lg:start-48     | xl:start-48     | 2xl:start-48     |
| start-52      | sm:start-52     | md:start-52     | lg:start-52     | xl:start-52     | 2xl:start-52     |
| start-56      | sm:start-56     | md:start-56     | lg:start-56     | xl:start-56     | 2xl:start-56     |
| start-60      | sm:start-60     | md:start-60     | lg:start-60     | xl:start-60     | 2xl:start-60     |
| start-64      | sm:start-64     | md:start-64     | lg:start-64     | xl:start-64     | 2xl:start-64     |
| start-72      | sm:start-72     | md:start-72     | lg:start-72     | xl:start-72     | 2xl:start-72     |
| start-80      | sm:start-80     | md:start-80     | lg:start-80     | xl:start-80     | 2xl:start-80     |
| start-96      | sm:start-96     | md:start-96     | lg:start-96     | xl:start-96     | 2xl:start-96     |
| start-full    | sm:start-full   | md:start-full   | lg:start-full   | xl:start-full   | 2xl:start-full   |
| start-1/2     | sm:start-1/2    | md:start-1/2    | lg:start-1/2    | xl:start-1/2    | 2xl:start-1/2    |
| start-1/3     | sm:start-1/3    | md:start-1/3    | lg:start-1/3    | xl:start-1/3    | 2xl:start-1/3    |
| start-2/3     | sm:start-2/3    | md:start-2/3    | lg:start-2/3    | xl:start-2/3    | 2xl:start-2/3    |
| start-1/4     | sm:start-1/4    | md:start-1/4    | lg:start-1/4    | xl:start-1/4    | 2xl:start-1/4    |
| start-2/4     | sm:start-2/4    | md:start-2/4    | lg:start-2/4    | xl:start-2/4    | 2xl:start-2/4    |
| start-3/4     | sm:start-3/4    | md:start-3/4    | lg:start-3/4    | xl:start-3/4    | 2xl:start-3/4    |
| start-1/5     | sm:start-1/5    | md:start-1/5    | lg:start-1/5    | xl:start-1/5    | 2xl:start-1/5    |
| start-2/5     | sm:start-2/5    | md:start-2/5    | lg:start-2/5    | xl:start-2/5    | 2xl:start-2/5    |
| start-3/5     | sm:start-3/5    | md:start-3/5    | lg:start-3/5    | xl:start-3/5    | 2xl:start-3/5    |
| start-4/5     | sm:start-4/5    | md:start-4/5    | lg:start-4/5    | xl:start-4/5    | 2xl:start-4/5    |
| start-1/6     | sm:start-1/6    | md:start-1/6    | lg:start-1/6    | xl:start-1/6    | 2xl:start-1/6    |
| start-2/6     | sm:start-2/6    | md:start-2/6    | lg:start-2/6    | xl:start-2/6    | 2xl:start-2/6    |
| start-3/6     | sm:start-3/6    | md:start-3/6    | lg:start-3/6    | xl:start-3/6    | 2xl:start-3/6    |
| start-4/6     | sm:start-4/6    | md:start-4/6    | lg:start-4/6    | xl:start-4/6    | 2xl:start-4/6    |
| start-5/6     | sm:start-5/6    | md:start-5/6    | lg:start-5/6    | xl:start-5/6    | 2xl:start-5/6    |
| start-1/12    | sm:start-1/12   | md:start-1/12   | lg:start-1/12   | xl:start-1/12   | 2xl:start-1/12   |
| start-2/12    | sm:start-2/12   | md:start-2/12   | lg:start-2/12   | xl:start-2/12   | 2xl:start-2/12   |
| start-3/12    | sm:start-3/12   | md:start-3/12   | lg:start-3/12   | xl:start-3/12   | 2xl:start-3/12   |
| start-4/12    | sm:start-4/12   | md:start-4/12   | lg:start-4/12   | xl:start-4/12   | 2xl:start-4/12   |
| start-5/12    | sm:start-5/12   | md:start-5/12   | lg:start-5/12   | xl:start-5/12   | 2xl:start-5/12   |
| start-6/12    | sm:start-6/12   | md:start-6/12   | lg:start-6/12   | xl:start-6/12   | 2xl:start-6/12   |
| start-7/12    | sm:start-7/12   | md:start-7/12   | lg:start-7/12   | xl:start-7/12   | 2xl:start-7/12   |
| start-8/12    | sm:start-8/12   | md:start-8/12   | lg:start-8/12   | xl:start-8/12   | 2xl:start-8/12   |
| start-9/12    | sm:start-9/12   | md:start-9/12   | lg:start-9/12   | xl:start-9/12   | 2xl:start-9/12   |
| start-10/12   | sm:start-10/12  | md:start-10/12  | lg:start-10/12  | xl:start-10/12  | 2xl:start-10/12  |
| start-11/12   | sm:start-11/12  | md:start-11/12  | lg:start-11/12  | xl:start-11/12  | 2xl:start-11/12  |
*/