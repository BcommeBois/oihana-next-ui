'use client' ;

/**
 * Scrolls a container back to the top when the route changes.
 *
 * @module hooks/useResetScroll
 */

import { useEffect , useMemo , useRef }     from 'react' ;
import { usePathname , useSearchParams }    from 'next/navigation' ;

/**
 * Where the reset lands when no ref is given.
 * @type {string}
 */
export const SCROLL_CONTAINER_CLASS = 'drawer-content' ;

/**
 * Builds the string two routes are compared on — the pathname, and the query
 * string minus the parameters the caller asked to ignore.
 *
 * **Why a string and not the objects.** `useSearchParams` hands back a fresh
 * instance on every navigation, so an effect depending on it fires even when
 * nothing it cares about moved. Comparing a *value* rather than an identity is
 * what makes the filter possible at all, and it removes that defect on the way.
 *
 * @param {string} [pathname] - The current path.
 * @param {URLSearchParams} [searchParams] - The current query string.
 * @param {Set<string>} ignored - The parameters that do not move the page.
 * @returns {string} The signature.
 */
const signatureOf = ( pathname , searchParams , ignored ) =>
{
    const entries = [] ;

    searchParams?.forEach( ( value , key ) =>
    {
        if ( !ignored.has( key ) )
        {
            entries.push( `${ key }=${ value }` ) ;
        }
    } ) ;

    // Sorted, so `?a=1&b=2` and `?b=2&a=1` are the same page — which they are.
    return `${ pathname ?? '' }?${ entries.sort().join( '&' ) }` ;
} ;

/**
 * Resets the scroll position when the route changes.
 *
 * **`ignore` names the parameters that do not move the page.** A list going to
 * page four belongs at the top of page four — that is what this hook was
 * written for — but a control swapping one card in place writes a query
 * parameter too, and sending the reader back to the top is the one thing
 * nobody asked for. `router.push( … , { scroll : false } )` does not help :
 * Next honours that flag, this hook is not Next.
 *
 * 🚨 **A navigation is ignored only when *everything* that moved is ignored.**
 * One control can write a parameter and drop others in the same push — a year
 * picker resetting an offset, a filter clearing a page number. Ignoring the
 * one it writes is not enough, and the comparison above gives that rule for
 * free : the dropped parameter leaves the signature, so the reset fires unless
 * it was on the list too.
 *
 * The hook still fires on mount, deliberately : a first paint at the top is
 * right.
 *
 * **This is not a save-and-restore, and it must not become one.** React
 * flushes every passive effect of one commit in a single task, children before
 * parents, so an effect in a child always runs *before* a reset mounted in the
 * shell — restoring a saved offset from there is a race that happens to work.
 * Not firing is the only stable answer.
 *
 * @param {React.RefObject} [ref] - The scroll container. Without one, the first `.drawer-content` on the page, then `window`.
 * @param {Object|boolean} [options] - The options below. **A boolean is the deprecated form** — `useResetScroll( ref , true )` still means `disabled`, along with the third and fourth arguments, for one more minor.
 * @param {ScrollBehavior} [options.behavior='auto'] - Scroll behavior. An instant jump by default : on a route change the outgoing, longer page is still mounted while the incoming RSC arrives, so a `'smooth'` animation would reveal an unpainted band below the new content mid-scroll. Pass `'smooth'` only for an intra-page reset where the height does not change.
 * @param {boolean} [options.disabled=false] - Turns the reset off entirely. Coarse — prefer `ignore`.
 * @param {string[]} [options.ignore] - Query parameters whose change does not move the page.
 * @param {string} [options.scrollClassName='drawer-content'] - Class of the fallback scroll container.
 *
 * @example
 * ```js
 * // A year picker writing `?topYear=` swaps a card in place : stay put.
 * useResetScroll( contentRef , { ignore : [ 'topYear' ] } ) ;
 * ```
 */
const useResetScroll = ( ref , options , legacyScrollClassName , legacyBehavior ) =>
{
    // The pre-0.15 call shape — `( ref , disabled , scrollClassName , behavior )`.
    const legacy = typeof options === 'boolean' ;

    const {
        behavior = 'auto' ,
        disabled = false ,
        ignore ,
        scrollClassName = SCROLL_CONTAINER_CLASS ,
    } = ( legacy
        ? { behavior : legacyBehavior , disabled : options , scrollClassName : legacyScrollClassName }
        : options ) ?? {} ;

    const pathname     = usePathname() ;
    const searchParams = useSearchParams() ;

    // A literal array is a new one on every render : joined, the list enters the
    // memo by value. Left as an array it would rebuild the signature every time,
    // which is the very defect this hook is being cured of.
    const ignoreKey = ignore?.join( '|' ) ?? '' ;

    const signature = useMemo
    (
        () => signatureOf( pathname , searchParams , new Set( ignoreKey ? ignoreKey.split( '|' ) : [] ) ) ,
        [ pathname , searchParams , ignoreKey ] ,
    ) ;

    const previous = useRef( null ) ;

    useEffect( () =>
    {
        // The route moving is what resets the scroll — not the effect running.
        // Without this the hook would also fire when one of its own options
        // changed mid-life, sending the reader to the top of a page that had
        // not gone anywhere. `null` on the first pass makes mounting a move,
        // which it is.
        const moved = previous.current !== signature ;

        // Recorded even while disabled : switching the reset back on is not a
        // navigation, and should not act as though it were one.
        previous.current = signature ;

        if ( disabled || !moved )
        {
            return ;
        }

        const element = ref?.current
            ?? document.querySelector( `.${ scrollClassName }` )
            ?? window ;

        element.scrollTo( { top : 0 , behavior } ) ;
    }
    , [ behavior , disabled , ref , scrollClassName , signature ] ) ;
} ;

export default useResetScroll ;
