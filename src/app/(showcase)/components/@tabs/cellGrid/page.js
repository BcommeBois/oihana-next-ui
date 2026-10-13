'use client' ;

import CellGridDemo from '@/demo/grids/CellGridDemo' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

/**
 * CellGrid showcase page.
 *
 * @param {Object} props
 */
const CellGridShowcase = () =>
{
    return (
        <Page className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    CellGrid Component
                </h1>
            </Container>

            <CellGridDemo />

        </Page>
    ) ;
} ;

export default CellGridShowcase ;
