import getInset , { VERTICAL } from './inset' ;

/**
 * Generates responsive vertical inset class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Inset value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative inset.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/top-right-inset-y-left
 *
 * @example
 * ```js
 * getInsetY( 4 ) ;
 * // → { 'inset-y-4': true }
 *
 * getInsetY( { xs: 2 , md: 4 } ) ;
 * // → { 'inset-y-2': true , 'md:inset-y-4': true }
 * ```
 */
export const getInsetY = ( value , options = {} ) =>
    getInset( value , { ...options , direction: VERTICAL } ) ;

export default getInsetY ;

/* Tailwindcss safe list
| ------XS------ | -------SM------- | -------MD------- | -------LG------- | -------XL------— | -------XXL------- |
| inset-y-auto    | sm:inset-y-auto   | md:inset-y-auto   | lg:inset-y-auto   | xl:inset-y-auto   | 2xl:inset-y-auto   |
| inset-y-px      | sm:inset-y-px     | md:inset-y-px     | lg:inset-y-px     | xl:inset-y-px     | 2xl:inset-y-px     |
| inset-y-0       | sm:inset-y-0      | md:inset-y-0      | lg:inset-y-0      | xl:inset-y-0      | 2xl:inset-y-0      |
| inset-y-0.5     | sm:inset-y-0.5    | md:inset-y-0.5    | lg:inset-y-0.5    | xl:inset-y-0.5    | 2xl:inset-y-0.5    |
| inset-y-1       | sm:inset-y-1      | md:inset-y-1      | lg:inset-y-1      | xl:inset-y-1      | 2xl:inset-y-1      |
| inset-y-1.5     | sm:inset-y-1.5    | md:inset-y-1.5    | lg:inset-y-1.5    | xl:inset-y-1.5    | 2xl:inset-y-1.5    |
| inset-y-2       | sm:inset-y-2      | md:inset-y-2      | lg:inset-y-2      | xl:inset-y-2      | 2xl:inset-y-2      |
| inset-y-2.5     | sm:inset-y-2.5    | md:inset-y-2.5    | lg:inset-y-2.5    | xl:inset-y-2.5    | 2xl:inset-y-2.5    |
| inset-y-3       | sm:inset-y-3      | md:inset-y-3      | lg:inset-y-3      | xl:inset-y-3      | 2xl:inset-y-3      |
| inset-y-3.5     | sm:inset-y-3.5    | md:inset-y-3.5    | lg:inset-y-3.5    | xl:inset-y-3.5    | 2xl:inset-y-3.5    |
| inset-y-4       | sm:inset-y-4      | md:inset-y-4      | lg:inset-y-4      | xl:inset-y-4      | 2xl:inset-y-4      |
| inset-y-5       | sm:inset-y-5      | md:inset-y-5      | lg:inset-y-5      | xl:inset-y-5      | 2xl:inset-y-5      |
| inset-y-6       | sm:inset-y-6      | md:inset-y-6      | lg:inset-y-6      | xl:inset-y-6      | 2xl:inset-y-6      |
| inset-y-7       | sm:inset-y-7      | md:inset-y-7      | lg:inset-y-7      | xl:inset-y-7      | 2xl:inset-y-7      |
| inset-y-8       | sm:inset-y-8      | md:inset-y-8      | lg:inset-y-8      | xl:inset-y-8      | 2xl:inset-y-8      |
| inset-y-9       | sm:inset-y-9      | md:inset-y-9      | lg:inset-y-9      | xl:inset-y-9      | 2xl:inset-y-9      |
| inset-y-10      | sm:inset-y-10     | md:inset-y-10     | lg:inset-y-10     | xl:inset-y-10     | 2xl:inset-y-10     |
| inset-y-11      | sm:inset-y-11     | md:inset-y-11     | lg:inset-y-11     | xl:inset-y-11     | 2xl:inset-y-11     |
| inset-y-12      | sm:inset-y-12     | md:inset-y-12     | lg:inset-y-12     | xl:inset-y-12     | 2xl:inset-y-12     |
| inset-y-14      | sm:inset-y-14     | md:inset-y-14     | lg:inset-y-14     | xl:inset-y-14     | 2xl:inset-y-14     |
| inset-y-16      | sm:inset-y-16     | md:inset-y-16     | lg:inset-y-16     | xl:inset-y-16     | 2xl:inset-y-16     |
| inset-y-20      | sm:inset-y-20     | md:inset-y-20     | lg:inset-y-20     | xl:inset-y-20     | 2xl:inset-y-20     |
| inset-y-24      | sm:inset-y-24     | md:inset-y-24     | lg:inset-y-24     | xl:inset-y-24     | 2xl:inset-y-24     |
| inset-y-28      | sm:inset-y-28     | md:inset-y-28     | lg:inset-y-28     | xl:inset-y-28     | 2xl:inset-y-28     |
| inset-y-32      | sm:inset-y-32     | md:inset-y-32     | lg:inset-y-32     | xl:inset-y-32     | 2xl:inset-y-32     |
| inset-y-36      | sm:inset-y-36     | md:inset-y-36     | lg:inset-y-36     | xl:inset-y-36     | 2xl:inset-y-36     |
| inset-y-40      | sm:inset-y-40     | md:inset-y-40     | lg:inset-y-40     | xl:inset-y-40     | 2xl:inset-y-40     |
| inset-y-44      | sm:inset-y-44     | md:inset-y-44     | lg:inset-y-44     | xl:inset-y-44     | 2xl:inset-y-44     |
| inset-y-48      | sm:inset-y-48     | md:inset-y-48     | lg:inset-y-48     | xl:inset-y-48     | 2xl:inset-y-48     |
| inset-y-52      | sm:inset-y-52     | md:inset-y-52     | lg:inset-y-52     | xl:inset-y-52     | 2xl:inset-y-52     |
| inset-y-56      | sm:inset-y-56     | md:inset-y-56     | lg:inset-y-56     | xl:inset-y-56     | 2xl:inset-y-56     |
| inset-y-60      | sm:inset-y-60     | md:inset-y-60     | lg:inset-y-60     | xl:inset-y-60     | 2xl:inset-y-60     |
| inset-y-64      | sm:inset-y-64     | md:inset-y-64     | lg:inset-y-64     | xl:inset-y-64     | 2xl:inset-y-64     |
| inset-y-72      | sm:inset-y-72     | md:inset-y-72     | lg:inset-y-72     | xl:inset-y-72     | 2xl:inset-y-72     |
| inset-y-80      | sm:inset-y-80     | md:inset-y-80     | lg:inset-y-80     | xl:inset-y-80     | 2xl:inset-y-80     |
| inset-y-96      | sm:inset-y-96     | md:inset-y-96     | lg:inset-y-96     | xl:inset-y-96     | 2xl:inset-y-96     |
| inset-y-full    | sm:inset-y-full   | md:inset-y-full   | lg:inset-y-full   | xl:inset-y-full   | 2xl:inset-y-full   |
| inset-y-1/2     | sm:inset-y-1/2    | md:inset-y-1/2    | lg:inset-y-1/2    | xl:inset-y-1/2    | 2xl:inset-y-1/2    |
| inset-y-1/3     | sm:inset-y-1/3    | md:inset-y-1/3    | lg:inset-y-1/3    | xl:inset-y-1/3    | 2xl:inset-y-1/3    |
| inset-y-2/3     | sm:inset-y-2/3    | md:inset-y-2/3    | lg:inset-y-2/3    | xl:inset-y-2/3    | 2xl:inset-y-2/3    |
| inset-y-1/4     | sm:inset-y-1/4    | md:inset-y-1/4    | lg:inset-y-1/4    | xl:inset-y-1/4    | 2xl:inset-y-1/4    |
| inset-y-2/4     | sm:inset-y-2/4    | md:inset-y-2/4    | lg:inset-y-2/4    | xl:inset-y-2/4    | 2xl:inset-y-2/4    |
| inset-y-3/4     | sm:inset-y-3/4    | md:inset-y-3/4    | lg:inset-y-3/4    | xl:inset-y-3/4    | 2xl:inset-y-3/4    |
| inset-y-1/5     | sm:inset-y-1/5    | md:inset-y-1/5    | lg:inset-y-1/5    | xl:inset-y-1/5    | 2xl:inset-y-1/5    |
| inset-y-2/5     | sm:inset-y-2/5    | md:inset-y-2/5    | lg:inset-y-2/5    | xl:inset-y-2/5    | 2xl:inset-y-2/5    |
| inset-y-3/5     | sm:inset-y-3/5    | md:inset-y-3/5    | lg:inset-y-3/5    | xl:inset-y-3/5    | 2xl:inset-y-3/5    |
| inset-y-4/5     | sm:inset-y-4/5    | md:inset-y-4/5    | lg:inset-y-4/5    | xl:inset-y-4/5    | 2xl:inset-y-4/5    |
| inset-y-1/6     | sm:inset-y-1/6    | md:inset-y-1/6    | lg:inset-y-1/6    | xl:inset-y-1/6    | 2xl:inset-y-1/6    |
| inset-y-2/6     | sm:inset-y-2/6    | md:inset-y-2/6    | lg:inset-y-2/6    | xl:inset-y-2/6    | 2xl:inset-y-2/6    |
| inset-y-3/6     | sm:inset-y-3/6    | md:inset-y-3/6    | lg:inset-y-3/6    | xl:inset-y-3/6    | 2xl:inset-y-3/6    |
| inset-y-4/6     | sm:inset-y-4/6    | md:inset-y-4/6    | lg:inset-y-4/6    | xl:inset-y-4/6    | 2xl:inset-y-4/6    |
| inset-y-5/6     | sm:inset-y-5/6    | md:inset-y-5/6    | lg:inset-y-5/6    | xl:inset-y-5/6    | 2xl:inset-y-5/6    |
| inset-y-1/12    | sm:inset-y-1/12   | md:inset-y-1/12   | lg:inset-y-1/12   | xl:inset-y-1/12   | 2xl:inset-y-1/12   |
| inset-y-2/12    | sm:inset-y-2/12   | md:inset-y-2/12   | lg:inset-y-2/12   | xl:inset-y-2/12   | 2xl:inset-y-2/12   |
| inset-y-3/12    | sm:inset-y-3/12   | md:inset-y-3/12   | lg:inset-y-3/12   | xl:inset-y-3/12   | 2xl:inset-y-3/12   |
| inset-y-4/12    | sm:inset-y-4/12   | md:inset-y-4/12   | lg:inset-y-4/12   | xl:inset-y-4/12   | 2xl:inset-y-4/12   |
| inset-y-5/12    | sm:inset-y-5/12   | md:inset-y-5/12   | lg:inset-y-5/12   | xl:inset-y-5/12   | 2xl:inset-y-5/12   |
| inset-y-6/12    | sm:inset-y-6/12   | md:inset-y-6/12   | lg:inset-y-6/12   | xl:inset-y-6/12   | 2xl:inset-y-6/12   |
| inset-y-7/12    | sm:inset-y-7/12   | md:inset-y-7/12   | lg:inset-y-7/12   | xl:inset-y-7/12   | 2xl:inset-y-7/12   |
| inset-y-8/12    | sm:inset-y-8/12   | md:inset-y-8/12   | lg:inset-y-8/12   | xl:inset-y-8/12   | 2xl:inset-y-8/12   |
| inset-y-9/12    | sm:inset-y-9/12   | md:inset-y-9/12   | lg:inset-y-9/12   | xl:inset-y-9/12   | 2xl:inset-y-9/12   |
| inset-y-10/12   | sm:inset-y-10/12  | md:inset-y-10/12  | lg:inset-y-10/12  | xl:inset-y-10/12  | 2xl:inset-y-10/12  |
| inset-y-11/12   | sm:inset-y-11/12  | md:inset-y-11/12  | lg:inset-y-11/12  | xl:inset-y-11/12  | 2xl:inset-y-11/12  |
*/