/**
 * How far the content follows a finger pulling down from the top — with
 * resistance, as the native gesture has : half the finger's travel, less
 * and less as it goes, never past `max`.
 *
 * @module helpers/gestures/pullDistance
 *
 * @param {number} dy - Pixels the pointer moved down since the press ; negative gives 0.
 * @param {Object} [options]
 * @param {number} [options.max=120] - The farthest the content goes.
 * @returns {number}
 *
 * @example
 * ```js
 * pullDistance( 0 ) ;    // → 0
 * pullDistance( 100 ) ;  // → about 42
 * pullDistance( 1000 ) ; // → 120
 * ```
 */
const pullDistance = ( dy , { max = 120 } = {} ) =>
{
    if ( !( dy > 0 ) )
    {
        return 0 ;
    }

    // An ease-out : steep at first, flat near the cap.
    return Math.round( max * ( 1 - Math.exp( -dy / ( max * 1.6 ) ) ) ) ;
} ;

export default pullDistance ;
