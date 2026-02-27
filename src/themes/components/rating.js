/**
 * Rating class name generator for DaisyUI 5.
 *
 * @module themes/components/rating
 * @see https://daisyui.com/components/rating
 */

import cn from '../helpers/cn' ;
import { LG, MD, SM, XL, XS } from '../sizing/sizes' ;

// Sizes

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} RatingSize
 */

/**
 * Valid rating sizes.
 * @type {RatingSize[]}
 */
export const sizes = [ XS, SM, MD, LG, XL ] ;

const sizeMap =
{
    [ XS ] : 'rating-xs',
    [ SM ] : 'rating-sm',
    [ MD ] : 'rating-md',
    [ LG ] : 'rating-lg',
    [ XL ] : 'rating-xl',
} ;

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
 * @param {RatingSize} [props.size='md'] - Rating size.
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

        ...half === true     && { [ RATING_HALF ] : true } ,
        ...!!sizeMap[size]   && { [ sizeMap[size] ] : true } ,

        ...after,
    },
    className,
) ;

export default getRatingClasses ;