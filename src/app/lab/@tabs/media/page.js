'use client' ;

import { MdAddAPhoto , MdAttachFile } from 'react-icons/md' ;

import I18nMetas from '@/components/i18n/I18nMetas' ;
import useI18n   from '@/contexts/locale/useI18n' ;

import Divider from '@/components/Divider' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import FileInputDemo    from '@/demo/inputs/FileInputDemo' ;
import PhotoCaptureDemo from '@/demo/inputs/PhotoCaptureDemo' ;

/**
 * The page's sections, in order : the copy of each is read from the bundle under its key.
 * @type {Array<{ key : string , icon : React.ElementType , component : React.ReactNode }>}
 */
const SECTIONS =
[
    { component : <FileInputDemo /> , icon : MdAttachFile , key : 'file' } ,
    { component : <PhotoCaptureDemo /> , icon : MdAddAPhoto , key : 'photo' } ,
] ;

/**
 * Files & media showcase page : picking a file, taking a photo.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.media'] - Dot notation path to the page locale.
 */
const MediaShowcase = ( { path = 'app.lab.media' } = {} ) =>
{
    const { description , sections , title } = useI18n( path ) ?? {} ;

    return (
        <Page full className='gap-8'>

            <I18nMetas path={ path } />

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    { title }
                </h1>
                <p className="text-base-content/60 mt-2 italic">
                    { description }
                </p>
            </Container>

            { SECTIONS.map( ( { component , icon : Icon , key } , index ) => (
                <Container className="flex flex-col gap-4" key={ key } maxWidth="max-w-7xl">
                    { index > 0 && <Divider /> }
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="text-secondary"><Icon size={ 24 } /></span>
                            { sections?.[ key ]?.title }
                        </h2>
                        <p className="text-sm opacity-70 mt-1">{ sections?.[ key ]?.description }</p>
                    </div>
                    { component }
                </Container>
            ) ) }

        </Page>
    ) ;
} ;

export default MediaShowcase ;
