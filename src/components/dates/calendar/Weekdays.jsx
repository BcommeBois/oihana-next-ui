/**
 * The localised weekday header row of the calendar.
 *
 * @module components/dates/calendar/Weekdays
 *
 * @param {Object} props
 * @param {string[]} props.labels - 7 weekday labels, already ordered for the locale.
 */
const Weekdays = ({ labels }) =>
(
    <div className="grid grid-cols-7 gap-0.5 pb-1">
        { labels.map( ( label , index ) => (
            <span
                key       = { index }
                className = "py-1 text-center text-xs font-medium capitalize text-base-content/60"
            >
                { label }
            </span>
        ) ) }
    </div>
) ;

Weekdays.displayName = 'Weekdays' ;

export default Weekdays ;
