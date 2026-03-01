import getFlexClassNames from '../../themes/layout/getFlexClassNames' ;

/**
 * Flex layout component with comprehensive flexbox utilities.
 *
 * @param {Object} props
 * @param {'start'|'end'|'center'|'between'|'around'|'evenly'|'stretch'} [props.alignContent] - Align content along cross axis
 * @param {'start'|'end'|'center'|'baseline'|'stretch'} [props.alignItems] - Align items along cross axis
 * @param {string} [props.backgroundColor] - Background color utility class
 * @param {string} [props.backgroundPattern] - Background pattern utility class
 * @param {React.ReactNode} [props.children] - Child elements
 * @param {string} [props.className] - Additional class names
 * @param {React.ElementType} [props.as='div'] - HTML element or component to render
 * @param {'row'|'row-reverse'|'col'|'col-reverse'} [props.direction] - Flex direction
 * @param {string|number} [props.elevation] - Shadow/elevation level
 * @param {number|string} [props.gap] - Gap between items (all directions)
 * @param {number|string} [props.gapX] - Horizontal gap between items
 * @param {number|string} [props.gapY] - Vertical gap between items
 * @param {string|number} [props.height] - Height utility
 * @param {'start'|'end'|'center'|'between'|'around'|'evenly'} [props.justifyContent] - Justify content along main axis
 * @param {'start'|'end'|'center'|'stretch'} [props.justifyItems] - Justify items along main axis
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
 * @param {string|number} [props.size] - Size (width and height)
 * @param {string|number} [props.width] - Width utility
 * @param {boolean|'wrap'|'wrap-reverse'|'nowrap'} [props.wrap] - Flex wrap behavior
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to the component
 *
 * @example
 * // Simple horizontal flex
 * <Flex gap={4}>
 *     <div>Item 1</div>
 *     <div>Item 2</div>
 * </Flex>
 *
 * @example
 * // Centered column with spacing
 * <Flex
 *     direction="col"
 *     alignItems="center"
 *     justifyContent="center"
 *     gap={6}
 *     padding={8}
 * >
 *     <h2>Title</h2>
 *     <p>Content</p>
 * </Flex>
 *
 * @example
 * // Custom component with styling
 * <Flex
 *     Component="section"
 *     className="bg-base-200 rounded-lg shadow-md"
 *     direction="row"
 *     wrap
 *     gap={4}
 *     padding={4}
 * >
 *     <div className="p-4 bg-base-300">01</div>
 *     <div className="p-4 bg-base-300">02</div>
 * </Flex>
 *
 * @example
 * // Responsive spacing
 * <Flex
 *     direction="col"
 *     gap={[2, 4, 6]}
 *     paddingX={[4, 6, 8]}
 * >
 *     <div>Responsive item 1</div>
 *     <div>Responsive item 2</div>
 * </Flex>
 */
const Flex =
({
    alignContent ,
    alignItems ,
    as ,
    backgroundColor ,
    backgroundPattern ,
    children ,
    className ,
    direction ,
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
    size ,
    width ,
    wrap ,

    ref ,

    ...rest
}) =>
{
    const Component = as ?? 'div' ;

    const classNames = getFlexClassNames( {
        alignContent ,
        alignItems ,
        backgroundColor ,
        backgroundPattern ,
        className ,
        direction ,
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
        size ,
        width ,
        wrap ,
    }) ;

    return (
        <Component
            className = { classNames}
            ref       = { ref }
            { ...rest }
        >
            { children }
        </Component>
    ) ;
} ;

Flex.displayName = 'Flex' ;

export default Flex ;