'use client' ;

import { cloneElement } from 'react' ;

import { DragDropProvider } from '@dnd-kit/react' ;

import useSortableList from '../../hooks/useSortableList' ;

import Flex from './Flex' ;

/**
 * SortableFlex component.
 * A Flex whose items can be reordered by drag and drop (pointer, touch and keyboard).
 * Suited to reorderable tags, chips, pills and toolbars — horizontal, vertical or wrapping.
 *
 * Items must have a stable unique identifier (an `id` property by default,
 * or provide a custom `getItemId` accessor). `renderItem` must return a
 * SortableFlexItem element ; SortableFlex injects `id`, `index`, `handle`
 * and `disabled` into it automatically.
 *
 * Works controlled (`items` + `onReorder`) or uncontrolled (`defaultItems`).
 * In uncontrolled mode, reorders are optimistic : if `onReorder` returns a
 * rejected promise (e.g. a failed API call), the previous order is restored.
 *
 * @module components/layouts/SortableFlex
 *
 * @example
 * ```jsx
 * // Reorderable tags (whole chips are draggable)
 * <SortableFlex
 *     gap={ 2 }
 *     wrap
 *     defaultItems={ tags }
 *     onReorder={ ( items ) => api.saveOrder( items ) }
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
 * @param {Array} [props.defaultItems] - The initial items for uncontrolled mode
 * @param {boolean} [props.disabled=false] - Disable dragging for all items
 * @param {(item: *) => (string|number)} [props.getItemId] - Accessor for the unique identifier of an item (defaults to `item.id`)
 * @param {boolean} [props.handle=false] - Show an inline drag handle on each item (when false, whole items are draggable)
 * @param {Array} [props.items] - The controlled items from props
 * @param {(items: Array, change: { from: number, to: number, item: * }) => (void|Promise)} [props.onReorder] - Callback invoked with the reordered items
 * @param {(item: *, index: number) => React.ReactElement} props.renderItem - Renders a SortableFlexItem for an item
 */
const SortableFlex =
({
    defaultItems ,
    disabled = false ,
    getItemId ,
    handle = false ,
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
            <Flex { ...rest }>
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
            </Flex>
        </DragDropProvider>
    ) ;
} ;

SortableFlex.displayName = 'SortableFlex' ;

export default SortableFlex ;
