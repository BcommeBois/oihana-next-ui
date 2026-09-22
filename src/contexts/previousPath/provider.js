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
 * @module contexts/previousPath/provider
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.children
 *
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * <PreviousPathProvider>
 *     { children }
 * </PreviousPathProvider>
 * ```
 */

import { useEffect , useMemo , useRef , useState } from 'react' ;

import { usePathname } from 'next/navigation' ;

import PreviousPathContext from './context' ;

const PreviousPathProvider = ( { children } ) =>
{
    const pathname = usePathname() ;

    const [ previousUrl , setPreviousUrl ] = useState( null ) ;

    const currentPathRef = useRef( pathname ) ;
    const currentUrlRef  = useRef( null ) ;

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

        currentUrlRef.current = url ;
    } ) ;

    const value = useMemo( () => ( { previousUrl } ) , [ previousUrl ] ) ;

    return (
        <PreviousPathContext value={ value }>
            { children }
        </PreviousPathContext>
    ) ;
} ;

PreviousPathProvider.displayName = 'PreviousPathProvider' ;

export default PreviousPathProvider ;
