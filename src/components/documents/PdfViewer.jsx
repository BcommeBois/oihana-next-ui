'use client' ;

/**
 * PdfViewer — a PDF in the page : every page in a scrolling column, a toolbar,
 * zoom, and the three gestures a reader expects — print, download, full
 * screen. Fills the box it is given ; the host sets the height.
 *
 * 🔑 **Only the pages near the screen are drawn.** The document's pages are
 * white placeholders of their true size from the start — the scrollbar is
 * right at once — and a page becomes a canvas when it comes within a screen
 * of the viewport, a placeholder again when it leaves. Two hundred pages on a
 * phone cost what three do.
 *
 * 🔑 **The engine is loaded on demand, and may be absent.** `react-pdf` is an
 * optional peer : where it is not installed, the viewer says so and offers the
 * document to open in a tab, which needs no engine. Its files are served by
 * the application under `/pdfjs/<version>/` — see `components/documents/engine`.
 *
 * **Fit and zoom.** At zoom `1` a page is fitted : to the frame's width
 * (`fit="width"`), to its height (`fit="page"`), or drawn at its real size
 * (`fit="none"`). `zoomIn` / `zoomOut` step through `helpers/pdf/zoomSteps`,
 * from ½ to 3×.
 *
 * **Full screen** covers the application's window with the viewer — and
 * never asks the browser for its own full screen, which is the application's
 * to take or not. The same on every device, an iPhone included ; `Escape`
 * leaves. When the application is already in the browser's full screen,
 * Escape closes the viewer and leaves that full screen alone, through the
 * Keyboard Lock API where it exists (Chrome, Edge) ; elsewhere one Escape
 * closes both.
 *
 * **Print** opens the document in a tab, where the browser's own reader
 * prints it ; **download** saves it under `fileName`, the file's own name, or
 * the title the document carries.
 *
 * **A protected document** asks its password in a dialog, and asks again when
 * the one given is wrong.
 *
 * @module components/documents/PdfViewer
 *
 * @example
 * ```jsx
 * <PdfViewer className="h-[70vh]" source="/documents/invoice.pdf" />
 *
 * // Behind an API : pdf.js sends the headers itself
 * <PdfViewer className="h-full" fileName="facture-2026-0042.pdf" source={ { url , headers : { Authorization } } } />
 *
 * // A dropped file, no toolbar, a toolbar of the host's inside
 * <PdfViewer className="h-96" source={ file } toolbar={ false }>
 *     <PdfToolbar showFullscreen={ false } />
 * </PdfViewer>
 * ```
 */

import { use , useCallback , useEffect , useImperativeHandle , useMemo , useRef , useState } from 'react' ;
import { useMeasure } from 'react-use' ;

import LinkButton from '../links/LinkButton' ;

import DocumentFrame    from './DocumentFrame' ;
import PdfPage          from './PdfPage' ;
import PdfPasswordModal from './PdfPasswordModal' ;
import PdfToolbar       from './PdfToolbar' ;
import PdfViewerContext from './context' ;

import { loadEngine } from './engine' ;

import FullscreenContext from '../../contexts/fullscreen/context' ;
import NO_LOCALE         from '../../contexts/locale/noLocale' ;
import useI18n           from '../../contexts/locale/useI18n' ;

import useValue from '../../hooks/useValue' ;

import forceDownload           from '../../helpers/net/forceDownload' ;
import mostVisiblePage         from '../../helpers/pdf/mostVisiblePage' ;
import nextZoom , { ZOOM_STEPS } from '../../helpers/pdf/zoomSteps' ;
import { toDocumentFile }      from '../../helpers/pdf/toPdfSource' ;

import cn from '../../themes/helpers/cn' ;

/**
 * The gap around and between the pages, in CSS pixels.
 * @type {number}
 */
const GUTTER = 16 ;

/**
 * A PDF point is 1/72 inch, a CSS pixel 1/96 : a page « at its real size ».
 * @type {number}
 */
const CSS_PER_POINT = 96 / 72 ;

/**
 * A file name that ends in `.pdf`.
 *
 * @param {?string} name
 * @returns {string}
 */
