/**
 * Inserts a node into a nested tree, immutably — as a child of `parentId`, or
 * at the top level when `parentId` is `null` / `undefined`.
 *
 * Companion of {@link module:helpers/trees/removeNode}, meant for the controlled
 * `items` of a `SortableTree` (add / remove are plain state updates).
 *
 * @module helpers/trees/insertNode
 *
 * @param {Array} tree - The nested tree.
 * @param {string|number|null} parentId - The id of the parent to insert under (null = top level).
 * @param {*} node - The node to insert.
 * @param {Object} [options]
 * @param {(node: *) => (string|number)} [options.getId] - Id accessor (defaults to `node.id`).
 * @param {(node: *) => Array} [options.getChildren] - Children accessor (defaults to `node.children ?? []`).
 * @param {(node: *, children: Array) => *} [options.setChildren] - Rebuilds a node with new children (defaults to `{ ...node , children }`).
 *
 * @returns {Array} A new tree with the node inserted.
 *
 * @example
 * ```js
 * // Append a new file inside the folder "components"
 * setTree( tree => insertNode( tree , 'components' , { id : 'x' , label : 'New.jsx' } ) ) ;
 *
 * // Append at the top level
 * setTree( tree => insertNode( tree , null , { id : 'y' , label : 'root-item' } ) ) ;
 * ```
 */
const insertNode = ( tree , parentId , node , options = {} ) =>
{
    const getId       = options.getId       ?? ( n => n?.id ) ;
    const getChildren = options.getChildren ?? ( n => n?.children ?? [] ) ;
    const setChildren = options.setChildren ?? ( ( n , children ) => ( { ...n , children } ) ) ;

    if ( parentId == null )
    {
        return [ ...tree , node ] ;
    }

    return tree.map( n =>
    {
        if ( getId( n ) === parentId )
        {
            return setChildren( n , [ ...getChildren( n ) , node ] ) ;
        }

        const children = getChildren( n ) ;

        return children.length
            ? setChildren( n , insertNode( children , parentId , node , options ) )
            : n ;
    }) ;
} ;

export default insertNode ;
