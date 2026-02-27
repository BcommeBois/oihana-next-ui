/**
 * Scroll padding class names generator for Tailwind CSS.
 *
 * @module themes/spacing/getScrollPaddingClassNames
 */

import applyIfDefined from '@/helpers/applyIfDefined' ;
import cn             from '@/themes/helpers/cn' ;

import getScrollPadding       from './scrollPadding' ;
import getScrollPaddingBottom from './scrollPaddingBottom' ;
import getScrollPaddingEnd    from './scrollPaddingEnd' ;
import getScrollPaddingLeft   from './scrollPaddingLeft' ;
import getScrollPaddingRight  from './scrollPaddingRight' ;
import getScrollPaddingStart  from './scrollPaddingStart' ;
import getScrollPaddingTop    from './scrollPaddingTop' ;
import getScrollPaddingX      from './scrollPaddingX' ;
import getScrollPaddingY      from './scrollPaddingY' ;

/**
 * @typedef {string | number | import('../sizing/sizes').ResponsiveSize} SpacingValue
 */

/**
 * Generates scroll padding class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 *
 * @param {SpacingValue} [props.scrollPadding] - Scroll padding on all sides.
 * @param {SpacingValue} [props.scrollPaddingBottom] - Bottom scroll padding.
 * @param {SpacingValue} [props.scrollPaddingEnd] - Inline-end scroll padding.
 * @param {SpacingValue} [props.scrollPaddingLeft] - Left scroll padding.
 * @param {SpacingValue} [props.scrollPaddingRight] - Right scroll padding.
 * @param {SpacingValue} [props.scrollPaddingStart] - Inline-start scroll padding.
 * @param {SpacingValue} [props.scrollPaddingTop] - Top scroll padding.
 * @param {SpacingValue} [props.scrollPaddingX] - Horizontal scroll padding.
 * @param {SpacingValue} [props.scrollPaddingY] - Vertical scroll padding.
 *
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/scroll-padding
 *
 * @example
 * ```js
 * getScrollPaddingClassNames( { scrollPadding: 4 } ) ;
 * // → 'scroll-p-4'
 *
 * getScrollPaddingClassNames( { scrollPaddingTop: 2 , scrollPaddingX: 4 } ) ;
 * // → 'scroll-pt-2 scroll-px-4'
 *
 * getScrollPaddingClassNames( { scrollPaddingTop: { xs: 2 , md: 4 } , scrollPaddingBottom: 8 } ) ;
 * // → 'scroll-pt-2 md:scroll-pt-4 scroll-pb-8'
 * ```
 */
export const getScrollPaddingClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     scrollPadding ,
     scrollPaddingBottom ,
     scrollPaddingEnd ,
     scrollPaddingLeft ,
     scrollPaddingRight ,
     scrollPaddingStart ,
     scrollPaddingTop ,
     scrollPaddingX ,
     scrollPaddingY ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        ...applyIfDefined( getScrollPadding       , scrollPadding       ) ,
        ...applyIfDefined( getScrollPaddingX      , scrollPaddingX      ) ,
        ...applyIfDefined( getScrollPaddingY      , scrollPaddingY      ) ,
        ...applyIfDefined( getScrollPaddingBottom , scrollPaddingBottom ) ,
        ...applyIfDefined( getScrollPaddingEnd    , scrollPaddingEnd    ) ,
        ...applyIfDefined( getScrollPaddingLeft   , scrollPaddingLeft   ) ,
        ...applyIfDefined( getScrollPaddingRight  , scrollPaddingRight  ) ,
        ...applyIfDefined( getScrollPaddingStart  , scrollPaddingStart  ) ,
        ...applyIfDefined( getScrollPaddingTop    , scrollPaddingTop    ) ,

        ...after ,
    } ,
    className ,
) ;

export default getScrollPaddingClassNames ;