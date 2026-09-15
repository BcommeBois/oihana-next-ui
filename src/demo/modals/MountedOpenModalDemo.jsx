'use client' ;

import { useEffect , useRef , useState } from 'react' ;

import Badge    from '@/components/Badge' ;
import Button   from '@/components/Button' ;
import Portal   from '@/components/Portal' ;
import Modal    from '@/components/modals/Modal' ;
import useModal from '@/components/modals/hooks/useModal' ;

import Container from '@/display/Container' ;

const ATTACHED = 'attached' ;
const MISSING  = 'missing' ;
const OPENED   = 'opened' ;

/**
 * The modal is wrapped in a `Portal` by the caller and opens itself through the
 * raw DOM node, which is the plainest form of the recipe.
 */
const PortalWrapped = ({ onClose , onResult }) =>
{
    const dialogRef = useRef( null ) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: opening once on mount is the whole point — a re-run would reopen a modal the reader has closed
    useEffect( () =>
    {
        const node = dialogRef.current ;
        node?.showModal() ;
        onResult( node ? ATTACHED : MISSING ) ;
    }
    , [] ) ;

    return (
        <Portal>
            <Modal
                ref          = { dialogRef }
                title        = "Portal-wrapped"
                agree        = "Close"
                showDisagree = { false }
                onClose      = { onClose }
            >
                <p className="py-4">
                    Mounted and opened in the same pass, through a <code className="badge badge-sm">Portal</code> the
                    caller wrote itself.
                </p>
            </Modal>
        </Portal>
    ) ;
} ;

PortalWrapped.displayName = 'PortalWrapped' ;

/**
 * Same recipe, with the portal delegated to the modal's own `portal` prop.
 */
const PortalProp = ({ onClose , onResult }) =>
{
    const dialogRef = useRef( null ) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: opening once on mount is the whole point — a re-run would reopen a modal the reader has closed
    useEffect( () =>
    {
        const node = dialogRef.current ;
        node?.showModal() ;
        onResult( node ? ATTACHED : MISSING ) ;
    }
    , [] ) ;

    return (
        <Modal
            ref          = { dialogRef }
            portal
            title        = "portal prop"
            agree        = "Close"
            showDisagree = { false }
            onClose      = { onClose }
        >
            <p className="py-4">
                The modal is asked to portal itself with <code className="badge badge-sm">portal</code>, rather
                than being wrapped by the caller.
            </p>
        </Modal>
    ) ;
} ;

PortalProp.displayName = 'PortalProp' ;

/**
 * The supported path : the hook owns the node and `open()` is what asks for it.
 */
const HookDriven = ({ onClose , onResult }) =>
{
    const { modalRef , open } = useModal({ onClose }) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: opening once on mount is the whole point — a re-run would reopen a modal the reader has closed
    useEffect( () =>
    {
        open() ;
        onResult( modalRef.current ? ATTACHED : MISSING ) ;
    }
    , [] ) ;

    return (
        <Portal>
            <Modal
                ref          = { modalRef }
                title        = "useModal"
                agree        = "Close"
                showDisagree = { false }
            >
                <p className="py-4">
                    Opened through <code className="badge badge-sm">open()</code> instead of the DOM node, so the
                    hook is free to hold the intention until it has something to open.
                </p>
            </Modal>
        </Portal>
    ) ;
} ;

HookDriven.displayName = 'HookDriven' ;

/**
 * No effect at all : mounting the component is the request to open it.
 */
const HookOnMount = ({ onClose , onResult }) =>
{
    const { modalRef } = useModal({
        onClose ,
        onOpen      : () => onResult( OPENED ) ,
        openOnMount : true ,
    }) ;

    return (
        <Portal>
            <Modal
                ref          = { modalRef }
                title        = "openOnMount"
                agree        = "Close"
                showDisagree = { false }
            >
                <p className="py-4">
                    The component holds no effect and makes no call. It mounts already meaning to be open,
                    and the hook opens whatever node it is eventually handed.
                </p>
            </Modal>
        </Portal>
    ) ;
} ;

HookOnMount.displayName = 'HookOnMount' ;

/**
 * One card : a button that mounts the component, and the component that opens
 * itself. The result of the attempt is reported beside the button, because a
 * modal that never opens looks exactly like a button that was never clicked.
 */
const Case = ({ children , component : Component , title }) =>
{
    const [ shown  , setShown  ] = useState( false ) ;
    const [ result , setResult ] = useState( null ) ;

    const mount = () =>
    {
        setResult( null ) ;
        setShown( true ) ;
    } ;

    return (
        <div className="flex flex-col gap-3 p-4 rounded-box bg-base-100">

            <h3 className="font-semibold">{ title }</h3>

            <p className="text-sm text-base-content/70">
                { children }
            </p>

            <div className="flex flex-wrap items-center gap-2">

                <Button color="primary" onClick={ mount } disabled={ shown }>
                    Mount and open
                </Button>

                { shown && (
                    <Button color="neutral" style="outline" onClick={ () => setShown( false ) }>
                        Unmount
                    </Button>
                ) }

                { result === ATTACHED && <Badge color="success">ref attached</Badge> }
                { result === OPENED   && <Badge color="success">opened on mount</Badge> }
                { result === MISSING  && <Badge color="error">ref still null</Badge> }

            </div>

            { shown && (
                <Component
                    onClose  = { () => setShown( false ) }
                    onResult = { setResult }
                />
            ) }

        </div>
    ) ;
} ;

Case.displayName = 'Case' ;

/**
 * Demo : a modal that is mounted on demand and opens itself, through a portal.
 *
 * This is how a modal is reached when the component holding it is rendered by a
 * click rather than by the page — a row that opens its own editor, a route that
 * mounts a confirmation. There is no second click to open it : the component
 * mounts already meaning to be open, and says so from an effect.
 *
 * @returns {React.JSX.Element}
 */
const MountedOpenModalDemo = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Mounted on demand, opened on mount</h2>

            <p className="text-sm text-base-content/70">
                Each button mounts a component that opens its own modal from a mount effect, with no
                second click. The three cards differ only in how the modal reaches the portal and how
                it is told to open.
            </p>

            <div className="flex flex-col gap-4">

                <Case title="Wrapped in a Portal by the caller" component={ PortalWrapped }>
                    <code className="badge badge-sm">&lt;Portal&gt;&lt;Modal ref /&gt;&lt;/Portal&gt;</code> and
                    a <code className="badge badge-sm">showModal()</code> on the node.
                </Case>

                <Case title="Portalled by the modal itself" component={ PortalProp }>
                    <code className="badge badge-sm">&lt;Modal portal ref /&gt;</code> and
                    the same <code className="badge badge-sm">showModal()</code>.
                </Case>

                <Case title="Driven by useModal" component={ HookDriven }>
                    <code className="badge badge-sm">open()</code> from the hook, which owns the node
                    and its listeners.
                </Case>

                <Case title="Declared with openOnMount" component={ HookOnMount }>
                    <code className="badge badge-sm">useModal({ '{ openOnMount : true }' })</code> and
                    no effect in the component at all.
                </Case>

            </div>

            <div className="text-xs text-base-content/60 leading-relaxed">
                <p>
                    The badge reports whether the node existed when the effect ran. A modal that stays
                    shut with <strong>ref attached</strong> is a different defect from one that stays shut
                    with <strong>ref still null</strong> — the second means the effect ran before the node
                    was in the document, and the optional call swallowed it.
                </p>
            </div>

        </Container>
    ) ;
} ;

MountedOpenModalDemo.displayName = 'MountedOpenModalDemo' ;

export default MountedOpenModalDemo ;
