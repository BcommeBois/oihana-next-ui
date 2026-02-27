'use client' ;

import { useEffect } from 'react' ;

import courierPrime from '@/themes/fonts/courrierPrime';
import inter from '@/themes/fonts/inter';
import redHatMono from '@/themes/fonts/redHatMono';

import Image from 'next/image' ;

/**
 * Next.js global error boundary for root layout errors.
 *
 * Must include <html> and <body> tags since it replaces
 * the entire root layout when an error occurs.
 *
 * NOTE: No providers available here (no i18n, no themes).
 *
 * @param {Object} props
 * @param {Error & { digest?: string }} props.error - The error object.
 * @param {() => void} props.reset - Function to attempt recovery.
 */
const GlobalError = ( { error , reset } ) =>
{
    useEffect( () =>
    {
        console.error( '[GlobalError]' , error ) ;
    }
    , [ error ] ) ;

    return (
        <html
            className                = { `${inter.variable} ${redHatMono.variable} ${courierPrime.variable}` }
            lang                     = "en"
            suppressHydrationWarning = { true }
        >
            <body
                style=
                {{
                    display        : 'flex' ,
                    minHeight      : '100vh' ,
                    width          : '100%' ,
                    alignItems     : 'center' ,
                    justifyContent : 'center' ,
                }}
            >

                <div className="flex flex-col items-center space-y-4 bg-base-100 text-base-content">

                    <Image
                        className = "size-64"
                        src       = "/assets/errors/Error.svg"
                        alt       = "Error"
                        width     = { 256 }
                        height    = { 256 }
                        priority
                    />

                    <h2 className="text-2xl font-bold">
                        A critical error has occurred.
                    </h2>

                    <p className="text-warning">
                        { error.message }
                    </p>

                    <button
                        className = "btn btn-warning btn-wide"
                        onClick   = { reset }
                    >
                        Réessayer
                    </button>

                </div>

            </body>
        </html>
    ) ;
} ;

export default GlobalError ;