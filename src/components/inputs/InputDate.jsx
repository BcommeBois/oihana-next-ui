'use client' ;

import { useMemo, useEffect , useRef } from 'react'

import { useMaskito } from '@maskito/react'
import { maskitoDateOptionsGenerator, maskitoParseDate } from '@maskito/kit'

import useValue     from '../../hooks/useValue'
import useMergeRefs from '../../hooks/useMergeRefs'

import readInputValue from '../../helpers/react/readInputValue'

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
from '../../helpers/date/dateModes'

import { MdCalendarToday as CalendarIcon } from 'react-icons/md'

/**
 * InputDate component - Date input with Maskito formatting and multiple format modes.
 *
 * Every mode goes through Maskito, the ISO ones included : dd/mm/yyyy, mm/dd/yyyy,
 * dd/mm, mm/dd, mm/yyyy, mm/yy, yyyy, yyyy/mm and yyyy/mm/dd.
 *
 * @param {Object} props
 * @param {string} [props.defaultValue=''] - Default date value (formatted string)
 * @param {string} [props.value] - Controlled date value (formatted string)
 * @param {Function} [props.onChange] - Change handler (receives formatted date string)
 * @param {Function} [props.onDate] - Date object change handler (receives Date object or null; called only when the parsed date actually changes)
 * @param {'dd/mm'|'dd/mm/yyyy'|'mm/dd'|'mm/dd/yyyy'|'mm/yy'|'mm/yyyy'|'yyyy'|'yyyy/mm'|'yyyy/mm/dd'} [props.mode='dd/mm/yyyy'] - Date format mode
 * @param {string} [props.separator='/'] - Separator character ('/', '.', '-')
 * @param {Date} [props.min] - Minimum allowed date
 * @param {Date} [props.max] - Maximum allowed date
 * @param {React.ReactNode} [props.icon] - Custom icon component (default: MdCalendarToday)
 * @param {string} [props.iconClassName] - Additional classes for the icon container
 * @param {boolean} [props.showIcon=true] - Show the calendar icon
 * @param {boolean} [props.disabled=false] - Disable input
 * @param {boolean} [props.readOnly=false] - Make input read-only
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text below input
 * @param {string} [props.validatorHint] - Validation hint text (only visible when validation fails)
 * @param {string} [props.label] - Label text above input
 * @param {string} [props.legend] - Legend text (if using fieldset)
 * @param {boolean} [props.useFieldset=false] - Use fieldset/legend instead of label
 * @param {boolean} [props.useValidator=false] - Enable DaisyUI validator styling
 * @param {React.RefObject} [props.ref] - Ref to access input element
 * @param {Object} props.rest - Other props passed to InputGroup
 *
 * @example
 * import { DD_MM_YYYY, MM_DD_YYYY, YYYY_MM_DD } from 'oihana-next-ui/components/inputs/InputDate';
 *
 * // French format (dd/mm/yyyy)
 * <InputDate mode={DD_MM_YYYY} separator="/" />
 *
 * @example
 * // US format (mm/dd/yyyy)
 * <InputDate mode={MM_DD_YYYY} separator="/" />
 *
 * @example
 * // ISO format (yyyy-mm-dd)
 * <InputDate mode={YYYY_MM_DD} separator="-" />
 *
 * @example
 * // With date range validation
 * <InputDate
 *     mode={DD_MM_YYYY}
 *     min={new Date('2020-01-01')}
 *     max={new Date('2030-12-31')}
 *     label="Birth Date"
 *     helper="Only dates between 2020 and 2030"
 * />
 *
 * @example
 * // Short format - Day/Month only
 * <InputDate mode={DD_MM} separator="/" label="Birthday" />
 *
 * @example
 * // Month/Year only
 * <InputDate mode={MM_YYYY} separator="/" label="Expiry Date" />
 *
 * @example
 * // Year alone — four digits, no separator
 * <InputDate mode={YYYY} label="Vintage" />
 *
 * @example
 * // ISO 8601 year-month — 2026-09, the order the back end speaks
 * <InputDate mode={YYYY_MM} separator="-" label="Period" />
 *
 * @example
 * // Controlled with Date object callback
 * const [date, setDate] = useState('');
 * const [dateObject, setDateObject] = useState(null);
 *
 * <InputDate
 *     value={date}
 *     onChange={setDate}
 *     onDate={setDateObject}
 *     mode={DD_MM_YYYY}
 *     label="Select Date"
 * />
 *
 * // dateObject will be a Date instance or null
 *
 * @example
 * // With fieldset and custom separator
 * <InputDate
 *     useFieldset
 *     legend="Date de rendez-vous"
 *     mode={DD_MM_YYYY}
 *     separator="."
 *     helper="Format: JJ.MM.AAAA"
 * />
 *
 * @example
 * // Auto-insertion - Type "25122024" → displays "25/12/2024"
 * <InputDate mode={DD_MM_YYYY} />
 */
