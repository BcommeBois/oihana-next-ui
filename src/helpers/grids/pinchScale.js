/**
 * The zoom a pinch asks for : the scale at the start, times how much the
 * two fingers moved apart, held between `min` and `max`.
 *
 * @module helpers/grids/pinchScale
 *
 * @param {number} start - The distance between the two pointers when the pinch began.
 * @param {number} now - Their distance now.
 * @param {number} from - The scale when the pinch began.
 * @param {Object} [options]
 * @param {number} [options.max=3]
 * @param {number} [options.min=0.5]
 *
 * @returns {number}
 */
const pinchScale = ( start , now , from , { max = 3 , min = 0.5 } = {} ) =>
{
    if ( !( start > 0 ) || !( now > 0 ) )
    {
        return from ;
    }

    return Math.min( max , Math.max( min , from * now / start ) ) ;
} ;

/**
 * Where the plane goes so a point of it stays under the pointer while the
 * scale changes — the pinch's middle, the wheel's cursor.
 *
 * @param {{ x : number , y : number }} offset - The plane's translation before.
 * @param {{ x : number , y : number }} point - The pointer, in the viewport's pixels.
 * @param {number} from - The scale before.
 * @param {number} to - The scale after.
 * @returns {{ x : number , y : number }}
 */
export const zoomAround = ( offset , point , from , to ) =>
{
    const ratio = to / from ;

    return {
        x : point.x - ( point.x - offset.x ) * ratio ,
        y : point.y - ( point.y - offset.y ) * ratio ,
    } ;
} ;

/**
 * The translation held so the plane never leaves its viewport empty : no
 * further right or down than its own edge, no further left or up than the
 * viewport's, and centred when it is smaller.
 *
 * @param {{ x : number , y : number }} offset
 * @param {{ height : number , width : number }} plane - Scaled.
 * @param {{ height : number , width : number }} viewport
 * @returns {{ x : number , y : number }}
 */
export const clampOffset = ( offset , plane , viewport ) =>
{
    const axis = ( value , size , room ) => ( size <= room ? ( room - size ) / 2 : Math.min( 0 , Math.max( room - size , value ) ) ) ;

    return {
        x : axis( offset.x , plane.width  , viewport.width ) ,
        y : axis( offset.y , plane.height , viewport.height ) ,
    } ;
} ;

export default pinchScale ;
