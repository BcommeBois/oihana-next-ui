'use client' ;

/**
 * PdfPage — one page of a viewer : a white placeholder of the page's size,
 * and the page itself only while it is near the screen.
 *
 * 🔑 **A page out of sight costs nothing.** A rendered page is a canvas — an
 * A4 at 2× on a Retina screen is nine megabytes — and a document has hundreds
 * of them. The placeholder keeps the document's full height, so the scrollbar
 * and the page numbers are right from the start ; the canvas is mounted when
 * the page comes within `margin` of the viewport, and unmounted when it
 * leaves, which frees it. Coming back to a page draws it again, briefly
 * white.
 *
 * It observes the viewer's scroll frame (`root`), not the window : a page
 * clipped by the frame is « not intersecting » for the window whatever the
 * margin, so pages coming into the frame would only be drawn once in sight.
 *
 * @module components/documents/PdfPage
 *
 * @param {Object} props
 * @param {React.ElementType} props.Page - `react-pdf`'s `Page`, from the engine.
 * @param {Function} [props.customTextRenderer] - `react-pdf`'s : the HTML of each text item, for highlighting.
 * @param {number} props.height - The placeholder's height, in CSS pixels.
 * @param {string} [props.margin='120%'] - How far from the viewport a page is already drawn, as a `rootMargin` height.
 * @param {Function} [props.onVisibleChange] - `( pageNumber , visible ) => void` when the page is mounted or unmounted.
 * @param {number} props.pageNumber - 1-based.
 * @param {React.Ref} [props.ref] - Forwarded to the placeholder, for scrolling to it.
 * @param {React.RefObject<?HTMLElement>} [props.root] - The scroll frame the page is observed against. The window when absent.
 * @param {boolean} [props.renderAnnotationLayer=true] - Links and form fields.
 * @param {boolean} [props.renderTextLayer=true] - Selectable text.
 * @param {number} [props.rotate=0] - Degrees, a multiple of 90.
 * @param {number} props.width - The page's width, in CSS pixels.
 */

import { useEffect , useRef , useState } from 'react' ;

const PdfPage =
({
    Page ,
    customTextRenderer ,
    height ,
    margin = '120%' ,
    onVisibleChange ,
    pageNumber ,
    ref ,
    renderAnnotationLayer = true ,
    renderTextLayer = true ,
    root ,
    rotate = 0 ,
    width ,
}) =>
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

        const observer = new IntersectionObserver( entries =>
        {
            setVisible( entries.some( entry => entry.isIntersecting ) ) ;
        }
        , { root : root?.current ?? null , rootMargin : `${ margin } 0px` } ) ;

        observer.observe( node ) ;

        return () => observer.disconnect() ;
    }
    , [ margin , root ] ) ;

    useEffect( () =>
    {
        onVisibleChange?.( pageNumber , visible ) ;
    }
    , [ onVisibleChange , pageNumber , visible ] ) ;

    // One node for the observer and for the host's ref.
    const setNode = node =>
    {
        element.current = node ;

        if ( typeof ref === 'function' )
        {
            ref( node ) ;
        }
        else if ( ref )
        {
            ref.current = node ;
        }
    } ;

    return (
        <div
            className  = "relative shrink-0 bg-white shadow-md"
            data-page  = { pageNumber }
            ref        = { setNode }
            style      = { { height , width } }
        >
            { visible && (
                <Page
                    customTextRenderer    = { customTextRenderer }
                    loading               = { null }
                    pageNumber            = { pageNumber }
                    renderAnnotationLayer = { renderAnnotationLayer }
                    renderTextLayer       = { renderTextLayer }
                    rotate                = { rotate }
                    // As the document : a page that suspends freezes the tree around it while it loads.
                    suspense              = { false }
                    width                 = { width }
                />
            ) }
        </div>
    ) ;
} ;

PdfPage.displayName = 'PdfPage' ;

export default PdfPage ;
