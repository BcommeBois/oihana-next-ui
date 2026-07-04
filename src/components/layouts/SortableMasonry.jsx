'use client' ;

import { cloneElement , useState } from 'react' ;

import { DragDropProvider , useDroppable } from '@dnd-kit/react' ;

import { CollisionPriority } from '@dnd-kit/abstract' ;

import { move } from '@dnd-kit/helpers' ;

import useSortableList from '../../hooks/useSortableList' ;

import useBreakpoints , { XXL } from '../../themes/hooks/useBreakpoints' ;
import resolveColumnCount from '../../themes/helpers/resolveColumnCount' ;
import { getSortableColumnClasses } from '../../themes/components/sortable' ;

import Flex from './Flex' ;
import Grid from './Grid' ;

/**
 * Internal droppable column of a SortableMasonry.
 * Accepts items even when empty (visual feedback while hovered).
 */
const SortableMasonryColumn =
({
    children ,
    className ,
    gap ,
    gapX ,
    gapY ,
    id ,
}) =>
{
    const { ref , isDropTarget } = useDroppable(
    {
        id ,
        type              : 'column' ,
        collisionPriority : CollisionPriority.Low ,
    }) ;

    return (
        <Flex
            className = { getSortableColumnClasses({ over : isDropTarget , className }) }
            direction = "col"
            gap       = { gap }
            gapX      = { gapX }
            gapY      = { gapY }
            ref       = { ref }
        >
            { children }
        </Flex>
    ) ;
} ;

/**
 * SortableMasonry component.
 * A masonry layout whose items can be reordered by drag and drop (pointer,
 * touch and keyboard), including across columns.
 *
 * Unlike Masonry (which distributes children round-robin), SortableMasonry
 * distributes items **sequentially** : the first ⌈N/C⌉ items fill the first
 * column, the next ones the second, and so on — the flat order is the
 * concatenation of the columns (top to bottom, left to right), which makes
 * any drop translatable into a single `reorder( from , to )` on the flat list.
 *
 * **The invariant is the order, not the column assignment** : after a drop
 * the list is recomposed then evenly redistributed, so an item close to a
 * column boundary may visually shift to the neighbouring column right after
 * the drop (rebalancing).
 *
 * Works controlled (`items` + `onReorder`) or uncontrolled (`defaultItems`)
 * with the same optimistic-revert contract as the other sortable components.
 * `renderItem` must return a **SortableGridItem** ; SortableMasonry injects
 * `id`, `index`, `group`, `handle` and `disabled` into it automatically.
 *
 * @module components/layouts/SortableMasonry
 *
 * @example
 * ```jsx
 * <SortableMasonry
 *     columns={ { xs : 2 , md : 3 } }
 *     gap={ 4 }
 *     defaultItems={ photos }
 *     onReorder={ ( items ) => api.saveOrder( items ) }
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
 * @param {string} [props.className] - Additional classes for the container
 * @param {string} [props.columnClassName] - Additional classes for each column
 * @param {number|Object} [props.columns={ xs: 2, md: 3, xxl: 4 }] - Number of columns or responsive object
 * @param {Array} [props.defaultItems] - The initial items for uncontrolled mode
 * @param {boolean} [props.disabled=false] - Disable dragging for all items
 * @param {number|string} [props.gap=4] - Gap between columns and items
 * @param {number|string} [props.gapX] - Horizontal gap
 * @param {number|string} [props.gapY] - Vertical gap
 * @param {(item: *) => (string|number)} [props.getItemId] - Accessor for the unique identifier of an item (defaults to `item.id`)
 * @param {boolean} [props.handle=false] - Show an overlay drag handle on each item (when false, whole items are draggable)
 * @param {Array} [props.items] - The controlled items from props
 * @param {(items: Array, change: { from: number, to: number, item: * }) => (void|Promise)} [props.onReorder] - Callback invoked with the reordered flat list
 * @param {(item: *, index: number) => React.ReactElement} props.renderItem - Renders a SortableGridItem for an item
 */
