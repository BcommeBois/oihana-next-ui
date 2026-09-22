'use client' ;

/**
 * PagedPickerModal — the picker for a **collection nobody holds** : the
 * members of a directory, a catalogue of thousands of items. One row is
 * chosen, in a modal of its own.
 *
 * 🔑 **Its twin is `OptionPickerModal`**, and the difference is where the
 * options come from. There the caller already holds them all and filters in
 * memory ; here there is nothing to hold, so the search runs on the SERVER and
 * the list grows as it is scrolled (`hooks/usePagedSearch` + `InfiniteScroll`).
 * Pick this one whenever the answer lives in a collection.
 *
 * Domain-free : the rows arrive from a `loader` and are rendered by the
 * caller's functions — `renderTitle`, `renderSubtitle`, `renderAvatar` in
 * front, `renderRight` at the end.
 *
 * 🔑 **A choice is undoable only where the caller says so.** `clearLabel` adds
 * a pinned row that answers with `null` : an optional party picked by mistake
 * must be reversible, and re-picking the chosen row does not unpick it. A
 * mandatory party is given no such row.
 *
 * **A new search opens on its first results** : the list is handed the hook's
 * `generation` as `resetKey`, so it scrolls back to the top whenever it starts
 * over.
 *
 * The search and the « none » row stay OUT of the scroller : only the list
 * scrolls, and a way back to nothing is never scrolled away. The scroller has
 * the rest of the modal's height, so the modal does not change size as the
 * results arrive.
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
 * Labels : each `…Label` prop wins, then the `paged` block (and `close`) of the
 * i18n bundle at `path`, then the English last resort. The count goes through
 * `hooks/useNumberFormat`.
 *
 * @module components/pickers/PagedPickerModal
 */

import { useState } from 'react' ;

import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

import Button         from '../Button' ;
import InfiniteScroll from '../layouts/InfiniteScroll' ;
import InputSearch    from '../inputs/InputSearch' ;
import Modal          from '../modals/Modal' ;
import ModalFooter    from '../modals/ModalFooter' ;
import useModal       from '../modals/hooks/useModal' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import useNumberFormat from '../../hooks/useNumberFormat' ;
import usePagedSearch  from '../../hooks/usePagedSearch' ;

import getChoiceCardClasses from '../../themes/components/choiceCard' ;

/**
 * The layout of a row, under the choice card look.
 * @type {string}
 */
export const PAGED_PICKER_ROW_LAYOUT = 'flex items-center gap-3 p-2 text-left' ;

/**
 * The key of a row, by default : a document store's `_key`, else an `id`.
 *
 * @param {Object} item
 * @returns {*}
 */
const defaultGetKey = item => item?._key ?? item?.id ;

/**
 * @param {Object}   props
 * @param {string}   [props.clearLabel]               - When set, a pinned row that selects `null` — the way an optional choice is unset.
 * @param {string}   [props.closeLabel]               - The footer button, and the close button's title.
 * @param {string}   [props.emptyLabel]               - No result for the typed search.
 * @param {string}   [props.errorLabel]               - A page failed to load.
 * @param {Function} [props.getKey]                   - `( row ) => key`, for the de-duplication and the chosen row. Defaults to `_key`, then `id`.
 * @param {number}   [props.limit=30]                 - Rows per page.
 * @param {Function} props.loader                     - `( { search , limit , offset } ) => Promise<{ result , total }>`. Wrap it in `useCallback` : a new identity starts over.
 * @param {Function} props.onClose                    - Called once the modal is closed : unmount it here.
 * @param {Function} props.onSelect                   - Called with the picked row, or `null` from the `clearLabel` row.
 * @param {string}   [props.path='components.picker'] - i18n path of the labels.
 * @param {string}   [props.placeholder]              - The search placeholder, also shown in the empty list before anything is typed.
 * @param {Function} [props.renderAvatar]             - `( row , title ) => node` in front of the row.
 * @param {Function} [props.renderRight]              - `( row ) => node` aligned right (an identity badge).
 * @param {Function} [props.renderSubtitle]           - `( row ) => string` second line.
 * @param {Function} [props.renderTitle]              - `( row ) => node` first line ; defaults to `row.name`.
 * @param {string}   [props.retryLabel]               - The button that asks for the failed page again.
 * @param {React.ReactNode} [props.title]             - Modal title.
 * @param {?Object}  [props.value]                    - The currently picked row.
 *
 * @example
 * ```jsx
 * const loader = useCallback( ( { search , limit , offset } ) => searchMembers( { search , limit , offset } ) , [] ) ;
 *
 * { picking && (
 *     <PagedPickerModal
 *         clearLabel   = "Nobody"
 *         loader       = { loader }
 *         renderAvatar = { ( row , title ) => <Initials name={ title } /> }
 *         title        = "Member"
 *         value        = { member }
 *         onClose      = { () => setPicking( false ) }
 *         onSelect     = { setMember }
 *     />
 * ) }
 * ```
 */
