/**
 * Flex direction utilities for Tailwind CSS.
 *
 * @module themes/layout/flexDirection
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'col' | 'col-reverse' | 'row' | 'row-reverse'} FlexDirectionValue
 */

export const COL         = 'col' ;
export const COL_REVERSE = 'col-reverse' ;
export const ROW         = 'row' ;
export const ROW_REVERSE = 'row-reverse' ;

/**
 * Valid flex direction values.
 * @type {FlexDirectionValue[]}
 */
export const directions = [ COL , COL_REVERSE , ROW , ROW_REVERSE ] ;

/**
 * Generates responsive flex direction class definitions.
 *
 * @param {FlexDirectionValue | import('../sizing/sizes').ResponsiveSize} value - Direction or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/flex-direction
 *
 * @example
 * ```js
 * getFlexDirection( 'col' ) ;
 * // → { 'flex-col': true }
 *
 * getFlexDirection( { xs: 'col' , lg: 'row' } ) ;
 * // → { 'flex-col': true , 'lg:flex-row': true }
 * ```
 */
const getFlexDirection = getResponsiveDefinition( create( 'flex-' ) , value => directions.includes( value ) ) ;

export default getFlexDirection ;

/* Tailwindcss safe list
| --------XS-------------- | --------SM----------------- | --------MD----------------- | --------LG----------------- | --------XL----------------- | --------XXL----------------- |
| flex-col                 | sm:flex-col                 | md:flex-col                 | lg:flex-col                 | xl:flex-col                 | 2xl:flex-col                 |
| flex-col-reverse         | sm:flex-col-reverse         | md:flex-col-reverse         | lg:flex-col-reverse         | xl:flex-col-reverse         | 2xl:flex-col-reverse         |
| flex-row                 | sm:flex-row                 | md:flex-row                 | lg:flex-row                 | xl:flex-row                 | 2xl:flex-row                 |
| flex-row-reverse         | sm:flex-row-reverse         | md:flex-row-reverse         | lg:flex-row-reverse         | xl:flex-row-reverse         | 2xl:flex-row-reverse         |
*/