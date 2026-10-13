'use client';

import { use } from 'react'

import FullscreenContext from './context'

/**
 * React hook to access fullscreen context.
 *
 * @returns {{
 *   escapeLocked: boolean,
 *   isFullscreen: boolean,
 *   toggleFullscreen: () => void
 * }} `escapeLocked` is true while the Escape key is kept for the page (`lockEscape` on the provider, in a browser that has the Keyboard Lock API, in full screen).
 *
 * @throws {Error} If used outside FullscreenContext.
 *
 * @example
 * ```jsx
 * const { isFullscreen , toggleFullscreen } = useFullscreen() ;
 *
 * <button onClick={ toggleFullscreen }>
 *     { isFullscreen ? 'Exit' : 'Enter' } Fullscreen
 * </button>
 * ```
 */
const useFullscreen = () =>
{
    const context = use( FullscreenContext ) ;

    if ( !context )
    {
        throw new Error( 'useFullscreen must be used within a FullscreenProvider' ) ;
    }

    return context ;
}

export default useFullscreen ;
