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
 * The count pill of a dock item, on top of the `Badge` it is drawn with.
 * @type {string}
 */
export const DOCK_BADGE = 'border-0 font-bold tabular-nums' ;

/**
 * The round of a featured item : the screen's main action, raised above the
 * dock's top edge.
 * @type {string}
 */
export const DOCK_FEATURED = 'grid size-12 -mt-5 place-items-center rounded-full shadow-md' ;

/**
 * The fill and ink of the featured round, one per daisyUI colour — written out
 * in full so that Tailwind finds them.
 * @type {Object<string,string>}
 */
export const DOCK_FEATURED_COLORS =
{
    accent    : 'bg-accent text-accent-content' ,
    error     : 'bg-error text-error-content' ,
    info      : 'bg-info text-info-content' ,
    neutral   : 'bg-neutral text-neutral-content' ,
    primary   : 'bg-primary text-primary-content' ,
    secondary : 'bg-secondary text-secondary-content' ,
    success   : 'bg-success text-success-content' ,
    warning   : 'bg-warning text-warning-content' ,
} ;

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

/**
 * Generates the className of a featured item's round.
 *
 * @param {Object} [props]
 * @param {string} [props.color='primary'] - One of the eight daisyUI colours ; an unknown one falls back to `primary`.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The round's className expression.
 *
 * @example
 * ```js
 * getDockFeaturedClasses() ;
 * // → 'grid size-12 -mt-5 place-items-center rounded-full shadow-md bg-primary text-primary-content'
 * ```
 */
export const getDockFeaturedClasses =
({
    color = 'primary' ,
    className ,
}
= {} ) => cn
(
    DOCK_FEATURED ,
    DOCK_FEATURED_COLORS[ color ] ?? DOCK_FEATURED_COLORS.primary ,
    className ,
) ;

export default getDockClasses ;
