/**
 * Display utilities for Tailwind CSS.
 *
 * @module themes/layout/display
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

/**
 * @typedef {'block' | 'contents' | 'flex' | 'flow-root' | 'grid' | 'hidden' |
 *   'inline' | 'inline-block' | 'inline-flex' | 'inline-grid' | 'inline-table' |
 *   'list-item' | 'table' | 'table-caption' | 'table-cell' | 'table-column' |
 *   'table-column-group' | 'table-footer-group' | 'table-header-group' |
 *   'table-row' | 'table-row-group'} DisplayValue
 */

export const BLOCK              = 'block' ;
export const CONTENTS           = 'contents' ;
export const FLEX               = 'flex' ;
export const FLOW_ROOT          = 'flow-root' ;
export const GRID               = 'grid' ;
export const HIDDEN             = 'hidden' ;
export const INLINE             = 'inline' ;
export const INLINE_BLOCK       = 'inline-block' ;
export const INLINE_FLEX        = 'inline-flex' ;
export const INLINE_GRID        = 'inline-grid' ;
export const INLINE_TABLE       = 'inline-table' ;
export const LIST_ITEM          = 'list-item' ;
export const TABLE              = 'table' ;
export const TABLE_CAPTION      = 'table-caption' ;
export const TABLE_CELL         = 'table-cell' ;
export const TABLE_COLUMN       = 'table-column' ;
export const TABLE_COLUMN_GROUP = 'table-column-group' ;
export const TABLE_FOOTER_GROUP = 'table-footer-group' ;
export const TABLE_HEADER_GROUP = 'table-header-group' ;
export const TABLE_ROW          = 'table-row' ;
export const TABLE_ROW_GROUP    = 'table-row-group' ;

/**
 * Valid display values.
 * @type {DisplayValue[]}
 */
export const displays =
[
    BLOCK , CONTENTS , FLEX , FLOW_ROOT , GRID , HIDDEN ,
    INLINE , INLINE_BLOCK , INLINE_FLEX , INLINE_GRID , INLINE_TABLE ,
    LIST_ITEM ,
    TABLE , TABLE_CAPTION , TABLE_CELL , TABLE_COLUMN ,
    TABLE_COLUMN_GROUP , TABLE_FOOTER_GROUP , TABLE_HEADER_GROUP ,
    TABLE_ROW , TABLE_ROW_GROUP ,
] ;

/**
 * Generates responsive display class definitions.
 *
 * @param {DisplayValue | import('../sizing/sizes').ResponsiveSize} value - Display or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/display
 *
 * @example
 * ```js
 * getDisplay( 'flex' ) ;
 * // → { 'flex': true }
 *
 * getDisplay( 'hidden' ) ;
 * // → { 'hidden': true }
 *
 * getDisplay( { xs: 'hidden' , md: 'flex' , lg: 'grid' } ) ;
 * // → { 'hidden': true , 'md:flex': true , 'lg:grid': true }
 * ```
 */
const getDisplay = getResponsiveDefinition( create() , value => displays.includes( value ) ) ;

export default getDisplay ;

/* Tailwindcss safe list
| --------XS----------- | --------SM-------------- | --------MD-------------- | --------LG-------------- | --------XL-------------- | --------XXL-------------- |
| block                 | sm:block                 | md:block                 | lg:block                 | xl:block                 | 2xl:block                 |
| contents              | sm:contents              | md:contents              | lg:contents              | xl:contents              | 2xl:contents              |
| flex                  | sm:flex                  | md:flex                  | lg:flex                  | xl:flex                  | 2xl:flex                  |
| flow-root             | sm:flow-root             | md:flow-root             | lg:flow-root             | xl:flow-root             | 2xl:flow-root             |
| grid                  | sm:grid                  | md:grid                  | lg:grid                  | xl:grid                  | 2xl:grid                  |
| hidden                | sm:hidden                | md:hidden                | lg:hidden                | xl:hidden                | 2xl:hidden                |
| inline                | sm:inline                | md:inline                | lg:inline                | xl:inline                | 2xl:inline                |
| inline-block          | sm:inline-block          | md:inline-block          | lg:inline-block          | xl:inline-block          | 2xl:inline-block          |
| inline-flex           | sm:inline-flex           | md:inline-flex           | lg:inline-flex           | xl:inline-flex           | 2xl:inline-flex           |
| inline-grid           | sm:inline-grid           | md:inline-grid           | lg:inline-grid           | xl:inline-grid           | 2xl:inline-grid           |
| inline-table          | sm:inline-table          | md:inline-table          | lg:inline-table          | xl:inline-table          | 2xl:inline-table          |
| list-item             | sm:list-item             | md:list-item             | lg:list-item             | xl:list-item             | 2xl:list-item             |
| table                 | sm:table                 | md:table                 | lg:table                 | xl:table                 | 2xl:table                 |
| table-caption         | sm:table-caption         | md:table-caption         | lg:table-caption         | xl:table-caption         | 2xl:table-caption         |
| table-cell            | sm:table-cell            | md:table-cell            | lg:table-cell            | xl:table-cell            | 2xl:table-cell            |
| table-column          | sm:table-column          | md:table-column          | lg:table-column          | xl:table-column          | 2xl:table-column          |
| table-column-group    | sm:table-column-group    | md:table-column-group    | lg:table-column-group    | xl:table-column-group    | 2xl:table-column-group    |
| table-footer-group    | sm:table-footer-group    | md:table-footer-group    | lg:table-footer-group    | xl:table-footer-group    | 2xl:table-footer-group    |
| table-header-group    | sm:table-header-group    | md:table-header-group    | lg:table-header-group    | xl:table-header-group    | 2xl:table-header-group    |
| table-row             | sm:table-row             | md:table-row             | lg:table-row             | xl:table-row             | 2xl:table-row             |
| table-row-group       | sm:table-row-group       | md:table-row-group       | lg:table-row-group       | xl:table-row-group       | 2xl:table-row-group       |
*/