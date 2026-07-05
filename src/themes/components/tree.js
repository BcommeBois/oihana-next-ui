/**
 * Sortable tree class name generators.
 *
 * @module themes/components/tree
 */

import cn from '../helpers/cn' ;

export const TREE                     = 'flex flex-col gap-1' ;
export const TREE_ITEM                = 'flex items-center gap-1 rounded-lg px-2 py-1.5 bg-base-100' ;
export const TREE_ITEM_DRAGGING       = 'relative z-10 shadow-lg ring-1 ring-base-300 opacity-80' ;
export const TREE_TOGGLE              = 'btn btn-ghost btn-xs btn-square' ;
export const TREE_HANDLE              = 'btn btn-ghost btn-xs btn-square cursor-grab active:cursor-grabbing touch-none' ;
export const TREE_DROP_INDICATOR      = 'h-0.5 -my-1 rounded-full bg-primary' ;
export const TREE_DROP_INDICATOR_DENY = 'bg-error' ;

/**
 * Generates tree container class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getTreeClasses =
({
    className ,
}
= {} ) => cn
(
    TREE ,
    className ,
) ;

/**
 * Generates tree-item (row) class names.
 *
 * @param {Object} [props]
 * @param {boolean} [props.dragging] - Whether the row is the source of a drag operation
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getTreeItemClasses =
({
    dragging ,
    className ,
}
= {} ) => cn
(
    TREE_ITEM ,
    {
        [ TREE_ITEM_DRAGGING ] : dragging ,
    } ,
    className ,
) ;

/**
 * Generates tree expand/collapse toggle class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getTreeToggleClasses =
({
    className ,
}
= {} ) => cn
(
    TREE_TOGGLE ,
    className ,
) ;

/**
 * Generates tree drag handle class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getTreeHandleClasses =
({
    className ,
}
= {} ) => cn
(
    TREE_HANDLE ,
    className ,
) ;

/**
 * Generates tree drop-indicator (insertion line) class names.
 *
 * @param {Object} [props]
 * @param {boolean} [props.denied] - Whether the current drop is forbidden (rendered as an error line)
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getTreeDropIndicatorClasses =
({
    denied ,
    className ,
}
= {} ) => cn
(
    TREE_DROP_INDICATOR ,
    {
        [ TREE_DROP_INDICATOR_DENY ] : denied ,
    } ,
    className ,
) ;

export default getTreeClasses ;
