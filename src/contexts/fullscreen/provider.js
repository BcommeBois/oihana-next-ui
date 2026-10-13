'use client' ;

import { useRef , useState } from 'react' ;

import FullscreenContext from './context' ;

/**
 * Provides fullscreen context with toggle functionality.
 *
 * The state is derived from `document.fullscreenElement` rather than held
 * beside it, so leaving fullscreen by any route — the Escape key included —
 * reports itself.
 *
 * 🔑 **`lockEscape` keeps the Escape key for the application.** In its full
 * screen a browser takes Escape for itself and leaves full screen before the
 * page sees the key — a dialog, a drawer or a viewer that Escape should close
 * never gets it. With the Keyboard Lock API (`navigator.keyboard.lock`, Chrome
 * and Edge) the key is handed to the page instead, and full screen is left
 * through the button, or by **holding Escape for about two seconds**, a way
 * out the browser keeps and announces itself. Off by default : an application
 * that locks the key owes its users that explanation. Where the API does not
 * exist (Firefox, Safari) nothing changes, and `escapeLocked` says so.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {boolean} [props.lockEscape=false] - Keep Escape for the page while in full screen, where the browser allows it.
 *
 * @returns {React.ReactElement} The provider component.
 *
 * @example
 * ```jsx
 * // In layout.js
 * import FullscreenProvider from 'oihana-next-ui/contexts/fullscreen/provider' ;
 *
 * <FullscreenProvider lockEscape>
 *     { children }
 * </FullscreenProvider>
 * ```
 *
 * @example
 * ```jsx
 * // Usage in component
 * import useFullscreen from 'oihana-next-ui/contexts/fullscreen/useFullscreen' ;
 *
 * const { escapeLocked , isFullscreen , toggleFullscreen } = useFullscreen() ;
 *
 * <button onClick={ toggleFullscreen }>
 *     { isFullscreen ? 'Exit' : 'Enter' } Fullscreen
 * </button>
 * ```
 */
const FullscreenProvider = ( { children , lockEscape = false } ) =>
{
    const ref = useRef( null ) ;

    const [ isFullscreen , setIsFullscreen ] = useState( false ) ;
    const [ escapeLocked , setEscapeLocked ] = useState( false ) ;

    // The request goes out in the click itself : the Fullscreen API grants it
    // only while the user gesture is still active.
    const toggleFullscreen = () =>
    {
        if ( document.fullscreenElement )
        {
            document.exitFullscreen().catch( () => {} ) ;
            return ;
        }

        const element = ref.current ;

        // iOS Safari has no element fullscreen at all.
        if ( !element?.requestFullscreen )
        {
            return ;
        }

        // A refusal leaves the state alone — no change event, nothing to undo.
        element.requestFullscreen().catch( () => {} ) ;
    } ;

    // The lock lives exactly as long as the full screen : the API only works
    // inside one, and the browser drops it on its own when full screen ends.
    const onFullscreenChange = () =>
    {
        const active = document.fullscreenElement === ref.current ;

        setIsFullscreen( active ) ;

        const keyboard = navigator.keyboard ;

        if ( active && lockEscape && typeof keyboard?.lock === 'function' )
        {
            keyboard.lock( [ 'Escape' ] ).then( () => setEscapeLocked( true ) , () => setEscapeLocked( false ) ) ;
        }
        else
        {
            if ( typeof keyboard?.unlock === 'function' )
            {
                keyboard.unlock() ;
            }

            setEscapeLocked( false ) ;
        }
    } ;

    return (
        <div
            className          = "flex flex-col grow min-h-screen w-full min-w-0 overflow-y-auto"
            onFullscreenChange = { onFullscreenChange }
            ref                = { ref }
        >
            <FullscreenContext value={ { escapeLocked , isFullscreen , toggleFullscreen } }>
                { children }
            </FullscreenContext>
        </div>
    ) ;
} ;

export default FullscreenProvider ;
