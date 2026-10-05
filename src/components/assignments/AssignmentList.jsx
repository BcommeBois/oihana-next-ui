'use client' ;

/**
 * AssignmentList — what an entity is currently attached to, searchable, with
 * one button that opens the editor.
 *
 * The read side of an attachment screen : a title saying how many, a filter, a
 * row per attachment, and « Manage ». It knows nothing about WHAT is attached
 * — tags, modules, anything carrying a key — because `renderRow` draws the row
 * and `match` decides what a search looks at.
 *
 * 🔑 **It owns whether the editor is open, and the host owns the editor.**
 * `renderEditor` is called with a `close` function when the button is pressed,
 * and not at all before : the editor is mounted on demand, which is what keeps
 * a catalog of hundreds from being built behind a dialog nobody opened.
 *
 * ⚠️ **Three empty states, not one.** Nothing attached is not the same as
 * nothing matching a search, and the second must say what was searched or the
 * reader clears a filter they cannot see. A list with no items hides its own
 * search field, because filtering nothing is a dead control.
 *
 * @module components/assignments/AssignmentList
 *
 * @param {Object}          props
 * @param {boolean}         [props.canEdit=false]   - Draw the « Manage » button. A capability check belongs to the host.
 * @param {React.ReactNode} [props.empty]           - What is said when nothing is attached. Defaults to the bundle.
 * @param {React.ReactNode} [props.emptyIcon]       - Icon of that empty state.
 * @param {Function}        [props.getKey]          - Reads the key of an item. Defaults to its `_key`, then its `id`, then its `key`.
 * @param {Array}           [props.items=[]]        - What is attached.
 * @param {Function}        [props.manageLabel]     - Label of the button. Defaults to the bundle.
 * @param {Function}        [props.match]           - `( item , needle ) => boolean`. Without it the search reads `name` then `label`.
 * @param {Function}        [props.renderEditor]    - `( { close } ) => node`, called only while the editor is open.
 * @param {Function}        props.renderRow         - `( item ) => node`. The contents of one row.
 * @param {string}          [props.path='components.assignment'] - i18n path the labels are read from.
 * @param {boolean}         [props.showHeader=true] - Draw the title, the count and the button.
 * @param {Function}        [props.sort]            - Comparator applied to the filtered items.
 * @param {React.ReactNode} [props.title]           - Title of the section. Entity-specific, so the host gives it.
 *
 * @example
 * ```jsx
 * <AssignmentList
 *     canEdit      = { canManage }
 *     items        = { attached }
 *     renderRow    = { item => <ItemCell item={ item } mode="compact" /> }
 *     title        = "Attached items"
 *     renderEditor = { ( { close } ) => <Editor onClose={ close } /> }
 * />
 * ```
 */

import { useMemo , useState } from 'react' ;

import { MdSearchOff , MdTune } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import EmptyState  from '../EmptyState' ;
import InputSearch from '../inputs/InputSearch' ;

/**
 * Reads the key of an item when the caller names none.
 *
 * The three spellings an attachable thing carries in practice. ⚠️ It is a
 * convenience, not a contract : a payload naming its identity anything else
 * must say so with `getKey`, and React's « unique key » warning is what says
 * it was not — which is exactly how this list's own demo was caught.
 *
 * @param {Object} item
 * @returns {*}
 */
const defaultGetKey = ( item ) => item?._key ?? item?.id ?? item?.key ;

/**
 * What a search reads when the caller says nothing : the two field names an
 * attachable thing almost always carries.
 *
 * @param {Object} item
 * @param {string} needle - Already lowercased and trimmed.
 * @returns {boolean}
 */
const defaultMatch = ( item , needle ) =>
    `${ item?.name ?? '' } ${ item?.label ?? '' }`.toLowerCase().includes( needle ) ;

const AssignmentList =
({
    canEdit     = false ,
    empty ,
    emptyIcon ,
    getKey      = defaultGetKey ,
    items       = [] ,
    manageLabel ,
    match       = defaultMatch ,
    path        = 'components.assignment' ,
    renderEditor ,
    renderRow ,
    showHeader  = true ,
    sort ,
    title ,
}) =>
{
    const t = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const list = t.list ?? {} ;

    const [ query   , setQuery   ] = useState( '' ) ;
    const [ editing , setEditing ] = useState( false ) ;

    const needle = query.trim().toLowerCase() ;

    const shown = useMemo( () =>
    {
        const kept = ( items ?? [] ).filter( ( item ) => !needle || match( item , needle ) ) ;

        return sort ? kept.slice().sort( sort ) : kept ;
    }
    , [ items , match , needle , sort ] ) ;

    const total = items?.length ?? 0 ;

    return (
        <section className="flex flex-col gap-3">

            { showHeader && (
                <header className="flex items-center justify-between gap-2 flex-wrap">

                    <div className="flex items-baseline gap-2">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                            { title }
                        </h2>
                        <p className="text-xs text-base-content/50">
                            { format( list.count ?? '{0} assigned' , total ) }
                        </p>
                    </div>

                    { canEdit && (
                        <button
                            className = "btn btn-primary btn-sm"
                            type      = "button"
                            onClick   = { () => setEditing( true ) }
                        >
                            <MdTune className="size-4" />
                            { manageLabel ?? list.manage ?? 'Manage' }
                        </button>
                    ) }

                </header>
            ) }

            { total > 0 && (
                <InputSearch
                    className        = "w-full max-w-md"
                    placeholder      = { list.search ?? 'Filter…' }
                    showClearButton
                    showSearchButton = { false }
                    value            = { query }
                    onChange         = { setQuery }
                />
            ) }

            { total === 0 ? (
                <EmptyState
                    className = "py-16"
                    icon      = { emptyIcon }
                    title     = { empty ?? list.empty ?? 'Nothing attached.' }
                />
            ) : shown.length === 0 ? (
                <EmptyState
                    announce
                    className = "py-16"
                    icon      = { <MdSearchOff /> }
                    title     = { format( list.searchEmpty ?? 'Nothing matches « {0} »' , query ) }
                />
            ) : (
                <ul className="menu menu-sm menu-vertical bg-base-200 rounded-box w-full">
                    { shown.map( ( item ) => (
                        <li key={ getKey( item ) }>
                            { renderRow?.( item ) }
                        </li>
                    ) ) }
                </ul>
            ) }

            { canEdit && editing && renderEditor?.( { close : () => setEditing( false ) } ) }

        </section>
    ) ;
} ;

AssignmentList.displayName = 'AssignmentList' ;

export default AssignmentList ;
