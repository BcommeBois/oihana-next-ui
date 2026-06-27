/**
 * Resolves the single "winning" link path for the current pathname :
 * among every `LINK` whose `path` matches (segment-aware), the LONGEST
 * one wins. This is what disambiguates a destination nested under another
 * — `/me/customers` wins over `/me`, so only « Mes clients » lights up,
 * not « Mon profil ». A profile sub-page with no dedicated link
 * (`/me/sessions`) has only `/me` as a match, so `/me` stays the winner.
 *
 * Pure, no React. Walks `COLLAPSE` children too (their own `path` is
 * undefined and simply skipped). Returns `null` when nothing matches.
 *
 * @module contexts/navigation/helpers/findActiveLinkPath
 *
 * @param {Object[]} [items]    - Navigation tree (the provider's internal array).
 * @param {string}   [pathname] - Current pathname.
 * @returns {string|null} The longest matching link path, or `null`.
 *
 * @example
 * ```js
 * findActiveLinkPath(
 *     [ { path: '/me' } , { path: '/me/customers' } ] ,
 *     '/me/customers/137'
 * ) ; // → '/me/customers'
 * ```
 */

import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

import isPathMatch from './isPathMatch' ;

const findActiveLinkPath = ( items , pathname ) =>
{
    if ( !Array.isArray( items ) || items.length === 0 || !notEmpty( pathname ) )
    {
        return null ;
    }

    let best = null ;

    const walk = list =>
    {
        for ( const item of list )
        {
            if ( !item )
            {
                continue ;
            }

            if ( notEmpty( item.path ) && isPathMatch( pathname , item.path ) )
            {
                if ( best === null || item.path.length > best.length )
                {
                    best = item.path ;
                }
            }

            if ( Array.isArray( item.items ) && item.items.length > 0 )
            {
                walk( item.items ) ;
            }
        }
    } ;

    walk( items ) ;

    return best ;
} ;

export default findActiveLinkPath ;