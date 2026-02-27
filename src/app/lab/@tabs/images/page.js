'use client' ;

import PictureDemo from '@/demo/images/PictureDemo';
import Container from '@/display/Container';
import Page           from '@/display/Page' ;

/**
 * Images and Pictures showcase page.
 *
 * @param {Object} props
 */
const ImageShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Image and Picture Components
                </h1>
            </Container>

            <PictureDemo />

        </Page>
    ) ;
} ;

export default ImageShowcase ;