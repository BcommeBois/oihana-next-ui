'use client' ;

import AsyncConfirmModalDemo from '@/demo/modals/AsyncConfirmModalDemo' ;
import CRUDDemo             from '@/demo/modals/CRUDModalDemo';
import FormModalDemo        from '@/demo/modals/FormModalDemo' ;
import InputModalDemo       from '@/demo/modals/InputModalDemo';
import ModalDemo            from '@/demo/modals/ModalDemo';
import ModalPresetsDemo     from '@/demo/modals/ModalPresetsDemo' ;
import PortalFullscreenDemo from '@/demo/modals/PortalFullscreenDemo' ;
import MountedOpenModalDemo from '@/demo/modals/MountedOpenModalDemo';
import ToastOverModalDemo   from '@/demo/modals/ToastOverModalDemo';
import Container            from '@/display/Container';
import Divider              from '@/components/Divider' ;
import Page                 from '@/display/Page' ;

import I18nMetas from '@/components/i18n/I18nMetas.jsx' ;
import useI18n   from '@/contexts/locale/useI18n' ;

/**
 * Modal showcase page.
 *
 * Displays all modals components with variations.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.modals'] - Dot notation path to the page locale.
 */
const ModalShowcase = ( { path = 'app.lab.modals' } = {} ) =>
{
    const { benches , benchesNote , description , title } = useI18n( path ) ;

    return (
        <Page className='gap-8'>

            <I18nMetas path={ path } />

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    { title }
                </h1>
                <p className="text-base-content/60 mt-2 italic">
                    { description }
                </p>
            </Container>

            <ModalDemo />

            <ModalPresetsDemo />

            <InputModalDemo />

            <FormModalDemo />

            <CRUDDemo />

            <AsyncConfirmModalDemo />

            <MountedOpenModalDemo />

            <Container maxWidth="max-w-7xl">
                <Divider>{ benches }</Divider>
                <p className="text-sm text-base-content/60 italic">
                    { benchesNote }
                </p>
            </Container>

            <ToastOverModalDemo />

            <PortalFullscreenDemo />

        </Page>
    ) ;
} ;

export default ModalShowcase ;