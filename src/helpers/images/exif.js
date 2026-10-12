/**
 * The little of EXIF the library needs : whether a JPEG carries any, and the
 * position it was taken at.
 *
 * A reader, never a writer, and only of what is asked : the JPEG segments up to
 * the image data, the TIFF header of the `Exif` segment, the first directory
 * and the GPS one. Anything malformed reads as « nothing there » rather than
 * throwing — a photo is never refused for its metadata.
 *
 * The metadata of a photo sits in its first 64 KB : reading
 * {@link EXIF_READ_LENGTH} bytes of a file is enough.
 *
 * @module helpers/images/exif
 */

/**
 * How many bytes of a file to read to find its EXIF : a JPEG segment holds 64 KB at most.
 * @type {number}
 */
export const EXIF_READ_LENGTH = 128 * 1024 ;

const SOI  = 0xd8 ;
const SOS  = 0xda ;
const EOI  = 0xd9 ;
const APP1 = 0xe1 ;

const GPS_IFD_POINTER = 0x8825 ;

const GPS_LATITUDE_REF  = 0x0001 ;
const GPS_LATITUDE      = 0x0002 ;
const GPS_LONGITUDE_REF = 0x0003 ;
const GPS_LONGITUDE     = 0x0004 ;
const GPS_ALTITUDE_REF  = 0x0005 ;
const GPS_ALTITUDE      = 0x0006 ;

/**
 * @param {ArrayBuffer|Uint8Array} input
 * @returns {Uint8Array}
 */
const toBytes = input => ( input instanceof Uint8Array ? input : new Uint8Array( input ?? new ArrayBuffer( 0 ) ) ) ;

/**
 * Finds the TIFF block of the `Exif` segment of a JPEG.
 *
 * @param {Uint8Array} bytes
 * @returns {?{ view : DataView , start : number , little : boolean }} `start` : where the TIFF header begins.
 */
const findTiff = bytes =>
{
    if ( bytes.length < 4 || bytes[ 0 ] !== 0xff || bytes[ 1 ] !== SOI )
    {
        return null ;
    }

    const view = new DataView( bytes.buffer , bytes.byteOffset , bytes.byteLength ) ;

    let offset = 2 ;

    while ( offset + 4 <= bytes.length )
    {
        if ( bytes[ offset ] !== 0xff )
        {
            return null ;
        }

        const marker = bytes[ offset + 1 ] ;

        if ( marker === SOS || marker === EOI )
        {
            return null ;
        }

        // Fill bytes before a marker.
        if ( marker === 0xff )
        {
            offset += 1 ;
            continue ;
        }

        const length = view.getUint16( offset + 2 ) ;

        if ( length < 2 )
        {
            return null ;
        }

        if ( marker === APP1 && offset + 10 <= bytes.length )
        {
            const header = String.fromCharCode( ...bytes.subarray( offset + 4 , offset + 10 ) ) ;

            if ( header === 'Exif\0\0' )
            {
                const start = offset + 10 ;

                if ( start + 8 > bytes.length )
                {
                    return null ;
                }

                const order = view.getUint16( start ) ;

                if ( order !== 0x4949 && order !== 0x4d4d )
                {
                    return null ;
                }

                return { little : order === 0x4949 , start , view } ;
            }
        }

        offset += 2 + length ;
    }

    return null ;
} ;

/**
 * Whether a JPEG carries an `Exif` segment — camera, date, position, orientation.
 *
 * @param {ArrayBuffer|Uint8Array} input - The start of the file, {@link EXIF_READ_LENGTH} bytes are enough.
 * @returns {boolean} `false` for anything that is not a JPEG.
 *
 * @example
 * ```js
 * hasExif( await file.slice( 0 , EXIF_READ_LENGTH ).arrayBuffer() ) ; // true for a phone photo
 * ```
 */
export const hasExif = input => findTiff( toBytes( input ) ) !== null ;

/**
 * Reads the entries of one directory into a map : tag → entry offset.
 *
 * @param {DataView} view
 * @param {number} start - The TIFF header.
 * @param {number} ifd - The directory, from the TIFF header.
 * @param {boolean} little
 * @returns {?Map<number,number>}
 */
