import getSpace , { VERTICAL } from './space' ;

/**
 * Generates responsive vertical space-between class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Space value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative spacing.
 * @param {boolean} [options.reversed=false] - Reverse child order (for flex-col-reverse).
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/space
 *
 * @example
 * ```js
 * getSpaceY( 4 ) ;
 * // → { 'space-y-4': true , 'space-y-reverse': false }
 *
 * getSpaceY( 2 , { reversed: true } ) ;
 * // → { 'space-y-2': true , 'space-y-reverse': true }
 *
 * getSpaceY( -4 ) ;
 * // → { '-space-y-4': true , '-space-y-reverse': false }
 *
 * getSpaceY( { xs: 2 , md: 4 } ) ;
 * // → { 'space-y-2': true , ... , 'md:space-y-4': true , ... }
 * ```
 */
const getSpaceY = ( value , options = {} ) =>
    getSpace( value , { ...options , direction: VERTICAL } ) ;

export default getSpaceY ;


/* Tailwindcss safe list
| ------XS------ | -------SM------- | -------MD------- | -------LG------- | -------XL------— | -------XXL------- |
| space-y-px      | sm:space-y-px      | md:space-y-px      | lg:space-y-px      | xl:space-y-px      | 2xl:space-y-px      |
| space-y-0       | sm:space-y-0       | md:space-y-0       | lg:space-y-0       | xl:space-y-0       | 2xl:space-y-0       |
| space-y-0.5     | sm:space-y-0.5     | md:space-y-0.5     | lg:space-y-0.5     | xl:space-y-0.5     | 2xl:space-y-0.5     |
| space-y-1       | sm:space-y-1       | md:space-y-1       | lg:space-y-1       | xl:space-y-1       | 2xl:space-y-1       |
| space-y-1.5     | sm:space-y-1.5     | md:space-y-1.5     | lg:space-y-1.5     | xl:space-y-1.5     | 2xl:space-y-1.5     |
| space-y-2       | sm:space-y-2       | md:space-y-2       | lg:space-y-2       | xl:space-y-2       | 2xl:space-y-2       |
| space-y-2.5     | sm:space-y-2.5     | md:space-y-2.5     | lg:space-y-2.5     | xl:space-y-2.5     | 2xl:space-y-2.5     |
| space-y-3       | sm:space-y-3       | md:space-y-3       | lg:space-y-3       | xl:space-y-3       | 2xl:space-y-3       |
| space-y-3.5     | sm:space-y-3.5     | md:space-y-3.5     | lg:space-y-3.5     | xl:space-y-3.5     | 2xl:space-y-3.5     |
| space-y-4       | sm:space-y-4       | md:space-y-4       | lg:space-y-4       | xl:space-y-4       | 2xl:space-y-4       |
| space-y-5       | sm:space-y-5       | md:space-y-5       | lg:space-y-5       | xl:space-y-5       | 2xl:space-y-5       |
| space-y-6       | sm:space-y-6       | md:space-y-6       | lg:space-y-6       | xl:space-y-6       | 2xl:space-y-6       |
| space-y-7       | sm:space-y-7       | md:space-y-7       | lg:space-y-7       | xl:space-y-7       | 2xl:space-y-7       |
| space-y-8       | sm:space-y-8       | md:space-y-8       | lg:space-y-8       | xl:space-y-8       | 2xl:space-y-8       |
| space-y-9       | sm:space-y-9       | md:space-y-9       | lg:space-y-9       | xl:space-y-9       | 2xl:space-y-9       |
| space-y-10      | sm:space-y-10      | md:space-y-10      | lg:space-y-10      | xl:space-y-10      | 2xl:space-y-10      |
| space-y-11      | sm:space-y-11      | md:space-y-11      | lg:space-y-11      | xl:space-y-11      | 2xl:space-y-11      |
| space-y-12      | sm:space-y-12      | md:space-y-12      | lg:space-y-12      | xl:space-y-12      | 2xl:space-y-12      |
| space-y-14      | sm:space-y-14      | md:space-y-14      | lg:space-y-14      | xl:space-y-14      | 2xl:space-y-14      |
| space-y-16      | sm:space-y-16      | md:space-y-16      | lg:space-y-16      | xl:space-y-16      | 2xl:space-y-16      |
| space-y-20      | sm:space-y-20      | md:space-y-20      | lg:space-y-20      | xl:space-y-20      | 2xl:space-y-20      |
| space-y-24      | sm:space-y-24      | md:space-y-24      | lg:space-y-24      | xl:space-y-24      | 2xl:space-y-24      |
| space-y-28      | sm:space-y-28      | md:space-y-28      | lg:space-y-28      | xl:space-y-28      | 2xl:space-y-28      |
| space-y-32      | sm:space-y-32      | md:space-y-32      | lg:space-y-32      | xl:space-y-32      | 2xl:space-y-32      |
| space-y-36      | sm:space-y-36      | md:space-y-36      | lg:space-y-36      | xl:space-y-36      | 2xl:space-y-36      |
| space-y-40      | sm:space-y-40      | md:space-y-40      | lg:space-y-40      | xl:space-y-40      | 2xl:space-y-40      |
| space-y-44      | sm:space-y-44      | md:space-y-44      | lg:space-y-44      | xl:space-y-44      | 2xl:space-y-44      |
| space-y-48      | sm:space-y-48      | md:space-y-48      | lg:space-y-48      | xl:space-y-48      | 2xl:space-y-48      |
| space-y-52      | sm:space-y-52      | md:space-y-52      | lg:space-y-52      | xl:space-y-52      | 2xl:space-y-52      |
| space-y-56      | sm:space-y-56      | md:space-y-56      | lg:space-y-56      | xl:space-y-56      | 2xl:space-y-56      |
| space-y-60      | sm:space-y-60      | md:space-y-60      | lg:space-y-60      | xl:space-y-60      | 2xl:space-y-60      |
| space-y-64      | sm:space-y-64      | md:space-y-64      | lg:space-y-64      | xl:space-y-64      | 2xl:space-y-64      |
| space-y-72      | sm:space-y-72      | md:space-y-72      | lg:space-y-72      | xl:space-y-72      | 2xl:space-y-72      |
| space-y-80      | sm:space-y-80      | md:space-y-80      | lg:space-y-80      | xl:space-y-80      | 2xl:space-y-80      |
| space-y-96      | sm:space-y-96      | md:space-y-96      | lg:space-y-96      | xl:space-y-96      | 2xl:space-y-96      |
| space-y-reverse | sm:space-y-reverse | md:space-y-reverse | lg:space-y-reverse | xl:space-y-reverse | 2xl:space-y-reverse |
*/