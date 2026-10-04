'use client' ;

/**
 * PromptModal — asks for a line of text before an action is carried out, and
 * hands it back trimmed.
 *
 * The small dialog that asks WHY : why an appointment was called off, why a
 * document was rejected, what to call a copy. The wording is entirely the
 * caller's, because the same dialog asks three different questions on three
 * different screens, and a component that chose the sentence would be wrong on
 * two of them.
 *
 * 🔑 **Mounting it IS the request to open it.** It takes no ref and offers no
 * `open()` : a host renders it when it wants to ask, and unmounts it from
 * `onCancel` or once `onAgree` has been handled. That is how a question asked
 * in passing is reached — the alternative, a permanently mounted dialog held
 * shut by a ref, keeps the text of the last question alive between two
 * unrelated gestures.
 *
 * 🔑 **`onAgree` receives the TEXT, not the click event** — trimmed, and an
 * empty string when nothing was typed. It is the one place this family departs
 * from `Modal`'s vocabulary, and it does so because the text is the entire
 * point of the dialog.
 *
 * ⚠️ **Optional by default.** `required` gates the agree button on a non-empty
 * value, but leave it off unless the answer is genuinely needed : these are
 * gestures made in a hurry, and a mandatory field is answered with « . » or
 * with the name of the action itself, which is worse than no answer at all.
 *
 * It portals, for the same reason as {@link ConfirmTypedModal} : the trigger is
 * usually a row action inside a link.
 *
 * @module components/modals/PromptModal
 *
 * @param {Object}          props
 * @param {React.ReactNode} [props.agree]            - Agree button label. Left to `Modal` when omitted.
 * @param {string}          [props.agreeColor='primary'] - Color of the agree button.
 * @param {React.ReactNode} [props.body]             - A sentence saying what the action will do. Omitted when there is nothing to warn about.
 * @param {boolean}         [props.busy=false]       - The action is running : the footer spins and neither `Escape` nor the backdrop closes the dialog.
 * @param {React.ReactNode} [props.disagree]         - Disagree button label. Left to `Modal` when omitted.
 * @param {string}          [props.initialValue='']  - Pre-filled text. Empty everywhere but a « correct the wording » form.
 * @param {React.ReactNode} [props.label]            - Label of the field.
 * @param {number}          [props.maxLength]        - Ceiling on the length, enforced by the field.
 * @param {Function}        [props.onAgree]          - Called with the TRIMMED text.
 * @param {Function}        [props.onCancel]         - Called ONCE whenever the dialog closes without agreeing — the disagree button, the backdrop, `Escape`. Unmount from here.
 * @param {string}          [props.path='components.modal'] - i18n path the `agree` / `disagree` labels are read from.
 * @param {string}          [props.placeholder]      - Placeholder of the field.
 * @param {boolean}         [props.required=false]   - Gate the agree button on a non-empty value. Read the warning above first.
 * @param {number}          [props.rows=3]           - Height of the field, in rows. Ignored by an autosizing field.
 * @param {Object}          [props.textAreaProps]    - Spread last onto the `TextArea` — `autosize`, `minRows`, `maxRows`, a counter. The escape hatch the charts keep with `nivoProps`.
 * @param {React.ReactNode} [props.title]            - Title of the dialog.
 *
 * @example
 * ```jsx
 * { asking && (
 *     <PromptModal
 *         agree       = "Call it off"
 *         body        = "The slot goes back to the calendar."
 *         label       = "Reason (optional)"
 *         title       = "Call off this booking?"
 *         onAgree     = { reason => { cancelBooking( reason ) ; setAsking( false ) ; } }
 *         onCancel    = { () => setAsking( false ) }
 *     />
 * ) }
 * ```
 */

import { useState } from 'react' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import Modal       from './Modal' ;
import ModalFooter from './ModalFooter' ;

import TextArea from '../inputs/TextArea' ;

import useModal from './hooks/useModal' ;

const PromptModal =
({
    agree ,
    agreeColor   = 'primary' ,
    body ,
    busy         = false ,
    disagree ,
    initialValue = '' ,
    label ,
    maxLength ,
    onAgree ,
    onCancel ,
    path         = 'components.modal' ,
    placeholder ,
    required     = false ,
    rows         = 3 ,
    textAreaProps ,
    title ,
    ...props
}
= {} ) =>
{
    const
    {
        agree    : agreeFromI18n ,
        disagree : disagreeFromI18n ,
    }
    = useI18n( path , NO_LOCALE , false ) ;

    // `onCancel` is wired to the dialog's own `close`, not to the disagree
    // button : a reader backs out through three doors — the button, the
    // backdrop, `Escape` — and a host that unmounts from it must be told once,
    // whichever one was used.
    const { modalRef , close } = useModal( { openOnMount : true , onClose : () => onCancel?.() } ) ;

    const [ value , setValue ] = useState( initialValue ) ;

    const trimmed = value.trim() ;

    return (
        <Modal
            ref                  = { modalRef }
            disableBackdropClick = { busy }
            disableEscapeKeyDown = { busy }
            fullScreenBreakpoint = "md"
            maxWidth             = "max-w-lg"
            portal
            title                = { title }
            footerNode           = {
                <ModalFooter
                    agree         = { agree    ?? agreeFromI18n }
                    agreeColor    = { agreeColor }
                    agreeDisabled = { busy || ( required && trimmed === '' ) }
                    busy          = { busy }
                    disagree      = { disagree ?? disagreeFromI18n }
                    onAgree       = { () => onAgree?.( trimmed ) }
                    onDisagree    = { close }
                />
            }
            { ...props }
        >
            <div className="flex flex-col gap-3 px-2">

                { body && <p className="text-sm text-base-content/70">{ body }</p> }

                <TextArea
                    label       = { label }
                    maxLength   = { maxLength }
                    placeholder = { placeholder }
                    rows        = { rows }
                    { ...textAreaProps }
                    value       = { value }
                    onChange    = { ( next ) => setValue( next ) }
                />

            </div>
        </Modal>
    ) ;
} ;

PromptModal.displayName = 'PromptModal' ;

export default PromptModal ;
