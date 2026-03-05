import cn from '../../themes/helpers/cn' ;

/**
 * @typedef {'anchors-away' | 'architect' | 'autumn' | 'aztec' | 'bamboo' | 'bank-note' |
 *   'boxes' | 'brick-wall' | 'bubbles' | 'cage' | 'charlie-brown' | 'checkered' |
 *   'church-on-sunday' | 'circles-and-squares' | 'circuit-board' | 'clouds' |
 *   'connections' | 'cork-screw' | 'crosses' | 'current' | 'curtain' | 'death-star' |
 *   'diagonal-stripes' | 'dominoes' | 'dots' | 'eyes' | 'falling-triangles' | 'fancy-rectangles' |
 *   'flipped-diamonds' | 'floating-cogs' | 'floor' | 'glamorous' | 'graph' | 'grid' |
 *   'groovy' | 'happy-intersection' | 'heavy-rain' | 'hexagons' | 'hideout' | 'hive' |
 *   'honeycomb' | 'houndstooth' | 'hub' | 'i-like-food' | 'intersecting-circles' |
 *   'jigsaw' | 'kiwi' | 'leaf' | 'lines-diagonal-left' | 'lines-diagonal-right' |
 *   'lines-horizontal' | 'lines-in-motion' | 'lines-vertical' | 'lips' | 'lisbon' |
 *   'matrix' | 'melt' | 'meteor' | 'moroccan' | 'morphing-diamonds' | 'overcast' |
 *   'overlapping-circles' | 'overlapping-diamonds' | 'overlapping-hexagons' |
 *   'piano-man' | 'pies' | 'pixel' | 'plus' | 'plus-connected' | 'polka' |
 *   'rails' | 'rain' | 'random-shapes' | 'ripples' | 'signal' | 'skulls' |
 *   'slanted' | 'sprinkles' | 'squares' | 'squares-in-squares' | 'squiggles' |
 *   'stamp-collection' | 'stars' | 'steel-beams' | 'stripes' | 'temple' | 'texture' |
 *   'tic-tac-toe' | 'tiles' | 'tiny-checkers' | 'topography' | 'transparent' |
 *   'triangles' | 'volcano-lamp' | 'voxel' | 'wallpaper' | 'waves' | 'wiggle' |
 *   'wood' | 'x-equals' | 'yyy' | 'zebra' | 'zig-zag' | 'zig-zag-2'} BackgroundPattern
 */

/**
 * Available pattern names.
 *
 * @type {BackgroundPattern[]}
 */
export const patterns =
[
    'anchors-away' ,
    'architect' ,
    'autumn' ,
    'aztec' ,
    'bamboo' ,
    'bank-note' ,
    'boxes' ,
    'brick-wall' ,
    'bubbles' ,
    'cage' ,
    'charlie-brown' ,
    'checkered' ,
    'church-on-sunday' ,
    'circles-and-squares' ,
    'circuit-board' ,
    'clouds' ,
    'connections' ,
    'cork-screw' ,
    'crosses' ,
    'current' ,
    'curtain' ,
    'death-star' ,
    'diagonal-stripes' ,
    'dominoes' ,
    'dots' ,
    'eyes' ,
    'falling-triangles' ,
    'fancy-rectangles' ,
    'flipped-diamonds' ,
    'floating-cogs' ,
    'floor' ,
    'glamorous' ,
    'graph' ,
    'grid' ,
    'groovy' ,
    'happy-intersection' ,
    'heavy-rain' ,
    'hexagons' ,
    'hideout' ,
    'hive' ,
    'honeycomb' ,
    'houndstooth' ,
    'hub' ,
    'i-like-food' ,
    'intersecting-circles' ,
    'jigsaw' ,
    'kiwi' ,
    'leaf' ,
    'lines-diagonal-left' ,
    'lines-diagonal-right' ,
    'lines-horizontal' ,
    'lines-in-motion' ,
    'lines-vertical' ,
    'lips' ,
    'lisbon' ,
    'matrix' ,
    'melt' ,
    'meteor' ,
    'moroccan' ,
    'morphing-diamonds' ,
    'overcast' ,
    'overlapping-circles' ,
    'overlapping-diamonds' ,
    'overlapping-hexagons' ,
    'piano-man' ,
    'pies' ,
    'pixel' ,
    'plus' ,
    'plus-connected' ,
    'polka' ,
    'rails' ,
    'rain' ,
    'random-shapes' ,
    'ripples' ,
    'signal' ,
    'skulls' ,
    'slanted' ,
    'sprinkles' ,
    'squares' ,
    'squares-in-squares' ,
    'squiggles' ,
    'stamp-collection' ,
    'stars' ,
    'steel-beams' ,
    'stripes' ,
    'temple' ,
    'texture' ,
    'tic-tac-toe' ,
    'tiles' ,
    'tiny-checkers' ,
    'topography' ,
    'transparent' ,
    'triangles' ,
    'volcano-lamp' ,
    'voxel' ,
    'wallpaper' ,
    'waves' ,
    'wiggle' ,
    'wood' ,
    'x-equals' ,
    'yyy' ,
    'zebra' ,
    'zig-zag' ,
    'zig-zag-2' ,
] ;

