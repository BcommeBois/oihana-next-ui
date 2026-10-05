'use client' ;

import { useId } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Checkbox from '@/components/checkboxes/Checkbox';
import useModal from '@/components/modals/hooks/useModal' ;

import AlertModal    from '@/components/modals/AlertModal' ;
import Badge         from '@/components/Badge' ;
import Button        from '@/components/Button' ;
import ConfirmModal  from '@/components/modals/ConfirmModal' ;
import Divider       from '@/components/Divider' ;
import Input         from '@/components/inputs/Input' ;
import InputEmail    from '@/components/inputs/InputEmail' ;
import InputPassword from '@/components/inputs/InputPassword' ;
import Modal         from '@/components/modals/Modal' ;

import Container    from '@/display/Container' ;

import {
    MdInfo,
    MdWarning,
    MdCheckCircle,
    MdError,
    MdDelete,
    MdDriveFileRenameOutline ,
    MdSave,
    MdCloudDone,
} from 'react-icons/md' ;

/**
 * @param {Object} props
 * @param {string} [props.path='demo.modals.modal'] - Dot notation path to the demo locale.
 */
const ModalDemo = ( { path = 'demo.modals.modal' } = {} ) =>
{
    const t = useI18n( path ) ;

    // Simple modal
    const { modalRef: simpleRef, open: openSimple } = useModal() ;

    // Localized labels — no label prop at all, everything comes from `components.modal`
    const { modalRef: i18nModalRef   , open: openI18nModal   } = useModal() ;
    const { modalRef: i18nConfirmRef , open: openI18nConfirm } = useModal() ;
    const { modalRef: i18nAlertRef   , open: openI18nAlert   } = useModal() ;

    // Popover-mode modals (opt-in usePopover)
    const popoverId = `modal-popover-${ useId().replace( /:/g , '' ) }` ;
    const { modalRef: popoverHookRef, open: openPopoverHook } = useModal() ;

    // Alert modals
    const { modalRef: alertSuccessRef, open: openAlertSuccess } = useModal({
        onOpen: () => console.log( 'Success alert opened' ),
        onClose: () => console.log( 'Success alert closed' ),
    }) ;

    const { modalRef: alertInfoRef, open: openAlertInfo } = useModal() ;
    const { modalRef: alertWarningRef, open: openAlertWarning } = useModal() ;
    const { modalRef: alertErrorRef, open: openAlertError } = useModal() ;

    // Confirm modals
    const { modalRef: confirmDeleteRef, open: openConfirmDelete } = useModal() ;
    const { modalRef: confirmSaveRef, open: openConfirmSave } = useModal() ;

    // Layout modals
    const { modalRef: fullscreenRef, open: openFullscreen } = useModal() ;
    const { modalRef: responsiveRef, open: openResponsive } = useModal() ;
    const { modalRef: topRef, open: openTop } = useModal() ;
    const { modalRef: bottomRef, open: openBottom } = useModal() ;

    // Custom modals
    const { modalRef: customWidthRef  , open: openCustomWidth  } = useModal() ;
    const { modalRef: noBackdropRef   , open: openNoBackdrop   } = useModal() ;
    const { modalRef: noEscRef        , open: openNoEsc        } = useModal() ;
    const { modalRef: closeButtonRef  , open: openCloseButton  } = useModal() ;
    const { modalRef: noFooterRef     , open: openNoFooter     } = useModal() ;
    const { modalRef: customFooterRef , open: openCustomFooter } = useModal() ;

    // Form modal
    const { modalRef: formRef, open: openForm } = useModal() ;

    // Custom footerNode modal (sticky footer + scrollable content)
    const { modalRef: footerNodeRef, open: openFooterNode } = useModal() ;

    // Toggle demo
    const { modalRef: toggleRef, toggle: toggleModal, isOpen: toggleIsOpen } = useModal({
        onClose: () => console.log( 'Modal closed' ),
    }) ;

    const { modalRef: breakpointMdRef, open: openBreakpointMd } = useModal() ;
    const { modalRef: breakpointLgRef, open: openBreakpointLg } = useModal() ;
    const { modalRef: breakpointXlRef, open: openBreakpointXl } = useModal() ;


    // Stacked modals demo
    const { modalRef: parentModalRef, open: openParent } = useModal();
    const { modalRef: childModalRef, open: openChild } = useModal();
    const { modalRef: confirmationRef, open: openConfirmation } = useModal();

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    { t.simple.title }
                </h3>

                <Button onClick={ openSimple }>
                    { t.simple.trigger }
                </Button>

                <Modal
                    ref                  = { simpleRef }
                    title                = { t.simple.modal }
                    agree                = { t.close }
                    showDisagree         = { false }
                    disableEscapeKeyDown = { false }
                    disableBackdropClick = { false }
                >
                    <p className="py-2">{ t.simple.body }</p>
                </Modal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    { t.i18n.title }
                </h3>

                <p className="text-sm opacity-70">{ t.i18n.note }</p>

                <div className="flex flex-wrap gap-3">
                    <Button onClick={ openI18nModal }>
                        Modal
                    </Button>
                    <Button color="error" onClick={ openI18nConfirm }>
                        ConfirmModal
                    </Button>
                    <Button color="info" onClick={ openI18nAlert }>
                        AlertModal
                    </Button>
                </div>

                <Modal ref={ i18nModalRef } title="Modal">
                    <p className="py-2">{ t.i18n.modalBody }</p>
                </Modal>

                <ConfirmModal ref={ i18nConfirmRef } title="ConfirmModal">
                    <p className="py-2">{ t.i18n.confirmBody }</p>
                </ConfirmModal>

                <AlertModal ref={ i18nAlertRef } title="AlertModal">
                    <p className="py-2">{ t.i18n.alertBody }</p>
                </AlertModal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    { t.popover.title }
                </h3>

                <p className="text-sm text-base-content/70">{ t.popover.note }</p>

                <div className="flex gap-2 flex-wrap">
                    <button type="button" className="btn btn-secondary" popoverTarget={ popoverId }>
                        { t.popover.declarative }
                    </button>

                    <Button onClick={ openPopoverHook }>
                        { t.popover.viaHook }
                    </Button>
                </div>
                <Modal
                    usePopover
                    id              = { popoverId }
                    title           = { t.popover.declTitle }
                    showFooter      = { false }
                    showCloseButton
                >
                    <p className="py-4">{ t.popover.declBody }</p>
                </Modal>
                <Modal
                    usePopover
                    ref          = { popoverHookRef }
                    title        = { t.popover.hookTitle }
                    agree        = { t.close }
                    showDisagree = { false }
                >
                    <p className="py-4">{ t.popover.hookBody }</p>
                </Modal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    { t.breakpoint.title }
                </h3>

                <div className="flex gap-2 flex-wrap">
                    <Button onClick={ openBreakpointMd }>
                        { t.breakpoint.md }
                    </Button>

                    <Button onClick={ openBreakpointLg }>
                        { t.breakpoint.lg }
                    </Button>

                    <Button onClick={ openBreakpointXl }>
                        { t.breakpoint.xl }
                    </Button>
                </div>
                <Modal
                    ref={ breakpointMdRef }
                    title={ t.breakpoint.mdTitle }
                    fullScreenBreakpoint="md"
                    agree= { t.close }
                    showDisagree={ false }
                >
                    <div className="space-y-4">
                        <p>{ t.breakpoint.lead }</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>{ t.breakpoint.mdFull }</li>
                            <li>{ t.breakpoint.mdNorm }</li>
                        </ul>
                        <p className="text-sm text-base-content/70">{ t.breakpoint.resize }</p>
                    </div>
                </Modal>
                <Modal
                    ref={ breakpointLgRef }
                    title={ t.breakpoint.lgTitle }
                    fullScreenBreakpoint="lg"
                    agree= { t.close }
                    showDisagree={ false }
                >
                    <div className="space-y-4">
                        <p>{ t.breakpoint.lead }</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>{ t.breakpoint.lgFull }</li>
                            <li>{ t.breakpoint.lgNorm }</li>
                        </ul>
                    </div>
                </Modal>
                <Modal
                    ref={ breakpointXlRef }
                    title={ t.breakpoint.xlTitle }
                    fullScreenBreakpoint="xl"
                    agree= { t.close }
                    showDisagree={ false }
                >
                    <div className="space-y-4">
                        <p>{ t.breakpoint.lead }</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>{ t.breakpoint.xlFull }</li>
                            <li>{ t.breakpoint.xlNorm }</li>
                        </ul>
                    </div>
                </Modal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">

                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    { t.toggle.title }
                </h3>

                <div className="flex gap-2 items-center">
                    <Button onClick={ toggleModal }>
                        { toggleIsOpen ? t.toggle.close : t.toggle.open }
                    </Button>

                    <Badge color={ toggleIsOpen ? 'success' : 'neutral' }>
                        { toggleIsOpen ? t.toggle.opened : t.toggle.closed }
                    </Badge>
                </div>

                <Modal
                    ref          = { toggleRef }
                    title        = { t.toggle.modal }
                    placement    = "bottom"
                    agree        = { t.close }
                    showDisagree = { false }
                >
                    <p className="py-4">{ t.toggle.body }</p>
                </Modal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    { t.alerts.title }
                </h3>

                <div className="flex gap-2 flex-wrap">
                    <Button color="success" onClick={ openAlertSuccess }>
                        { t.alerts.success }
                    </Button>

                    <Button color="info" onClick={ openAlertInfo }>
                        { t.alerts.info }
                    </Button>

                    <Button color="warning" onClick={ openAlertWarning }>
                        { t.alerts.warning }
                    </Button>

                    <Button color="error" onClick={ openAlertError }>
                        { t.alerts.error }
                    </Button>
                </div>
                <AlertModal
                    ref={ alertSuccessRef }
                    title={ t.alerts.successTitle }
                    icon={ <MdCheckCircle size={40} className="text-success" /> }
                    agree={ t.alerts.successAgree }
                    agreeColor="success"
                >
                    <p>{ t.alerts.successBody }</p>
                </AlertModal>
                <AlertModal
                    ref={ alertInfoRef }
                    title={ t.alerts.infoTitle }
                    icon={ <MdInfo size={40} className="text-info" /> }
                    agree={ t.alerts.infoAgree }
                    agreeColor="info"
                >
                    <div className="py-4">
                        <p className="mb-2">{ t.alerts.infoLead }</p>
                        <ul className="list-disc list-inside space-y-1">
                            { t.alerts.infoList.map( item => <li key={ item }>{ item }</li> ) }
                        </ul>
                    </div>
                </AlertModal>
                <AlertModal
                    ref={ alertWarningRef }
                    title={ t.alerts.warningTitle }
                    icon={ <MdWarning size={40} className="text-warning" /> }
                    agree={ t.alerts.warningAgree }
                    agreeColor="warning"
                >
                    <div className="alert alert-warning">
                        <MdWarning />
                        <span>{ t.alerts.warningBody }</span>
                    </div>
                </AlertModal>
                <AlertModal
                    ref={ alertErrorRef }
                    title={ t.alerts.errorTitle }
                    icon={ <MdError size={40} className="text-error" /> }
                    agree= { t.close }
                    agreeColor="error"
                >
                    <div className="py-4">
                        <p className="font-semibold mb-2">{ t.alerts.errorLead }</p>
                        <p className="text-sm text-base-content/70 mb-4">{ t.alerts.errorBody }</p>
                        <div className="alert alert-error">
                            <span className="font-mono text-sm">{ t.alerts.errorCode }</span>
                        </div>
                    </div>
                </AlertModal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    { t.confirms.title }
                </h3>

                <div className="flex gap-2 flex-wrap">
                    <Button color="error" onClick={ openConfirmDelete }>
                        { t.confirms.delete }
                    </Button>

                    <Button color="primary" onClick={ openConfirmSave }>
                        { t.confirms.save }
                    </Button>
                </div>
                <ConfirmModal
                    ref={ confirmDeleteRef }
                    title={ t.confirms.deleteTitle }
                    icon={ <MdDelete size={40} className="text-error" /> }
                    agree={ t.confirms.deleteAgree }
                    agreeIcon={ <MdDelete size={20} /> }
                    disagree={ t.confirms.deleteDisagree }
                    onAgree={() => console.log( 'Item deleted' )}
                    onCancel={() => console.log( 'Deletion cancelled' )}
                >
                    <div className="py-4">
                        <p className="mb-4">{ t.confirms.deleteBody }</p>
                        <div className="alert alert-warning">
                            <MdWarning />
                            <span>{ t.confirms.deleteWarning }</span>
                        </div>
                    </div>
                </ConfirmModal>
                <ConfirmModal
                    ref={ confirmSaveRef }
                    title={ t.confirms.saveTitle }
                    icon={ <MdSave size={40} className="text-primary" /> }
                    agree={ t.confirms.saveAgree }
                    agreeColor="primary"
                    agreeIcon={ <MdSave size={20} /> }
                    disagree={ t.confirms.saveDisagree }
                    disagreeColor="error"
                    onAgree={() => console.log( 'Changes saved' )}
                    onCancel={() => console.log( 'Changes discarded' )}
                >
                    <p className="py-4">{ t.confirms.saveBody }</p>
                </ConfirmModal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    { t.fullscreen.title }
                </h3>

                <Button onClick={ openFullscreen }>
                    { t.fullscreen.trigger }
                </Button>

                <Modal
                    ref             = { fullscreenRef }
                    title           = { t.fullscreen.modal }
                    fullScreen      = { true }
                    agree           = { t.close }
                    showDisagree    = { false }
                    showCloseButton = { true }
                >
                    <div className="flex flex-col flex-1 h-full items-center justify-center gap-4">
                        <p className="text-2xl font-bold">{ t.fullscreen.lead }</p>
                        <p className="text-base-content/70">{ t.fullscreen.body }</p>
                    </div>
                </Modal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">
                    { t.placement.title }
                </h3>

                <div className="flex gap-2 flex-wrap">
                    <Button onClick={ openResponsive }>
                        { t.placement.responsive }
                    </Button>

                    <Button onClick={ openTop }>
                        { t.placement.top }
                    </Button>

                    <Button onClick={ openBottom }>
                        { t.placement.bottom }
                    </Button>
                </div>
                <Modal
                    ref                 = { responsiveRef }
                    title               = { t.placement.responsiveTitle }
                    placement           = "bottom"
                    responsivePlacement = "sm:modal-middle"
                    agree               = "Close"
                    showDisagree        = { false }
                >
                    <p className="py-4">{ t.placement.responsiveBody }</p>
                </Modal>
                <Modal
                    ref          = { topRef }
                    title        = { t.placement.topTitle }
                    placement    = "top"
                    agree        = { t.close }
                    showDisagree = { false }
                    // fullWidth    = { true }
                >
                    <p className="py-4">{ t.placement.topBody }</p>
                </Modal>
                <Modal
                    ref          = { bottomRef }
                    title        = { t.placement.bottomTitle }
                    placement    = "bottom"
                    agree        = { t.close }
                    showDisagree = { false }
                    // fullWidth    = { true }
                >
                    <p className="py-4">{ t.placement.bottomBody }</p>
                </Modal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    { t.width.title }
                </h3>

                <Button onClick={ openCustomWidth }>
                    { t.width.trigger }
                </Button>

                <Modal
                    ref          = { customWidthRef }
                    title        = { t.width.modal }
                    maxWidth     = "max-w-5xl"
                    agree        = { t.close }
                    showDisagree = { false }
                >
                    <div className="py-4">
                        <p className="mb-4">{ t.width.lead }</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            { t.width.columns.map( ( column , index ) => (
                                <div className="card bg-base-200" key={ column }>
                                    <div className="card-body">
                                        <h3 className="card-title text-sm">{ column }</h3>
                                        <p className="text-xs">{ t.width.cells[ index ] }</p>
                                    </div>
                                </div>
                            ) ) }
                        </div>
                    </div>
                </Modal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">
                    { t.behavior.title }
                </h3>

                <div className="flex gap-2 flex-wrap">
                    <Button onClick={ openNoBackdrop }>
                        { t.behavior.noBackdrop }
                    </Button>

                    <Button onClick={ openNoEsc }>
                        { t.behavior.noEsc }
                    </Button>

                    <Button onClick={ openCloseButton }>
                        { t.behavior.withClose }
                    </Button>
                </div>
                <Modal
                    ref          = { noBackdropRef }
                    title        = { t.behavior.noBackdropTitle }
                    agree        = { t.close }
                    showDisagree = { false }
                    disableBackdropClick
                >
                    <div className="py-4">
                        <p className="mb-2">{ t.behavior.noBackdropLead }</p>
                        <p className="text-sm text-base-content/70">{ t.behavior.noBackdropBody }</p>
                    </div>
                </Modal>
                <Modal
                    ref          = { noEscRef }
                    title        = { t.behavior.noEscTitle }
                    agree        = { t.close }
                    showDisagree = { false }
                    disableEscapeKeyDown
                >
                    <div className="py-4">
                        <p className="mb-2">{ t.behavior.noEscLead }</p>
                        <p className="text-sm text-base-content/70">{ t.behavior.noEscBody }</p>
                    </div>
                </Modal>
                <Modal
                    ref={ closeButtonRef }
                    title={ t.behavior.closeTitle }
                    showCloseButton
                    agree={ t.behavior.closeAgree }
                    showDisagree={ false }
                >
                    <p className="py-4">{ t.behavior.closeBody }</p>
                </Modal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    { t.customFooter.title }
                </h3>

                <div className="flex gap-2 flex-wrap">
                    <Button onClick={ openNoFooter }>
                        { t.customFooter.noFooter }
                    </Button>

                    <Button onClick={ openCustomFooter }>
                        { t.customFooter.options }
                    </Button>
                </div>
                <Modal
                    ref={ noFooterRef }
                    title={ t.customFooter.noFooterTitle }
                    showFooter={ false }
                    showCloseButton
                >
                    <p className="py-4">{ t.customFooter.noFooterBody }</p>
                </Modal>
                <Modal
                    ref           = { customFooterRef }
                    title         = { t.customFooter.modal }
                    agree         = { t.customFooter.accept }
                    disagree      = { t.customFooter.decline }
                    footerOptions =
                    {
                        <Button size="sm" color="ghost">
                            { t.customFooter.learn }
                        </Button>
                    }
                >
                    <p className="py-4">{ t.customFooter.body }</p>
                </Modal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    { t.footerNode.title }
                </h3>

                <div className="card bg-base-100 shadow">
                    <div className="card-body gap-4">

                        <h4 className="card-title text-base">
                            <MdInfo className="text-info" /> { t.footerNode.when }
                        </h4>

                        <p className="text-sm text-base-content/80">{ t.footerNode.note }</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h5 className="font-bold text-success mb-2">{ t.footerNode.givesTitle }</h5>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    { t.footerNode.givesList.map( item => <li key={ item }>{ item }</li> ) }
                                </ul>
                            </div>

                            <div>
                                <h5 className="font-bold text-warning mb-2">{ t.footerNode.rulesTitle }</h5>
                                <p className="text-sm mb-1">{ t.footerNode.rulesLead }</p>
                                <p className="text-xs font-mono text-base-content/70">
                                    agree, disagree, agreeColor, disagreeColor, agreeIcon, disagreeIcon,
                                    showAgree, showDisagree, showFooter, footerReverse, footerClassName,
                                    footerOptions, onAgree, onCancel
                                </p>
                                <p className="text-sm mt-2">{ t.footerNode.rulesNote }</p>
                            </div>
                        </div>

                        <div className="alert alert-info">
                            <MdInfo size={20} />
                            <div className="text-sm">{ t.footerNode.standard }</div>
                        </div>

                        <h5 className="font-bold mt-2">{ t.footerNode.beforeAfter }</h5>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <div>
                                <p className="text-xs text-error mb-1 font-semibold">{ t.footerNode.before }</p>
                                <div className="mockup-code text-xs">
                                    <pre data-prefix="1"><code>&lt;Modal</code></pre>
                                    <pre data-prefix="2"><code>  contentClassName ="!overflow-hidden !p-0 flex flex-col flex-1 min-h-0"</code></pre>
                                    <pre data-prefix="3"><code>  modalBoxClassName="!overflow-hidden flex flex-col"</code></pre>
                                    <pre data-prefix="4"><code>  showFooter={`{false}`}&gt;</code></pre>
                                    <pre data-prefix="5"><code>  &lt;div className="flex-1 min-h-0 overflow-y-auto ..."&gt;</code></pre>
                                    <pre data-prefix="6"><code>    {`{form fields}`}</code></pre>
                                    <pre data-prefix="7"><code>  &lt;/div&gt;</code></pre>
                                    <pre data-prefix="8"><code>  &lt;div className="shrink-0 flex border-t bg-base-100 ..."&gt;</code></pre>
                                    <pre data-prefix="9"><code>    {`{status + cancel + save}`}</code></pre>
                                    <pre data-prefix="10"><code>  &lt;/div&gt;</code></pre>
                                    <pre data-prefix="11"><code>&lt;/Modal&gt;</code></pre>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-success mb-1 font-semibold">{ t.footerNode.after }</p>
                                <div className="mockup-code text-xs">
                                    <pre data-prefix="1"><code>&lt;Modal</code></pre>
                                    <pre data-prefix="2"><code>  title="Edit profile"</code></pre>
                                    <pre data-prefix="3"><code>  footerNode={`{<FormFooter ... />}`}</code></pre>
                                    <pre data-prefix="4"><code>&gt;</code></pre>
                                    <pre data-prefix="5"><code>  &lt;form className="flex flex-col gap-4"&gt;</code></pre>
                                    <pre data-prefix="6"><code>    {`{form fields}`}</code></pre>
                                    <pre data-prefix="7"><code>  &lt;/form&gt;</code></pre>
                                    <pre data-prefix="8"><code>&lt;/Modal&gt;</code></pre>
                                    <pre data-prefix="9"><code></code></pre>
                                    <pre data-prefix="10"><code>// modal-box auto: flex flex-col</code></pre>
                                    <pre data-prefix="11"><code>// content auto:   flex-1 min-h-0 overflow-y-auto</code></pre>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <Button color="info" onClick={ openFooterNode }>
                    { t.footerNode.trigger }
                </Button>

                <Modal
                    ref        = { footerNodeRef }
                    title      = { t.footerNode.modal }
                    icon       = { <MdDriveFileRenameOutline size={24} className="text-info" /> }
                    maxWidth   = "max-w-xl"
                    footerNode = {
                        <div className="flex items-center gap-3 px-4 py-3">
                            <div className="flex items-center gap-2 text-sm text-base-content/70">
                                <MdCloudDone className="text-success" size={18} />
                                <span>{ t.footerNode.saved }</span>
                            </div>
                            <div className="ml-auto flex gap-2">
                                <Button
                                    color   = "neutral"
                                    size    = "sm"
                                    onClick = { () => footerNodeRef.current?.close() }
                                >
                                    { t.footerNode.cancel }
                                </Button>
                                <Button
                                    color   = "primary"
                                    size    = "sm"
                                    onClick = { () =>
                                    {
                                        console.log( 'Profile saved' ) ;
                                        footerNodeRef.current?.close() ;
                                    }}
                                >
                                    <MdSave size={16} />
                                    { t.footerNode.save }
                                </Button>
                            </div>
                        </div>
                    }
                >
                    <div className="flex flex-col gap-4 px-2">
                        <p className="text-sm text-base-content/70">{ t.footerNode.scroll }</p>

                        { Array.from( { length: 25 } ).map( ( _ , i ) => (
                            <Input
                                key         = { i }
                                label       = { format( t.footerNode.field , i + 1 ) }
                                placeholder = { format( t.footerNode.fieldHint , i + 1 ) }
                            />
                        ))}
                    </div>
                </Modal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    { t.form.title }
                </h3>

                <Button onClick={ openForm }>
                    { t.form.trigger }
                </Button>

                <Modal
                    ref        = { formRef }
                    title      = { t.form.modal }
                    icon       = { <MdInfo size={30} className="text-primary" /> }
                    agree      = { t.form.submit }
                    agreeColor = "primary"
                    disagree   = { t.form.cancel }
                    onAgree    = {() => console.log( 'Form submitted' )}
                    maxWidth   = "max-w-md"
                >
                    <div className="flex flex-col gap-4 py-4">

                        <Input
                            icon        = { <MdDriveFileRenameOutline /> }
                            label       = { t.form.name }
                            placeholder = { t.form.nameHint }
                        />

                        <InputEmail
                            label       = { t.form.email }
                            placeholder = { t.form.emailHint }
                        />

                        <InputPassword
                            label       = { t.form.password }
                            placeholder = { t.form.passwordHint }
                        />

                        <Checkbox
                            color = 'primary'
                            label = { t.form.terms }
                        />

                    </div>
                </Modal>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    { t.hookUsage.title }
                </h3>

                <div className="mockup-code">
                    <pre data-prefix="1"><code>const {'{ modalRef, open, close, toggle, isOpen }'} = useModal() ;</code></pre>
                    <pre data-prefix="2"><code></code></pre>
                    <pre data-prefix="3"><code>// With callbacks</code></pre>
                    <pre data-prefix="4"><code>const {'{ modalRef, open }'} = useModal({'{'}</code></pre>
                    <pre data-prefix="5"><code>  onOpen: () =&gt; console.log('Opened'),</code></pre>
                    <pre data-prefix="6"><code>  onClose: () =&gt; console.log('Closed'),</code></pre>
                    <pre data-prefix="7"><code>{'}'}) ;</code></pre>
                    <pre data-prefix="8"><code></code></pre>
                    <pre data-prefix="9"><code>&lt;Button onClick={'{ open }'}&gt;Open&lt;/Button&gt;</code></pre>
                    <pre data-prefix="10"><code>&lt;Modal ref={'{ modalRef }'}&gt;Content&lt;/Modal&gt;</code></pre>
                </div>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    { t.stacked.title }
                </h3>

                <div className="flex flex-col gap-2">
                    <p className="text-sm text-base-content/70">{ t.stacked.note }</p>
                    <Button onClick={ openParent }>
                        { t.stacked.trigger }
                    </Button>
                </div>
                <Modal
                    ref={ parentModalRef }
                    title={ t.stacked.l1Title }
                    maxWidth="max-w-3xl"
                    agree={ t.stacked.l1Agree }
                    disagree={ t.stacked.l1Disagree }
                >
                    <div className="py-4 space-y-6">
                        <p>{ t.stacked.l1Body }</p>

                        <div className="card bg-base-200 p-6 flex flex-col items-center gap-4">
                            <p className="font-semibold text-center">{ t.stacked.l1Ask }</p>
                            <Button color="secondary" size="sm" onClick={ openChild }>
                                { t.stacked.l1Open }
                            </Button>
                        </div>

                        <div className="alert alert-info shadow-sm">
                            <MdInfo size={24} />
                            <span>{ t.stacked.l1Note }</span>
                        </div>
                    </div>
                </Modal>
                <Modal
                    ref={ childModalRef }
                    title={ t.stacked.l2Title }
                    maxWidth="max-w-md"
                    agree={ t.stacked.l2Agree }
                    disagree={ t.stacked.l2Disagree }
                    onAgree={() => console.log('Sub-item added')}
                >
                    <div className="py-4 space-y-4">
                        <Input label={ t.stacked.l2Name } placeholder={ t.stacked.l2NameHint } />

                        <Divider>{ t.stacked.l2Divider }</Divider>

                        <p className="text-sm">{ t.stacked.l2Body }</p>
                        <Button color="error" variant="outline" size="xs" onClick={ openConfirmation }>
                            { t.stacked.l2Delete }
                        </Button>
                    </div>
                </Modal>
                <ConfirmModal
                    ref={ confirmationRef }
                    title={ t.stacked.l3Title }
                    agree={ t.stacked.l3Agree }
                    disagree={ t.stacked.l3Disagree }
                    agreeColor="error"
                    onAgree={() => {
                        console.log('Deleted from level 3');
                        // Optional : we can close the level 2 here if we want
                    }}
                >
                    <div className="py-2">
                        <p>{ t.stacked.l3Body }</p>
                    </div>
                </ConfirmModal>
            </div>

        </Container>
    ) ;
} ;

export default ModalDemo ;