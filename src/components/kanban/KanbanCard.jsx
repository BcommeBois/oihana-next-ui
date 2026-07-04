'use client' ;

import { useSortable } from '@dnd-kit/react/sortable' ;

import { getKanbanCardClasses } from '../../themes/components/kanban' ;

/**
 * KanbanCard component.
 * A draggable card to use inside a Kanban column.
 * The whole card is draggable ; content comes from `title` or arbitrary `children`.
 *
 * The `id`, `index` and `group` props are injected automatically by Kanban ;
 * only set them manually when using the card outside of a Kanban renderCard.
 *
 * @module components/kanban/KanbanCard
 *
 * @example
 * ```jsx
 * <Kanban
 *     defaultColumns={ columns }
 *     renderCard={ ( card ) => (
 *         <KanbanCard title={ card.title } />
 *     )}
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - Root element type
 * @param {React.ReactNode} [props.children] - Card content (overrides title)
 * @param {string} [props.className] - Additional classes for the card
 * @param {boolean} [props.disabled] - Disable dragging for this card
 * @param {string|number} props.group - Identifier of the owning column (injected by Kanban)
 * @param {string|number} props.id - Unique identifier of the card (injected by Kanban)
 * @param {number} props.index - Index of the card within its column (injected by Kanban)
 * @param {string} [props.title] - Title text of the card
 */
const KanbanCard =
({
    as ,
    children ,
    className ,
    disabled = false ,
    group ,
    id ,
    index ,
    title ,
    ...rest
}) =>
{
    const Component = as ?? 'div' ;

    const { ref , isDragSource } = useSortable(
    {
        id ,
        index ,
        group ,
        disabled ,
        type   : 'card' ,
        accept : 'card' ,
    }) ;

    return (
        <Component
            className = { getKanbanCardClasses({ dragging : isDragSource , className }) }
            ref       = { ref }
            { ...rest }
        >
            { children ?? title }
        </Component>
    ) ;
} ;

KanbanCard.displayName = 'KanbanCard' ;

export default KanbanCard ;
