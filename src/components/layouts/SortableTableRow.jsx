'use client' ;

import { useSortable } from '@dnd-kit/react/sortable' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

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
 * @param {string} [props.handleLabel] - Accessible label of the drag handle. Defaults to the i18n `handle` key read at `path`, then `'Drag to reorder'`.
 * @param {string} [props.path='components.sortable'] - i18n path the handle label is read from.
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
    handleLabel ,
    id ,
    index ,
    path = 'components.sortable' ,
    ...rest
}) =>
{
    // One bundle for the five sortable components : they draw the same handle and
    // all declared the same string. Nothing here is visible — aria-label only.
    const {
        handle : handleFromI18n = 'Drag to reorder' ,
    }
    = useI18n( path , NO_LOCALE , false ) ;

    const handleText = handleLabel ?? handleFromI18n ;

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
                        aria-label = { handleText }
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
