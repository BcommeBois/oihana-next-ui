/**
 * The pages a text names : `'1-3,5'`, `'2'`, `'4-'`, `'-2'`, as a print dialog
 * reads them — or a list of numbers given as it is.
 *
 * Pages are 1-based, held within `count`, kept in the order written, each
 * once. A page past the end is dropped, not an error ; a text with no page in
 * it is.
 *
 * @module helpers/pdf/edit/parsePageRange
 *
 * @param {string|number|number[]} pages - The text, a number, or numbers.
 * @param {number} count - How many pages the document has.
 *
 * @returns {number[]} The pages, 1-based.
 *
 * @throws {RangeError} When nothing names a page.
 *
 * @example
 * ```js
 * parsePageRange( '1-3,5' , 10 ) ; // → [ 1 , 2 , 3 , 5 ]
 * parsePageRange( '8-' , 10 ) ;    // → [ 8 , 9 , 10 ]
 * parsePageRange( [ 3 , 1 , 3 ] , 10 ) ; // → [ 3 , 1 ]
 * ```
 */
const parsePageRange = ( pages , count ) =>
{
    const total = Math.max( 0 , Math.floor( count ) ) ;
    const found = [] ;

    const keep = number =>
    {
        if ( Number.isInteger( number ) && number >= 1 && number <= total && !found.includes( number ) )
        {
            found.push( number ) ;
        }
    } ;

    if ( typeof pages === 'number' )
    {
        keep( pages ) ;
    }
    else if ( Array.isArray( pages ) )
    {
        pages.forEach( keep ) ;
    }
    else
    {
        const text = String( pages ?? '' ).trim() ;

        for ( const part of text.split( /[\s,;]+/ ).filter( Boolean ) )
        {
            const match = part.match( /^(\d*)\s*-\s*(\d*)$/ ) ;

            if ( match && ( match[ 1 ] || match[ 2 ] ) )
            {
                const from = match[ 1 ] ? Number( match[ 1 ] ) : 1 ;
                const to   = match[ 2 ] ? Number( match[ 2 ] ) : total ;

                for ( let page = from ; page <= Math.min( to , total ) ; page++ )
                {
                    keep( page ) ;
                }
            }
            else if ( /^\d+$/.test( part ) )
            {
                keep( Number( part ) ) ;
            }
        }
    }

    if ( found.length === 0 )
    {
        throw new RangeError( `No page in « ${ String( pages ) } » for a document of ${ total } page(s).` ) ;
    }

    return found ;
} ;

export default parsePageRange ;
