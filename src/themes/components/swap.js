/**
 * Swap class name generator for DaisyUI.
 *
 * @module themes/components/swap
 * @see https://daisyui.com/components/swap
 */

import cn from '../helpers/cn' ;

// Animations

export const FLIP   = 'flip' ;
export const ROTATE = 'rotate' ;

/**
 * @typedef {'flip' | 'rotate'} SwapAnimation
 */

export const animations = [ FLIP , ROTATE ] ;

const animationMap =
{
    [ FLIP   ] : 'swap-flip' ,
    [ ROTATE ] : 'swap-rotate' ,
} ;

export const SWAP               = 'swap' ;
export const SWAP_ACTIVE        = 'swap-active' ;
export const SWAP_INDETERMINATE = 'swap-indeterminate' ;
export const SWAP_ITEM          = 'flex items-center justify-center' ;
export const SWAP_ON            = 'swap-on' ;
export const SWAP_OFF           = 'swap-off' ;

/**
 * Generates a DaisyUI swap className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {boolean} [props.active] - Force active state via class.
 * @param {SwapAnimation} [props.animation='rotate'] - Swap animation.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.color] - The color of the swap element (text).
 * @param {boolean} [props.indeterminate] - Force indeterminate state via class.
 *
 * @returns {string} The swap className expression.
 *
 * @example
 * ```js
 * getSwapClassNames() ;
 * // → 'swap swap-rotate'
 *
 * getSwapClassNames({ animation: 'flip' }) ;
 * // → 'swap swap-flip'
 *
 * getSwapClassNames({ active: true }) ;
 * // → 'swap swap-rotate swap-active'
 *
 * getSwapClassNames({ indeterminate: true }) ;
 * // → 'swap swap-rotate swap-indeterminate'
 * ```
 */
const getSwapClassNames =
({
     active ,
     after ,
     animation = ROTATE ,
     before ,
     beforeClassName ,
     className ,
     color ,
     indeterminate ,
} = {} ) => cn
(
    beforeClassName ,
    SWAP ,
    {
        ...before ,

        ...!!animationMap[animation] && { [animationMap[animation]] : true } ,
        ...active === true           && { SWAP_ACTIVE               : true } ,
        ...indeterminate === true    && { SWAP_INDETERMINATE        : true } ,

        ...after ,
    } ,
    className ,
) ;

export default getSwapClassNames ;