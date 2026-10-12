/**
 * @typedef {Object} Tone
 * @property {number} frequency - In hertz.
 * @property {number} duration - In milliseconds.
 * @property {number} [gap=0] - Silence before the tone, in milliseconds.
 * @property {OscillatorType} [type='sine'] - The wave : `sine`, `square`, `triangle` or `sawtooth`.
 */

/**
 * @typedef {Object} Signal
 * @property {Tone[]} [tones] - What is heard.
 * @property {number|number[]} [vibration] - What is felt : a duration, or a `navigator.vibrate` pattern, in milliseconds.
 */

/**
 * The three signals every screen gets, named after the library's levels.
 *
 * Told apart without looking : one short high beep for what went through, two
 * beeps for what deserves a look, a long low buzz for what was refused.
 *
 * @type {Object.<string,Signal>}
 */
export const DEFAULT_SIGNALS =
{
    success :
    {
        tones     : [ { duration : 80 , frequency : 1000 } ] ,
        vibration : 40 ,
    } ,
    warning :
    {
        tones     : [ { duration : 80 , frequency : 700 } , { duration : 80 , frequency : 700 , gap : 60 } ] ,
        vibration : [ 60 , 60 , 60 ] ,
    } ,
    error :
    {
        tones     : [ { duration : 350 , frequency : 220 , type : 'square' } ] ,
        vibration : [ 200 , 80 , 200 ] ,
    } ,
} ;

/**
 * The fade in and out of every tone, in seconds : a tone cut dead clicks.
 *
 * @type {number}
 */
export const RAMP = 0.005 ;

// A square or a sawtooth wave sounds far louder than a sine at the same gain.
const LOUDNESS = { sawtooth : 0.4 , sine : 1 , square : 0.4 , triangle : 0.9 } ;

/**
 * Schedules a sequence of tones on an audio context.
 *
 * Every tone is its own oscillator through its own gain, faded in and out over
 * a few milliseconds. Nothing is held : the oscillators stop themselves and are
 * let go.
 *
 * Pure scheduling, so it can be tested against a recording fake context.
 *
 * @module helpers/audio/playTones
 *
 * @param {AudioContext} context - A running audio context.
 * @param {Tone[]} tones - The tones, in order.
 * @param {Object} [options]
 * @param {number} [options.at] - When to start, in the context's seconds. Defaults to now.
 * @param {number} [options.volume=0.6] - From 0 to 1.
 *
 * @returns {number} When the last tone ends, in the context's seconds.
 *
 * @example
 * ```js
 * playTones( context , DEFAULT_SIGNALS.success.tones , { volume : 0.8 } ) ;
 * ```
 */
const playTones = ( context , tones , { at , volume = 0.6 } = {} ) =>
{
    const level = Math.min( 1 , Math.max( 0 , Number.isFinite( volume ) ? volume : 0.6 ) ) ;

    let cursor = at ?? context.currentTime ;

    for ( const { duration , frequency , gap = 0 , type = 'sine' } of tones ?? [] )
    {
        const start = cursor + gap / 1000 ;
        const end   = start + duration / 1000 ;
        const peak  = level * ( LOUDNESS[ type ] ?? 1 ) ;

        const oscillator = context.createOscillator() ;
        const gain       = context.createGain() ;

        oscillator.type = type ;
        oscillator.frequency.setValueAtTime( frequency , start ) ;

        gain.gain.setValueAtTime( 0 , start ) ;
        gain.gain.linearRampToValueAtTime( peak , start + RAMP ) ;
        gain.gain.setValueAtTime( peak , end - RAMP ) ;
        gain.gain.linearRampToValueAtTime( 0 , end ) ;

        oscillator.connect( gain ) ;
        gain.connect( context.destination ) ;

        oscillator.start( start ) ;
        oscillator.stop( end ) ;

        cursor = end ;
    }

    return cursor ;
} ;

export default playTones ;
