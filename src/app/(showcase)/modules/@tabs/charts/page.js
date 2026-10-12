'use client' ;

import Container            from '@/display/Container' ;
import Page                 from '@/display/Page' ;
import CartesianChartsDemo  from '@/demo/charts/CartesianChartsDemo' ;

/**
 * Cartesian charts showcase page — Line, Bar, StackBar.
 */
const ChartsPage = () =>
(
    <Page className="gap-8" full>
        {/* Header */}
        <Container className="text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Cartesian Charts
            </h1>
        </Container>

        <Container maxWidth="max-w-7xl">
            <CartesianChartsDemo />
        </Container>
    </Page>
) ;

export default ChartsPage ;
