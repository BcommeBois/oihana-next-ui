import { useCallback, useState } from 'react' ;

import useModal from './useModal' ;

/**
 * Hook to manage an add/create modal workflow.
 *
 * @param {Object} options
 * @param {Function} [options.init] - Initialize new item (function or value)
 * @param {Function} [options.onAdd] - Callback when item is added
 * @param {Function} [options.onCancel] - Callback when cancelled
 *
 * @returns {Object} Modal state and handlers
 *
 * @example
 * ```jsx
 * const { modalRef, item, setItem, openAdd, handleAdd } = useAddModal({
 *     init: () => ({ name: '', email: '' }),
 *     onAdd: (newItem) => console.log('Added:', newItem),
 * }) ;
 *
 * <Button onClick={openAdd}>Add User</Button>
 *
 * <Modal
 *     ref={modalRef}
 *     title="Add User"
 *     onAgree={handleAdd}
 * >
 *     <Input value={item.name} onChange={(e) => setItem({...item, name: e.target.value})} />
 * </Modal>
 * ```
 */
const useAddModal =
({
    init     = null ,
    onAdd    ,
    onCancel ,
}
= {} ) =>
{
    const [ item , setItem ] = useState( init ) ;

    const { modalRef, open, close } = useModal({
        onClose: onCancel,
    }) ;

    // Open modal and reset item
    const openAdd = useCallback(() =>
    {
        const initialValue = init instanceof Function ? init() : init ;
        setItem( initialValue ) ;
        open() ;
    } , [ init, open ]) ;

    // Handle add (success)
    const handleAdd = useCallback(() =>
    {
        if ( onAdd instanceof Function )
        {
            onAdd( item ) ;
        }
        close() ;
        setItem( init ) ; // Reset after add
    }
    , [ item, onAdd, close, init ] ) ;

    // Clear item
    const clear = useCallback(() =>
    {
        setItem( init instanceof Function ? init() : init ) ;
    }, [ init ]) ;

    return {
        modalRef,
        item,
        setItem,
        openAdd,
        handleAdd,
        clear,
        open,
        close,
    } ;
} ;

export default useAddModal ;