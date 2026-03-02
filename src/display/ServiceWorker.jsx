"use client" ;

import { useEffect } from "react" ;

/**
 * Registers the service worker on mount.
 * Renders nothing — this is a side-effect-only component.
 */
const ServiceWorker = () =>
{
    useEffect( () =>
    {
        if ( "serviceWorker" in navigator )
        {
            navigator.serviceWorker
                .register( "/sw.js" )
                .then( ( registration ) =>
                {
                    console.log( "Service Worker registered, scope:" , registration.scope ) ;
                })
                .catch( ( error ) =>
                {
                    console.error( "Service Worker registration failed:" , error ) ;
                }) ;
        }
    }, [] ) ;

    return null ;
} ;

export default ServiceWorker ;