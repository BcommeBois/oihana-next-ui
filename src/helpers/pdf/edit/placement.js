import { mm } from '../units' ;

/**
 * Where something goes on a page, said the way one sees it : in
 * **millimetres from a corner**, the page's top at the top.
 *
 * A PDF counts points from the bottom-left, and places an image or a text
 * by its own bottom-left corner. This turns « 15 mm from the right and 20 mm
 * from the bottom » into those points, for an element of a given size.
 *
 * @module helpers/pdf/edit/placement
 *
 * @typedef {'top-left'|'top-center'|'top-right'|'center-left'|'center'|'center-right'|'bottom-left'|'bottom-center'|'bottom-right'} Anchor
 *
 * @param {{ width : number , height : number }} page - The page's size, in points.
 * @param {{ width : number , height : number }} box - The element's size, in points.
 * @param {Object} [options]
 * @param {Anchor} [options.anchor='top-left'] - The corner, edge or centre the offsets count from.
 * @param {number} [options.x=0] - Millimetres from the anchor's edge, towards the inside ; ignored on a centred axis.
 * @param {number} [options.y=0] - Same, vertically.
 *
 * @returns {{ x : number , y : number , top : number , left : number }} The element's bottom-left in points (`x`, `y`), and its top-left (`left`, `top` from the page's top).
 *
 * @example
 * ```js
 * placement( page.getSize() , { width : mm( 50 ) , height : mm( 20 ) } , { anchor : 'bottom-right' , x : 15 , y : 20 } ) ;
 * ```
 */
const placement = ( page , box , { anchor = 'top-left' , x = 0 , y = 0 } = {} ) =>
{
    const [ vertical , horizontal = 'center' ] = anchor === 'center' ? [ 'center' , 'center' ] : anchor.split( '-' ) ;

    let left ;
    let top ;

    if ( horizontal === 'left' )        left = mm( x ) ;
    else if ( horizontal === 'right' )  left = page.width - mm( x ) - box.width ;
    else                                left = ( page.width - box.width ) / 2 ;

    if ( vertical === 'top' )           top = mm( y ) ;
    else if ( vertical === 'bottom' )   top = page.height - mm( y ) - box.height ;
    else                                top = ( page.height - box.height ) / 2 ;

    return { left , top , x : left , y : page.height - top - box.height } ;
} ;

export default placement ;
