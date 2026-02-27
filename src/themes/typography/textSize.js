/**
 * Text size (font-size) utilities for Tailwind CSS.
 *
 * @module themes/typography/textSize
 * @see https://tailwindcss.com/docs/font-size
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import {
    BASE ,
    LG ,
    MD ,
    SM ,
    XL ,
    XS ,
    XXL ,
    XXXL ,
    XXXXL ,
    XXXXXL ,
    XXXXXXL ,
    XXXXXXXL ,
    XXXXXXXXL ,
    XXXXXXXXXL ,
} from '../sizing/sizes' ;

/**
 * @typedef {'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'} TextSizeValue
 */

/**
 * Valid text sizes.
 * @type {TextSizeValue[]}
 */
export const sizes =
    [
        XS ,
        SM ,
        MD ,
        BASE ,
        LG ,
        XL ,
        XXL ,
        XXXL ,
        XXXXL ,
        XXXXXL ,
        XXXXXXL ,
        XXXXXXXL ,
        XXXXXXXXL ,
        XXXXXXXXXL ,
    ] ;

/**
 * Generates responsive text size class definitions.
 *
 * @param {TextSizeValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getTextSize( 'lg' ) ;
 * // → { 'text-lg': true }
 *
 * getTextSize( { xs: 'sm' , md: 'base' , lg: 'xl' } ) ;
 * // → { 'text-sm': true , 'md:text-base': true , 'lg:text-xl': true }
 * ```
 */
const getTextSize = getResponsiveDefinition( create( 'text-' ) , value => sizes.includes( value ) ) ;

export default getTextSize ;