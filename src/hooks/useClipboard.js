import { useEffect, useState } from 'react'

/**
 * Clipboard state when ready to copy.
 * @type {string}
 */
export const ERROR   = 'error'   ;

/**
 * Clipboard state when an error occurred.
 * @type {string}
 */
export const READY   = 'ready'   ;

/**
 * Clipboard state when copy succeeded.
 * @type {string}
 */
export const SUCCESS = 'success' ;

/**
 * @typedef {'ready' | 'success' | 'error'} ClipboardState
 */

/**
 * React hook to copy text to the clipboard with status feedback.
 *
 * @param {number} [timeout=1500] - The delay (in ms) to switch back to ready state after copy.
 *
 * @returns {[ ClipboardState , ( text: string ) => Promise<void> ]} A tuple containing the current state and the copy function.
 *
 * @example
 * ```js
 * import useClipboard, { READY , SUCCESS , ERROR } from './useClipboard' ;
 *
 * const [ state , copy ] = useClipboard( 2000 ) ;
 *
 * <button onClick={() => copy( 'Hello world!' )}>
 *   { state === READY   && 'Copy' }
 *   { state === SUCCESS && 'Copied!' }
 *   { state === ERROR   && 'Failed' }
 * </button>
 * ```
 */
const useClipboard = ( timeout = 1500 ) =>
{
    const [ state , setState ] = useState( READY ) ;

    const copy = async ( text ) =>
    {
        try
        {
            await navigator.clipboard.writeText( text ) ;
            setState( SUCCESS ) ;
        }
        catch
        {
            setState( ERROR ) ;
        }
    }

    useEffect(() =>
    {
        if ( state === READY )
        {
            return ;
        }

        const timeoutId = setTimeout( () => setState( READY ) , timeout ) ;

        return () => clearTimeout( timeoutId ) ;
    }
    , [ timeout , state ] ) ;

    return [ state , copy ] ;
};

export default useClipboard ;