import { useCallback, useEffect, useMemo, useRef, useState } from 'react' ;

/**
 * Hook to manage modal state with native <dialog> API.
 *
 * @param {Object} options
 * @param {Function} [options.onOpen] - Callback when modal opens
 * @param {Function} [options.onClose] - Callback when modal closes
 * @param {boolean} [options.lock=false] - Prevent closing if true
 *
 * @returns {Object} - { modalRef, open, close, toggle, isOpen }
 *
 * @example
 * ```jsx
 * const { modalRef, open, close, toggle, isOpen } = useModal() ;
 *
 * <Button onClick={open}>Open</Button>
 * <Modal ref={modalRef}>Content</Modal>
 * ```
 */
const useModal =
({
    lock = false,
    onOpen,
    onClose,
}
= {} ) =>
{
    const [ isOpen, setIsOpen ] = useState( false ) ;

    const onOpenRef  = useRef( onOpen  ) ;
    const onCloseRef = useRef( onClose ) ;

    useEffect(() =>
    {
         onOpenRef.current = onOpen  ;
        onCloseRef.current = onClose ;
    }
    , [ onOpen, onClose ] ) ;

    const internalNode = useRef( null ) ;

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
            }
        }
    }), [ handleCloseEvent , handleToggleEvent ]) ;

    const open = useCallback(() =>
    {
        if ( lock )
        {
            return ;
        }

        const node = modalRef.current ;

        if ( !node )
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
    , [ lock, modalRef ] ) ;

    const close = useCallback(() =>
    {
        if ( lock )
        {
            return ;
        }

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