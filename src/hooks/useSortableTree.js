import useValue from './useValue' ;

/**
 * React hook to manage the nested items of a sortable tree (controlled or uncontrolled).
 *
 * The whole tree is one value : a nested array of items, each carrying its
 * `children`. A move (reorder among siblings or reparent) always produces a
 * single `onChange( nextTree , change )` call, where `change` describes the
 * move (`{ item , fromParent , toParent , fromIndex , toIndex }`).
 *
 * In uncontrolled mode (with `defaultItems`), the hook owns the tree and applies
 * moves optimistically : if `onChange` returns a rejected promise, the previous
 * tree is restored. In controlled mode (with `items`), the consumer owns the
 * tree and updates it from the `onChange` callback.
 *
 * The heavy lifting (flatten / project / rebuild) lives in the SortableTree
 * component ; this hook only owns the state and the optimistic commit.
 *
 * @param {Object} [props]
 * @param {Array} [props.defaultItems] - The initial tree for uncontrolled mode.
 * @param {Array} [props.items] - The controlled tree from props.
 * @param {(tree: Array, change: { item: *, fromParent: string|number|null, toParent: string|number|null, fromIndex: number, toIndex: number }) => (void|Promise)} [props.onChange] - Callback invoked with the updated tree.
 *
 * @returns {{ tree: Array, moveNode: (nextTree: Array, change: Object) => void, isControlled: boolean }}
 */
const useSortableTree = ({ defaultItems , items , onChange } = {} ) =>
{
    const [ tree , setTree , isControlled ] = useValue( defaultItems ?? [] , items ) ;

    const moveNode = ( nextTree , change ) =>
    {
        const previous = tree ;

        if ( !isControlled )
        {
            setTree( nextTree ) ;
        }

        if ( typeof onChange === 'function' )
        {
            const result = onChange( nextTree , change ) ;

            if ( !isControlled && result && typeof result.catch === 'function' )
            {
                result.catch( () => setTree( previous ) ) ;
            }
        }
    } ;

    return { tree , moveNode , isControlled } ;
} ;

export default useSortableTree ;
