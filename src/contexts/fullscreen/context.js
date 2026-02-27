import { createContext } from 'react' ;

/**
 * @typedef {Object} FullscreenContextValue
 * @property {boolean} isFullscreen - Whether fullscreen mode is active.
 * @property {() => void} toggleFullscreen - Function to toggle fullscreen mode.
 */

/**
 * React context for fullscreen management.
 */
const FullscreenContext =
(
    createContext( null )
) ;

FullscreenContext.displayName = 'FullscreenContext' ;

export default FullscreenContext ;