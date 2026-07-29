/**
 * Chart axis configuration.
 *
 * Maps the `xAxis` / `yAxis` props onto nivo's `axisBottom` / `axisLeft`,
 * and computes the `legendOffset` — the value that decides whether an axis
 * title lands next to its ticks or on top of them, and which is otherwise
 * hand-tuned per chart.
 *
 * @module themes/charts/axes
 */

import dayjs from '../../helpers/date/configureDayjs' ;

/**
 * Default tick formatter for a time scale.
 *
 * `Intl` is used rather than a fixed `'D MMM'` token so the day/month order
 * follows the locale instead of being frozen to the French one. The active
 * locale comes from dayjs, which the LangProvider keeps in sync.
 *
 * @param {Date|string|number} value - The tick value.
 * @returns {string} The formatted tick.
 */
export const formatTimeTick = ( value ) =>
{
    const date = value instanceof Date ? value : new Date( value ) ;

    if ( Number.isNaN( date.getTime() ) )
    {
        return String( value ) ;
    }

    try
    {
        return new Intl.DateTimeFormat( dayjs.locale() , { day : 'numeric' , month : 'short' } ).format( date ) ;
    }
    catch
    {
        return dayjs( date ).format( 'D MMM' ) ;
    }
} ;

/**
 * Builds a nivo axis config from an `xAxis` / `yAxis` prop.
 *
 * Returns `null` when the axis is absent or hidden — which is what nivo
 * expects to skip drawing it.
 *
 * @param {Object} [props]
 * @param {Object|boolean} [props.axis] - The axis prop — `{ legend , format , tickRotation , tickValues , hide }`.
 * @param {Object} [props.margin] - The resolved chart margin, used for the title offset.
 * @param {string} [props.position='bottom'] - `'bottom'` or `'left'`.
 * @param {string} [props.scale] - The scale type ; `'time'` selects the default time formatter.
 *
 * @returns {Object|null} A nivo axis config, or `null`.
 *
 * @example
 * ```js
 * getChartAxis( { axis : { legend : 'country' } , margin , position : 'bottom' } ) ;
 * ```
 */
export const getChartAxis = ( { axis , margin , position = 'bottom' , scale } = {} ) =>
{
    if ( axis === false || axis === null || axis === undefined )
    {
        return null ;
    }

    const config = axis === true ? {} : axis ;

    if ( config.hide )
    {
        return null ;
    }

    // `hide` is consumed above — pulled out so it does not leak into the nivo config.
    const { format , hide : _hide , legend , legendOffset , tickRotation , ...rest } = config ;

    const offset = legendOffset ?? ( position === 'bottom'
        ? ( tickRotation ? 52 : 34 )
        : -Math.max( ( margin?.left ?? 48 ) - 14 , 30 ) ) ;

    return {
        legend ,
        legendPosition : 'middle' ,
        legendOffset   : offset ,
        tickRotation   : tickRotation ?? 0 ,
        tickSize       : 5 ,
        tickPadding    : 6 ,
        format         : format ?? ( scale === 'time' ? formatTimeTick : undefined ) ,
        ...rest ,
    } ;
} ;

export default getChartAxis ;
