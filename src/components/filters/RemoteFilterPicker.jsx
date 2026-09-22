'use client' ;

/**
 * RemoteFilterPicker — a filter criterion over a collection **too large to
 * hold** : searched on the server, loaded page by page.
 *
 * 🔑 **Its sibling is `OptionFilterPicker`**, for a closed set searched in the
 * browser.
 *
 * 🔑 **The perimeter never travels through this component.** It takes a
 * `loader` already bound to what the reader may see, so the picker knows how
 * to ask and nothing about who may.
 *
 * **Two contents, one control.** With an empty search :
 *
 *  - where the axis is counted, the `buckets` are the opening listing — « the
 *    values that have results here », with their counts : a far better start
 *    than the alphabet ;
 *  - where it is not (no buckets), the paged collection opens instead.
 *
 * Typing always switches to the paged search, and a new search opens on its
 * first results (`resetKey`). The buckets and the search results never show
 * together : two scrolling areas, and the same value twice.
 *
 * Single-select, applied on click — there is nothing to batch. The search
 * takes the focus on the dropdown only : a sheet opening on a soft keyboard
 * hides the very list it filters.
 *
 * Both surfaces come from `AnchoredPanel`. Labels : the criterion's bundle at
 * `path`, over `components.filter` — see `useFilterLabels`.
 *
 * @module components/filters/RemoteFilterPicker
 */

