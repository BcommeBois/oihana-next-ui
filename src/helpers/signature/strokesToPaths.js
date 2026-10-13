import getStroke from 'perfect-freehand' ;

/**
 * Turns the strokes of a signature into SVG paths — one `d` per stroke.
 *
 * Each stroke is a list of `[ x , y , pressure ]` points ; `perfect-freehand`
 * gives it the outline of a pen stroke, thick where the hand slowed, thin
 * where it sped up, and that polygon becomes a closed path of quadratic
 * curves. The same paths draw the pad on screen, the SVG, the PNG and the
 * PDF : what is seen is what is exported.
 *
 * Pure : no DOM, no canvas — a route handler draws a received signature as
 * the page does.
 *
 * @module helpers/signature/strokesToPaths
 *
 * @param {import('./scaleSignature').Signature} signature - `{ width , height , strokes }`.
 * @param {Object} [options]
 * @param {number} [options.size=3] - The pen's width, in the signature's units.
 * @param {number} [options.thinning=0.6] - How much pressure or speed thins the stroke, 0 to 1.
 *
 * @returns {string[]} One path per stroke ; a stroke with no point gives none.
 */

const round = value => Math.round( value * 100 ) / 100 ;

/** The outline polygon as a closed path of quadratic curves, as perfect-freehand documents it. */
const outlineToPath = outline =>
{
    if ( outline.length === 0 )
    {
        return '' ;
    }

    const parts = [ 'M' , round( outline[ 0 ][ 0 ] ) , round( outline[ 0 ][ 1 ] ) , 'Q' ] ;

    for ( let index = 0 ; index < outline.length ; index++ )
    {
        const [ x0 , y0 ] = outline[ index ] ;
        const [ x1 , y1 ] = outline[ ( index + 1 ) % outline.length ] ;

        parts.push( round( x0 ) , round( y0 ) , round( ( x0 + x1 ) / 2 ) , round( ( y0 + y1 ) / 2 ) ) ;
    }

    parts.push( 'Z' ) ;

    return parts.join( ' ' ) ;
} ;

const strokesToPaths = ( signature , { size = 3 , thinning = 0.6 } = {} ) =>
    ( signature?.strokes ?? [] )
        .filter( stroke => Array.isArray( stroke ) && stroke.length > 0 )
        .map( stroke => outlineToPath( getStroke( stroke , { last : true , simulatePressure : stroke.every( point => ( point[ 2 ] ?? 0.5 ) === 0.5 ) , size , smoothing : 0.5 , streamline : 0.5 , thinning } ) ) )
        .filter( Boolean ) ;

export default strokesToPaths ;
