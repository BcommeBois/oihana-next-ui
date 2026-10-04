'use client' ;

/**
 * ConfirmTypedModal — a confirmation whose agree button stays locked until the
 * reader has typed the value the caller declared.
 *
 * The GitHub / Stripe / Slack gesture : the caller names an `expected` value —
 * an email, a name, a key — and nothing can be agreed to until it is typed
 * back, compared trimmed and case-insensitively. Reach for it where the action
 * is irreversible and one misclick does real harm : a hard delete, a cascade to
 * an external identity provider. Not for a soft delete, an archive, or anywhere
 * an ordinary confirmation says enough.
 *
 * 🚨 **The typed value is cleared on both doors : a new `expected`, and the
 * dialog closing.** One instance commonly serves a whole list, re-aimed from row
 * to row, and a value typed for a row the reader then LEFT would keep the button
 * unlocked for the next one.
 *
 * Clearing it on a change of `expected` is not enough, and that is the subtle
 * half : `Modal` calls `onCancel` from the disagree and close BUTTONS only — the
 * backdrop and `Escape` go through the dialog's own closing. Dismissed by either
 * of those and reopened on the SAME row, the field still held its value and the
 * agree button was already unlocked. So the reset hangs off `onClose`, which
 * every door passes through.
 *
 * ⚠️ **It portals by default**, unlike `Modal`. The trigger of a destructive
 * confirmation is almost always a row action, and a row is almost always a
 * link : without the portal, a click on « Cancel » or on the backdrop bubbles
 * up the DOM and navigates to the row the reader was trying not to destroy.
 * Pass `portal={ false }` for a trigger that sits in no such place.
 *
 * 🔑 **It is a preset, not a flag on `ConfirmModal`.** `ConfirmModal` is used
 * everywhere ; giving it a field, a piece of state and a reset effect would
 * make every one of its callers carry a variant none of them asked for. The
 * family is built of presets, and this is one more.
 *
 * Only the two labels of its own making are read from the bundle — the field's
 * label and its helper. `agree`, `disagree` and the close button are left to
 * `ConfirmModal` and `Modal`, which resolve them from `components.modal` :
 * declaring a label twice is how a stray English one survives.
 *
 * @module components/modals/ConfirmTypedModal
 *
 * @param {Object}          props
 * @param {boolean}         [props.agreeDisabled=false]    - Blocks the agree button on top of the typed gate. The gate can never be loosened by it.
 * @param {boolean}         [props.busy=false]             - The action is running. The agree button spins and nothing can be agreed to again.
 * @param {React.ReactNode} [props.children]               - A fully custom body. Given, it replaces `description` ; the field is always drawn under it.
 * @param {React.ReactNode} [props.description]            - What the action will do, as a sentence.
 * @param {string}          props.expected                  - The value that must be typed back. Required — nothing unlocks while it is empty.
 * @param {React.ReactNode} [props.expectedHelper]         - Helper under the field. Defaults to the bundle's `helper`.
 * @param {React.ReactNode} [props.expectedLabel]          - Label of the field. Defaults to the bundle's `label`.
 * @param {string}          [props.inputPlaceholder]       - Placeholder of the field. Defaults to `expected` itself, as a visible hint.
 * @param {Function}        [props.onAgree]                - Called when the reader agrees. Never called while the gate is closed.
 * @param {Function}        [props.onCancel]               - Called when the reader backs out through the disagree or close button.
 * @param {Function}        [props.onClose]                - Called when the dialog closes, whichever door was used. Chained after the reset.
 * @param {string}          [props.path='components.modal.typed'] - i18n path the field's own labels are read from.
 * @param {boolean}         [props.portal=true]            - Render through a portal on `document.body`.
 * @param {Object}          [props.ref]                    - Ref on the underlying `<dialog>`.
 *
 * @example
 * ```jsx
 * <ConfirmTypedModal
 *     ref         = { confirmRef }
 *     agree       = "Delete"
 *     busy        = { deleting }
 *     description = "This cannot be undone."
 *     expected    = { account.email }
 *     onAgree     = { remove }
 *     title       = "Delete this account?"
 * />
 * ```
 */

import { useEffect , useState } from 'react' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import Input from '../inputs/Input' ;

import ConfirmModal from './ConfirmModal' ;

/**
 * Both sides of the comparison, reduced to what a reader can reasonably be
 * asked to reproduce : no surrounding spaces, no case.
 *
 * @param {string} [value]
 * @returns {string}
 */
const normalize = ( value ) => ( value ?? '' ).trim().toLowerCase() ;

const ConfirmTypedModal =
({
    agreeDisabled = false ,
    busy          = false ,
    children ,
    description ,
    expected ,
    expectedHelper ,
    expectedLabel ,
    inputPlaceholder ,
    onAgree ,
    onCancel ,
    onClose ,
    path          = 'components.modal.typed' ,
    portal        = true ,
    ref ,
    ...props
}) =>
{
    const
    {
        helper : helperFromI18n ,
        label  : labelFromI18n ,
    }
    = useI18n( path , NO_LOCALE , false ) ;

    const [ typed , setTyped ] = useState( '' ) ;

    // Re-aimed at another target, the field must forget what was typed for the
    // previous one. See the module note : this is the line that stops the wrong
    // entity being deleted.
    useEffect( () => { setTyped( '' ) ; } , [ expected ] ) ;

    const matches = expected != null && expected !== '' && normalize( typed ) === normalize( expected ) ;
    const blocked = !matches || busy || agreeDisabled ;

    const handleAgree = () =>
    {
        if ( blocked ) { return ; }
        onAgree?.() ;
    } ;

    const handleCancel = () =>
    {
        setTyped( '' ) ;
        onCancel?.() ;
    } ;

    // Every door passes through here — the two buttons, the backdrop, `Escape` —
    // which is why the reset hangs off it and not off `onCancel` alone.
    const handleClose = ( event ) =>
    {
        setTyped( '' ) ;
        onClose?.( event ) ;
    } ;

    return (
        <ConfirmModal
            ref           = { ref }
            busy          = { busy }
            portal        = { portal }
            onAgree       = { handleAgree }
            onCancel      = { handleCancel }
            onClose       = { handleClose }
            { ...props }
            agreeDisabled = { blocked }
        >
            <div className="flex flex-col gap-3">

                { children ?? ( description && <p className="text-sm">{ description }</p> ) }

                <Input
                    helper      = { expectedHelper ?? helperFromI18n }
                    label       = { expectedLabel  ?? labelFromI18n }
                    placeholder = { inputPlaceholder ?? expected ?? '' }
                    value       = { typed }
                    onChange    = { ( value ) => setTyped( value ) }
                />

            </div>
        </ConfirmModal>
    ) ;
} ;

ConfirmTypedModal.displayName = 'ConfirmTypedModal' ;

export default ConfirmTypedModal ;
