import { useEffect , useRef , useState } from 'react' ;

/**
 * React hook that delays state initialization until a condition is met.
 *
 * @template T
 * @param {T} initialValue - The initial state value (applied when condition becomes true).
 * @param {boolean} condition - When true, initializes the state.
 *
 * @returns {[ T | null , ( value: T ) => void , boolean ]} A tuple with state, setter, and initialized flag.
 *
 * @example
 * ```js
 * // Wait for user data before initializing form
 * const [ formData , setFormData , isReady ] = useDelayedState
 * (
 *     { name: user?.name , email: user?.email } ,
 *     user !== null
 * ) ;
 *
 * if ( !isReady )
 * {
 *    return <Loading /> ;
 * }
 *
 * return <Form data={ formData } onChange={ setFormData } /> ;
 * ```
 */
const useDelayedState = ( initialValue , condition ) =>
{
    const initialRef = useRef( initialValue ) ;

    const [ state , setState ] = useState( null ) ;
    const [ initialized , setInitialized ] = useState( false ) ;

    useEffect( () =>
    {
        if ( !initialized && condition )
        {
            setState( initialRef.current ) ;
            setInitialized( true ) ;
        }
    }
    , [ condition , initialized ] ) ;

    const updateState = ( newValue ) =>
    {
        if ( !initialized ) return ;
        setState( newValue ) ;
    } ;

    return [ state , updateState , initialized ] ;
} ;

export default useDelayedState ;