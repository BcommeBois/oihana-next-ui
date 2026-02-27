import getPseudoClassDefinition from '../helpers/getPseudoClassDefinition' ;

import { SM , MD , LG , XL , XXL } from '../sizing/sizes' ;

export const INNER = 'inner' ;
export const NONE  = 'none'  ;

/**
 * Valid shadow size values.
 *
 * `true` generates the base `shadow` class (default shadow).
 *
 * @type {(string|boolean)[]}
 */
export const sizes = [ INNER , NONE , SM , MD , LG , XL , XXL , true ] ;

/**
 * Creates a shadow size class definition.
 *
 * @param {string|boolean} value - Shadow size value. `true` for default shadow.
 * @param {Object} [options]
 * @param {string} [options.prefix=''] - Pseudo-class prefix.
 *
 * @returns {Object} Class definition object.
 */
const createShadowSize = ( value , { prefix = '' } = {} ) =>
{
    return value === true
        ? { [ `${ prefix }shadow` ]             : true }
        : { [ `${ prefix }shadow-${ value }` ]  : true } ;
} ;

/**
 * Generates shadow size class definitions with pseudo-class support.
 *
 * @param {('inner'|'none'|'sm'|'md'|'lg'|'xl'|'2xl'|true)|Object} value - Shadow size or pseudo-class object.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/box-shadow
 *
 * @example
 * ```js
 * getShadowSize( true ) ;
 * // → { 'shadow': true }
 *
 * getShadowSize( 'lg' ) ;
 * // → { 'shadow-lg': true }
 *
 * getShadowSize( { value: 'md' , hover: 'lg' , focus: 'xl' } ) ;
 * // → { 'shadow-md': true , 'hover:shadow-lg': true , 'focus:shadow-xl': true }
 * ```
 */
const getShadowSize = getPseudoClassDefinition
(
    createShadowSize ,
    ( value ) => sizes.includes( value )
) ;

export default getShadowSize ;

/* Tailwindcss safe list
| --------Default-------- | --------Hover---------- | --------Focus---------- |
| shadow-sm              | hover:shadow-sm        | focus:shadow-sm        |
| shadow                 | hover:shadow           | focus:shadow           |
| shadow-md              | hover:shadow-md        | focus:shadow-md        |
| shadow-lg              | hover:shadow-lg        | focus:shadow-lg        |
| shadow-xl              | hover:shadow-xl        | focus:shadow-xl        |
| shadow-2xl             | hover:shadow-2xl       | focus:shadow-2xl       |
| shadow-inner           | hover:shadow-inner     | focus:shadow-inner     |
| shadow-none            | hover:shadow-none      | focus:shadow-none      |
*/