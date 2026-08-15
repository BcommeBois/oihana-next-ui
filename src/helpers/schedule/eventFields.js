/**
 * What a panel shows about an event, and how a schema.org value becomes text.
 *
 * ### The hard part is not the layout
 *
 * It is reading a value without knowing what it is. `location` accepts plain
 * text, a `Place`, a `PostalAddress` or a `VirtualLocation` ; `organizer` a
 * `Person` or an `Organization` ; `offers` a whole object. A panel that prints
 * `[object Object]` over real data has failed at its only job, so every value
 * goes through {@link formatValue} and anything it cannot name is shown as
 * nothing rather than as noise.
 *
 * ### Each descriptor carries the property it reads
 *
 * That is the hinge with a vocabulary that grows server-side : **a property
 * added to a house subtype becomes a row in one line**, and nothing here — nor
 * in `toSchemaPatch` — learns anything new.
 *
 * ```js
 * fields = [ { property : 'attendee' , type : 'text' , label : 'Attendees' } ]
 * ```
 *
 * @module helpers/schedule/eventFields
 */

import dayjs from '../date/configureDayjs' ;

import { fragmentOf } from './fragmentOf' ;

/**
 * The rows a JSON-LD event shows when nothing else is asked for.
 *
 * `name` is absent on purpose : the panel already heads itself with the title,
 * and a row repeating it is a row wasted.
 */
export const SCHEMA_FIELDS =
[
    { property : 'description'  , type : 'text' } ,
    { property : 'location'     , type : 'place' } ,
    { property : 'organizer'    , type : 'agent' } ,
    { property : 'performer'    , type : 'agent' } ,
    { property : 'url'          , type : 'url' } ,
] ;

/** The same, for the plain-object shape. */
export const PLAIN_FIELDS =
[
    { property : 'description' , type : 'text' } ,
    { property : 'location'    , type : 'place' } ,
    { property : 'url'         , type : 'url' } ,
] ;

/** Reads the display name of an object that could be almost anything. */
const nameOf = ( value ) =>
    value.name
    ?? value.alternateName
    ?? value.legalName
    ?? ( value.address ? formatValue( value.address , 'place' ) : null )
    ?? value.url
    ?? value.identifier
    ?? null ;

/** Reads a `PostalAddress`, in the order a human reads one. */
const addressOf = ( value ) => [
    value.streetAddress ,
    [ value.postalCode , value.addressLocality ].filter( Boolean ).join( ' ' ) ,
    value.addressCountry && typeof value.addressCountry === 'object' ? value.addressCountry.name : value.addressCountry ,
]
.filter( part => part !== null && part !== undefined && part !== '' )
.join( ', ' ) ;

/**
 * Turns a value into something printable, or into `null`.
 *
 * **`null` means « do not draw this row ».** An empty row and a row saying
 * `undefined` are both worse than an absent one : the first wastes the reader's
 * attention, the second spends it on a bug.
 *
 * @param {*} value - Anything the payload carried.
 * @param {string} [type='text'] - The descriptor's type.
 * @param {Object} [options]
 * @param {string} [options.lang='en'] - Active locale, for dates.
 * @returns {string|null}
 *
 * @example
 * formatValue( { '@type' : 'Place' , name : 'Auditorium' } , 'place' )  // → 'Auditorium'
 * formatValue( '2026-08-14T18:30:00.000Z' , 'datetime' )                // → '14 August 2026 20:30'
 */
export const formatValue = ( value , type = 'text' , options = {} ) =>
{
    const { lang = 'en' } = options ;

    if ( value === null || value === undefined || value === '' )
    {
        return null ;
    }

    // A repeated property is legal everywhere in schema.org, on any type.
    if ( Array.isArray( value ) )
    {
        const parts = value.map( item => formatValue( item , type , options ) ).filter( Boolean ) ;
        return parts.length === 0 ? null : parts.join( ', ' ) ;
    }

    if ( type === 'datetime' || type === 'date' )
    {
        const at = dayjs( value ) ;
        return at.isValid() ? at.locale( lang ).format( type === 'date' ? 'LL' : 'LLL' ) : null ;
    }

    if ( typeof value === 'boolean' )
    {
        return value ? '✓' : null ;
    }

    if ( typeof value !== 'object' )
    {
        return String( value ) ;
    }

    if ( type === 'place' || type === 'agent' )
    {
        // A `PostalAddress` has no name and reads as one line ; everything else
        // answers to `name` under one alias or another.
        return value.streetAddress || value.addressLocality ? ( addressOf( value ) || null ) : nameOf( value ) ;
    }

    // An enumeration member arrives as a URI more often than as a word.
    return nameOf( value ) ?? fragmentOf( value.identifier ?? value.url ) ?? null ;
} ;

/**
 * The rows to draw for one event.
 *
 * `fields` may be **a function of the event**, which is what makes a panel
 * differ by subtype without the component knowing a single one of them : a
 * lodging reservation shows its room and its guests, a delivery round shows its
 * stops, and both go through this same list.
 *
 * @param {Object} event - A normalized record.
 * @param {Object} [options]
 * @param {Array|Function} [options.fields] - Descriptors, or a function returning them.
 * @param {boolean} [options.schema=false] - Read the JSON-LD defaults rather than the plain ones.
 * @returns {Array<Object>} Descriptors, each with its `value` resolved off the source.
 *
 * @example
 * resolveFields( event , { fields : e => e.source['@type'] === 'LodgingReservation' ? rooms : undefined } )
 */
export const resolveFields = ( event , options = {} ) =>
{
    const { fields , schema = false } = options ;

    const declared = ( typeof fields === 'function' ? fields( event ) : fields )
        ?? ( schema ? SCHEMA_FIELDS : PLAIN_FIELDS ) ;

    if ( !Array.isArray( declared ) )
    {
        return [] ;
    }

    // The dates of a reservation are read on what was reserved, so its own
    // properties are looked up there too — `reservationFor` is where the name,
    // the place and the description of a booked concert actually live.
    const host = event?.span?.host ?? null ;

    return declared.map( field =>
    {
        const source = event?.source ?? {} ;
        const raw    = source[ field.property ] ?? ( host ? host[ field.property ] : undefined ) ;

        return { ...field , value : raw } ;
    } ) ;
} ;

export default resolveFields ;
