/**
 * Dock class name generator for DaisyUI 5.
 *
 * Dock (a.k.a. bottom navigation / bottom bar) sticks to the bottom of the
 * screen. daisyUI's `.dock` is `position: fixed` by default; pass
 * `position: 'relative'` (or `'static'`) to embed it (e.g. in a demo frame).
 *
 * @module themes/components/dock
 * @see https://daisyui.com/components/dock
 *
 * @safelist
 * ## Sizes
 * - dock-xs | dock-sm | dock-md | dock-lg | dock-xl
 * - sm:dock-xs | sm:dock-sm | sm:dock-md | sm:dock-lg | sm:dock-xl
 * - md:dock-xs | md:dock-sm | md:dock-md | md:dock-lg | md:dock-xl
 * - lg:dock-xs | lg:dock-sm | lg:dock-md | lg:dock-lg | lg:dock-xl
 * - xl:dock-xs | xl:dock-sm | xl:dock-md | xl:dock-lg | xl:dock-xl
 * - 2xl:dock-xs | 2xl:dock-sm | 2xl:dock-md | 2xl:dock-lg | 2xl:dock-xl
 */

import cn from '../helpers/cn' ;

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import getPosition , { FIXED } from '../layout/position' ;

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

export const DOCK        = 'dock' ;
export const DOCK_LABEL  = 'dock-label' ;
export const DOCK_ACTIVE = 'dock-active' ;

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} DockSize
 */

/**
 * Available dock sizes.
 *
 * @type {DockSize[]}
 */
export const sizes = [ XS , SM , MD , LG , XL ] ;

/**
 * Generates responsive dock size classes.
 *
 * @type {Function}
 */
export const getDockSize = getResponsiveDefinition(
    create( 'dock-' ) ,
    value => sizes.includes( value )
) ;

/**
 * Generates a DaisyUI dock container className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {import('../layout/position').PositionValue} [props.position] - CSS position (default 'fixed'; use 'relative' to embed).
 * @param {DockSize | Object.<string, DockSize>} [props.size] - Dock size (xs, sm, md, lg, xl).
 *
 * @returns {string} The dock className expression.
 *
 * @example
 * ```js
 * getDockClasses() ;
 * // → 'dock fixed'
 *
 * getDockClasses({ size: 'lg' }) ;
 * // → 'dock dock-lg fixed'
 *
 * getDockClasses({ position: 'relative' , size: { xs: 'sm' , md: 'md' } }) ;
 * // → 'dock dock-sm md:dock-md relative'
 * ```
 */
export const getDockClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    position = FIXED ,
    size ,
}
= {} ) => cn
(
    beforeClassName ,
    DOCK ,
    {
        ...before ,

        ...( size && getDockSize( size ) ) ,
        ...getPosition( position ) ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a dock item (button / link) className expression.
 *
 * @param {Object} [props]
 * @param {boolean} [props.active] - Active state (adds `dock-active`).
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The dock item className expression.
 */
export const getDockItemClasses =
({
    active ,
    className ,
}
= {} ) => cn
(
    { [ DOCK_ACTIVE ] : !!active } ,
    className ,
) ;

export default getDockClasses ;
