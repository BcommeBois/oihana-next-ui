import { readFile } from 'node:fs/promises' ;
import { join }     from 'node:path' ;

/**
 * The sample document, behind a header : what an API that guards its
 * documents looks like to the viewer.
 *
 * `GET /api/documents/sample` answers the PDF only to a request carrying
 * `Authorization: Bearer lab` — `401` otherwise. The demo passes the header
 * through `source={ { url , headers } }`, and pdf.js sends it itself.
 *
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export async function GET( request )
{
    if ( request.headers.get( 'authorization' ) !== 'Bearer lab' )
    {
        return new Response( 'Unauthorized' , { status : 401 } ) ;
    }

    const bytes = await readFile( join( process.cwd() , 'public' , 'documents' , 'sample.pdf' ) ) ;

    return new Response( bytes ,
    {
        headers :
        {
            'Cache-Control'       : 'no-store' ,
            'Content-Disposition' : 'inline; filename="sample.pdf"' ,
            'Content-Type'        : 'application/pdf' ,
        } ,
    } ) ;
}
