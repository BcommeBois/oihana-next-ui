/**
 * Two hundred parcels of wood for the lab : the same on every call, drawn from
 * a seeded generator, so a search online and the reserve offline agree.
 */

const ESSENCES = [ 'Pin' , 'Chêne' , 'Douglas' , 'Épicéa' , 'Mélèze' , 'Châtaignier' ] ;

const PRODUCTS = [ 'Planche 145×26' , 'Lambourde 45×70' , 'Bastaing 63×175' , 'Poutre 75×225' , 'Volige 18×100' , 'Chevron 63×75' ] ;

const STATES = [ 'intact' , 'intact' , 'opened' , 'reserved' ] ;

const SUPPLIERS = [ 'Scierie Gaillard' , 'Bois & Forêts du Morvan' , 'Établissements Lemoine' , 'Scierie des Vosges' ] ;

const CERTIFICATES = [ 'FSC' , 'PEFC' , null ] ;

const DRYING = [ 'KD' , 'AD' ] ;

const LEVELS = [ 'A' , 'B' , 'C' , 'D' ] ;

const BASE = Date.UTC( 2026 , 9 , 1 ) ;

const DAY = 24 * 3600 * 1000 ;

/**
 * A small seeded generator (mulberry32).
 *
 * @param {number} seed
 * @returns {Function} `() => number` in [0, 1).
 */
const generator = seed =>
{
    let state = seed ;
    return () =>
    {
        state = ( state + 0x6d2b79f5 ) | 0 ;
        let value = Math.imul( state ^ ( state >>> 15 ) , 1 | state ) ;
        value = ( value + Math.imul( value ^ ( value >>> 7 ) , 61 | value ) ) ^ value ;
        return ( ( value ^ ( value >>> 14 ) ) >>> 0 ) / 4294967296 ;
    } ;
} ;

const pick = ( random , list ) => list[ Math.floor( random() * list.length ) ] ;

const random = generator( 2116318 ) ;

/**
 * The parcels, full records.
 * @type {Object[]}
 */
export const PARCELS = Array.from( { length : 200 } , ( _ , index ) =>
{
    const number = String( 2116300 + index ) ;
    const pieces = 10 + Math.floor( random() * 110 ) ;
    return {
        id            : number ,
        number ,
        product       : pick( random , PRODUCTS ) ,
        essence       : pick( random , ESSENCES ) ,
        state         : pick( random , STATES ) ,
        location      : `H${ 1 + Math.floor( random() * 4 ) }-${ String( 1 + Math.floor( random() * 20 ) ).padStart( 2 , '0' ) }-${ pick( random , LEVELS ) }` ,
        volume        : Math.round( ( 0.3 + random() * 2.2 ) * 100 ) / 100 ,
        pieces ,
        receivedAt    : new Date( BASE - Math.floor( random() * 120 ) * DAY ).toISOString().slice( 0 , 10 ) ,
        supplier      : pick( random , SUPPLIERS ) ,
        lot           : `REV/${ 300 + Math.floor( random() * 600 ) }/${ number.slice( -4 ) }` ,
        certification : pick( random , CERTIFICATES ) ,
        drying        : pick( random , DRYING ) ,
    } ;
}) ;

/**
 * What a list shows of a parcel.
 *
 * @param {Object} parcel
 * @returns {Object}
 */
export const summary = ( { essence , id , location , number , product , state , volume } ) => ( { essence , id , location , number , product , state , volume } ) ;
