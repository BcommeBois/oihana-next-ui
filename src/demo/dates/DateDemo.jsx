'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;

import Calendar from '@/components/dates/Calendar' ;

const fmt = ( d ) => ( d ? d.toDateString() : '—' ) ;

/**
 * Showcase for the date components. Step 2: the standalone Calendar — single date
 * and date range (one or two months). The input pickers come next.
 */
const DateDemo = () =>
{
    const [ date  , setDate  ] = useState( new Date() ) ;
    const [ range , setRange ] = useState({ from : null , to : null }) ;

    const today    = new Date() ;
    const inAMonth = new Date( today.getFullYear() , today.getMonth() + 1 , today.getDate() ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-5xl">

            <h2 className="text-3xl font-bold">Calendar — single date</h2>

            <div className="flex flex-wrap items-start gap-8">
                <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                    <Calendar clearable value={ date } onChange={ setDate } />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm opacity-70">
                        Selected : <span className="font-mono">{ fmt( date ) }</span>
                    </p>
                    <p className="text-xs opacity-50">
                        clearable — click the selected day again, or press Esc, to clear.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">With min / max bounds (today → +1 month)</span>
                <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-sm w-fit">
                    <Calendar defaultValue={ today } min={ today } max={ inAMonth } />
                </div>
            </div>

            <Divider />

            <h2 className="text-3xl font-bold">Calendar — range</h2>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Two months (auto: 2 on desktop, 1 on mobile)</span>
                <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-sm w-fit">
                    <Calendar clearable mode="range" months="auto" value={ range } onChange={ setRange } />
                </div>
                <p className="text-sm opacity-70">
                    From <span className="font-mono">{ fmt( range.from ) }</span> to <span className="font-mono">{ fmt( range.to ) }</span>
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Single month range</span>
                <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-sm w-fit">
                    <Calendar mode="range" months={ 1 } defaultValue={{ from : null , to : null }} />
                </div>
            </div>

        </Container>
    ) ;
} ;

export default DateDemo ;
