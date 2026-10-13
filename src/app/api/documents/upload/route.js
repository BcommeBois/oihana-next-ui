/**
 * Receives a generated PDF, as an API that stores documents would — and
 * stores nothing : it answers what it got, so the page can say so.
 *
 * `POST /api/documents/upload` takes a multipart form with the file in
 * `file` (what `uploadPdf` sends) and answers `{ name , size , type , fields }`.
 *
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export async function POST( request )
{
    let form ;

    try
    {
        form = await request.formData() ;
    }
    catch
    {
        return Response.json( { error : 'A multipart form is expected.' } , { status : 400 } ) ;
    }

    const file = form.get( 'file' ) ;

    if ( !( file instanceof Blob ) )
    {
        return Response.json( { error : 'A file is expected in « file ».' } , { status : 422 } ) ;
    }

    if ( file.type !== 'application/pdf' )
    {
        return Response.json( { error : 'Only a PDF is accepted.' } , { status : 415 } ) ;
    }

    const fields = Object.fromEntries( [ ...form.entries() ].filter( ( [ name , value ] ) => name !== 'file' && typeof value === 'string' ) ) ;

    return Response.json( { fields , name : file.name , size : file.size , type : file.type } , { status : 201 } ) ;
}
