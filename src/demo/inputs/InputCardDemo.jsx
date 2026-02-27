'use client' ;

import { useState } from 'react' ;
import Container from '@/display/Container' ;

import InputCardNumber from '@/components/inputs/InputCardNumber' ;
import InputCardExpiry from '@/components/inputs/InputCardExpiry' ;
import InputCardCVV from '@/components/inputs/InputCardCVV' ;

const InputCardDemo = () =>
{
    const [ cardNumber, setCardNumber ] = useState( '' ) ;
    const [ expiry, setExpiry ] = useState( '' ) ;
    const [ cvv, setCvv ] = useState( '' ) ;
    const [ cardType, setCardType ] = useState( 'unknown' ) ;
    const [ cvvLength, setCvvLength ] = useState( 3 ) ;

    const handleCardTypeChange = ( type ) =>
    {
        setCardType( type ) ;
        // American Express utilise 4 chiffres pour le CVV
        setCvvLength( type === 'amex' ? 4 : 3 ) ;
    } ;

    const handleSubmit = ( event ) =>
    {
        event.preventDefault() ;
        console.log( 'Card:', { cardNumber, expiry, cvv } ) ;
        alert( `Card submitted!\nNumber: ${cardNumber}\nExpiry: ${expiry}\nCVV: ${cvv}` ) ;
    } ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Card Input Examples</h2>

            {/* Formulaire complet */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Complete Card Form</h3>

                <form onSubmit={ handleSubmit } className="flex flex-col gap-4">

                    <InputCardNumber
                        label              = "Card Number"
                        value              = { cardNumber }
                        onChange           = { setCardNumber }
                        onCardTypeChange   = { handleCardTypeChange }
                        helper             = { `Detected: ${cardType}` }
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <InputCardExpiry
                            label   = "Expiration"
                            value   = { expiry }
                            onChange = { setExpiry }
                        />

                        <InputCardCVV
                            label    = "CVV"
                            value    = { cvv }
                            onChange = { setCvv }
                            length   = { cvvLength }
                            helper   = { cvvLength === 4 ? '4 digits for Amex' : '3 digits' }
                        />
                    </div>

                    <button
                        type      = "submit"
                        className = "btn btn-primary"
                        disabled  = { !cardNumber || !expiry || !cvv }
                    >
                        Submit Payment
                    </button>
                </form>
            </div>

            {/* Avec fieldset */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Fieldsets</h3>

                <InputCardNumber
                    useFieldset
                    legend      = "Card Number"
                    helper      = "Enter your 16-digit card number"
                />

                <div className="grid grid-cols-2 gap-4">
                    <InputCardExpiry
                        useFieldset
                        legend = "Expiry Date"
                    />

                    <InputCardCVV
                        useFieldset
                        legend = "Security Code"
                    />
                </div>
            </div>

            {/* Sans icônes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Without Icons</h3>

                <InputCardNumber
                    label    = "Card Number"
                    showIcon = { false }
                />

                <div className="grid grid-cols-2 gap-4">
                    <InputCardExpiry
                        label    = "Expiration"
                        showIcon = { false }
                    />

                    <InputCardCVV
                        label    = "CVV"
                        showIcon = { false }
                    />
                </div>
            </div>

            {/* Avec erreurs */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Errors</h3>

                <InputCardNumber
                    label = "Card Number"
                    error = "Invalid card number"
                />

                <div className="grid grid-cols-2 gap-4">
                    <InputCardExpiry
                        label = "Expiration"
                        error = "Card has expired"
                    />

                    <InputCardCVV
                        label = "CVV"
                        error = "Invalid CVV"
                    />
                </div>
            </div>

            {/* Disabled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Disabled State</h3>

                <InputCardNumber
                    label        = "Card Number"
                    defaultValue = "4111 1111 1111 1111"
                    disabled
                />

                <div className="grid grid-cols-2 gap-4">
                    <InputCardExpiry
                        label        = "Expiration"
                        defaultValue = "12/25"
                        disabled
                    />

                    <InputCardCVV
                        label        = "CVV"
                        defaultValue = "123"
                        disabled
                    />
                </div>
            </div>

        </Container>
    ) ;
} ;

export default InputCardDemo ;