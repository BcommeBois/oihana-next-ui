'use client' ;

/**
 * OptionFilterPicker — a filter criterion over a **closed set held in hand** :
 * a few dozen options loaded once, searched in the browser.
 *
 * 🔑 **Its sibling is `RemoteFilterPicker`**, for a collection too large to
 * hold, searched on the server.
 *
 * **Two modes, one control.** Single-select by default — a click applies and
 * closes, there being nothing to batch. `multiple` hands over to
 * `ChecklistPanel` with its « All » row : boxes over a LOCAL draft, committed by
 * an « Apply » footer — « these three options » is one question, and applying on
 * each click would spend three navigations to ask it.
 *
 * Both surfaces come from `AnchoredPanel` : an anchored dropdown on `md`+, a
 * full-screen sheet below.
 *
 * Contents :
 *   - a search field, accent-folded (`helpers/strings/foldText`, or `fold`),
 *     matching an option's name or id ;
 *   - an optional `countCaption` naming what the numbers count — a bare number
 *     is read as whatever the screen around it counts ;
 *   - an « All » row that clears the filter (or empties the draft), hidden while
 *     searching, then one `FilterOption` per option.
 *
 * ⚠️ **A multi-select emits in the OPTIONS' order, never the click order**, and
 * **a search narrows what is SHOWN, never what is selected** — both held by
 * `ChecklistPanel`.
 *
 * The search rewinds at each opening : a stale query never leaks in.
 *
 * Labels : the criterion's bundle at `path`, over `components.filter` — see
 * `useFilterLabels`.
 *
 * @module components/filters/OptionFilterPicker
 */

import { useEffect , useMemo , useState } from 'react' ;

import { MdSearch } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import AnchoredPanel   from '../panels/AnchoredPanel' ;
import ChecklistPanel  from './ChecklistPanel' ;
import FilterOption    from './FilterOption' ;
import ModalFooter     from '../modals/ModalFooter' ;
import useFilterLabels from './useFilterLabels' ;

import foldText from '../../helpers/strings/foldText' ;

/**
 * @typedef {Object} FilterOptionEntry
 * @property {string}  id      - What is selected.
 * @property {?string} [name]  - What is shown ; missing, the `unknown` label with the id.
 * @property {number}  [count] - The number on the right.
 */

/**
 * The single-select body : a click applies and closes.
 *
 * @param {Object} props - See `OptionFilterPicker`.
 * @returns {React.ReactElement}
 */
const SingleOptionFilter =
({
    anchorRef ,
    countCaption ,
    error    = false ,
    fold     = foldText ,
    isOpen ,
    loading  = false ,
    onClose ,
    onReload ,
    onSelect ,
    options  = [] ,
    panelHeight ,
    path ,
    selectedId  = '' ,
}) =>
{
    const labels = useFilterLabels( path ) ;

    const [ query , setQuery ] = useState( '' ) ;

    useEffect( () =>
    {
        if ( isOpen ) { setQuery( '' ) ; }
    } , [ isOpen ] ) ;

    const searching = query.trim().length > 0 ;

    const visible = useMemo( () =>
    {
        const folded = String( fold( query ) ?? '' ).trim() ;

        if ( folded.length === 0 )
        {
            return options ;
        }

        return options.filter( option =>
            String( fold( option.name ?? '' ) ?? '' ).includes( folded ) ||
            String( fold( String( option.id ) ) ?? '' ).includes( folded ) ) ;
    } , [ options , query , fold ] ) ;

    const select = ( id ) =>
    {
        onSelect?.( id ) ;
        onClose?.() ;
    } ;

    const searchBox = (
        <div className="border-b border-base-300/60 p-2">
            <label className="input input-sm flex w-full items-center gap-2">
                <MdSearch size={ 16 } className="shrink-0 text-base-content/50" aria-hidden="true" />
                <input
                    type        = "text"
                    className   = "grow"
                    value       = { query }
                    onChange    = { event => setQuery( event.target.value ) }
                    placeholder = { labels.search }
                />
            </label>
        </div>
    ) ;

    // Between the search and the list, over the column it explains — never in
    // the trigger, where it would name a unit for numbers not yet seen.
    const caption = countCaption
        ? (
            <p className="border-b border-base-300/60 px-3 py-1.5 text-right text-[0.6875rem] uppercase tracking-wide text-base-content/45">
                { countCaption }
            </p>
          )
        : null ;

    const listArea = (
        <>
            { loading && (
                <div className="flex justify-center py-6">
                    <span className="loading loading-spinner loading-sm" />
                </div>
            ) }

            { !loading && error && (
                <div className="flex flex-col items-center gap-2 py-6 text-sm">
                    <span className="text-error">{ labels.loadError }</span>
                    { onReload && (
                        <button type="button" className="btn btn-sm btn-ghost" onClick={ onReload }>
                            { labels.retry }
                        </button>
                    ) }
                </div>
            ) }

            { !loading && !error && (
                // Scrolls within the room left between the search and the
                // footer, only when it overflows ; capped on the dropdown.
                <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-2 md:max-h-72">

                    { !searching && (
                        <FilterOption
                            muted
                            checked = { !selectedId }
                            label   = { labels.all }
                            onClick = { () => select( null ) }
                        />
                    ) }

                    { visible.length === 0
                        ? <p className="py-6 text-center text-sm text-base-content/60">{ labels.empty }</p>
                        : visible.map( option => (
                            <FilterOption
                                key     = { option.id }
                                checked = { option.id === selectedId }
                                color   = { option.color }
                                count   = { option.count }
                                label   = { option.name ?? format( labels.unknown , option.id ) }
                                onClick = { () => select( option.id ) }
                            />
                        ) )
                    }
                </div>
            ) }
        </>
    ) ;

    return (
        <AnchoredPanel
            anchorRef   = { anchorRef }
            closeLabel  = { labels.close }
            isOpen      = { isOpen }
            onClose     = { onClose }
            panelHeight = { panelHeight ?? 420 }
            panelWidth  = { 288 }
            title       = { labels.title }
            sheetFooter = { <ModalFooter agree={ labels.close } agreeColor="neutral" size="md" onAgree={ () => onClose?.() } /> }
        >
            { searchBox }
            { caption }
            { listArea }
        </AnchoredPanel>
    ) ;
} ;

