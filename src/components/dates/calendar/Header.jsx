import { MdChevronLeft as PrevIcon , MdChevronRight as NextIcon } from 'react-icons/md' ;

/**
 * A nav button, or an invisible same-size placeholder (keeps the month label
 * centered when the arrow is hidden — e.g. the inner edge of a dual-month view).
 */
const NavButton = ({ Icon , onClick , label , hidden }) =>
(
    hidden
        ? <span className="btn btn-ghost btn-sm btn-square invisible" aria-hidden="true" />
        : (
            <button
                type       = "button"
                className  = "btn btn-ghost btn-sm btn-square"
                onClick    = { onClick }
                aria-label = { label }
            >
                <Icon className="size-5" />
            </button>
        )
) ;

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
 * @param {boolean} [props.showPrev=true] - Show the previous-month arrow.
 * @param {boolean} [props.showNext=true] - Show the next-month arrow.
 */
const Header = ({ month , lang , onPrev , onNext , showPrev = true , showNext = true }) =>
(
    <div className="flex items-center justify-between gap-2 pb-2">
        <NavButton Icon={ PrevIcon } onClick={ onPrev } label="Previous month" hidden={ !showPrev } />
        <span className="font-semibold capitalize">
            { month.locale( lang ).format( 'MMMM YYYY' ) }
        </span>
        <NavButton Icon={ NextIcon } onClick={ onNext } label="Next month" hidden={ !showNext } />
    </div>
) ;

Header.displayName = 'Header' ;

export default Header ;
