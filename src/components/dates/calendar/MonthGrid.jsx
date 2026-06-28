import { useMemo } from 'react' ;

import { getMonthMatrix , getWeekdayLabels } from '../../../helpers/date/getMonthMatrix' ;

import Header   from './Header' ;
import Weekdays from './Weekdays' ;
import Day      from './Day' ;

/**
 * One month grid : header + weekday row + the 6×7 day cells. The parent
 * `Calendar` computes each day's modifiers and passes them through `getDayState`,
 * so a `MonthGrid` is purely presentational (enables the dual-month layout).
 *
 * @module components/dates/calendar/MonthGrid
 *
 * @param {Object} props
 * @param {import('dayjs').Dayjs} props.month - The month to render.
 * @param {string} props.lang - Active locale code.
 * @param {boolean} props.showPrev - Show the previous-month arrow.
 * @param {boolean} props.showNext - Show the next-month arrow.
 * @param {() => void} props.onPrev - Previous month.
 * @param {() => void} props.onNext - Next month.
 * @param {(day: import('dayjs').Dayjs) => Object} props.getDayState - Returns a day's modifiers.
 * @param {(day: import('dayjs').Dayjs) => void} props.onPick - Day click.
 * @param {(day: import('dayjs').Dayjs) => void} props.onHover - Day hover (range preview).
 * @param {() => void} props.onLeave - Grid mouse-leave (clears the hover preview).
 * @param {boolean} [props.headerInteractive=false] - Make the header label open the quick month/year grids.
 * @param {() => void} [props.onMonthClick] - Open the months grid.
 * @param {() => void} [props.onYearClick] - Open the years grid.
 */
const MonthGrid =
({
    month ,
    lang ,
    showPrev ,
    showNext ,
    onPrev ,
    onNext ,
    getDayState ,
    onPick ,
    onHover ,
    onLeave ,
    headerInteractive = false ,
    onMonthClick ,
    onYearClick ,
}) =>
{
    const weeks    = useMemo( () => getMonthMatrix( month , lang ) , [ month , lang ] ) ;
    const weekdays = useMemo( () => getWeekdayLabels( lang ) , [ lang ] ) ;
    const days     = weeks.flat() ;

    return (
        <div className="flex flex-col gap-1">
            <Header
                month       = { month }
                lang        = { lang }
                showPrev    = { showPrev }
                showNext    = { showNext }
                onPrev      = { onPrev }
                onNext      = { onNext }
                interactive = { headerInteractive }
                onMonthClick = { onMonthClick }
                onYearClick  = { onYearClick }
            />
            <Weekdays labels={ weekdays } />
            <div className="grid grid-cols-7 gap-0.5" onMouseLeave={ onLeave }>
                { days.map( ( day ) => (
                    <Day
                        key     = { day.valueOf() }
                        day     = { day }
                        { ...getDayState( day ) }
                        onPick  = { onPick }
                        onHover = { onHover }
                    />
                ) ) }
            </div>
        </div>
    ) ;
} ;

MonthGrid.displayName = 'MonthGrid' ;

export default MonthGrid ;
