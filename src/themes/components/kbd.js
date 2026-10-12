/**
 * Kbd class name generator for DaisyUI 5.
 *
 * @module themes/components/kbd
 * @see https://daisyui.com/components/kbd
 */

import cn from '../helpers/cn' ;

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

/**
 * Valid kbd sizes.
 * @type {string[]}
 */
export const sizes =
[
    XL ,
    LG ,
    MD ,
    SM ,
    XS ,
] ;

const sizeMap =
{
    [ XL ] : 'kbd-xl' ,
    [ LG ] : 'kbd-lg' ,
    [ MD ] : 'kbd-md' ,
    [ SM ] : 'kbd-sm' ,
    [ XS ] : 'kbd-xs' ,
} ;

export const KBD = 'kbd' ;

/**
 * Generates kbd class names for DaisyUI 5.
 *
 * daisyUI ships no colour for a key : only its size varies.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after.
 * @param {Object} [props.before] - Class definitions applied before.
 * @param {string} [props.beforeClassName] - CSS string prepended.
 * @param {string} [props.className] - CSS string appended.
 * @param {string} [props.size] - Kbd size (xs, sm, md, lg, xl). Left out, daisyUI's own default (md).
 *
 * @returns {string} Combined class names.
 *
 * @example
 * ```js
 * getKbdClasses() ;
 * // → 'kbd'
 *
 * getKbdClasses({ size: 'lg' }) ;
 * // → 'kbd kbd-lg'
 * ```
 */
export const getKbdClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    size ,
}
= {} ) => cn
(
    beforeClassName ,
    {
        ...before ,

        [ KBD ] : true ,

        ...!!sizeMap[ size ] && { [ sizeMap[ size ] ] : true } ,

        ...after ,
    } ,
    className ,
) ;

export default getKbdClasses ;
