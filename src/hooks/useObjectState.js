import { useRef , useState } from 'react' ;

import isPlainObject from 'vegas-js-core/src/isPlainObject' ;

/**
 * React hook to manage complex state objects with partial updates.
 *
 * @template T
 * @param {T} initialValue - The initial state object.
 *
 * @returns {[ T , ( arg: Partial<T> | ( ( prev: T ) => Partial<T> ) ) => void , () => void ]}
 * A tuple with state, update function, and reset function.
 *
 * @example
 * ```js
 * const [ user , updateUser , resetUser ] = useObjectState( {
 *     name  : '' ,
 *     email : '' ,
 *     age   : 0
 * } ) ;
 *
 * // Partial update
 * updateUser( { name: 'John' } ) ;
 *
 * // Functional update
 * updateUser( ( prev ) => ( { age: prev.age + 1 } ) ) ;
 *
 * // Reset to initial
 * resetUser() ;
 * ```
 */
const useObjectState = ( initialValue ) =>
{
    const initialRef = useRef( initialValue ) ;

    const [ state , setState ] = useState( initialValue ) ;

    const update = ( arg ) =>
    {
        setState( ( previousState ) =>
        {
            const newValue = typeof arg === 'function' ? arg( previousState ) : arg ;

            if ( isPlainObject( newValue ) )
            {
                return { ...previousState , ...newValue } ;
            }

            return previousState ;
        } ) ;
    } ;

    const reset = () =>
    {
        setState( initialRef.current ) ;
    } ;

    return [ state , update , reset ] ;
} ;

export default useObjectState ;