import useValue from './useValue' ;

/**
 * Moves an item within an array, returning a new array.
 *
 * @template T
 * @param {T[]} array - The source array.
 * @param {number} from - The index of the item to move.
 * @param {number} to - The destination index.
 *
 * @returns {T[]} A new array with the item moved.
 */
export const arrayMove = ( array , from , to ) =>
{
    const result = [ ...array ] ;
    const [ item ] = result.splice( from , 1 ) ;
    result.splice( to , 0 , item ) ;
    return result ;
} ;

/**
 * React hook to manage the ordered items of a sortable list (controlled or uncontrolled).
 *
 * In uncontrolled mode (with `defaultItems`), the hook owns the order and applies
 * reorders optimistically : if `onReorder` returns a rejected promise, the previous
 * order is restored. In controlled mode (with `items`), the consumer owns the order
 * and updates it from the `onReorder` callback.
 *
 * @param {Object} [props]
 * @param {Array} [props.defaultItems] - The initial items for uncontrolled mode.
 * @param {Array} [props.items] - The controlled items from props.
 * @param {(items: Array, change: { from: number, to: number, item: * }) => (void|Promise)} [props.onReorder] - Callback invoked with the reordered items.
 *
 * @returns {{ items: Array, reorder: (from: number, to: number) => void, isControlled: boolean }} The current items, a reorder function, and the controlled state.
 *
 * @example
 * ```js
 * // Uncontrolled usage with an async API call and optimistic revert
 * const { items , reorder } = useSortableList(
 * {
 *     defaultItems : songs ,
 *     onReorder    : ( next ) => api.saveOrder( next.map( s => s.id ) ) ,
 * }) ;
 * ```
 */
const useSortableList = ({ defaultItems , items , onReorder } = {} ) =>
{
    const [ currentItems , setItems , isControlled ] = useValue( defaultItems ?? [] , items ) ;

    const reorder = ( from , to ) =>
    {
        if ( from === to || from < 0 || to < 0 )
        {
            return ;
        }

        const previous = currentItems ;
        const next     = arrayMove( previous , from , to ) ;

        if ( !isControlled )
        {
            setItems( next ) ;
        }

        if ( typeof onReorder === 'function' )
        {
            const result = onReorder( next , { from , to , item : previous[ from ] } ) ;

            if ( !isControlled && result && typeof result.catch === 'function' )
            {
                result.catch( () => setItems( previous ) ) ;
            }
        }
    } ;

    return { items : currentItems , reorder , isControlled } ;
} ;

export default useSortableList ;
