import getScrollMargin , { LEFT } from './scrollMargin' ;

/**
 * Generates responsive left scroll margin class definitions.
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
 * getScrollMarginLeft( 4 ) ;
 * // → { 'scroll-ml-4': true }
 *
 * getScrollMarginLeft( { xs: 2 , md: 4 } ) ;
 * // → { 'scroll-ml-2': true , 'md:scroll-ml-4': true }
 * ```
 */
export const getScrollMarginLeft = ( value , options = {} ) =>
    getScrollMargin( value , { ...options , direction: LEFT } ) ;

export default getScrollMarginLeft ;

/* Tailwindcss safe list
| --------XS-------- | ---------SM--------- | ---------MD--------- | ---------LG--------- | ---------XL--------— | ---------XXL--------- |
| scroll-ml-px        | sm:scroll-ml-px       | md:scroll-ml-px       | lg:scroll-ml-px       | xl:scroll-ml-px       | 2xl:scroll-ml-px       |
| scroll-ml-0         | sm:scroll-ml-0        | md:scroll-ml-0        | lg:scroll-ml-0        | xl:scroll-ml-0        | 2xl:scroll-ml-0        |
| scroll-ml-0.5       | sm:scroll-ml-0.5      | md:scroll-ml-0.5      | lg:scroll-ml-0.5      | xl:scroll-ml-0.5      | 2xl:scroll-ml-0.5      |
| scroll-ml-1         | sm:scroll-ml-1        | md:scroll-ml-1        | lg:scroll-ml-1        | xl:scroll-ml-1        | 2xl:scroll-ml-1        |
| scroll-ml-1.5       | sm:scroll-ml-1.5      | md:scroll-ml-1.5      | lg:scroll-ml-1.5      | xl:scroll-ml-1.5      | 2xl:scroll-ml-1.5      |
| scroll-ml-2         | sm:scroll-ml-2        | md:scroll-ml-2        | lg:scroll-ml-2        | xl:scroll-ml-2        | 2xl:scroll-ml-2        |
| scroll-ml-2.5       | sm:scroll-ml-2.5      | md:scroll-ml-2.5      | lg:scroll-ml-2.5      | xl:scroll-ml-2.5      | 2xl:scroll-ml-2.5      |
| scroll-ml-3         | sm:scroll-ml-3        | md:scroll-ml-3        | lg:scroll-ml-3        | xl:scroll-ml-3        | 2xl:scroll-ml-3        |
| scroll-ml-3.5       | sm:scroll-ml-3.5      | md:scroll-ml-3.5      | lg:scroll-ml-3.5      | xl:scroll-ml-3.5      | 2xl:scroll-ml-3.5      |
| scroll-ml-4         | sm:scroll-ml-4        | md:scroll-ml-4        | lg:scroll-ml-4        | xl:scroll-ml-4        | 2xl:scroll-ml-4        |
| scroll-ml-5         | sm:scroll-ml-5        | md:scroll-ml-5        | lg:scroll-ml-5        | xl:scroll-ml-5        | 2xl:scroll-ml-5        |
| scroll-ml-6         | sm:scroll-ml-6        | md:scroll-ml-6        | lg:scroll-ml-6        | xl:scroll-ml-6        | 2xl:scroll-ml-6        |
| scroll-ml-7         | sm:scroll-ml-7        | md:scroll-ml-7        | lg:scroll-ml-7        | xl:scroll-ml-7        | 2xl:scroll-ml-7        |
| scroll-ml-8         | sm:scroll-ml-8        | md:scroll-ml-8        | lg:scroll-ml-8        | xl:scroll-ml-8        | 2xl:scroll-ml-8        |
| scroll-ml-9         | sm:scroll-ml-9        | md:scroll-ml-9        | lg:scroll-ml-9        | xl:scroll-ml-9        | 2xl:scroll-ml-9        |
| scroll-ml-10        | sm:scroll-ml-10       | md:scroll-ml-10       | lg:scroll-ml-10       | xl:scroll-ml-10       | 2xl:scroll-ml-10       |
| scroll-ml-11        | sm:scroll-ml-11       | md:scroll-ml-11       | lg:scroll-ml-11       | xl:scroll-ml-11       | 2xl:scroll-ml-11       |
| scroll-ml-12        | sm:scroll-ml-12       | md:scroll-ml-12       | lg:scroll-ml-12       | xl:scroll-ml-12       | 2xl:scroll-ml-12       |
| scroll-ml-14        | sm:scroll-ml-14       | md:scroll-ml-14       | lg:scroll-ml-14       | xl:scroll-ml-14       | 2xl:scroll-ml-14       |
| scroll-ml-16        | sm:scroll-ml-16       | md:scroll-ml-16       | lg:scroll-ml-16       | xl:scroll-ml-16       | 2xl:scroll-ml-16       |
| scroll-ml-20        | sm:scroll-ml-20       | md:scroll-ml-20       | lg:scroll-ml-20       | xl:scroll-ml-20       | 2xl:scroll-ml-20       |
| scroll-ml-24        | sm:scroll-ml-24       | md:scroll-ml-24       | lg:scroll-ml-24       | xl:scroll-ml-24       | 2xl:scroll-ml-24       |
| scroll-ml-28        | sm:scroll-ml-28       | md:scroll-ml-28       | lg:scroll-ml-28       | xl:scroll-ml-28       | 2xl:scroll-ml-28       |
| scroll-ml-32        | sm:scroll-ml-32       | md:scroll-ml-32       | lg:scroll-ml-32       | xl:scroll-ml-32       | 2xl:scroll-ml-32       |
| scroll-ml-36        | sm:scroll-ml-36       | md:scroll-ml-36       | lg:scroll-ml-36       | xl:scroll-ml-36       | 2xl:scroll-ml-36       |
| scroll-ml-40        | sm:scroll-ml-40       | md:scroll-ml-40       | lg:scroll-ml-40       | xl:scroll-ml-40       | 2xl:scroll-ml-40       |
| scroll-ml-44        | sm:scroll-ml-44       | md:scroll-ml-44       | lg:scroll-ml-44       | xl:scroll-ml-44       | 2xl:scroll-ml-44       |
| scroll-ml-48        | sm:scroll-ml-48       | md:scroll-ml-48       | lg:scroll-ml-48       | xl:scroll-ml-48       | 2xl:scroll-ml-48       |
| scroll-ml-52        | sm:scroll-ml-52       | md:scroll-ml-52       | lg:scroll-ml-52       | xl:scroll-ml-52       | 2xl:scroll-ml-52       |
| scroll-ml-56        | sm:scroll-ml-56       | md:scroll-ml-56       | lg:scroll-ml-56       | xl:scroll-ml-56       | 2xl:scroll-ml-56       |
| scroll-ml-60        | sm:scroll-ml-60       | md:scroll-ml-60       | lg:scroll-ml-60       | xl:scroll-ml-60       | 2xl:scroll-ml-60       |
| scroll-ml-64        | sm:scroll-ml-64       | md:scroll-ml-64       | lg:scroll-ml-64       | xl:scroll-ml-64       | 2xl:scroll-ml-64       |
| scroll-ml-72        | sm:scroll-ml-72       | md:scroll-ml-72       | lg:scroll-ml-72       | xl:scroll-ml-72       | 2xl:scroll-ml-72       |
| scroll-ml-80        | sm:scroll-ml-80       | md:scroll-ml-80       | lg:scroll-ml-80       | xl:scroll-ml-80       | 2xl:scroll-ml-80       |
| scroll-ml-96        | sm:scroll-ml-96       | md:scroll-ml-96       | lg:scroll-ml-96       | xl:scroll-ml-96       | 2xl:scroll-ml-96       |
| -scroll-ml-px       | sm:-scroll-ml-px      | md:-scroll-ml-px      | lg:-scroll-ml-px      | xl:-scroll-ml-px      | 2xl:-scroll-ml-px      |
| -scroll-ml-0.5      | sm:-scroll-ml-0.5     | md:-scroll-ml-0.5     | lg:-scroll-ml-0.5     | xl:-scroll-ml-0.5     | 2xl:-scroll-ml-0.5     |
| -scroll-ml-1        | sm:-scroll-ml-1       | md:-scroll-ml-1       | lg:-scroll-ml-1       | xl:-scroll-ml-1       | 2xl:-scroll-ml-1       |
| -scroll-ml-1.5      | sm:-scroll-ml-1.5     | md:-scroll-ml-1.5     | lg:-scroll-ml-1.5     | xl:-scroll-ml-1.5     | 2xl:-scroll-ml-1.5     |
| -scroll-ml-2        | sm:-scroll-ml-2       | md:-scroll-ml-2       | lg:-scroll-ml-2       | xl:-scroll-ml-2       | 2xl:-scroll-ml-2       |
| -scroll-ml-2.5      | sm:-scroll-ml-2.5     | md:-scroll-ml-2.5     | lg:-scroll-ml-2.5     | xl:-scroll-ml-2.5     | 2xl:-scroll-ml-2.5     |
| -scroll-ml-3        | sm:-scroll-ml-3       | md:-scroll-ml-3       | lg:-scroll-ml-3       | xl:-scroll-ml-3       | 2xl:-scroll-ml-3       |
| -scroll-ml-3.5      | sm:-scroll-ml-3.5     | md:-scroll-ml-3.5     | lg:-scroll-ml-3.5     | xl:-scroll-ml-3.5     | 2xl:-scroll-ml-3.5     |
| -scroll-ml-4        | sm:-scroll-ml-4       | md:-scroll-ml-4       | lg:-scroll-ml-4       | xl:-scroll-ml-4       | 2xl:-scroll-ml-4       |
| -scroll-ml-5        | sm:-scroll-ml-5       | md:-scroll-ml-5       | lg:-scroll-ml-5       | xl:-scroll-ml-5       | 2xl:-scroll-ml-5       |
| -scroll-ml-6        | sm:-scroll-ml-6       | md:-scroll-ml-6       | lg:-scroll-ml-6       | xl:-scroll-ml-6       | 2xl:-scroll-ml-6       |
| -scroll-ml-7        | sm:-scroll-ml-7       | md:-scroll-ml-7       | lg:-scroll-ml-7       | xl:-scroll-ml-7       | 2xl:-scroll-ml-7       |
| -scroll-ml-8        | sm:-scroll-ml-8       | md:-scroll-ml-8       | lg:-scroll-ml-8       | xl:-scroll-ml-8       | 2xl:-scroll-ml-8       |
| -scroll-ml-9        | sm:-scroll-ml-9       | md:-scroll-ml-9       | lg:-scroll-ml-9       | xl:-scroll-ml-9       | 2xl:-scroll-ml-9       |
| -scroll-ml-10       | sm:-scroll-ml-10      | md:-scroll-ml-10      | lg:-scroll-ml-10      | xl:-scroll-ml-10      | 2xl:-scroll-ml-10      |
| -scroll-ml-11       | sm:-scroll-ml-11      | md:-scroll-ml-11      | lg:-scroll-ml-11      | xl:-scroll-ml-11      | 2xl:-scroll-ml-11      |
| -scroll-ml-12       | sm:-scroll-ml-12      | md:-scroll-ml-12      | lg:-scroll-ml-12      | xl:-scroll-ml-12      | 2xl:-scroll-ml-12      |
| -scroll-ml-14       | sm:-scroll-ml-14      | md:-scroll-ml-14      | lg:-scroll-ml-14      | xl:-scroll-ml-14      | 2xl:-scroll-ml-14      |
| -scroll-ml-16       | sm:-scroll-ml-16      | md:-scroll-ml-16      | lg:-scroll-ml-16      | xl:-scroll-ml-16      | 2xl:-scroll-ml-16      |
| -scroll-ml-20       | sm:-scroll-ml-20      | md:-scroll-ml-20      | lg:-scroll-ml-20      | xl:-scroll-ml-20      | 2xl:-scroll-ml-20      |
| -scroll-ml-24       | sm:-scroll-ml-24      | md:-scroll-ml-24      | lg:-scroll-ml-24      | xl:-scroll-ml-24      | 2xl:-scroll-ml-24      |
| -scroll-ml-28       | sm:-scroll-ml-28      | md:-scroll-ml-28      | lg:-scroll-ml-28      | xl:-scroll-ml-28      | 2xl:-scroll-ml-28      |
| -scroll-ml-32       | sm:-scroll-ml-32      | md:-scroll-ml-32      | lg:-scroll-ml-32      | xl:-scroll-ml-32      | 2xl:-scroll-ml-32      |
| -scroll-ml-36       | sm:-scroll-ml-36      | md:-scroll-ml-36      | lg:-scroll-ml-36      | xl:-scroll-ml-36      | 2xl:-scroll-ml-36      |
| -scroll-ml-40       | sm:-scroll-ml-40      | md:-scroll-ml-40      | lg:-scroll-ml-40      | xl:-scroll-ml-40      | 2xl:-scroll-ml-40      |
| -scroll-ml-44       | sm:-scroll-ml-44      | md:-scroll-ml-44      | lg:-scroll-ml-44      | xl:-scroll-ml-44      | 2xl:-scroll-ml-44      |
| -scroll-ml-48       | sm:-scroll-ml-48      | md:-scroll-ml-48      | lg:-scroll-ml-48      | xl:-scroll-ml-48      | 2xl:-scroll-ml-48      |
| -scroll-ml-52       | sm:-scroll-ml-52      | md:-scroll-ml-52      | lg:-scroll-ml-52      | xl:-scroll-ml-52      | 2xl:-scroll-ml-52      |
| -scroll-ml-56       | sm:-scroll-ml-56      | md:-scroll-ml-56      | lg:-scroll-ml-56      | xl:-scroll-ml-56      | 2xl:-scroll-ml-56      |
| -scroll-ml-60       | sm:-scroll-ml-60      | md:-scroll-ml-60      | lg:-scroll-ml-60      | xl:-scroll-ml-60      | 2xl:-scroll-ml-60      |
| -scroll-ml-64       | sm:-scroll-ml-64      | md:-scroll-ml-64      | lg:-scroll-ml-64      | xl:-scroll-ml-64      | 2xl:-scroll-ml-64      |
| -scroll-ml-72       | sm:-scroll-ml-72      | md:-scroll-ml-72      | lg:-scroll-ml-72      | xl:-scroll-ml-72      | 2xl:-scroll-ml-72      |
| -scroll-ml-80       | sm:-scroll-ml-80      | md:-scroll-ml-80      | lg:-scroll-ml-80      | xl:-scroll-ml-80      | 2xl:-scroll-ml-80      |
| -scroll-ml-96       | sm:-scroll-ml-96      | md:-scroll-ml-96      | lg:-scroll-ml-96      | xl:-scroll-ml-96      | 2xl:-scroll-ml-96      |
*/