/**
 * Border radius class names generator for Tailwind CSS.
 *
 * @module themes/borders/getBorderRadiusClassNames
 * @see https://tailwindcss.com/docs/border-radius
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={getBorderRadiusClassNames({ borderRadius: 'lg', className: 'md:rounded-xl' })} />
 * ```
 */

import applyIfDefined from '@/helpers/applyIfDefined' ;
import cn             from '@/themes/helpers/cn' ;

import getBorderRadius            from './borderRadius' ;
import getBorderRadiusTop         from './borderRadiusTop' ;
import getBorderRadiusRight       from './borderRadiusRight' ;
import getBorderRadiusBottom      from './borderRadiusBottom' ;
import getBorderRadiusLeft        from './borderRadiusLeft' ;
import getBorderRadiusTopLeft     from './borderRadiusTopLeft' ;
import getBorderRadiusTopRight    from './borderRadiusTopRight' ;
import getBorderRadiusBottomLeft  from './borderRadiusBottomLeft' ;
import getBorderRadiusBottomRight from './borderRadiusBottomRight' ;

/**
 * @typedef {import('./borderRadius').BorderRadiusSize | boolean} BorderRadiusValue
 */

/**
 * Generates border radius class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 *
 * @param {BorderRadiusValue} [props.borderRadius] - Border radius on all corners.
 * @param {BorderRadiusValue} [props.borderRadiusTop] - Top side (top-left + top-right).
 * @param {BorderRadiusValue} [props.borderRadiusRight] - Right side (top-right + bottom-right).
 * @param {BorderRadiusValue} [props.borderRadiusBottom] - Bottom side (bottom-left + bottom-right).
 * @param {BorderRadiusValue} [props.borderRadiusLeft] - Left side (top-left + bottom-left).
 * @param {BorderRadiusValue} [props.borderRadiusTopLeft] - Top-left corner.
 * @param {BorderRadiusValue} [props.borderRadiusTopRight] - Top-right corner.
 * @param {BorderRadiusValue} [props.borderRadiusBottomLeft] - Bottom-left corner.
 * @param {BorderRadiusValue} [props.borderRadiusBottomRight] - Bottom-right corner.
 *
 * @returns {string} Combined class names string.
 *
 * @example
 * ```js
 * getBorderRadiusClassNames( { borderRadius: 'lg' } ) ;
 * // → 'rounded-lg'
 *
 * getBorderRadiusClassNames( { borderRadiusTop: 'xl' , borderRadiusBottom: 'none' } ) ;
 * // → 'rounded-t-xl rounded-b-none'
 * ```
 */
const getBorderRadiusClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     borderRadius ,
     borderRadiusTop ,
     borderRadiusRight ,
     borderRadiusBottom ,
     borderRadiusLeft ,
     borderRadiusTopLeft ,
     borderRadiusTopRight ,
     borderRadiusBottomLeft ,
     borderRadiusBottomRight ,
 }
 = {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        ...applyIfDefined( getBorderRadius            , borderRadius            ) ,
        ...applyIfDefined( getBorderRadiusTop         , borderRadiusTop         ) ,
        ...applyIfDefined( getBorderRadiusRight       , borderRadiusRight       ) ,
        ...applyIfDefined( getBorderRadiusBottom      , borderRadiusBottom      ) ,
        ...applyIfDefined( getBorderRadiusLeft        , borderRadiusLeft        ) ,
        ...applyIfDefined( getBorderRadiusTopLeft     , borderRadiusTopLeft     ) ,
        ...applyIfDefined( getBorderRadiusTopRight    , borderRadiusTopRight    ) ,
        ...applyIfDefined( getBorderRadiusBottomLeft  , borderRadiusBottomLeft  ) ,
        ...applyIfDefined( getBorderRadiusBottomRight , borderRadiusBottomRight ) ,

        ...after ,
    } ,
    className ,
) ;

export default getBorderRadiusClassNames ;