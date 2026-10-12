'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Alert         from '@/components/Alert' ;
import Badge         from '@/components/Badge' ;
import Barcode       from '@/components/barcodes/Barcode' ;
import Button        from '@/components/Button' ;
import InputScan     from '@/components/inputs/InputScan' ;
import NumericKeypad from '@/components/inputs/NumericKeypad' ;
import RadioFilter   from '@/components/radios/RadioFilter' ;
import Steps         from '@/components/steps/Steps' ;
import Toggle        from '@/components/checkboxes/Toggle' ;
import Link          from '@/components/links/Link' ;
import BottomSheet   from '@/components/modals/BottomSheet' ;

import useFeedbackSignal from '@/hooks/useFeedbackSignal' ;

import { completeGS1Number } from '@/helpers/barcodes/gs1CheckDigit' ;

import useI18n from '@/contexts/locale/useI18n' ;

const LOCATION = 'H2-04-B' ;

const ean = digits => completeGS1Number( 'ean_13' , digits , 13 ) ;

/**
 * The book stock of the location.
 */
const BOOK =
[
    { ean : ean( '376012345001' ) , key : 'screws' , theoretical : 12 } ,
    { ean : ean( '376012345002' ) , key : 'hinges' , theoretical : 30 } ,
    { ean : ean( '376012345003' ) , key : 'angles' , theoretical : 8 } ,
] ;

/** A product that is not expected on the location. */
const FOUND = { ean : ean( '376012345009' ) , key : 'found' } ;

const LABELS =
[
    { format : 'code_128' , key : 'location' , value : LOCATION } ,
    { format : 'code_128' , key : 'wrong'    , value : 'H2-04-C' } ,
    ...BOOK.map( ( { ean : value , key } ) => ( { format : 'ean_13' , key , value } ) ) ,
    { format : 'ean_13'   , key : 'found'    , value : FOUND.ean } ,
] ;

const STEPS = [ 'location' , 'count' , 'recount' , 'validate' ] ;

const REASONS = [ 'damaged' , 'lost' , 'movement' , 'other' ] ;

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
    { href : '/components/toggles'              , name : 'Toggle' } ,
    { href : '/components/radios'               , name : 'RadioFilter' } ,
    { href : '/components/steps'                , name : 'Steps' } ,
] ;

const emptyLines = () => BOOK.map( line => ( { ...line , counts : [] , found : false , reason : null } ) ) ;

/**
 * The quantity a line ends on : its last count.
 */
const counted = line => ( line.counts.length > 0 ? line.counts[ line.counts.length - 1 ] : null ) ;

/**
 * Counting a location, blind if asked, a recount on every gap.
 *
 * Scan the location ; scan each product and enter how many there are on a
 * keypad — or enter it from its line, for one that cannot be found. A product
 * not expected there joins the count. The book stock stays hidden while
 * counting when the count is blind ; once it is shown, every line off asks
 * for one recount, the second count being the one kept. Each gap confirmed
 * takes a reason, and confirming prints the count and the stock adjustments.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scenarios.logistics.inventory'] - Dot notation path to the demo locale.
 */
