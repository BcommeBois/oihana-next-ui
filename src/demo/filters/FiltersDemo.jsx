'use client' ;

/**
 * FiltersDemo — three criteria of a filter bar.
 *
 *  - « Couleur » — `OptionFilterPicker multiple` : a draft, « Appliquer (n) »,
 *    the values emitted in the options' order, a count caption ;
 *  - « Pays » — `OptionFilterPicker`, single : a click applies and closes ;
 *    accents folded (`bresil` finds « Brésil ») ;
 *  - « Membre » — `RemoteFilterPicker` : five counted buckets open it, typing
 *    searches a fake server of 240 members page by page, « the server fails »
 *    breaks the second page.
 *
 * Each criterion names itself through `path` (`demo.filters.*`) and takes the
 * rest from `components.filter`. The line under the bar shows what each one
 * emitted.
 *
 * @module demo/filters/FiltersDemo
 */

import { useCallback , useRef , useState } from 'react' ;

import OptionFilterPicker from '@/components/filters/OptionFilterPicker' ;
import RemoteFilterPicker from '@/components/filters/RemoteFilterPicker' ;

import cn from '@/themes/helpers/cn' ;

/**
 * The fake colours, with how many items carry each.
 * @type {Object[]}
 */
const COLOURS =
[
    { id : 'red'    , name : 'Rouge'  , count : 1284 } ,
    { id : 'orange' , name : 'Orange' , count : 932  } ,
    { id : 'yellow' , name : 'Jaune'  , count : 611  } ,
    { id : 'green'  , name : 'Vert'   , count : 540  } ,
    { id : 'blue'   , name : 'Bleu'   , count : 377  } ,
    { id : 'indigo' , name : 'Indigo' , count : 96   } ,
    { id : 'violet' , name : 'Violet' , count : 41   } ,
    { id : 'x-17'   , name : null     , count : 3    } ,
] ;

/**
 * The fake countries.
 * @type {Object[]}
 */
const COUNTRIES = [ 'Allemagne' , 'Brésil' , 'Canada' , 'Colombie' , 'Croatie' , 'Espagne' , 'Féroé' , 'Islande' , 'Norvège' , 'Pérou' , 'Pologne' , 'Suède' , 'Tchéquie' , 'Viêt Nam' ]
    .map( ( name , index ) => ( { id : `c${ index + 1 }` , name , count : 10 + ( ( index * 37 ) % 90 ) } ) ) ;

/**
 * The first names of the fake members.
 * @type {string[]}
 */
const FIRST_NAMES = [ 'Amélie' , 'Björn' , 'Chloé' , 'Dário' , 'Éloïse' , 'Noël' , 'Zoé' ] ;

/**
 * The fake member directory.
 * @type {Object[]}
 */
const MEMBERS = Array.from( { length : 240 } , ( _ , index ) => ( { _key : `m${ index + 1 }` , name : `${ FIRST_NAMES[ index % FIRST_NAMES.length ] } ${ index + 1 }` } ) ) ;

/**
 * The counted opening listing of « Membre ».
 * @type {Object[]}
 */
const BUCKETS = MEMBERS.slice( 0 , 5 ).map( ( member , index ) => ( { value : member._key , label : member.name , count : 80 - index * 13 } ) ) ;

/**
 * How long the fake server takes, in milliseconds.
 * @type {number}
 */
const LATENCY = 500 ;

const FiltersDemo = () =>
{
    const colourRef  = useRef( null ) ;
    const countryRef = useRef( null ) ;
    const memberRef  = useRef( null ) ;

    const [ open    , setOpen    ] = useState( null ) ;
    const [ colours , setColours ] = useState( [] ) ;
    const [ country , setCountry ] = useState( null ) ;
    const [ member  , setMember  ] = useState( null ) ;
    const [ fail    , setFail    ] = useState( false ) ;

    const failRef = useRef( fail ) ;
    failRef.current = fail ;

    const loader = useCallback( async ( { search , limit , offset } ) =>
    {
        await new Promise( resolve => setTimeout( resolve , LATENCY ) ) ;
        if ( failRef.current && offset > 0 ) { throw new Error( 'The server failed' ) ; }
        const query    = search.trim().toLowerCase() ;
        const matching = MEMBERS.filter( row => row.name.toLowerCase().includes( query ) ) ;
        return { result : matching.slice( offset , offset + limit ) , total : matching.length } ;
    } , [] ) ;

    const toggle = ( id ) => setOpen( current => ( current === id ? null : id ) ) ;
    const close  = () => setOpen( null ) ;

    const trigger = ( id , ref , label , active ) => (
        <button
            ref       = { ref }
            type      = "button"
            className = { cn( 'btn btn-sm' , active ? 'btn-primary' : 'btn-outline' ) }
            onClick   = { () => toggle( id ) }
        >
            { label }
        </button>
    ) ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-4">

                <h2 className="card-title">OptionFilterPicker · RemoteFilterPicker</h2>

                <div className="flex flex-wrap items-center gap-2">
                    { trigger( 'colour'  , colourRef  , colours.length > 0 ? `Couleur · ${ colours.length }` : 'Couleur' , colours.length > 0 ) }
                    { trigger( 'country' , countryRef , country ? `Pays · ${ COUNTRIES.find( item => item.id === country )?.name }` : 'Pays' , !!country ) }
                    { trigger( 'member'  , memberRef  , member ? `Membre · ${ MEMBERS.find( item => item._key === member )?.name }` : 'Membre' , !!member ) }
                </div>

                <label className="flex items-center gap-2 text-sm">
                    <input checked={ fail } className="toggle toggle-sm" onChange={ event => setFail( event.target.checked ) } type="checkbox" />
                    Le serveur échoue (à partir de la 2ᵉ page de « Membre »)
                </label>

                <code className="rounded-box bg-base-100 p-2 text-xs">
                    { JSON.stringify( { colours , country , member } ) }
                </code>

                <OptionFilterPicker
                    multiple
                    anchorRef    = { colourRef }
                    countCaption = "Articles"
                    isOpen       = { open === 'colour' }
                    options      = { COLOURS }
                    path         = "demo.filters.colour"
                    selectedIds  = { colours }
                    onApply      = { setColours }
                    onClose      = { close }
                />

                <OptionFilterPicker
                    anchorRef  = { countryRef }
                    isOpen     = { open === 'country' }
                    options    = { COUNTRIES }
                    path       = "demo.filters.country"
                    selectedId = { country }
                    onClose    = { close }
                    onSelect   = { setCountry }
                />

                <RemoteFilterPicker
                    anchorRef  = { memberRef }
                    buckets    = { BUCKETS }
                    isOpen     = { open === 'member' }
                    loader     = { loader }
                    path       = "demo.filters.member"
                    selectedId = { member }
                    onClose    = { close }
                    onSelect   = { setMember }
                />

            </div>
        </div>
    ) ;
} ;

FiltersDemo.displayName = 'FiltersDemo' ;

export default FiltersDemo ;