const PagedPickerModal =
({
    clearLabel ,
    closeLabel ,
    emptyLabel ,
    errorLabel ,
    getKey = defaultGetKey ,
    limit  = 30 ,
    loader ,
    onClose ,
    onSelect ,
    path   = 'components.picker' ,
    placeholder ,
    renderAvatar ,
    renderRight ,
    renderSubtitle ,
    renderTitle ,
    retryLabel ,
    title ,
    value ,
}) =>
{
    const { modalRef , close : closeModal } = useModal( { openOnMount : true } ) ;

    const { formatNumber } = useNumberFormat() ;

    const {
        close : closeFromI18n = 'Close' ,
        paged : labels        = {} ,
    }
    = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const closeText = closeLabel ?? closeFromI18n ;

    const [ search , setSearch ] = useState( '' ) ;

    const { items , total , loading , hasMore , error , generation , loadMore , retry } =
        usePagedSearch( { loader , search , limit , getKey } ) ;

    const closeNow = () =>
    {
        closeModal() ;
        onClose?.() ;
    } ;

    const pick = ( row ) =>
    {
        onSelect?.( row ) ;
        closeNow() ;
    } ;

    const emptyText = notEmpty( search.trim() )
        ? ( emptyLabel ?? labels.empty ?? 'No result.' )
        : ( placeholder ?? labels.search ?? 'Search…' ) ;

    const pickedKey = value ? getKey( value ) : undefined ;

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

                <div className="flex items-center gap-2">
                    <InputSearch
                        autoFocus
                        className        = "flex-1"
                        placeholder      = { placeholder ?? labels.search ?? 'Search…' }
                        showSearchButton = { false }
                        value            = { search }
                        onChange         = { setSearch }
                    />
                    { total > 0 && (
                        <span className="badge badge-sm badge-ghost shrink-0 font-mono">
                            { formatNumber( total , { maximumFractionDigits : 0 } ) }
                        </span>
                    ) }
                </div>

                { notEmpty( clearLabel ) && (
                    <button
                        type      = "button"
                        className = { getChoiceCardClasses( { checked : !value , className : 'flex items-center p-2 text-left' } ) }
                        onClick   = { () => pick( null ) }
                    >
                        <span className="min-w-0 flex-1 truncate text-sm italic text-base-content/70">
                            { clearLabel }
                        </span>
                    </button>
                ) }

                <InfiniteScroll
                    scrollable
                    className  = "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-0.5"
                    hasMore    = { hasMore }
                    loader     = { <div className="flex justify-center py-4"><span className="loading loading-spinner loading-sm" /></div> }
                    loading    = { loading }
                    resetKey   = { generation }
                    onLoadMore = { loadMore }
                >

                    { !loading && items.length === 0 && !error && (
                        <p className="py-8 text-center text-sm text-base-content/60">
                            { emptyText }
                        </p>
                    ) }

                    { items.map( ( row , index ) =>
                    {
                        const key      = getKey( row ) ;
                        const rowTitle = renderTitle    ? renderTitle( row )    : row?.name ;
                        const subtitle = renderSubtitle ? renderSubtitle( row ) : null ;

                        return (
                            <button
                                key       = { key ?? `row-${ index }` }
                                type      = "button"
                                className = { getChoiceCardClasses( { checked : pickedKey !== undefined && pickedKey === key , className : PAGED_PICKER_ROW_LAYOUT } ) }
                                onClick   = { () => pick( row ) }
                            >
                                { renderAvatar?.( row , rowTitle ) }

                                <span className="flex min-w-0 flex-1 flex-col">
                                    <span className="truncate text-sm font-medium">{ rowTitle }</span>
                                    { notEmpty( subtitle ) &&
                                        <span className="truncate text-xs text-base-content/60">{ subtitle }</span>
                                    }
                                </span>

                                { renderRight?.( row ) }
                            </button>
                        ) ;
                    } ) }

                    { error && (
                        <div className="flex flex-col items-center gap-2 py-4 text-sm">
                            <span className="text-error">{ errorLabel ?? labels.error ?? 'Loading failed.' }</span>
                            <Button size="sm" style="ghost" type="button" onClick={ retry }>
                                { retryLabel ?? labels.retry ?? 'Retry' }
                            </Button>
                        </div>
                    ) }

                </InfiniteScroll>

            </div>
        </Modal>
    ) ;
} ;

PagedPickerModal.displayName = 'PagedPickerModal' ;

export default PagedPickerModal ;
