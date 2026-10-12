'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import { MdChevronLeft , MdChevronRight } from 'react-icons/md' ;

import Container from '@/display/Container' ;

import Badge            from '@/components/Badge' ;
import Button           from '@/components/Button' ;
import Card             from '@/components/Card' ;
import MapMarkers       from '@/components/maps/MapMarkers' ;
import MapPopup         from '@/components/maps/MapPopup' ;
import MapRoute         from '@/components/maps/MapRoute' ;
import MapView          from '@/components/maps/Map' ;
import SidePanel        from '@/components/panels/SidePanel' ;
import useModal         from '@/components/modals/hooks/useModal' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Toggle           from '@/components/checkboxes/Toggle' ;

import useNumberFormat from '@/hooks/useNumberFormat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import config from '@/@configs' ;

import { DAY , UsedComponents } from '@/demo/scenarios/shared' ;

import CustomerSheet , { STATUS_COLORS } from './CustomerSheet' ;
import { useCrm } from './CrmProvider' ;
import { STATUSES } from './data' ;

/** Where the map opens : the middle of the customers' towns. */
const CENTRE = { latitude : 44.25 , longitude : 1.75 } ;

/**
 * The components the screen is built of, and the page that shows each one.
 */
const USED =
[
    { href : '/modules/maps'        , name : 'Map' } ,
    { href : '/modules/mapsMarkers' , name : 'MapMarkers' } ,
    { href : '/modules/mapsMarkers' , name : 'MapPopup' } ,
    { href : '/modules/mapsRoutes'  , name : 'MapRoute' } ,
    { href : '/components/buttons'  , name : 'SegmentedControl' } ,
    { href : '/components/toggles'  , name : 'Toggle' } ,
    { href : '/components/card'     , name : 'Card' } ,
    { href : '/components/panels'   , name : 'SidePanel' } ,
] ;

/** The day number of a date held as a Date or as milliseconds. */
const dayOf = value =>
{
    const date = new Date( value ) ;
    return Math.floor( Date.UTC( date.getFullYear() , date.getMonth() , date.getDate() ) / DAY ) ;
} ;

/** Moves to the next working day in a direction, skipping the week-end. */
const workingDay = ( day , step ) =>
{
    let next = day + step ;
    while ( [ 0 , 6 ].includes( new Date( next * DAY ).getUTCDay() ) )
    {
        next += step ;
    }
    return next ;
} ;

/**
 * The CRM's map : every customer, grouped when close together and coloured by
 * status, and the round of one sales rep on one day.
 *
 * The round is read from the appointments of the CRM's shared base, in their
 * order — one booked or moved in the planning changes it. A customer clicked,
 * on the map or in the round, opens a bubble with its essentials.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scenarios.crm'] - Dot notation path to the CRM's demo locale.
 */
