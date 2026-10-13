'use client' ;

import { useMemo , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Badge            from '@/components/Badge' ;
import Divider          from '@/components/Divider' ;
import Kbd              from '@/components/Kbd' ;
import SegmentedControl from '@/components/SegmentedControl' ;

import CellGrid from '@/components/grids/CellGrid' ;

import useI18n from '@/contexts/locale/useI18n' ;

/** A deterministic number from a seed, so the plan is the same on the server and in the browser. */
const noise = seed =>
{
    const value = Math.sin( seed * 12.9898 + 78.233 ) * 43758.5453 ;
    return value - Math.floor( value ) ;
} ;

/** An aisle : 6 levels × 20 positions, a corridor at column 10, bins full, free, reserved or blocked. */
const AISLE = Array.from( { length : 6 } , ( _ , row ) =>
    Array.from( { length : 20 } , ( __ , col ) =>
    {
        if ( col === 10 ) return null ;

        const n = noise( row * 20 + col ) ;
        const state = n < 0.45 ? 'full' : n < 0.8 ? 'free' : n < 0.92 ? 'reserved' : 'blocked' ;

        return { badge : state === 'full' ? Math.ceil( n * 40 ) : undefined , col , id : `${ row }-${ col }` , row , state } ;
    } ) ).flat().filter( Boolean ) ;

/** A hall : a stage across the top, an empty row before the seats, 9 rows × 12 seats with an aisle in the middle. */
const HALL = [
    { col : 0 , id : 'stage' , row : 0 , span : { cols : 12 } , state : 'stage' , disabled : true } ,
    ...Array.from( { length : 9 } , ( _ , r ) =>
        Array.from( { length : 12 } , ( __ , col ) =>
        {
            if ( col === 5 || col === 6 ) return null ;

            const row = r + 2 ;
            const n   = noise( 1000 + row * 12 + col ) ;

            const taken = n < 0.35 ;

            return { col , disabled : taken , id : `${ row }-${ col }` , row , state : taken ? 'taken' : 'free' } ;
        } ) ).flat().filter( Boolean ) ,
] ;

/** A car park : 3 rows × 8 bays, some taken, with a plate. */
const PLATES = [ 'AB-123-CD' , 'EF-456-GH' , 'IJ-789-KL' , 'MN-012-OP' , 'QR-345-ST' , 'UV-678-WX' ] ;

const PARK = Array.from( { length : 3 } , ( _ , row ) =>
    Array.from( { length : 8 } , ( __ , col ) =>
    {
        const n = noise( 2000 + row * 8 + col ) ;
        return { col , id : `${ row }-${ col }` , plate : n < 0.5 ? PLATES[ Math.floor( n * 12 ) % PLATES.length ] : null , row , state : n < 0.5 ? 'taken' : 'free' } ;
    } ) ).flat() ;

const MODES = [ 'single' , 'multiple' , 'none' ] ;

/**
 * A warehouse : four aisles of bins (two faces each) around a central corridor, four docks on
 * the left, a receiving area at the bottom — 14 rows × 40 columns, every cell named as the
 * business names it.
 */
const HANGAR = ( () =>
{
    const cells = [] ;
    const zones = [] ;

    // The docks, left : one tall cell each.
    for ( let dock = 0 ; dock < 4 ; dock++ )
    {
        cells.push( { code : `Q${ dock + 1 }` , col : 0 , id : `dock-${ dock + 1 }` , row : dock * 3 , span : { cols : 2 , rows : 2 } , state : dock === 1 ? 'busy' : 'free' } ) ;
    }

    zones.push( { col : 0 , color : 'info' , id : 'docks' , label : 'Quais' , row : 0 , span : { cols : 2 , rows : 11 } } ) ;

    // A corridor of two columns between the two halves of an aisle.
    const WIDTH = 18 ;

    // Four aisles : two rows of bins each (the two faces), 16 positions, a corridor between the pairs.
    const aisles = [ [ 0 , 'H1' ] , [ 3 , 'H2' ] , [ 6 , 'H3' ] , [ 9 , 'H4' ] ] ;

    for ( const [ top , name ] of aisles )
    {
        zones.push( { col : 3 , color : name === 'H2' ? 'primary' : 'neutral' , id : name , label : `Allée ${ name }` , row : top , span : { cols : WIDTH , rows : 2 } } ) ;

        for ( let face = 0 ; face < 2 ; face++ )
        {
            for ( let position = 0 ; position < 16 ; position++ )
            {
                const col  = 3 + position + ( position >= 8 ? 2 : 0 ) ;
                const seed = noise( 5000 + top * 50 + face * 20 + position ) ;
                const code = `${ name }-${ String( position + 1 ).padStart( 2 , '0' ) }-${ face === 0 ? 'A' : 'B' }` ;

                cells.push( { badge : seed < 0.5 ? Math.ceil( seed * 30 ) : undefined , code , col , id : code , label : code.slice( 3 ) , row : top + face , state : seed < 0.5 ? 'full' : seed < 0.85 ? 'free' : 'blocked' } ) ;
            }
        }
    }

    // Receiving, at the bottom : six wide bays.
    zones.push( { col : 3 , color : 'success' , id : 'receiving' , label : 'Réception' , row : 12 , span : { cols : WIDTH , rows : 2 } } ) ;

    for ( let bay = 0 ; bay < 6 ; bay++ )
    {
        cells.push( { code : `REC-${ bay + 1 }` , col : 3 + bay * 3 , id : `rec-${ bay + 1 }` , row : 12 , span : { cols : 3 , rows : 2 } , state : bay < 2 ? 'busy' : 'free' } ) ;
    }

    return { cells , zones } ;
} )() ;

/**
 * CellGrid demo : an aisle plan, a hall, a car park.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.grids.cellGrid'] - Dot notation path to the demo locale.
 */
const CellGridDemo = ( { path = 'demo.grids.cellGrid' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ mode     , setMode     ] = useState( 'single' ) ;
    const [ selected , setSelected ] = useState( [] ) ;
    const [ seats    , setSeats    ] = useState( [ '4-3' , '4-4' ] ) ;
    const [ bin      , setBin      ] = useState( [] ) ;
    const [ zoom     , setZoom     ] = useState( 1 ) ;

    const aisleStates = useMemo( () => (
    {
        blocked  : { color : 'error'   , label : t.aisle?.states?.blocked } ,
        free     : { color : 'success' , label : t.aisle?.states?.free } ,
        full     : { color : 'warning' , label : t.aisle?.states?.full } ,
        reserved : { color : 'info'    , label : t.aisle?.states?.reserved } ,
    } ) , [ t.aisle?.states ] ) ;

    const hallStates = useMemo( () => (
    {
        free  : { color : 'success' , label : t.hall?.states?.free } ,
        stage : { color : 'neutral' , label : t.hall?.states?.stage } ,
        taken : { color : 'error'   , label : t.hall?.states?.taken } ,
    } ) , [ t.hall?.states ] ) ;

    const parkStates = useMemo( () => (
    {
        free  : { color : 'success' , label : t.park?.states?.free } ,
        taken : { color : 'neutral' , label : t.park?.states?.taken } ,
    } ) , [ t.park?.states ] ) ;

    const hall = useMemo( () => HALL.map( cell => ( seats.includes( cell.id ) ? { ...cell , state : 'chosen' } : cell ) ) , [ seats ] ) ;

    const hangarStates = useMemo( () => (
    {
        blocked : { color : 'error'   , label : t.hangar?.states?.blocked } ,
        busy    : { color : 'warning' , label : t.hangar?.states?.busy } ,
        free    : { color : 'success' , label : t.hangar?.states?.free } ,
        full    : { color : 'neutral' , label : t.hangar?.states?.full } ,
    } ) , [ t.hangar?.states ] ) ;

    const hangarZones = useMemo( () => HANGAR.zones.map( zone => ( { ...zone , label : t.hangar?.zones?.[ zone.id ] ?? zone.label } ) ) , [ t.hangar?.zones ] ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            {/* An aisle */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.aisle?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.aisle?.text }</p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{ t.aisle?.mode }</span>
                        <SegmentedControl ariaLabel={ t.aisle?.mode } items={ MODES.map( key => ( { key , label : t.aisle?.modes?.[ key ] ?? key } ) ) } onChange={ next => { setMode( next ) ; setSelected( [] ) ; } } value={ mode } />
                    </div>
                    <Badge style="ghost">{ format( t.aisle?.zoom ?? '{0}' , Math.round( zoom * 100 ) ) }</Badge>
                    <Badge style="ghost">{ selected.length > 0 ? format( t.aisle?.selected ?? '{0}' , selected.map( id => { const [ r , c ] = id.split( '-' ).map( Number ) ; return `${ 'ABCDEF'[ r ] }-${ String( c + 1 ).padStart( 2 , '0' ) }` ; } ).join( ', ' ) ) : t.aisle?.none }</Badge>
                </div>

                <CellGrid
                    ariaLabel    = { t.aisle?.title }
                    cells        = { AISLE }
                    className    = "h-72"
                    cols         = { 20 }
                    onChange     = { setSelected }
                    onZoomChange = { setZoom }
                    rows         = { 6 }
                    selectable   = { mode }
                    states       = { aisleStates }
                    value        = { selected }
                />

                <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/60">
                    <span>{ t.aisle?.keys }</span>
                    <Kbd keys={ [ '←' , '→' , '↑' , '↓' ] } separator="" size="sm" />
                    <Kbd size="sm">Home</Kbd>
                    <Kbd size="sm">End</Kbd>
                    <Kbd size="sm">Enter</Kbd>
                    <span>{ t.aisle?.zoomKeys }</span>
                    <Kbd keys={ [ 'Ctrl' , t.aisle?.wheel ] } size="sm" />
                </div>
            </section>

            <Divider />

            {/* A warehouse */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.hangar?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.hangar?.text }</p>

                <CellGrid
                    ariaLabel = { t.hangar?.title }
                    cellSize  = { 40 }
                    cells     = { HANGAR.cells }
                    className = "h-112"
                    cols      = { 21 }
                    onChange  = { setBin }
                    rows      = { 14 }
                    showAxes  = { false }
                    states    = { hangarStates }
                    value     = { bin }
                    zones     = { hangarZones }
                />
                <p className="text-xs text-base-content/60">{ bin.length > 0 ? format( t.hangar?.selected ?? '{0}' , bin[ 0 ] ) : t.hangar?.pick }</p>
            </section>

            <Divider />

            {/* A hall */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.hall?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.hall?.text }</p>

                <CellGrid
                    ariaLabel  = { t.hall?.title }
                    cellSize   = { 32 }
                    cells      = { hall }
                    className  = "h-[30rem]"
                    colLabels  = { Array.from( { length : 12 } , ( _ , index ) => index + 1 ) }
                    cols       = { 12 }
                    onChange   = { setSeats }
                    renderCell = { ( cell , { label } ) => ( cell.state === 'stage' ? <span className="text-xs uppercase tracking-widest">{ t.hall?.states?.stage }</span> : <span className="text-[10px]">{ label }</span> ) }
                    rowLabels  = { [ '' , '' , 'A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I' ] }
                    rows       = { 11 }
                    selectable = "multiple"
                    states     = { { ...hallStates , chosen : { color : 'primary' , label : t.hall?.states?.chosen } } }
                    value      = { seats }
                />
                <p className="text-xs text-base-content/60">{ seats.length > 0 ? format( t.hall?.chosen ?? '{0}' , seats.length ) : t.hall?.pick }</p>
            </section>

            <Divider />

            {/* A car park */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.park?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.park?.text }</p>

                <CellGrid
                    ariaLabel  = { t.park?.title }
                    cellSize   = { 64 }
                    cells      = { PARK.map( cell => ( { ...cell , badge : cell.plate ?? undefined } ) ) }
                    className  = "h-64"
                    cols       = { 8 }
                    renderCell = { ( cell , { coordinate } ) => (
                        <>
                            <span className="text-[10px] text-base-content/60">{ coordinate }</span>
                            { cell.plate && <span className="rounded bg-base-100 px-1 font-mono text-[10px] tracking-wider">{ cell.plate }</span> }
                        </>
                    ) }
                    rowLabels  = { [ 'P1' , 'P2' , 'P3' ] }
                    rows       = { 3 }
                    selectable = "none"
                    states     = { parkStates }
                    zoomable   = { false }
                />
            </section>

        </Container>
    ) ;
} ;

export default CellGridDemo ;
