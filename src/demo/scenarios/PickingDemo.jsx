'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Alert         from '@/components/Alert' ;
import Barcode       from '@/components/barcodes/Barcode' ;
import Button        from '@/components/Button' ;
import InputScan     from '@/components/inputs/InputScan' ;
import NumericKeypad from '@/components/inputs/NumericKeypad' ;
import PhotoCapture  from '@/components/media/PhotoCapture' ;
import RadioFilter   from '@/components/radios/RadioFilter' ;
import Steps         from '@/components/steps/Steps' ;
import Toggle        from '@/components/checkboxes/Toggle' ;
import Link          from '@/components/links/Link' ;
import BottomSheet   from '@/components/modals/BottomSheet' ;

import useFeedbackSignal from '@/hooks/useFeedbackSignal' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * The line to pick : where, what, how many.
 */
const LINE =
{
    ean      : '4006381333931' ,
    expected : 12 ,
    location : 'H2-04-B' ,
} ;

/**
 * The labels shown to scan : two right, two wrong.
 */
const LABELS =
[
    { format : 'code_128' , key : 'location'   , value : LINE.location } ,
    { format : 'code_128' , key : 'wrongPlace' , value : 'H2-04-C' } ,
    { format : 'ean_13'   , key : 'product'    , value : LINE.ean } ,
    { format : 'ean_13'   , key : 'wrongItem'  , value : '9501101530003' } ,
] ;

const STEPS = [ 'location' , 'product' , 'quantity' , 'confirm' ] ;

const REASONS = [ 'damaged' , 'missing' , 'label' , 'other' ] ;

const DAMAGED = 'damaged' ;

/**
 * The components the screen is built of, and the page that shows each one.
 */
const USED =
[
    { href : '/modules/scanField'              , name : 'InputScan' } ,
    { href : '/modules/barcodes'               , name : 'Barcode' } ,
    { href : '/components/signals'             , name : 'useFeedbackSignal' } ,
    { href : '/components/inputs?filter=keypad' , name : 'NumericKeypad' } ,
    { href : '/components/modals'              , name : 'BottomSheet' } ,
    { href : '/components/radios'              , name : 'RadioFilter' } ,
    { href : '/components/photo'               , name : 'PhotoCapture' } ,
    { href : '/components/steps'               , name : 'Steps' } ,
] ;

/**
 * A picking line from end to end, the way a picking screen chains the bricks.
 *
 * Scan the location, then the product — a wrong code buzzes and stays on the
 * step — enter the quantity picked on a keypad in a bottom sheet, and, when it
 * falls short, choose a reason ; a damage needs its photo. Confirming prints
 * the record the application would send. The labels to scan are drawn on the
 * page : a phone scans them off the screen, or they can be typed, or used with
 * a click.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scenarios.picking'] - Dot notation path to the demo locale.
 */
