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
 * @param {string} [props.maxWidth] - Max width class (e.g., 'max-w-5xl'). Ignored by the `start` / `end` side placements — size those with `width`.
 * @param {boolean} [props.fullScreen] - Full screen mode
 * @param {boolean} [props.fullWidth] - Full width mode
 * @param {string} [props.placement] - Modal placement (for centering logic)
 * @param {boolean} [props.flexLayout] - Switch the modal-box to a vertical flex column so a sticky custom footer + scrollable content area can be composed cleanly. Used by `<Modal footerNode>`.
 * @param {string} [props.width] - Explicit width class for the `start` / `end` side placements (e.g. `'w-full sm:w-[28rem]'`). Ignored by every other placement.
 * @param {string} [props.className] - Additional classes
 *
 * @returns {string} Combined class names
 */
export const getModalBoxClasses =
({
    className ,
    flexLayout ,
    fullScreen ,
    fullWidth ,
    maxWidth,
    placement ,
    width ,
}
= {} ) =>
{
    // `modal-start` / `modal-end` are full-height side panels, not centered boxes, and
    // daisyUI sizes them `width:auto; height:100vh`. We take over both axes :
    //
    // - `width` — without it the panel is shrink-to-fit, so it would jump in width as
    //   its content changes (an emptying cart, a loading list…).
    // - `h-dvh` — `100vh` ignores the mobile URL bar, which pushes the bottom of the
    //   panel (a `footerNode` CTA, typically) under the fold on iOS.
    const isSide = placement === 'start' || placement === 'end' ;

    return cn
    (
        MODAL_BOX ,
        'px-4 pt-1 pb-3',
        {
            'max-w-none w-full max-h-none h-full rounded-none' : fullScreen ,
            'w-full max-w-none'                                : !fullScreen && fullWidth ,
            'h-dvh max-h-none'                                 : !fullScreen && isSide ,
            [ width ]                                          : !fullScreen && !fullWidth && isSide && width ,
            'mx-auto'                                          : !fullScreen && !fullWidth && ( placement === 'top' || placement === 'bottom' ) ,
            [ maxWidth ]                                       : !fullScreen && !fullWidth && !isSide && maxWidth ,
            'flex flex-col overflow-hidden'                    : flexLayout ,
        },
        className,
    ) ;
} ;

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