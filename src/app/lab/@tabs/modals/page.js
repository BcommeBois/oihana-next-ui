'use client' ;

import AsyncConfirmModalDemo from '@/demo/modals/AsyncConfirmModalDemo' ;
import CRUDDemo             from '@/demo/modals/CRUDModalDemo';
import FormModalDemo        from '@/demo/modals/FormModalDemo' ;
import InputModalDemo       from '@/demo/modals/InputModalDemo';
import ModalDemo            from '@/demo/modals/ModalDemo';
import MountedOpenModalDemo from '@/demo/modals/MountedOpenModalDemo';
import ToastOverModalDemo   from '@/demo/modals/ToastOverModalDemo';
import Container            from '@/display/Container';
import Page                 from '@/display/Page' ;

/**
 * Modal showcase page.
 *
 * Displays all modals components with variations.
 *
 * @param {Object} props
 */
const ModalShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Modal Component
                </h1>
            </Container>

            <ModalDemo />

            <ToastOverModalDemo />

            <CRUDDemo />

            <AsyncConfirmModalDemo />

            <InputModalDemo />

            <MountedOpenModalDemo />

            <FormModalDemo />

        </Page>
    ) ;
} ;

export default ModalShowcase ;