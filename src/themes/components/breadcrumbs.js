/**
 * Breadcrumbs class name generator for DaisyUI 5.
 *
 * @module themes/components/breadcrumbs
 * @see https://daisyui.com/components/breadcrumbs
 */

import cn from '../helpers/cn' ;

// Sizes

export const XS = 'xs' ;
export const SM = 'sm' ;
export const MD = 'md' ;
export const LG = 'lg' ;

/**
 * @typedef {'xs' | 'sm' | 'md' | 'lg'} BreadcrumbsSize
 */

export const sizes = [ XS , SM , MD , LG ] ;

const sizeMap =
{
    [ XS ] : 'text-xs' ,
    [ SM ] : 'text-sm' ,
    [ MD ] : 'text-base' ,
    [ LG ] : 'text-lg' ,
} ;

export const BREADCRUMBS = 'breadcrumbs' ;

/**
 * Generates a DaisyUI breadcrumbs container className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.maxWidth] - Max-width utility to enable scrolling (e.g. 'max-w-xs').
 * @param {BreadcrumbsSize} [props.size] - Text size.
 *
 * @returns {string} The breadcrumbs className expression.
 *
 * @example
 * ```js
 * getBreadcrumbsClasses() ;
 * // → 'breadcrumbs text-sm'
 *
 * getBreadcrumbsClasses({ size: 'lg' , maxWidth: 'max-w-xs' }) ;
 * // → 'breadcrumbs text-lg max-w-xs'
 * ```
 */
export const getBreadcrumbsClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    maxWidth ,
    size = SM ,
}
= {} ) => cn
(
    beforeClassName ,
    BREADCRUMBS ,
    {
        ...before ,

        ...!!sizeMap[size] && { [sizeMap[size]] : true } ,
        ...!!maxWidth      && { [maxWidth]      : true } ,

        ...after ,
    } ,
    className ,
) ;

export default getBreadcrumbsClasses ;
