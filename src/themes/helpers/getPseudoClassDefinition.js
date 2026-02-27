import isPlainObject from 'vegas-js-core/src/isPlainObject' ;
import notEmpty      from 'vegas-js-core/src/strings/notEmpty' ;

import * as pseudoClasses from './pseudoClasses' ;

/**
 * Mapping between property names and pseudo-class prefixes.
 * @type {Object.<string, string>}
 */
const PSEUDO_CLASS_MAP =
{
    active           : pseudoClasses.ACTIVE ,
    after            : pseudoClasses.AFTER ,
    autoFill         : pseudoClasses.AUTOFILL ,
    before           : pseudoClasses.BEFORE ,
    checked          : pseudoClasses.CHECKED ,
    disabled         : pseudoClasses.DISABLED ,
    empty            : pseudoClasses.EMPTY ,
    enabled          : pseudoClasses.ENABLED ,
    even             : pseudoClasses.EVEN ,
    file             : pseudoClasses.FILE ,
    first            : pseudoClasses.FIRST ,
    firstLetter      : pseudoClasses.FIRST_LETTER ,
    firstLine        : pseudoClasses.FIRST_LINE ,
    firstOfType      : pseudoClasses.FIRST_OF_TYPE ,
    focus            : pseudoClasses.FOCUS ,
    focusVisible     : pseudoClasses.FOCUS_VISIBLE ,
    focusWithin      : pseudoClasses.FOCUS_WITHIN ,
    hover            : pseudoClasses.HOVER ,
    indeterminate    : pseudoClasses.INDETERMINATE ,
    inRange          : pseudoClasses.IN_RANGE ,
    invalid          : pseudoClasses.INVALID ,
    isDefault        : pseudoClasses.DEFAULT ,
    last             : pseudoClasses.LAST ,
    lastOfType       : pseudoClasses.LAST_OF_TYPE ,
    link             : pseudoClasses.LINK ,
    marker           : pseudoClasses.MARKER ,
    odd              : pseudoClasses.ODD ,
    only             : pseudoClasses.ONLY ,
    onlyOfType       : pseudoClasses.ONLY_OF_TYPE ,
    outOfRange       : pseudoClasses.OUT_OF_RANGE ,
    placeholder      : pseudoClasses.PLACEHOLDER ,
    placeholderShown : pseudoClasses.PLACEHOLDER_SHOWN ,
    print            : pseudoClasses.PRINT ,
    readOnly         : pseudoClasses.READ_ONLY ,
    required         : pseudoClasses.REQUIRED ,
    selection        : pseudoClasses.SELECTION ,
    target           : pseudoClasses.TARGET ,
    valid            : pseudoClasses.VALID ,
    visited          : pseudoClasses.VISITED ,
} ;

/**
 * Creates a pseudo-class definition generator.
 *
 * @param {Function} create - Function to create the class definition.
 * @param {Function} [validator=notEmpty] - Function to validate values.
 * @returns {Function} A function that generates pseudo-class definitions.
 *
 * @example
 * ```js
 * const getColor = getPseudoClassDefinition( createColorClass ) ;
 *
 * // Simple value
 * getColor( 'primary' ) ;
 * // → { 'text-primary': true }
 *
 * // With pseudo-classes
 * getColor( { value: 'primary' , hover: 'secondary' } ) ;
 * // → { 'text-primary': true , 'hover:text-secondary': true }
 * ```
 */
export const getPseudoClassDefinition = ( create , validator = notEmpty ) => ( value , options = {} ) =>
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

    // Object with pseudo-class definitions
    const result = {} ;
    const { value: defaultValue , ...pseudoValues } = value ;

    // Default value (no prefix)
    if ( defaultValue && validator( defaultValue ) )
    {
        Object.assign( result , create( defaultValue , options ) ) ;
    }

    // Pseudo-class values
    Object.entries( pseudoValues ).forEach( ( [ key , val ] ) =>
    {
        const pseudoClass = PSEUDO_CLASS_MAP[ key ] ;

        if ( pseudoClass && val && validator( val ) )
        {
            Object.assign( result , create( val , { ...options , prefix: pseudoClass + ':' } ) ) ;
        }
    } ) ;

    return result ;
} ;

/**
 * Creates a pseudo-class factory for a CSS definition.
 *
 * @param {string} [def=''] - The CSS class prefix (e.g., 'text-', 'bg-').
 * @returns {Function} A function that creates class definitions.
 *
 * @example
 * ```js
 * const createTextColor = createPseudoClass( 'text-' ) ;
 *
 * createTextColor( 'primary' ) ;
 * // → { 'text-primary': true }
 *
 * createTextColor( 'primary' , { prefix: 'hover:' } ) ;
 * // → { 'hover:text-primary': true }
 *
 * createTextColor( 'primary' , { prefix: 'hover:' , important: true } ) ;
 * // → { 'hover:!text-primary': true }
 * ```
 */
export const createPseudoClass = ( def = '' ) => ( value , { prefix = '' , important = false } = {} ) =>
{
    const importantPrefix = important ? '!' : '' ;
    return { [ prefix + importantPrefix + def + value ]: true } ;
} ;

export default getPseudoClassDefinition ;