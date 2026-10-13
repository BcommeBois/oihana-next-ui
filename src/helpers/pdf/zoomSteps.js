/**
 * The zoom levels a viewer steps through, and the step from one to the next.
 *
 * A factor of 1 is « fitted » — the width of the frame, or the whole page —
 * and the steps go from a half to three times that. The top is a ceiling for
 * memory : an A4 page at 3× on a Retina screen is already a 25-megapixel
 * canvas.
 *
 * @module helpers/pdf/zoomSteps
 */

/**
 * @type {ReadonlyArray<number>}
 */
export const ZOOM_STEPS = Object.freeze( [ 0.5 , 0.75 , 1 , 1.25 , 1.5 , 2 , 3 ] ) ;

/**
 * The zoom after a step up (`direction > 0`) or down from `zoom` — the first
 * level strictly past it, so a zoom set between two levels lands on a level.
 * At either end, the end.
 *
 * @param {number} zoom - The current factor.
 * @param {number} direction - Positive to zoom in, negative to zoom out.
 * @param {ReadonlyArray<number>} [steps=ZOOM_STEPS] - The levels, ascending.
 * @returns {number}
 *
 * @example
 * ```js
 * nextZoom( 1 , 1 ) ;    // 1.25
 * nextZoom( 1.1 , -1 ) ; // 1
 * nextZoom( 3 , 1 ) ;    // 3
 * ```
 */
const nextZoom = ( zoom , direction , steps = ZOOM_STEPS ) =>
{
    const epsilon = 1e-6 ;

    if ( direction > 0 )
    {
        return steps.find( step => step > zoom + epsilon ) ?? steps[ steps.length - 1 ] ;
    }

    for ( let i = steps.length - 1 ; i >= 0 ; i-- )
    {
        if ( steps[ i ] < zoom - epsilon )
        {
            return steps[ i ] ;
        }
    }

    return steps[ 0 ] ;
} ;

export default nextZoom ;
