'use client' ;

/**
 * Automatically computes the optimal dropdown direction and placement
 * based on the trigger element's position in the viewport.
 *
 * @module themes/hooks/useDropdownPosition
 *
 * @example
 * ```jsx
 * const { ref , direction , placement , recalculate } = useDropdownPosition() ;
 *
 * // Attach ref to the trigger, call recalculate() on open
 * <div ref={ ref }>
 *     <button onClick={ () => { recalculate() ; setOpen( true ) ; } }>
 *         Open
 *     </button>
 * </div>
 * ```
 */

import { useCallback , useRef , useState } from 'react' ;

/**
 * @typedef {'top'|'bottom'|'left'|'right'} DropdownDirection
 * @typedef {'start'|'center'|'end'}        DropdownPlacement
 */

/**
 * Options for useDropdownPosition.
 *
 * @typedef {Object} UseDropdownPositionOptions
 * @property {number} [panelWidth=176]  - Estimated panel width in px (w-44 = 176px).
 * @property {number} [panelHeight=140] - Estimated panel height in px.
 * @property {DropdownDirection} [preferredDirection='bottom'] - Fallback direction when space is equal.
 * @property {DropdownPlacement} [preferredPlacement='end']    - Fallback placement when space is equal.
 */

/**
 * @typedef {Object} UseDropdownPositionResult
 * @property {React.RefObject}     ref         - Attach to the dropdown root element.
 * @property {DropdownDirection}   direction   - Computed opening direction.
 * @property {DropdownPlacement}   placement   - Computed panel alignment.
 * @property {Function}            recalculate - Call before opening to refresh the computed values.
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
const resolveHorizontalPlacement = ( rect , panelWidth , viewportWidth ) =>
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
 * @param {DOMRect} rect            - Trigger bounding rect.
 * @param {number}  panelHeight     - Estimated panel height.
 * @param {number}  viewportHeight  - Current viewport height.
 * @returns {DropdownPlacement}
 */
const resolveVerticalPlacement = ( rect , panelHeight , viewportHeight ) =>
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
 * @param {UseDropdownPositionOptions} [options]
 * @returns {UseDropdownPositionResult}
 */
const useDropdownPosition =
({
    panelWidth         = 176 ,
    panelHeight        = 140 ,
    preferredDirection = 'bottom' ,
    preferredPlacement = 'end' ,
}
= {} ) =>
{
    const ref = useRef( null ) ;

    const [ direction , setDirection ] = useState( preferredDirection ) ;
    const [ placement , setPlacement ] = useState( preferredPlacement ) ;

    const recalculate = useCallback( () =>
    {
        if ( !ref.current )
        {
            return ;
        }

        const rect           = ref.current.getBoundingClientRect() ;
        const viewportWidth  = window.innerWidth ;
        const viewportHeight = window.innerHeight ;

        const spaceAbove = rect.top ;
        const spaceBelow = viewportHeight - rect.bottom ;
        const spaceLeft  = rect.left ;
        const spaceRight = viewportWidth - rect.right ;

        // ---- Resolve direction

        let resolvedDirection = preferredDirection ;

        if ( preferredDirection === 'bottom' || preferredDirection === 'top' )
        {
            if ( spaceBelow >= panelHeight )
            {
                resolvedDirection = 'bottom' ;
            }
            else if ( spaceAbove >= panelHeight )
            {
                resolvedDirection = 'top' ;
            }
            else
            {
                // Neither fits perfectly — pick the roomier side
                resolvedDirection = spaceBelow >= spaceAbove ? 'bottom' : 'top' ;
            }
        }
        else if ( preferredDirection === 'left' || preferredDirection === 'right' )
        {
            if ( spaceLeft >= panelWidth )
            {
                resolvedDirection = 'left' ;
            }
            else if ( spaceRight >= panelWidth )
            {
                resolvedDirection = 'right' ;
            }
            else
            {
                resolvedDirection = spaceLeft >= spaceRight ? 'left' : 'right' ;
            }
        }

        // ---- Resolve placement

        let resolvedPlacement = preferredPlacement ;

        if ( resolvedDirection === 'bottom' || resolvedDirection === 'top' )
        {
            resolvedPlacement = resolveHorizontalPlacement( rect , panelWidth , viewportWidth ) ;
        }
        else
        {
            resolvedPlacement = resolveVerticalPlacement( rect , panelHeight , viewportHeight ) ;
        }

        setDirection( resolvedDirection ) ;
        setPlacement( resolvedPlacement ) ;
    }
    , [ panelWidth , panelHeight , preferredDirection , preferredPlacement ] ) ;

    return { ref , direction , placement , recalculate } ;
} ;

export default useDropdownPosition ;