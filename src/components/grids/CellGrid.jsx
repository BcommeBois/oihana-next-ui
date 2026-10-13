'use client' ;

/**
 * CellGrid — a plan made of cells : the bins of an aisle, the bays of a car
 * park, the seats of a hall, the tables of a room. Each cell has a state
 * the application names and colours ; the plan is pinched to zoom, dragged
 * to move, walked with the arrow keys, and read aloud cell by cell.
 *
 * The library knows nothing of what a cell is : `cells` carry a `state`,
 * `states` say what each state is called and which colour it wears — a
 * light ground and a border in that colour, the text staying the theme's.
 * A position with no cell is a gap, a corridor ; a cell may `span` several.
 * **`zones`** name the parts of a larger plan — an aisle, the docks, the
 * receiving area — as rectangles drawn under the cells, an aid to reading
 * and nothing more ; a cell's **`code`** is then its name in the business
 * (« H2-04-B », « Dock 3 ») in place of the computed coordinate, and
 * `showAxes` turns the global letters and numbers off where they mean
 * nothing.
 *
 * 🔑 **A plan of 8 × 40 does not fit a phone** : the plan lives in a
 * viewport, pinched to zoom and dragged to move, with `+` / `−` / « Fit »
 * buttons and Ctrl + wheel at a desk ; `fit` opens it at the zoom that
 * shows its whole width. A tap is still a tap : the pointer is captured
 * only once it has travelled.
 *
 * **Keyboard and reader** : a `grid` of `row`s and `gridcell`s, one cell
 * focused at a time, the arrows walking the plane and skipping the gaps,
 * Home / End along the row, Enter or Space selecting ; every cell is named
 * « A-07, Full, 12 » — its coordinate, its state, its badge.
 *
 * @module components/grids/CellGrid
 *
 * @typedef {Object} Cell
 * @property {string} id
 * @property {number} row - 0-based.
 * @property {number} col - 0-based.
 * @property {string} [state] - A key of `states`.
 * @property {string} [code] - The cell's own coordinate (« H2-04-B »), in place of the computed one : the default label, and the name a reader hears.
 * @property {React.ReactNode} [label] - Shown in the cell. Defaults to `code`, then the coordinate.
 * @property {React.ReactNode} [badge] - A small figure under the label.
 * @property {{ rows ?: number , cols ?: number }} [span]
 * @property {boolean} [disabled] - Shown with its state, but not selectable, not reached by the arrows, `aria-disabled` : a seat already taken, a bin out of use. It may still be in `value` — a seat of the viewer's own, locked.
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - The grid's name. Defaults to the bundle's « Plan ».
 * @param {number} [props.cellSize=44] - The side of a cell, in pixels — 44 is the least a finger wants.
 * @param {Cell[]} [props.cells=[]]
 * @param {string} [props.className] - Classes on the viewport ; set its height here (`h-80` by default).
 * @param {Array<React.ReactNode>} [props.colLabels] - The columns' names, for the axis and the coordinates. Defaults to 1, 2, 3…
 * @param {number} props.cols
 * @param {number} [props.defaultZoom] - The zoom at first (uncontrolled). Without one, `fit` decides.
 * @param {string[]} [props.defaultValue=[]] - The selected ids at first.
 * @param {boolean} [props.fit=true] - Open at the zoom that shows the plan's whole width.
 * @param {number} [props.gap=4] - Between two cells, in pixels.
 * @param {boolean} [props.legend=true] - The states, under the plan.
 * @param {number} [props.maxZoom=3]
 * @param {number} [props.minZoom=0.25]
 * @param {Function} [props.onCellClick] - `( cell ) => void`.
 * @param {Function} [props.onChange] - `( ids ) => void` when the selection changes.
 * @param {Function} [props.onZoomChange] - `( zoom ) => void`.
 * @param {string} [props.path='components.cellGrid'] - i18n path the words are read from.
 * @param {Function} [props.renderCell] - `( cell , { label , coordinate } ) => React.ReactNode`, in place of the label and badge.
 * @param {Array<React.ReactNode>} [props.rowLabels] - The rows' names. Defaults to A, B, C…
 * @param {number} props.rows
 * @param {'none'|'single'|'multiple'} [props.selectable='single']
 * @param {boolean} [props.showAxes=true] - The rows' and columns' names along the edges. Off for a plan of zones, where a global letter means nothing.
 * @param {Object.<string,{ color : import('../../themes/components/cellGrid').CellColor , label : React.ReactNode }>} [props.states={}]
 * @param {string[]} [props.value] - The selected ids (controlled).
 * @param {number} [props.zoom] - The zoom (controlled).
 * @param {boolean} [props.zoomable=true] - Pinch, drag, wheel and the buttons.
 * @param {Array<{ id : string , label : React.ReactNode , row : number , col : number , span : { rows ?: number , cols ?: number } , color ?: import('../../themes/components/cellGrid').CellColor }>} [props.zones=[]] - Named rectangles drawn under the cells, not interactive. A zone keeps a band above its cells for its name : leave a row between two zones stacked, or the name sits on the cells above.
 *
 * @example
 * ```jsx
 * <CellGrid
 *     cells  = { bins.map( bin => ( { badge : bin.parcels , col : bin.col , id : bin.code , row : bin.row , state : bin.parcels ? 'full' : 'free' } ) ) }
 *     cols   = { 20 }
 *     rows   = { 6 }
 *     states = { { free : { color : 'success' , label : 'Free' } , full : { color : 'warning' , label : 'Full' } } }
 *     onChange = { ( [ id ] ) => open( id ) }
 * />
 * ```
 */