SingleOptionFilter.displayName = 'SingleOptionFilter' ;

/**
 * @param {Object}              props
 * @param {React.RefObject}     props.anchorRef          - The trigger : the dropdown's anchor.
 * @param {string}              [props.countCaption]     - What the numbers count ; omitted, no caption.
 * @param {boolean}             [props.error=false]      - The options failed to load.
 * @param {Function}            [props.fold]             - `( text ) => string`, applied to the query and to each option's name and id. Defaults to `helpers/strings/foldText`.
 * @param {boolean}             props.isOpen             - Whether the panel is open ; owned by the caller.
 * @param {boolean}             [props.loading=false]    - The options are loading.
 * @param {boolean}             [props.multiple=false]   - Draft several options and commit them through the footer (`ChecklistPanel`).
 * @param {Function}            [props.onApply]          - `multiple` : called with the ids, in the options' order.
 * @param {Function}            props.onClose            - Dismiss the panel.
 * @param {Function}            [props.onReload]         - Retry the options load ; without it, the error has no button.
 * @param {Function}            [props.onSelect]         - `single` : called with the id, or `null` to clear.
 * @param {FilterOptionEntry[]} [props.options=[]]       - The options, in the order to show and to emit.
 * @param {number}              [props.panelHeight]      - Estimated full dropdown height ; defaults to 420, 470 in `multiple` mode (the footer).
 * @param {string}              [props.path]             - The criterion's own i18n bundle.
 * @param {?string}             [props.selectedId='']    - `single` : the applied id.
 * @param {string[]}            [props.selectedIds=[]]   - `multiple` : the applied ids.
 *
 * @example
 * ```jsx
 * <OptionFilterPicker
 *     multiple
 *     anchorRef   = { anchorRef }
 *     isOpen      = { isOpen }
 *     options     = { [ { id : 'red' , name : 'Red' , count : 42 } , … ] }
 *     path        = "app.filters.colour"
 *     selectedIds = { colours }
 *     onApply     = { setColours }
 *     onClose     = { () => setOpen( false ) }
 * />
 * ```
 */
const OptionFilterPicker = ( { multiple = false , onApply , panelHeight , selectedIds = [] , ...rest } ) =>
    multiple
        ? (
            <ChecklistPanel
                { ...rest }
                showAll
                panelHeight = { panelHeight ?? 470 }
                selectedIds = { selectedIds }
                onApply     = { onApply }
            />
          )
        : <SingleOptionFilter { ...rest } panelHeight={ panelHeight } /> ;

OptionFilterPicker.displayName = 'OptionFilterPicker' ;

export default OptionFilterPicker ;
