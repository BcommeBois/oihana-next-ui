'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Button           from '@/components/Button' ;
import BottomSheet      from '@/components/modals/BottomSheet' ;
import NumericKeypad    from '@/components/inputs/NumericKeypad' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Toggle           from '@/components/checkboxes/Toggle' ;

import useFeedbackSignal from '@/hooks/useFeedbackSignal' ;
import useNumberFormat   from '@/hooks/useNumberFormat' ;

import useI18n from '@/contexts/locale/useI18n' ;

const STOCK = 120 ;

/**
 * Prints what a callback last received.
 *
 * @param {Object} props
 * @param {string} props.empty
 * @param {string} props.title
 * @param {*} props.value
 */
const Probe = ( { empty , title , value } ) => (
    <div className="flex flex-col gap-1">
        <span className="font-mono text-sm">{ title }</span>
        <pre className="overflow-x-auto rounded-box bg-base-100 p-3 text-xs">
            { value === undefined ? empty : JSON.stringify( value ) }
        </pre>
    </div>
) ;

/**
 * NumericKeypad demo.
 *
 * A plain keypad with its layout and size, one for a volume with three
 * decimals and a range, and the picker's case : the keypad in a bottom sheet.
 * Every callback is printed as received ; once the sound is switched on, a confirm
 * is heard as `success`, a refused key as `warning`.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.keypad'] - Dot notation path to the demo locale.
 */
const NumericKeypadDemo = ( { path = 'demo.inputs.keypad' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ sound , setSound ] = useState( false ) ;

    const { signal } = useFeedbackSignal( { sound , vibration : sound } ) ;

    const { formatNumber } = useNumberFormat() ;

    const [ layout   , setLayout   ] = useState( 'phone' ) ;
    const [ size     , setSize     ] = useState( 'md' ) ;
    const [ changed  , setChanged  ] = useState( undefined ) ;
    const [ submitted , setSubmitted ] = useState( undefined ) ;
    const [ limit    , setLimit    ] = useState( undefined ) ;
    const [ volume   , setVolume   ] = useState( 2.5 ) ;
    const [ quantity , setQuantity ] = useState( null ) ;
    const [ isOpen   , setOpen     ] = useState( false ) ;

    const onLimit = refusal =>
    {
        signal( 'warning' ) ;
        setLimit( { ...refusal , message : t.limits?.[ refusal.reason ] } ) ;
    } ;

    const onSubmit = value =>
    {
        signal( 'success' ) ;
        setSubmitted( value ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <Toggle checked={ sound } color="primary" inline label={ t.sound } onChange={ event => setSound( event.target.checked ) } />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.simple?.title }</h4>
                    <div className="flex flex-wrap gap-2">
                        <SegmentedControl
                            ariaLabel = { t.simple?.layout }
                            items     = { [ { key : 'phone' , label : t.simple?.phone } , { key : 'calculator' , label : t.simple?.calc } ] }
                            onChange  = { setLayout }
                            value     = { layout }
                        />
                        <SegmentedControl
                            ariaLabel = { t.simple?.size }
                            items     = { [ 'md' , 'lg' , 'xl' ].map( key => ( { key , label : key } ) ) }
                            onChange  = { setSize }
                            value     = { size }
                        />
                    </div>
                    <NumericKeypad
                        label    = { t.simple?.label }
                        layout   = { layout }
                        max      = { 999 }
                        onChange = { setChanged }
                        onLimit  = { onLimit }
                        onSubmit = { onSubmit }
                        size     = { size }
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.volume?.title }</h4>
                    <p className="text-xs text-base-content/60">{ t.volume?.note }</p>
                    <NumericKeypad
                        decimals = { 3 }
                        label    = { t.volume?.label }
                        max      = { 50 }
                        min      = { 0.5 }
                        onChange = { value =>
                        {
                            setVolume( value ) ;
                            setChanged( value ) ;
                        } }
                        onLimit  = { onLimit }
                        onSubmit = { onSubmit }
                        step     = { 0.5 }
                        unit     = "m³"
                        value    = { volume }
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.sheet?.title }</h4>
                    <p className="text-xs text-base-content/60">{ t.sheet?.note }</p>
                    <div className="flex flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm">
                        <span className="font-medium">{ t.sheet?.product }</span>
                        <span className="text-sm text-base-content/70">
                            { format( t.sheet?.quantity ?? '{0}' , quantity === null ? t.sheet?.none : `${ formatNumber( quantity ) } ${ t.sheet?.unit ?? '' }` ) }
                        </span>
                        <Button color="primary" onClick={ () => setOpen( true ) }>
                            { t.sheet?.open }
                        </Button>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Probe empty={ t.empty } title={ t.change } value={ changed } />
                <Probe empty={ t.empty } title={ t.submit } value={ submitted } />
                <Probe empty={ t.empty } title={ t.limit } value={ limit } />
            </div>

            { isOpen && (
                <BottomSheet ariaLabel={ t.sheet?.open } onClose={ () => setOpen( false ) }>
                    { ( { close } ) => (
                        <div className="flex flex-col gap-3 p-2">
                            <span className="text-sm text-base-content/70">{ t.sheet?.product }</span>
                            <NumericKeypad
                                className    = "max-w-none"
                                defaultValue = { quantity }
                                label        = { t.sheet?.label }
                                max          = { STOCK }
                                onLimit      = { onLimit }
                                onSubmit     = { value =>
                                {
                                    onSubmit( value ) ;
                                    setQuantity( value ) ;
                                    close() ;
                                } }
                                size         = "lg"
                                unit         = { t.sheet?.unit }
                            />
                        </div>
                    ) }
                </BottomSheet>
            ) }

        </Container>
    ) ;
} ;

export default NumericKeypadDemo ;
