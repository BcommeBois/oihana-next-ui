/**
 * Delta class name generators.
 *
 * A house component : it is `Badge` doing the visual work, so there is little to generate
 * beyond the direction → colour map and the classes of the badge-less variant.
 *
 * @module themes/components/delta
 */

import cn from '../helpers/cn' ;

import getTextColor from '../colors/textColor' ;

import { BASE_CONTENT , ERROR , NEUTRAL , SUCCESS } from '../colors' ;

/**
 * @typedef {'down' | 'flat' | 'up'} DeltaDirection
 *
 * @typedef {'badge' | 'text'} DeltaVariant
 *
 * @typedef {'number' | 'percent'} DeltaFormat
 */

/**
 * Valid delta variants.
 * @type {DeltaVariant[]}
 */
export const variants = [ 'badge' , 'text' ] ;

/**
 * Valid value formats.
 * @type {DeltaFormat[]}
 */
export const formats = [ 'number' , 'percent' ] ;

/**
 * Colour of a change, by direction, when rising is the good news.
 *
 * `flat` is left out on purpose : "no change" has no verdict to give, and which token
 * carries that depends on the variant — see {@link getDeltaColor}.
 *
 * @type {Object}
 */
export const DIRECTION_COLORS =
{
    down : ERROR ,
    up   : SUCCESS ,
} ;

/**
 * Colour of a change when falling is the good news — an error rate, a churn, a cost.
 *
 * **Only the colours swap, never the arrow.** The arrow states a fact, that the number
 * went up or down ; the colour passes judgement on it. Swapping the arrow too would make
 * the component lie about the data.
 *
 * @type {Object}
 */
export const INVERTED_DIRECTION_COLORS =
{
    down : SUCCESS ,
    up   : ERROR ,
} ;

/**
 * Returns the colour token for a direction.
 *
 * The two variants need different tokens for "no change", and that is not an
 * inconsistency : a badge takes a *badge* colour, where `neutral` reads as a muted grey
 * chip, and bare text takes a *text* colour, where `base-content` is simply the body
 * colour it would have had anyway. `base-content` is not a badge modifier at all.
 *
 * @param {Object} [props]
 * @param {DeltaDirection} [props.direction='flat'] - Which way the number went.
 * @param {boolean} [props.inverted=false] - Whether falling is the good news.
 * @param {DeltaVariant} [props.variant='badge'] - Which shape the colour is for.
 *
 * @returns {string} A DaisyUI colour token.
 *
 * @example
 * ```js
 * getDeltaColor({ direction: 'up' }) ;                              // → 'success'
 * getDeltaColor({ direction: 'up' , inverted: true }) ;             // → 'error'
 * getDeltaColor({ direction: 'flat' , variant: 'text' }) ;          // → 'base-content'
 * ```
 */
export const getDeltaColor = ( { direction = 'flat' , inverted = false , variant = 'badge' } = {} ) =>
{
    if ( direction === 'flat' )
    {
        return variant === 'text' ? BASE_CONTENT : NEUTRAL ;
    }

    return ( inverted ? INVERTED_DIRECTION_COLORS : DIRECTION_COLORS )[ direction ] ;
} ;

export const DELTA_TEXT = 'inline-flex items-center gap-1 whitespace-nowrap font-medium tabular-nums' ;

/**
 * Generates the className expression of the badge-less variant.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.color] - A DaisyUI text colour token.
 *
 * @returns {string} The className expression.
 *
 * @example
 * ```js
 * getDeltaTextClasses({ color: 'success' }) ;
 * // → 'inline-flex items-center gap-1 whitespace-nowrap font-medium tabular-nums text-success'
 * ```
 */
export const getDeltaTextClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    color ,
} = {} ) => cn
(
    beforeClassName ,
    DELTA_TEXT ,
    {
        ...before ,

        ...!!color && getTextColor( color ) ,

        ...after ,
    } ,
    className ,
) ;

export default getDeltaColor ;
