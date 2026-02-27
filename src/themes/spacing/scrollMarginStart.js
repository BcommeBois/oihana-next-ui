import getScrollMargin , { START } from './scrollMargin' ;

/**
 * Generates responsive start (inline-start) scroll margin class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Scroll margin value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative scroll margin.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/scroll-margin
 *
 * @example
 * ```js
 * getScrollMarginStart( 4 ) ;
 * // → { 'scroll-ms-4': true }
 *
 * getScrollMarginStart( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-ms-2': true , 'md:scroll-ms-4': true }
 * ```
 */
export const getScrollMarginStart = ( value , options = {} ) =>
    getScrollMargin( value , { ...options , direction: START } ) ;

export default getScrollMarginStart ;

/* Tailwindcss safe list
| --------XS-------- | ---------SM--------- | ---------MD--------- | ---------LG--------- | ---------XL--------— | ---------XXL--------- |
| scroll-ms-px        | sm:scroll-ms-px       | md:scroll-ms-px       | lg:scroll-ms-px       | xl:scroll-ms-px       | 2xl:scroll-ms-px       |
| scroll-ms-0         | sm:scroll-ms-0        | md:scroll-ms-0        | lg:scroll-ms-0        | xl:scroll-ms-0        | 2xl:scroll-ms-0        |
| scroll-ms-0.5       | sm:scroll-ms-0.5      | md:scroll-ms-0.5      | lg:scroll-ms-0.5      | xl:scroll-ms-0.5      | 2xl:scroll-ms-0.5      |
| scroll-ms-1         | sm:scroll-ms-1        | md:scroll-ms-1        | lg:scroll-ms-1        | xl:scroll-ms-1        | 2xl:scroll-ms-1        |
| scroll-ms-1.5       | sm:scroll-ms-1.5      | md:scroll-ms-1.5      | lg:scroll-ms-1.5      | xl:scroll-ms-1.5      | 2xl:scroll-ms-1.5      |
| scroll-ms-2         | sm:scroll-ms-2        | md:scroll-ms-2        | lg:scroll-ms-2        | xl:scroll-ms-2        | 2xl:scroll-ms-2        |
| scroll-ms-2.5       | sm:scroll-ms-2.5      | md:scroll-ms-2.5      | lg:scroll-ms-2.5      | xl:scroll-ms-2.5      | 2xl:scroll-ms-2.5      |
| scroll-ms-3         | sm:scroll-ms-3        | md:scroll-ms-3        | lg:scroll-ms-3        | xl:scroll-ms-3        | 2xl:scroll-ms-3        |
| scroll-ms-3.5       | sm:scroll-ms-3.5      | md:scroll-ms-3.5      | lg:scroll-ms-3.5      | xl:scroll-ms-3.5      | 2xl:scroll-ms-3.5      |
| scroll-ms-4         | sm:scroll-ms-4        | md:scroll-ms-4        | lg:scroll-ms-4        | xl:scroll-ms-4        | 2xl:scroll-ms-4        |
| scroll-ms-5         | sm:scroll-ms-5        | md:scroll-ms-5        | lg:scroll-ms-5        | xl:scroll-ms-5        | 2xl:scroll-ms-5        |
| scroll-ms-6         | sm:scroll-ms-6        | md:scroll-ms-6        | lg:scroll-ms-6        | xl:scroll-ms-6        | 2xl:scroll-ms-6        |
| scroll-ms-7         | sm:scroll-ms-7        | md:scroll-ms-7        | lg:scroll-ms-7        | xl:scroll-ms-7        | 2xl:scroll-ms-7        |
| scroll-ms-8         | sm:scroll-ms-8        | md:scroll-ms-8        | lg:scroll-ms-8        | xl:scroll-ms-8        | 2xl:scroll-ms-8        |
| scroll-ms-9         | sm:scroll-ms-9        | md:scroll-ms-9        | lg:scroll-ms-9        | xl:scroll-ms-9        | 2xl:scroll-ms-9        |
| scroll-ms-10        | sm:scroll-ms-10       | md:scroll-ms-10       | lg:scroll-ms-10       | xl:scroll-ms-10       | 2xl:scroll-ms-10       |
| scroll-ms-11        | sm:scroll-ms-11       | md:scroll-ms-11       | lg:scroll-ms-11       | xl:scroll-ms-11       | 2xl:scroll-ms-11       |
| scroll-ms-12        | sm:scroll-ms-12       | md:scroll-ms-12       | lg:scroll-ms-12       | xl:scroll-ms-12       | 2xl:scroll-ms-12       |
| scroll-ms-14        | sm:scroll-ms-14       | md:scroll-ms-14       | lg:scroll-ms-14       | xl:scroll-ms-14       | 2xl:scroll-ms-14       |
| scroll-ms-16        | sm:scroll-ms-16       | md:scroll-ms-16       | lg:scroll-ms-16       | xl:scroll-ms-16       | 2xl:scroll-ms-16       |
| scroll-ms-20        | sm:scroll-ms-20       | md:scroll-ms-20       | lg:scroll-ms-20       | xl:scroll-ms-20       | 2xl:scroll-ms-20       |
| scroll-ms-24        | sm:scroll-ms-24       | md:scroll-ms-24       | lg:scroll-ms-24       | xl:scroll-ms-24       | 2xl:scroll-ms-24       |
| scroll-ms-28        | sm:scroll-ms-28       | md:scroll-ms-28       | lg:scroll-ms-28       | xl:scroll-ms-28       | 2xl:scroll-ms-28       |
| scroll-ms-32        | sm:scroll-ms-32       | md:scroll-ms-32       | lg:scroll-ms-32       | xl:scroll-ms-32       | 2xl:scroll-ms-32       |
| scroll-ms-36        | sm:scroll-ms-36       | md:scroll-ms-36       | lg:scroll-ms-36       | xl:scroll-ms-36       | 2xl:scroll-ms-36       |
| scroll-ms-40        | sm:scroll-ms-40       | md:scroll-ms-40       | lg:scroll-ms-40       | xl:scroll-ms-40       | 2xl:scroll-ms-40       |
| scroll-ms-44        | sm:scroll-ms-44       | md:scroll-ms-44       | lg:scroll-ms-44       | xl:scroll-ms-44       | 2xl:scroll-ms-44       |
| scroll-ms-48        | sm:scroll-ms-48       | md:scroll-ms-48       | lg:scroll-ms-48       | xl:scroll-ms-48       | 2xl:scroll-ms-48       |
| scroll-ms-52        | sm:scroll-ms-52       | md:scroll-ms-52       | lg:scroll-ms-52       | xl:scroll-ms-52       | 2xl:scroll-ms-52       |
| scroll-ms-56        | sm:scroll-ms-56       | md:scroll-ms-56       | lg:scroll-ms-56       | xl:scroll-ms-56       | 2xl:scroll-ms-56       |
| scroll-ms-60        | sm:scroll-ms-60       | md:scroll-ms-60       | lg:scroll-ms-60       | xl:scroll-ms-60       | 2xl:scroll-ms-60       |
| scroll-ms-64        | sm:scroll-ms-64       | md:scroll-ms-64       | lg:scroll-ms-64       | xl:scroll-ms-64       | 2xl:scroll-ms-64       |
| scroll-ms-72        | sm:scroll-ms-72       | md:scroll-ms-72       | lg:scroll-ms-72       | xl:scroll-ms-72       | 2xl:scroll-ms-72       |
| scroll-ms-80        | sm:scroll-ms-80       | md:scroll-ms-80       | lg:scroll-ms-80       | xl:scroll-ms-80       | 2xl:scroll-ms-80       |
| scroll-ms-96        | sm:scroll-ms-96       | md:scroll-ms-96       | lg:scroll-ms-96       | xl:scroll-ms-96       | 2xl:scroll-ms-96       |
| -scroll-ms-px       | sm:-scroll-ms-px      | md:-scroll-ms-px      | lg:-scroll-ms-px      | xl:-scroll-ms-px      | 2xl:-scroll-ms-px      |
| -scroll-ms-0.5      | sm:-scroll-ms-0.5     | md:-scroll-ms-0.5     | lg:-scroll-ms-0.5     | xl:-scroll-ms-0.5     | 2xl:-scroll-ms-0.5     |
| -scroll-ms-1        | sm:-scroll-ms-1       | md:-scroll-ms-1       | lg:-scroll-ms-1       | xl:-scroll-ms-1       | 2xl:-scroll-ms-1       |
| -scroll-ms-1.5      | sm:-scroll-ms-1.5     | md:-scroll-ms-1.5     | lg:-scroll-ms-1.5     | xl:-scroll-ms-1.5     | 2xl:-scroll-ms-1.5     |
| -scroll-ms-2        | sm:-scroll-ms-2       | md:-scroll-ms-2       | lg:-scroll-ms-2       | xl:-scroll-ms-2       | 2xl:-scroll-ms-2       |
| -scroll-ms-2.5      | sm:-scroll-ms-2.5     | md:-scroll-ms-2.5     | lg:-scroll-ms-2.5     | xl:-scroll-ms-2.5     | 2xl:-scroll-ms-2.5     |
| -scroll-ms-3        | sm:-scroll-ms-3       | md:-scroll-ms-3       | lg:-scroll-ms-3       | xl:-scroll-ms-3       | 2xl:-scroll-ms-3       |
| -scroll-ms-3.5      | sm:-scroll-ms-3.5     | md:-scroll-ms-3.5     | lg:-scroll-ms-3.5     | xl:-scroll-ms-3.5     | 2xl:-scroll-ms-3.5     |
| -scroll-ms-4        | sm:-scroll-ms-4       | md:-scroll-ms-4       | lg:-scroll-ms-4       | xl:-scroll-ms-4       | 2xl:-scroll-ms-4       |
| -scroll-ms-5        | sm:-scroll-ms-5       | md:-scroll-ms-5       | lg:-scroll-ms-5       | xl:-scroll-ms-5       | 2xl:-scroll-ms-5       |
| -scroll-ms-6        | sm:-scroll-ms-6       | md:-scroll-ms-6       | lg:-scroll-ms-6       | xl:-scroll-ms-6       | 2xl:-scroll-ms-6       |
| -scroll-ms-7        | sm:-scroll-ms-7       | md:-scroll-ms-7       | lg:-scroll-ms-7       | xl:-scroll-ms-7       | 2xl:-scroll-ms-7       |
| -scroll-ms-8        | sm:-scroll-ms-8       | md:-scroll-ms-8       | lg:-scroll-ms-8       | xl:-scroll-ms-8       | 2xl:-scroll-ms-8       |
| -scroll-ms-9        | sm:-scroll-ms-9       | md:-scroll-ms-9       | lg:-scroll-ms-9       | xl:-scroll-ms-9       | 2xl:-scroll-ms-9       |
| -scroll-ms-10       | sm:-scroll-ms-10      | md:-scroll-ms-10      | lg:-scroll-ms-10      | xl:-scroll-ms-10      | 2xl:-scroll-ms-10      |
| -scroll-ms-11       | sm:-scroll-ms-11      | md:-scroll-ms-11      | lg:-scroll-ms-11      | xl:-scroll-ms-11      | 2xl:-scroll-ms-11      |
| -scroll-ms-12       | sm:-scroll-ms-12      | md:-scroll-ms-12      | lg:-scroll-ms-12      | xl:-scroll-ms-12      | 2xl:-scroll-ms-12      |
| -scroll-ms-14       | sm:-scroll-ms-14      | md:-scroll-ms-14      | lg:-scroll-ms-14      | xl:-scroll-ms-14      | 2xl:-scroll-ms-14      |
| -scroll-ms-16       | sm:-scroll-ms-16      | md:-scroll-ms-16      | lg:-scroll-ms-16      | xl:-scroll-ms-16      | 2xl:-scroll-ms-16      |
| -scroll-ms-20       | sm:-scroll-ms-20      | md:-scroll-ms-20      | lg:-scroll-ms-20      | xl:-scroll-ms-20      | 2xl:-scroll-ms-20      |
| -scroll-ms-24       | sm:-scroll-ms-24      | md:-scroll-ms-24      | lg:-scroll-ms-24      | xl:-scroll-ms-24      | 2xl:-scroll-ms-24      |
| -scroll-ms-28       | sm:-scroll-ms-28      | md:-scroll-ms-28      | lg:-scroll-ms-28      | xl:-scroll-ms-28      | 2xl:-scroll-ms-28      |
| -scroll-ms-32       | sm:-scroll-ms-32      | md:-scroll-ms-32      | lg:-scroll-ms-32      | xl:-scroll-ms-32      | 2xl:-scroll-ms-32      |
| -scroll-ms-36       | sm:-scroll-ms-36      | md:-scroll-ms-36      | lg:-scroll-ms-36      | xl:-scroll-ms-36      | 2xl:-scroll-ms-36      |
| -scroll-ms-40       | sm:-scroll-ms-40      | md:-scroll-ms-40      | lg:-scroll-ms-40      | xl:-scroll-ms-40      | 2xl:-scroll-ms-40      |
| -scroll-ms-44       | sm:-scroll-ms-44      | md:-scroll-ms-44      | lg:-scroll-ms-44      | xl:-scroll-ms-44      | 2xl:-scroll-ms-44      |
| -scroll-ms-48       | sm:-scroll-ms-48      | md:-scroll-ms-48      | lg:-scroll-ms-48      | xl:-scroll-ms-48      | 2xl:-scroll-ms-48      |
| -scroll-ms-52       | sm:-scroll-ms-52      | md:-scroll-ms-52      | lg:-scroll-ms-52      | xl:-scroll-ms-52      | 2xl:-scroll-ms-52      |
| -scroll-ms-56       | sm:-scroll-ms-56      | md:-scroll-ms-56      | lg:-scroll-ms-56      | xl:-scroll-ms-56      | 2xl:-scroll-ms-56      |
| -scroll-ms-60       | sm:-scroll-ms-60      | md:-scroll-ms-60      | lg:-scroll-ms-60      | xl:-scroll-ms-60      | 2xl:-scroll-ms-60      |
| -scroll-ms-64       | sm:-scroll-ms-64      | md:-scroll-ms-64      | lg:-scroll-ms-64      | xl:-scroll-ms-64      | 2xl:-scroll-ms-64      |
| -scroll-ms-72       | sm:-scroll-ms-72      | md:-scroll-ms-72      | lg:-scroll-ms-72      | xl:-scroll-ms-72      | 2xl:-scroll-ms-72      |
| -scroll-ms-80       | sm:-scroll-ms-80      | md:-scroll-ms-80      | lg:-scroll-ms-80      | xl:-scroll-ms-80      | 2xl:-scroll-ms-80      |
| -scroll-ms-96       | sm:-scroll-ms-96      | md:-scroll-ms-96      | lg:-scroll-ms-96      | xl:-scroll-ms-96      | 2xl:-scroll-ms-96      |
*/