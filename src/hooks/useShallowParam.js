'use client' ;

/**
 * A URL parameter that changes **nothing on the server** — a sort, a page
 * number, a view toggle over data the browser already holds.
 *
 * 🚨 **The problem it exists for.** `router.push` / `router.replace` re-run the
 * Server Component tree, which means re-issuing every request the page made.
 * Re-sorting rows already sitting in memory would then cost several network
 * round-trips and a visible wait, for an operation that is pure display. And
 * `useState` alone would make the state unshareable, which is the whole reason
 * such controls live in the URL.
 *
 * So : **`window.history.replaceState`**, which Next supports natively and which
 * rewrites the address bar without touching the router. The link stays
 * copyable, the server is not asked anything, and nothing re-fetches.
 *
 * ⚠️ **The rendered value is local state, not `useSearchParams()`.** Reading the
 * hook would tie the component to whether Next chooses to propagate a shallow
 * history write — a detail that has moved between versions. Seeding from the URL
 * once and owning the value afterwards behaves the same in every version, and
 * `popstate` is listened to so the browser's Back button still puts the control
 * back where the address bar says it is.
 *
 * 🚨 **Not for a parameter the server reads.** A period, a filter, a page of a
 * SERVER-paginated list change what must be fetched : those belong to a plain
 * `router.push` (see {@link module:contexts/busyNavigation/provider}), which
 * re-renders the tree on purpose. Used on a server-read parameter, this hook
 * would leave the screen showing one thing and the URL claiming another.
 *
 * @module hooks/useShallowParam
 */

import { useCallback , useEffect , useState } from 'react' ;

import { markInPlace } from '../helpers/routes/inPlaceNavigation' ;

/**
 * Reads one parameter out of the current address bar.
 *
 * @param {string} name
 * @returns {?string}
 */
const read = ( name ) =>
{
    if ( typeof window === 'undefined' ) { return null ; }

    return new URLSearchParams( window.location.search ).get( name ) ;
} ;

/**
 * @param {string}  name            - The query parameter.
 * @param {*}       [initial]       - Value when the URL carries none. Also what a `null` write falls back to.
 * @returns {[ string , ( value : * ) => void ]} The current value and a setter that rewrites the URL in place.
 *
 * @example
 * ```js
 * const [ sort , setSort ] = useShallowParam( 'sort' , 'name' ) ;
 *
 * <button onClick={ () => setSort( 'date' ) }>Sort by date</button>
 * ```
 */
const useShallowParam = ( name , initial = '' ) =>
{
    // Seeded on the server with `initial` — the markup then matches what the
    // client paints on its first frame, and the URL is applied right after.
    const [ value , setValue ] = useState( initial ) ;

    useEffect( () =>
    {
        const sync = () => setValue( read( name ) ?? initial ) ;

        sync() ;

        // The address bar can move without this component asking : the Back
        // button, or another control writing the same way.
        window.addEventListener( 'popstate' , sync ) ;

        return () => window.removeEventListener( 'popstate' , sync ) ;
    } , [ initial , name ] ) ;

    const set = useCallback( ( next ) =>
    {
        setValue( next ?? initial ) ;

        if ( typeof window === 'undefined' ) { return ; }

        const params = new URLSearchParams( window.location.search ) ;

        // A parameter back at its default leaves the URL rather than sitting
        // there saying nothing — a shared link should carry what was chosen,
        // not every control that was left alone.
        if ( next === null || next === undefined || next === '' || next === initial )
        {
            params.delete( name ) ;
        }
        else
        {
            params.set( name , String( next ) ) ;
        }

        const query = params.toString() ;

        // 🚨 **The fragment is carried over, and it has to be written back.** A
        // relative reference made of a query string alone resolves against the
        // current address and DROPS its hash — that is how URLs resolve, not a
        // browser quirk. A reader who arrived on `…/page#section` and then moved
        // a control would find the anchor gone from the address bar : nothing
        // moves on screen, and the link they copy next no longer opens where
        // they are looking.
        //
        // Empty on every screen that carries no anchor, where this is a no-op.
        const hash = window.location.hash ;

        const href = ( query ? `?${ query }` : window.location.pathname ) + hash ;

        // Said BEFORE the write : Next syncs `useSearchParams` on it, and the
        // shell's scroll reset would otherwise read a new page and jump to the top.
        markInPlace( href ) ;

        window.history.replaceState( null , '' , href ) ;
    } , [ initial , name ] ) ;

    return [ value , set ] ;
} ;

export default useShallowParam ;
