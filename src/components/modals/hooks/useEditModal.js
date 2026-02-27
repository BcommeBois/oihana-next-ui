import { useCallback, useState } from 'react' ;

import useModal from '@/components/modals/hooks/useModal' ;

/**
 * Hook to manage an edit/update modal workflow.
 *
 * @param {Object} options
 * @param {Function} [options.onEdit] - Callback when item is edited
 * @param {Function} [options.onCancel] - Callback when cancelled
 * @param {boolean} [options.resetOnCancel=true] - Reset to original on cancel
 *
 * @returns {Object} Modal state and handlers
 *
 * @example
 * ```jsx
 * const { modalRef, item, originalItem, setItem, openEdit, handleEdit, hasChanges } = useEditModal({
 *     onEdit: (updatedItem) => console.log('Updated:', updatedItem),
 * }) ;
 *
 * <Button onClick={() => openEdit(user)}>Edit</Button>
 *
 * <Modal
 *     ref={modalRef}
 *     title="Edit User"
 *     onAgree={handleEdit}
 *     agreeDisabled={!hasChanges}
 * >
 *     <Input value={item.name} onChange={(e) => setItem({...item, name: e.target.value})} />
 * </Modal>
 * ```
 */
const useEditModal = ({
    onEdit,
    onCancel,
    resetOnCancel = true,
} = {} ) =>
{
    const [ item, setItem ] = useState( null ) ;
    const [ originalItem, setOriginalItem ] = useState( null ) ;

    const { modalRef, open, close } = useModal({
        onClose: () =>
        {
            if ( resetOnCancel )
            {
                reset() ;
            }
            onCancel?.() ;
        },
    }) ;

    // Open modal with item to edit
    const openEdit = useCallback(( itemToEdit ) =>
    {
        // Deep clone to avoid mutation
        const clonedItem = JSON.parse( JSON.stringify( itemToEdit )) ;
        setItem( clonedItem ) ;
        setOriginalItem( itemToEdit ) ;
        open() ;
    }, [ open ]) ;

    // Handle edit (success)
    const handleEdit = useCallback(() =>
    {
        if ( onEdit instanceof Function )
        {
            onEdit( item, originalItem ) ;
        }
        close() ;
        clear() ;
    }, [ item, originalItem, onEdit, close ]) ;

    // Reset to original values
    const reset = useCallback(() =>
    {
        if ( originalItem )
        {
            const clonedOriginal = JSON.parse( JSON.stringify( originalItem )) ;
            setItem( clonedOriginal ) ;
        }
    }, [ originalItem ]) ;

    // Clear everything
    const clear = useCallback(() =>
    {
        setItem( null ) ;
        setOriginalItem( null ) ;
    }, []) ;

    // Check if there are changes
    const hasChanges = JSON.stringify( item ) !== JSON.stringify( originalItem ) ;

    return {
        modalRef,
        item,
        originalItem,
        setItem,
        openEdit,
        handleEdit,
        reset,
        clear,
        hasChanges,
        open,
        close,
    } ;
} ;

export default useEditModal ;