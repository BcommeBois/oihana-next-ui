/**
 * The navigation trail once the reader has moved to `url`.
 *
 * A trail is the short list of pages visited in a tab, the oldest first and the
 * current one last. It answers what a single « previous page » cannot : where
 * the reader was BEFORE a run of sibling pages — before the third record of a
 * list, say.
 *
 * Three moves, keyed on the **pathname** :
 *
 *  - **the same page, another query** — a list paged or filtered — REPLACES the
 *    last entry : a page appears once in a row, as it was last seen ;
 *  - **a move through the browser's history** (`pop` — its back or forward
 *    button) CUTS the trail back to the last visit of that page : the browser
 *    has just gone back there, and so does the trail ;
 *  - **any other move is pushed**, a link to a page seen earlier included, and
 *    the oldest entry drops out beyond `limit`.
 *
 * 🔑 **Only the browser's history cuts.** Following a link to a page already in
 * the trail is a new step, not a return : a record opened again from another
 * page now comes from THAT page. Cutting there would forget it.
 *
 * Pure : the same `trail` is handed back when nothing changes, so a state
 * setter fed with it does not re-render anything.
 *
 * @module helpers/routes/nextTrail
 *
 * @param {string[]} trail           - The trail so far, oldest first.
 * @param {string}   url             - The URL just reached, query included.
 * @param {number}   limit           - How many entries to keep. `0` or less keeps none and returns `trail` untouched.
 * @param {Object}   [options]
 * @param {boolean}  [options.pop=false] - The move came from the browser's history (`popstate`).
 *
 * @returns {string[]} The new trail — or `trail` itself when nothing changed.
 *
 * @example
 * ```js
 * nextTrail( [ '/home' , '/articles' ] , '/articles/12' , 20 ) ;                            // [ '/home' , '/articles' , '/articles/12' ]
 * nextTrail( [ '/articles' ] , '/articles?offset=40' , 20 ) ;                               // [ '/articles?offset=40' ]
 * nextTrail( [ '/home' , '/articles/12' , '/team' ] , '/articles/12' , 20 ) ;               // [ '/home' , '/articles/12' , '/team' , '/articles/12' ]
 * nextTrail( [ '/home' , '/articles/12' , '/team' ] , '/articles/12' , 20 , { pop : true } ) ; // [ '/home' , '/articles/12' ]
 * ```
 */

import pathnameOf from './pathnameOf' ;

const nextTrail = ( trail , url , limit , { pop = false } = {} ) =>
{
    if ( !Array.isArray( trail ) || typeof url !== 'string' || url === '' || !( limit > 0 ) )
    {
        return trail ;
    }

    const path = pathnameOf( url ) ;
    const last = trail.length - 1 ;

    if ( last >= 0 && pathnameOf( trail[ last ] ) === path )
    {
        return trail[ last ] === url ? trail : [ ...trail.slice( 0 , last ) , url ] ;
    }

    let next = null ;

    if ( pop )
    {
        for ( let position = last ; position >= 0 ; position-- )
        {
            if ( pathnameOf( trail[ position ] ) === path )
            {
                next = [ ...trail.slice( 0 , position ) , url ] ;
                break ;
            }
        }
    }

    next ??= [ ...trail , url ] ;

    return next.length > limit ? next.slice( next.length - limit ) : next ;
} ;

export default nextTrail ;
