'use client' ;

import cn from '@/themes/helpers/cn' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import getBackgroundPattern, { patterns } from '@/themes/effects/backgroundPattern' ;

import leading from 'vegas-js-core/src/numbers/leading' ;

/**
 * Patterns showcase page.
 *
 * Displays all available background patterns with their names and indices.
 *
 * @param {Object} props
 * @param {string} [props.path='app.test'] - SEO path identifier.
 */
const Patterns = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Background Patterns
                </h1>
                <p className="text-base-content/70 text-center">
                    { patterns.length } patterns disponibles avec support de <code className="badge badge-sm">currentColor</code>
                </p>
            </Container>

            <Container className="flex flex-col gap-6" maxWidth="max-w-7xl">

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {
                        patterns.map( ( pattern , index ) => (
                            <div
                                key={ pattern }
                                className={ cn(
                                    'relative flex h-40 flex-col overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105' ,
                                    'bg-base-200' ,
                                    getBackgroundPattern( { pattern , baseColor: 'base-content' } )
                                ) }
                            >
                                <div className="absolute top-2 left-2 z-10">
                                    <span className="badge badge-accent badge-sm">
                                        { leading( index + 1 ) }
                                    </span>
                                </div>

                                <div className="mt-auto bg-base-300/90 backdrop-blur-sm p-3 text-base-content">
                                    <span className="block font-mono text-sm font-bold">
                                        { pattern }
                                    </span>
                                    <code className="text-xs">
                                        pattern-{ pattern }
                                    </code>
                                </div>
                            </div>
                        ) )
                    }
                </div>

            </Container>

        </Page>
    ) ;
} ;

export default Patterns ;