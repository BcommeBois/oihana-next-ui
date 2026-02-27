import amber   from './amber'
import blue    from './blue'
import cyan    from './cyan'
import emerald from './emerald'
import fuchsia from './fuchsia'
import gray    from './gray'
import green   from './green'
import indigo  from './indigo'
import lime    from './lime'
import neutral from './neutral'
import orange  from './orange'
import pink    from './pink'
import purple  from './purple'
import red     from './red'
import rose    from './rose'
import sky     from './sky'
import slate   from './slate'
import stone   from './stone'
import teal    from './teal'
import violet  from './violet'
import yellow  from './yellow'
import zinc    from './zinc'

/**
 * CSS native color keywords.
 */
export const BLACK       = 'black' ;
export const INHERIT     = 'inherit' ;
export const CURRENT     = 'current' ;
export const NONE        = 'none' ;
export const TRANSPARENT = 'transparent' ;
export const WHITE       = 'white' ;

/**
 * @typedef {'black' | 'current' | 'inherit' | 'none' | 'transparent' | 'white'} NativeColor
 */

/**
 * @typedef {import('./amber').AmberColor} AmberColor
 * @typedef {import('./blue').BlueColor} BlueColor
 * @typedef {import('./cyan').CyanColor} CyanColor
 * @typedef {import('./emerald').EmeraldColor} EmeraldColor
 * @typedef {import('./fuchsia').FuchsiaColor} FuchsiaColor
 * @typedef {import('./gray').GrayColor} GrayColor
 * @typedef {import('./green').GreenColor} GreenColor
 * @typedef {import('./indigo').IndigoColor} IndigoColor
 * @typedef {import('./lime').LimeColor} LimeColor
 * @typedef {import('./neutral').NeutralColor} NeutralColor
 * @typedef {import('./orange').OrangeColor} OrangeColor
 * @typedef {import('./pink').PinkColor} PinkColor
 * @typedef {import('./purple').PurpleColor} PurpleColor
 * @typedef {import('./red').RedColor} RedColor
 * @typedef {import('./rose').RoseColor} RoseColor
 * @typedef {import('./sky').SkyColor} SkyColor
 * @typedef {import('./slate').SlateColor} SlateColor
 * @typedef {import('./stone').StoneColor} StoneColor
 * @typedef {import('./teal').TealColor} TealColor
 * @typedef {import('./violet').VioletColor} VioletColor
 * @typedef {import('./yellow').YellowColor} YellowColor
 * @typedef {import('./zinc').ZincColor} ZincColor
 */

/**
 * @typedef {NativeColor | AmberColor | BlueColor | CyanColor | EmeraldColor | FuchsiaColor | GrayColor | GreenColor | IndigoColor | LimeColor | NeutralColor | OrangeColor | PinkColor | PurpleColor | RedColor | RoseColor | SkyColor | SlateColor | StoneColor | TealColor | VioletColor | YellowColor | ZincColor} TailwindColor
 */


/**
 * Native CSS colors (not Tailwind variables).
 * @type {string[]}
 */
export const nativeColors = [ BLACK , CURRENT , INHERIT , NONE , TRANSPARENT , WHITE ] ;

/**
 * Tailwind color keys.
 * @type {string[]}
 */
export const tailwindColors =
[
    ...amber ,
    ...blue ,
    ...cyan ,
    ...emerald ,
    ...fuchsia ,
    ...gray ,
    ...green ,
    ...indigo ,
    ...lime ,
    ...neutral ,
    ...orange ,
    ...pink ,
    ...purple ,
    ...red ,
    ...rose ,
    ...sky ,
    ...slate ,
    ...stone ,
    ...teal ,
    ...violet ,
    ...yellow ,
    ...zinc ,
] ;

/**
 * All available colors (native + Tailwind).
 * @type {string[]}
 */
const colors = [ ...nativeColors , ...tailwindColors ] ;

export default colors ;

/**
 * Cache for extracted Tailwind colors.
 * @type {Object.<string, string> | null}
 */
let __COLORS__ = null ;

/**
 * Clears the cached colors.
 * Call this when the theme changes to force re-extraction.
 */
export const clearColorsCache = () =>
{
    __COLORS__ = null ;
} ;

/**
 * Extracts Tailwind CSS color values from CSS variables.
 *
 * @param {CSSStyleDeclaration} [computedStyles] - Optional computed styles.
 * @param {string} [selector=':root'] - CSS selector for the root element.
 * @param {string} [prefix='--color-'] - The color prefix
 * @returns {Object.<string, string>} Color map with native and Tailwind colors.
 *
 * @example
 * ```js
 * const colors = extractColorsFromDom() ;
 * // → { black: 'black', 'red-500': 'oklch(...)', ... }
 * ```
 */
export const extractColorsFromDom =
(
    computedStyles = null ,
    selector       = ':root' ,
    prefix         = '--color-'
) =>
{
    if ( !computedStyles )
    {
        computedStyles = getComputedStyle( document.querySelector( selector ) ) ;
    }

    if ( !__COLORS__ )
    {
        __COLORS__ = {} ;

        // Native CSS colors (no variables)
        nativeColors.forEach( ( color ) =>
        {
            __COLORS__[ color ] = color ;
        } ) ;

        // Tailwind colors from CSS variables
        tailwindColors.forEach( ( color ) =>
        {
            const value = computedStyles.getPropertyValue( prefix + color ).trim() ;
            if ( value )
            {
                __COLORS__[ color ] = value ;
            }
        } ) ;
    }

    return __COLORS__ ;
} ;

export * from './amber' ;
export * from './blue' ;
export * from './cyan' ;
export * from './emerald' ;
export * from './fuchsia' ;
export * from './gray' ;
export * from './green' ;
export * from './indigo' ;
export * from './lime' ;
export * from './neutral' ;
export * from './orange' ;
export * from './pink' ;
export * from './purple' ;
export * from './red' ;
export * from './rose' ;
export * from './sky' ;
export * from './slate' ;
export * from './stone' ;
export * from './teal' ;
export * from './violet' ;
export * from './yellow' ;
export * from './zinc' ;