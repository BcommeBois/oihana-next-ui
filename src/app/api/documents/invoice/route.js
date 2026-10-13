import { Font , renderToBuffer } from '@react-pdf/renderer' ;

import InvoiceDocument from '@/demo/documents/pdf/InvoiceDocument' ;

// The same choice the browser engine makes : no English hyphenation in a French invoice.
Font.registerHyphenationCallback( word => [ word ] ) ;

/**
 * Renders the invoice on the server : the same component the page previews,
 * drawn by Node and sent back as a PDF — the shape of an application that
 * stores the document itself, or mails it, without a browser in the loop.
 *
 * `POST /api/documents/invoice` takes `{ invoice , labels , locale }` as
 * JSON and answers `application/pdf`. Nothing is stored.
 *
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export async function POST( request )
{
    let payload ;

    try
    {
        payload = await request.json() ;
    }
    catch
    {
        return Response.json( { error : 'A JSON body is expected.' } , { status : 400 } ) ;
    }

    const { invoice , labels = {} , locale } = payload ?? {} ;

    if ( !invoice?.number )
    {
        return Response.json( { error : 'An invoice with a number is expected.' } , { status : 422 } ) ;
    }

    const buffer = await renderToBuffer( <InvoiceDocument invoice={ invoice } labels={ labels } locale={ locale } /> ) ;

    return new Response( buffer ,
    {
        headers :
        {
            'Cache-Control'       : 'no-store' ,
            'Content-Disposition' : `inline; filename="invoice-${ String( invoice.number ).replace( /[^\w.-]+/g , '-' ) }.pdf"` ,
            'Content-Type'        : 'application/pdf' ,
            'X-Rendered-By'       : 'server' ,
        } ,
    } ) ;
}
