'use client' ;

/**
 * BusyNavigationProvider — one transition for a whole screen, so the data knows
 * a control was touched.
 *
 * A screen changes shape from several places : a pagination, a period, a sort,
 * a filter, a search. When each owns a private `useTransition`, only THAT
 * control greys out — the figures underneath stay on screen, unchanged and
 * wrong, for as long as the request takes. Pushed through one transition, every
 * control feeds a single pending state, and the surface showing the data can
 * say it is being replaced.
 *
 * 🚨 **The pending state is HELD for a short floor** (`minimumVisible`). A fast
 * server answers in a hundred milliseconds or so : the transition opens and
 * closes faster than a fade, the surface flickers, and a reader watching for it
 * sees nothing — which teaches that the control did not respond. The floor is
 * short enough never to feel like lag, long enough to be read.
 *
 * ⚠️ **It wraps Server-rendered children.** The provider is a Client Component,
 * its children need not be : a server page renders its table inside it and the
 * table stays on the server. That is why the state travels by context.
 *
 * `navigate` pushes with `scroll : false` and marks the address as written in
 * place ({@link module:helpers/routes/inPlaceNavigation}), so the shell's scroll
 * reset does not send the page to the top either : these navigations replace a
 * list where it stands, and a jump to the top is the reader losing their line.
 *
 * @module contexts/busyNavigation/provider
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.children
 * @param {number}          [props.minimumVisible=400] - How long `busy` stays up at the very least, in milliseconds.
 *
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * <BusyNavigationProvider>
 *     <Toolbar />                 // controls call navigate( href )
 *     <BusySurface>
 *         <Table rows={ rows } />
 *     </BusySurface>
 *     <Pagination />
 * </BusyNavigationProvider>
 * ```
 */

import { useCallback , useEffect , useMemo , useRef , useState , useTransition } from 'react' ;

import { useRouter } from 'next/navigation' ;

import { markInPlace } from '../../helpers/routes/inPlaceNavigation' ;

import BusyNavigationContext from './context' ;

/**
 * Default floor, in milliseconds. Under roughly a quarter of a second a change
 * of state reads as a glitch ; over half a second a fast answer starts feeling
 * held back.
 * @type {number}
 */
export const MINIMUM_VISIBLE = 400 ;

const BusyNavigationProvider = ( { children , minimumVisible = MINIMUM_VISIBLE } ) =>
{
    const router = useRouter() ;

    const [ pending , startNavigation ] = useTransition() ;

    // What the surface actually reads : the transition, kept up for a floor.
    const [ busy , setBusy ] = useState( false ) ;

    const startedAt = useRef( 0 ) ;

    useEffect( () =>
    {
        if ( pending )
        {
            startedAt.current = Date.now() ;
            setBusy( true ) ;
            return ;
        }

        if ( !busy ) { return ; }

        const remaining = Math.max( 0 , minimumVisible - ( Date.now() - startedAt.current ) ) ;

        if ( remaining === 0 ) { setBusy( false ) ; return ; }

        const timer = setTimeout( () => setBusy( false ) , remaining ) ;

        return () => clearTimeout( timer ) ;
    } ,
    [ busy , minimumVisible , pending ] ) ;

    const navigate = useCallback(
        ( href ) =>
        {
            // In place by definition : the shell's scroll reset is told so.
            markInPlace( href ) ;
            startNavigation( () => { router.push( href , { scroll : false } ) ; } ) ;
        } ,
        [ router ] ,
    ) ;

    const value = useMemo( () => ( { busy , navigate } ) , [ busy , navigate ] ) ;

    return (
        <BusyNavigationContext value={ value }>
            { children }
        </BusyNavigationContext>
    ) ;
} ;

BusyNavigationProvider.displayName = 'BusyNavigationProvider' ;

export default BusyNavigationProvider ;
