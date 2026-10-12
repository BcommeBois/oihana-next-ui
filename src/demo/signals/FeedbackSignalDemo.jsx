'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;

import Alert            from '@/components/Alert' ;
import Badge            from '@/components/Badge' ;
import Button           from '@/components/Button' ;
import Divider          from '@/components/Divider' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Toggle           from '@/components/checkboxes/Toggle' ;
import SoundButton      from '@/components/buttons/SoundButton' ;

import useFeedback from '@/contexts/feedback/useFeedback' ;

import useFeedbackSignal from '@/hooks/useFeedbackSignal' ;

import useI18n from '@/contexts/locale/useI18n' ;

const VOLUMES = [ 0.2 , 0.6 , 1 ] ;

// The page names no volume of its own : the device's applies.
const DEVICE = 'device' ;

// Defined outside the component : a new object on every render would rebuild the catalog for nothing.
const SIGNALS =
{
    done :
    {
        tones     : [ { duration : 60 , frequency : 880 } , { duration : 60 , frequency : 1100 , gap : 20 } , { duration : 140 , frequency : 1320 , gap : 20 , type : 'triangle' } ] ,
        vibration : [ 30 , 40 , 30 , 40 , 60 ] ,
    } ,
} ;

/**
 * useFeedbackSignal demo.
 *
 * The device state first — unlocked or not, what it supports — then the
 * screen's settings, the three signals, one of our own, and a scan where the
 * screen shows an alert beside the signal.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.signals.feedback'] - Dot notation path to the demo locale.
 */
const FeedbackSignalDemo = ( { path = 'demo.signals.feedback' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ sound     , setSound     ] = useState( true ) ;
    const [ vibration , setVibration ] = useState( true ) ;
    const [ volume    , setVolume    ] = useState( DEVICE ) ;
    const [ silent    , setSilent    ] = useState( false ) ;
    const [ scan      , setScan      ] = useState( null ) ;

    const device = useFeedback() ;

    const { signal , supports , unlock , unlocked } = useFeedbackSignal(
    {
        ignoreSilentMode : silent ,
        signals          : SIGNALS ,
        sound ,
        vibration ,
        volume           : volume === DEVICE ? undefined : volume ,
    } ) ;

    const onScan = good =>
    {
        signal( good ? 'success' : 'error' ) ;
        setScan( good ? 'accepted' : 'refused' ) ;
    } ;

    const answer = value => ( value ? t.state?.yes : t.state?.no ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-5xl">

            {/* The device's master switch */}
            { device && (
                <>
                    <section className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold">{ t.master?.title }</h3>
                        <p className="text-sm text-base-content/70">{ t.master?.note }</p>
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2">
                                <SoundButton style="outline" />
                                <span className="text-sm">SoundButton</span>
                            </div>
                            <Toggle checked={ device.sound } color="primary" label={ t.master?.sound } onChange={ event => device.setSound( event.target.checked ) } />
                            <Toggle checked={ device.vibration } color="primary" label={ t.master?.vibration } onChange={ event => device.setVibration( event.target.checked ) } />
                            <div className="flex items-center gap-2">
                                <span className="text-sm">{ t.master?.volume }</span>
                                <SegmentedControl
                                    ariaLabel = { t.master?.volume }
                                    items     = { VOLUMES.map( item => ( { key : item , label : `${ Math.round( item * 100 ) } %` } ) ) }
                                    onChange  = { device.setVolume }
                                    value     = { device.volume }
                                />
                            </div>
                        </div>
                        <pre className="rounded-box bg-base-100 p-3 text-xs">
                            useFeedback() → { JSON.stringify( { sound : device.sound , vibration : device.vibration , volume : device.volume } ) }
                        </pre>
                    </section>

                    <Divider />
                </>
            ) }

            {/* Device state */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-bold">{ t.state?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.state?.note }</p>
                <div className="flex flex-wrap items-center gap-2">
                    <Badge color={ unlocked ? 'success' : 'warning' }>{ unlocked ? t.state?.unlocked : t.state?.locked }</Badge>
                    <Badge style="outline">{ t.state?.audio } : { answer( supports.audio ) }</Badge>
                    <Badge style="outline">{ t.state?.vibrate } : { answer( supports.vibration ) }</Badge>
                    { !unlocked && (
                        <Button onClick={ unlock } size="sm" style="outline">
                            { t.state?.unlock }
                        </Button>
                    ) }
                </div>
            </section>

            <Divider />

            {/* Settings */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-bold">{ t.settings?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.settings?.note }</p>
                <div className="flex flex-wrap items-center gap-6">
                    <Toggle checked={ sound } color="primary" label={ t.settings?.sound } onChange={ event => setSound( event.target.checked ) } />
                    <Toggle checked={ vibration } color="primary" label={ t.settings?.vibration } onChange={ event => setVibration( event.target.checked ) } />
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{ t.settings?.volume }</span>
                        <SegmentedControl
                            ariaLabel = { t.settings?.volume }
                            items     = { [ { key : DEVICE , label : t.settings?.device } , ...VOLUMES.map( item => ( { key : item , label : `${ Math.round( item * 100 ) } %` } ) ) ] }
                            onChange  = { setVolume }
                            value     = { volume }
                        />
                    </div>
                </div>
                <Toggle
                    checked  = { silent }
                    helper   = { t.settings?.silentHelp }
                    label    = { t.settings?.silent }
                    onChange = { event => setSilent( event.target.checked ) }
                />
            </section>

            <Divider />

            {/* The three signals */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-bold">{ t.signals?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.signals?.note }</p>
                <div className="flex flex-wrap gap-3">
                    { [ 'success' , 'warning' , 'error' ].map( name => (
                        <Button key={ name } color={ name } onClick={ () => signal( name ) } size="lg">
                            { t.signals?.[ name ] }
                        </Button>
                    ) ) }
                </div>
            </section>

            <Divider />

            {/* A signal of our own */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-bold">{ t.custom?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.custom?.note }</p>
                <div>
                    <Button color="primary" onClick={ () => signal( 'done' ) } size="lg" style="outline">
                        { t.custom?.button }
                    </Button>
                </div>
                <pre className="overflow-x-auto rounded-box bg-base-100 p-3 text-xs">{ JSON.stringify( SIGNALS , null , 2 ) }</pre>
            </section>

            <Divider />

            {/* With what the screen shows */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-bold">{ t.scan?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.scan?.note }</p>
                <div className="flex flex-wrap gap-3">
                    <Button color="success" onClick={ () => onScan( true ) } size="lg" style="outline">
                        { t.scan?.good }
                    </Button>
                    <Button color="error" onClick={ () => onScan( false ) } size="lg" style="outline">
                        { t.scan?.bad }
                    </Button>
                </div>
                <Alert level={ scan === 'accepted' ? 'success' : scan === 'refused' ? 'error' : 'info' }>
                    { scan ? t.scan?.[ scan ] : t.scan?.waiting }
                </Alert>
            </section>

        </Container>
    ) ;
} ;

export default FeedbackSignalDemo ;
