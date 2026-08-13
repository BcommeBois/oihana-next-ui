import getBackgroundColor from '../../colors/backgroundColor' ;

/**
 * Resolves a bar color into a class definition, or an inline style when the value is not a theme token.
 *
 * Semantic tokens come first : `'primary'` becomes `bg-primary` and follows the
 * DaisyUI theme. Anything else — a hex, an `oklch()`, a CSS variable — falls back
 * to an inline `backgroundColor`, which is the escape hatch for a bar that has to
 * match colors imposed elsewhere, typically a nivo chart sitting next to it.
 *
 * @param {string} [value] - A DaisyUI color token or any CSS color.
 *
 * @returns {{ definition : Object , style : Object | undefined }} The class definition and the inline style.
 *
 * @example
 * ```js
 * resolveBarColor( 'primary' ) ;
 * // → { definition : { 'bg-primary' : true } , style : undefined }
 *
 * resolveBarColor( '#4E79A7' ) ;
 * // → { definition : {} , style : { backgroundColor : '#4E79A7' } }
 * ```
 */
export const resolveBarColor = value =>
{
    if ( !value )
    {
        return { definition : {} , style : undefined } ;
    }

    const definition = getBackgroundColor( value ) ;

    if ( Object.keys( definition ).length > 0 )
    {
        return { definition , style : undefined } ;
    }

    return { definition : {} , style : { backgroundColor : value } } ;
} ;

export default resolveBarColor ;
