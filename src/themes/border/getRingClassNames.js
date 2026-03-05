/**
 * Ring class names generator for Tailwind CSS.
 *
 * @module themes/borders/getRingClassNames
 * @see https://tailwindcss.com/docs/ring-width
 * @see https://tailwindcss.com/docs/ring-color
 * @see https://tailwindcss.com/docs/ring-offset-width
 * @see https://tailwindcss.com/docs/ring-offset-color
 *
 * **Responsive usage:**
 * Use `className` directly for responsive variants:
 *
 * ```jsx
 * <div className={getRingClassNames({ ringWidth: 2, className: 'md:ring-4' })} />
 * ```
 */

import applyIfDefined from '../../helpers/applyIfDefined' ;
import cn             from '../helpers/cn' ;

import getRingWidth       from './ringWidth' ;
import getRingOffsetWidth from './ringOffsetWidth' ;
import getRingColor       from '../colors/ringColor' ;
import getRingOffsetColor from '../colors/ringOffsetColor' ;

/**
 * Generates ring class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 *
 * @param {string | number | boolean} [props.ringWidth] - Ring width.
 * @param {string | number} [props.ringOffsetWidth] - Ring offset width.
 * @param {import('../colors/ringColor').RingColor} [props.ringColor] - Ring color.
 * @param {import('../colors/ringOffsetColor').RingOffsetColor} [props.ringOffsetColor] - Ring offset color.
 *
 * @returns {string} Combined class names string.
 *
 * @example
 * ```js
 * getRingClassNames( { ringWidth: 2 , ringColor: 'primary' } ) ;
 * // → 'ring-2 ring-primary'
 *
 * getRingClassNames( { ringWidth: 2 , ringOffsetWidth: 2 , ringOffsetColor: 'base-100' } ) ;
 * // → 'ring-2 ring-offset-2 ring-offset-base-100'
 * ```
 */
const getRingClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,

     ringWidth ,
     ringOffsetWidth ,
     ringColor ,
     ringOffsetColor ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        ...applyIfDefined( getRingWidth       , ringWidth       ) ,
        ...applyIfDefined( getRingOffsetWidth , ringOffsetWidth ) ,
        ...applyIfDefined( getRingColor       , ringColor       ) ,
        ...applyIfDefined( getRingOffsetColor , ringOffsetColor ) ,

        ...after ,
    } ,
    className ,
) ;

export default getRingClassNames ;