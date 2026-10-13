/**
 * What a horizontal drag on a row means, from how far the pointer went.
 *
 * Nothing is decided before the pointer has travelled `lock` pixels : then
 * the axis is the one it moved the most along — horizontal is a swipe,
 * vertical is a scroll the row leaves alone. Past that, `direction` is where
 * the content is pushed, `progress` how far towards `threshold` (a share of
 * the row's width), and `beyond` whether letting go now fires the action.
 *
 * @module helpers/gestures/swipeDecision
 *
 * @param {Object} move
 * @param {number} move.dx - Pixels moved horizontally since the press, right positive.
 * @param {number} move.dy - Pixels moved vertically.
 * @param {number} move.width - The row's width.
 * @param {number} [move.lock=8] - Pixels before the axis is decided.
 * @param {number} [move.threshold=0.4] - The share of the width past which the action fires.
 *
 * @returns {{ axis : ?('x'|'y') , beyond : boolean , direction : ?('left'|'right') , progress : number }}
 */
const swipeDecision = ( { dx , dy , lock = 8 , threshold = 0.4 , width } ) =>
{
    const ax = Math.abs( dx ) ;
    const ay = Math.abs( dy ) ;

    if ( Math.max( ax , ay ) < lock )
    {
        return { axis : null , beyond : false , direction : null , progress : 0 } ;
    }

    if ( ay > ax )
    {
        return { axis : 'y' , beyond : false , direction : null , progress : 0 } ;
    }

    const limit    = Math.max( 1 , width * threshold ) ;
    const progress = Math.min( 1 , ax / limit ) ;

    return { axis : 'x' , beyond : ax >= limit , direction : dx > 0 ? 'right' : 'left' , progress } ;
} ;

export default swipeDecision ;
