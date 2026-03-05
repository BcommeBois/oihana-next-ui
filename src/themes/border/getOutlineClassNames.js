/**
 * Outline class names generator for Tailwind CSS.
 *
 * @module themes/borders/getOutlineClassNames
 * @see https://tailwindcss.com/docs/outline-width
 * @see https://tailwindcss.com/docs/outline-style
 * @see https://tailwindcss.com/docs/outline-offset
 * @see https://tailwindcss.com/docs/outline-color
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={getOutlineClassNames({ outlineWidth: 2, className: 'md:outline-4' })} />
 * ```
 */

import applyIfDefined from '../../helpers/applyIfDefined' ;
import cn             from '../helpers/cn' ;

import getOutlineWidth  from './outlineWidth' ;
import getOutlineStyle  from './outlineStyle' ;
import getOutlineOffset from './outlineOffset' ;
import getOutlineColor  from '../colors/outlineColor' ;

/**
 * Generates outline class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 *
 * @param {string | number} [props.outlineWidth] - Outline width.
 * @param {import('./outlineStyle').OutlineStyleValue} [props.outlineStyle] - Outline style.
 * @param {string | number} [props.outlineOffset] - Outline offset.
 * @param {import('../colors/outlineColor').OutlineColorValue} [props.outlineColor] - Outline color.
 *
 * @returns {string} Combined class names string.
 *
 * @example
 * ```js
 * getOutlineClassNames( { outlineWidth: 2 , outlineStyle: 'dashed' , outlineColor: 'primary' } ) ;
 * // → 'outline-2 outline-dashed outline-primary'
 * ```
 */
const getOutlineClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     outlineWidth ,
     outlineStyle ,
     outlineOffset ,
     outlineColor ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        ...applyIfDefined( getOutlineWidth  , outlineWidth  ) ,
        ...applyIfDefined( getOutlineStyle  , outlineStyle  ) ,
        ...applyIfDefined( getOutlineOffset , outlineOffset ) ,
        ...applyIfDefined( getOutlineColor  , outlineColor  ) ,

        ...after ,
    } ,
    className ,
) ;

export default getOutlineClassNames ;