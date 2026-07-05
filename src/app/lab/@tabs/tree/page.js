'use client' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import SortableTreeDemo from '@/demo/trees/SortableTreeDemo' ;

/**
 * Sortable Tree showcase page.
 */
const TreePage = () =>
(
    <Page className="gap-8" full>
        {/* Header */}
        <Container className="text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Sortable Tree Component
            </h1>
        </Container>

        <Container maxWidth="max-w-6xl">
            <SortableTreeDemo />
        </Container>
    </Page>
) ;

export default TreePage ;
