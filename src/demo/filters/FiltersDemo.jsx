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
 *  - « Statut » — `ChecklistPanel` without a search (seven values one reads
 *    whole), each with the colour dot of its badge ;
 *  - « Étiquette » — `ChecklistPanel` over 120 labels shown 25 at a time, and
 *    a « No label » value pinned under the list ;
 *  - « Taille » — `ChecklistPanel` whose `header` (a fit) belongs to
 *    the same draft : « Effacer » resets it, closing without applying forgets it.
 *
 * Each criterion names itself through `path` (`demo.filters.*`) and takes the
 * rest from `components.filter`. The line under the bar shows what each one
 * emitted.
 *
 * @module demo/filters/FiltersDemo
 */

import { useCallback , useRef , useState } from 'react' ;

import ChecklistPanel     from '@/components/filters/ChecklistPanel' ;
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
 * The fake statuses, with the colour of their badge.
 * @type {Object[]}
 */
const STATUSES =
[
    { id : 'todo'      , name : 'À faire'    , count : 12 , color : '#94a3b8' } ,
    { id : 'doing'     , name : 'En cours'   , count : 48 , color : '#38bdf8' } ,
    { id : 'review'    , name : 'En revue'   , count : 31 , color : '#818cf8' } ,
    { id : 'done'      , name : 'Terminé'    , count : 27 , color : '#34d399' } ,
    { id : 'blocked'   , name : 'Bloqué'     , count : 9  , color : '#f87171' } ,
    { id : 'paused'    , name : 'En pause'   , count : 5  , color : '#fbbf24' } ,
    { id : 'archived'  , name : 'Archivé'    , count : 64 , color : '#a8a29e' } ,
] ;

/**
 * The fake labels : enough of them to be shown by slices.
 * @type {Object[]}
 */
const LABELS = Array.from( { length : 120 } , ( _ , index ) => ( { id : `l${ index + 1 }` , name : `Étiquette n° ${ index + 1 }` , count : 500 - index * 4 } ) ) ;

/**
 * The value of « no label ».
 * @type {string}
 */
const NO_LABEL = 'none' ;

/**
 * The fake sizes.
 * @type {Object[]}
 */
const SIZES = [ 'XS' , 'S' , 'M' , 'L' , 'XL' ].map( ( name , index ) => ( { id : name.toLowerCase() , name , count : 20 + index * 7 } ) ) ;

/**
 * The fits of « Taille », and the default one.
 * @type {Object[]}
 */
const FITS = [ { id : 'any' , name : 'Toutes' } , { id : 'slim' , name : 'Ajustée' } , { id : 'loose' , name : 'Ample' } ] ;
const ANY            = 'any' ;

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

    const [ statuses , setStatuses ] = useState( [] ) ;
    const [ tags     , setTags     ] = useState( [] ) ;
    const [ sizes    , setSizes    ] = useState( [] ) ;
    const [ fit    , setFit    ] = useState( ANY ) ;
    const [ draftFit , setDraftFit ] = useState( ANY ) ;

    const statusRef = useRef( null ) ;
    const labelRef  = useRef( null ) ;
    const sizeRef   = useRef( null ) ;

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
                    { trigger( 'status'  , statusRef  , statuses.length > 0 ? `Statut · ${ statuses.length }` : 'Statut' , statuses.length > 0 ) }
                    { trigger( 'label'   , labelRef   , tags.length > 0 ? `Étiquette · ${ tags.length }` : 'Étiquette' , tags.length > 0 ) }
                    { trigger( 'size'    , sizeRef    , sizes.length > 0 || fit !== ANY ? `Taille · ${ sizes.length }` : 'Taille' , sizes.length > 0 || fit !== ANY ) }
                </div>

                <label className="flex items-center gap-2 text-sm">
                    <input checked={ fail } className="toggle toggle-sm" onChange={ event => setFail( event.target.checked ) } type="checkbox" />
                    Le serveur échoue (à partir de la 2ᵉ page de « Membre »)
                </label>

                <code className="rounded-box bg-base-100 p-2 text-xs">
                    { JSON.stringify( { colours , country , member , statuses , tags , sizes , fit } ) }
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

                <ChecklistPanel
                    anchorRef   = { statusRef }
                    isOpen      = { open === 'status' }
                    options     = { STATUSES }
                    panelHeight = { 360 }
                    path        = "demo.filters.status"
                    selectedIds = { statuses }
                    showSearch  = { false }
                    onApply     = { setStatuses }
                    onClose     = { close }
                />

                <ChecklistPanel
                    anchorRef     = { labelRef }
                    extraOptions  = { [ { id : NO_LABEL , name : 'Sans étiquette' , count : 17 } ] }
                    isOpen        = { open === 'label' }
                    listClassName = "md:max-h-64"
                    options       = { LABELS }
                    pageSize      = { 25 }
                    path          = "demo.filters.label"
                    selectedIds   = { tags }
                    onApply       = { setTags }
                    onClose       = { close }
                />

                <ChecklistPanel
                    anchorRef     = { sizeRef }
                    extraDirty    = { draftFit !== ANY }
                    isOpen        = { open === 'size' }
                    listClassName = "md:max-h-56"
                    options       = { SIZES }
                    panelHeight   = { 460 }
                    path          = "demo.filters.size"
                    selectedIds   = { sizes }
                    showSearch    = { false }
                    header        = {
                        <div className="flex flex-col gap-0.5 border-b border-base-300/60 p-2">
                            <p className="px-1 pb-1 text-xs font-medium text-base-content/50">Coupe</p>
                            { FITS.map( item => (
                                <label key={ item.id } className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-base-200/50">
                                    <input
                                        checked   = { draftFit === item.id }
                                        className = "radio radio-sm radio-primary"
                                        name      = "demo-fit"
                                        type      = "radio"
                                        onChange  = { () => setDraftFit( item.id ) }
                                    />
                                    { item.name }
                                </label>
                            ) ) }
                        </div>
                    }
                    onApply       = { ids => { setSizes( ids ) ; setFit( draftFit ) ; } }
                    onClear       = { () => setDraftFit( ANY ) }
                    onClose       = { close }
                    onOpen        = { () => setDraftFit( fit ) }
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
