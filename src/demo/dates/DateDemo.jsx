'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;

import Calendar from '@/components/dates/Calendar' ;
import InputDatePicker from '@/components/inputs/InputDatePicker' ;

import useLang from '@/contexts/lang/useLang' ;
import { getRangeShortcuts } from '@/helpers/date/shortcuts' ;

const fmt = ( d ) => ( d ? d.toDateString() : '—' ) ;

/**
 * Showcase for the date components. Step 2: the standalone Calendar — single date
 * and date range (one or two months). The input pickers come next.
 */
const DateDemo = () =>
{
    const [ date     , setDate     ] = useState( new Date() ) ;
    const [ range    , setRange    ] = useState({ from : null , to : null }) ;
    const [ pickDate , setPickDate ] = useState( '' ) ;

    const today    = new Date() ;
    const inAMonth = new Date( today.getFullYear() , today.getMonth() + 1 , today.getDate() ) ;

    // Shortcut labels localized via the language context (anticipates i18n) — we
    // reuse the default range shortcuts and override their labels by id.
    const { lang } = useLang() ;
    const labels = lang === 'fr'
        ? { today : "Aujourd'hui" , yesterday : 'Hier' , last7 : '7 derniers jours' , last30 : '30 derniers jours' , thisMonth : 'Ce mois-ci' , lastMonth : 'Mois dernier' }
        : { today : 'Today' , yesterday : 'Yesterday' , last7 : 'Last 7 days' , last30 : 'Last 30 days' , thisMonth : 'This month' , lastMonth : 'Last month' } ;
    const rangeShortcuts = getRangeShortcuts().map( ( s ) => ({ ...s , label : labels[ s.id ] ?? s.label }) ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-4 sm:p-8 rounded-box" maxWidth="max-w-5xl">

            <h2 className="text-3xl font-bold">Calendar — single date</h2>

            <div className="flex flex-wrap items-start gap-8">
                <div className="w-fit max-w-full overflow-x-auto rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
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
                <div className="w-fit max-w-full overflow-x-auto rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                    <Calendar defaultValue={ today } min={ today } max={ inAMonth } />
                </div>
            </div>

            <Divider />

            <h2 className="text-3xl font-bold">Calendar — range</h2>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Two months (auto: 2 on desktop, 1 on mobile)</span>
                <p className="text-xs opacity-50">
                    Shortcut labels follow the language (switch 🇫🇷 / 🇬🇧). On mobile they become a swipeable strip.
                </p>
                <div className="w-fit max-w-full overflow-x-auto rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                    <Calendar
                        clearable
                        shortcuts={ rangeShortcuts }
                        mode="range"
                        months="auto"
                        value={ range }
                        onChange={ setRange }
                    />
                </div>
                <p className="text-sm opacity-70">
                    From <span className="font-mono">{ fmt( range.from ) }</span> to <span className="font-mono">{ fmt( range.to ) }</span>
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Single month range</span>
                <div className="w-fit max-w-full overflow-x-auto rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                    <Calendar mode="range" months={ 1 } defaultValue={{ from : null , to : null }} />
                </div>
            </div>

            <Divider />

            <h2 className="text-3xl font-bold">Input date picker</h2>

            <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
                <InputDatePicker
                    label="Date (responsive)"
                    helper="Dropdown on desktop, modal on mobile. Type or pick; × to clear."
                    value={ pickDate }
                    onChange={ setPickDate }
                    calendarProps={{ shortcuts : true }}
                />
                <InputDatePicker label="Forced dropdown" display="dropdown" />
                <InputDatePicker label="Forced modal" display="modal" />
                <InputDatePicker
                    label="With min / max (today → +1 month)"
                    helper="Out-of-range days are disabled"
                    min={ today }
                    max={ inAMonth }
                />
            </div>
            <p className="text-sm opacity-70">
                Selected (responsive) : <span className="font-mono">{ pickDate || '—' }</span>
            </p>

        </Container>
    ) ;
} ;

export default DateDemo ;
