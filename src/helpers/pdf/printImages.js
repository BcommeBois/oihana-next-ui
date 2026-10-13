/**
 * Prints a list of page images from inside the page — no tab, no window the
 * browser could block.
 *
 * The images go into a container appended to `body`, invisible on screen ;
 * a stylesheet added for the time of the printing leaves only that container
 * visible, one image per sheet, at the page's own size. `window.print()`
 * opens the browser's dialog, and `afterprint` removes everything — or a
 * timer does, where the event never comes (some mobile browsers).
 *
 * @module helpers/pdf/printImages
 *
 * @param {Array<{ height : number , url : string , width : number }>} images - As `renderPagesToImages` returns them, sizes in points.
 * @param {Object} [options]
 * @param {string} [options.title] - The document's title, shown by the dialog where it uses it.
 * @returns {Promise<void>} Resolves once the dialog has closed, or after a fallback delay.
 */
const printImages = ( images , { title } = {} ) => new Promise( resolve =>
{
    if ( typeof window === 'undefined' || images.length === 0 )
    {
        resolve() ;
        return ;
    }

    const first = images[ 0 ] ;

    const container = document.createElement( 'div' ) ;
    container.setAttribute( 'data-oihana-print' , '' ) ;
    container.setAttribute( 'aria-hidden' , 'true' ) ;
    container.style.display = 'none' ;

    for ( const image of images )
    {
        const img = document.createElement( 'img' ) ;
        img.src = image.url ;
        img.alt = '' ;
        container.appendChild( img ) ;
    }

    const style = document.createElement( 'style' ) ;
    style.textContent = `
        @media print {
            @page { size : ${ first.width }pt ${ first.height }pt ; margin : 0 ; }
            body > :not([data-oihana-print]) { display : none !important ; }
            [data-oihana-print] { display : block !important ; }
            [data-oihana-print] img { display : block ; width : 100% ; height : auto ; break-after : page ; page-break-after : always ; }
            [data-oihana-print] img:last-child { break-after : auto ; page-break-after : auto ; }
        }
    ` ;

    const previousTitle = document.title ;

    const cleanup = () =>
    {
        window.removeEventListener( 'afterprint' , cleanup ) ;
        clearTimeout( fallback ) ;
        style.remove() ;
        container.remove() ;
        document.title = previousTitle ;
        resolve() ;
    } ;

    // Where `afterprint` never fires, the page is not left with a hidden copy of the document.
    const fallback = setTimeout( cleanup , 60_000 ) ;

    window.addEventListener( 'afterprint' , cleanup ) ;

    document.head.appendChild( style ) ;
    document.body.appendChild( container ) ;

    if ( title )
    {
        document.title = title ;
    }

    // The images must be decoded before the dialog opens, or the sheets come out blank.
    Promise.all( [ ...container.querySelectorAll( 'img' ) ].map( img => img.decode().catch( () => {} ) ) )
        .then( () => { window.print() ; } ) ;
} ) ;

export default printImages ;
