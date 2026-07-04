import useValue from './useValue' ;

import { arrayMove } from './useSortableList' ;

/**
 * React hook to manage the columns of a kanban board (controlled or uncontrolled).
 *
 * The whole board is one value : an array of columns, each carrying its `items`.
 * Moving a card — within a column or across columns — or moving a whole column
 * always produces a single `onChange( nextColumns , change )` call, where
 * `change` describes the move :
 * - card   : `{ type : 'card' , item , fromColumn , toColumn , fromIndex , toIndex }`
 * - column : `{ type : 'column' , column , fromIndex , toIndex }`
 *
 * In uncontrolled mode (with `defaultColumns`), the hook owns the state and applies
 * moves optimistically : if `onChange` returns a rejected promise, the previous
 * state is restored. In controlled mode (with `columns`), the consumer owns the
 * state and updates it from the `onChange` callback.
 *
 * @param {Object} [props]
 * @param {Array} [props.defaultColumns] - The initial columns for uncontrolled mode.
 * @param {Array} [props.columns] - The controlled columns from props.
 * @param {(columns: Array, change: { item: *, fromColumn: string|number, toColumn: string|number, fromIndex: number, toIndex: number }) => (void|Promise)} [props.onChange] - Callback invoked with the updated columns.
 * @param {(column: *) => (string|number)} [props.getColumnId] - Accessor for the unique identifier of a column (defaults to `column.id`).
 *
 * @returns {{ columns: Array, moveItem: (fromColumn: string|number, toColumn: string|number, fromIndex: number, toIndex: number) => void, moveColumn: (fromIndex: number, toIndex: number) => void, isControlled: boolean }} The current columns, the move functions, and the controlled state.
 *
 * @example
 * ```js
 * const { columns , moveItem } = useKanban(
 * {
 *     defaultColumns : [ { id : 'todo' , title : 'To do' , items : [ … ] } , … ] ,
 *     onChange       : ( next , change ) => api.moveCard( change ) ,
 * }) ;
 * ```
 */
const useKanban = ({ defaultColumns , columns , onChange , getColumnId } = {} ) =>
{
    const [ currentColumns , setColumns , isControlled ] = useValue( defaultColumns ?? [] , columns ) ;

    const getColId = getColumnId ?? ( column => column?.id ) ;

    const moveItem = ( fromColumn , toColumn , fromIndex , toIndex ) =>
    {
        if ( fromColumn === toColumn && fromIndex === toIndex )
        {
            return ;
        }

        const previous = currentColumns ;

        const sourceColumn = previous.find( column => getColId( column ) === fromColumn ) ;
        const targetColumn = previous.find( column => getColId( column ) === toColumn ) ;

        const item = sourceColumn?.items?.[ fromIndex ] ;

        if ( !sourceColumn || !targetColumn || item === undefined )
        {
            return ;
        }

        const next = previous.map( column =>
        {
            const id = getColId( column ) ;

            if ( id === fromColumn && id === toColumn )
            {
                return { ...column , items : arrayMove( column.items , fromIndex , toIndex ) } ;
            }

            if ( id === fromColumn )
            {
                const items = [ ...column.items ] ;
                items.splice( fromIndex , 1 ) ;
                return { ...column , items } ;
            }

            if ( id === toColumn )
            {
                const items = [ ...( column.items ?? [] ) ] ;
                items.splice( toIndex , 0 , item ) ;
                return { ...column , items } ;
            }

            return column ;
        }) ;

        if ( !isControlled )
        {
            setColumns( next ) ;
        }

        if ( typeof onChange === 'function' )
        {
            const result = onChange( next , { type : 'card' , item , fromColumn , toColumn , fromIndex , toIndex } ) ;

            if ( !isControlled && result && typeof result.catch === 'function' )
            {
                result.catch( () => setColumns( previous ) ) ;
            }
        }
    } ;

    const moveColumn = ( fromIndex , toIndex ) =>
    {
        if ( fromIndex === toIndex )
        {
            return ;
        }

        const previous = currentColumns ;
        const column   = previous[ fromIndex ] ;

        if ( column === undefined )
        {
            return ;
        }

        const next = arrayMove( previous , fromIndex , toIndex ) ;

        if ( !isControlled )
        {
            setColumns( next ) ;
        }

        if ( typeof onChange === 'function' )
        {
            const result = onChange( next , { type : 'column' , column , fromIndex , toIndex } ) ;

            if ( !isControlled && result && typeof result.catch === 'function' )
            {
                result.catch( () => setColumns( previous ) ) ;
            }
        }
    } ;

    return { columns : currentColumns , moveItem , moveColumn , isControlled } ;
} ;

export default useKanban ;
