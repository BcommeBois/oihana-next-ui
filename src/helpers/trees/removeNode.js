/**
 * Removes a node (and its whole subtree) from a nested tree, immutably.
 *
 * Companion of {@link module:helpers/trees/insertNode}, meant for the controlled
 * `items` of a `SortableTree` (add / remove are plain state updates).
 *
 * @module helpers/trees/removeNode
 *
 * @param {Array} tree - The nested tree.
 * @param {string|number} id - The id of the node to remove.
 * @param {Object} [options]
 * @param {(node: *) => (string|number)} [options.getId] - Id accessor (defaults to `node.id`).
 * @param {(node: *) => Array} [options.getChildren] - Children accessor (defaults to `node.children ?? []`).
 * @param {(node: *, children: Array) => *} [options.setChildren] - Rebuilds a node with new children (defaults to `{ ...node , children }`).
 *
 * @returns {Array} A new tree without the node.
 *
 * @example
 * ```js
 * setTree( tree => removeNode( tree , 'components' ) ) ; // removes the folder and everything under it
 * ```
 */
const removeNode = ( tree , id , options = {} ) =>
{
    const getId       = options.getId       ?? ( n => n?.id ) ;
    const getChildren = options.getChildren ?? ( n => n?.children ?? [] ) ;
    const setChildren = options.setChildren ?? ( ( n , children ) => ( { ...n , children } ) ) ;

    return tree
        .filter( n => getId( n ) !== id )
        .map( n =>
        {
            const children = getChildren( n ) ;

            return children.length
                ? setChildren( n , removeNode( children , id , options ) )
                : n ;
        }) ;
} ;

export default removeNode ;
