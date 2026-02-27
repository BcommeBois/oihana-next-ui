'use client' ;

import { useRef } from 'react' ;

import { useFullscreen as useFullscreenHook , useToggle } from 'react-use' ;

import FullscreenContext from './context' ;

/**
 * Provides fullscreen context with toggle functionality.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 *
 * @returns {React.ReactElement} The provider component.
 *
 * @example
 * ```jsx
 * // In layout.js
 * import { FullscreenProvider } from '@/contexts/fullscreen' ;
 *
 * <FullscreenProvider>
 *     { children }
 * </FullscreenProvider>
 * ```
 *
 * @example
 * ```jsx
 * // Usage in component
 * import useFullscreen from '@/contexts/fullscreen' ;
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

    const [ show , toggle ] = useToggle( false ) ;

    const isFullscreen = useFullscreenHook( ref , show ,
{
        onClose: () => toggle( false )
    } ) ;

    const toggleFullscreen = () =>
    {
        toggle( !show ) ;
    } ;

    return (
        <div className="flex flex-col grow min-h-screen w-full min-w-0 overflow-y-auto" ref={ ref }>
            <FullscreenContext value={ { isFullscreen , toggleFullscreen } }>
                { children }
            </FullscreenContext>
        </div>
    ) ;
} ;

export default FullscreenProvider ;