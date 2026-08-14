/**
 * The significant part of a JSON-LD enumeration value.
 *
 * schema.org enumeration members travel as URIs — `https://schema.org/Tuesday`,
 * `http://purl.org/goodrelations/v1#EventCancelled` — and the only part that
 * carries meaning is the last one. The two vocabularies disagree on the
 * separator, and plain text is a third accepted spelling, so all three are
 * reduced here rather than in each reader.
 *
 * @module helpers/schedule/fragmentOf
 */

/**
 * @param {*} value - A URI, a bare member name, or anything else.
 * @returns {string|null} The fragment, or `null` when the value is not a string.
 *
 * @example
 * fragmentOf( 'http://purl.org/goodrelations/v1#Tuesday' ) // → 'Tuesday'
 * fragmentOf( 'https://schema.org/EventCancelled' )        // → 'EventCancelled'
 * fragmentOf( 'Tuesday' )                                  // → 'Tuesday'
 */
export const fragmentOf = ( value ) =>
{
    if ( typeof value !== 'string' )
    {
        return null ;
    }

    const trimmed = value.trim() ;

    if ( trimmed === '' )
    {
        return null ;
    }

    return trimmed.split( '#' ).pop().split( '/' ).pop() ;
} ;

export default fragmentOf ;
