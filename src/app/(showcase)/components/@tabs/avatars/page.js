'use client' ;

import AvatarDemo from '@/demo/avatars/AvatarDemo';
import Container from '@/display/Container';
import Page      from '@/display/Page' ;

/**
 * Avatars showcase page.
 *
 * Displays all avatars components with variations.
 *
 * @param {Object} props
 */
const AvatarsShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Avatar Components
                </h1>
            </Container>

            <AvatarDemo />

        </Page>
    ) ;
} ;

export default AvatarsShowcase ;