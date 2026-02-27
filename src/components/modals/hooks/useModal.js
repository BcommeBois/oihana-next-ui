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

    const handleCloseEvent = useCallback(() =>
    {
        setIsOpen( false ) ;
        onCloseRef.current?.() ;
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
            }

            internalNode.current = node ;

            if ( node )
            {
                node.addEventListener( 'close' , handleCloseEvent ) ;
            }
        }
    }), [ handleCloseEvent ]) ;

    const open = useCallback(() =>
    {
        if ( lock )
        {
            return ;
        }

        const dialog = modalRef.current ;

        if ( !dialog || dialog.open )
        {
            return ;
        }

        dialog.showModal() ;

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

        const dialog = modalRef.current ;

        setIsOpen( false ) ;

        if ( !dialog || !dialog.open )
        {
            return ;
        }

        dialog.close() ;
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
        if ( lock && modalRef.current?.open )
        {
            close() ;
        }
    }, [ lock, close ]) ;

    return { modalRef, open, close, toggle, isOpen } ;
} ;

export default useModal ;