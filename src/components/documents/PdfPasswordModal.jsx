'use client' ;

/**
 * PdfPasswordModal — asks the password of a protected document.
 *
 * Mounting it is the request to open it, as with `PromptModal` : `PdfViewer`
 * renders it when pdf.js asks for a password, and again — with `wrong` — when
 * the one given did not open the document. `onAgree` receives the password,
 * `onCancel` is called once when the reader gives up.
 *
 * @module components/documents/PdfPasswordModal
 *
 * @param {Object} props
 * @param {Function} props.onAgree - `( password ) => void`.
 * @param {Function} [props.onCancel] - Called once when the dialog closes without a password.
 * @param {string} [props.path='components.document'] - i18n path whose `password` block holds the words.
 * @param {boolean} [props.wrong=false] - The previous password did not open the document.
 */

import { useRef , useState } from 'react' ;

import Modal         from '../modals/Modal' ;
import useModal      from '../modals/hooks/useModal' ;
import InputPassword from '../inputs/InputPassword' ;

import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useI18n   from '../../contexts/locale/useI18n' ;

const PdfPasswordModal =
({
    onAgree ,
    onCancel ,
    path = 'components.document' ,
    wrong = false ,
}) =>
{
    const { password : labels = {} } = useI18n( path , NO_LOCALE , false ) ;

    const [ value , setValue ] = useState( '' ) ;

    // The dialog closes after agreeing too : `onClose` must know which it was.
    const agreed = useRef( false ) ;

    const { modalRef , close } = useModal(
    {
        onClose     : () => { if ( !agreed.current ) onCancel?.() ; } ,
        openOnMount : true ,
    } ) ;

    const submit = () =>
    {
        agreed.current = true ;
        onAgree( value ) ;
        close() ;
    } ;

    return (
        <Modal
            agree        = { labels.agree ?? 'Open' }
            closeOnAgree = { false }
            onAgree      = { submit }
            portal
            ref          = { modalRef }
            title        = { labels.title ?? 'This document is protected' }
        >
            <form
                className = "flex flex-col gap-3 py-2"
                onSubmit  = { event => { event.preventDefault() ; submit() ; } }
            >
                <InputPassword
                    autoFocus
                    error    = { wrong ? ( labels.wrong ?? 'This password does not open the document.' ) : undefined }
                    label    = { labels.label ?? 'Password' }
                    onChange = { setValue }
                    value    = { value }
                />
            </form>
        </Modal>
    ) ;
} ;

PdfPasswordModal.displayName = 'PdfPasswordModal' ;

export default PdfPasswordModal ;
