import cn from '../helpers/cn' ;

import getBackgroundGradientDirection from './backgroundGradientDirection' ;

import getFromColor      from '../colors/fromColor' ;
import getFromPercentage from './fromPercentage' ;

import getToColor      from '../colors/toColor' ;
import getToPercentage from './toPercentage' ;

import getViaColor      from '../colors/viaColor' ;
import getViaPercentage from './viaPercentage' ;

/**
 * Generates a background gradient className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName override.
 * @param {import('./backgroundGradientDirection').BackgroundGradientDirection} [props.direction] - Gradient direction.
 * @param {import('../colors').Color} [props.fromColor] - Starting color.
 * @param {import('../enums/percentages').Percentage} [props.fromPercent] - Starting stop position.
 * @param {import('../colors').Color} [props.toColor] - Ending color.
 * @param {import('../enums/percentages').Percentage} [props.toPercent] - Ending stop position.
 * @param {import('../colors').Color} [props.viaColor] - Middle color.
 * @param {import('../enums/percentages').Percentage} [props.viaPercent] - Middle stop position.
 *
 * @returns {string} The gradient className expression.
 *
 * @see https://tailwindcss.com/docs/background-image#linear-gradients
 *
 * @example
 * ```js
 * getBackgroundGradient( {
 *     beforeClassName : 'size-36 rounded-2xl' ,
 *     direction       : 'l' ,
 *     fromColor       : 'primary' ,
 *     viaColor        : 'accent' ,
 *     toColor         : 'secondary' ,
 * } ) ;
 * // → 'size-36 rounded-2xl bg-linear-to-l from-primary via-accent to-secondary'
 *
 * getBackgroundGradient( {
 *     direction   : 'r' ,
 *     fromColor   : 'primary' ,
 *     fromPercent : '0%' ,
 *     toColor     : 'secondary' ,
 *     toPercent   : '100%' ,
 * } ) ;
 * // → 'bg-linear-to-r from-primary from-0% to-secondary to-100%'
 * ```
 */
const getBackgroundGradient =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    direction ,
    fromColor ,
    fromPercent ,
    toColor ,
    toPercent ,
    viaColor ,
    viaPercent ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,
        ...!!direction   && getBackgroundGradientDirection( direction ) ,
        ...!!fromColor   && getFromColor( fromColor ) ,
        ...!!fromPercent && getFromPercentage( fromPercent ) ,
        ...!!viaColor    && getViaColor( viaColor ) ,
        ...!!viaPercent  && getViaPercentage( viaPercent ) ,
        ...!!toColor     && getToColor( toColor ) ,
        ...!!toPercent   && getToPercentage( toPercent ) ,
        ...after ,
    } ,
    className ,
) ;

export default getBackgroundGradient ;