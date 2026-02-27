'use client' ;

import getActionElements from '@/components/helpers/getActionElements' ;
import getSelectClasses  from '@/themes/components/select' ;
import cn                from '@/themes/helpers/cn' ;

/**
 * Select component with optional actions, error states, and HTML5 validation.
 *
 * @param {Object} props
 * @param {React.ReactNode|React.ReactNode[]} [props.actions] - Action button(s) on the right
 * @param {React.ReactNode} props.children - Option elements
 * @param {string} [props.className] - Additional classes for the container
 * @param {string} [props.color] - DaisyUI color: 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'neutral'
 * @param {string} [props.size] - DaisyUI size: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {string} [props.style] - DaisyUI style: 'ghost'
 * @param {string} [props.error] - Error message (changes select/buttons color to error)
 * @param {string} [props.helper] - Helper text below the select (always visible)
 * @param {string} [props.validatorHint] - Validation hint text (only visible when validation fails)
 * @param {string} [props.label] - Label text above the select
 * @param {string} [props.legend] - Legend text (if using fieldset pattern)
 * @param {string} [props.id] - Select ID
 * @param {*} [props.selectRef] - Ref object to access the select element
 * @param {boolean} [props.useFieldset=false] - Use fieldset/legend instead of label
 * @param {boolean} [props.useValidator=false] - Enable DaisyUI validator styling
 * @param {boolean} [props.required=false] - HTML5 required attribute
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {*} [props.defaultValue] - Default selected value
 * @param {*} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {Object} props.selectProps - Additional props for the select element
 *
 * @example
 * // Simple select
 * <Select>
 *     <option disabled value="">Pick a color</option>
 *     <option>Red</option>
 *     <option>Blue</option>
 * </Select>
 *
 * @example
 * // With label and color
 * <Select label="Favorite Color" color="primary">
 *     <option disabled value="">Pick a color</option>
 *     <option>Red</option>
 *     <option>Blue</option>
 * </Select>
 *
 * @example
 * // With fieldset
 * <Select useFieldset legend="Browser" helper="Choose your default browser">
 *     <option disabled value="">Pick a browser</option>
 *     <option>Chrome</option>
 *     <option>Firefox</option>
 * </Select>
 */
const Select = ({
                    actions,
                    children,
                    className,
                    color,
                    size,
                    style,
                    label,
                    legend,
                    helper,
                    error,
                    validatorHint,
                    id,
                    selectRef,
                    useFieldset = false,
                    useValidator = false,
                    required = false,
                    disabled = false,
                    defaultValue,
                    value,
                    onChange,
                    ...selectProps
                }) =>
{
    const hasError = Boolean( error ) ;
    const validatorClass = useValidator ? 'validator' : '' ;

    const selectClasses = cn( getSelectClasses({
            color: hasError ? 'error' : color,
            size,
            style
        }),
        'join-item grow',
        validatorClass
    ) ;

    // --------- Action buttons

    const actionElements = getActionElements( actions, hasError ) ;

    const selectGroup = (
        <>
            <div className="join">
                <select
                    id           = { id }
                    className    = { selectClasses }
                    ref          = { selectRef }
                    required     = { required }
                    disabled     = { disabled }
                    defaultValue = { defaultValue }
                    value        = { value }
                    onChange     = { onChange }
                    { ...selectProps }
                >
                    { children }
                </select>

                { actionElements }
            </div>

            {
                error ? (
                    <p className="label text-xs text-error">
                        { error }
                    </p>
                ) : helper ? (
                    <p className="label text-xs text-base-content/70">
                        { helper }
                    </p>
                ) : null
            }

            {
                useValidator && validatorHint && (
                    <p className="validator-hint hidden">
                        { validatorHint }
                    </p>
                )
            }
        </>
    ) ;

    if ( useFieldset )
    {
        return (
            <fieldset className={ cn( 'fieldset w-full', className ) }>
                { legend && <legend className="fieldset-legend">{ legend }</legend> }
                { selectGroup }
            </fieldset>
        ) ;
    }

    return (
        <div className={ cn( 'flex flex-col gap-2', className ) }>
            { label && (
                <label htmlFor={ id } className="label">
                    { label }
                </label>
            )}
            { selectGroup }
        </div>
    ) ;
} ;

Select.displayName = 'Select' ;

export default Select ;