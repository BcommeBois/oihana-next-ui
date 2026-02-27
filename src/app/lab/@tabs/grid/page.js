'use client' ;

import Page      from '@/display/Page' ;
import Container from '@/display/Container' ;
import GridDemo  from '@/demo/layouts/GridDemo' ;

/**
 * Grid showcase page.
 */
const GridPage = () =>
(
    <Page className="gap-8" full>
        {/* Header */}
        <Container className="text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Grid Components
            </h1>
        </Container>

        <Container maxWidth="max-w-6xl">
            <GridDemo />
        </Container>
    </Page>
) ;

export default GridPage ;