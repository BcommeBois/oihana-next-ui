import { useState } from 'react'

/**
 * React hook to manage an array with utility methods.
 *
 * @template T
 * @param {T[]} [initialValue=[]] - The initial array value.
 *
 * @returns {[ T[] , { clear: () => void, push: (element: T) => void, remove: (index: number) => void, isEmpty: () => boolean, length: number } ]} A tuple containing the array and an object with utility methods.
 *
 * @example
 * ```js
 * const [ items , { push , remove , clear , isEmpty , length } ] = useArray( [] );
 *
 * push( 'apple' ) ;  // [ 'apple' ]
 * push( 'banana' ) ; // [ 'apple' , 'banana' ]
 * remove( 0 ) ;      // [ 'banana' ]
 * isEmpty() ;        // false
 * length ;           // 1
 * clear() ;          // []
 * ```
 */
const useArray = ( initialValue = [] ) =>
{
    const [ array , setArray ] = useState( initialValue );

    const clear = () =>
    {
        setArray( () => [] );
    };

    const push = element =>
    {
        setArray( oldValue => [ ...oldValue , element ] );
    };

    const remove = index =>
    {
        setArray( oldValue => oldValue.filter( ( _ , i ) => i !== index ) );
    }

    const isEmpty = () => array.length === 0;
    const length  = array.length ;

    return [ array , { clear , push , remove , isEmpty , length } ] ;
}

export default useArray ;