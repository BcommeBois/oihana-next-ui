'use client' ;

/**
 * OptionPickerModal — the picker for a handful of options **held in hand** :
 * the countries of a form, the plans of a subscription, the members of a
 * small team.
 *
 * 🔑 **Its twin is `PagedPickerModal`**, and the difference is where the
 * options come from, not how they look. Here the caller already holds them all
 * and the search runs IN MEMORY ; there they are a collection nobody holds, so
 * the search runs on the server and the list grows as it is scrolled. Pick this
 * one whenever the list is already loaded — a round trip to filter four
 * options would be absurd.
 *
 * **The search appears only past `searchThreshold` options** : a search field
 * over four options is furniture, not a tool. Matching is accent-folded
 * (`helpers/strings/foldText`) : someone looking for « Zürich » types
 * `zurich`. An option is matched on its own `search` when it has one (a code
 * that is not displayed), else on its title, subtitle and note.
 *
 * **`fold` replaces the folding** — for data with rules of its own (a
 * transliteration, a code where case matters). It is applied to the query and
 * to every option's text alike, and the option matches when its folded text
 * contains the folded query.
 *
 * `pinned` options — « None », « Other » — are not part of the list :
 * they sit above the search and are never filtered out.
 *
 * A click selects AND closes : only the host form's own footer writes.
 *
 * 🚨 **Two mechanics are load-bearing when a modal opens over a modal** :
 *
 *  - `portal` — without it the nested `<dialog>` closes its host (the browser's
 *    own handling of nested modal dialogs, not interceptable) ;
 *  - the dialog is opened by `useModal( { openOnMount : true } )`, never from a
 *    mount effect : a portalled modal reaches its target after the effect has
 *    run. Mount it conditionally, and let `onClose` unmount it.
 *
 * Labels : each `…Label` prop wins, then the `option` block (and `close`) of
 * the i18n bundle at `path`, then the English last resort.
 *
 * @module components/pickers/OptionPickerModal
 */

import { useState } from 'react' ;

import format   from 'vegas-js-core/src/strings/fastformat' ;
import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

import InputSearch  from '../inputs/InputSearch' ;
import Modal        from '../modals/Modal' ;
import ModalFooter  from '../modals/ModalFooter' ;
import PickerOption from './PickerOption' ;
import useModal     from '../modals/hooks/useModal' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import foldText from '../../helpers/strings/foldText' ;

/**
 * Below this many options, no search field is shown.
 * @type {number}
 */
export const SEARCH_THRESHOLD = 8 ;

/**
 * The text an option is matched on, before folding : its own `search` when the
 * caller supplies one, else what is written on the row.
 *
 * @param {Object} option
 * @returns {string}
 */
const haystackOf = ( option ) => option?.search ?? [ option?.title , option?.subtitle , option?.note ].filter( notEmpty ).join( ' ' ) ;

/**
 * @typedef {Object} PickerOptionEntry
 * @property {React.ReactNode} [badges]   - Flag chips.
 * @property {React.ReactNode} [note]     - Third line.
 * @property {string}          [search]   - Explicit haystack, overriding the displayed text.
 * @property {React.ReactNode} [subtitle] - Second line.
 * @property {React.ReactNode} title      - First line.
 * @property {string}          value      - What `onSelect` returns ; also the row key.
 */

/**
 * @param {Object}              props
 * @param {string}              [props.closeLabel]               - The footer button, and the close button's title.
 * @param {string}              [props.emptyLabel]               - No-result message, `{0}` = the query.
 * @param {Function}            [props.fold]                     - `( text ) => string`, applied to the query and to each option's text before matching. Defaults to `helpers/strings/foldText`.
 * @param {string}              props.name                       - Radio group name.
 * @param {Function}            props.onClose                    - Called once the modal is closed : unmount it here.
 * @param {Function}            props.onSelect                   - Called with the picked `value`.
 * @param {PickerOptionEntry[]} [props.options=[]]               - The searchable entries.
 * @param {string}              [props.path='components.picker'] - i18n path of the labels.
 * @param {PickerOptionEntry[]} [props.pinned=[]]                - Entries shown above the search, never filtered.
 * @param {string}              [props.searchClearLabel]         - The search's clear button.
 * @param {string}              [props.searchPlaceholder]
 * @param {number}              [props.searchThreshold=8]        - The search appears from this many options on.
 * @param {boolean}             [props.showSearch=true]          - `false` never shows the search.
 * @param {React.ReactNode}     [props.title]                    - Modal title.
 * @param {string}              [props.value]                    - The currently picked value.
 *
 * @example
 * ```jsx
 * { picking && (
 *     <OptionPickerModal
 *         name     = "city"
 *         options  = { cities.map( city => ( { value : city.id , title : city.name , subtitle : city.country } ) ) }
 *         pinned   = { [ { value : NONE , title : 'None' } ] }
 *         title    = "City"
 *         value    = { cityId }
 *         onClose  = { () => setPicking( false ) }
 *         onSelect = { setCityId }
 *     />
 * ) }
 * ```
 */
