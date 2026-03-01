'use client' ;

import cn from '../../themes/helpers/cn' ;

/**
 * Pagination range indicator (...).
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - ARIA label for accessibility
 * @param {string} [props.className] - Additional classes
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.label='···'] - Range indicator text
 */
const PaginationRange =
({
    ariaLabel ,
    className ,
    disabled = false ,
    label = '···' ,
}) =>
{
    return (
        <div
            aria-label = { ariaLabel }
            className  = { cn(
                'flex items-center px-3 text-base-content/50' ,
                disabled && 'opacity-30' ,
                className
            )}
            role = "separator"
        >
            { label }
        </div>
    ) ;
} ;

PaginationRange.displayName = 'PaginationRange' ;

export default PaginationRange ;