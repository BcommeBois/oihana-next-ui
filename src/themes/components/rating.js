/**
 * Rating class name generator for DaisyUI 5.
 *
 * @module themes/components/rating
 * @see https://daisyui.com/components/rating
 *
 * @safelist
 * ## Sizes (responsive — daisyUI 5.6)
 * - rating-xs | rating-sm | rating-md | rating-lg | rating-xl
 * - sm:rating-xs | sm:rating-sm | sm:rating-md | sm:rating-lg | sm:rating-xl
 * - md:rating-xs | md:rating-sm | md:rating-md | md:rating-lg | md:rating-xl
 * - lg:rating-xs | lg:rating-sm | lg:rating-md | lg:rating-lg | lg:rating-xl
 * - xl:rating-xs | xl:rating-sm | xl:rating-md | xl:rating-lg | xl:rating-xl
 * - 2xl:rating-xs | 2xl:rating-sm | 2xl:rating-md | 2xl:rating-lg | 2xl:rating-xl
 */

import cn from '../helpers/cn' ;

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import { LG, MD, SM, XL, XS } from '../sizing/sizes' ;

// Sizes

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} RatingSize
 *
 * @typedef {Object} ResponsiveRatingSize
 * @property {RatingSize} [xs] - Default size (no breakpoint prefix).
 * @property {RatingSize} [sm]
 * @property {RatingSize} [md]
 * @property {RatingSize} [lg]
 * @property {RatingSize} [xl]
 * @property {RatingSize} [xxl]
 */

/**
 * Valid rating sizes.
 * @type {RatingSize[]}
 */
export const sizes = [ XS, SM, MD, LG, XL ] ;

/**
 * Generates responsive rating size classes (daisyUI 5.6).
 *
 * Accepts a scalar size or a breakpoint→size object ; `xs` is the prefix-less
 * default. Responsive classes are built at runtime, hence the `@safelist` above.
 *
 * @type {Function}
 */
export const getRatingSize = getResponsiveDefinition(
    create( 'rating-' ) ,
    value => sizes.includes( value )
) ;

export const RATING        = 'rating' ;
export const RATING_HALF   = 'rating-half' ;
export const RATING_HIDDEN = 'rating-hidden' ;

/**
 * Generates a DaisyUI rating className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {boolean} [props.half=false] - Enable half-star ratings.
 * @param {RatingSize | ResponsiveRatingSize} [props.size='md'] - Rating size (scalar or responsive object).
 *
 * @returns {string} The rating className expression.
 *
 * @example
 * ```js
 * getRatingClasses() ;
 * // → 'rating rating-md'
 *
 * getRatingClasses({ size: 'lg' }) ;
 * // → 'rating rating-lg'
 *
 * getRatingClasses({ size: { xs: 'sm', md: 'lg', xl: 'xl' } }) ;
 * // → 'rating rating-sm md:rating-lg xl:rating-xl'
 *
 * getRatingClasses({ half: true, size: 'xl' }) ;
 * // → 'rating rating-half rating-xl'
 * ```
 */
const getRatingClasses =
({
    after,
    before,
    beforeClassName,
    className,
    half = false,
    size = MD,
} = {} ) => cn
(
    beforeClassName,
    RATING,
    {
        ...before,

        ...half === true && { [ RATING_HALF ] : true } ,
        ...!!size        && getRatingSize( size ) ,

        ...after,
    },
    className,
) ;

export default getRatingClasses ;
