/**
 * Text class name generator for Tailwind CSS.
 *
 * @module themes/typography/getTextClassNames
 */

import cn from '../helpers/cn' ;

import { getMarginClassNames , getPaddingClassNames } from '../spacing' ;

import getFontFamily     from './fontFamily' ;
import getFontStyle      from './fontStyle' ;
import getFontWeight     from './fontWeight' ;
import getLetterSpacing  from './letterSpacing' ;
import getLineClamp      from './lineClamp' ;
import getLineHeight     from './lineHeight' ;
import getTextAlign      from './textAlign' ;
import getTextColor      from '../colors/textColor' ;
import getTextDecoration from './textDecoration' ;
import getTextOverflow   from './textOverflow' ;
import getTextSize       from './textSize' ;
import getTextTransform  from './textTransform' ;
import getTextWrap       from './textWrap' ;
import getWhitespace     from './whitespace' ;
import getWordBreak      from './wordBreak' ;

import applyIfDefined from '../../helpers/applyIfDefined' ;

/**
 * @typedef {Object} TextClassNameProps
 *
 * @prop {import('./textAlign').TextAlignValue} [align] - Text alignment.
 * @prop {import('../colors/textColor').TextColor} [color] - Text color with pseudo-class support.
 * @prop {import('./textDecoration').TextDecorationValue} [decoration] - Text decoration.
 * @prop {import('./fontFamily').FontFamilyValue} [fontFamily] - Font family (sans, serif or mono).
 * @prop {import('./fontStyle').FontStyleValue} [fontStyle] - Font style (italic).
 * @prop {import('./letterSpacing').LetterSpacingValue} [letterSpacing] - Letter spacing (tracking).
 * @prop {import('./lineClamp').LineClampValue} [lineClamp] - Line clamp (1-6 or 'none').
 * @prop {import('./lineHeight').LineHeightValue} [lineHeight] - Line height (leading).
 * @prop {import('./textOverflow').TextOverflowValue} [overflow] - Text overflow.
 * @prop {import('./textSize').TextSizeValue} [size] - Font size.
 * @prop {import('./textTransform').TextTransformValue} [transform] - Text transform.
 * @prop {import('./fontWeight').FontWeightValue} [weight] - Font weight.
 * @prop {import('./whitespace').WhitespaceValue} [whitespace] - Whitespace handling.
 * @prop {import('./wordBreak').WordBreakValue} [wordBreak] - Word break.
 * @prop {import('./textWrap').TextWrapValue} [wrap] - Text wrap.
 *
 * @prop {Object} [before] - Before class definitions.
 * @prop {Object} [after] - After class definitions.
 * @prop {string} [beforeClassName] - Prepended class name.
 * @prop {string} [className] - Appended class name.
 *
 * @prop {import('../spacing').SpacingValue} [margin]
 * @prop {import('../spacing').SpacingValue} [marginBottom]
 * @prop {import('../spacing').SpacingValue} [marginEnd]
 * @prop {import('../spacing').SpacingValue} [marginLeft]
 * @prop {import('../spacing').SpacingValue} [marginRight]
 * @prop {import('../spacing').SpacingValue} [marginStart]
 * @prop {import('../spacing').SpacingValue} [marginTop]
 * @prop {import('../spacing').SpacingValue} [marginX]
 * @prop {import('../spacing').SpacingValue} [marginY]
 * @prop {import('../spacing').SpacingValue} [padding]
 * @prop {import('../spacing').SpacingValue} [paddingBottom]
 * @prop {import('../spacing').SpacingValue} [paddingEnd]
 * @prop {import('../spacing').SpacingValue} [paddingLeft]
 * @prop {import('../spacing').SpacingValue} [paddingRight]
 * @prop {import('../spacing').SpacingValue} [paddingStart]
 * @prop {import('../spacing').SpacingValue} [paddingTop]
 * @prop {import('../spacing').SpacingValue} [paddingX]
 * @prop {import('../spacing').SpacingValue} [paddingY]
 */

/**
 * Generates text class names by composing typography, color and spacing utilities.
 *
 * @param {TextClassNameProps} [props={}] - Text properties.
 * @returns {string} The composed class name string.
 *
 * @example
 * ```js
 * getTextClassNames({ size: 'lg' , weight: 'bold' , color: 'primary' }) ;
 * // → 'text-lg font-bold text-primary'
 *
 * getTextClassNames({ align: 'center' , lineClamp: 3 , transform: 'uppercase' }) ;
 * // → 'text-center line-clamp-3 uppercase'
 *
 * getTextClassNames({ size: { xs: 'sm' , md: 'lg' } , weight: 'semibold' }) ;
 * // → 'text-sm md:text-lg font-semibold'
 * ```
 */
const getTextClassNames =
({
     align ,
     color ,
     decoration ,
     fontFamily ,
     fontStyle ,
     letterSpacing ,
     lineClamp ,
     lineHeight ,
     overflow ,
     size ,
     transform ,
     weight ,
     whitespace ,
     wordBreak ,
     wrap ,

     before ,
     after ,
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
        ...before && { ...before } ,

        ...applyIfDefined( getTextAlign      , align ) ,
        ...applyIfDefined( getTextColor      , color ) ,
        ...applyIfDefined( getTextDecoration , decoration ) ,
        ...applyIfDefined( getFontFamily     , fontFamily ) ,
        ...applyIfDefined( getFontStyle      , fontStyle ) ,
        ...applyIfDefined( getFontWeight     , weight ) ,
        ...applyIfDefined( getLetterSpacing  , letterSpacing ) ,
        ...applyIfDefined( getLineClamp      , lineClamp ) ,
        ...applyIfDefined( getLineHeight     , lineHeight ) ,
        ...applyIfDefined( getTextOverflow   , overflow ) ,
        ...applyIfDefined( getTextSize       , size ) ,
        ...applyIfDefined( getTextTransform  , transform ) ,
        ...applyIfDefined( getTextWrap       , wrap ) ,
        ...applyIfDefined( getWhitespace     , whitespace ) ,
        ...applyIfDefined( getWordBreak      , wordBreak ) ,

        ...after && { ...after } ,
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

export default getTextClassNames ;