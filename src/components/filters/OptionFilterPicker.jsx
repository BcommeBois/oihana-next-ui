'use client' ;

/**
 * OptionFilterPicker — a filter criterion over a **closed set held in hand** :
 * a few dozen options loaded once, searched in the browser.
 *
 * 🔑 **Its sibling is `RemoteFilterPicker`**, for a collection too large to
 * hold, searched on the server.
 *
 * **Two modes, one control.** Single-select by default — a click applies and
 * closes, there being nothing to batch. `multiple` turns the rows into boxes
 * over a LOCAL draft, committed by an « Apply » footer : « these three
 * options » is one question, and applying on each click would spend three
 * navigations to ask it.
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
 * ⚠️ **A multi-select emits in the OPTIONS' order, never the click order** : two
 * identical selections must produce the same value whatever path was taken to
 * reach them — the same URL, when it lands there.
 *
 * ⚠️ **A search narrows what is SHOWN, never what is selected** : the draft is
 * committed against the whole list, so searching for a fourth option cannot
 * drop the three already ticked.
 *
 * The search and the draft rewind at each opening : a stale query never leaks
 * in, and a selection abandoned by closing the panel does not come back.
 *
 * Labels : the criterion's bundle at `path`, over `components.filter` — see
 * `useFilterLabels`.
 *
 * @module components/filters/OptionFilterPicker
 */

import { useEffect , useMemo , useState } from 'react' ;

import { MdSearch } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import AnchoredPanel from '../panels/AnchoredPanel' ;
import FilterOption , { MULTIPLE , SINGLE } from './FilterOption' ;
import ModalFooter   from '../modals/ModalFooter' ;
import useFilterLabels from './useFilterLabels' ;

import foldText from '../../helpers/strings/foldText' ;

import cn from '../../themes/helpers/cn' ;

/**
 * @typedef {Object} FilterOptionEntry
 * @property {string}  id      - What is selected.
 * @property {?string} [name]  - What is shown ; missing, the `unknown` label with the id.
 * @property {number}  [count] - The number on the right.
 */

/**
 * @param {Object}              props
 * @param {React.RefObject}     props.anchorRef          - The trigger : the dropdown's anchor.
 * @param {string}              [props.countCaption]     - What the numbers count ; omitted, no caption.
 * @param {boolean}             [props.error=false]      - The options failed to load.
 * @param {Function}            [props.fold]             - `( text ) => string`, applied to the query and to each option's name and id. Defaults to `helpers/strings/foldText`.
 * @param {boolean}             props.isOpen             - Whether the panel is open ; owned by the caller.
 * @param {boolean}             [props.loading=false]    - The options are loading.
 * @param {boolean}             [props.multiple=false]   - Draft several options and commit them through the footer.
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
const OptionFilterPicker =
({
    anchorRef ,
    countCaption ,
    error    = false ,
    fold     = foldText ,
    isOpen ,
    loading  = false ,
    multiple = false ,
    onApply ,
    onClose ,
    onReload ,
    onSelect ,
    options  = [] ,
    panelHeight ,
    path ,
    selectedId  = '' ,
    selectedIds = [] ,
}) =>
{
    const labels = useFilterLabels( path ) ;

    const [ query , setQuery ] = useState( '' ) ;

    // The multi-select draft : ticked but not yet committed. Unused in single
    // mode, where a click IS the commit.
    const [ draft , setDraft ] = useState( () => new Set( selectedIds ) ) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: resets on the open transition only ; `selectedIds` (a fresh array each render) must not retrigger it.
    useEffect( () =>
    {
        if ( isOpen )
        {
            setQuery( '' ) ;
            setDraft( new Set( selectedIds ) ) ;
        }
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

    const toggle = ( id ) => setDraft( previous =>
    {
        const next = new Set( previous ) ;

        if ( next.has( id ) ) { next.delete( id ) ; }
        else                  { next.add( id ) ; }

        return next ;
    } ) ;

    // In the OPTIONS' order, read against the WHOLE list : see the module doc.
    const apply = () =>
    {
        onApply?.( options.map( option => option.id ).filter( id => draft.has( id ) ) ) ;
        onClose?.() ;
    } ;

    const isChecked    = ( id ) => multiple ? draft.has( id ) : id === selectedId ;
    const isAllChecked = multiple ? draft.size === 0 : !selectedId ;
    const mode         = multiple ? MULTIPLE : SINGLE ;

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
                            checked = { isAllChecked }
                            label   = { labels.all }
                            mode    = { mode }
                            onClick = { () => multiple ? setDraft( new Set() ) : select( null ) }
                        />
                    ) }

                    { visible.length === 0
                        ? <p className="py-6 text-center text-sm text-base-content/60">{ labels.empty }</p>
                        : visible.map( option => (
                            <FilterOption
                                key     = { option.id }
                                checked = { isChecked( option.id ) }
                                count   = { option.count }
                                label   = { option.name ?? format( labels.unknown , option.id ) }
                                mode    = { mode }
                                onClick = { () => multiple ? toggle( option.id ) : select( option.id ) }
                            />
                        ) )
                    }
                </div>
            ) }
        </>
    ) ;

    // The two buttons of the multiple mode ; single mode has none, only a
    // « Close » bar on the sheet.
    const footer = ( { size } ) => (
        <>
            <button
                type      = "button"
                className = { cn( 'btn btn-ghost' , size ) }
                disabled  = { draft.size === 0 }
                onClick   = { () => setDraft( new Set() ) }
            >
                { labels.clearAll }
            </button>
            <button
                type      = "button"
                className = { cn( 'btn btn-primary' , size ) }
                onClick   = { apply }
            >
                { draft.size > 0 ? format( '{0} ({1})' , labels.apply , draft.size ) : labels.apply }
            </button>
        </>
    ) ;

    return (
        <AnchoredPanel
            anchorRef   = { anchorRef }
            closeLabel  = { labels.close }
            footer      = { multiple ? footer : undefined }
            isOpen      = { isOpen }
            onClose     = { onClose }
            panelHeight = { panelHeight ?? ( multiple ? 470 : 420 ) }
            panelWidth  = { 288 }
            title       = { labels.title }
            sheetFooter = { multiple
                ? undefined
                : <ModalFooter agree={ labels.close } agreeColor="neutral" size="md" onAgree={ () => onClose?.() } />
            }
        >
            { searchBox }
            { caption }
            { listArea }
        </AnchoredPanel>
    ) ;
} ;

OptionFilterPicker.displayName = 'OptionFilterPicker' ;

export default OptionFilterPicker ;
