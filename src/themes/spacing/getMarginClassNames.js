/**
 * Margin class names generator for Tailwind CSS.
 *
 * @module themes/spacing/getMarginClassNames
 */

import applyIfDefined from '../../helpers/applyIfDefined' ;
import cn             from '../helpers/cn' ;

import getMargin       from './margin' ;
import getMarginBottom from './marginBottom' ;
import getMarginEnd    from './marginEnd' ;
import getMarginLeft   from './marginLeft' ;
import getMarginRight  from './marginRight' ;
import getMarginStart  from './marginStart' ;
import getMarginTop    from './marginTop' ;
import getMarginX      from './marginX' ;
import getMarginY      from './marginY' ;

/**
 * @typedef {string | number | import('../sizing/sizes').ResponsiveSize} SpacingValue
 */

/**
 * Generates margin class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 *
 * @param {SpacingValue} [props.margin] - Margin on all sides.
 * @param {SpacingValue} [props.marginBottom] - Bottom margin.
 * @param {SpacingValue} [props.marginEnd] - Inline-end margin.
 * @param {SpacingValue} [props.marginLeft] - Left margin.
 * @param {SpacingValue} [props.marginRight] - Right margin.
 * @param {SpacingValue} [props.marginStart] - Inline-start margin.
 * @param {SpacingValue} [props.marginTop] - Top margin.
 * @param {SpacingValue} [props.marginX] - Horizontal margin.
 * @param {SpacingValue} [props.marginY] - Vertical margin.
 *
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/margin
 *
 * @example
 * ```js
 * getMarginClassNames( { margin: 4 } ) ;
 * // → 'm-4'
 *
 * getMarginClassNames( { marginTop: 2 , marginX: 4 } ) ;
 * // → 'mt-2 mx-4'
 *
 * getMarginClassNames( { marginTop: { xs: 2 , md: 4 } , marginBottom: 8 } ) ;
 * // → 'mt-2 md:mt-4 mb-8'
 * ```
 */
export const getMarginClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     margin ,
     marginBottom ,
     marginEnd ,
     marginLeft ,
     marginRight ,
     marginStart ,
     marginTop ,
     marginX ,
     marginY ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        ...applyIfDefined( getMargin       , margin       ) ,
        ...applyIfDefined( getMarginX      , marginX      ) ,
        ...applyIfDefined( getMarginY      , marginY      ) ,
        ...applyIfDefined( getMarginBottom , marginBottom ) ,
        ...applyIfDefined( getMarginEnd    , marginEnd    ) ,
        ...applyIfDefined( getMarginLeft   , marginLeft   ) ,
        ...applyIfDefined( getMarginRight  , marginRight  ) ,
        ...applyIfDefined( getMarginStart  , marginStart  ) ,
        ...applyIfDefined( getMarginTop    , marginTop    ) ,

        ...after ,
    } ,
    className ,
) ;

export default getMarginClassNames ;