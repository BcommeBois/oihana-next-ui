import getScrollMargin , { BOTTOM } from './scrollMargin' ;

/**
 * Generates responsive bottom scroll margin class definitions.
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
 * getScrollMarginBottom( 4 ) ;
 * // → { 'scroll-mb-4': true }
 *
 * getScrollMarginBottom( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-mb-2': true , 'md:scroll-mb-4': true }
 * ```
 */
export const getScrollMarginBottom = ( value , options = {} ) =>
    getScrollMargin( value , { ...options , direction: BOTTOM } ) ;

export default getScrollMarginBottom ;

/* Tailwindcss safe list
| --------XS-------- | ---------SM--------- | ---------MD--------- | ---------LG--------- | ---------XL--------— | ---------XXL--------- |
| scroll-mb-px        | sm:scroll-mb-px       | md:scroll-mb-px       | lg:scroll-mb-px       | xl:scroll-mb-px       | 2xl:scroll-mb-px       |
| scroll-mb-0         | sm:scroll-mb-0        | md:scroll-mb-0        | lg:scroll-mb-0        | xl:scroll-mb-0        | 2xl:scroll-mb-0        |
| scroll-mb-0.5       | sm:scroll-mb-0.5      | md:scroll-mb-0.5      | lg:scroll-mb-0.5      | xl:scroll-mb-0.5      | 2xl:scroll-mb-0.5      |
| scroll-mb-1         | sm:scroll-mb-1        | md:scroll-mb-1        | lg:scroll-mb-1        | xl:scroll-mb-1        | 2xl:scroll-mb-1        |
| scroll-mb-1.5       | sm:scroll-mb-1.5      | md:scroll-mb-1.5      | lg:scroll-mb-1.5      | xl:scroll-mb-1.5      | 2xl:scroll-mb-1.5      |
| scroll-mb-2         | sm:scroll-mb-2        | md:scroll-mb-2        | lg:scroll-mb-2        | xl:scroll-mb-2        | 2xl:scroll-mb-2        |
| scroll-mb-2.5       | sm:scroll-mb-2.5      | md:scroll-mb-2.5      | lg:scroll-mb-2.5      | xl:scroll-mb-2.5      | 2xl:scroll-mb-2.5      |
| scroll-mb-3         | sm:scroll-mb-3        | md:scroll-mb-3        | lg:scroll-mb-3        | xl:scroll-mb-3        | 2xl:scroll-mb-3        |
| scroll-mb-3.5       | sm:scroll-mb-3.5      | md:scroll-mb-3.5      | lg:scroll-mb-3.5      | xl:scroll-mb-3.5      | 2xl:scroll-mb-3.5      |
| scroll-mb-4         | sm:scroll-mb-4        | md:scroll-mb-4        | lg:scroll-mb-4        | xl:scroll-mb-4        | 2xl:scroll-mb-4        |
| scroll-mb-5         | sm:scroll-mb-5        | md:scroll-mb-5        | lg:scroll-mb-5        | xl:scroll-mb-5        | 2xl:scroll-mb-5        |
| scroll-mb-6         | sm:scroll-mb-6        | md:scroll-mb-6        | lg:scroll-mb-6        | xl:scroll-mb-6        | 2xl:scroll-mb-6        |
| scroll-mb-7         | sm:scroll-mb-7        | md:scroll-mb-7        | lg:scroll-mb-7        | xl:scroll-mb-7        | 2xl:scroll-mb-7        |
| scroll-mb-8         | sm:scroll-mb-8        | md:scroll-mb-8        | lg:scroll-mb-8        | xl:scroll-mb-8        | 2xl:scroll-mb-8        |
| scroll-mb-9         | sm:scroll-mb-9        | md:scroll-mb-9        | lg:scroll-mb-9        | xl:scroll-mb-9        | 2xl:scroll-mb-9        |
| scroll-mb-10        | sm:scroll-mb-10       | md:scroll-mb-10       | lg:scroll-mb-10       | xl:scroll-mb-10       | 2xl:scroll-mb-10       |
| scroll-mb-11        | sm:scroll-mb-11       | md:scroll-mb-11       | lg:scroll-mb-11       | xl:scroll-mb-11       | 2xl:scroll-mb-11       |
| scroll-mb-12        | sm:scroll-mb-12       | md:scroll-mb-12       | lg:scroll-mb-12       | xl:scroll-mb-12       | 2xl:scroll-mb-12       |
| scroll-mb-14        | sm:scroll-mb-14       | md:scroll-mb-14       | lg:scroll-mb-14       | xl:scroll-mb-14       | 2xl:scroll-mb-14       |
| scroll-mb-16        | sm:scroll-mb-16       | md:scroll-mb-16       | lg:scroll-mb-16       | xl:scroll-mb-16       | 2xl:scroll-mb-16       |
| scroll-mb-20        | sm:scroll-mb-20       | md:scroll-mb-20       | lg:scroll-mb-20       | xl:scroll-mb-20       | 2xl:scroll-mb-20       |
| scroll-mb-24        | sm:scroll-mb-24       | md:scroll-mb-24       | lg:scroll-mb-24       | xl:scroll-mb-24       | 2xl:scroll-mb-24       |
| scroll-mb-28        | sm:scroll-mb-28       | md:scroll-mb-28       | lg:scroll-mb-28       | xl:scroll-mb-28       | 2xl:scroll-mb-28       |
| scroll-mb-32        | sm:scroll-mb-32       | md:scroll-mb-32       | lg:scroll-mb-32       | xl:scroll-mb-32       | 2xl:scroll-mb-32       |
| scroll-mb-36        | sm:scroll-mb-36       | md:scroll-mb-36       | lg:scroll-mb-36       | xl:scroll-mb-36       | 2xl:scroll-mb-36       |
| scroll-mb-40        | sm:scroll-mb-40       | md:scroll-mb-40       | lg:scroll-mb-40       | xl:scroll-mb-40       | 2xl:scroll-mb-40       |
| scroll-mb-44        | sm:scroll-mb-44       | md:scroll-mb-44       | lg:scroll-mb-44       | xl:scroll-mb-44       | 2xl:scroll-mb-44       |
| scroll-mb-48        | sm:scroll-mb-48       | md:scroll-mb-48       | lg:scroll-mb-48       | xl:scroll-mb-48       | 2xl:scroll-mb-48       |
| scroll-mb-52        | sm:scroll-mb-52       | md:scroll-mb-52       | lg:scroll-mb-52       | xl:scroll-mb-52       | 2xl:scroll-mb-52       |
| scroll-mb-56        | sm:scroll-mb-56       | md:scroll-mb-56       | lg:scroll-mb-56       | xl:scroll-mb-56       | 2xl:scroll-mb-56       |
| scroll-mb-60        | sm:scroll-mb-60       | md:scroll-mb-60       | lg:scroll-mb-60       | xl:scroll-mb-60       | 2xl:scroll-mb-60       |
| scroll-mb-64        | sm:scroll-mb-64       | md:scroll-mb-64       | lg:scroll-mb-64       | xl:scroll-mb-64       | 2xl:scroll-mb-64       |
| scroll-mb-72        | sm:scroll-mb-72       | md:scroll-mb-72       | lg:scroll-mb-72       | xl:scroll-mb-72       | 2xl:scroll-mb-72       |
| scroll-mb-80        | sm:scroll-mb-80       | md:scroll-mb-80       | lg:scroll-mb-80       | xl:scroll-mb-80       | 2xl:scroll-mb-80       |
| scroll-mb-96        | sm:scroll-mb-96       | md:scroll-mb-96       | lg:scroll-mb-96       | xl:scroll-mb-96       | 2xl:scroll-mb-96       |
| -scroll-mb-px       | sm:-scroll-mb-px      | md:-scroll-mb-px      | lg:-scroll-mb-px      | xl:-scroll-mb-px      | 2xl:-scroll-mb-px      |
| -scroll-mb-0.5      | sm:-scroll-mb-0.5     | md:-scroll-mb-0.5     | lg:-scroll-mb-0.5     | xl:-scroll-mb-0.5     | 2xl:-scroll-mb-0.5     |
| -scroll-mb-1        | sm:-scroll-mb-1       | md:-scroll-mb-1       | lg:-scroll-mb-1       | xl:-scroll-mb-1       | 2xl:-scroll-mb-1       |
| -scroll-mb-1.5      | sm:-scroll-mb-1.5     | md:-scroll-mb-1.5     | lg:-scroll-mb-1.5     | xl:-scroll-mb-1.5     | 2xl:-scroll-mb-1.5     |
| -scroll-mb-2        | sm:-scroll-mb-2       | md:-scroll-mb-2       | lg:-scroll-mb-2       | xl:-scroll-mb-2       | 2xl:-scroll-mb-2       |
| -scroll-mb-2.5      | sm:-scroll-mb-2.5     | md:-scroll-mb-2.5     | lg:-scroll-mb-2.5     | xl:-scroll-mb-2.5     | 2xl:-scroll-mb-2.5     |
| -scroll-mb-3        | sm:-scroll-mb-3       | md:-scroll-mb-3       | lg:-scroll-mb-3       | xl:-scroll-mb-3       | 2xl:-scroll-mb-3       |
| -scroll-mb-3.5      | sm:-scroll-mb-3.5     | md:-scroll-mb-3.5     | lg:-scroll-mb-3.5     | xl:-scroll-mb-3.5     | 2xl:-scroll-mb-3.5     |
| -scroll-mb-4        | sm:-scroll-mb-4       | md:-scroll-mb-4       | lg:-scroll-mb-4       | xl:-scroll-mb-4       | 2xl:-scroll-mb-4       |
| -scroll-mb-5        | sm:-scroll-mb-5       | md:-scroll-mb-5       | lg:-scroll-mb-5       | xl:-scroll-mb-5       | 2xl:-scroll-mb-5       |
| -scroll-mb-6        | sm:-scroll-mb-6       | md:-scroll-mb-6       | lg:-scroll-mb-6       | xl:-scroll-mb-6       | 2xl:-scroll-mb-6       |
| -scroll-mb-7        | sm:-scroll-mb-7       | md:-scroll-mb-7       | lg:-scroll-mb-7       | xl:-scroll-mb-7       | 2xl:-scroll-mb-7       |
| -scroll-mb-8        | sm:-scroll-mb-8       | md:-scroll-mb-8       | lg:-scroll-mb-8       | xl:-scroll-mb-8       | 2xl:-scroll-mb-8       |
| -scroll-mb-9        | sm:-scroll-mb-9       | md:-scroll-mb-9       | lg:-scroll-mb-9       | xl:-scroll-mb-9       | 2xl:-scroll-mb-9       |
| -scroll-mb-10       | sm:-scroll-mb-10      | md:-scroll-mb-10      | lg:-scroll-mb-10      | xl:-scroll-mb-10      | 2xl:-scroll-mb-10      |
| -scroll-mb-11       | sm:-scroll-mb-11      | md:-scroll-mb-11      | lg:-scroll-mb-11      | xl:-scroll-mb-11      | 2xl:-scroll-mb-11      |
| -scroll-mb-12       | sm:-scroll-mb-12      | md:-scroll-mb-12      | lg:-scroll-mb-12      | xl:-scroll-mb-12      | 2xl:-scroll-mb-12      |
| -scroll-mb-14       | sm:-scroll-mb-14      | md:-scroll-mb-14      | lg:-scroll-mb-14      | xl:-scroll-mb-14      | 2xl:-scroll-mb-14      |
| -scroll-mb-16       | sm:-scroll-mb-16      | md:-scroll-mb-16      | lg:-scroll-mb-16      | xl:-scroll-mb-16      | 2xl:-scroll-mb-16      |
| -scroll-mb-20       | sm:-scroll-mb-20      | md:-scroll-mb-20      | lg:-scroll-mb-20      | xl:-scroll-mb-20      | 2xl:-scroll-mb-20      |
| -scroll-mb-24       | sm:-scroll-mb-24      | md:-scroll-mb-24      | lg:-scroll-mb-24      | xl:-scroll-mb-24      | 2xl:-scroll-mb-24      |
| -scroll-mb-28       | sm:-scroll-mb-28      | md:-scroll-mb-28      | lg:-scroll-mb-28      | xl:-scroll-mb-28      | 2xl:-scroll-mb-28      |
| -scroll-mb-32       | sm:-scroll-mb-32      | md:-scroll-mb-32      | lg:-scroll-mb-32      | xl:-scroll-mb-32      | 2xl:-scroll-mb-32      |
| -scroll-mb-36       | sm:-scroll-mb-36      | md:-scroll-mb-36      | lg:-scroll-mb-36      | xl:-scroll-mb-36      | 2xl:-scroll-mb-36      |
| -scroll-mb-40       | sm:-scroll-mb-40      | md:-scroll-mb-40      | lg:-scroll-mb-40      | xl:-scroll-mb-40      | 2xl:-scroll-mb-40      |
| -scroll-mb-44       | sm:-scroll-mb-44      | md:-scroll-mb-44      | lg:-scroll-mb-44      | xl:-scroll-mb-44      | 2xl:-scroll-mb-44      |
| -scroll-mb-48       | sm:-scroll-mb-48      | md:-scroll-mb-48      | lg:-scroll-mb-48      | xl:-scroll-mb-48      | 2xl:-scroll-mb-48      |
| -scroll-mb-52       | sm:-scroll-mb-52      | md:-scroll-mb-52      | lg:-scroll-mb-52      | xl:-scroll-mb-52      | 2xl:-scroll-mb-52      |
| -scroll-mb-56       | sm:-scroll-mb-56      | md:-scroll-mb-56      | lg:-scroll-mb-56      | xl:-scroll-mb-56      | 2xl:-scroll-mb-56      |
| -scroll-mb-60       | sm:-scroll-mb-60      | md:-scroll-mb-60      | lg:-scroll-mb-60      | xl:-scroll-mb-60      | 2xl:-scroll-mb-60      |
| -scroll-mb-64       | sm:-scroll-mb-64      | md:-scroll-mb-64      | lg:-scroll-mb-64      | xl:-scroll-mb-64      | 2xl:-scroll-mb-64      |
| -scroll-mb-72       | sm:-scroll-mb-72      | md:-scroll-mb-72      | lg:-scroll-mb-72      | xl:-scroll-mb-72      | 2xl:-scroll-mb-72      |
| -scroll-mb-80       | sm:-scroll-mb-80      | md:-scroll-mb-80      | lg:-scroll-mb-80      | xl:-scroll-mb-80      | 2xl:-scroll-mb-80      |
| -scroll-mb-96       | sm:-scroll-mb-96      | md:-scroll-mb-96      | lg:-scroll-mb-96      | xl:-scroll-mb-96      | 2xl:-scroll-mb-96      |
*/