import getSpace , { HORIZONTAL } from './space' ;

/**
 * Generates responsive horizontal space-between class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Space value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 * @param {boolean} [options.negative=false] - Use negative spacing.
 * @param {boolean} [options.reversed=false] - Reverse child order (for flex-row-reverse).
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/space
 *
 * @example
 * ```js
 * getSpaceX( 4 ) ;
 * // → { 'space-x-4': true , 'space-x-reverse': false }
 *
 * getSpaceX( 2 , { reversed: true } ) ;
 * // → { 'space-x-2': true , 'space-x-reverse': true }
 *
 * getSpaceX( -4 ) ;
 * // → { '-space-x-4': true , '-space-x-reverse': false }
 *
 * getSpaceX( { xs: 2 , md: 4 } ) ;
 * // → { 'space-x-2': true , ... , 'md:space-x-4': true , ... }
 * ```
 */
const getSpaceX = ( value , options = {} ) =>
    getSpace( value , { ...options , direction: HORIZONTAL } ) ;

export default getSpaceX ;

/* Tailwindcss safe list
| ------XS------  | -------SM-------   | -------MD-------   | -------LG-------   | -------XL------—   | -------XXL-------   |
| space-x-px      | sm:space-x-px      | md:space-x-px      | lg:space-x-px      | xl:space-x-px      | 2xl:space-x-px      |
| space-x-0       | sm:space-x-0       | md:space-x-0       | lg:space-x-0       | xl:space-x-0       | 2xl:space-x-0       |
| space-x-0.5     | sm:space-x-0.5     | md:space-x-0.5     | lg:space-x-0.5     | xl:space-x-0.5     | 2xl:space-x-0.5     |
| space-x-1       | sm:space-x-1       | md:space-x-1       | lg:space-x-1       | xl:space-x-1       | 2xl:space-x-1       |
| space-x-1.5     | sm:space-x-1.5     | md:space-x-1.5     | lg:space-x-1.5     | xl:space-x-1.5     | 2xl:space-x-1.5     |
| space-x-2       | sm:space-x-2       | md:space-x-2       | lg:space-x-2       | xl:space-x-2       | 2xl:space-x-2       |
| space-x-2.5     | sm:space-x-2.5     | md:space-x-2.5     | lg:space-x-2.5     | xl:space-x-2.5     | 2xl:space-x-2.5     |
| space-x-3       | sm:space-x-3       | md:space-x-3       | lg:space-x-3       | xl:space-x-3       | 2xl:space-x-3       |
| space-x-3.5     | sm:space-x-3.5     | md:space-x-3.5     | lg:space-x-3.5     | xl:space-x-3.5     | 2xl:space-x-3.5     |
| space-x-4       | sm:space-x-4       | md:space-x-4       | lg:space-x-4       | xl:space-x-4       | 2xl:space-x-4       |
| space-x-5       | sm:space-x-5       | md:space-x-5       | lg:space-x-5       | xl:space-x-5       | 2xl:space-x-5       |
| space-x-6       | sm:space-x-6       | md:space-x-6       | lg:space-x-6       | xl:space-x-6       | 2xl:space-x-6       |
| space-x-7       | sm:space-x-7       | md:space-x-7       | lg:space-x-7       | xl:space-x-7       | 2xl:space-x-7       |
| space-x-8       | sm:space-x-8       | md:space-x-8       | lg:space-x-8       | xl:space-x-8       | 2xl:space-x-8       |
| space-x-9       | sm:space-x-9       | md:space-x-9       | lg:space-x-9       | xl:space-x-9       | 2xl:space-x-9       |
| space-x-10      | sm:space-x-10      | md:space-x-10      | lg:space-x-10      | xl:space-x-10      | 2xl:space-x-10      |
| space-x-11      | sm:space-x-11      | md:space-x-11      | lg:space-x-11      | xl:space-x-11      | 2xl:space-x-11      |
| space-x-12      | sm:space-x-12      | md:space-x-12      | lg:space-x-12      | xl:space-x-12      | 2xl:space-x-12      |
| space-x-14      | sm:space-x-14      | md:space-x-14      | lg:space-x-14      | xl:space-x-14      | 2xl:space-x-14      |
| space-x-16      | sm:space-x-16      | md:space-x-16      | lg:space-x-16      | xl:space-x-16      | 2xl:space-x-16      |
| space-x-20      | sm:space-x-20      | md:space-x-20      | lg:space-x-20      | xl:space-x-20      | 2xl:space-x-20      |
| space-x-24      | sm:space-x-24      | md:space-x-24      | lg:space-x-24      | xl:space-x-24      | 2xl:space-x-24      |
| space-x-28      | sm:space-x-28      | md:space-x-28      | lg:space-x-28      | xl:space-x-28      | 2xl:space-x-28      |
| space-x-32      | sm:space-x-32      | md:space-x-32      | lg:space-x-32      | xl:space-x-32      | 2xl:space-x-32      |
| space-x-36      | sm:space-x-36      | md:space-x-36      | lg:space-x-36      | xl:space-x-36      | 2xl:space-x-36      |
| space-x-40      | sm:space-x-40      | md:space-x-40      | lg:space-x-40      | xl:space-x-40      | 2xl:space-x-40      |
| space-x-44      | sm:space-x-44      | md:space-x-44      | lg:space-x-44      | xl:space-x-44      | 2xl:space-x-44      |
| space-x-48      | sm:space-x-48      | md:space-x-48      | lg:space-x-48      | xl:space-x-48      | 2xl:space-x-48      |
| space-x-52      | sm:space-x-52      | md:space-x-52      | lg:space-x-52      | xl:space-x-52      | 2xl:space-x-52      |
| space-x-56      | sm:space-x-56      | md:space-x-56      | lg:space-x-56      | xl:space-x-56      | 2xl:space-x-56      |
| space-x-60      | sm:space-x-60      | md:space-x-60      | lg:space-x-60      | xl:space-x-60      | 2xl:space-x-60      |
| space-x-64      | sm:space-x-64      | md:space-x-64      | lg:space-x-64      | xl:space-x-64      | 2xl:space-x-64      |
| space-x-72      | sm:space-x-72      | md:space-x-72      | lg:space-x-72      | xl:space-x-72      | 2xl:space-x-72      |
| space-x-80      | sm:space-x-80      | md:space-x-80      | lg:space-x-80      | xl:space-x-80      | 2xl:space-x-80      |
| space-x-96      | sm:space-x-96      | md:space-x-96      | lg:space-x-96      | xl:space-x-96      | 2xl:space-x-96      |
| space-x-reverse | sm:space-x-reverse | md:space-x-reverse | lg:space-x-reverse | xl:space-x-reverse | 2xl:space-x-reverse |
*/