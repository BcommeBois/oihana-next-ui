import cn from '../helpers/cn' ;

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

// Indicators

export const OFFLINE = 'offline' ;
export const ONLINE  = 'online' ;

/**
 * @typedef {'offline' | 'online'} AvatarIndicator
 */

export const indicators = [ OFFLINE , ONLINE ] ;

const indicatorMap =
{
    [ OFFLINE ] : 'avatar-offline' ,
    [ ONLINE  ] : 'avatar-online' ,
} ;

export const AVATAR = 'avatar' ;

// Initials

/**
 * The fills an avatar picks from when it has initials to show and nothing else.
 *
 * 🔑 **The seven pairs daisyUI guarantees**, each a background and the ink
 * daisyUI defines for it — so a theme decides what they look like and the
 * contrast is never computed here. They are LITERAL class names : interpolated
 * from a token, Tailwind would emit none of them.
 *
 * An application wanting its own look passes a `palette` of its own. Gathered
 * from one that had written this very table, seven rows, same order.
 *
 * @type {string[]}
 */
export const INITIALS_PALETTE =
[
    'bg-primary text-primary-content' ,
    'bg-secondary text-secondary-content' ,
    'bg-accent text-accent-content' ,
    'bg-info text-info-content' ,
    'bg-success text-success-content' ,
    'bg-warning text-warning-content' ,
    'bg-error text-error-content' ,
] ;

/**
 * How big the round box is, and how big its letters read.
 *
 * ⚠️ **`px` is not decoration** : it is what `next/image` is given as the
 * intrinsic size, since `Picture` sets no `sizes` attribute and `fill` would
 * warn without one. daisyUI then makes the image fill its box on its own —
 * `.avatar img` is `width:100%; height:100%; object-fit:cover`, and it out-ranks
 * a width utility, being a class AND a type selector.
 *
 * @type {Object<string,{ box : string , px : number }>}
 */
export const INITIALS_SIZES =
{
    [ XS ] : { box : 'size-8 text-xs'   , px : 32 } ,
    [ SM ] : { box : 'size-10 text-sm'  , px : 40 } ,
    [ MD ] : { box : 'size-12 text-base', px : 48 } ,
    [ LG ] : { box : 'size-16 text-xl'  , px : 64 } ,
    [ XL ] : { box : 'size-20 text-2xl' , px : 80 } ,
} ;

/**
 * Valid initials-avatar sizes.
 * @type {string[]}
 */
export const sizes = [ XS , SM , MD , LG , XL ] ;

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} AvatarSize
 */

/**
 * The box of an initials avatar, for a given size.
 *
 * @param {string} [size='md'] - One of the five sizes.
 *
 * @returns {{ box : string , px : number }} Its classes and its pixel size.
 *
 * @example
 * ```js
 * getInitialsScale( 'sm' ) ; // → { box : 'size-10 text-sm' , px : 40 }
 * ```
 */
export const getInitialsScale = ( size = MD ) => INITIALS_SIZES[ size ] ?? INITIALS_SIZES[ MD ] ;

/**
 * Generates a DaisyUI avatar className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {AvatarIndicator} [props.indicator] - Online/offline indicator.
 * @param {boolean} [props.placeholder] - Show letter placeholder.
 *
 * @returns {string} The avatar className expression.
 */
export const getAvatarClassNames = ({
    after,
    before,
    beforeClassName,
    className,
    indicator,
    placeholder,
} = {} ) => cn(
    beforeClassName,
    AVATAR,
    {
        ...before,

        ...!!indicatorMap[indicator] && { [ indicatorMap[indicator] ] : true } ,
        ...placeholder === true      && { 'avatar-placeholder'      : true } ,

        ...after,
    },
    className,
) ;

export default getAvatarClassNames ;