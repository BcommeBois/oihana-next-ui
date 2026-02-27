'use client' ;

import RangeDemo from '@/demo/ranges/RangeDemo';
import Container from '@/display/Container';
import Page      from '@/display/Page' ;

/**
 * Ranges showcase page.
 *
 * Displays all ranges components with variations.
 *
 * @param {Object} props
 */
const RangesShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Range Components
                </h1>
            </Container>

            <RangeDemo />

        </Page>
    ) ;
} ;

export default RangesShowcase ;