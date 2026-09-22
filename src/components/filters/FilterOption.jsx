'use client' ;

/**
 * FilterOption — one row of a filter criterion : a mark, a label, a count.
 *
 * 🔑 **The mark says how many the criterion accepts** before the reader finds
 * out by clicking : a tick where one value is picked (`single`), a box where
 * several are (`multiple`).
 *
 * 🚨 **The mark is a GLYPH, never an `<input>`** : the row is a button, and an
 * interactive element inside a button is invalid HTML — and a second focus
 * stop on every row. In `multiple` mode the row carries `aria-pressed`.
 *
 * `muted` is the look of the « All » row : italic, dimmed, it resets rather
 * than selects. The count goes through `hooks/useNumberFormat`, never a bare
 * `toLocaleString()`, whose result depends on the environment.
 *
 * @module components/filters/FilterOption
 */

import { MdCheck , MdCheckBox , MdCheckBoxOutlineBlank } from 'react-icons/md' ;

import useNumberFormat from '../../hooks/useNumberFormat' ;

import cn from '../../themes/helpers/cn' ;

/**
 * One value is picked : the row shows a tick.
 * @type {string}
 */
export const SINGLE = 'single' ;

/**
 * Several values are picked : the row shows a box.
 * @type {string}
 */
export const MULTIPLE = 'multiple' ;

/**
 * @param {Object}          props
 * @param {boolean}         [props.checked=false] - The row is selected (or drafted).
 * @param {string}          [props.className]     - Additional class names for the row.
 * @param {number}          [props.count]         - The number shown on the right ; omitted, nothing is shown.
 * @param {React.ReactNode} props.label           - What the row is.
 * @param {'single'|'multiple'} [props.mode='single'] - The mark : a tick or a box.
 * @param {boolean}         [props.muted=false]   - The « All » look : italic and dimmed.
 * @param {Function}        props.onClick         - Picks or toggles the row.
 *
 * @example
 * ```jsx
 * <FilterOption checked={ !value } label="All colours" muted onClick={ () => pick( null ) } />
 * <FilterOption checked={ value === 'red' } count={ 42 } label="Red" onClick={ () => pick( 'red' ) } />
 * ```
 */
const FilterOption = ( { checked = false , className , count , label , mode = SINGLE , muted = false , onClick } ) =>
{
    const { formatNumber } = useNumberFormat() ;

    const multiple = mode === MULTIPLE ;

    return (
        <button
            type         = "button"
            aria-pressed = { multiple ? checked : undefined }
            className    = { cn(
                'flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-left hover:bg-base-200/50' ,
                checked && 'bg-primary/5' ,
                className ,
            ) }
            onClick      = { onClick }
        >
            <span className="flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
                { multiple && !muted
                    ? ( checked
                        ? <MdCheckBox size={ 16 } className="text-primary" />
                        : <MdCheckBoxOutlineBlank size={ 16 } className="text-base-content/35" /> )
                    : checked && <MdCheck size={ 16 } className="text-primary" />
                }
            </span>

            <span className={ cn( 'min-w-0 flex-1 truncate text-sm' , muted && 'italic text-base-content/70' ) }>
                { label }
            </span>

            { typeof count === 'number' && (
                <span className="shrink-0 text-xs text-base-content/50 tabular-nums">
                    { formatNumber( count , { maximumFractionDigits : 0 } ) }
                </span>
            ) }
        </button>
    ) ;
} ;

FilterOption.displayName = 'FilterOption' ;

export default FilterOption ;
