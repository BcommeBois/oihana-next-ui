/**
 * Sortable item class name generators (drag-and-drop).
 * Shared by the sortable layout components (SortableGrid, SortableFlex, ...).
 *
 * @module themes/components/sortable
 */

import cn from '../helpers/cn' ;

export const SORTABLE_ITEM               = 'relative' ;
export const SORTABLE_ITEM_DRAGGING      = 'z-10 shadow-lg ring-1 ring-base-300' ;
export const SORTABLE_ITEM_HANDLE        = 'absolute top-2 right-2 z-20 btn btn-ghost btn-square btn-xs bg-base-100/70 backdrop-blur-sm cursor-grab active:cursor-grabbing touch-none' ;
export const SORTABLE_ITEM_HANDLE_INLINE = 'btn btn-ghost btn-square btn-xs cursor-grab active:cursor-grabbing touch-none' ;
export const SORTABLE_COLUMN_OVER        = 'rounded-box ring-2 ring-primary/40' ;
export const SORTABLE_TABLE_ROW_DRAG     = 'relative z-10 bg-base-200 shadow-lg' ;

/**
 * Generates sortable item class names.
 *
 * @param {Object} [props]
 * @param {boolean} [props.dragging] - Whether the item is the source of a drag operation
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getSortableItemClasses =
({
    dragging ,
    className ,
}
= {} ) => cn
(
    SORTABLE_ITEM ,
    {
        [ SORTABLE_ITEM_DRAGGING ] : dragging ,
    } ,
    className ,
) ;

/**
 * Generates sortable overlay drag handle class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getSortableItemHandleClasses =
({
    className ,
}
= {} ) => cn
(
    SORTABLE_ITEM_HANDLE ,
    className ,
) ;

/**
 * Generates sortable column class names (drop-target feedback).
 *
 * @param {Object} [props]
 * @param {boolean} [props.over] - Whether the column is the current drop target
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getSortableColumnClasses =
({
    over ,
    className ,
}
= {} ) => cn
(
    {
        [ SORTABLE_COLUMN_OVER ] : over ,
    } ,
    className ,
) ;

/**
 * Generates sortable table-row class names.
 *
 * @param {Object} [props]
 * @param {boolean} [props.dragging] - Whether the row is the source of a drag operation
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getSortableTableRowClasses =
({
    dragging ,
    className ,
}
= {} ) => cn
(
    {
        [ SORTABLE_TABLE_ROW_DRAG ] : dragging ,
    } ,
    className ,
) ;

/**
 * Generates sortable inline drag handle class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getSortableInlineHandleClasses =
({
    className ,
}
= {} ) => cn
(
    SORTABLE_ITEM_HANDLE_INLINE ,
    className ,
) ;

export default getSortableItemClasses ;