const pdfName = name =>
{
    const base = String( name ?? '' ).trim() || 'document' ;
    return /\.pdf$/i.test( base ) ? base : `${ base }.pdf` ;
} ;

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Rendered inside the viewer, over the pages — a toolbar of the host's own, reading `usePdfViewer`.
 * @param {string} [props.className] - Classes on the root. Set the height here : the viewer fills its box.
 * @param {number} [props.defaultZoom=1] - The zoom at first, `1` being fitted.
 * @param {'_blank'|'_self'|'_parent'|'_top'} [props.externalLinkTarget='_blank'] - Where a link in the document opens.
 * @param {string} [props.fileName] - The name the document is saved under. Defaults to the file's name, then the document's title.
 * @param {'width'|'page'|'none'} [props.fit='width'] - How a page is sized at zoom `1`.
 * @param {number} [props.initialPage=1] - The page shown first.
 * @param {string} [props.margin='120%'] - How far from the viewport a page is already drawn.
 * @param {Function} [props.onError] - `( error ) => void` when the document cannot be opened.
 * @param {Function} [props.onLoad] - `( { pages , title , pdf } ) => void` once the document is open.
 * @param {Function} [props.onPageChange] - `( page ) => void` as the reader moves, 1-based.
 * @param {Function} [props.onRenderedChange] - `( count ) => void` when the number of pages currently drawn changes.
 * @param {Function} [props.onZoomChange] - `( zoom ) => void`.
 * @param {string} [props.path='components.document'] - i18n path the labels are read from.
 * @param {React.Ref} [props.ref] - An imperative handle : `goTo`, `zoomIn`, `zoomOut`, `setFit`, `download`, `print`, `toggleFullscreen`, and `pdf`, the open pdf.js document.
 * @param {boolean} [props.renderAnnotationLayer=true] - Links and form fields.
 * @param {boolean} [props.renderTextLayer=true] - Selectable text.
 * @param {import('../../helpers/pdf/toPdfSource').PdfSource} [props.source] - The document : a url, `{ url , headers }`, a `File`, a `Blob`, a buffer. `null` shows the empty state.
 * @param {'top'|'bottom'|'both'|false} [props.toolbar='top'] - Where the viewer draws its own `PdfToolbar` — above, below, both, or not at all.
 * @param {number} [props.zoom] - The zoom (controlled).
 */
