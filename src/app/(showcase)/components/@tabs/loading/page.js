'use client' ;

import LoadingDemo from '@/demo/LoadingDemo';
import Container from '@/display/Container';
import Page      from '@/display/Page' ;

/**
 * Loading showcase page.
 *
 * Displays all loading components with variations.
 *
 * @param {Object} props
 */
const LoadingShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Loading Component
                </h1>
            </Container>

            <LoadingDemo />

        </Page>
    ) ;
} ;

export default LoadingShowcase ;