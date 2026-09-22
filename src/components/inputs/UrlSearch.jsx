'use client' ;

/**
 * UrlSearch — a search field whose value lives in the URL.
 *
 * The list is rendered by the server from `?search=`, so the field's job is to
 * put it there. Around that sit four habits every searched list shares, and
 * they are `useFilterParams`' :
 *
 *   1. the query is mirrored to a cookie (`search__<pageKey>`) when `persist`
 *      is on, so a list walked away from and come back to still shows what was
 *      being looked for ;
 *   2. the pagination is dropped — a new query starts on page 1, and page 4 of
 *      the previous result set means nothing in the new one ;
 *   3. the push does not scroll, and goes through the SCREEN's shared
 *      transition when there is one ({@link module:contexts/busyNavigation/provider}),
 *      so typing greys the list rather than nothing at all ;
 *   4. clearing refreshes — the destination is then the bare URL, whose server
 *      render depends on the cookie just expired.
 *
 * ⚠️ **The placeholder is resolved here, live, and not through `I18nText`.**
 * The native `placeholder` attribute takes a string, not a node : it has to be
 * a real value at render time, which is why this component reads `useI18n`
 * itself rather than receiving a node. It reacts to a language switch all the
 * same.
 *
 * ⚠️ It reads `useSearchParams` (through `useFilterParams`), so a statically
 * rendered page mounting it wants a `Suspense` boundary above.
 *
 * @module components/inputs/UrlSearch
 *
 * @example
 * ```jsx
 * // The server read `?search=` — or the cookie — and hands it back as the default.
 * <UrlSearch
 *     defaultValue = { search }
 *     pageKey      = "articles"
 *     path         = "app.articles"
 *     persist
 * />
 * ```
 */

import InputSearch from './InputSearch' ;

import useFilterParams from '../../hooks/useFilterParams' ;
import useI18n         from '../../contexts/locale/useI18n' ;

import getSearchStorageKey from '../../helpers/storage/searchStorageKey' ;

/**
 * The query parameter the search is written to, by default.
 * @type {string}
 */
export const SEARCH_PARAM = 'search' ;

/**
 * Where the generic placeholder is read when the caller's own bundle has none.
 * @type {string}
 */
export const SEARCH_I18N_PATH = 'components.input' ;

/**
 * @param {Object}  [props]
 * @param {string}  [props.className]              - Additional class names for the field.
 * @param {number}  [props.debounceDelay=400]      - Milliseconds of quiet before the URL is written.
 * @param {string}  [props.defaultValue='']        - The query the server rendered with.
 * @param {boolean} [props.disabled=false]         - Disables the field.
 * @param {string}  [props.pageKey]                - Persistence namespace of the page. Without it nothing is remembered.
 * @param {string}  [props.paramName='search']     - The query parameter carrying the search.
 * @param {string}  [props.path]                   - The caller's i18n bundle, read for `search.placeholder`.
 * @param {boolean} [props.persist=false]          - Mirror the query to the `search__<pageKey>` cookie.
 * @param {string}  [props.placeholder]            - An explicit placeholder, over any i18n reading.
 * @param {boolean} [props.showClearButton=true]   - Shows the clear button when the field carries a value.
 * @param {boolean} [props.showSearchButton=false] - Shows the explicit search button.
 * @param {import('../../themes/sizing/sizes').Size} [props.size] - Field and action button size.
 *
 * @returns {React.ReactElement}
 */
const UrlSearch =
({
    className ,
    debounceDelay    = 400 ,
    defaultValue     = '' ,
    disabled         = false ,
    pageKey ,
    paramName        = SEARCH_PARAM ,
    path ,
    persist          = false ,
    placeholder ,
    showClearButton  = true ,
    showSearchButton = false ,
    size ,
}) =>
{
    const { pushParam } = useFilterParams( { pageKey , persist } ) ;

    const own     = useI18n( path , {} ) ;
    const generic = useI18n( SEARCH_I18N_PATH , {} ) ;

    const resolvedPlaceholder = placeholder
        ?? own?.search?.placeholder
        ?? generic?.search?.placeholder
        ?? 'Search…' ;

    const search = value => pushParam
    ({
        name      : paramName ,
        value     ,
        cookieKey : pageKey ? getSearchStorageKey( pageKey ) : undefined ,
    }) ;

    return (
        <InputSearch
            className        = { className }
            debounceDelay    = { debounceDelay }
            defaultValue     = { defaultValue }
            disabled         = { disabled }
            onClear          = { () => search( '' ) }
            onSearch         = { search }
            placeholder      = { resolvedPlaceholder }
            showClearButton  = { showClearButton }
            showSearchButton = { showSearchButton }
            size             = { size }
        />
    ) ;
} ;

UrlSearch.displayName = 'UrlSearch' ;

export default UrlSearch ;
