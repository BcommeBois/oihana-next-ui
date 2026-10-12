'use client' ;

import { useEffect , useRef , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import { MdBed , MdDelete , MdLight , MdLocalOffer , MdLock , MdWeekend } from 'react-icons/md' ;

import Container from '@/display/Container' ;

import Alert              from '@/components/Alert' ;
import Button             from '@/components/Button' ;
import CopyBadge          from '@/components/CopyBadge' ;
import Input              from '@/components/inputs/Input' ;
import InputAction        from '@/components/inputs/InputAction' ;
import InputAddressSearch from '@/components/inputs/InputAddressSearch' ;
import InputCardCVV       from '@/components/inputs/InputCardCVV' ;
import InputCardExpiry    from '@/components/inputs/InputCardExpiry' ;
import InputCardNumber    from '@/components/inputs/InputCardNumber' ;
import InputCounter       from '@/components/inputs/InputCounter' ;
import InputDatePicker    from '@/components/inputs/InputDatePicker' ;
import InputPin           from '@/components/inputs/InputPin' ;
import PickerOption       from '@/components/pickers/PickerOption' ;
import QRCode             from '@/components/barcodes/QRCode' ;
import Steps              from '@/components/steps/Steps' ;

import useToast from '@/contexts/toasts/useToast' ;

import useNumberFormat from '@/hooks/useNumberFormat' ;

import ban          from '@/helpers/geo/adapters/ban' ;
import isCardExpiry from '@/helpers/validators/isCardExpiry' ;
import isCardNumber from '@/helpers/validators/isCardNumber' ;

import useI18n from '@/contexts/locale/useI18n' ;

import { DAY , Panel , UsedComponents , useToday } from '@/demo/scenarios/shared' ;

const ITEMS =
[
    { icon : MdWeekend , key : 'armchair' , price : 189 } ,
    { icon : MdLight   , key : 'lamp'     , price : 79 } ,
    { icon : MdBed     , key : 'throw'    , price : 59 } ,
] ;

const START_QUANTITIES = { armchair : 1 , lamp : 2 , throw : 1 } ;

/** The promo codes the shop accepts. */
const CODES = { BIENVENUE10 : { rate : 0.1 } , LIVRAISON : { freeShipping : true } } ;

/** Delivery modes : price, and the working days before the first possible date. */
const MODES = { home : { days : 2 , price : 9.9 } , relay : { days : 3 , price : 4.9 } , store : { days : 1 , price : 0 } } ;

const STEPS = [ 'cart' , 'delivery' , 'payment' , 'done' ] ;

/** A public test card number : it passes the Luhn check and matches no account. */
const TEST_CARD = { cvv : '123' , holder : 'Camille Martin' , number : '4242 4242 4242 4242' } ;

/** The code the « bank » sends, shown on the page for the demonstration. */
const BANK_CODE = '482913' ;

const WEEKEND = [ 0 , 6 ] ;

/**
 * The components the screen is built of, and the page that shows each one.
 */
const USED =
[
    { href : '/components/steps'                  , name : 'Steps' } ,
    { href : '/components/inputs?filter=counter'  , name : 'InputCounter' } ,
    { href : '/components/inputs?filter=action'   , name : 'InputAction' } ,
    { href : '/modules/mapsPicker'                , name : 'InputAddressSearch' } ,
    { href : '/components/pickers'                , name : 'PickerOption' } ,
    { href : '/components/dates'                  , name : 'InputDatePicker' } ,
    { href : '/components/inputs?filter=card'     , name : 'InputCardNumber' } ,
    { href : '/components/inputs?filter=pin'      , name : 'InputPin' } ,
    { href : '/components/badges'                 , name : 'CopyBadge' } ,
    { href : '/modules/barcodes'                  , name : 'QRCode' } ,
    { href : '/components/toasts'                 , name : 'useToast' } ,
] ;

/** The first working day `count` working days after `day`. */
const addWorkingDays = ( day , count ) =>
{
    let next = day ;
    let left = count ;
    while ( left > 0 )
    {
        next += 1 ;
        if ( !WEEKEND.includes( new Date( next * DAY ).getUTCDay() ) )
        {
            left -= 1 ;
        }
    }
    return next ;
} ;

/** A local date at midnight for a day number. */
const localDate = day =>
{
    const date = new Date( day * DAY ) ;
    return new Date( date.getUTCFullYear() , date.getUTCMonth() , date.getUTCDate() ) ;
} ;

/**
 * A checkout from end to end : cart, delivery, payment, confirmation.
 *
 * Quantities on counters, a promo code, a delivery mode on choice cards, an
 * address from the national base and a working day ; a test card checked —
 * through `isCardNumber` and `isCardExpiry` — then a simulated bank confirmation by code ;
 * an order number to copy, a QR code to collect in store, a toast. Nothing is
 * paid and nothing leaves the page : the record printed at the end keeps only
 * the card's brand and its last four digits.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scenarios.ecommerce.checkout'] - Dot notation path to the demo locale.
 */
const CheckoutDemo = ( { path = 'demo.scenarios.ecommerce.checkout' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const { formatNumber } = useNumberFormat() ;

    const { toast } = useToast() ;

    const today = useToday() ;

    const [ step       , setStep       ] = useState( 'cart' ) ;
    const [ quantities , setQuantities ] = useState( START_QUANTITIES ) ;
    const [ code       , setCode       ] = useState( '' ) ;
    const [ promo      , setPromo      ] = useState( null ) ;
    const [ promoError , setPromoError ] = useState( null ) ;
    const [ mode       , setMode       ] = useState( 'home' ) ;
    const [ query      , setQuery      ] = useState( '' ) ;
    const [ place      , setPlace      ] = useState( null ) ;
    const [ date       , setDate       ] = useState( '' ) ;
    const [ holder     , setHolder     ] = useState( '' ) ;
    const [ number     , setNumber     ] = useState( '' ) ;
    const [ expiry     , setExpiry     ] = useState( '' ) ;
    const [ cvv        , setCvv        ] = useState( '' ) ;
    const [ brand      , setBrand      ] = useState( 'unknown' ) ;
    const [ tried      , setTried      ] = useState( false ) ;
    const [ securing   , setSecuring   ] = useState( false ) ;
    const [ pin        , setPin        ] = useState( '' ) ;
    const [ pinError   , setPinError   ] = useState( null ) ;
    const [ checking   , setChecking   ] = useState( false ) ;
    const [ order      , setOrder      ] = useState( null ) ;

    // The simulated wait of the bank, cleared if the page goes before it ends.
    const timer = useRef( null ) ;
    useEffect( () => () => clearTimeout( timer.current ) , [] ) ;

    const euros = value => formatNumber( value , { currency : 'EUR' , style : 'currency' } ) ;
    const name  = key => t.items?.[ key ] ?? key ;

    const lines    = ITEMS.filter( item => ( quantities[ item.key ] ?? 0 ) > 0 ) ;
    const subtotal = lines.reduce( ( sum , item ) => sum + item.price * quantities[ item.key ] , 0 ) ;
    const discount = promo?.rate ? Math.round( subtotal * promo.rate * 100 ) / 100 : 0 ;
    const shipping = promo?.freeShipping ? 0 : MODES[ mode ].price ;
    const total    = Math.max( 0 , subtotal - discount + shipping ) ;

    const firstDay = today === null ? null : localDate( addWorkingDays( today , MODES[ mode ].days ) ) ;

    const needsAddress = mode !== 'store' ;
    const deliveryOk   = Boolean( date ) && ( !needsAddress || place !== null ) ;

    const errors =
    {
        cvv    : cvv.length < ( brand === 'amex' ? 4 : 3 ) ? t.payment?.invalidCvv : null ,
        expiry : isCardExpiry( expiry ) ? null : t.payment?.invalidExpiry ,
        holder : holder.trim() ? null : t.payment?.invalidHolder ,
        number : isCardNumber( number ) ? null : t.payment?.invalidNumber ,
    } ;

    const paymentOk = Object.values( errors ).every( error => error === null ) ;

    const applyCode = () =>
    {
        const key = code.trim().toUpperCase() ;

        if ( CODES[ key ] )
        {
            setPromo( { code : key , ...CODES[ key ] } ) ;
            setPromoError( null ) ;
        }
        else
        {
            setPromo( null ) ;
            setPromoError( t.cart?.unknown ) ;
        }
    } ;

    const fillTestCard = () =>
    {
        const now = new Date() ;
        setHolder( TEST_CARD.holder ) ;
        setNumber( TEST_CARD.number ) ;
        setExpiry( `${ String( now.getMonth() + 1 ).padStart( 2 , '0' ) }/${ String( ( now.getFullYear() + 3 ) % 100 ).padStart( 2 , '0' ) }` ) ;
        setCvv( TEST_CARD.cvv ) ;
        setBrand( 'visa' ) ;
    } ;

    const pay = () =>
    {
        setTried( true ) ;
        if ( paymentOk )
        {
            setSecuring( true ) ;
        }
    } ;

    const confirmCode = value =>
    {
        if ( value !== BANK_CODE )
        {
            setPinError( t.payment?.wrongCode ) ;
            return ;
        }

        setPinError( null ) ;
        setChecking( true ) ;

        timer.current = setTimeout( () =>
        {
            const now    = new Date() ;
            const reference = `CMD-${ now.getFullYear() }${ String( now.getMonth() + 1 ).padStart( 2 , '0' ) }${ String( now.getDate() ).padStart( 2 , '0' ) }-${ String( now.getTime() % 10000 ).padStart( 4 , '0' ) }` ;

            setOrder(
            {
                at       : now.toISOString() ,
                delivery :
                {
                    address : needsAddress ? place?.name ?? null : null ,
                    date ,
                    mode ,
                } ,
                lines    : lines.map( item => ( { key : item.key , price : item.price , quantity : quantities[ item.key ] } ) ) ,
                number   : reference ,
                payment  : { brand , last4 : number.replace( /\D/g , '' ).slice( -4 ) } ,
                promo    : promo?.code ?? null ,
                totals   : { discount , shipping , subtotal , total } ,
            } ) ;

            setChecking( false ) ;
            setSecuring( false ) ;
            setStep( 'done' ) ;
            toast( format( t.done?.toast ?? '{0}' , reference ) , 'success' ) ;
        } , 1200 ) ;
    } ;

    const restart = () =>
    {
        setStep( 'cart' ) ;
        setQuantities( START_QUANTITIES ) ;
        setCode( '' ) ;
        setPromo( null ) ;
        setPromoError( null ) ;
        setMode( 'home' ) ;
        setQuery( '' ) ;
        setPlace( null ) ;
        setDate( '' ) ;
        setHolder( '' ) ;
        setNumber( '' ) ;
        setExpiry( '' ) ;
        setCvv( '' ) ;
        setBrand( 'unknown' ) ;
        setTried( false ) ;
        setPin( '' ) ;
        setOrder( null ) ;
    } ;

    const summary = (
        <Panel title={ t.summary?.title }>
            <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm">
                <dt>{ t.summary?.subtotal }</dt>
                <dd className="text-right tabular-nums">{ euros( subtotal ) }</dd>
                { discount > 0 && (
                    <>
                        <dt>{ t.summary?.discount } ({ promo.code })</dt>
                        <dd className="text-right tabular-nums text-success">−{ euros( discount ) }</dd>
                    </>
                ) }
                <dt>{ t.summary?.shipping }</dt>
                <dd className="text-right tabular-nums">{ shipping === 0 ? t.summary?.free : euros( shipping ) }</dd>
                <dt className="border-t border-base-content/10 pt-2 font-semibold">{ t.summary?.total }</dt>
                <dd className="border-t border-base-content/10 pt-2 text-right text-lg font-bold tabular-nums">{ euros( total ) }</dd>
            </dl>
        </Panel>
    ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <Steps
                ariaLabel = { t.steps?.label }
                className = "w-full"
                current   = { STEPS.indexOf( step ) }
                items     = { STEPS.map( id => ( { id , label : t.steps?.[ id ] } ) ) }
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">

                <div className="flex min-w-0 flex-col gap-5">

                    { step === 'cart' && (
                        <Panel title={ t.steps?.cart }>
                            { lines.length === 0 ? (
                                <div className="flex flex-col items-start gap-3">
                                    <p className="text-sm text-base-content/60">{ t.cart?.empty }</p>
                                    <Button onClick={ () => setQuantities( START_QUANTITIES ) } size="sm" style="outline">{ t.cart?.refill }</Button>
                                </div>
                            ) : (
                                <ul className="flex flex-col divide-y divide-base-content/10">
                                    { lines.map( ( { icon : Icon , key , price } ) => (
                                        <li className="flex flex-wrap items-center gap-4 py-3" key={ key }>
                                            <span className="flex size-14 shrink-0 items-center justify-center rounded-box bg-base-200">
                                                <Icon aria-hidden="true" className="size-8 text-base-content/60" />
                                            </span>
                                            <span className="flex min-w-40 flex-1 flex-col">
                                                <span className="font-medium">{ name( key ) }</span>
                                                <span className="text-sm text-base-content/60 tabular-nums">{ euros( price ) }</span>
                                            </span>
                                            <InputCounter
                                                className = "w-36"
                                                max       = { 9 }
                                                min       = { 1 }
                                                onChange  = { value => setQuantities( current => ( { ...current , [ key ] : Number( value ) || 1 } ) ) }
                                                precision = { 0 }
                                                repeat
                                                showIcon  = { false }
                                                size      = "sm"
                                                value     = { quantities[ key ] }
                                            />
                                            <span className="w-24 text-right font-semibold tabular-nums">{ euros( price * quantities[ key ] ) }</span>
                                            <Button
                                                icon    = { MdDelete }
                                                onClick = { () => setQuantities( current => ( { ...current , [ key ] : 0 } ) ) }
                                                shape   = "square"
                                                size    = "sm"
                                                style   = "ghost"
                                                title   = { format( t.cart?.remove ?? '{0}' , name( key ) ) }
                                            />
                                        </li>
                                    ) ) }
                                </ul>
                            ) }

                            <InputAction
                                actionIcon      = { MdLocalOffer }
                                actionTooltip   = { t.cart?.apply }
                                error           = { promoError ?? undefined }
                                helper          = { promo ? format( t.cart?.applied ?? '{0}' , promo.code ) : t.cart?.promoHelp }
                                label           = { t.cart?.promo }
                                onAction        = { applyCode }
                                onChange        = { setCode }
                                value           = { code }
                            />

                            <div>
                                <Button color="primary" disabled={ lines.length === 0 } onClick={ () => setStep( 'delivery' ) }>{ t.cart?.next }</Button>
                            </div>
                        </Panel>
                    ) }

                    { step === 'delivery' && (
                        <Panel title={ t.steps?.delivery }>
                            <fieldset className="flex flex-col gap-2">
                                <legend className="mb-2 text-sm font-medium">{ t.delivery?.mode }</legend>
                                { Object.keys( MODES ).map( key => (
                                    <PickerOption
                                        checked  = { mode === key }
                                        key      = { key }
                                        name     = "checkout-mode"
                                        note     = { MODES[ key ].price === 0 || promo?.freeShipping ? t.summary?.free : euros( MODES[ key ].price ) }
                                        onSelect = { () => { setMode( key ) ; setDate( '' ) ; } }
                                        subtitle = { t.delivery?.modes?.[ key ]?.subtitle }
                                        title    = { t.delivery?.modes?.[ key ]?.title }
                                    />
                                ) ) }
                            </fieldset>

                            { needsAddress && (
                                <InputAddressSearch
                                    geocode  = { ban }
                                    helper   = { t.delivery?.addressHelp }
                                    label    = { t.delivery?.address }
                                    onChange = { setQuery }
                                    onSelect = { setPlace }
                                    value    = { query }
                                />
                            ) }

                            { firstDay && (
                                <InputDatePicker
                                    disabledWeekdays = { WEEKEND }
                                    helper           = { t.delivery?.dateHelp }
                                    key              = { mode }
                                    label            = { mode === 'store' ? t.delivery?.pickup : t.delivery?.date }
                                    min              = { firstDay }
                                    onChange         = { setDate }
                                    value            = { date }
                                />
                            ) }

                            { !deliveryOk && <p className="text-xs text-base-content/60">{ t.delivery?.missing }</p> }

                            <div className="flex flex-wrap gap-2">
                                <Button onClick={ () => setStep( 'cart' ) } style="outline">{ t.delivery?.back }</Button>
                                <Button color="primary" disabled={ !deliveryOk } onClick={ () => setStep( 'payment' ) }>{ t.delivery?.next }</Button>
                            </div>
                        </Panel>
                    ) }

                    { step === 'payment' && (
                        <Panel title={ t.steps?.payment }>
                            <div className="flex flex-wrap items-center gap-3">
                                <Button disabled={ securing } onClick={ fillTestCard } size="sm" style="outline">{ t.payment?.test }</Button>
                                <span className="text-xs text-base-content/60">{ t.payment?.testHelp }</span>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <Input disabled={ securing } error={ tried ? errors.holder ?? undefined : undefined } label={ t.payment?.holder } onChange={ setHolder } value={ holder } />
                                </div>
                                <div className="sm:col-span-2">
                                    <InputCardNumber
                                        disabled         = { securing }
                                        error            = { tried ? errors.number ?? undefined : undefined }
                                        helper           = { brand !== 'unknown' ? format( t.payment?.brand ?? '{0}' , brand ) : undefined }
                                        label            = { t.payment?.number }
                                        onCardTypeChange = { setBrand }
                                        onChange         = { setNumber }
                                        value            = { number }
                                    />
                                </div>
                                <InputCardExpiry disabled={ securing } error={ tried ? errors.expiry ?? undefined : undefined } label={ t.payment?.expiry } onChange={ setExpiry } value={ expiry } />
                                <InputCardCVV disabled={ securing } error={ tried ? errors.cvv ?? undefined : undefined } brand={ brand } label={ t.payment?.cvv } onChange={ setCvv } value={ cvv } />
                            </div>

                            { securing ? (
                                <div className="flex flex-col gap-3 rounded-box border border-base-content/10 p-4">
                                    <span className="flex items-center gap-2 font-medium"><MdLock aria-hidden="true" /> { t.payment?.secure }</span>
                                    <InputPin
                                        disabled   = { checking }
                                        error      = { pinError ?? undefined }
                                        label      = { t.payment?.code }
                                        length     = { 6 }
                                        onChange   = { setPin }
                                        onComplete = { confirmCode }
                                        type       = "number"
                                        value      = { pin }
                                    />
                                    <span className="text-xs text-base-content/60">{ format( t.payment?.codeHelp ?? '{0}' , BANK_CODE ) }</span>
                                    { checking && (
                                        <span className="flex items-center gap-2 text-sm">
                                            <span aria-hidden="true" className="loading loading-spinner loading-sm" />
                                            { t.payment?.checking }
                                        </span>
                                    ) }
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    <Button onClick={ () => setStep( 'delivery' ) } style="outline">{ t.payment?.back }</Button>
                                    <Button color="primary" icon={ MdLock } onClick={ pay }>{ format( t.payment?.pay ?? '{0}' , euros( total ) ) }</Button>
                                </div>
                            ) }
                        </Panel>
                    ) }

                    { step === 'done' && order && (
                        <Panel title={ t.steps?.done }>
                            <Alert level="success">{ t.done?.title }</Alert>
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                                <span>{ t.done?.number }</span>
                                <CopyBadge value={ order.number } />
                            </div>
                            { order.delivery.mode === 'store' && (
                                <div className="flex flex-col items-start gap-2">
                                    <QRCode size="sm" value={ order.number } />
                                    <span className="text-xs text-base-content/60">{ t.done?.pickup }</span>
                                </div>
                            ) }
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-sm">{ t.done?.record }</span>
                                <pre className="overflow-x-auto rounded-box bg-base-200 p-3 text-xs">{ JSON.stringify( order , null , 2 ) }</pre>
                            </div>
                            <div>
                                <Button color="primary" onClick={ restart }>{ t.done?.again }</Button>
                            </div>
                        </Panel>
                    ) }

                </div>

                <div className="flex min-w-0 flex-col gap-5">{ summary }</div>

            </div>

            <UsedComponents items={ USED } note={ t.used?.note } title={ t.used?.title } />

        </Container>
    ) ;
} ;

export default CheckoutDemo ;
