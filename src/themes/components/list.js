/**
 * List class name generators for DaisyUI 5.
 *
 * @module themes/components/list
 * @see https://daisyui.com/components/list
 */

import cn from '../helpers/cn' ;

export const LIST          = 'list' ;
export const LIST_ROW      = 'list-row' ;
export const LIST_COL_GROW = 'list-col-grow' ;
export const LIST_COL_WRAP = 'list-col-wrap' ;

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

export default getListClasses ;