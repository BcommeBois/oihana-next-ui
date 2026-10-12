'use client' ;

import { useId } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import getButtonClassNames , { SQUARE } from '../../themes/components/button' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useValue  from '../../hooks/useValue' ;

/**
 * RadioFilter — one choice among a few, in large buttons that fold away once
 * it is made.
 *
 * daisyUI's `filter`, wrapped : a row of buttons of which one can be chosen.
 * Once it is, the others fold away and a `×` comes up to take the choice back
 * and show them all again. A reason picked in one gesture — « Damaged »,
 * « Missing » — or any quick single choice under the thumb.
 *
 * The options are native radios dressed as buttons : the arrow keys move
 * through them (every option shows again while the keyboard is in the group),
 * and the choice is sent with a `<form>` under `name`. 🔑 **A label is a
 * string** : daisyUI draws it from the radio's `aria-label`, which also names
 * it for a screen reader — there is no room for an icon.
 *
 * 🚨 **The `×` is a radio, never an `<input type="reset">`.** daisyUI shows
 * both ; a reset button inside the application's form would empty **the whole
 * form**, not this choice. It is always there : without it, once a choice is
 * made, the other options never come back.
 *
 * `onChange` receives the chosen option's `value` as given — a number stays a
 * number — and `null` when the choice is taken back. A form receives `''` then.
 *
 * The chosen button looks like the others : daisyUI keeps a `filter`'s checked
 * radio out of its checked colour, since it stands alone anyway. `color` and
 * `style` dress every option.
 *
 * @module components/radios/RadioFilter
 *
 * @example
 * ```jsx
 * <RadioFilter
 *     label    = "Reason"
 *     name     = "reason"
 *     onChange = { setReason }
 *     options  = { [
 *         { value : 'damaged' , label : 'Damaged' } ,
 *         { value : 'missing' , label : 'Missing' } ,
 *         { value : 'label'   , label : 'Wrong label' } ,
 *     ] }
 *     size     = "lg"
 *     value    = { reason }
 * />
 * ```
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes for the container.
 * @param {string} [props.color] - Button colour of every option : `primary`, `secondary`…
 * @param {*} [props.defaultValue=null] - The initial choice (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable every option and the `×`.
 * @param {string} [props.error] - Error message, under the buttons.
 * @param {string} [props.helper] - Helper text, under the buttons.
 * @param {string} [props.label] - The group's visible name.
 * @param {string} [props.legend] - The group's legend, with `useFieldset`.
 * @param {string} props.name - The radios' name, as sent with a form (required).
 * @param {Function} [props.onChange] - `( value | null ) => void`.
 * @param {Array<{ value : *, label : string, disabled? : boolean }>} props.options - The choices, in the order shown.
 * @param {string} [props.path='components.radio.filter'] - i18n path of the `×` label.
 * @param {string} [props.resetLabel] - The `×`'s accessible name. Defaults to the i18n `reset` key.
 * @param {string} [props.size='md'] - Button size : `xs`, `sm`, `md`, `lg`, `xl`.
 * @param {string} [props.style] - Button style of every option : `outline`, `soft`, `dash`, `ghost`.
 * @param {boolean} [props.useFieldset=false] - Wrap in a `<fieldset>` with `legend`.
 * @param {*} [props.value] - The choice (controlled) ; `null` for none.
 */
const RadioFilter =
({
    className ,
    color ,
    defaultValue = null ,
    disabled     = false ,
    error ,
    helper ,
    label ,
    legend ,
    name ,
    onChange ,
    options      = [] ,
    path         = 'components.radio.filter' ,
    resetLabel ,
    size         = 'md' ,
    style ,
    useFieldset  = false ,
    value : valueFromProps ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const labelId = useId() ;
    const resetId = useId() ;

    const [ value , setValue ] = useValue( defaultValue , valueFromProps , onChange ) ;

    const chosen = options.some( option => option.value === value ) ;

    const resetName = resetLabel ?? labels.reset ;

    const group = (
        <div
            aria-invalid    = { error ? true : undefined }
            aria-labelledby = { !useFieldset && label ? labelId : undefined }
            className       = "filter"
            role            = "radiogroup"
        >
            {/*
                Named through aria-labelledby, never aria-label : daisyUI writes a radio button's
                aria-label as its text, with a rule that outweighs the `×` of `.filter-reset`.
            */}
            <span className="sr-only" id={ resetId }>{ resetName }</span>
            <input
                aria-labelledby = { resetId }
                checked         = { !chosen }
                className       = { cn( getButtonClassNames( { shape : SQUARE , size } ) , 'filter-reset' ) }
                disabled        = { disabled }
                name            = { name }
                onChange        = { () => setValue( null ) }
                title           = { resetName }
                type            = "radio"
                value           = ""
            />
            { options.map( option => (
                <input
                    aria-label = { option.label }
                    checked    = { option.value === value }
                    className  = { getButtonClassNames( { color : error ? 'error' : color , size , style } ) }
                    disabled   = { disabled || option.disabled }
                    key        = { String( option.value ) }
                    name       = { name }
                    onChange   = { () => setValue( option.value ) }
                    type       = "radio"
                    value      = { String( option.value ) }
                />
            ) ) }
        </div>
    ) ;

    const helperOrError = ( error || helper ) && (
        <p className={ cn( 'text-xs mt-2' , error ? 'text-error' : 'text-base-content/70' ) }>
            { error || helper }
        </p>
    ) ;

    if ( useFieldset )
    {
        return (
            <fieldset className={ cn( 'fieldset w-full' , className ) }>
                { legend && <legend className="fieldset-legend">{ legend }</legend> }
                { group }
                { helperOrError }
            </fieldset>
        ) ;
    }

    return (
        <div className={ cn( 'flex flex-col gap-2' , className ) }>
            { label && (
                <span className="label" id={ labelId }>{ label }</span>
            ) }
            { group }
            { helperOrError }
        </div>
    ) ;
} ;

RadioFilter.displayName = 'RadioFilter' ;

export default RadioFilter ;
