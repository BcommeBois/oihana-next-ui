'use client' ;

/**
 * InputAction — text input with a single trailing action button.
 *
 * Mirrors the `InputCounter` recipe (oihana-next-ui) but exposes a
 * single configurable action — typically a `+` button to commit the
 * current draft into a parent collection (tag list, allowed IPs,
 * etc.).
 *
 * Behaviour :
 *  - The button sits flush against the input via the `actions` slot
 *    of the underlying `Input` component (uses daisyUI `.join`).
 *  - Pressing **Enter** in the input fires `onAction` (cancellable
 *    via `submitOnEnter={false}`).
 *  - The button can carry a tooltip (daisyUI inline classes — no
 *    native HTML `title`).
 *
 * Forwards every other prop to oihana-next-ui's `Input`, so labels,
 * helpers, errors, placeholders, masks, etc. behave as usual.
 *
 * Lives in the project for now ; will likely move to oihana-next-ui
 * once stabilised.
 *
 * @module components/inputs/InputAction
 *
 * @example
 * ```jsx
 * <InputAction
 *     label          = "Allowed IPs"
 *     placeholder    = "127.0.0.1"
 *     value          = { draft }
 *     onChange       = { setDraft }
 *     onAction       = { commitTag }
 *     actionIcon     = { MdAdd }
 *     actionTooltip  = "Add"
 *     actionDisabled = { draft.trim().length === 0 }
 * />
 * ```
 */

import { MdAdd as DefaultIcon } from 'react-icons/md' ;

import Input from './Input' ;
import cn    from '../../themes/helpers/cn' ;

/**
 * @param {Object}                  props
 * @param {React.ComponentType}     [props.actionIcon]                          - Icon component (default `MdAdd`).
 * @param {string}                  [props.actionAriaLabel]                     - A11y label (falls back to `actionTooltip`).
 * @param {string|null}             [props.actionColor]                         - DaisyUI colour of the action button (`null`/omitted → neutral, matches input border).
 * @param {'soft'|'outline'|'ghost'|'dash'|'link'|null} [props.actionStyle]     - DaisyUI button style. `null`/omitted → solid.
 * @param {boolean}                 [props.actionDisabled=false]                - Disable the action button only.
 * @param {string}                  [props.actionTooltip]                       - Tooltip text on the action button.
 * @param {'top'|'right'|'bottom'|'left'} [props.actionTooltipPosition='left']  - Tooltip position (default 'left')
 * @param {'button'|'submit'}       [props.actionType='button']                 - Action type : 'button' or 'submit'
 * @param {Function}                [props.onAction]                            - Fires on click + on Enter.
 * @param {Function}                [props.onKeyDown]                           - Forwarded after the Enter handler.
 * @param {boolean}                 [props.submitOnEnter=true]                  - Trigger `onAction` when Enter is pressed.
 */
const InputAction =
({
    actionIcon : ActionIcon = DefaultIcon ,
    actionAriaLabel ,
    actionColor ,
    actionStyle,
    actionDisabled = false ,
    actionTooltip ,
    actionTooltipPosition = 'left' ,
    actionType= 'button' ,
    onAction ,
    onKeyDown : onKeyDownFromProps ,
    submitOnEnter = true ,
    ...rest
}) =>
{
    const { disabled , error } = rest ;

    const handleKeyDown = event =>
    {
        if ( submitOnEnter && event.key === 'Enter' && !event.shiftKey )
        {
            event.preventDefault() ;
            if ( !disabled && !actionDisabled )
            {
                onAction?.( event ) ;
            }
        }
        onKeyDownFromProps?.( event ) ;
    } ;

    const buttonClasses = cn
    (
        'btn join-item btn-square' ,
        actionColor && `btn-${ actionColor }` ,
        actionStyle && `btn-${ actionStyle }` ,
        error && 'btn-error' ,
        actionTooltip && `tooltip tooltip-${ actionTooltipPosition }` ,
    ) ;

    const action =
    (
        <button
            key        = "action"
            type       = { actionType }
            disabled   = { disabled || actionDisabled }
            onClick    = { onAction }
            aria-label = { actionAriaLabel ?? actionTooltip }
            className  = { buttonClasses }
            data-tip   = { actionTooltip || undefined }
        >
            <ActionIcon />
        </button>
    ) ;

    return (
        <Input
            actions   = { action }
            onKeyDown = { handleKeyDown }
            { ...rest }
        />
    ) ;
} ;

InputAction.displayName = 'InputAction' ;

export default InputAction ;
