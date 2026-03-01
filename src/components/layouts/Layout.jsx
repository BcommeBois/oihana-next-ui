'use client' ;

import Flex from '../../components/layouts/Flex' ;
import Grid from '../../components/layouts/Grid' ;

export const FLEX = 'flex' ;
export const GRID = 'grid' ;
export const NONE = 'none' ;

/**
 * Layout display type definitions.
 * @typedef {'flex'|'grid'|'none'} LayoutDisplay
 */
export const displays = [ FLEX , GRID , NONE ] ;

/**
 * Layout component that switches between Flex, Grid, or plain div based on display mode.
 * Provides unified API for responsive layouts with comprehensive utilities.
 *
 * @param {Object} props
 * @param {'start'|'end'|'center'|'between'|'around'|'evenly'|'stretch'} [props.alignContent] - Align content along cross axis (Flex/Grid)
 * @param {'start'|'end'|'center'|'baseline'|'stretch'} [props.alignItems] - Align items along cross axis (Flex/Grid)
 * @param {React.ElementType} [props.as='div'] - HTML element or component to render
 * @param {string} [props.autoCols] - Grid auto-columns template (Grid only)
 * @param {string} [props.autoRows] - Grid auto-rows template (Grid only)
 * @param {string} [props.backgroundColor] - Background color utility class
 * @param {string} [props.backgroundPattern] - Background pattern utility class
 * @param {React.ReactNode} [props.children] - Child elements
 * @param {string} [props.className] - Additional class names
 * @param {number|string|Object} [props.columns] - Grid columns (Grid only) - Alias for 'cols'
 * @param {number|string|Object} [props.cols] - Grid columns (Grid only)
 * @param {'row'|'row-reverse'|'col'|'col-reverse'} [props.direction] - Flex direction (Flex only)
 * @param {'flex'|'grid'|'none'} [props.display='flex'] - Layout display mode
 * @param {string|number} [props.elevation] - Shadow/elevation level
 * @param {'row'|'col'|'dense'|'row-dense'|'col-dense'} [props.flow] - Grid flow direction (Grid only)
 * @param {number|string|Object} [props.gap] - Gap between items (all directions)
 * @param {number|string|Object} [props.gapX] - Horizontal gap between items
 * @param {number|string|Object} [props.gapY] - Vertical gap between items
 * @param {string|number|Object} [props.height] - Height utility
 * @param {'start'|'end'|'center'|'between'|'around'|'evenly'} [props.justifyContent] - Justify content along main axis (Flex/Grid)
 * @param {'start'|'end'|'center'|'stretch'} [props.justifyItems] - Justify items along main axis (Flex/Grid)
 * @param {string|number|Object} [props.margin] - Margin (all sides)
 * @param {string|number|Object} [props.marginBottom] - Bottom margin
 * @param {string|number|Object} [props.marginEnd] - End margin (RTL aware)
 * @param {string|number|Object} [props.marginLeft] - Left margin
 * @param {string|number|Object} [props.marginRight] - Right margin
 * @param {string|number|Object} [props.marginStart] - Start margin (RTL aware)
 * @param {string|number|Object} [props.marginTop] - Top margin
 * @param {string|number|Object} [props.marginX] - Horizontal margin
 * @param {string|number|Object} [props.marginY] - Vertical margin
 * @param {string|number|Object} [props.padding] - Padding (all sides)
 * @param {string|number|Object} [props.paddingBottom] - Bottom padding
 * @param {string|number|Object} [props.paddingEnd] - End padding (RTL aware)
 * @param {string|number|Object} [props.paddingLeft] - Left padding
 * @param {string|number|Object} [props.paddingRight] - Right padding
 * @param {string|number|Object} [props.paddingStart] - Start padding (RTL aware)
 * @param {string|number|Object} [props.paddingTop] - Top padding
 * @param {string|number|Object} [props.paddingX] - Horizontal padding
 * @param {string|number|Object} [props.paddingY] - Vertical padding
 * @param {string} [props.placeContent] - Place content (align + justify shorthand)
 * @param {string} [props.placeItems] - Place items (align + justify shorthand)
 * @param {'static'|'relative'|'absolute'|'fixed'|'sticky'} [props.position] - Position utility
 * @param {number|string|Object} [props.rows] - Grid rows (Grid only)
 * @param {string|number|Object} [props.size] - Size (width and height)
 * @param {string|number|Object} [props.width] - Width utility
 * @param {boolean|'wrap'|'wrap-reverse'|'nowrap'} [props.wrap] - Flex wrap behavior (Flex only)
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to the component
 *
 * @example
 * // Flex layout (default)
 * <Layout gap={4} wrap>
 *     <div>Item 1</div>
 *     <div>Item 2</div>
 * </Layout>
 *
 * @example
 * // Grid layout
 * <Layout
 *     display="grid"
 *     columns={3}
 *     gap={4}
 * >
 *     <div>Cell 1</div>
 *     <div>Cell 2</div>
 *     <div>Cell 3</div>
 * </Layout>
 *
 * @example
 * // Responsive grid with spacing
 * <Layout
 *     className="bg-base-200 rounded-lg shadow-md *:p-4 *:bg-base-300"
 *     columns={{ xs: 1, md: 2, lg: 3, xl: 4 }}
 *     display="grid"
 *     gap={{ xs: 2, md: 4 }}
 *     padding={{ xs: 2, lg: 4, xl: 8 }}
 * >
 *     <div>01</div>
 *     <div>02</div>
 *     <div>03</div>
 * </Layout>
 *
 * @example
 * // Responsive flex with direction change
 * <Layout
 *     alignItems={{ xs: 'start', lg: 'center' }}
 *     direction={{ xs: 'col', md: 'row' }}
 *     gap={{ xs: 2, md: 8, xl: 12 }}
 *     justifyContent={{ xs: 'start', lg: 'center' }}
 * >
 *     <div>Header</div>
 *     <div>Content</div>
 *     <div>Footer</div>
 * </Layout>
 *
 * @example
 * // Plain div mode
 * <Layout display="none" className="custom-container">
 *     <p>Simple container without flex or grid</p>
 * </Layout>
 */
