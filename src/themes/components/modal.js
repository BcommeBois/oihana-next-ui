/**
 * Modal class name generators for DaisyUI 5.
 *
 * @module themes/components/modal
 * @see https://daisyui.com/components/modal
 */

import cn from '../helpers/cn' ;

export const MODAL          = 'modal' ;
export const MODAL_BOX      = 'modal-box' ;
export const MODAL_ACTION   = 'modal-action' ;
export const MODAL_BACKDROP = 'modal-backdrop' ;
export const MODAL_OPEN     = 'modal-open' ;

/**
 * Valid modal placements.
 */
export const placements =
{
    top    : 'modal-top' ,
    middle : 'modal-middle' ,
    bottom : 'modal-bottom' ,
    start  : 'modal-start' ,
    end    : 'modal-end' ,
} ;

/**
 * Generates modal container class names.
 *
 * @param {Object} [props]
 * @param {string} [props.placement] - Modal placement: 'top', 'middle', 'bottom', 'start', 'end'
 * @param {string} [props.responsivePlacement] - Responsive placement (e.g., 'sm:modal-middle')
 * @param {boolean} [props.open] - Force modal open state
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getModalClasses =
({
    placement,
    responsivePlacement,
    open,
    className,
}
= {} ) => cn
(
    MODAL ,
    {
        [ placements[placement] ] : !!placements[placement] ,
        [ MODAL_OPEN ] : open ,
    },
    responsivePlacement ,
    className ,
) ;

/**
 * Generates modal-box class names.
 *
 * @param {Object} [props]
 * @param {string} [props.maxWidth] - Max width class (e.g., 'max-w-5xl')
 * @param {boolean} [props.fullScreen] - Full screen mode
 * @param {boolean} [props.fullWidth] - Full width mode
 * @param {string} [props.placement] - Modal placement (for centering logic)
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getModalBoxClasses =
({
    className ,
    fullScreen ,
    fullWidth ,
    maxWidth,
    placement ,
}
= {} ) => cn
(
    MODAL_BOX ,
    {
        'max-w-none w-full max-h-none h-full rounded-none' : fullScreen ,
        'w-full max-w-none'                                : !fullScreen && fullWidth ,
        'mx-auto'                                          : !fullScreen && !fullWidth && ( placement === 'top' || placement === 'bottom' ) ,
        [ maxWidth ]                                       : !fullScreen && !fullWidth && maxWidth ,
    },
    className,
) ;

/**
 * Generates modal-action class names.
 *
 * @param {Object} [props]
 * @param {boolean} [props.reverse] - Reverse button order
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getModalActionClasses =
({
    reverse,
    className,
}
= {} ) => cn
(
    MODAL_ACTION ,
    {
        'flex-row-reverse' : reverse ,
    },
    className,
) ;

/**
 * Generates modal-backdrop class names.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getModalBackdropClasses =
({
    className,
}
= {} ) => cn
(
    MODAL_BACKDROP ,
    className ,
) ;

export default getModalClasses ;