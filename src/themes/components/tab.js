/**
 * Tabs class name generators for DaisyUI 5.
 *
 * @module themes/components/tab
 * @see https://daisyui.com/components/tab
 *
 * @safelist
 * ## Sizes (responsive)
 * - tabs-xs | tabs-sm | tabs-md | tabs-lg | tabs-xl
 * - sm:tabs-xs | sm:tabs-sm | sm:tabs-md | sm:tabs-lg | sm:tabs-xl
 * - md:tabs-xs | md:tabs-sm | md:tabs-md | md:tabs-lg | md:tabs-xl
 * - lg:tabs-xs | lg:tabs-sm | lg:tabs-md | lg:tabs-lg | lg:tabs-xl
 * - xl:tabs-xs | xl:tabs-sm | xl:tabs-md | xl:tabs-lg | xl:tabs-xl
 * - 2xl:tabs-xs | 2xl:tabs-sm | 2xl:tabs-md | 2xl:tabs-lg | 2xl:tabs-xl
 */

import cn from '../helpers/cn' ;

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

export { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

// Sizes

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} TabsSize
 *
 * @typedef {Object} ResponsiveTabsSize
 * @property {TabsSize} [xs] - Default size (no breakpoint prefix).
 * @property {TabsSize} [sm]
 * @property {TabsSize} [md]
 * @property {TabsSize} [lg]
 * @property {TabsSize} [xl]
 * @property {TabsSize} [xxl]
 */

/**
 * Valid tabs sizes.
 * @type {TabsSize[]}
 */
export const sizes = [ XS , SM , MD , LG , XL ] ;

/**
 * Generates responsive tabs size classes.
 *
 * Accepts a scalar size or a breakpoint→size object ; `xs` is the prefix-less
 * default. Responsive classes are built at runtime, hence the `@safelist` above.
 *
 * @type {Function}
 */
export const getTabsSize = getResponsiveDefinition(
    create( 'tabs-' ) ,
    value => sizes.includes( value )
) ;

// Styles

/**
 * @typedef {'box' | 'border' | 'lift'} TabsStyle
 */

export const BOX    = 'box' ;
export const BORDER = 'border' ;
export const LIFT   = 'lift' ;

/**
 * Valid tabs styles. Omitting the style leaves the bare `tabs` look.
 * @type {TabsStyle[]}
 */
export const styles = [ BOX , BORDER , LIFT ] ;

const styleMap =
{
    [ BOX ]    : 'tabs-box' ,
    [ BORDER ] : 'tabs-border' ,
    [ LIFT ]   : 'tabs-lift' ,
} ;

// Placements

/**
 * @typedef {'top' | 'bottom'} TabsPlacement
 */

export const TOP    = 'top' ;
export const BOTTOM = 'bottom' ;

/**
 * Valid tabs placements — which side of the content the tab row sits on.
 *
 * DaisyUI 5 dropped `tabs-vertical` : `--tabs-direction` is always `row`, so there
 * is no vertical orientation to expose.
 *
 * @type {TabsPlacement[]}
 */
export const placements = [ TOP , BOTTOM ] ;

const placementMap =
{
    [ TOP ]    : 'tabs-top' ,
    [ BOTTOM ] : 'tabs-bottom' ,
} ;

export const TABS         = 'tabs' ;
export const TAB          = 'tab' ;
export const TAB_CONTENT  = 'tab-content' ;
export const TAB_DISABLED = 'tab-disabled' ;

/**
 * Generates a DaisyUI `tabs` container className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {TabsPlacement} [props.placement='top'] - Side the tab row sits on.
 * @param {TabsSize | ResponsiveTabsSize} [props.size='md'] - Tabs size (scalar or responsive object).
 * @param {TabsStyle} [props.style] - Visual style. Omit for the bare `tabs` look.
 *
 * @returns {string} The tabs className expression.
 *
 * @example
 * ```js
 * getTabsClasses() ;
 * // → 'tabs tabs-md tabs-top'
 *
 * getTabsClasses({ style: 'lift' }) ;
 * // → 'tabs tabs-lift tabs-md tabs-top'
 *
 * getTabsClasses({ size: { xs: 'sm', lg: 'lg' }, placement: 'bottom' }) ;
 * // → 'tabs tabs-sm lg:tabs-lg tabs-bottom'
 * ```
 */
export const getTabsClasses =
({
    after,
    before,
    beforeClassName,
    className,
    placement = TOP,
    size = MD,
    style,
} = {} ) => cn
(
    beforeClassName,
    TABS,
    {
        ...before,

        ...!!styleMap[ style ]         && { [ styleMap[ style ] ] : true } ,
        ...!!size                      && getTabsSize( size ) ,
        ...!!placementMap[ placement ] && { [ placementMap[ placement ] ] : true } ,

        ...after,
    },
    className,
) ;

/**
 * Generates a DaisyUI `tab` item className expression.
 *
 * The active state is **not** handled here : DaisyUI styles `[aria-selected=true]`
 * natively, so carrying the state on the ARIA attribute alone keeps the markup
 * accessible and styled from a single source.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {boolean} [props.disabled=false] - Applies `tab-disabled`.
 *
 * @returns {string} The tab className expression.
 *
 * @example
 * ```js
 * getTabClasses() ;
 * // → 'tab gap-2'
 *
 * getTabClasses({ disabled: true }) ;
 * // → 'tab gap-2 tab-disabled'
 * ```
 */
export const getTabClasses =
({
    after,
    before,
    beforeClassName,
    className,
    disabled = false,
} = {} ) => cn
(
    beforeClassName,
    TAB,
    // DaisyUI leaves `.tab` gapless and expects the caller to space an icon by hand, so
    // an icon ends up flush against its label. `gap-2` matches DaisyUI's own `menu`
    // spacing — tabs are navigation, not buttons (which sit at .375rem / `gap-1.5`).
    // A label-only tab is unaffected : a gap needs two flex children. `className` still
    // wins, so a caller can dial it back.
    'gap-2',
    {
        ...before,

        ...disabled === true && { [ TAB_DISABLED ] : true } ,

        ...after,
    },
    className,
) ;

/**
 * Generates a DaisyUI `tab-content` className expression.
 *
 * DaisyUI reveals a panel through `.tab:is(…) + .tab-content`, so the panel has to be
 * the **immediate sibling** of its own tab — tabs and panels interleave in the DOM
 * rather than forming two separate groups.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The tab-content className expression.
 *
 * @example
 * ```js
 * getTabContentClasses({ className: 'p-6' }) ;
 * // → 'tab-content p-6'
 * ```
 */
export const getTabContentClasses =
({
    after,
    before,
    beforeClassName,
    className,
} = {} ) => cn
(
    beforeClassName,
    TAB_CONTENT,
    {
        ...before,
        ...after,
    },
    className,
) ;

export default getTabsClasses ;
