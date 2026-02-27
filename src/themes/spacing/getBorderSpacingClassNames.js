/**
 * Border spacing class names generator for Tailwind CSS.
 *
 * @module themes/spacing/getBorderSpacingClassNames
 */

import applyIfDefined from '@/helpers/applyIfDefined' ;
import cn             from '@/themes/helpers/cn' ;

import getBorderSpacing  from './borderSpacing' ;
import getBorderSpacingX from './borderSpacingX' ;
import getBorderSpacingY from './borderSpacingY' ;

/**
 * @typedef {string | number | import('../sizing/sizes').ResponsiveSize} SpacingValue
 */

/**
 * Generates border spacing class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 *
 * @param {SpacingValue} [props.borderSpacing] - Border spacing on both axes.
 * @param {SpacingValue} [props.borderSpacingX] - Horizontal border spacing.
 * @param {SpacingValue} [props.borderSpacingY] - Vertical border spacing.
 *
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/border-spacing
 *
 * @example
 * ```js
 * getBorderSpacingClassNames( { borderSpacing: 4 } ) ;
 * // → 'border-spacing-4'
 *
 * getBorderSpacingClassNames( { borderSpacingX: 2 , borderSpacingY: 4 } ) ;
 * // → 'border-spacing-x-2 border-spacing-y-4'
 *
 * getBorderSpacingClassNames( { borderSpacing: { xs: 2 , md: 4 } } ) ;
 * // → 'border-spacing-2 md:border-spacing-4'
 * ```
 */
export const getBorderSpacingClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     borderSpacing ,
     borderSpacingX ,
     borderSpacingY ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        ...applyIfDefined( getBorderSpacing  , borderSpacing  ) ,
        ...applyIfDefined( getBorderSpacingX , borderSpacingX ) ,
        ...applyIfDefined( getBorderSpacingY , borderSpacingY ) ,

        ...after ,
    } ,
    className ,
) ;

export default getBorderSpacingClassNames ;