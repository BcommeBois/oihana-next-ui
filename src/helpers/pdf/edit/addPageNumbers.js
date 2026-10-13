import openPdf        from './openPdf' ;
import parsePageRange from './parsePageRange' ;
import placement      from './placement' ;

/**
 * Writes « n / N » on the pages, in Helvetica, where a footer goes.
 *
 * `format` takes the page's number and the count : `'{0} / {1}'`, `'Page {0}'`,
 * `'– {0} –'`. `from` is the number the first numbered page gets, and `pages`
 * says which pages are numbered — a cover is skipped with `pages : '2-'`.
 * The count written is the number of numbered pages.
 *
 * @module helpers/pdf/edit/addPageNumbers
 *
 * @param {import('../toPdfSource').PdfSource|Uint8Array} source
 * @param {Object} [options]
 * @param {string} [options.color='#6b7280'] - The text's colour, a hex colour.
 * @param {number} [options.fontSize=9]
 * @param {string} [options.format='{0} / {1}']
 * @param {number} [options.from=1] - The number of the first numbered page.
 * @param {number} [options.margin=12] - Millimetres from the edges.
 * @param {string|number|number[]} [options.pages] - Which pages are numbered. All by default.
 * @param {import('./placement').Anchor} [options.position='bottom-center']
 * @param {AbortSignal} [options.signal]
 *
 * @returns {Promise<Uint8Array>}
 *
 * @example
 * ```js
 * await addPageNumbers( file , { pages : '2-' , position : 'bottom-right' } ) ;
 * ```
 */

/** A hex colour as the engine's `rgb`, 0 to 1 each. */
export const hexToRgb = ( lib , hex ) =>
{
    const value = String( hex ).replace( '#' , '' ) ;
    const full  = value.length === 3 ? value.split( '' ).map( character => character + character ).join( '' ) : value ;
    const n     = Number.parseInt( full , 16 ) ;

    return lib.rgb( ( ( n >> 16 ) & 255 ) / 255 , ( ( n >> 8 ) & 255 ) / 255 , ( n & 255 ) / 255 ) ;
} ;

const addPageNumbers = async ( source , { color = '#6b7280' , fontSize = 9 , format = '{0} / {1}' , from = 1 , margin = 12 , pages , position = 'bottom-center' , signal } = {} ) =>
{
    const { document , lib } = await openPdf( source , { signal } ) ;

    const font    = await document.embedFont( lib.StandardFonts.Helvetica ) ;
    const numbers = pages === undefined ? document.getPageIndices().map( index => index + 1 ) : parsePageRange( pages , document.getPageCount() ) ;
    const tint    = hexToRgb( lib , color ) ;

    numbers.forEach( ( number , index ) =>
    {
        const page = document.getPage( number - 1 ) ;
        const text = format.replace( '{0}' , String( from + index ) ).replace( '{1}' , String( from + numbers.length - 1 ) ) ;

        const box = { height : font.heightAtSize( fontSize ) , width : font.widthOfTextAtSize( text , fontSize ) } ;
        const { x , y } = placement( page.getSize() , box , { anchor : position , x : margin , y : margin } ) ;

        page.drawText( text , { color : tint , font , size : fontSize , x , y } ) ;
    } ) ;

    return document.save() ;
} ;

export default addPageNumbers ;
