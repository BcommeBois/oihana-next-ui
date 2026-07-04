'use client' ;

import ListDemo         from '@/demo/lists/ListDemo';
import SortableListDemo from '@/demo/lists/SortableListDemo' ;
import Container from '@/display/Container';
import Page           from '@/display/Page' ;

/**
 * List showcase page.
 *
 * @param {Object} props
 */
const ModalShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    List Component
                </h1>
            </Container>

            <ListDemo />

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Sortable List Component
                </h1>
            </Container>

            <SortableListDemo />

        </Page>
    ) ;
} ;

export default ModalShowcase ;