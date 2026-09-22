'use client' ;

/**
 * PickersDemo — the choosing family : `PickerTrigger` in a form, and the modal
 * it opens.
 *
 *  - **Options held in hand** — 30 cities, searched in memory, accents folded :
 *    type `zurich`, `krakow` or a hidden airport code (`ZRH`). « None » is
 *    pinned.
 *  - **A collection** — 240 members on a fake server, searched there and loaded
 *    page by page, with an avatar, a « nobody » row and « the server fails ».
 *    Scroll down, then type : the list opens on its first results.
 *  - **A disabled field**, a `PickerOption` on its own, and the three sorts of
 *    choice card (radio, checkbox, button) on the same look.
 *
 * @module demo/pickers/PickersDemo
 */

import { useCallback , useRef , useState } from 'react' ;

import Avatar            from '@/components/avatars/Avatar' ;
import Badge             from '@/components/Badge' ;
import OptionPickerModal from '@/components/pickers/OptionPickerModal' ;
import PagedPickerModal  from '@/components/pickers/PagedPickerModal' ;
import PickerOption      from '@/components/pickers/PickerOption' ;
import PickerTrigger     from '@/components/pickers/PickerTrigger' ;

import getChoiceCardClasses from '@/themes/components/choiceCard' ;

/**
 * The value of the pinned « none » option.
 * @type {string}
 */
const NONE = 'none' ;

/**
 * The fake cities : name, country, airport code (searched, never shown), capital.
 * @type {Array<[string, string, string, boolean]>}
 */
const CITY_ROWS =
[
    [ 'Zürich'      , 'Suisse'      , 'ZRH' , false ] , [ 'Kraków'     , 'Pologne'     , 'KRK' , false ] ,
    [ 'Málaga'      , 'Espagne'     , 'AGP' , false ] , [ 'São Paulo'  , 'Brésil'      , 'GRU' , false ] ,
    [ 'Besançon'    , 'France'      , 'BSN' , false ] , [ 'Reykjavík'  , 'Islande'     , 'KEF' , true  ] ,
    [ 'Genève'      , 'Suisse'      , 'GVA' , false ] , [ 'Montréal'   , 'Canada'      , 'YUL' , false ] ,
    [ 'Bogotá'      , 'Colombie'    , 'BOG' , true  ] , [ 'Łódź'       , 'Pologne'     , 'LCJ' , false ] ,
    [ 'Köln'        , 'Allemagne'   , 'CGN' , false ] , [ 'Göteborg'   , 'Suède'       , 'GOT' , false ] ,
    [ 'Brasília'    , 'Brésil'      , 'BSB' , true  ] , [ 'Asunción'   , 'Paraguay'    , 'ASU' , true  ] ,
    [ 'Dubrovnik'   , 'Croatie'     , 'DBV' , false ] , [ 'Porto'      , 'Portugal'    , 'OPO' , false ] ,
    [ 'Nîmes'       , 'France'      , 'FNI' , false ] , [ 'Québec'     , 'Canada'      , 'YQB' , false ] ,
    [ 'Tromsø'      , 'Norvège'     , 'TOS' , false ] , [ 'Mérida'     , 'Mexique'     , 'MID' , false ] ,
    [ 'Ljubljana'   , 'Slovénie'    , 'LJU' , true  ] , [ 'Plzeň'      , 'Tchéquie'    , 'PRG' , false ] ,
    [ 'Tórshavn'    , 'Féroé'       , 'FAE' , true  ] , [ 'Hà Nội'     , 'Viêt Nam'    , 'HAN' , true  ] ,
    [ 'Düsseldorf'  , 'Allemagne'   , 'DUS' , false ] , [ 'Córdoba'    , 'Argentine'   , 'COR' , false ] ,
    [ 'Chișinău'    , 'Moldavie'    , 'KIV' , true  ] , [ 'Nouméa'     , 'France'      , 'NOU' , false ] ,
    [ 'Ålesund'     , 'Norvège'     , 'AES' , false ] , [ 'Luxembourg' , 'Luxembourg'  , 'LUX' , true  ] ,
] ;

/**
 * The fake options of the city picker.
 * @type {Object[]}
 */
const CITIES = CITY_ROWS.map( ( [ name , country , code , capital ] ) => (
{
    value    : code ,
    title    : name ,
    subtitle : country ,
    note     : capital ? 'Capitale' : undefined ,
    search   : `${ name } ${ country } ${ code }` ,
    badges   : capital ? <Badge color="info" size="xs" style="soft">Capitale</Badge> : undefined ,
} ) ) ;

/**
 * The first names and teams of the fake members.
 * @type {string[]}
 */
const FIRST_NAMES = [ 'Amélie' , 'Björn' , 'Chloé' , 'Dário' , 'Éloïse' , 'Noël' , 'Zoé' ] ;
const TEAMS       = [ 'Équipe Alpha' , 'Équipe Bêta' , 'Équipe Gamma' , 'Équipe Delta' ] ;

/**
 * The fake member directory.
 * @type {Object[]}
 */
const MEMBERS = Array.from( { length : 240 } , ( _ , index ) => (
{
    _key : `m${ index + 1 }` ,
    name : `${ FIRST_NAMES[ index % FIRST_NAMES.length ] } ${ index + 1 }` ,
    team : TEAMS[ index % TEAMS.length ] ,
} ) ) ;

