'use client' ;

/**
 * AssignmentEditorModal — the dialog that changes what an entity is attached
 * to, and tells the server the DIFFERENCE rather than the result.
 *
 * It is a preset of {@link module:components/modals/FormModal} : the shell,
 * the selection state, the count of pending changes in the footer, the
 * confirmation before losing them, and the save that closes only when it
 * worked. What it does NOT own is **how one chooses** — a list of checkboxes,
 * a path tree, a two-column picker. That arrives as `children`.
 *
 * 🔑 **`children` is a function.** It receives everything the selector needs —
 * what is selected, what is locked, and the two ways of changing it — so a
 * host writes the rows and nothing else :
 *
 * ```jsx
 * <AssignmentEditorModal attached={ keys } locked={ locked } onSave={ save }>
 *     { ( { selected , toggle } ) => catalog.map( item => (
 *         <Checkbox
 *             checked  = { selected.has( item.key ) }
 *             key      = { item.key }
 *             onChange = { event => toggle( item.key , event.target.checked ) }
 *         />
 *     ) ) }
 * </AssignmentEditorModal>
 * ```
 *
 * 🚨 **`onSave` receives the difference and says whether to close**, by
 * returning. It is handed `( toAdd , toRemove )` — never the whole selection —
 * and a truthy answer closes the dialog, a falsy one keeps it open with its
 * changes, which is what a partial failure needs. The wording of what happened
 * is the HOST's : the shape of an attachment response is an API's own, and a
 * library that announced it would be guessing.
 *
 * ⚠️ **A locked key never reaches the difference** — see
 * {@link module:hooks/useSelectionDiff}, which is where that guard lives.
 *
 * @module components/assignments/AssignmentEditorModal
 *
 * @param {Object}           props
 * @param {Iterable<string>} [props.attached]    - The keys attached when the dialog opened. The baseline.
 * @param {Function}         props.children      - `( { dirty , locked , selected , toAdd , toRemove , toggle , toggleMany } ) => node`.
 * @param {React.ReactNode}  [props.icon]        - Icon of the header.
 * @param {Set<string>}      [props.locked]      - Keys this reader may not change.
 * @param {string}           [props.maxWidth='max-w-3xl']
 * @param {Function}         [props.onClose]     - Called when the dialog closes. Unmount from here.
 * @param {Function}         props.onSave        - Called with `( toAdd , toRemove )`. Return / resolve truthy to close.
 * @param {string}           [props.path='components.assignment'] - i18n path the labels are read from.
 * @param {React.ReactNode}  [props.title]       - Title of the dialog.
 *
 * @example
 * ```jsx
 * { editing && (
 *     <AssignmentEditorModal
 *         attached = { attachedKeys }
 *         title    = "Manage the attached items"
 *         onClose  = { () => setEditing( false ) }
 *         onSave   = { async ( toAdd , toRemove ) => ( await attach( toAdd , toRemove ) )?.ok }
 *     >
 *         { ( { selected , toggle } ) => … }
 *     </AssignmentEditorModal>
 * ) }
 * ```
 */

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import useSelectionDiff from '../../hooks/useSelectionDiff' ;

import FormModal from '../modals/FormModal' ;

const AssignmentEditorModal =
({
    attached ,
    children ,
    icon ,
    locked ,
    maxWidth = 'max-w-3xl' ,
    onClose ,
    onSave ,
    path     = 'components.assignment' ,
    title ,
    ...props
}) =>
{
    const t = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const editor = t.editor ?? {} ;

    const [ saving , setSaving ] = useState( false ) ;

    const { dirty , selected , toAdd , toRemove , toggle , toggleMany } = useSelectionDiff( attached , { locked } ) ;

    const pending = toAdd.length + toRemove.length ;

    // The same sentence twice : beside the title on a wide screen, and in the
    // footer where there is always room. A reader deciding whether to save
    // should not have to go looking for what they changed.
    const status = dirty
        ? format( editor.diff ?? '+{0} / −{1}' , toAdd.length , toRemove.length )
        : ( editor.none ?? '' ) ;

    const handleSave = async () =>
    {
        if ( !dirty || saving || typeof onSave !== 'function' ) { return false ; }

        setSaving( true ) ;

        try
        {
            return Boolean( await onSave( toAdd , toRemove ) ) ;
        }
        finally
        {
            setSaving( false ) ;
        }
    } ;

    return (
        <FormModal
            dirty         = { dirty }
            icon          = { icon }
            maxWidth      = { maxWidth }
            saveDisabled  = { !dirty }
            saving        = { saving }
            statusText    = { status }
            title         = { title }
            onClose       = { onClose }
            onSave        = { handleSave }
            headerOptions = {
                <div className="hidden md:block text-xs text-base-content/60 me-2 tabular-nums">
                    { status }
                </div>
            }
            exit          = {
                {
                    ...( editor.exit ?? {} ) ,
                    description : format
                    (
                        editor.exit?.description ?? 'You have {0} unsaved change(s).' ,
                        pending ,
                    ) ,
                }
            }
            { ...props }
        >
            { children?.( { dirty , locked , selected , toAdd , toRemove , toggle , toggleMany } ) }
        </FormModal>
    ) ;
} ;

AssignmentEditorModal.displayName = 'AssignmentEditorModal' ;

export default AssignmentEditorModal ;
