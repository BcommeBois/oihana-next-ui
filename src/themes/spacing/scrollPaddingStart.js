import getScrollPadding , { START } from './scrollPadding' ;

/**
 * Generates responsive start (inline-start) scroll padding class definitions.
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
 * getScrollPaddingStart( 4 ) ;
 * // → { 'scroll-ps-4': true }
 *
 * getScrollPaddingStart( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-ps-2': true , 'md:scroll-ps-4': true }
 * ```
 */
export const getScrollPaddingStart = ( value , options = {} ) =>
    getScrollPadding( value , { ...options , direction: START } ) ;

export default getScrollPaddingStart ;

/* Tailwindcss safe list
| -------XS------- | --------SM-------- | --------MD-------- | --------LG-------- | --------XL-------— | --------XXL-------- |
| scroll-ps-px      | sm:scroll-ps-px     | md:scroll-ps-px     | lg:scroll-ps-px     | xl:scroll-ps-px     | 2xl:scroll-ps-px     |
| scroll-ps-0       | sm:scroll-ps-0      | md:scroll-ps-0      | lg:scroll-ps-0      | xl:scroll-ps-0      | 2xl:scroll-ps-0      |
| scroll-ps-0.5     | sm:scroll-ps-0.5    | md:scroll-ps-0.5    | lg:scroll-ps-0.5    | xl:scroll-ps-0.5    | 2xl:scroll-ps-0.5    |
| scroll-ps-1       | sm:scroll-ps-1      | md:scroll-ps-1      | lg:scroll-ps-1      | xl:scroll-ps-1      | 2xl:scroll-ps-1      |
| scroll-ps-1.5     | sm:scroll-ps-1.5    | md:scroll-ps-1.5    | lg:scroll-ps-1.5    | xl:scroll-ps-1.5    | 2xl:scroll-ps-1.5    |
| scroll-ps-2       | sm:scroll-ps-2      | md:scroll-ps-2      | lg:scroll-ps-2      | xl:scroll-ps-2      | 2xl:scroll-ps-2      |
| scroll-ps-2.5     | sm:scroll-ps-2.5    | md:scroll-ps-2.5    | lg:scroll-ps-2.5    | xl:scroll-ps-2.5    | 2xl:scroll-ps-2.5    |
| scroll-ps-3       | sm:scroll-ps-3      | md:scroll-ps-3      | lg:scroll-ps-3      | xl:scroll-ps-3      | 2xl:scroll-ps-3      |
| scroll-ps-3.5     | sm:scroll-ps-3.5    | md:scroll-ps-3.5    | lg:scroll-ps-3.5    | xl:scroll-ps-3.5    | 2xl:scroll-ps-3.5    |
| scroll-ps-4       | sm:scroll-ps-4      | md:scroll-ps-4      | lg:scroll-ps-4      | xl:scroll-ps-4      | 2xl:scroll-ps-4      |
| scroll-ps-5       | sm:scroll-ps-5      | md:scroll-ps-5      | lg:scroll-ps-5      | xl:scroll-ps-5      | 2xl:scroll-ps-5      |
| scroll-ps-6       | sm:scroll-ps-6      | md:scroll-ps-6      | lg:scroll-ps-6      | xl:scroll-ps-6      | 2xl:scroll-ps-6      |
| scroll-ps-7       | sm:scroll-ps-7      | md:scroll-ps-7      | lg:scroll-ps-7      | xl:scroll-ps-7      | 2xl:scroll-ps-7      |
| scroll-ps-8       | sm:scroll-ps-8      | md:scroll-ps-8      | lg:scroll-ps-8      | xl:scroll-ps-8      | 2xl:scroll-ps-8      |
| scroll-ps-9       | sm:scroll-ps-9      | md:scroll-ps-9      | lg:scroll-ps-9      | xl:scroll-ps-9      | 2xl:scroll-ps-9      |
| scroll-ps-10      | sm:scroll-ps-10     | md:scroll-ps-10     | lg:scroll-ps-10     | xl:scroll-ps-10     | 2xl:scroll-ps-10     |
| scroll-ps-11      | sm:scroll-ps-11     | md:scroll-ps-11     | lg:scroll-ps-11     | xl:scroll-ps-11     | 2xl:scroll-ps-11     |
| scroll-ps-12      | sm:scroll-ps-12     | md:scroll-ps-12     | lg:scroll-ps-12     | xl:scroll-ps-12     | 2xl:scroll-ps-12     |
| scroll-ps-14      | sm:scroll-ps-14     | md:scroll-ps-14     | lg:scroll-ps-14     | xl:scroll-ps-14     | 2xl:scroll-ps-14     |
| scroll-ps-16      | sm:scroll-ps-16     | md:scroll-ps-16     | lg:scroll-ps-16     | xl:scroll-ps-16     | 2xl:scroll-ps-16     |
| scroll-ps-20      | sm:scroll-ps-20     | md:scroll-ps-20     | lg:scroll-ps-20     | xl:scroll-ps-20     | 2xl:scroll-ps-20     |
| scroll-ps-24      | sm:scroll-ps-24     | md:scroll-ps-24     | lg:scroll-ps-24     | xl:scroll-ps-24     | 2xl:scroll-ps-24     |
| scroll-ps-28      | sm:scroll-ps-28     | md:scroll-ps-28     | lg:scroll-ps-28     | xl:scroll-ps-28     | 2xl:scroll-ps-28     |
| scroll-ps-32      | sm:scroll-ps-32     | md:scroll-ps-32     | lg:scroll-ps-32     | xl:scroll-ps-32     | 2xl:scroll-ps-32     |
| scroll-ps-36      | sm:scroll-ps-36     | md:scroll-ps-36     | lg:scroll-ps-36     | xl:scroll-ps-36     | 2xl:scroll-ps-36     |
| scroll-ps-40      | sm:scroll-ps-40     | md:scroll-ps-40     | lg:scroll-ps-40     | xl:scroll-ps-40     | 2xl:scroll-ps-40     |
| scroll-ps-44      | sm:scroll-ps-44     | md:scroll-ps-44     | lg:scroll-ps-44     | xl:scroll-ps-44     | 2xl:scroll-ps-44     |
| scroll-ps-48      | sm:scroll-ps-48     | md:scroll-ps-48     | lg:scroll-ps-48     | xl:scroll-ps-48     | 2xl:scroll-ps-48     |
| scroll-ps-52      | sm:scroll-ps-52     | md:scroll-ps-52     | lg:scroll-ps-52     | xl:scroll-ps-52     | 2xl:scroll-ps-52     |
| scroll-ps-56      | sm:scroll-ps-56     | md:scroll-ps-56     | lg:scroll-ps-56     | xl:scroll-ps-56     | 2xl:scroll-ps-56     |
| scroll-ps-60      | sm:scroll-ps-60     | md:scroll-ps-60     | lg:scroll-ps-60     | xl:scroll-ps-60     | 2xl:scroll-ps-60     |
| scroll-ps-64      | sm:scroll-ps-64     | md:scroll-ps-64     | lg:scroll-ps-64     | xl:scroll-ps-64     | 2xl:scroll-ps-64     |
| scroll-ps-72      | sm:scroll-ps-72     | md:scroll-ps-72     | lg:scroll-ps-72     | xl:scroll-ps-72     | 2xl:scroll-ps-72     |
| scroll-ps-80      | sm:scroll-ps-80     | md:scroll-ps-80     | lg:scroll-ps-80     | xl:scroll-ps-80     | 2xl:scroll-ps-80     |
| scroll-ps-96      | sm:scroll-ps-96     | md:scroll-ps-96     | lg:scroll-ps-96     | xl:scroll-ps-96     | 2xl:scroll-ps-96     |
*/