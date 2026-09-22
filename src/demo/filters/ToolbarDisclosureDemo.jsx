'use client' ;

/**
 * ToolbarDisclosureDemo — the toolbar of a list : a search field that stays,
 * and criteria that fold away.
 *
 * Type in the field : `?search=` follows after a short silence, and the cookie
 * below is written. Fold the bar and navigate away : the choice is remembered.
 * Apply a criterion and the toggle lights up with a count — a folded bar must
 * still say that it is filtering something.
 *
 * @module demo/filters/ToolbarDisclosureDemo
 */

import { useEffect , useState } from 'react' ;

import { useSearchParams } from 'next/navigation' ;

import UrlSearch         from '@/components/inputs/UrlSearch' ;
import ToolbarDisclosure from '@/components/panels/ToolbarDisclosure' ;

import useFilterParams from '@/hooks/useFilterParams' ;

import createStorageKey    from '@/helpers/storage/createStorageKey' ;
import getFiltersStorageKey from '@/helpers/storage/filtersStorageKey' ;
import getSearchStorageKey  from '@/helpers/storage/searchStorageKey' ;

import cn from '@/themes/helpers/cn' ;

/**
 * The persistence namespace of this demo.
 * @type {string}
 */
const PAGE_KEY = 'labToolbar' ;

/**
 * The one criterion of the folding bar.
 * @type {Object}
 */
const SHAPE = { name : 'labShape' , cookieKey : createStorageKey( 'labShape__' )( PAGE_KEY ) } ;

/**
 * The values it offers.
 * @type {string[]}
 */
const SHAPES = [ 'circle' , 'square' , 'triangle' ] ;

/**
 * Reads a cookie of this page, for display.
 *
 * @param {string} key
 * @returns {string}
 */
const readCookie = key =>
{
    const found = document.cookie.split( '; ' ).find( part => part.startsWith( `${ key }=` ) ) ;
    return found ? decodeURIComponent( found.slice( key.length + 1 ) ) : '—' ;
} ;

const ToolbarDisclosureDemo = () =>
{
    const searchParams = useSearchParams() ;

    const { pushParam } = useFilterParams( { pageKey : PAGE_KEY } ) ;

    const search = searchParams.get( 'search' ) ;
    const shape  = searchParams.get( SHAPE.name ) ;

    const activeCount = shape ? 1 : 0 ;

    // The cookies are read after the render : `document` does not exist on the server.
    const [ cookies , setCookies ] = useState( {} ) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: re-read at each URL change, which is when they have just been written.
    useEffect( () =>
    {
        setCookies
        ({
            filters : readCookie( getFiltersStorageKey( PAGE_KEY ) ) ,
            search  : readCookie( getSearchStorageKey( PAGE_KEY ) ) ,
        }) ;
    }
    , [ searchParams ] ) ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-6">

                <div className="flex flex-col gap-1">
                    <h2 className="card-title text-2xl">ToolbarDisclosure + UrlSearch</h2>
                    <p className="text-sm text-base-content/60">
                        Le champ reste, les critères se replient. Le texte cherché et l'état du repli
                        survivent à une navigation — l'un dans l'URL et un cookie, l'autre dans un cookie.
                    </p>
                </div>

                <ToolbarDisclosure
                    activeCount = { activeCount }
                    defaultOpen = { activeCount > 0 }
                    pageKey     = { PAGE_KEY }
                    search      = {
                        <UrlSearch
                            defaultValue = { search ?? '' }
                            pageKey      = { PAGE_KEY }
                            persist
                            size         = "sm"
                        />
                    }
                >
                    <div className="flex flex-wrap items-center gap-2 rounded-box bg-base-100 p-3">
                        { SHAPES.map( value =>
                            <button
                                key       = { value }
                                type      = "button"
                                className = { cn( 'btn btn-sm' , shape === value ? 'btn-primary' : 'btn-ghost' ) }
                                onClick   = { () => pushParam( { ...SHAPE , value : shape === value ? null : value } ) }
                            >
                                { value }
                            </button>
                        ) }
                    </div>
                </ToolbarDisclosure>

                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                    <dt className="text-base-content/50">?search=</dt>
                    <dd><code>{ search ?? '—' }</code></dd>
                    <dt className="text-base-content/50">search__{ PAGE_KEY }</dt>
                    <dd><code>{ cookies.search ?? '—' }</code></dd>
                    <dt className="text-base-content/50">filters__{ PAGE_KEY }</dt>
                    <dd><code>{ cookies.filters ?? '—' }</code></dd>
                </dl>

            </div>
        </div>
    ) ;
} ;

export default ToolbarDisclosureDemo ;
