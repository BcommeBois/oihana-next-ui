'use client' ;

import { useState } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import useValue from '../../hooks/useValue' ;

import getButtonClassNames , { GHOST , SQUARE } from '../../themes/components/button' ;

import Modal    from '../modals/Modal' ;
import useModal from '../modals/hooks/useModal' ;

import InputHexColor from './InputHexColor' ;
import ColorPicker   from '../colors/ColorPicker' ;

import { MD } from '../../themes/sizing/sizes' ;

import { HORIZONTAL } from '../../themes/enums/orientations' ;
import { VIEWPORT }   from '../../themes/components/colorPicker' ;

import { MdColorize as DefaultPickerIcon , MdClose as ClearIcon } from 'react-icons/md' ;

/**
 * InputColor — a hex color input paired with our own visual color picker.
 *
 * Composes {@link InputHexColor} (the masked text field,
 * with a live color preview on the left) and a trigger button on the right that
 * opens a {@link module:components/colors/ColorPicker} inside a
 * {@link Modal}. The text field and the picker share a
 * single value (controlled or uncontrolled via {@link useValue}).
 *
 * By default the picker commits **live** : every drag / pick updates the value
 * immediately. With `footer`, the modal gains an Apply / Cancel footer and switches
 * to a **deferred commit** : the picker edits a draft seeded from the current value
 * when the modal opens ; Apply commits the draft, while Cancel, the backdrop,
 * `Escape` or the header close button all discard it. `applyLabel` / `cancelLabel`
 * make the two buttons localizable.
 *
 * The Modal (native `<dialog>`) gives a centered, backdrop-dismissable, fully
 * responsive surface that works on mobile and every browser. The picker opens in
 * the horizontal layout by default (square left, controls right) and folds back to
 * vertical on small screens ; set `orientation="vertical"` for the stacked layout.
 *
 * @module components/inputs/InputColor
 *
 * @param {Object} props
 * @param {boolean} [props.alpha=false] - Allow an alpha channel ('#RRGGBBAA').
 * @param {string} [props.applyLabel='Apply'] - Footer Apply button label (when `footer`).
 * @param {string} [props.cancelLabel='Cancel'] - Footer Cancel button label (when `footer`).
 * @param {boolean} [props.clearable=false] - Show a clear button (left of the trigger) when the field has a value.
 * @param {import('../../themes/components/colorPicker').ColorPickerCollapse} [props.collapse='viewport'] - How the horizontal picker folds back to vertical.
 * @param {string} [props.defaultValue] - Initial value (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable the field and the trigger.
 * @param {boolean} [props.footer=false] - Show an Apply / Cancel footer in the modal (deferred commit : the picker edits a draft, Apply commits it, any other close discards it).
 * @param {Object} [props.modalProps] - Extra props forwarded to the Modal (spread last, can override defaults).
 * @param {(value: string) => void} [props.onChange] - Change handler (receives '#RRGGBB[AA]').
 * @param {import('../../themes/enums/orientations').Orientation} [props.orientation='horizontal'] - Picker layout inside the modal.
 * @param {React.ReactNode} [props.pickerIcon] - Custom trigger icon node (overrides `PickerIcon`).
 * @param {React.ComponentType} [props.PickerIcon] - Trigger icon component (default: eyedropper).
 * @param {Object} [props.pickerProps] - Extra props forwarded to the ColorPicker (presets, showPresets…).
 * @param {string[]} [props.presets] - Preset swatches forwarded to the ColorPicker.
 * @param {import('../../themes/sizing/sizes').Size} [props.size='md'] - Input + trigger size.
 * @param {React.ReactNode} [props.title='Pick a color'] - Modal title / trigger a11y label.
 * @param {string} [props.triggerClassName] - Extra classes for the trigger button.
 * @param {string} [props.value] - Controlled value.
 * @param {Object} props.rest - Other props forwarded to InputHexColor (label, error, helper, placeholder…).
 *
 * @example
 * ```jsx
 * const [ color , setColor ] = useState( '#FF5733' ) ;
 * <InputColor label="Brand color" value={ color } onChange={ setColor } />
 * ```
 *
 * @example
 * ```jsx
 * // With alpha channel
 * <InputColor alpha label="Overlay" defaultValue="#000000AA" />
 * ```
 *
 * @example
 * ```jsx
 * // Deferred commit with a localized Apply / Cancel footer
 * <InputColor footer applyLabel="Appliquer" cancelLabel="Annuler" label="Couleur" defaultValue="#0EA5E9" />
 * ```
 */
