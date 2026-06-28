'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;

import Calendar from '@/components/dates/Calendar' ;
import InputDatePicker from '@/components/inputs/InputDatePicker' ;
import InputDateRangePicker from '@/components/inputs/InputDateRangePicker' ;

import useLang from '@/contexts/lang/useLang' ;
import { getRangeShortcuts } from '@/helpers/date/shortcuts' ;
import { YYYY_MM_DD } from '@/helpers/date/dateModes' ;

import { MdToday , MdHistory , MdDateRange , MdCalendarMonth } from 'react-icons/md' ;

const fmt = ( d ) => ( d ? d.toDateString() : '—' ) ;

/**
 * Showcase for the date family : the standalone dayjs Calendar (single date and
 * range, one or two months, with shortcuts) and the two field pickers built on it,
 * InputDatePicker and InputDateRangePicker.
 */
const DateDemo = () =>
{
    const [ date      , setDate      ] = useState( new Date() ) ;
    const [ range     , setRange     ] = useState({ from : null , to : null }) ;
    const [ pickDate  , setPickDate  ] = useState( '' ) ;
    const [ pickRange , setPickRange ] = useState( '' ) ;

    const today    = new Date() ;
    const inAMonth = new Date( today.getFullYear() , today.getMonth() + 1 , today.getDate() ) ;

    // Blackout dates : a single blocked day + a blocked range (this month).
    const blocked =
    [
        new Date( today.getFullYear() , today.getMonth() , 10 ) ,
        { from : new Date( today.getFullYear() , today.getMonth() , 18 ) , to : new Date( today.getFullYear() , today.getMonth() , 22 ) } ,
    ] ;

    // Shortcut labels localized via the language context (anticipates i18n) — we
    // reuse the default range shortcuts and override their labels by id.
    const { lang } = useLang() ;
    const labels = lang === 'fr'
        ? { today : "Aujourd'hui" , yesterday : 'Hier' , last7 : '7 derniers jours' , last30 : '30 derniers jours' , thisMonth : 'Ce mois-ci' , lastMonth : 'Mois dernier' }
        : { today : 'Today' , yesterday : 'Yesterday' , last7 : 'Last 7 days' , last30 : 'Last 30 days' , thisMonth : 'This month' , lastMonth : 'Last month' } ;
    const rangeShortcuts = getRangeShortcuts().map( ( s ) => ({ ...s , label : labels[ s.id ] ?? s.label }) ) ;

    // Same shortcuts, now with an icon each and a divider after the first two.
    const iconById = { today : MdToday , yesterday : MdHistory , last7 : MdDateRange , last30 : MdDateRange , thisMonth : MdCalendarMonth , lastMonth : MdCalendarMonth } ;
    const richShortcuts =
    [
        ...rangeShortcuts.slice( 0 , 2 ).map( ( s ) => ({ ...s , Icon : iconById[ s.id ] }) ) ,
        { divider : true } ,
        ...rangeShortcuts.slice( 2 ).map( ( s ) => ({ ...s , Icon : iconById[ s.id ] }) ) ,
    ] ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-4 sm:p-8 rounded-box" maxWidth="max-w-5xl">

            {/* ---------------------------------------------------------------- Calendar — single date */}

            <h2 className="text-3xl font-bold">Calendar — single date</h2>
            <p className="text-sm opacity-70 -mt-4">
                A self-contained, dayjs-based month calendar — no react-day-picker / date-fns. Locale-aware :
                month / weekday names and the first day of week follow the language (switch 🇫🇷 / 🇬🇧).
                Click the <span className="font-semibold">month</span> or <span className="font-semibold">year</span> in
                the header to jump quickly (month grid → year grid → back to days).
            </p>

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

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Opens on a given month (defaultMonth)</span>
                <p className="text-xs opacity-50">
                    No value selected — the view starts on January 2030 via <span className="font-mono">defaultMonth</span>.
                </p>
                <div className="w-fit max-w-full overflow-x-auto rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                    <Calendar defaultMonth={ new Date( 2030 , 0 , 1 ) } />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Force the first day of week (weekStartsOn)</span>
                <p className="text-xs opacity-50">
                    Independent of the locale : <span className="font-mono">weekStartsOn="sun"</span> starts weeks on
                    Sunday even in 🇫🇷 (which is Monday by default). Accepts 0–6 or 'sun'…'sat'.
                </p>
                <div className="w-fit max-w-full overflow-x-auto rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                    <Calendar weekStartsOn="sun" />
                </div>
            </div>

            <Divider />

            {/* ---------------------------------------------------------------- Calendar — range */}

            <h2 className="text-3xl font-bold">Calendar — range</h2>
            <p className="text-sm opacity-70 -mt-4">
                The same calendar in range mode, over one or two months, with a live hover preview and
                optional shortcuts (presets).
            </p>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Two months (auto: 2 on desktop, 1 on mobile)</span>
                <p className="text-xs opacity-50">
                    Shortcut labels follow the language. On mobile they become a swipeable strip.
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

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Blackout dates (disabledDates)</span>
                <p className="text-xs opacity-50">
                    The 10th and the 18th–22nd are blocked (struck through, inert). By default a range
                    <span className="font-semibold"> stops before</span> a blocked day; the second calendar
                    sets <span className="font-mono">allowDisabledInRange</span> so a range may span them.
                </p>
                <div className="flex flex-wrap items-start gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium opacity-60">default — cannot span</span>
                        <div className="w-fit max-w-full overflow-x-auto rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                            <Calendar mode="range" months={ 1 } disabledDates={ blocked } defaultValue={{ from : null , to : null }} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium opacity-60">allowDisabledInRange — may span</span>
                        <div className="w-fit max-w-full overflow-x-auto rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                            <Calendar mode="range" months={ 1 } disabledDates={ blocked } allowDisabledInRange defaultValue={{ from : null , to : null }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Shortcuts with icons &amp; a divider</span>
                <p className="text-xs opacity-50">
                    Each shortcut carries an <span className="font-mono">Icon</span>; a <span className="font-mono">{ '{ divider: true }' }</span> item
                    splits the list (a vertical rule in the mobile strip, a horizontal one in the column).
                </p>
                <div className="w-fit max-w-full overflow-x-auto rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
                    <Calendar mode="range" months={ 1 } shortcuts={ richShortcuts } defaultValue={{ from : null , to : null }} />
                </div>
            </div>

            <Divider />

            {/* ---------------------------------------------------------------- Input date picker */}

            <h2 className="text-3xl font-bold">Input date picker</h2>
            <p className="text-sm opacity-70 -mt-4">
                The masked field and the calendar share one value : typing updates the calendar, picking a
                day fills the field and closes. The popover opens as a <span className="font-mono">dropdown</span> anchored
                to the field on desktop and as a centered <span className="font-mono">modal</span> on mobile — force
                either with <span className="font-mono">display="dropdown" | "modal"</span>.
            </p>

            <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
                <InputDatePicker
                    label="Date (responsive)"
                    helper="Type or pick; × to clear."
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

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Sizes</span>
                <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
                    <InputDatePicker size="sm" label="Small"  defaultValue="24/12/2024" />
                    <InputDatePicker size="md" label="Medium" defaultValue="24/12/2024" />
                    <InputDatePicker size="lg" label="Large"  defaultValue="24/12/2024" />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Alternative format &amp; disabled</span>
                <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
                    <InputDatePicker
                        label="ISO format (yyyy-mm-dd)"
                        helper="Custom mode + separator"
                        mode={ YYYY_MM_DD }
                        separator="-"
                        defaultValue="2024-12-24"
                    />
                    <InputDatePicker label="Disabled" defaultValue="24/12/2024" disabled />
                </div>
            </div>

            <Divider />

            {/* ---------------------------------------------------------------- Input date range picker */}

            <h2 className="text-3xl font-bold">Input date range picker</h2>
            <p className="text-sm opacity-70 -mt-4">
                The range mirror : it maps the field's <span className="font-mono">{ '{ start, end }' }</span> to the
                calendar's <span className="font-mono">{ '{ from, to }' }</span> and only closes once both endpoints are
                picked. Same responsive popover, with a wider dual-month dropdown on desktop.
            </p>

            <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
                <InputDateRangePicker
                    label="Period (responsive)"
                    helper="Type or pick two days; × to clear."
                    value={ pickRange }
                    onChange={ setPickRange }
                    calendarProps={{ shortcuts : rangeShortcuts }}
                />
                <InputDateRangePicker label="Forced dropdown" display="dropdown" />
                <InputDateRangePicker label="Forced modal" display="modal" />
                <InputDateRangePicker
                    label="With min / max (today → +1 month)"
                    helper="Out-of-range days are disabled"
                    min={ today }
                    max={ inAMonth }
                />
            </div>
            <p className="text-sm opacity-70">
                Selected (responsive) : <span className="font-mono">{ pickRange || '—' }</span>
            </p>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Custom range separator &amp; disabled</span>
                <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
                    <InputDateRangePicker
                        label="Custom separator (→)"
                        helper="rangeSeparator=' → '"
                        rangeSeparator=" → "
                    />
                    <InputDateRangePicker label="Disabled" defaultValue="01/01/2024 – 31/01/2024" disabled />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Apply / Cancel footer (footer)</span>
                <p className="text-xs opacity-50">
                    With a footer, picking is deferred : the field commits on <span className="font-semibold">Apply</span> and
                    reverts on <span className="font-semibold">Cancel</span> / Esc. Choose where it shows :
                    <span className="font-mono"> "always"</span>, <span className="font-mono">"mobile"</span> (below md only),
                    or <span className="font-mono">"desktop"</span> (md+ only). Resize the window to see the mobile / desktop ones toggle.
                </p>
                <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
                    <InputDateRangePicker label="footer=always" footer="always" />
                    <InputDateRangePicker label="footer=mobile" footer="mobile" helper="Footer only below md" />
                    <InputDateRangePicker label="footer=desktop" footer="desktop" helper="Footer only at md+" />
                </div>
            </div>

        </Container>
    ) ;
} ;

export default DateDemo ;
