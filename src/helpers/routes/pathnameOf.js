/**
 * The pathname of a URL string, without its query and without its hash.
 *
 * Two URLs name the same PAGE when their pathnames match : the query holds a
 * page's state (its offset, its sort, its criteria), not its identity.
 *
 * @module helpers/routes/pathnameOf
 *
 * @param {string} url - A URL, or a pathname with a query.
 * @returns {string} The pathname alone.
 *
 * @example
 * ```js
 * pathnameOf( '/articles?offset=40#top' ) ; // '/articles'
 * pathnameOf( '/articles' ) ;               // '/articles'
 * ```
 */
const pathnameOf = url => String( url ).split( '#' )[ 0 ].split( '?' )[ 0 ] ;

export default pathnameOf ;
