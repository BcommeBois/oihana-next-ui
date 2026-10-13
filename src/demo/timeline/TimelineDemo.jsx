'use client' ;

import { useState } from 'react' ;

import { MdCheck , MdFactCheck , MdFingerprint , MdLocalShipping , MdPhotoCamera , MdQrCodeScanner } from 'react-icons/md' ;

import Container from '@/display/Container' ;

import Button           from '@/components/Button' ;
import Divider          from '@/components/Divider' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Toggle           from '@/components/checkboxes/Toggle' ;

import Timeline     from '@/components/timeline/Timeline' ;
import TimelineItem from '@/components/timeline/TimelineItem' ;

import useI18n from '@/contexts/locale/useI18n' ;

const PARCEL  = [ 'ordered' , 'prepared' , 'shipped' , 'delivery' , 'delivered' ] ;
const PROJECT = [ 'brief' , 'design' , 'build' , 'test' , 'launch' ] ;
const SIDES   = [ 'end' , 'start' , 'alternate' ] ;

/** The parcel's moments, hours apart from a fixed day : the same on the server and in the browser. */
const DAY = '2026-10-10' ;
const TIMES = [ `${ DAY }T09:12:00` , `${ DAY }T14:30:00` , `${ DAY }T18:05:00` , `${ DAY }T22:40:00` ] ;

/**
 * Timeline demo : a parcel's history with its statuses, a project across,
 * compact and responsive, composable, and a journal without boxes.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.timeline'] - Dot notation path to the demo locale.
 */
const TimelineDemo = ( { path = 'demo.timeline' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ step    , setStep    ] = useState( 3 ) ;
    const [ side    , setSide    ] = useState( 'end' ) ;
    const [ compact , setCompact ] = useState( false ) ;
    const [ box     , setBox     ] = useState( true ) ;

    const status = index => ( index < step ? 'done' : index === step ? 'current' : 'todo' ) ;

    const parcel = PARCEL.map( ( key , index ) => (
    {
        description : t.parcel?.descriptions?.[ key ] ,
        id          : key ,
        status      : status( index ) ,
        time        : index <= step ? TIMES[ Math.min( index , TIMES.length - 1 ) ] : undefined ,
        title       : t.parcel?.titles?.[ key ] ,
    } ) ) ;

    const project = PROJECT.map( ( key , index ) => ( { color : index < 2 ? 'success' : 'primary' , id : key , status : index < 2 ? 'done' : index === 2 ? 'current' : 'todo' , title : t.project?.[ key ] } ) ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            {/* A parcel */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.parcel?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.parcel?.text }</p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="flex items-center gap-2">
                        <Button disabled={ step === 0 } onClick={ () => setStep( value => value - 1 ) } size="sm" style="outline">{ t.parcel?.back }</Button>
                        <Button disabled={ step === PARCEL.length - 1 } onClick={ () => setStep( value => value + 1 ) } size="sm">{ t.parcel?.next }</Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{ t.parcel?.side }</span>
                        <SegmentedControl ariaLabel={ t.parcel?.side } items={ SIDES.map( key => ( { key , label : t.parcel?.sides?.[ key ] ?? key } ) ) } onChange={ setSide } value={ side } />
                    </div>
                    <Toggle checked={ compact } inline label={ t.parcel?.compact } onChange={ event => setCompact( event.target.checked ) } size="sm" />
                    <Toggle checked={ box } inline label={ t.parcel?.box } onChange={ event => setBox( event.target.checked ) } size="sm" />
                </div>

                <Timeline ariaLabel={ t.parcel?.title } box={ box } compact={ compact } items={ parcel } side={ side } />
            </section>

            <Divider />

            {/* A project, across */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.project?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.project?.text }</p>
                <div className="overflow-x-auto">
                    <Timeline ariaLabel={ t.project?.title } items={ project } orientation="horizontal" />
                </div>
            </section>

            <Divider />

            {/* Responsive, snap */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.responsive?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.responsive?.text }</p>
                <Timeline ariaLabel={ t.responsive?.title } items={ parcel.slice( 0 , 3 ) } responsive side="alternate" snapIcon />
            </section>

            <Divider />

            {/* A journal, composable */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.journal?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.journal?.text }</p>
                <Timeline ariaLabel={ t.journal?.title } box={ false } color="success" compact timePattern="LT">
                    <TimelineItem description={ t.journal?.opened } icon={ MdQrCodeScanner } status="done" time={ `${ DAY }T08:02:00` } title={ t.journal?.steps?.opened } />
                    <TimelineItem description={ t.journal?.checked } icon={ MdFactCheck } status="done" time={ `${ DAY }T08:19:00` } title={ t.journal?.steps?.checked } />
                    <TimelineItem description={ t.journal?.photo } icon={ MdPhotoCamera } status="done" time={ `${ DAY }T08:21:00` } title={ t.journal?.steps?.photo } />
                    <TimelineItem description={ <span className="font-mono text-xs">a3f5…c1e2</span> } icon={ MdFingerprint } status="done" time={ `${ DAY }T08:22:00` } title={ t.journal?.steps?.signed } />
                    <TimelineItem description={ t.journal?.sent } href="/scenarios/logistics/receiving" icon={ MdLocalShipping } status="current" time={ `${ DAY }T08:23:00` } title={ t.journal?.steps?.sent } />
                    <TimelineItem icon={ MdCheck } title={ t.journal?.steps?.archived } />
                </Timeline>
            </section>

        </Container>
    ) ;
} ;

export default TimelineDemo ;
