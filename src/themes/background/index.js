import cn from '@/themes/helpers/cn' ;

import getBackgroundColor   from '../colors/backgroundColor' ;
import getBackgroundPattern from '../effects/backgroundPattern' ;

/**
 * Generates a background className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName override.
 * @param {import('../colors/backgroundColor').BackgroundColor} [props.color] - Background color.
 * @param {import('../effects/backgroundPattern').BackgroundPattern} [props.pattern] - Background pattern.
 *
 * @returns {string} The background className expression.
 *
 * @example
 * ```js
 * getBackgroundClasses( { color: 'primary' } ) ;
 * // → 'bg-primary'
 *
 * getBackgroundClasses( { color: 'base-200' , pattern: 'dots' } ) ;
 * // → 'bg-base-200 bg-dots'
 *
 * getBackgroundClasses( { color: { value: 'base-100' , hover: 'base-200' } } ) ;
 * // → 'bg-base-100 hover:bg-base-200'
 * ```
 */
const getBackgroundClasses =
    ( {
   after ,
   before ,
   beforeClassName ,
   className ,
   color ,
   pattern ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,
        ...!!color   && getBackgroundColor( color ) ,
        ...!!pattern && getBackgroundPattern( pattern ) ,
        ...after ,
    } ,
    className ,
) ;

export default getBackgroundClasses ;