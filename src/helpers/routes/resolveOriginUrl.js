/**
 * Where the reader came from before reaching a run of records — the page that
 * opened the first of them.
 *
 * A record is not always opened from its own list : a cross-reference, a
 * dashboard, a bookmark page lead to it too. A back link that only knows the
 * list then drops the reader somewhere they never were. Given the trail of the
 * tab ({@link module:helpers/routes/nextTrail}) and the `scope` the records live
 * under, this walks back past the current page and past every SIBLING record —
 * any page under `scope/` — and answers the first page outside them.
 *
 * It answers `null` when there is nothing to add to a link to the list :
 *
 *  - **the reader came through the list itself** (`scope`) — a smart link to
 *    the list already says it ({@link module:helpers/routes/resolveSmartHref}) ;
 *  - **there is no such page** — a fresh entry, a reload, a trail not kept.
 *
 * Paths are compared without their query, which is a page's state, not its
 * identity ; the URL handed back keeps its own.
 *
 * @module helpers/routes/resolveOriginUrl
 *
 * @param {string[]} trail - The tab's trail, oldest first, the current page last.
 * @param {string}   scope - The pathname the records live under — their list (`/articles` for `/articles/12`). The root `/` scopes every page, and answers `null`.
 *
 * @returns {?string} The URL of the origin, query included, or `null`.
 *
 * @example
 * ```js
 * resolveOriginUrl( [ '/team/7' , '/articles/12' , '/articles/31' ] , '/articles' ) ; // '/team/7'
 * resolveOriginUrl( [ '/articles?offset=40' , '/articles/12' ] , '/articles' ) ;       // null — the list
 * resolveOriginUrl( [ '/articles/12' ] , '/articles' ) ;                               // null — a fresh entry
 * ```
 */

import pathnameOf from './pathnameOf' ;

/**
 * A pathname without its trailing slash, the root kept as an empty base.
 * @param {string} path
 * @returns {string}
 */
const baseOf = path => path.replace( /\/+$/ , '' ) ;

const resolveOriginUrl = ( trail , scope ) =>
{
    if ( !Array.isArray( trail ) || trail.length < 2 || typeof scope !== 'string' )
    {
        return null ;
    }

    const base = baseOf( pathnameOf( scope ) ) ;

    for ( let position = trail.length - 2 ; position >= 0 ; position-- )
    {
        const path = baseOf( pathnameOf( trail[ position ] ) ) ;

        if ( path === base )
        {
            return null ;
        }

        if ( path.startsWith( `${ base }/` ) )
        {
            continue ;
        }

        return trail[ position ] ;
    }

    return null ;
} ;

export default resolveOriginUrl ;
