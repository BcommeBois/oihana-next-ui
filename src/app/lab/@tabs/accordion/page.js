'use client' ;

import AccordionDemo from '@/demo/layouts/AccordionDemo' ;
import Container      from '@/display/Container' ;
import Page           from '@/display/Page' ;

/**
 * Accordion showcase page.
 *
 * @param {Object} props
 */
const AccordionShowcase = () =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Accordion Component
                </h1>
            </Container>

            <Container maxWidth="max-w-2xl">
                <AccordionDemo />
            </Container>

        </Page>
    ) ;
} ;

export default AccordionShowcase ;
