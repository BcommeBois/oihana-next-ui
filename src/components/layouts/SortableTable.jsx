'use client' ;

import { cloneElement } from 'react' ;

import { DragDropProvider } from '@dnd-kit/react' ;

import useSortableList from '../../hooks/useSortableList' ;

import Table from './Table' ;

/**
 * SortableTable component.
 * A Table whose rows can be reordered by drag and drop (pointer, touch and
 * keyboard). Data-driven : rows are declared through `renderRow( item , index )`
 * returning a SortableTableRow — the raw Table component stays unchanged for
 * free-form markup.
 *
 * `head` and `foot` are **arrays of column contents** (strings or nodes) : the
 * component renders the `<thead>` / `<tfoot>` rows itself and automatically
 * prepends the empty header cell matching the drag-handle column when
 * `handle` is enabled (default).
 *
 * Works controlled (`items` + `onReorder`) or uncontrolled (`defaultItems`).
 * In uncontrolled mode, reorders are optimistic : if `onReorder` returns a
 * rejected promise (e.g. a failed API call), the previous order is restored.
 *
 * Items need a stable unique id (`item.id` by default, customizable via
 * `getItemId`). Every other prop is forwarded to Table (`zebra`, `pinRows`,
 * `pinCols`, `size`, `scrollable`, `containerClassName`, …).
 *
 * @module components/layouts/SortableTable
 *
 * @example
 * ```jsx
 * <SortableTable
 *     zebra
 *     head={ [ 'Name' , 'Job' , 'Color' ] }
 *     defaultItems={ people }
 *     onReorder={ ( items ) => api.saveOrder( items ) }
 *     renderRow={ ( person ) => (
 *         <SortableTableRow>
 *             <td>{ person.name }</td>
 *             <td>{ person.job }</td>
 *             <td>{ person.color }</td>
 *         </SortableTableRow>
 *     )}
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {Array} [props.defaultItems] - The initial items for uncontrolled mode
 * @param {boolean} [props.disabled=false] - Disable dragging for all rows
 * @param {Array<React.ReactNode>} [props.foot] - Footer cells (one entry per column)
 * @param {(item: *) => (string|number)} [props.getItemId] - Accessor for the unique identifier of an item (defaults to `item.id`)
 * @param {boolean} [props.handle=true] - Show a drag-handle cell on each row (when false, whole rows are draggable)
 * @param {Array<React.ReactNode>} [props.head] - Header cells (one entry per column)
 * @param {Array} [props.items] - The controlled items from props
 * @param {(items: Array, change: { from: number, to: number, item: * }) => (void|Promise)} [props.onReorder] - Callback invoked with the reordered items
 * @param {(item: *, index: number) => React.ReactElement} props.renderRow - Renders a SortableTableRow for an item
 */
const SortableTable =
({
    defaultItems ,
    disabled = false ,
    foot ,
    getItemId ,
    handle = true ,
    head ,
    items ,
    onReorder ,
    renderRow ,
    ...rest
}) =>
{
    const { items : currentItems , reorder } = useSortableList({ defaultItems , items , onReorder }) ;

    const getId = getItemId ?? ( item => item?.id ?? item ) ;

    const onDragEnd = ( event ) =>
    {
        const source = event?.operation?.source ;

        if ( event?.canceled || !source?.sortable )
        {
            return ;
        }

        const { initialIndex , index } = source.sortable ;

        reorder( initialIndex , index ) ;
    } ;

    const renderCells = ( cells ) => (
        <tr>
            { handle && <th className="w-0"></th> }
            { cells.map( ( cell , index ) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: head/foot cells are a static column list, the index is their identity
                <th key={ index }>{ cell }</th>
            ))}
        </tr>
    ) ;

    return (
        <DragDropProvider onDragEnd={ onDragEnd }>
            <Table { ...rest }>
                { head && <thead>{ renderCells( head ) }</thead> }
                <tbody>
                    { currentItems.map( ( item , index ) =>
                    {
                        const element = typeof renderRow === 'function' ? renderRow( item , index ) : null ;

                        if ( !element )
                        {
                            return null ;
                        }

                        return cloneElement( element ,
                        {
                            key      : getId( item ) ,
                            id       : getId( item ) ,
                            index ,
                            disabled : element.props.disabled ?? disabled ,
                            handle   : element.props.handle   ?? handle ,
                        }) ;
                    })}
                </tbody>
                { foot && <tfoot>{ renderCells( foot ) }</tfoot> }
            </Table>
        </DragDropProvider>
    ) ;
} ;

SortableTable.displayName = 'SortableTable' ;

export default SortableTable ;
