'use client' ;

/**
 * FilterChip — an applied filter, shown under its bar : what narrows the list,
 * a way back into the criterion, and a way out of it.
 *
 * A pill : an optional colour dot, then the label — a button that reopens the
 * criterion when `onOpen` is given, with an optional icon before it and a
 * count after it — then a round « × » that clears the filter.
 *
 * The label is free : a name, or a path « A › B » for a criterion that picks a
 * node of a tree. The count goes through `hooks/useNumberFormat`, never a bare
 * `toLocaleString()`.
 *
 * It pops in (`motions/Jump`) : give it a `key` on the value and it pops again
 * each time the value changes, not only on its first appearance. `animate`
 * turns that off.
 *
 * The « × » is named by `clearLabel`, else `remove` in the i18n bundle at
 * `path`, then `components.filter` — see `useFilterLabels`.
 *
 * @module components/filters/FilterChip
 */

import { MdClose } from 'react-icons/md' ;

import Jump            from '../../motions/Jump' ;
import useFilterLabels from './useFilterLabels' ;

import useNumberFormat from '../../hooks/useNumberFormat' ;

import cn from '../../themes/helpers/cn' ;

/**
 * The pill.
 * @type {string}
 */
export const FILTER_CHIP = 'inline-flex items-center gap-1.5 rounded-full border border-base-300 bg-base-100 py-1 pl-2 pr-1 text-xs' ;

/**
 * The label, when it reopens the criterion.
 * @type {string}
 */
export const FILTER_CHIP_LABEL = 'inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-left text-base-content/80 hover:text-base-content' ;

/**
 * @param {Object}            props
 * @param {boolean}           [props.animate=true] - Pop in with `Jump`.
 * @param {React.ReactNode}   props.children       - The label : a name, a path.
 * @param {string}            [props.className]    - Additional class names for the pill.
 * @param {string}            [props.clearLabel]   - Accessible name of the « × ».
 * @param {string}            [props.color]        - A CSS colour : a dot before the label.
 * @param {number}            [props.count]        - A number after the label.
 * @param {React.ElementType} [props.icon]         - An icon before the label.
 * @param {Function}          props.onClear        - Clears the filter.
 * @param {Function}          [props.onOpen]       - Reopens the criterion ; without it the label is plain text.
 * @param {string}            [props.openLabel]    - Accessible name of the label button, when its text is not enough (a path).
 * @param {string}            [props.path]         - The criterion's own i18n bundle.
 *
 * @example
 * ```jsx
 * <FilterChip key={ colour } color="#e11d48" count={ 42 } onClear={ clearColour } onOpen={ openColour }>
 *     Red
 * </FilterChip>
 * ```
 */
const FilterChip =
({
    animate = true ,
    children ,
    className ,
    clearLabel ,
    color ,
    count ,
    icon : Icon ,
    onClear ,
    onOpen ,
    openLabel ,
    path ,
}) =>
{
    const labels = useFilterLabels( path ) ;

    const { formatNumber } = useNumberFormat() ;

    const content = (
        <>
            { Icon && <Icon size={ 11 } aria-hidden="true" className="shrink-0 text-base-content/40" /> }
            { children }
            { typeof count === 'number' && (
                <span className="text-base-content/40 tabular-nums">
                    { formatNumber( count , { maximumFractionDigits : 0 } ) }
                </span>
            ) }
        </>
    ) ;

    const chip = (
        <span className={ cn( FILTER_CHIP , className ) }>

            { color && (
                <span
                    aria-hidden = "true"
                    className   = "size-2.5 shrink-0 rounded-full"
                    style       = { { backgroundColor : color } }
                />
            ) }

            { onOpen
                ? (
                    <button
                        type       = "button"
                        aria-label = { openLabel }
                        className  = { FILTER_CHIP_LABEL }
                        onClick    = { onOpen }
                    >
                        { content }
                    </button>
                  )
                : <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-base-content/80">{ content }</span>
            }

            <button
                type       = "button"
                aria-label = { clearLabel ?? labels.remove }
                className  = "btn btn-ghost btn-circle btn-xs"
                onClick    = { onClear }
            >
                <MdClose size={ 14 } aria-hidden="true" />
            </button>

        </span>
    ) ;

    if ( !animate )
    {
        return chip ;
    }

    return (
        <Jump
            bounce    = { 0.35 }
            className = "inline-flex"
            duration  = { 0.4 }
            start     = { { opacity : 0 , scale : 0.85 } }
        >
            { chip }
        </Jump>
    ) ;
} ;

FilterChip.displayName = 'FilterChip' ;

export default FilterChip ;
