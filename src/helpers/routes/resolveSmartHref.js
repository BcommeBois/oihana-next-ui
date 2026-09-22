/**
 * The destination of a « back » affordance that carries the previous page's
 * query back with it.
 *
 * A record is usually opened from a list, and that list holds its page, its
 * sort and its criteria in the query string. Linking back to the list's
 * pathname alone drops all of it. When the previous page IS that list, its own
 * URL is the destination ; otherwise — a direct entry, a cross-reference
 * between two records, an external link — the declared `href` is, never an
 * unrelated previous page.
 *
 * The comparison is on the **pathname alone**, because the query is precisely
 * what differs, and precisely what is worth carrying back.
 *
 * @module helpers/routes/resolveSmartHref
 *
 * @param {?string}       previousUrl - The previous page's URL, query included. `null` on a fresh entry.
 * @param {string|Object} href        - The declared destination. Returned as is when it is not a string.
 *
 * @returns {string|Object} `previousUrl` when it is the same page as `href`, `href` otherwise.
 *
 * @example
 * ```js
 * resolveSmartHref( '/articles?offset=40&sort=name' , '/articles' ) ; // '/articles?offset=40&sort=name'
 * resolveSmartHref( '/settings' , '/articles' ) ;                     // '/articles'
 * resolveSmartHref( null , '/articles' ) ;                            // '/articles'
 * ```
 */

/**
 * The pathname of a URL string, without its query and without its hash.
 *
 * @param {string} url
 * @returns {string}
 */
const pathnameOf = url => String( url ).split( '#' )[ 0 ].split( '?' )[ 0 ] ;

const resolveSmartHref = ( previousUrl , href ) =>
{
    if ( typeof href !== 'string' || typeof previousUrl !== 'string' )
    {
        return href ;
    }

    return pathnameOf( previousUrl ) === pathnameOf( href ) ? previousUrl : href ;
} ;

export default resolveSmartHref ;
