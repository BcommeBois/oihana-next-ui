'use client';

import { use } from 'react'

import FullscreenContext from './context'

/**
 * React hook to access fullscreen context.
 *
 * @returns {{
 *   isFullscreen: boolean,
 *   toggleFullscreen: () => void
 * }}
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
