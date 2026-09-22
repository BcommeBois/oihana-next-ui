'use client' ;

import Page        from '@/display/Page' ;
import Container   from '@/display/Container' ;
import PickersDemo from '@/demo/pickers/PickersDemo' ;

/**
 * Pickers showcase page.
 */
const PickersPage = () =>
(
    <Page className="gap-8" full>
        <Container className="text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Pickers
            </h1>
        </Container>

        <Container maxWidth="max-w-3xl">
            <PickersDemo />
        </Container>
    </Page>
) ;

export default PickersPage ;
