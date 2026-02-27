/**
 * Spacing class names generator for Tailwind CSS.
 *
 * Combines border-spacing, gap, margin, padding, scroll-margin,
 * scroll-padding and space-between utilities into a single class string.
 *
 * @module themes/spacing/getSpacingClassNames
 */

import applyIfDefined from '@/helpers/applyIfDefined';
import cn             from '@/themes/helpers/cn' ;

import getBorderSpacing  from './borderSpacing' ;
import getBorderSpacingX from './borderSpacingX' ;
import getBorderSpacingY from './borderSpacingY' ;

import getGap  from './gap' ;
import getGapX from './gapX' ;
import getGapY from './gapY' ;

import getMargin       from './margin' ;
import getMarginBottom from './marginBottom' ;
import getMarginEnd    from './marginEnd' ;
import getMarginLeft   from './marginLeft' ;
import getMarginRight  from './marginRight' ;
import getMarginStart  from './marginStart' ;
import getMarginTop    from './marginTop' ;
import getMarginX      from './marginX' ;
import getMarginY      from './marginY' ;

import getPadding       from './padding' ;
import getPaddingBottom from './paddingBottom' ;
import getPaddingEnd    from './paddingEnd' ;
import getPaddingLeft   from './paddingLeft' ;
import getPaddingRight  from './paddingRight' ;
import getPaddingStart  from './paddingStart' ;
import getPaddingTop    from './paddingTop' ;
import getPaddingX      from './paddingX' ;
import getPaddingY      from './paddingY' ;

import getScrollMargin       from './scrollMargin' ;
import getScrollMarginBottom from './scrollMarginBottom' ;
import getScrollMarginEnd    from './scrollMarginEnd' ;
import getScrollMarginLeft   from './scrollMarginLeft' ;
import getScrollMarginRight  from './scrollMarginRight' ;
import getScrollMarginStart  from './scrollMarginStart' ;
import getScrollMarginTop    from './scrollMarginTop' ;
import getScrollMarginX      from './scrollMarginX' ;
import getScrollMarginY      from './scrollMarginY' ;

import getScrollPadding       from './scrollPadding' ;
import getScrollPaddingBottom from './scrollPaddingBottom' ;
import getScrollPaddingEnd    from './scrollPaddingEnd' ;
import getScrollPaddingLeft   from './scrollPaddingLeft' ;
import getScrollPaddingRight  from './scrollPaddingRight' ;
import getScrollPaddingStart  from './scrollPaddingStart' ;
import getScrollPaddingTop    from './scrollPaddingTop' ;
import getScrollPaddingX      from './scrollPaddingX' ;
import getScrollPaddingY      from './scrollPaddingY' ;

import getSpaceX from './spaceX' ;
import getSpaceY from './spaceY' ;

/**
 * @typedef {string | number | import('../sizing/sizes').ResponsiveSize} SpacingValue
 */

/**
 * Generates spacing class names combining margin, padding,
 * space-between and border-spacing utilities.
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
 * @param {SpacingValue} [props.gap] - Gap on both axes.
 * @param {SpacingValue} [props.gapX] - Horizontal (column) gap.
 * @param {SpacingValue} [props.gapY] - Vertical (row) gap.
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
 * @param {SpacingValue} [props.spaceX] - Horizontal space between children.
 * @param {SpacingValue} [props.spaceY] - Vertical space between children.
 *
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/border-spacing
 * @see https://tailwindcss.com/docs/gap
 * @see https://tailwindcss.com/docs/margin
 * @see https://tailwindcss.com/docs/padding
 * @see https://tailwindcss.com/docs/scroll-margin
 * @see https://tailwindcss.com/docs/scroll-padding
 * @see https://tailwindcss.com/docs/space
 *
 * @example
 * ```js
 * getSpacingClassNames( { margin: 4 , paddingX: 2 } ) ;
 * // → 'm-4 px-2'
 *
 * getSpacingClassNames( { marginTop: { xs: 2 , md: 4 } , spaceY: 4 } ) ;
 * // → 'mt-2 md:mt-4 space-y-4'
 * ```
 */
