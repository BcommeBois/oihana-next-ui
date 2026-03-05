/**
 * Layout class names generator for Tailwind CSS.
 *
 * Shared base for flex, grid, and other layout containers.
 *
 * @module themes/layout/getLayoutClassNames
 */

import applyIfDefined from '../../helpers/applyIfDefined' ;
import cn             from '../helpers/cn' ;

// Alignment
import getAlignContent   from './alignContent' ;
import getAlignItems     from './alignItems' ;
import getAlignSelf      from './alignSelf' ;
import getJustifyContent from './justifyContent' ;
import getJustifyItems   from './justifyItems' ;
import getJustifySelf    from './justifySelf' ;
import getPlaceContent   from './placeContent' ;
import getPlaceItems     from './placeItems' ;
import getPlaceSelf      from './placeSelf' ;

// Position
import getDisplay    from './display' ;
import getOverflow   from './overflow' ;
import getOverflowX  from './overflowX' ;
import getOverflowY  from './overflowY' ;
import getPosition   from './position' ;
import getVisibility from './visibility' ;
import getZIndex     from './zIndex' ;

// Colors
import getBackgroundColor from '../colors/backgroundColor' ;
import getBorderColor     from '../colors/borderColor' ;
import getTextColor       from '../colors/textColor' ;

// Borders
import getBorderRadius from '../border/borderRadius' ;
import getBorderStyle  from '../border/borderStyle' ;

import getBorderWidth       from '../border/borderWidth' ;
import getBorderWidthBottom from '../border/borderWidthBottom' ;
import getBorderWidthEnd    from '../border/borderWidthEnd' ;
import getBorderWidthLeft   from '../border/borderWidthLeft' ;
import getBorderWidthRight  from '../border/borderWidthRight' ;
import getBorderWidthStart  from '../border/borderWidthStart' ;
import getBorderWidthTop    from '../border/borderWidthTop' ;
import getBorderWidthX      from '../border/borderWidthX' ;
import getBorderWidthY      from '../border/borderWidthY' ;

// Spacing
import getGap  from '../spacing/gap' ;
import getGapX from '../spacing/gapX' ;
import getGapY from '../spacing/gapY' ;

import { getMarginClassNames }  from '../spacing/getMarginClassNames' ;
import { getPaddingClassNames } from '../spacing/getPaddingClassNames' ;

// Sizing
import getHeight    from '../sizing/height' ;
import getMaxHeight from '../sizing/maxHeight' ;
import getMaxWidth  from '../sizing/maxWidth' ;
import getMinHeight from '../sizing/minHeight' ;
import getMinWidth  from '../sizing/minWidth' ;
import getSize      from '../sizing/sizes' ;
import getWidth     from '../sizing/width' ;

