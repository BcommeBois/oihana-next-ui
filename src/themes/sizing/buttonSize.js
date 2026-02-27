/**
 * Button size utilities for DaisyUI.
 *
 * @module themes/sizing/buttonSize
 * @see https://daisyui.com/components/button/#button-sizes
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import { LG , MD , SM , XL , XS } from './sizes' ;

/**
 * @typedef {'lg' | 'md' | 'sm' | 'xl' | 'xs'} ButtonSizeValue
 */

export { LG , MD , SM , XL , XS } from './sizes' ;

/**
 * Valid button sizes.
 * @type {ButtonSizeValue[]}
 */
export const sizes = [ LG , MD , SM , XL , XS ] ;

/**
 * Generates responsive DaisyUI button size class definitions.
 *
 * Note: 'md' is the default button size in DaisyUI 5 (no class needed).
 *
 * @param {ButtonSizeValue | import('./sizes').ResponsiveSize} value - Button size or responsive object.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getButtonSize( 'sm' ) ;
 * // → { 'btn-sm': true }
 *
 * getButtonSize( { xs: 'xs' , md: 'md' , lg: 'xl' } ) ;
 * // → { 'btn-xs': true , 'md:btn-md': true , 'lg:btn-xl': true }
 * ```
 */
const getButtonSize = getResponsiveDefinition
(
    create( 'btn-' ) ,
    value => sizes.includes( value )
) ;

export default getButtonSize ;

/* Tailwindcss safe list
| ----XS---- | -----SM----- | -----MD----- | -----LG----- | -----XL----— | -----XXL----- |
| btn-block  | sm:btn-block | md:btn-block | lg:btn-block | xl:btn-block | 2xl:btn-block |
| btn-lg     | sm:btn-lg    | md:btn-lg    | lg:btn-lg    | xl:btn-lg    | 2xl:btn-lg    |
| btn-md     | sm:btn-md    | md:btn-md    | lg:btn-md    | xl:btn-md    | 2xl:btn-md    |
| btn-sm     | sm:btn-sm    | md:btn-sm    | lg:btn-sm    | xl:btn-sm    | 2xl:btn-sm    |
| btn-xs     | sm:btn-xs    | md:btn-xs    | lg:btn-xs    | xl:btn-xs    | 2xl:btn-xs    |
*/