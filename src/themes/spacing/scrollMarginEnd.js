import getScrollMargin , { END } from './scrollMargin' ;

/**
 * Generates responsive end (inline-end) scroll margin class definitions.
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
 * getScrollMarginEnd( 4 ) ;
 * // → { 'scroll-me-4': true }
 *
 * getScrollMarginEnd( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-me-2': true , 'md:scroll-me-4': true }
 * ```
 */
export const getScrollMarginEnd = ( value , options = {} ) =>
    getScrollMargin( value , { ...options , direction: END } ) ;

export default getScrollMarginEnd ;

/* Tailwindcss safe list
| --------XS-------- | ---------SM--------- | ---------MD--------- | ---------LG--------- | ---------XL--------— | ---------XXL--------- |
| scroll-me-px        | sm:scroll-me-px       | md:scroll-me-px       | lg:scroll-me-px       | xl:scroll-me-px       | 2xl:scroll-me-px       |
| scroll-me-0         | sm:scroll-me-0        | md:scroll-me-0        | lg:scroll-me-0        | xl:scroll-me-0        | 2xl:scroll-me-0        |
| scroll-me-0.5       | sm:scroll-me-0.5      | md:scroll-me-0.5      | lg:scroll-me-0.5      | xl:scroll-me-0.5      | 2xl:scroll-me-0.5      |
| scroll-me-1         | sm:scroll-me-1        | md:scroll-me-1        | lg:scroll-me-1        | xl:scroll-me-1        | 2xl:scroll-me-1        |
| scroll-me-1.5       | sm:scroll-me-1.5      | md:scroll-me-1.5      | lg:scroll-me-1.5      | xl:scroll-me-1.5      | 2xl:scroll-me-1.5      |
| scroll-me-2         | sm:scroll-me-2        | md:scroll-me-2        | lg:scroll-me-2        | xl:scroll-me-2        | 2xl:scroll-me-2        |
| scroll-me-2.5       | sm:scroll-me-2.5      | md:scroll-me-2.5      | lg:scroll-me-2.5      | xl:scroll-me-2.5      | 2xl:scroll-me-2.5      |
| scroll-me-3         | sm:scroll-me-3        | md:scroll-me-3        | lg:scroll-me-3        | xl:scroll-me-3        | 2xl:scroll-me-3        |
| scroll-me-3.5       | sm:scroll-me-3.5      | md:scroll-me-3.5      | lg:scroll-me-3.5      | xl:scroll-me-3.5      | 2xl:scroll-me-3.5      |
| scroll-me-4         | sm:scroll-me-4        | md:scroll-me-4        | lg:scroll-me-4        | xl:scroll-me-4        | 2xl:scroll-me-4        |
| scroll-me-5         | sm:scroll-me-5        | md:scroll-me-5        | lg:scroll-me-5        | xl:scroll-me-5        | 2xl:scroll-me-5        |
| scroll-me-6         | sm:scroll-me-6        | md:scroll-me-6        | lg:scroll-me-6        | xl:scroll-me-6        | 2xl:scroll-me-6        |
| scroll-me-7         | sm:scroll-me-7        | md:scroll-me-7        | lg:scroll-me-7        | xl:scroll-me-7        | 2xl:scroll-me-7        |
| scroll-me-8         | sm:scroll-me-8        | md:scroll-me-8        | lg:scroll-me-8        | xl:scroll-me-8        | 2xl:scroll-me-8        |
| scroll-me-9         | sm:scroll-me-9        | md:scroll-me-9        | lg:scroll-me-9        | xl:scroll-me-9        | 2xl:scroll-me-9        |
| scroll-me-10        | sm:scroll-me-10       | md:scroll-me-10       | lg:scroll-me-10       | xl:scroll-me-10       | 2xl:scroll-me-10       |
| scroll-me-11        | sm:scroll-me-11       | md:scroll-me-11       | lg:scroll-me-11       | xl:scroll-me-11       | 2xl:scroll-me-11       |
| scroll-me-12        | sm:scroll-me-12       | md:scroll-me-12       | lg:scroll-me-12       | xl:scroll-me-12       | 2xl:scroll-me-12       |
| scroll-me-14        | sm:scroll-me-14       | md:scroll-me-14       | lg:scroll-me-14       | xl:scroll-me-14       | 2xl:scroll-me-14       |
| scroll-me-16        | sm:scroll-me-16       | md:scroll-me-16       | lg:scroll-me-16       | xl:scroll-me-16       | 2xl:scroll-me-16       |
| scroll-me-20        | sm:scroll-me-20       | md:scroll-me-20       | lg:scroll-me-20       | xl:scroll-me-20       | 2xl:scroll-me-20       |
| scroll-me-24        | sm:scroll-me-24       | md:scroll-me-24       | lg:scroll-me-24       | xl:scroll-me-24       | 2xl:scroll-me-24       |
| scroll-me-28        | sm:scroll-me-28       | md:scroll-me-28       | lg:scroll-me-28       | xl:scroll-me-28       | 2xl:scroll-me-28       |
| scroll-me-32        | sm:scroll-me-32       | md:scroll-me-32       | lg:scroll-me-32       | xl:scroll-me-32       | 2xl:scroll-me-32       |
| scroll-me-36        | sm:scroll-me-36       | md:scroll-me-36       | lg:scroll-me-36       | xl:scroll-me-36       | 2xl:scroll-me-36       |
| scroll-me-40        | sm:scroll-me-40       | md:scroll-me-40       | lg:scroll-me-40       | xl:scroll-me-40       | 2xl:scroll-me-40       |
| scroll-me-44        | sm:scroll-me-44       | md:scroll-me-44       | lg:scroll-me-44       | xl:scroll-me-44       | 2xl:scroll-me-44       |
| scroll-me-48        | sm:scroll-me-48       | md:scroll-me-48       | lg:scroll-me-48       | xl:scroll-me-48       | 2xl:scroll-me-48       |
| scroll-me-52        | sm:scroll-me-52       | md:scroll-me-52       | lg:scroll-me-52       | xl:scroll-me-52       | 2xl:scroll-me-52       |
| scroll-me-56        | sm:scroll-me-56       | md:scroll-me-56       | lg:scroll-me-56       | xl:scroll-me-56       | 2xl:scroll-me-56       |
| scroll-me-60        | sm:scroll-me-60       | md:scroll-me-60       | lg:scroll-me-60       | xl:scroll-me-60       | 2xl:scroll-me-60       |
| scroll-me-64        | sm:scroll-me-64       | md:scroll-me-64       | lg:scroll-me-64       | xl:scroll-me-64       | 2xl:scroll-me-64       |
| scroll-me-72        | sm:scroll-me-72       | md:scroll-me-72       | lg:scroll-me-72       | xl:scroll-me-72       | 2xl:scroll-me-72       |
| scroll-me-80        | sm:scroll-me-80       | md:scroll-me-80       | lg:scroll-me-80       | xl:scroll-me-80       | 2xl:scroll-me-80       |
| scroll-me-96        | sm:scroll-me-96       | md:scroll-me-96       | lg:scroll-me-96       | xl:scroll-me-96       | 2xl:scroll-me-96       |
| -scroll-me-px       | sm:-scroll-me-px      | md:-scroll-me-px      | lg:-scroll-me-px      | xl:-scroll-me-px      | 2xl:-scroll-me-px      |
| -scroll-me-0.5      | sm:-scroll-me-0.5     | md:-scroll-me-0.5     | lg:-scroll-me-0.5     | xl:-scroll-me-0.5     | 2xl:-scroll-me-0.5     |
| -scroll-me-1        | sm:-scroll-me-1       | md:-scroll-me-1       | lg:-scroll-me-1       | xl:-scroll-me-1       | 2xl:-scroll-me-1       |
| -scroll-me-1.5      | sm:-scroll-me-1.5     | md:-scroll-me-1.5     | lg:-scroll-me-1.5     | xl:-scroll-me-1.5     | 2xl:-scroll-me-1.5     |
| -scroll-me-2        | sm:-scroll-me-2       | md:-scroll-me-2       | lg:-scroll-me-2       | xl:-scroll-me-2       | 2xl:-scroll-me-2       |
| -scroll-me-2.5      | sm:-scroll-me-2.5     | md:-scroll-me-2.5     | lg:-scroll-me-2.5     | xl:-scroll-me-2.5     | 2xl:-scroll-me-2.5     |
| -scroll-me-3        | sm:-scroll-me-3       | md:-scroll-me-3       | lg:-scroll-me-3       | xl:-scroll-me-3       | 2xl:-scroll-me-3       |
| -scroll-me-3.5      | sm:-scroll-me-3.5     | md:-scroll-me-3.5     | lg:-scroll-me-3.5     | xl:-scroll-me-3.5     | 2xl:-scroll-me-3.5     |
| -scroll-me-4        | sm:-scroll-me-4       | md:-scroll-me-4       | lg:-scroll-me-4       | xl:-scroll-me-4       | 2xl:-scroll-me-4       |
| -scroll-me-5        | sm:-scroll-me-5       | md:-scroll-me-5       | lg:-scroll-me-5       | xl:-scroll-me-5       | 2xl:-scroll-me-5       |
| -scroll-me-6        | sm:-scroll-me-6       | md:-scroll-me-6       | lg:-scroll-me-6       | xl:-scroll-me-6       | 2xl:-scroll-me-6       |
| -scroll-me-7        | sm:-scroll-me-7       | md:-scroll-me-7       | lg:-scroll-me-7       | xl:-scroll-me-7       | 2xl:-scroll-me-7       |
| -scroll-me-8        | sm:-scroll-me-8       | md:-scroll-me-8       | lg:-scroll-me-8       | xl:-scroll-me-8       | 2xl:-scroll-me-8       |
| -scroll-me-9        | sm:-scroll-me-9       | md:-scroll-me-9       | lg:-scroll-me-9       | xl:-scroll-me-9       | 2xl:-scroll-me-9       |
| -scroll-me-10       | sm:-scroll-me-10      | md:-scroll-me-10      | lg:-scroll-me-10      | xl:-scroll-me-10      | 2xl:-scroll-me-10      |
| -scroll-me-11       | sm:-scroll-me-11      | md:-scroll-me-11      | lg:-scroll-me-11      | xl:-scroll-me-11      | 2xl:-scroll-me-11      |
| -scroll-me-12       | sm:-scroll-me-12      | md:-scroll-me-12      | lg:-scroll-me-12      | xl:-scroll-me-12      | 2xl:-scroll-me-12      |
| -scroll-me-14       | sm:-scroll-me-14      | md:-scroll-me-14      | lg:-scroll-me-14      | xl:-scroll-me-14      | 2xl:-scroll-me-14      |
| -scroll-me-16       | sm:-scroll-me-16      | md:-scroll-me-16      | lg:-scroll-me-16      | xl:-scroll-me-16      | 2xl:-scroll-me-16      |
| -scroll-me-20       | sm:-scroll-me-20      | md:-scroll-me-20      | lg:-scroll-me-20      | xl:-scroll-me-20      | 2xl:-scroll-me-20      |
| -scroll-me-24       | sm:-scroll-me-24      | md:-scroll-me-24      | lg:-scroll-me-24      | xl:-scroll-me-24      | 2xl:-scroll-me-24      |
| -scroll-me-28       | sm:-scroll-me-28      | md:-scroll-me-28      | lg:-scroll-me-28      | xl:-scroll-me-28      | 2xl:-scroll-me-28      |
| -scroll-me-32       | sm:-scroll-me-32      | md:-scroll-me-32      | lg:-scroll-me-32      | xl:-scroll-me-32      | 2xl:-scroll-me-32      |
| -scroll-me-36       | sm:-scroll-me-36      | md:-scroll-me-36      | lg:-scroll-me-36      | xl:-scroll-me-36      | 2xl:-scroll-me-36      |
| -scroll-me-40       | sm:-scroll-me-40      | md:-scroll-me-40      | lg:-scroll-me-40      | xl:-scroll-me-40      | 2xl:-scroll-me-40      |
| -scroll-me-44       | sm:-scroll-me-44      | md:-scroll-me-44      | lg:-scroll-me-44      | xl:-scroll-me-44      | 2xl:-scroll-me-44      |
| -scroll-me-48       | sm:-scroll-me-48      | md:-scroll-me-48      | lg:-scroll-me-48      | xl:-scroll-me-48      | 2xl:-scroll-me-48      |
| -scroll-me-52       | sm:-scroll-me-52      | md:-scroll-me-52      | lg:-scroll-me-52      | xl:-scroll-me-52      | 2xl:-scroll-me-52      |
| -scroll-me-56       | sm:-scroll-me-56      | md:-scroll-me-56      | lg:-scroll-me-56      | xl:-scroll-me-56      | 2xl:-scroll-me-56      |
| -scroll-me-60       | sm:-scroll-me-60      | md:-scroll-me-60      | lg:-scroll-me-60      | xl:-scroll-me-60      | 2xl:-scroll-me-60      |
| -scroll-me-64       | sm:-scroll-me-64      | md:-scroll-me-64      | lg:-scroll-me-64      | xl:-scroll-me-64      | 2xl:-scroll-me-64      |
| -scroll-me-72       | sm:-scroll-me-72      | md:-scroll-me-72      | lg:-scroll-me-72      | xl:-scroll-me-72      | 2xl:-scroll-me-72      |
| -scroll-me-80       | sm:-scroll-me-80      | md:-scroll-me-80      | lg:-scroll-me-80      | xl:-scroll-me-80      | 2xl:-scroll-me-80      |
| -scroll-me-96       | sm:-scroll-me-96      | md:-scroll-me-96      | lg:-scroll-me-96      | xl:-scroll-me-96      | 2xl:-scroll-me-96      |
*/