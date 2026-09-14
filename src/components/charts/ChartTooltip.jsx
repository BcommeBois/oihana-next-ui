'use client' ;

/**
 * Chart tooltip built on DaisyUI classes.
 *
 * @module components/charts/ChartTooltip
 */

import { useLayoutEffect , useRef , useState } from 'react' ;

import useChartPointer from '../../contexts/chartPointer/useChartPointer' ;

import placeFloating from '../../themes/helpers/placeFloating' ;

import Portal from '../Portal' ;

import
{
    CHART_TOOLTIP_CHIP ,
    CHART_TOOLTIP_LABEL ,
    CHART_TOOLTIP_LIST ,
    CHART_TOOLTIP_VALUE ,
    getChartTooltipClasses ,
    getChartTooltipItemClasses ,
    getChartTooltipTitleClasses ,
} from '../../themes/charts/tooltip' ;

/**
 * Tooltip shown on chart hover.
 *
 * nivo's own tooltip is styled through inline styles in the theme object,
 * which means restating background, border, radius and shadow instead of
 * reusing the design tokens. This one is plain HTML with DaisyUI classes, so
 * it follows the theme — including the dark variant — on its own. The nivo
 * `theme.tooltip.container` is neutralized in `buildChartTheme` so this
 * component owns the whole look.
 *
 * Accepts either a single row (`label` / `value` / `color`) or several
 * through `items`, which is what a stacked bar or a line slice needs.
 *
 * ### It places itself, because nivo does not
 *
 * nivo positions its tooltip from the cursor and **never turns it round** : the
 * bubble is centred above the pointer and nothing brings it back inside when it
 * runs past an edge. On the last point of a series — the one a reader looks at
 * most — half of it lands outside the page and is cut. Nothing in nivo's API
 * fixes that : the anchor is not a prop, and its one fallback only swaps sides
 * according to which half of the *container* the cursor is in, which says
 * nothing about the room the window leaves.
 *
 * So the bubble is taken out of nivo's hands : it goes into a `Portal` and is
 * placed by {@link module:themes/helpers/placeFloating}, the same function the
 * floating tooltip uses — above the pointer by preference, under it when the
 * window has no room above, and pulled back inside on both axes. A portal
 * rather than a correcting transform because an ancestor with `overflow-hidden`
 * — a card — cuts the bubble just as surely as the window does, and only a
 * portal escapes that. `FloatingTip` exists for the same reason.
 *
 * **This changes nothing for the chart components** : nivo's own wrapper still
 * renders, empty, where it always did. What it does cost is nivo's spring : the
 * bubble no longer glides from point to point, it is simply where it belongs at
 * every move. On a figure being read, that is the better of the two.
 *
 * Placement needs the cursor, which comes from `ChartFrame` through
 * {@link module:contexts/chartPointer/useChartPointer}. **Without it the bubble
 * stays exactly where it was rendered** — outside a chart, or before a pointer
 * has been seen, this component behaves as it did before it could float.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes for the container.
 * @param {string} [props.color] - Series color, shown as a chip. Single-row form.
 * @param {boolean} [props.float=true] - Let the bubble place itself against the window. `false` leaves it in the flow, where nivo put it — for a `ChartTooltip` rendered outside a chart, a documentation page showing what one looks like.
 * @param {Array<{color?:string,label?:React.ReactNode,value?:React.ReactNode}>} [props.items] - Several rows.
 * @param {React.ReactNode} [props.label] - Series label. Single-row form.
 * @param {React.ReactNode} [props.title] - Optional heading (usually the hovered index).
 * @param {React.ReactNode} [props.value] - Formatted value. Single-row form.
 *
 * @example
 * ```jsx
 * <ChartTooltip title="FR" color="#E12A27" label="burger" value={ 12 } />
 * ```
 *
 * @example
 * ```jsx
 * <ChartTooltip
 *     title = "2024-03"
 *     items = {[
 *         { color : '#E12A27' , label : 'france' , value : 120 } ,
 *         { color : '#F9BF05' , label : 'norway' , value : 98  } ,
 *     ]}
 * />
 * ```
 */
const ChartTooltip =
({
    className ,
    color ,
    float = true ,
    items ,
    label ,
    title ,
    value ,
}) =>
{
    const rows = items ?? [ { color , label , value } ] ;

    const pointer = useChartPointer() ;

    const bubbleRef = useRef( null ) ;

    const [ at , setAt ] = useState( null ) ;

    // No dependencies : the tooltip is re-rendered at every move of the pointer,
    // and every one of them is a new position to answer. What stops the loop is
    // the comparison below, not a dependency list — a placement that has not
    // moved returns the previous object, and React renders nothing.
    //
    // A layout effect, so the bubble is measured and placed before the browser
    // paints : the first pass draws it where nivo put it, and no eye ever sees
    // that frame.
    useLayoutEffect( () =>
    {
        if ( !float || !bubbleRef.current )
        {
            return ;
        }

        // Read here rather than during the render : a ref holds no value a
        // render may depend on, and this one is written by an event handler
        // that has already run by the time this effect does.
        const point = pointer?.current ;

        if ( !point )
        {
            return ;
        }

        const bubble = bubbleRef.current.getBoundingClientRect() ;

        // The anchor is the cursor : a point with no width and no height, which
        // `placeFloating` centres the bubble on exactly as nivo does — and then,
        // unlike nivo, turns round and holds inside the window.
        const next = placeFloating
        (
            { bottom : point.y , height : 0 , left : point.x , right : point.x , top : point.y , width : 0 } ,
            bubble ,
            { height : window.innerHeight , width : window.innerWidth } ,
        ) ;

        setAt( ( previous ) => previous?.left === next.left && previous?.top === next.top
            ? previous
            : next ) ;
    } ) ;

    const bubble = (
        <div
            ref       = { bubbleRef }
            className = { getChartTooltipClasses( { className , floating : at !== null } ) }
            style     = { at === null ? undefined : { left : at.left , top : at.top } }
        >

            { title !== undefined && title !== null && (
                <div className={ getChartTooltipTitleClasses() }>
                    { title }
                </div>
            ) }

            <div className={ CHART_TOOLTIP_LIST }>
                { rows.map( ( row , index ) => (
                    <div
                        key       = { `${ row?.label ?? '' }-${ index }` }
                        className = { getChartTooltipItemClasses() }
                    >
                        { row?.color && (
                            <span
                                className = { CHART_TOOLTIP_CHIP }
                                style     = {{ backgroundColor : row.color }}
                            />
                        ) }

                        { row?.label !== undefined && row?.label !== null && (
                            <span className={ CHART_TOOLTIP_LABEL }>
                                { row.label }
                            </span>
                        ) }

                        { row?.value !== undefined && row?.value !== null && (
                            <span className={ CHART_TOOLTIP_VALUE }>
                                { row.value }
                            </span>
                        ) }
                    </div>
                ) ) }
            </div>

        </div>
    ) ;

    // Until a placement is known the bubble stays in the flow — it has to be
    // rendered to be measured, and where nivo put it is the least wrong place to
    // measure it. That is also the state it keeps for good outside a chart.
    return at === null ? bubble : <Portal>{ bubble }</Portal> ;
} ;

ChartTooltip.displayName = 'ChartTooltip' ;

export default ChartTooltip ;
