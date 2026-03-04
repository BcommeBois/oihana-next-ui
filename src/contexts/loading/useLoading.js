'use client' ;

import { use } from 'react' ;

import LoadingContext from './context' ;

/**
 * Access the loading context.
 *
 * @returns {import('./context').LoadingContextValue} The loading state and setter.
 *
 * @throws {Error} If used outside of LoadingProvider.
 *
 * @example
 * ```jsx
 * const { loading , setLoading } = useLoading() ;
 *
 * setLoading( true ) ;
 *
 * // ... async operation
 *
 * setLoading( false ) ;
 * ```
 */
const useLoading = () =>
{
    const context = use( LoadingContext ) ;

    if ( !context )
    {
        throw new Error( 'useLoading must be used within a LoadingProvider.' ) ;
    }

    return context ;
} ;

export default useLoading ;