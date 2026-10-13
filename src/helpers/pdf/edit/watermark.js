import { hexToRgb } from './addPageNumbers' ;
import openPdf        from './openPdf' ;
import parsePageRange from './parsePageRange' ;

/**
 * Writes a word across the pages — « COPY », « CONFIDENTIAL », « DRAFT » —
 * large, light and slanted, centred on each.
 *
 * @module helpers/pdf/edit/watermark
 *
 * @param {import('../toPdfSource').PdfSource|Uint8Array} source
 * @param {string} text
 * @param {Object} [options]
 * @param {number} [options.angle=45] - Degrees, counter-clockwise.
 * @param {string} [options.color='#9ca3af'] - A hex colour.
 * @param {number} [options.fontSize] - Points ; defaults to what fits the page's width.
 * @param {number} [options.opacity=0.15]
 * @param {string|number|number[]} [options.pages] - Which pages. All by default.
 * @param {AbortSignal} [options.signal]
 *
 * @returns {Promise<Uint8Array>}
 *
 * @example
 * ```js
 * await watermark( file , 'COPIE' ) ;
 * ```
 */
const watermark = async ( source , text , { angle = 45 , color = '#9ca3af' , fontSize , opacity = 0.15 , pages , signal } = {} ) =>
{
    const { document , lib } = await openPdf( source , { signal } ) ;

    const font    = await document.embedFont( lib.StandardFonts.HelveticaBold ) ;
    const numbers = pages === undefined ? document.getPageIndices().map( index => index + 1 ) : parsePageRange( pages , document.getPageCount() ) ;
    const tint    = hexToRgb( lib , color ) ;
    const radians = angle * Math.PI / 180 ;

    for ( const number of numbers )
    {
        const page = document.getPage( number - 1 ) ;
        const { height , width } = page.getSize() ;

        // Big enough to cross the page, from the width the slanted text has to cover.
        const size = fontSize ?? Math.max( 12 , ( width * 0.8 ) / Math.max( 1 , font.widthOfTextAtSize( text , 100 ) / 100 ) ) ;

        const textWidth  = font.widthOfTextAtSize( text , size ) ;
        const textHeight = font.heightAtSize( size ) ;

        // The text turns around its bottom-left corner : offset it so its middle sits on the page's.
        const x = width / 2 - ( textWidth / 2 ) * Math.cos( radians ) + ( textHeight / 2 ) * Math.sin( radians ) ;
        const y = height / 2 - ( textWidth / 2 ) * Math.sin( radians ) - ( textHeight / 2 ) * Math.cos( radians ) ;

        page.drawText( text , { color : tint , font , opacity , rotate : lib.degrees( angle ) , size , x , y } ) ;
    }

    return document.save() ;
} ;

export default watermark ;
