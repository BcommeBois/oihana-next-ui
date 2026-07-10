'use client' ;

import cn from '../../themes/helpers/cn' ;

/**
 * Pagination range indicator (...).
 *
 * Purely **decorative** : it is `aria-hidden` so assistive tech skips the « … »
 * (the adjacent boundary buttons — first / last page — already expose the jump),
 * instead of announcing a labelled separator.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.label='···'] - Range indicator text
 */
const PaginationRange =
({
    className ,
    disabled = false ,
    label = '···' ,
}) =>
{
    return (
        <div
            aria-hidden = "true"
            className   = { cn(
                'flex items-center px-3 text-base-content/50' ,
                disabled && 'opacity-30' ,
                className
            )}
        >
            { label }
        </div>
    ) ;
} ;

PaginationRange.displayName = 'PaginationRange' ;

export default PaginationRange ;