const MapDemo = ( { path = 'demo.scenarios.crm' } = {} ) =>
{
    const { common = {} , customers : customersCopy = {} , map : t = {} , planning = {} } = useI18n( path ) ?? {} ;

    const crm = useCrm() ;

    const { formatNumber , locale } = useNumberFormat() ;

    const [ repId    , setRepId    ] = useState( null ) ;
    const [ day      , setDay      ] = useState( null ) ;
    const [ all      , setAll      ] = useState( true ) ;
    const [ selected , setSelected ] = useState( null ) ;
    const [ sheet    , setSheet    ] = useState( null ) ;

    const { modalRef , open : openSheet } = useModal() ;

    if ( !crm?.ready )
    {
        return (
            <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">
                <p className="text-sm text-base-content/70">{ t.intro }</p>
            </Container>
        ) ;
    }

    const { appointments , customers , reps , today } = crm ;

    const rep     = repId ?? reps[ 0 ].id ;
    const current = day ?? ( [ 0 , 6 ].includes( new Date( today * DAY ).getUTCDay() ) ? workingDay( today , 1 ) : today ) ;

    const customerOf = id => customers.find( customer => customer.id === id ) ;

    const round = appointments
        .filter( appointment => appointment.repId === rep && dayOf( appointment.start ) === current )
        .sort( ( a , b ) => new Date( a.start ) - new Date( b.start ) )
        .map( appointment => ( { ...appointment , customer : customerOf( appointment.customerId ) } ) )
        .filter( stop => stop.customer?.geo ) ;

    const located = customers.filter( customer => customer.geo ) ;

    const time  = value => new Date( value ).toLocaleTimeString( locale , { hour : '2-digit' , minute : '2-digit' } ) ;
    const label = new Date( current * DAY ).toLocaleDateString( locale , { day : 'numeric' , month : 'long' , timeZone : 'UTC' , weekday : 'long' } ) ;
    const euros = value => formatNumber( value , { currency : 'EUR' , maximumFractionDigits : 0 , style : 'currency' } ) ;

    const chosen = customerOf( selected ) ;

    return (
        <Container className="flex flex-col gap-5 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{ t.rep }</span>
                    <SegmentedControl
                        ariaLabel = { t.rep }
                        items     = { reps.map( one => ( { key : one.id , label : one.name.split( ' ' )[ 0 ] } ) ) }
                        onChange  = { setRepId }
                        value     = { rep }
                    />
                </div>
                <div className="flex items-center gap-1">
                    <span className="mr-1 text-sm font-medium">{ t.day }</span>
                    <Button icon={ MdChevronLeft } onClick={ () => setDay( workingDay( current , -1 ) ) } shape="square" size="sm" style="ghost" title={ t.previous } />
                    <span className="min-w-44 text-center text-sm first-letter:uppercase">{ label }</span>
                    <Button icon={ MdChevronRight } onClick={ () => setDay( workingDay( current , 1 ) ) } shape="square" size="sm" style="ghost" title={ t.next } />
                </div>
                <Toggle checked={ all } color="primary" inline label={ t.all } onChange={ event => setAll( event.target.checked ) } />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">

                <div className="flex min-w-0 flex-col gap-2">
                    <MapView { ...CENTRE } ariaLabel={ t.label } height={ 520 } mapStyle={ config?.ui?.map?.style } zoom={ 7 }>
                        { all && (
                            <MapMarkers
                                cluster
                                clusterLabel = { count => format( t.cluster ?? '{0}' , count ) }
                                items        = { located }
                                markerProps  = { customer => ( { color : STATUS_COLORS[ customer.status ] , size : 'sm' , title : customer.name } ) }
                                onSelect     = { customer => setSelected( customer.id ) }
                            />
                        ) }
                        { round.length > 0 && (
                            <MapRoute
                                key      = { `${ rep }-${ current }-${ round.length }` }
                                onSelect = { stop => setSelected( stop.customerId ) }
                                place    = { stop => stop.customer }
                                position = { ( _stop , index ) => index + 1 }
                                stops    = { round }
                            />
                        ) }
                        { chosen?.geo && (
                            <MapPopup latitude={ chosen.geo.latitude } longitude={ chosen.geo.longitude } onClose={ () => setSelected( null ) }>
                                <Card
                                    actions   = { <Button color="primary" onClick={ () => { setSheet( chosen.id ) ; openSheet() ; } } size="sm">{ t.open }</Button> }
                                    className = "w-64 shadow-none"
                                    size      = "sm"
                                    title     = { chosen.name }
                                    titleAs   = "h3"
                                >
                                    <div className="flex flex-col gap-1 text-sm">
                                        <span>{ chosen.contact.name }</span>
                                        <span className="text-xs text-base-content/60">{ chosen.address.streetAddress }, { chosen.address.postalCode } { chosen.address.locality }</span>
                                        <div className="mt-1 flex flex-wrap items-center gap-2">
                                            <Badge color={ STATUS_COLORS[ chosen.status ] } size="sm" style="soft">{ common.statuses?.[ chosen.status ] }</Badge>
                                            <span className="text-xs tabular-nums">{ format( t.revenue ?? '{0}' , euros( chosen.revenue ) ) }</span>
                                        </div>
                                    </div>
                                </Card>
                            </MapPopup>
                        ) }
                    </MapView>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-base-content/60">{ t.legend }</span>
                        { STATUSES.map( status => (
                            <Badge color={ STATUS_COLORS[ status ] } key={ status } size="sm" style="soft">{ common.statuses?.[ status ] }</Badge>
                        ) ) }
                    </div>
                </div>

                <section className="flex min-w-0 flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm">
                    <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-semibold">{ t.round }</h4>
                        <span className="text-xs text-base-content/60">{ format( t.stops ?? '{0}' , round.length ) }</span>
                    </div>
                    { round.length === 0 ? (
                        <p className="text-sm text-base-content/60">{ t.noRound }</p>
                    ) : (
                        <ol className="flex flex-col gap-2">
                            { round.map( ( stop , index ) => (
                                <li key={ stop.id }>
                                    <button
                                        className = "flex w-full items-start gap-3 rounded-field p-2 text-left hover:bg-base-200"
                                        onClick   = { () => setSelected( stop.customerId ) }
                                        type      = "button"
                                    >
                                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-content">{ index + 1 }</span>
                                        <span className="flex flex-col">
                                            <span className="text-sm font-medium">{ stop.customer.name }</span>
                                            <span className="text-xs text-base-content/60">
                                                { time( stop.start ) } – { time( stop.end ) } · { planning.types?.[ stop.type ] ?? stop.type } · { stop.customer.address.locality }
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            ) ) }
                        </ol>
                    ) }
                </section>

            </div>

            <UsedComponents items={ USED } note={ common.used?.note } title={ common.used?.title } />

            <SidePanel ref={ modalRef } title={ customerOf( sheet )?.name } width="w-full sm:w-[34rem]">
                { customerOf( sheet ) && <CustomerSheet common={ common } customer={ customerOf( sheet ) } key={ sheet } t={ customersCopy.sheet ?? {} } /> }
            </SidePanel>

        </Container>
    ) ;
} ;

export default MapDemo ;
