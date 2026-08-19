import getGridItemClassNames from '../../themes/layout/getGridItemClassNames' ;

/**
 * A cell of a {@link module:components/layouts/Grid} — where it starts, and how far it reaches.
 *
 * `Grid` has always described the container ; nothing described the child, so a cell that
 * had to cover two columns fell back to a literal `col-span-2` in the calling code. The
 * four placement properties are here instead, and with them `alignSelf` / `justifySelf` /
 * `placeSelf`, which `getLayoutClassNames` has carried all along with no component able
 * to reach them.
 *
 * Every placement value takes a scalar **or** a breakpoint object — `colSpan={ { xs: 1,
 * md: 2 } }` — through the same `getResponsiveDefinition` the rest of the library uses.
 *
 * ### Reading order
 *
 * `colStart` / `rowStart`, and `flow="dense"` on the container, **move a cell visually
 * without moving it in the DOM**. The DOM is what a screen reader reads and what the tab
 * key follows, so a layout that reorders is a layout that reads in one order and looks
 * like another. Reorder the children when you can, and place them only when you cannot.
 *
 * ### `container`
 *
 * Spans answer to the viewport — a four column grid only exists past `md`. A cell's
 * *content* answers to the cell : a 2×2 hero and a 1×1 cell sit at the same viewport
 * width and at two very different widths of their own. `container` opts the cell into a
 * container query so its content can respond in `@sm:` / `@md:`. Off by default : a
 * containment context has side effects nobody asked for.
 *
 * @module components/layouts/GridItem
 *
 * @param {Object} props
 * @param {'auto'|'start'|'end'|'center'|'stretch'|'baseline'} [props.alignSelf] - Align this cell along the block axis
 * @param {React.ElementType} [props.as='div'] - HTML element or component to render
 * @param {string} [props.backgroundColor] - Background color utility class
 * @param {string} [props.borderColor] - Border color utility class
 * @param {string|number} [props.borderRadius] - Border radius utility
 * @param {React.ReactNode} [props.children] - Cell content
 * @param {string} [props.className] - Additional class names
 * @param {import('../../themes/layout/colSpan').ColSpanValue} [props.colSpan] - Columns the cell covers — `1`–`12`, `'full'`, `'auto'`
 * @param {import('../../themes/layout/colStart').ColStartValue} [props.colStart] - Grid line the cell starts at — `1`–`13`, `'auto'`
 * @param {boolean} [props.container=false] - Turn the cell into a container query context
 * @param {string|number} [props.height] - Height utility
 * @param {'auto'|'start'|'end'|'center'|'stretch'} [props.justifySelf] - Justify this cell along the inline axis
 * @param {string|number} [props.margin] - Margin (all sides)
 * @param {string|number} [props.marginBottom] - Bottom margin
 * @param {string|number} [props.marginEnd] - End margin (RTL aware)
 * @param {string|number} [props.marginLeft] - Left margin
 * @param {string|number} [props.marginRight] - Right margin
 * @param {string|number} [props.marginStart] - Start margin (RTL aware)
 * @param {string|number} [props.marginTop] - Top margin
 * @param {string|number} [props.marginX] - Horizontal margin
 * @param {string|number} [props.marginY] - Vertical margin
 * @param {string|number} [props.maxHeight] - Max height utility
 * @param {string|number} [props.maxWidth] - Max width utility
 * @param {string|number} [props.minHeight] - Min height utility
 * @param {string|number} [props.minWidth] - Min width utility
 * @param {string} [props.overflow] - Overflow utility
 * @param {string|number} [props.padding] - Padding (all sides)
 * @param {string|number} [props.paddingBottom] - Bottom padding
 * @param {string|number} [props.paddingEnd] - End padding (RTL aware)
 * @param {string|number} [props.paddingLeft] - Left padding
 * @param {string|number} [props.paddingRight] - Right padding
 * @param {string|number} [props.paddingStart] - Start padding (RTL aware)
 * @param {string|number} [props.paddingTop] - Top padding
 * @param {string|number} [props.paddingX] - Horizontal padding
 * @param {string|number} [props.paddingY] - Vertical padding
 * @param {string} [props.placeSelf] - Place self (align + justify shorthand)
 * @param {'static'|'relative'|'absolute'|'fixed'|'sticky'} [props.position] - Position utility
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {import('../../themes/layout/rowSpan').RowSpanValue} [props.rowSpan] - Rows the cell covers — `1`–`6`, `'full'`, `'auto'`
 * @param {import('../../themes/layout/rowStart').RowStartValue} [props.rowStart] - Grid line the cell starts at — `1`–`7`, `'auto'`
 * @param {string|number} [props.size] - Size (width and height)
 * @param {string|number} [props.width] - Width utility
 * @param {string|number} [props.zIndex] - Z-index utility
 * @param {Object} [props.rest] - Additional props forwarded to the component
 *
 * @example
 * // A hero cell over two columns and two rows
 * <Grid cols={ { xs: 1, md: 4 } } gap={4} flow="dense">
 *     <GridItem colSpan={ { md: 2 } } rowSpan={ { md: 2 } }>Hero</GridItem>
 *     <GridItem colSpan={ { md: 2 } }>Second</GridItem>
 *     <GridItem>Third</GridItem>
 * </Grid>
 *
 * @example
 * // `as` takes a component, so the cell is the card — no BentoCard needed
 * <Grid cols={4} gap={4}>
 *     <GridItem as={ Card } colSpan={2} rowSpan={2} title="Featured">
 *         <p>Two by two.</p>
 *     </GridItem>
 * </Grid>
 *
 * @example
 * // Explicit placement : the sidebar is pinned to the last column, whatever precedes it
 * <Grid cols={12} gap={4}>
 *     <GridItem colSpan={9}>Main</GridItem>
 *     <GridItem colStart={10} colSpan={3}>Sidebar</GridItem>
 * </Grid>
 *
 * @example
 * // The cell answers to the viewport, its content answers to the cell
 * <GridItem colSpan={ { md: 2 } } container className="p-4">
 *     <div className="flex flex-col @md:flex-row gap-4">…</div>
 * </GridItem>
 */
