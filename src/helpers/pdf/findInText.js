/**
 * Finding words in a text the way a reader types them : without caring for
 * case or accents, a partial word accepted — « fact » finds « Facture ».
 *
 * @module helpers/pdf/findInText
 */

/**
 * A text folded for comparison : lower case, accents stripped. Folding keeps
 * the length of the string, so an index in the folded text is an index in
 * the original — which is what a highlight needs.
 *
 * @param {string} text
 * @returns {string}
 */
export const foldText = text =>
    String( text ?? '' ).normalize( 'NFD' ).replace( /[̀-ͯ]/g , '' ).toLowerCase() ;

/**
 * Where a query occurs in a text : the start index of every occurrence, in
 * the original string. Overlapping occurrences are not counted twice — the
 * search resumes after each match. An empty query finds nothing.
 *
 * ⚠️ Folding a combined character (« é » written as « e » + an accent) drops
 * a code unit, so a text holding such characters is folded with its length
 * kept only where the accents are already composed — the common case for a
 * PDF's text content, which pdf.js hands over composed.
 *
 * @param {string} text - The text searched.
 * @param {string} query - What the reader typed.
 * @returns {number[]} The start of each occurrence.
 *
 * @example
 * ```js
 * findInText( 'Facture du 12 — facturée' , 'fact' ) ; // [ 0 , 16 ]
 * findInText( 'Élodie' , 'elo' ) ;                     // [ 0 ]
 * ```
 */
const findInText = ( text , query ) =>
{
    const needle = foldText( query ).trim() ;

    if ( !needle )
    {
        return [] ;
    }

    const haystack = foldText( text ) ;
    const found    = [] ;

    let index = haystack.indexOf( needle ) ;

    while ( index !== -1 )
    {
        found.push( index ) ;
        index = haystack.indexOf( needle , index + needle.length ) ;
    }

    return found ;
} ;

export default findInText ;
