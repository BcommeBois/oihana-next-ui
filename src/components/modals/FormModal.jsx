'use client' ;

/**
 * FormModal — a form in a dialog : it opens on mount, refuses to lose a draft,
 * and closes when the save says so.
 *
 * 🔑 **What the caller keeps is its form and its save.** The body is the
 * children ; the save is one function. How the dialog opens, refuses to close
 * and asks before losing a draft lives here.
 *
 * **Closing is a request, not an act** — the footer's cancel, the header's
 * close button, the backdrop and `Escape` all go through it :
 *
 *  - saving → refused outright, so a submit in flight cannot be orphaned ;
 *  - dirty  → the exit confirmation is asked, and only its agreement closes ;
 *  - clean  → closes straight away, there is nothing to lose.
 *
 * The header carries a close button of its own rather than the `Modal` one,
 * which would close without asking.
 *
 * 🚨 **`onSave` says whether to close, by returning.** Return (or resolve) a
 * truthy value on success and the dialog closes ; return nothing and it stays
 * open on its errors.
 *
 * ⚠️ **`onClose` is called once, by the dialog itself.** Every path — cancel,
 * the header button, the exit confirmation, a successful save — ends on the
 * native `close` event, and the notification is wired there only.
 *
 * **Labels** : each prop wins, then the i18n bundle at `path` — its root
 * `disagree` and `close`, and its `form` sub-block for the save and the exit
 * confirmation — then an English last resort.
 *
 * @module components/modals/FormModal
 *
 * @example
 * ```jsx
 * <FormModal
 *     dirty        = { dirty }
 *     icon         = { <MdEdit size={ 20 } /> }
 *     onClose      = { onClose }
 *     onSave       = { async () => ( await save( values ) )?.ok }
 *     saveDisabled = { !valid || !dirty }
 *     saving       = { saving }
 *     statusText   = { dirty ? 'Unsaved changes' : null }
 *     title        = "Edit policy"
 * >
 *     <Input … />
 * </FormModal>
 * ```
 */

import { MdOutlineClose as CloseIcon } from 'react-icons/md' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import ConfirmModal from './ConfirmModal' ;
import Modal        from './Modal' ;
import ModalFooter  from './ModalFooter' ;
import useModal     from './hooks/useModal' ;

/**
 * Wording of the exit confirmation. Each key falls back to the i18n bundle,
 * then to English.
 *
 * `description` accepts a node as well as a string — a count of pending
 * changes, for instance.
 *
 * @typedef {Object} FormModalExit
 * @property {string}          [title]
 * @property {string}          [agree]
 * @property {string}          [disagree]
 * @property {React.ReactNode} [description]
 */

/**
 * @param {Object}          props
 * @param {React.ReactNode} props.children                       - The form itself.
 * @param {string}          [props.cancelLabel]                  - Footer cancel label. Defaults to the i18n `disagree`, then `'Cancel'`.
 * @param {string}          [props.closeLabel]                   - Accessible name of the header close button. Defaults to the i18n `close`, then `'Close'`.
 * @param {boolean}         [props.dirty=false]                  - The form holds unsaved input. Drives the exit guard.
 * @param {FormModalExit}   [props.exit]                         - Wording of the exit confirmation.
 * @param {React.ReactNode} [props.extra]                        - Footer content before the status line : a diff badge, a count.
 * @param {string}          [props.fullScreenBreakpoint='md']    - Below this breakpoint, the dialog takes the whole screen.
 * @param {React.ReactNode} [props.headerOptions]                - Controls in the header, BEFORE the close button, which stays last.
 * @param {React.ReactNode} [props.icon]                         - Title icon.
 * @param {string}          [props.maxWidth='max-w-2xl']         - Tailwind max-width of the dialog.
 * @param {string}          [props.modalBoxClassName]            - Extra classes on the dialog box — a pinned height, so a long list does not make it jump.
 * @param {Function}        [props.onClose]                      - Called once, when the dialog has closed, whichever path closed it.
 * @param {Function}        props.onSave                         - Called on save. Return / resolve truthy to close the dialog.
 * @param {string}          [props.path='components.modal']      - i18n path of the modal labels.
 * @param {boolean}         [props.saveDisabled=false]           - Nothing to save yet.
 * @param {string}          [props.saveLabel]                    - Footer save label. Defaults to the i18n `form.agree`, then `'Save'`.
 * @param {string}          [props.savingLabel]                  - Save label while saving. Defaults to the i18n `form.agreeBusy`, then `'Saving…'`.
 * @param {boolean}         [props.saving=false]                 - A submit is in flight. Locks every way out.
 * @param {React.ReactNode} [props.statusText]                   - Footer status line (« Unsaved changes », « Required : … »).
 * @param {React.ReactNode} props.title                          - Dialog title.
 * @returns {React.ReactElement}
 */
