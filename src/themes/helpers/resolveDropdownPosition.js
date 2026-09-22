/**
 * Resolves where a dropdown panel opens from its trigger : the side it opens
 * toward (`direction`) and how it aligns along the trigger (`placement`).
 *
 * A pure function of the trigger's rect and the viewport, shared by
 * {@link module:themes/hooks/useDropdownPosition} (a trigger the hook owns)
 * and `Popover`'s `autoPosition` (a trigger the caller owns).
 *
 * **Give it an ESTIMATED panel size, not a measured one.** A panel whose
 * content arrives after it opens — a list loaded on demand — measures empty at
 * the opening : judged on that, it opens downward and overflows a moment later.
 * Estimate the full panel instead.
 *
 * - **direction** — `top` / `bottom` : the side where the panel fits, else the
 *   roomier one. `left` / `right` likewise, when one of them is preferred.
 * - **placement** — along a top / bottom panel : against the edge that has room
 *   (`end` expands leftward, `start` rightward), else by the trigger's third of
 *   the viewport (LTR). Along a left / right panel : the same by height.
 *
 * @module themes/helpers/resolveDropdownPosition
 */

/**
 * @typedef {'top'|'bottom'|'left'|'right'} DropdownDirection
 * @typedef {'start'|'center'|'end'}        DropdownPlacement
 */

/**
 * Resolves the best horizontal placement for top/bottom dropdowns.
 *
 * Logic (LTR):
 * - Button near left edge  → 'start'  (panel expands rightward)
 * - Button near right edge → 'end'    (panel expands leftward, stays in viewport)
 * - Button near center     → 'center'
 *
 * @param {DOMRect} rect           - Trigger bounding rect.
 * @param {number}  panelWidth     - Estimated panel width.
 * @param {number}  viewportWidth  - Current viewport width.
 * @returns {DropdownPlacement}
 */
export const resolveHorizontalPlacement = ( rect , panelWidth , viewportWidth ) =>
{
    const spaceRight = viewportWidth - rect.right ;
    const spaceLeft  = rect.left ;

    // Not enough space to the right → anchor to end (panel expands leftward)
    if ( spaceRight < panelWidth && spaceLeft >= panelWidth )
    {
        return 'end' ;
    }

    // Not enough space to the left → anchor to start (panel expands rightward)
    if ( spaceLeft < panelWidth && spaceRight >= panelWidth )
    {
        return 'start' ;
    }

    // Both sides have space — use button's horizontal position relative to viewport thirds
    const third = viewportWidth / 3 ;

    if ( rect.left < third )
    {
        return 'start' ;
    }

    if ( rect.right > third * 2 )
    {
        return 'end' ;
    }

    return 'center' ;
} ;

/**
 * Resolves the best vertical placement for left/right dropdowns.
 *
 * @param {DOMRect} rect           - Trigger bounding rect.
 * @param {number}  panelHeight    - Estimated panel height.
 * @param {number}  viewportHeight - Current viewport height.
 * @returns {DropdownPlacement}
 */
export const resolveVerticalPlacement = ( rect , panelHeight , viewportHeight ) =>
{
    const spaceBelow = viewportHeight - rect.bottom ;
    const spaceAbove = rect.top ;

    if ( spaceBelow < panelHeight && spaceAbove >= panelHeight )
    {
        return 'end' ;
    }

    if ( spaceAbove < panelHeight && spaceBelow >= panelHeight )
    {
        return 'start' ;
    }

    return 'center' ;
} ;

/**
 * Resolves the direction and placement of a dropdown panel.
 *
 * @param {DOMRect|{top:number,right:number,bottom:number,left:number}} rect - The trigger's bounding rect.
 * @param {Object}            [options]
 * @param {number}            [options.panelWidth=176]             - Estimated panel width in px.
 * @param {number}            [options.panelHeight=140]            - Estimated FULL panel height in px.
 * @param {DropdownDirection} [options.preferredDirection='bottom'] - The axis to open on, and the fallback.
 * @param {DropdownPlacement} [options.preferredPlacement='end']    - Kept for an axis other than the four sides.
 * @param {number}            [options.viewportWidth]              - Defaults to `window.innerWidth`.
 * @param {number}            [options.viewportHeight]             - Defaults to `window.innerHeight`.
 *
 * @returns {{ direction : DropdownDirection , placement : DropdownPlacement }}
 *
 * @example
 * ```js
 * const { direction , placement } = resolveDropdownPosition( trigger.getBoundingClientRect() , { panelWidth : 288 , panelHeight : 420 } ) ;
 * ```
 */
const resolveDropdownPosition = ( rect ,
{
    panelWidth         = 176 ,
    panelHeight        = 140 ,
    preferredDirection = 'bottom' ,
    preferredPlacement = 'end' ,
    viewportWidth ,
    viewportHeight ,
}
= {} ) =>
{
    const vw = viewportWidth  ?? window.innerWidth ;
    const vh = viewportHeight ?? window.innerHeight ;

    const spaceAbove = rect.top ;
    const spaceBelow = vh - rect.bottom ;
    const spaceLeft  = rect.left ;
    const spaceRight = vw - rect.right ;

    // ---- Resolve direction

    let direction = preferredDirection ;

    if ( preferredDirection === 'bottom' || preferredDirection === 'top' )
    {
        if      ( spaceBelow >= panelHeight ) { direction = 'bottom' ; }
        else if ( spaceAbove >= panelHeight ) { direction = 'top' ; }
        else                                  { direction = spaceBelow >= spaceAbove ? 'bottom' : 'top' ; } // roomier side
    }
    else if ( preferredDirection === 'left' || preferredDirection === 'right' )
    {
        if      ( spaceLeft  >= panelWidth ) { direction = 'left' ; }
        else if ( spaceRight >= panelWidth ) { direction = 'right' ; }
        else                                 { direction = spaceLeft >= spaceRight ? 'left' : 'right' ; }
    }

    // ---- Resolve placement

    let placement = preferredPlacement ;

    if ( direction === 'bottom' || direction === 'top' )
    {
        placement = resolveHorizontalPlacement( rect , panelWidth , vw ) ;
    }
    else
    {
        placement = resolveVerticalPlacement( rect , panelHeight , vh ) ;
    }

    return { direction , placement } ;
} ;

export default resolveDropdownPosition ;
