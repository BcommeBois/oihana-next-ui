'use client' ;

import { useRef , useState } from 'react' ;

import Container from '@/display/Container' ;

import Button  from '@/components/Button' ;
import Popover from '@/components/Popover' ;

import MonthPicker     from '@/components/dates/MonthPicker' ;
import MonthYearPicker from '@/components/dates/MonthYearPicker' ;
import YearPicker      from '@/components/dates/YearPicker' ;

import useLang from '@/contexts/lang/useLang' ;
import useDropdownPosition from '@/themes/hooks/useDropdownPosition' ;

import dayjs from '@/helpers/date/configureDayjs' ;

import { MdCalendarMonth as PeriodIcon } from 'react-icons/md' ;

/** The frame every inline picker sits in — the one the calendars already use. */
const Panel = ({ children }) =>
(
    <div className="w-fit max-w-full overflow-x-auto rounded-box border border-base-300 bg-base-100 p-3 shadow-sm">
        { children }
    </div>
) ;

/**
 * Showcase for the three grid pickers that select a period without showing days :
 * YearPicker, MonthPicker and MonthYearPicker — inline, then inside a popover.
 */
const MonthYearDemo = () =>
{
    const { lang } = useLang() ;

    const [ year     , setYear     ] = useState( new Date().getFullYear() ) ;
    const [ bounded  , setBounded  ] = useState( null ) ;
    const [ month    , setMonth    ] = useState( new Date().getMonth() ) ;
    const [ longName , setLongName ] = useState( null ) ;
    const [ period   , setPeriod   ] = useState( null ) ;
    const [ billing  , setBilling  ] = useState( new Date( new Date().getFullYear() , 0 , 1 ) ) ;

    const [ popoverOpen , setPopoverOpen ] = useState( false ) ;
    const [ modalOpen   , setModalOpen   ] = useState( false ) ;

    const modalRef = useRef( null ) ;

    const thisYear = new Date().getFullYear() ;

    const { ref : anchorRef , direction , placement , recalculate } = useDropdownPosition
    ({
        panelWidth         : 280 ,
        panelHeight        : 260 ,
        preferredDirection : 'bottom' ,
        preferredPlacement : 'start' ,
    }) ;

    const openPopover = () =>
    {
        recalculate() ;
        setPopoverOpen( true ) ;
    } ;

    const monthName  = ( m ) => ( m === null ? '—' : dayjs( new Date( 2021 , m , 1 ) ).locale( lang ).format( 'MMMM' ) ) ;
    const periodName = ( date ) => ( date ? dayjs( date ).locale( lang ).format( 'MMMM YYYY' ) : '—' ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-4 sm:p-8 rounded-box" maxWidth="max-w-5xl">

            {/* ---------------------------------------------------------------- Year picker */}

            <h2 className="text-3xl font-bold">Year picker</h2>
            <p className="text-sm opacity-70 -mt-4">
                The 12-year grid the calendar navigates with, turned into a control that owns a
                value : clicking a year selects it instead of jumping somewhere. The value is a
                plain <span className="font-mono">number</span>. Paged ±12 by the « » chevrons.
            </p>

            <div className="flex flex-wrap items-start gap-8">
                <Panel>
                    <YearPicker clearable value={ year } onChange={ setYear } />
                </Panel>
                <div className="flex flex-col gap-1">
                    <p className="text-sm opacity-70">
                        Selected : <span className="font-mono">{ year ?? '—' }</span>
                    </p>
                    <p className="text-xs opacity-50">
                        clearable — click the selected year again, or press Esc, to clear.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Bounds and blocked years</span>
                <p className="text-xs opacity-50">
                    The <span className="font-mono">min</span> and <span className="font-mono">max</span> bounds
                    take a <span className="font-mono">Date</span> or a year, and a year bound covers the
                    whole year. They also stop the paging : a page whose every year is out is unreachable
                    rather than empty. <span className="font-mono">disabledYears</span> greys years out
                    without blocking navigation — here, everything that is not a leap year.
                </p>
                <div className="flex flex-wrap items-start gap-8">
                    <Panel>
                        <YearPicker
                            value         = { bounded }
                            onChange      = { setBounded }
                            min           = { thisYear - 6 }
                            max           = { thisYear + 6 }
                            disabledYears = { ( y ) => y % 4 !== 0 }
                        />
                    </Panel>
                    <p className="text-sm opacity-70">
                        Selected : <span className="font-mono">{ bounded ?? '—' }</span>
                    </p>
                </div>
            </div>

            {/* ---------------------------------------------------------------- Month picker */}

            <h2 className="text-3xl font-bold">Month picker</h2>
            <p className="text-sm opacity-70 -mt-4">
                A month of the year with <span className="font-semibold">no year attached</span> — a
                recurring month, an anniversary, a season. The value is the month index,
                from <span className="font-mono">0</span> to <span className="font-mono">11</span>.
                Names and their order follow the language (switch 🇫🇷 / 🇬🇧).
            </p>

            <div className="flex flex-wrap items-start gap-8">
                <Panel>
                    <MonthPicker clearable value={ month } onChange={ setMonth } />
                </Panel>
                <div className="flex flex-col gap-1">
                    <p className="text-sm opacity-70">
                        Selected : <span className="font-mono">{ month ?? '—' }</span> — { monthName( month ) }
                    </p>
                    <p className="text-xs opacity-50">
                        clearable — click the selected month again, or press Esc, to clear.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Full names, three per row — and no summer</span>
                <p className="text-xs opacity-50">
                    Abbreviations fit four to a row ; whole names ask for three, through
                    the <span className="font-mono">columns</span> and
                    the <span className="font-mono">labelFormat</span> props. Blocked months come from
                    the <span className="font-mono">disabledMonths</span> rule, which takes an index,
                    a <span className="font-mono">{ '{ year , month }' }</span> pair, an array of those,
                    or a predicate.
                </p>
                <div className="flex flex-wrap items-start gap-8">
                    <Panel>
                        <MonthPicker
                            columns        = { 3 }
                            labelFormat    = "MMMM"
                            value          = { longName }
                            onChange       = { setLongName }
                            disabledMonths = { [ 6 , 7 ] }
                        />
                    </Panel>
                    <p className="text-sm opacity-70">
                        Selected : <span className="font-mono">{ monthName( longName ) }</span>
                    </p>
                </div>
            </div>

            {/* ---------------------------------------------------------------- Month and year picker */}

            <h2 className="text-3xl font-bold">Month and year picker</h2>
            <p className="text-sm opacity-70 -mt-4">
                The calendar's quick navigation promoted to a control of its own : the months grid with its
                ‹ year › header, and the year itself opening the 12-year grid behind it. The same chain as
                the calendar, one step shorter — years → month, where the calendar goes years → month → day.
                Only the month commits ; a year merely carries you to its months. The value is
                a <span className="font-mono">Date</span> on the first day of the month.
            </p>

            <div className="flex flex-wrap items-start gap-8">
                <Panel>
                    <MonthYearPicker clearable value={ period } onChange={ setPeriod } />
                </Panel>
                <div className="flex flex-col gap-1">
                    <p className="text-sm opacity-70">
                        Selected : <span className="font-mono">{ periodName( period ) }</span>
                    </p>
                    <p className="text-xs opacity-50">
                        Click the year in the header to open the year grid.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="font-semibold">Bounded to the current year</span>
                <p className="text-xs opacity-50">
                    With <span className="font-mono">min</span> on the 1st of January
                    and <span className="font-mono">max</span> on today, the ‹ › chevrons of the header
                    go dead at both ends and the months still to come are out of reach — a billing
                    period cannot be in the future.
                </p>
                <div className="flex flex-wrap items-start gap-8">
                    <Panel>
                        <MonthYearPicker
                            value    = { billing }
                            onChange = { setBilling }
                            min      = { new Date( thisYear , 0 , 1 ) }
                            max      = { new Date() }
                        />
                    </Panel>
                    <p className="text-sm opacity-70">
                        Billing period : <span className="font-mono">{ periodName( billing ) }</span>
                    </p>
                </div>
            </div>

            {/* ---------------------------------------------------------------- In a popover */}

            <h2 className="text-3xl font-bold">In a popover, or a modal</h2>
            <p className="text-sm opacity-70 -mt-4">
                The three are plain blocks with no opinion about where they live : a page, a card, or
                the <span className="font-mono">Popover</span>, which is a dropdown anchored to its
                trigger on md+ screens and a bottom-sheet below
                (<span className="font-mono">display=&quot;responsive&quot;</span>). Closing on pick is
                the caller's decision — a picker that closes itself could not be used inline.
            </p>

            <div className="flex flex-wrap items-start gap-8">

                <div ref={ anchorRef } className="flex flex-col gap-1">
                    <Button type="button" icon={ PeriodIcon } onClick={ openPopover }>
                        { periodName( period ) === '—' ? 'Pick a period' : periodName( period ) }
                    </Button>
                    <span className="text-xs opacity-50">responsive — dropdown on md+, sheet below</span>

                    <Popover
                        anchorRef = { anchorRef }
                        isOpen    = { popoverOpen }
                        onClose   = { () => setPopoverOpen( false ) }
                        direction = { direction }
                        placement = { placement }
                        ariaLabel = "Pick a period"
                    >
                        <MonthYearPicker
                            value    = { period }
                            onChange = { ( value ) => { setPeriod( value ) ; setPopoverOpen( false ) ; } }
                        />
                    </Popover>
                </div>

                <div ref={ modalRef } className="flex flex-col gap-1">
                    <Button type="button" style="outline" onClick={ () => setModalOpen( true ) }>
                        { year ? `Year ${ year }` : 'Pick a year' }
                    </Button>
                    <span className="text-xs opacity-50">display=&quot;modal&quot; — centered card, backdrop</span>

                    <Popover
                        anchorRef = { modalRef }
                        isOpen    = { modalOpen }
                        onClose   = { () => setModalOpen( false ) }
                        display   = "modal"
                        ariaLabel = "Pick a year"
                    >
                        <YearPicker
                            value    = { year }
                            onChange = { ( value ) => { setYear( value ) ; setModalOpen( false ) ; } }
                        />
                    </Popover>
                </div>

            </div>

        </Container>
    ) ;
} ;

export default MonthYearDemo ;