import { useCallback , useEffect , useId , useMemo , useRef , useState } from 'react' ;

import { MdFitScreen , MdZoomIn , MdZoomOut } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Button from '../Button' ;

import useValue from '../../hooks/useValue' ;

import cellRect , { planeSize }                           from '../../helpers/grids/cellRect' ;
import nextCell                                           from '../../helpers/grids/nextCell' ;
import pinchScale , { clampOffset , zoomAround }          from '../../helpers/grids/pinchScale' ;

import { CELL_ACTIVE , CELL_BASE , CELL_COLORS , CELL_DISABLED , CELL_PLAIN , CELL_SELECTED , SWATCH_COLORS , ZONE_COLORS , ZONE_PLAIN } from '../../themes/components/cellGrid' ;

import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useI18n   from '../../contexts/locale/useI18n' ;

import cn from '../../themes/helpers/cn' ;

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ;

/** A, B … Z, AA, AB … */
const letter = index => ( index < 26 ? LETTERS[ index ] : letter( Math.floor( index / 26 ) - 1 ) + LETTERS[ index % 26 ] ) ;

/** The air around the plan, in pixels : the ring of a selected cell on an edge needs it. */
const PAD = 20 ;

/** The band the axis labels take, after the air. */
const AXES = 24 ;

/** The band a zone keeps above its cells for its name, and the air it keeps around them. */
const ZONE_HEAD = 16 ;
const ZONE_PAD  = 8 ;

const ZOOM_STEP = 1.25 ;

const distance = ( a , b ) => Math.hypot( a.x - b.x , a.y - b.y ) ;

