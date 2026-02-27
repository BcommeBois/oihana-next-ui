'use client' ;

import { useMemo, useEffect , useRef } from 'react'

import { useMaskito } from '@maskito/react'
import { maskitoDateRangeOptionsGenerator, maskitoParseDate } from '@maskito/kit'

import useMergeRefs from '@/hooks/useMergeRefs'
import useValue     from '@/hooks/useValue'
import parseISO     from '@/helpers/date/parseISO'

import Input from './Input'

import
{
    DD_MM,
    DD_MM_YYYY,
    MM_DD,
    MM_DD_YYYY,
    MM_YY,
    MM_YYYY,
    YYYY_MM_DD
}
from '@/helpers/date/dateModes'

import { MdDateRange as DateRangeIcon } from 'react-icons/md'

/**
 * InputDateRange component - Date range input with Maskito formatting.
 *
 * Supports standard Maskito modes (dd/mm/yyyy, mm/dd/yyyy, dd/mm, mm/dd, mm/yyyy, mm/yy)
 * and custom ISO format (yyyy/mm/dd).
 *
 * @param {Object} props
 * @param {string} [props.defaultValue=''] - Default date range value
 * @param {string} [props.value] - Controlled date range value
 * @param {Function} [props.onChange] - Change handler (formatted string)
 * @param {Function} [props.onDateRange] - Callback {start: Date, end: Date}
 * @param {string} [props.mode='dd/mm/yyyy'] - Date format mode
 * @param {string} [props.dateSeparator='/'] - Date segments separator
 * @param {string} [props.rangeSeparator=' – '] - Dates separator
 * @param {Date} [props.min] - Minimum allowed date
 * @param {Date} [props.max] - Maximum allowed date
 * @param {Object} [props.minLength] - Minimal range length {day, month, year}
 * @param {Object} [props.maxLength] - Maximal range length {day, month, year}
 * @param {boolean} [props.allowReversedRange=false] - Allow end date before start
 * @param {React.ReactNode} [props.icon] - Custom icon
 * @param {string} [props.iconClassName] - Icon container classes
 * @param {boolean} [props.showIcon=true] - Show the calendar icon
 * @param {boolean} [props.disabled=false] - Disable input
 * @param {boolean} [props.readOnly=false] - Make input read-only
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text
 * @param {string} [props.validatorHint] - Validation hint text
 * @param {string} [props.label] - Label text
 * @param {string} [props.legend] - Legend text
 * @param {boolean} [props.useFieldset=false] - Use fieldset wrapper
 * @param {boolean} [props.useValidator=false] - Enable DaisyUI validator
 * @param {*} [props.ref] - Ref object for the input
 * @param {Object} props.rest - Other props
 *
 * @example
 * import { DD_MM_YYYY, YYYY_MM_DD } from '@/components/inputs/InputDateRange';
 *
 * // French format (dd/mm/yyyy – dd/mm/yyyy)
 * <InputDateRange mode={DD_MM_YYYY} dateSeparator="/" />
 *
 * @example
 * // ISO format (yyyy-mm-dd – yyyy-mm-dd)
 * <InputDateRange mode={YYYY_MM_DD} dateSeparator="-" />
 *
 * @example
 * // Custom range separator
 * <InputDateRange
 *     mode={DD_MM_YYYY}
 *     dateSeparator="/"
 *     rangeSeparator=" to "
 * />
 *
 * @example
 * // With date range validation
 * <InputDateRange
 *     mode={DD_MM_YYYY}
 *     min={new Date('2024-01-01')}
 *     max={new Date('2024-12-31')}
 *     label="Booking Period"
 * />
 *
 * @example
 * // With min/max range length
 * <InputDateRange
 *     mode={DD_MM_YYYY}
 *     minLength={{ day: 1 }}
 *     maxLength={{ day: 30 }}
 *     label="Vacation Dates"
 *     helper="Between 1 and 30 days"
 * />
 *
 * @example
 * // Controlled with callback
 * const [range, setRange] = useState('');
 * const [dateRange, setDateRange] = useState(null);
 *
 * <InputDateRange
 *     value={range}
 *     onChange={setRange}
 *     onDateRange={setDateRange}
 *     mode={DD_MM_YYYY}
 *     label="Select Period"
 * />
 *
 * // dateRange will be { start: Date, end: Date } or null
 *
 * @example
 * // Auto-insertion - Type "010120243112024" → displays "01/01/2024 – 31/12/2024"
 * <InputDateRange mode={DD_MM_YYYY} />
 */
