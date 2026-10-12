'use client' ;

import AnimationDemo from '@/demo/motions/AnimationDemo';
import Container     from '@/display/Container' ;
import Page          from '@/display/Page' ;

/**
 * Motion showcase page.
 *
 * Displays all motions components with variations.
 *
 * @param {Object} props
 */
const MotionShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Motion Components
                </h1>
            </Container>

            <AnimationDemo />

        </Page>
    ) ;
} ;

export default MotionShowcase ;