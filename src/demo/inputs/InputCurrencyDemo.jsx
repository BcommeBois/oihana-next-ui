'use client' ;

import { useState } from 'react' ;
import Container from '@/display/Container' ;
import InputCurrency from '@/components/inputs/InputCurrency' ;

import ValueProbe from './ValueProbe' ;

import { MdAttachMoney as DollarIcon, MdEuro as EuroIcon } from 'react-icons/md' ;

const InputCurrencyDemo = () =>
{
    const [ price, setPrice ] = useState( 99.99 ) ;

    // Typing probe : the field is the same, only the wiring differs — controlled on the
    // left, uncontrolled on the right. Both report what they hand back on every keystroke.
    const [ probeControlled   , setProbeControlled   ] = useState( 12.34 ) ;
    const [ probeUncontrolled , setProbeUncontrolled ] = useState( 12.34 ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Input Currency Examples</h2>

            <div className="flex flex-col gap-4 rounded-box border border-base-300 p-4">

                <h3 className="text-xl font-semibold">Typing probe</h3>
                <p className="text-sm opacity-70">
                    Type in either field: the badge must follow every keystroke, decimals included.
                    A badge stuck on <code>∅ empty</code> means the keystroke was thrown away.
                </p>

                <div className="grid gap-6 md:grid-cols-2">

                    <div className="flex flex-col gap-2">
                        <InputCurrency
                            label             = "Controlled (FR, 2 decimals)"
                            value             = { probeControlled }
                            onChange          = { setProbeControlled }
                            decimalSeparator  = ","
                            thousandSeparator = " "
                            postfix           = " €"
                            min               = { 0 }
                            max               = { 10000 }
                            precision         = { 2 }
                        />
                        <ValueProbe label="probeControlled" value={ probeControlled } />
                    </div>

                    <div className="flex flex-col gap-2">
                        <InputCurrency
                            label        = "Uncontrolled (defaultValue + onChange)"
                            defaultValue = { 12.34 }
                            onChange     = { setProbeUncontrolled }
                            min          = { 0 }
                            max          = { 10000 }
                            precision    = { 2 }
                        />
                        <ValueProbe label="probeUncontrolled" value={ probeUncontrolled } />
                    </div>

                </div>
            </div>

            {/* Euro par défaut */}
            <InputCurrency
                label       = "Price (EUR)"
                defaultValue = { 100 }
                min          = { 0 }
                max          = { 10000 }
                step         = { 0.01 }
                precision    = { 2 }
            />

            {/* US Dollar */}
            <InputCurrency
                label             = "Price (USD)"
                defaultValue      = { 1000 }
                prefix            = "$ "
                postfix           = ""
                decimalSeparator  = "."
                thousandSeparator = ","
                icon              = { <DollarIcon /> }
                min               = { 0 }
                max               = { 100000 }
                step              = { 1 }
                precision         = { 2 }
            />

            {/* Avec fieldset */}
            <InputCurrency
                useFieldset
                legend            = "Product Price"
                defaultValue      = { 49.99 }
                min               = { 0 }
                max               = { 999.99 }
                step              = { 0.50 }
                precision         = { 2 }
                helper            = "Price must be between 0 and 999.99"
            />

            {/* Contrôlé */}
            <InputCurrency
                label        = "Controlled Price"
                value        = { price }
                onChange     = { setPrice }
                min          = { 0 }
                max          = { 5000 }
                step         = { 10 }
                precision    = { 2 }
            />
            <ValueProbe label="price" value={ price } />

            {/* Sans stepper */}
            <InputCurrency
                label        = "No Stepper"
                defaultValue = { 250 }
                showStepper  = { false }
                min          = { 0 }
                max          = { 10000 }
            />

            {/* Sans icône */}
            <InputCurrency
                label        = "No Icon"
                defaultValue = { 75.50 }
                showIcon     = { false }
            />

            {/* Séparateurs français (virgule) */}
            <InputCurrency
                label             = "Prix (Format FR)"
                defaultValue      = { 1234.56 }
                decimalSeparator  = ","
                thousandSeparator = " "
                postfix           = " €"
                precision         = { 2 }
            />

            {/* Sans padding des zéros */}
            <InputCurrency
                label              = "No Zero Padding"
                defaultValue       = { 100 }
                decimalZeroPadding = { false }
                precision          = { 2 }
            />

            {/* Avec erreur */}
            <InputCurrency
                label        = "Price"
                defaultValue = { 0 }
                error        = "Price must be greater than 0"
                min          = { 0 }
                max          = { 10000 }
            />

            {/* Disabled */}
            <InputCurrency
                label        = "Disabled"
                defaultValue = { 500 }
                disabled
            />

            {/* Read-only */}
            <InputCurrency
                label        = "Read-only"
                defaultValue = { 999.99 }
                readOnly
            />

        </Container>
    ) ;
} ;

export default InputCurrencyDemo ;