const InputDateRange =
({
    defaultValue = '',
    onChange: onChangeFromProps,
    value: valueFromProps,
    onDateRange,

    mode = DD_MM_YYYY,
    dateSeparator = '/',
    rangeSeparator = ' – ',
    min,
    max,
    minLength,
    maxLength,
    allowReversedRange = false,

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

    ref ,

    ...rest
}) =>
{
    // --------- Value management

    const [ value , setValue ] = useValue( defaultValue, valueFromProps, onChangeFromProps ) ;

    // --------- Check if custom ISO mode

    const isISOMode = mode === YYYY_MM_DD ;

    // --------- Maskito options

    const maskOptions = useMemo( () =>
    {
        if ( isISOMode )
        {
            // Masque complet statique pour yyyy/mm/dd – yyyy/mm/dd
            const mask = [
                // Première date
                /[1-2]/, /\d/, /\d/, /\d/, // Year: 1000-2999
                dateSeparator,
                /[0-1]/, /\d/,    // Month: 01-12
                dateSeparator,
                /[0-3]/, /\d/,    // Day: 01-31
                // Range separator
                ...rangeSeparator.split( '' ),
                // Deuxième date
                /[1-2]/, /\d/, /\d/, /\d/, // Year: 1000-2999
                dateSeparator,
                /[0-1]/, /\d/,    // Month: 01-12
                dateSeparator,
                /[0-3]/, /\d/     // Day: 01-31
            ] ;

            return { mask } ;
        }

        return maskitoDateRangeOptionsGenerator({
            mode,
            dateSeparator,
            rangeSeparator,
            ...(min && { min }),
            ...(max && { max }),
            ...(minLength && { minLength }),
            ...(maxLength && { maxLength })
        }) ;
    }, [ mode, dateSeparator, rangeSeparator, min, max, minLength, maxLength, isISOMode ]) ;

    const maskedInputRef = useMaskito({ options : maskOptions }) ;
    const internalRef    = useRef( null ) ;
    const mergedRef      = useMergeRefs( maskedInputRef, internalRef, ref ) ;

    // --------- Date range parsing

    useEffect( () =>
    {
        if ( !onDateRange ) return ;

        if ( !value )
        {
            onDateRange( null ) ;
            return ;
        }

        try
        {
            const parts = value.split( rangeSeparator ) ;

            if ( parts.length !== 2 )
            {
                onDateRange( null ) ;
                return ;
            }

            const [ startStr , endStr ] = parts ;

            let startDate, endDate ;

            if ( isISOMode )
            {
                startDate = parseISO( startStr.trim() , dateSeparator ) ;
                endDate   = parseISO( endStr.trim()   , dateSeparator ) ;
            }
            else
            {
                const params =
                {
                    mode : /** @type {any} */ (mode),
                    min,
                    max
                } ;

                startDate = maskitoParseDate( startStr.trim() , params ) ;
                endDate   = maskitoParseDate( endStr.trim()   , params ) ;
            }

            // Validate both dates exist and are valid
            if ( !startDate || isNaN( startDate.getTime() ) || !endDate || isNaN( endDate.getTime() ) )
            {
                onDateRange( null ) ;
                return ;
            }

            // Validate date order: end date must be >= start date (unless allowReversedRange)
            if ( !allowReversedRange && endDate < startDate )
            {
                onDateRange( null ) ;
                return ;
            }

            onDateRange( { start : startDate , end : endDate } ) ;
        }
        catch ( error )
        {
            onDateRange( null ) ;
        }
    }
    , [ value , mode , dateSeparator , rangeSeparator , isISOMode , allowReversedRange , onDateRange ] ) ;

    // --------- Build placeholder

    const datePlaceholder = mode
        .toUpperCase()
        .replace( /[a-z]/gi , char =>
        {
            switch ( char.toLowerCase() )
            {
                case 'd' : return 'D' ;
                case 'm' : return 'M' ;
                case 'y' : return 'Y' ;
                default  : return char ;
            }
        })
        .replace( /[\/.\-]/g, dateSeparator ) ;

    const placeholder = `${datePlaceholder}${rangeSeparator}${datePlaceholder}` ;

    // --------- Handlers

    const handleChange = event =>
    {
        const inputValue = event?.target?.value ?? ( typeof event === 'string' ? event : '' ) ;
        setValue( inputValue ) ;
    } ;

    // --------- Icon element

    const iconElement = showIcon && (
        <div className="flex items-center justify-center">
            { icon || <DateRangeIcon /> }
        </div>
    ) ;

    // --------- Render

    return (
        <Input
            type          = "text"
            value         = { value ?? '' }
            onChange      = { handleChange }
            placeholder   = { placeholder }
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
            inputMode     = "numeric"
            autoComplete  = "off"
            ref           = { mergedRef }
            { ...rest }
        />
    ) ;
} ;

InputDateRange.displayName = 'InputDateRange' ;

export default InputDateRange ;

// Export date modes
export {
    DD_MM,
    DD_MM_YYYY,
    MM_DD,
    MM_DD_YYYY,
    MM_YY,
    MM_YYYY,
    YYYY_MM_DD
} ;