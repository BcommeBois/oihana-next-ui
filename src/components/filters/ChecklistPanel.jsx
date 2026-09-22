'use client' ;

/**
 * ChecklistPanel — a filter criterion where **several values** are picked : a
 * list of boxes over a LOCAL draft, committed by a « Clear / Apply (n) »
 * footer.
 *
 * « These three values » is one question : applying on each tick would spend
 * three navigations to ask it. The draft rewinds to the applied selection at
 * each opening, so a selection abandoned by closing the panel never comes back.
 *
 * Both surfaces come from `AnchoredPanel` : an anchored dropdown on `md`+, a
 * full-screen sheet below.
 *
 * ⚠️ **It emits in the OPTIONS' order, never the click order** : `options`, then
 * `extraOptions`, then any selected id neither of them lists (a value applied
 * earlier and gone from the list since — kept, not silently dropped). Two
 * identical selections give the same value : the same URL, when it lands there.
 *
 * ⚠️ **A search narrows what is SHOWN, never what is selected.** It is
 * accent-folded (`helpers/strings/foldText`, or `fold`), matches a name or an
 * id, and appears from `searchThreshold` options on — a list one reads whole
 * needs no search.
 *
 * Contents, top to bottom :
 *   - `header` — a control of the caller's that belongs to the same question
 *     (a mode applied to the whole selection) ;
 *   - the search, then `countCaption` naming what the numbers count ;
 *   - `showAll` : an « All » row that empties the draft ;
 *   - one `FilterOption` per option (box, optional colour dot, count) — shown
 *     `pageSize` rows at a time when set, the next slice as the list is
 *     scrolled ;
 *   - `extraOptions`, pinned under the list and hidden while searching : a
 *     « none » value that has no name to match.
 *
 * 🔑 **A `header` of the caller's joins the same footer** : `extraDirty` keeps
 * « Clear » enabled while it differs from its default, `onClear` resets it with
 * the draft, `onOpen` rewinds it with the draft. The caller reads it back in
 * its own `onApply`.
 *
 * Labels : the criterion's bundle at `path`, over `components.filter` — see
 * `useFilterLabels`.
 *
 * @module components/filters/ChecklistPanel
 */

