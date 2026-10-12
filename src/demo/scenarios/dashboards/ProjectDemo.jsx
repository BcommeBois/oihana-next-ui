'use client' ;

import { useMemo , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import AvatarGroup      from '@/components/avatars/AvatarGroup' ;
import Badge            from '@/components/Badge' ;
import BarChart         from '@/components/charts/BarChart' ;
import CategoryBar      from '@/components/metrics/CategoryBar' ;
import Delta            from '@/components/metrics/Delta' ;
import InitialsAvatar   from '@/components/avatars/InitialsAvatar' ;
import LineChart        from '@/components/charts/LineChart' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Sparkline        from '@/components/metrics/Sparkline' ;
import Stat             from '@/components/stats/Stat' ;
import Stats            from '@/components/stats/Stats' ;
import Steps            from '@/components/steps/Steps' ;

import useNumberFormat from '@/hooks/useNumberFormat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import { byMonth , DAY , noise , Panel , PERIODS , UsedComponents , useToday } from './shared' ;

/** The project started this many days ago, and ends this many days from now. */
const STARTED = 200 ;
const LEFT    = 60 ;

/** Points to deliver, in all. */
const POINTS = 480 ;

const PHASES = [ [ 'scoping' , 0.15 ] , [ 'design' , 0.3 ] , [ 'build' , 0.75 ] , [ 'testing' , 0.92 ] , [ 'launch' , 1 ] ] ;

const WORKSTREAMS = [ [ 'front' , 0.82 ] , [ 'back' , 0.71 ] , [ 'payment' , 0.55 ] , [ 'catalog' , 0.9 ] , [ 'migration' , 0.38 ] ] ;

const TEAM = [ [ 'Camille Martin' , 0.26 ] , [ 'Léo Bernard' , 0.22 ] , [ 'Inès Dubois' , 0.2 ] , [ 'Hugo Moreau' , 0.18 ] , [ 'Sarah Petit' , 0.14 ] ] ;

/** Days from today, and the owner, of each milestone. */
const MILESTONES = [ [ -4 , 1 ] , [ 6 , 3 ] , [ 18 , 4 ] , [ 38 , 2 ] , [ LEFT , 0 ] ] ;

/** Hours a day the team works on the project, in all. */
const TEAM_HOURS = 32 ;

/**
 * Where the project stood on one day — the same figures every time the day is asked for.
 *
 * @param {number} day
 * @param {number} start - The day the project started.
 * @param {number} end - The day it is due.
 */
const measure = ( day , start , end ) =>
{
    const elapsed = Math.min( 1 , Math.max( 0 , ( day - start ) / ( end - start ) ) ) ;
    const planned = POINTS * ( 1 - elapsed ) ;

    // Behind schedule, a little more as time goes, never quite caught up.
    const lag    = elapsed * 34 + noise( day ) * 8 ;
    const actual = Math.min( POINTS , planned + lag ) ;

    return {
        actual ,
        budget  : Math.min( 1 , elapsed * 1.04 + noise( day * 3 ) * 0.02 ) ,
        day ,
        done    : Math.round( 2 + noise( day * 7 ) * 4 ) ,
        late    : Math.round( 3 + elapsed * 6 + noise( day * 11 ) * 4 ) ,
        planned ,
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
    { href : '/components/steps'   , name : 'Steps' } ,
    { href : '/modules/charts'     , name : 'LineChart' } ,
    { href : '/modules/metrics'    , name : 'CategoryBar' } ,
    { href : '/modules/charts'     , name : 'BarChart' } ,
    { href : '/components/avatars' , name : 'AvatarGroup' } ,
    { href : '/components/buttons' , name : 'SegmentedControl' } ,
] ;

/**
 * A project halfway through, as a dashboard.
 *
 * Progress, tasks done, tasks late and budget spent over the period against
 * the one before ; the phase the project is in ; the work remaining, planned
 * against actual ; each workstream done, in progress and to do ; the hours of
 * each person, spent and planned ; the upcoming milestones. The data is
 * generated from a seed per day, the project dated from today.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scenarios.dashboards.project'] - Dot notation path to the demo locale.
 */
const ProjectDemo = ( { path = 'demo.scenarios.dashboards.project' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const { formatNumber , formatPercent , locale } = useNumberFormat() ;

    const today = useToday() ;

    const [ period , setPeriod ] = useState( 'month' ) ;

    const data = useMemo( () =>
    {
        if ( today === null )
        {
            return null ;
        }

        const start  = today - STARTED ;
        const end    = today + LEFT ;
        const length = PERIODS[ period ] ;

        // The window never reaches before the project started.
        const first = Math.max( start , today - length + 1 ) ;
        const days  = Array.from( { length : today - first + 1 } , ( _ , index ) => measure( first + index , start , end ) ) ;

        const points = period === 'year'
            ? byMonth( days ).map( ( { days : list , key } ) => ( { ...list[ list.length - 1 ] , done : list.reduce( ( sum , day ) => sum + day.done , 0 ) , key } ) )
            : days ;

        const previous = Array.from( { length } , ( _ , index ) => measure( today - 2 * length + 1 + index , start , end ) ) ;

        return {
            before : { day : measure( today - length , start , end ) , done : previous.reduce( ( sum , day ) => sum + day.done , 0 ) } ,
            days ,
            end ,
            now    : { day : measure( today , start , end ) , done : days.reduce( ( sum , day ) => sum + day.done , 0 ) } ,
            points ,
            start ,
        } ;
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

    const { before , days , end , now , points , start } = data ;

    const dateLabel  = ( day , options = { day : 'numeric' , month : 'short' } ) => new Date( day * DAY ).toLocaleDateString( locale , { ...options , timeZone : 'UTC' } ) ;
    const monthLabel = key => new Date( `${ key }-01T00:00:00Z` ).toLocaleDateString( locale , { month : 'short' , timeZone : 'UTC' } ) ;
    const xLabel     = point => ( point.key ? monthLabel( point.key ) : dateLabel( point.day ) ) ;

    const progress = day => 1 - day.actual / POINTS ;
    const pointChange  = value => `${ value > 0 ? '+' : '' }${ Math.round( value * 100 ) } pts` ;

    const kpis =
    [
        {
            delta  : <Delta format="number" size="sm" value={ progress( now.day ) - progress( before.day ) } valueFormatter={ pointChange } /> ,
            key    : 'progress' ,
            series : points.map( progress ) ,
            show   : formatPercent( progress( now.day ) , { maximumFractionDigits : 0 } ) ,
        } ,
        {
            delta  : <Delta from={ before.done } size="sm" to={ now.done } /> ,
            key    : 'done' ,
            series : points.map( point => point.done ) ,
            show   : formatNumber( now.done ) ,
        } ,
        {
            delta    : <Delta from={ before.day.late } inverted size="sm" to={ now.day.late } /> ,
            inverted : true ,
            key      : 'late' ,
            series   : points.map( point => point.late ) ,
            show     : formatNumber( now.day.late ) ,
        } ,
        {
            delta    : <Delta format="number" inverted size="sm" value={ now.day.budget - before.day.budget } valueFormatter={ pointChange } /> ,
            inverted : true ,
            key      : 'budget' ,
            series   : points.map( point => point.budget ) ,
            show     : formatPercent( now.day.budget , { maximumFractionDigits : 0 } ) ,
        } ,
    ] ;

    const reached = progress( now.day ) ;
    const phase   = PHASES.findIndex( ( [ , until ] ) => reached < until ) ;

    const burndown = [ 'planned' , 'actual' ].map( key => (
    {
        data : points.map( point => ( { x : xLabel( point ) , y : Math.round( point[ key ] ) } ) ) ,
        id   : t.burndown?.[ key ] ?? key ,
    } ) ) ;

    const workstreams = WORKSTREAMS.map( ( [ key , share ] , index ) =>
    {
        const total = 20 + Math.round( noise( index * 29 ) * 30 ) ;
        const done  = Math.round( total * share ) ;
        const doing = Math.round( ( total - done ) * 0.4 ) ;
        return { done , doing , key , todo : total - done - doing , total } ;
    } ) ;

    const spent   = t.load?.spent ?? 'spent' ;
    const planned = t.load?.planned ?? 'planned' ;

    const load = TEAM.map( ( [ name , share ] , index ) => (
    {
        id          : name.split( ' ' )[ 0 ] ,
        [ planned ] : Math.round( days.length * TEAM_HOURS * share * ( 0.3 + noise( index * 5 + today ) * 0.3 ) ) ,
        [ spent ]   : Math.round( days.length * TEAM_HOURS * share * ( 0.85 + noise( index * 3 + today ) * 0.3 ) ) ,
    } ) ) ;

    const milestones = MILESTONES.map( ( [ offset , owner ] , index ) =>
    {
        const status = offset < 0 ? 'late' : offset < 10 ? 'atRisk' : 'onTrack' ;
        return { day : today + offset , name : t.milestones?.items?.[ index ] , owner : TEAM[ owner ][ 0 ] , status } ;
    } ) ;

    const statusColor = { atRisk : 'warning' , late : 'error' , onTrack : 'success' } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-box bg-base-100 p-4 shadow-sm">
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">{ t.name }</span>
                    <span className="text-xs text-base-content/60">
                        { format( t.dates ?? '{0} {1}' , dateLabel( start , { day : 'numeric' , month : 'long' , year : 'numeric' } ) , dateLabel( end , { day : 'numeric' , month : 'long' , year : 'numeric' } ) ) }
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-base-content/60">{ t.team }</span>
                    <AvatarGroup className="-space-x-3">
                        { TEAM.map( ( [ name ] ) => <InitialsAvatar key={ name } name={ name } size="sm" /> ) }
                    </AvatarGroup>
                </div>
            </div>

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
                        description = { kpi.delta }
                        figure      = { <Sparkline className="w-24" colorByTrend={ !kpi.inverted } data={ kpi.series } variant="area" /> }
                        key         = { kpi.key }
                        title       = { t.kpis?.[ kpi.key ] }
                        value       = { kpi.show }
                    />
                ) ) }
            </Stats>

            <Panel title={ t.phases?.title }>
                <Steps
                    ariaLabel = { t.phases?.label }
                    className = "w-full"
                    current   = { phase }
                    direction = { { md : 'horizontal' , xs : 'vertical' } }
                    items     = { PHASES.map( ( [ id ] ) => ( { id , label : t.phases?.[ id ] } ) ) }
                />
            </Panel>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                <Panel className="lg:col-span-2" title={ t.burndown?.title }>
                    <LineChart
                        ariaLabel    = { t.burndown?.label }
                        curve        = "monotoneX"
                        data         = { burndown }
                        enablePoints = { false }
                        height       = { 300 }
                        xAxis        = { { tickRotation : period === 'month' ? -45 : 0 } }
                    />
                </Panel>

                <Panel title={ t.workstreams?.title }>
                    <div className="flex flex-col gap-4">
                        { workstreams.map( stream => (
                            <div className="flex flex-col gap-1" key={ stream.key }>
                                <div className="flex justify-between text-sm">
                                    <span>{ t.workstreams?.[ stream.key ] }</span>
                                    <span className="tabular-nums text-base-content/60">{ formatPercent( stream.done / stream.total , { maximumFractionDigits : 0 } ) }</span>
                                </div>
                                <CategoryBar
                                    items =
                                    { [
                                        { color : 'success'  , key : 'done'  , name : t.workstreams?.done  , value : stream.done } ,
                                        { color : 'warning'  , key : 'doing' , name : t.workstreams?.doing , value : stream.doing } ,
                                        { color : 'base-300' , key : 'todo'  , name : t.workstreams?.todo  , value : stream.todo } ,
                                    ] }
                                    showLegend = { stream.key === WORKSTREAMS[ WORKSTREAMS.length - 1 ][ 0 ] }
                                    size       = "sm"
                                />
                            </div>
                        ) ) }
                    </div>
                </Panel>

                <Panel title={ t.load?.title }>
                    <BarChart ariaLabel={ t.load?.label } data={ load } height={ 300 } indexBy="id" keys={ [ spent , planned ] } stacked />
                </Panel>

                <Panel className="lg:col-span-2" title={ t.milestones?.title }>
                    <div className="overflow-x-auto">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>{ t.milestones?.name }</th>
                                    <th>{ t.milestones?.date }</th>
                                    <th>{ t.milestones?.owner }</th>
                                    <th>{ t.milestones?.status }</th>
                                </tr>
                            </thead>
                            <tbody>
                                { milestones.map( row => (
                                    <tr key={ row.name }>
                                        <td className="font-medium">{ row.name }</td>
                                        <td className="tabular-nums">{ dateLabel( row.day ) }</td>
                                        <td>
                                            <span className="flex items-center gap-2">
                                                <InitialsAvatar name={ row.owner } size="xs" />
                                                { row.owner }
                                            </span>
                                        </td>
                                        <td><Badge color={ statusColor[ row.status ] } style="soft">{ t.milestones?.[ row.status ] }</Badge></td>
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

export default ProjectDemo ;
