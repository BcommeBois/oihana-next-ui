/**
 * Font weight utilities for Tailwind CSS.
 *
 * @module themes/typography/fontWeight
 * @see https://tailwindcss.com/docs/font-weight
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'} FontWeightValue
 */

export const THIN       = 'thin' ;
export const EXTRALIGHT = 'extralight' ;
export const LIGHT      = 'light' ;
export const NORMAL     = 'normal' ;
export const MEDIUM     = 'medium' ;
export const SEMIBOLD   = 'semibold' ;
export const BOLD       = 'bold' ;
export const EXTRABOLD  = 'extrabold' ;
export const BLACK      = 'black' ;

/**
 * Valid font weight values.
 * @type {FontWeightValue[]}
 */
export const fontWeights =
[
    THIN , EXTRALIGHT , LIGHT , NORMAL , MEDIUM ,
    SEMIBOLD , BOLD , EXTRABOLD , BLACK ,
] ;

/**
 * Generates responsive font weight class definitions.
 *
 * @param {FontWeightValue | import('../sizing/sizes').ResponsiveSize} value
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getFontWeight( 'bold' ) ;
 * // → { 'font-bold': true }
 *
 * getFontWeight( { xs: 'normal' , lg: 'semibold' } ) ;
 * // → { 'font-normal': true , 'lg:font-semibold': true }
 * ```
 */
const getFontWeight = getResponsiveDefinition( create( 'font-' ) , value => fontWeights.includes( value ) ) ;

export default getFontWeight ;