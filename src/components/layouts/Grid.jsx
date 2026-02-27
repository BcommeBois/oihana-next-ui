import getGridClassNames from '@/themes/layout/getGridClassNames' ;

/**
 * Grid layout component with comprehensive CSS Grid utilities.
 *
 * @param {Object} props
 * @param {'start'|'end'|'center'|'between'|'around'|'evenly'|'stretch'} [props.alignContent] - Align content along block axis
 * @param {'start'|'end'|'center'|'baseline'|'stretch'} [props.alignItems] - Align items along block axis
 * @param {string} [props.autoCols] - Grid auto-columns template
 * @param {string} [props.autoRows] - Grid auto-rows template
 * @param {string} [props.backgroundColor] - Background color utility class
 * @param {string} [props.backgroundPattern] - Background pattern utility class
 * @param {React.ReactNode} [props.children] - Child elements
 * @param {string} [props.className] - Additional class names
 * @param {number|string} [props.cols] - Number of columns or template
 * @param {React.ElementType} [props.Component='div'] - HTML element or component to render
 * @param {string|number} [props.elevation] - Shadow/elevation level
 * @param {'row'|'col'|'dense'|'row-dense'|'col-dense'} [props.flow] - Grid flow direction
 * @param {number|string} [props.gap] - Gap between items (all directions)
 * @param {number|string} [props.gapX] - Horizontal gap between items
 * @param {number|string} [props.gapY] - Vertical gap between items
 * @param {string|number} [props.height] - Height utility
 * @param {'start'|'end'|'center'|'between'|'around'|'evenly'} [props.justifyContent] - Justify content along inline axis
 * @param {'start'|'end'|'center'|'stretch'} [props.justifyItems] - Justify items along inline axis
 * @param {string|number} [props.margin] - Margin (all sides)
 * @param {string|number} [props.marginBottom] - Bottom margin
 * @param {string|number} [props.marginEnd] - End margin (RTL aware)
 * @param {string|number} [props.marginLeft] - Left margin
 * @param {string|number} [props.marginRight] - Right margin
 * @param {string|number} [props.marginStart] - Start margin (RTL aware)
 * @param {string|number} [props.marginTop] - Top margin
 * @param {string|number} [props.marginX] - Horizontal margin
 * @param {string|number} [props.marginY] - Vertical margin
 * @param {string|number} [props.padding] - Padding (all sides)
 * @param {string|number} [props.paddingBottom] - Bottom padding
 * @param {string|number} [props.paddingEnd] - End padding (RTL aware)
 * @param {string|number} [props.paddingLeft] - Left padding
 * @param {string|number} [props.paddingRight] - Right padding
 * @param {string|number} [props.paddingStart] - Start padding (RTL aware)
 * @param {string|number} [props.paddingTop] - Top padding
 * @param {string|number} [props.paddingX] - Horizontal padding
 * @param {string|number} [props.paddingY] - Vertical padding
 * @param {string} [props.placeContent] - Place content (align + justify shorthand)
 * @param {string} [props.placeItems] - Place items (align + justify shorthand)
 * @param {'static'|'relative'|'absolute'|'fixed'|'sticky'} [props.position] - Position utility
 * @param {number|string} [props.rows] - Number of rows or template
 * @param {string|number} [props.size] - Size (width and height)
 * @param {string|number} [props.width] - Width utility
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to the component
 *
 * @example
 * // Simple 2-column grid
 * <Grid cols={2} gap={4}>
 *     <div>Item 1</div>
 *     <div>Item 2</div>
 * </Grid>
 *
 * @example
 * // Responsive grid with custom styling
 * <Grid
 *     className="*:bg-base-200 *:shadow *:rounded-md *:p-4"
 *     cols={[1, 2, 3]}
 *     gap={4}
 *     width="full"
 * >
 *     <div>01</div>
 *     <div>02</div>
 *     <div>03</div>
 * </Grid>
 *
 * @example
 * // Grid with auto-sizing
 * <Grid
 *     autoCols="minmax(0, 1fr)"
 *     flow="col"
 *     gap={6}
 *     padding={8}
 * >
 *     <div>Auto 1</div>
 *     <div>Auto 2</div>
 *     <div>Auto 3</div>
 * </Grid>
 *
 * @example
 * // Custom component with alignment
 * <Grid
 *     Component="section"
 *     cols={3}
 *     rows={2}
 *     gap={4}
 *     alignItems="center"
 *     justifyItems="center"
 *     className="bg-base-100 rounded-lg"
 * >
 *     <div>Cell 1</div>
 *     <div>Cell 2</div>
 *     <div>Cell 3</div>
 * </Grid>
 */
const Grid =
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

    ref ,

    ...rest
}) =>
{
    const classNames = getGridClassNames(
    {
        alignContent ,
        alignItems ,
        autoCols ,
        autoRows ,
        backgroundColor ,
        backgroundPattern ,
        className ,
        cols ,
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
    }) ;

    const Component = as ?? 'div' ;

    return (
        <Component
            className = { classNames }
            { ...rest }
        >
            { children }
        </Component>
    ) ;
} ;

Grid.displayName = 'Grid' ;

export default Grid ;