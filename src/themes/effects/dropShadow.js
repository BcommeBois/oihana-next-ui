/**
 * Drop shadow utilities for Tailwind CSS.
 *
 * @module themes/filters/dropShadow
 * @see https://tailwindcss.com/docs/drop-shadow
 */

import applyIfDefined from '@/helpers/applyIfDefined' ;
import cn             from '@/themes/helpers/cn' ;

import getPseudoClassDefinition from '../helpers/getPseudoClassDefinition' ;

// Shadow sizes

export const NONE = 'none' ;
export const XS   = 'xs' ;
export const SM   = 'sm' ;
export const MD   = 'md' ;
export const LG   = 'lg' ;
export const XL   = 'xl' ;
export const XXL  = '2xl' ;

/**
 * @typedef {'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | true} DropShadowValue
 */

/**
 * Valid drop-shadow values.
 * @type {(string | boolean)[]}
 */
export const shadows = [ NONE , XS , SM , MD , LG , XL , XXL , true ] ;

/**
 * Creates a drop-shadow class definition.
 *
 * @param {DropShadowValue} value - The shadow size or true for default.
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Class prefix (e.g., 'hover:').
 * @param {boolean} [options.important=false] - Add important modifier.
 * @returns {Object} Class definition object.
 */
export const create = ( value , { prefix = '' , important = false } = {} ) =>
{
    const importantPrefix = important ? '!' : '' ;
    const className = value === true
        ? 'drop-shadow'
        : `drop-shadow-${ value }` ;

    return { [ prefix + importantPrefix + className ] : true } ;
} ;

/**
 * Generates pseudo-class drop-shadow class definitions.
 *
 * @param {DropShadowValue | import('../helpers/getPseudoClassDefinition').PseudoClassDefinition} value - Shadow or pseudo-class object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getDropShadow( 'lg' ) ;
 * // → { 'drop-shadow-lg': true }
 *
 * getDropShadow( true ) ;
 * // → { 'drop-shadow': true }
 *
 * getDropShadow( { value: true , hover: 'xl' } ) ;
 * // → { 'drop-shadow': true , 'hover:drop-shadow-xl': true }
 * ```
 */
export const getDropShadow = getPseudoClassDefinition
(
    create ,
    value => shadows.includes( value )
) ;

/**
 * Generates drop-shadow class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 * @param {boolean} [props.important] - Force important modifier.
 * @param {DropShadowValue | import('../helpers/getPseudoClassDefinition').PseudoClassDefinition} [props.shadow] - Shadow value or pseudo-class object.
 *
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/drop-shadow
 *
 * @example
 * ```js
 * getDropShadowClassNames( { shadow: 'lg' } ) ;
 * // → 'drop-shadow-lg'
 *
 * getDropShadowClassNames( { shadow: true } ) ;
 * // → 'drop-shadow'
 *
 * getDropShadowClassNames( { shadow: 'none' } ) ;
 * // → 'drop-shadow-none'
 *
 * getDropShadowClassNames( {
 *     beforeClassName: 'w-64 h-32 bg-white rounded-full' ,
 *     shadow: { value: true , hover: 'xl' }
 * } ) ;
 * // → 'w-64 h-32 bg-white rounded-full drop-shadow hover:drop-shadow-xl'
 * ```
 */
export const getDropShadowClassNames =
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
        ...applyIfDefined( getDropShadow , shadow , { important } ) ,
        ...after ,
    } ,
    className ,
) ;

export default getDropShadowClassNames ;

/* Tailwindcss safe list
| drop-shadow       | hover:drop-shadow       | focus:drop-shadow       |
| drop-shadow-none  | hover:drop-shadow-none  | focus:drop-shadow-none  |
| drop-shadow-xs    | hover:drop-shadow-xs    | focus:drop-shadow-xs    |
| drop-shadow-sm    | hover:drop-shadow-sm    | focus:drop-shadow-sm    |
| drop-shadow-md    | hover:drop-shadow-md    | focus:drop-shadow-md    |
| drop-shadow-lg    | hover:drop-shadow-lg    | focus:drop-shadow-lg    |
| drop-shadow-xl    | hover:drop-shadow-xl    | focus:drop-shadow-xl    |
| drop-shadow-2xl   | hover:drop-shadow-2xl   | focus:drop-shadow-2xl   |
*/