const OptionPickerModal =
({
    closeLabel ,
    emptyLabel ,
    fold    = foldText ,
    name ,
    onClose ,
    onSelect ,
    options = [] ,
    path    = 'components.picker' ,
    pinned  = [] ,
    searchClearLabel ,
    searchPlaceholder ,
    searchThreshold = SEARCH_THRESHOLD ,
    showSearch      = true ,
    title ,
    value ,
}) =>
{
    const { modalRef , close : closeModal } = useModal( { openOnMount : true } ) ;

    const [ query , setQuery ] = useState( '' ) ;

    const {
        close  : closeFromI18n = 'Close' ,
        option : labels        = {} ,
    }
    = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const closeText = closeLabel ?? closeFromI18n ;

    const closeNow = () =>
    {
        closeModal() ;
        onClose?.() ;
    } ;

    const pick = ( picked ) =>
    {
        onSelect?.( picked ) ;
        closeNow() ;
    } ;

    const searchable = showSearch && options.length >= searchThreshold ;

    const folded  = searchable ? String( fold( query ) ?? '' ).trim() : '' ;
    const visible = folded.length === 0
        ? options
        : options.filter( option => String( fold( haystackOf( option ) ) ?? '' ).includes( folded ) ) ;

    /**
     * @param {PickerOptionEntry} option
     * @returns {React.ReactNode}
     */
    const renderOption = ( option ) =>
    (
        <PickerOption
            key      = { option.value }
            badges   = { option.badges }
            checked  = { value === option.value }
            name     = { name }
            note     = { option.note }
            subtitle = { option.subtitle }
            title    = { option.title }
            onSelect = { () => pick( option.value ) }
        />
    ) ;

    return (
        <Modal
            ref                  = { modalRef }
            closeTitle           = { closeText }
            contentClassName     = "flex flex-col overflow-y-hidden"
            fullScreenBreakpoint = "md"
            maxWidth             = "max-w-lg"
            modalBoxClassName    = "px-2 sm:px-4"
            portal               = { true }
            title                = { title }
            onClose              = { () => onClose?.() }
            footerNode           = {
                <ModalFooter
                    agree      = { closeText }
                    agreeColor = "neutral"
                    size       = "md"
                    onAgree    = { closeNow }
                />
            }
        >
            <div className="flex min-h-0 flex-1 flex-col gap-2 px-0 sm:px-2">

                { searchable &&
                    <InputSearch
                        clearLabel       = { searchClearLabel ?? labels.searchClear ?? 'Clear search' }
                        placeholder      = { searchPlaceholder ?? labels.search ?? 'Search…' }
                        showClearButton  = { true }
                        showSearchButton = { false }
                        value            = { query }
                        onChange         = { setQuery }
                        onClear          = { () => setQuery( '' ) }
                    />
                }

                { pinned.map( renderOption ) }

                <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-0.5">
                    { visible.length === 0
                        ? (
                            <p className="py-8 text-center text-sm text-base-content/60">
                                { format( emptyLabel ?? labels.empty ?? 'No result for « {0} »' , query.trim() ) }
                            </p>
                          )
                        : visible.map( renderOption )
                    }
                </div>

            </div>
        </Modal>
    ) ;
} ;

OptionPickerModal.displayName = 'OptionPickerModal' ;

export default OptionPickerModal ;
