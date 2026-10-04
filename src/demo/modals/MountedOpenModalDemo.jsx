'use client' ;

import { useEffect , useRef , useState } from 'react' ;

import Badge    from '@/components/Badge' ;
import Button   from '@/components/Button' ;
import Portal   from '@/components/Portal' ;
import Modal    from '@/components/modals/Modal' ;
import useModal from '@/components/modals/hooks/useModal' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Container from '@/display/Container' ;

const ATTACHED = 'attached' ;
const MISSING  = 'missing' ;
const OPENED   = 'opened' ;

/**
 * The modal is wrapped in a `Portal` by the caller and opens itself through the
 * raw DOM node, which is the plainest form of the recipe.
 */
const PortalWrapped = ({ i18n , onClose , onResult }) =>
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
                title        = { i18n.wrapped.title }
                agree        = { i18n.close }
                showDisagree = { false }
                onClose      = { onClose }
            >
                <p className="py-4">{ i18n.wrapped.body }</p>
            </Modal>
        </Portal>
    ) ;
} ;

PortalWrapped.displayName = 'PortalWrapped' ;

/**
 * Same recipe, with the portal delegated to the modal's own `portal` prop.
 */
const PortalProp = ({ i18n , onClose , onResult }) =>
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
            title        = { i18n.prop.title }
            agree        = { i18n.close }
            showDisagree = { false }
            onClose      = { onClose }
        >
            <p className="py-4">{ i18n.prop.body }</p>
        </Modal>
    ) ;
} ;

PortalProp.displayName = 'PortalProp' ;

/**
 * The supported path : the hook owns the node and `open()` is what asks for it.
 */
const HookDriven = ({ i18n , onClose , onResult }) =>
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
                title        = { i18n.hook.title }
                agree        = { i18n.close }
                showDisagree = { false }
            >
                <p className="py-4">{ i18n.hook.body }</p>
            </Modal>
        </Portal>
    ) ;
} ;

HookDriven.displayName = 'HookDriven' ;

/**
 * No effect at all : mounting the component is the request to open it.
 */
const HookOnMount = ({ i18n , onClose , onResult }) =>
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
                title        = { i18n.onMount.title }
                agree        = { i18n.close }
                showDisagree = { false }
            >
                <p className="py-4">{ i18n.onMount.body }</p>
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
const Case = ({ children , component : Component , i18n , title }) =>
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
                    { i18n.mount }
                </Button>

                { shown && (
                    <Button color="neutral" style="outline" onClick={ () => setShown( false ) }>
                        { i18n.unmount }
                    </Button>
                ) }

                { result === ATTACHED && <Badge color="success">{ i18n.attached }</Badge> }
                { result === OPENED   && <Badge color="success">{ i18n.opened }</Badge> }
                { result === MISSING  && <Badge color="error">{ i18n.missing }</Badge> }

            </div>

            { shown && (
                <Component
                    i18n     = { i18n }
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
 * @param {Object} props
 * @param {string} [props.path='demo.modals.mountedOpen'] - Dot notation path to the demo locale.
 * @returns {React.JSX.Element}
 */
const MountedOpenModalDemo = ( { path = 'demo.modals.mountedOpen' } = {} ) =>
{
    const t = useI18n( path ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <p className="text-sm text-base-content/70">{ t.description }</p>

            <div className="flex flex-col gap-4">

                <Case component={ PortalWrapped } i18n={ t } title={ t.wrapped.card }>
                    { t.wrapped.hint }
                </Case>

                <Case component={ PortalProp } i18n={ t } title={ t.prop.card }>
                    { t.prop.hint }
                </Case>

                <Case component={ HookDriven } i18n={ t } title={ t.hook.card }>
                    { t.hook.hint }
                </Case>

                <Case component={ HookOnMount } i18n={ t } title={ t.onMount.card }>
                    { t.onMount.hint }
                </Case>

            </div>

            <div className="text-xs text-base-content/60 leading-relaxed">
                <p>{ t.note }</p>
            </div>

        </Container>
    ) ;
} ;

MountedOpenModalDemo.displayName = 'MountedOpenModalDemo' ;

export default MountedOpenModalDemo ;
