'use client' ;

import EmptyStateDemo from '@/demo/EmptyStateDemo' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

/**
 * EmptyState showcase page.
 *
 * Anatomy and its optional slots, the size scale, and the announced form for an
 * empty state that results from a user action.
 *
 * @param {Object} props
 */
const EmptyStateShowcase = () =>
{
    return (
        <Page className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    EmptyState Component
                </h1>
            </Container>

            <EmptyStateDemo />

        </Page>
    ) ;
} ;

export default EmptyStateShowcase ;
