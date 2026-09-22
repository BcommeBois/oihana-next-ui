'use client' ;

/**
 * PickerOption — one choosable row : a radio, and up to three lines with a set
 * of flag chips under them. The row of an `OptionPickerModal`.
 *
 * Also rendered on its own, outside any modal, where a card shows the row it
 * would have opened a picker for.
 *
 * A radio row rather than a `<select>` option, because a row of three lines
 * and a set of flags is not a string : squeezed into a native option it becomes
 * one truncated line.
 *
 * Its look is `themes/components/choiceCard` : the same rest, hover and chosen
 * states as every other choosable row, whatever it carries.
 *
 * @module components/pickers/PickerOption
 */

import getChoiceCardClasses from '../../themes/components/choiceCard' ;
import getRadioClasses      from '../../themes/components/radio' ;

/**
 * The layout of the row, under the choice card look.
 * @type {string}
 */
export const PICKER_OPTION_LAYOUT = 'flex items-start gap-3 p-2.5' ;

/**
 * @param {Object}          props
 * @param {React.ReactNode} [props.badges]    - Flag chips.
 * @param {boolean}         [props.checked]   - The row is the chosen one.
 * @param {string}          [props.className] - Additional class names for the row.
 * @param {React.ReactNode} [props.note]      - Third line, under the subtitle.
 * @param {string}          props.name        - Radio group name.
 * @param {Function}        props.onSelect    - Called when the row is chosen.
 * @param {React.ReactNode} [props.subtitle]  - Second line.
 * @param {React.ReactNode} props.title       - First line.
 *
 * @example
 * ```jsx
 * <PickerOption
 *     checked  = { value === city.id }
 *     name     = "city"
 *     subtitle = { city.country }
 *     title    = { city.name }
 *     onSelect = { () => setValue( city.id ) }
 * />
 * ```
 */
const PickerOption = ( { badges , checked = false , className , name , note , onSelect , subtitle , title } ) =>
(
    <label className={ getChoiceCardClasses( { checked , className : [ PICKER_OPTION_LAYOUT , className ] } ) }>

        <input
            type      = "radio"
            className = { getRadioClasses( { size : 'sm' , className : 'mt-0.5 shrink-0' } ) }
            checked   = { checked }
            name      = { name }
            onChange  = { onSelect }
        />

        <span className="flex min-w-0 flex-col gap-0.5">
            <span className="text-sm font-medium">{ title }</span>
            { subtitle && <span className="text-xs text-base-content/70">{ subtitle }</span> }
            { note     && <span className="text-xs text-base-content/50">{ note }</span> }
            { badges   && <span className="mt-1 flex flex-wrap items-center gap-1">{ badges }</span> }
        </span>

    </label>
) ;

PickerOption.displayName = 'PickerOption' ;

export default PickerOption ;
