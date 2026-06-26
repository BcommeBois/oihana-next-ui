'use client' ;

import MegamenuDemo from '@/demo/menus/MegamenuDemo' ;
import Container    from '@/display/Container' ;
import Page         from '@/display/Page' ;

/**
 * Megamenu showcase page.
 *
 * @param {Object} props
 */
const MegamenuShowcase = () =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Megamenu Component
                </h1>
            </Container>

            <MegamenuDemo />

        </Page>
    ) ;
} ;

export default MegamenuShowcase ;
