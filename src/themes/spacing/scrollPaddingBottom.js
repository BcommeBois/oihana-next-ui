import getScrollPadding , { BOTTOM } from './scrollPadding' ;

/**
 * Generates responsive bottom scroll padding class definitions.
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
 * getScrollPaddingBottom( 4 ) ;
 * // → { 'scroll-pb-4': true }
 *
 * getScrollPaddingBottom( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-pb-2': true , 'md:scroll-pb-4': true }
 * ```
 */
export const getScrollPaddingBottom = ( value , options = {} ) =>
    getScrollPadding( value , { ...options , direction: BOTTOM } ) ;

export default getScrollPaddingBottom ;

/* Tailwindcss safe list
| -------XS------- | --------SM-------- | --------MD-------- | --------LG-------- | --------XL-------— | --------XXL-------- |
| scroll-pb-px      | sm:scroll-pb-px     | md:scroll-pb-px     | lg:scroll-pb-px     | xl:scroll-pb-px     | 2xl:scroll-pb-px     |
| scroll-pb-0       | sm:scroll-pb-0      | md:scroll-pb-0      | lg:scroll-pb-0      | xl:scroll-pb-0      | 2xl:scroll-pb-0      |
| scroll-pb-0.5     | sm:scroll-pb-0.5    | md:scroll-pb-0.5    | lg:scroll-pb-0.5    | xl:scroll-pb-0.5    | 2xl:scroll-pb-0.5    |
| scroll-pb-1       | sm:scroll-pb-1      | md:scroll-pb-1      | lg:scroll-pb-1      | xl:scroll-pb-1      | 2xl:scroll-pb-1      |
| scroll-pb-1.5     | sm:scroll-pb-1.5    | md:scroll-pb-1.5    | lg:scroll-pb-1.5    | xl:scroll-pb-1.5    | 2xl:scroll-pb-1.5    |
| scroll-pb-2       | sm:scroll-pb-2      | md:scroll-pb-2      | lg:scroll-pb-2      | xl:scroll-pb-2      | 2xl:scroll-pb-2      |
| scroll-pb-2.5     | sm:scroll-pb-2.5    | md:scroll-pb-2.5    | lg:scroll-pb-2.5    | xl:scroll-pb-2.5    | 2xl:scroll-pb-2.5    |
| scroll-pb-3       | sm:scroll-pb-3      | md:scroll-pb-3      | lg:scroll-pb-3      | xl:scroll-pb-3      | 2xl:scroll-pb-3      |
| scroll-pb-3.5     | sm:scroll-pb-3.5    | md:scroll-pb-3.5    | lg:scroll-pb-3.5    | xl:scroll-pb-3.5    | 2xl:scroll-pb-3.5    |
| scroll-pb-4       | sm:scroll-pb-4      | md:scroll-pb-4      | lg:scroll-pb-4      | xl:scroll-pb-4      | 2xl:scroll-pb-4      |
| scroll-pb-5       | sm:scroll-pb-5      | md:scroll-pb-5      | lg:scroll-pb-5      | xl:scroll-pb-5      | 2xl:scroll-pb-5      |
| scroll-pb-6       | sm:scroll-pb-6      | md:scroll-pb-6      | lg:scroll-pb-6      | xl:scroll-pb-6      | 2xl:scroll-pb-6      |
| scroll-pb-7       | sm:scroll-pb-7      | md:scroll-pb-7      | lg:scroll-pb-7      | xl:scroll-pb-7      | 2xl:scroll-pb-7      |
| scroll-pb-8       | sm:scroll-pb-8      | md:scroll-pb-8      | lg:scroll-pb-8      | xl:scroll-pb-8      | 2xl:scroll-pb-8      |
| scroll-pb-9       | sm:scroll-pb-9      | md:scroll-pb-9      | lg:scroll-pb-9      | xl:scroll-pb-9      | 2xl:scroll-pb-9      |
| scroll-pb-10      | sm:scroll-pb-10     | md:scroll-pb-10     | lg:scroll-pb-10     | xl:scroll-pb-10     | 2xl:scroll-pb-10     |
| scroll-pb-11      | sm:scroll-pb-11     | md:scroll-pb-11     | lg:scroll-pb-11     | xl:scroll-pb-11     | 2xl:scroll-pb-11     |
| scroll-pb-12      | sm:scroll-pb-12     | md:scroll-pb-12     | lg:scroll-pb-12     | xl:scroll-pb-12     | 2xl:scroll-pb-12     |
| scroll-pb-14      | sm:scroll-pb-14     | md:scroll-pb-14     | lg:scroll-pb-14     | xl:scroll-pb-14     | 2xl:scroll-pb-14     |
| scroll-pb-16      | sm:scroll-pb-16     | md:scroll-pb-16     | lg:scroll-pb-16     | xl:scroll-pb-16     | 2xl:scroll-pb-16     |
| scroll-pb-20      | sm:scroll-pb-20     | md:scroll-pb-20     | lg:scroll-pb-20     | xl:scroll-pb-20     | 2xl:scroll-pb-20     |
| scroll-pb-24      | sm:scroll-pb-24     | md:scroll-pb-24     | lg:scroll-pb-24     | xl:scroll-pb-24     | 2xl:scroll-pb-24     |
| scroll-pb-28      | sm:scroll-pb-28     | md:scroll-pb-28     | lg:scroll-pb-28     | xl:scroll-pb-28     | 2xl:scroll-pb-28     |
| scroll-pb-32      | sm:scroll-pb-32     | md:scroll-pb-32     | lg:scroll-pb-32     | xl:scroll-pb-32     | 2xl:scroll-pb-32     |
| scroll-pb-36      | sm:scroll-pb-36     | md:scroll-pb-36     | lg:scroll-pb-36     | xl:scroll-pb-36     | 2xl:scroll-pb-36     |
| scroll-pb-40      | sm:scroll-pb-40     | md:scroll-pb-40     | lg:scroll-pb-40     | xl:scroll-pb-40     | 2xl:scroll-pb-40     |
| scroll-pb-44      | sm:scroll-pb-44     | md:scroll-pb-44     | lg:scroll-pb-44     | xl:scroll-pb-44     | 2xl:scroll-pb-44     |
| scroll-pb-48      | sm:scroll-pb-48     | md:scroll-pb-48     | lg:scroll-pb-48     | xl:scroll-pb-48     | 2xl:scroll-pb-48     |
| scroll-pb-52      | sm:scroll-pb-52     | md:scroll-pb-52     | lg:scroll-pb-52     | xl:scroll-pb-52     | 2xl:scroll-pb-52     |
| scroll-pb-56      | sm:scroll-pb-56     | md:scroll-pb-56     | lg:scroll-pb-56     | xl:scroll-pb-56     | 2xl:scroll-pb-56     |
| scroll-pb-60      | sm:scroll-pb-60     | md:scroll-pb-60     | lg:scroll-pb-60     | xl:scroll-pb-60     | 2xl:scroll-pb-60     |
| scroll-pb-64      | sm:scroll-pb-64     | md:scroll-pb-64     | lg:scroll-pb-64     | xl:scroll-pb-64     | 2xl:scroll-pb-64     |
| scroll-pb-72      | sm:scroll-pb-72     | md:scroll-pb-72     | lg:scroll-pb-72     | xl:scroll-pb-72     | 2xl:scroll-pb-72     |
| scroll-pb-80      | sm:scroll-pb-80     | md:scroll-pb-80     | lg:scroll-pb-80     | xl:scroll-pb-80     | 2xl:scroll-pb-80     |
| scroll-pb-96      | sm:scroll-pb-96     | md:scroll-pb-96     | lg:scroll-pb-96     | xl:scroll-pb-96     | 2xl:scroll-pb-96     |
*/