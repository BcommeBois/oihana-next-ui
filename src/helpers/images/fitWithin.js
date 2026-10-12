/**
 * The size of an image brought within a square of `maxSize`, its proportions kept.
 *
 * Never enlarges : an image already within the bound keeps its size. The result
 * is rounded to whole pixels, never under 1.
 *
 * @module helpers/images/fitWithin
 *
 * @param {number} width
 * @param {number} height
 * @param {?number} [maxSize] - The largest width and height. None, 0 or `Infinity` : no bound.
 * @returns {{ width : number , height : number }}
 *
 * @example
 * ```js
 * fitWithin( 4000 , 3000 , 1600 ) ; // { width : 1600 , height : 1200 }
 * fitWithin( 800 , 600 , 1600 ) ;   // { width : 800 , height : 600 }
 * ```
 */
const fitWithin = ( width , height , maxSize ) =>
{
    const longest = Math.max( width , height ) ;

    const scale = maxSize > 0 && longest > maxSize ? maxSize / longest : 1 ;

    return {
        height : Math.max( 1 , Math.round( height * scale ) ) ,
        width  : Math.max( 1 , Math.round( width * scale ) ) ,
    } ;
} ;

export default fitWithin ;
