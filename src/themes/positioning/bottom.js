import getInset , { BOTTOM } from './inset' ;

/**
 * Generates responsive bottom position class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Inset value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative inset.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/top-right-bottom-left
 *
 * @example
 * ```js
 * getBottom( 4 ) ;
 * // → { 'bottom-4': true }
 *
 * getBottom( -2 ) ;
 * // → { '-bottom-2': true }
 *
 * getBottom( { xs: 0 , md: 4 } ) ;
 * // → { 'bottom-0': true , 'md:bottom-4': true }
 * ```
 */
export const getBottom = ( value , options = {} ) =>
    getInset( value , { ...options , direction: BOTTOM } ) ;

export default getBottom ;

/* Tailwindcss safe list
| ------XS------ | -------SM------- | -------MD------- | -------LG------- | -------XL------— | -------XXL------- |
| bottom-auto    | sm:bottom-auto   | md:bottom-auto   | lg:bottom-auto   | xl:bottom-auto   | 2xl:bottom-auto   |
| bottom-px      | sm:bottom-px     | md:bottom-px     | lg:bottom-px     | xl:bottom-px     | 2xl:bottom-px     |
| bottom-0       | sm:bottom-0      | md:bottom-0      | lg:bottom-0      | xl:bottom-0      | 2xl:bottom-0      |
| bottom-0.5     | sm:bottom-0.5    | md:bottom-0.5    | lg:bottom-0.5    | xl:bottom-0.5    | 2xl:bottom-0.5    |
| bottom-1       | sm:bottom-1      | md:bottom-1      | lg:bottom-1      | xl:bottom-1      | 2xl:bottom-1      |
| bottom-1.5     | sm:bottom-1.5    | md:bottom-1.5    | lg:bottom-1.5    | xl:bottom-1.5    | 2xl:bottom-1.5    |
| bottom-2       | sm:bottom-2      | md:bottom-2      | lg:bottom-2      | xl:bottom-2      | 2xl:bottom-2      |
| bottom-2.5     | sm:bottom-2.5    | md:bottom-2.5    | lg:bottom-2.5    | xl:bottom-2.5    | 2xl:bottom-2.5    |
| bottom-3       | sm:bottom-3      | md:bottom-3      | lg:bottom-3      | xl:bottom-3      | 2xl:bottom-3      |
| bottom-3.5     | sm:bottom-3.5    | md:bottom-3.5    | lg:bottom-3.5    | xl:bottom-3.5    | 2xl:bottom-3.5    |
| bottom-4       | sm:bottom-4      | md:bottom-4      | lg:bottom-4      | xl:bottom-4      | 2xl:bottom-4      |
| bottom-5       | sm:bottom-5      | md:bottom-5      | lg:bottom-5      | xl:bottom-5      | 2xl:bottom-5      |
| bottom-6       | sm:bottom-6      | md:bottom-6      | lg:bottom-6      | xl:bottom-6      | 2xl:bottom-6      |
| bottom-7       | sm:bottom-7      | md:bottom-7      | lg:bottom-7      | xl:bottom-7      | 2xl:bottom-7      |
| bottom-8       | sm:bottom-8      | md:bottom-8      | lg:bottom-8      | xl:bottom-8      | 2xl:bottom-8      |
| bottom-9       | sm:bottom-9      | md:bottom-9      | lg:bottom-9      | xl:bottom-9      | 2xl:bottom-9      |
| bottom-10      | sm:bottom-10     | md:bottom-10     | lg:bottom-10     | xl:bottom-10     | 2xl:bottom-10     |
| bottom-11      | sm:bottom-11     | md:bottom-11     | lg:bottom-11     | xl:bottom-11     | 2xl:bottom-11     |
| bottom-12      | sm:bottom-12     | md:bottom-12     | lg:bottom-12     | xl:bottom-12     | 2xl:bottom-12     |
| bottom-14      | sm:bottom-14     | md:bottom-14     | lg:bottom-14     | xl:bottom-14     | 2xl:bottom-14     |
| bottom-16      | sm:bottom-16     | md:bottom-16     | lg:bottom-16     | xl:bottom-16     | 2xl:bottom-16     |
| bottom-20      | sm:bottom-20     | md:bottom-20     | lg:bottom-20     | xl:bottom-20     | 2xl:bottom-20     |
| bottom-24      | sm:bottom-24     | md:bottom-24     | lg:bottom-24     | xl:bottom-24     | 2xl:bottom-24     |
| bottom-28      | sm:bottom-28     | md:bottom-28     | lg:bottom-28     | xl:bottom-28     | 2xl:bottom-28     |
| bottom-32      | sm:bottom-32     | md:bottom-32     | lg:bottom-32     | xl:bottom-32     | 2xl:bottom-32     |
| bottom-36      | sm:bottom-36     | md:bottom-36     | lg:bottom-36     | xl:bottom-36     | 2xl:bottom-36     |
| bottom-40      | sm:bottom-40     | md:bottom-40     | lg:bottom-40     | xl:bottom-40     | 2xl:bottom-40     |
| bottom-44      | sm:bottom-44     | md:bottom-44     | lg:bottom-44     | xl:bottom-44     | 2xl:bottom-44     |
| bottom-48      | sm:bottom-48     | md:bottom-48     | lg:bottom-48     | xl:bottom-48     | 2xl:bottom-48     |
| bottom-52      | sm:bottom-52     | md:bottom-52     | lg:bottom-52     | xl:bottom-52     | 2xl:bottom-52     |
| bottom-56      | sm:bottom-56     | md:bottom-56     | lg:bottom-56     | xl:bottom-56     | 2xl:bottom-56     |
| bottom-60      | sm:bottom-60     | md:bottom-60     | lg:bottom-60     | xl:bottom-60     | 2xl:bottom-60     |
| bottom-64      | sm:bottom-64     | md:bottom-64     | lg:bottom-64     | xl:bottom-64     | 2xl:bottom-64     |
| bottom-72      | sm:bottom-72     | md:bottom-72     | lg:bottom-72     | xl:bottom-72     | 2xl:bottom-72     |
| bottom-80      | sm:bottom-80     | md:bottom-80     | lg:bottom-80     | xl:bottom-80     | 2xl:bottom-80     |
| bottom-96      | sm:bottom-96     | md:bottom-96     | lg:bottom-96     | xl:bottom-96     | 2xl:bottom-96     |
| bottom-full    | sm:bottom-full   | md:bottom-full   | lg:bottom-full   | xl:bottom-full   | 2xl:bottom-full   |
| bottom-1/2     | sm:bottom-1/2    | md:bottom-1/2    | lg:bottom-1/2    | xl:bottom-1/2    | 2xl:bottom-1/2    |
| bottom-1/3     | sm:bottom-1/3    | md:bottom-1/3    | lg:bottom-1/3    | xl:bottom-1/3    | 2xl:bottom-1/3    |
| bottom-2/3     | sm:bottom-2/3    | md:bottom-2/3    | lg:bottom-2/3    | xl:bottom-2/3    | 2xl:bottom-2/3    |
| bottom-1/4     | sm:bottom-1/4    | md:bottom-1/4    | lg:bottom-1/4    | xl:bottom-1/4    | 2xl:bottom-1/4    |
| bottom-2/4     | sm:bottom-2/4    | md:bottom-2/4    | lg:bottom-2/4    | xl:bottom-2/4    | 2xl:bottom-2/4    |
| bottom-3/4     | sm:bottom-3/4    | md:bottom-3/4    | lg:bottom-3/4    | xl:bottom-3/4    | 2xl:bottom-3/4    |
| bottom-1/5     | sm:bottom-1/5    | md:bottom-1/5    | lg:bottom-1/5    | xl:bottom-1/5    | 2xl:bottom-1/5    |
| bottom-2/5     | sm:bottom-2/5    | md:bottom-2/5    | lg:bottom-2/5    | xl:bottom-2/5    | 2xl:bottom-2/5    |
| bottom-3/5     | sm:bottom-3/5    | md:bottom-3/5    | lg:bottom-3/5    | xl:bottom-3/5    | 2xl:bottom-3/5    |
| bottom-4/5     | sm:bottom-4/5    | md:bottom-4/5    | lg:bottom-4/5    | xl:bottom-4/5    | 2xl:bottom-4/5    |
| bottom-1/6     | sm:bottom-1/6    | md:bottom-1/6    | lg:bottom-1/6    | xl:bottom-1/6    | 2xl:bottom-1/6    |
| bottom-2/6     | sm:bottom-2/6    | md:bottom-2/6    | lg:bottom-2/6    | xl:bottom-2/6    | 2xl:bottom-2/6    |
| bottom-3/6     | sm:bottom-3/6    | md:bottom-3/6    | lg:bottom-3/6    | xl:bottom-3/6    | 2xl:bottom-3/6    |
| bottom-4/6     | sm:bottom-4/6    | md:bottom-4/6    | lg:bottom-4/6    | xl:bottom-4/6    | 2xl:bottom-4/6    |
| bottom-5/6     | sm:bottom-5/6    | md:bottom-5/6    | lg:bottom-5/6    | xl:bottom-5/6    | 2xl:bottom-5/6    |
| bottom-1/12    | sm:bottom-1/12   | md:bottom-1/12   | lg:bottom-1/12   | xl:bottom-1/12   | 2xl:bottom-1/12   |
| bottom-2/12    | sm:bottom-2/12   | md:bottom-2/12   | lg:bottom-2/12   | xl:bottom-2/12   | 2xl:bottom-2/12   |
| bottom-3/12    | sm:bottom-3/12   | md:bottom-3/12   | lg:bottom-3/12   | xl:bottom-3/12   | 2xl:bottom-3/12   |
| bottom-4/12    | sm:bottom-4/12   | md:bottom-4/12   | lg:bottom-4/12   | xl:bottom-4/12   | 2xl:bottom-4/12   |
| bottom-5/12    | sm:bottom-5/12   | md:bottom-5/12   | lg:bottom-5/12   | xl:bottom-5/12   | 2xl:bottom-5/12   |
| bottom-6/12    | sm:bottom-6/12   | md:bottom-6/12   | lg:bottom-6/12   | xl:bottom-6/12   | 2xl:bottom-6/12   |
| bottom-7/12    | sm:bottom-7/12   | md:bottom-7/12   | lg:bottom-7/12   | xl:bottom-7/12   | 2xl:bottom-7/12   |
| bottom-8/12    | sm:bottom-8/12   | md:bottom-8/12   | lg:bottom-8/12   | xl:bottom-8/12   | 2xl:bottom-8/12   |
| bottom-9/12    | sm:bottom-9/12   | md:bottom-9/12   | lg:bottom-9/12   | xl:bottom-9/12   | 2xl:bottom-9/12   |
| bottom-10/12   | sm:bottom-10/12  | md:bottom-10/12  | lg:bottom-10/12  | xl:bottom-10/12  | 2xl:bottom-10/12  |
| bottom-11/12   | sm:bottom-11/12  | md:bottom-11/12  | lg:bottom-11/12  | xl:bottom-11/12  | 2xl:bottom-11/12  |
*/