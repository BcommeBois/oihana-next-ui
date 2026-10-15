import { PARCELS , summary } from '@/demo/offline/parcels' ;

import { normalizeText } from '@/offline/store/query' ;

/**
 * Searches the lab's parcels, as an API would — the server's search, that the
 * reserve stands in for offline.
 *
 * `GET /api/offline/parcels?q=&essence=&state=&available=1&limit=20&offset=0`
 * answers `{ items , total }` ; `full=1` answers whole records (to prepare a
 * day), `available=1` keeps the parcels with stock right now — a figure only
 * the server has.
 *
 * @param {Request} request
 * @returns {Response}
 */
export function GET( request )
{
    const params = new URL( request.url ).searchParams ;

    const words     = normalizeText( params.get( 'q' ) ).split( /\s+/ ).filter( Boolean ) ;
    const essence   = params.get( 'essence' ) ;
    const state     = params.get( 'state' ) ;
    const available = params.get( 'available' ) === '1' ;
    const full      = params.get( 'full' ) === '1' ;
    const limit     = Number( params.get( 'limit' ) ?? 20 ) ;
    const offset    = Number( params.get( 'offset' ) ?? 0 ) ;

    const found = PARCELS.filter( parcel =>
    {
        const text = normalizeText( [ parcel.number , parcel.product , parcel.essence , parcel.location , parcel.supplier ].join( ' ' ) ) ;
        return words.every( word => text.includes( word ) )
            && ( !essence || parcel.essence === essence )
            && ( !state || parcel.state === state )
            && ( !available || ( parcel.state !== 'reserved' && Number( parcel.number ) % 3 !== 0 ) ) ;
    }) ;

    const page = found.slice( offset , offset + limit ) ;

    return Response.json( { items : full ? page : page.map( summary ) , total : found.length } ) ;
}
