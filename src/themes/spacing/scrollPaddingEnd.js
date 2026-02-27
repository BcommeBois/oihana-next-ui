import getScrollPadding , { END } from './scrollPadding' ;

/**
 * Generates responsive end (inline-end) scroll padding class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Scroll padding value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/scroll-padding
 *
 * @example
 * ```js
 * getScrollPaddingEnd( 4 ) ;
 * // → { 'scroll-pe-4': true }
 *
 * getScrollPaddingEnd( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-pe-2': true , 'md:scroll-pe-4': true }
 * ```
 */
export const getScrollPaddingEnd = ( value , options = {} ) =>
    getScrollPadding( value , { ...options , direction: END } ) ;

export default getScrollPaddingEnd ;

/* Tailwindcss safe list
| -------XS------- | --------SM-------- | --------MD-------- | --------LG-------- | --------XL-------— | --------XXL-------- |
| scroll-pe-px      | sm:scroll-pe-px     | md:scroll-pe-px     | lg:scroll-pe-px     | xl:scroll-pe-px     | 2xl:scroll-pe-px     |
| scroll-pe-0       | sm:scroll-pe-0      | md:scroll-pe-0      | lg:scroll-pe-0      | xl:scroll-pe-0      | 2xl:scroll-pe-0      |
| scroll-pe-0.5     | sm:scroll-pe-0.5    | md:scroll-pe-0.5    | lg:scroll-pe-0.5    | xl:scroll-pe-0.5    | 2xl:scroll-pe-0.5    |
| scroll-pe-1       | sm:scroll-pe-1      | md:scroll-pe-1      | lg:scroll-pe-1      | xl:scroll-pe-1      | 2xl:scroll-pe-1      |
| scroll-pe-1.5     | sm:scroll-pe-1.5    | md:scroll-pe-1.5    | lg:scroll-pe-1.5    | xl:scroll-pe-1.5    | 2xl:scroll-pe-1.5    |
| scroll-pe-2       | sm:scroll-pe-2      | md:scroll-pe-2      | lg:scroll-pe-2      | xl:scroll-pe-2      | 2xl:scroll-pe-2      |
| scroll-pe-2.5     | sm:scroll-pe-2.5    | md:scroll-pe-2.5    | lg:scroll-pe-2.5    | xl:scroll-pe-2.5    | 2xl:scroll-pe-2.5    |
| scroll-pe-3       | sm:scroll-pe-3      | md:scroll-pe-3      | lg:scroll-pe-3      | xl:scroll-pe-3      | 2xl:scroll-pe-3      |
| scroll-pe-3.5     | sm:scroll-pe-3.5    | md:scroll-pe-3.5    | lg:scroll-pe-3.5    | xl:scroll-pe-3.5    | 2xl:scroll-pe-3.5    |
| scroll-pe-4       | sm:scroll-pe-4      | md:scroll-pe-4      | lg:scroll-pe-4      | xl:scroll-pe-4      | 2xl:scroll-pe-4      |
| scroll-pe-5       | sm:scroll-pe-5      | md:scroll-pe-5      | lg:scroll-pe-5      | xl:scroll-pe-5      | 2xl:scroll-pe-5      |
| scroll-pe-6       | sm:scroll-pe-6      | md:scroll-pe-6      | lg:scroll-pe-6      | xl:scroll-pe-6      | 2xl:scroll-pe-6      |
| scroll-pe-7       | sm:scroll-pe-7      | md:scroll-pe-7      | lg:scroll-pe-7      | xl:scroll-pe-7      | 2xl:scroll-pe-7      |
| scroll-pe-8       | sm:scroll-pe-8      | md:scroll-pe-8      | lg:scroll-pe-8      | xl:scroll-pe-8      | 2xl:scroll-pe-8      |
| scroll-pe-9       | sm:scroll-pe-9      | md:scroll-pe-9      | lg:scroll-pe-9      | xl:scroll-pe-9      | 2xl:scroll-pe-9      |
| scroll-pe-10      | sm:scroll-pe-10     | md:scroll-pe-10     | lg:scroll-pe-10     | xl:scroll-pe-10     | 2xl:scroll-pe-10     |
| scroll-pe-11      | sm:scroll-pe-11     | md:scroll-pe-11     | lg:scroll-pe-11     | xl:scroll-pe-11     | 2xl:scroll-pe-11     |
| scroll-pe-12      | sm:scroll-pe-12     | md:scroll-pe-12     | lg:scroll-pe-12     | xl:scroll-pe-12     | 2xl:scroll-pe-12     |
| scroll-pe-14      | sm:scroll-pe-14     | md:scroll-pe-14     | lg:scroll-pe-14     | xl:scroll-pe-14     | 2xl:scroll-pe-14     |
| scroll-pe-16      | sm:scroll-pe-16     | md:scroll-pe-16     | lg:scroll-pe-16     | xl:scroll-pe-16     | 2xl:scroll-pe-16     |
| scroll-pe-20      | sm:scroll-pe-20     | md:scroll-pe-20     | lg:scroll-pe-20     | xl:scroll-pe-20     | 2xl:scroll-pe-20     |
| scroll-pe-24      | sm:scroll-pe-24     | md:scroll-pe-24     | lg:scroll-pe-24     | xl:scroll-pe-24     | 2xl:scroll-pe-24     |
| scroll-pe-28      | sm:scroll-pe-28     | md:scroll-pe-28     | lg:scroll-pe-28     | xl:scroll-pe-28     | 2xl:scroll-pe-28     |
| scroll-pe-32      | sm:scroll-pe-32     | md:scroll-pe-32     | lg:scroll-pe-32     | xl:scroll-pe-32     | 2xl:scroll-pe-32     |
| scroll-pe-36      | sm:scroll-pe-36     | md:scroll-pe-36     | lg:scroll-pe-36     | xl:scroll-pe-36     | 2xl:scroll-pe-36     |
| scroll-pe-40      | sm:scroll-pe-40     | md:scroll-pe-40     | lg:scroll-pe-40     | xl:scroll-pe-40     | 2xl:scroll-pe-40     |
| scroll-pe-44      | sm:scroll-pe-44     | md:scroll-pe-44     | lg:scroll-pe-44     | xl:scroll-pe-44     | 2xl:scroll-pe-44     |
| scroll-pe-48      | sm:scroll-pe-48     | md:scroll-pe-48     | lg:scroll-pe-48     | xl:scroll-pe-48     | 2xl:scroll-pe-48     |
| scroll-pe-52      | sm:scroll-pe-52     | md:scroll-pe-52     | lg:scroll-pe-52     | xl:scroll-pe-52     | 2xl:scroll-pe-52     |
| scroll-pe-56      | sm:scroll-pe-56     | md:scroll-pe-56     | lg:scroll-pe-56     | xl:scroll-pe-56     | 2xl:scroll-pe-56     |
| scroll-pe-60      | sm:scroll-pe-60     | md:scroll-pe-60     | lg:scroll-pe-60     | xl:scroll-pe-60     | 2xl:scroll-pe-60     |
| scroll-pe-64      | sm:scroll-pe-64     | md:scroll-pe-64     | lg:scroll-pe-64     | xl:scroll-pe-64     | 2xl:scroll-pe-64     |
| scroll-pe-72      | sm:scroll-pe-72     | md:scroll-pe-72     | lg:scroll-pe-72     | xl:scroll-pe-72     | 2xl:scroll-pe-72     |
| scroll-pe-80      | sm:scroll-pe-80     | md:scroll-pe-80     | lg:scroll-pe-80     | xl:scroll-pe-80     | 2xl:scroll-pe-80     |
| scroll-pe-96      | sm:scroll-pe-96     | md:scroll-pe-96     | lg:scroll-pe-96     | xl:scroll-pe-96     | 2xl:scroll-pe-96     |
*/