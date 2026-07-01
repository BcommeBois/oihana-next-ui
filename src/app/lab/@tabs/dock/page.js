'use client' ;

import DockDemo  from '@/demo/menus/DockDemo' ;
import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

/**
 * Dock showcase page.
 *
 * @param {Object} props
 */
const DockShowcase = () =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Dock Component
                </h1>
            </Container>

            <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DockDemo />
            </Container>

        </Page>
    ) ;
} ;

export default DockShowcase ;
