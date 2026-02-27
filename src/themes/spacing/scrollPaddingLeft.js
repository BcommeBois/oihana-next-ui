import getScrollPadding , { LEFT } from './scrollPadding' ;

/**
 * Generates responsive left scroll padding class definitions.
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
 * getScrollPaddingLeft( 4 ) ;
 * // → { 'scroll-pl-4': true }
 *
 * getScrollPaddingLeft( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-pl-2': true , 'md:scroll-pl-4': true }
 * ```
 */
export const getScrollPaddingLeft = ( value , options = {} ) =>
    getScrollPadding( value , { ...options , direction: LEFT } ) ;

export default getScrollPaddingLeft ;

/* Tailwindcss safe list
| -------XS------- | --------SM-------- | --------MD-------- | --------LG-------- | --------XL-------— | --------XXL-------- |
| scroll-pl-px      | sm:scroll-pl-px     | md:scroll-pl-px     | lg:scroll-pl-px     | xl:scroll-pl-px     | 2xl:scroll-pl-px     |
| scroll-pl-0       | sm:scroll-pl-0      | md:scroll-pl-0      | lg:scroll-pl-0      | xl:scroll-pl-0      | 2xl:scroll-pl-0      |
| scroll-pl-0.5     | sm:scroll-pl-0.5    | md:scroll-pl-0.5    | lg:scroll-pl-0.5    | xl:scroll-pl-0.5    | 2xl:scroll-pl-0.5    |
| scroll-pl-1       | sm:scroll-pl-1      | md:scroll-pl-1      | lg:scroll-pl-1      | xl:scroll-pl-1      | 2xl:scroll-pl-1      |
| scroll-pl-1.5     | sm:scroll-pl-1.5    | md:scroll-pl-1.5    | lg:scroll-pl-1.5    | xl:scroll-pl-1.5    | 2xl:scroll-pl-1.5    |
| scroll-pl-2       | sm:scroll-pl-2      | md:scroll-pl-2      | lg:scroll-pl-2      | xl:scroll-pl-2      | 2xl:scroll-pl-2      |
| scroll-pl-2.5     | sm:scroll-pl-2.5    | md:scroll-pl-2.5    | lg:scroll-pl-2.5    | xl:scroll-pl-2.5    | 2xl:scroll-pl-2.5    |
| scroll-pl-3       | sm:scroll-pl-3      | md:scroll-pl-3      | lg:scroll-pl-3      | xl:scroll-pl-3      | 2xl:scroll-pl-3      |
| scroll-pl-3.5     | sm:scroll-pl-3.5    | md:scroll-pl-3.5    | lg:scroll-pl-3.5    | xl:scroll-pl-3.5    | 2xl:scroll-pl-3.5    |
| scroll-pl-4       | sm:scroll-pl-4      | md:scroll-pl-4      | lg:scroll-pl-4      | xl:scroll-pl-4      | 2xl:scroll-pl-4      |
| scroll-pl-5       | sm:scroll-pl-5      | md:scroll-pl-5      | lg:scroll-pl-5      | xl:scroll-pl-5      | 2xl:scroll-pl-5      |
| scroll-pl-6       | sm:scroll-pl-6      | md:scroll-pl-6      | lg:scroll-pl-6      | xl:scroll-pl-6      | 2xl:scroll-pl-6      |
| scroll-pl-7       | sm:scroll-pl-7      | md:scroll-pl-7      | lg:scroll-pl-7      | xl:scroll-pl-7      | 2xl:scroll-pl-7      |
| scroll-pl-8       | sm:scroll-pl-8      | md:scroll-pl-8      | lg:scroll-pl-8      | xl:scroll-pl-8      | 2xl:scroll-pl-8      |
| scroll-pl-9       | sm:scroll-pl-9      | md:scroll-pl-9      | lg:scroll-pl-9      | xl:scroll-pl-9      | 2xl:scroll-pl-9      |
| scroll-pl-10      | sm:scroll-pl-10     | md:scroll-pl-10     | lg:scroll-pl-10     | xl:scroll-pl-10     | 2xl:scroll-pl-10     |
| scroll-pl-11      | sm:scroll-pl-11     | md:scroll-pl-11     | lg:scroll-pl-11     | xl:scroll-pl-11     | 2xl:scroll-pl-11     |
| scroll-pl-12      | sm:scroll-pl-12     | md:scroll-pl-12     | lg:scroll-pl-12     | xl:scroll-pl-12     | 2xl:scroll-pl-12     |
| scroll-pl-14      | sm:scroll-pl-14     | md:scroll-pl-14     | lg:scroll-pl-14     | xl:scroll-pl-14     | 2xl:scroll-pl-14     |
| scroll-pl-16      | sm:scroll-pl-16     | md:scroll-pl-16     | lg:scroll-pl-16     | xl:scroll-pl-16     | 2xl:scroll-pl-16     |
| scroll-pl-20      | sm:scroll-pl-20     | md:scroll-pl-20     | lg:scroll-pl-20     | xl:scroll-pl-20     | 2xl:scroll-pl-20     |
| scroll-pl-24      | sm:scroll-pl-24     | md:scroll-pl-24     | lg:scroll-pl-24     | xl:scroll-pl-24     | 2xl:scroll-pl-24     |
| scroll-pl-28      | sm:scroll-pl-28     | md:scroll-pl-28     | lg:scroll-pl-28     | xl:scroll-pl-28     | 2xl:scroll-pl-28     |
| scroll-pl-32      | sm:scroll-pl-32     | md:scroll-pl-32     | lg:scroll-pl-32     | xl:scroll-pl-32     | 2xl:scroll-pl-32     |
| scroll-pl-36      | sm:scroll-pl-36     | md:scroll-pl-36     | lg:scroll-pl-36     | xl:scroll-pl-36     | 2xl:scroll-pl-36     |
| scroll-pl-40      | sm:scroll-pl-40     | md:scroll-pl-40     | lg:scroll-pl-40     | xl:scroll-pl-40     | 2xl:scroll-pl-40     |
| scroll-pl-44      | sm:scroll-pl-44     | md:scroll-pl-44     | lg:scroll-pl-44     | xl:scroll-pl-44     | 2xl:scroll-pl-44     |
| scroll-pl-48      | sm:scroll-pl-48     | md:scroll-pl-48     | lg:scroll-pl-48     | xl:scroll-pl-48     | 2xl:scroll-pl-48     |
| scroll-pl-52      | sm:scroll-pl-52     | md:scroll-pl-52     | lg:scroll-pl-52     | xl:scroll-pl-52     | 2xl:scroll-pl-52     |
| scroll-pl-56      | sm:scroll-pl-56     | md:scroll-pl-56     | lg:scroll-pl-56     | xl:scroll-pl-56     | 2xl:scroll-pl-56     |
| scroll-pl-60      | sm:scroll-pl-60     | md:scroll-pl-60     | lg:scroll-pl-60     | xl:scroll-pl-60     | 2xl:scroll-pl-60     |
| scroll-pl-64      | sm:scroll-pl-64     | md:scroll-pl-64     | lg:scroll-pl-64     | xl:scroll-pl-64     | 2xl:scroll-pl-64     |
| scroll-pl-72      | sm:scroll-pl-72     | md:scroll-pl-72     | lg:scroll-pl-72     | xl:scroll-pl-72     | 2xl:scroll-pl-72     |
| scroll-pl-80      | sm:scroll-pl-80     | md:scroll-pl-80     | lg:scroll-pl-80     | xl:scroll-pl-80     | 2xl:scroll-pl-80     |
| scroll-pl-96      | sm:scroll-pl-96     | md:scroll-pl-96     | lg:scroll-pl-96     | xl:scroll-pl-96     | 2xl:scroll-pl-96     |
*/