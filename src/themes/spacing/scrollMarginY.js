import getScrollMargin , { VERTICAL } from './scrollMargin' ;

/**
 * Generates responsive vertical scroll margin class definitions.
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
 * getScrollMarginY( 4 ) ;
 * // → { 'scroll-my-4': true }
 *
 * getScrollMarginY( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-my-2': true , 'md:scroll-my-4': true }
 * ```
 */
export const getScrollMarginY = ( value , options = {} ) =>
    getScrollMargin( value , { ...options , direction: VERTICAL } ) ;

export default getScrollMarginY ;

/* Tailwindcss safe list
| --------XS-------- | ---------SM--------- | ---------MD--------- | ---------LG--------- | ---------XL--------— | ---------XXL--------- |
| scroll-my-px        | sm:scroll-my-px       | md:scroll-my-px       | lg:scroll-my-px       | xl:scroll-my-px       | 2xl:scroll-my-px       |
| scroll-my-0         | sm:scroll-my-0        | md:scroll-my-0        | lg:scroll-my-0        | xl:scroll-my-0        | 2xl:scroll-my-0        |
| scroll-my-0.5       | sm:scroll-my-0.5      | md:scroll-my-0.5      | lg:scroll-my-0.5      | xl:scroll-my-0.5      | 2xl:scroll-my-0.5      |
| scroll-my-1         | sm:scroll-my-1        | md:scroll-my-1        | lg:scroll-my-1        | xl:scroll-my-1        | 2xl:scroll-my-1        |
| scroll-my-1.5       | sm:scroll-my-1.5      | md:scroll-my-1.5      | lg:scroll-my-1.5      | xl:scroll-my-1.5      | 2xl:scroll-my-1.5      |
| scroll-my-2         | sm:scroll-my-2        | md:scroll-my-2        | lg:scroll-my-2        | xl:scroll-my-2        | 2xl:scroll-my-2        |
| scroll-my-2.5       | sm:scroll-my-2.5      | md:scroll-my-2.5      | lg:scroll-my-2.5      | xl:scroll-my-2.5      | 2xl:scroll-my-2.5      |
| scroll-my-3         | sm:scroll-my-3        | md:scroll-my-3        | lg:scroll-my-3        | xl:scroll-my-3        | 2xl:scroll-my-3        |
| scroll-my-3.5       | sm:scroll-my-3.5      | md:scroll-my-3.5      | lg:scroll-my-3.5      | xl:scroll-my-3.5      | 2xl:scroll-my-3.5      |
| scroll-my-4         | sm:scroll-my-4        | md:scroll-my-4        | lg:scroll-my-4        | xl:scroll-my-4        | 2xl:scroll-my-4        |
| scroll-my-5         | sm:scroll-my-5        | md:scroll-my-5        | lg:scroll-my-5        | xl:scroll-my-5        | 2xl:scroll-my-5        |
| scroll-my-6         | sm:scroll-my-6        | md:scroll-my-6        | lg:scroll-my-6        | xl:scroll-my-6        | 2xl:scroll-my-6        |
| scroll-my-7         | sm:scroll-my-7        | md:scroll-my-7        | lg:scroll-my-7        | xl:scroll-my-7        | 2xl:scroll-my-7        |
| scroll-my-8         | sm:scroll-my-8        | md:scroll-my-8        | lg:scroll-my-8        | xl:scroll-my-8        | 2xl:scroll-my-8        |
| scroll-my-9         | sm:scroll-my-9        | md:scroll-my-9        | lg:scroll-my-9        | xl:scroll-my-9        | 2xl:scroll-my-9        |
| scroll-my-10        | sm:scroll-my-10       | md:scroll-my-10       | lg:scroll-my-10       | xl:scroll-my-10       | 2xl:scroll-my-10       |
| scroll-my-11        | sm:scroll-my-11       | md:scroll-my-11       | lg:scroll-my-11       | xl:scroll-my-11       | 2xl:scroll-my-11       |
| scroll-my-12        | sm:scroll-my-12       | md:scroll-my-12       | lg:scroll-my-12       | xl:scroll-my-12       | 2xl:scroll-my-12       |
| scroll-my-14        | sm:scroll-my-14       | md:scroll-my-14       | lg:scroll-my-14       | xl:scroll-my-14       | 2xl:scroll-my-14       |
| scroll-my-16        | sm:scroll-my-16       | md:scroll-my-16       | lg:scroll-my-16       | xl:scroll-my-16       | 2xl:scroll-my-16       |
| scroll-my-20        | sm:scroll-my-20       | md:scroll-my-20       | lg:scroll-my-20       | xl:scroll-my-20       | 2xl:scroll-my-20       |
| scroll-my-24        | sm:scroll-my-24       | md:scroll-my-24       | lg:scroll-my-24       | xl:scroll-my-24       | 2xl:scroll-my-24       |
| scroll-my-28        | sm:scroll-my-28       | md:scroll-my-28       | lg:scroll-my-28       | xl:scroll-my-28       | 2xl:scroll-my-28       |
| scroll-my-32        | sm:scroll-my-32       | md:scroll-my-32       | lg:scroll-my-32       | xl:scroll-my-32       | 2xl:scroll-my-32       |
| scroll-my-36        | sm:scroll-my-36       | md:scroll-my-36       | lg:scroll-my-36       | xl:scroll-my-36       | 2xl:scroll-my-36       |
| scroll-my-40        | sm:scroll-my-40       | md:scroll-my-40       | lg:scroll-my-40       | xl:scroll-my-40       | 2xl:scroll-my-40       |
| scroll-my-44        | sm:scroll-my-44       | md:scroll-my-44       | lg:scroll-my-44       | xl:scroll-my-44       | 2xl:scroll-my-44       |
| scroll-my-48        | sm:scroll-my-48       | md:scroll-my-48       | lg:scroll-my-48       | xl:scroll-my-48       | 2xl:scroll-my-48       |
| scroll-my-52        | sm:scroll-my-52       | md:scroll-my-52       | lg:scroll-my-52       | xl:scroll-my-52       | 2xl:scroll-my-52       |
| scroll-my-56        | sm:scroll-my-56       | md:scroll-my-56       | lg:scroll-my-56       | xl:scroll-my-56       | 2xl:scroll-my-56       |
| scroll-my-60        | sm:scroll-my-60       | md:scroll-my-60       | lg:scroll-my-60       | xl:scroll-my-60       | 2xl:scroll-my-60       |
| scroll-my-64        | sm:scroll-my-64       | md:scroll-my-64       | lg:scroll-my-64       | xl:scroll-my-64       | 2xl:scroll-my-64       |
| scroll-my-72        | sm:scroll-my-72       | md:scroll-my-72       | lg:scroll-my-72       | xl:scroll-my-72       | 2xl:scroll-my-72       |
| scroll-my-80        | sm:scroll-my-80       | md:scroll-my-80       | lg:scroll-my-80       | xl:scroll-my-80       | 2xl:scroll-my-80       |
| scroll-my-96        | sm:scroll-my-96       | md:scroll-my-96       | lg:scroll-my-96       | xl:scroll-my-96       | 2xl:scroll-my-96       |
| -scroll-my-px       | sm:-scroll-my-px      | md:-scroll-my-px      | lg:-scroll-my-px      | xl:-scroll-my-px      | 2xl:-scroll-my-px      |
| -scroll-my-0.5      | sm:-scroll-my-0.5     | md:-scroll-my-0.5     | lg:-scroll-my-0.5     | xl:-scroll-my-0.5     | 2xl:-scroll-my-0.5     |
| -scroll-my-1        | sm:-scroll-my-1       | md:-scroll-my-1       | lg:-scroll-my-1       | xl:-scroll-my-1       | 2xl:-scroll-my-1       |
| -scroll-my-1.5      | sm:-scroll-my-1.5     | md:-scroll-my-1.5     | lg:-scroll-my-1.5     | xl:-scroll-my-1.5     | 2xl:-scroll-my-1.5     |
| -scroll-my-2        | sm:-scroll-my-2       | md:-scroll-my-2       | lg:-scroll-my-2       | xl:-scroll-my-2       | 2xl:-scroll-my-2       |
| -scroll-my-2.5      | sm:-scroll-my-2.5     | md:-scroll-my-2.5     | lg:-scroll-my-2.5     | xl:-scroll-my-2.5     | 2xl:-scroll-my-2.5     |
| -scroll-my-3        | sm:-scroll-my-3       | md:-scroll-my-3       | lg:-scroll-my-3       | xl:-scroll-my-3       | 2xl:-scroll-my-3       |
| -scroll-my-3.5      | sm:-scroll-my-3.5     | md:-scroll-my-3.5     | lg:-scroll-my-3.5     | xl:-scroll-my-3.5     | 2xl:-scroll-my-3.5     |
| -scroll-my-4        | sm:-scroll-my-4       | md:-scroll-my-4       | lg:-scroll-my-4       | xl:-scroll-my-4       | 2xl:-scroll-my-4       |
| -scroll-my-5        | sm:-scroll-my-5       | md:-scroll-my-5       | lg:-scroll-my-5       | xl:-scroll-my-5       | 2xl:-scroll-my-5       |
| -scroll-my-6        | sm:-scroll-my-6       | md:-scroll-my-6       | lg:-scroll-my-6       | xl:-scroll-my-6       | 2xl:-scroll-my-6       |
| -scroll-my-7        | sm:-scroll-my-7       | md:-scroll-my-7       | lg:-scroll-my-7       | xl:-scroll-my-7       | 2xl:-scroll-my-7       |
| -scroll-my-8        | sm:-scroll-my-8       | md:-scroll-my-8       | lg:-scroll-my-8       | xl:-scroll-my-8       | 2xl:-scroll-my-8       |
| -scroll-my-9        | sm:-scroll-my-9       | md:-scroll-my-9       | lg:-scroll-my-9       | xl:-scroll-my-9       | 2xl:-scroll-my-9       |
| -scroll-my-10       | sm:-scroll-my-10      | md:-scroll-my-10      | lg:-scroll-my-10      | xl:-scroll-my-10      | 2xl:-scroll-my-10      |
| -scroll-my-11       | sm:-scroll-my-11      | md:-scroll-my-11      | lg:-scroll-my-11      | xl:-scroll-my-11      | 2xl:-scroll-my-11      |
| -scroll-my-12       | sm:-scroll-my-12      | md:-scroll-my-12      | lg:-scroll-my-12      | xl:-scroll-my-12      | 2xl:-scroll-my-12      |
| -scroll-my-14       | sm:-scroll-my-14      | md:-scroll-my-14      | lg:-scroll-my-14      | xl:-scroll-my-14      | 2xl:-scroll-my-14      |
| -scroll-my-16       | sm:-scroll-my-16      | md:-scroll-my-16      | lg:-scroll-my-16      | xl:-scroll-my-16      | 2xl:-scroll-my-16      |
| -scroll-my-20       | sm:-scroll-my-20      | md:-scroll-my-20      | lg:-scroll-my-20      | xl:-scroll-my-20      | 2xl:-scroll-my-20      |
| -scroll-my-24       | sm:-scroll-my-24      | md:-scroll-my-24      | lg:-scroll-my-24      | xl:-scroll-my-24      | 2xl:-scroll-my-24      |
| -scroll-my-28       | sm:-scroll-my-28      | md:-scroll-my-28      | lg:-scroll-my-28      | xl:-scroll-my-28      | 2xl:-scroll-my-28      |
| -scroll-my-32       | sm:-scroll-my-32      | md:-scroll-my-32      | lg:-scroll-my-32      | xl:-scroll-my-32      | 2xl:-scroll-my-32      |
| -scroll-my-36       | sm:-scroll-my-36      | md:-scroll-my-36      | lg:-scroll-my-36      | xl:-scroll-my-36      | 2xl:-scroll-my-36      |
| -scroll-my-40       | sm:-scroll-my-40      | md:-scroll-my-40      | lg:-scroll-my-40      | xl:-scroll-my-40      | 2xl:-scroll-my-40      |
| -scroll-my-44       | sm:-scroll-my-44      | md:-scroll-my-44      | lg:-scroll-my-44      | xl:-scroll-my-44      | 2xl:-scroll-my-44      |
| -scroll-my-48       | sm:-scroll-my-48      | md:-scroll-my-48      | lg:-scroll-my-48      | xl:-scroll-my-48      | 2xl:-scroll-my-48      |
| -scroll-my-52       | sm:-scroll-my-52      | md:-scroll-my-52      | lg:-scroll-my-52      | xl:-scroll-my-52      | 2xl:-scroll-my-52      |
| -scroll-my-56       | sm:-scroll-my-56      | md:-scroll-my-56      | lg:-scroll-my-56      | xl:-scroll-my-56      | 2xl:-scroll-my-56      |
| -scroll-my-60       | sm:-scroll-my-60      | md:-scroll-my-60      | lg:-scroll-my-60      | xl:-scroll-my-60      | 2xl:-scroll-my-60      |
| -scroll-my-64       | sm:-scroll-my-64      | md:-scroll-my-64      | lg:-scroll-my-64      | xl:-scroll-my-64      | 2xl:-scroll-my-64      |
| -scroll-my-72       | sm:-scroll-my-72      | md:-scroll-my-72      | lg:-scroll-my-72      | xl:-scroll-my-72      | 2xl:-scroll-my-72      |
| -scroll-my-80       | sm:-scroll-my-80      | md:-scroll-my-80      | lg:-scroll-my-80      | xl:-scroll-my-80      | 2xl:-scroll-my-80      |
| -scroll-my-96       | sm:-scroll-my-96      | md:-scroll-my-96      | lg:-scroll-my-96      | xl:-scroll-my-96      | 2xl:-scroll-my-96      |
*/