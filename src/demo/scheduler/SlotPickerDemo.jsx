'use client' ;

import { useMemo , useState } from 'react' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Button    from '@/components/Button' ;
import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Select    from '@/components/selects/Select' ;

import SlotPicker      from '@/components/scheduler/SlotPicker' ;
import SlotPickerPanel from '@/components/scheduler/SlotPickerPanel' ;

import dayjs from '@/helpers/date/configureDayjs' ;

import { fromSchemaList } from '@/helpers/schedule/fromSchema' ;
import { resolveResources } from '@/helpers/schedule/resources' ;

import { libraryProgram , rooms } from './libraryProgram' ;

/** The week the fixture is written around, so every example opens on something. */
const ANCHOR = new Date( '2026-08-12T00:00:00' ) ;

const WEEK =
{
    end   : dayjs( ANCHOR ).add( 7 , 'day' ).valueOf() ,
    start : dayjs( ANCHOR ).startOf( 'day' ).valueOf() ,
} ;

const getEventId = source => source._key ?? source.id ;

/**
 * The rooms, with the hours they keep.
 *
 * The same `openingHoursSpecification` the timeline already shades with — one
 * vocabulary, two readers. The Workshop opens in the afternoon only, and the
 * Store declares nothing at all, which is the case worth showing.
 */
const SCHEMA = 'https://schema.org' ;

