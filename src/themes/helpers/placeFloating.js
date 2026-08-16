/**
 * Where a floating bubble goes, given its trigger and the room the page leaves.
 *
 * Pure, and deliberately so : this is the whole of what « aligns elegantly
 * depending on where you are in the page » amounts to — prefer one side, flip
 * when it does not fit, centre on the trigger, then pull back inside the window.
 * Written as a function rather than inside a component, it can be checked
 * without a browser, which is the only way to be sure of the edge cases that a
 * screenshot never shows.
 *
 * @module themes/helpers/placeFloating
 */

/** Room left between the bubble and its trigger. */
export const GAP = 8 ;

/** Room left between the bubble and the edges of the window. */
export const MARGIN = 8 ;

/**
 * @typedef {Object} FloatingPlacement
 * @property {number} left      - Viewport coordinate.
 * @property {number} top       - Viewport coordinate.
 * @property {'top'|'bottom'} direction - Which side of the trigger it landed on.
 */

/**
 * @param {{top: number, bottom: number, left: number, width: number}} anchor - The trigger's rect.
 * @param {{width: number, height: number}} bubble - The bubble's own, **as rendered** — estimating it puts the bubble a few pixels off and, near an edge, makes it flip the wrong way.
 * @param {{width: number, height: number}} viewport
 * @returns {FloatingPlacement}
 *
 * @example
 * placeFloating( trigger.getBoundingClientRect() , tip.getBoundingClientRect() , { width : innerWidth , height : innerHeight } )
 */
export const placeFloating = ( anchor , bubble , viewport ) =>
{
    // Above by preference : a bubble under a trigger tends to cover the very
    // thing the reader is about to click. Below only when there is no room —
    // and if neither side has any, above still loses less.
    const above = anchor.top - bubble.height - GAP >= MARGIN ;
    const below = anchor.bottom + bubble.height + GAP <= viewport.height - MARGIN ;

    const direction = above || !below ? 'top' : 'bottom' ;

    const top = direction === 'top'
        ? Math.max( MARGIN , anchor.top - bubble.height - GAP )
        : anchor.bottom + GAP ;

    // Centred on the trigger, then pulled back inside the window. Clamping after
    // centring is what keeps a bubble near an edge whole instead of half off the
    // screen, and the `Math.max` guards the case of a bubble wider than the
    // window, where the two bounds cross.
    const centred = anchor.left + anchor.width / 2 - bubble.width / 2 ;
    const left    = Math.min( Math.max( centred , MARGIN ) , Math.max( MARGIN , viewport.width - bubble.width - MARGIN ) ) ;

    return { direction , left , top } ;
} ;

export default placeFloating ;
