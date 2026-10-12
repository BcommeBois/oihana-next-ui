'use client' ;

import Container           from '@/display/Container' ;
import Page                from '@/display/Page' ;
import CircularChartsDemo  from '@/demo/charts/CircularChartsDemo' ;

/**
 * Circular charts showcase page — Pie, RadialBar.
 */
const CircularsPage = () =>
(
    <Page className="gap-8" full>
        {/* Header */}
        <Container className="text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Circular Charts
            </h1>
        </Container>

        <Container maxWidth="max-w-7xl">
            <CircularChartsDemo />
        </Container>
    </Page>
) ;

export default CircularsPage ;
