'use client' ;

import MaskDemo from '@/demo/masks/MaskDemo';
import Container from '@/display/Container';
import Page from '@/display/Page' ;

/**
 * Masks showcase page with filter.
 */
const Masks = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Mask Components
                </h1>
            </Container>

            <MaskDemo />
        </Page>
    ) ;
} ;

export default Masks ;