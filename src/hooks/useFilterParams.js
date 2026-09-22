'use client' ;

/**
 * useFilterParams — the URL + cookie mechanics of a list's filter bar.
 *
 * A filter criterion lives in TWO places at once : the URL (shareable,
 * server-rendered, back-button friendly) and a cookie (so a selection survives
 * navigating away and back — build its key with `helpers/storage/createStorageKey`).
 * Keeping the two in step is the same dance every bar performs :
 *
 *   1. write — or expire — the persisted cookie ;
 *   2. set (or delete) the URL parameter ;
 *   3. drop the pagination (`resetParams`, `?offset=` by default) — a list that
 *      just changed shape starts on page 1 ;
 *   4. `router.push` without scrolling — through the SCREEN's shared transition
 *      when there is one, so applying a criterion greys the list rather than
 *      nothing at all (`contexts/busyNavigation`) ; outside a provider, a plain
 *      push, with the address marked in place
 *      (`helpers/routes/inPlaceNavigation`) : a criterion narrows the rows
 *      already on screen, and `scroll : false` alone does not stop the shell's
 *      own reset, which reads any change of address as a new page. `navigate`
 *      marks it for us ;
 *   5. `router.refresh()` **when nothing is left selected** — the destination is
 *      then the bare URL, whose server render depends on the cookie we just
 *      expired ; without the refresh Next serves the cached, still-filtered
 *      server render.
 *
 * Every criterion is described by an entry :
 *
 * ```
 * { name : 'colour' , value : 'red' , cookieKey : 'colour__catalogue' }
 * ```
 *
 * A falsy `value` means « clear this criterion » : the parameter is dropped and
 * the cookie expired. {@link clearParams} is the same call with every value
 * forced to `null`.
 *
 * Several entries pushed together travel in ONE navigation — a criterion that
 * carries two parameters (its ids and a mode) must never spend two history
 * steps on a single click. The refresh follows the VALUES of the whole push,
 * not the number of entries.
 *
 * @module hooks/useFilterParams
 *
 * @example
 * ```js
 * const { pushParam , pushParams , clearParams } = useFilterParams( { pageKey , persist } ) ;
 *
 * // One criterion.
 * pushParam( { name : COLOUR_PARAM , value : 'red' , cookieKey : colourKey( pageKey ) } ) ;
 *
 * // Two criteria, one navigation.
 * pushParams( [ idsEntry , modeEntry ] ) ;
 *
 * // Wipe everything.
 * clearParams( [ { name : COLOUR_PARAM , cookieKey : colourKey( pageKey ) } , … ] ) ;
 * ```
 */

import { useCallback } from 'react' ;

import { usePathname , useRouter , useSearchParams } from 'next/navigation' ;

import useBusyNavigation from '../contexts/busyNavigation/useBusyNavigation' ;

import { markInPlace } from '../helpers/routes/inPlaceNavigation' ;

import removeCookie from '../helpers/storage/removeCookie' ;
import setCookie    from '../helpers/storage/setCookie' ;

/**
 * The parameters dropped by every filter change, by default : the pagination —
 * a narrowed list has fewer pages, and page 4 of the previous result set means
 * nothing in the new one.
 * @type {string[]}
 */
export const RESET_PARAMS = [ 'offset' ] ;

/**
 * @typedef  {Object} FilterParamEntry
 * @property {string}  name        - URL query parameter carrying the criterion.
 * @property {string}  [value]     - Value to apply ; falsy clears the criterion.
 * @property {string}  [cookieKey] - Full persistence cookie key (e.g. `colour__catalogue`). Omit to skip persistence for this entry.
 * @property {number}  [maxAge]    - Cookie lifetime in seconds (ignored when clearing). Omitted, `COOKIE_MAX_AGE` (one year).
 */

/**
 * Writes (or expires, when `value` is falsy) a persisted filter cookie.
 *
 * `setCookie` encodes the value ; the server reads it back already decoded
 * (`cookies().get( key ).value`) and must not decode it again.
 *
 * @param {string} cookieKey - Full cookie key (e.g. `colour__catalogue`).
 * @param {string} value     - Value to store, or falsy to expire the cookie.
 * @param {number} [maxAge]  - Cookie lifetime in seconds. Omitted, `COOKIE_MAX_AGE`.
 */
