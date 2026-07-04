'use client' ;

import { cloneElement } from 'react' ;

import { DragDropProvider } from '@dnd-kit/react' ;

import useSortableList from '../../hooks/useSortableList' ;

import List from './List' ;

/**
 * SortableList component.
 * A List whose rows can be reordered by drag and drop (pointer, touch and keyboard).
 *
 * Items must have a stable unique identifier (an `id` property by default,
 * or provide a custom `getItemId` accessor). `renderItem` must return a
 * SortableListRow element ; SortableList injects `id`, `index`, `handle`
 * and `disabled` into it automatically.
 *
 * Works controlled (`items` + `onReorder`) or uncontrolled (`defaultItems`).
 * In uncontrolled mode, reorders are optimistic : if `onReorder` returns a
 * rejected promise (e.g. a failed API call), the previous order is restored.
 *
 * @module components/lists/SortableList
 *
 * @example
 * ```jsx
 * // Uncontrolled with an async API call
 * <SortableList
 *     className="bg-base-100 rounded-box shadow-md"
 *     defaultItems={ songs }
 *     onReorder={ ( items , { from , to , item } ) => api.saveOrder( items ) }
 *     renderItem={ ( song ) => (
 *         <SortableListRow
 *             title={ song.title }
 *             subtitle={ song.artist }
 *         />
 *     )}
 * />
 *
 * // Controlled
 * <SortableList
 *     items={ items }
 *     onReorder={ setItems }
 *     renderItem={ ( item ) => <SortableListRow title={ item.title } /> }
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {Array} [props.defaultItems] - The initial items for uncontrolled mode
 * @param {boolean} [props.disabled=false] - Disable dragging for all rows
 * @param {(item: *) => (string|number)} [props.getItemId] - Accessor for the unique identifier of an item (defaults to `item.id`)
 * @param {boolean} [props.handle=true] - Show a drag handle on each row (when false, whole rows are draggable)
 * @param {Array} [props.items] - The controlled items from props
 * @param {(items: Array, change: { from: number, to: number, item: * }) => (void|Promise)} [props.onReorder] - Callback invoked with the reordered items
 * @param {(item: *, index: number) => React.ReactElement} props.renderItem - Renders a SortableListRow for an item
 */
const SortableList =
({
    defaultItems ,
    disabled = false ,
    getItemId ,
    handle = true ,
    items ,
    onReorder ,
    renderItem ,
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

    return (
        <DragDropProvider onDragEnd={ onDragEnd }>
            <List { ...rest }>
                { currentItems.map( ( item , index ) =>
                {
                    const element = typeof renderItem === 'function' ? renderItem( item , index ) : null ;

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
            </List>
        </DragDropProvider>
    ) ;
} ;

SortableList.displayName = 'SortableList' ;

export default SortableList ;
