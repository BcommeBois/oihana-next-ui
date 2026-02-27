import getScrollMargin , { TOP } from './scrollMargin' ;

/**
 * Generates responsive top scroll margin class definitions.
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
 * getScrollMarginTop( 4 ) ;
 * // → { 'scroll-mt-4': true }
 *
 * getScrollMarginTop( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-mt-2': true , 'md:scroll-mt-4': true }
 * ```
 */
export const getScrollMarginTop = ( value , options = {} ) =>
    getScrollMargin( value , { ...options , direction: TOP } ) ;

export default getScrollMarginTop ;

/* Tailwindcss safe list
| --------XS-------- | ---------SM--------- | ---------MD--------- | ---------LG--------- | ---------XL--------— | ---------XXL--------- |
| scroll-mt-px        | sm:scroll-mt-px       | md:scroll-mt-px       | lg:scroll-mt-px       | xl:scroll-mt-px       | 2xl:scroll-mt-px       |
| scroll-mt-0         | sm:scroll-mt-0        | md:scroll-mt-0        | lg:scroll-mt-0        | xl:scroll-mt-0        | 2xl:scroll-mt-0        |
| scroll-mt-0.5       | sm:scroll-mt-0.5      | md:scroll-mt-0.5      | lg:scroll-mt-0.5      | xl:scroll-mt-0.5      | 2xl:scroll-mt-0.5      |
| scroll-mt-1         | sm:scroll-mt-1        | md:scroll-mt-1        | lg:scroll-mt-1        | xl:scroll-mt-1        | 2xl:scroll-mt-1        |
| scroll-mt-1.5       | sm:scroll-mt-1.5      | md:scroll-mt-1.5      | lg:scroll-mt-1.5      | xl:scroll-mt-1.5      | 2xl:scroll-mt-1.5      |
| scroll-mt-2         | sm:scroll-mt-2        | md:scroll-mt-2        | lg:scroll-mt-2        | xl:scroll-mt-2        | 2xl:scroll-mt-2        |
| scroll-mt-2.5       | sm:scroll-mt-2.5      | md:scroll-mt-2.5      | lg:scroll-mt-2.5      | xl:scroll-mt-2.5      | 2xl:scroll-mt-2.5      |
| scroll-mt-3         | sm:scroll-mt-3        | md:scroll-mt-3        | lg:scroll-mt-3        | xl:scroll-mt-3        | 2xl:scroll-mt-3        |
| scroll-mt-3.5       | sm:scroll-mt-3.5      | md:scroll-mt-3.5      | lg:scroll-mt-3.5      | xl:scroll-mt-3.5      | 2xl:scroll-mt-3.5      |
| scroll-mt-4         | sm:scroll-mt-4        | md:scroll-mt-4        | lg:scroll-mt-4        | xl:scroll-mt-4        | 2xl:scroll-mt-4        |
| scroll-mt-5         | sm:scroll-mt-5        | md:scroll-mt-5        | lg:scroll-mt-5        | xl:scroll-mt-5        | 2xl:scroll-mt-5        |
| scroll-mt-6         | sm:scroll-mt-6        | md:scroll-mt-6        | lg:scroll-mt-6        | xl:scroll-mt-6        | 2xl:scroll-mt-6        |
| scroll-mt-7         | sm:scroll-mt-7        | md:scroll-mt-7        | lg:scroll-mt-7        | xl:scroll-mt-7        | 2xl:scroll-mt-7        |
| scroll-mt-8         | sm:scroll-mt-8        | md:scroll-mt-8        | lg:scroll-mt-8        | xl:scroll-mt-8        | 2xl:scroll-mt-8        |
| scroll-mt-9         | sm:scroll-mt-9        | md:scroll-mt-9        | lg:scroll-mt-9        | xl:scroll-mt-9        | 2xl:scroll-mt-9        |
| scroll-mt-10        | sm:scroll-mt-10       | md:scroll-mt-10       | lg:scroll-mt-10       | xl:scroll-mt-10       | 2xl:scroll-mt-10       |
| scroll-mt-11        | sm:scroll-mt-11       | md:scroll-mt-11       | lg:scroll-mt-11       | xl:scroll-mt-11       | 2xl:scroll-mt-11       |
| scroll-mt-12        | sm:scroll-mt-12       | md:scroll-mt-12       | lg:scroll-mt-12       | xl:scroll-mt-12       | 2xl:scroll-mt-12       |
| scroll-mt-14        | sm:scroll-mt-14       | md:scroll-mt-14       | lg:scroll-mt-14       | xl:scroll-mt-14       | 2xl:scroll-mt-14       |
| scroll-mt-16        | sm:scroll-mt-16       | md:scroll-mt-16       | lg:scroll-mt-16       | xl:scroll-mt-16       | 2xl:scroll-mt-16       |
| scroll-mt-20        | sm:scroll-mt-20       | md:scroll-mt-20       | lg:scroll-mt-20       | xl:scroll-mt-20       | 2xl:scroll-mt-20       |
| scroll-mt-24        | sm:scroll-mt-24       | md:scroll-mt-24       | lg:scroll-mt-24       | xl:scroll-mt-24       | 2xl:scroll-mt-24       |
| scroll-mt-28        | sm:scroll-mt-28       | md:scroll-mt-28       | lg:scroll-mt-28       | xl:scroll-mt-28       | 2xl:scroll-mt-28       |
| scroll-mt-32        | sm:scroll-mt-32       | md:scroll-mt-32       | lg:scroll-mt-32       | xl:scroll-mt-32       | 2xl:scroll-mt-32       |
| scroll-mt-36        | sm:scroll-mt-36       | md:scroll-mt-36       | lg:scroll-mt-36       | xl:scroll-mt-36       | 2xl:scroll-mt-36       |
| scroll-mt-40        | sm:scroll-mt-40       | md:scroll-mt-40       | lg:scroll-mt-40       | xl:scroll-mt-40       | 2xl:scroll-mt-40       |
| scroll-mt-44        | sm:scroll-mt-44       | md:scroll-mt-44       | lg:scroll-mt-44       | xl:scroll-mt-44       | 2xl:scroll-mt-44       |
| scroll-mt-48        | sm:scroll-mt-48       | md:scroll-mt-48       | lg:scroll-mt-48       | xl:scroll-mt-48       | 2xl:scroll-mt-48       |
| scroll-mt-52        | sm:scroll-mt-52       | md:scroll-mt-52       | lg:scroll-mt-52       | xl:scroll-mt-52       | 2xl:scroll-mt-52       |
| scroll-mt-56        | sm:scroll-mt-56       | md:scroll-mt-56       | lg:scroll-mt-56       | xl:scroll-mt-56       | 2xl:scroll-mt-56       |
| scroll-mt-60        | sm:scroll-mt-60       | md:scroll-mt-60       | lg:scroll-mt-60       | xl:scroll-mt-60       | 2xl:scroll-mt-60       |
| scroll-mt-64        | sm:scroll-mt-64       | md:scroll-mt-64       | lg:scroll-mt-64       | xl:scroll-mt-64       | 2xl:scroll-mt-64       |
| scroll-mt-72        | sm:scroll-mt-72       | md:scroll-mt-72       | lg:scroll-mt-72       | xl:scroll-mt-72       | 2xl:scroll-mt-72       |
| scroll-mt-80        | sm:scroll-mt-80       | md:scroll-mt-80       | lg:scroll-mt-80       | xl:scroll-mt-80       | 2xl:scroll-mt-80       |
| scroll-mt-96        | sm:scroll-mt-96       | md:scroll-mt-96       | lg:scroll-mt-96       | xl:scroll-mt-96       | 2xl:scroll-mt-96       |
| -scroll-mt-px       | sm:-scroll-mt-px      | md:-scroll-mt-px      | lg:-scroll-mt-px      | xl:-scroll-mt-px      | 2xl:-scroll-mt-px      |
| -scroll-mt-0.5      | sm:-scroll-mt-0.5     | md:-scroll-mt-0.5     | lg:-scroll-mt-0.5     | xl:-scroll-mt-0.5     | 2xl:-scroll-mt-0.5     |
| -scroll-mt-1        | sm:-scroll-mt-1       | md:-scroll-mt-1       | lg:-scroll-mt-1       | xl:-scroll-mt-1       | 2xl:-scroll-mt-1       |
| -scroll-mt-1.5      | sm:-scroll-mt-1.5     | md:-scroll-mt-1.5     | lg:-scroll-mt-1.5     | xl:-scroll-mt-1.5     | 2xl:-scroll-mt-1.5     |
| -scroll-mt-2        | sm:-scroll-mt-2       | md:-scroll-mt-2       | lg:-scroll-mt-2       | xl:-scroll-mt-2       | 2xl:-scroll-mt-2       |
| -scroll-mt-2.5      | sm:-scroll-mt-2.5     | md:-scroll-mt-2.5     | lg:-scroll-mt-2.5     | xl:-scroll-mt-2.5     | 2xl:-scroll-mt-2.5     |
| -scroll-mt-3        | sm:-scroll-mt-3       | md:-scroll-mt-3       | lg:-scroll-mt-3       | xl:-scroll-mt-3       | 2xl:-scroll-mt-3       |
| -scroll-mt-3.5      | sm:-scroll-mt-3.5     | md:-scroll-mt-3.5     | lg:-scroll-mt-3.5     | xl:-scroll-mt-3.5     | 2xl:-scroll-mt-3.5     |
| -scroll-mt-4        | sm:-scroll-mt-4       | md:-scroll-mt-4       | lg:-scroll-mt-4       | xl:-scroll-mt-4       | 2xl:-scroll-mt-4       |
| -scroll-mt-5        | sm:-scroll-mt-5       | md:-scroll-mt-5       | lg:-scroll-mt-5       | xl:-scroll-mt-5       | 2xl:-scroll-mt-5       |
| -scroll-mt-6        | sm:-scroll-mt-6       | md:-scroll-mt-6       | lg:-scroll-mt-6       | xl:-scroll-mt-6       | 2xl:-scroll-mt-6       |
| -scroll-mt-7        | sm:-scroll-mt-7       | md:-scroll-mt-7       | lg:-scroll-mt-7       | xl:-scroll-mt-7       | 2xl:-scroll-mt-7       |
| -scroll-mt-8        | sm:-scroll-mt-8       | md:-scroll-mt-8       | lg:-scroll-mt-8       | xl:-scroll-mt-8       | 2xl:-scroll-mt-8       |
| -scroll-mt-9        | sm:-scroll-mt-9       | md:-scroll-mt-9       | lg:-scroll-mt-9       | xl:-scroll-mt-9       | 2xl:-scroll-mt-9       |
| -scroll-mt-10       | sm:-scroll-mt-10      | md:-scroll-mt-10      | lg:-scroll-mt-10      | xl:-scroll-mt-10      | 2xl:-scroll-mt-10      |
| -scroll-mt-11       | sm:-scroll-mt-11      | md:-scroll-mt-11      | lg:-scroll-mt-11      | xl:-scroll-mt-11      | 2xl:-scroll-mt-11      |
| -scroll-mt-12       | sm:-scroll-mt-12      | md:-scroll-mt-12      | lg:-scroll-mt-12      | xl:-scroll-mt-12      | 2xl:-scroll-mt-12      |
| -scroll-mt-14       | sm:-scroll-mt-14      | md:-scroll-mt-14      | lg:-scroll-mt-14      | xl:-scroll-mt-14      | 2xl:-scroll-mt-14      |
| -scroll-mt-16       | sm:-scroll-mt-16      | md:-scroll-mt-16      | lg:-scroll-mt-16      | xl:-scroll-mt-16      | 2xl:-scroll-mt-16      |
| -scroll-mt-20       | sm:-scroll-mt-20      | md:-scroll-mt-20      | lg:-scroll-mt-20      | xl:-scroll-mt-20      | 2xl:-scroll-mt-20      |
| -scroll-mt-24       | sm:-scroll-mt-24      | md:-scroll-mt-24      | lg:-scroll-mt-24      | xl:-scroll-mt-24      | 2xl:-scroll-mt-24      |
| -scroll-mt-28       | sm:-scroll-mt-28      | md:-scroll-mt-28      | lg:-scroll-mt-28      | xl:-scroll-mt-28      | 2xl:-scroll-mt-28      |
| -scroll-mt-32       | sm:-scroll-mt-32      | md:-scroll-mt-32      | lg:-scroll-mt-32      | xl:-scroll-mt-32      | 2xl:-scroll-mt-32      |
| -scroll-mt-36       | sm:-scroll-mt-36      | md:-scroll-mt-36      | lg:-scroll-mt-36      | xl:-scroll-mt-36      | 2xl:-scroll-mt-36      |
| -scroll-mt-40       | sm:-scroll-mt-40      | md:-scroll-mt-40      | lg:-scroll-mt-40      | xl:-scroll-mt-40      | 2xl:-scroll-mt-40      |
| -scroll-mt-44       | sm:-scroll-mt-44      | md:-scroll-mt-44      | lg:-scroll-mt-44      | xl:-scroll-mt-44      | 2xl:-scroll-mt-44      |
| -scroll-mt-48       | sm:-scroll-mt-48      | md:-scroll-mt-48      | lg:-scroll-mt-48      | xl:-scroll-mt-48      | 2xl:-scroll-mt-48      |
| -scroll-mt-52       | sm:-scroll-mt-52      | md:-scroll-mt-52      | lg:-scroll-mt-52      | xl:-scroll-mt-52      | 2xl:-scroll-mt-52      |
| -scroll-mt-56       | sm:-scroll-mt-56      | md:-scroll-mt-56      | lg:-scroll-mt-56      | xl:-scroll-mt-56      | 2xl:-scroll-mt-56      |
| -scroll-mt-60       | sm:-scroll-mt-60      | md:-scroll-mt-60      | lg:-scroll-mt-60      | xl:-scroll-mt-60      | 2xl:-scroll-mt-60      |
| -scroll-mt-64       | sm:-scroll-mt-64      | md:-scroll-mt-64      | lg:-scroll-mt-64      | xl:-scroll-mt-64      | 2xl:-scroll-mt-64      |
| -scroll-mt-72       | sm:-scroll-mt-72      | md:-scroll-mt-72      | lg:-scroll-mt-72      | xl:-scroll-mt-72      | 2xl:-scroll-mt-72      |
| -scroll-mt-80       | sm:-scroll-mt-80      | md:-scroll-mt-80      | lg:-scroll-mt-80      | xl:-scroll-mt-80      | 2xl:-scroll-mt-80      |
| -scroll-mt-96       | sm:-scroll-mt-96      | md:-scroll-mt-96      | lg:-scroll-mt-96      | xl:-scroll-mt-96      | 2xl:-scroll-mt-96      |
*/