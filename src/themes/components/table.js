/**
 * Table class name generator for DaisyUI 5.
 *
 * @module themes/components/table
 * @see https://daisyui.com/components/table
 */

import cn from '../helpers/cn' ;

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

// Sizes

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} TableSize
 */

export const sizes = [ XS , SM , MD , LG , XL ] ;

const sizeMap =
{
    [ XS ] : 'table-xs' ,
    [ SM ] : 'table-sm' ,
    [ MD ] : 'table-md' ,
    [ LG ] : 'table-lg' ,
    [ XL ] : 'table-xl' ,
} ;

export const TABLE = 'table' ;

/**
 * Generates a DaisyUI table className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {boolean} [props.pinCols=false] - Make <th> columns sticky.
 * @param {boolean} [props.pinRows=false] - Make <thead> and <tfoot> rows sticky.
 * @param {TableSize} [props.size] - Table size.
 * @param {boolean} [props.zebra=false] - Show zebra stripe rows.
 *
 * @returns {string} The table className expression.
 */
const getTableClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    pinCols = false ,
    pinRows = false ,
    size ,
    zebra = false ,
}
= {} ) => cn
(
    beforeClassName ,
    TABLE ,
    {
        ...before ,

        ...size && sizeMap[size] && { [ sizeMap[size] ] : true } ,

        'table-zebra'    : zebra === true ,
        'table-pin-rows' : pinRows === true ,
        'table-pin-cols' : pinCols === true ,

        ...after ,
    } ,
    className ,
) ;

export default getTableClasses ;