'use client';

import { MdPercent as PercentIcon } from 'react-icons/md' ;

import Input from './Input' ;

/**
 * InputPercentage component - Percentage input with validation (0-100).
 *
 * @param {Object} props
 * @param {number} [props.defaultValue=0] - Default value (number)
 * @param {number} [props.value] - Controlled value (number)
 * @param {Function} [props.onChange] - Change handler (receives number)
 * @param {number} [props.min=0] - Minimum value
 * @param {number} [props.max=100] - Maximum value
 * @param {number} [props.precision=2] - Decimal precision
 * @param {boolean} [props.showSymbol=true] - Show % symbol
 * @param {string} [props.decimalSeparator='.'] - Decimal separator ('.' or ',')
 * @param {React.ReactNode} [props.icon] - Custom icon (default: PercentIcon)
 * @param {string} [props.iconClassName] - Icon container classes
 * @param {boolean} [props.showIcon=true] - Show icon
 * @param {boolean} [props.disabled=false] - Disable input
 * @param {boolean} [props.readOnly=false] - Make input read-only
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text
 * @param {string} [props.validatorHint] - Validation hint text
 * @param {string} [props.label] - Label text
 * @param {string} [props.legend] - Legend text (for fieldset)
 * @param {boolean} [props.useFieldset=false] - Use fieldset wrapper
 * @param {boolean} [props.useValidator=false] - Enable validator styling
 * @param {Object} props.rest - Other props passed to InputPercentage
 *
 * @example
 * // Simple percentage
 * <InputPercentage label="Discount" defaultValue={15} />
 *
 * @example
 * // Custom range (0-50%)
 * <InputPercentage
 *     label="Tax Rate"
 *     max={50}
 *     defaultValue={20}
 * />
 *
 * @example
 * // Without symbol
 * <InputPercentage
 *     showSymbol={false}
 *     label="Completion"
 * />
 *
 * @example
 * // Controlled with callback
 * const [percentage, setPercentage] = useState(75);
 *
 * <InputPercentage
 *     value={percentage}
 *     onChange={setPercentage}
 *     label="Progress"
 * />
 *
 * @example
 * // With validation
 * <InputPercentage
 *     useValidator
 *     required
 *     label="Completion Rate"
 *     validatorHint="Must be between 0 and 100%"
 * />
 *
 * @example
 * // European format (comma as decimal)
 * <InputPercentage
 *     decimalSeparator=","
 *     defaultValue={12.5}
 *     label="TVA"
 * />
 */
const InputPercentage =
({
    defaultValue = 0,
    value: externalValue,
    onChange,

    min = 0,
    max = 100,
    precision = 2,
    showSymbol = true,
    decimalSeparator = '.',

    icon,
    iconClassName,
    showIcon = true,

    disabled = false,
    readOnly = false,
    error,
    helper,
    validatorHint,
    label,
    legend,
    useFieldset = false,
    useValidator = false,

    ...rest
}) =>
{
    // --------- Transform: clean input and allow only numbers + decimal separator

    const transform = value =>
    {
        if ( !value && value !== 0 )
        {
            return '' ;
        }

        // Convert to string
        const strValue = String( value ) ;

        // Allow only digits and one decimal separator
        return strValue
            .replace(new RegExp(`[^0-9${decimalSeparator}]`, 'g'), '')
            .replace(new RegExp(`\\${decimalSeparator}`, 'g'), (match, offset, string) => {
                // Only keep first decimal separator
                return string.indexOf(match) === offset ? match : '';
            }) ;
    } ;

    // --------- Validate: check range

    const validate = ( value ) =>
    {
        if ( !value && value !== 0 )
        {
            return true ; // Empty is valid (unless required)
        }

        const numValue = parseFloat( String( value ).replace( decimalSeparator, '.' ) ) ;

        if ( isNaN( numValue ) )
        {
            return false ;
        }

        return numValue >= min && numValue <= max ;
    } ;

    // --------- Format: add % symbol

    const format = showSymbol ? ( value ) =>
    {
        if ( !value && value !== 0 )
        {
            return '' ;
        }

        return `${value}%` ;
    } : undefined ;

    // --------- Process: convert to number

    const process = value =>
    {
        if ( !value && value !== 0 )
        {
            return null ;
        }

        const numValue = parseFloat( String( value ).replace( decimalSeparator, '.' ) ) ;

        if ( isNaN( numValue ) )
        {
            return null ;
        }

        // Round to precision and clamp to range
        const rounded = Math.round( numValue * Math.pow( 10, precision ) ) / Math.pow( 10, precision ) ;

        return Math.max(min, Math.min(max, rounded)) ;
    } ;

    // --------- Icon element

    const iconElement = showIcon && (
        <div className="flex items-center justify-center">
            { icon || <PercentIcon /> }
        </div>
    ) ;

    // --------- Placeholder

    const placeholder = showSymbol ? `0${decimalSeparator}00%` : `0${decimalSeparator}00` ;

    return (
        <Input
            { ...rest }
            type          = "text"
            value         = { externalValue }
            defaultValue  = { defaultValue }
            onChange      = { onChange }
            transform     = { transform }
            validate      = { validate }
            format        = { format }
            process       = { process }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            disabled      = { disabled }
            readOnly      = { readOnly }
            error         = { error }
            helper        = { helper }
            validatorHint = { validatorHint }
            label         = { label }
            legend        = { legend }
            useFieldset   = { useFieldset }
            useValidator  = { useValidator }
            placeholder   = { placeholder }
            inputMode     = "decimal"
        />
    ) ;
} ;

InputPercentage.displayName = 'InputPercentage' ;

export default InputPercentage ;