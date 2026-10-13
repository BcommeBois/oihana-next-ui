'use client' ;

import { useCallback , useEffect , useRef , useState } from 'react' ;

import checkConnection from '../helpers/net/checkConnection' ;

/**
 * Whether the application can reach its server — not whether the device
 * has a network interface up, which is all `navigator.onLine` knows.
 *
 * The browser's `online` / `offline` events are the first signal ; each is
 * confirmed by `checkConnection`, a small `HEAD` of a file the application
 * serves. Offline, the check is tried again every `interval`, so the return
 * of the network is seen within that time ; online, nothing is asked until
 * the browser says otherwise. `since` is when the state last changed, and
 * `check()` asks now.
 *
 * The first render says online, as the server did : the truth comes with
 * the first check, after mount.
 *
 * @module hooks/useOnline
 *
 * @param {Object} [options]
 * @param {boolean} [options.enabled=true]
 * @param {number} [options.interval=30000] - Milliseconds between two checks while offline.
 * @param {Function} [options.onChange] - `( online ) => void` when the state changes.
 * @param {number} [options.timeout=5000] - Milliseconds a check waits for the server.
 * @param {string} [options.url='/version.json'] - What to ask the server for.
 *
 * @returns {{ check : Function , checking : boolean , online : boolean , since : ?number }}
 *
 * @example
 * ```jsx
 * const { online } = useOnline( { url : '/api/health' } ) ;
 * ```
 */
const useOnline = ( { enabled = true , interval = 30000 , onChange , timeout = 5000 , url = '/version.json' } = {} ) =>
{
    const [ online   , setOnline   ] = useState( true ) ;
    const [ checking , setChecking ] = useState( false ) ;
    const [ since    , setSince    ] = useState( null ) ;

    const latest = useRef( { onChange , online } ) ;

    useEffect( () =>
    {
        latest.current.onChange = onChange ;
    } ) ;

    const settle = useCallback( next =>
    {
        if ( latest.current.online !== next )
        {
            latest.current.online = next ;
            setOnline( next ) ;
            setSince( Date.now() ) ;
            latest.current.onChange?.( next ) ;
        }
    }
    , [] ) ;

    const check = useCallback( async () =>
    {
        setChecking( true ) ;

        const reached = await checkConnection( { timeout , url } ) ;

        setChecking( false ) ;
        settle( reached ) ;

        return reached ;
    }
    , [ settle , timeout , url ] ) ;

    useEffect( () =>
    {
        if ( !enabled || typeof window === 'undefined' )
        {
            return undefined ;
        }

        let timer = null ;

        const plan = () =>
        {
            clearTimeout( timer ) ;

            if ( !latest.current.online )
            {
                timer = setTimeout( async () => { await check() ; plan() ; } , interval ) ;
            }
        } ;

        const onEvent = async () =>
        {
            // The browser's word, confirmed : an interface up is not a server reached.
            if ( !navigator.onLine )
            {
                settle( false ) ;
            }
            else
            {
                await check() ;
            }

            plan() ;
        } ;

        window.addEventListener( 'online'  , onEvent ) ;
        window.addEventListener( 'offline' , onEvent ) ;

        onEvent() ;

        return () =>
        {
            clearTimeout( timer ) ;
            window.removeEventListener( 'online'  , onEvent ) ;
            window.removeEventListener( 'offline' , onEvent ) ;
        } ;
    }
    , [ check , enabled , interval , settle ] ) ;

    return { check , checking , online , since } ;
} ;

export default useOnline ;
