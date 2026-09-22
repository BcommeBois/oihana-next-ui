'use client' ;

import Page        from '@/display/Page' ;
import Container   from '@/display/Container' ;
import FiltersDemo from '@/demo/filters/FiltersDemo' ;

/**
 * Filters showcase page.
 */
const FiltersPage = () =>
(
    <Page className="gap-8" full>
        <Container className="text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Filters
            </h1>
        </Container>

        <Container maxWidth="max-w-3xl">
            <FiltersDemo />
        </Container>
    </Page>
) ;

export default FiltersPage ;
