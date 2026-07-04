'use client' ;

import { useSortable } from '@dnd-kit/react/sortable' ;

import { MdDragIndicator } from 'react-icons/md' ;

import { getSortableItemClasses , getSortableItemHandleClasses } from '../../themes/components/sortable' ;

/**
 * SortableGridItem component.
 * A draggable cell to use inside a SortableGrid.
 * Renders its children in a positioned wrapper, with an optional overlay drag handle.
 *
 * The `id` and `index` props are injected automatically by SortableGrid ;
 * only set them manually when using the item outside of a SortableGrid renderItem.
 *
 * @module components/layouts/SortableGridItem
 *
 * @example
 * ```jsx
 * <SortableGrid
 *     cols={ { xs : 2 , md : 3 , xl : 4 } }
 *     gap={ 4 }
 *     defaultItems={ photos }
 *     renderItem={ ( photo ) => (
 *         <SortableGridItem className="rounded-box overflow-hidden">
 *             <img src={ photo.src } alt={ photo.title } draggable={ false } />
 *         </SortableGridItem>
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
 * @param {boolean} [props.handle=false] - Show an overlay drag handle (when false, the whole item is draggable)
 * @param {string} [props.handleClassName] - Additional classes for the drag handle
 * @param {string} [props.handleLabel='Drag to reorder'] - Accessible label of the drag handle
 * @param {string|number} props.id - Unique identifier of the item (injected by SortableGrid)
 * @param {number} props.index - Index of the item within the grid (injected by SortableGrid)
 */
const SortableGridItem =
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
            { children }
            { handle && (
                <button
                    aria-label = { handleLabel }
                    className  = { getSortableItemHandleClasses({ className : handleClassName }) }
                    disabled   = { disabled }
                    ref        = { handleRef }
                    type       = "button"
                >
                    <MdDragIndicator size={ 16 } />
                </button>
            )}
        </Component>
    ) ;
} ;

SortableGridItem.displayName = 'SortableGridItem' ;

export default SortableGridItem ;
