import { CALENDAR_WEEK } from '../../../themes/components/calendar' ;

/**
 * The localised weekday header row of the calendar.
 *
 * It shares the week grid with the days rather than repeating `grid-cols-7` :
 * seven labels that do not sit over their seven columns are worse than none.
 *
 * @module components/dates/calendar/Weekdays
 *
 * @param {Object} props
 * @param {string[]} props.labels - 7 weekday labels, already ordered for the locale.
 */
const Weekdays = ({ labels }) =>
(
    <div className={ `${ CALENDAR_WEEK } pb-1` }>
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
