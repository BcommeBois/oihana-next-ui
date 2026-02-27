import { useEffect , useRef , useState } from 'react' ;

/**
 * React hook that provides setState with callback support (like class components).
 *
 * @template T
 * @param {T} initialValue - The initial state value.
 *
 * @returns {[ T , ( value: T , callback?: ( newValue: T ) => void ) => void ]} A tuple with state and setter.
 *
 * @example
 * ```js
 * const [ status , setStatus ] = useCallbackState( 'idle' ) ;
 *
 * const handleSave = () =>
 * {
 *     setStatus( 'saving' , ( newStatus ) => {
 *         console.log( 'Status is now:' , newStatus ) ;
 *     } ) ;
 * } ;
 * ```
 */
const useCallbackState = ( initialValue ) =>
{
    const [ state , _setState ] = useState( initialValue ) ;

    const callbackQueue = useRef( [] ) ;

    useEffect( () =>
    {
        if ( callbackQueue.current.length > 0 )
        {
            callbackQueue.current.forEach( ( callback ) => callback( state ) ) ;
            callbackQueue.current = [] ;
        }
    }
    , [ state ] ) ;

    const setState = ( newValue , callback ) =>
    {
        _setState( newValue ) ;
        if ( typeof callback === 'function' )
        {
            callbackQueue.current.push( callback ) ;
        }
    } ;

    return [ state , setState ] ;
} ;

export default useCallbackState ;