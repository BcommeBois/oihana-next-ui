'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;

import TimeColumns     from '@/components/times/TimeColumns' ;
import InputTimePicker from '@/components/inputs/InputTimePicker' ;

/**
 * Showcase for the time components : the standalone TimeColumns picker and the
 * InputTimePicker (masked field + popover). Built on the Time class / useTime — no
 * analog clock.
 */
const TimeDemo = () =>
{
    const [ cols24 , setCols24 ] = useState( '09:30' ) ;
    const [ cols12 , setCols12 ] = useState( '02:15' ) ;
    const [ pick24 , setPick24 ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-4 sm:p-8 rounded-box" maxWidth="max-w-5xl">

            <h2 className="text-3xl font-bold">TimeColumns — column picker</h2>
            <p className="text-sm opacity-70 -mt-4">
                A column / list time picker on the Time class — not the analog clock. Scroll a column or
                click a value; the selected value centers when off-screen. "Now" jumps to the current time.
            </p>

            <div className="flex flex-wrap items-start gap-8">
                <div className="flex flex-col items-center gap-2">
                    <span className="font-semibold">24h · minuteStep 5</span>
                    <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                        <TimeColumns value={ cols24 } onChange={ setCols24 } minuteStep={ 5 } />
                    </div>
                    <span className="font-mono text-sm opacity-70">{ cols24 || '—' }</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="font-semibold">12h · AM/PM · seconds</span>
                    <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                        <TimeColumns ampm useSeconds value={ cols12 } onChange={ setCols12 } defaultMeridiem="PM" />
                    </div>
                    <span className="font-mono text-sm opacity-70">{ cols12 || '—' }</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="font-semibold">Bounds 09:00 → 17:30</span>
                    <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                        <TimeColumns defaultValue="10:00" min="09:00" max="17:30" minuteStep={ 15 } />
                    </div>
                    <span className="text-xs opacity-50">Out-of-range hours / minutes disabled</span>
                </div>
            </div>

            <Divider />

            <h2 className="text-3xl font-bold">InputTimePicker — field + popover</h2>
            <p className="text-sm opacity-70 -mt-4">
                The masked InputTime + the column picker in a popover (dropdown on desktop, modal on mobile).
                Type or pick; the popover stays open and closes on outside-click / Esc — or via the optional
                Apply / Cancel <span className="font-mono">footer</span> (deferred commit).
            </p>

            <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
                <InputTimePicker
                    label="Time (responsive)"
                    helper="Type or pick; × to clear."
                    value={ pick24 }
                    onChange={ setPick24 }
                    minuteStep={ 5 }
                />
                <InputTimePicker ampm label="12h with AM/PM" defaultMeridiem="PM" />
                <InputTimePicker useSeconds label="With seconds" />
                <InputTimePicker
                    footer="always"
                    label="With Apply / Cancel footer"
                    helper="Picks are deferred until Apply"
                    minuteStep={ 15 }
                />
            </div>
            <p className="text-sm opacity-70">
                Selected (responsive) : <span className="font-mono">{ pick24 || '—' }</span>
            </p>

        </Container>
    ) ;
} ;

export default TimeDemo ;
