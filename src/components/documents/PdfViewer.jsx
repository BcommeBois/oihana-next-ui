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
 * closes both. 🚨 **Inside a `<dialog>`** — a `PdfPanel`, a modal — the
 * viewer is portaled to the dialog itself while it covers the window : a
 * dialog sits in the browser's top layer, above everything in `body`, and
 * its box carries a transform that would pin a `fixed` element to the box.
 *
 * **Print** prints from inside the page, on a phone as on a desktop : every
 * page drawn at `printDpi` into one reused canvas, kept as a JPEG, and handed
 * to the browser's dialog ; a document past `printLimit` pages is refused
 * with a notice, since forty megabytes of images is not what a phone wants.
 * **Open in a tab** hands the document to the browser's own reader ;
 * **download** saves it under `fileName`, the file's own name, or the title
 * the document carries.
 *
 * **Search** finds words without caring for case or accents, counts them,
 * highlights them in the text layer and walks them with Enter / Shift+Enter.
 * **Thumbnails** open beside the pages on a desktop ; **rotate** turns the
 * whole document by quarter turns. With the focus on the viewer : Page Up /
 * Page Down, Home / End, `+` / `−`, `r`, Ctrl+F.
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
import { createPortal } from 'react-dom' ;
import { useMeasure } from 'react-use' ;

import { MdClose } from 'react-icons/md' ;

import Button     from '../Button' ;
import LinkButton from '../links/LinkButton' ;

import DocumentFrame    from './DocumentFrame' ;
import PdfPage          from './PdfPage' ;
import PdfPasswordModal from './PdfPasswordModal' ;
import PdfSearch        from './PdfSearch' ;
import PdfThumbnails    from './PdfThumbnails' ;
import PdfToolbar       from './PdfToolbar' ;
import PdfViewerContext from './context' ;

import { loadEngine } from './engine' ;

import FullscreenContext from '../../contexts/fullscreen/context' ;
import NO_LOCALE         from '../../contexts/locale/noLocale' ;
import useI18n           from '../../contexts/locale/useI18n' ;

