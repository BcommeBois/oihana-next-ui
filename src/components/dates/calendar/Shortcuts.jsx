import cn from '../../../themes/helpers/cn' ;

/**
 * Wrapper layout :
 * - **mobile** → a single-row horizontal strip, finger-swipeable (native momentum
 *   via `overflow-x-auto`), scrollbar hidden, with an **edge fade** (mask) that
 *   hints there is more to scroll.
 * - **sm+** → a vertical column with a right divider.
 */
const WRAP =
    // Mobile : `w-0 min-w-full` makes the strip contribute 0 to the calendar's
    // intrinsic width (so it never widens it) yet render at 100% of it — the
    // overflowing chips then scroll *inside* the month's width instead of pushing
    // the whole calendar wide.
    'flex w-0 min-w-full flex-row flex-nowrap gap-2 overflow-x-auto pb-1 ' +
    '[mask-image:linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%_-_1.25rem),transparent)] ' +
    '[-webkit-mask-image:linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%_-_1.25rem),transparent)] ' +
    '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden ' +
    'sm:w-auto sm:min-w-36 sm:flex-col sm:gap-1 sm:overflow-x-visible sm:pb-0 sm:border-r sm:border-base-300 sm:pr-3 ' +
    'sm:[mask-image:none] sm:[-webkit-mask-image:none]' ;

/**
 * The shortcuts list of the calendar (Today, Last 7 days, This month…).
 *
 * @module components/dates/calendar/Shortcuts
 *
 * Items may carry an optional `Icon` (a component, e.g. from react-icons) shown
 * before the label, and `{ divider: true }` items render a separator (a vertical
 * rule in the mobile strip, a horizontal one in the `sm`+ column).
 *
 * @param {Object} props
 * @param {{ id?: string, label?: string, value?: Function, Icon?: Function, divider?: boolean }[]} props.items - Shortcut definitions.
 * @param {(item: Object) => void} props.onSelect - Called with the clicked shortcut.
 * @param {string|null} [props.activeId] - Id of the shortcut matching the current selection (highlighted).
 */
const Shortcuts = ({ items , onSelect , activeId }) =>
(
    <div className={ WRAP }>
        { items.map( ( item , index ) =>
        {
            if ( item.divider )
            {
                return (
                    <div
                        key       = { `divider-${ index }` }
                        role      = "separator"
                        className = "shrink-0 self-stretch w-px bg-base-300 sm:my-1 sm:h-px sm:w-full sm:self-auto"
                    />
                ) ;
            }

            const Icon = item.Icon ;

            return (
                <button
                    key       = { item.id ?? index }
                    type      = "button"
                    className = { cn( 'btn btn-ghost btn-sm shrink-0 justify-start gap-2 font-normal sm:w-full' , item.id === activeId && 'btn-active' ) }
                    onClick   = { () => onSelect( item ) }
                >
                    { Icon && <Icon className="size-4 shrink-0" /> }
                    { item.label }
                </button>
            ) ;
        } ) }
    </div>
) ;

Shortcuts.displayName = 'Shortcuts' ;

export default Shortcuts ;
