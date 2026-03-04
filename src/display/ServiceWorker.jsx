"use client" ;

import { useEffect } from "react" ;

/**
 * @typedef {'classic' | 'module'} WorkerType
 */

/**
 * @typedef {'all' | 'imports' | 'none'} ServiceWorkerUpdateViaCache
 */

/**
 * @typedef {Object} RegistrationOptions
 * @property {string}                     [scope]          - Scope of the service worker.
 * @property {WorkerType}                 [type='classic'] - Worker type.
 * @property {ServiceWorkerUpdateViaCache} [updateViaCache='imports'] - Cache update strategy.
 */

/**
 * Registers the service worker on mount.
 * Renders nothing — this is a side-effect-only component.
 *
 * @param {Object} props
 * @param {string} [props.path='/sw.js'] - Service worker file path.
 * @param {RegistrationOptions} [props.options] - Service worker registration options.
 *
 * @example
 * ```jsx
 * <ServiceWorker />
 * ```
 *
 * @example
 * ```jsx
 * <ServiceWorker path="/custom-sw.js" />
 * ```
 *
 * @example
 * ```jsx
 * <ServiceWorker path="/sw.js" options={{ scope: '/app/' }} />
 * ```
 */
const ServiceWorker =
({
     options ,
     path = '/sw.js' ,
 }) =>
{
    useEffect( () =>
        {
            if ( !( 'serviceWorker' in navigator ) ) return ;

            navigator.serviceWorker
                .register( path , options )
                .then( registration =>
                {
                    console.log( 'Service Worker registered, scope:' , registration.scope ) ;
                })
                .catch( error =>
                {
                    console.error( 'Service Worker registration failed:' , error ) ;
                }) ;
        }
        , [ path , options ] ) ;

    return null ;
} ;

export default ServiceWorker ;