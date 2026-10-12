'use client' ;

import { useMemo , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import BarChart         from '@/components/charts/BarChart' ;
import BarList          from '@/components/metrics/BarList' ;
import Delta            from '@/components/metrics/Delta' ;
import LineChart        from '@/components/charts/LineChart' ;
import RadialBarChart   from '@/components/charts/RadialBarChart' ;
import Rating           from '@/components/rating/Rating' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Sparkline        from '@/components/metrics/Sparkline' ;
import Stat             from '@/components/stats/Stat' ;
import Stats            from '@/components/stats/Stats' ;
import Tracker          from '@/components/metrics/Tracker' ;
import WaffleChart      from '@/components/charts/WaffleChart' ;

import useNumberFormat from '@/hooks/useNumberFormat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import { byMonth , DAY , noise , Panel , PERIODS , UsedComponents , useToday } from './shared' ;

const CATEGORIES = [ [ 'furniture' , 0.38 ] , [ 'lighting' , 0.21 ] , [ 'textile' , 0.17 ] , [ 'decoration' , 0.15 ] , [ 'kitchen' , 0.09 ] ] ;

const CHANNELS = [ [ 'web' , 52 ] , [ 'market' , 23 ] , [ 'shop' , 17 ] , [ 'phone' , 8 ] ] ;

const REASONS = [ [ 'delivery' , 0.41 ] , [ 'product' , 0.27 ] , [ 'billing' , 0.19 ] , [ 'account' , 0.13 ] ] ;

const PRODUCTS = [ [ 189 , 0.16 ] , [ 79 , 0.13 ] , [ 349 , 0.07 ] , [ 59 , 0.11 ] , [ 129 , 0.06 ] ] ;

/** How many satisfaction blocks the tracker shows at most. */
const RATED_DAYS = 90 ;

/**
 * What the shop measured on one day — the same figures every time the day is asked for.
 */
const measure = day =>
{
    const weekday = new Date( day * DAY ).getUTCDay() ;
    const weekend = weekday === 0 || weekday === 6 ;

    // A year-round swell, highest in late autumn.
    const season  = 1 + 0.25 * Math.sin( ( ( day % 365 ) / 365 ) * 2 * Math.PI - 1.2 ) ;

    const orders  = Math.round( 95 * season * ( weekend ? 1.25 : 1 ) * ( 0.8 + noise( day * 3 ) * 0.4 ) ) ;
    const basket  = 62 + noise( day * 5 ) * 22 ;
    const tickets = Math.round( orders * ( 0.16 + noise( day * 11 ) * 0.08 ) ) ;
    const rating  = 3.6 + noise( day * 19 ) * 1.3 ;

    return { day , orders , rating , revenue : orders * basket , tickets } ;
} ;

/**
 * The days of a window ending on `end` (included), oldest first.
 */
const lastDays = ( end , length ) => Array.from( { length } , ( _ , index ) => measure( end - length + 1 + index ) ) ;

/**
 * Totals and averages over a run of days.
 */
const summarize = days =>
{
    const tickets = days.reduce( ( sum , day ) => sum + day.tickets , 0 ) ;
    return {
        orders  : days.reduce( ( sum , day ) => sum + day.orders , 0 ) ,
        // Most tickets close within days : what is still open is a share of the period's.
        open    : Math.round( tickets * 0.12 ) ,
        rating  : days.reduce( ( sum , day ) => sum + day.rating , 0 ) / days.length ,
        revenue : days.reduce( ( sum , day ) => sum + day.revenue , 0 ) ,
        tickets ,
    } ;
} ;

/**
 * The components the screen is built of, and the page that shows each one.
 */
const USED =
[
    { href : '/components/stat'    , name : 'Stats' } ,
    { href : '/modules/metrics'    , name : 'Delta' } ,
    { href : '/modules/metrics'    , name : 'Sparkline' } ,
    { href : '/modules/charts'     , name : 'LineChart' } ,
    { href : '/modules/metrics'    , name : 'BarList' } ,
    { href : '/modules/grids'      , name : 'WaffleChart' } ,
    { href : '/modules/charts'     , name : 'BarChart' } ,
    { href : '/modules/circulars'  , name : 'RadialBarChart' } ,
    { href : '/components/rating'  , name : 'Rating' } ,
    { href : '/modules/metrics'    , name : 'Tracker' } ,
    { href : '/components/buttons' , name : 'SegmentedControl' } ,
] ;

/**
 * Sales and customer service, as a dashboard.
 *
 * The revenue, the orders, the tickets still open and the satisfaction of the
 * period against the one before ; the revenue against the same period last
 * year ; sales by category and by channel ; tickets by reason and how fast they
 * got a first answer ; the rating, and day by day ; the best sellers. The data
 * is generated from a seed per day, the window ending today.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scenarios.dashboards.customers'] - Dot notation path to the demo locale.
 */
const CustomersDemo = ( { path = 'demo.scenarios.dashboards.customers' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const { formatCompact , formatNumber , locale } = useNumberFormat() ;

    const today = useToday() ;

    const [ period , setPeriod ] = useState( 'month' ) ;

    const data = useMemo( () =>
    {
        if ( today === null )
        {
            return null ;
        }

        const length   = PERIODS[ period ] ;
        const current  = lastDays( today , length ) ;
        const previous = lastDays( today - length , length ) ;
        const lastYear = lastDays( today - 365 , length ) ;

        const group = days => ( period === 'year'
            ? byMonth( days ).slice( -12 ).map( ( { days : list , key } ) => ( { key , ...summarize( list ) } ) )
            : days ) ;

        return { before : summarize( previous ) , current , lastYear : group( lastYear ) , now : summarize( current ) , points : group( current ) } ;
    }
    , [ period , today ] ) ;

    if ( !data )
    {
        return (
            <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">
                <p className="text-sm text-base-content/70">{ t.intro }</p>
            </Container>
        ) ;
    }

    const { before , current , lastYear , now , points } = data ;

    const euros   = value => formatNumber( value , { currency : 'EUR' , maximumFractionDigits : 0 , style : 'currency' } ) ;
    const decimal = value => formatNumber( value , { maximumFractionDigits : 1 , minimumFractionDigits : 1 } ) ;

    const dayLabel   = day => new Date( day * DAY ).toLocaleDateString( locale , { day : 'numeric' , month : 'short' , timeZone : 'UTC' } ) ;
    const monthLabel = key => new Date( `${ key }-01T00:00:00Z` ).toLocaleDateString( locale , { month : 'short' , timeZone : 'UTC' } ) ;
    const xLabel     = point => ( point.key ? monthLabel( point.key ) : dayLabel( point.day ) ) ;

    const series = key => points.map( point => point[ key ] ) ;

    const kpis =
    [
        { key : 'revenue' , show : formatCompact( now.revenue , { currency : 'EUR' } ) , spark : 'revenue' , value : now.revenue , was : before.revenue } ,
        { key : 'orders'  , show : formatNumber( now.orders ) , spark : 'orders' , value : now.orders , was : before.orders } ,
        { inverted : true , key : 'tickets' , show : formatNumber( now.open ) , spark : 'tickets' , value : now.open , was : before.open } ,
        { key : 'satisfaction' , show : format( t.kpis?.outOf ?? '{0}' , decimal( now.rating ) ) , spark : 'rating' , value : now.rating , was : before.rating } ,
    ] ;

    // Last year's points carry this year's labels : the two curves are read against the same days.
    const revenue =
    [
        { data : points.map( point => ( { x : xLabel( point ) , y : Math.round( point.revenue ) } ) ) , id : t.revenue?.current ?? 'current' } ,
        { data : lastYear.map( ( point , index ) => ( { x : xLabel( points[ index ] ) , y : Math.round( point.revenue ) } ) ) , id : t.revenue?.previous ?? 'previous' } ,
    ] ;

    const categories = CATEGORIES.map( ( [ key , share ] , index ) => (
    {
        key ,
        name  : t.categories?.[ key ] ,
        value : Math.round( now.revenue * share * ( 0.9 + noise( today + index * 7 ) * 0.2 ) ) ,
    } ) ) ;

    const channels = CHANNELS.map( ( [ key , value ] ) => ( { id : key , label : t.channels?.[ key ] , value } ) ) ;

    const resolved = t.tickets?.resolved ?? 'resolved' ;
    const open     = t.tickets?.open ?? 'open' ;

    const tickets = REASONS.map( ( [ key , share ] ) =>
    {
        const count = Math.round( now.tickets * share ) ;
        const still = Math.round( now.open * share ) ;
        return { id : t.tickets?.[ key ] ?? key , [ open ] : still , [ resolved ] : count - still } ;
    } ) ;

    const fast = Math.round( 58 + noise( today * 5 ) * 14 ) ;
    const slow = Math.round( 4 + noise( today * 9 ) * 6 ) ;

    const response =
    [
        {
            data :
            [
                { x : t.response?.fast ?? '< 4 h' , y : fast } ,
                { x : t.response?.day ?? '< 24 h' , y : 100 - fast - slow } ,
                { x : t.response?.slow ?? '> 24 h' , y : slow } ,
            ] ,
            id : t.response?.serie ?? 'tickets' ,
        } ,
    ] ;

    const rated = current.slice( -RATED_DAYS ).map( day => (
    {
        key     : String( day.day ) ,
        status  : day.rating >= 4.3 ? 'success' : day.rating >= 3.8 ? 'warning' : 'error' ,
        tooltip : format( t.satisfaction?.day ?? '{0} {1}' , dayLabel( day.day ) , decimal( day.rating ) ) ,
    } ) ) ;

    const reviews = Math.round( now.orders * 0.18 ) ;

    const products = ( t.products?.items ?? [] ).map( ( name , index ) =>
    {
        const [ price , share ] = PRODUCTS[ index ] ;
        const sold = Math.round( now.orders * share ) ;
        const was  = Math.round( before.orders * share * ( 0.8 + noise( today * 13 + index ) * 0.4 ) ) ;
        return { name , revenue : sold * price , sold , was } ;
    } ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium">{ t.period }</span>
                <SegmentedControl
                    ariaLabel = { t.period }
                    items     = { Object.keys( PERIODS ).map( key => ( { key , label : t.periods?.[ key ] } ) ) }
                    onChange  = { setPeriod }
                    value     = { period }
                />
                <span className="text-xs text-base-content/60">{ t.versus }</span>
            </div>

            <Stats className="w-full bg-base-100 shadow-sm" direction={ { lg : 'horizontal' , xs : 'vertical' } }>
                { kpis.map( kpi => (
                    <Stat
                        description = { <Delta from={ kpi.was } inverted={ kpi.inverted } size="sm" to={ kpi.value } /> }
                        figure      = { <Sparkline className="w-24" colorByTrend={ !kpi.inverted } data={ series( kpi.spark ) } variant="area" /> }
                        key         = { kpi.key }
                        title       = { t.kpis?.[ kpi.key ] }
                        value       = { kpi.show }
                    />
                ) ) }
            </Stats>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                <Panel className="lg:col-span-2" title={ t.revenue?.title }>
                    <LineChart
                        ariaLabel     = { t.revenue?.label }
                        curve         = "monotoneX"
                        data          = { revenue }
                        enablePoints  = { false }
                        height        = { 300 }
                        tooltipFormat = { value => euros( value ) }
                        xAxis         = { { tickRotation : period === 'month' ? -45 : 0 } }
                        yAxis         = { { format : value => formatCompact( value ) } }
                    />
                </Panel>

                <Panel title={ t.categories?.title }>
                    <BarList data={ categories } showPercentage valueFormatter={ euros } />
                </Panel>

                <Panel title={ t.channels?.title }>
                    <WaffleChart ariaLabel={ t.channels?.label } aspect="1" columns={ 10 } data={ channels } maxHeight={ 300 } rows={ 10 } total={ 100 } />
                </Panel>

                <Panel title={ t.tickets?.title }>
                    <BarChart ariaLabel={ t.tickets?.label } data={ tickets } height={ 300 } indexBy="id" keys={ [ resolved , open ] } />
                </Panel>

                <Panel title={ t.response?.title }>
                    <RadialBarChart ariaLabel={ t.response?.label } aspect="1" data={ response } maxHeight={ 300 } maxValue={ 100 } valueFormat=">-.0f" />
                </Panel>

                <Panel className="lg:col-span-3" title={ t.satisfaction?.title }>
                    <div className="flex flex-wrap items-center gap-3">
                        <Rating color="warning" half name="customers-rating" readOnly value={ Math.round( now.rating * 2 ) } />
                        <span className="text-sm">{ format( t.satisfaction?.average ?? '{0} {1}' , decimal( now.rating ) , formatNumber( reviews ) ) }</span>
                    </div>
                    <Tracker
                        data       = { rated }
                        endLabel   = { t.satisfaction?.end }
                        legend     =
                        { [
                            { key : 'good' , name : t.satisfaction?.good , status : 'success' , value : rated.filter( block => block.status === 'success' ).length } ,
                            { key : 'fair' , name : t.satisfaction?.fair , status : 'warning' , value : rated.filter( block => block.status === 'warning' ).length } ,
                            { key : 'poor' , name : t.satisfaction?.poor , status : 'error'   , value : rated.filter( block => block.status === 'error' ).length } ,
                        ] }
                        startLabel = { t.satisfaction?.start }
                    />
                </Panel>

                <Panel className="lg:col-span-3" title={ t.products?.title }>
                    <div className="overflow-x-auto">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>{ t.products?.product }</th>
                                    <th className="text-right">{ t.products?.sold }</th>
                                    <th className="text-right">{ t.products?.revenue }</th>
                                    <th className="text-right">{ t.products?.trend }</th>
                                </tr>
                            </thead>
                            <tbody>
                                { products.map( row => (
                                    <tr key={ row.name }>
                                        <td className="font-medium">{ row.name }</td>
                                        <td className="text-right tabular-nums">{ formatNumber( row.sold ) }</td>
                                        <td className="text-right tabular-nums">{ euros( row.revenue ) }</td>
                                        <td className="text-right"><Delta from={ row.was } size="sm" to={ row.sold } /></td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>
                    </div>
                </Panel>

            </div>

            <UsedComponents items={ USED } note={ t.used?.note } title={ t.used?.title } />

        </Container>
    ) ;
} ;

export default CustomersDemo ;
