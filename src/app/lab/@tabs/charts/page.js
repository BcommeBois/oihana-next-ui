'use client' ;

import Container  from '@/display/Container' ;
import Page       from '@/display/Page' ;
import ChartsDemo from '@/demo/charts/ChartsDemo' ;

/**
 * Charts showcase page.
 */
const ChartsPage = () =>
(
    <Page className="gap-8" full>
        {/* Header */}
        <Container className="text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Charts
            </h1>
        </Container>

        <Container maxWidth="max-w-7xl">
            <ChartsDemo />
        </Container>
    </Page>
) ;

export default ChartsPage ;
