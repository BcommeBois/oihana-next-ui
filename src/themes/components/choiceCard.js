/**
 * Choice card class name generator — the look of one choosable row in a list :
 * a radio row, a checkbox row, a plain button row.
 *
 * It carries the look only (shape, border, the three states), never the
 * layout : the padding, the gap and the alignment stay with the row, because a
 * three-line row and a one-line label do not sit the same way.
 *
 *  - **rest** — a light border ;
 *  - **hover** — the border leans to `primary`, the background lifts ;
 *  - **checked** — a `primary` border on a `primary` wash. The hover does not
 *    apply to it : a chosen row stays chosen under the pointer.
 *
 * Tailwind 4 gives a `<button>` the default cursor : the card sets the pointer
 * itself, so a label row and a button row answer the pointer alike.
 *
 * @module themes/components/choiceCard
 */

import cn from '../helpers/cn' ;

/**
 * Always applied : the shape and the transition.
 * @type {string}
 */
export const CHOICE_CARD = 'cursor-pointer rounded-box border transition-colors' ;

/**
 * The border of a row that is not chosen.
 * @type {string}
 */
export const CHOICE_CARD_REST = 'border-base-300/60' ;

/**
 * The hover of a row that is not chosen and can be.
 * @type {string}
 */
export const CHOICE_CARD_HOVER = 'hover:border-primary/40 hover:bg-base-200/30' ;

/**
 * Applied to the chosen row.
 * @type {string}
 */
export const CHOICE_CARD_CHECKED = 'border-primary bg-primary/5' ;

/**
 * Applied to a row that cannot be chosen.
 * @type {string}
 */
export const CHOICE_CARD_DISABLED = 'cursor-not-allowed opacity-60' ;

/**
 * Generates the class names of a choice card.
 *
 * @param {Object}  [props]
 * @param {Object}  [props.after]           - Class overrides applied after.
 * @param {Object}  [props.before]          - Class definitions applied before.
 * @param {string}  [props.beforeClassName] - CSS string prepended.
 * @param {boolean} [props.checked=false]   - The row is the chosen one.
 * @param {string}  [props.className]       - CSS string appended (the row's own layout).
 * @param {boolean} [props.disabled=false]  - The row cannot be chosen : no hover, a dimmed look.
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getChoiceCardClasses( { checked , className : 'flex items-center gap-3 p-2' } ) ;
 * // → 'cursor-pointer rounded-box border transition-colors border-primary bg-primary/5 flex items-center gap-3 p-2'
 * ```
 */
export const getChoiceCardClasses =
({
    after ,
    before ,
    beforeClassName ,
    checked  = false ,
    className ,
    disabled = false ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        [ CHOICE_CARD          ] : true ,
        [ CHOICE_CARD_CHECKED  ] : checked ,
        [ CHOICE_CARD_REST     ] : !checked ,
        [ CHOICE_CARD_HOVER    ] : !checked && !disabled ,
        [ CHOICE_CARD_DISABLED ] : disabled ,

        ...after ,
    } ,
    className ,
) ;

export default getChoiceCardClasses ;
