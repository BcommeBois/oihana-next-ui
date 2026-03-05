/**
 * Divide class names generator for Tailwind CSS.
 *
 * @module themes/borders/getDivideClassNames
 * @see https://tailwindcss.com/docs/divide-width
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={getDivideClassNames({ divideX: 2, className: 'md:divide-x-4' })} />
 * ```
 */

import applyIfDefined from '../../helpers/applyIfDefined' ;
import cn             from '../helpers/cn' ;

import getDivideX from './divideX' ;
import getDivideY from './divideY' ;

/**
 * @typedef {string | number} DivideValue
 */

/**
 * Generates divide class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 *
 * @param {DivideValue} [props.divideX] - Horizontal divide width.
 * @param {DivideValue} [props.divideY] - Vertical divide width.
 *
 * @returns {string} Combined class names string.
 *
 * @example
 * ```js
 * getDivideClassNames( { divideX: 2 } ) ;
 * // → 'divide-x-2'
 *
 * getDivideClassNames( { divideX: 2 , divideY: 4 } ) ;
 * // → 'divide-x-2 divide-y-4'
 * ```
 */
const getDivideClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     divideX ,
     divideY ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        ...applyIfDefined( getDivideX , divideX ) ,
        ...applyIfDefined( getDivideY , divideY ) ,

        ...after ,
    } ,
    className ,
) ;

export default getDivideClassNames ;