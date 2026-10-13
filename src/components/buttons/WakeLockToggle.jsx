'use client' ;

/**
 * WakeLockToggle — a button that keeps the screen on, or lets it go.
 *
 * A toggle on `useWakeLock` : pressed, the lock is held ; the icon says
 * which, and `aria-pressed` says it to a reader. Where the API is absent
 * the button renders nothing — a control that can do nothing should not be
 * there.
 *
 * @module components/buttons/WakeLockToggle
 *
 * @param {Object} props
 * @param {boolean} [props.defaultActive=false] - Hold the lock from the start.
 * @param {Function} [props.onChange] - `( active ) => void`.
 * @param {string} [props.path='components.buttons.wakeLock'] - i18n path of `title` and `tooltip`.
 * @param {import('../../themes/components/button').ButtonShape} [props.shape='square']
 * @param {import('../../themes/components/button').ButtonSize} [props.size='md']
 * @param {import('../../themes/components/button').ButtonStyle} [props.style='ghost']
 * @param {Object} [props.rest] - Every other prop goes to {@link module:components/Button}.
 *
 * @example
 * ```jsx
 * <WakeLockToggle defaultActive size="sm" />
 * ```
 */

import { useEffect , useState } from 'react' ;

import { MdLightbulb , MdLightbulbOutline } from 'react-icons/md' ;

import Button from '../Button' ;

import useWakeLock from '../../hooks/useWakeLock' ;

const WakeLockToggle =
({
    defaultActive = false ,
    onChange ,
    path  = 'components.buttons.wakeLock' ,
    shape = 'square' ,
    size  = 'md' ,
    style = 'ghost' ,
    ...rest
}) =>
{
    const [ wanted , setWanted ] = useState( defaultActive ) ;

    const { active , supported } = useWakeLock( { enabled : wanted } ) ;

    useEffect( () => { onChange?.( active ) ; } , [ active , onChange ] ) ;

    if ( !supported )
    {
        return null ;
    }

    return (
        <Button
            active       = { active }
            aria-pressed = { active }
            icon         = { active ? MdLightbulb : MdLightbulbOutline }
            onClick      = { () => setWanted( value => !value ) }
            path         = { path }
            shape        = { shape }
            size         = { size }
            style        = { active ? undefined : style }
            type         = "button"
            { ...rest }
        />
    ) ;
} ;

WakeLockToggle.displayName = 'WakeLockToggle' ;

export default WakeLockToggle ;
