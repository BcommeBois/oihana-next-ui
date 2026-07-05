'use client' ;

import { useSortable } from '@dnd-kit/react/sortable' ;

import { OptimisticSortingPlugin } from '@dnd-kit/dom/sortable' ;

import { MdChevronRight , MdDragIndicator , MdExpandMore } from 'react-icons/md' ;

// A tree computes each drop's target depth + parent itself (horizontal projection),
// so the engine's optimistic list sorting must stay out of the way : otherwise the
// visual row order diverges from the data order and the projected parent is wrong.
const withoutOptimisticSorting = ( defaults ) => defaults.filter( plugin => plugin !== OptimisticSortingPlugin ) ;

import {
    getTreeHandleClasses ,
    getTreeItemClasses ,
    getTreeToggleClasses ,
} from '../../themes/components/tree' ;

/**
 * SortableTreeItem component.
 * A draggable tree row to use inside a SortableTree. Renders (in order) an
 * indentation spacer sized from `depth`, a drag handle, an expand/collapse
 * toggle when the node has children, and the row content (`children`).
 *
 * The `id`, `index`, `depth`, `indent`, `collapsed`, `childCount` and
 * `onToggle` props are injected automatically by SortableTree ; only set them
 * manually when using the row outside of a SortableTree renderNode.
 *
 * @module components/trees/SortableTreeItem
 *
 * @example
 * ```jsx
 * <SortableTree
 *     defaultItems={ tree }
 *     renderNode={ ( node ) => (
 *         <SortableTreeItem>{ node.label }</SortableTreeItem>
 *     )}
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Row content
 * @param {number} [props.childCount=0] - Number of children (injected ; drives the toggle)
 * @param {string} [props.className] - Additional classes for the row
 * @param {boolean} [props.collapsed] - Whether the node is collapsed (injected)
 * @param {boolean} [props.collapsible=true] - Whether the expand/collapse chevron is shown (injected)
 * @param {number} [props.depth=0] - Display depth of the row (injected)
 * @param {boolean} [props.disabled] - Disable dragging for this row
 * @param {boolean} [props.handle=true] - Show a drag handle (when false, the whole row is draggable)
 * @param {string} [props.handleClassName] - Additional classes for the drag handle
 * @param {string} [props.handleLabel='Drag to reorder'] - Accessible label of the drag handle
 * @param {string|number} props.id - Unique identifier of the node (injected by SortableTree)
 * @param {number} [props.indent=24] - Indentation width per depth level, in pixels (injected)
 * @param {number} props.index - Index of the row within the flat list (injected by SortableTree)
 * @param {Function} [props.onToggle] - Expand/collapse handler (injected)
 * @param {string} [props.toggleLabel='Toggle'] - Accessible label of the expand/collapse toggle
 */
const SortableTreeItem =
({
    children ,
    childCount = 0 ,
    className ,
    collapsed = false ,
    collapsible = true ,
    depth = 0 ,
    disabled = false ,
    handle = true ,
    handleClassName ,
    handleLabel = 'Drag to reorder' ,
    id ,
    indent = 24 ,
    index ,
    onToggle ,
    style ,
    toggleLabel = 'Toggle' ,
    ...rest
}) =>
{
    const { ref , handleRef , isDragSource } = useSortable({ id , index , disabled , plugins : withoutOptimisticSorting }) ;

    return (
        <div
            className = { getTreeItemClasses({ dragging : isDragSource , className }) }
            ref       = { ref }
            style     = {{ marginInlineStart : depth * indent , ...style }}
            { ...rest }
        >
            { handle && (
                <button
                    aria-label = { handleLabel }
                    className  = { getTreeHandleClasses({ className : handleClassName }) }
                    disabled   = { disabled }
                    ref        = { handleRef }
                    type       = "button"
                >
                    <MdDragIndicator size={ 16 } />
                </button>
            )}

            { collapsible && childCount > 0 ? (
                <button
                    aria-expanded = { !collapsed }
                    aria-label    = { toggleLabel }
                    className     = { getTreeToggleClasses() }
                    onClick       = { onToggle }
                    type          = "button"
                >
                    { collapsed ? <MdChevronRight size={ 18 } /> : <MdExpandMore size={ 18 } /> }
                </button>
            ) : (
                <span aria-hidden="true" className="flex-none w-6" />
            )}

            { children }
        </div>
    ) ;
} ;

SortableTreeItem.displayName = 'SortableTreeItem' ;

export default SortableTreeItem ;
