/**
 * Small breakpoint key.
 * @type {string}
 */
export const SM = 'sm' ;

/**
 * Medium breakpoint key.
 * @type {string}
 */
export const MD = 'md' ;

/**
 * Large breakpoint key.
 * @type {string}
 */
export const LG = 'lg' ;

/**
 * Extra large breakpoint key.
 * @type {string}
 */
export const XL = 'xl' ;

/**
 * 2x Extra large breakpoint key.
 * @type {string}
 */
export const XXL = '2xl' ;

/**
 * @typedef {'sm' | 'md' | 'lg' | 'xl' | '2xl'} BreakpointKey
 */

/**
 * Ordered list of breakpoint keys (smallest to largest).
 * @type {BreakpointKey[]}
 */
export const breakpointsKeys = [ SM , MD , LG , XL , XXL ] ;

/**
 * Tailwind CSS breakpoints mapping.
 * @type {Object.<BreakpointKey, string>}
 */
export const breakpoints =
{
    [ SM  ] : '640px' ,
    [ MD  ] : '768px' ,
    [ LG  ] : '1024px' ,
    [ XL  ] : '1280px' ,
    [ XXL ] : '1536px' ,
} ;

/**
 * Returns all breakpoint keys.
 *
 * @returns {BreakpointKey[]} Array of breakpoint keys.
 *
 * @example
 * ```js
 * getKeys() ; // [ 'sm' , 'md' , 'lg' , 'xl' , '2xl' ]
 * ```
 */
export const getKeys = () => Object.keys( breakpoints ) ;

/**
 * Gets the width value for a breakpoint.
 *
 * @param {BreakpointKey} key - The breakpoint key.
 * @returns {string | null} The width value or null if not found.
 *
 * @example
 * ```js
 * get( 'md' ) ; // '768px'
 * get( 'unknown' ) ; // null
 * ```
 */
export const get = ( key ) => breakpoints?.[ key ] ?? null ;

/**
 * Checks if a breakpoint exists.
 *
 * @param {string} key - The breakpoint key.
 * @returns {boolean} True if the breakpoint exists.
 *
 * @example
 * ```js
 * has( 'md' ) ; // true
 * has( 'unknown' ) ; // false
 * ```
 */
export const has = ( key ) => !!breakpoints?.[ key ] ;

/**
 * Adds or updates a breakpoint.
 *
 * ⚠️ Mutates the breakpoints object.
 *
 * @param {string} key - The breakpoint key.
 * @param {string} width - The width value (e.g., '640px').
 *
 * @example
 * ```js
 * set( '3xl' , '1792px' ) ;
 * ```
 */
export const set = ( key , width ) =>
{
    breakpoints[ key ] = width ;
} ;

export default breakpoints ;