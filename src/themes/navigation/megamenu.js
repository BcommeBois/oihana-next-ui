/**
 * Megamenu class name generator for DaisyUI 5.6.
 *
 * Megamenu is a large horizontal menu where each item opens a popover. It is
 * built on the native HTML popover API and CSS anchor positioning, so the
 * anchoring is handled entirely by DaisyUI's CSS — this generator only composes
 * the class modifiers (width, size, vertical).
 *
 * @module themes/navigation/megamenu
 * @see https://daisyui.com/components/megamenu
 *
 * @safelist
 * ## Sizes
 * - megamenu-xs | megamenu-sm | megamenu-md | megamenu-lg | megamenu-xl
 * ## Width
 * - megamenu-wide | megamenu-full
 * ## Direction
 * - megamenu-vertical | max-sm:megamenu-vertical
 */

import cn from '../helpers/cn' ;

import { LG, MD, SM, XL, XS } from '../sizing/sizes' ;

export const MEGAMENU        = 'megamenu' ;
export const MEGAMENU_ACTIVE = 'megamenu-active' ;

// Width

/**
 * @typedef {'wide' | 'full'} MegamenuWidth
 */

export const WIDE = 'wide' ;
export const FULL = 'full' ;

/**
 * Valid megamenu width modifiers.
 * @type {MegamenuWidth[]}
 */
export const widths = [ WIDE, FULL ] ;

const widthMap =
{
    [ WIDE ] : 'megamenu-wide',
    [ FULL ] : 'megamenu-full',
} ;

// Sizes

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} MegamenuSize
 */

/**
 * Valid megamenu sizes.
 * @type {MegamenuSize[]}
 */
export const sizes = [ XS, SM, MD, LG, XL ] ;

const sizeMap =
{
    [ XS ] : 'megamenu-xs',
    [ SM ] : 'megamenu-sm',
    [ MD ] : 'megamenu-md',
    [ LG ] : 'megamenu-lg',
    [ XL ] : 'megamenu-xl',
} ;

// Direction

export const MEGAMENU_VERTICAL        = 'megamenu-vertical' ;
export const MEGAMENU_VERTICAL_MAX_SM = 'max-sm:megamenu-vertical' ;

/**
 * Generates megamenu container class names for DaisyUI 5.6.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {boolean} [props.responsive=false] - Show vertically on small screens (`max-sm:megamenu-vertical`).
 * @param {MegamenuSize} [props.size='md'] - Megamenu size (xs, sm, md, lg, xl).
 * @param {boolean} [props.vertical=false] - Always vertical (`megamenu-vertical`).
 * @param {MegamenuWidth} [props.width] - Width modifier ('wide' | 'full').
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getMegamenuClasses({ width: 'wide', size: 'lg' }) ;
 * // → 'megamenu megamenu-wide megamenu-lg'
 *
 * getMegamenuClasses({ responsive: true }) ;
 * // → 'megamenu megamenu-md max-sm:megamenu-vertical'
 * ```
 */
export const getMegamenuClasses =
({
    after,
    before,
    beforeClassName,
    className,
    responsive = false,
    size = MD,
    vertical = false,
    width,
}
= {} ) => cn
(
    beforeClassName,
    MEGAMENU,
    {
        ...before,

        ...!!widthMap[width] && { [ widthMap[width] ] : true },
        ...!!sizeMap[size]   && { [ sizeMap[size]   ] : true },

        [ MEGAMENU_VERTICAL        ] : vertical   === true,
        [ MEGAMENU_VERTICAL_MAX_SM ] : responsive === true,

        ...after,
    },
    className,
) ;

export default getMegamenuClasses ;
