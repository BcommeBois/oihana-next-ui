import { PARCELS } from '@/demo/offline/parcels' ;

/**
 * One parcel of the lab, whole — what a page keeps in its reserve once seen.
 *
 * @param {Request} _request
 * @param {{ params : Promise<{ id : string }> }} context
 * @returns {Promise<Response>}
 */
export async function GET( _request , { params } )
{
    const { id } = await params ;

    const parcel = PARCELS.find( one => one.id === id ) ;

    return parcel
        ? Response.json( parcel )
        : Response.json( { code : 'not_found' , message : 'No such parcel.' } , { status : 404 } ) ;
}