const readDirectory = ( view , start , ifd , little ) =>
{
    const at = start + ifd ;

    if ( ifd < 8 || at + 2 > view.byteLength )
    {
        return null ;
    }

    const count   = view.getUint16( at , little ) ;
    const entries = new Map() ;

    for ( let index = 0 ; index < count ; index++ )
    {
        const entry = at + 2 + index * 12 ;

        if ( entry + 12 > view.byteLength )
        {
            break ;
        }

        entries.set( view.getUint16( entry , little ) , entry ) ;
    }

    return entries ;
} ;

/**
 * Reads `count` unsigned rationals pointed at by an entry.
 *
 * @returns {?number[]}
 */
const readRationals = ( view , start , entry , little , count ) =>
{
    if ( entry === undefined || view.getUint16( entry + 2 , little ) !== 5 || view.getUint32( entry + 4 , little ) < count )
    {
        return null ;
    }

    const at = start + view.getUint32( entry + 8 , little ) ;

    if ( at + count * 8 > view.byteLength )
    {
        return null ;
    }

    const values = [] ;

    for ( let index = 0 ; index < count ; index++ )
    {
        const numerator   = view.getUint32( at + index * 8 , little ) ;
        const denominator = view.getUint32( at + index * 8 + 4 , little ) ;

        if ( denominator === 0 )
        {
            return null ;
        }

        values.push( numerator / denominator ) ;
    }

    return values ;
} ;

/**
 * Reads the first character of an inline ASCII entry : `N`, `S`, `E`, `W`.
 */
const readLetter = ( view , entry ) => ( entry === undefined ? null : String.fromCharCode( view.getUint8( entry + 8 ) ) ) ;

/**
 * Degrees, minutes, seconds → decimal degrees, signed by the reference.
 */
const toDegrees = ( [ degrees , minutes , seconds ] , negative ) =>
{
    const value = degrees + minutes / 60 + seconds / 3600 ;
    return negative ? -value : value ;
} ;

/**
 * Rounds to 7 decimals — about a centimetre, more than any phone measures.
 */
const round7 = value => Math.round( value * 1e7 ) / 1e7 ;

/**
 * The position a photo was taken at, from its EXIF.
 *
 * Named after schema.org's `GeoCoordinates` — `elevation`, not the `altitude`
 * of the browser's Geolocation API — so it can be sent as is. `elevation`, in
 * metres, is only there when the photo has one ; it is negative below sea level.
 *
 * ⚠️ Most photos given to a web page have none : iOS takes the position out
 * before the page sees the file, and an Android camera only writes one when
 * its own location setting is on.
 *
 * @param {ArrayBuffer|Uint8Array} input - The start of the file, {@link EXIF_READ_LENGTH} bytes are enough.
 * @returns {?{ latitude : number , longitude : number , elevation? : number }} `null` when there is none, or when it makes no sense.
 */
export const readGpsLocation = input =>
{
    const tiff = findTiff( toBytes( input ) ) ;

    if ( !tiff )
    {
        return null ;
    }

    const { little , start , view } = tiff ;

    const first = readDirectory( view , start , view.getUint32( start + 4 , little ) , little ) ;
    const gpsEntry = first?.get( GPS_IFD_POINTER ) ;

    if ( gpsEntry === undefined )
    {
        return null ;
    }

    const gps = readDirectory( view , start , view.getUint32( gpsEntry + 8 , little ) , little ) ;

    if ( !gps )
    {
        return null ;
    }

    const latitude  = readRationals( view , start , gps.get( GPS_LATITUDE ) , little , 3 ) ;
    const longitude = readRationals( view , start , gps.get( GPS_LONGITUDE ) , little , 3 ) ;

    if ( !latitude || !longitude )
    {
        return null ;
    }

    const location =
    {
        latitude  : round7( toDegrees( latitude , readLetter( view , gps.get( GPS_LATITUDE_REF ) ) === 'S' ) ) ,
        longitude : round7( toDegrees( longitude , readLetter( view , gps.get( GPS_LONGITUDE_REF ) ) === 'W' ) ) ,
    } ;

    if ( Math.abs( location.latitude ) > 90 || Math.abs( location.longitude ) > 180 )
    {
        return null ;
    }

    const altitude = readRationals( view , start , gps.get( GPS_ALTITUDE ) , little , 1 ) ;

    if ( altitude )
    {
        const below = gps.has( GPS_ALTITUDE_REF ) && view.getUint8( gps.get( GPS_ALTITUDE_REF ) + 8 ) === 1 ;
        location.elevation = Math.round( ( below ? -altitude[ 0 ] : altitude[ 0 ] ) * 100 ) / 100 ;
    }

    return location ;
} ;
