'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import { MdEventAvailable } from 'react-icons/md' ;

import Container from '@/display/Container' ;

import Alert            from '@/components/Alert' ;
import Button           from '@/components/Button' ;
import FormModal        from '@/components/modals/FormModal' ;
import Scheduler        from '@/components/scheduler/Scheduler' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Select           from '@/components/selects/Select' ;
import SlotPicker       from '@/components/scheduler/SlotPicker' ;

import useNumberFormat from '@/hooks/useNumberFormat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import { UsedComponents } from '@/demo/scenarios/shared' ;

import { useCrm } from './CrmProvider' ;
import { APPOINTMENTS } from './data' ;

const ALL = 'all' ;

const SCHEMA   = 'https://schema.org' ;
const WEEKDAYS = [ 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' ].map( day => `${ SCHEMA }/${ day }` ) ;

/** A rep's working hours : weekday mornings and afternoons. */
const HOURS =
[
    { '@type' : 'OpeningHoursSpecification' , closes : '12:00' , dayOfWeek : WEEKDAYS , opens : '09:00' } ,
    { '@type' : 'OpeningHoursSpecification' , closes : '18:30' , dayOfWeek : WEEKDAYS , opens : '14:00' } ,
] ;

/**
 * The components the screen is built of, and the page that shows each one.
 */
const USED =
[
    { href : '/modules/schedulerWeek'     , name : 'Scheduler' } ,
    { href : '/modules/schedulerTimeline' , name : 'SchedulerTimeline' } ,
    { href : '/modules/schedulerSlots'    , name : 'SlotPicker' } ,
    { href : '/components/modals'         , name : 'FormModal' } ,
    { href : '/components/buttons'        , name : 'SegmentedControl' } ,
] ;

/**
 * Booking an appointment : a customer, a kind, and one of the rep's free slots.
 *
 * The slots come from the rep's working hours, minus what their diary already
 * holds — the same base the planning draws.
 */
const BookingModal = ( { onBooked , onClose , t } ) =>
{
    const { addAppointment , appointments , customers , reps } = useCrm() ;

    const { locale } = useNumberFormat() ;

    const [ customerId , setCustomerId ] = useState( customers[ 0 ]?.id ) ;
    const [ type       , setType       ] = useState( 'visit' ) ;
    const [ slot       , setSlot       ] = useState( null ) ;

    const customer = customers.find( one => one.id === customerId ) ;
    const repId    = customer?.repId ?? reps[ 0 ].id ;
    // In milliseconds, as the picker reads a taken span ; a move may have written them back in another shape.
    const busy     = appointments
        .filter( appointment => appointment.repId === repId )
        .map( ( { end , start } ) => ( { end : +new Date( end ) , start : +new Date( start ) } ) ) ;

    const stamp = value => value.toLocaleString( locale , { day : 'numeric' , hour : '2-digit' , minute : '2-digit' , month : 'long' , weekday : 'long' } ) ;

    const onSave = () =>
    {
        addAppointment( { customerId , end : slot.end , repId , start : slot.start , type } ) ;
        onBooked?.( customer?.name , stamp( slot.start ) ) ;
        return true ;
    } ;

    return (
        <FormModal
            dirty        = { slot !== null }
            icon         = { <MdEventAvailable size={ 20 } /> }
            onClose      = { onClose }
            onSave       = { onSave }
            saveDisabled = { slot === null }
            saveLabel    = { t.form?.save }
            title        = { t.form?.title }
        >
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Select label={ t.form?.customer } onChange={ event => { setCustomerId( event.target.value ) ; setSlot( null ) ; } } value={ customerId }>
                        { customers.map( one => <option key={ one.id } value={ one.id }>{ one.name }</option> ) }
                    </Select>
                    <Select label={ t.form?.type } onChange={ event => { setType( event.target.value ) ; setSlot( null ) ; } } value={ type }>
                        { Object.keys( APPOINTMENTS ).map( key => <option key={ key } value={ key }>{ t.types?.[ key ] }</option> ) }
                    </Select>
                </div>
                <p className="text-sm">
                    { t.form?.rep } : <strong>{ reps.find( rep => rep.id === repId )?.name }</strong>
                    <span className="block text-xs text-base-content/60">{ t.hours }</span>
                </p>
                <SlotPicker
                    availability = { HOURS }
                    busy         = { busy }
                    duration     = { APPOINTMENTS[ type ] }
                    granularity  = { 30 }
                    key          = { `${ repId }-${ type }` }
                    onChange     = { setSlot }
                    value        = { slot }
                />
                <p className="text-sm font-medium">{ slot ? format( t.form?.chosen ?? '{0}' , stamp( slot.start ) ) : t.form?.none }</p>
            </div>
        </FormModal>
    ) ;
} ;

/**
 * The CRM's sales planning : the reps' appointments on a `Scheduler`.
 *
 * The week view follows the diary of one rep or all of them ; the timeline
 * gives each rep a row. An appointment is moved and stretched with the
 * pointer, or dragged to another rep's row ; « Book an appointment » offers the
 * rep's free slots through `SlotPicker`. Everything is written back to the
 * CRM's shared base — the map's round reads it.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scenarios.crm'] - Dot notation path to the CRM's demo locale.
 */
const PlanningDemo = ( { path = 'demo.scenarios.crm' } = {} ) =>
{
    const { common = {} , planning : t = {} } = useI18n( path ) ?? {} ;

    const crm = useCrm() ;

    const { locale } = useNumberFormat() ;

    const [ repId   , setRepId   ] = useState( ALL ) ;
    const [ booking , setBooking ] = useState( false ) ;
    const [ message , setMessage ] = useState( null ) ;

    if ( !crm?.ready )
    {
        return (
            <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">
                <p className="text-sm text-base-content/70">{ t.intro }</p>
            </Container>
        ) ;
    }

    const { appointments , customers , reps , setAppointments } = crm ;

    const customerName = id => customers.find( customer => customer.id === id )?.name ;

    const events = appointments
        .filter( appointment => repId === ALL || appointment.repId === repId )
        .map( appointment => ( { ...appointment , title : `${ customerName( appointment.customerId ) } · ${ t.types?.[ appointment.type ] ?? appointment.type }` } ) ) ;

    const stamp = value => new Date( value ).toLocaleString( locale , { day : 'numeric' , hour : '2-digit' , minute : '2-digit' , month : 'short' , weekday : 'short' } ) ;

    // The calendar hands back the events it was given : the titles are dropped, the hidden diaries kept.
    const onChange = ( next , change ) =>
    {
        const shown  = next.map( ( { title : _title , ...appointment } ) => appointment ) ;
        const hidden = appointments.filter( appointment => !shown.some( one => one.id === appointment.id ) ) ;

        setAppointments( [ ...shown , ...hidden ] ) ;

        const moved = shown.find( one => one.id === ( change?.event?.id ?? change?.source?.id ) ) ;

        if ( moved )
        {
            setMessage( { level : 'info' , text : format( t.moved ?? '{0} {1}' , customerName( moved.customerId ) , stamp( moved.start ) ) } ) ;
        }
    } ;

    return (
        <Container className="flex flex-col gap-5 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium">{ t.rep }</span>
                <SegmentedControl
                    ariaLabel = { t.rep }
                    items     = { [ { key : ALL , label : t.allReps } , ...reps.map( rep => ( { key : rep.id , label : rep.name.split( ' ' )[ 0 ] } ) ) ] }
                    onChange  = { setRepId }
                    value     = { repId }
                />
                <Button className="ml-auto" color="primary" icon={ MdEventAvailable } onClick={ () => setBooking( true ) }>{ t.book }</Button>
            </div>

            { message && <Alert level={ message.level } onClose={ () => setMessage( null ) }>{ message.text }</Alert> }

            <Scheduler
                creatable     = { false }
                dayEnd        = { 20 * 60 }
                dayStart      = { 7 * 60 }
                defaultView   = { { md : 'week' , xs : 'agenda' } }
                details
                events        = { events }
                getResourceId = { event => event.repId }
                height        = { 560 }
                movable
                onChange      = { onChange }
                palette       = "brand"
                resizable
                resources     = { reps }
                scrollTime    = "08:00"
                setResourceId = { ( _source , id ) => ( { repId : id } ) }
                views         = { [ 'agenda' , 'week' , 'timeline' ] }
            />

            <UsedComponents items={ USED } note={ common.used?.note } title={ common.used?.title } />

            { booking && (
                <BookingModal
                    onBooked = { ( name , when ) => setMessage( { level : 'success' , text : format( t.booked ?? '{0} {1}' , name , when ) } ) }
                    onClose  = { () => setBooking( false ) }
                    t        = { t }
                />
            ) }

        </Container>
    ) ;
} ;

export default PlanningDemo ;
