import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import { LG , MD , SM , XS } from './sizes' ;

/**
 * Valid DaisyUI table size values.
 *
 * @type {(string)[]}
 */
export const sizes = [ LG , MD , SM , XS ] ;

export { LG , MD , SM , XS } from './sizes' ;

/**
 * Generates responsive DaisyUI table size class definitions.
 *
 * @param {('lg'|'md'|'sm'|'xs')|Object} value - Table size or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://daisyui.com/components/table
 *
 * @example
 * ```js
 * getTableSize( 'sm' ) ;
 * // → { 'table-sm': true }
 *
 * getTableSize( { xs: 'xs' , md: 'sm' , lg: 'md' } ) ;
 * // → { 'table-xs': true , 'md:table-sm': true , 'lg:table-md': true }
 * ```
 */
const getTableSize = getResponsiveDefinition( create( 'table-' ) , value => sizes.includes( value ) ) ;

export default getTableSize ;

/* Tailwindcss safe list
| --------XS----- | ----SM------ | -----MD------ | -----LG----- | -----XL----- | ----XXL------ |
| table-lg        | sm:table-lg  | md:table-lg   | lg:table-lg  | xl:table-lg  | 2xl:table-lg  |
| table-md        | sm:table-md  | md:table-md   | lg:table-md  | xl:table-md  | 2xl:table-md  |
| table-sm        | sm:table-sm  | md:table-sm   | lg:table-sm  | xl:table-sm  | 2xl:table-sm  |
| table-xs        | sm:table-xs  | md:table-xs   | lg:table-xs  | xl:table-xs  | 2xl:table-xs  |
*/