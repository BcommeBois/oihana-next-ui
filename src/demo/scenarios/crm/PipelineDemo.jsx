'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Alert            from '@/components/Alert' ;
import Badge            from '@/components/Badge' ;
import InitialsAvatar   from '@/components/avatars/InitialsAvatar' ;
import Kanban           from '@/components/kanban/Kanban' ;
import KanbanCard       from '@/components/kanban/KanbanCard' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Stat             from '@/components/stats/Stat' ;
import Stats            from '@/components/stats/Stats' ;

import useNumberFormat from '@/hooks/useNumberFormat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import { DAY , UsedComponents } from '@/demo/scenarios/shared' ;

import { STAGE_COLORS } from './CustomerSheet' ;
import { useCrm } from './CrmProvider' ;
import { STAGES } from './data' ;

/** How likely a deal at each open stage is to be won. */
const PROBABILITY = { negotiation : 0.75 , proposal : 0.5 , prospect : 0.1 , qualified : 0.25 } ;

const ALL = 'all' ;

/**
 * The components the screen is built of, and the page that shows each one.
 */
const USED =
[
    { href : '/modules/kanban'     , name : 'Kanban' } ,
    { href : '/components/stat'    , name : 'Stats' } ,
    { href : '/components/buttons' , name : 'SegmentedControl' } ,
    { href : '/components/avatars' , name : 'InitialsAvatar' } ,
    { href : '/components/badges'  , name : 'Badge' } ,
] ;

/**
 * The CRM's sales pipeline : the opportunities as a kanban, one column per
 * stage, each with its count and its total.
 *
 * A card dragged to another column changes its stage in the CRM's shared base
 * — the customer's sheet shows it there. The figures on top follow : what is
 * open, what it is worth weighted by each stage's odds, what was won, and the
 * win rate.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scenarios.crm'] - Dot notation path to the CRM's demo locale.
 */
const PipelineDemo = ( { path = 'demo.scenarios.crm' } = {} ) =>
{
    const { common = {} , pipeline : t = {} } = useI18n( path ) ?? {} ;

    const crm = useCrm() ;

    const { formatCompact , formatNumber , formatPercent , locale } = useNumberFormat() ;

    const [ repId , setRepId ] = useState( ALL ) ;
    const [ moved , setMoved ] = useState( null ) ;

    if ( !crm?.ready )
    {
        return (
            <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">
                <p className="text-sm text-base-content/70">{ t.intro }</p>
            </Container>
        ) ;
    }

    const { customers , opportunities , reps , setOpportunities } = crm ;

    const customerName = id => customers.find( customer => customer.id === id )?.name ;
    const repName      = id => reps.find( rep => rep.id === id )?.name ;
    const euros        = value => formatNumber( value , { currency : 'EUR' , maximumFractionDigits : 0 , style : 'currency' } ) ;
    const date         = day => new Date( day * DAY ).toLocaleDateString( locale , { day : 'numeric' , month : 'short' , timeZone : 'UTC' } ) ;

    const shown = opportunities.filter( deal => repId === ALL || deal.repId === repId ) ;

    const columns = STAGES.map( stage => ( { id : stage , items : shown.filter( deal => deal.stage === stage ) } ) ) ;

    const sum = list => list.reduce( ( total , deal ) => total + deal.amount , 0 ) ;

    const open     = shown.filter( deal => PROBABILITY[ deal.stage ] !== undefined ) ;
    const won      = shown.filter( deal => deal.stage === 'won' ) ;
    const lost     = shown.filter( deal => deal.stage === 'lost' ) ;
    const weighted = open.reduce( ( total , deal ) => total + deal.amount * PROBABILITY[ deal.stage ] , 0 ) ;
    const rate     = won.length + lost.length > 0 ? won.length / ( won.length + lost.length ) : 0 ;

    // The board shows a part of the list when a rep is picked : the rest keeps its place after it.
    const onChange = ( next , change ) =>
    {
        const visible = next.flatMap( column => column.items.map( deal => ( { ...deal , stage : column.id } ) ) ) ;
        const hidden  = opportunities.filter( deal => !visible.some( one => one.id === deal.id ) ) ;

        setOpportunities( [ ...visible , ...hidden ] ) ;

        if ( change?.type === 'card' && change.fromColumn?.id !== change.toColumn?.id )
        {
            setMoved( format( t.moved ?? '{0} {1} {2}' , change.item.title , customerName( change.item.customerId ) , common.stages?.[ change.toColumn.id ] ) ) ;
        }
    } ;

    return (
        <Container className="flex flex-col gap-5 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-full">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium">{ t.rep }</span>
                <SegmentedControl
                    ariaLabel = { t.rep }
                    items     = { [ { key : ALL , label : t.allReps } , ...reps.map( rep => ( { key : rep.id , label : rep.name.split( ' ' )[ 0 ] } ) ) ] }
                    onChange  = { setRepId }
                    value     = { repId }
                />
            </div>

            <Stats className="w-full bg-base-100 shadow-sm" direction={ { lg : 'horizontal' , xs : 'vertical' } }>
                <Stat description={ format( t.kpis?.openHint ?? '{0}' , open.length ) } title={ t.kpis?.open } value={ formatCompact( sum( open ) , { currency : 'EUR' } ) } />
                <Stat description={ t.kpis?.weightedHint } title={ t.kpis?.weighted } value={ formatCompact( weighted , { currency : 'EUR' } ) } />
                <Stat color="success" description={ format( t.kpis?.wonHint ?? '{0}' , won.length ) } title={ t.kpis?.won } value={ formatCompact( sum( won ) , { currency : 'EUR' } ) } />
                <Stat description={ t.kpis?.rateHint } title={ t.kpis?.rate } value={ formatPercent( rate , { maximumFractionDigits : 0 } ) } />
            </Stats>

            { moved && <Alert level="info" onClose={ () => setMoved( null ) }>{ moved }</Alert> }

            <div className="overflow-x-auto pb-2">
                <Kanban
                    className    = "min-w-[72rem]"
                    columns      = { columns }
                    onChange     = { onChange }
                    renderCard   = { deal => (
                        <KanbanCard>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold">{ customerName( deal.customerId ) }</span>
                                <span className="text-xs text-base-content/70">{ deal.title }</span>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-sm font-semibold tabular-nums">{ euros( deal.amount ) }</span>
                                    <InitialsAvatar name={ repName( deal.repId ) } size="xs" />
                                </div>
                                <span className="text-xs text-base-content/50">{ format( t.closing ?? '{0}' , date( deal.closeDay ) ) }</span>
                            </div>
                        </KanbanCard>
                    ) }
                    renderHeader = { column => (
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between gap-2">
                                <Badge color={ STAGE_COLORS[ column.id ] } style="soft">{ common.stages?.[ column.id ] }</Badge>
                                <span className="text-xs text-base-content/60">{ column.items.length }</span>
                            </div>
                            <span className="text-sm font-semibold tabular-nums">{ formatCompact( sum( column.items ) , { currency : 'EUR' } ) }</span>
                        </div>
                    ) }
                />
            </div>

            <UsedComponents items={ USED } note={ common.used?.note } title={ common.used?.title } />

        </Container>
    ) ;
} ;

export default PipelineDemo ;
