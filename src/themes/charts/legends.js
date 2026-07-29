/**
 * Chart legend presets.
 *
 * nivo legends are configured through a dozen positional fields
 * (`anchor`, `direction`, `translateX/Y`, `itemWidth`, `symbolShape`…),
 * which in practice get copy-pasted from chart to chart and drift. These
 * presets reduce that to `legend={ position : 'bottom' }`.
 *
 * Item colors are intentionally left unset so nivo inherits them from
 * `theme.legends` — hardcoding something like `itemTextColor : '#999'`
 * produces a legend that disappears in the dark theme.
 *
 * @module themes/charts/legends
 */

/**
 * Extra room, in px, a legend needs on its own side.
 *
 * Consumed by `getChartMargin` so the margin and the legend placement
 * cannot disagree.
 *
 * @type {Object.<string,number>}
 */
export const LEGEND_SPACE =
{
    bottom : 52 ,
    top    : 40 ,
    right  : 132 ,
    left   : 132 ,
} ;

/**
 * The supported legend positions.
 * @type {string[]}
 */
export const legendPositions = [ 'bottom' , 'top' , 'right' , 'left' ] ;

const ANCHORS =
{
    bottom : { anchor : 'bottom' , direction : 'row'    } ,
    top    : { anchor : 'top'    , direction : 'row'    } ,
    right  : { anchor : 'right'  , direction : 'column' } ,
    left   : { anchor : 'left'   , direction : 'column' } ,
} ;

/**
 * Normalizes the `legend` prop into `{ position , ...overrides }`, or `null`
 * when the legend is disabled.
 *
 * @param {boolean|string|Object} [legend] - `false`, `true`, a position, or a config object.
 * @returns {Object|null} The normalized config.
 */
export const resolveLegend = ( legend ) =>
{
    if ( legend === false || legend === undefined || legend === null )
    {
        return null ;
    }

    if ( legend === true )
    {
        return { position : 'bottom' } ;
    }

    if ( typeof legend === 'string' )
    {
        return { position : legend } ;
    }

    return { position : 'bottom' , ...legend } ;
} ;

/**
 * Builds the nivo `legends` array from a position preset.
 *
 * The translation is derived from the already-computed `margin`, so the
 * legend always lands inside the room `getChartMargin` reserved for it —
 * whatever the axes added on the same side.
 *
 * @param {Object} [props]
 * @param {boolean|string|Object} [props.legend] - The `legend` prop.
 * @param {Object} [props.margin] - The resolved chart margin.
 *
 * @returns {Object[]|undefined} A nivo `legends` array, or `undefined` when disabled.
 *
 * @example
 * ```js
 * getChartLegends( { legend : 'right' , margin } ) ;
 * ```
 */
export const getChartLegends = ( { legend , margin } = {} ) =>
{
    const resolved = resolveLegend( legend ) ;

    if ( !resolved )
    {
        return undefined ;
    }

    const { position = 'bottom' , ...overrides } = resolved ;

    const { anchor , direction } = ANCHORS[ position ] ?? ANCHORS.bottom ;

    const inset = 12 ;

    let translateX = 0 ;
    let translateY = 0 ;

    switch ( position )
    {
        case 'right' :
            translateX = ( margin?.right ?? LEGEND_SPACE.right ) - inset ;
            break ;

        case 'left' :
            translateX = -( ( margin?.left ?? LEGEND_SPACE.left ) - inset ) ;
            break ;

        case 'top' :
            translateY = -( ( margin?.top ?? LEGEND_SPACE.top ) - inset ) ;
            break ;

        default :
            translateY = ( margin?.bottom ?? LEGEND_SPACE.bottom ) - inset ;
            break ;
    }

    return [
        {
            anchor ,
            direction ,
            translateX ,
            translateY ,
            justify       : false ,
            itemsSpacing  : direction === 'column' ? 4 : 8 ,
            itemWidth     : direction === 'column' ? 100 : 90 ,
            itemHeight    : 18 ,
            itemDirection : 'left-to-right' ,
            itemOpacity   : 0.85 ,
            symbolSize    : 12 ,
            symbolShape   : 'circle' ,
            effects       : [ { on : 'hover' , style : { itemOpacity : 1 } } ] ,
            ...overrides ,
        } ,
    ] ;
} ;

export default getChartLegends ;