import { useCallback , useEffect , useMemo , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import AnchoredPanel   from '../panels/AnchoredPanel' ;
import FilterOption , { MULTIPLE } from './FilterOption' ;
import InfiniteScroll  from '../layouts/InfiniteScroll' ;
import InputSearch     from '../inputs/InputSearch' ;
import useFilterLabels from './useFilterLabels' ;

import foldText from '../../helpers/strings/foldText' ;

import cn from '../../themes/helpers/cn' ;

/**
 * @typedef {Object} ChecklistOption
 * @property {string}  id      - What is selected.
 * @property {?string} [name]  - What is shown ; missing, the `unknown` label with the id.
 * @property {number}  [count] - The number on the right.
 * @property {string}  [color] - A CSS colour : a dot before the name.
 */

/**
 * The ids of a draft, in the options' order, then the ids no option lists.
 *
 * @param {Set<string>}       draft
 * @param {ChecklistOption[]} ordered - `options` then `extraOptions`.
 * @returns {string[]}
 */
export const orderSelection = ( draft , ordered ) =>
{
    const known = ordered.map( option => option.id ).filter( id => draft.has( id ) ) ;
    const seen  = new Set( known ) ;
    return [ ...known , ...[ ...draft ].filter( id => !seen.has( id ) ) ] ;
} ;

/**
 * @param {Object}            props
 * @param {React.RefObject}   props.anchorRef              - The trigger : the dropdown's anchor.
 * @param {string}            [props.countCaption]         - What the numbers count ; omitted, no caption.
 * @param {boolean}           [props.error=false]          - The options failed to load.
 * @param {boolean}           [props.extraDirty=false]     - The caller's `header` differs from its default : « Clear » stays enabled.
 * @param {ChecklistOption[]} [props.extraOptions=[]]      - Pinned under the list, hidden while searching.
 * @param {Function}          [props.fold]                 - `( text ) => string`, applied to the query and to each option's name and id. Defaults to `helpers/strings/foldText`.
 * @param {React.ReactNode}   [props.header]               - A control of the caller's above the search.
 * @param {boolean}           props.isOpen                 - Whether the panel is open ; owned by the caller.
 * @param {string}            [props.listClassName='md:max-h-72'] - Height cap of the list on the dropdown.
 * @param {boolean}           [props.loading=false]        - The options are loading.
 * @param {Function}          props.onApply                - Called with the selected ids, in the options' order.
 * @param {Function}          [props.onClear]              - Also called by « Clear » : reset the `header`.
 * @param {Function}          props.onClose                - Dismiss the panel.
 * @param {Function}          [props.onOpen]               - Called at each opening : rewind the `header`.
 * @param {Function}          [props.onReload]             - Retry the options load ; without it, the error has no button.
 * @param {ChecklistOption[]} [props.options=[]]           - The options, in the order to show and to emit.
 * @param {number}            [props.pageSize=0]           - Rows shown at a time, the next slice on scroll ; `0` shows them all.
 * @param {number}            [props.panelHeight=420]      - Estimated full dropdown height.
 * @param {number}            [props.panelWidth=288]       - Estimated dropdown width.
 * @param {string}            [props.path]                 - The criterion's own i18n bundle.
 * @param {number}            [props.searchThreshold=0]    - The search appears from this many options on.
 * @param {string[]}          [props.selectedIds=[]]       - The applied ids.
 * @param {boolean}           [props.showAll=false]        - An « All » row that empties the draft.
 * @param {boolean}           [props.showSearch=true]      - `false` never shows the search.
 *
 * @example
 * ```jsx
 * <ChecklistPanel
 *     anchorRef    = { anchorRef }
 *     extraOptions = { [ { id : NONE , name : 'No label' , count : 12 } ] }
 *     isOpen       = { isOpen }
 *     options      = { labels }
 *     pageSize     = { 25 }
 *     path         = "app.filters.label"
 *     selectedIds  = { selected }
 *     onApply      = { setSelected }
 *     onClose      = { () => setOpen( false ) }
 * />
 * ```
 */
const ChecklistPanel =
({
    anchorRef ,
    countCaption ,
    error        = false ,
    extraDirty   = false ,
    extraOptions = [] ,
    fold         = foldText ,
    header ,
    isOpen ,
    listClassName = 'md:max-h-72' ,
    loading      = false ,
    onApply ,
    onClear ,
    onClose ,
    onOpen ,
    onReload ,
    options      = [] ,
    pageSize     = 0 ,
    panelHeight  = 420 ,
    panelWidth   = 288 ,
    path ,
    searchThreshold = 0 ,
    selectedIds  = [] ,
    showAll      = false ,
    showSearch   = true ,
}) =>
{
    const labels = useFilterLabels( path ) ;

    const [ query , setQuery ] = useState( '' ) ;
    const [ draft , setDraft ] = useState( () => new Set( selectedIds ) ) ;
    const [ shownCount , setShownCount ] = useState( pageSize ) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: rewinds on the open transition only ; `selectedIds` (a fresh array each render) and `onOpen` must not retrigger it.
    useEffect( () =>
    {
        if ( isOpen )
        {
            setDraft( new Set( selectedIds ) ) ;
            setQuery( '' ) ;
            setShownCount( pageSize ) ;
            onOpen?.() ;
        }
    } , [ isOpen ] ) ;

    // A new search rewinds the window to the first slice.
    const search = ( value ) =>
    {
        setQuery( value ) ;
        setShownCount( pageSize ) ;
    } ;

    const searchable = showSearch && options.length >= searchThreshold ;
    const folded     = searchable ? String( fold( query ) ?? '' ).trim() : '' ;
    const searching  = folded.length > 0 ;

    const visible = useMemo( () =>
    {
        if ( !searching )
        {
            return options ;
        }

        return options.filter( option =>
            String( fold( option.name ?? '' ) ?? '' ).includes( folded ) ||
            String( fold( String( option.id ) ) ?? '' ).includes( folded ) ) ;
    } , [ options , searching , folded , fold ] ) ;

    const windowed = pageSize > 0 ;
    const shown    = windowed ? visible.slice( 0 , shownCount ) : visible ;
    const hasMore  = windowed && shownCount < visible.length ;
    const loadMore = useCallback( () => setShownCount( count => count + pageSize ) , [ pageSize ] ) ;

    const toggle = ( id ) => setDraft( previous =>
    {
        const next = new Set( previous ) ;

        if ( next.has( id ) ) { next.delete( id ) ; }
        else                  { next.add( id ) ; }

        return next ;
    } ) ;

    const clear = () =>
    {
        setDraft( new Set() ) ;
        onClear?.() ;
    } ;

    const apply = () =>
    {
        onApply?.( orderSelection( draft , [ ...options , ...extraOptions ] ) ) ;
        onClose?.() ;
    } ;

    /**
     * @param {ChecklistOption} option
     * @param {boolean}         [muted]
     * @returns {React.ReactElement}
     */
    const row = ( option , muted = false ) => (
        <FilterOption
            key     = { option.id }
            checked = { draft.has( option.id ) }
            color   = { option.color }
            count   = { option.count }
            label   = { option.name ?? format( labels.unknown , option.id ) }
            mode    = { MULTIPLE }
            muted   = { muted }
            onClick = { () => toggle( option.id ) }
        />
    ) ;

    const rows = (
        <>
            { showAll && !searching && (
                <FilterOption
                    muted
                    checked = { draft.size === 0 }
                    label   = { labels.all }
                    mode    = { MULTIPLE }
                    onClick = { () => setDraft( new Set() ) }
                />
            ) }

            { visible.length === 0
                ? <p className="py-6 text-center text-sm text-base-content/60">{ labels.empty }</p>
                : shown.map( option => row( option ) )
            }
        </>
    ) ;

    const listClasses = cn( 'flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-2' , listClassName ) ;

    const footer = ( { size } ) => (
        <>
            <button
                type      = "button"
                className = { cn( 'btn btn-ghost' , size ) }
                disabled  = { draft.size === 0 && !extraDirty }
                onClick   = { clear }
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
            footer      = { footer }
            isOpen      = { isOpen }
            onClose     = { onClose }
            panelHeight = { panelHeight }
            panelWidth  = { panelWidth }
            title       = { labels.title }
        >
            <div className="flex min-h-0 flex-1 flex-col">

                { header }

                { searchable && (
                    <div className="border-b border-base-300/60 p-2">
                        <InputSearch
                            className        = "w-full"
                            placeholder      = { labels.search }
                            showClearButton  = { true }
                            showSearchButton = { false }
                            size             = "sm"
                            value            = { query }
                            onChange         = { search }
                        />
                    </div>
                ) }

                { countCaption && (
                    <p className="border-b border-base-300/60 px-3 py-1.5 text-right text-[0.6875rem] uppercase tracking-wide text-base-content/45">
                        { countCaption }
                    </p>
                ) }

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

                { !loading && !error && ( windowed
                    ? (
                        <InfiniteScroll
                            scrollable
                            className  = { listClasses }
                            hasMore    = { hasMore }
                            loading    = { false }
                            resetKey   = { folded }
                            onLoadMore = { loadMore }
                        >
                            { rows }
                        </InfiniteScroll>
                      )
                    : <div className={ listClasses }>{ rows }</div>
                ) }

                { !loading && !error && !searching && extraOptions.length > 0 && (
                    <div className="flex shrink-0 flex-col gap-0.5 border-t border-base-300/60 p-2">
                        { extraOptions.map( option => row( option , true ) ) }
                    </div>
                ) }

            </div>
        </AnchoredPanel>
    ) ;
} ;

ChecklistPanel.displayName = 'ChecklistPanel' ;

export default ChecklistPanel ;
