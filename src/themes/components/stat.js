/**
 * Stat class name generators for DaisyUI 5.
 *
 * @module themes/components/stat
 * @see https://daisyui.com/components/stat
 *
 * @safelist
 * ## Direction (responsive — no 2xl variant in DaisyUI)
 * - stats-horizontal | stats-vertical
 * - sm:stats-horizontal | sm:stats-vertical
 * - md:stats-horizontal | md:stats-vertical
 * - lg:stats-horizontal | lg:stats-vertical
 * - xl:stats-horizontal | xl:stats-vertical
 */

import cn from '../helpers/cn' ;

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import getTextColor from '../colors/textColor' ;

import { HORIZONTAL , VERTICAL } from '../enums/orientations' ;

export { HORIZONTAL , VERTICAL } from '../enums/orientations' ;

/**
 * @typedef {'horizontal' | 'vertical'} StatsDirection
 *
 * @typedef {Object} ResponsiveStatsDirection
 * @property {StatsDirection} [xs] - Default direction (no breakpoint prefix).
 * @property {StatsDirection} [sm]
 * @property {StatsDirection} [md]
 * @property {StatsDirection} [lg]
 * @property {StatsDirection} [xl]
 */

/**
 * Valid stats directions. `horizontal` is DaisyUI's default.
 * @type {StatsDirection[]}
 */
export const directions = [ HORIZONTAL , VERTICAL ] ;

/**
 * Generates responsive stats direction classes.
 *
 * Accepts a scalar direction or a breakpoint→direction object ; `xs` is the prefix-less
 * default. Responsive classes are built at runtime, hence the `@safelist` above.
 *
 * DaisyUI ships no `2xl` variant, so a `xxl` key resolves to nothing.
 *
 * @type {Function}
 */
export const getStatsDirection = getResponsiveDefinition(
    create( 'stats-' ) ,
    value => directions.includes( value )
) ;

export const STATS        = 'stats' ;
export const STAT         = 'stat' ;
export const STAT_TITLE   = 'stat-title' ;
export const STAT_VALUE   = 'stat-value' ;
export const STAT_DESC    = 'stat-desc' ;
export const STAT_FIGURE  = 'stat-figure' ;
export const STAT_ACTIONS = 'stat-actions' ;

/**
 * Generates a DaisyUI `stats` container className expression.
 *
 * Two DaisyUI behaviours worth knowing, neither of which this generator alters :
 * `.stats` is an **`inline-grid`**, so it hugs its content — a full-width KPI band needs
 * `w-full` — and it carries **`overflow-x: auto`**, so items scroll sideways rather than
 * wrapping once they outgrow the container.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {StatsDirection | ResponsiveStatsDirection} [props.direction] - Layout direction, scalar or per breakpoint.
 *
 * @returns {string} The stats className expression.
 *
 * @example
 * ```js
 * getStatsClasses() ;
 * // → 'stats'
 *
 * getStatsClasses({ direction: 'vertical' }) ;
 * // → 'stats stats-vertical'
 *
 * getStatsClasses({ direction: { xs: 'vertical', lg: 'horizontal' } }) ;
 * // → 'stats stats-vertical lg:stats-horizontal'
 * ```
 */
export const getStatsClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    direction ,
} = {} ) => cn
(
    beforeClassName ,
    STATS ,
    {
        ...before ,

        ...!!direction && getStatsDirection( direction ) ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a DaisyUI `stat` item className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {boolean} [props.centered=false] - Centres the parts (`place-items-center`).
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The stat className expression.
 *
 * @example
 * ```js
 * getStatClasses() ;
 * // → 'stat'
 *
 * getStatClasses({ centered: true }) ;
 * // → 'stat place-items-center'
 * ```
 */
export const getStatClasses =
({
    after ,
    before ,
    beforeClassName ,
    centered = false ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    STAT ,
    {
        ...before ,

        ...centered === true && { 'place-items-center' : true } ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Builds a part generator that accepts an optional DaisyUI text colour.
 *
 * DaisyUI exposes no colour modifier on the stat parts — its own examples drop plain
 * Tailwind utilities on them, and often tint the value and the description differently.
 * Colours therefore go through the shared {@link module:themes/colors/textColor} map
 * rather than a private one.
 *
 * @param {string} base - The DaisyUI part class.
 * @returns {Function} The part class name generator.
 */
const createPart = ( base ) =>
({
    after ,
    before ,
    beforeClassName ,
    className ,
    color ,
} = {} ) => cn
(
    beforeClassName ,
    base ,
    {
        ...before ,

        ...!!color && getTextColor( color ) ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a DaisyUI `stat-title` className expression.
 *
 * @param {Object} [props]
 * @param {import('../colors/textColor').TextColorValue} [props.color] - Text colour.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The stat-title className expression.
 *
 * @example
 * ```js
 * getStatTitleClasses({ color: 'base-content' }) ;
 * // → 'stat-title text-base-content'
 * ```
 */
export const getStatTitleClasses = createPart( STAT_TITLE ) ;

/**
 * Generates a DaisyUI `stat-value` className expression.
 *
 * @param {Object} [props]
 * @param {import('../colors/textColor').TextColorValue} [props.color] - Text colour.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The stat-value className expression.
 *
 * @example
 * ```js
 * getStatValueClasses({ color: 'primary' }) ;
 * // → 'stat-value text-primary'
 * ```
 */
export const getStatValueClasses = createPart( STAT_VALUE ) ;

/**
 * Generates a DaisyUI `stat-desc` className expression.
 *
 * @param {Object} [props]
 * @param {import('../colors/textColor').TextColorValue} [props.color] - Text colour.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The stat-desc className expression.
 *
 * @example
 * ```js
 * getStatDescClasses({ color: 'success' }) ;
 * // → 'stat-desc text-success'
 * ```
 */
export const getStatDescClasses = createPart( STAT_DESC ) ;

/**
 * Generates a DaisyUI `stat-figure` className expression.
 *
 * @param {Object} [props]
 * @param {import('../colors/textColor').TextColorValue} [props.color] - Text colour.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The stat-figure className expression.
 *
 * @example
 * ```js
 * getStatFigureClasses({ color: 'secondary' }) ;
 * // → 'stat-figure text-secondary'
 * ```
 */
export const getStatFigureClasses = createPart( STAT_FIGURE ) ;

/**
 * Generates a DaisyUI `stat-actions` className expression.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The stat-actions className expression.
 *
 * @example
 * ```js
 * getStatActionsClasses() ;
 * // → 'stat-actions'
 * ```
 */
export const getStatActionsClasses = createPart( STAT_ACTIONS ) ;

export default getStatsClasses ;