/**
 * Default opacity for pattern colors.
 *
 * @type {string}
 */
export const DEFAULT_OPACITY = '20' ;

/**
 * Pattern-specific opacity overrides.
 *
 * @type {Object.<BackgroundPattern, string>}
 */
const opacityOverrides =
{
    'architect' : '40' ,
    'meteor'    : '10' ,
} ;

/**
 * Generates the pattern utility class name.
 *
 * @param {BackgroundPattern} name - Pattern name.
 * @returns {string | null} Pattern class or null if invalid.
 *
 * @example
 * ```js
 * getPatternClass( 'topography' ) ;
 * // → 'pattern-topography'
 * ```
 */
export const getPatternClass = name =>
{
    if ( !name || !patterns.includes( name ) )
    {
        return null ;
    }

    return `pattern-${ name }` ;
} ;

/**
 * Retrieves the default opacity for a pattern.
 *
 * @param {BackgroundPattern} name - Pattern name.
 * @returns {string} Opacity value (e.g., '20', '40').
 *
 * @example
 * ```js
 * getPatternOpacity( 'architect' ) ;
 * // → '40'
 *
 * getPatternOpacity( 'topography' ) ;
 * // → '20'
 * ```
 */
export const getPatternOpacity = name =>
{
    return opacityOverrides[ name ] ?? DEFAULT_OPACITY ;
} ;

/**
 * Generates the default color class for a pattern.
 *
 * @param {BackgroundPattern} name - Pattern name.
 * @param {string} [baseColor='base-content'] - Base color name.
 * @returns {string} Color class with opacity.
 *
 * @example
 * ```js
 * getPatternColor( 'topography' ) ;
 * // → 'text-base-content/20'
 *
 * getPatternColor( 'architect' ) ;
 * // → 'text-base-content/40'
 *
 * getPatternColor( 'topography' , 'primary' ) ;
 * // → 'text-primary/20'
 * ```
 */
export const getPatternColor = ( name , baseColor = 'base-content' ) =>
{
    const opacity = getPatternOpacity( name ) ;

    return `text-${ baseColor }/${ opacity }` ;
} ;

/**
 * Generates a background pattern className expression.
 *
 * @param {BackgroundPattern | Object} props - Pattern name or options object.
 * @param {string} [props.baseColor='base-content'] - Base color for default pattern color.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.color] - Custom color classes (replaces default).
 * @param {BackgroundPattern} [props.pattern] - Pattern name.
 * @param {boolean} [props.withColor=true] - Include color classes.
 *
 * @returns {string | null} The pattern className expression or null.
 *
 * @example
 * ```js
 * // Simple usage with default color
 * getBackgroundPattern( 'topography' ) ;
 * // → 'text-base-content/20 pattern-topography'
 *
 * // Custom base color
 * getBackgroundPattern( { pattern: 'topography' , baseColor: 'primary' } ) ;
 * // → 'text-primary/20 pattern-topography'
 *
 * // Custom color (full control)
 * getBackgroundPattern( { pattern: 'topography' , color: 'text-base-300/20' } ) ;
 * // → 'text-base-300/20 pattern-topography'
 *
 * // Without color (manual control)
 * getBackgroundPattern( { pattern: 'topography' , withColor: false } ) ;
 * // → 'pattern-topography'
 *
 * // With additional classes
 * getBackgroundPattern( {
 *     pattern: 'architect' ,
 *     baseColor: 'secondary' ,
 *     className: 'rounded-xl'
 * } ) ;
 * // → 'text-secondary/40 pattern-architect rounded-xl'
 * ```
 */