const FormModal =
({
    cancelLabel ,
    children ,
    closeLabel ,
    dirty                = false ,
    exit                 = {} ,
    extra ,
    fullScreenBreakpoint = 'md' ,
    headerOptions ,
    icon ,
    maxWidth             = 'max-w-2xl' ,
    modalBoxClassName ,
    onClose ,
    onSave ,
    path                 = 'components.modal' ,
    saveDisabled         = false ,
    saveLabel ,
    savingLabel ,
    saving               = false ,
    statusText ,
    title ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;
    const form   = labels.form ?? {} ;
    const quit   = form.exit ?? {} ;

    // The form's own dialog : its mounting IS the request to open it.
    const { modalRef , close : closeModal } = useModal( { openOnMount : true } ) ;

    // The exit question, asked only when there is something to lose.
    const { modalRef : exitRef , open : openExit } = useModal() ;

    const requestClose = () =>
    {
        if ( saving ) { return ; }
        if ( dirty )  { openExit() ; return ; }
        closeModal() ;
    } ;

    const handleSave = async () =>
    {
        if ( await onSave?.() )
        {
            closeModal() ;
        }
    } ;

    const close = closeLabel ?? labels.close ?? 'Close' ;

    return (
        <>

            <Modal
                ref                  = { modalRef }
                disableBackdropClick = { dirty || saving }
                disableEscapeKeyDown = { dirty || saving }
                fullScreenBreakpoint = { fullScreenBreakpoint }
                icon                 = { icon }
                maxWidth             = { maxWidth }
                modalBoxClassName    = { modalBoxClassName }
                onClose              = { () => onClose?.() }
                showCloseButton      = { false }
                title                = { title }
                headerOptions        = {
                    <>
                        { headerOptions }
                        <button
                            aria-label = { close }
                            className  = "btn btn-md btn-circle btn-ghost"
                            disabled   = { saving }
                            onClick    = { requestClose }
                            type       = "button"
                        >
                            <CloseIcon aria-hidden size={ 20 } />
                        </button>
                    </>
                }
                footerNode           = {
                    <ModalFooter
                        agree          = { saveLabel ?? form.agree ?? 'Save' }
                        agreeBusyLabel = { savingLabel ?? form.agreeBusy ?? 'Saving…' }
                        agreeDisabled  = { saveDisabled }
                        busy           = { saving }
                        disagree       = { cancelLabel ?? labels.disagree ?? 'Cancel' }
                        onAgree        = { handleSave }
                        onDisagree     = { requestClose }
                        start          = { extra }
                        status         = { statusText }
                    />
                }
            >
                { children }
            </Modal>

            <ConfirmModal
                ref           = { exitRef }
                agree         = { exit.agree    ?? quit.agree    ?? 'Discard' }
                agreeColor    = "error"
                disagree      = { exit.disagree ?? quit.disagree ?? 'Keep editing' }
                disagreeColor = "neutral"
                onAgree       = { closeModal }
                title         = { exit.title    ?? quit.title    ?? 'Discard changes?' }
            >
                <p className="text-sm">
                    { exit.description ?? quit.description ?? 'Your changes will be lost.' }
                </p>
            </ConfirmModal>

        </>
    ) ;
} ;

FormModal.displayName = 'FormModal' ;

export default FormModal ;
