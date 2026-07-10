'use client' ;

/**
 * Message type the client posts to the waiting Service Worker to trigger the
 * swap. The SW must listen for `event.data.type === 'SKIP_WAITING'` and call
 * `self.skipWaiting()` — see the `sw.*.template.js` scaffolds.
 *
 * @type {string}
 */
export const SKIP_WAITING_MESSAGE = 'SKIP_WAITING' ;

/** Default Service Worker path, served from the app root. @type {string} */
const DEFAULT_SW_PATH = '/sw.js' ;

/** Default version manifest path (written by the app's inject-version). @type {string} */
const DEFAULT_VERSION_URL = '/version.json' ;

/** Default interval (ms) between proactive update checks. @type {number} */
const DEFAULT_CHECK_INTERVAL = 30 * 60 * 1_000 ;

/**
 * useServiceWorkerUpdate — registers the Service Worker and surfaces reactive
 * state when a *new* version is waiting to take over, following the canonical
 * PWA « update available → reload » pattern.
 *
 * Detection is driven by the browser : it re-fetches the SW on every navigation
 * (and periodically), and because the SW embeds the app version in its
 * `CACHE_NAME`, each release changes the bytes → a new worker installs and parks
 * in `waiting`. This hook watches that transition, optionally reads the next
 * version number from a JSON manifest, and exposes an imperative `applyUpdate()`
 * that swaps the worker and reloads once.
 *
 * ⚠️ Requires a SW that does NOT call `skipWaiting()` unconditionally and reacts
 * to a `{ type: 'SKIP_WAITING' }` message (see the `sw.*.template.js` scaffolds).
 * Renders no UI — the consuming app owns the modal / banner and its i18n.
 *
 * @param {Object}  [options]
 * @param {string}  [options.path='/sw.js']              - Service Worker file path.
 * @param {string}  [options.versionUrl='/version.json'] - Manifest read (no-store) to display the next version.
 * @param {string}  [options.currentVersion]             - The running bundle's version, echoed back for display.
 * @param {number}  [options.checkInterval=1800000]      - Interval (ms) for proactive `registration.update()`.
 * @param {boolean} [options.checkOnFocus=true]          - Also check for updates when the tab regains visibility.
 *
 * @returns {{
 *   updateAvailable : boolean ,
 *   currentVersion  : ( string | undefined ) ,
 *   nextVersion     : ( string | null ) ,
 *   applyUpdate     : ( () => void ) ,
 * }}
 *
 * @example
 * ```jsx
 * import version from 'oihana-next-ui/version' ;
 * import useServiceWorkerUpdate from 'oihana-next-ui/hooks/useServiceWorkerUpdate' ;
 *
 * const { updateAvailable , currentVersion , nextVersion , applyUpdate } =
 *     useServiceWorkerUpdate( { currentVersion : version } ) ;
 * ```
 */
import { useCallback , useEffect , useRef , useState } from 'react' ;

const useServiceWorkerUpdate = (
{
    path           = DEFAULT_SW_PATH ,
    versionUrl     = DEFAULT_VERSION_URL ,
    currentVersion ,
    checkInterval  = DEFAULT_CHECK_INTERVAL ,
    checkOnFocus   = true ,
} = {} ) =>
{
    const [ updateAvailable , setUpdateAvailable ] = useState( false ) ;
    const [ nextVersion     , setNextVersion     ] = useState( null ) ;

    const registrationRef = useRef( null ) ;
    const refreshingRef   = useRef( false ) ;

    useEffect( () =>
    {
        if ( typeof navigator === 'undefined' || !( 'serviceWorker' in navigator ) )
        {
            return ;
        }

        let cancelled = false ;

        const loadNextVersion = async () =>
        {
            try
            {
                const response = await fetch( versionUrl , { cache : 'no-store' } ) ;
                if ( !response.ok )
                {
                    throw new Error( `HTTP ${ response.status }` ) ;
                }
                const data = await response.json() ;
                if ( !cancelled ) { setNextVersion( data?.version ?? null ) ; }
            }
            catch ( error )
            {
                // Non-critical : the modal falls back to a version-less message.
                // A parse error here usually means the request was redirected
                // (e.g. auth middleware not allow-listing versionUrl).
                if ( process.env.NODE_ENV !== 'production' )
                {
                    console.warn( `[useServiceWorkerUpdate] could not read ${ versionUrl } :` , error?.message ?? error ) ;
                }
            }
        } ;

        // A worker sitting in `waiting` means a new build is ready to activate.
        const promoteWaiting = () =>
        {
            if ( cancelled ) { return ; }
            setUpdateAvailable( true ) ;
            loadNextVersion() ;
        } ;

        const watchInstalling = ( worker ) =>
        {
            if ( !worker ) { return ; }
            worker.addEventListener( 'statechange' , () =>
            {
                // `controller` present ⇒ this is an update over an existing
                // worker, not the very first install of the SW.
                if ( worker.state === 'installed' && navigator.serviceWorker.controller )
                {
                    promoteWaiting() ;
                }
            }) ;
        } ;

        navigator.serviceWorker
            .register( path )
            .then( registration =>
            {
                if ( cancelled ) { return ; }

                registrationRef.current = registration ;

                if ( registration.waiting && navigator.serviceWorker.controller )
                {
                    promoteWaiting() ;
                }

                registration.addEventListener( 'updatefound' , () =>
                {
                    watchInstalling( registration.installing ) ;
                }) ;
            })
            .catch( error =>
            {
                console.error( 'Service Worker registration failed:' , error ) ;
            }) ;

        // Proactive checks so a long-lived tab notices a release without a
        // navigation : on a timer, and whenever the tab regains focus.
        const checkForUpdate = () => registrationRef.current?.update?.() ;

        const timer = checkInterval > 0 ? setInterval( checkForUpdate , checkInterval ) : null ;

        const onVisibility = () =>
        {
            if ( document.visibilityState === 'visible' ) { checkForUpdate() ; }
        } ;

        if ( checkOnFocus )
        {
            document.addEventListener( 'visibilitychange' , onVisibility ) ;
        }

        return () =>
        {
            cancelled = true ;
            if ( timer ) { clearInterval( timer ) ; }
            if ( checkOnFocus ) { document.removeEventListener( 'visibilitychange' , onVisibility ) ; }
        } ;
    }
    , [ path , versionUrl , checkInterval , checkOnFocus ] ) ;

    const applyUpdate = useCallback( () =>
    {
        const registration = registrationRef.current ;
        const waiting      = registration?.waiting ;

        if ( !waiting )
        {
            // No worker to promote — just reload onto whatever is active.
            window.location.reload() ;
            return ;
        }

        // Reload exactly once, when the new worker takes control. Attached here
        // (not globally) so the first-ever install's `controllerchange` — fired
        // by `clients.claim()` — never triggers a spurious reload.
        navigator.serviceWorker.addEventListener( 'controllerchange' , () =>
        {
            if ( refreshingRef.current ) { return ; }
            refreshingRef.current = true ;
            window.location.reload() ;
        }) ;

        waiting.postMessage( { type : SKIP_WAITING_MESSAGE } ) ;
    }
    , [] ) ;

    return {
        updateAvailable ,
        currentVersion ,
        nextVersion ,
        applyUpdate ,
    } ;
} ;

export default useServiceWorkerUpdate ;
