import getScrollPadding , { RIGHT } from './scrollPadding' ;

/**
 * Generates responsive right scroll padding class definitions.
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
 * getScrollPaddingRight( 4 ) ;
 * // → { 'scroll-pr-4': true }
 *
 * getScrollPaddingRight( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-pr-2': true , 'md:scroll-pr-4': true }
 * ```
 */
export const getScrollPaddingRight = ( value , options = {} ) =>
    getScrollPadding( value , { ...options , direction: RIGHT } ) ;

export default getScrollPaddingRight ;

/* Tailwindcss safe list
| -------XS------- | --------SM-------- | --------MD-------- | --------LG-------- | --------XL-------— | --------XXL-------- |
| scroll-pr-px      | sm:scroll-pr-px     | md:scroll-pr-px     | lg:scroll-pr-px     | xl:scroll-pr-px     | 2xl:scroll-pr-px     |
| scroll-pr-0       | sm:scroll-pr-0      | md:scroll-pr-0      | lg:scroll-pr-0      | xl:scroll-pr-0      | 2xl:scroll-pr-0      |
| scroll-pr-0.5     | sm:scroll-pr-0.5    | md:scroll-pr-0.5    | lg:scroll-pr-0.5    | xl:scroll-pr-0.5    | 2xl:scroll-pr-0.5    |
| scroll-pr-1       | sm:scroll-pr-1      | md:scroll-pr-1      | lg:scroll-pr-1      | xl:scroll-pr-1      | 2xl:scroll-pr-1      |
| scroll-pr-1.5     | sm:scroll-pr-1.5    | md:scroll-pr-1.5    | lg:scroll-pr-1.5    | xl:scroll-pr-1.5    | 2xl:scroll-pr-1.5    |
| scroll-pr-2       | sm:scroll-pr-2      | md:scroll-pr-2      | lg:scroll-pr-2      | xl:scroll-pr-2      | 2xl:scroll-pr-2      |
| scroll-pr-2.5     | sm:scroll-pr-2.5    | md:scroll-pr-2.5    | lg:scroll-pr-2.5    | xl:scroll-pr-2.5    | 2xl:scroll-pr-2.5    |
| scroll-pr-3       | sm:scroll-pr-3      | md:scroll-pr-3      | lg:scroll-pr-3      | xl:scroll-pr-3      | 2xl:scroll-pr-3      |
| scroll-pr-3.5     | sm:scroll-pr-3.5    | md:scroll-pr-3.5    | lg:scroll-pr-3.5    | xl:scroll-pr-3.5    | 2xl:scroll-pr-3.5    |
| scroll-pr-4       | sm:scroll-pr-4      | md:scroll-pr-4      | lg:scroll-pr-4      | xl:scroll-pr-4      | 2xl:scroll-pr-4      |
| scroll-pr-5       | sm:scroll-pr-5      | md:scroll-pr-5      | lg:scroll-pr-5      | xl:scroll-pr-5      | 2xl:scroll-pr-5      |
| scroll-pr-6       | sm:scroll-pr-6      | md:scroll-pr-6      | lg:scroll-pr-6      | xl:scroll-pr-6      | 2xl:scroll-pr-6      |
| scroll-pr-7       | sm:scroll-pr-7      | md:scroll-pr-7      | lg:scroll-pr-7      | xl:scroll-pr-7      | 2xl:scroll-pr-7      |
| scroll-pr-8       | sm:scroll-pr-8      | md:scroll-pr-8      | lg:scroll-pr-8      | xl:scroll-pr-8      | 2xl:scroll-pr-8      |
| scroll-pr-9       | sm:scroll-pr-9      | md:scroll-pr-9      | lg:scroll-pr-9      | xl:scroll-pr-9      | 2xl:scroll-pr-9      |
| scroll-pr-10      | sm:scroll-pr-10     | md:scroll-pr-10     | lg:scroll-pr-10     | xl:scroll-pr-10     | 2xl:scroll-pr-10     |
| scroll-pr-11      | sm:scroll-pr-11     | md:scroll-pr-11     | lg:scroll-pr-11     | xl:scroll-pr-11     | 2xl:scroll-pr-11     |
| scroll-pr-12      | sm:scroll-pr-12     | md:scroll-pr-12     | lg:scroll-pr-12     | xl:scroll-pr-12     | 2xl:scroll-pr-12     |
| scroll-pr-14      | sm:scroll-pr-14     | md:scroll-pr-14     | lg:scroll-pr-14     | xl:scroll-pr-14     | 2xl:scroll-pr-14     |
| scroll-pr-16      | sm:scroll-pr-16     | md:scroll-pr-16     | lg:scroll-pr-16     | xl:scroll-pr-16     | 2xl:scroll-pr-16     |
| scroll-pr-20      | sm:scroll-pr-20     | md:scroll-pr-20     | lg:scroll-pr-20     | xl:scroll-pr-20     | 2xl:scroll-pr-20     |
| scroll-pr-24      | sm:scroll-pr-24     | md:scroll-pr-24     | lg:scroll-pr-24     | xl:scroll-pr-24     | 2xl:scroll-pr-24     |
| scroll-pr-28      | sm:scroll-pr-28     | md:scroll-pr-28     | lg:scroll-pr-28     | xl:scroll-pr-28     | 2xl:scroll-pr-28     |
| scroll-pr-32      | sm:scroll-pr-32     | md:scroll-pr-32     | lg:scroll-pr-32     | xl:scroll-pr-32     | 2xl:scroll-pr-32     |
| scroll-pr-36      | sm:scroll-pr-36     | md:scroll-pr-36     | lg:scroll-pr-36     | xl:scroll-pr-36     | 2xl:scroll-pr-36     |
| scroll-pr-40      | sm:scroll-pr-40     | md:scroll-pr-40     | lg:scroll-pr-40     | xl:scroll-pr-40     | 2xl:scroll-pr-40     |
| scroll-pr-44      | sm:scroll-pr-44     | md:scroll-pr-44     | lg:scroll-pr-44     | xl:scroll-pr-44     | 2xl:scroll-pr-44     |
| scroll-pr-48      | sm:scroll-pr-48     | md:scroll-pr-48     | lg:scroll-pr-48     | xl:scroll-pr-48     | 2xl:scroll-pr-48     |
| scroll-pr-52      | sm:scroll-pr-52     | md:scroll-pr-52     | lg:scroll-pr-52     | xl:scroll-pr-52     | 2xl:scroll-pr-52     |
| scroll-pr-56      | sm:scroll-pr-56     | md:scroll-pr-56     | lg:scroll-pr-56     | xl:scroll-pr-56     | 2xl:scroll-pr-56     |
| scroll-pr-60      | sm:scroll-pr-60     | md:scroll-pr-60     | lg:scroll-pr-60     | xl:scroll-pr-60     | 2xl:scroll-pr-60     |
| scroll-pr-64      | sm:scroll-pr-64     | md:scroll-pr-64     | lg:scroll-pr-64     | xl:scroll-pr-64     | 2xl:scroll-pr-64     |
| scroll-pr-72      | sm:scroll-pr-72     | md:scroll-pr-72     | lg:scroll-pr-72     | xl:scroll-pr-72     | 2xl:scroll-pr-72     |
| scroll-pr-80      | sm:scroll-pr-80     | md:scroll-pr-80     | lg:scroll-pr-80     | xl:scroll-pr-80     | 2xl:scroll-pr-80     |
| scroll-pr-96      | sm:scroll-pr-96     | md:scroll-pr-96     | lg:scroll-pr-96     | xl:scroll-pr-96     | 2xl:scroll-pr-96     |
*/