'use client' ;

import { useState } from 'react' ;
import Container from '@/display/Container' ;
import InputDateRange, {
    DD_MM_YYYY,
    MM_DD_YYYY,
    YYYY_MM_DD
} from '@/components/inputs/InputDateRange' ;

const InputDateRangeDemo = () =>
{
    const [ rangeFR, setRangeFR ] = useState( '' ) ;
    const [ rangeISO, setRangeISO ] = useState( '' ) ;
    const [ dateRange, setDateRange ] = useState( null ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Input Date Range Examples</h2>

            {/* French format */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">French Format (DD/MM/YYYY)</h3>

                <InputDateRange
                    label     = "Période de réservation"
                    value     = { rangeFR }
                    onChange  = { setRangeFR }
                    mode      = { DD_MM_YYYY }
                    helper    = "Format: JJ/MM/AAAA – JJ/MM/AAAA"
                />

                <InputDateRange
                    label          = "Avec séparateur personnalisé"
                    mode           = { DD_MM_YYYY }
                    rangeSeparator = " to "
                    helper         = "Format: DD/MM/YYYY to DD/MM/YYYY"
                />
            </div>

            {/* ISO format */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">ISO Format (YYYY-MM-DD)</h3>

                <InputDateRange
                    label         = "Date Range"
                    value         = { rangeISO }
                    onChange      = { setRangeISO }
                    mode          = { YYYY_MM_DD }
                    dateSeparator = "-"
                    helper        = "Format: YYYY-MM-DD – YYYY-MM-DD"
                />
            </div>

            {/* US format */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">US Format (MM/DD/YYYY)</h3>

                <InputDateRange
                    label  = "Booking Period"
                    mode   = { MM_DD_YYYY }
                    helper = "Format: MM/DD/YYYY – MM/DD/YYYY"
                />
            </div>

            {/* With date range limits */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Date Limits</h3>

                <InputDateRange
                    label  = "Vacation 2024"
                    mode   = { DD_MM_YYYY }
                    min    = { new Date( '2024-01-01' ) }
                    max    = { new Date( '2024-12-31' ) }
                    helper = "Only dates in 2024"
                />
            </div>

            {/* With min/max range length */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Range Length Limits</h3>

                <InputDateRange
                    label     = "Short Stay (1-7 days)"
                    mode      = { DD_MM_YYYY }
                    minLength = {{ day: 1 }}
                    maxLength = {{ day: 7 }}
                    helper    = "Between 1 and 7 days"
                />

                <InputDateRange
                    label     = "Monthly Period"
                    mode      = { DD_MM_YYYY }
                    minLength = {{ month: 1 }}
                    maxLength = {{ month: 3 }}
                    helper    = "Between 1 and 3 months"
                />
            </div>

            {/* With callback */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Date Range Callback</h3>

                <InputDateRange
                    label       = "Select Period"
                    onDateRange = { setDateRange }
                    helper      = { dateRange
                        ? `Start: ${dateRange.start.toLocaleDateString()}, End: ${dateRange.end.toLocaleDateString()}`
                        : 'Type a date range...'
                    }
                />

                { dateRange && (
                    <div className="text-sm bg-base-300 p-4 rounded-box">
                        <p><strong>Start:</strong> { dateRange.start.toISOString() }</p>
                        <p><strong>End:</strong> { dateRange.end.toISOString() }</p>
                        <p><strong>Duration:</strong> { Math.ceil( ( dateRange.end - dateRange.start ) / ( 1000 * 60 * 60 * 24 ) ) } days</p>
                    </div>
                ) }
            </div>

            {/* With fieldset */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Fieldset</h3>

                <InputDateRange
                    useFieldset
                    legend = "Période de location"
                    helper = "Du ... au ..."
                />
            </div>

            {/* Error state */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Error</h3>

                <InputDateRange
                    label = "Period"
                    error = "Invalid date range"
                />
            </div>

            {/* Disabled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Disabled State</h3>

                <InputDateRange
                    label        = "Period"
                    defaultValue = "01/01/2024 – 31/12/2024"
                    disabled
                />
            </div>

        </Container>
    ) ;
} ;

export default InputDateRangeDemo ;