'use client' ;

import { useDroppable } from '@dnd-kit/react' ;

import { CollisionPriority } from '@dnd-kit/abstract' ;

import Badge from '../Badge' ;

import { getKanbanColumnClasses , getKanbanColumnBodyClasses } from '../../themes/components/kanban' ;

/**
 * KanbanColumn component.
 * A droppable column of a Kanban board : header (title + count), scrollable
 * card body and optional footer. The body accepts cards **even when empty**.
 *
 * The `id` prop is injected automatically by Kanban.
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
 * @param {React.ReactNode} [props.header] - Custom header (overrides title/count)
 * @param {string|number} props.id - Unique identifier of the column (injected by Kanban)
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
    title ,
    ...rest
}) =>
{
    const { ref , isDropTarget } = useDroppable(
    {
        id ,
        type              : 'column' ,
        accept            : 'card' ,
        collisionPriority : CollisionPriority.Low ,
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
            className = { getKanbanColumnClasses({ over : isDropTarget , className }) }
            { ...rest }
        >
            { header ?? defaultHeader }
            <div className={ getKanbanColumnBodyClasses({ className : bodyClassName }) } ref={ ref }>
                { children }
            </div>
            { footer }
        </div>
    ) ;
} ;

KanbanColumn.displayName = 'KanbanColumn' ;

export default KanbanColumn ;
