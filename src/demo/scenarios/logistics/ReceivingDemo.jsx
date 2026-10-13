'use client' ;

import { useEffect , useMemo , useRef , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Alert         from '@/components/Alert' ;
import Badge         from '@/components/Badge' ;
import Barcode       from '@/components/barcodes/Barcode' ;
import Button        from '@/components/Button' ;
import InputScan     from '@/components/inputs/InputScan' ;
import NumericKeypad from '@/components/inputs/NumericKeypad' ;
import PhotoCapture  from '@/components/media/PhotoCapture' ;
import SignaturePad  from '@/components/inputs/SignaturePad' ;
import RadioFilter   from '@/components/radios/RadioFilter' ;
import Steps         from '@/components/steps/Steps' ;
import Toggle        from '@/components/checkboxes/Toggle' ;
import Link          from '@/components/links/Link' ;
import BottomSheet   from '@/components/modals/BottomSheet' ;
import Dock          from '@/components/menus/Dock' ;
import ScanList      from '@/components/lists/ScanList' ;

import PdfDownloadButton from '@/components/documents/PdfDownloadButton' ;

import useFeedbackSignal from '@/hooks/useFeedbackSignal' ;
import useHotkeys        from '@/hooks/useHotkeys' ;
import useNumberFormat   from '@/hooks/useNumberFormat' ;

import { completeGS1Number } from '@/helpers/barcodes/gs1CheckDigit' ;
import parseGS1Date          from '@/helpers/barcodes/parseGS1Date' ;
import readTypedCode         from '@/helpers/barcodes/readTypedCode' ;
import sha256                from '@/helpers/crypto/sha256' ;

import useI18n from '@/contexts/locale/useI18n' ;

const ORDER = 'PO-2026-118' ;

const SSCC         = completeGS1Number( 'sscc' , '10614141123456789' , 18 ) ;
const FOREIGN_SSCC = completeGS1Number( 'sscc' , '10614141123456790' , 18 ) ;

/**
 * The lines of the order : what is expected, and under which GTIN.
 */
const LINES =
[
    { expected : 24 , gtin : completeGS1Number( 'gtin' , '0950110153000' , 14 ) , key : 'oak' } ,
    { expected : 10 , gtin : completeGS1Number( 'gtin' , '0950110153001' , 14 ) , key : 'batten' } ,
    { expected : 6  , gtin : completeGS1Number( 'gtin' , '0950110153002' , 14 ) , key : 'panel' } ,
] ;

const OTHER_GTIN = completeGS1Number( 'gtin' , '0950110153009' , 14 ) ;

const STEPS = [ 'pallet' , 'lines' , 'review' , 'done' ] ;

const REASONS = [ 'missing' , 'excess' , 'damaged' , 'other' ] ;

/** Below this many days, an expiry date is close. */
const CLOSE_DAYS = 30 ;

/**
 * A day from today, as a local date.
 */
const addDays = ( today , days ) => new Date( today.getFullYear() , today.getMonth() , today.getDate() + days ) ;

/**
 * `YYMMDD`, as a GS1 label writes a date.
 */
const yymmdd = date => [ date.getFullYear() % 100 , date.getMonth() + 1 , date.getDate() ].map( part => String( part ).padStart( 2 , '0' ) ).join( '' ) ;

/**
 * `YYYY-MM-DD`, comparable as text.
 */
const isoDay = date => [ date.getFullYear() , date.getMonth() + 1 , date.getDate() ].map( ( part , index ) => String( part ).padStart( index === 0 ? 4 : 2 , '0' ) ).join( '-' ) ;

/**
 * The labels shown to scan, their dates worked out from today.
 */
const makeLabels = today =>
{
    const label = ( key , gtin , lot , days , quantity ) =>
        ( { key , value : `(01)${ gtin }(10)${ lot }(17)${ yymmdd( addDays( today , days ) ) }(30)${ quantity }` } ) ;

    return [
        { key : 'pallet'  , value : `(00)${ SSCC }` } ,
        { key : 'foreign' , value : `(00)${ FOREIGN_SSCC }` } ,
        label( 'oak'     , LINES[ 0 ].gtin , 'CH-2611' , 400 , 12 ) ,
        label( 'batten'  , LINES[ 1 ].gtin , 'TA-0907' , 20  , 10 ) ,
        label( 'panel'   , LINES[ 2 ].gtin , 'PX-1803' , 600 , 6 ) ,
        label( 'expired' , LINES[ 0 ].gtin , 'CH-2402' , -3  , 12 ) ,
        label( 'other'   , OTHER_GTIN      , 'XX-0001' , 300 , 4 ) ,
    ] ;
} ;

/**
 * The components the screen is built of, and the page that shows each one.
 */
const USED =
[
    { href : '/modules/scanField'               , name : 'InputScan' } ,
    { href : '/modules/barcodes'                , name : 'Barcode' } ,
    { href : '/components/signals'              , name : 'useFeedbackSignal' } ,
    { href : '/components/inputs?filter=keypad' , name : 'NumericKeypad' } ,
    { href : '/components/modals'               , name : 'BottomSheet' } ,
    { href : '/components/radios'               , name : 'RadioFilter' } ,
    { href : '/components/photo'                , name : 'PhotoCapture' } ,
    { href : '/components/inputs?filter=signature' , name : 'SignaturePad' } ,
    { href : '/modules/documentsCreate'         , name : 'PdfDownloadButton' } ,
    { href : '/components/steps'                , name : 'Steps' } ,
    { href : '/components/dock'                 , name : 'Dock' } ,
    { href : '/modules/scanner'                 , name : 'ScanList' } ,
    { href : '/modules/scanner'                 , name : 'useHotkeys' } ,
] ;

const emptyLines = () => LINES.map( line => ( { ...line , lots : [] , reason : null , received : 0 } ) ) ;

/**
 * Receiving a delivery from end to end, the GS1 labels read in full.
 *
 * Scan the pallet's SSCC to open the receipt ; scan each parcel label — its
 * GTIN finds the line, its quantity adds up, its lot and expiry date are kept,
 * an expired parcel is refused and a close date warned of ; correct a quantity
 * on a keypad ; give a reason for each line that is off, and the photo of the
 * signed delivery note. Confirming prints the record the application would
 * send. The labels are drawn on the page, their dates worked out from today
 * once the page is in the browser.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scenarios.logistics.receiving'] - Dot notation path to the demo locale.
 */
const ReceivingDemo = ( { path = 'demo.scenarios.logistics.receiving' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const { locale } = useNumberFormat() ;

    // Read in the browser only : the server and the first render must agree, a date of the day may not.
    const [ today , setToday ] = useState( null ) ;
    useEffect( () =>
    {
        setToday( new Date() ) ;
    } , [] ) ;

    const [ sound   , setSound   ] = useState( false ) ;
    const [ step    , setStep    ] = useState( 'pallet' ) ;
    const [ message , setMessage ] = useState( null ) ;
    const [ lines   , setLines   ] = useState( emptyLines ) ;
    const [ photos  , setPhotos  ] = useState( [] ) ;
    const [ editing , setEditing ] = useState( null ) ;
    const [ record  , setRecord  ] = useState( null ) ;

    const [ signature , setSignature ] = useState( null ) ;

    // The parcels read, under the field : one line per label, counted when a label is read twice.
    const parcels = useRef( null ) ;
    const [ Receipt   , setReceipt   ] = useState( null ) ;

    // The receipt's template imports the PDF writer : fetched once the receipt can exist.
    useEffect( () =>
    {
        if ( step === 'done' && !Receipt )
        {
            import( '@/demo/documents/pdf/ReceiptDocument' ).then( module => setReceipt( () => module.default ) , () => {} ) ;
        }
    }
    , [ Receipt , step ] ) ;

    const { signal } = useFeedbackSignal( { sound , vibration : sound } ) ;

    const labels = today ? makeLabels( today ) : [] ;

    const name = key => t.products?.[ key ] ;

    const showDate = iso =>
    {
        const [ year , month , day ] = iso.split( '-' ).map( Number ) ;
        return new Date( year , month - 1 , day ).toLocaleDateString( locale ) ;
    } ;

    const say = ( level , text ) =>
    {
        signal( level === 'error' ? 'error' : level === 'warning' ? 'warning' : 'success' ) ;
        setMessage( { level , text } ) ;
    } ;

    const reset = () =>
    {
        setStep( 'pallet' ) ;
        setMessage( null ) ;
        setLines( emptyLines() ) ;
        setPhotos( [] ) ;
        setRecord( null ) ;
        setSignature( null ) ;
        parcels.current?.clear() ;
    } ;

    const onReading = reading =>
    {
        const { elements } = reading ;
        const data = Object.fromEntries( ( elements ?? [] ).map( ( { ai , data : value } ) => [ ai , value ] ) ) ;

        if ( step === 'pallet' )
        {
            if ( !data[ '00' ] )
            {
                say( 'error' , t.pallet?.notSscc ) ;
            }
            else if ( data[ '00' ] !== SSCC )
            {
                say( 'error' , format( t.pallet?.wrong ?? '{0}' , data[ '00' ] ) ) ;
            }
            else
            {
                say( 'success' , format( t.pallet?.right ?? '{0}' , SSCC ) ) ;
                setStep( 'lines' ) ;
            }
            return ;
        }

        if ( step !== 'lines' )
        {
            return ;
        }

        if ( data[ '00' ] )
        {
            say( 'info' , t.lines?.again ) ;
            return ;
        }

        if ( !data[ '01' ] )
        {
            say( 'error' , t.lines?.notGs1 ) ;
            return ;
        }

        const line = lines.find( item => item.gtin === data[ '01' ] ) ;

        if ( !line )
        {
            say( 'error' , t.lines?.unknown ) ;
            return ;
        }

        const quantity = Number( data[ '30' ] ?? data[ '37' ] ?? 1 ) || 1 ;
        const expiry   = data[ '17' ] ? parseGS1Date( data[ '17' ] , { today } ) : null ;
        const now      = isoDay( today ) ;

        if ( expiry && expiry < now )
        {
            say( 'error' , format( t.lines?.expired ?? '{0}' , name( line.key ) , showDate( expiry ) ) ) ;
            return ;
        }

        setLines( list => list.map( item => item.gtin !== line.gtin ? item :
        {
            ...item ,
            lots     : [ ...item.lots , { expiry , lot : data[ '10' ] ?? null , quantity } ] ,
            received : item.received + quantity ,
        } ) ) ;

        parcels.current?.add( { ...reading , code : reading.value ?? reading.code ?? reading.raw ?? data[ '01' ] } ) ;

        if ( expiry && expiry < isoDay( addDays( today , CLOSE_DAYS ) ) )
        {
            say( 'warning' , format( t.lines?.short ?? '{0}' , name( line.key ) , quantity , showDate( expiry ) ) ) ;
        }
        else
        {
            say( 'success' , format( t.lines?.added ?? '{0}' , name( line.key ) , quantity ) ) ;
        }
    } ;

    const onUse = value =>
    {
        try
        {
            onReading( readTypedCode( value ) ) ;
        }
        catch ( error )
        {
            say( 'error' , error.message ) ;
        }
    } ;

    const gaps = lines.filter( line => line.received !== line.expected ) ;

    const complete = gaps.every( line => line.reason !== null ) && photos.length > 0 && signature !== null ;

    const onConfirm = async () =>
    {
        const note = photos[ 0 ]?.file ;
        const at   = new Date().toISOString() ;

        const lineRecords = lines.map( ( { expected , gtin , lots , reason , received } ) => (
        {
            expected ,
            gap    : received - expected ,
            gtin ,
            lots ,
            reason : received === expected ? null : reason ,
            received ,
        } ) ) ;

        // The digest binds the signature to what was signed : the lines and the strokes, as they were.
        const digest = await sha256( JSON.stringify( { at , lines : lineRecords , order : ORDER , pallet : SSCC , signature } ) ) ;

        say( 'success' , t.review?.done ) ;
        setStep( 'done' ) ;
        setRecord(
        {
            at ,
            digest ,
            deliveryNote : note ? { name : note.name , size : note.size , type : note.type } : null ,
            lines        : lineRecords ,
            order        : ORDER ,
            pallet       : SSCC ,
            signature    : { points : signature.strokes.reduce( ( sum , stroke ) => sum + stroke.length , 0 ) , strokes : signature.strokes.length } ,
            supplier     : t.delivery?.supplierName ,
        } ) ;
    } ;

    const status = ( { expected , received } ) =>
    {
        if ( received === 0 )
        {
            return <Badge style="ghost">{ t.lines?.status?.todo }</Badge> ;
        }
        if ( received === expected )
        {
            return <Badge color="success">{ t.lines?.status?.full }</Badge> ;
        }
        return received < expected
            ? <Badge color="warning">{ format( t.lines?.status?.short ?? '{0}' , expected - received ) }</Badge>
            : <Badge color="info">{ format( t.lines?.status?.over ?? '{0}' , received - expected ) }</Badge> ;
    } ;

    const scanning = step === 'pallet' || step === 'lines' ;

    const receipt = useMemo( () =>
        Receipt && record
            ? (
                <Receipt
                    labels  = { t.receipt ?? {} }
                    locale  = { locale }
                    receipt = { {
                        at        : record.at ,
                        digest    : record.digest ,
                        lines     : record.lines.map( line => ( { ...line , name : t.products?.[ LINES.find( item => item.gtin === line.gtin )?.key ] , reason : line.reason ? t.review?.reasons?.[ line.reason ] : null } ) ) ,
                        order     : ORDER ,
                        pallet    : SSCC ,
                        signature ,
                        supplier  : t.delivery?.supplierName ,
                    } }
                />
            )
            : null
    , [ Receipt , locale , record , signature , t.delivery , t.products , t.receipt , t.review ] ) ;

    // The keys of a hand-held : F1 uses the expected pallet's label, F2 the first line's, V goes on.
    useHotkeys(
    {
        'F1' : () => { if ( scanning && labels[ 0 ] ) onUse( labels[ 0 ].value ) ; } ,
        'F2' : () => { if ( scanning && labels[ 2 ] ) onUse( labels[ 2 ].value ) ; } ,
        'v'  : () =>
        {
            if ( step === 'lines' && !lines.every( line => line.received === 0 ) ) setStep( 'review' ) ;
            else if ( step === 'review' && complete ) onConfirm() ;
        } ,
    } , { enabled : !editing } ) ;

    const editedLine = lines.find( line => line.gtin === editing ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>
            <p className="text-xs text-base-content/60">{ t.keys }</p>

            <Toggle checked={ sound } color="primary" inline label={ t.sound } onChange={ event => setSound( event.target.checked ) } />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">

                {/* The receiving screen */}
                <section className="flex min-w-0 flex-col gap-5 rounded-box bg-base-100 p-5 shadow-sm">

                    <Steps
                        ariaLabel = { t.steps?.label }
                        className = "w-full"
                        current   = { STEPS.indexOf( step ) }
                        items     = { STEPS.map( id => ( { id , label : t.steps?.[ id ] } ) ) }
                    />

                    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                        <dt className="text-base-content/60">{ t.delivery?.supplier }</dt>
                        <dd className="font-medium">{ t.delivery?.supplierName }</dd>
                        <dt className="text-base-content/60">{ t.delivery?.order }</dt>
                        <dd className="font-mono">{ ORDER }</dd>
                        <dt className="text-base-content/60">{ t.delivery?.pallet }</dt>
                        <dd className="font-mono break-all">{ SSCC }</dd>
                    </dl>

                    { message && <Alert align="start" level={ message.level }>{ message.text }</Alert> }

                    { scanning && (
                        <InputScan
                            clearOnScan
                            key         = { step }
                            label       = { t[ step ]?.label }
                            onReject    = { ( _ , text ) => say( 'error' , text ) }
                            onScan      = { onReading }
                            placeholder = { t[ step ]?.placeholder }
                        />
                    ) }

                    { step !== 'pallet' && step !== 'done' && (
                        <ScanList
                            className = { step !== 'lines' ? 'hidden' : undefined }
                            empty     = { t.lines?.noParcel }
                            ref       = { parcels }
                            resolve   = { ( _ , reading ) =>
                            {
                                const gtin = ( reading?.elements ?? [] ).find( element => element.ai === '01' )?.data ;
                                const lot  = ( reading?.elements ?? [] ).find( element => element.ai === '10' )?.data ;
                                const item = LINES.find( line => line.gtin === gtin ) ;
                                return item ? { label : name( item.key ) , subtitle : lot ? format( t.lines?.lotOf ?? '{0}' , lot ) : undefined } : null ;
                            } }
                        />
                    ) }

                    { step !== 'pallet' && (
                        <div className="overflow-x-auto">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>{ t.lines?.product }</th>
                                        <th className="text-right">{ t.lines?.expected }</th>
                                        <th className="text-right">{ t.lines?.received }</th>
                                        <th>{ t.lines?.state }</th>
                                        { step === 'lines' && <th /> }
                                    </tr>
                                </thead>
                                <tbody>
                                    { lines.map( line => (
                                        <tr key={ line.gtin }>
                                            <td>
                                                <div className="font-medium">{ name( line.key ) }</div>
                                                <div className="font-mono text-xs text-base-content/50">{ line.gtin }</div>
                                                { line.lots.map( ( { expiry , lot , quantity } , index ) => (
                                                    // biome-ignore lint/suspicious/noArrayIndexKey: the same lot may be scanned twice.
                                                    <div className="text-xs text-base-content/70" key={ index }>
                                                        { format( t.lines?.lots ?? '{0}' , lot ?? '—' , expiry ? showDate( expiry ) : '—' , quantity ) }
                                                    </div>
                                                ) ) }
                                            </td>
                                            <td className="text-right tabular-nums">{ line.expected }</td>
                                            <td className="text-right font-semibold tabular-nums">{ line.received }</td>
                                            <td>{ status( line ) }</td>
                                            { step === 'lines' && (
                                                <td>
                                                    <Button
                                                        onClick = { () => setEditing( line.gtin ) }
                                                        size    = "xs"
                                                        style   = "outline"
                                                        title   = { format( t.lines?.correctOf ?? '{0}' , name( line.key ) ) }
                                                    >
                                                        { t.lines?.correct }
                                                    </Button>
                                                </td>
                                            ) }
                                        </tr>
                                    ) ) }
                                </tbody>
                            </table>
                        </div>
                    ) }

                    { step === 'lines' && (
                        <Dock
                            className = "rounded-box"
                            items     = { [
                                { id : 'reset'  , label : t.review?.next , onClick : reset , style : 'ghost' } ,
                                { id : 'finish' , color : 'primary' , disabled : lines.every( line => line.received === 0 ) , label : t.lines?.finish , onClick : () => setStep( 'review' ) } ,
                            ] }
                            position  = "relative"
                            variant   = "actions"
                        />
                    ) }

                    { ( step === 'review' || step === 'done' ) && (
                        <div className="flex flex-col gap-4">

                            { gaps.length === 0 && <p className="text-sm text-base-content/70">{ t.review?.note }</p> }

                            { gaps.map( line => (
                                <RadioFilter
                                    disabled = { step === 'done' }
                                    key      = { line.gtin }
                                    label    = { format( t.review?.reason ?? '{0}' , name( line.key ) ) }
                                    name     = { `receiving-${ line.key }` }
                                    onChange = { reason => setLines( list => list.map( item => ( item.gtin === line.gtin ? { ...item , reason } : item ) ) ) }
                                    options  = { REASONS.map( value => ( { label : t.review?.reasons?.[ value ] , value } ) ) }
                                    value    = { line.reason }
                                />
                            ) ) }

                            <PhotoCapture
                                allowGallery
                                disabled = { step === 'done' }
                                helper   = { t.review?.photoHelp }
                                label    = { t.review?.photo }
                                onChange = { setPhotos }
                                value    = { photos }
                            />

                            <SignaturePad
                                expandable
                                helper   = { t.review?.signHelp }
                                label    = { t.review?.sign }
                                onChange = { setSignature }
                                readOnly = { step === 'done' }
                                required
                                value    = { signature }
                            />

                            { step === 'done'
                                ? (
                                    <div className="flex flex-wrap gap-2">
                                        <PdfDownloadButton color="primary" document={ receipt } fileName={ `${ t.receipt?.fileName ?? 'receipt' }-${ ORDER }.pdf` } size="lg">{ t.review?.receipt }</PdfDownloadButton>
                                        <Button onClick={ reset } size="lg" style="outline">{ t.review?.next }</Button>
                                    </div>
                                )
                                : (
                                    <Dock
                                        className = "rounded-box"
                                        items     = { [
                                            { id : 'back'     , label : t.review?.back , onClick : () => setStep( 'lines' ) , style : 'ghost' } ,
                                            { id : 'validate' , color : 'primary' , disabled : !complete , label : t.review?.validate , onClick : onConfirm } ,
                                        ] }
                                        position  = "relative"
                                        variant   = "actions"
                                    />
                                ) }

                            { record && (
                                <div className="flex flex-col gap-1">
                                    <span className="font-mono text-sm">{ t.review?.record }</span>
                                    <pre className="overflow-x-auto rounded-box bg-base-200 p-3 text-xs">{ JSON.stringify( record , null , 2 ) }</pre>
                                </div>
                            ) }
                        </div>
                    ) }

                </section>

                {/* The labels to scan */}
                <section className="flex min-w-0 flex-col gap-3">
                    <h4 className="font-semibold">{ t.labels?.title }</h4>
                    <p className="text-xs text-base-content/60">{ t.labels?.note }</p>
                    <div className="grid grid-cols-1 gap-3">
                        { labels.map( label => (
                            <div className="flex flex-col items-center gap-2 rounded-box bg-base-100 p-3" key={ label.key }>
                                <span className="text-xs font-medium">{ t.labels?.[ label.key ] }</span>
                                <Barcode className="max-w-full" format="gs1_128" size="full" textScale={ 0.8 } value={ label.value } />
                                <Button disabled={ !scanning } onClick={ () => onUse( label.value ) } size="xs" style="outline">
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
                    { USED.map( ( { href , name : component } ) => (
                        <li key={ component }>
                            <Link className="badge badge-outline badge-sm font-mono hover:badge-primary" href={ href }>{ component }</Link>
                        </li>
                    ) ) }
                </ul>
            </section>

            { editedLine && (
                <BottomSheet ariaLabel={ t.lines?.sheet } onClose={ () => setEditing( null ) }>
                    { ( { close } ) => (
                        <div className="flex flex-col gap-3 p-2">
                            <span className="text-sm text-base-content/70">{ name( editedLine.key ) }</span>
                            <NumericKeypad
                                className    = "max-w-none"
                                defaultValue = { editedLine.received }
                                label        = { t.lines?.sheet }
                                onSubmit     = { value =>
                                {
                                    setLines( list => list.map( item => ( item.gtin === editedLine.gtin ? { ...item , received : value } : item ) ) ) ;
                                    signal( 'success' ) ;
                                    close() ;
                                } }
                                repeat
                                size         = "lg"
                            />
                        </div>
                    ) }
                </BottomSheet>
            ) }

        </Container>
    ) ;
} ;

export default ReceivingDemo ;
