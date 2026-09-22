/**
 * Folds a string for comparison : accents and letter variants flattened to
 * basic Latin, lower-cased.
 *
 * What an in-memory filter needs to be usable on accented data — someone
 * looking for « Zürich » types `zurich`, and someone looking for « Łódź »
 * types `lodz`. Two passes, because neither covers the whole range alone :
 *
 *  - `deburr` (vegas-js-core) maps the letters that have NO decomposition to
 *    their basic Latin form : `Ł` → `L`, `Ø` → `O`, `Đ` → `D`, `ß` → `ss`,
 *    `Œ` → `Oe` ; it only knows Latin-1 and Latin Extended-A ;
 *  - NFD then drops every remaining combining mark, whatever the block :
 *    `ș` (Chișinău), `ộ` (Hà Nội).
 *
 * The query and the text must go through the same function : `straße` and
 * `strasse` then meet.
 *
 * @module helpers/strings/foldText
 *
 * @param {*} [value] - Anything ; non-strings are coerced, nullish yields `''`.
 * @returns {string}
 *
 * @example
 * ```js
 * foldText( 'São Paulo, Brésil' ) ; // 'sao paulo, bresil'
 * foldText( 'Łódź' )              ; // 'lodz'
 * foldText( 'Hà Nội' )            ; // 'ha noi'
 * foldText( undefined )           ; // ''
 * ```
 */

import deburr from 'vegas-js-core/src/strings/deburr' ;

const foldText = ( value ) => deburr( String( value ?? '' ) )
    .normalize( 'NFD' )
    .replace( /\p{Diacritic}/gu , '' )
    .toLowerCase() ;

export default foldText ;
