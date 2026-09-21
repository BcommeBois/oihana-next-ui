/**
 * Remembers the ONE address that was just written « in place », so the shell's
 * scroll reset can tell it apart from a real move.
 *
 * `useResetScroll` sends the page back to the top whenever the path or the
 * query changes — right for a new page, wrong for a sort, a client-side page or
 * a period swapped over data already on screen. Naming such parameters in its
 * `ignore` list works until one is forgotten, and a generic name (`page`,
 * `year`) ignored for one screen is then ignored for every screen.
 *
 * So the WRITE is marked, not the name : whoever changes the address in place
 * — {@link module:hooks/useShallowParam}, the `navigate` of
 * {@link module:contexts/busyNavigation/provider} — records the exact address
 * it is going to, and the reset skips that move, and that move only. Any other
 * navigation, even to the same parameters, still goes back to the top. The mark
 * is spent by the next move, matched or not, so it can never linger.
 *
 * @module helpers/routes/inPlaceNavigation
 */

/**
 * The address last written in place, normalised, or `null`.
 * @type {?string}
 */
let pending = null ;

/**
 * `pathname?query`, with the query re-serialised so two spellings of one
 * address compare equal. The fragment plays no part : it does not reset
 * anything.
 *
 * @param {string} pathname
 * @param {string|URLSearchParams} search
 * @returns {string}
 */
const keyOf = ( pathname , search ) =>
{
    const query = new URLSearchParams( search ?? '' ).toString() ;
    return query ? `${ pathname }?${ query }` : pathname ;
} ;

/**
 * Marks `href` as the address about to be written in place.
 *
 * @param {string} href - Absolute, root-relative, or query-only (`?page=2`) : resolved against the current address.
 * @returns {void}
 */
export const markInPlace = ( href ) =>
{
    if ( typeof window === 'undefined' || href === undefined || href === null )
    {
        return ;
    }

    const url = new URL( String( href ) , window.location.href ) ;

    pending = keyOf( url.pathname , url.search ) ;
} ;

/**
 * Called on every move of the address : tells whether that move is the one
 * marked in place, and spends the mark either way.
 *
 * @param {string} pathname
 * @param {string|URLSearchParams} search
 * @returns {boolean} `true` when the move was written in place.
 */
export const consumeInPlace = ( pathname , search ) =>
{
    const marked = pending !== null && pending === keyOf( pathname , search ) ;

    pending = null ;

    return marked ;
} ;
