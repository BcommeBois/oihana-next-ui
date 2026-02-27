'use client' ;

import BadgeDemo from '@/demo/BadgeDemo';
import Container from '@/display/Container';
import Page      from '@/display/Page' ;

/**
 * Badges showcase page.
 *
 * Displays all badges components with variations.
 *
 * @param {Object} props
 */
const BadgeShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Badge Components
                </h1>
            </Container>

            <BadgeDemo />

        </Page>
    ) ;
} ;

export default BadgeShowcase ;