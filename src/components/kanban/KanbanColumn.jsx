'use client' ;

import { useSortable } from '@dnd-kit/react/sortable' ;

import { CollisionPriority } from '@dnd-kit/abstract' ;

import cn from '../../themes/helpers/cn' ;

import Badge from '../Badge' ;

import {
    getKanbanColumnClasses ,
    getKanbanColumnBodyClasses ,
    KANBAN_COLUMN_HANDLE ,
} from '../../themes/components/kanban' ;

/**
 * KanbanColumn component.
 * A column of a Kanban board : header (title + count), card body and optional
 * footer. The column accepts cards **even when empty**, and can itself be
 * reordered by dragging its header when `sortable` is enabled
 * (see the `reorderableColumns` prop of Kanban).
 *
 * The `id`, `index` and `sortable` props are injected automatically by Kanban.
 *
 * @module components/kanban/KanbanColumn
 */

/**
 * @param {Object} props
 * @param {string} [props.bodyClassName] - Additional classes for the cards container
 * @param {React.ReactNode} [props.children] - The cards of the column
 * @param {string} [props.className] - Additional classes for the column
 * @param {number} [props.count] - Number of cards, shown as a badge in the default header
 * @param {React.ReactNode} [props.footer] - Optional footer (e.g. an « add card » button)
 * @param {React.ReactNode} [props.header] - Custom header content (overrides title/count)
 * @param {string|number} props.id - Unique identifier of the column (injected by Kanban)
 * @param {number} props.index - Index of the column within the board (injected by Kanban)
 * @param {boolean} [props.sortable=false] - Whether the column itself can be dragged by its header (injected by Kanban)
 * @param {string} [props.title] - Title of the default header
 */
const KanbanColumn =
({
    bodyClassName ,
    children ,
    className ,
    count ,
    footer ,
    header ,
    id ,
    index ,
    sortable = false ,
    title ,
    ...rest
}) =>
{
    const { ref , handleRef , isDragSource , isDropTarget } = useSortable(
    {
        id ,
        index ,
        type              : 'column' ,
        accept            : [ 'card' , 'column' ] ,
        collisionPriority : CollisionPriority.Low ,
        disabled          : { draggable : !sortable } ,
    }) ;

    const defaultHeader = (
        <div className="flex items-center justify-between px-2 py-1">
            <span className="font-semibold">{ title }</span>
            { count !== undefined && (
                <Badge size="sm" color="neutral">{ count }</Badge>
            )}
        </div>
    ) ;

    return (
        <div
            className = { getKanbanColumnClasses({ over : isDropTarget , dragging : isDragSource , className }) }
            ref       = { ref }
            { ...rest }
        >
            <div className={ cn( { [ KANBAN_COLUMN_HANDLE ] : sortable } ) } ref={ handleRef }>
                { header ?? defaultHeader }
            </div>
            <div className={ getKanbanColumnBodyClasses({ className : bodyClassName }) }>
                { children }
            </div>
            { footer }
        </div>
    ) ;
} ;

KanbanColumn.displayName = 'KanbanColumn' ;

export default KanbanColumn ;
