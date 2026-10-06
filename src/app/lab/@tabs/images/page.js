'use client' ;

/**
 * The lab's Images page : the Picture component, in one demo.
 *
 * Its copy lives in `@locale/app/lab/images` and the demo's in
 * `@locale/demo/images/picture`, so the page follows the language switch
 * like every other one.
 *
 * @module app/lab/@tabs/images/page
 */

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import I18nMetas from '@/components/i18n/I18nMetas' ;
import useI18n   from '@/contexts/locale/useI18n' ;

import PictureDemo from '@/demo/images/PictureDemo' ;

/**
 * Images and Pictures showcase page.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.images'] - Dot notation path to the page locale.
 */
const ImageShowcase = ( { path = 'app.lab.images' } = {} ) =>
{
    const { description , title } = useI18n( path ) ?? {} ;

    return (
        <Page full className='gap-8'>

            <I18nMetas path={ path } />

            <Container className="flex flex-col gap-4 text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    { title }
                </h1>

                <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                    { description }
                </p>
            </Container>

            <PictureDemo />

        </Page>
    ) ;
} ;

export default ImageShowcase ;