const InputDate =
({
    defaultValue = '' ,
    onChange : onChangeFromProps ,
    value : valueFromProps,
    onDate ,

    mode = DD_MM_YYYY,
    separator = '/',
    min,
    max,

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

    ref,

    ...rest
}) =>
{
    // --------- Value management

    const [ value , setValue ] = useValue( defaultValue, valueFromProps, onChangeFromProps ) ;

    // --------- Maskito options

    // `yyyy/mm/dd` is a mode Maskito ships, and every other mode has always gone
    // through here. The hand-written mask it used to get instead constrained only
    // the first digit of each segment, so `2026/19/39` was typable ; and it carried
    // neither `min` nor `max`, which every other mode honours.
    const maskOptions = useMemo( () => maskitoDateOptionsGenerator({
        mode ,
        separator ,
        ...(min && { min }),
        ...(max && { max })
    }) , [ mode, separator, min, max ]) ;

    const maskedInputRef = useMaskito({ options: maskOptions }) ;
    const internalRef    = useRef( null ) ;
    const mergedRef      = useMergeRefs( maskedInputRef , internalRef , ref ) ;

    // --------- Date parsing

    // Parents may recreate `onDate` on every render (inline arrow), so this effect
    // re-runs freely : only a real change of the parsed date may reach the handler,
    // otherwise a non-idempotent setState upstream loops ("Maximum update depth").
    const lastEmittedRef = useRef( undefined ) ;

    useEffect( () =>
    {
        if ( !onDate )
        {
            return ;
        }

        let parsedDate = null ;

        if ( value )
        {
            try
            {
                const candidate = maskitoParseDate( value ,
                {
                    mode : /** @type {any} */ (mode),
                    min ,
                    max
                } ) ;

                parsedDate = candidate && !isNaN( candidate.getTime() ) ? candidate : null ;
            }
            catch ( error )
            {
                parsedDate = null ;
            }
        }

        const stamp = parsedDate ? parsedDate.getTime() : null ;

        if ( stamp === lastEmittedRef.current )
        {
            return ;
        }

        lastEmittedRef.current = stamp ;
        onDate( parsedDate ) ;
    }
    , [ value, mode, separator, min, max, onDate ]) ;

    // --------- Handlers

    const handleChange = event =>
    {
        const inputValue = readInputValue( event ) ;
        setValue( inputValue ) ;
    } ;

    // --------- Build placeholder (with the right separator)

    const placeholder = mode
        .toUpperCase()
        .replace( /[a-z]/gi, char =>
        {
            switch ( char.toLowerCase() )
            {
                case 'd': return 'D' ;
                case 'm': return 'M' ;
                case 'y': return 'Y' ;
                default: return char ;
            }
        })
        .replace( /[\/.\-]/g, separator ) ;

    // --------- Icon element

    const iconElement = showIcon && (
        <div className="flex items-center justify-center">
            { icon || <CalendarIcon /> }
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

InputDate.displayName = 'InputDate' ;

export default InputDate ;

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