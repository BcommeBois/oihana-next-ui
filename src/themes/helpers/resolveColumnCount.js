import isPlainObject from 'vegas-js-core/src/isPlainObject' ;

/**
 * Resolves the current column count from a plain number or a responsive
 * columns object (`{ xs , sm , md , lg , xl , xxl }`), cascading from the
 * active breakpoint down to `xs`.
 *
 * @param {number|Object} columns - Number of columns or responsive object.
 * @param {Object} [breakpoints] - Active breakpoint flags (from useBreakpoints).
 * @param {boolean} [breakpoints.sm]
 * @param {boolean} [breakpoints.md]
 * @param {boolean} [breakpoints.lg]
 * @param {boolean} [breakpoints.xl]
 * @param {boolean} [breakpoints.xxl]
 *
 * @returns {number} The resolved column count (defaults to 1).
 *
 * @example
 * ```js
 * resolveColumnCount( 3 ) ;
 * // → 3
 *
 * resolveColumnCount( { xs: 1 , md: 2 , xxl: 4 } , { md: true } ) ;
 * // → 2
 * ```
 */
const resolveColumnCount = ( columns , { sm , md , lg , xl , xxl } = {} ) =>
{
    if ( !isPlainObject( columns ) )
    {
        return columns || 1 ;
    }

    if ( xxl )
    {
        return columns?.xxl ?? columns?.xl ?? columns?.lg ?? columns?.md ?? columns?.sm ?? columns?.xs ?? 1 ;
    }

    if ( xl )
    {
        return columns?.xl ?? columns?.lg ?? columns?.md ?? columns?.sm ?? columns?.xs ?? 1 ;
    }

    if ( lg )
    {
        return columns?.lg ?? columns?.md ?? columns?.sm ?? columns?.xs ?? 1 ;
    }

    if ( md )
    {
        return columns?.md ?? columns?.sm ?? columns?.xs ?? 1 ;
    }

    if ( sm )
    {
        return columns?.sm ?? columns?.xs ?? 1 ;
    }

    return columns?.xs ?? 1 ;
} ;

export default resolveColumnCount ;
