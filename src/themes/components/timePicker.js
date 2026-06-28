/**
 * Time picker class generators.
 *
 * The column time picker ({@link module:components/times/TimeColumns}) — built on
 * the `Time` class / `useTime` hook, no analog clock. Provides the panel container,
 * a single scrollable column, and the per-option cell classes.
 *
 * @module themes/components/timePicker
 */

import cn from '../helpers/cn' ;

/** Base classes for the time picker panel. */
export const TIME_COLUMNS = 'inline-flex flex-col gap-3 select-none' ;

/**
 * Generates the className for the {@link module:components/times/TimeColumns} panel.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @returns {string} The panel className expression.
 */
export const getTimeColumnsClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
}
= {} ) => cn
(
    beforeClassName ,
    TIME_COLUMNS ,
    { ...before , ...after } ,
    className ,
) ;

/** A single scrollable column (fixed height, thin scrollbar). `relative` so the
 *  selected cell's `offsetTop` is measured against the column, not a far ancestor. */
export const TIME_COLUMN =
    'relative flex h-48 w-14 flex-col gap-0.5 overflow-y-auto scroll-smooth px-1 ' +
    '[scrollbar-width:thin] [&::-webkit-scrollbar]:w-1' ;

/**
 * Generates the className for one time column (the scroll area).
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 * @returns {string} The column className expression.
 */
export const getTimeColumnClasses = ({ className } = {}) => cn( TIME_COLUMN , className ) ;

/** Base classes for an option cell of a column. */
export const TIME_OPTION = 'btn btn-sm w-full shrink-0 justify-center font-normal' ;

/**
 * Generates the className for a single option cell.
 *
 * @param {Object} [props]
 * @param {boolean} [props.selected] - The selected value.
 * @param {boolean} [props.disabled] - Out of the allowed min / max range.
 * @param {string} [props.className] - ClassName to append.
 * @returns {string} The option className expression.
 */
export const getTimeOptionClasses =
({
    selected ,
    disabled ,
    className ,
}
= {} ) => cn
(
    TIME_OPTION ,
    {
        ...selected && { 'btn-primary text-primary-content' : true } ,
        ...!selected && { 'btn-ghost' : true } ,
        ...disabled && !selected && { 'text-base-content/40' : true } ,
    } ,
    className ,
) ;

export default getTimeColumnsClasses ;
