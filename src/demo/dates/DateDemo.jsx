'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;

import Calendar from '@/components/dates/Calendar' ;

/**
 * Showcase for the date components. Step 1: the standalone single-date Calendar.
 * (Range, shortcuts and the input pickers are added next.)
 */
const DateDemo = () =>
{
    const [ date , setDate ] = useState( new Date() ) ;

    const today   = new Date() ;
    const inAMonth = new Date( today.getFullYear() , today.getMonth() + 1 , today.getDate() ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-4xl">

            <h2 className="text-3xl font-bold">Calendar — single date</h2>

            {/* Controlled */}
            <div className="flex flex-wrap items-start gap-8">
                <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                    <Calendar value={ date } onChange={ setDate } />
                </div>
                <p className="text-sm opacity-70">
                    Selected : <span className="font-mono">{ date ? date.toDateString() : '—' }</span>
                </p>
            </div>

            <Divider />

            {/* With min / max bounds (today → +1 month) */}
            <div className="flex flex-col gap-3">
                <span className="font-semibold">With min / max bounds (today → +1 month)</span>
                <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-sm w-fit">
                    <Calendar defaultValue={ today } min={ today } max={ inAMonth } />
                </div>
            </div>

        </Container>
    ) ;
} ;

export default DateDemo ;
