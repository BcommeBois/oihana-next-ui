'use client' ;

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
    MdSave
} from 'react-icons/md' ;

const ModalDemo = () =>
{
    // Simple modal
    const { modalRef: simpleRef, open: openSimple } = useModal() ;

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

            <h2 className="text-3xl font-bold">Modal Examples with useModal Hook</h2>

            {/* Simple Modal */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Simple Modal
                </h3>

                <Button onClick={ openSimple }>
                    Open Simple Modal
                </Button>

                <Modal
                    ref                  = { simpleRef }
                    title                = "Hello!"
                    agree                = "Close"
                    showDisagree         = { false }
                    disableEscapeKeyDown = { false }
                    disableBackdropClick = { false }
                >
                    <p className="py-2">
                        Press ESC key or click the button below to close
                    </p>
                </Modal>
            </div>

            <Divider />


            {/* Responsive Fullscreen Breakpoint */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Responsive Fullscreen (Breakpoint)
                </h3>

                <div className="flex gap-2 flex-wrap">
                    <Button onClick={ openBreakpointMd }>
                        Fullscreen &lt; md (mobile)
                    </Button>

                    <Button onClick={ openBreakpointLg }>
                        Fullscreen &lt; lg (tablet + mobile)
                    </Button>

                    <Button onClick={ openBreakpointXl }>
                        Fullscreen &lt; xl (desktop + tablet + mobile)
                    </Button>
                </div>

                {/* Mobile fullscreen */}
                <Modal
                    ref={ breakpointMdRef }
                    title="Mobile Fullscreen"
                    fullScreenBreakpoint="md"
                    agree="Close"
                    showDisagree={ false }
                >
                    <div className="space-y-4">
                        <p>Ce modal est :</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Fullscreen</strong> sur mobile (&lt; 768px)</li>
                            <li><strong>Normal</strong> sur desktop (&ge; 768px)</li>
                        </ul>
                        <p className="text-sm text-base-content/70">
                            Redimensionnez votre fenêtre pour voir l'effet !
                        </p>
                    </div>
                </Modal>

                {/* Tablet + Mobile fullscreen */}
                <Modal
                    ref={ breakpointLgRef }
                    title="Tablet + Mobile Fullscreen"
                    fullScreenBreakpoint="lg"
                    agree="Close"
                    showDisagree={ false }
                >
                    <div className="space-y-4">
                        <p>Ce modal est :</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Fullscreen</strong> sur tablet et mobile (&lt; 1024px)</li>
                            <li><strong>Normal</strong> sur large screens (&ge; 1024px)</li>
                        </ul>
                    </div>
                </Modal>

                {/* Desktop + Tablet + Mobile fullscreen */}
                <Modal
                    ref={ breakpointXlRef }
                    title="Almost Always Fullscreen"
                    fullScreenBreakpoint="xl"
                    agree="Close"
                    showDisagree={ false }
                >
                    <div className="space-y-4">
                        <p>Ce modal est :</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Fullscreen</strong> jusqu'à xl (&lt; 1280px)</li>
                            <li><strong>Normal</strong> seulement sur très larges écrans (&ge; 1280px)</li>
                        </ul>
                    </div>
                </Modal>
            </div>

            <Divider />

            {/* Toggle Modal Demo */}
            <div className="flex flex-col gap-4">

                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Toggle Modal (with State Tracking)
                </h3>

                <div className="flex gap-2 items-center">
                    <Button onClick={ toggleModal }>
                        { toggleIsOpen ? 'Close' : 'Open' } Toggle Modal
                    </Button>

                    <Badge color={ toggleIsOpen ? 'success' : 'neutral' }>
                        { toggleIsOpen ? 'Open' : 'Closed' }
                    </Badge>
                </div>

                <Modal
                    ref          = { toggleRef }
                    title        = "Toggle Modal"
                    placement    = "bottom"
                    agree        = "Close"
                    showDisagree = { false }
                >
                    <p className="py-4">
                        This modal uses the <code className="badge badge-sm">toggle</code> function and <code className="badge badge-sm">isOpen</code> state.
                    </p>
                </Modal>
            </div>

            <Divider />

            {/* Alert Modals */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Alert Modals (Single Button)
                </h3>

                <div className="flex gap-2 flex-wrap">
                    <Button color="success" onClick={ openAlertSuccess }>
                        Success Alert
                    </Button>

                    <Button color="info" onClick={ openAlertInfo }>
                        Info Alert
                    </Button>

                    <Button color="warning" onClick={ openAlertWarning }>
                        Warning Alert
                    </Button>

                    <Button color="error" onClick={ openAlertError }>
                        Error Alert
                    </Button>
                </div>

                {/* Success Alert */}
                <AlertModal
                    ref={ alertSuccessRef }
                    title="Success!"
                    icon={ <MdCheckCircle size={40} className="text-success" /> }
                    agree="Great!"
                    agreeColor="success"
                >
                    <p>Your operation was completed successfully.</p>
                </AlertModal>

                {/* Info Alert */}
                <AlertModal
                    ref={ alertInfoRef }
                    title="Information"
                    icon={ <MdInfo size={40} className="text-info" /> }
                    agree="Got it"
                    agreeColor="info"
                >
                    <div className="py-4">
                        <p className="mb-2">Here's some important information:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Your session will expire in 10 minutes</li>
                            <li>Please save your work regularly</li>
                            <li>Contact support if you need help</li>
                        </ul>
                    </div>
                </AlertModal>

                {/* Warning Alert */}
                <AlertModal
                    ref={ alertWarningRef }
                    title="Warning"
                    icon={ <MdWarning size={40} className="text-warning" /> }
                    agree="I understand"
                    agreeColor="warning"
                >
                    <div className="alert alert-warning">
                        <MdWarning />
                        <span>This action may have unintended consequences.</span>
                    </div>
                </AlertModal>

                {/* Error Alert */}
                <AlertModal
                    ref={ alertErrorRef }
                    title="Error"
                    icon={ <MdError size={40} className="text-error" /> }
                    agree="Close"
                    agreeColor="error"
                >
                    <div className="py-4">
                        <p className="font-semibold mb-2">Payment could not be processed</p>
                        <p className="text-sm text-base-content/70 mb-4">
                            Please check your payment information and try again.
                        </p>
                        <div className="alert alert-error">
                            <span className="font-mono text-sm">Error code: CARD_DECLINED</span>
                        </div>
                    </div>
                </AlertModal>
            </div>

            <Divider />

            {/* Confirm Modals */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Confirmation Modals (Two Buttons)
                </h3>

                <div className="flex gap-2 flex-wrap">
                    <Button color="error" onClick={ openConfirmDelete }>
                        Delete Item
                    </Button>

                    <Button color="primary" onClick={ openConfirmSave }>
                        Save Changes
                    </Button>
                </div>

                {/* Delete Confirmation */}
                <ConfirmModal
                    ref={ confirmDeleteRef }
                    title="Delete Item"
                    icon={ <MdDelete size={40} className="text-error" /> }
                    agree="Delete"
                    agreeIcon={ <MdDelete size={20} /> }
                    disagree="Cancel"
                    onAgree={() => console.log( 'Item deleted' )}
                    onCancel={() => console.log( 'Deletion cancelled' )}
                >
                    <div className="py-4">
                        <p className="mb-4">Are you sure you want to delete this item?</p>
                        <div className="alert alert-warning">
                            <MdWarning />
                            <span>This action cannot be undone.</span>
                        </div>
                    </div>
                </ConfirmModal>

                {/* Save Confirmation */}
                <ConfirmModal
                    ref={ confirmSaveRef }
                    title="Save Changes"
                    icon={ <MdSave size={40} className="text-primary" /> }
                    agree="Save"
                    agreeColor="primary"
                    agreeIcon={ <MdSave size={20} /> }
                    disagree="Discard"
                    disagreeColor="error"
                    onAgree={() => console.log( 'Changes saved' )}
                    onCancel={() => console.log( 'Changes discarded' )}
                >
                    <p className="py-4">
                        You have unsaved changes. Do you want to save them before leaving?
                    </p>
                </ConfirmModal>
            </div>

            <Divider />

            {/* Fullscreen Modal */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Fullscreen Modal
                </h3>

                <Button onClick={ openFullscreen }>
                    Open Fullscreen Modal
                </Button>

                <Modal
                    ref             = { fullscreenRef }
                    title           = "Fullscreen Modal"
                    fullScreen      = { true }
                    agree           = "Close"
                    showDisagree    = { false }
                    showCloseButton = { true }
                >
                    <div className="flex flex-col flex-1 h-full items-center justify-center gap-4">
                        <p className="text-2xl font-bold">This modal takes the full screen</p>
                        <p className="text-base-content/70">Great for immersive content or forms</p>
                    </div>
                </Modal>
            </div>

            <Divider />

            {/* Responsive & Placement */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">
                    Responsive & Placement
                </h3>

                <div className="flex gap-2 flex-wrap">
                    <Button onClick={ openResponsive }>
                        Responsive (Bottom → Middle)
                    </Button>

                    <Button onClick={ openTop }>
                        Top Placement
                    </Button>

                    <Button onClick={ openBottom }>
                        Bottom Placement
                    </Button>
                </div>

                {/* Responsive Modal */}
                <Modal
                    ref                 = { responsiveRef }
                    title               = "Responsive Modal"
                    placement           = "bottom"
                    responsivePlacement = "sm:modal-middle"
                    agree               = "Close"
                    showDisagree        = { false }
                >
                    <p className="py-4">
                        This modal appears at the bottom on mobile (<code className="badge badge-sm">modal-bottom</code>) and
                        in the middle on desktop (<code className="badge badge-sm">sm:modal-middle</code>).
                    </p>
                </Modal>

                {/* Top Modal */}
                <Modal
                    ref          = { topRef }
                    title        = "Top Modal"
                    placement    = "top"
                    agree        = "Close"
                    showDisagree = { false }
                    // fullWidth    = { true }
                >
                    <p className="py-4">
                        This modal is positioned at the top of the screen.
                    </p>
                </Modal>

                {/* Bottom Modal */}
                <Modal
                    ref          = { bottomRef }
                    title        = "Bottom Modal"
                    placement    = "bottom"
                    agree        = "Close"
                    showDisagree = { false }
                    // fullWidth    = { true }
                >
                    <p className="py-4">
                        This modal is positioned at the bottom of the screen.
                    </p>
                </Modal>
            </div>

            <Divider />

            {/* Custom Width */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    Custom Width
                </h3>

                <Button onClick={ openCustomWidth }>
                    Open Wide Modal (max-w-5xl)
                </Button>

                <Modal
                    ref          = { customWidthRef }
                    title        = "Wide Modal"
                    maxWidth     = "max-w-5xl"
                    agree        = "Close"
                    showDisagree = { false }
                >
                    <div className="py-4">
                        <p className="mb-4">This modal has a custom maximum width of 5xl.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h3 className="card-title text-sm">Column 1</h3>
                                    <p className="text-xs">Wide modals are great for complex content</p>
                                </div>
                            </div>
                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h3 className="card-title text-sm">Column 2</h3>
                                    <p className="text-xs">Like multi-column layouts</p>
                                </div>
                            </div>
                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h3 className="card-title text-sm">Column 3</h3>
                                    <p className="text-xs">Or detailed forms</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>

            <Divider />

            {/* Behavior Options */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">
                    Behavior Options
                </h3>

                <div className="flex gap-2 flex-wrap">
                    <Button onClick={ openNoBackdrop }>
                        No Backdrop Click
                    </Button>

                    <Button onClick={ openNoEsc }>
                        No ESC Key
                    </Button>

                    <Button onClick={ openCloseButton }>
                        With Close Button
                    </Button>
                </div>

                {/* No Backdrop Click */}
                <Modal
                    ref          = { noBackdropRef }
                    title        = "No Backdrop Click"
                    agree        = "Close"
                    showDisagree = { false }
                    disableBackdropClick
                >
                    <div className="py-4">
                        <p className="mb-2">Clicking outside won't close this modal.</p>
                        <p className="text-sm text-base-content/70">
                            Use the button or ESC key to close.
                        </p>
                    </div>
                </Modal>

                {/* No ESC Key */}
                <Modal
                    ref          = { noEscRef }
                    title        = "No ESC Key"
                    agree        = "Close"
                    showDisagree = { false }
                    disableEscapeKeyDown
                >
                    <div className="py-4">
                        <p className="mb-2">ESC key won't close this modal.</p>
                        <p className="text-sm text-base-content/70">
                            Use the button or click outside to close.
                        </p>
                    </div>
                </Modal>

                {/* With Close Button */}
                <Modal
                    ref={ closeButtonRef }
                    title="Close Button in Corner"
                    showCloseButton
                    agree="OK"
                    showDisagree={ false }
                >
                    <p className="py-4">
                        This modal has a close button (✕) in the top-right corner.
                    </p>
                </Modal>
            </div>

            <Divider />

            {/* Custom Footer */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Custom Footer
                </h3>

                <div className="flex gap-2 flex-wrap">
                    <Button onClick={ openNoFooter }>
                        No Footer
                    </Button>

                    <Button onClick={ openCustomFooter }>
                        Custom Footer Options
                    </Button>
                </div>

                {/* No Footer */}
                <Modal
                    ref={ noFooterRef }
                    title="Modal without Footer"
                    showFooter={ false }
                    showCloseButton
                >
                    <p className="py-4">
                        This modal has no footer. Close it with the ✕ button or ESC key.
                    </p>
                </Modal>

                {/* Custom Footer Options */}
                <Modal
                    ref           = { customFooterRef }
                    title         = "Custom Footer"
                    agree         = "Accept"
                    disagree      = "Decline"
                    footerOptions =
                    {
                        <Button size="sm" color="ghost">
                            Learn More
                        </Button>
                    }
                >
                    <p className="py-4">
                        This modal has a custom button in the footer alongside the standard buttons.
                    </p>
                </Modal>
            </div>

            <Divider />

            {/* Form Example */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Form in Modal
                </h3>

                <Button onClick={ openForm }>
                    Open Form Modal
                </Button>

                <Modal
                    ref        = { formRef }
                    title      = "User Registration"
                    icon       = { <MdInfo size={30} className="text-primary" /> }
                    agree      = "Submit"
                    agreeColor = "primary"
                    disagree   = "Cancel"
                    onAgree    = {() => console.log( 'Form submitted' )}
                    maxWidth   = "max-w-md"
                >
                    <div className="flex flex-col gap-4 py-4">

                        <Input
                            icon        = { <MdDriveFileRenameOutline /> }
                            label       = "Name"
                            placeholder = "Enter your name"
                        />

                        <InputEmail
                            label       = "Email"
                            placeholder = "Enter your email"
                        />

                        <InputPassword
                            label       = "Password"
                            placeholder = "Enter password"
                        />

                        <Checkbox
                            color = 'primary'
                            label = "Accept terms and conditions"
                        />

                    </div>
                </Modal>
            </div>

            <Divider />

            {/* Hook Usage Examples */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    useModal Hook Usage
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

            {/* Stacked Modals Demo */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Stacked Modals (Nesting)
                </h3>

                <div className="flex flex-col gap-2">
                    <p className="text-sm text-base-content/70">
                        You can open multiple modals on top of each other. The browser handles the stacking order.
                    </p>
                    <Button onClick={ openParent }>
                        Open Level 1 Modal
                    </Button>
                </div>

                {/* Level 1: Parent Modal */}
                <Modal
                    ref={ parentModalRef }
                    title="Level 1: Configuration"
                    maxWidth="max-w-3xl"
                    agree="Save All"
                    disagree="Cancel"
                >
                    <div className="py-4 space-y-6">
                        <p>This is the first layer. You might be configuring a complex object here.</p>

                        <div className="card bg-base-200 p-6 flex flex-col items-center gap-4">
                            <p className="font-semibold text-center">Need to add a sub-item?</p>
                            <Button color="secondary" size="sm" onClick={ openChild }>
                                Open Level 2: Sub-item Form
                            </Button>
                        </div>

                        <div className="alert alert-info shadow-sm">
                            <MdInfo size={24} />
                            <span>The backdrop of Level 2 will cover Level 1.</span>
                        </div>
                    </div>
                </Modal>

                {/* Level 2: Child Modal */}
                <Modal
                    ref={ childModalRef }
                    title="Level 2: Sub-item Details"
                    maxWidth="max-w-md"
                    agree="Add Sub-item"
                    disagree="Go Back"
                    onAgree={() => console.log('Sub-item added')}
                >
                    <div className="py-4 space-y-4">
                        <Input label="Sub-item Name" placeholder="e.g. Component X" />

                        <Divider>Safety Check</Divider>

                        <p className="text-sm">Before confirming, you can even open a 3rd layer!</p>
                        <Button color="error" variant="outline" size="xs" onClick={ openConfirmation }>
                            Delete Sub-item (Level 3)
                        </Button>
                    </div>
                </Modal>

                {/* Level 3: Confirmation Modal */}
                <ConfirmModal
                    ref={ confirmationRef }
                    title="Level 3: Confirm Deletion"
                    agree="Delete Now"
                    disagree="Keep it"
                    agreeColor="error"
                    onAgree={() => {
                        console.log('Deleted from level 3');
                        // Optional : we can close the level 2 here if we want
                    }}
                >
                    <div className="py-2">
                        <p>Are you absolutely sure? This is the third layer of modals.</p>
                    </div>
                </ConfirmModal>
            </div>

        </Container>
    ) ;
} ;

export default ModalDemo ;