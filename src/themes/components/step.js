/**
 * Steps class name generators for DaisyUI 5.
 *
 * @module themes/components/step
 * @see https://daisyui.com/components/steps
 *
 * @safelist
 * ## Direction (responsive — no 2xl variant in DaisyUI)
 * - steps-horizontal | steps-vertical
 * - sm:steps-horizontal | sm:steps-vertical
 * - md:steps-horizontal | md:steps-vertical
 * - lg:steps-horizontal | lg:steps-vertical
 * - xl:steps-horizontal | xl:steps-vertical
 */

import cn from '../helpers/cn' ;

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import { HORIZONTAL , VERTICAL } from '../enums/orientations' ;

export { HORIZONTAL , VERTICAL } from '../enums/orientations' ;

/**
 * @typedef {'horizontal' | 'vertical'} StepsDirection
 *
 * @typedef {Object} ResponsiveStepsDirection
 * @property {StepsDirection} [xs] - Default direction (no breakpoint prefix).
 * @property {StepsDirection} [sm]
 * @property {StepsDirection} [md]
 * @property {StepsDirection} [lg]
 * @property {StepsDirection} [xl]
 */

/**
 * Valid steps directions. `horizontal` is DaisyUI's default.
 * @type {StepsDirection[]}
 */
export const directions = [ HORIZONTAL , VERTICAL ] ;

/**
 * Generates responsive steps direction classes.
 *
 * Accepts a scalar direction or a breakpoint→direction object ; `xs` is the prefix-less
 * default. Responsive classes are built at runtime, hence the `@safelist` above.
 *
 * @type {Function}
 */
export const getStepsDirection = getResponsiveDefinition(
    create( 'steps-' ) ,
    value => directions.includes( value )
) ;

// ---- Colors

/**
 * @typedef {'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'} StepColor
 */

export const NEUTRAL   = 'neutral' ;
export const PRIMARY   = 'primary' ;
export const SECONDARY = 'secondary' ;
export const ACCENT    = 'accent' ;
export const INFO      = 'info' ;
export const SUCCESS   = 'success' ;
export const WARNING   = 'warning' ;
export const ERROR     = 'error' ;

/**
 * Valid step colors.
 *
 * A closed DaisyUI set, unlike the open text-colour map : `step-*` colours both the
 * bubble and the connector reaching the next step of the same colour, so only the eight
 * classes DaisyUI actually ships can be used.
 *
 * @type {StepColor[]}
 */
export const colors = [ NEUTRAL , PRIMARY , SECONDARY , ACCENT , INFO , SUCCESS , WARNING , ERROR ] ;

const colorMap =
{
    [ NEUTRAL ]   : 'step-neutral' ,
    [ PRIMARY ]   : 'step-primary' ,
    [ SECONDARY ] : 'step-secondary' ,
    [ ACCENT ]    : 'step-accent' ,
    [ INFO ]      : 'step-info' ,
    [ SUCCESS ]   : 'step-success' ,
    [ WARNING ]   : 'step-warning' ,
    [ ERROR ]     : 'step-error' ,
} ;

/**
 * Colours the connector reaching a step, independently of the step's own colour.
 *
 * DaisyUI ties the two together — `.step-x + .step-x:before` — so the line is tinted only
 * between two steps sharing a colour. That reads wrong the moment the current step is
 * given a colour of its own : the segment leading up to it is ground already covered, yet
 * it drops back to grey, breaking the progress bar one step early.
 *
 * The connector carries `background-color: var(--step-bg)` and `color: var(--step-bg)`,
 * the latter feeding its `border: 1px solid`, so both have to be set.
 *
 * @type {Object.<StepColor, string>}
 */
const connectorMap =
{
    [ NEUTRAL ]   : 'before:bg-neutral before:text-neutral' ,
    [ PRIMARY ]   : 'before:bg-primary before:text-primary' ,
    [ SECONDARY ] : 'before:bg-secondary before:text-secondary' ,
    [ ACCENT ]    : 'before:bg-accent before:text-accent' ,
    [ INFO ]      : 'before:bg-info before:text-info' ,
    [ SUCCESS ]   : 'before:bg-success before:text-success' ,
    [ WARNING ]   : 'before:bg-warning before:text-warning' ,
    [ ERROR ]     : 'before:bg-error before:text-error' ,
} ;

export const STEPS     = 'steps' ;
export const STEP      = 'step' ;
export const STEP_ICON = 'step-icon' ;

/**
 * Generates a DaisyUI `steps` container className expression.
 *
 * Like `stats`, `.steps` is an **`inline-grid`** carrying **`overflow: auto hidden`** : it
 * hugs its content and scrolls sideways rather than wrapping. A full-width run of steps
 * needs `w-full`.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {StepsDirection | ResponsiveStepsDirection} [props.direction] - Layout direction, scalar or per breakpoint.
 *
 * @returns {string} The steps className expression.
 *
 * @example
 * ```js
 * getStepsClasses() ;
 * // → 'steps'
 *
 * getStepsClasses({ direction: { xs: 'vertical', lg: 'horizontal' } }) ;
 * // → 'steps steps-vertical lg:steps-horizontal'
 * ```
 */
export const getStepsClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    direction ,
} = {} ) => cn
(
    beforeClassName ,
    STEPS ,
    {
        ...before ,

        ...!!direction && getStepsDirection( direction ) ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a DaisyUI `step` className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {StepColor} [props.color] - Step colour. Omit to leave the step in its unreached grey.
 * @param {StepColor} [props.connectorColor] - Colour of the connector *reaching* this step, set independently of `color`. See {@link connectorMap}.
 *
 * @returns {string} The step className expression.
 *
 * @example
 * ```js
 * getStepClasses() ;
 * // → 'step'
 *
 * getStepClasses({ color: 'primary' }) ;
 * // → 'step step-primary'
 *
 * getStepClasses({ color: 'primary' , connectorColor: 'success' }) ;
 * // → 'step step-primary before:bg-success before:text-success'
 * ```
 */
export const getStepClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    color ,
    connectorColor ,
} = {} ) => cn
(
    beforeClassName ,
    STEP ,
    {
        ...before ,

        ...!!colorMap[ color ]              && { [ colorMap[ color ] ] : true } ,
        ...!!connectorMap[ connectorColor ] && { [ connectorMap[ connectorColor ] ] : true } ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates a DaisyUI `step-icon` className expression.
 *
 * The icon **replaces** the bubble rather than sitting inside it : DaisyUI's selector is
 * `& > .step-icon, &:not(:has(.step-icon)):after`, so as soon as an icon is present the
 * generated `:after` — and with it the CSS counter — steps aside.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The step-icon className expression.
 *
 * @example
 * ```js
 * getStepIconClasses() ;
 * // → 'step-icon'
 * ```
 */
export const getStepIconClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    STEP_ICON ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

export default getStepsClasses ;
