'use client' ;

import { createPortal } from 'react-dom' ;

import useFullscreenElement from '../hooks/useFullscreenElement' ;
import useIsHydrated        from '../hooks/useIsHydrated' ;

/**
 * Portal component for rendering children in a different DOM node.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to portal
 * @param {React.RefObject<HTMLElement>} [props.containerRef] - Ref to container element
 * @param {boolean} [props.disabled=false] - Disable portal (render normally)
 * @param {string} [props.portalKey] - Key for the portal
 *
 * 🚨 **Without a `containerRef`, the target is the element currently
 * fullscreen, and `document.body` only when there is none.** An element put
 * fullscreen is promoted to the browser's **top layer**, which does not belong
 * to the document's stacking order : a panel painted in `document.body` cannot
 * come above it, whatever its `z-index`. It is not hidden — it is painted
 * underneath, which looks like a panel that half-opens behind the page.
 *
 * ⚠️ **Changing target unmounts what is portalled.** React reconciles a portal
 * against its container, so entering or leaving fullscreen while a panel is
 * open destroys and rebuilds it — its own state goes with it. A panel opened
 * after the change is unaffected, which is every panel in practice.
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
    // same thing the server said — so the target is out of reach until hydration
    // is behind us. `document?.body` would not have guarded the server either :
    // optional chaining protects a null value, not an undeclared global.
    //
    // The question is asked of React rather than of an effect, because an effect
    // cannot tell a hydration render from a plain client mount : it answers
    // `false` first in both cases, which costs a commit to every portal on the
    // page when only the hydrating ones owe it. That commit is not free — the
    // children do not exist during it, so a ref handed to them is still null when
    // the parent's mount effect runs, and an imperative `showModal()` played
    // there is lost in silence.
    const hydrated = useIsHydrated() ;

    const fullscreen = useFullscreenElement() ;

    if ( disabled )
    {
        return children ;
    }

    if ( !hydrated )
    {
        return null ;
    }

    const container = containerRef?.current ?? fullscreen ?? document.body ;

    if ( !container )
    {
        return children ;
    }

    return createPortal( children , container , portalKey ) ;
} ;

Portal.displayName = 'Portal' ;

export default Portal ;