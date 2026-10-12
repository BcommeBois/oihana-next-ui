'use client' ;

import { useMemo , useSyncExternalStore } from 'react' ;

import readStorage      from '../../helpers/storage/readStorage' ;
import subscribeStorage from '../../helpers/storage/subscribeStorage' ;
import writeStorage     from '../../helpers/storage/writeStorage' ;

import { DEFAULT_VOLUME } from '../../helpers/audio/resolveFeedback' ;

import FeedbackContext from './context' ;

const NOTHING_STORED = () => null ;

/**
 * Reads one stored setting through the store, so the server and the first
 * client render agree : the server is told nothing was stored, the browser is
 * read once React hydrates. One key per setting — a stored object would be a
 * new object on every read, which `useSyncExternalStore` takes for a change.
 *
 * @param {string} key
 * @returns {*} The stored value, or `null`.
 */
const useStored = key => useSyncExternalStore( subscribeStorage , () => readStorage( key ) , NOTHING_STORED ) ;

/**
 * FeedbackProvider — the device's settings for every sound and vibration.
 *
 * A master switch over {@link module:hooks/useFeedbackSignal} : with sound off
 * here, no signal sounds, whatever a screen asks ; a screen can silence what is
 * on, never sound what was turned off. Vibration likewise ; the volume is the
 * one a screen names, this one otherwise.
 *
 * 🔑 **Kept on the device, not the account.** The device is what makes the
 * noise : a shared terminal in a loud warehouse, a phone in a meeting. The
 * settings live in `localStorage`, under keys derived from `storageKey` — no
 * cookie, nothing reads them on the server.
 *
 * Without a provider nothing changes : every signal plays as the screen asks.
 * `ApplicationProviders` mounts one.
 *
 * @module contexts/feedback/provider
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.defaultSound=true] - Before the device has said otherwise.
 * @param {boolean} [props.defaultVibration=true] - Before the device has said otherwise.
 * @param {number} [props.defaultVolume=0.6] - Before the device has said otherwise, from 0 to 1.
 * @param {string} [props.storageKey='feedback'] - The prefix of the stored keys. Name it per application : two applications served from one origin would otherwise share it.
 *
 * @example
 * ```jsx
 * <FeedbackProvider storageKey="my-app:feedback">
 *     <App />
 * </FeedbackProvider>
 * ```
 */
const FeedbackProvider =
({
    children ,
    defaultSound     = true ,
    defaultVibration = true ,
    defaultVolume    = DEFAULT_VOLUME ,
    storageKey       = 'feedback' ,
}) =>
{
    const keys = useMemo( () => (
    {
        sound     : `${ storageKey }:sound` ,
        vibration : `${ storageKey }:vibration` ,
        volume    : `${ storageKey }:volume` ,
    } ) , [ storageKey ] ) ;

    const storedSound     = useStored( keys.sound ) ;
    const storedVibration = useStored( keys.vibration ) ;
    const storedVolume    = useStored( keys.volume ) ;

    const sound     = typeof storedSound     === 'boolean' ? storedSound     : defaultSound ;
    const vibration = typeof storedVibration === 'boolean' ? storedVibration : defaultVibration ;
    const volume    = typeof storedVolume    === 'number'  ? storedVolume    : defaultVolume ;

    const value = useMemo( () =>
    {
        const save = key => next => writeStorage( key , next , { cookie : false } ) ;

        return {
            setSound     : save( keys.sound ) ,
            setVibration : save( keys.vibration ) ,
            setVolume    : next => writeStorage( keys.volume , Math.min( 1 , Math.max( 0 , Number( next ) || 0 ) ) , { cookie : false } ) ,
            sound ,
            toggleSound  : () => writeStorage( keys.sound , !sound , { cookie : false } ) ,
            vibration ,
            volume ,
        } ;
    }
    , [ keys , sound , vibration , volume ] ) ;

    return (
        <FeedbackContext value={ value }>
            { children }
        </FeedbackContext>
    ) ;
} ;

export default FeedbackProvider ;
