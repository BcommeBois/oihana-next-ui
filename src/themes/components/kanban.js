/**
 * Kanban class name generators.
 *
 * @module themes/components/kanban
 */

import cn from '../helpers/cn' ;

export const KANBAN             = 'flex gap-4 items-start overflow-x-auto pb-2' ;
export const KANBAN_COLUMN      = 'flex flex-col gap-2 w-72 shrink-0 rounded-box bg-base-200 p-2' ;
export const KANBAN_COLUMN_OVER = 'ring-2 ring-primary/40' ;
export const KANBAN_COLUMN_BODY = 'flex flex-col gap-2 min-h-16 grow' ;
export const KANBAN_CARD        = 'bg-base-100 rounded-box shadow-sm p-3 cursor-grab active:cursor-grabbing select-none' ;
export const KANBAN_CARD_DRAG   = 'z-10 shadow-lg ring-1 ring-base-300' ;

/**
 * Generates kanban board class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getKanbanClasses =
({
    className ,
}
= {} ) => cn
(
    KANBAN ,
    className ,
) ;

/**
 * Generates kanban column class names.
 *
 * @param {Object} [props]
 * @param {boolean} [props.over] - Whether the column is the current drop target
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getKanbanColumnClasses =
({
    over ,
    className ,
}
= {} ) => cn
(
    KANBAN_COLUMN ,
    {
        [ KANBAN_COLUMN_OVER ] : over ,
    } ,
    className ,
) ;

/**
 * Generates kanban column body class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getKanbanColumnBodyClasses =
({
    className ,
}
= {} ) => cn
(
    KANBAN_COLUMN_BODY ,
    className ,
) ;

/**
 * Generates kanban card class names.
 *
 * @param {Object} [props]
 * @param {boolean} [props.dragging] - Whether the card is the source of a drag operation
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getKanbanCardClasses =
({
    dragging ,
    className ,
}
= {} ) => cn
(
    KANBAN_CARD ,
    {
        [ KANBAN_CARD_DRAG ] : dragging ,
    } ,
    className ,
) ;

export default getKanbanClasses ;
