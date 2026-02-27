'use client' ;

import ProgressDemo from '@/demo/progress/ProgressDemo';
import Container from '@/display/Container';
import Page         from '@/display/Page' ;

/**
 * Progress showcase page.
 *
 * Displays all progress components with variations.
 *
 * @param {Object} props
 */
const RadiosShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Progress Component
                </h1>
            </Container>

            <ProgressDemo />

        </Page>
    ) ;
} ;

export default RadiosShowcase ;