const writeFilterCookie = ( cookieKey , value , maxAge ) =>
{
    if ( value ) { setCookie( cookieKey , value , { maxAge } ) ; }
    else         { removeCookie( cookieKey ) ; }
} ;

/**
 * Normalises a single entry or an array of them into a clean array.
 *
 * @param {FilterParamEntry|FilterParamEntry[]} entries
 * @returns {FilterParamEntry[]}
 */
const toEntries = entries => ( Array.isArray( entries ) ? entries : [ entries ] ).filter( Boolean ) ;

/**
 * @param {Object}  [options]
 * @param {string}   [options.pageKey]      - Persistence namespace of the page. Without it nothing is persisted.
 * @param {boolean}  [options.persist=true] - Mirror selections to their cookies.
 * @param {string[]} [options.resetParams=RESET_PARAMS] - Parameters dropped by every change : the pagination.
 *
 * @returns {{
 *   pushParam   : ( entry: FilterParamEntry ) => void ,
 *   pushParams  : ( entries: FilterParamEntry[] ) => void ,
 *   clearParams : ( entries: FilterParamEntry[] ) => void ,
 *   writeCookie : ( cookieKey: string , value: ?string , maxAge?: number ) => void ,
 * }} `writeCookie` stores a preference that lives in a cookie alone — which criteria are shown.
 */
const useFilterParams = (
{
    pageKey ,
    persist     = true ,
    resetParams = RESET_PARAMS ,
} = {} ) =>
{
    const router       = useRouter() ;
    const pathname     = usePathname() ;
    const searchParams = useSearchParams() ;

    // `null` on every list that has not opted in — the push below then behaves
    // exactly as it did before this existed.
    const { navigate } = useBusyNavigation() ;

    const pushParams = useCallback( ( entries ) =>
    {
        const list   = toEntries( entries ) ;
        const params = new URLSearchParams( searchParams.toString() ) ;

        // Tracks whether ANY criterion of this push still carries a value —
        // that, and not the count of entries, is what decides the refresh.
        let hasValue = false ;

        for ( const { name , value , cookieKey , maxAge } of list )
        {
            if ( persist && pageKey && cookieKey )
            {
                writeFilterCookie( cookieKey , value , maxAge ) ;
            }

            if ( value )
            {
                params.set( name , value ) ;
                hasValue = true ;
            }
            else
            {
                params.delete( name ) ;
            }
        }

        for ( const name of resetParams ) { params.delete( name ) ; }

        const query = params.toString() ;
        const href  = query ? `${ pathname }?${ query }` : pathname ;

        if ( typeof navigate === 'function' )
        {
            navigate( href ) ;
        }
        else
        {
            markInPlace( href ) ;
            router.push( href , { scroll : false } ) ;
        }

        if ( !hasValue )
        {
            router.refresh() ;
        }
    } ,
    [ navigate , pageKey , pathname , persist , resetParams , router , searchParams ] ) ;

    const pushParam = useCallback( ( entry ) => pushParams( [ entry ] ) , [ pushParams ] ) ;

    const clearParams = useCallback(
        ( entries ) => pushParams( toEntries( entries ).map( entry => ( { ...entry , value : null } ) ) ) ,
        [ pushParams ] ,
    ) ;

    // A preference that lives ONLY in a cookie — no URL parameter to carry it,
    // because it describes the toolbar rather than the list (which criteria are
    // shown). Exposed here so cookie writing stays in one place ; the caller
    // still has to trigger a navigation for the server to read it back.
    const writeCookie = useCallback( ( cookieKey , value , maxAge ) =>
    {
        if ( persist && pageKey && cookieKey )
        {
            writeFilterCookie( cookieKey , value , maxAge ) ;
        }
    } ,
    [ pageKey , persist ] ) ;

    return { pushParam , pushParams , clearParams , writeCookie } ;
} ;

export default useFilterParams ;
