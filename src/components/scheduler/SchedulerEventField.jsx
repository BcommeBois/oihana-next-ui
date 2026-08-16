'use client' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import { formatValue } from '../../helpers/schedule/eventFields' ;

import
{
    SCHEDULER_PANEL_LABEL ,
    SCHEDULER_PANEL_ROW ,
    SCHEDULER_PANEL_SWATCH ,
    SCHEDULER_PANEL_SWATCHES ,
    SCHEDULER_PANEL_SWATCH_ON ,
    SCHEDULER_PANEL_VALUE ,
    colorMap ,
    colors ,
} from '../../themes/components/scheduler' ;

import Checkbox   from '../checkboxes/Checkbox' ;
import Input      from '../inputs/Input' ;
import InputColor from '../inputs/InputColor' ;
import InputDatePicker from '../inputs/InputDatePicker' ;
import InputDateTimePicker from '../inputs/InputDateTimePicker' ;
import InputEmail from '../inputs/InputEmail' ;
import InputTimePicker from '../inputs/InputTimePicker' ;
import InputUrl   from '../inputs/InputUrl' ;
import Select     from '../selects/Select' ;
import TextArea   from '../inputs/TextArea' ;

/** The mask the date controls read and write. */
const DATE_MASK = 'DD/MM/YYYY' ;
const DATE_TIME_MASK = 'DD/MM/YYYY HH:mm' ;

/**
 * Two contracts live side by side in the library, and a router has to know both.
 *
 * The house controls (`Input`, `TextArea`, `InputUrl`, `InputEmail`,
 * `InputColor`) hand back **the value** ; the ones wrapping a native element
 * (`Select`, `Checkbox`) hand back **the event**. Reading `target.value` off a
 * string does not throw, it yields `undefined` — which would quietly erase what
 * was typed rather than fail, so the distinction is made here once.
 *
 * @param {*} input - A value, or a change event.
 * @returns {*}
 */
const readValue = ( input ) => ( input !== null && typeof input === 'object' && 'target' in input ? input.target.value : input ) ;

/**
 * The colour of an event : one of the theme's, or any other.
 *
 * The tokens come first because that is what a theme actually guarantees — they
 * follow it into dark, where a hex value written in daylight does not. The free
 * colour stays underneath for the ones a business already owns.
 */
const ColorField = ( { onChange , value } ) => (
    <div className="flex flex-col gap-2">
        <div className={ SCHEDULER_PANEL_SWATCHES }>
            { colors.map( token => (
                <button
                    key       = { token }
                    type      = "button"
                    aria-label = { token }
                    aria-pressed = { value === token }
                    className = { `${ SCHEDULER_PANEL_SWATCH } ${ colorMap[ token ].split( ' ' )[ 0 ] } ${ value === token ? SCHEDULER_PANEL_SWATCH_ON : '' }` }
                    onClick   = { () => onChange( value === token ? '' : token ) }
                />
            ) ) }
        </div>

        {/* `InputColor` hands back the value itself, not an event. */}
        <InputColor
            size     = "sm"
            value    = { colors.includes( value ) ? '' : ( value ?? '' ) }
            onChange = { onChange }
        />
    </div>
) ;

/**
 * One row of the panel : a value read, or a control to change it.
 *
 * Every type routes to a control the library already ships — the editor writes
 * none of its own. What it adds is the routing, and the honesty about what it
 * cannot route : an object value and a linked date are shown, never offered.
 *
 * @module components/scheduler/SchedulerEventField
 *
 * @param {Object} props
 * @param {Object} props.field - The descriptor, plus its resolved `value` and `readOnly`. `editOnly` keeps a row out of the reading view — the default for a colour, which the dot beside the title already says.
 * @param {string} [props.error] - Error key for this row.
 * @param {Object} [props.labels] - The scheduler locale block.
 * @param {string} [props.lang='en'] - Active locale.
 * @param {boolean} [props.editing=false] - The panel is in edit mode.
 * @param {'responsive'|'dropdown'|'modal'} [props.display='modal'] - How the date and time pickers open. **A modal by default here** : the form it sits in is already a panel that scrolls, and an anchored dropdown inside a scrolling panel is the one arrangement that goes wrong. A descriptor may say otherwise with `display`.
 * @param {(value: *) => void} props.onChange - Called with the new value.
 * @param {*} props.value - The draft value.
 */
