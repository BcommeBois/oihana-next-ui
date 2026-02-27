'use client' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;
import FlexDemo  from '@/demo/layouts/FlexDemo' ;

/**
 * Flex showcase page.
 */
const FlexPage = () =>
(
    <Page className="gap-8" full>
        {/* Header */}
        <Container className="text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Flex Components
            </h1>
        </Container>

        <Container maxWidth="max-w-6xl">
                <FlexDemo />
        </Container>
    </Page>
) ;

export default FlexPage ;