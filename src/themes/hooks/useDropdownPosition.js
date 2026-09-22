'use client' ;

/**
 * Automatically computes the optimal dropdown direction and placement
 * based on the trigger element's position in the viewport.
 *
 * The hook owns the trigger's `ref`. For a trigger the caller already holds,
 * use `Popover`'s `autoPosition`, or call
 * {@link module:themes/helpers/resolveDropdownPosition} directly : both run
 * the same computation.
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

import resolveDropdownPosition from '../helpers/resolveDropdownPosition' ;

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

        const { direction : resolvedDirection , placement : resolvedPlacement } = resolveDropdownPosition
        (
            ref.current.getBoundingClientRect() ,
            { panelWidth , panelHeight , preferredDirection , preferredPlacement } ,
        ) ;

        setDirection( resolvedDirection ) ;
        setPlacement( resolvedPlacement ) ;
    }
    , [ panelWidth , panelHeight , preferredDirection , preferredPlacement ] ) ;

    return { ref , direction , placement , recalculate } ;
} ;

export default useDropdownPosition ;