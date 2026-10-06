'use client' ;

import { useState } from 'react' ;

import Container       from '@/display/Container' ;
import InputPercentage from '@/components/inputs/InputPercentage' ;

import useI18n from '@/contexts/locale/useI18n' ;

import ValueProbe from './ValueProbe' ;

/**
 * InputPercentage demo component.
 *
 * Ten sections : the plain field, chosen bounds, the symbol dropped, a comma
 * for the decimals, HTML5 validation, a fieldset, no icon, and the three
 * states.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.percentage'] - Dot notation path to the demo locale.
 */
const InputPercentageDemo = ( { path = 'demo.inputs.percentage' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ percentage , setPercentage ] = useState( 75 ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.basic }</h3>

                <InputPercentage
                    label        = { t.discount?.label }
                    defaultValue = { 15 }
                    helper       = { t.discount?.helper }
                />

                <InputPercentage
                    label    = { t.progress?.label }
                    value    = { percentage }
                    onChange = { setPercentage }
                />

                <ValueProbe label="percentage" value={ percentage } />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.range }</h3>

                <InputPercentage
                    label        = { t.tax?.label }
                    max          = { 50 }
                    defaultValue = { 20 }
                    helper       = { t.tax?.helper }
                />

                <InputPercentage
                    label        = { t.premium?.label }
                    min          = { 10 }
                    max          = { 30 }
                    defaultValue = { 15 }
                    helper       = { t.premium?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.noSymbol }</h3>

                <InputPercentage
                    showSymbol   = { false }
                    label        = { t.completion?.label }
                    defaultValue = { 85 }
                    helper       = { t.completion?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.comma }</h3>

                <InputPercentage
                    decimalSeparator = ","
                    label            = { t.vat?.label }
                    defaultValue     = { 20.5 }
                    helper           = { t.vat?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.validation }</h3>

                <InputPercentage
                    useValidator
                    required
                    label         = { t.rate?.label }
                    validatorHint = { t.rate?.hint }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.fieldset }</h3>

                <InputPercentage
                    useFieldset
                    legend       = { t.discountRate?.legend }
                    defaultValue = { 25 }
                    helper       = { t.discountRate?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.noIcon }</h3>

                <InputPercentage
                    showIcon     = { false }
                    label        = { t.simpleRate?.label }
                    defaultValue = { 50 }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.error }</h3>

                <InputPercentage
                    label = { t.invalid?.label }
                    error = { t.invalid?.error }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.disabled }</h3>

                <InputPercentage
                    label        = { t.locked?.label }
                    defaultValue = { 18 }
                    disabled
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.readOnly }</h3>

                <InputPercentage
                    label        = { t.current?.label }
                    defaultValue = { 33.33 }
                    readOnly
                />
            </div>

        </Container>
    ) ;
} ;

export default InputPercentageDemo ;
