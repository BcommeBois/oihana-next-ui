/**
 * Waited before a held press starts repeating, in milliseconds.
 * @type {number}
 */
export const PRESS_REPEAT_DELAY = 400 ;

/**
 * Between two repeats of a held press, in milliseconds : ten a second.
 * @type {number}
 */
export const PRESS_REPEAT_INTERVAL = 100 ;

/**
 * The timing of a press held down : one action at once, then — after `delay`
 * — one every `interval`, until stopped.
 *
 * 🔑 **The action can stop it.** Returning `false` means the step was refused
 * (a limit reached) : the repeat ends there, so a refusal is reported once
 * rather than ten times a second.
 *
 * Each repeat is scheduled after the previous one has run, never on a fixed
 * clock : a slow action delays the next instead of piling up behind it.
 *
 * No DOM and no React : the timers are injectable, so the timing is tested
 * with a fake clock. {@link module:hooks/usePressRepeat} wires it to a button.
 *
 * @module helpers/timers/createPressRepeat
 *
 * @param {Object} options
 * @param {Function} options.action - `() => boolean | void`. `false` stops the repeat.
 * @param {number} [options.delay=400] - Before the first repeat.
 * @param {number} [options.interval=100] - Between two repeats.
 * @param {{ setTimeout : Function , clearTimeout : Function }} [options.timers=globalThis]
 *
 * @returns {{ start : () => boolean , stop : () => void , readonly running : boolean }}
 *   `start` runs the action at once and returns whether it was accepted.
 *
 * @example
 * ```js
 * const repeat = createPressRepeat( { action : () => increment() } ) ;
 *
 * button.addEventListener( 'pointerdown' , repeat.start ) ;
 * button.addEventListener( 'pointerup'   , repeat.stop ) ;
 * ```
 */
const createPressRepeat =
({
    action ,
    delay    = PRESS_REPEAT_DELAY ,
    interval = PRESS_REPEAT_INTERVAL ,
    timers   = globalThis ,
}) =>
{
    let timer = null ;

    const stop = () =>
    {
        if ( timer !== null )
        {
            timers.clearTimeout( timer ) ;
            timer = null ;
        }
    } ;

    const tick = () =>
    {
        timer = null ;

        if ( action() === false )
        {
            return ;
        }

        timer = timers.setTimeout( tick , interval ) ;
    } ;

    const start = () =>
    {
        stop() ;

        if ( action() === false )
        {
            return false ;
        }

        timer = timers.setTimeout( tick , delay ) ;

        return true ;
    } ;

    return {
        get running()
        {
            return timer !== null ;
        } ,
        start ,
        stop ,
    } ;
} ;

export default createPressRepeat ;
