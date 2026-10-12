'use client' ;

import StepDemo from '@/demo/StepDemo' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

/**
 * Steps showcase page.
 *
 * A live funnel driven by `current` with its three colours, the three ways of filling
 * the bubble, direction including the responsive form, and free per-step colours.
 *
 * @param {Object} props
 */
const StepsShowcase = () =>
{
    return (
        <Page className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Steps Component
                </h1>
            </Container>

            <StepDemo />

        </Page>
    ) ;
} ;

export default StepsShowcase ;
