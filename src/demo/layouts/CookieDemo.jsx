'use client' ;

/**
 * CookieDemo — a value written with `setCookie` comes back exactly as typed.
 *
 * The raw pair shows what travels : the value encoded. The server reads it
 * back decoded (`cookies().get( key ).value`) ; this page, being a client one,
 * decodes the raw pair itself to show the same thing.
 *
 * @module demo/layouts/CookieDemo
 */

import { useState } from 'react' ;

import removeCookie from '@/helpers/storage/removeCookie' ;
import setCookie    from '@/helpers/storage/setCookie' ;

/**
 * The cookie this demo writes.
 * @type {string}
 */
const KEY = 'lab__cookie' ;

/**
 * Samples that a raw write would have broken.
 * @type {string[]}
 */
const SAMPLES = [ '100%' , 'planche 2%' , 'a b' , 'x;y' , 'chêne' ] ;

/**
 * The raw `key=value` pair of the demo cookie, or `null`.
 *
 * @returns {?string}
 */
const readRaw = () =>
    document.cookie.split( '; ' ).find( pair => pair.startsWith( `${ KEY }=` ) ) ?? null ;

const CookieDemo = () =>
{
    const [ typed , setTyped ] = useState( SAMPLES[ 0 ] ) ;
    const [ raw   , setRaw   ] = useState( null ) ;

    const write = ( value ) =>
    {
        setTyped( value ) ;
        setCookie( KEY , value ) ;
        setRaw( readRaw() ) ;
    } ;

    const erase = () =>
    {
        removeCookie( KEY ) ;
        setRaw( readRaw() ) ;
    } ;

    const decoded = raw === null ? null : decodeURIComponent( raw.slice( KEY.length + 1 ) ) ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-4">

                <h2 className="card-title">Cookies : setCookie encode, la lecture rend la saisie</h2>

                <div className="flex flex-wrap gap-2">
                    { SAMPLES.map( sample => (
                        <button
                            key       = { sample }
                            className = { `btn btn-sm ${ sample === typed ? 'btn-primary' : '' }` }
                            onClick   = { () => write( sample ) }
                            type      = "button"
                        >
                            { sample }
                        </button>
                    ) ) }
                    <button className="btn btn-sm btn-ghost" onClick={ erase } type="button">removeCookie</button>
                </div>

                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                    <dt className="text-base-content/65">Saisi</dt>
                    <dd><code>{ JSON.stringify( typed ) }</code></dd>
                    <dt className="text-base-content/65">Cookie écrit</dt>
                    <dd><code>{ raw ?? '—' }</code></dd>
                    <dt className="text-base-content/65">Relu</dt>
                    <dd>
                        <code>{ decoded === null ? '—' : JSON.stringify( decoded ) }</code>
                        { decoded !== null && ( decoded === typed ? ' ✔︎ identique' : ' ✘ différent' ) }
                    </dd>
                </dl>

            </div>
        </div>
    ) ;
} ;

CookieDemo.displayName = 'CookieDemo' ;

export default CookieDemo ;