const InputColor =
({
    alpha = false ,
    applyLabel = 'Apply' ,
    cancelLabel = 'Cancel' ,
    clearable = false ,
    collapse = VIEWPORT ,
    defaultValue ,
    disabled = false ,
    footer = false ,
    modalProps ,
    onChange : onChangeFromProps ,
    orientation = HORIZONTAL ,
    pickerIcon ,
    PickerIcon = DefaultPickerIcon ,
    pickerProps ,
    presets ,
    size = MD ,
    title = 'Pick a color' ,
    triggerClassName ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const [ value , setValue ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;

    const { modalRef , open } = useModal() ;

    // Deferred commit (footer) : the picker edits a draft seeded when the modal
    // opens ; Apply commits it, any other close (Cancel, backdrop, Escape, ×)
    // simply discards it — the draft is re-seeded on the next open.
    const [ draft , setDraft ] = useState( '' ) ;

    const openPicker = () =>
    {
        if ( footer )
        {
            setDraft( value ?? '' ) ;
        }
        open() ;
    } ;

    // The horizontal picker is wider than the vertical one — give the modal room for it.
    const isHorizontal = orientation === HORIZONTAL ;

    // Clear button — sits left of the trigger, only when there is a value.
    const clearButton = clearable && value
        ? (
            <button
                key        = "clear"
                type       = "button"
                aria-label = "Clear color"
                disabled   = { disabled }
                className  = { cn( getButtonClassNames({ shape : SQUARE , size , style : GHOST }) , 'join-item' ) }
                onClick    = { () => setValue( '' ) }
            >
                <ClearIcon className="size-5" />
            </button>
        )
        : null ;

    // Trigger lives in the input's right-side action slot ; opens the picker modal.
    const trigger = (
        <button
            key        = "trigger"
            type       = "button"
            className  = { cn( getButtonClassNames({ shape : SQUARE , size }) , 'join-item' , triggerClassName ) }
            onClick    = { openPicker }
            disabled   = { disabled }
            aria-label = { title }
        >
            { pickerIcon ?? <PickerIcon className="size-5" /> }
        </button>
    ) ;

    return (
        <>
            <InputHexColor
                { ...rest }
                alpha    = { alpha }
                disabled = { disabled }
                size     = { size }
                value    = { value ?? '' }
                onChange = { setValue }
                actions  = { [ clearButton , trigger ] }
            />

            <Modal
                ref               = { modalRef }
                title             = { title }
                maxWidth          = { isHorizontal ? 'max-w-md' : 'max-w-xs' }
                showFooter        = { footer }
                agree             = { applyLabel }
                disagree          = { cancelLabel }
                onAgree           = { () => setValue( draft ) }
                modalBoxClassName = "w-fit p-3"
                contentClassName  = "px-0 py-2"
                { ...modalProps }
            >
                <div className="flex justify-center">
                    <ColorPicker
                        alpha       = { alpha }
                        collapse    = { collapse }
                        orientation = { orientation }
                        presets     = { presets }
                        value       = { footer ? draft : ( value ?? '' ) }
                        onChange    = { footer ? setDraft : setValue }
                        { ...pickerProps }
                    />
                </div>
            </Modal>
        </>
    ) ;
} ;

InputColor.displayName = 'InputColor' ;

export default InputColor ;