import useValue from '../../hooks/useValue' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import forceDownload           from '../../helpers/net/forceDownload' ;
import findInText              from '../../helpers/pdf/findInText' ;
import mostVisiblePage         from '../../helpers/pdf/mostVisiblePage' ;
import printImages             from '../../helpers/pdf/printImages' ;
import renderPagesToImages     from '../../helpers/pdf/renderPagesToImages' ;
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
 * @param {Function} [props.onPrintRefused] - `( { pages , limit } ) => void` when a print is refused for being past `printLimit`.
 * @param {string} [props.path='components.document'] - i18n path the labels are read from.
 * @param {number} [props.printDpi=150] - The resolution the pages are printed at. 300 is print quality, four times the work.
 * @param {number} [props.printLimit=200] - Past this many pages, printing from the page is refused ; « open in a tab » remains.
 * @param {React.Ref} [props.ref] - An imperative handle : `goTo`, `zoomIn`, `zoomOut`, `setFit`, `rotate`, `download`, `print`, `openInTab`, `toggleFullscreen`, `toggleThumbnails`, `openSearch`, and `pdf`, the open pdf.js document.
 * @param {boolean} [props.renderAnnotationLayer=true] - Links and form fields.
 * @param {boolean} [props.renderTextLayer=true] - Selectable text.
 * @param {import('../../helpers/pdf/toPdfSource').PdfSource} [props.source] - The document : a url, `{ url , headers }`, a `File`, a `Blob`, a buffer. `null` shows the empty state.
 * @param {'top'|'bottom'|'both'|false} [props.toolbar='top'] - Where the viewer draws its own `PdfToolbar` — above, below, both, or not at all.
 * @param {Object} [props.toolbarProps] - Props of the toolbar the viewer draws : `tooltips`, `showZoom`, `showFit`, `showThumbnails`, `showSearch`, `showRotate`, `showOpenInTab`, `showPrint`, `showDownload`, `showFullscreen`.
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
    onPrintRefused ,
    onRenderedChange ,
    onZoomChange ,
    path = 'components.document' ,
    printDpi = 150 ,
    printLimit = 200 ,
    ref ,
    renderAnnotationLayer = true ,
    renderTextLayer = true ,
    source = null ,
    toolbar = 'top' ,
    toolbarProps ,
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

    // --------- Rotation : quarter turns of the whole document

    const [ rotation , setRotation ] = useState( 0 ) ;

    const rotate = useCallback( () => setRotation( value => ( value + 90 ) % 360 ) , [] ) ;

    // The sizes as shown : width and height trade places sideways.
    const oriented = useMemo( () => rotation % 180 === 0 ? sizes : sizes.map( size => ( { height : size.width , width : size.height } ) ) , [ rotation , sizes ] ) ;

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
        const first = oriented[ 0 ] ;

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
    , [ fit , frameHeight , frameWidth , oriented , zoom ] ) ;

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

    // --------- Thumbnails

    const [ thumbnailsOpen , setThumbnailsOpen ] = useState( false ) ;

    const toggleThumbnails = useCallback( () => setThumbnailsOpen( value => !value ) , [] ) ;

    // --------- Search : the words of every page, read once ; the matches, per text item

    const [ searchOpen , setSearchOpen ] = useState( false ) ;
    const [ query      , setQuery      ] = useState( '' ) ;
    const [ matches    , setMatches    ] = useState( [] ) ;   // { page , item , offset , length }
    const [ matchIndex , setMatchIndex ] = useState( 0 ) ;

    const texts = useRef( new Map() ) ;   // page number → the strings of its text items

    // biome-ignore lint/correctness/useExhaustiveDependencies: a new document empties the words read from the previous one
    useEffect( () => { texts.current = new Map() ; } , [ pdf ] ) ;

    const openSearch  = useCallback( () => setSearchOpen( true ) , [] ) ;
    const closeSearch = useCallback( () =>
    {
        setSearchOpen( false ) ;
        setQuery( '' ) ;
    }
    , [] ) ;

    useEffect( () =>
    {
        if ( !pdf || !query.trim() )
        {
            setMatches( [] ) ;
            setMatchIndex( 0 ) ;
            return undefined ;
        }

        let alive = true ;

        // A short wait : the reader is still typing.
        const timer = setTimeout( async () =>
        {
            const found = [] ;

            for ( let number = 1 ; number <= pdf.numPages && alive ; number++ )
            {
                let items = texts.current.get( number ) ;

                if ( !items )
                {
                    const page    = await pdf.getPage( number ) ;
                    const content = await page.getTextContent() ;

                    items = content.items.map( item => item.str ?? '' ) ;
                    texts.current.set( number , items ) ;
                }

                items.forEach( ( str , item ) =>
                {
                    for ( const offset of findInText( str , query ) )
                    {
                        found.push( { item , length : query.trim().length , offset , page : number } ) ;
                    }
                } ) ;
            }

            if ( alive )
            {
                setMatches( found ) ;
                setMatchIndex( 0 ) ;
            }
        }
        , 250 ) ;

        return () =>
        {
            alive = false ;
            clearTimeout( timer ) ;
        } ;
    }
    , [ pdf , query ] ) ;

    // The current match brings its page into view.
    // biome-ignore lint/correctness/useExhaustiveDependencies: only a change of match moves the reader, never a scroll of theirs
    useEffect( () =>
    {
        const match = matches[ matchIndex ] ;

        if ( match && match.page !== page )
        {
            goTo( match.page ) ;
        }
    }
    , [ goTo , matchIndex , matches ] ) ;

    const nextMatch     = useCallback( () => setMatchIndex( index => ( matches.length ? ( index + 1 ) % matches.length : 0 ) ) , [ matches.length ] ) ;
    const previousMatch = useCallback( () => setMatchIndex( index => ( matches.length ? ( index - 1 + matches.length ) % matches.length : 0 ) ) , [ matches.length ] ) ;

    // Wraps each match of a text item in <mark>, the current one told apart.
    const textRenderer = useMemo( () =>
    {
        if ( !query.trim() || matches.length === 0 )
        {
            return undefined ;
        }

        const current = matches[ matchIndex ] ;

        const escapeHtml = text => text.replace( /&/g , '&amp;' ).replace( /</g , '&lt;' ).replace( />/g , '&gt;' ) ;

        return ( { itemIndex , pageNumber , str } ) =>
        {
            const own = matches.filter( match => match.page === pageNumber && match.item === itemIndex ) ;

            if ( own.length === 0 )
            {
                return escapeHtml( str ) ;
            }

            let html   = '' ;
            let cursor = 0 ;

            for ( const match of own )
            {
                const isCurrent = current && match.page === current.page && match.item === current.item && match.offset === current.offset ;

                html += escapeHtml( str.slice( cursor , match.offset ) ) ;
                // The text layer's glyphs are transparent over the canvas : a <mark> must keep them so, or its own black text
                // covers the page. And the colour is the page's, not the theme's : a PDF page is white in every theme, so a
                // light fixed yellow reads on it where a theme's « warning » may be a dark amber.
                html += `<mark class="${ isCurrent ? 'bg-amber-300/70' : 'bg-yellow-200/70' } rounded-xs text-transparent">${ escapeHtml( str.slice( match.offset , match.offset + match.length ) ) }</mark>` ;
                cursor = match.offset + match.length ;
            }

            return html + escapeHtml( str.slice( cursor ) ) ;
        } ;
    }
    , [ matchIndex , matches , query ] ) ;

    // --------- The document as a file : download, print, open in a tab

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

    const openInTab = useCallback( async () =>
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

    const [ printing , setPrinting ] = useState( null ) ;   // { done , total } while the pages are drawn
    const [ notice   , setNotice   ] = useState( null ) ;

    const print = useCallback( async () =>
    {
        if ( !pdf || printing )
        {
            return ;
        }

        if ( pdf.numPages > printLimit )
        {
            setNotice( format( labels.printTooLong ?? 'This document has {0} pages: printing from the page is limited to {1}.' , pdf.numPages , printLimit ) ) ;
            onPrintRefused?.( { limit : printLimit , pages : pdf.numPages } ) ;
            return ;
        }

        setPrinting( { done : 0 , total : pdf.numPages } ) ;

        try
        {
            const images = await renderPagesToImages( pdf , { dpi : printDpi , onProgress : ( done , total ) => setPrinting( { done , total } ) , rotation } ) ;
            setPrinting( null ) ;
            await printImages( images , { title : pdfName( name ) } ) ;
        }
        catch ( failure )
        {
            setPrinting( null ) ;
            onError?.( failure ) ;
        }
    }
    , [ labels , name , onError , onPrintRefused , pdf , printDpi , printLimit , printing , rotation ] ) ;

    // --------- Full screen : the viewer covers the application's window. Never the browser's
    // full screen, which is the application's to ask for, and which an iPhone has not.

    const root = useRef( null ) ;

    const [ fullscreen , setFullscreen ] = useState( false ) ;

    // The <dialog> the viewer sits in, if any : where it goes while it covers the window.
    const [ dialog , setDialog ] = useState( null ) ;

    const toggleFullscreen = useCallback( () =>
    {
        setDialog( root.current?.closest( 'dialog' ) ?? null ) ;
        setFullscreen( value => !value ) ;
    }
    , [] ) ;

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

    // --------- Keyboard, with the focus on the viewer

    const onKeyDown = useCallback( event =>
    {
        const target = event.target ;

        if ( target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable )
        {
            return ;
        }

        const meta = event.ctrlKey || event.metaKey ;

        if ( meta && event.key.toLowerCase() === 'f' )
        {
            event.preventDefault() ;
            openSearch() ;
            return ;
        }

        if ( meta || event.altKey )
        {
            return ;
        }

        switch ( event.key )
        {
            case 'PageDown' : event.preventDefault() ; goTo( page + 1 ) ; break ;
            case 'PageUp'   : event.preventDefault() ; goTo( page - 1 ) ; break ;
            case 'Home'     : event.preventDefault() ; goTo( 1 ) ; break ;
            case 'End'      : event.preventDefault() ; goTo( pages ) ; break ;
            case '+' :
            case '='        : event.preventDefault() ; zoomIn() ; break ;
            case '-'        : event.preventDefault() ; zoomOut() ; break ;
            case 'r' :
            case 'R'        : event.preventDefault() ; rotate() ; break ;
            default : break ;
        }
    }
    , [ goTo , openSearch , page , pages , rotate , zoomIn , zoomOut ] ) ;

    // --------- The handle, and what the toolbar reads

    useImperativeHandle( ref , () => (
    {
        download ,
        goTo ,
        openInTab ,
        openSearch ,
        pdf ,
        print ,
        rotate ,
        setFit ,
        toggleFullscreen ,
        toggleThumbnails ,
        zoomIn ,
        zoomOut ,
    } )
    , [ download , goTo , openInTab , openSearch , pdf , print , rotate , toggleFullscreen , toggleThumbnails , zoomIn , zoomOut ] ) ;

    const state = useMemo( () => (
    {
        canZoomIn ,
        canZoomOut ,
        closeSearch ,
        download ,
        engine ,
        fit ,
        fullscreen ,
        goTo ,
        labels ,
        matchIndex ,
        matches ,
        nextMatch ,
        openInTab ,
        openSearch ,
        page ,
        pages ,
        pdf ,
        previousMatch ,
        print ,
        printing ,
        query ,
        rotate ,
        rotation ,
        searchOpen ,
        setFit ,
        setQuery ,
        sizes ,
        thumbnailsOpen ,
        toggleFullscreen ,
        toggleThumbnails ,
        zoom ,
        zoomIn ,
        zoomOut ,
    } )
    , [ canZoomIn , canZoomOut , closeSearch , download , engine , fit , fullscreen , goTo , labels , matchIndex , matches , nextMatch , openInTab , openSearch , page , pages , pdf , previousMatch , print , printing , query , rotate , rotation , searchOpen , sizes , thumbnailsOpen , toggleFullscreen , toggleThumbnails , zoom , zoomIn , zoomOut ] ) ;

    // --------- Render

    const retry = () => setAttempt( count => count + 1 ) ;

    const opening = !!file && !missing && !error && pages === 0 ;

    const openInTabLink = typeof file === 'string'
        ? <LinkButton color="primary" href={ file } size="sm" style="outline" target="_blank">{ labels.open ?? 'Open in a tab' }</LinkButton>
        : null ;

    const node = (
        <PdfViewerContext value={ state }>
            <section
                className = { cn(
                    // No `overflow-hidden` here : the frame inside is what scrolls, and a clipped root would cut the toolbar's tooltips.
                    'relative flex min-h-0 flex-col bg-base-200' ,
                    className ,
                    // Last, so the host's height, radius and border give way while the viewer covers the window.
                    fullscreen && 'fixed inset-0 z-[60] h-auto max-h-none w-auto max-w-none rounded-none border-0 bg-base-200' ,
                ) }
                aria-label = { name ? pdfName( name ) : ( labels.region ?? 'Document' ) }
                onKeyDown  = { onKeyDown }
                ref        = { root }
                // biome-ignore lint/a11y/noNoninteractiveTabindex: the viewer answers to the keyboard — pages, zoom, search — so it has to take the focus
                tabIndex  = { 0 }
            >
                { ( toolbar === 'top' || toolbar === 'both' ) && <PdfToolbar className="border-b" tooltipPosition="bottom" { ...toolbarProps } /> }

                { searchOpen && <PdfSearch /> }

                { printing && (
                    <div className="flex items-center gap-3 border-b border-base-300 bg-base-100 px-3 py-1 text-sm text-base-content/70" role="status">
                        <progress className="progress progress-primary w-40" max={ printing.total } value={ printing.done } />
                        <span className="tabular-nums">{ format( labels.printing ?? 'Preparing to print: page {0} of {1}' , printing.done , printing.total ) }</span>
                    </div>
                ) }

                { notice && (
                    <div className="flex items-center gap-3 border-b border-warning/40 bg-warning/15 px-3 py-1 text-sm" role="alert">
                        <span className="flex-1">{ notice }</span>
                        <Button icon={ MdClose } onClick={ () => setNotice( null ) } shape="square" size="xs" style="ghost" title={ labels.close ?? 'Close' } />
                    </div>
                ) }

                {/* `min-w-0` on the row and the frame : a flex item keeps its content's width otherwise, and the
                    content is the page, sized from the frame — the frame would never narrow, and the page overflow. */}
                <div className="flex min-h-0 min-w-0 flex-1">
                    { thumbnailsOpen && <PdfThumbnails className="hidden w-40 sm:flex" /> }

                <DocumentFrame
                    actions      = { openInTabLink }
                    className    = "min-w-0 flex-1"
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
                                        customTextRenderer    = { textRenderer }
                                        height                = { Math.round( pageWidth * oriented[ number - 1 ].height / oriented[ number - 1 ].width ) }
                                        key                   = { number }
                                        margin                = { margin }
                                        onVisibleChange       = { onVisibleChange }
                                        pageNumber            = { number }
                                        ref                   = { node => { pageNodes.current[ number - 1 ] = node ; } }
                                        root                  = { container }
                                        renderAnnotationLayer = { renderAnnotationLayer }
                                        renderTextLayer       = { renderTextLayer }
                                        rotate                = { rotation }
                                        width                 = { pageWidth }
                                    />
                                ) ) }
                            </engine.Document>
                        ) }
                    </div>

                    { children }
                </DocumentFrame>
                </div>

                { ( toolbar === 'bottom' || toolbar === 'both' ) && <PdfToolbar className="border-t" tooltipPosition="top" { ...toolbarProps } /> }

                { ask && (
                    <PdfPasswordModal
                        key      = { ask.wrong ? 'again' : 'first' }
                        onAgree  = { password => { ask.callback( password ) ; } }
                        onCancel = { () => { ask.callback( null ) ; } }
                        path     = { path }
                        wrong    = { ask.wrong }
                    />
                ) }
            </section>
        </PdfViewerContext>
    ) ;

    return fullscreen && dialog ? createPortal( node , dialog ) : node ;
} ;

PdfViewer.displayName = 'PdfViewer' ;

export default PdfViewer ;
