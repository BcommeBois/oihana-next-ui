/**
 * useClipboard — writes a text to the clipboard and says how it went, both
 * as a state to render and as callbacks to react to.
 *
 * The state drives what is SHOWN — an icon flipping to a check, a label
 * reading « Copied! » — and returns to `ready` on its own after `timeout`.
 * The callbacks are for what HAPPENS ONCE : a toast, a log, a counter.
 *
 * 🔑 **Prefer `onSuccess` / `onError` over watching the state.** A host that
 * toasts from an effect on the state has to explain to its linter why the
 * toast is not a dependency, and has to ignore both the mount and the reset
 * back to `ready` — three chances to get it wrong, written again at every
 * call site. A callback fires once, where the copy happened.
 *
 * @module hooks/useClipboard
 *
 * @param {Object|number} [options] - The options, or the timeout alone (kept for the older signature).
 * @param {Function} [options.onError]   - Called with the error and the text when the write failed.
 * @param {Function} [options.onSuccess] - Called with the text once it is on the clipboard.
 * @param {number}   [options.timeout=1500] - Milliseconds before the state returns to `ready`.
 *
 * @returns {[ ClipboardState , ( text : string ) => Promise<void> ]} The state, and the copy function.
 *
 * @example
 * ```jsx
 * // What the state is for : the button says what just happened.
 * const [ state , copy ] = useClipboard() ;
 *
 * <button onClick={ () => copy( 'Hello world!' ) }>
 *   { state === READY   && 'Copy' }
 *   { state === SUCCESS && 'Copied!' }
 *   { state === ERROR   && 'Failed' }
 * </button>
 * ```
 *
 * @example
 * ```js
 * // What the callbacks are for : something that happens once.
 * const [ state , copy ] = useClipboard
 * ({
 *     onSuccess : () => toast( 'Copied to clipboard.' , SUCCESS ) ,
 *     onError   : () => toast( 'Unable to copy.' , ERROR ) ,
 * }) ;
 * ```
 */

import { useEffect , useState } from 'react' ;

/**
 * Clipboard state when the last write failed.
 * @type {string}
 */
export const ERROR = 'error' ;

/**
 * Clipboard state when nothing was written, or when the last write has been forgotten.
 * @type {string}
 */
export const READY = 'ready' ;

/**
 * Clipboard state when the last write succeeded.
 * @type {string}
 */
export const SUCCESS = 'success' ;

/**
 * Milliseconds the state holds before returning to `ready`.
 *
 * Long enough for a reader to see the icon flip, short enough that a second
 * copy does not look like the first one's answer.
 *
 * @type {number}
 */
export const DEFAULT_CLIPBOARD_TIMEOUT = 1500 ;

/**
 * @typedef {'ready' | 'success' | 'error'} ClipboardState
 */

const useClipboard = ( options = {} ) =>
{
    // The older signature took the timeout alone. Both are read here so a
    // host written against it keeps working, unchanged.
    const {
        onError ,
        onSuccess ,
        timeout = DEFAULT_CLIPBOARD_TIMEOUT ,
    }
    = typeof options === 'number' ? { timeout : options } : ( options ?? {} ) ;

    const [ state , setState ] = useState( READY ) ;

    // Rebuilt on every render rather than memoised, so it always reads the
    // callbacks the host passed this time — it is handed to an event
    // handler, never to a dependency array.
    const copy = async ( text ) =>
    {
        try
        {
            await navigator.clipboard.writeText( text ) ;
            setState( SUCCESS ) ;
            onSuccess?.( text ) ;
        }
        catch ( error )
        {
            setState( ERROR ) ;
            onError?.( error , text ) ;
        }
    } ;

    useEffect( () =>
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
} ;

export default useClipboard ;
