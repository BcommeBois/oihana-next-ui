// @/demo/inputs/InputPercentageDemo.jsx

'use client' ;

import { useState } from 'react' ;
import Container from '@/display/Container' ;
import InputPercentage from '@/components/inputs/InputPercentage' ;

const InputPercentageDemo = () =>
{
    const [ percentage, setPercentage ] = useState( 75 ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Input Percentage Examples</h2>

            {/* Basic */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Basic Usage</h3>

                <InputPercentage
                    label       = "Discount"
                    defaultValue = { 15 }
                    helper      = "Enter discount percentage"
                />

                <InputPercentage
                    label  = "Progress"
                    value  = { percentage }
                    onChange = { setPercentage }
                    helper = { `Current: ${percentage}%` }
                />
            </div>

            {/* Custom range */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Custom Range</h3>

                <InputPercentage
                    label        = "Tax Rate (Max 50%)"
                    max          = { 50 }
                    defaultValue = { 20 }
                    helper       = "Between 0% and 50%"
                />

                <InputPercentage
                    label        = "Premium Discount (10-30%)"
                    min          = { 10 }
                    max          = { 30 }
                    defaultValue = { 15 }
                    helper       = "Between 10% and 30%"
                />
            </div>

            {/* Without symbol */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Without Symbol</h3>

                <InputPercentage
                    showSymbol   = { false }
                    label        = "Completion"
                    defaultValue = { 85 }
                    helper       = "Value without % symbol"
                />
            </div>

            {/* European format */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">European Format (Comma)</h3>

                <InputPercentage
                    decimalSeparator = ","
                    label            = "TVA"
                    defaultValue     = { 20.5 }
                    helper           = "Uses comma as decimal separator"
                />
            </div>

            {/* With validation */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Validation</h3>

                <InputPercentage
                    useValidator
                    required
                    label         = "Completion Rate"
                    validatorHint = "Must be between 0 and 100%"
                />
            </div>

            {/* With fieldset */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Fieldset</h3>

                <InputPercentage
                    useFieldset
                    legend       = "Discount Rate"
                    defaultValue = { 25 }
                    helper       = "Applied to final price"
                />
            </div>

            {/* Without icon */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Without Icon</h3>

                <InputPercentage
                    showIcon     = { false }
                    label        = "Rate"
                    defaultValue = { 50 }
                />
            </div>

            {/* Error state */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Error State</h3>

                <InputPercentage
                    label = "Invalid Percentage"
                    error = "Value must be between 0 and 100"
                />
            </div>

            {/* Disabled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Disabled</h3>

                <InputPercentage
                    label        = "Locked Rate"
                    defaultValue = { 18 }
                    disabled
                />
            </div>

            {/* Read-only */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Read-only</h3>

                <InputPercentage
                    label        = "Current Rate"
                    defaultValue = { 33.33 }
                    readOnly
                />
            </div>

        </Container>
    ) ;
} ;

export default InputPercentageDemo ;