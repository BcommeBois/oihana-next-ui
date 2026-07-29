'use client' ;

import Container      from '@/display/Container' ;
import Page           from '@/display/Page' ;
import GridChartsDemo from '@/demo/charts/GridChartsDemo' ;

/**
 * Grid charts showcase page — Waffle, and Calendar in lot C4.
 */
const GridsPage = () =>
(
    <Page className="gap-8" full>
        {/* Header */}
        <Container className="text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Grid Charts
            </h1>
        </Container>

        <Container maxWidth="max-w-7xl">
            <GridChartsDemo />
        </Container>
    </Page>
) ;

export default GridsPage ;
