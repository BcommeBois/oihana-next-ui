/**
 * Grid class names generator for Tailwind CSS.
 *
 * @module themes/layout/getGridClassNames
 */

import cn from '@/themes/helpers/cn' ;

import applyIfDefined from '@/helpers/applyIfDefined' ;

import getGridAutoCols from './gridAutoCols' ;
import getGridAutoRows from './gridAutoRows' ;
import getGridCols     from './gridCols' ;
import getGridFlow     from './gridFlow' ;
import getGridRows     from './gridRows' ;

import getLayoutClassNames from './getLayoutClassNames' ;

/**
 * @typedef {import('./getLayoutClassNames').LayoutClassNamesProps & {
 *   autoCols?: import('./gridAutoCols').GridAutoColsValue,
 *   autoRows?: import('./gridAutoRows').GridAutoRowsValue,
 *   cols?: import('./gridCols').GridColsValue,
 *   flow?: import('./gridFlow').GridFlowValue,
 *   rows?: import('./gridRows').GridRowsValue,
 * }} GridClassNamesProps
 */

/**
 * Generates grid container class names.
 *
 * Extends {@link getLayoutClassNames} with grid-specific properties.
 *
 * @param {GridClassNamesProps} [props]
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/grid-template-columns
 * @see https://tailwindcss.com/docs/grid-template-rows
 * @see https://tailwindcss.com/docs/grid-auto-flow
 * @see https://tailwindcss.com/docs/grid-auto-columns
 * @see https://tailwindcss.com/docs/grid-auto-rows
 *
 * @example
 * ```js
 * getGridClassNames( { cols: 3 , gap: 4 } ) ;
 * // → 'grid grid-cols-3 gap-4'
 *
 * getGridClassNames( { cols: { xs: 1 , md: 2 , lg: 4 } , gapX: 4 , gapY: 2 } ) ;
 * // → 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2'
 *
 * getGridClassNames( { cols: 12 , rows: 6 , flow: 'dense' , autoCols: 'fr' } ) ;
 * // → 'grid grid-cols-12 grid-rows-6 grid-flow-dense auto-cols-fr'
 * ```
 */
export const getGridClassNames =
({
    autoCols ,
    autoRows ,
    cols ,
    flow ,
    rows ,

    ...layoutProps
}
= {} ) => cn
(
    'grid' ,
    {
        ...applyIfDefined( getGridCols     , cols     ) ,
        ...applyIfDefined( getGridRows     , rows     ) ,
        ...applyIfDefined( getGridFlow     , flow     ) ,
        ...applyIfDefined( getGridAutoCols , autoCols ) ,
        ...applyIfDefined( getGridAutoRows , autoRows ) ,
    } ,
    getLayoutClassNames( layoutProps ) ,
) ;

export default getGridClassNames ;