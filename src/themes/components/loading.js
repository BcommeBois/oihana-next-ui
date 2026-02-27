/**
 * Loading class name generator for DaisyUI.
 *
 * @module themes/components/loading
 * @see https://daisyui.com/components/loading
 */

import cn from '../helpers/cn' ;

import getTextColor from '../colors/textColor' ;

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

// Animations

export const BALL     = 'ball' ;
export const BARS     = 'bars' ;
export const DOTS     = 'dots' ;
export const INFINITY = 'infinity' ;
export const RING     = 'ring' ;
export const SPINNER  = 'spinner' ;

/**
 * @typedef {'ball' | 'bars' | 'dots' | 'infinity' | 'ring' | 'spinner'} LoadingAnimation
 */

/**
 * Valid loading animations.
 * @type {LoadingAnimation[]}
 */
export const animations = [ BALL , BARS , DOTS , INFINITY , RING , SPINNER ] ;

const animationMap =
{
    [ BALL     ] : 'loading-ball' ,
    [ BARS     ] : 'loading-bars' ,
    [ DOTS     ] : 'loading-dots' ,
    [ INFINITY ] : 'loading-infinity' ,
    [ RING     ] : 'loading-ring' ,
    [ SPINNER  ] : 'loading-spinner' ,
} ;

// Sizes

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} LoadingSize
 */

/**
 * Valid loading sizes.
 * @type {LoadingSize[]}
 */
export const sizes = [ XS , SM , MD , LG , XL ] ;

const sizeMap =
{
    [ XS ] : 'loading-xs' ,
    [ SM ] : 'loading-sm' ,
    [ MD ] : 'loading-md' ,
    [ LG ] : 'loading-lg' ,
    [ XL ] : 'loading-xl' ,
} ;

export const LOADING = 'loading' ;

/**
 * Generates a DaisyUI loading className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {LoadingAnimation} [props.animation] - Loading animation style.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {import('../colors/textColor').TextColor} [props.color] - Text color.
 * @param {LoadingSize} [props.size] - Loading size.
 *
 * @returns {string} The loading className expression.
 *
 * @example
 * ```js
 * getLoadingClassNames({ animation: 'spinner' }) ;
 * // → 'loading loading-spinner'
 *
 * getLoadingClassNames({ animation: 'dots' , size: 'lg' , color: 'primary' }) ;
 * // → 'loading loading-dots loading-lg text-primary'
 *
 * getLoadingClassNames({ animation: 'ring' , size: 'xs' }) ;
 * // → 'loading loading-ring loading-xs'
 * ```
 */
const getLoadingClassNames =
({
    after ,
    animation ,
    before ,
    beforeClassName ,
    className ,
    color ,
    size ,
}
= {} ) => cn
(
    beforeClassName ,
    LOADING ,
    {
        ...before ,

        ...!!animationMap[animation] && { [animationMap[animation]] : true } ,
        ...!!sizeMap[size]           && { [sizeMap[size]]           : true } ,

        ...!!color && getTextColor( color ) ,

        ...after ,
    } ,
    className ,
) ;

export default getLoadingClassNames ;