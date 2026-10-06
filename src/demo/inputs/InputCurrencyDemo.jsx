'use client' ;

import { useState } from 'react' ;

import Container     from '@/display/Container' ;
import InputCurrency from '@/components/inputs/InputCurrency' ;

import useI18n from '@/contexts/locale/useI18n' ;

import ValueProbe from './ValueProbe' ;

import { MdAttachMoney as DollarIcon } from 'react-icons/md' ;

/**
 * InputCurrency demo component.
 *
 * Opens on a typing bench : the same field wired controlled on one side and
 * uncontrolled on the other, each reporting what it hands back on every
 * keystroke.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.currency'] - Dot notation path to the demo locale.
 */
const InputCurrencyDemo = ( { path = 'demo.inputs.currency' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ price , setPrice ] = useState( 99.99 ) ;

    const [ probeControlled   , setProbeControlled   ] = useState( 12.34 ) ;
    const [ probeUncontrolled , setProbeUncontrolled ] = useState( 12.34 ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-4 rounded-box border border-base-300 p-4">

                <h3 className="text-xl font-semibold">{ t.probe?.title }</h3>
                <p className="text-sm opacity-70">
                    { t.probe?.note }
                </p>

                <div className="grid gap-6 md:grid-cols-2">

                    <div className="flex flex-col gap-2">
                        <InputCurrency
                            label             = { t.probe?.controlled }
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
                            label        = { t.probe?.uncontrolled }
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

            <InputCurrency
                label        = { t.eur?.label }
                defaultValue = { 100 }
                min          = { 0 }
                max          = { 10000 }
                step         = { 0.01 }
                precision    = { 2 }
            />

            <InputCurrency
                label             = { t.usd?.label }
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

            <InputCurrency
                useFieldset
                legend       = { t.fieldset?.legend }
                defaultValue = { 49.99 }
                min          = { 0 }
                max          = { 999.99 }
                step         = { 0.50 }
                precision    = { 2 }
                helper       = { t.fieldset?.helper }
            />

            <InputCurrency
                label     = { t.controlled?.label }
                value     = { price }
                onChange  = { setPrice }
                min       = { 0 }
                max       = { 5000 }
                step      = { 10 }
                precision = { 2 }
            />
            <ValueProbe label="price" value={ price } />

            <InputCurrency
                label        = { t.noStepper?.label }
                defaultValue = { 250 }
                showStepper  = { false }
                min          = { 0 }
                max          = { 10000 }
            />

            <InputCurrency
                label        = { t.noIcon?.label }
                defaultValue = { 75.50 }
                showIcon     = { false }
            />

            <InputCurrency
                label             = { t.french?.label }
                defaultValue      = { 1234.56 }
                decimalSeparator  = ","
                thousandSeparator = " "
                postfix           = " €"
                precision         = { 2 }
            />

            <InputCurrency
                label              = { t.noPadding?.label }
                defaultValue       = { 100 }
                decimalZeroPadding = { false }
                precision          = { 2 }
            />

            <InputCurrency
                label        = { t.error?.label }
                defaultValue = { 0 }
                error        = { t.error?.error }
                min          = { 0 }
                max          = { 10000 }
            />

            <InputCurrency
                label        = { t.disabled?.label }
                defaultValue = { 500 }
                disabled
            />

            <InputCurrency
                label        = { t.readOnly?.label }
                defaultValue = { 999.99 }
                readOnly
            />

        </Container>
    ) ;
} ;

export default InputCurrencyDemo ;
