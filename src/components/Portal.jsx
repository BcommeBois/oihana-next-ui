'use client' ;

import { useEffect , useState } from 'react' ;

import { createPortal } from 'react-dom' ;

/**
 * Portal component for rendering children in a different DOM node.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to portal
 * @param {React.RefObject<HTMLElement>} [props.containerRef] - Ref to container element
 * @param {boolean} [props.disabled=false] - Disable portal (render normally)
 * @param {string} [props.portalKey] - Key for the portal
 *
 * @returns {React.ReactPortal|React.ReactNode}
 *
 * @example
 * // Simple
 * <Portal>
 *     <Modal />
 * </Portal>
 *
 * // Custom container
 * <Portal containerRef={modalRoot}>
 *     <Modal />
 * </Portal>
 *
 * // Disabled
 * <Portal disabled>
 *     <Content />
 * </Portal>
 *
 * // with key
 * <Portal portalKey="modal-123">
 *     <Modal />
 * </Portal>
 */
const Portal =
({
     children ,
     containerRef,
     disabled = false,
     portalKey
}) =>
{
    // A portal has no server-side form, and the hydration render has to say the
    // same thing the server said — so the target is only reached once mounted.
    // `document?.body` would not have guarded the server either : optional
    // chaining protects a null value, not an undeclared global.
    const [ mounted , setMounted ] = useState( false ) ;

    useEffect( () => { setMounted( true ) ; } , [] ) ;

    if ( disabled )
    {
        return children ;
    }

    if ( !mounted )
    {
        return null ;
    }

    const container = containerRef?.current ?? document.body ;

    if ( !container )
    {
        return children ;
    }

    return createPortal( children , container , portalKey ) ;
} ;

Portal.displayName = 'Portal' ;

export default Portal ;