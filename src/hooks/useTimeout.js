import { useEffect, useRef, useState } from 'react' ;

/**
 * React hook to manage timeouts with start/stop controls.
 *
 * @param {() => void} callback - The function to execute when the timeout elapses.
 * @param {number} delay - The duration in milliseconds.
 * @param {boolean} [autoStart=false] - Whether to start the timeout immediately.
 *
 * @returns {[ () => void , () => void , boolean ]} A tuple with start, stop functions and running state.
 *
 * @example
 * ```js
 * const [ start , stop , isRunning ] = useTimeout( () =>
 * {
 *     console.log( 'Done!' ) ;
 * } , 2000 ) ;
 *
 * <button onClick={ start }>Start</button>
 * <button onClick={ stop }>Stop</button>
 * <span>{ isRunning ? 'Running...' : 'Idle' }</span>
 * ```
 */
const useTimeout = ( callback , delay , autoStart = false ) =>
{
    const timeoutRef  = useRef( null ) ;
    const callbackRef = useRef( callback ) ;

    const [ isRunning , setIsRunning ] = useState( false ) ;

    useEffect( () =>
    {
        callbackRef.current = callback ;
    }
    , [ callback ] ) ;

    const stop = () =>
    {
        if ( timeoutRef.current )
        {
            clearTimeout( timeoutRef.current ) ;
            timeoutRef.current = null ;
        }
        setIsRunning( false ) ;
    } ;

    const start = () =>
    {
        stop() ;
        setIsRunning( true ) ;
        timeoutRef.current = setTimeout( () =>
        {
            setIsRunning( false ) ;
            callbackRef.current() ;
        }
        , delay ) ;
    } ;

    useEffect( () =>
    {
        if ( autoStart )
        {
            start() ;
        }
        return stop ;
    }
    , [] ) ;

    return [ start , stop , isRunning ] ;
} ;

export default useTimeout ;