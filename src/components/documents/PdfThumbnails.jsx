'use client' ;

/**
 * PdfThumbnails — the column of miniatures beside a viewer's pages : one per
 * page, drawn only while it is in its column's sight, the current page
 * marked and kept in view, a click going to the page.
 *
 * Drawn by `PdfViewer` when its thumbnails are open ; it reads the viewer
 * through `usePdfViewer`, and renders nothing outside one.
 *
 * @module components/documents/PdfThumbnails
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes on the column.
 * @param {number} [props.width=112] - The width of a miniature, in CSS pixels.
 */

import { useEffect , useRef , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import { usePdfViewer } from './context' ;

import cn from '../../themes/helpers/cn' ;

/**
 * One miniature, drawn while near the column's viewport.
 */
const Miniature = ( { Thumbnail , current , height , label , number , onClick , pdf , root , rotation , width } ) =>
{
    const element = useRef( null ) ;

    const [ visible , setVisible ] = useState( false ) ;

    useEffect( () =>
    {
        const node = element.current ;

        if ( !node || typeof IntersectionObserver === 'undefined' )
        {
            setVisible( true ) ;
            return undefined ;
        }

        const observer = new IntersectionObserver( entries => setVisible( entries.some( entry => entry.isIntersecting ) ) , { root : root?.current ?? null , rootMargin : '100% 0px' } ) ;

        observer.observe( node ) ;

        return () => observer.disconnect() ;
    }
    , [ root ] ) ;

    // The current miniature follows the reader into view.
    useEffect( () =>
    {
        if ( current )
        {
            element.current?.scrollIntoView( { block : 'nearest' } ) ;
        }
    }
    , [ current ] ) ;

    // The miniature is a link of react-pdf's own (`<a>`), which takes the click : the wrapper
    // only marks the current page and names the number.
    return (
        <div
            aria-current = { current ? 'page' : undefined }
            className    = { cn( 'flex shrink-0 flex-col items-center gap-1 rounded-box p-1 text-xs' , current ? 'bg-primary/15 ring-2 ring-primary' : 'hover:bg-base-content/10' ) }
            ref          = { element }
        >
            <span className="block bg-white shadow-sm" style={ { height , width } }>
                { visible && (
                    <Thumbnail
                        onItemClick = { onClick }
                        pageNumber  = { number }
                        pdf         = { pdf }
                        rotate      = { rotation }
                        suspense    = { false }
                        width       = { width }
                    />
                ) }
            </span>
            <span className="sr-only">{ label }</span>
            <span aria-hidden="true" className="tabular-nums text-base-content/70">{ number }</span>
        </div>
    ) ;
} ;

const PdfThumbnails = ( { className , width = 112 } ) =>
{
    const viewer = usePdfViewer() ;

    const column = useRef( null ) ;

    // Outside the <Document>, a Thumbnail is handed the document itself.
    if ( !viewer?.engine || !viewer.pdf || viewer.pages === 0 )
    {
        return null ;
    }

    const { engine , goTo , labels , page , pages , pdf , rotation , sizes } = viewer ;

    const sideways = rotation % 180 !== 0 ;

    return (
        <nav
            aria-label = { labels.thumbnails }
            className  = { cn( 'flex shrink-0 flex-col gap-2 overflow-y-auto border-e border-base-300 bg-base-200 p-2' , className ) }
            ref        = { column }
        >
            { sizes.map( ( size , index ) =>
            {
                const number = index + 1 ;
                const ratio  = sideways ? size.width / size.height : size.height / size.width ;

                return (
                    <Miniature
                        Thumbnail = { engine.Thumbnail }
                        current   = { number === page }
                        height    = { Math.round( width * ratio ) }
                        key       = { number }
                        label     = { format( labels.goToPage ?? 'Page {0} of {1}' , number , pages ) }
                        number    = { number }
                        onClick   = { () => goTo( number ) }
                        pdf       = { pdf }
                        root      = { column }
                        rotation  = { ( ( size.rotate ?? 0 ) + rotation ) % 360 }
                        width     = { width }
                    />
                ) ;
            } ) }
        </nav>
    ) ;
} ;

PdfThumbnails.displayName = 'PdfThumbnails' ;

export default PdfThumbnails ;
