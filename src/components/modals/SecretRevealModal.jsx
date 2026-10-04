'use client' ;

/**
 * SecretRevealModal — shows a secret once, and will not let it be dismissed
 * until the reader has saved it.
 *
 * A value an API returns exactly once — a private key, a recovery code, a
 * token at creation or at rotation. The modal offers two ways of keeping it,
 * either of which unlocks the confirmation :
 *
 * - **Download**, which wraps the text in a blob and hands it over as a file,
 *   for an operator who will ship it to a secret manager.
 * - **Copy**, for a manual paste into an editor or a console.
 *
 * 🚨 **`saved` is a LATCH, not the passing state of `useClipboard`.** The hook
 * returns to `ready` a second and a half after a successful write — that is
 * what makes an icon flip back. Gating the confirmation on it would RE-LOCK the
 * dialog under a reader who had copied their secret and gone to paste it
 * somewhere. Once either gesture has succeeded, this one stays true for the
 * life of the reveal.
 *
 * 🔑 **The secret itself is the trigger.** Pass `null` and the component
 * renders nothing ; pass a value and the dialog opens, with both gates reset.
 * A host therefore holds one piece of state — the secret it has just been
 * handed — rather than a secret AND an open flag that can disagree.
 *
 * 🚨 **Nothing dismisses it while the secret is unsaved — not the backdrop,
 * not `Escape`.** Gating the confirmation alone left both of those open, which
 * made the promise above false : a stray click beside the dialog, or a reflex
 * `Escape`, and the value was gone for good. They unlock together with the
 * button, the moment either gesture succeeds.
 *
 * ⚠️ **A failure is reported in place, never through a toast.** `useToast`
 * throws outside its provider, and a library primitive cannot require one to be
 * mounted above it. A clipboard write that fails turns the hint line into the
 * reason, where the reader is already looking — and a host that wants a toast
 * of its own passes the four callbacks below : the library says WHAT happened,
 * the application says it in its own words.
 *
 * What a host adds through `children` is whatever identifies the secret — the
 * name of the service, the id of the key — rendered above it.
 *
 * @module components/modals/SecretRevealModal
 *
 * @param {Object}          props
 * @param {React.ReactNode} [props.agree]        - Agree button label. Defaults to the bundle's `agree`.
 * @param {React.ReactNode} [props.children]     - What identifies the secret, rendered between the warning and the secret.
 * @param {string}          [props.contentType='text/plain'] - Media type of the download. `'application/json'` for a secret that is a document.
 * @param {string}          [props.fileName='secret.txt'] - The name the download is saved under.
 * @param {Function}        [props.onAgree]           - Called when the reader confirms having saved the secret.
 * @param {Function}        [props.onCopyError]       - Called with the error when the clipboard write failed.
 * @param {Function}        [props.onCopySuccess]     - Called with the copied text.
 * @param {Function}        [props.onDownloadError]   - Called with the error when the download could not be started.
 * @param {Function}        [props.onDownloadSuccess] - Called with the file name once the download is handed to the browser.
 * @param {string}          [props.path='components.modal.secret'] - i18n path the labels are read from.
 * @param {string}          [props.secret]       - The text to reveal. `null` renders nothing ; a new value reopens the dialog with both gates reset.
 * @param {React.ReactNode} [props.title]        - Title of the dialog. Defaults to the bundle's `title`.
 * @param {React.ReactNode} [props.warning]      - The sentence saying the value is shown only once. Defaults to the bundle's `warning`.
 *
 * @example
 * ```jsx
 * <SecretRevealModal
 *     fileName = { `key-${ account.id }.json` }
 *     secret   = { revealed }
 *     title    = "Private key"
 *     onAgree  = { () => setRevealed( null ) }
 * >
 *     <p className="text-sm">Account : <strong>{ account.name }</strong></p>
 * </SecretRevealModal>
 * ```
 */

import { useEffect , useRef , useState } from 'react' ;

import { MdCheck , MdContentCopy , MdDownload } from 'react-icons/md' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import useClipboard from '../../hooks/useClipboard' ;

import forceDownload from '../../helpers/net/forceDownload' ;

import cn from '../../themes/helpers/cn' ;

import Alert from '../Alert' ;

import ConfirmModal from './ConfirmModal' ;

import useModal from './hooks/useModal' ;

/**
 * The media type a download falls back to when the caller names none.
 * @type {string}
 */
export const DEFAULT_SECRET_CONTENT_TYPE = 'text/plain' ;

/**
 * The name a download falls back to when the caller names none.
 * @type {string}
 */
export const DEFAULT_SECRET_FILENAME = 'secret.txt' ;

