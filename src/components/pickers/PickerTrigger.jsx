'use client' ;

/**
 * PickerTrigger — the FIELD half of a picker : what is currently selected, and
 * a button opening the modal that changes it.
 *
 * The other half is a modal, and which one depends on what is being chosen :
 * `OptionPickerModal` for a handful of options held in hand, `PagedPickerModal`
 * for a collection searched on the server. This field is the same either way,
 * which is why it knows about neither.
 *
 * It shows the SAME lines the picker rows show (title, subtitle, note, flag
 * chips), so choosing and reading are the same object at two moments — a field
 * that summarised differently from the list it opens is how a user ends up
 * unsure of what they picked.
 *
 * Why a field and a modal rather than a list inside the form : an inline list
 * makes the form scroll twice and grow as the results arrive.
 *
 * Two ways to open it :
 *
 *  - **the button only** (default) — the box is a reading surface, its text
 *    can be selected and copied ;
 *  - **the whole box** (`clickable`) — for a field that is nothing but a
 *    question (« Which customer? ») : a touch anywhere on it opens the picker,
 *    the box shows a pointer and a hover tint. The button stays, the path of
 *    the keyboard and of a screen reader ; a box without a focus of its own
 *    adds no second tab stop. Anything interactive put in `content` would open
 *    the picker too : keep `clickable` off for such a selection.
 *
 * The button's glyph is a pencil unless `icon` names another — a field whose
 * button LOOKS for something (a person, a place) reads better with that
 * glyph than with « edit ».
 *
 * Labels : `changeLabel` wins, then `trigger.change` in the i18n bundle at
 * `path`, then the English last resort.
 *
 * @module components/pickers/PickerTrigger
 */

import { MdEdit } from 'react-icons/md' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import cn from '../../themes/helpers/cn' ;

/**
 * @param {Object}          props
 * @param {React.ReactNode} [props.badges]                 - Flag chips of the selection.
 * @param {string}          [props.changeLabel]            - The button label ; hidden under `sm`, where the pencil alone stays (the button keeps it as its accessible name).
 * @param {React.ReactNode} [props.children]               - Extra content under the field (a hint, an error…).
 * @param {boolean}         [props.clickable=false]        - The whole box opens the picker, not only its button.
 * @param {string}          [props.className]              - Additional class names for the wrapper.
 * @param {React.ReactNode} [props.content]                - Renders the selection itself, replacing the title / subtitle / note stack — for a selection that has its own cell.
 * @param {boolean}         [props.disabled=false]         - Dims the field and blocks the button — for a question that has no meaning yet, rather than making the field appear and disappear.
 * @param {React.ElementType} [props.icon=MdEdit]         - The button's glyph.
 * @param {string}          [props.label]                  - Field label above the box.
 * @param {React.ReactNode} [props.note]                   - Third line.
 * @param {Function}        props.onOpen                   - Opens the picker.
 * @param {string}          [props.path='components.picker'] - i18n path of the labels.
 * @param {React.ReactNode} [props.placeholder]            - Shown when nothing is selected. Name the default rather than leaving it blank : « nothing chosen » is often the ordinary case.
 * @param {React.ReactNode} [props.subtitle]               - Second line.
 * @param {React.ReactNode} [props.title]                  - The selection ; falsy renders the placeholder.
 *
 * @example
 * ```jsx
 * <PickerTrigger
 *     label       = "City"
 *     placeholder = "None : the default time zone"
 *     subtitle    = { city?.country }
 *     title       = { city?.name }
 *     onOpen      = { () => setPicking( true ) }
 * />
 * ```
 *
 * @example
 * ```jsx
 * <PickerTrigger
 *     clickable
 *     changeLabel = "Select"
 *     icon        = { MdPersonSearch }
 *     placeholder = "Which member?"
 *     title       = { member?.name }
 *     onOpen      = { () => setPicking( true ) }
 * />
 * ```
 */
const PickerTrigger =
({
    badges ,
    changeLabel ,
    children ,
    className ,
    clickable = false ,
    content ,
    disabled = false ,
    icon : Icon = MdEdit ,
    label ,
    note ,
    onOpen ,
    path = 'components.picker' ,
    placeholder ,
    subtitle ,
    title ,
}) =>
{
    const { trigger : { change = 'Change' } = {} } = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const changeText = changeLabel ?? change ;

    const boxOpens = clickable && !disabled ;

    const onButtonClick = event =>
    {
        if ( boxOpens )
        {
            event.stopPropagation() ;
        }

        onOpen?.( event ) ;
    } ;

    return (
        <div className={ cn( 'flex flex-col gap-1' , disabled && 'opacity-60' , className ) }>

            { label &&
                <span className="text-xs font-semibold uppercase tracking-wide text-base-content/60">{ label }</span>
            }

            {/* biome-ignore lint/a11y/noStaticElementInteractions: with `clickable` the box is a larger touch target for the button inside it — the button stays the one focusable control */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: same — the keyboard reaches the button, a second tab stop on the box would repeat it */}
            <div
                className = { cn(
                    'flex items-center gap-3 rounded-box border border-base-300/60 px-3 py-2' ,
                    boxOpens && 'cursor-pointer transition-colors hover:bg-base-content/5' ,
                ) }
                onClick = { boxOpens ? onOpen : undefined }
            >

                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    { content ?? ( title
                        ? (
                            <>
                                <span className="truncate text-sm font-medium">{ title }</span>
                                { subtitle && <span className="truncate text-xs text-base-content/70">{ subtitle }</span> }
                                { note     && <span className="truncate text-xs text-base-content/50">{ note }</span> }
                                { badges   && <span className="mt-1 flex flex-wrap items-center gap-1">{ badges }</span> }
                            </>
                          )
                        : <span className="text-sm text-base-content/60">{ placeholder }</span>
                    ) }
                </span>

                <button
                    type       = "button"
                    aria-label = { changeText }
                    className  = "btn btn-ghost btn-sm shrink-0"
                    disabled   = { disabled }
                    onClick    = { onButtonClick }
                >
                    <Icon className="size-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{ changeText }</span>
                </button>

            </div>

            { children }

        </div>
    ) ;
} ;

PickerTrigger.displayName = 'PickerTrigger' ;

export default PickerTrigger ;
