'use client' ;

import PageHeaderDemo from '@/demo/headers/PageHeaderDemo.jsx';
import Page      from '@/display/Page' ;
import Container from '@/display/Container' ;

/**
 * Headers showcase page.
 */
const HeadersPage = () =>
(
    <Page className="gap-8" full>

        <Container className="text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Headers Component
            </h1>
        </Container>

        <Container maxWidth="max-w-6xl">
            <PageHeaderDemo />
        </Container>
    </Page>
) ;

export default HeadersPage ;