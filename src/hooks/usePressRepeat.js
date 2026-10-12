'use client' ;

import { useEffect , useMemo , useRef } from 'react' ;

import createPressRepeat ,
{
    PRESS_REPEAT_DELAY ,
    PRESS_REPEAT_INTERVAL ,
} from '../helpers/timers/createPressRepeat' ;

/**
 * Everything that ends a held press, whatever the button underneath is doing.
 * @type {string[]}
 */
const RELEASE_EVENTS = [ 'pointerup' , 'pointercancel' , 'blur' ] ;

/**
 * A button that repeats its action while it is held down — the − and + of a
 * stepper.
 *
 * Returns the handlers to spread on the button. Enabled, a press acts **at
 * once** on `pointerdown`, then, still held after `delay`, again every
 * `interval`, until the pointer is lifted, leaves the button or is cancelled,
 * the window loses the focus or the page is hidden. The click that follows the
 * press is ignored ; a click from the keyboard (Enter, Space) acts once.
 * Disabled, it is a plain `onClick`.
 *
 * 🔑 **Returning `false` from the action stops the repeat** : a limit reached
 * is reported once, not ten times a second. The latest action is always the
 * one called, so a repeat steps from the value on screen, not the one of the
 * render it started from.
 *
 * A long press opens the context menu on Android : it is prevented on the
 * button. Add `select-none touch-manipulation` to its classes so it selects no
 * text and does not wait for a double tap.
 *
 * @module hooks/usePressRepeat
 *
 * @param {Function} action - `() => boolean | void`. `false` stops the repeat.
 * @param {Object} [options]
 * @param {number} [options.delay=400] - Held this long, the press starts repeating.
 * @param {boolean} [options.enabled=true] - `false` returns a plain `onClick`.
 * @param {number} [options.interval=100] - Between two repeats.
 *
 * @returns {Object} Handlers to spread on the button.
 *
 * @example
 * ```jsx
 * const more = usePressRepeat( () => increment() , { enabled : repeat } ) ;
 *
 * <button className="select-none touch-manipulation" type="button" { ...more }>+</button>
 * ```
 */
const usePressRepeat = ( action , { delay = PRESS_REPEAT_DELAY , enabled = true , interval = PRESS_REPEAT_INTERVAL } = {} ) =>
{
    const actionRef = useRef( action ) ;

    useEffect( () =>
    {
        actionRef.current = action ;
    } ) ;

    const repeat = useMemo( () => createPressRepeat( { action : () => actionRef.current?.() , delay , interval } ) , [ delay , interval ] ) ;

    // Set while a press is held : what removes the listeners that end it.
    const releaseRef = useRef( null ) ;

    useEffect( () => () =>
    {
        releaseRef.current?.() ;
        repeat.stop() ;
    }
    , [ repeat ] ) ;

    return useMemo( () =>
    {
        if ( !enabled )
        {
            return { onClick : () => actionRef.current?.() } ;
        }

        const release = () =>
        {
            repeat.stop() ;
            releaseRef.current?.() ;
        } ;

        const onVisibility = () =>
        {
            if ( document.hidden )
            {
                release() ;
            }
        } ;

        return {
            onClick : event =>
            {
                // 0 : a click from the keyboard, with no press before it.
                if ( event.detail === 0 )
                {
                    actionRef.current?.() ;
                }
            } ,
            onContextMenu  : event => event.preventDefault() ,
            onPointerDown  : event =>
            {
                if ( event.button !== 0 )
                {
                    return ;
                }

                releaseRef.current?.() ;

                for ( const type of RELEASE_EVENTS )
                {
                    globalThis.addEventListener( type , release ) ;
                }
                document.addEventListener( 'visibilitychange' , onVisibility ) ;

                releaseRef.current = () =>
                {
                    for ( const type of RELEASE_EVENTS )
                    {
                        globalThis.removeEventListener( type , release ) ;
                    }
                    document.removeEventListener( 'visibilitychange' , onVisibility ) ;
                    releaseRef.current = null ;
                } ;

                repeat.start() ;
            } ,
            onPointerLeave : release ,
        } ;
    }
    , [ enabled , repeat ] ) ;
} ;

export default usePressRepeat ;
