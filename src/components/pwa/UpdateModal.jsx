'use client' ;

/**
 * Says a newer build is waiting, and swaps to it on demand.
 *
 * Registers the Service Worker through {@link module:hooks/useServiceWorkerUpdate}
 * and, once an update is announced, opens a dialog showing the version running
 * and the version waiting. « Reload » hands the waiting worker its
 * `SKIP_WAITING` and reloads as it takes control ; « Later » closes the dialog
 * until the next announcement.
 *
 * Mount it once, high in the tree, so it covers every route. It renders
 * nothing until there is something to say.
 *
 * ### 🔑 Why the running version is a PROP
 *
 * The worker knows which build is WAITING ; only the application knows which
 * one it is currently running, because that string is written into its own
 * bundle at build time. A library cannot read it, and guessing it would be
 * worse than leaving it out.
 *
 * ⚠️ **Dismissing is remembered for the session, not for the build.** « Later »
 * silences this announcement ; a further one — the worker finding yet another
 * build — opens the dialog again. Nothing is stored, so a reload brings it
 * back : a build waiting to take over is not something to forget.
 *
 * @module components/pwa/UpdateModal
 *
 * @param {Object} props
 * @param {string} [props.currentVersion] - The version of the running bundle, shown as the one being left.
 * @param {string} [props.path='components.pwa.update'] - Dot notation path to the copy.
 * @param {Object} [props.serviceWorker] - Forwarded to `useServiceWorkerUpdate` : `path`, `versionUrl`, `checkInterval`, `checkOnFocus`.
 *
 * @example
 * ```jsx
 * // In the root layout, once.
 * import version from '@/version' ;
 *
 * <UpdateModal currentVersion={ version } />
 * ```
 *
 * @example
 * ```jsx
 * // A worker that is not at /sw.js, and its own words.
 * <UpdateModal
 *     currentVersion = { version }
 *     path           = "app.pwa.update"
 *     serviceWorker  = { { path : '/service-worker.js' , checkOnFocus : false } }
 * />
 * ```
 */

import { useEffect , useState } from 'react' ;

import { MdSystemUpdateAlt } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n from '../../contexts/locale/useI18n' ;

import useServiceWorkerUpdate from '../../hooks/useServiceWorkerUpdate' ;

import Modal       from '../modals/Modal' ;
import ModalFooter from '../modals/ModalFooter' ;
import useModal    from '../modals/hooks/useModal' ;

const UpdateModal =
({
    currentVersion : runningVersion ,
    path = 'components.pwa.update' ,
    serviceWorker ,
}) =>
{
    const t = useI18n( path ) ?? {} ;

    const { applyUpdate , currentVersion , nextVersion , updateAvailable } =
        useServiceWorkerUpdate( { ...serviceWorker , currentVersion : runningVersion } ) ;

    const { modalRef , close : closeModal , open : openModal } = useModal() ;

    const [ dismissed , setDismissed ] = useState( false ) ;

    // The dialog only exists from the render where an update is announced, so
    // the request comes before the node — `open()` holds it until then.
    useEffect( () =>
    {
        if ( updateAvailable && !dismissed )
        {
            openModal() ;
        }
    }
    , [ dismissed , openModal , updateAvailable ] ) ;

    if ( !updateAvailable ) { return null ; }

    const handleLater = () =>
    {
        setDismissed( true ) ;
        closeModal() ;
    } ;

    const from = currentVersion ?? '?' ;
    const to   = nextVersion ?? '…' ;

    const footerNode = (
        <ModalFooter
            agree      = { t.reload ?? 'Reload' }
            disagree   = { t.later ?? 'Later' }
            onAgree    = { applyUpdate }
            onDisagree = { handleLater }
        />
    ) ;

    return (
        <Modal
            ref                  = { modalRef }
            title                = { t.title ?? 'Update available' }
            icon                 = { <MdSystemUpdateAlt size={ 20 } /> }
            maxWidth             = "max-w-md"
            modalBoxClassName    = "text-base-content"
            fullScreenBreakpoint = "md"
            showCloseButton      = { false }
            footerNode           = { footerNode }
            onClose              = { () => setDismissed( true ) }
        >

            <div className="flex flex-col gap-4 text-sm px-2">

                <p className="text-base-content/70">
                    { t.description ?? '' }
                </p>

                <div
                    aria-label = { format( t.versions ?? 'From version {0} to version {1}' , from , to ) }
                    className  = "flex items-center justify-center gap-3 rounded-box bg-base-200 px-4 py-3 font-mono text-sm"
                >
                    <span aria-hidden="true" className="opacity-60">{ from }</span>
                    <span aria-hidden="true">→</span>
                    <span aria-hidden="true" className="font-semibold text-primary">{ to }</span>
                </div>

            </div>

        </Modal>
    ) ;
} ;

UpdateModal.displayName = 'UpdateModal' ;

export default UpdateModal ;
