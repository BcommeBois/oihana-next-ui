'use client' ;

import { MdVolumeOff , MdVolumeUp } from 'react-icons/md' ;

import useFeedback from '../../contexts/feedback/useFeedback' ;

import Button from '../Button' ;

/**
 * SoundButton — mutes and unmutes every signal of the application, on this device.
 *
 * Toggles `sound` in the feedback context ({@link module:contexts/feedback/provider}),
 * the master switch every `useFeedbackSignal` obeys. A toggle button : its name
 * says what pressing does (« Mute ») and `aria-pressed` says whether it is down.
 * The icon shows the current state — a speaker, or a speaker struck out.
 *
 * Renders nothing outside a `FeedbackProvider` : it would have nothing to switch.
 * Vibration and volume are left to the application's settings screen
 * (`useFeedback()` gives their setters).
 *
 * @module components/buttons/SoundButton
 *
 * @example
 * ```jsx
 * <SoundButton />
 * ```
 *
 * @param {Object} props
 * @param {string} [props.path='components.buttons.sound'] - i18n path the accessible name and the tooltip are read from.
 * @param {import('../../themes/components/button').ButtonShape} [props.shape='square'] - Button shape.
 * @param {import('../../themes/components/button').ButtonSize} [props.size='md'] - Button size.
 * @param {import('../../themes/components/button').ButtonStyle} [props.style='ghost'] - Button style.
 * @param {*} [props.rest] - Additional props forwarded to Button.
 */
const SoundButton =
({
    path  = 'components.buttons.sound' ,
    shape = 'square' ,
    size  = 'md' ,
    style = 'ghost' ,
    ...rest
}) =>
{
    const feedback = useFeedback() ;

    if ( !feedback )
    {
        return null ;
    }

    const { sound , toggleSound } = feedback ;

    return (
        <Button
            aria-pressed = { !sound }
            icon         = { sound ? MdVolumeUp : MdVolumeOff }
            onClick      = { toggleSound }
            path         = { path }
            shape        = { shape }
            size         = { size }
            style        = { style }
            type         = "button"
            { ...rest }
        />
    ) ;
} ;

SoundButton.displayName = 'SoundButton' ;

export default SoundButton ;