const Layout =
({
    alignContent ,
    alignItems ,
    as ,
    autoCols ,
    autoRows ,
    backgroundColor ,
    backgroundPattern ,
    children ,
    className ,
    cols ,
    columns ,
    direction ,
    display = FLEX ,
    elevation ,
    flow ,
    gap ,
    gapX ,
    gapY ,
    height ,
    justifyContent ,
    justifyItems ,
    margin ,
    marginBottom ,
    marginEnd ,
    marginLeft ,
    marginRight ,
    marginStart ,
    marginTop ,
    marginX ,
    marginY ,
    padding ,
    paddingBottom ,
    paddingEnd ,
    paddingLeft ,
    paddingRight ,
    paddingStart ,
    paddingTop ,
    paddingX ,
    paddingY ,
    placeContent ,
    placeItems ,
    position ,
    rows ,
    size ,
    width ,
    wrap ,

    ref ,

    ...rest
}) =>
{
    // Common properties shared between Flex and Grid
    const commonProps =
    {
        alignContent ,
        alignItems ,
        as ,
        backgroundColor ,
        backgroundPattern ,
        className ,
        elevation ,
        gap ,
        gapX ,
        gapY ,
        height ,
        justifyContent ,
        justifyItems ,
        margin ,
        marginBottom ,
        marginEnd ,
        marginLeft ,
        marginRight ,
        marginStart ,
        marginTop ,
        marginX ,
        marginY ,
        padding ,
        paddingBottom ,
        paddingEnd ,
        paddingLeft ,
        paddingRight ,
        paddingStart ,
        paddingTop ,
        paddingX ,
        paddingY ,
        placeContent ,
        placeItems ,
        position ,
        ref ,
        size ,
        width ,
    } ;

    // Grid mode
    if ( display === GRID )
    {
        return (
            <Grid
                { ...commonProps }
                autoCols = { autoCols }
                autoRows = { autoRows }
                cols     = { cols || columns }
                flow     = { flow }
                rows     = { rows }
                { ...rest }
            >
                { children }
            </Grid>
        ) ;
    }

    // Flex mode
    if ( display === FLEX )
    {
        return (
            <Flex
                { ...commonProps }
                direction = { direction }
                wrap      = { wrap }
                { ...rest }
            >
                { children }
            </Flex>
        ) ;
    }

    // None mode - plain div
    const Component = as || 'div' ;

    return (
        <Component
            className = { className }
            ref       = { ref }
            { ...rest }
        >
            { children }
        </Component>
    ) ;
} ;

Layout.displayName = 'Layout' ;

export default Layout ;