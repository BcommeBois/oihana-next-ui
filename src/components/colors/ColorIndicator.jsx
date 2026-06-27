'use client' ;

import { getColorIndicatorClasses } from '../../themes/components/colorPicker' ;

/**
 * ColorIndicator — a small square swatch displaying a color value.
 *
 * Presentational only : pass any CSS color string. When empty, only the border
 * shows (transparent background), signalling "no color".
 *
 * @module components/colors/ColorIndicator
 *
 * @param {Object} props
 * @param {string} [props.className] - Extra classes.
 * @param {string} [props.color] - Any CSS color (e.g. '#RRGGBB', '#RRGGBBAA', 'rebeccapurple').
 * @param {import('../../themes/components/colorPicker').ColorIndicatorSize} [props.size='md'] - Swatch size.
 * @param {Object} [props.style] - Extra inline styles (merged after the background).
 *
 * @example
 * ```jsx
 * <ColorIndicator color="#FF5733" size="lg" />
 * ```
 */
const ColorIndicator =
({
    className ,
    color ,
    size ,
    style ,
    ...rest
}) =>
(
    <span
        className = { getColorIndicatorClasses({ className , size }) }
        style     = { { backgroundColor : color || 'transparent' , ...style } }
        { ...rest }
    />
) ;

ColorIndicator.displayName = 'ColorIndicator' ;

export default ColorIndicator ;
