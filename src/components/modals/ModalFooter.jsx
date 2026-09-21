'use client' ;

/**
 * ModalFooter — the footer a `Modal` takes through `footerNode` : a status on
 * the left, the decision on the right.
 *
 * ```
 * [ start ] [ status… ]                       [ disagree ] [ agree ]
 * ←—— left, the status truncates ——→          ←—— right-aligned ——→
 * ```
 *
 * It speaks the vocabulary of `Modal` — `agree`, `disagree`, `busy` — so every
 * footer of an application reads the same way, whether it is the standard one
 * or this one.
 *
 * - **A button is drawn only when its handler is given.** An informational
 *   panel passes `onAgree` alone and gets a single « Close » :
 *   `<ModalFooter agree="Close" agreeColor="neutral" onAgree={ close } />`.
 * - **`busy`** : the agree button turns `loading` — it keeps the focus, shows a
 *   spinner and ignores clicks — and the disagree button is disabled, as in
 *   the standard footer of `Modal`. The modal itself is not locked : with a
 *   `footerNode`, the caller decides (`disableBackdropClick`,
 *   `disableEscapeKeyDown`), as `FormModal` does.
 *
 * The labels are not read here : the caller passes them, or relies on a preset
 * — `FormModal` — that reads its own.
 *
 * @module components/modals/ModalFooter
 *
 * @example
 * ```jsx
 * <Modal
 *     ref        = { modalRef }
 *     title      = "Edit"
 *     footerNode = {
 *         <ModalFooter
 *             agree         = "Save"
 *             agreeDisabled = { !valid }
 *             busy          = { saving }
 *             disagree      = "Cancel"
 *             onAgree       = { save }
 *             onDisagree    = { () => modalRef.current?.close() }
 *             status        = { dirty ? 'Unsaved changes' : null }
 *         />
 *     }
 * >
 *     …
 * </Modal>
 * ```
 */

import Button from '../Button' ;

import cn from '../../themes/helpers/cn' ;

/**
 * @param {Object}          props
 * @param {React.ReactNode} [props.agree]                  - Agree button label.
 * @param {React.ReactNode} [props.agreeBusyLabel]         - Agree button label while `busy`. Omitted, the label does not change.
 * @param {string}          [props.agreeColor='primary']   - Color of the agree button.
 * @param {boolean}         [props.agreeDisabled=false]    - Nothing to agree to yet — an invalid or untouched form.
 * @param {boolean}         [props.busy=false]             - The agree action is running.
 * @param {string}          [props.className]              - Additional class names on the root.
 * @param {React.ReactNode} [props.disagree]               - Disagree button label.
 * @param {(event: MouseEvent) => void} [props.onAgree]    - Agree handler. Omitted, no agree button.
 * @param {(event: MouseEvent) => void} [props.onDisagree] - Disagree handler. Omitted, no disagree button.
 * @param {string}          [props.size='sm']              - Size of both buttons.
 * @param {React.ReactNode} [props.start]                  - Content before the status : a badge, a count.
 * @param {React.ReactNode} [props.status]                 - A line of text — « Unsaved changes », « Required : … ». Truncated when too long.
 * @returns {React.ReactElement}
 */
const ModalFooter =
({
    agree ,
    agreeBusyLabel ,
    agreeColor    = 'primary' ,
    agreeDisabled = false ,
    busy          = false ,
    className ,
    disagree ,
    onAgree ,
    onDisagree ,
    size          = 'sm' ,
    start ,
    status ,
}) =>
(
    <div className={ cn( 'flex items-center gap-3 px-4 py-3' , className ) }>

        <div className="flex min-w-0 flex-1 items-center gap-3 text-xs text-base-content/60">
            { start }
            { status ? <span className="truncate">{ status }</span> : null }
        </div>

        { onDisagree ? (
            <Button
                disabled = { busy }
                onClick  = { onDisagree }
                size     = { size }
                style    = "ghost"
                type     = "button"
            >
                { disagree }
            </Button>
        ) : null }

        { onAgree ? (
            <Button
                color        = { agreeColor }
                disabled     = { agreeDisabled && !busy }
                loading      = { busy }
                loadingLabel = { agreeBusyLabel }
                onClick      = { onAgree }
                size         = { size }
                type         = "button"
            >
                { agree }
            </Button>
        ) : null }

    </div>
) ;

ModalFooter.displayName = 'ModalFooter' ;

export default ModalFooter ;