import { useEffect , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import AnchoredPanel   from '../panels/AnchoredPanel' ;
import FilterOption    from './FilterOption' ;
import InfiniteScroll  from '../layouts/InfiniteScroll' ;
import InputSearch     from '../inputs/InputSearch' ;
import ModalFooter     from '../modals/ModalFooter' ;
import useFilterLabels from './useFilterLabels' ;

import usePagedSearch from '../../hooks/usePagedSearch' ;

import useBreakpoint from '../../themes/hooks/useBreakpoint' ;

/**
 * The key of a row, by default : a document store's `_key`, else an `id`.
 *
 * @param {Object} item
 * @returns {*}
 */
const defaultGetKey = item => item?._key ?? item?.id ;

/**
 * The label of a row, by default : its `name`.
 *
 * @param {Object} item
 * @returns {?string}
 */
const defaultGetLabel = item => item?.name ;

/**
 * @typedef {Object} FilterBucket
 * @property {string|number} value  - What is selected.
 * @property {?string}       [label] - What is shown ; missing, the `unknown` label with the value.
 * @property {number}        [count] - The number on the right.
 */

/**
 * @param {Object}         props
 * @param {React.RefObject} props.anchorRef         - The trigger : the dropdown's anchor.
 * @param {FilterBucket[]} [props.buckets=[]]       - The counted opening listing ; empty where the axis is not counted.
 * @param {Function}       [props.getKey]           - `( row ) => key` of a search result. Defaults to `_key`, then `id`.
 * @param {Function}       [props.getLabel]         - `( row ) => label` of a search result. Defaults to `name`.
 * @param {boolean}        props.isOpen             - Whether the panel is open ; owned by the caller.
 * @param {number}         [props.limit=30]         - Rows per page.
 * @param {Function}       props.loader             - `( { search , limit , offset } ) => Promise<{ result , total }>`, bound to the reader's perimeter. Wrap it in `useCallback`.
 * @param {Function}       props.onClose            - Dismiss the panel.
 * @param {Function}       props.onSelect           - Called with the key, or `null` to clear.
 * @param {string}         [props.path]             - The criterion's own i18n bundle.
 * @param {?string}        [props.selectedId='']    - The applied key.
 *
 * @example
 * ```jsx
 * const loader = useCallback( ( { search , limit , offset } ) => searchMembers( { search , limit , offset } ) , [] ) ;
 *
 * <RemoteFilterPicker
 *     anchorRef  = { anchorRef }
 *     buckets    = { facets.member }
 *     isOpen     = { isOpen }
 *     loader     = { loader }
 *     path       = "app.filters.member"
 *     selectedId = { member }
 *     onClose    = { () => setOpen( false ) }
 *     onSelect   = { setMember }
 * />
 * ```
 */
const RemoteFilterPicker =
({
    anchorRef ,
    buckets  = [] ,
    getKey   = defaultGetKey ,
    getLabel = defaultGetLabel ,
    isOpen ,
    limit    = 30 ,
    loader ,
    onClose ,
    onSelect ,
    path ,
    selectedId = '' ,
}) =>
{
    const labels = useFilterLabels( path ) ;

    const isMdUp = useBreakpoint( 'md' ) ;

    const [ query , setQuery ] = useState( '' ) ;

    // Rewind the search at each opening : a stale query never leaks in.
    useEffect( () =>
    {
        if ( isOpen ) { setQuery( '' ) ; }
    } , [ isOpen ] ) ;

    // The buckets stand in for the opening listing where there are some : the
    // collection is only worth fetching while searching, or without buckets.
    const searching   = query.trim().length > 0 ;
    const usesBuckets = buckets.length > 0 && !searching ;

    const { items , loading , hasMore , error , generation , loadMore , retry } = usePagedSearch(
    {
        getKey ,
        limit ,
        loader ,
        search  : query ,
        enabled : isOpen && !usesBuckets ,
    } ) ;

    const select = ( id ) =>
    {
        onSelect?.( id ) ;
        onClose?.() ;
    } ;

    /**
     * One row, shared by the buckets and the search results.
     *
     * @param {string}  id
     * @param {?string} name
     * @param {number}  [count]
     * @returns {React.ReactElement}
     */
    const row = ( id , name , count ) => (
        <FilterOption
            key     = { id }
            checked = { id === selectedId }
            count   = { count }
            label   = { name ?? format( labels.unknown , id ) }
            onClick = { () => select( id ) }
        />
    ) ;

    // « All » — clears the filter. Hidden while searching : it has no name to match.
    const allRow = !searching && (
        <FilterOption
            muted
            checked = { !selectedId }
            label   = { labels.all }
            onClick = { () => select( null ) }
        />
    ) ;

    return (
        <AnchoredPanel
            anchorRef   = { anchorRef }
            closeLabel  = { labels.close }
            isOpen      = { isOpen }
            onClose     = { onClose }
            panelHeight = { 420 }
            panelWidth  = { 288 }
            title       = { labels.title }
            sheetFooter = { <ModalFooter agree={ labels.close } agreeColor="neutral" size="md" onAgree={ () => onClose?.() } /> }
        >
            <div className="border-b border-base-300/60 p-2">
                <InputSearch
                    autoFocus        = { isMdUp }
                    onChange         = { setQuery }
                    placeholder      = { labels.search }
                    showClearButton  = { true }
                    showSearchButton = { false }
                    size             = "sm"
                    value            = { query }
                />
            </div>

            { usesBuckets
                ? (
                    <div className="min-h-0 flex-1 overflow-y-auto md:max-h-72">
                        <div className="flex flex-col gap-0.5 p-2">
                            { allRow }
                            { buckets.map( bucket => row( String( bucket.value ) , bucket.label , bucket.count ) ) }
                        </div>
                    </div>
                  )
                : (
                    <InfiniteScroll
                        scrollable
                        className  = "flex min-h-0 flex-1 flex-col gap-0.5 p-2 md:max-h-72"
                        hasMore    = { hasMore }
                        loader     = { <div className="flex justify-center py-4"><span className="loading loading-spinner loading-sm" /></div> }
                        loading    = { loading }
                        resetKey   = { generation }
                        onLoadMore = { loadMore }
                    >
                        { allRow }

                        { !loading && items.length === 0 && !error && (
                            <p className="py-6 text-center text-sm text-base-content/60">{ labels.empty }</p>
                        ) }

                        { items.map( item => row( String( getKey( item ) ) , getLabel( item ) ) ) }

                        { error && (
                            <div className="flex flex-col items-center gap-2 py-4 text-sm">
                                <span className="text-error">{ labels.loadError }</span>
                                <button type="button" className="btn btn-sm btn-ghost" onClick={ retry }>
                                    { labels.retry }
                                </button>
                            </div>
                        ) }
                    </InfiniteScroll>
                  )
            }
        </AnchoredPanel>
    ) ;
} ;

RemoteFilterPicker.displayName = 'RemoteFilterPicker' ;

export default RemoteFilterPicker ;
