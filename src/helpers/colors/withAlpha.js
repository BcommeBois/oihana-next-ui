/**
 * The same colour, made translucent — for a wash behind an icon, a tint behind
 * initials, a band behind a label.
 *
 * ### 🚨 Why not `` `${ color }26` ``
 *
 * Gathered from six places in one application, all appending two hex digits to
 * a colour to get « about 15 % ». That works for a SIX-DIGIT hex and for
 * nothing else : a colour served as `rgb(…)`, named, or already carrying an
 * alpha gives an invalid string, and the background then disappears **with no
 * error at all**. `color-mix` takes any CSS colour.
 *
 * ⚠️ It returns a CSS expression, not a colour value : it is for a `style`
 * attribute, and it cannot be compared, parsed or stored. The arithmetic on a
 * colour belongs to `vegas-js-core/src/colors/*` ; this is the browser doing
 * the mixing.
 *
 * `color-mix` is no new requirement : Tailwind 4 and daisyUI both use it in
 * their own stylesheets, so any application consuming this library already
 * demands a browser that has it.
 *
 * @module helpers/colors/withAlpha
 *
 * @param {string} color   - Any CSS colour.
 * @param {number} [alpha=0.15] - How much of it stays, from 0 to 1.
 *
 * @returns {?string} The `color-mix` expression, or `undefined` when no colour was given — so a caller can hand it straight to `style` and get no background rather than a broken one.
 *
 * @example
 * ```js
 * withAlpha( '#FF5733' ) ;          // → 'color-mix(in srgb, #FF5733 15%, transparent)'
 * withAlpha( 'rebeccapurple' , 0.4 ) ; // → 'color-mix(in srgb, rebeccapurple 40%, transparent)'
 * withAlpha( undefined ) ;          // → undefined
 * ```
 *
 * @example
 * ```jsx
 * <div style={ { backgroundColor : withAlpha( role.color ) } }>
 *     { initials }
 * </div>
 * ```
 */

/**
 * How much of the colour stays when a caller says nothing — the wash the six
 * gathered call sites were all reaching for.
 * @type {number}
 */
export const DEFAULT_ALPHA = 0.15 ;

const withAlpha = ( color , alpha = DEFAULT_ALPHA ) =>
{
    if ( typeof color !== 'string' || color.trim() === '' ) { return undefined ; }

    // `null` means « nobody said » and takes the default, where `0` means
    // « none of it » and is honoured : a caller passing a value it does not
    // have should get the wash, not an invisible background.
    const requested = alpha === null || alpha === undefined ? DEFAULT_ALPHA : Number( alpha ) ;

    const ratio = Number.isFinite( requested )
        ? Math.min( Math.max( requested , 0 ) , 1 )
        : DEFAULT_ALPHA ;

    return `color-mix(in srgb, ${ color.trim() } ${ Math.round( ratio * 1000 ) / 10 }%, transparent)` ;
} ;

export default withAlpha ;
