'use client' ;

/**
 * PreviousPathProvider — remembers the page that was left, so the way back can
 * be a link rather than a guess.
 *
 * 🚨 **The whole URL, query included — that is the point.** A list keeps its
 * page and its criteria in the query string : remembering the pathname alone
 * would send a reader back to the first page of a list they had walked deep
 * into. It is also why the effect below declares **no dependency array** — a
 * query-only move does not change `pathname` and would otherwise go unseen.
 *
 * 🔑 **Published as state**, so a consumer knows its destination while
 * rendering. The cost is one re-render of the consumers per navigation, which
 * is a handful of small links.
 *
 * Mount it once, high enough to stay mounted across the navigations it must
 * observe — a root layout, or the client shell every page of the application
 * renders inside. Mounted inside a page, it would be unmounted by the very
 * navigation it is there to remember.
 *
 * **A trail, on request.** With `trailLimit` above zero it also keeps the last
 * pages visited in the tab ({@link module:helpers/routes/nextTrail}) — only
 * the browser's own back and forward cut it, every link adds a step — so a
 * record opened from somewhere else than its list can say where the reader came
 * from, even after a few sibling records ({@link module:contexts/previousPath/useOriginUrl}).
 * Off by default : the trail costs nothing until it is asked for. It lives in
 * memory, so a reload starts a new one.
 *
 * @module contexts/previousPath/provider
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.children
 * @param {number}          [props.trailLimit=0] - How many pages the trail keeps. `0` keeps no trail.
 *
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * <PreviousPathProvider>
 *     { children }
 * </PreviousPathProvider>
 *
 * // With a trail of the last twenty pages
 * <PreviousPathProvider trailLimit={ 20 }>
 *     { children }
 * </PreviousPathProvider>
 * ```
 */

import { useEffect , useMemo , useRef , useState } from 'react' ;

import { usePathname } from 'next/navigation' ;

import nextTrail from '../../helpers/routes/nextTrail' ;

import PreviousPathContext , { EMPTY_TRAIL } from './context' ;

const PreviousPathProvider = ( { children , trailLimit = 0 } ) =>
{
    const pathname = usePathname() ;

    const [ previousUrl , setPreviousUrl ] = useState( null ) ;
    const [ trail       , setTrail       ] = useState( EMPTY_TRAIL ) ;

    const currentPathRef = useRef( pathname ) ;
    const currentUrlRef  = useRef( null ) ;
    const popRef         = useRef( false ) ;

    // The browser's back and forward buttons fire `popstate` before the router
    // renders the page they lead to : the flag tells the effect below that this
    // move is a return, which is the only move that cuts the trail.
    useEffect( () =>
    {
        if ( !( trailLimit > 0 ) )
        {
            return undefined ;
        }

        const onPop = () =>
        {
            popRef.current = true ;
        } ;

        window.addEventListener( 'popstate' , onPop ) ;

        return () => window.removeEventListener( 'popstate' , onPop ) ;
    } , [ trailLimit ] ) ;

    // 🚨 No dependency array : see the note above. The URL of the page being
    // LEFT cannot be read here — `window.location` already shows the new one —
    // so it is carried forward from the previous run.
    useEffect( () =>
    {
        const url = `${ window.location.pathname }${ window.location.search }` ;

        if ( currentPathRef.current !== pathname )
        {
            setPreviousUrl( currentUrlRef.current ) ;
            currentPathRef.current = pathname ;
        }

        if ( trailLimit > 0 && url !== currentUrlRef.current )
        {
            const pop = popRef.current ;
            setTrail( current => nextTrail( current , url , trailLimit , { pop } ) ) ;
        }

        popRef.current = false ;

        currentUrlRef.current = url ;
    } ) ;

    const value = useMemo( () => ( { previousUrl , trail } ) , [ previousUrl , trail ] ) ;

    return (
        <PreviousPathContext value={ value }>
            { children }
        </PreviousPathContext>
    ) ;
} ;

PreviousPathProvider.displayName = 'PreviousPathProvider' ;

export default PreviousPathProvider ;
