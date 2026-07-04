'use client' ;

import { useSortable } from '@dnd-kit/react/sortable' ;

import { MdDragIndicator } from 'react-icons/md' ;

import { getSortableHandleClasses , getSortableListRowClasses } from '../../themes/components/list' ;

import ListRow from './ListRow' ;

/**
 * SortableListRow component.
 * A draggable ListRow to use inside a SortableList.
 * Accepts all ListRow props, plus the sortable-specific props below.
 *
 * The `id` and `index` props are injected automatically by SortableList ;
 * only set them manually when using the row outside of a SortableList renderItem.
 *
 * @module components/lists/SortableListRow
 *
 * @example
 * ```jsx
 * <SortableList
 *     defaultItems={ songs }
 *     onReorder={ ( items ) => saveOrder( items ) }
 *     renderItem={ ( song ) => (
 *         <SortableListRow
 *             title={ song.title }
 *             subtitle={ song.artist }
 *         />
 *     )}
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {string} [props.className] - Additional classes for the row
 * @param {boolean} [props.disabled] - Disable dragging and row interactions
 * @param {string|number} [props.group] - Optional sortable group identifier
 * @param {boolean} [props.handle=true] - Show a drag handle (when false, the whole row is draggable)
 * @param {string} [props.handleClassName] - Additional classes for the drag handle
 * @param {string} [props.handleLabel='Drag to reorder'] - Accessible label of the drag handle
 * @param {string|number} props.id - Unique identifier of the item (injected by SortableList)
 * @param {number} props.index - Index of the item within the list (injected by SortableList)
 * @param {React.ReactNode} [props.leading] - Leading element, rendered after the drag handle
 */
const SortableListRow =
({
    className ,
    disabled = false ,
    group ,
    handle = true ,
    handleClassName ,
    handleLabel = 'Drag to reorder' ,
    id ,
    index ,
    leading ,
    ...rest
}) =>
{
    const { ref , handleRef , isDragSource } = useSortable({ id , index , group , disabled }) ;

    const handleElement = handle ? (
        <button
            aria-label = { handleLabel }
            className  = { getSortableHandleClasses({ className : handleClassName }) }
            disabled   = { disabled }
            ref        = { handleRef }
            type       = "button"
        >
            <MdDragIndicator size={ 20 } />
        </button>
    ) : null ;

    return (
        <ListRow
            className = { getSortableListRowClasses({ dragging : isDragSource , className }) }
            disabled  = { disabled }
            leading   = { handleElement ? <>{ handleElement }{ leading }</> : leading }
            ref       = { ref }
            { ...rest }
        />
    ) ;
} ;

SortableListRow.displayName = 'SortableListRow' ;

export default SortableListRow ;
