'use client' ;

import { useEffect , useMemo , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import BarList          from '@/components/metrics/BarList' ;
import Delta            from '@/components/metrics/Delta' ;
import HeatMapChart     from '@/components/charts/HeatMapChart' ;
import LineChart        from '@/components/charts/LineChart' ;
import Link             from '@/components/links/Link' ;
import PieChart         from '@/components/charts/PieChart' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Sparkline        from '@/components/metrics/Sparkline' ;
import Stat             from '@/components/stats/Stat' ;
import Stats            from '@/components/stats/Stats' ;
import Tracker          from '@/components/metrics/Tracker' ;

import useNumberFormat from '@/hooks/useNumberFormat' ;

import useI18n from '@/contexts/locale/useI18n' ;

const DAY = 24 * 60 * 60 * 1000 ;

/** How many days each period covers ; a year is drawn month by month. */
const PERIODS = { month : 30 , week : 7 , year : 365 } ;

const SOURCES = [ [ 'search' , 0.42 ] , [ 'direct' , 0.24 ] , [ 'social' , 0.16 ] , [ 'referral' , 0.11 ] , [ 'email' , 0.07 ] ] ;

const DEVICES = [ [ 'mobile' , 0.58 ] , [ 'desktop' , 0.36 ] , [ 'tablet' , 0.06 ] ] ;

const PAGES = [ '/' , '/produits' , '/blog/bien-choisir-son-bois' , '/tarifs' , '/contact' , '/a-propos' ] ;

/** Two-hour slots, and how busy each one is through a day. */
const SLOTS = Array.from( { length : 12 } , ( _ , index ) => index * 2 ) ;
const HOURLY = [ 0.15 , 0.08 , 0.1 , 0.45 , 0.9 , 1 , 0.85 , 0.95 , 0.8 , 0.7 , 0.6 , 0.3 ] ;

/**
 * A number between 0 and 1 drawn from a seed : the same seed, the same number.
 * (mulberry32)
 */
const noise = seed =>
{
    let value = ( seed + 0x6d2b79f5 ) | 0 ;
    value = Math.imul( value ^ ( value >>> 15 ) , value | 1 ) ;
    value ^= value + Math.imul( value ^ ( value >>> 7 ) , value | 61 ) ;
    return ( ( value ^ ( value >>> 14 ) ) >>> 0 ) / 4294967296 ;
} ;

/** The number of a day since the epoch : the seed of everything measured that day. */
const dayNumber = date => Math.floor( Date.UTC( date.getFullYear() , date.getMonth() , date.getDate() ) / DAY ) ;

/**
 * What a site measured on one day — the same figures every time the day is asked for.
 */
const measure = day =>
{
    const weekday = new Date( day * DAY ).getUTCDay() ;
    const weekend = weekday === 0 || weekday === 6 ;

    const visitors  = Math.round( ( 1150 + day % 365 * 0.6 ) * ( weekend ? 0.7 : 1 ) * ( 0.85 + noise( day ) * 0.3 ) ) ;
    const pageviews = Math.round( visitors * ( 2.4 + noise( day * 7 ) * 0.8 ) ) ;
    const bounce    = 0.38 + noise( day * 13 ) * 0.14 ;
    const duration  = 120 + noise( day * 17 ) * 100 ;

    return { bounce , day , duration , pageviews , visitors } ;
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
    const visitors = days.reduce( ( sum , day ) => sum + day.visitors , 0 ) ;
    return {
        bounce    : days.reduce( ( sum , day ) => sum + day.bounce * day.visitors , 0 ) / visitors ,
        duration  : days.reduce( ( sum , day ) => sum + day.duration * day.visitors , 0 ) / visitors ,
        pageviews : days.reduce( ( sum , day ) => sum + day.pageviews , 0 ) ,
        visitors ,
    } ;
} ;

/**
 * Groups the days of a year into months, oldest first.
 */
const byMonth = days =>
{
    const months = new Map() ;
    for ( const day of days )
    {
        const date = new Date( day.day * DAY ) ;
        const key  = `${ date.getUTCFullYear() }-${ String( date.getUTCMonth() + 1 ).padStart( 2 , '0' ) }` ;
        months.set( key , [ ...( months.get( key ) ?? [] ) , day ] ) ;
    }
    return [ ...months ].map( ( [ key , list ] ) => ( { key , ...summarize( list ) , days : list } ) ) ;
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
    { href : '/modules/circulars'  , name : 'PieChart' } ,
    { href : '/modules/grids'      , name : 'HeatMapChart' } ,
    { href : '/modules/metrics'    , name : 'Tracker' } ,
    { href : '/components/buttons' , name : 'SegmentedControl' } ,
] ;

/**
 * A card of the dashboard : a title, then its content.
 */
const Panel = ( { children , className = '' , title } ) => (
    <section className={ `flex min-w-0 flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm ${ className }` }>
        <h4 className="font-semibold">{ title }</h4>
        { children }
    </section>
) ;

/**
 * A site's audience, as a dashboard.
 *
 * The figures of the period against the one before, the traffic day by day —
 * month by month over a year — the sources, the devices, the busy hours, ninety
 * days of uptime and the most viewed pages. The data is generated from a seed
 * per day : the same day always gives the same figures, and the window ends
 * today, worked out once the page is in the browser.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scenarios.dashboards.analytics'] - Dot notation path to the demo locale.
 */
const AnalyticsDemo = ( { path = 'demo.scenarios.dashboards.analytics' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const { formatNumber , formatPercent , locale } = useNumberFormat() ;

    // Read in the browser only : the server and the first render must agree, a date of the day may not.
    const [ today , setToday ] = useState( null ) ;
    useEffect( () =>
    {
        setToday( dayNumber( new Date() ) ) ;
    } , [] ) ;

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
        const points   = period === 'year' ? byMonth( current ).slice( -12 ) : current ;

        return { current , now : summarize( current ) , points , before : summarize( previous ) } ;
    }
    , [ period , today ] ) ;

    const dayLabel = day => new Date( day * DAY ).toLocaleDateString( locale , { day : 'numeric' , month : 'short' , timeZone : 'UTC' } ) ;
    const monthLabel = key => new Date( `${ key }-01T00:00:00Z` ).toLocaleDateString( locale , { month : 'short' , timeZone : 'UTC' } ) ;
    const weekdayLabel = index => new Date( Date.UTC( 2024 , 0 , 1 + index ) ).toLocaleDateString( locale , { timeZone : 'UTC' , weekday : 'short' } ) ;
    const seconds = value => `${ Math.floor( value / 60 ) } min ${ String( Math.round( value % 60 ) ).padStart( 2 , '0' ) } s` ;

    if ( !data )
    {
        return (
            <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">
                <p className="text-sm text-base-content/70">{ t.intro }</p>
            </Container>
        ) ;
    }

    const { before , current , now , points } = data ;

    const series = key => points.map( point => point[ key ] ) ;

    const kpis =
    [
        { key : 'visitors'  , show : formatNumber( now.visitors ) , value : now.visitors , was : before.visitors } ,
        { key : 'pageviews' , show : formatNumber( now.pageviews ) , value : now.pageviews , was : before.pageviews } ,
        { inverted : true , key : 'bounce' , show : formatPercent( now.bounce , { maximumFractionDigits : 1 } ) , value : now.bounce , was : before.bounce } ,
        { key : 'duration'  , show : seconds( now.duration ) , value : now.duration , was : before.duration } ,
    ] ;

    const traffic = [ 'visitors' , 'pageviews' ].map( key => (
    {
        data : points.map( point => ( { x : point.key ? monthLabel( point.key ) : dayLabel( point.day ) , y : point[ key ] } ) ) ,
        id   : t.traffic?.[ key ] ?? key ,
    } ) ) ;

    const sources = SOURCES.map( ( [ key , share ] , index ) => (
    {
        key ,
        name  : t.sources?.[ key ] ,
        value : Math.round( now.visitors * share * ( 0.9 + noise( today + index ) * 0.2 ) ) ,
    } ) ) ;

    const devices = DEVICES.map( ( [ key , share ] ) => (
    {
        id    : key ,
        label : t.devices?.[ key ] ,
        value : Math.round( now.visitors * share ) ,
    } ) ) ;

    const perDay = now.visitors / current.length ;

    const heatmap = Array.from( { length : 7 } , ( _ , weekday ) => (
    {
        data : SLOTS.map( ( hour , slot ) => (
        {
            x : `${ hour }h` ,
            y : Math.round( perDay / 12 * HOURLY[ slot ] * ( weekday >= 5 ? 0.7 : 1 ) * ( 0.85 + noise( weekday * 31 + slot ) * 0.3 ) * 1.6 ) ,
        } ) ) ,
        id : weekdayLabel( weekday ) ,
    } ) ) ;

    const uptime = Array.from( { length : 90 } , ( _ , index ) =>
    {
        const day  = today - 89 + index ;
        const roll = noise( day * 101 ) ;
        const status = roll > 0.985 ? 'error' : roll > 0.95 ? 'warning' : 'success' ;
        return {
            key     : String( day ) ,
            status ,
            tooltip : `${ dayLabel( day ) } — ${ status === 'error' ? t.uptime?.down : status === 'warning' ? t.uptime?.degraded : t.uptime?.up }` ,
        } ;
    } ) ;

    const downDays = uptime.filter( block => block.status === 'error' ).length ;
    const slowDays = uptime.filter( block => block.status === 'warning' ).length ;
    const ratio    = 1 - ( downDays * 0.04 + slowDays * 0.005 ) / 90 ;

    const pages = PAGES.map( ( page , index ) =>
    {
        const weight = [ 0.31 , 0.18 , 0.12 , 0.09 , 0.06 , 0.04 ][ index ] ;
        const views  = Math.round( now.pageviews * weight ) ;
        const was    = Math.round( before.pageviews * weight * ( 0.85 + noise( today * 3 + index ) * 0.3 ) ) ;
        return { page , time : 40 + noise( index * 41 ) * 180 , views , was } ;
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
                        figure      = { <Sparkline className="w-24" colorByTrend={ !kpi.inverted } data={ series( kpi.key ) } variant="area" /> }
                        key         = { kpi.key }
                        title       = { t.kpis?.[ kpi.key ] }
                        value       = { kpi.show }
                    />
                ) ) }
            </Stats>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                <Panel className="lg:col-span-2" title={ t.traffic?.title }>
                    <LineChart
                        ariaLabel = { t.traffic?.label }
                        curve     = "monotoneX"
                        data      = { traffic }
                        enableArea
                        enablePoints = { false }
                        height    = { 300 }
                        xAxis     = { { tickRotation : period === 'month' ? -45 : 0 } }
                    />
                </Panel>

                <Panel title={ t.sources?.title }>
                    <BarList data={ sources } showPercentage valueFormatter={ formatNumber } />
                </Panel>

                <Panel title={ t.devices?.title }>
                    <PieChart ariaLabel={ t.devices?.label } arcLinkLabels={ false } aspect="1" data={ devices } maxHeight={ 300 } />
                </Panel>

                <Panel className="lg:col-span-2" title={ t.heatmap?.title }>
                    <HeatMapChart ariaLabel={ t.heatmap?.label } data={ heatmap } height={ 300 } labels={ false } />
                </Panel>

                <Panel className="lg:col-span-3" title={ t.uptime?.title }>
                    <Tracker
                        data       = { uptime }
                        endLabel   = { t.uptime?.end }
                        startLabel = { t.uptime?.start }
                        summary    = { format( t.uptime?.summary ?? '{0}' , formatPercent( ratio , { maximumFractionDigits : 2 } ) ) }
                    />
                </Panel>

                <Panel className="lg:col-span-3" title={ t.pages?.title }>
                    <div className="overflow-x-auto">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>{ t.pages?.page }</th>
                                    <th className="text-right">{ t.pages?.views }</th>
                                    <th className="text-right">{ t.pages?.time }</th>
                                    <th className="text-right">{ t.pages?.trend }</th>
                                </tr>
                            </thead>
                            <tbody>
                                { pages.map( row => (
                                    <tr key={ row.page }>
                                        <td className="font-mono text-sm">{ row.page }</td>
                                        <td className="text-right tabular-nums">{ formatNumber( row.views ) }</td>
                                        <td className="text-right tabular-nums">{ seconds( row.time ) }</td>
                                        <td className="text-right"><Delta from={ row.was } size="sm" to={ row.views } /></td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>
                    </div>
                </Panel>

            </div>

            {/* The components used */}
            <section className="flex flex-col gap-2">
                <h4 className="font-semibold">{ t.used?.title }</h4>
                <p className="text-xs text-base-content/60">{ t.used?.note }</p>
                <ul className="flex flex-wrap gap-2">
                    { USED.map( ( { href , name } ) => (
                        <li key={ name }>
                            <Link className="badge badge-outline badge-sm font-mono hover:badge-primary" href={ href }>{ name }</Link>
                        </li>
                    ) ) }
                </ul>
            </section>

        </Container>
    ) ;
} ;

export default AnalyticsDemo ;
