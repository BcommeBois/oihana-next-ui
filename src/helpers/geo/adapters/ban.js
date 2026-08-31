/**
 * Geocoding against the French Base Adresse Nationale.
 *
 * ### It is an adapter, not a default
 *
 * No component imports this. `InputAddressSearch` takes a `geocode` function
 * and knows nothing about who answers it — which is what keeps the library out
 * of a decision that belongs to the application : which provider, under which
 * contract, in which country. This one is shipped because it is the provider a
 * French back office actually wants, and writing it once here beats writing it
 * again in every application.
 *
 * `api-adresse.data.gouv.fr` is free, needs no key and no account, and is
 * better on French addresses than any international service. It is also
 * useless outside France, which is exactly why it is not wired in by default.
 *
 * @module helpers/geo/adapters/ban
 * @see https://adresse.data.gouv.fr/api-doc/adresse
 */

const ENDPOINT = 'https://api-adresse.data.gouv.fr/search/' ;

/** The service refuses anything shorter, so asking is a wasted round trip. */
export const MIN_LENGTH = 3 ;

/**
 * Reads one BAN feature into a schema.org `Place`.
 *
 * **The coordinates are inverted here**, and it is the only line in this file
 * that matters : BAN answers GeoJSON, so `geometry.coordinates` is
 * `[ longitude , latitude ]`, while everything on our side is named. Reading
 * them in the wrong order puts every French address in the Indian Ocean.
 *
 * @param {Object} feature - A GeoJSON feature from the BAN.
 * @returns {Object} A `Place`.
 */
const toPlace = ( feature ) =>
{
    const [ longitude , latitude ] = feature?.geometry?.coordinates ?? [] ;

    const {
        city ,
        context ,
        id ,
        label ,
        name ,
        postcode ,
        score ,
        type ,
    }
    = feature?.properties ?? {} ;

    return {
        '@context' : 'https://schema.org' ,
        '@type'    : 'Place' ,
        address    : {
            '@type'         : 'PostalAddress' ,
            addressCountry  : 'FR' ,
            addressLocality : city ,
            addressRegion   : context ,
            postalCode      : postcode ,
            streetAddress   : name ,
        } ,
        geo : {
            '@type'   : 'GeoCoordinates' ,
            latitude ,
            longitude ,
        } ,
        id ,
        name : label ,

        // Kept out of the vocabulary on purpose : `score` and `type` are the
        // service's own, and a caller ranking or filtering results needs them.
        additionalProperty : { score , type } ,
    } ;
} ;

/**
 * Searches the Base Adresse Nationale.
 *
 * @param {string} query - What the user typed.
 * @param {Object} [options]
 * @param {number} [options.limit=5] - How many results at most.
 * @param {AbortSignal} [options.signal] - Cancels a superseded request.
 * @param {Object} [options.params] - Extra query parameters — `postcode`, `citycode`, `type`, `lat`/`lon` to bias the search.
 * @returns {Promise<Object[]>} Places, best first. Empty when the query is too short.
 *
 * @example
 * ```jsx
 * import ban from 'oihana-next-ui/helpers/geo/adapters/ban'
 *
 * <InputAddressSearch geocode={ ban } onSelect={ ( place ) => … } />
 * ```
 */
const ban = async ( query , { limit = 5 , params , signal } = {} ) =>
{
    const text = String( query ?? '' ).trim() ;

    if ( text.length < MIN_LENGTH )
    {
        return [] ;
    }

    const url = new URL( ENDPOINT ) ;

    url.searchParams.set( 'q' , text ) ;
    url.searchParams.set( 'limit' , String( limit ) ) ;

    for ( const [ key , value ] of Object.entries( params ?? {} ) )
    {
        if ( value !== undefined && value !== null && value !== '' )
        {
            url.searchParams.set( key , String( value ) ) ;
        }
    }

    const response = await fetch( url , { signal } ) ;

    if ( !response.ok )
    {
        throw new Error( `Base Adresse Nationale answered ${ response.status }` ) ;
    }

    const body = await response.json() ;

    return ( body?.features ?? [] ).map( toPlace ) ;
} ;

export default ban ;
