import { useCallback, useState } from 'react' ;

import useModal from './useModal' ;

/**
 * Hook to manage a remove/delete modal workflow.
 *
 * @param {Object} options
 * @param {Function} [options.onRemove] - Callback when item is removed
 * @param {Function} [options.onCancel] - Callback when cancelled
 *
 * @returns {Object} Modal state and handlers
 *
 * @example
 * ```jsx
 * const { modalRef, item, openRemove, handleRemove } = useRemoveModal({
 *     onRemove: (item) => console.log('Deleted:', item),
 * }) ;
 *
 * <Button onClick={() => openRemove(user)}>Delete</Button>
 *
 * <ConfirmModal
 *     ref={modalRef}
 *     title="Delete User"
 *     onAgree={handleRemove}
 * >
 *     <p>Delete {item?.name}?</p>
 * </ConfirmModal>
 * ```
 */
const useRemoveModal =
({
    onCancel ,
    onRemove ,
}
= {} ) =>
{
    const [ item, setItem ] = useState( null ) ;

    const { modalRef, open, close } = useModal({
        onClose: onCancel,
    }) ;

    // Open modal with item to remove
    const openRemove = useCallback(( itemToRemove ) =>
    {
        setItem( itemToRemove ) ;
        open() ;
    }
    , [ open ]) ;

    // Handle remove (success)
    const handleRemove = useCallback(() =>
    {
        if ( onRemove instanceof Function )
        {
            onRemove( item ) ;
        }
        close() ;
        setItem( null ) ; // Clear after remove
    }
    , [ item, onRemove, close ]) ;

    // Clear item
    const clear = useCallback(() =>
    {
        setItem( null ) ;
    }, []) ;

    return {
        modalRef,
        item,
        setItem,
        openRemove,
        handleRemove,
        clear,
        open,
        close,
    } ;
} ;

export default useRemoveModal ;