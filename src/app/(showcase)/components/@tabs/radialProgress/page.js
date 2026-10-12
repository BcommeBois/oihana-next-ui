'use client' ;

import RadialProgressDemo from '@/demo/progress/RadialProgressDemo';
import Container from '@/display/Container';
import Page               from '@/display/Page' ;

/**
 * Radial Progress showcase page.
 *
 * Displays all radial progress components with variations.
 *
 * @param {Object} props
 */
const RadialProgressShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    RadialProgress Component
                </h1>
            </Container>

            <RadialProgressDemo />

        </Page>
    ) ;
} ;

export default RadialProgressShowcase ;