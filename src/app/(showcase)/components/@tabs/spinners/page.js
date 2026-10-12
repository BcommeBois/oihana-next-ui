'use client' ;

import SpinnersDemo from '@/demo/spinners/SpinnerDemo';
import Container from '@/display/Container';
import Page         from '@/display/Page' ;

/**
 * Spinners showcase page.
 *
 * Displays all modals components with variations.
 *
 * @param {Object} props
 */
const SpinnerShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className="gap-8" >

            {/* Header */}
            <Container className="text-center" maxWidth="max-w-8xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Spinners Components
                </h1>
                <p className="text-base-content/60 mt-2 italic">
                    Flexible and grid layouts with comprehensive utilities.
                </p>
            </Container>

            <SpinnersDemo />

        </Page>
    ) ;
} ;

export default SpinnerShowcase ;