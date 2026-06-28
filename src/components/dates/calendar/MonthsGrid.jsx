import { useMemo } from 'react' ;

import { MdChevronLeft as PrevIcon , MdChevronRight as NextIcon } from 'react-icons/md' ;

import dayjs from '../../../helpers/date/configureDayjs' ;

import { getCalendarCellClasses } from '../../../themes/components/calendar' ;

const MONTHS = Array.from( { length : 12 } , ( _ , i ) => i ) ; // 0 → 11

/**
 * Quick month picker — a 4×3 grid of the 12 localised months, with a year header
 * (‹ year ›, the year itself opens the years grid). Picking a month jumps the
 * calendar to that month. Replaces the day grid while open (see `Calendar`).
 *
 * @module components/dates/calendar/MonthsGrid
 *
 * @param {Object} props
 * @param {number} props.year - The year whose months are shown.
 * @param {number} props.currentMonth - The anchor month (0–11), highlighted when on `currentYear`.
 * @param {number} props.currentYear - The anchor year.
 * @param {string} props.lang - Active locale code (month labels).
 * @param {import('dayjs').Dayjs|null} [props.minDay] - Earliest selectable day.
 * @param {import('dayjs').Dayjs|null} [props.maxDay] - Latest selectable day.
 * @param {(month: number) => void} props.onPick - Month click (0–11).
 * @param {() => void} props.onPrevYear - Go to the previous year.
 * @param {() => void} props.onNextYear - Go to the next year.
 * @param {() => void} props.onYearClick - Open the years grid.
 */
const MonthsGrid =
({
    year ,
    currentMonth ,
    currentYear ,
    lang ,
    minDay ,
    maxDay ,
    onPick ,
    onPrevYear ,
    onNextYear ,
    onYearClick ,
}) =>
{
    const labels = useMemo
    (
        () => MONTHS.map( ( m ) => dayjs( new Date( 2021 , m , 1 ) ).locale( lang ).format( 'MMM' ) ) ,
        [ lang ]
    ) ;

    const isDisabled = ( m ) =>
        ( !!minDay && dayjs( new Date( year , m , 1 ) ).endOf( 'month' ).isBefore( minDay , 'day' ) ) ||
        ( !!maxDay && dayjs( new Date( year , m , 1 ) ).startOf( 'month' ).isAfter( maxDay , 'day' ) ) ;

    return (
        <div className="flex w-full flex-col gap-2 sm:w-60">
            <div className="flex items-center justify-between gap-2 pb-1">
                <button type="button" className="btn btn-ghost btn-sm btn-square" aria-label="Previous year" onClick={ onPrevYear }>
                    <PrevIcon className="size-5" />
                </button>
                <button type="button" className="btn btn-ghost btn-sm font-semibold" onClick={ onYearClick }>
                    { year }
                </button>
                <button type="button" className="btn btn-ghost btn-sm btn-square" aria-label="Next year" onClick={ onNextYear }>
                    <NextIcon className="size-5" />
                </button>
            </div>
            <div className="grid grid-cols-4 gap-1">
                { MONTHS.map( ( m ) =>
                {
                    const active   = m === currentMonth && year === currentYear ;
                    const disabled = isDisabled( m ) ;
                    return (
                        <button
                            key          = { m }
                            type         = "button"
                            disabled     = { disabled }
                            aria-pressed = { active }
                            className    = { getCalendarCellClasses({ active , disabled , className : 'capitalize' }) }
                            onClick      = { () => onPick( m ) }
                        >
                            { labels[ m ] }
                        </button>
                    ) ;
                } ) }
            </div>
        </div>
    ) ;
} ;

MonthsGrid.displayName = 'MonthsGrid' ;

export default MonthsGrid ;
