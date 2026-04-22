'use client' ;

import { useState } from 'react' ;

import Input from './Input' ;

import validateHexColor from '../../helpers/colors/validateHexColor' ;

import fastFormat from 'vegas-js-core/src/strings/fastformat' ;
import hexToRgb   from 'vegas-js-core/src/colors/hexToRgb';
import rgbIsDark  from 'vegas-js-core/src/colors/rgbIsDark' ;

import { MdColorLens as ColorIcon } from 'react-icons/md' ;

/**
 * InputHexColor component - Hexadecimal color input with validation and color preview.
 *
 * @param {Object} props
 * @param {boolean} [props.alpha=false] - Allow alpha channel (8 chars: #RRGGBBAA)
 * @param {number} [props.length] - Explicit hex length (3, 4, 6 or 8). Overrides the default derived from `alpha`. When set, validation requires exactly this length.
 * @param {boolean} [props.prefixed=true] - Display "#" prefix
 * @param {boolean} [props.showColorPreview=true] - Show color preview in icon background
 * @param {boolean} [props.showValidationError=false] - Show error message for invalid colors
 * @param {string} [props.validationError] - Custom validation error message (supports {0} placeholder for character count)
 * @param {React.ReactNode} [props.icon] - Custom icon (default: ColorIcon)
 * @param {string} [props.iconClassName] - Icon container classes
 * @param {string} [props.error] - External error message (overrides validation error)
 * @param {Object} props.rest - Other props passed to InputGroup
 *
 * @example
 * // Basic hex color (6 chars)
 * <InputHexColor
 *     label="Color"
 *     placeholder="FFFFFF"
 *     onChange={(color) => console.log(color)} // "#FFFFFF"
 * />
 *
 * @example
 * // With alpha channel (8 chars)
 * <InputHexColor
 *     alpha
 *     label="Color with Alpha"
 *     placeholder="FFFFFFFF"
 * />
 *
 * @example
 * // Without prefix display
 * <InputHexColor
 *     prefixed={false}
 *     label="Color Code"
 * />
 *
 * @example
 * // Without color preview
 * <InputHexColor
 *     showColorPreview={false}
 *     label="Color"
 * />
 *
 * @example
 * // With custom validation error
 * <InputHexColor
 *     showValidationError
 *     validationError="Couleur invalide ({0} caractères requis)"
 *     label="Color"
 * />
 */
const InputHexColor =
({
    alpha = false,
    defaultValue,
    error: externalError,
    icon,
    iconClassName = 'aspect-square',
    length,
    onChange: onChangeFromProps,
    prefixed = true,
    showColorPreview = true,
    showValidationError = false,
    value: externalValue,
    validationError,
    ...rest
}) =>
{
    // --------- Track current color for icon preview and validation error

    const [ currentColor , setCurrentColor ] = useState( externalValue || defaultValue || '' ) ;
    const [ internalError, setInternalError ] = useState( '' ) ;

    // --------- Resolve max length (explicit length wins over alpha default)

    const maxLength = length ?? ( alpha ? 8 : 6 ) ;

    // --------- Transformations

    const transform = value =>
    {
        if ( !value )
        {
            return '' ;
        }

        const cleaned = value.replace( /([^0-9A-F]+)/gi, '' ) ;

        return cleaned.substring( 0, maxLength ).toUpperCase() ;
    } ;

    const validate = value =>
    {
        if ( !value )
        {
            setInternalError( '' ) ;
            return true ;
        }

        // When length is explicit, require exact length; otherwise accept any valid hex form.
        const isValid = length !== undefined
            ? ( value.length === length && validateHexColor( value, alpha ) )
            : validateHexColor( value, alpha ) ;

        if ( showValidationError )
        {
            if ( !isValid )
            {
                const defaultPattern = 'Invalid hex color (expected {0} characters: 0-9, A-F)' ;

                setInternalError( fastFormat
                (
                    validationError ?? defaultPattern,
                    String( maxLength )
                ) ) ;
            }
            else
            {
                setInternalError( '' ) ;
            }
        }

        return isValid ;
    } ;

    const format = prefixed ? value =>
    {
        if ( !value ) return '' ;
        return value.startsWith( '#' ) ? value : `#${value}` ;
    } : undefined ;

    const process = ( value ) =>
    {
        if ( !value ) return '' ;
        return value.startsWith( '#' ) ? value : `#${value}` ;
    } ;

    // --------- Intercept onChange to update currentColor

    const handleChange = ( processedValue ) =>
    {
        // Update local color for icon preview
        setCurrentColor( processedValue || '' ) ;

        // Call parent onChange
        onChangeFromProps?.( processedValue ) ;
    } ;

    // --------- Compute icon styles based on current color

    const getIconStyles = () =>
    {
        if ( !showColorPreview )
        {
            return {} ;
        }

        // Use controlled value if provided, otherwise use local state
        const colorValue = externalValue !== undefined ? externalValue : currentColor ;
        const cleanValue = colorValue.replace( /^#/, '' ) ;

        if ( !cleanValue || !validateHexColor( cleanValue, alpha ) )
        {
            return {} ;
        }

        const hexColor = `#${cleanValue}` ;

        try
        {
            // hexToRgb returns [r, g, b] array
            const [ r, g, b ] = hexToRgb( hexColor ) ;

            // Extract alpha if present (8 chars: RRGGBBAA)
            let alphaValue = 1 ;
            if ( alpha && cleanValue.length === 8 )
            {
                const alphaHex = cleanValue.substring( 6, 8 ) ;
                alphaValue = parseInt( alphaHex, 16 ) / 255 ;
            }

            // Determine icon color based on background brightness
            const isDark = rgbIsDark( r, g, b ) ;
            const iconColor = isDark ? '#FFFFFF' : '#000000' ;

            return {
                backgroundColor: `rgba(${r}, ${g}, ${b}, ${alphaValue})`,
                color: iconColor
            } ;
        }
        catch ( error )
        {
            return {} ;
        }
    } ;

    const iconStyles = getIconStyles() ;

    // --------- Icon element with color preview circle

    const iconElement = (
        <div
            className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-200"
            style={ iconStyles }
        >
            { icon || <ColorIcon className="w-4 h-4" /> }
        </div>
    ) ;

    // --------- Final error (external takes precedence)

    const finalError = externalError || internalError ;

    return (
        <Input
            { ...rest }
            type          = "text"
            value         = { externalValue }
            defaultValue  = { defaultValue }
            onChange      = { handleChange }
            transform     = { transform }
            validate      = { validate }
            format        = { format }
            process       = { process }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            error         = { finalError }
        />
    ) ;
} ;

InputHexColor.displayName = 'InputHexColor' ;

export default InputHexColor ;