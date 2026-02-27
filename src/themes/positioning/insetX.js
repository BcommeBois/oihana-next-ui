import getInset , { HORIZONTAL } from './inset' ;

/**
 * Generates responsive horizontal inset class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Inset value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative inset.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/top-right-inset-x-left
 *
 * @example
 * ```js
 * getInsetX( 4 ) ;
 * // → { 'inset-x-4': true }
 *
 * getInsetX( { xs: 2 , md: 4 } ) ;
 * // → { 'inset-x-2': true , 'md:inset-x-4': true }
 * ```
 */
export const getInsetX = ( value , options = {} ) =>
    getInset( value , { ...options , direction: HORIZONTAL } ) ;

export default getInsetX ;

/* Tailwindcss safe list
| ------XS------ | -------SM------- | -------MD------- | -------LG------- | -------XL------— | -------XXL------- |
| inset-x-auto    | sm:inset-x-auto   | md:inset-x-auto   | lg:inset-x-auto   | xl:inset-x-auto   | 2xl:inset-x-auto   |
| inset-x-px      | sm:inset-x-px     | md:inset-x-px     | lg:inset-x-px     | xl:inset-x-px     | 2xl:inset-x-px     |
| inset-x-0       | sm:inset-x-0      | md:inset-x-0      | lg:inset-x-0      | xl:inset-x-0      | 2xl:inset-x-0      |
| inset-x-0.5     | sm:inset-x-0.5    | md:inset-x-0.5    | lg:inset-x-0.5    | xl:inset-x-0.5    | 2xl:inset-x-0.5    |
| inset-x-1       | sm:inset-x-1      | md:inset-x-1      | lg:inset-x-1      | xl:inset-x-1      | 2xl:inset-x-1      |
| inset-x-1.5     | sm:inset-x-1.5    | md:inset-x-1.5    | lg:inset-x-1.5    | xl:inset-x-1.5    | 2xl:inset-x-1.5    |
| inset-x-2       | sm:inset-x-2      | md:inset-x-2      | lg:inset-x-2      | xl:inset-x-2      | 2xl:inset-x-2      |
| inset-x-2.5     | sm:inset-x-2.5    | md:inset-x-2.5    | lg:inset-x-2.5    | xl:inset-x-2.5    | 2xl:inset-x-2.5    |
| inset-x-3       | sm:inset-x-3      | md:inset-x-3      | lg:inset-x-3      | xl:inset-x-3      | 2xl:inset-x-3      |
| inset-x-3.5     | sm:inset-x-3.5    | md:inset-x-3.5    | lg:inset-x-3.5    | xl:inset-x-3.5    | 2xl:inset-x-3.5    |
| inset-x-4       | sm:inset-x-4      | md:inset-x-4      | lg:inset-x-4      | xl:inset-x-4      | 2xl:inset-x-4      |
| inset-x-5       | sm:inset-x-5      | md:inset-x-5      | lg:inset-x-5      | xl:inset-x-5      | 2xl:inset-x-5      |
| inset-x-6       | sm:inset-x-6      | md:inset-x-6      | lg:inset-x-6      | xl:inset-x-6      | 2xl:inset-x-6      |
| inset-x-7       | sm:inset-x-7      | md:inset-x-7      | lg:inset-x-7      | xl:inset-x-7      | 2xl:inset-x-7      |
| inset-x-8       | sm:inset-x-8      | md:inset-x-8      | lg:inset-x-8      | xl:inset-x-8      | 2xl:inset-x-8      |
| inset-x-9       | sm:inset-x-9      | md:inset-x-9      | lg:inset-x-9      | xl:inset-x-9      | 2xl:inset-x-9      |
| inset-x-10      | sm:inset-x-10     | md:inset-x-10     | lg:inset-x-10     | xl:inset-x-10     | 2xl:inset-x-10     |
| inset-x-11      | sm:inset-x-11     | md:inset-x-11     | lg:inset-x-11     | xl:inset-x-11     | 2xl:inset-x-11     |
| inset-x-12      | sm:inset-x-12     | md:inset-x-12     | lg:inset-x-12     | xl:inset-x-12     | 2xl:inset-x-12     |
| inset-x-14      | sm:inset-x-14     | md:inset-x-14     | lg:inset-x-14     | xl:inset-x-14     | 2xl:inset-x-14     |
| inset-x-16      | sm:inset-x-16     | md:inset-x-16     | lg:inset-x-16     | xl:inset-x-16     | 2xl:inset-x-16     |
| inset-x-20      | sm:inset-x-20     | md:inset-x-20     | lg:inset-x-20     | xl:inset-x-20     | 2xl:inset-x-20     |
| inset-x-24      | sm:inset-x-24     | md:inset-x-24     | lg:inset-x-24     | xl:inset-x-24     | 2xl:inset-x-24     |
| inset-x-28      | sm:inset-x-28     | md:inset-x-28     | lg:inset-x-28     | xl:inset-x-28     | 2xl:inset-x-28     |
| inset-x-32      | sm:inset-x-32     | md:inset-x-32     | lg:inset-x-32     | xl:inset-x-32     | 2xl:inset-x-32     |
| inset-x-36      | sm:inset-x-36     | md:inset-x-36     | lg:inset-x-36     | xl:inset-x-36     | 2xl:inset-x-36     |
| inset-x-40      | sm:inset-x-40     | md:inset-x-40     | lg:inset-x-40     | xl:inset-x-40     | 2xl:inset-x-40     |
| inset-x-44      | sm:inset-x-44     | md:inset-x-44     | lg:inset-x-44     | xl:inset-x-44     | 2xl:inset-x-44     |
| inset-x-48      | sm:inset-x-48     | md:inset-x-48     | lg:inset-x-48     | xl:inset-x-48     | 2xl:inset-x-48     |
| inset-x-52      | sm:inset-x-52     | md:inset-x-52     | lg:inset-x-52     | xl:inset-x-52     | 2xl:inset-x-52     |
| inset-x-56      | sm:inset-x-56     | md:inset-x-56     | lg:inset-x-56     | xl:inset-x-56     | 2xl:inset-x-56     |
| inset-x-60      | sm:inset-x-60     | md:inset-x-60     | lg:inset-x-60     | xl:inset-x-60     | 2xl:inset-x-60     |
| inset-x-64      | sm:inset-x-64     | md:inset-x-64     | lg:inset-x-64     | xl:inset-x-64     | 2xl:inset-x-64     |
| inset-x-72      | sm:inset-x-72     | md:inset-x-72     | lg:inset-x-72     | xl:inset-x-72     | 2xl:inset-x-72     |
| inset-x-80      | sm:inset-x-80     | md:inset-x-80     | lg:inset-x-80     | xl:inset-x-80     | 2xl:inset-x-80     |
| inset-x-96      | sm:inset-x-96     | md:inset-x-96     | lg:inset-x-96     | xl:inset-x-96     | 2xl:inset-x-96     |
| inset-x-full    | sm:inset-x-full   | md:inset-x-full   | lg:inset-x-full   | xl:inset-x-full   | 2xl:inset-x-full   |
| inset-x-1/2     | sm:inset-x-1/2    | md:inset-x-1/2    | lg:inset-x-1/2    | xl:inset-x-1/2    | 2xl:inset-x-1/2    |
| inset-x-1/3     | sm:inset-x-1/3    | md:inset-x-1/3    | lg:inset-x-1/3    | xl:inset-x-1/3    | 2xl:inset-x-1/3    |
| inset-x-2/3     | sm:inset-x-2/3    | md:inset-x-2/3    | lg:inset-x-2/3    | xl:inset-x-2/3    | 2xl:inset-x-2/3    |
| inset-x-1/4     | sm:inset-x-1/4    | md:inset-x-1/4    | lg:inset-x-1/4    | xl:inset-x-1/4    | 2xl:inset-x-1/4    |
| inset-x-2/4     | sm:inset-x-2/4    | md:inset-x-2/4    | lg:inset-x-2/4    | xl:inset-x-2/4    | 2xl:inset-x-2/4    |
| inset-x-3/4     | sm:inset-x-3/4    | md:inset-x-3/4    | lg:inset-x-3/4    | xl:inset-x-3/4    | 2xl:inset-x-3/4    |
| inset-x-1/5     | sm:inset-x-1/5    | md:inset-x-1/5    | lg:inset-x-1/5    | xl:inset-x-1/5    | 2xl:inset-x-1/5    |
| inset-x-2/5     | sm:inset-x-2/5    | md:inset-x-2/5    | lg:inset-x-2/5    | xl:inset-x-2/5    | 2xl:inset-x-2/5    |
| inset-x-3/5     | sm:inset-x-3/5    | md:inset-x-3/5    | lg:inset-x-3/5    | xl:inset-x-3/5    | 2xl:inset-x-3/5    |
| inset-x-4/5     | sm:inset-x-4/5    | md:inset-x-4/5    | lg:inset-x-4/5    | xl:inset-x-4/5    | 2xl:inset-x-4/5    |
| inset-x-1/6     | sm:inset-x-1/6    | md:inset-x-1/6    | lg:inset-x-1/6    | xl:inset-x-1/6    | 2xl:inset-x-1/6    |
| inset-x-2/6     | sm:inset-x-2/6    | md:inset-x-2/6    | lg:inset-x-2/6    | xl:inset-x-2/6    | 2xl:inset-x-2/6    |
| inset-x-3/6     | sm:inset-x-3/6    | md:inset-x-3/6    | lg:inset-x-3/6    | xl:inset-x-3/6    | 2xl:inset-x-3/6    |
| inset-x-4/6     | sm:inset-x-4/6    | md:inset-x-4/6    | lg:inset-x-4/6    | xl:inset-x-4/6    | 2xl:inset-x-4/6    |
| inset-x-5/6     | sm:inset-x-5/6    | md:inset-x-5/6    | lg:inset-x-5/6    | xl:inset-x-5/6    | 2xl:inset-x-5/6    |
| inset-x-1/12    | sm:inset-x-1/12   | md:inset-x-1/12   | lg:inset-x-1/12   | xl:inset-x-1/12   | 2xl:inset-x-1/12   |
| inset-x-2/12    | sm:inset-x-2/12   | md:inset-x-2/12   | lg:inset-x-2/12   | xl:inset-x-2/12   | 2xl:inset-x-2/12   |
| inset-x-3/12    | sm:inset-x-3/12   | md:inset-x-3/12   | lg:inset-x-3/12   | xl:inset-x-3/12   | 2xl:inset-x-3/12   |
| inset-x-4/12    | sm:inset-x-4/12   | md:inset-x-4/12   | lg:inset-x-4/12   | xl:inset-x-4/12   | 2xl:inset-x-4/12   |
| inset-x-5/12    | sm:inset-x-5/12   | md:inset-x-5/12   | lg:inset-x-5/12   | xl:inset-x-5/12   | 2xl:inset-x-5/12   |
| inset-x-6/12    | sm:inset-x-6/12   | md:inset-x-6/12   | lg:inset-x-6/12   | xl:inset-x-6/12   | 2xl:inset-x-6/12   |
| inset-x-7/12    | sm:inset-x-7/12   | md:inset-x-7/12   | lg:inset-x-7/12   | xl:inset-x-7/12   | 2xl:inset-x-7/12   |
| inset-x-8/12    | sm:inset-x-8/12   | md:inset-x-8/12   | lg:inset-x-8/12   | xl:inset-x-8/12   | 2xl:inset-x-8/12   |
| inset-x-9/12    | sm:inset-x-9/12   | md:inset-x-9/12   | lg:inset-x-9/12   | xl:inset-x-9/12   | 2xl:inset-x-9/12   |
| inset-x-10/12   | sm:inset-x-10/12  | md:inset-x-10/12  | lg:inset-x-10/12  | xl:inset-x-10/12  | 2xl:inset-x-10/12  |
| inset-x-11/12   | sm:inset-x-11/12  | md:inset-x-11/12  | lg:inset-x-11/12  | xl:inset-x-11/12  | 2xl:inset-x-11/12  |
*/