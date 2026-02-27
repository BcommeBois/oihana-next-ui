import getScrollPadding , { TOP } from './scrollPadding' ;

/**
 * Generates responsive top scroll padding class definitions.
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
 * getScrollPaddingTop( 4 ) ;
 * // → { 'scroll-pt-4': true }
 *
 * getScrollPaddingTop( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-pt-2': true , 'md:scroll-pt-4': true }
 * ```
 */
export const getScrollPaddingTop = ( value , options = {} ) =>
    getScrollPadding( value , { ...options , direction: TOP } ) ;

export default getScrollPaddingTop ;

/* Tailwindcss safe list
| -------XS------- | --------SM-------- | --------MD-------- | --------LG-------- | --------XL-------— | --------XXL-------- |
| scroll-pt-px      | sm:scroll-pt-px     | md:scroll-pt-px     | lg:scroll-pt-px     | xl:scroll-pt-px     | 2xl:scroll-pt-px     |
| scroll-pt-0       | sm:scroll-pt-0      | md:scroll-pt-0      | lg:scroll-pt-0      | xl:scroll-pt-0      | 2xl:scroll-pt-0      |
| scroll-pt-0.5     | sm:scroll-pt-0.5    | md:scroll-pt-0.5    | lg:scroll-pt-0.5    | xl:scroll-pt-0.5    | 2xl:scroll-pt-0.5    |
| scroll-pt-1       | sm:scroll-pt-1      | md:scroll-pt-1      | lg:scroll-pt-1      | xl:scroll-pt-1      | 2xl:scroll-pt-1      |
| scroll-pt-1.5     | sm:scroll-pt-1.5    | md:scroll-pt-1.5    | lg:scroll-pt-1.5    | xl:scroll-pt-1.5    | 2xl:scroll-pt-1.5    |
| scroll-pt-2       | sm:scroll-pt-2      | md:scroll-pt-2      | lg:scroll-pt-2      | xl:scroll-pt-2      | 2xl:scroll-pt-2      |
| scroll-pt-2.5     | sm:scroll-pt-2.5    | md:scroll-pt-2.5    | lg:scroll-pt-2.5    | xl:scroll-pt-2.5    | 2xl:scroll-pt-2.5    |
| scroll-pt-3       | sm:scroll-pt-3      | md:scroll-pt-3      | lg:scroll-pt-3      | xl:scroll-pt-3      | 2xl:scroll-pt-3      |
| scroll-pt-3.5     | sm:scroll-pt-3.5    | md:scroll-pt-3.5    | lg:scroll-pt-3.5    | xl:scroll-pt-3.5    | 2xl:scroll-pt-3.5    |
| scroll-pt-4       | sm:scroll-pt-4      | md:scroll-pt-4      | lg:scroll-pt-4      | xl:scroll-pt-4      | 2xl:scroll-pt-4      |
| scroll-pt-5       | sm:scroll-pt-5      | md:scroll-pt-5      | lg:scroll-pt-5      | xl:scroll-pt-5      | 2xl:scroll-pt-5      |
| scroll-pt-6       | sm:scroll-pt-6      | md:scroll-pt-6      | lg:scroll-pt-6      | xl:scroll-pt-6      | 2xl:scroll-pt-6      |
| scroll-pt-7       | sm:scroll-pt-7      | md:scroll-pt-7      | lg:scroll-pt-7      | xl:scroll-pt-7      | 2xl:scroll-pt-7      |
| scroll-pt-8       | sm:scroll-pt-8      | md:scroll-pt-8      | lg:scroll-pt-8      | xl:scroll-pt-8      | 2xl:scroll-pt-8      |
| scroll-pt-9       | sm:scroll-pt-9      | md:scroll-pt-9      | lg:scroll-pt-9      | xl:scroll-pt-9      | 2xl:scroll-pt-9      |
| scroll-pt-10      | sm:scroll-pt-10     | md:scroll-pt-10     | lg:scroll-pt-10     | xl:scroll-pt-10     | 2xl:scroll-pt-10     |
| scroll-pt-11      | sm:scroll-pt-11     | md:scroll-pt-11     | lg:scroll-pt-11     | xl:scroll-pt-11     | 2xl:scroll-pt-11     |
| scroll-pt-12      | sm:scroll-pt-12     | md:scroll-pt-12     | lg:scroll-pt-12     | xl:scroll-pt-12     | 2xl:scroll-pt-12     |
| scroll-pt-14      | sm:scroll-pt-14     | md:scroll-pt-14     | lg:scroll-pt-14     | xl:scroll-pt-14     | 2xl:scroll-pt-14     |
| scroll-pt-16      | sm:scroll-pt-16     | md:scroll-pt-16     | lg:scroll-pt-16     | xl:scroll-pt-16     | 2xl:scroll-pt-16     |
| scroll-pt-20      | sm:scroll-pt-20     | md:scroll-pt-20     | lg:scroll-pt-20     | xl:scroll-pt-20     | 2xl:scroll-pt-20     |
| scroll-pt-24      | sm:scroll-pt-24     | md:scroll-pt-24     | lg:scroll-pt-24     | xl:scroll-pt-24     | 2xl:scroll-pt-24     |
| scroll-pt-28      | sm:scroll-pt-28     | md:scroll-pt-28     | lg:scroll-pt-28     | xl:scroll-pt-28     | 2xl:scroll-pt-28     |
| scroll-pt-32      | sm:scroll-pt-32     | md:scroll-pt-32     | lg:scroll-pt-32     | xl:scroll-pt-32     | 2xl:scroll-pt-32     |
| scroll-pt-36      | sm:scroll-pt-36     | md:scroll-pt-36     | lg:scroll-pt-36     | xl:scroll-pt-36     | 2xl:scroll-pt-36     |
| scroll-pt-40      | sm:scroll-pt-40     | md:scroll-pt-40     | lg:scroll-pt-40     | xl:scroll-pt-40     | 2xl:scroll-pt-40     |
| scroll-pt-44      | sm:scroll-pt-44     | md:scroll-pt-44     | lg:scroll-pt-44     | xl:scroll-pt-44     | 2xl:scroll-pt-44     |
| scroll-pt-48      | sm:scroll-pt-48     | md:scroll-pt-48     | lg:scroll-pt-48     | xl:scroll-pt-48     | 2xl:scroll-pt-48     |
| scroll-pt-52      | sm:scroll-pt-52     | md:scroll-pt-52     | lg:scroll-pt-52     | xl:scroll-pt-52     | 2xl:scroll-pt-52     |
| scroll-pt-56      | sm:scroll-pt-56     | md:scroll-pt-56     | lg:scroll-pt-56     | xl:scroll-pt-56     | 2xl:scroll-pt-56     |
| scroll-pt-60      | sm:scroll-pt-60     | md:scroll-pt-60     | lg:scroll-pt-60     | xl:scroll-pt-60     | 2xl:scroll-pt-60     |
| scroll-pt-64      | sm:scroll-pt-64     | md:scroll-pt-64     | lg:scroll-pt-64     | xl:scroll-pt-64     | 2xl:scroll-pt-64     |
| scroll-pt-72      | sm:scroll-pt-72     | md:scroll-pt-72     | lg:scroll-pt-72     | xl:scroll-pt-72     | 2xl:scroll-pt-72     |
| scroll-pt-80      | sm:scroll-pt-80     | md:scroll-pt-80     | lg:scroll-pt-80     | xl:scroll-pt-80     | 2xl:scroll-pt-80     |
| scroll-pt-96      | sm:scroll-pt-96     | md:scroll-pt-96     | lg:scroll-pt-96     | xl:scroll-pt-96     | 2xl:scroll-pt-96     |
*/