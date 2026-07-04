'use client' ;

import { useSortable } from '@dnd-kit/react/sortable' ;

import { MdDragIndicator } from 'react-icons/md' ;

import {
    getSortableInlineHandleClasses ,
    getSortableTableRowClasses ,
} from '../../themes/components/sortable' ;

/**
 * SortableTableRow component.
 * A draggable `<tr>` to use inside a SortableTable. Children are the `<td>`
 * cells of the row ; when `handle` is enabled (default), a drag-handle cell
 * is automatically prepended (SortableTable prepends the matching empty
 * `<th>` in the head).
 *
 * The `id` and `index` props are injected automatically by SortableTable.
 *
 * @module components/layouts/SortableTableRow
 *
 * @example
 * ```jsx
 * <SortableTable
 *     head={ [ 'Name' , 'Job' ] }
 *     defaultItems={ people }
 *     renderRow={ ( person ) => (
 *         <SortableTableRow>
 *             <td>{ person.name }</td>
 *             <td>{ person.job }</td>
 *         </SortableTableRow>
 *     )}
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - The `<td>` cells of the row
 * @param {string} [props.className] - Additional classes for the row
 * @param {boolean} [props.disabled] - Disable dragging for this row
 * @param {boolean} [props.handle=true] - Show a drag-handle cell (when false, the whole row is draggable)
 * @param {string} [props.handleClassName] - Additional classes for the drag handle
 * @param {string} [props.handleLabel='Drag to reorder'] - Accessible label of the drag handle
 * @param {string|number} props.id - Unique identifier of the row (injected by SortableTable)
 * @param {number} props.index - Index of the row within the table (injected by SortableTable)
 */
const SortableTableRow =
({
    children ,
    className ,
    disabled = false ,
    handle = true ,
    handleClassName ,
    handleLabel = 'Drag to reorder' ,
    id ,
    index ,
    ...rest
}) =>
{
    const { ref , handleRef , isDragSource } = useSortable({ id , index , disabled }) ;

    return (
        <tr
            className = { getSortableTableRowClasses({ dragging : isDragSource , className }) }
            ref       = { ref }
            { ...rest }
        >
            { handle && (
                <td className="w-0">
                    <button
                        aria-label = { handleLabel }
                        className  = { getSortableInlineHandleClasses({ className : handleClassName }) }
                        disabled   = { disabled }
                        ref        = { handleRef }
                        type       = "button"
                    >
                        <MdDragIndicator size={ 16 } />
                    </button>
                </td>
            )}
            { children }
        </tr>
    ) ;
} ;

SortableTableRow.displayName = 'SortableTableRow' ;

export default SortableTableRow ;
