/**
 * Splits an `accept` value into lower-cased tokens.
 *
 * @param {string|string[]} [accept]
 * @returns {string[]}
 */
export const acceptTokens = accept =>
    ( Array.isArray( accept ) ? accept : String( accept ?? '' ).split( ',' ) )
        .map( token => token.trim().toLowerCase() )
        .filter( Boolean ) ;

/**
 * Whether a file is one an `accept` list allows — the syntax of
 * `<input type="file" accept>` : MIME types (`application/pdf`), wildcards
 * (`image/*`) and extensions (`.docx`), separated by commas or given as an array.
 *
 * Nothing to accept accepts everything. A file whose type the system did not
 * give (`''`) only matches by its extension.
 *
 * While files are dragged over a page, the browser gives their types but not
 * their names : pass `{ type }` alone and an extension can neither accept nor
 * refuse it — `unknown` says what to answer then.
 *
 * @module helpers/files/matchAccept
 *
 * @param {{ name? : string , type? : string }} file
 * @param {string|string[]} [accept]
 * @param {Object} [options]
 * @param {boolean} [options.unknown=false] - The answer when only extensions could decide and the file has no name.
 * @returns {boolean}
 *
 * @example
 * ```js
 * matchAccept( { name : 'a.pdf' , type : 'application/pdf' } , 'image/*,.pdf' ) ; // true
 * matchAccept( { type : 'image/png' } , [ 'image/*' ] ) ;                          // true
 * ```
 */
const matchAccept = ( { name , type } = {} , accept , { unknown = false } = {} ) =>
{
    const tokens = acceptTokens( accept ) ;

    if ( tokens.length === 0 )
    {
        return true ;
    }

    const mime = String( type ?? '' ).toLowerCase() ;
    const file = String( name ?? '' ).toLowerCase() ;

    let undecided = false ;

    for ( const token of tokens )
    {
        if ( token.startsWith( '.' ) )
        {
            if ( !file )
            {
                undecided = true ;
            }
            else if ( file.endsWith( token ) )
            {
                return true ;
            }
        }
        else if ( token.endsWith( '/*' ) )
        {
            if ( mime.startsWith( token.slice( 0 , -1 ) ) )
            {
                return true ;
            }
        }
        else if ( mime === token )
        {
            return true ;
        }
    }

    return undecided ? unknown : false ;
} ;

export default matchAccept ;
