'use client' ;

import TooltipDemo from '@/demo/tooltips/TooltipDemo' ;
import Container   from '@/display/Container' ;
import Page        from '@/display/Page' ;

/**
 * Tooltip showcase page.
 *
 * @param {Object} props
 */
const TooltipsShowcase = () =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Tooltip Component
                </h1>
            </Container>

            <TooltipDemo />

        </Page>
    ) ;
} ;

export default TooltipsShowcase ;
