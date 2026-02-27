/**
 * Box shadow utilities for Tailwind CSS.
 *
 * @module themes/filters/shadow
 * @see https://tailwindcss.com/docs/box-shadow
 */

import applyIfDefined from '@/helpers/applyIfDefined' ;
import cn             from '@/themes/helpers/cn' ;

import getPseudoClassDefinition from '../helpers/getPseudoClassDefinition' ;

// Shadow sizes

export const XXS   = '2xs' ;
export const XS    = 'xs' ;
export const SM    = 'sm' ;
export const MD    = 'md' ;
export const LG    = 'lg' ;
export const XL    = 'xl' ;
export const XXL   = '2xl' ;
export const NONE  = 'none' ;

/**
 * @typedef {'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | true} ShadowValue
 */

/**
 * Valid shadow values.
 *
 * `true` generates the base `shadow` class (default shadow).
 *
 * @type {(string | boolean)[]}
 */
export const shadows = [ NONE , XXS , XS , SM , MD , LG , XL , XXL , true ] ;

/**
 * Creates a shadow class definition.
 *
 * @param {ShadowValue} value - The shadow size or true for default.
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Class prefix (e.g., 'hover:').
 * @param {boolean} [options.important=false] - Add important modifier.
 * @returns {Object} Class definition object.
 */
export const create = ( value , { prefix = '' , important = false } = {} ) =>
{
    const importantPrefix = important ? '!' : '' ;
    const className = value === true
        ? 'shadow'
        : `shadow-${ value }` ;

    return { [ prefix + importantPrefix + className ] : true } ;
} ;

/**
 * Generates pseudo-class shadow class definitions.
 *
 * @param {ShadowValue | import('../helpers/getPseudoClassDefinition').PseudoClassDefinition} value - Shadow or pseudo-class object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getShadow( true ) ;
 * // → { 'shadow': true }
 *
 * getShadow( 'lg' ) ;
 * // → { 'shadow-lg': true }
 *
 * getShadow( 'inner' ) ;
 * // → { 'shadow-inner': true }
 *
 * getShadow( { value: 'md' , hover: 'lg' , focus: 'xl' } ) ;
 * // → { 'shadow-md': true , 'hover:shadow-lg': true , 'focus:shadow-xl': true }
 * ```
 */
export const getShadow = getPseudoClassDefinition
(
    create ,
    value => shadows.includes( value )
) ;

/**
 * Generates shadow class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 * @param {boolean} [props.important] - Force important modifier.
 * @param {ShadowValue | import('../helpers/getPseudoClassDefinition').PseudoClassDefinition} [props.shadow] - Shadow value or pseudo-class object.
 *
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/box-shadow
 *
 * @example
 * ```js
 * getShadowClassNames( { shadow: 'lg' } ) ;
 * // → 'shadow-lg'
 *
 * getShadowClassNames( { shadow: true } ) ;
 * // → 'shadow'
 *
 * getShadowClassNames( { shadow: 'inner' } ) ;
 * // → 'shadow-inner'
 *
 * getShadowClassNames( { shadow: 'none' } ) ;
 * // → 'shadow-none'
 *
 * getShadowClassNames( {
 *     beforeClassName: 'rounded-lg p-4' ,
 *     shadow: { value: 'md' , hover: 'xl' }
 * } ) ;
 * // → 'rounded-lg p-4 shadow-md hover:shadow-xl'
 * ```
 */
export const getShadowClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,
     important ,
     shadow ,
 }
 = {} ) => cn
(
    beforeClassName ,
    {
        ...before ,
        ...applyIfDefined( getShadow , shadow , { important } ) ,
        ...after ,
    } ,
    className ,
) ;

export default getShadowClassNames ;

/* Tailwindcss safe list
| shadow       | hover:shadow       | focus:shadow       |
| shadow-none  | hover:shadow-none  | focus:shadow-none  |
| shadow-2xs   | hover:shadow-2xs   | focus:shadow-2xs   |
| shadow-xs    | hover:shadow-xs    | focus:shadow-xs    |
| shadow-sm    | hover:shadow-sm    | focus:shadow-sm    |
| shadow-md    | hover:shadow-md    | focus:shadow-md    |
| shadow-lg    | hover:shadow-lg    | focus:shadow-lg    |
| shadow-xl    | hover:shadow-xl    | focus:shadow-xl    |
| shadow-2xl   | hover:shadow-2xl   | focus:shadow-2xl   |
| shadow-inner | hover:shadow-inner | focus:shadow-inner |
*/