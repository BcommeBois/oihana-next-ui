/**
 * Grid item class names generator for Tailwind CSS.
 *
 * @module themes/layout/getGridItemClassNames
 */

import cn from '../helpers/cn' ;

import applyIfDefined from '../../helpers/applyIfDefined' ;

import getColSpan  from './colSpan' ;
import getColStart from './colStart' ;
import getRowSpan  from './rowSpan' ;
import getRowStart from './rowStart' ;

import getLayoutClassNames from './getLayoutClassNames' ;

/**
 * @typedef {import('./getLayoutClassNames').LayoutClassNamesProps & {
 *   colSpan?: import('./colSpan').ColSpanValue,
 *   colStart?: import('./colStart').ColStartValue,
 *   container?: boolean,
 *   rowSpan?: import('./rowSpan').RowSpanValue,
 *   rowStart?: import('./rowStart').RowStartValue,
 * }} GridItemClassNamesProps
 */

/**
 * Generates grid item class names.
 *
 * Extends {@link getLayoutClassNames} with the four properties a cell owns rather than
 * its container — where it starts, and how far it reaches.
 *
 * Unlike {@link module:themes/layout/getGridClassNames}, **no base class is prepended** :
 * a container is a grid by definition, a cell is whatever display it is given.
 *
 * @param {GridItemClassNamesProps} [props]
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/grid-column
 * @see https://tailwindcss.com/docs/grid-row
 *
 * @example
 * ```js
 * getGridItemClassNames( { colSpan: 2 , rowSpan: 2 , padding: 4 } ) ;
 * // → 'col-span-2 row-span-2 p-4'
 *
 * getGridItemClassNames( { colSpan: { xs: 1 , md: 2 } , alignSelf: 'center' } ) ;
 * // → 'col-span-1 md:col-span-2 self-center'
 *
 * getGridItemClassNames( { colStart: 2 , rowStart: 1 , container: true } ) ;
 * // → 'col-start-2 row-start-1 @container'
 * ```
 */
export const getGridItemClassNames =
({
    colSpan ,
    colStart ,
    container ,
    rowSpan ,
    rowStart ,

    ...layoutProps
}
= {} ) => cn
(
    {
        ...applyIfDefined( getColSpan  , colSpan  ) ,
        ...applyIfDefined( getColStart , colStart ) ,
        ...applyIfDefined( getRowSpan  , rowSpan  ) ,
        ...applyIfDefined( getRowStart , rowStart ) ,

        '@container' : !!container ,
    } ,
    getLayoutClassNames( layoutProps ) ,
) ;

export default getGridItemClassNames ;