const CellGrid =
({
    ariaLabel ,
    cellSize = 44 ,
    cells = [] ,
    className ,
    colLabels ,
    cols ,
    defaultValue = [] ,
    defaultZoom ,
    fit = true ,
    gap = 4 ,
    legend = true ,
    maxZoom = 3 ,
    minZoom = 0.25 ,
    onCellClick ,
    onChange ,
    onZoomChange ,
    path = 'components.cellGrid' ,
    renderCell ,
    rowLabels ,
    rows ,
    selectable = 'single' ,
    showAxes = true ,
    states = {} ,
    value : valueFromProps ,
    zoom : zoomFromProps ,
    zoomable = true ,
    zones = [] ,
}) =>
{
    // Where the cells start : after the air, the axes' band when they are shown, and — down — the
    // band the first zone keeps for its name.
    const head    = zones.length > 0 ? ZONE_HEAD + ZONE_PAD : 0 ;
    const gutterX = showAxes ? PAD + AXES : PAD ;
    const gutterY = ( showAxes ? PAD + AXES : PAD ) + head ;

    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const [ selected , setSelected ] = useValue( defaultValue , valueFromProps , onChange ) ;
    const [ zoom     , setZoom     ] = useValue( defaultZoom ?? 1 , zoomFromProps , onZoomChange ) ;

    const id = useId() ;

    const viewport = useRef( null ) ;
    const buttons  = useRef( new Map() ) ;

    const [ size   , setSize   ] = useState( { height : 0 , width : 0 } ) ;
    const [ offset , setOffset ] = useState( { x : 0 , y : 0 } ) ;
    const [ focus  , setFocus  ] = useState( null ) ;

    const plane = useMemo( () => planeSize( rows , cols , { cellSize , gap } ) , [ cellSize , cols , gap , rows ] ) ;

    // The plan width the zoom was last fitted to : a plan that changed size is fitted again.
    const fittedFor = useRef( null ) ;

    const edge = zones.length > 0 ? ZONE_PAD : gap ;

    const full = { height : plane.height + gutterY + PAD + edge , width : plane.width + gutterX + PAD + edge } ;

    const coordinate = useCallback( cell => cell.code ?? `${ rowLabels?.[ cell.row ] ?? letter( cell.row ) }-${ colLabels?.[ cell.col ] ?? String( cell.col + 1 ).padStart( 2 , '0' ) }` , [ colLabels , rowLabels ] ) ;

    // The viewport's size, and the zoom that fits the plan in it at first.
    useEffect( () =>
    {
        const node = viewport.current ;

        if ( !node || typeof ResizeObserver === 'undefined' )
        {
            return undefined ;
        }

        const observer = new ResizeObserver( entries =>
        {
            const { height , width } = entries[ 0 ].contentRect ;
            setSize( { height : Math.round( height ) , width : Math.round( width ) } ) ;
        } ) ;

        observer.observe( node ) ;

        return () => observer.disconnect() ;
    }
    , [] ) ;

    // The zoom that shows the whole plan : the tighter of the two ratios.
    const fitZoom = useCallback( () =>
    {
        const ratio = size.width > 0 && size.height > 0 ? Math.min( size.width / full.width , size.height / full.height ) : 1 ;
        return Math.min( maxZoom , Math.max( minZoom , ratio ) ) ;
    }
    , [ full.height , full.width , maxZoom , minZoom , size.height , size.width ] ) ;

    useEffect( () =>
    {
        if ( fit && fittedFor.current !== full.width && size.width > 0 && zoomFromProps === undefined && defaultZoom === undefined )
        {
            fittedFor.current = full.width ;
            setZoom( Math.min( 1 , fitZoom() ) ) ;
        }
    }
    , [ defaultZoom , fit , fitZoom , full.width , setZoom , size.width , zoomFromProps ] ) ;

    const scaledWidth  = full.width * zoom ;
    const scaledHeight = full.height * zoom ;

    const place = useCallback( next => setOffset( clampOffset( next , { height : scaledHeight , width : scaledWidth } , size ) ) , [ scaledHeight , scaledWidth , size ] ) ;

    // Keep the plane in sight whenever the zoom or the viewport changes.
    useEffect( () => { setOffset( current => clampOffset( current , { height : scaledHeight , width : scaledWidth } , size ) ) ; } , [ scaledHeight , scaledWidth , size ] ) ;

    const zoomTo = ( next , around ) =>
    {
        const target = Math.min( maxZoom , Math.max( minZoom , next ) ) ;
        const point  = around ?? { x : size.width / 2 , y : size.height / 2 } ;

        setOffset( current => clampOffset( zoomAround( current , point , zoom , target ) , { height : full.height * target , width : full.width * target } , size ) ) ;
        setZoom( target ) ;
    } ;

    // --- pointers : one drags, two pinch
    const pointers = useRef( new Map() ) ;
    const gesture  = useRef( null ) ;

    const onPointerDown = event =>
    {
        if ( !zoomable || event.button > 0 )
        {
            return ;
        }

        pointers.current.set( event.pointerId , { x : event.clientX , y : event.clientY } ) ;

        const list = [ ...pointers.current.values() ] ;

        if ( list.length === 1 )
        {
            gesture.current = { captured : false , from : offset , kind : 'drag' , start : list[ 0 ] } ;
        }
        else if ( list.length === 2 )
        {
            const rect = event.currentTarget.getBoundingClientRect() ;
            gesture.current = { captured : true , distance : distance( list[ 0 ] , list[ 1 ] ) , from : offset , kind : 'pinch' , mid : { x : ( list[ 0 ].x + list[ 1 ].x ) / 2 - rect.left , y : ( list[ 0 ].y + list[ 1 ].y ) / 2 - rect.top } , scale : zoom } ;
            event.currentTarget.setPointerCapture( event.pointerId ) ;
        }
    } ;

    const onPointerMove = event =>
    {
        if ( !pointers.current.has( event.pointerId ) || !gesture.current )
        {
            return ;
        }

        pointers.current.set( event.pointerId , { x : event.clientX , y : event.clientY } ) ;

        const list = [ ...pointers.current.values() ] ;
        const g    = gesture.current ;

        if ( g.kind === 'pinch' && list.length >= 2 )
        {
            const next = pinchScale( g.distance , distance( list[ 0 ] , list[ 1 ] ) , g.scale , { max : maxZoom , min : minZoom } ) ;

            setOffset( clampOffset( zoomAround( g.from , g.mid , g.scale , next ) , { height : full.height * next , width : full.width * next } , size ) ) ;
            setZoom( next ) ;
            return ;
        }

        if ( g.kind === 'drag' )
        {
            const dx = list[ 0 ].x - g.start.x ;
            const dy = list[ 0 ].y - g.start.y ;

            // A tap stays a tap : the pointer is taken only once it has travelled.
            if ( !g.captured && Math.hypot( dx , dy ) < 6 )
            {
                return ;
            }

            if ( !g.captured )
            {
                g.captured = true ;
                event.currentTarget.setPointerCapture( event.pointerId ) ;
            }

            place( { x : g.from.x + dx , y : g.from.y + dy } ) ;
        }
    } ;

    const onPointerEnd = event =>
    {
        pointers.current.delete( event.pointerId ) ;

        if ( pointers.current.size === 0 )
        {
            gesture.current = null ;
        }
        else if ( pointers.current.size === 1 )
        {
            // One finger left after a pinch : it drags from here.
            const [ rest ] = [ ...pointers.current.values() ] ;
            gesture.current = { captured : true , from : offset , kind : 'drag' , start : rest } ;
        }
    } ;

    const onWheel = event =>
    {
        if ( !zoomable || !event.ctrlKey )
        {
            return ;
        }

        event.preventDefault() ;

        const rect = event.currentTarget.getBoundingClientRect() ;

        zoomTo( zoom * ( event.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP ) , { x : event.clientX - rect.left , y : event.clientY - rect.top } ) ;
    } ;

    // Ctrl + wheel must be stopped before the browser zooms the page : a passive listener cannot.
    useEffect( () =>
    {
        const node = viewport.current ;

        if ( !node || !zoomable )
        {
            return undefined ;
        }

        const handler = event => { if ( event.ctrlKey ) event.preventDefault() ; } ;

        node.addEventListener( 'wheel' , handler , { passive : false } ) ;

        return () => node.removeEventListener( 'wheel' , handler ) ;
    }
    , [ zoomable ] ) ;

    // --- selection
    const toggle = cell =>
    {
        if ( cell.disabled )
        {
            return ;
        }

        onCellClick?.( cell ) ;

        if ( selectable === 'none' )
        {
            return ;
        }

        const current = selected ?? [] ;
        const has     = current.includes( cell.id ) ;

        if ( selectable === 'single' )
        {
            setSelected( has ? [] : [ cell.id ] ) ;
        }
        else
        {
            setSelected( has ? current.filter( item => item !== cell.id ) : [ ...current , cell.id ] ) ;
        }
    } ;

    // --- keyboard
    const firstFocusable = cells.find( cell => !cell.disabled )?.id ?? null ;
    const focused        = focus ?? firstFocusable ;

    const onKeyDown = event =>
    {
        const from = cells.find( cell => cell.id === focused ) ;

        if ( !from )
        {
            return ;
        }

        if ( event.key === 'Enter' || event.key === ' ' )
        {
            event.preventDefault() ;
            toggle( from ) ;
            return ;
        }

        const next = nextCell( from , event.key , { cells , cols , rows } ) ;

        if ( next )
        {
            event.preventDefault() ;
            setFocus( next.id ) ;
            buttons.current.get( next.id )?.focus() ;
        }
    } ;

    const stateOf = cell => states[ cell.state ] ;

    return (
        <div className="flex flex-col gap-2">
            { zoomable && (
                <div className="flex justify-end gap-1" role="toolbar">
                    <Button icon={ MdZoomOut } onClick={ () => zoomTo( zoom / ZOOM_STEP ) } shape="square" size="sm" style="ghost" title={ labels.zoomOut } tooltip={ labels.zoomOut } />
                    <Button icon={ MdZoomIn } onClick={ () => zoomTo( zoom * ZOOM_STEP ) } shape="square" size="sm" style="ghost" title={ labels.zoomIn } tooltip={ labels.zoomIn } />
                    <Button icon={ MdFitScreen } onClick={ () => { const next = Math.min( 1 , fitZoom() ) ; setOffset( clampOffset( { x : 0 , y : 0 } , { height : full.height * next , width : full.width * next } , size ) ) ; setZoom( next ) ; } } shape="square" size="sm" style="ghost" title={ labels.fit } tooltip={ labels.fit } tooltipAlign="end" />
                </div>
            ) }

            <div className="relative">
                {/* biome-ignore lint/a11y/useSemanticElements: an interactive ARIA grid of positioned cells, not tabular data — a <table> would lay it out as one. */}
                <div
                    aria-label      = { ariaLabel ?? labels.label }
                    className       = { cn( 'relative h-80 w-full overflow-hidden rounded-box border border-base-300 bg-base-100' , zoomable && 'cursor-grab active:cursor-grabbing' , className ) }
                    onKeyDown       = { onKeyDown }
                    onPointerCancel = { onPointerEnd }
                    onPointerDown   = { onPointerDown }
                    onPointerMove   = { onPointerMove }
                    onPointerUp     = { onPointerEnd }
                    onWheel         = { onWheel }
                    ref             = { viewport }
                    role            = "grid"
                    style           = { { touchAction : zoomable ? 'none' : undefined } }
                >
                    <div
                        className = "absolute left-0 top-0 origin-top-left"
                        style     = { { height : full.height , transform : `translate(${ offset.x }px, ${ offset.y }px) scale(${ zoom })` , width : full.width } }
                    >
                        {/* The zones : named grounds under the cells, read by no one — the cells carry the words. */}
                        { zones.map( zone =>
                        {
                            const rect = cellRect( zone , { cellSize , gap } ) ;

                            return (
                                <div
                                    aria-hidden = "true"
                                    className   = { cn( 'absolute rounded-box border border-dashed' , ZONE_COLORS[ zone.color ] ?? ZONE_PLAIN ) }
                                    key         = { zone.id }
                                    style       = { { height : rect.height + 2 * ZONE_PAD + ZONE_HEAD , left : gutterX + rect.x - ZONE_PAD , top : gutterY + rect.y - ZONE_PAD - ZONE_HEAD , width : rect.width + 2 * ZONE_PAD } }
                                >
                                    <span className="absolute left-1.5 top-0.5 text-[10px] font-medium uppercase tracking-wide text-base-content/60" style={ { lineHeight : `${ ZONE_HEAD - 2 }px` } }>{ zone.label }</span>
                                </div>
                            ) ;
                        } ) }

                        {/* The axes : a position is its own identity here. */}
                        { showAxes && <div aria-hidden="true" className="absolute left-0 top-0 text-[10px] text-base-content/60">
                            { Array.from( { length : cols } , ( _ , col ) => (
                                // biome-ignore lint/suspicious/noArrayIndexKey: the column number is the label's identity.
                                <span className="absolute flex items-center justify-center" key={ col } style={ { height : AXES - gap , left : gutterX + col * ( cellSize + gap ) , top : PAD , width : cellSize } }>{ colLabels?.[ col ] ?? col + 1 }</span>
                            ) ) }
                            { Array.from( { length : rows } , ( _ , row ) => (
                                // biome-ignore lint/suspicious/noArrayIndexKey: the row number is the label's identity.
                                <span className="absolute flex items-center justify-center" key={ row } style={ { height : cellSize , left : PAD , top : gutterY + row * ( cellSize + gap ) , width : AXES - gap } }>{ rowLabels?.[ row ] ?? letter( row ) }</span>
                            ) ) }
                        </div> }

                        {/* The cells, by row */}
                        { Array.from( { length : rows } , ( _ , row ) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: a row is its number.
                            // biome-ignore lint/a11y/useSemanticElements: an ARIA row of an interactive grid, not a table row.
                            // biome-ignore lint/a11y/useFocusableInteractive: the cells take the focus, the row groups them.
                            <div key={ row } role="row">
                                { cells.filter( cell => cell.row === row ).map( cell =>
                                {
                                    const rect  = cellRect( cell , { cellSize , gap } ) ;
                                    const state = stateOf( cell ) ;
                                    const name  = coordinate( cell ) ;
                                    const isOn  = ( selected ?? [] ).includes( cell.id ) ;
                                    const words = [ name , state?.label , cell.badge ].filter( item => item !== undefined && item !== null && item !== '' ) ;

                                    return (
                                        // biome-ignore lint/a11y/useSemanticElements: a gridcell that is a button — the cell is pressed to select it.
                                        <button
                                            aria-disabled = { cell.disabled || undefined }
                                            aria-label    = { words.length > 1 ? format( labels.cell ?? '{0}, {1}' , words[ 0 ] , words.slice( 1 ).join( ', ' ) ) : name }
                                            aria-selected = { selectable === 'none' ? undefined : isOn }
                                            className     = { cn( CELL_BASE , CELL_COLORS[ state?.color ] ?? CELL_PLAIN , isOn && CELL_SELECTED , cell.disabled ? CELL_DISABLED : CELL_ACTIVE ) }
                                            id            = { `${ id }-${ cell.id }` }
                                            key           = { cell.id }
                                            onClick       = { () => toggle( cell ) }
                                            onFocus       = { () => setFocus( cell.id ) }
                                            ref           = { node => { if ( node ) buttons.current.set( cell.id , node ) ; else buttons.current.delete( cell.id ) ; } }
                                            role          = "gridcell"
                                            style         = { { height : rect.height , left : gutterX + rect.x , top : gutterY + rect.y , width : rect.width } }
                                            tabIndex      = { cell.id === focused ? 0 : -1 }
                                            type          = "button"
                                        >
                                            { renderCell
                                                ? renderCell( cell , { coordinate : name , label : cell.label ?? name } )
                                                : (
                                                    <>
                                                        <span className="truncate px-1 font-medium">{ cell.label ?? name }</span>
                                                        { cell.badge !== undefined && cell.badge !== null && <span className="text-[10px] text-base-content/70">{ cell.badge }</span> }
                                                    </>
                                                ) }
                                        </button>
                                    ) ;
                                } ) }
                            </div>
                        ) ) }
                    </div>
                </div>

            </div>

            { legend && Object.keys( states ).length > 0 && (
                <ul aria-label={ labels.legend } className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-base-content/70">
                    { Object.entries( states ).map( ( [ key , state ] ) => (
                        <li className="flex items-center gap-1.5" key={ key }>
                            <span aria-hidden="true" className={ cn( 'size-3 rounded-sm' , SWATCH_COLORS[ state.color ] ?? 'bg-base-300' ) } />
                            { state.label }
                        </li>
                    ) ) }
                </ul>
            ) }
        </div>
    ) ;
} ;

CellGrid.displayName = 'CellGrid' ;

export default CellGrid ;