/**
 * How long the fake server takes, in milliseconds.
 * @type {number}
 */
const LATENCY = 500 ;

/**
 * The initials of a name, for the avatar.
 *
 * @param {string} [name]
 * @returns {string}
 */
const initialsOf = ( name = '' ) => name.split( /\s+/ ).slice( 0 , 2 ).map( word => word.charAt( 0 ) ).join( '' ).toUpperCase() ;

const PickersDemo = () =>
{
    const [ picking  , setPicking  ] = useState( null ) ;
    const [ city     , setCity     ] = useState( NONE ) ;
    const [ member   , setMember   ] = useState( null ) ;
    const [ fail     , setFail     ] = useState( false ) ;
    const [ checked  , setChecked  ] = useState( 'radio' ) ;
    const [ ticked   , setTicked   ] = useState( true ) ;

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

    const picked = CITIES.find( option => option.value === city ) ;

    return (
        <div className="flex flex-col gap-6">

            <div className="card bg-base-200 shadow-xl">
                <div className="card-body gap-4">

                    <h2 className="card-title">PickerTrigger + OptionPickerModal</h2>

                    <PickerTrigger
                        badges      = { picked?.badges }
                        label       = "Ville"
                        note        = { picked?.note }
                        placeholder = "Aucune : le fuseau horaire par défaut"
                        subtitle    = { picked?.subtitle }
                        title       = { picked?.title }
                        onOpen      = { () => setPicking( 'city' ) }
                    />

                </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
                <div className="card-body gap-4">

                    <h2 className="card-title">PickerTrigger + PagedPickerModal</h2>

                    <label className="flex items-center gap-2 text-sm">
                        <input checked={ fail } className="toggle toggle-sm" onChange={ event => setFail( event.target.checked ) } type="checkbox" />
                        Le serveur échoue (à partir de la 2ᵉ page)
                    </label>

                    <PickerTrigger
                        label       = "Membre"
                        placeholder = "Personne"
                        subtitle    = { member?.team }
                        title       = { member?.name }
                        onOpen      = { () => setPicking( 'member' ) }
                    />

                    <PickerTrigger
                        disabled
                        label       = "Quartier"
                        placeholder = "Choisir d’abord une ville"
                        onOpen      = { () => {} }
                    />

                </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
                <div className="card-body gap-4">

                    <h2 className="card-title">PickerOption + choiceCard</h2>

                    <PickerOption
                        checked
                        badges   = { <Badge color="info" size="xs" style="soft">Capitale</Badge> }
                        name     = "standalone"
                        note     = "Hors modale : la ligne qu’un sélecteur aurait ouverte"
                        subtitle = "Islande"
                        title    = "Reykjavík"
                        onSelect = { () => {} }
                    />

                    <div className="grid gap-2 sm:grid-cols-3">

                        <label className={ getChoiceCardClasses( { checked : checked === 'radio' , className : 'flex items-center gap-3 p-2 text-sm' } ) }>
                            <input checked={ checked === 'radio' } className="radio radio-sm" name="choice-card" onChange={ () => setChecked( 'radio' ) } type="radio" />
                            Radio
                        </label>

                        <label className={ getChoiceCardClasses( { checked : ticked , className : 'flex items-center gap-3 p-2 text-sm' } ) }>
                            <input checked={ ticked } className="checkbox checkbox-sm" onChange={ () => setTicked( value => !value ) } type="checkbox" />
                            Case à cocher
                        </label>

                        <button
                            className = { getChoiceCardClasses( { checked : checked === 'button' , className : 'flex items-center gap-3 p-2 text-left text-sm' } ) }
                            type      = "button"
                            onClick   = { () => setChecked( 'button' ) }
                        >
                            Bouton
                        </button>

                        <button
                            disabled
                            className = { getChoiceCardClasses( { disabled : true , className : 'flex items-center gap-3 p-2 text-left text-sm' } ) }
                            type      = "button"
                        >
                            Indisponible
                        </button>

                    </div>

                </div>
            </div>

            { picking === 'city' && (
                <OptionPickerModal
                    name              = "demo-city"
                    options           = { CITIES }
                    pinned            = { [ { value : NONE , title : 'Aucune' , subtitle : 'Le fuseau horaire par défaut' } ] }
                    searchPlaceholder = "Rechercher une ville, un pays, un code d’aéroport"
                    title             = "Ville"
                    value             = { city }
                    onClose           = { () => setPicking( null ) }
                    onSelect          = { setCity }
                />
            ) }

            { picking === 'member' && (
                <PagedPickerModal
                    clearLabel     = "Personne"
                    loader         = { loader }
                    placeholder    = "Rechercher un membre"
                    renderAvatar   = { ( _row , title ) => (
                        <Avatar placeholder innerClassName="w-10 rounded-full bg-neutral text-neutral-content">
                            <span className="text-sm">{ initialsOf( title ) }</span>
                        </Avatar>
                    ) }
                    renderSubtitle = { row => row.team }
                    title          = "Membre"
                    value          = { member }
                    onClose        = { () => setPicking( null ) }
                    onSelect       = { setMember }
                />
            ) }

        </div>
    ) ;
} ;

PickersDemo.displayName = 'PickersDemo' ;

export default PickersDemo ;