/** Monday to Friday, in the vocabulary `dayOfWeek` actually arrives in. */
const WEEKDAYS = [ 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' ].map( day => `${ SCHEMA }/${ day }` ) ;

const HOURS =
{
    // Every day, and only the afternoon : the row that starts later than the
    // others without anything having to be declared about it.
    atelier      : { '@type' : 'OpeningHoursSpecification' , opens : '14:00' , closes : '19:00' } ,
    // Weekdays only, so a week-end is a day with nothing free — which is what
    // `markEmptyDays` strikes out.
    auditorium   : { '@type' : 'OpeningHoursSpecification' , dayOfWeek : WEEKDAYS , opens : '09:00' , closes : '22:00' } ,
    'salle-bleue': { '@type' : 'OpeningHoursSpecification' , dayOfWeek : WEEKDAYS , opens : '09:00' , closes : '18:00' } ,
} ;

const bookable = rooms.map( room => ( HOURS[ room.id ]
    ? { ...room , openingHoursSpecification : HOURS[ room.id ] }
    : room ) ) ;

/** One room that says nothing about its hours — the answer is « no slots ». */
const withStore = [ ...bookable , { '@type' : 'Place' , id : 'reserve' , name : 'Réserve' } ] ;

const stamp = slot => ( slot ? `${ dayjs( slot.start ).format( 'ddd DD/MM HH:mm' ) } → ${ dayjs( slot.end ).format( 'HH:mm' ) }${ slot.resourceId ? ` · ${ slot.resourceId }` : '' }` : '—' ) ;

/** Above a grid with no month : what it is showing, and why it has none. */
const CAPTION = 'font-mono text-xs uppercase text-base-content/50' ;

const CAPTION_DAY = dayjs( ANCHOR ).format( 'DD/MM/YYYY' ) ;

/**
 * SlotPicker demo — the free half of the family.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scheduler.slotPicker'] - Dot notation path to the demo locale.
 */
const SlotPickerDemo = ( { path = 'demo.scheduler.slotPicker' } ) =>
{
    const { basic , description , noCalendar , panel , resources , settings , title } = useI18n( path ) ;

    const [ picked , setPicked ] = useState( null ) ;
    const [ booked , setBooked ] = useState( null ) ;
    const [ open , setOpen ]     = useState( false ) ;

    const [ duration , setDuration ]       = useState( 30 ) ;
    const [ granularity , setGranularity ] = useState( 30 ) ;
    const [ buffer , setBuffer ]           = useState( 0 ) ;

    /**
     * What is already taken, read through the very adapter the views use : the
     * picker takes `{ start , end }`, and a normalized record is exactly that.
     *
     * **Two filters, and neither is the component's to apply.**
     *
     * A *cancelled* booking does not hold the room — but whether it frees it is
     * a business rule, not arithmetic.
     *
     * An *all-day* entry is the one that bites. The programme carries an
     * exhibition running from the 10th to the 17th ; all-day means midnight to
     * midnight, so handed over as an occupation it blocks **every hour of every
     * day of that week** and the whole picker comes back empty — which is a
     * correct answer to a badly-posed question. An exhibition in the hall does
     * not stop a room being booked at two. Say which of your all-day entries
     * really hold a slot ; here, none of them do.
     */
    const busy = useMemo
    (
        () => fromSchemaList( libraryProgram , { getEventId , window : WEEK } )
            .filter( event => event.status !== 'cancelled' && !event.allDay ) ,
        [] ,
    ) ;

    const auditorium = bookable[ 0 ] ;

    const rows      = useMemo( () => resolveResources({ resources : bookable }) , [] ) ;
    const rowsPlus  = useMemo( () => resolveResources({ resources : withStore }) , [] ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-3 sm:p-8" maxWidth="max-w-6xl">

            <header className="flex flex-col gap-1" id="slot-picker">
                <h2 className="text-3xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ basic?.title }</h3>
                <p className="text-sm text-base-content/60">{ basic?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <SlotPicker
                        availability = { auditorium.openingHoursSpecification }
                        busy         = { busy }
                        defaultDate  = { ANCHOR }
                        duration     = { 60 }
                        groupBy      = "halfDay"
                        // The payload is dated August 2026 and is therefore
                        // entirely past : with the default on, this page would
                        // show nothing at all, everywhere.
                        hidePast     = { false }
                        markEmptyDays
                        onChange     = { setPicked }
                    />
                </div>

                <p className="font-mono text-xs text-base-content/60">onChange → { stamp( picked ) }</p>
                <p className="text-sm text-base-content/60">{ basic?.reports }</p>
                <p className="text-sm text-base-content/60">{ basic?.filtered }</p>
                <p className="text-sm text-base-content/60">{ basic?.empty }</p>
                <p className="text-sm text-base-content/60">{ basic?.past }</p>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ settings?.title }</h3>
                <p className="text-sm text-base-content/60">{ settings?.description }</p>

                <div className="flex flex-wrap gap-3">
                    <Select label="duration" size="sm" value={ String( duration ) } onChange={ look => setDuration( Number( look.target.value ) ) }>
                        { [ 30 , 45 , 60 , 90 ].map( value => <option key={ value } value={ value }>{ value } min</option> ) }
                    </Select>
                    <Select label="granularity" size="sm" value={ String( granularity ) } onChange={ look => setGranularity( Number( look.target.value ) ) }>
                        { [ 15 , 30 , 60 ].map( value => <option key={ value } value={ value }>{ value } min</option> ) }
                    </Select>
                    <Select label="buffer" size="sm" value={ String( buffer ) } onChange={ look => setBuffer( Number( look.target.value ) ) }>
                        { [ 0 , 10 , 20 ].map( value => <option key={ value } value={ value }>{ value } min</option> ) }
                    </Select>
                </div>

                {/* No month here : the day never changes, and what is being read
                    is the effect of the three controls above. `calendar={ false }`
                    is the prop for a day chosen somewhere else. */}
                <p className={ CAPTION }>{ `calendar={ false } · ${ CAPTION_DAY }` }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <SlotPicker
                        availability = { auditorium.openingHoursSpecification }
                        buffer       = { buffer }
                        busy         = { busy }
                        calendar     = { false }
                        date         = { ANCHOR }
                        hidePast     = { false }
                        duration     = { duration }
                        granularity  = { granularity }
                    />
                </div>

                <p className="text-sm text-base-content/60">{ settings?.buffer }</p>
                <p className="text-sm text-base-content/60">{ noCalendar }</p>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ resources?.title }</h3>
                <p className="text-sm text-base-content/60">{ resources?.description }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <SlotPicker
                        busy        = { busy }
                        defaultDate = { ANCHOR }
                        hidePast    = { false }
                        duration    = { 60 }
                        onChange    = { setPicked }
                        resources   = { rows }
                    />
                </div>

                <p className="text-sm text-base-content/60">{ resources?.empty }</p>

                {/* The two below are the same day and differ by one prop : a month
                    repeated between them would bury the very comparison they
                    exist for. */}
                <p className={ CAPTION }>{ `+ Réserve · ${ CAPTION_DAY }` }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <SlotPicker
                        busy      = { busy }
                        calendar  = { false }
                        date      = { ANCHOR }
                        hidePast  = { false }
                        duration  = { 60 }
                        resources = { rowsPlus }
                    />
                </div>

                <p className="text-sm text-base-content/60">{ resources?.fallback }</p>

                <p className={ CAPTION }>{ `+ defaultAvailability 09:00 – 18:00 · ${ CAPTION_DAY }` }</p>

                <div className="rounded-box bg-base-100 p-2 sm:p-4">
                    <SlotPicker
                        busy                = { busy }
                        calendar            = { false }
                        date                = { ANCHOR }
                        hidePast            = { false }
                        defaultAvailability = {{ opens : '09:00' , closes : '18:00' }}
                        duration            = { 60 }
                        resources           = { rowsPlus }
                    />
                </div>
            </section>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ panel?.title }</h3>
                <p className="text-sm text-base-content/60">{ panel?.description }</p>

                <div>
                    <Button color="primary" onClick={ () => setOpen( true ) }>{ panel?.title }</Button>
                </div>

                <SlotPickerPanel
                    busy         = { busy }
                    defaultDate  = { ANCHOR }
                    hidePast     = { false }
                    duration     = { 60 }
                    isOpen       = { open }
                    onClose      = { () => setOpen( false ) }
                    onConfirm    = { slot => { setBooked( slot ) ; setOpen( false ) ; } }
                    resources    = { rows }
                />

                <p className="font-mono text-xs text-base-content/60">onConfirm → { stamp( booked ) }</p>
                <p className="text-sm text-base-content/60">{ panel?.footer }</p>
            </section>

        </Container>
    ) ;
} ;

SlotPickerDemo.displayName = 'SlotPickerDemo' ;

export default SlotPickerDemo ;
