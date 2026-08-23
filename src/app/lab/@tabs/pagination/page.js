'use client' ;

import PaginationDemo  from '@/demo/paginations/PaginationDemo' ;
import ResetScrollDemo from '@/demo/paginations/ResetScrollDemo' ;
import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Page           from '@/display/Page' ;

/**
 * Pagination showcase page.
 *
 * @param {Object} props
 */
const PaginationShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Pagination Component
                </h1>
            </Container>

            <PaginationDemo />

            <Divider />

            <ResetScrollDemo />

        </Page>
    ) ;
} ;

export default PaginationShowcase ;