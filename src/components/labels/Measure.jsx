'use client' ;

/**
 * Measure — a figure, or the reason it is missing.
 *
 * 🚨 **A dash carries WHY, because two readers do not guess the same
 * reason.** Between a row showing a figure and the row under it showing a
 * dash, there is nothing on screen to tell « nothing was ever published » from
 * « the application has a bug » — the question gets asked out loud, on a real
 * sheet, and `hint` is what settles it without anyone reading three files.
 *
 * 🔑 **A missing measure is never a zero.** Writing `0` where nothing was
 * measured turns an absence into a statement about the subject. The dash says
 * the measure is absent ; `0` would say it was taken and came out empty.
 *
 * Only a finite number counts as a figure : `null`, `undefined`, `NaN` and
 * both infinities all fall through to the placeholder.
 *
 * @module components/labels/Measure
 *
 * @example
 * ```jsx
 * <Measure format={ formatPrice } value={ row.revenue } />
 *
 * // With the reason, in a tooltip on the dash :
 * <Measure
 *     format = { formatPercent }
 *     hint   = "No cost price was published for this year."
 *     value  = { row.marginRate }
 * />
 * ```
 */

import Tooltip from '../Tooltip' ;

/**
 * What stands in for a measure that is not there.
 *
 * An em dash, not a hyphen and not « N/A » : it reads as a blank rather than
 * as a word, at every size, in every language.
 *
 * @type {string}
 */
export const MEASURE_PLACEHOLDER = '—' ;

/**
 * @param {Object}   props
 * @param {string}   [props.className]              - Additional class names for the placeholder.
 * @param {Function} [props.format]                 - Writes a finite figure. Absent, the number is rendered as it is.
 * @param {React.ReactNode} [props.hint]            - Why the measure is missing, shown on the dash.
 * @param {string}   [props.placeholder='—']        - What stands in for the missing measure.
 * @param {import('../../themes/components/tooltip').TooltipAlignment} [props.tooltipAlign='end']
 * @param {import('../../themes/components/tooltip').TooltipPosition}  [props.tooltipPosition='bottom']
 * @param {*}        [props.value]                  - The measure. Only a finite number is written.
 */
const Measure =
({
    className = 'text-base-content/40' ,
    format ,
    hint ,
    placeholder = MEASURE_PLACEHOLDER ,
    tooltipAlign = 'end' ,
    tooltipPosition = 'bottom' ,
    value ,
}) =>
{
    if ( Number.isFinite( value ) )
    {
        return format ? format( value ) : value ;
    }

    const dash = <span className={ className }>{ placeholder }</span> ;

    if ( !hint ) { return dash ; }

    return (
        <Tooltip
            align     = { tooltipAlign }
            as        = "span"
            className = "inline-flex"
            float
            position  = { tooltipPosition }
            tip       = { hint }
        >
            { dash }
        </Tooltip>
    ) ;
} ;

Measure.displayName = 'Measure' ;

export default Measure ;