const SecretRevealModal =
({
    agree ,
    children ,
    contentType = DEFAULT_SECRET_CONTENT_TYPE ,
    fileName    = DEFAULT_SECRET_FILENAME ,
    onAgree ,
    onCopyError ,
    onCopySuccess ,
    onDownloadError ,
    onDownloadSuccess ,
    path     = 'components.modal.secret' ,
    secret ,
    title ,
    warning ,
    ...props
}) =>
{
    const t = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const [ copied     , setCopied     ] = useState( false ) ;
    const [ downloaded , setDownloaded ] = useState( false ) ;
    const [ failure    , setFailure    ] = useState( null ) ;

    const lastSecret = useRef( null ) ;

    const { modalRef , open } = useModal() ;

    // A fresh secret is a fresh reveal : both gates reopen, and so does the
    // dialog. The opening is ASKED FOR rather than assumed, because the dialog
    // node is mounted anew on each reveal — no secret, no render — and does
    // not exist yet when this effect runs. `open()` holds the intention until
    // the hook is handed a node, which is why `openOnMount` is not enough here :
    // it is consumed by the first reveal and a second one would never open.
    useEffect( () =>
    {
        if ( secret && lastSecret.current !== secret )
        {
            lastSecret.current = secret ;
            setCopied( false ) ;
            setDownloaded( false ) ;
            setFailure( null ) ;
            open() ;
        }
    }
    , [ secret , open ] ) ;

    const [ , copy ] = useClipboard
    ({
        onError : ( error , text ) =>
        {
            setFailure( t.copyFailed ?? 'Unable to copy to the clipboard.' ) ;
            onCopyError?.( error , text ) ;
        } ,
        onSuccess : ( text ) =>
        {
            setFailure( null ) ;
            setCopied( true ) ;
            onCopySuccess?.( text ) ;
        } ,
    }) ;

    if ( !secret ) { return null ; }

    const handleCopy = () => copy( secret ) ;

    const handleDownload = () =>
    {
        try
        {
            const blob = new Blob( [ secret ] , { type : contentType } ) ;
            forceDownload( fileName , URL.createObjectURL( blob ) , true ) ;
            setFailure( null ) ;
            setDownloaded( true ) ;
            onDownloadSuccess?.( fileName ) ;
        }
        catch ( error )
        {
            setFailure( t.downloadFailed ?? 'Download failed. Use the copy button instead.' ) ;
            onDownloadError?.( error , fileName ) ;
        }
    } ;

    const saved        = copied || downloaded ;
    const CopyIcon     = copied     ? MdCheck : MdContentCopy ;
    const DownloadIcon = downloaded ? MdCheck : MdDownload ;

    return (
        <ConfirmModal
            agree                = { agree ?? t.agree ?? 'I have saved this value' }
            agreeColor           = "primary"
            disableBackdropClick = { !saved }
            disableEscapeKeyDown = { !saved }
            fullScreenBreakpoint = "md"
            portal
            ref                  = { modalRef }
            showDisagree         = { false }
            title                = { title ?? t.title ?? 'Save this value now' }
            onAgree              = { () => onAgree?.() }
            { ...props }
            agreeDisabled        = { !saved }
        >
            <div className="flex flex-col gap-4">

                <Alert
                    align            = "start"
                    contentClassName = "text-sm"
                    iconClassName    = "size-5"
                    level            = "warning"
                    style            = "soft"
                >
                    { warning ?? t.warning ?? 'This value is shown only once. Close this dialog without saving it and it cannot be recovered.' }
                </Alert>

                { children }

                <div className="flex flex-col gap-2 min-w-0">

                    <div className="flex items-center justify-between gap-2 flex-wrap">

                        <span className="text-xs font-medium text-base-content/70">
                            { t.label ?? 'Secret' }
                        </span>

                        <div className="flex items-center gap-2">

                            <button
                                className = { cn( 'btn btn-sm btn-primary' , downloaded && 'btn-success' ) }
                                type      = "button"
                                onClick   = { handleDownload }
                            >
                                <DownloadIcon className="size-4" />
                                <span>{ downloaded ? ( t.downloaded ?? 'Downloaded' ) : ( t.download ?? 'Download' ) }</span>
                            </button>

                            <button
                                className = { cn( 'btn btn-sm btn-warning' , copied && 'btn-success' ) }
                                type      = "button"
                                onClick   = { handleCopy }
                            >
                                <CopyIcon className="size-4" />
                                <span>{ copied ? ( t.copied ?? 'Copied' ) : ( t.copy ?? 'Copy' ) }</span>
                            </button>

                        </div>

                    </div>

                    <pre className="rounded-box border-2 border-warning/40 bg-warning/5 p-3 text-xs sm:text-sm font-mono overflow-auto max-h-96 whitespace-pre-wrap break-all">
                        { secret }
                    </pre>

                    { failure && (
                        <span className="text-[0.7rem] text-error">{ failure }</span>
                    ) }

                    { !saved && !failure && (
                        <span className="text-[0.7rem] text-base-content/60">
                            { t.hint ?? 'Download or copy the value to unlock the button below.' }
                        </span>
                    ) }

                </div>

            </div>
        </ConfirmModal>
    ) ;
} ;

SecretRevealModal.displayName = 'SecretRevealModal' ;

export default SecretRevealModal ;
