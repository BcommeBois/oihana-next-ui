'use client' ;

import { getColorIndicatorClasses , SQUARE , TRANSPARENT } from '../../themes/components/colorPicker' ;

/**
 * ColorIndicator — a small swatch displaying a color value.
 *
 * Presentational only : pass any CSS color string. Square by default, which is
 * the swatch a picker shows ; `shape="circle"` is the mark that sits beside a
 * name in a row, where `2xs` (eight pixels) is the size that fits.
 *
 * ### 🚨 A missing colour is not a grey colour
 *
 * Gathered from five hand-written copies of this mark in one application, which
 * spelled « no colour » four different ways — and the difference is real : a
 * grey disc reads as « its colour is grey », where the same entity may be
 * served with its colour in one place and without it in another.
 *
 * So two questions, answered apart :
 *
 * - **`bordered`** governs the swatch that HAS a colour. A mark beside a name
 *   usually wants none ; a swatch one points at wants one, or a white colour
 *   vanishes into a white card.
 * - **`empty`** governs the one that has none. `transparent` keeps the ordinary
 *   border and shows no fill (what a picker shows before a colour is chosen),
 *   `ring` draws a mark that carries no border when filled, and `dashed` says
 *   nobody ever gave this one a colour.
 *
 * @module components/colors/ColorIndicator
 *
 * @param {Object}  props
 * @param {boolean} [props.bordered=true] - Draw a border when a colour is given.
 * @param {string}  [props.className] - Extra classes.
 * @param {string}  [props.color] - Any CSS color (e.g. '#RRGGBB', '#RRGGBBAA', 'rebeccapurple').
 * @param {import('../../themes/components/colorPicker').ColorIndicatorEmpty} [props.empty='transparent'] - What a missing colour looks like.
 * @param {import('../../themes/components/colorPicker').ColorIndicatorShape} [props.shape='square'] - Swatch shape.
 * @param {import('../../themes/components/colorPicker').ColorIndicatorSize} [props.size='md'] - Swatch size.
 * @param {Object}  [props.style] - Extra inline styles (merged after the background).
 *
 * @example
 * ```jsx
 * <ColorIndicator color="#FF5733" size="lg" />
 * ```
 *
 * @example
 * ```jsx
 * // The mark beside a name : no border of its own, a ring when the entity
 * // carries no colour.
 * <ColorIndicator bordered={ false } color={ term.color } empty="ring" shape="circle" size="2xs" />
 * ```
 */
const ColorIndicator =
({
    bordered = true ,
    className ,
    color ,
    empty    = TRANSPARENT ,
    shape    = SQUARE ,
    size ,
    style ,
    ...rest
}) =>
(
    <span
        aria-hidden = "true"
        className   = { getColorIndicatorClasses({ bordered , className , empty , filled : Boolean( color ) , shape , size }) }
        style       = { { backgroundColor : color || 'transparent' , ...style } }
        { ...rest }
    />
) ;

ColorIndicator.displayName = 'ColorIndicator' ;

export default ColorIndicator ;
