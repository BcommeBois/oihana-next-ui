'use client' ;

import { cloneElement , useState } from 'react' ;

import { DragDropProvider } from '@dnd-kit/react' ;

import { move } from '@dnd-kit/helpers' ;

import useKanban from '../../hooks/useKanban' ;

import { getKanbanClasses } from '../../themes/components/kanban' ;

import KanbanColumn from './KanbanColumn' ;

/**
 * Kanban component.
 * A kanban board : cards can be reordered within a column and moved across
 * columns by drag and drop (pointer, touch and keyboard). Columns accept
 * cards even when empty.
 *
 * The whole board is **one value** : an array of columns, each carrying its
 * `items`. Works controlled (`columns` + `onChange`) or uncontrolled
 * (`defaultColumns`). Any move produces a single
 * `onChange( nextColumns , change )` call with
 * `change = { item , fromColumn , toColumn , fromIndex , toIndex }` ;
 * in uncontrolled mode a rejected promise returned by `onChange`
 * (e.g. a failed API call) restores the previous state.
 *
 * While a card is dragged, the board keeps a live snapshot of the columns in
 * sync with the engine (required for cross-column moves under React) ; the
 * consumer state is only committed once, on drop.
 *
 * Cards are declared through `renderCard( item , column , index )` returning
 * a KanbanCard — Kanban injects `id` / `index` / `group` / `disabled` into it.
 * Cards and columns need **stable unique ids** (`item.id` / `column.id` by
 * default, customizable via `getItemId` / `getColumnId`).
 *
 * @module components/kanban/Kanban
 *
 * @example
 * ```jsx
 * const [ columns , setColumns ] = useState(
 * [
 *     { id : 'todo'  , title : 'To do' , items : [ { id : 'c1' , title : 'Fix login' } ] } ,
 *     { id : 'doing' , title : 'Doing' , items : [] } ,
 * ]) ;
 *
 * <Kanban
 *     columns    = { columns }
 *     onChange   = { ( next , change ) => { setColumns( next ) ; api.moveCard( change ) ; } }
 *     renderCard = { card => <KanbanCard title={ card.title } /> }
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {string} [props.className] - Additional classes for the board
 * @param {Array} [props.columns] - The controlled columns from props
 * @param {Array} [props.defaultColumns] - The initial columns for uncontrolled mode
 * @param {boolean} [props.disabled=false] - Disable dragging for all cards
 * @param {(column: *) => (string|number)} [props.getColumnId] - Accessor for the unique identifier of a column (defaults to `column.id`)
 * @param {(item: *) => (string|number)} [props.getItemId] - Accessor for the unique identifier of a card (defaults to `item.id`)
 * @param {(columns: Array, change: Object) => (void|Promise)} [props.onChange] - Callback invoked with the updated columns ; `change` is `{ type : 'card' , item , fromColumn , toColumn , fromIndex , toIndex }` for a card move, `{ type : 'column' , column , fromIndex , toIndex }` for a column move
 * @param {(item: *, column: *, index: number) => React.ReactElement} props.renderCard - Renders a KanbanCard for an item
 * @param {(column: *) => React.ReactNode} [props.renderFooter] - Optional custom column footer
 * @param {(column: *) => React.ReactNode} [props.renderHeader] - Optional custom column header (overrides title/count)
 * @param {boolean} [props.reorderableColumns=false] - Allow reordering the columns themselves by dragging their headers
 */
const Kanban =
({
    className ,
    columns ,
    defaultColumns ,
    disabled = false ,
    getColumnId ,
    getItemId ,
    onChange ,
    renderCard ,
    renderFooter ,
    renderHeader ,
    reorderableColumns = false ,
    ...rest
}) =>
{
    const { columns : currentColumns , moveItem , moveColumn } = useKanban({ defaultColumns , columns , onChange , getColumnId }) ;

    const getColId  = getColumnId ?? ( column => column?.id ) ;
    const getCardId = getItemId   ?? ( item => item?.id ?? item ) ;

    // Live items-per-column snapshot while a card is dragged : keeps the React
    // tree in sync with the engine's optimistic sorting across columns. The
    // consumer state is committed once, on drop.
    const [ liveItems , setLiveItems ] = useState( null ) ;

    const buildRecord = () =>
    {
        const record = {} ;

        currentColumns.forEach( column =>
        {
            record[ getColId( column ) ] = column.items ?? [] ;
        }) ;

        return record ;
    } ;

    const onDragStart = ( event ) =>
    {
        // The live snapshot only concerns cards — a column drag stays in a
        // single container and is handled by the engine's optimistic sorting.
        if ( event?.operation?.source?.type === 'card' )
        {
            setLiveItems( buildRecord() ) ;
        }
    } ;

    const onDragOver = ( event ) =>
    {
        if ( event?.operation?.source?.type !== 'card' )
        {
            return ;
        }

        setLiveItems( record => move( record ?? buildRecord() , event ) ) ;
    } ;

    // Locates a card in an items-per-column record, preserving the real column id types.
    const findInRecord = ( record , cardId ) =>
    {
        for ( const column of currentColumns )
        {
            const columnId = getColId( column ) ;
            const cards    = record[ columnId ] ?? [] ;
            const index    = cards.findIndex( card => getCardId( card ) === cardId ) ;

            if ( index !== -1 )
            {
                return { column : columnId , index } ;
            }
        }
        return null ;
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

        // Column drag : same-container reorder, the sortable indexes are reliable.
        if ( source.type === 'column' )
        {
            if ( source.sortable )
            {
                moveColumn( source.sortable.initialIndex , source.sortable.index ) ;
            }
            return ;
        }

        // The dragged card may have been remounted while crossing columns, which
        // resets its sortable initialIndex/initialGroup — so the move is computed
        // by diffing the committed state against the final live snapshot instead.
        const final = move( record , event ) ;

        const from = findInRecord( buildRecord() , source.id ) ;
        const to   = findInRecord( final , source.id ) ;

        if ( !from || !to || ( from.column === to.column && from.index === to.index ) )
        {
            return ;
        }

        moveItem( from.column , to.column , from.index , to.index ) ;
    } ;

    const displayColumns = liveItems
        ? currentColumns.map( column => ({ ...column , items : liveItems[ getColId( column ) ] ?? [] }) )
        : currentColumns ;

    return (
        <DragDropProvider
            onDragStart = { onDragStart }
            onDragOver  = { onDragOver }
            onDragEnd   = { onDragEnd }
        >
            <div className={ getKanbanClasses({ className }) } { ...rest }>
                { displayColumns.map( ( column , columnIndex ) => (
                    <KanbanColumn
                        key      = { getColId( column ) }
                        id       = { getColId( column ) }
                        index    = { columnIndex }
                        sortable = { reorderableColumns }
                        title    = { column.title }
                        count    = { column.items?.length ?? 0 }
                        header   = { renderHeader?.( column ) }
                        footer   = { renderFooter?.( column ) }
                    >
                        { ( column.items ?? [] ).map( ( item , index ) =>
                        {
                            const element = typeof renderCard === 'function' ? renderCard( item , column , index ) : null ;

                            if ( !element )
                            {
                                return null ;
                            }

                            return cloneElement( element ,
                            {
                                key      : getCardId( item ) ,
                                id       : getCardId( item ) ,
                                index ,
                                group    : getColId( column ) ,
                                disabled : element.props.disabled ?? disabled ,
                            }) ;
                        })}
                    </KanbanColumn>
                ))}
            </div>
        </DragDropProvider>
    ) ;
} ;

Kanban.displayName = 'Kanban' ;

export default Kanban ;
