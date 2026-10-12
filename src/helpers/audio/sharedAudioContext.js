/**
 * The one audio context of the page, shared by every hook that makes a sound.
 *
 * Browsers cap how many contexts a page may open, and each one holds an audio
 * thread : one is enough for short signals. It is created on first request —
 * never at import, so nothing runs on the server — and its running state is
 * published to subscribers, for `useSyncExternalStore`.
 *
 * @module helpers/audio/sharedAudioContext
 */

let context = null ;

/**
 * How long a resume is waited for, in milliseconds.
 *
 * @type {number}
 */
export const RESUME_WAIT = 200 ;

const listeners = new Set() ;

const notify = () =>
{
    for ( const listener of listeners )
    {
        listener() ;
    }
} ;

/**
 * Whether the browser can make a sound at all.
 *
 * @returns {boolean}
 */
export const hasAudio = () => typeof globalThis.AudioContext === 'function' || typeof globalThis.webkitAudioContext === 'function' ;

/**
 * The shared context, created on first call. `null` where there is no Web Audio.
 *
 * A context created outside a user gesture starts suspended : it runs once
 * `resume()` is called from one.
 *
 * @returns {?AudioContext}
 */
export const getAudioContext = () =>
{
    if ( !context && hasAudio() )
    {
        const Context = globalThis.AudioContext ?? globalThis.webkitAudioContext ;
        context = new Context() ;
        context.addEventListener?.( 'statechange' , notify ) ;
    }

    return context ;
} ;

/**
 * Whether the shared context exists and runs.
 *
 * @returns {boolean}
 */
export const isAudioRunning = () => context?.state === 'running' ;

/**
 * Subscribes to the running state.
 *
 * @param {Function} listener
 * @returns {Function} The unsubscribe function.
 */
export const subscribeAudio = listener =>
{
    listeners.add( listener ) ;
    return () => listeners.delete( listener ) ;
} ;

/**
 * Resumes the shared context — to call from a user gesture, the only moment a
 * browser allows it.
 *
 * @param {Object} [options]
 * @param {boolean} [options.ignoreSilentMode=false] - On an iPhone, play through the silent switch (Safari 17+).
 * @returns {Promise<boolean>} Whether the context runs.
 */
export const resumeAudio = async ( { ignoreSilentMode = false } = {} ) =>
{
    const shared = getAudioContext() ;

    if ( !shared )
    {
        return false ;
    }

    if ( ignoreSilentMode && globalThis.navigator?.audioSession )
    {
        globalThis.navigator.audioSession.type = 'playback' ;
    }

    if ( shared.state !== 'running' )
    {
        // Outside a gesture, a browser may leave this promise pending until a later one : waiting for it
        // would let a sound asked for now come out at some later click. Past the wait, the answer is no.
        await Promise.race( [ shared.resume().catch( () => null ) , new Promise( resolve => setTimeout( resolve , RESUME_WAIT ) ) ] ) ;
    }

    notify() ;

    return shared.state === 'running' ;
} ;
