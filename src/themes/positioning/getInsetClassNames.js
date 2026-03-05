/**
 * Inset class names generator for Tailwind CSS.
 *
 * @module themes/positioning/getInsetClassNames
 */

import applyIfDefined from '../../helpers/applyIfDefined' ;
import cn             from '../helpers/cn' ;

import getInset  from './inset' ;
import getInsetX from './insetX' ;
import getInsetY from './insetY' ;
import getTop    from './top' ;
import getRight  from './right' ;
import getBottom from './bottom' ;
import getLeft   from './left' ;
import getStart  from './start' ;
import getEnd    from './end' ;

/**
 * @typedef {string | number | import('../sizing/sizes').ResponsiveSize} InsetValue
 */

/**
 * Generates inset (position) class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 *
 * @param {InsetValue} [props.inset] - Inset on all sides.
 * @param {InsetValue} [props.insetX] - Horizontal inset.
 * @param {InsetValue} [props.insetY] - Vertical inset.
 * @param {InsetValue} [props.top] - Top position.
 * @param {InsetValue} [props.right] - Right position.
 * @param {InsetValue} [props.bottom] - Bottom position.
 * @param {InsetValue} [props.left] - Left position.
 * @param {InsetValue} [props.start] - Inline-start position.
 * @param {InsetValue} [props.end] - Inline-end position.
 *
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/top-right-bottom-left
 *
 * @example
 * ```js
 * getInsetClassNames( { inset: 0 } ) ;
 * // → 'inset-0'
 *
 * getInsetClassNames( { top: 4 , left: 2 } ) ;
 * // → 'top-4 left-2'
 *
 * getInsetClassNames( { top: { xs: 2 , md: 4 } , right: 0 } ) ;
 * // → 'top-2 md:top-4 right-0'
 * ```
 */
export const getInsetClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     inset ,
     insetX ,
     insetY ,
     top ,
     right ,
     bottom ,
     left ,
     start ,
     end ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        ...applyIfDefined( getInset  , inset  ) ,
        ...applyIfDefined( getInsetX , insetX ) ,
        ...applyIfDefined( getInsetY , insetY ) ,
        ...applyIfDefined( getTop    , top    ) ,
        ...applyIfDefined( getRight  , right  ) ,
        ...applyIfDefined( getBottom , bottom ) ,
        ...applyIfDefined( getLeft   , left   ) ,
        ...applyIfDefined( getStart  , start  ) ,
        ...applyIfDefined( getEnd    , end    ) ,

        ...after ,
    } ,
    className ,
) ;

export default getInsetClassNames ;