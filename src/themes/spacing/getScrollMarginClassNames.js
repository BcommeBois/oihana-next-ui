/**
 * Scroll margin class names generator for Tailwind CSS.
 *
 * @module themes/spacing/getScrollMarginClassNames
 */

import applyIfDefined from '@/helpers/applyIfDefined' ;
import cn             from '@/themes/helpers/cn' ;

import getScrollMargin       from './scrollMargin' ;
import getScrollMarginBottom from './scrollMarginBottom' ;
import getScrollMarginEnd    from './scrollMarginEnd' ;
import getScrollMarginLeft   from './scrollMarginLeft' ;
import getScrollMarginRight  from './scrollMarginRight' ;
import getScrollMarginStart  from './scrollMarginStart' ;
import getScrollMarginTop    from './scrollMarginTop' ;
import getScrollMarginX      from './scrollMarginX' ;
import getScrollMarginY      from './scrollMarginY' ;

/**
 * @typedef {string | number | import('../sizing/sizes').ResponsiveSize} SpacingValue
 */

/**
 * Generates scroll margin class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 *
 * @param {SpacingValue} [props.scrollMargin] - Scroll margin on all sides.
 * @param {SpacingValue} [props.scrollMarginBottom] - Bottom scroll margin.
 * @param {SpacingValue} [props.scrollMarginEnd] - Inline-end scroll margin.
 * @param {SpacingValue} [props.scrollMarginLeft] - Left scroll margin.
 * @param {SpacingValue} [props.scrollMarginRight] - Right scroll margin.
 * @param {SpacingValue} [props.scrollMarginStart] - Inline-start scroll margin.
 * @param {SpacingValue} [props.scrollMarginTop] - Top scroll margin.
 * @param {SpacingValue} [props.scrollMarginX] - Horizontal scroll margin.
 * @param {SpacingValue} [props.scrollMarginY] - Vertical scroll margin.
 *
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/scroll-margin
 *
 * @example
 * ```js
 * getScrollMarginClassNames( { scrollMargin: 4 } ) ;
 * // → 'scroll-m-4'
 *
 * getScrollMarginClassNames( { scrollMarginTop: 2 , scrollMarginX: 4 } ) ;
 * // → 'scroll-mt-2 scroll-mx-4'
 *
 * getScrollMarginClassNames( { scrollMarginTop: { xs: 2 , md: 4 } , scrollMarginBottom: 8 } ) ;
 * // → 'scroll-mt-2 md:scroll-mt-4 scroll-mb-8'
 *
 * getScrollMarginClassNames( { scrollMargin: -4 } ) ;
 * // → '-scroll-m-4'
 * ```
 */
export const getScrollMarginClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     scrollMargin ,
     scrollMarginBottom ,
     scrollMarginEnd ,
     scrollMarginLeft ,
     scrollMarginRight ,
     scrollMarginStart ,
     scrollMarginTop ,
     scrollMarginX ,
     scrollMarginY ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        ...applyIfDefined( getScrollMargin       , scrollMargin       ) ,
        ...applyIfDefined( getScrollMarginX      , scrollMarginX      ) ,
        ...applyIfDefined( getScrollMarginY      , scrollMarginY      ) ,
        ...applyIfDefined( getScrollMarginBottom , scrollMarginBottom ) ,
        ...applyIfDefined( getScrollMarginEnd    , scrollMarginEnd    ) ,
        ...applyIfDefined( getScrollMarginLeft   , scrollMarginLeft   ) ,
        ...applyIfDefined( getScrollMarginRight  , scrollMarginRight  ) ,
        ...applyIfDefined( getScrollMarginStart  , scrollMarginStart  ) ,
        ...applyIfDefined( getScrollMarginTop    , scrollMarginTop    ) ,

        ...after ,
    } ,
    className ,
) ;

export default getScrollMarginClassNames ;