/**
 * Resolves a colour into a class definition, or into an inline style when the value is
 * not a theme token.
 *
 * This is the rule the whole `metrics` group runs on : a DaisyUI token follows the theme
 * and needs no dark-mode variant, while anything else — a hex, an `oklch()`, a CSS
 * variable — is the escape hatch for matching colours imposed elsewhere, typically a
 * chart sitting next to the component.
 *
 * Which CSS property carries the colour changes with the mark : a bar paints its
 * background, an SVG paints `currentColor`. Hence the pair of parameters rather than
 * three near-identical copies of this function.
 *
 * @param {string} [value] - A DaisyUI colour token, or any CSS colour.
 * @param {Object} [props]
 * @param {Function} [props.getter] - Token → class definition, e.g. `getBackgroundColor`.
 * @param {string} [props.styleProp] - CSS property used for a non-token colour, e.g. `'backgroundColor'`.
 *
 * @returns {{ definition : Object , style : Object | undefined }} The class definition and the inline style.
 *
 * @example
 * ```js
 * resolveColor( 'primary' , { getter : getBackgroundColor , styleProp : 'backgroundColor' } ) ;
 * // → { definition : { 'bg-primary' : true } , style : undefined }
 *
 * resolveColor( '#4E79A7' , { getter : getTextColor , styleProp : 'color' } ) ;
 * // → { definition : {} , style : { color : '#4E79A7' } }
 * ```
 */
export const resolveColor = ( value , { getter , styleProp } = {} ) =>
{
    if ( !value || !( getter instanceof Function ) )
    {
        return { definition : {} , style : undefined } ;
    }

    const definition = getter( value ) ;

    if ( Object.keys( definition ).length > 0 )
    {
        return { definition , style : undefined } ;
    }

    return { definition : {} , style : styleProp ? { [ styleProp ] : value } : undefined } ;
} ;

export default resolveColor ;
