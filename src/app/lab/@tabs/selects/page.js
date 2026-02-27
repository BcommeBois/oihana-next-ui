'use client' ;

import Container  from '@/display/Container' ;
import Page       from '@/display/Page' ;
import SelectDemo from '@/demo/selects/SelectDemo';

/**
 * Select showcase page.
 *
 * Displays all select components with variations.
 *
 * @param {Object} props
 */
const SelectShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Select Component
                </h1>
            </Container>

            <SelectDemo />

        </Page>
    ) ;
} ;

export default SelectShowcase ;