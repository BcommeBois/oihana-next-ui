import { useEffect , useRef } from 'react' ;

import { getTimeColumnClasses , getTimeOptionClasses } from '../../../themes/components/timePicker' ;

/**
 * One scrollable column of the {@link module:components/times/TimeColumns} picker
 * (hours, minutes, seconds or AM/PM). Purely presentational : the parent computes
 * each option's `selected` / `disabled` flags. The selected option is auto-centered
 * within the column (scrolls the column only, never the page).
 *
 * @module components/times/timecolumns/TimeColumn
 *
 * @param {Object} props
 * @param {string} [props.label] - Short column header (e.g. 'Hr', 'Min').
 * @param {{ value: any, label: string, selected: boolean, disabled: boolean }[]} props.options - The cells.
 * @param {boolean} [props.disabled] - Disable the whole column.
 * @param {(value: any) => void} props.onSelect - Option click.
 */
const TimeColumn = ({ label , options , disabled , onSelect }) =>
{
    const listRef     = useRef( null ) ;
    const selectedRef = useRef( null ) ;

    const selectedValue = options.find( ( option ) => option.selected )?.value ;

    // Bring the selected option into view **only when it is off-screen** (initial
    // mount, or "Now" jumping far) — clicking an already-visible value never moves
    // the column, and a manual scroll is not undone. Scrolls the column, not the page.
    useEffect( () =>
    {
        const list = listRef.current ;
        const cell = selectedRef.current ;
        if ( !list || !cell )
        {
            return ;
        }
        const cellTop    = cell.offsetTop ;
        const cellBottom = cellTop + cell.clientHeight ;
        const viewTop    = list.scrollTop ;
        const viewBottom = viewTop + list.clientHeight ;
        if ( cellTop < viewTop || cellBottom > viewBottom )
        {
            list.scrollTop = cellTop - list.clientHeight / 2 + cell.clientHeight / 2 ;
        }
    }
    , [ selectedValue ] ) ;

    return (
        <div className="flex flex-col items-center gap-1">
            { label && <span className="text-xs font-medium uppercase text-base-content/50">{ label }</span> }
            <div ref={ listRef } className={ getTimeColumnClasses() }>
                { options.map( ( option ) => (
                    <button
                        key          = { option.value }
                        ref          = { option.selected ? selectedRef : null }
                        type         = "button"
                        disabled     = { disabled || option.disabled }
                        aria-pressed = { option.selected }
                        className    = { getTimeOptionClasses({ selected : option.selected , disabled : option.disabled }) }
                        onClick      = { () => onSelect( option.value ) }
                    >
                        { option.label }
                    </button>
                ) ) }
            </div>
        </div>
    ) ;
} ;

TimeColumn.displayName = 'TimeColumn' ;

export default TimeColumn ;
