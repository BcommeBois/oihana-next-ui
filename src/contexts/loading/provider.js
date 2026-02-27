'use client' ;

import { useState } from 'react' ;

import LoadingContext from './context' ;

/**
 * Provides global loading state.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 *
 * @returns {React.ReactElement} The loading context provider.
 *
 * @example
 * ```jsx
 * <LoadingProvider>
 *     <App />
 * </LoadingProvider>
 * ```
 */
const LoadingProvider = ( { children } ) =>
{
    const [ loading , setLoading ] = useState( false ) ;

    return (
        <LoadingContext value={ { loading , setLoading } }>
            { children }
        </LoadingContext>
    ) ;
} ;

export default LoadingProvider ;