import getScrollMargin , { RIGHT } from './scrollMargin' ;

/**
 * Generates responsive right scroll margin class definitions.
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
 * getScrollMarginRight( 4 ) ;
 * // → { 'scroll-mr-4': true }
 *
 * getScrollMarginRight( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-mr-2': true , 'md:scroll-mr-4': true }
 * ```
 */
export const getScrollMarginRight = ( value , options = {} ) =>
    getScrollMargin( value , { ...options , direction: RIGHT } ) ;

export default getScrollMarginRight ;

/* Tailwindcss safe list
| --------XS-------- | ---------SM--------- | ---------MD--------- | ---------LG--------- | ---------XL--------— | ---------XXL--------- |
| scroll-mr-px        | sm:scroll-mr-px       | md:scroll-mr-px       | lg:scroll-mr-px       | xl:scroll-mr-px       | 2xl:scroll-mr-px       |
| scroll-mr-0         | sm:scroll-mr-0        | md:scroll-mr-0        | lg:scroll-mr-0        | xl:scroll-mr-0        | 2xl:scroll-mr-0        |
| scroll-mr-0.5       | sm:scroll-mr-0.5      | md:scroll-mr-0.5      | lg:scroll-mr-0.5      | xl:scroll-mr-0.5      | 2xl:scroll-mr-0.5      |
| scroll-mr-1         | sm:scroll-mr-1        | md:scroll-mr-1        | lg:scroll-mr-1        | xl:scroll-mr-1        | 2xl:scroll-mr-1        |
| scroll-mr-1.5       | sm:scroll-mr-1.5      | md:scroll-mr-1.5      | lg:scroll-mr-1.5      | xl:scroll-mr-1.5      | 2xl:scroll-mr-1.5      |
| scroll-mr-2         | sm:scroll-mr-2        | md:scroll-mr-2        | lg:scroll-mr-2        | xl:scroll-mr-2        | 2xl:scroll-mr-2        |
| scroll-mr-2.5       | sm:scroll-mr-2.5      | md:scroll-mr-2.5      | lg:scroll-mr-2.5      | xl:scroll-mr-2.5      | 2xl:scroll-mr-2.5      |
| scroll-mr-3         | sm:scroll-mr-3        | md:scroll-mr-3        | lg:scroll-mr-3        | xl:scroll-mr-3        | 2xl:scroll-mr-3        |
| scroll-mr-3.5       | sm:scroll-mr-3.5      | md:scroll-mr-3.5      | lg:scroll-mr-3.5      | xl:scroll-mr-3.5      | 2xl:scroll-mr-3.5      |
| scroll-mr-4         | sm:scroll-mr-4        | md:scroll-mr-4        | lg:scroll-mr-4        | xl:scroll-mr-4        | 2xl:scroll-mr-4        |
| scroll-mr-5         | sm:scroll-mr-5        | md:scroll-mr-5        | lg:scroll-mr-5        | xl:scroll-mr-5        | 2xl:scroll-mr-5        |
| scroll-mr-6         | sm:scroll-mr-6        | md:scroll-mr-6        | lg:scroll-mr-6        | xl:scroll-mr-6        | 2xl:scroll-mr-6        |
| scroll-mr-7         | sm:scroll-mr-7        | md:scroll-mr-7        | lg:scroll-mr-7        | xl:scroll-mr-7        | 2xl:scroll-mr-7        |
| scroll-mr-8         | sm:scroll-mr-8        | md:scroll-mr-8        | lg:scroll-mr-8        | xl:scroll-mr-8        | 2xl:scroll-mr-8        |
| scroll-mr-9         | sm:scroll-mr-9        | md:scroll-mr-9        | lg:scroll-mr-9        | xl:scroll-mr-9        | 2xl:scroll-mr-9        |
| scroll-mr-10        | sm:scroll-mr-10       | md:scroll-mr-10       | lg:scroll-mr-10       | xl:scroll-mr-10       | 2xl:scroll-mr-10       |
| scroll-mr-11        | sm:scroll-mr-11       | md:scroll-mr-11       | lg:scroll-mr-11       | xl:scroll-mr-11       | 2xl:scroll-mr-11       |
| scroll-mr-12        | sm:scroll-mr-12       | md:scroll-mr-12       | lg:scroll-mr-12       | xl:scroll-mr-12       | 2xl:scroll-mr-12       |
| scroll-mr-14        | sm:scroll-mr-14       | md:scroll-mr-14       | lg:scroll-mr-14       | xl:scroll-mr-14       | 2xl:scroll-mr-14       |
| scroll-mr-16        | sm:scroll-mr-16       | md:scroll-mr-16       | lg:scroll-mr-16       | xl:scroll-mr-16       | 2xl:scroll-mr-16       |
| scroll-mr-20        | sm:scroll-mr-20       | md:scroll-mr-20       | lg:scroll-mr-20       | xl:scroll-mr-20       | 2xl:scroll-mr-20       |
| scroll-mr-24        | sm:scroll-mr-24       | md:scroll-mr-24       | lg:scroll-mr-24       | xl:scroll-mr-24       | 2xl:scroll-mr-24       |
| scroll-mr-28        | sm:scroll-mr-28       | md:scroll-mr-28       | lg:scroll-mr-28       | xl:scroll-mr-28       | 2xl:scroll-mr-28       |
| scroll-mr-32        | sm:scroll-mr-32       | md:scroll-mr-32       | lg:scroll-mr-32       | xl:scroll-mr-32       | 2xl:scroll-mr-32       |
| scroll-mr-36        | sm:scroll-mr-36       | md:scroll-mr-36       | lg:scroll-mr-36       | xl:scroll-mr-36       | 2xl:scroll-mr-36       |
| scroll-mr-40        | sm:scroll-mr-40       | md:scroll-mr-40       | lg:scroll-mr-40       | xl:scroll-mr-40       | 2xl:scroll-mr-40       |
| scroll-mr-44        | sm:scroll-mr-44       | md:scroll-mr-44       | lg:scroll-mr-44       | xl:scroll-mr-44       | 2xl:scroll-mr-44       |
| scroll-mr-48        | sm:scroll-mr-48       | md:scroll-mr-48       | lg:scroll-mr-48       | xl:scroll-mr-48       | 2xl:scroll-mr-48       |
| scroll-mr-52        | sm:scroll-mr-52       | md:scroll-mr-52       | lg:scroll-mr-52       | xl:scroll-mr-52       | 2xl:scroll-mr-52       |
| scroll-mr-56        | sm:scroll-mr-56       | md:scroll-mr-56       | lg:scroll-mr-56       | xl:scroll-mr-56       | 2xl:scroll-mr-56       |
| scroll-mr-60        | sm:scroll-mr-60       | md:scroll-mr-60       | lg:scroll-mr-60       | xl:scroll-mr-60       | 2xl:scroll-mr-60       |
| scroll-mr-64        | sm:scroll-mr-64       | md:scroll-mr-64       | lg:scroll-mr-64       | xl:scroll-mr-64       | 2xl:scroll-mr-64       |
| scroll-mr-72        | sm:scroll-mr-72       | md:scroll-mr-72       | lg:scroll-mr-72       | xl:scroll-mr-72       | 2xl:scroll-mr-72       |
| scroll-mr-80        | sm:scroll-mr-80       | md:scroll-mr-80       | lg:scroll-mr-80       | xl:scroll-mr-80       | 2xl:scroll-mr-80       |
| scroll-mr-96        | sm:scroll-mr-96       | md:scroll-mr-96       | lg:scroll-mr-96       | xl:scroll-mr-96       | 2xl:scroll-mr-96       |
| -scroll-mr-px       | sm:-scroll-mr-px      | md:-scroll-mr-px      | lg:-scroll-mr-px      | xl:-scroll-mr-px      | 2xl:-scroll-mr-px      |
| -scroll-mr-0.5      | sm:-scroll-mr-0.5     | md:-scroll-mr-0.5     | lg:-scroll-mr-0.5     | xl:-scroll-mr-0.5     | 2xl:-scroll-mr-0.5     |
| -scroll-mr-1        | sm:-scroll-mr-1       | md:-scroll-mr-1       | lg:-scroll-mr-1       | xl:-scroll-mr-1       | 2xl:-scroll-mr-1       |
| -scroll-mr-1.5      | sm:-scroll-mr-1.5     | md:-scroll-mr-1.5     | lg:-scroll-mr-1.5     | xl:-scroll-mr-1.5     | 2xl:-scroll-mr-1.5     |
| -scroll-mr-2        | sm:-scroll-mr-2       | md:-scroll-mr-2       | lg:-scroll-mr-2       | xl:-scroll-mr-2       | 2xl:-scroll-mr-2       |
| -scroll-mr-2.5      | sm:-scroll-mr-2.5     | md:-scroll-mr-2.5     | lg:-scroll-mr-2.5     | xl:-scroll-mr-2.5     | 2xl:-scroll-mr-2.5     |
| -scroll-mr-3        | sm:-scroll-mr-3       | md:-scroll-mr-3       | lg:-scroll-mr-3       | xl:-scroll-mr-3       | 2xl:-scroll-mr-3       |
| -scroll-mr-3.5      | sm:-scroll-mr-3.5     | md:-scroll-mr-3.5     | lg:-scroll-mr-3.5     | xl:-scroll-mr-3.5     | 2xl:-scroll-mr-3.5     |
| -scroll-mr-4        | sm:-scroll-mr-4       | md:-scroll-mr-4       | lg:-scroll-mr-4       | xl:-scroll-mr-4       | 2xl:-scroll-mr-4       |
| -scroll-mr-5        | sm:-scroll-mr-5       | md:-scroll-mr-5       | lg:-scroll-mr-5       | xl:-scroll-mr-5       | 2xl:-scroll-mr-5       |
| -scroll-mr-6        | sm:-scroll-mr-6       | md:-scroll-mr-6       | lg:-scroll-mr-6       | xl:-scroll-mr-6       | 2xl:-scroll-mr-6       |
| -scroll-mr-7        | sm:-scroll-mr-7       | md:-scroll-mr-7       | lg:-scroll-mr-7       | xl:-scroll-mr-7       | 2xl:-scroll-mr-7       |
| -scroll-mr-8        | sm:-scroll-mr-8       | md:-scroll-mr-8       | lg:-scroll-mr-8       | xl:-scroll-mr-8       | 2xl:-scroll-mr-8       |
| -scroll-mr-9        | sm:-scroll-mr-9       | md:-scroll-mr-9       | lg:-scroll-mr-9       | xl:-scroll-mr-9       | 2xl:-scroll-mr-9       |
| -scroll-mr-10       | sm:-scroll-mr-10      | md:-scroll-mr-10      | lg:-scroll-mr-10      | xl:-scroll-mr-10      | 2xl:-scroll-mr-10      |
| -scroll-mr-11       | sm:-scroll-mr-11      | md:-scroll-mr-11      | lg:-scroll-mr-11      | xl:-scroll-mr-11      | 2xl:-scroll-mr-11      |
| -scroll-mr-12       | sm:-scroll-mr-12      | md:-scroll-mr-12      | lg:-scroll-mr-12      | xl:-scroll-mr-12      | 2xl:-scroll-mr-12      |
| -scroll-mr-14       | sm:-scroll-mr-14      | md:-scroll-mr-14      | lg:-scroll-mr-14      | xl:-scroll-mr-14      | 2xl:-scroll-mr-14      |
| -scroll-mr-16       | sm:-scroll-mr-16      | md:-scroll-mr-16      | lg:-scroll-mr-16      | xl:-scroll-mr-16      | 2xl:-scroll-mr-16      |
| -scroll-mr-20       | sm:-scroll-mr-20      | md:-scroll-mr-20      | lg:-scroll-mr-20      | xl:-scroll-mr-20      | 2xl:-scroll-mr-20      |
| -scroll-mr-24       | sm:-scroll-mr-24      | md:-scroll-mr-24      | lg:-scroll-mr-24      | xl:-scroll-mr-24      | 2xl:-scroll-mr-24      |
| -scroll-mr-28       | sm:-scroll-mr-28      | md:-scroll-mr-28      | lg:-scroll-mr-28      | xl:-scroll-mr-28      | 2xl:-scroll-mr-28      |
| -scroll-mr-32       | sm:-scroll-mr-32      | md:-scroll-mr-32      | lg:-scroll-mr-32      | xl:-scroll-mr-32      | 2xl:-scroll-mr-32      |
| -scroll-mr-36       | sm:-scroll-mr-36      | md:-scroll-mr-36      | lg:-scroll-mr-36      | xl:-scroll-mr-36      | 2xl:-scroll-mr-36      |
| -scroll-mr-40       | sm:-scroll-mr-40      | md:-scroll-mr-40      | lg:-scroll-mr-40      | xl:-scroll-mr-40      | 2xl:-scroll-mr-40      |
| -scroll-mr-44       | sm:-scroll-mr-44      | md:-scroll-mr-44      | lg:-scroll-mr-44      | xl:-scroll-mr-44      | 2xl:-scroll-mr-44      |
| -scroll-mr-48       | sm:-scroll-mr-48      | md:-scroll-mr-48      | lg:-scroll-mr-48      | xl:-scroll-mr-48      | 2xl:-scroll-mr-48      |
| -scroll-mr-52       | sm:-scroll-mr-52      | md:-scroll-mr-52      | lg:-scroll-mr-52      | xl:-scroll-mr-52      | 2xl:-scroll-mr-52      |
| -scroll-mr-56       | sm:-scroll-mr-56      | md:-scroll-mr-56      | lg:-scroll-mr-56      | xl:-scroll-mr-56      | 2xl:-scroll-mr-56      |
| -scroll-mr-60       | sm:-scroll-mr-60      | md:-scroll-mr-60      | lg:-scroll-mr-60      | xl:-scroll-mr-60      | 2xl:-scroll-mr-60      |
| -scroll-mr-64       | sm:-scroll-mr-64      | md:-scroll-mr-64      | lg:-scroll-mr-64      | xl:-scroll-mr-64      | 2xl:-scroll-mr-64      |
| -scroll-mr-72       | sm:-scroll-mr-72      | md:-scroll-mr-72      | lg:-scroll-mr-72      | xl:-scroll-mr-72      | 2xl:-scroll-mr-72      |
| -scroll-mr-80       | sm:-scroll-mr-80      | md:-scroll-mr-80      | lg:-scroll-mr-80      | xl:-scroll-mr-80      | 2xl:-scroll-mr-80      |
| -scroll-mr-96       | sm:-scroll-mr-96      | md:-scroll-mr-96      | lg:-scroll-mr-96      | xl:-scroll-mr-96      | 2xl:-scroll-mr-96      |
*/