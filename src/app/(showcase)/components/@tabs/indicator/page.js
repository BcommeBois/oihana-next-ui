'use client' ;

import IndicatorDemo from '@/demo/IndicatorDemo' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

/**
 * Indicator showcase page.
 *
 * Placements, the cart-counter case with its empty state, several items on one
 * container, and the `max-content` width trap.
 *
 * @param {Object} props
 */
const IndicatorShowcase = () =>
{
    return (
        <Page className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Indicator Component
                </h1>
            </Container>

            <IndicatorDemo />

        </Page>
    ) ;
} ;

export default IndicatorShowcase ;