const PdfViewer =
({
    children ,
    className ,
    defaultZoom = 1 ,
    externalLinkTarget = '_blank' ,
    fileName ,
    fit : fitProp = 'width' ,
    initialPage = 1 ,
    margin = '120%' ,
    onError ,
    onLoad ,
    onPageChange ,
    onRenderedChange ,
    onZoomChange ,
    path = 'components.document' ,
    ref ,
    renderAnnotationLayer = true ,
    renderTextLayer = true ,
    source = null ,
    toolbar = 'top' ,
    zoom : zoomProp ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ;

    // --------- The engine

    const [ engine  , setEngine  ] = useState( null ) ;
    const [ missing , setMissing ] = useState( false ) ;

    useEffect( () =>
    {
        let alive = true ;
        loadEngine().then( module => { if ( alive ) setEngine( module ) ; } , () => { if ( alive ) setMissing( true ) ; } ) ;
        return () => { alive = false ; } ;
    }
    , [] ) ;

    // --------- The document

    const file = useMemo( () => toDocumentFile( source ) , [ source ] ) ;

    const [ pdf     , setPdf     ] = useState( null ) ;
    const [ sizes   , setSizes   ] = useState( [] ) ;   // { width , height } in points, per page
    const [ title   , setTitle   ] = useState( null ) ;
    const [ error   , setError   ] = useState( null ) ;
    const [ attempt , setAttempt ] = useState( 0 ) ;
    const [ ask     , setAsk     ] = useState( null ) ; // { callback , wrong } while a password is asked

    const pages = sizes.length ;

    // The page numbers, the one identity a page has.
    const numbers = useMemo( () => Array.from( { length : pages } , ( _ , index ) => index + 1 ) , [ pages ] ) ;

    // A new document, or a retry : forget the previous one.
    // biome-ignore lint/correctness/useExhaustiveDependencies: `file` and `attempt` are what the effect answers to, not what it reads
    useEffect( () =>
    {
        setPdf( null ) ;
        setSizes( [] ) ;
        setTitle( null ) ;
        setError( null ) ;
        setAsk( null ) ;
    }
    , [ file , attempt ] ) ;

    const onLoadSuccess = useCallback( async document =>
    {
        try
        {
            const list = await Promise.all( Array.from( { length : document.numPages } , ( _ , index ) =>
                document.getPage( index + 1 ).then( page =>
                {
                    const { height , width } = page.getViewport( { scale : 1 } ) ;
                    return { height , width } ;
                } ) ) ) ;

            const metadata = await document.getMetadata().catch( () => null ) ;
            const name     = metadata?.info?.Title || null ;

            setPdf( document ) ;
            setSizes( list ) ;
            setTitle( name ) ;
            setAsk( null ) ;

            onLoad?.( { pages : document.numPages , pdf : document , title : name } ) ;
        }
        catch ( failure )
        {
            setError( failure ) ;
            onError?.( failure ) ;
        }
    }
    , [ onError , onLoad ] ) ;

    const onLoadError = useCallback( failure =>
    {
        setAsk( null ) ;
        setError( failure ) ;
        onError?.( failure ) ;
    }
    , [ onError ] ) ;

    const onPassword = useCallback( ( callback , reason ) =>
    {
        setAsk( { callback , wrong : reason === engine?.pdfjs?.PasswordResponses?.INCORRECT_PASSWORD || reason === 2 } ) ;
    }
    , [ engine ] ) ;

    // --------- The frame, measured

    const container = useRef( null ) ;

    const [ measureRef , { height : frameHeight , width : frameWidth } ] = useMeasure() ;

    const setContainer = useCallback( node =>
    {
        container.current = node ;
        measureRef( node ) ;
    }
    , [ measureRef ] ) ;

    // --------- Fit and zoom

    const [ fit  , setFit  ] = useState( fitProp ) ;
    const [ zoom , setZoom ] = useValue( defaultZoom , zoomProp , onZoomChange ) ;

    useEffect( () => { setFit( fitProp ) ; } , [ fitProp ] ) ;

    const canZoomIn  = zoom < ZOOM_STEPS[ ZOOM_STEPS.length - 1 ] ;
    const canZoomOut = zoom > ZOOM_STEPS[ 0 ] ;

    const zoomIn  = useCallback( () => setZoom( nextZoom( zoom , 1 ) ) , [ setZoom , zoom ] ) ;
    const zoomOut = useCallback( () => setZoom( nextZoom( zoom , -1 ) ) , [ setZoom , zoom ] ) ;

    // The width every page is drawn at. `fit` reads the first page : a document mixes sizes rarely, and a column needs one width.
    const pageWidth = useMemo( () =>
    {
        const first = sizes[ 0 ] ;

        if ( !first )
        {
            return 0 ;
        }

        const inner = Math.max( 0 , frameWidth - 2 * GUTTER ) ;

        let base = first.width * CSS_PER_POINT ;

        if ( fit === 'width' )
        {
            base = inner ;
        }
        else if ( fit === 'page' )
        {
            const byHeight = Math.max( 0 , frameHeight - 2 * GUTTER ) * ( first.width / first.height ) ;
            base = Math.min( inner , byHeight ) ;
        }

        return Math.max( 0 , Math.floor( base * zoom ) ) ;
    }
    , [ fit , frameHeight , frameWidth , sizes , zoom ] ) ;

    // --------- Where the reader is

    const [ page , setPage ] = useState( initialPage ) ;

    const pageNodes = useRef( [] ) ;

    const goTo = useCallback( target =>
    {
        const number = Math.min( Math.max( 1 , Math.round( target ) ) , pages || 1 ) ;
        const node   = pageNodes.current[ number - 1 ] ;
        const frame  = container.current ;

        if ( node && frame )
        {
            frame.scrollTo( { behavior : 'auto' , top : node.offsetTop - GUTTER } ) ;
        }

        setPage( number ) ;
    }
    , [ pages ] ) ;

    useEffect( () => { onPageChange?.( page ) ; } , [ onPageChange , page ] ) ;

    // The initial page, once the placeholders have their size.
    const placed = useRef( false ) ;

    useEffect( () =>
    {
        if ( pages > 0 && pageWidth > 0 && !placed.current )
        {
            placed.current = true ;

            if ( initialPage > 1 )
            {
                goTo( initialPage ) ;
            }
        }
    }
    , [ goTo , initialPage , pageWidth , pages ] ) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: a new document or a retry places the initial page again
    useEffect( () => { placed.current = false ; } , [ file , attempt ] ) ;

    const onScroll = useCallback( () =>
    {
        const frame = container.current ;

        if ( !frame || pages === 0 )
        {
            return ;
        }

        const rects = pageNodes.current.slice( 0 , pages ).map( node => ( { height : node?.offsetHeight ?? 0 , top : node?.offsetTop ?? 0 } ) ) ;

        setPage( mostVisiblePage( rects , frame.scrollTop , frame.clientHeight ) + 1 ) ;
    }
    , [ pages ] ) ;

    // --------- Pages drawn

    const rendered = useRef( new Set() ) ;

    const onVisibleChange = useCallback( ( number , visible ) =>
    {
        const set    = rendered.current ;
        const before = set.size ;

        if ( visible ) set.add( number ) ; else set.delete( number ) ;

        if ( set.size !== before )
        {
            onRenderedChange?.( set.size ) ;
        }
    }
    , [ onRenderedChange ] ) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: a new document or a retry starts the count over
    useEffect( () =>
    {
        rendered.current = new Set() ;
        onRenderedChange?.( 0 ) ;
    }
    , [ file , attempt , onRenderedChange ] ) ;

    // --------- The document as a file : download, print

    const name = fileName ?? ( typeof source === 'object' && source !== null && 'name' in source ? source.name : null ) ?? title ;

    const toBlob = useCallback( async () =>
    {
        if ( !pdf )
        {
            return null ;
        }

        const data = await pdf.getData() ;

        return new Blob( [ data ] , { type : 'application/pdf' } ) ;
    }
    , [ pdf ] ) ;

    const download = useCallback( async () =>
    {
        const blob = await toBlob() ;

        if ( blob )
        {
            forceDownload( pdfName( name ) , URL.createObjectURL( blob ) , true ) ;
        }
    }
    , [ name , toBlob ] ) ;

    const print = useCallback( async () =>
    {
        const blob = await toBlob() ;

        if ( blob )
        {
            const url = URL.createObjectURL( blob ) ;

            window.open( url , '_blank' ) ;

            // Long enough for the tab to have read it.
            setTimeout( () => URL.revokeObjectURL( url ) , 60_000 ) ;
        }
    }
    , [ toBlob ] ) ;

    // --------- Full screen : the viewer covers the application's window. Never the browser's
    // full screen, which is the application's to ask for, and which an iPhone has not.

    const root = useRef( null ) ;

    const [ fullscreen , setFullscreen ] = useState( false ) ;

    const toggleFullscreen = useCallback( () => setFullscreen( value => !value ) , [] ) ;

    // The application may already hold the Escape key (`FullscreenProvider`'s `lockEscape`) :
    // then the viewer neither locks it again nor, worse, unlocks it on its way out.
    const appHoldsEscape = use( FullscreenContext )?.escapeLocked ?? false ;

    useEffect( () =>
    {
        if ( !fullscreen )
        {
            return undefined ;
        }

        // The key is the viewer's : nothing above it — the application's own full screen, a
        // dialog, a drawer — should see it once the viewer has answered.
        const onEscape = event =>
        {
            if ( event.key === 'Escape' )
            {
                event.preventDefault() ;
                event.stopPropagation() ;
                setFullscreen( false ) ;
            }
        } ;

        const { overflow } = document.body.style ;

        document.body.style.overflow = 'hidden' ;

        // `keyup` as well : a browser in its own full screen keeps the `keydown` of Escape
        // for itself (it leaves full screen), and only the `keyup` reaches the page.
        document.addEventListener( 'keydown' , onEscape , true ) ;
        document.addEventListener( 'keyup'   , onEscape , true ) ;

        // When the application is in the browser's full screen, Escape must close the viewer
        // and leave that full screen alone : the Keyboard Lock API hands the key to the page
        // (Chrome, Edge). Elsewhere one Escape closes both, the viewer with the full screen.
        const locked = !appHoldsEscape && !!document.fullscreenElement && typeof navigator.keyboard?.lock === 'function' ;

        if ( locked )
        {
            navigator.keyboard.lock( [ 'Escape' ] ).catch( () => {} ) ;
        }

        return () =>
        {
            document.body.style.overflow = overflow ;
            document.removeEventListener( 'keydown' , onEscape , true ) ;
            document.removeEventListener( 'keyup'   , onEscape , true ) ;

            if ( locked )
            {
                navigator.keyboard.unlock() ;
            }
        } ;
    }
    , [ appHoldsEscape , fullscreen ] ) ;

    // --------- The handle, and what the toolbar reads

    useImperativeHandle( ref , () => (
    {
        download ,
        goTo ,
        pdf ,
        print ,
        setFit ,
        toggleFullscreen ,
        zoomIn ,
        zoomOut ,
    } )
    , [ download , goTo , pdf , print , toggleFullscreen , zoomIn , zoomOut ] ) ;

    const state = useMemo( () => (
    {
        canZoomIn ,
        canZoomOut ,
        download ,
        fit ,
        fullscreen ,
        goTo ,
        labels ,
        page ,
        pages ,
        print ,
        setFit ,
        toggleFullscreen ,
        zoom ,
        zoomIn ,
        zoomOut ,
    } )
    , [ canZoomIn , canZoomOut , download , fit , fullscreen , goTo , labels , page , pages , print , toggleFullscreen , zoom , zoomIn , zoomOut ] ) ;

    // --------- Render

    const retry = () => setAttempt( count => count + 1 ) ;

    const opening = !!file && !missing && !error && pages === 0 ;

    const openInTab = typeof file === 'string'
        ? <LinkButton color="primary" href={ file } size="sm" style="outline" target="_blank">{ labels.open ?? 'Open in a tab' }</LinkButton>
        : null ;

    return (
        <PdfViewerContext value={ state }>
            <div
                className = { cn(
                    'relative flex min-h-0 flex-col overflow-hidden bg-base-200' ,
                    className ,
                    // Last, so the host's height, radius and border give way while the viewer covers the window.
                    fullscreen && 'fixed inset-0 z-[60] h-auto max-h-none w-auto max-w-none rounded-none border-0 bg-base-200' ,
                ) }
                ref = { root }
            >
                { ( toolbar === 'top' || toolbar === 'both' ) && <PdfToolbar className="border-b" /> }

                <DocumentFrame
                    actions      = { openInTab }
                    className    = "flex-1"
                    empty        = { !file }
                    error        = { error }
                    loading      = { opening && !ask }
                    missing      = { missing }
                    onRetry      = { retry }
                    path         = { path }
                >
                    <div
                        className = { cn( 'min-h-0 flex-1 overflow-auto' , pages === 0 && 'hidden' ) }
                        onScroll  = { onScroll }
                        ref       = { setContainer }
                    >
                        { engine && file && (
                            <engine.Document
                                className          = "mx-auto flex w-fit min-w-full flex-col items-center gap-4 p-4"
                                error              = { null }
                                externalLinkTarget = { externalLinkTarget }
                                file               = { file }
                                key                = { attempt }
                                loading            = { null }
                                noData             = { null }
                                onItemClick        = { ( { pageNumber } ) => goTo( pageNumber ) }
                                onLoadError        = { onLoadError }
                                onLoadSuccess      = { onLoadSuccess }
                                onPassword         = { onPassword }
                                options            = { engine.options }
                                // react-pdf suspends by default : the whole page freezes while a document loads,
                                // and a protected one deadlocks — the password dialog can never be shown.
                                suspense           = { false }
                            >
                                { pageWidth > 0 && numbers.map( number => (
                                    <PdfPage
                                        Page                  = { engine.Page }
                                        height                = { Math.round( pageWidth * sizes[ number - 1 ].height / sizes[ number - 1 ].width ) }
                                        key                   = { number }
                                        margin                = { margin }
                                        onVisibleChange       = { onVisibleChange }
                                        pageNumber            = { number }
                                        ref                   = { node => { pageNodes.current[ number - 1 ] = node ; } }
                                        root                  = { container }
                                        renderAnnotationLayer = { renderAnnotationLayer }
                                        renderTextLayer       = { renderTextLayer }
                                        width                 = { pageWidth }
                                    />
                                ) ) }
                            </engine.Document>
                        ) }
                    </div>

                    { children }
                </DocumentFrame>

                { ( toolbar === 'bottom' || toolbar === 'both' ) && <PdfToolbar className="border-t" /> }

                { ask && (
                    <PdfPasswordModal
                        key      = { ask.wrong ? 'again' : 'first' }
                        onAgree  = { password => { ask.callback( password ) ; } }
                        onCancel = { () => { ask.callback( null ) ; } }
                        path     = { path }
                        wrong    = { ask.wrong }
                    />
                ) }
            </div>
        </PdfViewerContext>
    ) ;
} ;

PdfViewer.displayName = 'PdfViewer' ;

export default PdfViewer ;
