/**
 * Menu class name generator for DaisyUI menus.
 *
 * @module themes/navigation/menu
 *
 * @safelist
 * ## Orientations
 * - menu-horizontal
 * - sm:menu-horizontal | md:menu-horizontal | lg:menu-horizontal | xl:menu-horizontal | 2xl:menu-horizontal
 * - menu-vertical
 * - sm:menu-vertical | md:menu-vertical | lg:menu-vertical | xl:menu-vertical | 2xl:menu-vertical
 *
 * ## Sizes
 * - menu-xs | menu-sm | menu-md | menu-lg
 * - sm:menu-xs | sm:menu-sm | sm:menu-md | sm:menu-lg
 * - md:menu-xs | md:menu-sm | md:menu-md | md:menu-lg
 * - lg:menu-xs | lg:menu-sm | lg:menu-md | lg:menu-lg
 * - xl:menu-xs | xl:menu-sm | xl:menu-md | xl:menu-lg
 * - 2xl:menu-xs | 2xl:menu-sm | 2xl:menu-md | 2xl:menu-lg
 */

import cn from '../helpers/cn' ;

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import { LG , MD , SM , XS } from '../sizing/sizes' ;

import orientations from '../enums/orientations' ;

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg'} MenuSize
 * @typedef {'horizontal' | 'vertical'} MenuOrientation
 */

/**
 * Available menu sizes.
 *
 * @type {MenuSize[]}
 */
export const sizes = [ XS , SM , MD , LG ] ;

/**
 * Generates responsive menu orientation classes.
 *
 * @type {Function}
 */
export const getMenuOrientation = getResponsiveDefinition(
    create( 'menu-' ) ,
    value => orientations.includes( value )
) ;

/**
 * Generates responsive menu size classes.
 *
 * @type {Function}
 */
export const getMenuSize = getResponsiveDefinition(
    create( 'menu-' ) ,
    value => sizes.includes( value )
) ;

/**
 * Generates menu class names with orientation and size support.
 *
 * @param {Object} [props={}] - Menu properties.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {MenuOrientation | Object.<string, MenuOrientation>} [props.orientation] - Menu orientation (horizontal, vertical).
 * @param {MenuSize | Object.<string, MenuSize>} [props.size] - Menu size (xs, sm, md, lg).
 *
 * @returns {string} The composed menu class name string.
 *
 * @example
 * ```js
 * getMenuClasses({ orientation: 'horizontal' , size: 'md' }) ;
 * // → 'menu menu-horizontal menu-md'
 *
 * getMenuClasses({ orientation: { xs: 'vertical' , md: 'horizontal' } }) ;
 * // → 'menu menu-vertical md:menu-horizontal'
 *
 * getMenuClasses({ size: { xs: 'sm' , lg: 'lg' } , className: 'bg-base-200' }) ;
 * // → 'menu menu-sm lg:menu-lg bg-base-200'
 * ```
 */
export const getMenuClasses =
({
    beforeClassName ,
    className ,
    orientation ,
    size ,
}
= {} ) => cn
(
    'menu' ,
    beforeClassName ,
    orientation && getMenuOrientation( orientation ) ,
    size && getMenuSize( size ) ,
    className ,
) ;

export default getMenuClasses ;