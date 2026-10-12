'use client' ;

import { useCallback , useEffect , useMemo , useState , useSyncExternalStore } from 'react' ;

import playTones , { DEFAULT_SIGNALS } from '../helpers/audio/playTones' ;

import {
    getAudioContext ,
    hasAudio ,
    isAudioRunning ,
    resumeAudio ,
    subscribeAudio ,
} from '../helpers/audio/sharedAudioContext' ;

const NOT_RUNNING = () => false ;

const NONE = { audio : false , vibration : false } ;

/**
 * A short sound and a vibration that tell what just happened, without looking.
 *
 * Made for scanning — a beep for a code accepted, a buzz for one refused — and
 * for any gesture whose outcome the eye should not have to check : the
 * operator keeps looking at the shelf, not at the screen.
 *
 * 🔑 **A signal, never a message.** The hook makes no sound of its own accord
 * and draws nothing : the screen calls `signal()` and decides what it shows
 * beside it — an alert, a colour, nothing. The same rule as `CopyBadge`, which
 * does not toast.
 *
 * 🔑 **Synthesized, not played.** The tones come from Web Audio oscillators :
 * no sound file to download or cache, so the first signal works offline.
 *
 * ### What the browsers allow
 *
 * - **Sound waits for a first gesture** on the page — a rule of every browser.
 *   With `autoUnlock` (the default) the first click or key press anywhere
 *   unlocks it ; no permission prompt is shown. `unlock()` does it by hand,
 *   from a gesture. `unlocked` says where it stands. A signal asked for while
 *   locked is dropped, never queued : a beep that comes out later lies.
 * - **Vibration** works on Android, not on an iPhone (Safari has none), and
 *   Chrome ignores it until the page has been touched. Where it is missing the
 *   call is silently skipped. `supports` tells, for a screen that would hide a
 *   setting the device cannot honour.
 * - **The silent switch of an iPhone mutes Web Audio.** `ignoreSilentMode`
 *   (off by default) plays through it on Safari 17+ — overriding a choice the
 *   user made, so it is the screen's call to make.
 *
 * One audio context serves the whole page, created on the first unlock.
 *
 * @module hooks/useFeedbackSignal
 *
 * @param {Object} [options]
 * @param {boolean} [options.autoUnlock=true] - Unlock the sound on the first click or key press anywhere on the page.
 * @param {boolean} [options.ignoreSilentMode=false] - On an iPhone, play through the silent switch (Safari 17+).
 * @param {Object.<string,import('../helpers/audio/playTones').Signal>} [options.signals] - Signals to add, or to put in place of `success`, `warning`, `error`.
 * @param {boolean} [options.sound=true] - Play the tones.
 * @param {boolean} [options.vibration=true] - Vibrate.
 * @param {number} [options.volume=0.6] - From 0 to 1.
 *
 * @returns {{ signal : (name : string) => boolean , unlock : () => Promise<boolean> , unlocked : boolean , supports : { audio : boolean , vibration : boolean } }}
 *   `signal` returns whether the name is known.
 *
 * @example
 * ```jsx
 * const { signal } = useFeedbackSignal() ;
 *
 * const onScan = code => isExpected( code ) ? signal( 'success' ) : signal( 'error' ) ;
 *
 * // A signal of its own, and the sound left to a profile setting
 * const { signal } = useFeedbackSignal(
 * {
 *     signals : { done : { tones : [ { frequency : 880 , duration : 60 } , { frequency : 1320 , duration : 120 , gap : 20 } ] , vibration : [ 30 , 40 , 30 ] } } ,
 *     sound   : profile.sound ,
 * } ) ;
 * ```
 */
const useFeedbackSignal =
({
    autoUnlock       = true ,
    ignoreSilentMode = false ,
    signals ,
    sound            = true ,
    vibration        = true ,
    volume           = 0.6 ,
}
= {} ) =>
{
    const unlocked = useSyncExternalStore( subscribeAudio , isAudioRunning , NOT_RUNNING ) ;

    // Read after hydration : the server knows nothing of the device.
    const [ supports , setSupports ] = useState( NONE ) ;

    useEffect( () =>
    {
        setSupports( { audio : hasAudio() , vibration : typeof globalThis.navigator?.vibrate === 'function' } ) ;
    } , [] ) ;

    const unlock = useCallback( () => resumeAudio( { ignoreSilentMode } ) , [ ignoreSilentMode ] ) ;

    useEffect( () =>
    {
        if ( !autoUnlock || isAudioRunning() )
        {
            return undefined ;
        }

        const events = [ 'pointerdown' , 'keydown' ] ;

        const onGesture = () =>
        {
            for ( const type of events )
            {
                document.removeEventListener( type , onGesture , true ) ;
            }
            unlock() ;
        } ;

        for ( const type of events )
        {
            document.addEventListener( type , onGesture , true ) ;
        }

        return () =>
        {
            for ( const type of events )
            {
                document.removeEventListener( type , onGesture , true ) ;
            }
        } ;
    }
    , [ autoUnlock , unlock ] ) ;

    const catalog = useMemo( () => ( { ...DEFAULT_SIGNALS , ...signals } ) , [ signals ] ) ;

    const signal = useCallback( name =>
    {
        const definition = catalog[ name ] ;

        if ( !definition )
        {
            return false ;
        }

        if ( vibration && definition.vibration && typeof globalThis.navigator?.vibrate === 'function' )
        {
            globalThis.navigator.vibrate( definition.vibration ) ;
        }

        if ( sound && definition.tones?.length )
        {
            if ( isAudioRunning() )
            {
                playTones( getAudioContext() , definition.tones , { volume } ) ;
            }
            else
            {
                // Called from a gesture, this unlocks and plays at once ; called from anywhere else, it gives up.
                resumeAudio( { ignoreSilentMode } ).then( running =>
                {
                    if ( running )
                    {
                        playTones( getAudioContext() , definition.tones , { volume } ) ;
                    }
                } ) ;
            }
        }

        return true ;
    }
    , [ catalog , ignoreSilentMode , sound , vibration , volume ] ) ;

    return { signal , supports , unlock , unlocked } ;
} ;

export default useFeedbackSignal ;
