'use client' ;

import { useSortable } from '@dnd-kit/react/sortable' ;

import { MdDragIndicator } from 'react-icons/md' ;

import { getSortableItemClasses , getSortableInlineHandleClasses } from '../../themes/components/sortable' ;

/**
 * SortableFlexItem component.
 * A draggable item to use inside a SortableFlex.
 * Renders its children in a positioned wrapper, with an optional inline drag handle
 * (rendered as the first child, in the flow — suited to compact chips and tags,
 * unlike the overlay handle of SortableGridItem).
 *
 * The `id` and `index` props are injected automatically by SortableFlex ;
 * only set them manually when using the item outside of a SortableFlex renderItem.
 *
 * @module components/layouts/SortableFlexItem
 *
 * @example
 * ```jsx
 * <SortableFlex
 *     gap={ 2 }
 *     wrap
 *     defaultItems={ tags }
 *     renderItem={ ( tag ) => (
 *         <SortableFlexItem className="badge badge-lg badge-outline cursor-grab active:cursor-grabbing">
 *             { tag.label }
 *         </SortableFlexItem>
 *     )}
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - Root element type
 * @param {React.ReactNode} [props.children] - Item content
 * @param {string} [props.className] - Additional classes for the item wrapper
 * @param {boolean} [props.disabled] - Disable dragging for this item
 * @param {string|number} [props.group] - Optional sortable group identifier
 * @param {boolean} [props.handle=false] - Show an inline drag handle (when false, the whole item is draggable)
 * @param {string} [props.handleClassName] - Additional classes for the drag handle
 * @param {string} [props.handleLabel='Drag to reorder'] - Accessible label of the drag handle
 * @param {string|number} props.id - Unique identifier of the item (injected by SortableFlex)
 * @param {number} props.index - Index of the item within the flex (injected by SortableFlex)
 */
const SortableFlexItem =
({
    as ,
    children ,
    className ,
    disabled = false ,
    group ,
    handle = false ,
    handleClassName ,
    handleLabel = 'Drag to reorder' ,
    id ,
    index ,
    ...rest
}) =>
{
    const Component = as ?? 'div' ;

    const { ref , handleRef , isDragSource } = useSortable({ id , index , group , disabled }) ;

    return (
        <Component
            className = { getSortableItemClasses({ dragging : isDragSource , className }) }
            ref       = { ref }
            { ...rest }
        >
            { handle && (
                <button
                    aria-label = { handleLabel }
                    className  = { getSortableInlineHandleClasses({ className : handleClassName }) }
                    disabled   = { disabled }
                    ref        = { handleRef }
                    type       = "button"
                >
                    <MdDragIndicator size={ 14 } />
                </button>
            )}
            { children }
        </Component>
    ) ;
} ;

SortableFlexItem.displayName = 'SortableFlexItem' ;

export default SortableFlexItem ;
