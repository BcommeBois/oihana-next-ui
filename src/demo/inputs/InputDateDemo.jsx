'use client' ;

import InputTime from '@/components/inputs/InputTime';
import { useState } from 'react' ;
import Container from '@/display/Container' ;
import InputDate from '@/components/inputs/InputDate' ;

const InputDateDemo = () =>
{
    const [ dateFR, setDateFR ] = useState( '' ) ;
    const [ dateUS, setDateUS ] = useState( '' ) ;
    const [ dateObject, setDateObject ] = useState( null ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Input Date Examples</h2>

            {/* ISO format (yyyy/mm/dd) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">ISO Format (YYYY/MM/DD)</h3>

                <InputDate
                    iconClassName= 'text-secondary'
                    label     = "Date ISO"
                    mode      = "yyyy/mm/dd"
                    separator = "/"
                    helper    = "Format: YYYY/MM/DD"
                />

                <InputDate
                    label     = "Date ISO avec tiret"
                    mode      = "yyyy/mm/dd"
                    separator = "-"
                    helper    = "Format: YYYY-MM-DD"
                />
            </div>

            {/* French format (dd/mm/yyyy) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">French Format (DD/MM/YYYY)</h3>

                <InputDate
                    label     = "Date de naissance"
                    value     = { dateFR }
                    onChange  = { setDateFR }
                    mode      = "dd/mm/yyyy"
                    separator = "/"
                    helper    = "Format: JJ/MM/AAAA"
                />

                <InputDate
                    label     = "Date avec séparateur point"
                    mode      = "dd/mm/yyyy"
                    separator = "."
                    helper    = "Format: JJ.MM.AAAA"
                />

                <InputDate
                    label     = "Date avec tiret"
                    mode      = "dd/mm/yyyy"
                    separator = "-"
                    helper    = "Format: JJ-MM-AAAA"
                />
            </div>

            {/* US format (mm/dd/yyyy) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">US Format (MM/DD/YYYY)</h3>

                <InputDate
                    label     = "Birth Date"
                    value     = { dateUS }
                    onChange  = { setDateUS }
                    mode      = "mm/dd/yyyy"
                    separator = "/"
                    helper    = "Format: MM/DD/YYYY"
                />
            </div>

            {/* Short formats */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Short Formats</h3>

                <InputDate
                    label     = "Day/Month only"
                    mode      = "dd/mm"
                    separator = "/"
                    helper    = "Format: DD/MM"
                />

                <InputDate
                    label     = "Month/Year"
                    mode      = "mm/yyyy"
                    separator = "/"
                    helper    = "Format: MM/YYYY"
                />

                <InputDate
                    label     = "Month/Year (2 digits)"
                    mode      = "mm/yy"
                    separator = "/"
                    helper    = "Format: MM/YY"
                />
            </div>

            {/* With date range */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Date Range</h3>

                <InputDate
                    label  = "Date (2020-2030 only)"
                    mode   = "dd/mm/yyyy"
                    min    = { new Date( '2020-01-01' ) }
                    max    = { new Date( '2030-12-31' ) }
                    helper = "Only dates between 2020 and 2030"
                />
            </div>

            {/* With Date object callback */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Date Object Callback</h3>

                <InputDate
                    label  = "Date"
                    onDate = { setDateObject }
                    helper = { dateObject ? `Date object: ${dateObject.toLocaleDateString()}` : 'Type a date...' }
                />

                { dateObject && (
                    <div className="text-sm bg-base-300 p-4 rounded-box">
                        <p><strong>ISO:</strong> { dateObject.toISOString() }</p>
                        <p><strong>Locale:</strong> { dateObject.toLocaleDateString( 'fr-FR' ) }</p>
                        <p><strong>US:</strong> { dateObject.toLocaleDateString( 'en-US' ) }</p>
                    </div>
                ) }
            </div>

            {/* With fieldset */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Fieldsets</h3>

                <InputDate
                    useFieldset
                    legend = "Date de rendez-vous"
                    helper = "Sélectionnez une date"
                />
            </div>

            {/* Without icon */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Without Icon</h3>

                <InputDate
                    label    = "Date"
                    showIcon = { false }
                />
            </div>

            {/* Error state */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Errors</h3>

                <InputDate
                    label = "Date"
                    error = "Invalid date format"
                />
            </div>

            {/* Disabled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Disabled State</h3>

                <InputDate
                    label        = "Date"
                    defaultValue = "25/12/2024"
                    disabled
                />
            </div>

            {/* Read-only */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Read-only State</h3>

                <InputDate
                    label        = "Date"
                    defaultValue = "25/12/2024"
                    readOnly
                />
            </div>

        </Container>
    ) ;
} ;

export default InputDateDemo ;