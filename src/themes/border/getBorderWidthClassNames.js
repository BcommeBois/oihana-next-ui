/**
 * Border width class names generator for Tailwind CSS.
 *
 * @module themes/borders/getBorderWidthClassNames
 * @see https://tailwindcss.com/docs/border-width
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={getBorderWidthClassNames({ borderWidth: true, className: 'md:border-2' })} />
 * ```
 */

import applyIfDefined from '../../helpers/applyIfDefined' ;
import cn             from '../helpers/cn' ;

import getBorderWidth       from './borderWidth' ;
import getBorderWidthBottom from './borderWidthBottom' ;
import getBorderWidthEnd    from './borderWidthEnd' ;
import getBorderWidthLeft   from './borderWidthLeft' ;
import getBorderWidthRight  from './borderWidthRight' ;
import getBorderWidthStart  from './borderWidthStart' ;
import getBorderWidthTop    from './borderWidthTop' ;
import getBorderWidthX      from './borderWidthX' ;
import getBorderWidthY      from './borderWidthY' ;

/**
 * @typedef {string | number | boolean} BorderWidthValue
 */

/**
 * Generates border width class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 *
 * @param {BorderWidthValue} [props.borderWidth] - Border width on all sides.
 * @param {BorderWidthValue} [props.borderWidthBottom] - Bottom border width.
 * @param {BorderWidthValue} [props.borderWidthEnd] - Inline-end border width.
 * @param {BorderWidthValue} [props.borderWidthLeft] - Left border width.
 * @param {BorderWidthValue} [props.borderWidthRight] - Right border width.
 * @param {BorderWidthValue} [props.borderWidthStart] - Inline-start border width.
 * @param {BorderWidthValue} [props.borderWidthTop] - Top border width.
 * @param {BorderWidthValue} [props.borderWidthX] - Horizontal border width.
 * @param {BorderWidthValue} [props.borderWidthY] - Vertical border width.
 *
 * @returns {string} Combined class names string.
 *
 * @example
 * ```js
 * getBorderWidthClassNames( { borderWidth: true } ) ;
 * // → 'border'
 *
 * getBorderWidthClassNames( { borderWidthTop: 2 , borderWidthBottom: 4 } ) ;
 * // → 'border-t-2 border-b-4'
 * ```
 */
const getBorderWidthClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     borderWidth ,
     borderWidthBottom ,
     borderWidthEnd ,
     borderWidthLeft ,
     borderWidthRight ,
     borderWidthStart ,
     borderWidthTop ,
     borderWidthX ,
     borderWidthY ,
 }
 = {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        ...applyIfDefined( getBorderWidth       , borderWidth       ) ,
        ...applyIfDefined( getBorderWidthX      , borderWidthX      ) ,
        ...applyIfDefined( getBorderWidthY      , borderWidthY      ) ,
        ...applyIfDefined( getBorderWidthBottom , borderWidthBottom ) ,
        ...applyIfDefined( getBorderWidthEnd    , borderWidthEnd    ) ,
        ...applyIfDefined( getBorderWidthLeft   , borderWidthLeft   ) ,
        ...applyIfDefined( getBorderWidthRight  , borderWidthRight  ) ,
        ...applyIfDefined( getBorderWidthStart  , borderWidthStart  ) ,
        ...applyIfDefined( getBorderWidthTop    , borderWidthTop    ) ,

        ...after ,
    } ,
    className ,
) ;

export default getBorderWidthClassNames ;