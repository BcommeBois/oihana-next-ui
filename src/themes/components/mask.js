/**
 * Mask class name generator for DaisyUI 5.
 *
 * @module themes/components/mask
 * @see https://daisyui.com/components/mask
 */

import cn from '../helpers/cn' ;
import getBackgroundColor from '../colors/backgroundColor' ;

// Mask Shapes

export const CIRCLE      = 'circle' ;
export const DECAGON     = 'decagon' ;
export const DIAMOND     = 'diamond' ;
export const HEART       = 'heart' ;
export const HEXAGON     = 'hexagon' ;
export const HEXAGON_2   = 'hexagon-2' ;
export const PENTAGON    = 'pentagon' ;
export const SQUARE      = 'square' ;
export const SQUIRCLE    = 'squircle' ;
export const STAR        = 'star' ;
export const STAR_2      = 'star-2' ;
export const TRIANGLE    = 'triangle' ;
export const TRIANGLE_2  = 'triangle-2' ;
export const TRIANGLE_3  = 'triangle-3' ;
export const TRIANGLE_4  = 'triangle-4' ;

/**
 * @typedef {'circle' | 'decagon' | 'diamond' | 'heart' | 'hexagon' | 'hexagon-2' |
 *   'pentagon' | 'square' | 'squircle' | 'star' | 'star-2' |
 *   'triangle' | 'triangle-2' | 'triangle-3' | 'triangle-4'} MaskShape
 */

/**
 * Valid mask shapes.
 * @type {MaskShape[]}
 */
export const masks =
[
    CIRCLE,
    DECAGON,
    DIAMOND,
    HEART,
    HEXAGON,
    HEXAGON_2,
    PENTAGON,
    SQUARE,
    SQUIRCLE,
    STAR,
    STAR_2,
    TRIANGLE,
    TRIANGLE_2,
    TRIANGLE_3,
    TRIANGLE_4,
] ;

const maskMap =
{
    [ CIRCLE      ] : 'mask-circle',
    [ DECAGON     ] : 'mask-decagon',
    [ DIAMOND     ] : 'mask-diamond',
    [ HEART       ] : 'mask-heart',
    [ HEXAGON     ] : 'mask-hexagon',
    [ HEXAGON_2   ] : 'mask-hexagon-2',
    [ PENTAGON    ] : 'mask-pentagon',
    [ SQUARE      ] : 'mask-square',
    [ SQUIRCLE    ] : 'mask-squircle',
    [ STAR        ] : 'mask-star',
    [ STAR_2      ] : 'mask-star-2',
    [ TRIANGLE    ] : 'mask-triangle',
    [ TRIANGLE_2  ] : 'mask-triangle-2',
    [ TRIANGLE_3  ] : 'mask-triangle-3',
    [ TRIANGLE_4  ] : 'mask-triangle-4',
} ;

// Half Mask Modifiers

export const HALF_1 = 'half-1' ;
export const HALF_2 = 'half-2' ;

/**
 * @typedef {'half-1' | 'half-2'} MaskHalf
 */

/**
 * Valid mask half modifiers.
 * @type {MaskHalf[]}
 */
export const halves = [ HALF_1, HALF_2 ] ;

const halfMap =
{
    [ HALF_1 ] : 'mask-half-1',
    [ HALF_2 ] : 'mask-half-2',
} ;

export const MASK = 'mask' ;

/**
 * Generates a DaisyUI mask className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {import('../colors/backgroundColor').BackgroundColorValue} [props.color] - Background color.
 * @param {MaskHalf} [props.half] - Half mask modifier (half-1 or half-2).
 * @param {MaskShape} [props.shape] - Mask shape.
 *
 * @returns {string} The mask className expression.
 *
 * @example
 * ```js
 * getMaskClasses({ shape: 'star' }) ;
 * // → 'mask mask-star'
 *
 * getMaskClasses({ shape: 'star-2', color: 'primary' }) ;
 * // → 'mask mask-star-2 bg-primary'
 *
 * getMaskClasses({ shape: 'heart', color: 'error', half: 'half-1' }) ;
 * // → 'mask mask-heart mask-half-1 bg-error'
 * ```
 */
const getMaskClasses =
({
    after,
    before,
    beforeClassName,
    className,
    color,
    half,
    shape,
} = {} ) => cn
(
    beforeClassName,
    MASK,
    {
        ...before,

        ...!!maskMap[shape] && { [ maskMap[shape] ] : true } ,
        ...!!halfMap[half]  && { [ halfMap[half]  ] : true } ,

        ...!!color && getBackgroundColor( color ),

        ...after,
    },
    className,
) ;

export default getMaskClasses ;