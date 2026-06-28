import { MdKeyboardDoubleArrowLeft as PrevIcon , MdKeyboardDoubleArrowRight as NextIcon } from 'react-icons/md' ;

import { getCalendarCellClasses } from '../../../themes/components/calendar' ;

/**
 * Quick year picker — a 4×3 grid of 12 years, paged ±12 by the double-chevron
 * header. Picking a year opens that year's months grid (`Calendar` chains
 * years → months → day). Replaces the day grid while open.
 *
 * @module components/dates/calendar/YearsGrid
 *
 * @param {Object} props
 * @param {number} props.pageStart - First year of the displayed 12-year page.
 * @param {number} props.currentYear - The anchor year, highlighted.
 * @param {number|null} [props.minYear] - Earliest selectable year.
 * @param {number|null} [props.maxYear] - Latest selectable year.
 * @param {(year: number) => void} props.onPick - Year click.
 * @param {() => void} props.onPrevPage - Page back 12 years.
 * @param {() => void} props.onNextPage - Page forward 12 years.
 */
const YearsGrid =
({
    pageStart ,
    currentYear ,
    minYear ,
    maxYear ,
    onPick ,
    onPrevPage ,
    onNextPage ,
}) =>
{
    const years = Array.from( { length : 12 } , ( _ , i ) => pageStart + i ) ;

    return (
        <div className="flex w-full flex-col gap-2 sm:w-60">
            <div className="flex items-center justify-between gap-2 pb-1">
                <button type="button" className="btn btn-ghost btn-sm btn-square" aria-label="Previous years" onClick={ onPrevPage }>
                    <PrevIcon className="size-5" />
                </button>
                <span className="font-semibold">{ years[ 0 ] } – { years[ 11 ] }</span>
                <button type="button" className="btn btn-ghost btn-sm btn-square" aria-label="Next years" onClick={ onNextPage }>
                    <NextIcon className="size-5" />
                </button>
            </div>
            <div className="grid grid-cols-4 gap-1">
                { years.map( ( y ) =>
                {
                    const active   = y === currentYear ;
                    const disabled = ( minYear != null && y < minYear ) || ( maxYear != null && y > maxYear ) ;
                    return (
                        <button
                            key          = { y }
                            type         = "button"
                            disabled     = { disabled }
                            aria-pressed = { active }
                            className    = { getCalendarCellClasses({ active , disabled }) }
                            onClick      = { () => onPick( y ) }
                        >
                            { y }
                        </button>
                    ) ;
                } ) }
            </div>
        </div>
    ) ;
} ;

YearsGrid.displayName = 'YearsGrid' ;

export default YearsGrid ;
