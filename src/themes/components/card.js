/**
 * Card class name generators for DaisyUI 5.
 *
 * @module themes/components/card
 * @see https://daisyui.com/components/card
 *
 * @safelist
 * ## Sizes
 * - card-xs | card-sm | card-md | card-lg | card-xl
 *
 * ## Styles
 * - card-border | card-dash
 *
 * ## Modifiers
 * - card-side | image-full
 *
 * ## Responsive side (no 2xl variant in DaisyUI)
 * - sm:card-side | md:card-side | lg:card-side | xl:card-side
 */

import cn from '../helpers/cn' ;

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} CardSize
 * @typedef {'border' | 'dash'} CardStyle
 * @typedef {boolean | 'sm' | 'md' | 'lg' | 'xl'} CardSide
 */

// ---- Sizes

export { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

/**
 * Valid card sizes.
 * @type {CardSize[]}
 */
export const sizes = [ XL , LG , MD , SM , XS ] ;

/**
 * Card size class mapping.
 * @type {Object.<CardSize, string>}
 */
const sizeMap =
{
    [ XL ] : 'card-xl' ,
    [ LG ] : 'card-lg' ,
    [ MD ] : 'card-md' ,
    [ SM ] : 'card-sm' ,
    [ XS ] : 'card-xs' ,
} ;

// ---- Styles

export const BORDER = 'border' ;
export const DASH   = 'dash' ;

/**
 * Valid card styles.
 * @type {CardStyle[]}
 */
export const styles = [ BORDER , DASH ] ;

/**
 * Card style class mapping.
 * @type {Object.<CardStyle, string>}
 */
const styleMap =
{
    [ BORDER ] : 'card-border' ,
    [ DASH   ] : 'card-dash' ,
} ;

// ---- Side

/**
 * Breakpoints from which `card-side` kicks in, as whole literals so Tailwind's scanner
 * sees them. DaisyUI ships no `2xl` variant, so none is offered.
 *
 * @type {Object.<string, string>}
 */
const sideMap =
{
    [ SM ] : 'sm:card-side' ,
    [ MD ] : 'md:card-side' ,
    [ LG ] : 'lg:card-side' ,
    [ XL ] : 'xl:card-side' ,
} ;

/**
 * Breakpoints accepted by `side`.
 * @type {string[]}
 */
export const sideBreakpoints = [ SM , MD , LG , XL ] ;

// ---- Base classes

export const CARD         = 'card' ;
export const CARD_BODY    = 'card-body' ;
export const CARD_TITLE   = 'card-title' ;
export const CARD_ACTIONS = 'card-actions' ;
export const IMAGE_FULL   = 'image-full' ;

/**
 * Generates a DaisyUI card className expression.
 *
 * @param {Object}    [props={}]
 * @param {Object}    [props.after]           - Class definitions to append.
 * @param {Object}    [props.before]          - Class definitions to prepend.
 * @param {string}    [props.beforeClassName] - ClassName to prepend.
 * @param {string}    [props.className]       - ClassName to append.
 * @param {boolean}   [props.imageFull]       - Makes the figure image a full background (`image-full`).
 * @param {CardSize}  [props.size]            - Card size variant.
 * @param {CardSide}  [props.side]            - Places the figure on the side. `true` always ; a breakpoint (`'lg'`) only from that width up, which is the vertical-then-horizontal layout.
 * @param {CardStyle} [props.style]           - Card border style variant.
 *
 * @returns {string} The card className expression.
 *
 * @example
 * ```js
 * getCardClassNames() ;
 * // → 'card'
 *
 * getCardClassNames({ size: 'sm' , style: 'border' }) ;
 * // → 'card card-sm card-border'
 *
 * getCardClassNames({ side: true }) ;
 * // → 'card card-side'
 *
 * getCardClassNames({ side: 'lg' }) ;
 * // → 'card lg:card-side'
 *
 * getCardClassNames({ imageFull: true , size: 'lg' }) ;
 * // → 'card card-lg image-full'
 * ```
 */
const getCardClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,
     imageFull ,
     size ,
     side ,
     style ,
 }
 = {} ) => cn
(
    beforeClassName ,
    CARD ,
    {
        ...before ,

        ...!!sizeMap[ size ]   && { [ sizeMap[ size ] ] : true } ,
        ...!!styleMap[ style ] && { [ styleMap[ style ] ] : true } ,
        ...side === true       && { 'card-side' : true } ,
        ...!!sideMap[ side ]   && { [ sideMap[ side ] ] : true } ,
        ...imageFull === true  && { [ IMAGE_FULL ] : true } ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a DaisyUI `card-body` className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The card-body className expression.
 *
 * @example
 * ```js
 * getCardBodyClasses({ className: 'items-center text-center' }) ;
 * // → 'card-body items-center text-center'
 * ```
 */
export const getCardBodyClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    CARD_BODY ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a DaisyUI `card-title` className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The card-title className expression.
 *
 * @example
 * ```js
 * getCardTitleClasses() ;
 * // → 'card-title'
 * ```
 */
export const getCardTitleClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    CARD_TITLE ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a DaisyUI `card-actions` className expression.
 *
 * DaisyUI leaves the row start-aligned ; the documented look pairs it with
 * `justify-end`, which is what `<Card>` applies by default.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The card-actions className expression.
 *
 * @example
 * ```js
 * getCardActionsClasses({ className: 'justify-end' }) ;
 * // → 'card-actions justify-end'
 * ```
 */
export const getCardActionsClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    CARD_ACTIONS ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

export { getCardClassNames } ;

export default getCardClassNames ;