const GridItem =
({
    alignSelf ,
    as ,
    backgroundColor ,
    borderColor ,
    borderRadius ,
    children ,
    className ,
    colSpan ,
    colStart ,
    container ,
    height ,
    justifySelf ,
    margin ,
    marginBottom ,
    marginEnd ,
    marginLeft ,
    marginRight ,
    marginStart ,
    marginTop ,
    marginX ,
    marginY ,
    maxHeight ,
    maxWidth ,
    minHeight ,
    minWidth ,
    overflow ,
    padding ,
    paddingBottom ,
    paddingEnd ,
    paddingLeft ,
    paddingRight ,
    paddingStart ,
    paddingTop ,
    paddingX ,
    paddingY ,
    placeSelf ,
    position ,
    rowSpan ,
    rowStart ,
    size ,
    width ,
    zIndex ,

    ref ,

    ...rest
}) =>
{
    const classNames = getGridItemClassNames(
    {
        alignSelf ,
        backgroundColor ,
        borderColor ,
        borderRadius ,
        className ,
        colSpan ,
        colStart ,
        container ,
        height ,
        justifySelf ,
        margin ,
        marginBottom ,
        marginEnd ,
        marginLeft ,
        marginRight ,
        marginStart ,
        marginTop ,
        marginX ,
        marginY ,
        maxHeight ,
        maxWidth ,
        minHeight ,
        minWidth ,
        overflow ,
        padding ,
        paddingBottom ,
        paddingEnd ,
        paddingLeft ,
        paddingRight ,
        paddingStart ,
        paddingTop ,
        paddingX ,
        paddingY ,
        placeSelf ,
        position ,
        rowSpan ,
        rowStart ,
        size ,
        width ,
        zIndex ,
    }) ;

    const Component = as ?? 'div' ;

    return (
        <Component
            className = { classNames }
            ref       = { ref }
            { ...rest }
        >
            { children }
        </Component>
    ) ;
} ;

GridItem.displayName = 'GridItem' ;

export default GridItem ;