/**
 * @typedef {Object} LayoutClassNamesProps
 *
 * @property {Object} [after] - Class overrides applied after all transformations.
 * @property {Object} [before] - Class definitions applied before all transformations.
 * @property {string} [beforeClassName] - CSS string prepended before all classes.
 * @property {string} [className] - CSS string appended after all classes.
 *
 * @property {import('./alignContent').AlignContentValue} [alignContent]
 * @property {import('./alignItems').AlignItemsValue} [alignItems]
 * @property {import('./alignSelf').AlignSelfValue} [alignSelf]
 * @property {import('./justifyContent').JustifyContentValue} [justifyContent]
 * @property {import('./justifyItems').JustifyItemsValue} [justifyItems]
 * @property {import('./justifySelf').JustifySelfValue} [justifySelf]
 * @property {import('./placeContent').PlaceContentValue} [placeContent]
 * @property {import('./placeItems').PlaceItemsValue} [placeItems]
 * @property {import('./placeSelf').PlaceSelfValue} [placeSelf]
 *
 * @property {import('./display').DisplayValue} [display]
 * @property {import('./overflow').OverflowValue} [overflow]
 * @property {import('./overflow').OverflowValue} [overflowX]
 * @property {import('./overflow').OverflowValue} [overflowY]
 * @property {import('./position').PositionValue} [position]
 * @property {import('./visibility').VisibilityValue} [visibility]
 * @property {import('./zIndex').ZIndexValue} [zIndex]
 *
 * @property {import('../colors/backgroundColor').BackgroundColor} [backgroundColor]
 * @property {import('../colors/borderColor').BorderColor} [borderColor]
 * @property {import('../colors/textColor').TextColor} [textColor]
 *
 * @property {import('../borders/borderRadius').BorderRadiusSize} [borderRadius]
 * @property {import('../borders/borderStyle').BorderStyleValue} [borderStyle]
 * @property {*} [borderWidth]
 * @property {*} [borderWidthBottom]
 * @property {*} [borderWidthEnd]
 * @property {*} [borderWidthLeft]
 * @property {*} [borderWidthRight]
 * @property {*} [borderWidthStart]
 * @property {*} [borderWidthTop]
 * @property {*} [borderWidthX]
 * @property {*} [borderWidthY]
 *
 * @property {*} [gap]
 * @property {*} [gapX]
 * @property {*} [gapY]
 * @property {*} [margin]
 * @property {*} [marginBottom]
 * @property {*} [marginEnd]
 * @property {*} [marginLeft]
 * @property {*} [marginRight]
 * @property {*} [marginStart]
 * @property {*} [marginTop]
 * @property {*} [marginX]
 * @property {*} [marginY]
 * @property {*} [padding]
 * @property {*} [paddingBottom]
 * @property {*} [paddingEnd]
 * @property {*} [paddingLeft]
 * @property {*} [paddingRight]
 * @property {*} [paddingStart]
 * @property {*} [paddingTop]
 * @property {*} [paddingX]
 * @property {*} [paddingY]
 *
 * @property {import('../sizing/sizes').Size} [height]
 * @property {import('../sizing/sizes').Size} [maxHeight]
 * @property {import('../sizing/sizes').Size} [maxWidth]
 * @property {import('../sizing/sizes').Size} [minHeight]
 * @property {import('../sizing/sizes').Size} [minWidth]
 * @property {import('../sizing/sizes').Size} [size]
 * @property {import('../sizing/sizes').Size} [width]
 */

/**
 * Generates layout class names shared across flex, grid, and other containers.
 *
 * @param {LayoutClassNamesProps} [props]
 * @returns {string} Combined class names string.
 *
 * @example
 * ```js
 * getLayoutClassNames( { position: 'relative' , alignItems: 'center' , gap: 4 } ) ;
 * // → 'relative items-center gap-4'
 *
 * getLayoutClassNames( { borderWidth: true , borderColor: 'base-300' , borderRadius: 'lg' , padding: 4 } ) ;
 * // → 'border border-base-300 rounded-lg p-4'
 * ```
 */