const getBackgroundPattern = props =>
{
    // String: pattern name → default color + pattern class
    if ( typeof props === 'string' && props )
    {
        const patternClass = getPatternClass( props ) ;

        if ( !patternClass )
        {
            return null ;
        }

        const color = getPatternColor( props ) ;

        return cn( color , patternClass ) ;
    }

    // Object: flexible options
    if ( props && typeof props === 'object' )
    {
        const
        {
            baseColor = 'base-content' ,
            beforeClassName ,
            className ,
            color ,
            pattern ,
            withColor = true ,
        } = props ;

        const patternClass = getPatternClass( pattern ) ;

        if ( !patternClass )
        {
            return null ;
        }

        // Without color → just pattern class
        if ( !withColor )
        {
            return cn( beforeClassName , patternClass , className ) ;
        }

        // With custom color → custom color + pattern class
        if ( color )
        {
            return cn( beforeClassName , color , patternClass , className ) ;
        }

        // With default color → default color + pattern class
        const defaultColor = getPatternColor( pattern , baseColor ) ;

        return cn( beforeClassName , defaultColor , patternClass , className ) ;
    }

    return null ;
} ;

export default getBackgroundPattern ;

/* Tailwindcss safe list
pattern-anchors-away
pattern-architect
pattern-autumn
pattern-aztec
pattern-bamboo
pattern-bank-note
pattern-boxes
pattern-brick-wall
pattern-bubbles
pattern-cage
pattern-charlie-brown
pattern-checkered
pattern-church-on-sunday
pattern-circles-and-squares
pattern-circuit-board
pattern-clouds
pattern-connections
pattern-cork-screw
pattern-crosses
pattern-current
pattern-curtain
pattern-death-star
pattern-diagonal-stripes
pattern-dominoes
pattern-dots
pattern-eyes
pattern-falling-triangles
pattern-fancy-rectangles
pattern-flipped-diamonds
pattern-floating-cogs
pattern-floor
pattern-glamorous
pattern-graph
pattern-grid
pattern-groovy
pattern-happy-intersection
pattern-heavy-rain
pattern-hexagons
pattern-hideout
pattern-hive
pattern-honeycomb
pattern-houndstooth
pattern-hub
pattern-i-like-food
pattern-intersecting-circles
pattern-jigsaw
pattern-kiwi
pattern-leaf
pattern-lines-diagonal-left
pattern-lines-diagonal-right
pattern-lines-horizontal
pattern-lines-in-motion
pattern-lines-vertical
pattern-lips
pattern-lisbon
pattern-matrix
pattern-melt
pattern-meteor
pattern-moroccan
pattern-morphing-diamonds
pattern-overcast
pattern-overlapping-circles
pattern-overlapping-diamonds
pattern-overlapping-hexagons
pattern-piano-man
pattern-pies
pattern-pixel
pattern-plus
pattern-plus-connected
pattern-polka
pattern-rails
pattern-rain
pattern-random-shapes
pattern-ripples
pattern-signal
pattern-skulls
pattern-slanted
pattern-sprinkles
pattern-squares
pattern-squares-in-squares
pattern-squiggles
pattern-stamp-collection
pattern-stars
pattern-steel-beams
pattern-stripes
pattern-temple
pattern-texture
pattern-tic-tac-toe
pattern-tiles
pattern-tiny-checkers
pattern-topography
pattern-transparent
pattern-triangles
pattern-volcano-lamp
pattern-voxel
pattern-wallpaper
pattern-waves
pattern-wiggle
pattern-wood
pattern-x-equals
pattern-yyy
pattern-zebra
pattern-zig-zag
pattern-zig-zag-2
*/