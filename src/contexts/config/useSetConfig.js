'use client' ;

import { useContext } from 'react' ;

import ConfigContext from './context' ;

/**
 * React hook to update configuration.
 *
 * @returns {( config: Object ) => void}
 *
 * @example
 * ```js
 * const setConfig = useSetConfig() ;
 * setConfig( { theme: 'dark' } ) ;
 * ```
 */
const useSetConfig = () =>
{
    const context = useContext( ConfigContext ) ;

    if ( !context )
    {
        throw new Error( 'useSetConfig must be used within a ConfigProvider' ) ;
    }

    return context.setConfig ;
} ;

export default useSetConfig ;