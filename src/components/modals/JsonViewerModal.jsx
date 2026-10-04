'use client' ;

/**
 * JsonViewerModal — a read-only look at a payload, with one click to copy it.
 *
 * What it is for : seeing the exact value a screen was rendered from, when a
 * field does not appear and the question is whether it ever arrived. It shows,
 * it copies, it closes — there is nothing to edit.
 *
 * 🔑 **It takes the VALUE, not a string.** An object is pretty-printed here,
 * degrading to `String()` on the cyclic or non-serializable case rather than
 * throwing inside a dialog opened to investigate a defect. A string is shown
 * as it was given, so a caller holding an already-formatted payload hands it
 * straight over.
 *
 * ⚠️ **It reports a copy in place and never toasts** — `useToast` throws
 * outside its provider, which a primitive cannot require. A host that wants a
 * toast of its own passes `onCopySuccess` / `onCopyError` : the library says
 * WHAT happened, the application says it in its own words.
 *
 * It is drawn with `MockupCodeBlock` rather than `CodeBlock` on purpose : no
 * syntax highlighter is pulled into the page's bundle for the many readers who
 * will never open it. That block's own hover-only copy button is off, in favour
 * of an always-visible one in the header — a hover affordance is invisible on a
 * touch screen.
 *
 * It keeps `Modal`'s standard footer rather than a `footerNode`, so the single
 * button closes the dialog by itself : the `ref` is there for the caller to
 * OPEN the dialog, and nothing inside depends on its shape.
 *
 * ⚠️ **The copy button asks for a FLOATING tooltip.** A modal header sits in a
 * box that hides its overflow, and daisyUI draws its bubble in a pseudo-element
 * of the trigger — which cannot leave that box, whatever its `z-index`.
 * Portalling the dialog does not help : it moves the whole thing, bubble
 * included, into the same clipping box somewhere else. `tooltipFloat` is what
 * moves the BUBBLE into a portal of its own.
 *
 * It opens **below and to the left** : the button lives at the right end of the
 * header, so a bubble centred on it, or opening above it, has nowhere to go.
 *
 * @module components/modals/JsonViewerModal
 *
 * @param {Object}          props
 * @param {React.ReactNode} [props.agree]    - Close button label. Defaults to the bundle's `agree`.
 * @param {Function}        [props.onCopyError]   - Called with the error when the clipboard write failed.
 * @param {Function}        [props.onCopySuccess] - Called with the copied text. For a toast of the host's own.
 * @param {string}          [props.path='components.modal.json'] - i18n path the labels are read from.
 * @param {Object}          [props.ref]      - Ref on the underlying `<dialog>`.
 * @param {React.ReactNode} [props.subtitle] - A line above the payload saying where it comes from. Defaults to the bundle's `subtitle`.
 * @param {React.ReactNode} [props.title]    - Title of the dialog. Defaults to the bundle's `title`.
 * @param {*}               [props.value]    - The payload. An object is pretty-printed, a string is shown as given.
 *
 * @example
 * ```jsx
 * <JsonViewerModal ref={ jsonRef } value={ record } />
 * ```
 */

import { useMemo } from 'react' ;

import { MdDataObject } from 'react-icons/md' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import useClipboard , { ERROR } from '../../hooks/useClipboard' ;

import toJsonText from '../../helpers/strings/toJsonText' ;

import CopyButton      from '../buttons/CopyButton' ;
import MockupCodeBlock from '../typography/markdown/MockupCodeBlock' ;

import Modal from './Modal' ;

/**
 * Re-exported for the hosts that imported it from here before it moved to
 * `helpers/strings/toJsonText`. Prefer the helper : a payload is formatted in
 * plenty of places that open no dialog at all.
 */
export { default as toJsonText } from '../../helpers/strings/toJsonText' ;

const JsonViewerModal =
({
    agree ,
    onCopyError ,
    onCopySuccess ,
    path = 'components.modal.json' ,
    ref ,
    subtitle ,
    title ,
    value ,
    ...props
}) =>
{
    const t = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const [ state , copy ] = useClipboard
    ({
        onError   : ( error , text ) => onCopyError?.( error , text ) ,
        onSuccess : ( text ) => onCopySuccess?.( text ) ,
    }) ;

    const json = useMemo( () => toJsonText( value ) , [ value ] ) ;

    const subtitleText = subtitle ?? t.subtitle ?? null ;

    return (
        <Modal
            agree                = { agree ?? t.agree ?? 'Close' }
            agreeColor           = "neutral"
            fullScreenBreakpoint = "md"
            icon                 = { <MdDataObject size={ 20 } /> }
            maxWidth             = "max-w-4xl"
            portal
            ref                  = { ref }
            showCloseButton
            showDisagree         = { false }
            title                = { title ?? t.title ?? 'Payload' }
            headerOptions        = {
                <CopyButton
                    size            = "sm"
                    tooltipAlign    = "end"
                    tooltipFloat
                    tooltipPosition = "bottom"
                    onClick         = { () => copy( json ) }
                />
            }
            { ...props }
        >
            <div className="flex flex-col gap-3 px-1">

                { subtitleText && (
                    <p className="text-xs text-base-content/60">{ subtitleText }</p>
                ) }

                <MockupCodeBlock
                    showCopyButton  = { false }
                    showLineNumbers
                >
                    { json }
                </MockupCodeBlock>

                { state === ERROR && (
                    <p className="text-xs text-error">
                        { t.copyFailed ?? 'Unable to copy to the clipboard.' }
                    </p>
                ) }

            </div>
        </Modal>
    ) ;
} ;

JsonViewerModal.displayName = 'JsonViewerModal' ;

export default JsonViewerModal ;
