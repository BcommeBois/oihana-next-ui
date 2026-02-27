'use client' ;

import RadioDemo from '@/demo/radios/RadioDemo';
import Container from '@/display/Container';
import Page      from '@/display/Page' ;

/**
 * Radios showcase page.
 *
 * Displays all radios components with variations.
 *
 * @param {Object} props
 */
const RadiosShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Radio Components
                </h1>
            </Container>

            <RadioDemo />

        </Page>
    ) ;
} ;

export default RadiosShowcase ;