'use client' ;

import isPlainObject from 'vegas-js-core/src/isPlainObject' ;

import Flex from './Flex' ;
import Grid from './Grid' ;
import useBreakpoints, { XXL } from '../../themes/hooks/useBreakpoints' ;

/**
 * Masonry layout component that distributes children across responsive columns.
 * Automatically adjusts column count based on viewport breakpoints.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element or component to render
 * @param {string} [props.backgroundColor] - Background color utility class
 * @param {string} [props.backgroundPattern] - Background pattern utility class
 * @param {React.ReactNode} [props.children] - Child elements to distribute across columns
 * @param {string} [props.className] - Additional class names for the container
 * @param {string} [props.columnClassName] - Additional class names for each column
 * @param {number|Object} [props.columns={ xs: 2, md: 3, xxl: 4 }] - Number of columns or responsive object
 * @param {string|number} [props.elevation] - Shadow/elevation level
 * @param {number|string|Object} [props.gap=4] - Gap between columns and items
 * @param {number|string|Object} [props.gapX] - Horizontal gap between columns
 * @param {number|string|Object} [props.gapY] - Vertical gap between items in columns
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
 * @param {string|number|Object} [props.width] - Width utility
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to the Grid component
 *
 * @example
 * // Simple masonry with 3 columns
 * <Masonry columns={3}>
 *     <Card>Item 1</Card>
 *     <Card>Item 2</Card>
 *     <Card>Item 3</Card>
 * </Masonry>
 *
 * @example
 * // Responsive masonry
 * <Masonry
 *     columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
 *     gap={4}
 * >
 *     <Card>Item 1</Card>
 *     <Card>Item 2</Card>
 *     <Card>Item 3</Card>
 * </Masonry>
 *
 * @example
 * // Custom column styling
 * <Masonry
 *     columns={3}
 *     columnClassName="bg-base-200 rounded-lg p-4"
 *     gap={6}
 * >
 *     <div>Content 1</div>
 *     <div>Content 2</div>
 *     <div>Content 3</div>
 * </Masonry>
 *
 * @example
 * // Gallery with different gaps
 * <Masonry
 *     columns={{ xs: 2, md: 3, xl: 4 }}
 *     gapX={4}
 *     gapY={6}
 *     padding={8}
 * >
 *     <img src="photo1.jpg" alt="Photo 1" />
 *     <img src="photo2.jpg" alt="Photo 2" />
 *     <img src="photo3.jpg" alt="Photo 3" />
 * </Masonry>
 */
const Masonry =
({
    as ,
    backgroundColor ,
    backgroundPattern ,
    children ,
    className ,
    columnClassName ,
    columns = { xs: 2, md: 3, xxl: 4 } ,
    elevation ,
    gap = 4 ,
    gapX ,
    gapY ,
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
    width ,

    ref ,

    ...rest
}) =>
{
    const { lg , md , sm , xl , [ XXL ] : xxl } = useBreakpoints() ;

    // --------- Determine current column count based on breakpoint

    const getCurrentColumnCount = () =>
    {
        // If columns is a plain number, return it directly
        if ( !isPlainObject( columns ) )
        {
            return columns || 1 ;
        }

        // Responsive columns object - cascade from largest to smallest
        if ( xxl )
        {
            return columns?.xxl ?? columns?.xl ?? columns?.lg ?? columns?.md ?? columns?.sm ?? columns?.xs ?? 1 ;
        }

        if ( xl )
        {
            return columns?.xl ?? columns?.lg ?? columns?.md ?? columns?.sm ?? columns?.xs ?? 1 ;
        }

        if ( lg )
        {
            return columns?.lg ?? columns?.md ?? columns?.sm ?? columns?.xs ?? 1 ;
        }

        if ( md )
        {
            return columns?.md ?? columns?.sm ?? columns?.xs ?? 1 ;
        }

        if ( sm )
        {
            return columns?.sm ?? columns?.xs ?? 1 ;
        }

        return columns?.xs ?? 1 ;
    } ;

    const currentColumns = getCurrentColumnCount() ;

    // --------- Distribute children across columns

    const renderColumns = () =>
    {
        if ( !children || children.length === 0 || currentColumns <= 0 )
        {
            return children ;
        }

        const columnsArray = [] ;

        for ( let i = 0 ; i < currentColumns ; i++ )
        {
            columnsArray.push(
                <Flex
                    className = { columnClassName }
                    direction = "col"
                    gap       = { gap }
                    gapX      = { gapX }
                    gapY      = { gapY }
                    key       = { `column-${i}` }
                >
                    { children.filter( ( _, index ) => index % currentColumns === i ) }
                </Flex>
            ) ;
        }

        return columnsArray ;
    } ;

    // --------- Render Grid container with columns

    return (
        <Grid
            as                = { as }
            backgroundColor   = { backgroundColor }
            backgroundPattern = { backgroundPattern }
            className         = { className }
            cols              = { columns }
            elevation         = { elevation }
            gap               = { gap }
            gapX              = { gapX }
            gapY              = { gapY }
            margin            = { margin }
            marginBottom      = { marginBottom }
            marginEnd         = { marginEnd }
            marginLeft        = { marginLeft }
            marginRight       = { marginRight }
            marginStart       = { marginStart }
            marginTop         = { marginTop }
            marginX           = { marginX }
            marginY           = { marginY }
            padding           = { padding }
            paddingBottom     = { paddingBottom }
            paddingEnd        = { paddingEnd }
            paddingLeft       = { paddingLeft }
            paddingRight      = { paddingRight }
            paddingStart      = { paddingStart }
            paddingTop        = { paddingTop }
            paddingX          = { paddingX }
            paddingY          = { paddingY }
            ref               = { ref }
            width             = { width }
            { ...rest }
        >
            { renderColumns() }
        </Grid>
    ) ;
} ;

Masonry.displayName = 'Masonry' ;

export default Masonry ;