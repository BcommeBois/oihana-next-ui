'use client' ;

import { useState } from 'react' ;

import ConfigContext from './context' ;

/**
 * Provides configuration context to the app.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Object} props.init - Initial configuration object.
 */
const ConfigProvider = ( { children , init } ) =>
{
    const [ config , setConfig ] = useState( init ) ;

    return (
        <ConfigContext value={ { config , setConfig } }>
            { children }
        </ConfigContext>
    ) ;
} ;

export default ConfigProvider ;