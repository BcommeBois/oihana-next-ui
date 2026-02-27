'use client' ;

import { useEffect } from 'react' ;

import Image from 'next/image' ;

import SlideUp from '@/motions/SlideUp' ;

import useI18n from '@/contexts/locale' ;

/**
 * Default labels if i18n unavailable.
 */
const DEFAULT_LABELS =
{
    title : 'Something went wrong!' ,
    retry : 'Try again' ,
} ;

/**
 * Next.js error boundary for route segments.
 *
 * @param {Object} props
 * @param {Error & { digest?: string }} props.error - The error object.
 * @param {() => void} props.reset - Function to attempt recovery.
 */
const Error = ( { error , reset } ) =>
{
    const labels = useI18n( 'error' , DEFAULT_LABELS ) ;

    useEffect( () =>
    {
        console.error( '[Error]' , error ) ;
    }
    , [ error ] ) ;

    return (
        <div className="flex flex-col w-full min-h-screen justify-center items-center space-y-4">

            <SlideUp delay={ 0.5 } start={ -200 }>
                <Image
                    className = "size-96"
                    src       = '/assets/errors/Error.svg' // in public/assets/errors
                    alt       = { labels.title }
                    width     = { 384 }
                    height    = { 384 }
                    priority
                />
            </SlideUp>

            <div className="flex flex-col w-full items-center">
                <h2 className="text-2xl font-bold">{ labels.title }</h2>
                <p className="text-warning">{ error.message }</p>
            </div>

            <button
                className = "btn btn-warning btn-wide"
                onClick   = { reset }
            >
                { labels.retry }
            </button>

        </div>
    ) ;
} ;

export default Error ;