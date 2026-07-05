import { arrayMove } from '../hooks/useSortableList' ;

/**
 * Pure helpers for the flatten / reorder / rebuild cycle of a sortable tree.
 *
 * The nested tree (`[ { id , children : [...] } ]`) is flattened into an
 * indented list of entries `{ id , item , parentId , depth , index , childCount }`
 * rendered as a single sortable container ; a drop is projected to a target
 * depth + parent, then the flat list is rebuilt into a nested tree.
 *
 * @module helpers/treeUtils
 */

const defaultGetId       = item => item?.id ;
const defaultGetChildren = item => item?.children ?? [] ;

/**
 * Flattens a nested tree into a pre-ordered list of entries.
 *
 * @param {Array} items - The nested tree.
 * @param {Object} [options]
 * @param {(item: *) => (string|number)} [options.getId] - Item id accessor.
 * @param {(item: *) => Array} [options.getChildren] - Item children accessor.
 *
 * @returns {Array<{ id: string|number, item: *, parentId: string|number|null, depth: number, index: number, childCount: number }>}
 */
export const flattenTree = ( items , options = {} ) =>
{
    const { getId = defaultGetId , getChildren = defaultGetChildren } = options ;

    const flatten = ( nodes , parentId , depth ) =>
        nodes.flatMap( ( item , index ) =>
        {
            const id       = getId( item ) ;
            const children = getChildren( item ) ;
            const entry    = { id , item , parentId , depth , index , childCount : children.length } ;

            return [ entry , ...flatten( children , id , depth + 1 ) ] ;
        }) ;

    return flatten( items , null , 0 ) ;
} ;

/**
 * Rebuilds a nested tree from a flat list of entries, using `parentId` to
 * re-nest (order-independent) and preserving sibling order (flat-list order).
 *
 * @param {Array} flatItems - The flat entries (each with `item` and `parentId`).
 * @param {Object} [options]
 * @param {(item: *, children: Array) => *} [options.setChildren] - Rebuilds a node from its item and children (defaults to `{ ...item , children }`).
 *
 * @returns {Array} The nested tree.
 */
export const buildTree = ( flatItems , options = {} ) =>
{
    const setChildren = options.setChildren ?? ( ( item , children ) => ( { ...item , children } ) ) ;

    const root   = { children : [] } ;
    const nodes  = new Map() ;
    const clones = flatItems.map( entry => ( { id : entry.id , item : entry.item , parentId : entry.parentId , children : [] } ) ) ;

    clones.forEach( clone => { nodes.set( clone.id , clone ) ; } ) ;

    clones.forEach( clone =>
    {
        const parent = clone.parentId == null ? root : nodes.get( clone.parentId ) ;
        ( parent ?? root ).children.push( clone ) ;
    }) ;

    const toNested = clone => setChildren( clone.item , clone.children.map( toNested ) ) ;

    return root.children.map( toNested ) ;
} ;

/**
 * Removes the descendants of the given ids from a flat list (keeps the ids
 * themselves). Used to hide collapsed subtrees and to make a dragged subtree
 * follow its parent (which also removes the descendants as drop targets).
 *
 * @param {Array} flatItems - The flat entries.
 * @param {Array<string|number>} ids - The parent ids whose descendants to remove.
 *
 * @returns {Array} The filtered flat entries.
 */
export const removeChildrenOf = ( flatItems , ids ) =>
{
    const excluded = new Set( ids ) ;

    return flatItems.filter( entry =>
    {
        if ( entry.parentId !== null && excluded.has( entry.parentId ) )
        {
            if ( entry.childCount > 0 )
            {
                excluded.add( entry.id ) ;
            }
            return false ;
        }
        return true ;
    }) ;
} ;

/**
 * Projects the landing depth and parent of the dragged item, from the current
 * horizontal drag offset. The depth is clamped between the depth of the item
 * below (min) and one level deeper than the item above (max), and optionally
 * by a global `maxDepth`.
 *
 * @param {Array} flatItems - The flat entries currently rendered (descendants of the active item removed).
 * @param {string|number} activeId - The dragged item id.
 * @param {string|number} overId - The id of the item currently under the pointer.
 * @param {number} dragOffset - The horizontal drag offset in pixels.
 * @param {number} indent - The indentation width per depth level, in pixels.
 * @param {Object} [options]
 * @param {number} [options.maxDepth] - Optional global maximum depth (already accounting for the dragged subtree height).
 * @param {(draggedItem: *, parentItem: *|null) => boolean} [options.canNest] - Whether the dragged node may become a child of a given parent (null = top level). When it rejects the projected parent, the depth walks up to the nearest valid ancestor ; if none is valid at this position, `allowed` is false.
 *
 * @returns {{ depth: number, maxDepth: number, minDepth: number, parentId: string|number|null, allowed: boolean }|null}
 */
export const getProjection = ( flatItems , activeId , overId , dragOffset , indent , options = {} ) =>
{
    const { canNest } = options ;

    const overIndex   = flatItems.findIndex( entry => entry.id === overId ) ;
    const activeIndex = flatItems.findIndex( entry => entry.id === activeId ) ;

    if ( overIndex === -1 || activeIndex === -1 )
    {
        return null ;
    }

    const activeItem   = flatItems[ activeIndex ] ;
    const newItems     = arrayMove( flatItems , activeIndex , overIndex ) ;
    const previousItem = newItems[ overIndex - 1 ] ;
    const nextItem     = newItems[ overIndex + 1 ] ;

    const dragDepth      = Math.round( dragOffset / indent ) ;
    const projectedDepth = activeItem.depth + dragDepth ;

    let maxDepth = previousItem ? previousItem.depth + 1 : 0 ;
    const minDepth = nextItem ? nextItem.depth : 0 ;

    if ( typeof options.maxDepth === 'number' )
    {
        maxDepth = Math.min( maxDepth , options.maxDepth ) ;
    }

    // The parent id implied by a given candidate depth at this insertion position.
    const parentIdForDepth = ( candidate ) =>
    {
        if ( candidate <= 0 || !previousItem )
        {
            return null ;
        }
        if ( candidate === previousItem.depth )
        {
            return previousItem.parentId ;
        }
        if ( candidate > previousItem.depth )
        {
            return previousItem.id ;
        }

        const parent = newItems
            .slice( 0 , overIndex )
            .reverse()
            .find( entry => entry.depth === candidate ) ;

        return parent?.parentId ?? null ;
    } ;

    const itemForId = ( id ) => id == null ? null : ( newItems.find( entry => entry.id === id )?.item ?? null ) ;

    let depth    = Math.max( minDepth , Math.min( projectedDepth , maxDepth ) ) ;
    let parentId = parentIdForDepth( depth ) ;
    let allowed  = true ;

    // Walk up to the nearest depth whose parent accepts the dragged node.
    if ( typeof canNest === 'function' )
    {
        while ( !canNest( activeItem.item , itemForId( parentId ) ) )
        {
            if ( depth <= minDepth )
            {
                allowed = false ;
                break ;
            }
            depth   -= 1 ;
            parentId = parentIdForDepth( depth ) ;
        }
    }

    return { depth , maxDepth , minDepth , parentId , allowed } ;
} ;