const PickingDemo = ( { path = 'demo.scenarios.picking' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ sound    , setSound    ] = useState( false ) ;
    const [ step     , setStep     ] = useState( 'location' ) ;
    const [ message  , setMessage  ] = useState( null ) ;
    const [ quantity , setQuantity ] = useState( null ) ;
    const [ reason   , setReason   ] = useState( null ) ;
    const [ photos   , setPhotos   ] = useState( [] ) ;
    const [ sheet    , setSheet    ] = useState( false ) ;
    const [ record   , setRecord   ] = useState( null ) ;

    const { signal } = useFeedbackSignal( { sound , vibration : sound } ) ;

    const gap = quantity === null ? 0 : LINE.expected - quantity ;

    const complete = gap === 0 || ( reason !== null && ( reason !== DAMAGED || photos.length > 0 ) ) ;

    const reset = () =>
    {
        setStep( 'location' ) ;
        setMessage( null ) ;
        setQuantity( null ) ;
        setReason( null ) ;
        setPhotos( [] ) ;
        setRecord( null ) ;
    } ;

    // Both scan steps : the right code moves on, any other buzzes and stays.
    const onCode = code =>
    {
        if ( step !== 'location' && step !== 'product' )
        {
            return ;
        }

        const expected = step === 'location' ? LINE.location : LINE.ean ;
        const copy     = t[ step ] ?? {} ;

        if ( code !== expected )
        {
            signal( 'error' ) ;
            setMessage( { level : 'error' , text : format( copy.wrong ?? '{0} {1}' , expected , code ) } ) ;
            return ;
        }

        signal( 'success' ) ;
        setMessage( { level : 'success' , text : format( copy.right ?? '{0}' , code ) } ) ;
        setStep( step === 'location' ? 'product' : 'quantity' ) ;
    } ;

    const onQuantity = value =>
    {
        signal( 'success' ) ;
        setQuantity( value ) ;
        setReason( null ) ;
        setPhotos( [] ) ;
        setMessage( value === LINE.expected
            ? { level : 'success' , text : t.quantity?.full }
            : { level : 'warning' , text : format( t.quantity?.gap ?? '{0}' , LINE.expected - value ) } ) ;
        setStep( 'confirm' ) ;
    } ;

    const onConfirm = () =>
    {
        const photo = photos[ 0 ]?.file ;

        signal( 'success' ) ;
        setMessage( { level : 'success' , text : t.confirm?.done } ) ;
        setRecord(
        {
            at       : new Date().toISOString() ,
            expected : LINE.expected ,
            gap ,
            location : LINE.location ,
            photo    : photo ? { name : photo.name , size : photo.size , type : photo.type } : null ,
            picked   : quantity ,
            product  : LINE.ean ,
            reason   : gap > 0 ? reason : null ,
        } ) ;
    } ;

    const scanning = step === 'location' || step === 'product' ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <Toggle checked={ sound } color="primary" inline label={ t.sound } onChange={ event => setSound( event.target.checked ) } />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">

                {/* The picking screen */}
                <section className="flex flex-col gap-5 rounded-box bg-base-100 p-5 shadow-sm">

                    <Steps
                        ariaLabel = { t.steps?.label }
                        className = "w-full"
                        current   = { STEPS.indexOf( step ) }
                        items     = { STEPS.map( id => ( { id , label : t.steps?.[ id ] } ) ) }
                    />

                    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                        <dt className="text-base-content/60">{ t.line?.location }</dt>
                        <dd className="font-mono font-semibold">{ LINE.location }</dd>
                        <dt className="text-base-content/60">{ t.line?.ean }</dt>
                        <dd><span className="font-medium">{ t.line?.product }</span> <span className="font-mono text-base-content/60">{ LINE.ean }</span></dd>
                        <dt className="text-base-content/60">{ t.line?.expected }</dt>
                        <dd className="font-semibold">{ LINE.expected } { t.line?.unit }</dd>
                    </dl>

                    { message && (
                        <Alert align="start" level={ message.level }>{ message.text }</Alert>
                    ) }

                    { scanning && (
                        <InputScan
                            clearOnScan
                            key         = { step }
                            label       = { t[ step ]?.label }
                            onScan      = { ( { value } ) => onCode( value ) }
                            placeholder = { t[ step ]?.placeholder }
                        />
                    ) }

                    { step === 'quantity' && (
                        <div>
                            <Button color="primary" onClick={ () => setSheet( true ) } size="lg">{ t.quantity?.enter }</Button>
                        </div>
                    ) }

                    { step === 'confirm' && (
                        <div className="flex flex-col gap-4">

                            <div className="flex flex-wrap items-center gap-3">
                                <span className="font-semibold">{ format( t.quantity?.picked ?? '{0} / {1}' , quantity , LINE.expected ) }</span>
                                { !record && (
                                    <Button onClick={ () => setSheet( true ) } size="sm" style="outline">{ t.quantity?.change }</Button>
                                ) }
                            </div>

                            { gap > 0 && (
                                <RadioFilter
                                    disabled = { Boolean( record ) }
                                    label    = { t.confirm?.reason }
                                    name     = "picking-reason"
                                    onChange = { setReason }
                                    options  = { REASONS.map( value => ( { label : t.confirm?.reasons?.[ value ] , value } ) ) }
                                    size     = "lg"
                                    value    = { reason }
                                />
                            ) }

                            { gap > 0 && reason === DAMAGED && (
                                <PhotoCapture
                                    disabled = { Boolean( record ) }
                                    helper   = { t.confirm?.photoHelp }
                                    label    = { t.confirm?.photo }
                                    onChange = { setPhotos }
                                    value    = { photos }
                                />
                            ) }

                            <div>
                                { record
                                    ? <Button color="primary" onClick={ reset } size="lg">{ t.confirm?.next }</Button>
                                    : <Button color="primary" disabled={ !complete } onClick={ onConfirm } size="lg">{ t.confirm?.validate }</Button> }
                            </div>

                            { record && (
                                <div className="flex flex-col gap-1">
                                    <span className="font-mono text-sm">{ t.confirm?.record }</span>
                                    <pre className="overflow-x-auto rounded-box bg-base-200 p-3 text-xs">{ JSON.stringify( record , null , 2 ) }</pre>
                                </div>
                            ) }
                        </div>
                    ) }

                </section>

                {/* The labels to scan */}
                <section className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.labels?.title }</h4>
                    <p className="text-xs text-base-content/60">{ t.labels?.note }</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        { LABELS.map( label => (
                            <div className="flex flex-col items-center gap-2 rounded-box bg-base-100 p-3" key={ label.key }>
                                <span className="text-xs font-medium">{ t.labels?.[ label.key ] }</span>
                                <Barcode format={ label.format } size="sm" value={ label.value } />
                                <Button disabled={ !scanning } onClick={ () => onCode( label.value ) } size="xs" style="outline">
                                    { t.labels?.use }
                                </Button>
                            </div>
                        ) ) }
                    </div>
                </section>

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

            { sheet && (
                <BottomSheet ariaLabel={ t.quantity?.sheet } onClose={ () => setSheet( false ) }>
                    { ( { close } ) => (
                        <div className="flex flex-col gap-3 p-2">
                            <span className="text-sm text-base-content/70">{ t.line?.product }</span>
                            <NumericKeypad
                                className    = "max-w-none"
                                defaultValue = { quantity }
                                label        = { t.quantity?.sheet }
                                max          = { LINE.expected }
                                onLimit      = { () =>
                                {
                                    signal( 'warning' ) ;
                                    setMessage( { level : 'warning' , text : t.quantity?.over } ) ;
                                } }
                                onSubmit     = { value =>
                                {
                                    onQuantity( value ) ;
                                    close() ;
                                } }
                                repeat
                                size         = "lg"
                                unit         = { t.line?.unit }
                            />
                        </div>
                    ) }
                </BottomSheet>
            ) }

        </Container>
    ) ;
} ;

export default PickingDemo ;
