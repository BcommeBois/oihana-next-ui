'use client' ;

/**
 * ClearFiltersChip — « Clear all », at the end of a row of `FilterChip`.
 *
 * It exists from TWO applied filters on : with one, that chip's own « × » is
 * the same gesture, and a second button saying it again is noise. Pass the
 * number of applied filters as `count` ; below two, nothing renders.
 *
 * It clears the FILTERS and nothing else : a search, a sort or a period the
 * screen is about are not criteria and stay put — the caller decides what
 * `onClick` clears. In the error colour : it takes away more than one thing.
 *
 * The label is `label`, else `clearFilters` in the i18n bundle at `path`, then
 * `components.filter` — see `useFilterLabels`.
 *
 * @module components/filters/ClearFiltersChip
 */

import { MdClose } from 'react-icons/md' ;

import useFilterLabels from './useFilterLabels' ;

import cn from '../../themes/helpers/cn' ;

/**
 * From how many applied filters on the chip shows.
 * @type {number}
 */
export const CLEAR_FILTERS_MIN = 2 ;

/**
 * The pill.
 * @type {string}
 */
export const CLEAR_FILTERS_CHIP = 'inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-error/40 bg-error/5 py-1 pl-3 pr-2.5 text-xs font-medium text-error transition-all duration-150 hover:border-error/60 hover:bg-error/15 active:scale-95 active:bg-error/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error' ;

/**
 * @param {Object}   props
 * @param {string}   [props.className] - Additional class names for the pill.
 * @param {number}   props.count       - How many filters are applied.
 * @param {string}   [props.label]     - The text, and the accessible name.
 * @param {Function} props.onClick     - Clears every filter, in one navigation.
 * @param {string}   [props.path]      - An i18n bundle read over `components.filter`.
 *
 * @example
 * ```jsx
 * <ClearFiltersChip count={ chips.length } onClick={ () => clearParams( entries ) } />
 * ```
 */
const ClearFiltersChip = ( { className , count , label , onClick , path } ) =>
{
    const labels = useFilterLabels( path ) ;

    if ( !( count >= CLEAR_FILTERS_MIN ) )
    {
        return null ;
    }

    const text = label ?? labels.clearFilters ;

    return (
        <button
            type       = "button"
            aria-label = { text }
            className  = { cn( CLEAR_FILTERS_CHIP , className ) }
            onClick    = { onClick }
        >
            <MdClose size={ 14 } aria-hidden="true" className="shrink-0" />
            { text }
        </button>
    ) ;
} ;

ClearFiltersChip.displayName = 'ClearFiltersChip' ;

export default ClearFiltersChip ;
