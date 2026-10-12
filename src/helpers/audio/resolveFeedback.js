/**
 * The default volume, from 0 to 1.
 *
 * @type {number}
 */
export const DEFAULT_VOLUME = 0.6 ;

/**
 * What a signal may actually do, once the screen's wishes meet the device's
 * settings.
 *
 * 🔑 **The settings are a master switch, never a second opinion.** Sound plays
 * when the screen asks for it AND the settings allow it — a screen can silence
 * what is on, never sound what was turned off. Vibration likewise. The volume
 * is the screen's when it names one, the settings' otherwise.
 *
 * Without settings — no `FeedbackProvider` above — everything the screen asks
 * for goes through, as it always did.
 *
 * @module helpers/audio/resolveFeedback
 *
 * @param {?{ sound ?: boolean , vibration ?: boolean , volume ?: number }} settings - The device's settings, from the feedback context.
 * @param {Object} [wishes] - What the screen asks for.
 * @param {boolean} [wishes.sound=true]
 * @param {boolean} [wishes.vibration=true]
 * @param {number} [wishes.volume]
 *
 * @returns {{ sound : boolean , vibration : boolean , volume : number }}
 *
 * @example
 * ```js
 * resolveFeedback( { sound : false } , { sound : true } ) ; // → { sound : false , vibration : true , volume : 0.6 }
 * ```
 */
const resolveFeedback = ( settings , { sound = true , vibration = true , volume } = {} ) => (
{
    sound     : Boolean( sound ) && ( settings?.sound ?? true ) ,
    vibration : Boolean( vibration ) && ( settings?.vibration ?? true ) ,
    volume    : volume ?? settings?.volume ?? DEFAULT_VOLUME ,
} ) ;

export default resolveFeedback ;
