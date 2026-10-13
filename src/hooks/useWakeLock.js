'use client' ;

import { useCallback , useEffect , useRef , useState } from 'react' ;

/**
 * Keeps the screen on — a picking list read for ten minutes, a document
 * followed on a bench, a recipe cooked from.
 *
 * On the Screen Wake Lock API. The lock is asked for on mount (or once
 * `enabled` turns true) and let go on unmount. 🔑 **The browser releases it
 * by itself** when the tab goes to the background or the screen is turned
 * off ; coming back to the tab does not bring it back — the hook asks again
 * on `visibilitychange`, or the screen would go dark a minute after the
 * return, with nothing to say why.
 *
 * `supported` is false where the API is absent (Firefox, older Safari ; iOS
 * Safari has it since 16.4) and on a plain `http` origin ; `active` says
 * whether the lock is held right now, `error` what the last request said.
 * The screen staying on is a choice of the moment, not a setting : nothing
 * is stored.
 *
 * @module hooks/useWakeLock
 *
 * @param {Object} [options]
 * @param {boolean} [options.enabled=true] - Hold the lock ; false lets go.
 *
 * @returns {{ active : boolean , error : ?Error , release : Function , request : Function , supported : boolean }}
 *
 * @example
 * ```jsx
 * const { active , supported } = useWakeLock( { enabled : picking } ) ;
 * ```
 */
const useWakeLock = ( { enabled = true } = {} ) =>
{
    const [ supported , setSupported ] = useState( false ) ;
    const [ active    , setActive    ] = useState( false ) ;
    const [ error     , setError     ] = useState( null ) ;

    const sentinel = useRef( null ) ;
    const wanted   = useRef( enabled ) ;

    useEffect( () =>
    {
        setSupported( typeof navigator !== 'undefined' && 'wakeLock' in navigator ) ;
    }
    , [] ) ;

    const request = useCallback( async () =>
    {
        if ( typeof navigator === 'undefined' || !( 'wakeLock' in navigator ) || sentinel.current || document.visibilityState !== 'visible' )
        {
            return false ;
        }

        try
        {
            const lock = await navigator.wakeLock.request( 'screen' ) ;

            sentinel.current = lock ;
            setActive( true ) ;
            setError( null ) ;

            lock.addEventListener( 'release' , () =>
            {
                if ( sentinel.current === lock )
                {
                    sentinel.current = null ;
                    setActive( false ) ;
                }
            } ) ;

            return true ;
        }
        catch ( failure )
        {
            setError( failure ) ;
            setActive( false ) ;
            return false ;
        }
    }
    , [] ) ;

    const release = useCallback( async () =>
    {
        const lock = sentinel.current ;

        sentinel.current = null ;
        setActive( false ) ;

        if ( lock )
        {
            await lock.release().catch( () => {} ) ;
        }
    }
    , [] ) ;

    // Held while wanted and visible ; asked again when the tab comes back.
    useEffect( () =>
    {
        wanted.current = enabled ;

        if ( !enabled )
        {
            release() ;
            return undefined ;
        }

        request() ;

        const onVisibility = () =>
        {
            if ( document.visibilityState === 'visible' && wanted.current )
            {
                request() ;
            }
        } ;

        document.addEventListener( 'visibilitychange' , onVisibility ) ;

        return () =>
        {
            document.removeEventListener( 'visibilitychange' , onVisibility ) ;
            release() ;
        } ;
    }
    , [ enabled , release , request ] ) ;

    return { active , error , release , request , supported } ;
} ;

export default useWakeLock ;
