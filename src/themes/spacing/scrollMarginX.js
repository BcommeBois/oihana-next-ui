import getScrollMargin , { HORIZONTAL } from './scrollMargin' ;

/**
 * Generates responsive horizontal scroll margin class definitions.
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
 * getScrollMarginX( 4 ) ;
 * // → { 'scroll-mx-4': true }
 *
 * getScrollMarginX( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-mx-2': true , 'md:scroll-mx-4': true }
 * ```
 */
export const getScrollMarginX = ( value , options = {} ) =>
    getScrollMargin( value , { ...options , direction: HORIZONTAL } ) ;

export default getScrollMarginX ;

/* Tailwindcss safe list
| --------XS-------- | ---------SM--------- | ---------MD--------- | ---------LG--------- | ---------XL--------— | ---------XXL--------- |
| scroll-mx-px        | sm:scroll-mx-px       | md:scroll-mx-px       | lg:scroll-mx-px       | xl:scroll-mx-px       | 2xl:scroll-mx-px       |
| scroll-mx-0         | sm:scroll-mx-0        | md:scroll-mx-0        | lg:scroll-mx-0        | xl:scroll-mx-0        | 2xl:scroll-mx-0        |
| scroll-mx-0.5       | sm:scroll-mx-0.5      | md:scroll-mx-0.5      | lg:scroll-mx-0.5      | xl:scroll-mx-0.5      | 2xl:scroll-mx-0.5      |
| scroll-mx-1         | sm:scroll-mx-1        | md:scroll-mx-1        | lg:scroll-mx-1        | xl:scroll-mx-1        | 2xl:scroll-mx-1        |
| scroll-mx-1.5       | sm:scroll-mx-1.5      | md:scroll-mx-1.5      | lg:scroll-mx-1.5      | xl:scroll-mx-1.5      | 2xl:scroll-mx-1.5      |
| scroll-mx-2         | sm:scroll-mx-2        | md:scroll-mx-2        | lg:scroll-mx-2        | xl:scroll-mx-2        | 2xl:scroll-mx-2        |
| scroll-mx-2.5       | sm:scroll-mx-2.5      | md:scroll-mx-2.5      | lg:scroll-mx-2.5      | xl:scroll-mx-2.5      | 2xl:scroll-mx-2.5      |
| scroll-mx-3         | sm:scroll-mx-3        | md:scroll-mx-3        | lg:scroll-mx-3        | xl:scroll-mx-3        | 2xl:scroll-mx-3        |
| scroll-mx-3.5       | sm:scroll-mx-3.5      | md:scroll-mx-3.5      | lg:scroll-mx-3.5      | xl:scroll-mx-3.5      | 2xl:scroll-mx-3.5      |
| scroll-mx-4         | sm:scroll-mx-4        | md:scroll-mx-4        | lg:scroll-mx-4        | xl:scroll-mx-4        | 2xl:scroll-mx-4        |
| scroll-mx-5         | sm:scroll-mx-5        | md:scroll-mx-5        | lg:scroll-mx-5        | xl:scroll-mx-5        | 2xl:scroll-mx-5        |
| scroll-mx-6         | sm:scroll-mx-6        | md:scroll-mx-6        | lg:scroll-mx-6        | xl:scroll-mx-6        | 2xl:scroll-mx-6        |
| scroll-mx-7         | sm:scroll-mx-7        | md:scroll-mx-7        | lg:scroll-mx-7        | xl:scroll-mx-7        | 2xl:scroll-mx-7        |
| scroll-mx-8         | sm:scroll-mx-8        | md:scroll-mx-8        | lg:scroll-mx-8        | xl:scroll-mx-8        | 2xl:scroll-mx-8        |
| scroll-mx-9         | sm:scroll-mx-9        | md:scroll-mx-9        | lg:scroll-mx-9        | xl:scroll-mx-9        | 2xl:scroll-mx-9        |
| scroll-mx-10        | sm:scroll-mx-10       | md:scroll-mx-10       | lg:scroll-mx-10       | xl:scroll-mx-10       | 2xl:scroll-mx-10       |
| scroll-mx-11        | sm:scroll-mx-11       | md:scroll-mx-11       | lg:scroll-mx-11       | xl:scroll-mx-11       | 2xl:scroll-mx-11       |
| scroll-mx-12        | sm:scroll-mx-12       | md:scroll-mx-12       | lg:scroll-mx-12       | xl:scroll-mx-12       | 2xl:scroll-mx-12       |
| scroll-mx-14        | sm:scroll-mx-14       | md:scroll-mx-14       | lg:scroll-mx-14       | xl:scroll-mx-14       | 2xl:scroll-mx-14       |
| scroll-mx-16        | sm:scroll-mx-16       | md:scroll-mx-16       | lg:scroll-mx-16       | xl:scroll-mx-16       | 2xl:scroll-mx-16       |
| scroll-mx-20        | sm:scroll-mx-20       | md:scroll-mx-20       | lg:scroll-mx-20       | xl:scroll-mx-20       | 2xl:scroll-mx-20       |
| scroll-mx-24        | sm:scroll-mx-24       | md:scroll-mx-24       | lg:scroll-mx-24       | xl:scroll-mx-24       | 2xl:scroll-mx-24       |
| scroll-mx-28        | sm:scroll-mx-28       | md:scroll-mx-28       | lg:scroll-mx-28       | xl:scroll-mx-28       | 2xl:scroll-mx-28       |
| scroll-mx-32        | sm:scroll-mx-32       | md:scroll-mx-32       | lg:scroll-mx-32       | xl:scroll-mx-32       | 2xl:scroll-mx-32       |
| scroll-mx-36        | sm:scroll-mx-36       | md:scroll-mx-36       | lg:scroll-mx-36       | xl:scroll-mx-36       | 2xl:scroll-mx-36       |
| scroll-mx-40        | sm:scroll-mx-40       | md:scroll-mx-40       | lg:scroll-mx-40       | xl:scroll-mx-40       | 2xl:scroll-mx-40       |
| scroll-mx-44        | sm:scroll-mx-44       | md:scroll-mx-44       | lg:scroll-mx-44       | xl:scroll-mx-44       | 2xl:scroll-mx-44       |
| scroll-mx-48        | sm:scroll-mx-48       | md:scroll-mx-48       | lg:scroll-mx-48       | xl:scroll-mx-48       | 2xl:scroll-mx-48       |
| scroll-mx-52        | sm:scroll-mx-52       | md:scroll-mx-52       | lg:scroll-mx-52       | xl:scroll-mx-52       | 2xl:scroll-mx-52       |
| scroll-mx-56        | sm:scroll-mx-56       | md:scroll-mx-56       | lg:scroll-mx-56       | xl:scroll-mx-56       | 2xl:scroll-mx-56       |
| scroll-mx-60        | sm:scroll-mx-60       | md:scroll-mx-60       | lg:scroll-mx-60       | xl:scroll-mx-60       | 2xl:scroll-mx-60       |
| scroll-mx-64        | sm:scroll-mx-64       | md:scroll-mx-64       | lg:scroll-mx-64       | xl:scroll-mx-64       | 2xl:scroll-mx-64       |
| scroll-mx-72        | sm:scroll-mx-72       | md:scroll-mx-72       | lg:scroll-mx-72       | xl:scroll-mx-72       | 2xl:scroll-mx-72       |
| scroll-mx-80        | sm:scroll-mx-80       | md:scroll-mx-80       | lg:scroll-mx-80       | xl:scroll-mx-80       | 2xl:scroll-mx-80       |
| scroll-mx-96        | sm:scroll-mx-96       | md:scroll-mx-96       | lg:scroll-mx-96       | xl:scroll-mx-96       | 2xl:scroll-mx-96       |
| -scroll-mx-px       | sm:-scroll-mx-px      | md:-scroll-mx-px      | lg:-scroll-mx-px      | xl:-scroll-mx-px      | 2xl:-scroll-mx-px      |
| -scroll-mx-0.5      | sm:-scroll-mx-0.5     | md:-scroll-mx-0.5     | lg:-scroll-mx-0.5     | xl:-scroll-mx-0.5     | 2xl:-scroll-mx-0.5     |
| -scroll-mx-1        | sm:-scroll-mx-1       | md:-scroll-mx-1       | lg:-scroll-mx-1       | xl:-scroll-mx-1       | 2xl:-scroll-mx-1       |
| -scroll-mx-1.5      | sm:-scroll-mx-1.5     | md:-scroll-mx-1.5     | lg:-scroll-mx-1.5     | xl:-scroll-mx-1.5     | 2xl:-scroll-mx-1.5     |
| -scroll-mx-2        | sm:-scroll-mx-2       | md:-scroll-mx-2       | lg:-scroll-mx-2       | xl:-scroll-mx-2       | 2xl:-scroll-mx-2       |
| -scroll-mx-2.5      | sm:-scroll-mx-2.5     | md:-scroll-mx-2.5     | lg:-scroll-mx-2.5     | xl:-scroll-mx-2.5     | 2xl:-scroll-mx-2.5     |
| -scroll-mx-3        | sm:-scroll-mx-3       | md:-scroll-mx-3       | lg:-scroll-mx-3       | xl:-scroll-mx-3       | 2xl:-scroll-mx-3       |
| -scroll-mx-3.5      | sm:-scroll-mx-3.5     | md:-scroll-mx-3.5     | lg:-scroll-mx-3.5     | xl:-scroll-mx-3.5     | 2xl:-scroll-mx-3.5     |
| -scroll-mx-4        | sm:-scroll-mx-4       | md:-scroll-mx-4       | lg:-scroll-mx-4       | xl:-scroll-mx-4       | 2xl:-scroll-mx-4       |
| -scroll-mx-5        | sm:-scroll-mx-5       | md:-scroll-mx-5       | lg:-scroll-mx-5       | xl:-scroll-mx-5       | 2xl:-scroll-mx-5       |
| -scroll-mx-6        | sm:-scroll-mx-6       | md:-scroll-mx-6       | lg:-scroll-mx-6       | xl:-scroll-mx-6       | 2xl:-scroll-mx-6       |
| -scroll-mx-7        | sm:-scroll-mx-7       | md:-scroll-mx-7       | lg:-scroll-mx-7       | xl:-scroll-mx-7       | 2xl:-scroll-mx-7       |
| -scroll-mx-8        | sm:-scroll-mx-8       | md:-scroll-mx-8       | lg:-scroll-mx-8       | xl:-scroll-mx-8       | 2xl:-scroll-mx-8       |
| -scroll-mx-9        | sm:-scroll-mx-9       | md:-scroll-mx-9       | lg:-scroll-mx-9       | xl:-scroll-mx-9       | 2xl:-scroll-mx-9       |
| -scroll-mx-10       | sm:-scroll-mx-10      | md:-scroll-mx-10      | lg:-scroll-mx-10      | xl:-scroll-mx-10      | 2xl:-scroll-mx-10      |
| -scroll-mx-11       | sm:-scroll-mx-11      | md:-scroll-mx-11      | lg:-scroll-mx-11      | xl:-scroll-mx-11      | 2xl:-scroll-mx-11      |
| -scroll-mx-12       | sm:-scroll-mx-12      | md:-scroll-mx-12      | lg:-scroll-mx-12      | xl:-scroll-mx-12      | 2xl:-scroll-mx-12      |
| -scroll-mx-14       | sm:-scroll-mx-14      | md:-scroll-mx-14      | lg:-scroll-mx-14      | xl:-scroll-mx-14      | 2xl:-scroll-mx-14      |
| -scroll-mx-16       | sm:-scroll-mx-16      | md:-scroll-mx-16      | lg:-scroll-mx-16      | xl:-scroll-mx-16      | 2xl:-scroll-mx-16      |
| -scroll-mx-20       | sm:-scroll-mx-20      | md:-scroll-mx-20      | lg:-scroll-mx-20      | xl:-scroll-mx-20      | 2xl:-scroll-mx-20      |
| -scroll-mx-24       | sm:-scroll-mx-24      | md:-scroll-mx-24      | lg:-scroll-mx-24      | xl:-scroll-mx-24      | 2xl:-scroll-mx-24      |
| -scroll-mx-28       | sm:-scroll-mx-28      | md:-scroll-mx-28      | lg:-scroll-mx-28      | xl:-scroll-mx-28      | 2xl:-scroll-mx-28      |
| -scroll-mx-32       | sm:-scroll-mx-32      | md:-scroll-mx-32      | lg:-scroll-mx-32      | xl:-scroll-mx-32      | 2xl:-scroll-mx-32      |
| -scroll-mx-36       | sm:-scroll-mx-36      | md:-scroll-mx-36      | lg:-scroll-mx-36      | xl:-scroll-mx-36      | 2xl:-scroll-mx-36      |
| -scroll-mx-40       | sm:-scroll-mx-40      | md:-scroll-mx-40      | lg:-scroll-mx-40      | xl:-scroll-mx-40      | 2xl:-scroll-mx-40      |
| -scroll-mx-44       | sm:-scroll-mx-44      | md:-scroll-mx-44      | lg:-scroll-mx-44      | xl:-scroll-mx-44      | 2xl:-scroll-mx-44      |
| -scroll-mx-48       | sm:-scroll-mx-48      | md:-scroll-mx-48      | lg:-scroll-mx-48      | xl:-scroll-mx-48      | 2xl:-scroll-mx-48      |
| -scroll-mx-52       | sm:-scroll-mx-52      | md:-scroll-mx-52      | lg:-scroll-mx-52      | xl:-scroll-mx-52      | 2xl:-scroll-mx-52      |
| -scroll-mx-56       | sm:-scroll-mx-56      | md:-scroll-mx-56      | lg:-scroll-mx-56      | xl:-scroll-mx-56      | 2xl:-scroll-mx-56      |
| -scroll-mx-60       | sm:-scroll-mx-60      | md:-scroll-mx-60      | lg:-scroll-mx-60      | xl:-scroll-mx-60      | 2xl:-scroll-mx-60      |
| -scroll-mx-64       | sm:-scroll-mx-64      | md:-scroll-mx-64      | lg:-scroll-mx-64      | xl:-scroll-mx-64      | 2xl:-scroll-mx-64      |
| -scroll-mx-72       | sm:-scroll-mx-72      | md:-scroll-mx-72      | lg:-scroll-mx-72      | xl:-scroll-mx-72      | 2xl:-scroll-mx-72      |
| -scroll-mx-80       | sm:-scroll-mx-80      | md:-scroll-mx-80      | lg:-scroll-mx-80      | xl:-scroll-mx-80      | 2xl:-scroll-mx-80      |
| -scroll-mx-96       | sm:-scroll-mx-96      | md:-scroll-mx-96      | lg:-scroll-mx-96      | xl:-scroll-mx-96      | 2xl:-scroll-mx-96      |
*/