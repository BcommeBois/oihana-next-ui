'use client' ;

/**
 * A click handled where it happens, and stopped there.
 *
 * ### Why not React's `onClick`
 *
 * React delegates its listeners to the root, so a synthetic handler runs
 * *after* every native listener between the target and that root. Calling
 * `stopPropagation` from one is therefore too late to keep the event from an
 * ancestor that listens natively — the ancestor has already had it.
 *
 * This attaches the listener on the element itself, where it runs first and
 * where stopping actually stops.
 *
 * ### What it is for
 *
 * An overlay sitting on something that also listens. A map marker is a DOM
 * element inside the map's own container, so a click on it reaches the map
 * too — and a library reading that as « the user clicked the map » will close
 * the very popup the marker just opened. Which is exactly what happened here :
 * the click arrived, the state was set, and the popup shut itself in the same
 * tick.
 *
 * @module hooks/useNativeClick
 */

import { useCallback , useRef } from 'react' ;

/**
 * A ref callback that handles a click on the element and lets it go no further.
 *
 * @param {Function} [onClick] - Called with the native event.
 * @returns {Function} A ref callback for the element that should own the click.
 *
 * @example
 * ```jsx
 * const ref = useNativeClick( onClick ) ;
 *
 * <button ref={ ref } type="button">…</button>
 * ```
 */
const useNativeClick = ( onClick ) =>
{
    // Read at event time : a parent re-rendering must not mean detaching and
    // reattaching the listener.
    const handler = useRef( onClick ) ;

    handler.current = onClick ;

    return useCallback( ( node ) =>
    {
        if ( !node )
        {
            return ;
        }

        const listen = ( event ) =>
        {
            event.stopPropagation() ;
            handler.current?.( event ) ;
        } ;

        node.addEventListener( 'click' , listen ) ;

        return () => node.removeEventListener( 'click' , listen ) ;
    }
    , [] ) ;
} ;

export default useNativeClick ;