const SortableMasonry =
({
    className ,
    columnClassName ,
    columns = { xs: 2, md: 3, xxl: 4 } ,
    defaultItems ,
    disabled = false ,
    gap = 4 ,
    gapX ,
    gapY ,
    getItemId ,
    handle = false ,
    items ,
    onReorder ,
    renderItem ,
    ...rest
}) =>
{
    const { lg , md , sm , xl , [ XXL ] : xxl } = useBreakpoints() ;

    const currentColumns = resolveColumnCount( columns , { sm , md , lg , xl , xxl } ) ;

    const { items : currentItems , reorder } = useSortableList({ defaultItems , items , onReorder }) ;

    const getId = getItemId ?? ( item => item?.id ?? item ) ;

    const columnKeys = Array.from( { length : currentColumns } , ( _ , i ) => `masonry-column-${ i }` ) ;

    // Sequential split : the flat order is the concatenation of the columns.
    const buildRecord = () =>
    {
        const size   = Math.ceil( currentItems.length / currentColumns ) || 1 ;
        const record = {} ;

        columnKeys.forEach( ( key , i ) =>
        {
            record[ key ] = currentItems.slice( i * size , ( i + 1 ) * size ) ;
        }) ;

        return record ;
    } ;

    // Live snapshot while an item is dragged (same cross-column strategy as Kanban).
    const [ liveItems , setLiveItems ] = useState( null ) ;

    const onDragStart = () =>
    {
        setLiveItems( buildRecord() ) ;
    } ;

    const onDragOver = ( event ) =>
    {
        setLiveItems( record => move( record ?? buildRecord() , event ) ) ;
    } ;

    const onDragEnd = ( event ) =>
    {
        const source = event?.operation?.source ;
        const record = liveItems ?? buildRecord() ;

        setLiveItems( null ) ;

        if ( event?.canceled || !source )
        {
            return ;
        }

        // The dragged item may have been remounted while crossing columns —
        // the move is computed by diffing the flat orders by item id.
        const final = move( record , event ) ;
        const flat  = columnKeys.flatMap( key => final[ key ] ?? [] ) ;

        const from = currentItems.findIndex( item => getId( item ) === source.id ) ;
        const to   = flat.findIndex( item => getId( item ) === source.id ) ;

        if ( from === -1 || to === -1 )
        {
            return ;
        }

        reorder( from , to ) ;
    } ;

    const record = liveItems ?? buildRecord() ;

    return (
        <DragDropProvider
            onDragStart = { onDragStart }
            onDragOver  = { onDragOver }
            onDragEnd   = { onDragEnd }
        >
            <Grid
                className = { className }
                cols      = { columns }
                gap       = { gap }
                gapX      = { gapX }
                gapY      = { gapY }
                { ...rest }
            >
                { columnKeys.map( key => (
                    <SortableMasonryColumn
                        key       = { key }
                        id        = { key }
                        className = { columnClassName }
                        gap       = { gap }
                        gapX      = { gapX }
                        gapY      = { gapY }
                    >
                        { ( record[ key ] ?? [] ).map( ( item , indexInColumn ) =>
                        {
                            const element = typeof renderItem === 'function' ? renderItem( item , indexInColumn ) : null ;

                            if ( !element )
                            {
                                return null ;
                            }

                            return cloneElement( element ,
                            {
                                key      : getId( item ) ,
                                id       : getId( item ) ,
                                index    : indexInColumn ,
                                group    : key ,
                                disabled : element.props.disabled ?? disabled ,
                                handle   : element.props.handle   ?? handle ,
                            }) ;
                        })}
                    </SortableMasonryColumn>
                ))}
            </Grid>
        </DragDropProvider>
    ) ;
} ;

SortableMasonry.displayName = 'SortableMasonry' ;

export default SortableMasonry ;
