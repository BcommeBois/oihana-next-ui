import { MdChevronLeft as PrevIcon , MdChevronRight as NextIcon } from 'react-icons/md' ;

/**
 * A nav button, or an invisible same-size placeholder (keeps the month label
 * centered when the arrow is hidden — e.g. the inner edge of a dual-month view).
 */
const NavButton = ({ Icon , onClick , label , hidden , disabled }) =>
(
    hidden
        ? <span className="btn btn-ghost btn-sm btn-square invisible" aria-hidden="true" />
        : (
            <button
                type       = "button"
                className  = "btn btn-ghost btn-sm btn-square"
                disabled   = { disabled }
                onClick    = { onClick }
                aria-label = { label }
            >
                <Icon className="size-5" />
            </button>
        )
) ;

/**
 * Calendar header — previous / next month buttons and the localised
 * "month year" label. When `interactive`, the label splits into a month button
 * and a year button that open the quick month / year navigation grids.
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
 * @param {boolean} [props.prevDisabled=false] - Disable the previous-month arrow (the month it would reveal is entirely out of the `min` bound).
 * @param {boolean} [props.nextDisabled=false] - Disable the next-month arrow (same, against `max`).
 * @param {boolean} [props.interactive=false] - Make the label clickable (quick month/year nav).
 * @param {() => void} [props.onMonthClick] - Open the months grid (interactive only).
 * @param {() => void} [props.onYearClick] - Open the years grid (interactive only).
 */
const Header = ({ month , lang , onPrev , onNext , showPrev = true , showNext = true , prevDisabled = false , nextDisabled = false , interactive = false , onMonthClick , onYearClick }) =>
(
    <div className="flex items-center justify-between gap-2 pb-2">
        <NavButton Icon={ PrevIcon } onClick={ onPrev } label="Previous month" hidden={ !showPrev } disabled={ prevDisabled } />
        { interactive
            ? (
                <span className="flex items-center gap-1">
                    <button type="button" className="btn btn-ghost btn-sm font-semibold capitalize" onClick={ onMonthClick }>
                        { month.locale( lang ).format( 'MMMM' ) }
                    </button>
                    <button type="button" className="btn btn-ghost btn-sm font-semibold" onClick={ onYearClick }>
                        { month.format( 'YYYY' ) }
                    </button>
                </span>
            )
            : (
                <span className="font-semibold capitalize">
                    { month.locale( lang ).format( 'MMMM YYYY' ) }
                </span>
            )
        }
        <NavButton Icon={ NextIcon } onClick={ onNext } label="Next month" hidden={ !showNext } disabled={ nextDisabled } />
    </div>
) ;

Header.displayName = 'Header' ;

export default Header ;
