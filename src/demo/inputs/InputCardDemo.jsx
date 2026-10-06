'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import InputCardNumber from '@/components/inputs/InputCardNumber' ;
import InputCardExpiry from '@/components/inputs/InputCardExpiry' ;
import InputCardCVV    from '@/components/inputs/InputCardCVV' ;

import useI18n from '@/contexts/locale/useI18n' ;

import ValueProbe from './ValueProbe' ;

/**
 * Card input demo component.
 *
 * The trio of a payment form : the number that recognises its own type, the
 * expiry, and a security code whose length follows that type.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.card'] - Dot notation path to the demo locale.
 */
const InputCardDemo = ( { path = 'demo.inputs.card' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ cardNumber , setCardNumber ] = useState( '' ) ;
    const [ expiry , setExpiry ] = useState( '' ) ;
    const [ cvv , setCvv ] = useState( '' ) ;
    const [ cardType , setCardType ] = useState( 'unknown' ) ;
    const [ cvvLength , setCvvLength ] = useState( 3 ) ;

    const handleCardTypeChange = ( type ) =>
    {
        setCardType( type ) ;
        // American Express uses a 4-digit CVV
        setCvvLength( type === 'amex' ? 4 : 3 ) ;
    } ;

    const handleSubmit = ( event ) =>
    {
        event.preventDefault() ;
        alert( format( t.submitted ?? '' , cardNumber , expiry , cvv ) ) ;
    } ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.complete }</h3>

                <form onSubmit={ handleSubmit } className="flex flex-col gap-4">

                    <InputCardNumber
                        label            = { t.number?.label }
                        value            = { cardNumber }
                        onChange         = { setCardNumber }
                        onCardTypeChange = { handleCardTypeChange }
                        helper           = { format( t.number?.detected ?? '' , cardType ) }
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <InputCardExpiry
                            label    = { t.expiry?.label }
                            value    = { expiry }
                            onChange = { setExpiry }
                        />

                        <InputCardCVV
                            label    = { t.cvv?.label }
                            value    = { cvv }
                            onChange = { setCvv }
                            length   = { cvvLength }
                            helper   = { cvvLength === 4 ? t.cvv?.four : t.cvv?.three }
                        />
                    </div>

                    <div className="flex flex-col gap-1 rounded-box border border-base-300 p-3">
                        <ValueProbe label="cardNumber" value={ cardNumber } />
                        <ValueProbe label="expiry"     value={ expiry } />
                        <ValueProbe label="cvv"        value={ cvv } />
                        <ValueProbe label="cardType"   value={ cardType } />
                    </div>

                    <button
                        type      = "submit"
                        className = "btn btn-primary"
                        disabled  = { !cardNumber || !expiry || !cvv }
                    >
                        { t.submit }
                    </button>
                </form>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.fieldset }</h3>

                <InputCardNumber
                    useFieldset
                    legend = { t.fieldset?.number?.legend }
                    helper = { t.fieldset?.number?.helper }
                />

                <div className="grid grid-cols-2 gap-4">
                    <InputCardExpiry
                        useFieldset
                        legend = { t.fieldset?.expiry?.legend }
                    />

                    <InputCardCVV
                        useFieldset
                        legend = { t.fieldset?.cvv?.legend }
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.noIcon }</h3>

                <InputCardNumber
                    label    = { t.number?.label }
                    showIcon = { false }
                />

                <div className="grid grid-cols-2 gap-4">
                    <InputCardExpiry
                        label    = { t.expiry?.label }
                        showIcon = { false }
                    />

                    <InputCardCVV
                        label    = { t.cvv?.label }
                        showIcon = { false }
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.error }</h3>

                <InputCardNumber
                    label = { t.number?.label }
                    error = { t.errors?.number }
                />

                <div className="grid grid-cols-2 gap-4">
                    <InputCardExpiry
                        label = { t.expiry?.label }
                        error = { t.errors?.expiry }
                    />

                    <InputCardCVV
                        label = { t.cvv?.label }
                        error = { t.errors?.cvv }
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.disabled }</h3>

                <InputCardNumber
                    label        = { t.number?.label }
                    defaultValue = "4111 1111 1111 1111"
                    disabled
                />

                <div className="grid grid-cols-2 gap-4">
                    <InputCardExpiry
                        label        = { t.expiry?.label }
                        defaultValue = "12/25"
                        disabled
                    />

                    <InputCardCVV
                        label        = { t.cvv?.label }
                        defaultValue = "123"
                        disabled
                    />
                </div>
            </div>

        </Container>
    ) ;
} ;

export default InputCardDemo ;