const SchedulerEventField =
({
    display = 'modal' ,
    editing = false ,
    error ,
    field ,
    labels ,
    lang = 'en' ,
    onChange ,
    value ,
}) =>
{
    const label = field.label ?? labels?.fields?.[ field.property ] ?? field.property ;

    // Some properties are worth changing and not worth printing. A colour is the
    // plain case : `#EF4444` tells a reader nothing the dot beside the title has
    // not already said, so it is edit-only unless a descriptor insists otherwise.
    if ( !editing && ( field.editOnly ?? field.type === 'color' ) )
    {
        return null ;
    }

    // Reading, or a value no plain control can carry back intact.
    if ( !editing || field.readOnly )
    {
        const text = formatValue( value , field.type , { lang }) ;

        if ( text === null )
        {
            return null ;
        }

        return (
            <div className={ SCHEDULER_PANEL_ROW }>
                <span className={ SCHEDULER_PANEL_LABEL }>{ label }</span>
                <span className={ SCHEDULER_PANEL_VALUE }>
                    { field.type === 'url'
                        ? <a className="link" href={ text } rel="noreferrer" target="_blank">{ text }</a>
                        : text }
                </span>
            </div>
        ) ;
    }

    const common =
    {
        error : error ? ( labels?.errors?.[ error ] ?? error ) : undefined ,
        label ,
        size  : 'sm' ,
    } ;

    // The pickers open as a modal unless the descriptor says otherwise. `Popover`
    // finds the open `<dialog>` this form lives in and portals into it, which is
    // what keeps the panel above the top layer rather than under it.
    const picker = { ...common , display : field.display ?? display } ;

    const text = ( input ) => onChange( readValue( input ) ?? '' ) ;

    switch ( field.type )
    {
        case 'boolean' :
            return (
                <div className={ SCHEDULER_PANEL_ROW }>
                    <span className={ SCHEDULER_PANEL_LABEL }>{ label }</span>
                    <Checkbox checked={ !!value } onChange={ look => onChange( look.target.checked ) } size="sm" />
                </div>
            ) ;

        case 'color' :
            return (
                <div className={ SCHEDULER_PANEL_ROW }>
                    <span className={ SCHEDULER_PANEL_LABEL }>{ label }</span>
                    <ColorField onChange={ onChange } value={ value } />
                </div>
            ) ;

        case 'date' :
            return (
                <InputDatePicker
                    { ...picker }
                    defaultValue = { Number.isFinite( value ) ? dayjs( value ).format( DATE_MASK ) : '' }
                    onDate       = { date => onChange( date ? date.getTime() : null ) }
                />
            ) ;

        case 'datetime' :
            return (
                <InputDateTimePicker
                    { ...picker }
                    defaultValue = { Number.isFinite( value ) ? dayjs( value ).format( DATE_TIME_MASK ) : '' }
                    onDateTime   = { date => onChange( date ? date.getTime() : null ) }
                />
            ) ;

        // A time of day on its own — a property that says an hour and not an
        // instant, which is what `Schedule.startTime` and its like carry.
        case 'time' :
            return <InputTimePicker { ...picker } value={ value ?? '' } onChange={ text } /> ;

        case 'email' :
            return <InputEmail { ...common } value={ value ?? '' } onChange={ text } /> ;

        case 'markdown' :
        case 'textarea' :
            return <TextArea { ...common } rows={ 3 } value={ value ?? '' } onChange={ text } /> ;

        case 'number' :
            return (
                <Input
                    { ...common }
                    type     = "number"
                    value    = { value ?? '' }
                    onChange = { input =>
                    {
                        const next = readValue( input ) ;
                        onChange( next === '' || next === null || next === undefined ? '' : Number( next ) ) ;
                    } }
                />
            ) ;

        case 'select' :
            return (
                <Select { ...common } value={ value ?? '' } onChange={ text }>
                    <option value="">—</option>
                    { ( field.options ?? [] ).map( option => (
                        <option key={ option.value ?? option } value={ option.value ?? option }>
                            { option.label ?? option.value ?? option }
                        </option>
                    ) ) }
                </Select>
            ) ;

        case 'url' :
            return <InputUrl { ...common } value={ value ?? '' } onChange={ text } /> ;

        default :
            return <Input { ...common } value={ value ?? '' } onChange={ text } /> ;
    }
} ;

SchedulerEventField.displayName = 'SchedulerEventField' ;

export default SchedulerEventField ;
