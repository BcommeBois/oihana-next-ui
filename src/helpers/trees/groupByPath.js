/**
 * Builds a tree out of a flat list, by reading a dotted path on each item.
 *
 * `app.network.retry` and `app.network.timeout` have no parent-child relation
 * recorded anywhere — the hierarchy is **in the strings**, and this is what
 * reads it out : each segment of the path becomes a folder, and the item lands
 * in the folder its full prefix names.
 *
 * ### The node shape
 *
 * ```
 * {
 *     key      : 'retry' ,                   // the segment, relative to the parent
 *     path     : 'app.network.retry' ,       // the joined ancestors — unique and stable
 *     count    : 47 ,                        // leaves in the WHOLE subtree
 *     items    : [ item , … ] ,              // the direct leaves of this folder
 *     allItems : [ item , … ] ,              // items + every descendant's, for a tri-state checkbox
 *     children : [ node , … ] ,              // sorted by `key`
 * }
 * ```
 *
 * `path` is what a caller keys its open / selected state on : it is stable
 * across a re-group, which an index never is.
 *
 * ### 🔑 Beyond `maxDepth`, the tail is rejoined rather than dropped
 *
 * A path deeper than the cap keeps its remainder as ONE last segment :
 * `a.b.c.d.e` with a cap of 4 gives `a`, `b`, `c`, `d.e`. Cutting it instead
 * would leave two different items sharing a folder that names neither, and
 * dropping it would lose them — **every item must find a home**, or a list
 * that claims to show everything quietly stops doing so.
 *
 * ### What it does NOT do
 *
 * It does not read the path itself : `getPath` does, because only the caller
 * knows whether the hierarchy lives in a `key`, a `code` or a `slug`, and
 * whether a suffix has to be cut off first.
 *
 * @module helpers/trees/groupByPath
 *
 * @param {Array}    items                 - The flat list.
 * @param {Object}   [options]
 * @param {Function} [options.getPath]     - Reads the dotted path of an item. Defaults to its `path` property.
 * @param {number}   [options.maxDepth=4]  - How many folder levels before the tail is rejoined.
 * @param {string}   [options.orphan='—']  - The folder an item with no readable path lands in.
 * @param {Function} [options.compare]     - Orders the leaves of a folder. Defaults to the path, alphabetically.
 * @returns {Array<Object>} The roots, sorted by `key`.
 *
 * @example
 * ```js
 * const tree = groupByPath( settings , { getPath : item => item.key } ) ;
 * ```
 */

/**
 * How many folder levels a path is cut into before the rest is rejoined.
 * @type {number}
 */
export const DEFAULT_PATH_TREE_MAX_DEPTH = 4 ;

/**
 * The folder an item whose path cannot be read lands in.
 * @type {string}
 */
export const DEFAULT_PATH_TREE_ORPHAN = '—' ;

/**
 * Cuts a path into folder segments, capped, with the remainder rejoined.
 *
 * @param {string} path
 * @param {number} maxDepth
 * @param {string} orphan
 * @returns {string[]}
 */
const segmentsFor = ( path , maxDepth , orphan ) =>
{
    if ( typeof path !== 'string' || path === '' || path === orphan )
    {
        return [ orphan ] ;
    }

    const parts = path.split( '.' ) ;

    if ( parts.length <= maxDepth )
    {
        return parts ;
    }

    return [ ...parts.slice( 0 , maxDepth - 1 ) , parts.slice( maxDepth - 1 ).join( '.' ) ] ;
} ;

const groupByPath = ( items , options = {} ) =>
{
    const
    {
        compare  = null ,
        getPath  = ( item ) => item?.path ,
        maxDepth = DEFAULT_PATH_TREE_MAX_DEPTH ,
        orphan   = DEFAULT_PATH_TREE_ORPHAN ,
    }
    = options ;

    const root = { key : '' , path : '' , children : new Map() , items : [] } ;

    for ( const item of ( items ?? [] ) )
    {
        let cursor = root ;

        for ( const segment of segmentsFor( getPath( item ) , maxDepth , orphan ) )
        {
            if ( !cursor.children.has( segment ) )
            {
                cursor.children.set( segment ,
                {
                    key      : segment ,
                    path     : cursor.path ? `${ cursor.path }.${ segment }` : segment ,
                    children : new Map() ,
                    items    : [] ,
                }) ;
            }

            cursor = cursor.children.get( segment ) ;
        }

        cursor.items.push( item ) ;
    }

    const byPath = ( x , y ) => String( getPath( x ) ?? '' ).localeCompare( String( getPath( y ) ?? '' ) ) ;

    const finalize = ( node ) =>
    {
        const children = Array.from( node.children.values() )
            .sort( ( a , b ) => a.key.localeCompare( b.key ) )
            .map( finalize ) ;

        const items = node.items.slice().sort( compare ?? byPath ) ;

        return {
            key      : node.key ,
            path     : node.path ,
            count    : items.length + children.reduce( ( n , c ) => n + c.count , 0 ) ,
            items ,
            allItems : children.reduce( ( all , c ) => all.concat( c.allItems ) , items.slice() ) ,
            children ,
        } ;
    } ;

    return Array.from( root.children.values() )
        .sort( ( a , b ) => a.key.localeCompare( b.key ) )
        .map( finalize ) ;
} ;

export default groupByPath ;
