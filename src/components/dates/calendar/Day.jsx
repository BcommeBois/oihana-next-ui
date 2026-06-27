import { getCalendarDayClasses } from '../../../themes/components/calendar' ;

/**
 * A single day cell of the calendar grid.
 *
 * @module components/dates/calendar/Day
 *
 * @param {Object} props
 * @param {import('dayjs').Dayjs} props.day - The day this cell represents.
 * @param {boolean} [props.disabled] - Out of the allowed range.
 * @param {boolean} [props.inRange] - Inside a selected range.
 * @param {boolean} [props.outside] - Belongs to the previous / next month.
 * @param {boolean} [props.rangeEnd] - End of a selected range.
 * @param {boolean} [props.rangeStart] - Start of a selected range.
 * @param {boolean} [props.selected] - The selected day.
 * @param {boolean} [props.today] - Today's date.
 * @param {(day: import('dayjs').Dayjs) => void} props.onPick - Click handler.
 */
const Day =
({
    day ,
    disabled ,
    inRange ,
    outside ,
    rangeEnd ,
    rangeStart ,
    selected ,
    today ,
    onPick ,
}) =>
(
    <button
        type         = "button"
        className    = { getCalendarDayClasses({ disabled , inRange , outside , rangeEnd , rangeStart , selected , today }) }
        disabled     = { disabled }
        aria-pressed = { !!( selected || rangeStart || rangeEnd ) }
        aria-label   = { day.format( 'D MMMM YYYY' ) }
        onClick      = { () => onPick( day ) }
    >
        { day.date() }
    </button>
) ;

Day.displayName = 'Day' ;

export default Day ;
