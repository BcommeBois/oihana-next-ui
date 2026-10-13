'use client' ;

/**
 * FilterParamsDemo — `useFilterParams` on this very page : a criterion written
 * to the URL AND to a cookie in one gesture.
 *
 * Pick a shape, then a pattern : the address bar and the cookie below follow.
 * « Both » pushes the two parameters in ONE navigation (one history step), and
 * the `offset` added by « Page 3 » is dropped by any change — a list that
 * changed shape starts on page 1. « Clear » empties both.
 *
 * @module demo/filters/FilterParamsDemo
 */

import { useEffect , useState } from 'react' ;

import { useSearchParams } from 'next/navigation' ;

import Button from '@/components/Button' ;

import useFilterParams  from '@/hooks/useFilterParams' ;
import createStorageKey from '@/helpers/storage/createStorageKey' ;

/**
 * The persistence namespace of the lab page.
 * @type {string}
 */
const PAGE_KEY = 'labFilters' ;

/**
 * The two criteria : their URL parameter and their cookie family.
 * @type {Object}
 */
const SHAPE   = { name : 'shape'   , cookieKey : createStorageKey( 'shape__' )( PAGE_KEY ) } ;
const PATTERN = { name : 'pattern' , cookieKey : createStorageKey( 'pattern__' )( PAGE_KEY ) } ;

/**
 * The values offered.
 * @type {string[]}
 */
const SHAPES   = [ 'circle' , 'square' , 'triangle' ] ;
const PATTERNS = [ 'plain' , 'striped' , 'dotted' ] ;

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

const FilterParamsDemo = () =>
{
    const searchParams = useSearchParams() ;

    const { pushParam , pushParams , clearParams } = useFilterParams( { pageKey : PAGE_KEY } ) ;

    const shape   = searchParams.get( SHAPE.name ) ;
    const pattern = searchParams.get( PATTERN.name ) ;

    // The cookies are read after the render : `document` does not exist on the server.
    const [ cookies , setCookies ] = useState( {} ) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: re-read at each URL change, which is when the hook has just written them.
    useEffect( () =>
    {
        setCookies( { [ SHAPE.cookieKey ] : readCookie( SHAPE.cookieKey ) , [ PATTERN.cookieKey ] : readCookie( PATTERN.cookieKey ) } ) ;
    } , [ searchParams ] ) ;

    const choice = ( entry , value , current ) => (
        <Button
            active      = { value === current }
            activeColor = "primary"
            key         = { value }
            onClick     = { () => pushParam( { ...entry , value : value === current ? null : value } ) }
            size        = "xs"
            style       = { value === current ? undefined : 'outline' }
        >
            { value }
        </Button>
    ) ;

    const pageThree = () =>
    {
        const params = new URLSearchParams( searchParams.toString() ) ;
        params.set( 'offset' , '60' ) ;
        window.history.replaceState( null , '' , `?${ params.toString() }` ) ;
    } ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-3">

                <h2 className="card-title">useFilterParams</h2>

                <div className="flex flex-wrap items-center gap-1.5">
                    <span className="w-16 text-sm">shape</span>
                    { SHAPES.map( value => choice( SHAPE , value , shape ) ) }
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                    <span className="w-16 text-sm">pattern</span>
                    { PATTERNS.map( value => choice( PATTERN , value , pattern ) ) }
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick = { () => pushParams( [ { ...SHAPE , value : 'square' } , { ...PATTERN , value : 'dotted' } ] ) }
                        size    = "sm"
                    >
                        Les deux : square + dotted
                    </Button>
                    <Button onClick={ pageThree } size="sm">Page 3 (offset=60)</Button>
                    <Button className="text-error" onClick={ () => clearParams( [ SHAPE , PATTERN ] ) } size="sm" style="ghost">Effacer</Button>
                </div>

                <code className="rounded-box bg-base-100 p-2 text-xs">
                    { `URL : ?${ searchParams.toString() }` }
                    <br />
                    { `cookies : ${ JSON.stringify( cookies ) }` }
                </code>

            </div>
        </div>
    ) ;
} ;

FilterParamsDemo.displayName = 'FilterParamsDemo' ;

export default FilterParamsDemo ;
