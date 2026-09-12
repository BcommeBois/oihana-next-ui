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
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 *
 * @returns {React.ReactElement} The provider component.
 *
 * @example
 * ```jsx
 * // In layout.js
 * import { FullscreenProvider } from 'oihana-next-ui/contexts/fullscreen' ;
 *
 * <FullscreenProvider>
 *     { children }
 * </FullscreenProvider>
 * ```
 *
 * @example
 * ```jsx
 * // Usage in component
 * import useFullscreen from 'oihana-next-ui/contexts/fullscreen' ;
 *
 * const { isFullscreen , toggleFullscreen } = useFullscreen() ;
 *
 * <button onClick={ toggleFullscreen }>
 *     { isFullscreen ? 'Exit' : 'Enter' } Fullscreen
 * </button>
 * ```
 */
const FullscreenProvider = ( { children } ) =>
{
    const ref = useRef( null ) ;

    const [ isFullscreen , setIsFullscreen ] = useState( false ) ;

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

    return (
        <div
            className          = "flex flex-col grow min-h-screen w-full min-w-0 overflow-y-auto"
            onFullscreenChange = { () => setIsFullscreen( document.fullscreenElement === ref.current ) }
            ref                = { ref }
        >
            <FullscreenContext value={ { isFullscreen , toggleFullscreen } }>
                { children }
            </FullscreenContext>
        </div>
    ) ;
} ;

export default FullscreenProvider ;
