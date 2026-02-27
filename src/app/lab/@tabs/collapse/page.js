'use client' ;

import Page         from '@/display/Page' ;
import Container    from '@/display/Container' ;
import CollapseDemo from '@/demo/layouts/CollapseDemo' ;

/**
 * Collapse showcase page.
 */
const CollapsePage = () =>
(
    <Page className="gap-8" full>
        {/* Header */}
        <Container className="text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Collapse Component
            </h1>
        </Container>

        <Container maxWidth="max-w-6xl">
            <CollapseDemo />
        </Container>
    </Page>
) ;

export default CollapsePage ;