export const getSpacingClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     borderSpacing , borderSpacingX , borderSpacingY ,

     gap , gapX , gapY ,

     margin , marginBottom , marginEnd , marginLeft ,
     marginRight , marginStart , marginTop , marginX , marginY ,

     padding , paddingBottom , paddingEnd , paddingLeft ,
     paddingRight , paddingStart , paddingTop , paddingX , paddingY ,

     scrollMargin , scrollMarginBottom , scrollMarginEnd , scrollMarginLeft ,
     scrollMarginRight , scrollMarginStart , scrollMarginTop , scrollMarginX , scrollMarginY ,

     scrollPadding , scrollPaddingBottom , scrollPaddingEnd , scrollPaddingLeft ,
     scrollPaddingRight , scrollPaddingStart , scrollPaddingTop , scrollPaddingX , scrollPaddingY ,

     spaceX , spaceY ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        // Border spacing
        ...applyIfDefined( getBorderSpacing  , borderSpacing  ) ,
        ...applyIfDefined( getBorderSpacingX , borderSpacingX ) ,
        ...applyIfDefined( getBorderSpacingY , borderSpacingY ) ,

        // Gap
        ...applyIfDefined( getGap  , gap  ) ,
        ...applyIfDefined( getGapX , gapX ) ,
        ...applyIfDefined( getGapY , gapY ) ,

        // Margin
        ...applyIfDefined( getMargin       , margin       ) ,
        ...applyIfDefined( getMarginX      , marginX      ) ,
        ...applyIfDefined( getMarginY      , marginY      ) ,
        ...applyIfDefined( getMarginBottom , marginBottom ) ,
        ...applyIfDefined( getMarginEnd    , marginEnd    ) ,
        ...applyIfDefined( getMarginLeft   , marginLeft   ) ,
        ...applyIfDefined( getMarginRight  , marginRight  ) ,
        ...applyIfDefined( getMarginStart  , marginStart  ) ,
        ...applyIfDefined( getMarginTop    , marginTop    ) ,

        // Padding
        ...applyIfDefined( getPadding       , padding       ) ,
        ...applyIfDefined( getPaddingX      , paddingX      ) ,
        ...applyIfDefined( getPaddingY      , paddingY      ) ,
        ...applyIfDefined( getPaddingBottom , paddingBottom ) ,
        ...applyIfDefined( getPaddingEnd    , paddingEnd    ) ,
        ...applyIfDefined( getPaddingLeft   , paddingLeft   ) ,
        ...applyIfDefined( getPaddingRight  , paddingRight  ) ,
        ...applyIfDefined( getPaddingStart  , paddingStart  ) ,
        ...applyIfDefined( getPaddingTop    , paddingTop    ) ,

        // Scroll margin
        ...applyIfDefined( getScrollMargin       , scrollMargin       ) ,
        ...applyIfDefined( getScrollMarginX      , scrollMarginX      ) ,
        ...applyIfDefined( getScrollMarginY      , scrollMarginY      ) ,
        ...applyIfDefined( getScrollMarginBottom , scrollMarginBottom ) ,
        ...applyIfDefined( getScrollMarginEnd    , scrollMarginEnd    ) ,
        ...applyIfDefined( getScrollMarginLeft   , scrollMarginLeft   ) ,
        ...applyIfDefined( getScrollMarginRight  , scrollMarginRight  ) ,
        ...applyIfDefined( getScrollMarginStart  , scrollMarginStart  ) ,
        ...applyIfDefined( getScrollMarginTop    , scrollMarginTop    ) ,

        // Scroll padding
        ...applyIfDefined( getScrollPadding       , scrollPadding       ) ,
        ...applyIfDefined( getScrollPaddingX      , scrollPaddingX      ) ,
        ...applyIfDefined( getScrollPaddingY      , scrollPaddingY      ) ,
        ...applyIfDefined( getScrollPaddingBottom , scrollPaddingBottom ) ,
        ...applyIfDefined( getScrollPaddingEnd    , scrollPaddingEnd    ) ,
        ...applyIfDefined( getScrollPaddingLeft   , scrollPaddingLeft   ) ,
        ...applyIfDefined( getScrollPaddingRight  , scrollPaddingRight  ) ,
        ...applyIfDefined( getScrollPaddingStart  , scrollPaddingStart  ) ,
        ...applyIfDefined( getScrollPaddingTop    , scrollPaddingTop    ) ,

        // Space between
        ...applyIfDefined( getSpaceX , spaceX ) ,
        ...applyIfDefined( getSpaceY , spaceY ) ,

        ...after ,
    } ,
    className ,
) ;

export default getSpacingClassNames ;