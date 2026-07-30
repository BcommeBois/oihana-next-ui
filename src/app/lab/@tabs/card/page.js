'use client' ;

import CardDemo from '@/demo/CardDemo' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

/**
 * Card showcase page.
 *
 * Slots and empty states, sizes and styles, the figure in its four positions,
 * heading level, and the selectable form.
 *
 * @param {Object} props
 */
const CardShowcase = () =>
{
    return (
        <Page className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Card Component
                </h1>
            </Container>

            <CardDemo />

        </Page>
    ) ;
} ;

export default CardShowcase ;
