/**
 * Padding class names generator for Tailwind CSS.
 *
 * @module themes/spacing/getPaddingClassNames
 */

import applyIfDefined from '../../helpers/applyIfDefined' ;
import cn             from '../helpers/cn' ;

import getPadding       from './padding' ;
import getPaddingBottom from './paddingBottom' ;
import getPaddingEnd    from './paddingEnd' ;
import getPaddingLeft   from './paddingLeft' ;
import getPaddingRight  from './paddingRight' ;
import getPaddingStart  from './paddingStart' ;
import getPaddingTop    from './paddingTop' ;
import getPaddingX      from './paddingX' ;
import getPaddingY      from './paddingY' ;

/**
 * @typedef {string | number | import('../sizing/sizes').ResponsiveSize} SpacingValue
 */

/**
 * Generates padding class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 *
 * @param {SpacingValue} [props.padding] - Padding on all sides.
 * @param {SpacingValue} [props.paddingBottom] - Bottom padding.
 * @param {SpacingValue} [props.paddingEnd] - Inline-end padding.
 * @param {SpacingValue} [props.paddingLeft] - Left padding.
 * @param {SpacingValue} [props.paddingRight] - Right padding.
 * @param {SpacingValue} [props.paddingStart] - Inline-start padding.
 * @param {SpacingValue} [props.paddingTop] - Top padding.
 * @param {SpacingValue} [props.paddingX] - Horizontal padding.
 * @param {SpacingValue} [props.paddingY] - Vertical padding.
 *
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/padding
 *
 * @example
 * ```js
 * getPaddingClassNames( { padding: 4 } ) ;
 * // → 'p-4'
 *
 * getPaddingClassNames( { paddingTop: 2 , paddingX: 4 } ) ;
 * // → 'pt-2 px-4'
 *
 * getPaddingClassNames( { paddingTop: { xs: 2 , md: 4 } , paddingBottom: 8 } ) ;
 * // → 'pt-2 md:pt-4 pb-8'
 * ```
 */
export const getPaddingClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     padding ,
     paddingBottom ,
     paddingEnd ,
     paddingLeft ,
     paddingRight ,
     paddingStart ,
     paddingTop ,
     paddingX ,
     paddingY ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        ...applyIfDefined( getPadding       , padding       ) ,
        ...applyIfDefined( getPaddingX      , paddingX      ) ,
        ...applyIfDefined( getPaddingY      , paddingY      ) ,
        ...applyIfDefined( getPaddingBottom , paddingBottom ) ,
        ...applyIfDefined( getPaddingEnd    , paddingEnd    ) ,
        ...applyIfDefined( getPaddingLeft   , paddingLeft   ) ,
        ...applyIfDefined( getPaddingRight  , paddingRight  ) ,
        ...applyIfDefined( getPaddingStart  , paddingStart  ) ,
        ...applyIfDefined( getPaddingTop    , paddingTop    ) ,

        ...after ,
    } ,
    className ,
) ;

export default getPaddingClassNames ;