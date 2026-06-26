'use client' ;

import AuraDemo  from '@/demo/effects/AuraDemo' ;
import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

/**
 * Effects showcase page.
 *
 * Displays the visual effect components (Aura, …).
 *
 * @param {Object} props
 */
const EffectsShowcase = () =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Effect Components
                </h1>
            </Container>

            <AuraDemo />

        </Page>
    ) ;
} ;

export default EffectsShowcase ;
