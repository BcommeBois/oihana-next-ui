import isPlainObject from 'vegas-js-core/src/isPlainObject' ;
import notEmpty      from 'vegas-js-core/src/strings/notEmpty' ;

import { LG , MD , SM , XL , XXL } from '../enums/breakpoints' ;

/**
 * Mapping between property names and breakpoint prefixes.
 * @type {Object.<string, string | null>}
 */
const BREAKPOINT_MAP =
{
    xs  : null ,  // No prefix for mobile-first default
    sm  : SM ,
    md  : MD ,
    lg  : LG ,
    xl  : XL ,
    xxl : XXL ,
} ;

/**
 * Creates a responsive class definition generator.
 *
 * @param {Function} create - Function to create the class definition.
 * @param {Function} [validator=notEmpty] - Function to validate values.
 * @returns {Function} A function that generates responsive class definitions.
 *
 * @example
 * ```js
 * const createWidth = create( 'w-' ) ;
 * const getWidth = getResponsiveDefinition( createWidth ) ;
 *
 * // Simple value
 * getWidth( 'full' ) ;
 * // → { 'w-full': true }
 *
 * // Responsive values
 * getWidth( { xs: 'full' , md: '1/2' , lg: '1/3' } ) ;
 * // → { 'w-full': true , 'md:w-1/2': true , 'lg:w-1/3': true }
 * ```
 */
export const getResponsiveDefinition = ( create , validator = notEmpty ) => ( value , options = {} ) =>
{
    if ( !( create instanceof Function ) )
    {
        return {} ;
    }

    // Simple value
    if ( !isPlainObject( value ) )
    {
        if ( validator( value ) )
        {
            return create( value , options ) ;
        }
        return {} ;
    }

    // Responsive object
    const result = {} ;

    Object.entries( BREAKPOINT_MAP ).forEach( ( [ key , breakpoint ] ) =>
    {
        const val = value[ key ] ;

        if ( val && validator( val ) )
        {
            const prefix = breakpoint ? breakpoint + ':' : '' ;
            Object.assign( result , create( val , { ...options , prefix } ) ) ;
        }
    } ) ;

    return result ;
} ;

/**
 * Creates a class factory for a CSS definition.
 *
 * @param {string} [def=''] - The CSS class prefix (e.g., 'w-', 'h-').
 * @returns {Function} A function that creates class definitions.
 *
 * @example
 * ```js
 * const createWidth = create( 'w-' ) ;
 *
 * createWidth( 'full' ) ;
 * // → { 'w-full': true }
 *
 * createWidth( '1/2' , { prefix: 'md:' } ) ;
 * // → { 'md:w-1/2': true }
 *
 * createWidth( 'full' , { important: true } ) ;
 * // → { '!w-full': true }
 * ```
 */
export const create = ( def = '' ) => ( value , { prefix = '' , important = false } = {} ) =>
{
    const importantPrefix = important ? '!' : '' ;
    return { [ prefix + importantPrefix + def + value ]: true } ;
} ;

export default getResponsiveDefinition ;