const InventoryDemo = ( { path = 'demo.scenarios.logistics.inventory' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ sound   , setSound   ] = useState( false ) ;
    const [ blind   , setBlind   ] = useState( true ) ;
    const [ step    , setStep    ] = useState( 'location' ) ;
    const [ message , setMessage ] = useState( null ) ;
    const [ lines   , setLines   ] = useState( emptyLines ) ;
    const [ editing , setEditing ] = useState( null ) ;
    const [ record  , setRecord  ] = useState( null ) ;

    const { signal } = useFeedbackSignal( { sound , vibration : sound } ) ;

    const name = line => ( t.products?.[ line.key ] ?? format( t.products?.unknown ?? '{0}' , line.ean ) ) ;

    const gapOf = line => ( counted( line ) ?? 0 ) - ( line.theoretical ?? 0 ) ;

    const say = ( level , text ) =>
    {
        signal( level === 'error' ? 'error' : level === 'warning' ? 'warning' : 'success' ) ;
        setMessage( { level , text } ) ;
    } ;

    const reset = () =>
    {
        setStep( 'location' ) ;
        setMessage( null ) ;
        setLines( emptyLines() ) ;
        setRecord( null ) ;
    } ;

    // A line still to count again : off on its first count, not counted twice yet.
    const toRecount = line => line.counts.length === 1 && gapOf( line ) !== 0 ;

    const onCode = code =>
    {
        if ( step === 'location' )
        {
            if ( code === LOCATION )
            {
                say( 'success' , format( t.location?.right ?? '{0}' , code ) ) ;
                setStep( 'count' ) ;
            }
            else
            {
                say( 'error' , format( t.location?.wrong ?? '{0} {1}' , LOCATION , code ) ) ;
            }
            return ;
        }

        const line = lines.find( item => item.ean === code ) ;

        if ( step === 'count' )
        {
            if ( line )
            {
                setEditing( line.ean ) ;
                return ;
            }

            // Not in the book : it joins the count, expected at 0.
            const found = { counts : [] , ean : code , found : true , key : code === FOUND.ean ? FOUND.key : null , reason : null , theoretical : 0 } ;
            setLines( list => [ ...list , found ] ) ;
            say( 'warning' , format( t.count?.found ?? '{0}' , name( found ) ) ) ;
            setEditing( code ) ;
            return ;
        }

        if ( step === 'recount' )
        {
            if ( line && toRecount( line ) )
            {
                setEditing( line.ean ) ;
            }
            else
            {
                say( 'info' , line ? format( t.recount?.settled ?? '{0}' , name( line ) ) : t.count?.closed ) ;
            }
        }
    } ;

    const onCounted = value =>
    {
        const line = lines.find( item => item.ean === editing ) ;

        if ( !line )
        {
            return ;
        }

        const recount = step === 'recount' ;

        setLines( list => list.map( item => item.ean !== line.ean ? item :
        {
            ...item ,
            // While counting, a count is corrected in place ; the recount comes second.
            counts : recount ? [ item.counts[ 0 ] , value ] : [ value ] ,
        } ) ) ;

        say( 'success' , format( recount ? ( t.recount?.confirmed ?? '{0}' ) : ( t.count?.counted ?? '{0}' ) , name( line ) , value ) ) ;
    } ;

    const expected   = lines.filter( line => !line.found ) ;
    const done       = expected.filter( line => line.counts.length > 0 ).length ;
    const recounts   = lines.filter( toRecount ) ;
    const gaps       = lines.filter( line => line.counts.length > 0 && gapOf( line ) !== 0 ) ;
    const complete   = gaps.every( line => line.reason !== null ) ;
    const showBook   = !blind || step === 'recount' || step === 'validate' ;
    const scanning   = step === 'location' || step === 'count' || step === 'recount' ;

    const finishCount = () =>
    {
        // A line never counted was not found : it counts 0.
        setLines( list => list.map( line => ( line.counts.length === 0 ? { ...line , counts : [ 0 ] } : line ) ) ) ;
        setMessage( null ) ;
        setStep( 'recount' ) ;
    } ;

    const onValidate = () =>
    {
        say( 'success' , t.validate?.done ) ;
        setRecord(
        {
            adjustments : gaps.map( line => ( { delta : gapOf( line ) , ean : line.ean , reason : line.reason } ) ) ,
            at          : new Date().toISOString() ,
            blind ,
            lines       : lines.map( line => (
            {
                counted     : counted( line ) ,
                counts      : line.counts ,
                ean         : line.ean ,
                found       : line.found ,
                gap         : gapOf( line ) ,
                reason      : gapOf( line ) === 0 ? null : line.reason ,
                theoretical : line.theoretical ,
            } ) ) ,
            location    : LOCATION ,
        } ) ;
    } ;

    const status = line =>
    {
        if ( line.counts.length === 0 )
        {
            return <Badge style="ghost">{ t.table?.status?.todo }</Badge> ;
        }
        if ( !showBook )
        {
            return <Badge color="info" style="soft">{ t.table?.status?.counted }</Badge> ;
        }
        if ( toRecount( line ) )
        {
            return <Badge color="warning">{ t.table?.status?.recount }</Badge> ;
        }
        if ( gapOf( line ) === 0 )
        {
            return <Badge color="success">{ t.table?.status?.ok }</Badge> ;
        }
        return <Badge color="error">{ line.found ? t.table?.status?.found : t.table?.status?.gap }</Badge> ;
    } ;

    const editedLine = lines.find( line => line.ean === editing ) ;

    const signed = value => ( value > 0 ? `+${ value }` : `${ value }` ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <div className="flex flex-col gap-2">
                <Toggle checked={ sound } color="primary" inline label={ t.sound } onChange={ event => setSound( event.target.checked ) } />
                <Toggle checked={ blind } color="primary" disabled={ step !== 'location' } inline label={ t.blind } onChange={ event => setBlind( event.target.checked ) } />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">

                {/* The counting screen */}
                <section className="flex min-w-0 flex-col gap-5 rounded-box bg-base-100 p-5 shadow-sm">

                    <Steps
                        ariaLabel = { t.steps?.label }
                        className = "w-full"
                        current   = { STEPS.indexOf( step ) }
                        items     = { STEPS.map( id => ( { id , label : t.steps?.[ id ] } ) ) }
                    />

                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-mono text-lg font-semibold">{ LOCATION }</span>
                        { step === 'count' && (
                            <span className="text-sm text-base-content/70">{ format( t.count?.progress ?? '{0} / {1}' , done , expected.length ) }</span>
                        ) }
                        { step === 'recount' && (
                            <span className="text-sm text-base-content/70">
                                { recounts.length > 0 ? format( t.recount?.todo ?? '{0}' , recounts.length ) : t.recount?.none }
                            </span>
                        ) }
                    </div>

                    { message && <Alert align="start" level={ message.level }>{ message.text }</Alert> }

                    { scanning && (
                        <InputScan
                            clearOnScan
                            key         = { step }
                            label       = { t[ step ]?.label }
                            onScan      = { ( { value } ) => onCode( value ) }
                            placeholder = { t[ step ]?.placeholder }
                        />
                    ) }

                    { step !== 'location' && (
                        <div className="overflow-x-auto">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>{ t.table?.product }</th>
                                        <th className="text-right">{ t.table?.theoretical }</th>
                                        <th className="text-right">{ t.table?.first }</th>
                                        <th className="text-right">{ t.table?.second }</th>
                                        <th className="text-right">{ t.table?.gap }</th>
                                        <th />
                                        { ( step === 'count' || step === 'recount' ) && <th /> }
                                    </tr>
                                </thead>
                                <tbody>
                                    { lines.map( line => (
                                        <tr key={ line.ean }>
                                            <td>
                                                <div className="font-medium">{ name( line ) }</div>
                                                <div className="font-mono text-xs text-base-content/50">{ line.ean }</div>
                                            </td>
                                            <td className="text-right tabular-nums">
                                                { showBook ? line.theoretical : <span className="text-xs italic text-base-content/50">{ t.table?.hidden }</span> }
                                            </td>
                                            <td className="text-right tabular-nums">{ line.counts[ 0 ] ?? '—' }</td>
                                            <td className="text-right tabular-nums">{ line.counts[ 1 ] ?? '—' }</td>
                                            <td className={ `text-right font-semibold tabular-nums ${ showBook && line.counts.length > 0 && gapOf( line ) !== 0 ? 'text-error' : '' }` }>
                                                { showBook && line.counts.length > 0 ? signed( gapOf( line ) ) : '—' }
                                            </td>
                                            <td>{ status( line ) }</td>
                                            { ( step === 'count' || ( step === 'recount' && toRecount( line ) ) ) && (
                                                <td>
                                                    <Button
                                                        onClick = { () => setEditing( line.ean ) }
                                                        size    = "xs"
                                                        style   = "outline"
                                                        title   = { format( t.count?.enterOf ?? '{0}' , name( line ) ) }
                                                    >
                                                        { t.count?.enter }
                                                    </Button>
                                                </td>
                                            ) }
                                            { step === 'recount' && !toRecount( line ) && <td /> }
                                        </tr>
                                    ) ) }
                                </tbody>
                            </table>
                        </div>
                    ) }

                    { step === 'count' && (
                        <div>
                            <Button color="primary" disabled={ done === 0 } onClick={ finishCount } size="lg">{ t.count?.finish }</Button>
                        </div>
                    ) }

                    { step === 'recount' && (
                        <div>
                            <Button color="primary" disabled={ recounts.length > 0 } onClick={ () => setStep( 'validate' ) } size="lg">{ t.recount?.next }</Button>
                        </div>
                    ) }

                    { step === 'validate' && (
                        <div className="flex flex-col gap-4">

                            { gaps.length === 0 && <p className="text-sm text-base-content/70">{ t.validate?.none }</p> }

                            { gaps.map( line => (
                                <RadioFilter
                                    disabled = { Boolean( record ) }
                                    key      = { line.ean }
                                    label    = { format( t.validate?.reason ?? '{0}' , name( line ) , signed( gapOf( line ) ) ) }
                                    name     = { `inventory-${ line.ean }` }
                                    onChange = { reason => setLines( list => list.map( item => ( item.ean === line.ean ? { ...item , reason } : item ) ) ) }
                                    options  = { REASONS.map( value => ( { label : t.validate?.reasons?.[ value ] , value } ) ) }
                                    value    = { line.reason }
                                />
                            ) ) }

                            <div>
                                { record
                                    ? <Button color="primary" onClick={ reset } size="lg">{ t.validate?.next }</Button>
                                    : <Button color="primary" disabled={ !complete } onClick={ onValidate } size="lg">{ t.validate?.submit }</Button> }
                            </div>

                            { record && (
                                <div className="flex flex-col gap-1">
                                    <span className="font-mono text-sm">{ t.validate?.record }</span>
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
                    { USED.map( ( { href , name : component } ) => (
                        <li key={ component }>
                            <Link className="badge badge-outline badge-sm font-mono hover:badge-primary" href={ href }>{ component }</Link>
                        </li>
                    ) ) }
                </ul>
            </section>

            { editedLine && (
                <BottomSheet ariaLabel={ t.count?.sheet } onClose={ () => setEditing( null ) }>
                    { ( { close } ) => (
                        <div className="flex flex-col gap-3 p-2">
                            <span className="text-sm text-base-content/70">{ name( editedLine ) }</span>
                            <NumericKeypad
                                className    = "max-w-none"
                                defaultValue = { step === 'recount' ? null : counted( editedLine ) }
                                label        = { t.count?.sheet }
                                onSubmit     = { value =>
                                {
                                    onCounted( value ) ;
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

export default InventoryDemo ;
