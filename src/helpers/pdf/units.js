/**
 * Points from millimetres, and the sizes of the usual pages.
 *
 * A PDF is measured in points, 72 to the inch ; a label, a margin, a sheet
 * are thought of in millimetres. `mm( 210 )` is the width of an A4, `mm( 0.33 )`
 * the module of a barcode, and `pageSize( 'A4' )` what a `<Page size>` takes.
 *
 * @module helpers/pdf/units
 */

/** @type {number} */
export const POINTS_PER_INCH = 72 ;

/** @type {number} */
export const MM_PER_INCH = 25.4 ;

/**
 * The usual pages, portrait, in millimetres.
 *
 * @type {Object.<string,[number,number]>}
 */
export const PAGE_SIZES = Object.freeze(
{
    A3     : [ 297 , 420 ] ,
    A4     : [ 210 , 297 ] ,
    A5     : [ 148 , 210 ] ,
    A6     : [ 105 , 148 ] ,
    LEGAL  : [ 215.9 , 355.6 ] ,
    LETTER : [ 215.9 , 279.4 ] ,
} ) ;

/**
 * Millimetres to points.
 *
 * @param {number} value
 * @returns {number}
 */
export const mm = value => value * POINTS_PER_INCH / MM_PER_INCH ;

/**
 * Centimetres to points.
 *
 * @param {number} value
 * @returns {number}
 */
export const cm = value => mm( value * 10 ) ;

/**
 * Inches to points.
 *
 * @param {number} value
 * @returns {number}
 */
export const inch = value => value * POINTS_PER_INCH ;

/**
 * Points to millimetres.
 *
 * @param {number} points
 * @returns {number}
 */
export const toMm = points => points * MM_PER_INCH / POINTS_PER_INCH ;

/**
 * The size of a page in points, as `<Page size>` takes it : a name
 * (`'A4'`, `'letter'`), `[ width , height ]` or `{ width , height }` in
 * millimetres — the sheet of labels no name covers.
 *
 * @param {string|[number,number]|{ width : number , height : number }} [size='A4']
 * @param {Object} [options]
 * @param {boolean} [options.landscape=false] - The long edge across.
 * @returns {[number,number]} `[ width , height ]`, in points.
 *
 * @example
 * ```jsx
 * <Page size={ pageSize( 'A4' ) }>
 * <Page size={ pageSize( { width : 99.1 , height : 38.1 } ) }>   // one label
 * ```
 */
const pageSize = ( size = 'A4' , { landscape = false } = {} ) =>
{
    let dimensions ;

    if ( Array.isArray( size ) )
    {
        dimensions = size ;
    }
    else if ( size && typeof size === 'object' )
    {
        dimensions = [ size.width , size.height ] ;
    }
    else
    {
        dimensions = PAGE_SIZES[ String( size ).toUpperCase() ] ?? PAGE_SIZES.A4 ;
    }

    const [ width , height ] = dimensions.map( mm ) ;

    return landscape ? [ height , width ] : [ width , height ] ;
} ;

export default pageSize ;
