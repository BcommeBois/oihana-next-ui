import { MdChevronLeft as PrevIcon , MdChevronRight as NextIcon } from 'react-icons/md' ;

/**
 * Calendar header — previous / next month buttons and the localised
 * "month year" label.
 *
 * @module components/dates/calendar/Header
 *
 * @param {Object} props
 * @param {import('dayjs').Dayjs} props.month - The displayed month.
 * @param {string} props.lang - Active locale code (for the label).
 * @param {() => void} props.onPrev - Go to the previous month.
 * @param {() => void} props.onNext - Go to the next month.
 */
const Header = ({ month , lang , onPrev , onNext }) =>
(
    <div className="flex items-center justify-between gap-2 pb-2">
        <button
            type       = "button"
            className  = "btn btn-ghost btn-sm btn-square"
            onClick    = { onPrev }
            aria-label = "Previous month"
        >
            <PrevIcon className="size-5" />
        </button>

        <span className="font-semibold capitalize">
            { month.locale( lang ).format( 'MMMM YYYY' ) }
        </span>

        <button
            type       = "button"
            className  = "btn btn-ghost btn-sm btn-square"
            onClick    = { onNext }
            aria-label = "Next month"
        >
            <NextIcon className="size-5" />
        </button>
    </div>
) ;

Header.displayName = 'Header' ;

export default Header ;
