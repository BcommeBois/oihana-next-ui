/**
 * Table class names generator for Tailwind CSS.
 *
 * @module themes/layout/getTableClassNames
 */

import cn from '../helpers/cn' ;

import applyIfDefined from '../../helpers/applyIfDefined' ;

import getTableSize      from '../sizing/tableSize' ;
import getBorderSpacing  from '../spacing/borderSpacing' ;
import getBorderSpacingX from '../spacing/borderSpacingX' ;
import getBorderSpacingY from '../spacing/borderSpacingY' ;

import getLayoutClassNames from './getLayoutClassNames' ;

/**
 * @typedef {'collapse' | 'separate'} TableBorderCollapse
 */

export const COLLAPSE = 'collapse' ;
export const SEPARATE = 'separate' ;

/**
 * Valid border collapse values.
 * @type {TableBorderCollapse[]}
 */
export const borderCollapses = [ COLLAPSE , SEPARATE ] ;

/**
 * @typedef {'auto' | 'fixed'} TableLayout
 */

export const AUTO  = 'auto' ;
export const FIXED = 'fixed' ;

/**
 * Valid table layout values.
 * @type {TableLayout[]}
 */
export const tableLayouts = [ AUTO , FIXED ] ;

/**
 * @typedef {import('./getLayoutClassNames').LayoutClassNamesProps & {
 *   border?: TableBorderCollapse,
 *   borderSpacing?: *,
 *   borderSpacingX?: *,
 *   borderSpacingY?: *,
 *   disabled?: boolean,
 *   disabledClassName?: string,
 *   layout?: TableLayout,
 *   pinCols?: boolean,
 *   pinRows?: boolean,
 *   size?: import('../sizing/tableSize').TableSize,
 *   zebra?: boolean,
 * }} TableClassNamesProps
 */

/**
 * Generates table class names.
 *
 * Extends {@link getLayoutClassNames} with table-specific properties.
 *
 * @param {TableClassNamesProps} [props]
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/border-collapse
 * @see https://tailwindcss.com/docs/table-layout
 * @see https://tailwindcss.com/docs/border-spacing
 *
 * @example
 * ```js
 * getTableClassNames() ;
 * // → 'table table-auto border-collapse table-zebra'
 *
 * getTableClassNames( { layout: 'fixed' , size: 'sm' , zebra: false } ) ;
 * // → 'table table-fixed border-collapse table-sm'
 *
 * getTableClassNames( { border: 'separate' , borderSpacingX: 4 , borderSpacingY: 2 } ) ;
 * // → 'table table-auto border-separate border-spacing-x-4 border-spacing-y-2 table-zebra'
 *
 * getTableClassNames( { pinRows: true , pinCols: true , backgroundColor: 'base-100' } ) ;
 * // → 'table table-auto border-collapse table-pin-rows table-pin-cols table-zebra bg-base-100'
 * ```
 */
export const getTableClassNames =
({
     border = COLLAPSE ,
     borderSpacing ,
     borderSpacingX ,
     borderSpacingY ,
     disabled ,
     disabledClassName = 'opacity-60' ,
     layout = AUTO ,
     pinCols ,
     pinRows ,
     size ,
     zebra = true ,

     ...layoutProps
 }
 = {} ) => cn
(
    'table' ,
    {
        'table-auto'  : layout === AUTO ,
        'table-fixed' : layout === FIXED ,

        'border-collapse' : border === COLLAPSE ,
        'border-separate' : border === SEPARATE ,

        ...applyIfDefined( getTableSize , size ) ,

        'table-pin-rows' : pinRows === true ,
        'table-pin-cols' : pinCols === true ,
        'table-zebra'    : zebra   === true ,

        ...applyIfDefined( getBorderSpacing  , borderSpacing  ) ,
        ...applyIfDefined( getBorderSpacingX , borderSpacingX ) ,
        ...applyIfDefined( getBorderSpacingY , borderSpacingY ) ,

        [ disabledClassName ] : disabled ,
    } ,
    getLayoutClassNames( layoutProps ) ,
) ;

export default getTableClassNames ;