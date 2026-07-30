'use client' ;

import StatDemo from '@/demo/StatDemo' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

/**
 * Stat showcase page.
 *
 * The band and its slots, per-part colours, direction including the responsive form
 * and the horizontal overflow, then centring and actions.
 *
 * @param {Object} props
 */
const StatShowcase = () =>
{
    return (
        <Page className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Stat Component
                </h1>
            </Container>

            <StatDemo />

        </Page>
    ) ;
} ;

export default StatShowcase ;
