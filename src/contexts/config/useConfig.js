'use client' ;

import { use } from 'react' ;

import get from 'vegas-js-core/src/objects/get' ;

import ConfigContext from './context' ;

/**
 * @typedef {Object} AppConfig
 * @property {Object} sanitizeAll - Sanitize options to strip all HTML.
 * @property {Object} sanitizeOptions - Sanitize options that allow some HTML tags.
 */

/**
 * React hook to access configuration.
 *
 * @template T
 * @param {null} [path] - Dot notation path to a config value.
 * @param {*} [defaultValue={}] - Default value if path not found.
 *
 * @returns {AppConfig} The config value or entire config object.
 *
 * @example
 * ```js
 * // Get entire config
 * const config = useConfig() ;
 *
 * // Get nested value
 * const apiUrl = useConfig( 'api.baseUrl' , 'http://localhost' ) ;
 * ```
 */
const useConfig = ( path = null , defaultValue = {} ) =>
{
    const context = use( ConfigContext ) ;

    if ( !context )
    {
        throw new Error( 'useConfig must be used within a ConfigProvider' ) ;
    }

    const { config } = context ;

    if ( path )
    {
        return get( config , path , defaultValue ) ;
    }

    return config ?? defaultValue ;
} ;

export default useConfig ;