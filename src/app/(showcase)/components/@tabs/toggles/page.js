'use client' ;

import ToggleDemo from '@/demo/checkboxes/ToggleDemo';
import Container from '@/display/Container';
import Page       from '@/display/Page' ;

/**
 * Toggles showcase page.
 *
 * Displays all toggles components with variations.
 *
 * @param {Object} props
 */
const TogglesShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Toggle Components
                </h1>
            </Container>

            <ToggleDemo />

        </Page>
    ) ;
} ;

export default TogglesShowcase ;