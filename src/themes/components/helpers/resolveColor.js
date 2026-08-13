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
 * **A ready-made utility is taken as written.** Given `prefix`, a value that already
 * starts with it — `'bg-base-content/20'` — becomes that class rather than an inline
 * colour. This is what makes *translucent* colours reachable at all : `base-content/20` is
 * no theme token, and as an inline style it would be nonsense, yet it is the only kind of
 * colour that reads on any surface and in both themes without a `dark:` variant. The
 * caller passing it holds a whole literal class, so the scanner still sees it.
 *
 * @param {string} [value] - A DaisyUI colour token, a ready-made utility class, or any CSS colour.
 * @param {Object} [props]
 * @param {Function} [props.getter] - Token → class definition, e.g. `getBackgroundColor`.
 * @param {string} [props.prefix] - Utility prefix a class value starts with, e.g. `'bg-'`.
 * @param {string} [props.styleProp] - CSS property used for a non-token colour, e.g. `'backgroundColor'`.
 *
 * @returns {{ definition : Object , style : Object | undefined }} The class definition and the inline style.
 *
 * @example
 * ```js
 * resolveColor( 'primary' , { getter : getBackgroundColor , styleProp : 'backgroundColor' } ) ;
 * // → { definition : { 'bg-primary' : true } , style : undefined }
 *
 * resolveColor( 'bg-base-content/20' , { getter : getBackgroundColor , prefix : 'bg-' } ) ;
 * // → { definition : { 'bg-base-content/20' : true } , style : undefined }
 *
 * resolveColor( '#4E79A7' , { getter : getTextColor , styleProp : 'color' } ) ;
 * // → { definition : {} , style : { color : '#4E79A7' } }
 * ```
 */
export const resolveColor = ( value , { getter , prefix , styleProp } = {} ) =>
{
    if ( !value || !( getter instanceof Function ) )
    {
        return { definition : {} , style : undefined } ;
    }

    if ( prefix && value.startsWith( prefix ) )
    {
        return { definition : { [ value ] : true } , style : undefined } ;
    }

    const definition = getter( value ) ;

    if ( Object.keys( definition ).length > 0 )
    {
        return { definition , style : undefined } ;
    }

    return { definition : {} , style : styleProp ? { [ styleProp ] : value } : undefined } ;
} ;

export default resolveColor ;