export const getLayoutClassNames =
({
    after ,
    before ,
    beforeClassName ,
    className ,

    // Alignment
    alignContent ,
    alignItems ,
    alignSelf ,
    justifyContent ,
    justifyItems ,
    justifySelf ,
    placeContent ,
    placeItems ,
    placeSelf ,

    // Display & position
    display ,
    overflow ,
    overflowX ,
    overflowY ,
    position ,
    visibility ,
    zIndex ,

    // Colors
    backgroundColor ,
    borderColor ,
    textColor ,

    // Borders
    borderRadius ,
    borderStyle ,
    borderWidth ,
    borderWidthBottom ,
    borderWidthEnd ,
    borderWidthLeft ,
    borderWidthRight ,
    borderWidthStart ,
    borderWidthTop ,
    borderWidthX ,
    borderWidthY ,

    // Gap
    gap ,
    gapX ,
    gapY ,

    // Margin
    margin ,
    marginBottom ,
    marginEnd ,
    marginLeft ,
    marginRight ,
    marginStart ,
    marginTop ,
    marginX ,
    marginY ,

    // Padding
    padding ,
    paddingBottom ,
    paddingEnd ,
    paddingLeft ,
    paddingRight ,
    paddingStart ,
    paddingTop ,
    paddingX ,
    paddingY ,

    // Sizing
    height ,
    maxHeight ,
    maxWidth ,
    minHeight ,
    minWidth ,
    size ,
    width ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        // Display & position
        ...applyIfDefined( getDisplay    , display    ) ,
        ...applyIfDefined( getPosition   , position   ) ,
        ...applyIfDefined( getVisibility , visibility ) ,
        ...applyIfDefined( getZIndex     , zIndex     ) ,
        ...applyIfDefined( getOverflow   , overflow   ) ,
        ...applyIfDefined( getOverflowX  , overflowX  ) ,
        ...applyIfDefined( getOverflowY  , overflowY  ) ,

        // Alignment
        ...applyIfDefined( getAlignContent   , alignContent   ) ,
        ...applyIfDefined( getAlignItems     , alignItems     ) ,
        ...applyIfDefined( getAlignSelf      , alignSelf      ) ,
        ...applyIfDefined( getJustifyContent , justifyContent ) ,
        ...applyIfDefined( getJustifyItems   , justifyItems   ) ,
        ...applyIfDefined( getJustifySelf    , justifySelf    ) ,
        ...applyIfDefined( getPlaceContent   , placeContent   ) ,
        ...applyIfDefined( getPlaceItems     , placeItems     ) ,
        ...applyIfDefined( getPlaceSelf      , placeSelf      ) ,

        // Gap
        ...applyIfDefined( getGap  , gap  ) ,
        ...applyIfDefined( getGapX , gapX ) ,
        ...applyIfDefined( getGapY , gapY ) ,

        // Borders
        ...applyIfDefined( getBorderWidth       , borderWidth       ) ,
        ...applyIfDefined( getBorderWidthX      , borderWidthX      ) ,
        ...applyIfDefined( getBorderWidthY      , borderWidthY      ) ,
        ...applyIfDefined( getBorderWidthBottom , borderWidthBottom ) ,
        ...applyIfDefined( getBorderWidthEnd    , borderWidthEnd    ) ,
        ...applyIfDefined( getBorderWidthLeft   , borderWidthLeft   ) ,
        ...applyIfDefined( getBorderWidthRight  , borderWidthRight  ) ,
        ...applyIfDefined( getBorderWidthStart  , borderWidthStart  ) ,
        ...applyIfDefined( getBorderWidthTop    , borderWidthTop    ) ,
        ...applyIfDefined( getBorderStyle       , borderStyle       ) ,
        ...applyIfDefined( getBorderColor       , borderColor       ) ,
        ...applyIfDefined( getBorderRadius      , borderRadius      ) ,

        // Sizing
        ...applyIfDefined( getSize      , size      ) ,
        ...applyIfDefined( getWidth     , width     ) ,
        ...applyIfDefined( getMinWidth  , minWidth  ) ,
        ...applyIfDefined( getMaxWidth  , maxWidth  ) ,
        ...applyIfDefined( getHeight    , height    ) ,
        ...applyIfDefined( getMinHeight , minHeight ) ,
        ...applyIfDefined( getMaxHeight , maxHeight ) ,

        // Colors
        ...applyIfDefined( getBackgroundColor , backgroundColor ) ,
        ...applyIfDefined( getBorderColor     , borderColor     ) ,
        ...applyIfDefined( getTextColor       , textColor       ) ,

        ...after ,
    } ,
    getMarginClassNames({
        margin , marginBottom , marginEnd , marginLeft ,
        marginRight , marginStart , marginTop , marginX , marginY ,
    }) ,
    getPaddingClassNames({
        padding , paddingBottom , paddingEnd , paddingLeft ,
        paddingRight , paddingStart , paddingTop , paddingX , paddingY ,
    }) ,
    className ,
) ;

export default getLayoutClassNames ;