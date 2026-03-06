/**
 * Dropdown class name generator for DaisyUI 5.
 *
 * @module themes/components/dropdown
 * @see https://daisyui.com/components/dropdown
 *
 * @safelist
 * ## Placements
 * - dropdown-start | dropdown-center | dropdown-end
 *
 * ## Directions
 * - dropdown-top | dropdown-bottom | dropdown-left | dropdown-right
 *
 * ## Modifiers
 * - dropdown-hover | dropdown-open | dropdown-close
 */

import cn from '../helpers/cn' ;

// -------- Parts

export const Dropdown         = 'dropdown' ;
export const DROPDOWN_CONTENT = 'dropdown-content' ;

// -------- Placements

export const START  = 'start' ;
export const CENTER = 'center' ;
export const END    = 'end' ;

/**
 * @typedef {'start' | 'center' | 'end'} DropdownPlacement
 */

/**
 * Valid dropdown placements.
 * @type {DropdownPlacement[]}
 */
export const placements = [ START , CENTER , END ] ;

const placementMap =
{
    [ START  ] : 'dropdown-start'  ,
    [ CENTER ] : 'dropdown-center' ,
    [ END    ] : 'dropdown-end'    ,
} ;

// -------- Directions

export const TOP    = 'top' ;
export const BOTTOM = 'bottom' ;
export const LEFT   = 'left' ;
export const RIGHT  = 'right' ;

/**
 * @typedef {'top' | 'bottom' | 'left' | 'right'} DropdownDirection
 */

/**
 * Valid dropdown directions.
 * @type {DropdownDirection[]}
 */
export const directions = [ TOP , BOTTOM , LEFT , RIGHT ] ;

const directionMap =
{
    [ TOP    ] : 'dropdown-top'    ,
    [ BOTTOM ] : 'dropdown-bottom' ,
    [ LEFT   ] : 'dropdown-left'   ,
    [ RIGHT  ] : 'dropdown-right'  ,
} ;

// -------- Generator

/**
 * Generates a DaisyUI dropdown container className expression.
 *
 * @param {Object}            [props]
 * @param {Object}            [props.after]            - Class definitions to append.
 * @param {Object}            [props.before]           - Class definitions to prepend.
 * @param {string}            [props.beforeClassName]  - ClassName to prepend.
 * @param {string}            [props.className]        - ClassName to append.
 * @param {boolean}           [props.open=false]       - Force open state.
 * @param {boolean}           [props.close=false]      - Force close state.
 * @param {boolean}           [props.hover=false]      - Open on hover too.
 * @param {DropdownDirection} [props.direction]        - Opening direction ('top' | 'bottom' | 'left' | 'right').
 * @param {DropdownPlacement} [props.placement]        - Horizontal/vertical alignment ('start' | 'center' | 'end').
 *
 * @returns {string} The dropdown className expression.
 *
 * @example
 * ```js
 * getDropdownClassNames() ;
 * // → 'dropdown'
 *
 * getDropdownClassNames({ placement: 'end' }) ;
 * // → 'dropdown dropdown-end'
 *
 * getDropdownClassNames({ direction: 'top' , placement: 'center' }) ;
 * // → 'dropdown dropdown-top dropdown-center'
 *
 * getDropdownClassNames({ open: true }) ;
 * // → 'dropdown dropdown-open'
 *
 * getDropdownClassNames({ direction: 'bottom' , placement: 'end' , hover: true }) ;
 * // → 'dropdown dropdown-bottom dropdown-end dropdown-hover'
 * ```
 */
const getDropdownClassNames =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    close     = false ,
    direction ,
    hover     = false ,
    open      = false ,
    placement ,
}
= {} ) => cn
(
    beforeClassName ,
    Dropdown ,
    {
        ...before ,

        ...!!directionMap[ direction ] && { [ directionMap[ direction ] ] : true } ,
        ...!!placementMap[ placement ] && { [ placementMap[ placement ] ] : true } ,

        'dropdown-hover' : hover === true ,
        'dropdown-open'  : open  === true ,
        'dropdown-close' : close === true ,

        ...after ,
    } ,
    className ,
) ;

export default getDropdownClassNames ;