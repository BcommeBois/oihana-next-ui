/**
 * List class name generators for DaisyUI 5.
 *
 * @module themes/components/list
 * @see https://daisyui.com/components/list
 */

import cn from '../helpers/cn' ;

export const LIST              = 'list' ;
export const LIST_ROW          = 'list-row' ;
export const LIST_COL_GROW     = 'list-col-grow' ;
export const LIST_COL_WRAP     = 'list-col-wrap' ;
export const LIST_ROW_DRAGGING = 'relative z-10 bg-base-100 rounded-box shadow-lg ring-1 ring-base-300' ;
export const SORTABLE_HANDLE   = 'btn btn-ghost btn-square btn-sm cursor-grab active:cursor-grabbing touch-none' ;

/**
 * Generates list container class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getListClasses =
({
    className ,
}
= {} ) => cn
(
    LIST ,
    className ,
) ;

/**
 * Generates list-row class names.
 *
 * @param {Object} [props]
 * @param {boolean} [props.clickable] - Add hover/cursor styles
 * @param {boolean} [props.selected] - Selected state
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getListRowClasses =
({
    clickable ,
    selected ,
    className ,
}
= {} ) => cn
(
    LIST_ROW ,
    {
        'cursor-pointer hover:bg-base-200/50 active:bg-base-200' : clickable ,
        'bg-base-200' : selected ,
    } ,
    className ,
) ;

/**
 * Generates list-col-grow class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getListColGrowClasses =
({
    className ,
}
= {} ) => cn
(
    LIST_COL_GROW ,
    className ,
) ;

/**
 * Generates list-col-wrap class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getListColWrapClasses =
({
    className ,
}
= {} ) => cn
(
    LIST_COL_WRAP ,
    className ,
) ;

/**
 * Generates sortable list-row class names.
 *
 * @param {Object} [props]
 * @param {boolean} [props.dragging] - Whether the row is the source of a drag operation
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getSortableListRowClasses =
({
    dragging ,
    className ,
}
= {} ) => cn
(
    {
        [ LIST_ROW_DRAGGING ] : dragging ,
    } ,
    className ,
) ;

/**
 * Generates sortable drag handle class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getSortableHandleClasses =
({
    className ,
}
= {} ) => cn
(
    SORTABLE_HANDLE ,
    className ,
) ;

export default getListClasses ;