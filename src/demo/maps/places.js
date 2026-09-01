/**
 * The places the map demos draw.
 *
 * Everything here is deterministic — no `Math.random`, no `Date.now` — so the
 * server and the client lay out the same points and React has nothing to
 * complain about at hydration.
 */

import { MdLocalShipping , MdStore , MdWarehouse } from 'react-icons/md' ;

export const PARIS =
{
    '@type' : 'Place' ,
    name    : 'Notre-Dame de Paris' ,
    geo     : { latitude : 48.852968 , longitude : 2.349902 } ,
} ;

export const CENTRE = { latitude : 48.8566 , longitude : 2.3522 } ;

export const ILE_DE_FRANCE = { north : 48.95 , south : 48.75 , east : 2.45 , west : 2.20 } ;

/**
 * A handful of sites around Paris, typed the way the back office types them —
 * the subtype is what gives each marker its colour, with nothing chosen by hand.
 */
export const SITES =
[
    { '@type' : 'Warehouse'    , name : 'Entrepôt de Rungis' , latitude : 48.7489 , longitude : 2.3606 } ,
    { '@type' : 'Warehouse'    , name : 'Entrepôt de Gennevilliers' , latitude : 48.9330 , longitude : 2.2940 } ,
    { '@type' : 'CustomerSite' , name : 'Client — Bastille' , latitude : 48.8532 , longitude : 2.3692 } ,
    { '@type' : 'CustomerSite' , name : 'Client — Montmartre' , latitude : 48.8867 , longitude : 2.3431 } ,
    { '@type' : 'CustomerSite' , name : 'Client — Bercy' , latitude : 48.8331 , longitude : 2.3866 } ,
    { '@type' : 'Office'       , name : 'Bureau — Opéra' , latitude : 48.8709 , longitude : 2.3317 } ,
] ;

/**
 * How a site type reads on a map. Written out rather than derived : a colour
 * built from a string never appears in the source, and Tailwind only ships
 * classes it can see.
 */
export const BY_TYPE =
{
    CustomerSite : { color : 'primary' , Icon : MdStore } ,
    Office       : { color : 'accent'  , Icon : MdLocalShipping } ,
    Warehouse    : { color : 'error'   , Icon : MdWarehouse } ,
} ;

/**
 * A linear congruential generator — the one from Numerical Recipes.
 *
 * A seeded sequence rather than `Math.random` : the demo has to draw the same
 * two hundred points on the server and in the browser.
 *
 * @param {number} seed
 * @returns {Function} A function returning the next value in [0, 1).
 */
const sequence = ( seed ) =>
{
    let state = seed ;

    return () =>
    {
        state = ( state * 1664525 + 1013904223 ) % 4294967296 ;
        return state / 4294967296 ;
    } ;
} ;

/**
 * Builds a crowd of sites, dense enough that clustering has something to do.
 *
 * They are drawn around three centres rather than spread evenly : an even
 * scatter clusters into a uniform grid, which shows the mechanism and hides
 * what it is for. Real places gather.
 *
 * @param {number} [count=240] - How many to build.
 * @returns {Array} The sites.
 */
export const makeCrowd = ( count = 240 ) =>
{
    const next    = sequence( 20260831 ) ;
    const centres = [ [ 48.8566 , 2.3522 ] , [ 48.8930 , 2.2400 ] , [ 48.8100 , 2.4200 ] ] ;
    const types   = [ 'CustomerSite' , 'CustomerSite' , 'CustomerSite' , 'Warehouse' , 'Office' ] ;
    const crowd   = [] ;

    for ( let index = 0 ; index < count ; index++ )
    {
        const [ latitude , longitude ] = centres[ index % centres.length ] ;
        const spread = 0.02 + next() * 0.05 ;

        crowd.push({
            '@type'   : types[ Math.floor( next() * types.length ) ] ,
            _key      : `crowd-${ index }` ,
            latitude  : latitude  + ( next() - 0.5 ) * spread * 2 ,
            longitude : longitude + ( next() - 0.5 ) * spread * 3 ,
            name      : `Site ${ index + 1 }` ,
        }) ;
    }

    return crowd ;
} ;

/**
 * Two delivery routes, the way the back office describes them : places that
 * carry the rank at which their circuit serves them, and a route term that
 * carries its own colour.
 *
 * The ranks are deliberately out of order in the list — sorting them is the
 * adapter's job, not the fixture's.
 */
export const ROUTES =
[
    {
        '@type' : 'DeliveryRouteTerm' ,
        color   : '#b45309' ,
        name    : 'Tournée Nord' ,
        stops   :
        [
            { '@type' : 'CustomerSite' , name : 'Saint-Ouen'      , position : 3 , latitude : 48.9057 , longitude : 2.3336 } ,
            { '@type' : 'Warehouse'    , name : 'Gennevilliers'   , position : 1 , latitude : 48.9330 , longitude : 2.2940 } ,
            { '@type' : 'CustomerSite' , name : 'Clichy'          , position : 2 , latitude : 48.9044 , longitude : 2.3064 } ,
            { '@type' : 'CustomerSite' , name : 'Montmartre'      , position : 5 , latitude : 48.8867 , longitude : 2.3431 } ,
            { '@type' : 'CustomerSite' , name : 'La Chapelle'     , position : 4 , latitude : 48.8900 , longitude : 2.3600 } ,
        ] ,
    } ,
    {
        '@type' : 'DeliveryRouteTerm' ,
        color   : '#0f766e' ,
        name    : 'Tournée Sud' ,
        stops   :
        [
            { '@type' : 'Warehouse'    , name : 'Rungis'          , position : 1 , latitude : 48.7489 , longitude : 2.3606 } ,
            { '@type' : 'CustomerSite' , name : 'Ivry'            , position : 2 , latitude : 48.8130 , longitude : 2.3880 } ,
            { '@type' : 'CustomerSite' , name : 'Bercy'           , position : 3 , latitude : 48.8331 , longitude : 2.3866 } ,
            { '@type' : 'CustomerSite' , name : 'Bastille'        , position : 4 , latitude : 48.8532 , longitude : 2.3692 } ,
        ] ,
    } ,
] ;

/**
 * A path that follows the roads rather than cutting across them — what a
 * routing service would answer for the first three stops of the northern route.
 * Shortened by hand : enough points to read as a road, not a real trace.
 */
export const NORTH_PATH =
{
    type     : 'Feature' ,
    geometry :
    {
        type        : 'LineString' ,
        coordinates :
        [
            [ 2.2940 , 48.9330 ] , [ 2.2980 , 48.9250 ] , [ 2.3010 , 48.9160 ] ,
            [ 2.3064 , 48.9044 ] , [ 2.3140 , 48.9020 ] , [ 2.3250 , 48.9010 ] ,
            [ 2.3336 , 48.9057 ] , [ 2.3420 , 48.9000 ] , [ 2.3520 , 48.8940 ] ,
            [ 2.3600 , 48.8900 ] , [ 2.3540 , 48.8880 ] , [ 2.3431 , 48.8867 ] ,
        ] ,
    } ,
    properties : {} ,
} ;
