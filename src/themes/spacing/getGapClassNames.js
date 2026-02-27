/**
 * Gap class names generator for Tailwind CSS.
 *
 * @module themes/spacing/getGapClassNames
 */

import applyIfDefined from '@/helpers/applyIfDefined' ;
import cn             from '@/themes/helpers/cn' ;

import getGap  from './gap' ;
import getGapX from './gapX' ;
import getGapY from './gapY' ;

/**
 * @typedef {string | number | import('../sizing/sizes').ResponsiveSize} SpacingValue
 */

/**
 * Generates gap class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 *
 * @param {SpacingValue} [props.gap] - Gap on both axes.
 * @param {SpacingValue} [props.gapX] - Horizontal (column) gap.
 * @param {SpacingValue} [props.gapY] - Vertical (row) gap.
 *
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/gap
 *
 * @example
 * ```js
 * getGapClassNames( { gap: 4 } ) ;
 * // → 'gap-4'
 *
 * getGapClassNames( { gapX: 2 , gapY: 4 } ) ;
 * // → 'gap-x-2 gap-y-4'
 *
 * getGapClassNames( { gap: { xs: 2 , md: 4 } } ) ;
 * // → 'gap-2 md:gap-4'
 * ```
 */
export const getGapClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     gap ,
     gapX ,
     gapY ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        ...applyIfDefined( getGap  , gap  ) ,
        ...applyIfDefined( getGapX , gapX ) ,
        ...applyIfDefined( getGapY , gapY ) ,

        ...after ,
    } ,
    className ,
) ;

export default getGapClassNames ;