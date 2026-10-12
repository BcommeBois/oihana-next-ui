'use client' ;

import Container    from '@/display/Container' ;
import Page         from '@/display/Page' ;
import SkeletonDemo from '@/demo/SkeletonDemo';

/**
 * Skeleton lab page.
 *
 * Displays the skeleton component with variations.
 *
 * @param {Object} props
 */
const SkeletonShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>


            <Container className="flex flex-col gap-4 text-center" maxWidth="max-w-4xl">
                <div className="flex items-center justify-center gap-3">
                    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                        Skeleton Components
                    </h1>
                </div>
                <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                    Skeleton is a placeholder used to show the loading state of a component, its shape and size coming from utility classes.
                </p>
            </Container>

            <SkeletonDemo />

        </Page>
    ) ;
} ;

export default SkeletonShowcase ;
