"use client" ;

import { useEffect } from "react" ;

import unregisterServiceWorkers from '../helpers/pwa/unregisterServiceWorkers' ;

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
 * Register-only : it does NOT detect updates. For the « update available →
 * reload » flow (new-version modal / banner), use the `useServiceWorkerUpdate`
 * hook instead — it registers the SW itself and surfaces `updateAvailable` +
 * `applyUpdate()`.
 *
 * 🔑 **Production only, by default.** A service worker has nothing to protect
 * on a development server, where every file changes at each save ; it fights
 * the hot reload with pages served from its cache, and one installed by a
 * production build on the same origin — `localhost`, for every project in
 * turn — keeps controlling it. So `enabled` defaults to
 * `process.env.NODE_ENV === 'production'`, a value the bundler settles at
 * build time ; and **disabled, the component removes any worker still
 * registered for the origin**, so a development server starts clean. Pass
 * `enabled` to test a worker on a development server anyway.
 *
 * @param {Object} props
 * @param {boolean} [props.enabled=process.env.NODE_ENV === 'production'] - Register at all. Off, every registration of the origin is removed instead.
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
 *
 * @example
 * ```jsx
 * // A worker tried on the development server
 * <ServiceWorker enabled />
 * ```
 */
const ServiceWorker =
({
     enabled = process.env.NODE_ENV === 'production' ,
     options ,
     path = '/sw.js' ,
 }) =>
{
    useEffect( () =>
    {
        if ( !( 'serviceWorker' in navigator ) )
        {
            return ;
        }

        if ( !enabled )
        {
            unregisterServiceWorkers().then( removed =>
            {
                if ( removed > 0 )
                {
                    console.log( `Service Worker not registered here : ${ removed } registration(s) removed.` ) ;
                }
            } ) ;

            return ;
        }

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
    , [ enabled , path , options ] ) ;

    return null ;
} ;

export default ServiceWorker ;
