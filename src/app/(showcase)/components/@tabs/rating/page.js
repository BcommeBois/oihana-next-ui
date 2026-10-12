'use client' ;

import RatingDemo from '@/demo/rating/RatingDemo';
import Container from '@/display/Container';
import Page from '@/display/Page' ;

/**
 * Rating showcase page with filter.
 */
const Ratings = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Rating Components
                </h1>
            </Container>

            <RatingDemo />
        </Page>
    ) ;
} ;

export default Ratings ;