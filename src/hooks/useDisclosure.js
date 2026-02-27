import { useId , useState } from 'react' ;

/**
 * React hook to manage open/close state for modals, drawers, accordions, etc.
 *
 * @param {Object} [props] - Configuration options.
 * @param {boolean} [props.defaultOpen=false] - Initial open state (uncontrolled mode).
 * @param {string} [props.id] - Custom ID for the disclosure element.
 * @param {boolean} [props.isOpen] - Controlled open state.
 * @param {() => void} [props.open] - Callback when opened.
 * @param {() => void} [props.close] - Callback when closed.
 *
 * @returns {{
 *   isOpen: boolean,
 *   open: () => void,
 *   close: () => void,
 *   toggle: () => void,
 *   isControlled: boolean,
 *   getButtonProps: (props?: Object) => Object,
 *   getDisclosureProps: (props?: Object) => Object
 * }}
 *
 * @example
 * ```js
 * const { isOpen , open , close } = useDisclosure() ;
 *
 * <button onClick={ open }>Open</button>
 * <Modal isOpen={ isOpen } onClose={ close }>
 *     Content...
 * </Modal>
 * ```
 *
 * @example
 * ```js
 * // With prop getters for accessibility
 * const { getButtonProps , getDisclosureProps } = useDisclosure() ;
 *
 * <button { ...getButtonProps() }>Toggle</button>
 * <div { ...getDisclosureProps() }>Content...</div>
 * ```
 */
const useDisclosure =
( {
    defaultOpen ,
    id     : idProp ,
    isOpen : isOpenProp ,
    close  : onCloseProp ,
    open   : onOpenProp ,
} = {} ) =>
{
    const [ openState , setOpen ] = useState( defaultOpen || false ) ;

    const isControlled = isOpenProp !== undefined ;
    const isOpen       = isControlled ? isOpenProp : openState ;

    const uid = useId() ;
    const id  = idProp ?? `disclosure-${ uid }` ;

    const close = () =>
    {
        if ( !isControlled )
        {
            setOpen( false ) ;
        }
        onCloseProp?.() ;
    } ;

    const open = () =>
    {
        if ( !isControlled )
        {
            setOpen( true ) ;
        }
        onOpenProp?.() ;
    } ;

    const toggle = () =>
    {
        if ( isOpen )
        {
            close() ;
        }
        else
        {
            open() ;
        }
    } ;

    const getButtonProps = ( props = {} ) => ( {
        ...props ,
        'aria-expanded' : isOpen ,
        'aria-controls' : id ,
        onClick         : ( event ) =>
        {
            props?.onClick?.( event ) ;
            toggle() ;
        }
    } ) ;

    const getDisclosureProps = ( props = {} ) => ( {
        ...props ,
        hidden : !isOpen ,
        id
    } ) ;

    return {
        isOpen ,
        open ,
        close ,
        toggle ,
        isControlled ,
        getButtonProps ,
        getDisclosureProps ,
    } ;
} ;

export default useDisclosure ;