/**
 * Inset shadow utilities for Tailwind CSS v4.
 *
 * @module themes/filters/insetShadow
 * @see https://tailwindcss.com/docs/box-shadow#inset-shadows
 */

import applyIfDefined from '../../helpers/applyIfDefined' ;
import cn             from '../helpers/cn' ;

import getPseudoClassDefinition from '../helpers/getPseudoClassDefinition' ;

// Inset shadow sizes

export const NONE = 'none' ;
export const XXS  = '2xs' ;
export const XS   = 'xs' ;
export const SM   = 'sm' ;

/**
 * @typedef {'none' | '2xs' | 'xs' | 'sm'} InsetShadowValue
 */

export const insetShadows = [ NONE , XXS , XS , SM ] ;

export const create = ( value , { prefix = '' , important = false } = {} ) =>
{
    const importantPrefix = important ? '!' : '' ;
    const className = `inset-shadow-${ value }` ;

    return { [ prefix + importantPrefix + className ] : true } ;
} ;

export const getInsetShadow = getPseudoClassDefinition
(
    create ,
    value => insetShadows.includes( value )
) ;

export const getInsetShadowClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,
     important ,
     insetShadow ,
 }
 = {} ) => cn
(
    beforeClassName ,
    {
        ...before ,
        ...applyIfDefined( getInsetShadow , insetShadow , { important } ) ,
        ...after ,
    } ,
    className ,
) ;

export default getInsetShadowClassNames ;

/* Tailwind CSS v4 safe list
| inset-shadow-none | hover:inset-shadow-none | focus:inset-shadow-none |
| inset-shadow-2xs  | hover:inset-shadow-2xs  | focus:inset-shadow-2xs  |
| inset-shadow-xs   | hover:inset-shadow-xs   | focus:inset-shadow-xs   |
| inset-shadow-sm   | hover:inset-shadow-sm   | focus:inset-shadow-sm   |
*/