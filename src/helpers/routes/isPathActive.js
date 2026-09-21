/**
 * Tells whether a link should read as active for the current path.
 *
 * Pure, so it can be called where a hook cannot — a tab bar resolving every
 * tab in one render pass. {@link module:hooks/useActiveLink} is built on it.
 *
 * - `exact` (the default) : active on that page only.
 * - `exact : false` : active on that page AND anywhere below it — `/customers`
 *   lights up on `/customers/12/quotes`, never on `/customersX`, since the
 *   match stops at a path segment.
 * - `/` is always judged exactly : below the root is everywhere, and a « Home »
 *   link lit on every page tells nothing.
 *
 * @module helpers/routes/isPathActive
 *
 * @param {?string}                     pathname          - The current path (`usePathname()`).
 * @param {string|{pathname?: string}}  href              - The link's destination, a string or a route object.
 * @param {Object}                      [options]
 * @param {boolean}                     [options.exact=true] - Match the page only, or the page and everything below it.
 * @returns {boolean}
 *
 * @example
 * ```js
 * isPathActive( '/customers/12' , '/customers' ) ;                     // false
 * isPathActive( '/customers/12' , '/customers' , { exact : false } ) ; // true
 * isPathActive( '/customersX'   , '/customers' , { exact : false } ) ; // false
 * isPathActive( '/customers'    , '/'          , { exact : false } ) ; // false
 * ```
 */
const isPathActive = ( pathname , href , { exact = true } = {} ) =>
{
    const target = typeof href === 'object' && href !== null
        ? ( href.pathname ?? null )
        : href ;

    if ( !target || !pathname )
    {
        return false ;
    }

    if ( pathname === target )
    {
        return true ;
    }

    if ( exact || target === '/' )
    {
        return false ;
    }

    const base = target.endsWith( '/' ) ? target.slice( 0 , -1 ) : target ;

    return pathname.startsWith( `${ base }/` ) ;
} ;

export default isPathActive ;
