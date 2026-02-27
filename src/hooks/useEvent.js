import { useEffect , useRef } from 'react' ;

/**
 * React hook to attach an event listener to an element or ref.
 *
 * @param {EventTarget | React.RefObject<EventTarget>} target - The target element or ref.
 * @param {string} type - The event type (e.g., 'click', 'scroll').
 * @param {(event: Event) => void} listener - The event handler.
 * @param {() => void} [cleanup] - Optional cleanup function called on unmount.
 *
 * @example
 * ```js
 * // On window
 * useEvent( window , 'resize' , ( e ) => {
 *     console.log( 'Resized!' ) ;
 * } ) ;
 *
 * // On a ref
 * const buttonRef = useRef( null ) ;
 * useEvent( buttonRef , 'click' , ( e ) =>
 * {
 *     console.log( 'Clicked!' ) ;
 * } ) ;
 * ```
 */
const useEvent = ( target , type , listener , cleanup ) =>
{
    const listenerRef = useRef( listener ) ;
    const cleanupRef  = useRef( cleanup  ) ;

    // Keep refs updated with latest callbacks
    useEffect( () =>
    {
        listenerRef.current = listener ;
        cleanupRef.current  = cleanup ;
    } ) ;

    useEffect( () =>
    {
        const element = target?.current ?? target ;

        if ( !element )
        {
            return ;
        }

        let isUnsubscribed = false ;

        const handleEvent = ( event ) =>
        {
            if ( isUnsubscribed ) return ;
            listenerRef.current?.( event ) ;
        } ;

        element.addEventListener( type , handleEvent ) ;

        return () =>
        {
            isUnsubscribed = true ;
            element.removeEventListener( type , handleEvent ) ;
            cleanupRef.current?.() ;
        } ;
    }
    , [ target , type ] ) ;
} ;

export default useEvent ;