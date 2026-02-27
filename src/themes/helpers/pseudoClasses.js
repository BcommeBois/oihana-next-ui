/**
 * Tailwind CSS pseudo-class modifiers.
 *
 * @module themes/enums/pseudoClasses
 *
 * @example
 * ```js
 * import { HOVER , FOCUS } from '@/themes/enums/pseudoClasses' ;
 *
 * const className = `${ HOVER }:bg-primary ${ FOCUS }:ring-2` ;
 * // → 'hover:bg-primary focus:ring-2'
 * ```
 */

// State
export const ACTIVE        = 'active' ;
export const CHECKED       = 'checked' ;
export const DEFAULT       = 'default' ;
export const DISABLED      = 'disabled' ;
export const EMPTY         = 'empty' ;
export const ENABLED       = 'enabled' ;
export const FOCUS         = 'focus' ;
export const FOCUS_VISIBLE = 'focus-visible' ;
export const FOCUS_WITHIN  = 'focus-within' ;
export const HOVER         = 'hover' ;
export const INDETERMINATE = 'indeterminate' ;
export const OPEN          = 'open' ;
export const TARGET        = 'target' ;
export const VISITED       = 'visited' ;

// Form
export const AUTOFILL          = 'autofill' ;
export const IN_RANGE          = 'in-range' ;
export const INVALID           = 'invalid' ;
export const OUT_OF_RANGE      = 'out-of-range' ;
export const PLACEHOLDER_SHOWN = 'placeholder-shown' ;
export const READ_ONLY         = 'read-only' ;
export const REQUIRED          = 'required' ;
export const VALID             = 'valid' ;

// Position
export const EVEN          = 'even' ;
export const FIRST         = 'first' ;
export const FIRST_OF_TYPE = 'first-of-type' ;
export const LAST          = 'last' ;
export const LAST_OF_TYPE  = 'last-of-type' ;
export const ODD           = 'odd' ;
export const ONLY          = 'only' ;
export const ONLY_OF_TYPE  = 'only-of-type' ;

// Pseudo-elements
export const AFTER        = 'after' ;
export const BACKDROP     = 'backdrop' ;
export const BEFORE       = 'before' ;
export const FILE         = 'file' ;
export const FIRST_LETTER = 'first-letter' ;
export const FIRST_LINE   = 'first-line' ;
export const MARKER       = 'marker' ;
export const PLACEHOLDER  = 'placeholder' ;
export const SELECTION    = 'selection' ;

// Other
export const LINK  = 'link' ;
export const PRINT = 'print' ;

/**
 * @typedef {
 *   'active' | 'after' | 'autofill' | 'backdrop' | 'before' | 'checked' |
 *   'default' | 'disabled' | 'empty' | 'enabled' | 'even' | 'file' |
 *   'first' | 'first-letter' | 'first-line' | 'first-of-type' | 'focus' |
 *   'focus-visible' | 'focus-within' | 'hover' | 'indeterminate' |
 *   'in-range' | 'invalid' | 'last' | 'last-of-type' | 'link' | 'marker' |
 *   'odd' | 'only' | 'only-of-type' | 'open' | 'out-of-range' |
 *   'placeholder' | 'placeholder-shown' | 'print' | 'read-only' |
 *   'required' | 'selection' | 'target' | 'valid' | 'visited'
 * } PseudoClass
 */

/**
 * All available pseudo-class modifiers.
 * @type {PseudoClass[]}
 */
const pseudoClasses =
[
    // State
    ACTIVE ,
    CHECKED ,
    DEFAULT ,
    DISABLED ,
    EMPTY ,
    ENABLED ,
    FOCUS ,
    FOCUS_VISIBLE ,
    FOCUS_WITHIN ,
    HOVER ,
    INDETERMINATE ,
    OPEN ,
    TARGET ,
    VISITED ,

    // Form
    AUTOFILL ,
    IN_RANGE ,
    INVALID ,
    OUT_OF_RANGE ,
    PLACEHOLDER_SHOWN ,
    READ_ONLY ,
    REQUIRED ,
    VALID ,

    // Position
    EVEN ,
    FIRST ,
    FIRST_OF_TYPE ,
    LAST ,
    LAST_OF_TYPE ,
    ODD ,
    ONLY ,
    ONLY_OF_TYPE ,

    // Pseudo-elements
    AFTER ,
    BACKDROP ,
    BEFORE ,
    FILE ,
    FIRST_LETTER ,
    FIRST_LINE ,
    MARKER ,
    PLACEHOLDER ,
    SELECTION ,

    // Other
    LINK ,
    PRINT ,
] ;

export default pseudoClasses ;