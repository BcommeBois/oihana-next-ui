import { useCallback, useEffect, useMemo, useRef, useState } from 'react' ;

/**
 * Hook to manage modal state with native <dialog> API.
 *
 * `open()` never depends on the node being there yet. Asked before the modal has
 * reached the DOM — through a portal, or from the mount effect of a component
 * that renders itself already meaning to be open — the intention is held and
 * played the moment the ref setter is handed a node. So an opening is late at
 * worst, never lost.
 *
 * @param {Object} options
 * @param {Function} [options.onOpen] - Callback when modal opens
 * @param {Function} [options.onClose] - Callback when modal closes
 * @param {boolean} [options.lock=false] - Prevent opening and closing if true
 * @param {boolean} [options.openOnMount=false] - Open as soon as there is a node to open, with no call at all. Read once, on mount : changing it afterwards does nothing. Use it for a modal whose mounting *is* the request to open it, and drop the mount effect that would otherwise ask.
 *
 * @returns {Object} - { modalRef, open, close, toggle, isOpen }
 *
 * @example Opened on a click
 * ```jsx
 * const { modalRef, open, close, toggle, isOpen } = useModal() ;
 *
 * <Button onClick={open}>Open</Button>
 * <Modal ref={modalRef}>Content</Modal>
 * ```
 *
 * @example Mounted on demand, already meaning to be open
 * ```jsx
 * const { modalRef } = useModal({ openOnMount : true , onClose : unmountMe }) ;
 *
 * <Portal><Modal ref={modalRef}>Content</Modal></Portal>
 * ```
 */
const useModal =
({
    lock = false,
    onOpen,
    onClose,
    openOnMount = false,
}
= {} ) =>
{
    const [ isOpen, setIsOpen ] = useState( false ) ;

    const onOpenRef  = useRef( onOpen  ) ;
    const onCloseRef = useRef( onClose ) ;
    const lockRef    = useRef( lock    ) ;

    useEffect(() =>
    {
         onOpenRef.current = onOpen  ;
        onCloseRef.current = onClose ;
           lockRef.current = lock    ;
    }
    , [ onOpen, onClose, lock ] ) ;

    const internalNode = useRef( null ) ;

    // An opening asked for before there is anything to open. A node does not
    // always exist on the commit that renders it : a portal reaches its target
    // one commit later, and a component that mounts already meaning to be open
    // runs its effect before the node has landed. Dropping the call there is
    // what made `open()` fail without a word. It is kept here instead, and the
    // ref setter below replays it the moment it is handed a node.
    //
    // `openOnMount` is nothing more than this intention, pre-loaded : the hook
    // opens whatever node it is eventually given, whenever that is.
    const pendingOpen = useRef( openOnMount ) ;

    // Native <dialog> closing fires a `close` event…
    const handleCloseEvent = useCallback(() =>
    {
        setIsOpen( false ) ;
        onCloseRef.current?.() ;
    }
    , [] ) ;

    // …a popover element fires a `toggle` event (also on declarative open via
    // `popovertarget`), so we sync `isOpen` and the callbacks from its newState.
    // Modern browsers fire `toggle` on <dialog> elements too — those are already
    // driven by `open()` and the `close` event, so only popover nodes are handled
    // here (otherwise onOpen / onClose would fire twice on a dialog).
    const handleToggleEvent = useCallback(( event ) =>
    {
        if ( !event.target?.popover )
        {
            return ;
        }
        const opened = event.newState === 'open' ;
        setIsOpen( opened ) ;
        ( opened ? onOpenRef : onCloseRef ).current?.() ;
    }
    , [] ) ;

    // The one place a node is actually opened, whichever way the order arrived :
    // through `open()` with the node already there, or through the ref setter
    // replaying an intention that had nowhere to go.
    const openNode = useCallback( ( node ) =>
    {
        if ( !node || lockRef.current )
        {
            return ;
        }

        if ( node.popover ) // popover element : the `toggle` event drives isOpen / onOpen
        {
            if ( !node.matches( ':popover-open' ) )
            {
                node.showPopover() ;
            }
            return ;
        }

        if ( node.open )
        {
            return ;
        }

        node.showModal() ;
        setIsOpen( true ) ;
        onOpenRef.current?.() ;
    }
    , [] ) ;

    const modalRef = useMemo(() =>
    ({
        get current()
        {
            return internalNode.current ;
        } ,
        set current( node )
        {
            if ( internalNode.current === node )
            {
                return ;
            }

            if ( internalNode.current )
            {
                internalNode.current.removeEventListener( 'close', handleCloseEvent ) ;
                internalNode.current.removeEventListener( 'toggle', handleToggleEvent ) ;
            }

            internalNode.current = node ;

            if ( node )
            {
                // Attaching both keeps the hook agnostic of dialog vs popover ;
                // the toggle handler ignores <dialog> nodes (modern browsers fire
                // `toggle` on those too, `close` already drives them).
                node.addEventListener( 'close' , handleCloseEvent ) ;
                node.addEventListener( 'toggle' , handleToggleEvent ) ;

                if ( pendingOpen.current )
                {
                    pendingOpen.current = false ;
                    openNode( node ) ;
                }
            }
        }
    }), [ handleCloseEvent , handleToggleEvent , openNode ]) ;

    const open = useCallback(() =>
    {
        if ( lock )
        {
            return ;
        }

        const node = modalRef.current ;

        if ( !node )
        {
            pendingOpen.current = true ;
            return ;
        }

        openNode( node ) ;
    }
    , [ lock, modalRef, openNode ] ) ;

    const close = useCallback(() =>
    {
        if ( lock )
        {
            return ;
        }

        // Closing before the node arrived calls off the opening that was waiting
        // for it, rather than letting it fire once the node lands.
        pendingOpen.current = false ;

        const node = modalRef.current ;

        if ( !node )
        {
            return ;
        }

        if ( node.popover ) // popover element : the `toggle` event drives isOpen / onClose
        {
            if ( node.matches( ':popover-open' ) )
            {
                node.hidePopover() ;
            }
            return ;
        }

        setIsOpen( false ) ;

        if ( node.open )
        {
            node.close() ;
        }
    }
    , [ lock, modalRef ] ) ;

    const toggle = useCallback(() =>
    {
        if ( isOpen )
        {
            close() ;
        }
        else
        {
            open() ;
        }
    }
    , [ isOpen, open, close ]) ;

    // Close modal if locked
    useEffect(() =>
    {
        const node = modalRef.current ;
        if ( lock && node && ( node.open || node.matches?.( ':popover-open' ) ) )
        {
            close() ;
        }
    }, [ lock, close, modalRef ]) ;

    return { modalRef, open, close, toggle, isOpen } ;
} ;

export default useModal ;