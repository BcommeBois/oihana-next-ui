'use client' ;

/**
 * InputTags — a list of short values a reader builds one at a time.
 *
 * A field with a « + » (or Enter) that commits what was typed, and a row of
 * chips under it, each with a way out. The value is the ARRAY : controlled,
 * `value` in, `onChange( next )` out, and nothing is ever stored half-typed —
 * the draft belongs to the field.
 *
 * ### 🔑 It validates a COMMIT, not a keystroke
 *
 * `Input` already has a `validate`, and it means something else : it gates the
 * draft character by character, next to `revertOnBlurIfInvalid`. A tag list
 * asks a different question — « may THIS become an entry ? » — and asks it once,
 * on the commit. Hence `validateTag`, which also leaves `validate` free for the
 * draft itself.
 *
 * `validateTag( tag , value )` answers `true` to accept, a **string** to refuse
 * with that sentence, or `false` to refuse with the bundle's generic one.
 *
 * ### 🔑 A refused entry stays in the field
 *
 * The draft is not cleared and the chip is not added : the reader corrects what
 * they typed instead of typing it again. The refusal shows where an error
 * shows, and `Input` draws an error INSTEAD of the helper, so the two never
 * crowd each other. Typing again clears it.
 *
 * ### What it leaves to its host
 *
 * The meaning of an entry. What counts as valid, what the chips look like
 * beyond a daisyUI `badge`, and whether two entries that differ only in case
 * are the same thing — `unique` compares exactly, which is what a pattern, a
 * code or an identifier wants.
 *
 * @module components/inputs/InputTags
 *
 * @param {Object}   props
 * @param {string}   [props.addLabel]         - Accessible name and tooltip of the « + ». Defaults to the bundle.
 * @param {string}   [props.chipClassName]    - Added to each chip — `font-mono` for codes, a size, a colour.
 * @param {boolean}  [props.disabled=false]   - Disables the field and takes the chips' « × » away.
 * @param {string}   [props.duplicateMessage] - Said when `unique` refuses. Defaults to the bundle.
 * @param {string}   [props.error]            - The host's own error, shown while nothing was just refused.
 * @param {string}   [props.invalidMessage]   - Said when `validateTag` answers `false`. Defaults to the bundle.
 * @param {Function} [props.onChange]         - Called with the WHOLE next array.
 * @param {string}   [props.path='components.input'] - i18n path the labels are read from, under `tags`.
 * @param {string}   [props.removeLabel]      - Accessible name of a chip's « × ». Defaults to the bundle.
 * @param {Function} [props.renderChip]       - `( { disabled , remove , value } ) => node`, to draw a chip yourself. Keyed for you.
 * @param {boolean}  [props.unique=true]      - Refuse an entry already in the list, compared exactly.
 * @param {Function} [props.validateTag]      - `( tag , value ) => true | false | string`, asked on the commit.
 * @param {string[]} [props.value=[]]         - The entries.
 *
 * Every other prop goes to {@link module:components/inputs/InputAction} and on
 * to `Input` : `label`, `helper`, `placeholder`, `size`, the masks.
 *
 * @example
 * ```jsx
 * const [ keywords , setKeywords ] = useState( [] ) ;
 *
 * <InputTags
 *     label       = "Keywords"
 *     placeholder = "Add a keyword…"
 *     value       = { keywords }
 *     onChange    = { setKeywords }
 * />
 * ```
 *
 * @example
 * ```jsx
 * <InputTags
 *     chipClassName = "font-mono"
 *     value         = { codes }
 *     validateTag   = { code => /^[A-Z]{3}$/.test( code ) || 'Three capital letters.' }
 *     onChange      = { setCodes }
 * />
 * ```
 */

import { Fragment , useState } from 'react' ;

import { MdAdd , MdClose } from 'react-icons/md' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import InputAction from './InputAction' ;

import cn from '../../themes/helpers/cn' ;

/**
 * The chip, when the host draws none of its own.
 * @type {string}
 */
export const INPUT_TAGS_CHIP = 'badge badge-soft gap-1' ;

const InputTags =
({
    addLabel ,
    chipClassName ,
    disabled = false ,
    duplicateMessage ,
    error ,
    invalidMessage ,
    onChange ,
    path     = 'components.input' ,
    removeLabel ,
    renderChip ,
    unique   = true ,
    validateTag ,
    value    = [] ,
    ...props
}) =>
{
    const t = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const labels = t.tags ?? {} ;

    const [ draft   , setDraft   ] = useState( '' ) ;
    const [ refusal , setRefusal ] = useState( null ) ;

    const addName    = addLabel    ?? labels.add    ?? 'Add' ;
    const removeName = removeLabel ?? labels.remove ?? 'Remove' ;

    const entries = value ?? [] ;

    const commit = () =>
    {
        const candidate = draft.trim() ;

        if ( candidate.length === 0 ) { return ; }

        const verdict = validateTag ? validateTag( candidate , entries ) : true ;

        if ( verdict !== true )
        {
            setRefusal( typeof verdict === 'string'
                ? verdict
                : ( invalidMessage ?? labels.invalid ?? 'This entry cannot be added.' ) ) ;
            return ;
        }

        if ( unique && entries.includes( candidate ) )
        {
            setRefusal( duplicateMessage ?? labels.duplicate ?? 'Already in the list.' ) ;
            return ;
        }

        onChange?.( [ ...entries , candidate ] ) ;
        setDraft( '' ) ;
        setRefusal( null ) ;
    } ;

    const remove = ( tag ) =>
    {
        if ( disabled ) { return ; }
        onChange?.( entries.filter( entry => entry !== tag ) ) ;
    } ;

    const handleDraft = ( next ) =>
    {
        setDraft( next ) ;
        if ( refusal ) { setRefusal( null ) ; }
    } ;

    // A 12-pixel cross inside a chip gets a name, not a tooltip : there is no
    // room for one, and a thumb would open it instead of removing the entry.
    const chipFor = ( tag ) => renderChip
        ? renderChip( { disabled , remove : () => remove( tag ) , value : tag } )
        : (
            <span className={ cn( INPUT_TAGS_CHIP , chipClassName ) }>
                { tag }
                { !disabled && (
                    <button
                        aria-label = { removeName }
                        className  = "ml-0.5 -mr-1 cursor-pointer hover:text-error"
                        type       = "button"
                        onClick    = { () => remove( tag ) }
                    >
                        <MdClose className="size-3" />
                    </button>
                ) }
            </span>
        ) ;

    return (
        <div className="form-control flex flex-col gap-2">

            <InputAction
                actionAriaLabel = { addName }
                actionDisabled  = { draft.trim().length === 0 }
                actionIcon      = { MdAdd }
                actionTooltip   = { addName }
                disabled        = { disabled }
                error           = { refusal ?? error }
                value           = { draft }
                onAction        = { commit }
                onChange        = { handleDraft }
                { ...props }
            />

            { entries.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    { entries.map( tag => (
                        <Fragment key={ tag }>
                            { chipFor( tag ) }
                        </Fragment>
                    ) ) }
                </div>
            ) }

        </div>
    ) ;
} ;

InputTags.displayName = 'InputTags' ;

export default InputTags ;
