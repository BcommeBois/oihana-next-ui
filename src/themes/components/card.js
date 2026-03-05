/**
 * Card class name generator for DaisyUI 5.
 *
 * @module themes/components/card
 * @see https://daisyui.com/components/card
 *
 * @safelist
 * ## Sizes
 * - card-xs | card-sm | card-md | card-lg | card-xl
 *
 * ## Styles
 * - card-border | card-dash
 *
 * ## Modifiers
 * - card-side | image-full
 */

import cn from '../helpers/cn' ;

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} CardSize
 * @typedef {'border' | 'dash'} CardStyle
 */

// ---- Sizes

export { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

/**
 * Valid card sizes.
 * @type {CardSize[]}
 */
export const sizes = [ XL , LG , MD , SM , XS ] ;

/**
 * Card size class mapping.
 * @type {Object.<CardSize, string>}
 */
const sizeMap =
{
    [ XL ] : 'card-xl' ,
    [ LG ] : 'card-lg' ,
    [ MD ] : 'card-md' ,
    [ SM ] : 'card-sm' ,
    [ XS ] : 'card-xs' ,
} ;

// ---- Styles

export const BORDER = 'border' ;
export const DASH   = 'dash' ;

/**
 * Valid card styles.
 * @type {CardStyle[]}
 */
export const styles = [ BORDER , DASH ] ;

/**
 * Card style class mapping.
 * @type {Object.<CardStyle, string>}
 */
const styleMap =
{
    [ BORDER ] : 'card-border' ,
    [ DASH   ] : 'card-dash' ,
} ;

// ---- Base class

export const CARD = 'card' ;

/**
 * Generates a DaisyUI card className expression.
 *
 * @param {Object}   [props={}]
 * @param {string}   [props.beforeClassName] - ClassName to prepend.
 * @param {string}   [props.className]       - ClassName to append.
 * @param {boolean}  [props.imageFull]       - Makes the figure image a full background (image-full).
 * @param {CardSize} [props.size]            - Card size variant.
 * @param {boolean}  [props.side]            - Places the figure image on the side (card-side).
 * @param {CardStyle}[props.style]           - Card border style variant.
 *
 * @returns {string} The card className expression.
 *
 * @example
 * ```js
 * getCardClassNames() ;
 * // → 'card'
 *
 * getCardClassNames({ size: 'sm' , style: 'border' }) ;
 * // → 'card card-sm card-border'
 *
 * getCardClassNames({ side: true }) ;
 * // → 'card card-side'
 *
 * getCardClassNames({ imageFull: true , size: 'lg' }) ;
 * // → 'card card-lg image-full'
 * ```
 */
const getCardClassNames =
({
     beforeClassName ,
     className ,
     imageFull ,
     size ,
     side ,
     style ,
 }
 = {} ) => cn
(
    beforeClassName ,
    CARD ,
    size      && sizeMap[ size ]   ,
    style     && styleMap[ style ] ,
    side      && 'card-side'       ,
    imageFull && 'image-full'      ,
    className ,
) ;

export default getCardClassNames ;