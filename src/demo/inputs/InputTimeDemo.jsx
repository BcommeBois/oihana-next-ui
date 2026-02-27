'use client' ;

import { useState } from 'react' ;
import Container from '@/display/Container' ;
import InputTime from '@/components/inputs/InputTime' ;

const InputTimeDemo = () =>
{
    const [ time24, setTime24 ] = useState( '14:30' ) ;
    const [ time12, setTime12 ] = useState( '02:30' ) ;
    const [ timeWithSeconds, setTimeWithSeconds ] = useState( '14:30:45' ) ;
    const [ timeObject, setTimeObject ] = useState( null ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Input Time Examples</h2>

            {/* 24-hour format */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">24-Hour Format</h3>

                <InputTime
                    label       = "Time (24h)"
                    value       = { time24 }
                    onChange    = { setTime24 }
                    helper      = "HH:MM format"
                />

                <InputTime
                    label       = "Time with Seconds"
                    value       = { timeWithSeconds }
                    onChange    = { setTimeWithSeconds }
                    useSeconds
                    helper      = "HH:MM:SS format"
                />

                <InputTime
                    label           = "Time with Milliseconds"
                    useSeconds
                    useMilliseconds
                    defaultValue    = "14:30:45.123"
                    helper          = "HH:MM:SS.MSS format"
                />
            </div>

            {/* 12-hour format with AM/PM */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">12-Hour Format (AM/PM)</h3>

                <InputTime
                    ampm
                    label           = "Time (12h)"
                    value           = { time12 }
                    onChange        = { setTime12 }
                    defaultMeridiem = "PM"
                    helper          = "Click AM/PM to toggle"
                />

                <InputTime
                    ampm
                    useSeconds
                    label           = "Time with Seconds (12h)"
                    defaultValue    = "02:30:45"
                    defaultMeridiem = "PM"
                />
            </div>

            {/* With fieldset */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Fieldsets</h3>

                <InputTime
                    useFieldset
                    legend      = "Appointment Time"
                    helper      = "Select your preferred time"
                />

                <InputTime
                    ampm
                    useFieldset
                    legend          = "Meeting Time"
                    defaultMeridiem = "PM"
                />
            </div>

            {/* Without icon */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Without Icon</h3>

                <InputTime
                    label    = "Time"
                    showIcon = { false }
                />
            </div>

            {/* Minutes only (HH:MM) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Hours Only</h3>

                <InputTime
                    label      = "Hour"
                    useMinutes = { false }
                    helper     = "HH format only"
                />
            </div>

            {/* With Time object callback */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Time Object Callback</h3>

                <InputTime
                    label    = "Time"
                    onTime   = { setTimeObject }
                    helper   = { timeObject ? `Time object: ${timeObject.toString()}` : 'Type a time...' }
                />

                { timeObject && (
                    <div className="text-sm bg-base-300 p-4 rounded-box">
                        <p><strong>Hour:</strong> { timeObject.hour }</p>
                        <p><strong>Minute:</strong> { timeObject.minute }</p>
                        <p><strong>Second:</strong> { timeObject.second }</p>
                        <p><strong>String:</strong> { timeObject.toString() }</p>
                    </div>
                ) }
            </div>

            {/* Error state */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Errors</h3>

                <InputTime
                    label = "Time"
                    error = "Invalid time format"
                />

                <InputTime
                    ampm
                    label = "Meeting Time"
                    error = "Time slot not available"
                />
            </div>

            {/* Disabled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Disabled State</h3>

                <InputTime
                    label        = "Time"
                    defaultValue = "14:30"
                    disabled
                />

                <InputTime
                    ampm
                    label           = "Meeting Time"
                    defaultValue    = "02:30"
                    defaultMeridiem = "PM"
                    disabled
                />
            </div>

            {/* Read-only */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Read-only State</h3>

                <InputTime
                    label        = "Time"
                    defaultValue = "14:30"
                    readOnly
                />

                <InputTime
                    ampm
                    label           = "Meeting Time"
                    defaultValue    = "02:30"
                    defaultMeridiem = "PM"
                    readOnly
                />
            </div>

        </Container>
    ) ;
} ;

export default InputTimeDemo ;