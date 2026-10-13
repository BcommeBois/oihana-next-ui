'use client' ;

import TimelineDemo from '@/demo/timeline/TimelineDemo' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

/**
 * Timeline showcase page.
 *
 * @param {Object} props
 */
const TimelineShowcase = () =>
{
    return (
        <Page className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Timeline Component
                </h1>
            </Container>

            <TimelineDemo />

        </Page>
    ) ;
} ;

export default TimelineShowcase ;
