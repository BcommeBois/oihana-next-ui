/**
 * A code read, added to the list of what was scanned : a new line at the
 * top, or one more on the line that already has it.
 *
 * Pure : the list given is not touched, a new one comes back with what
 * happened — `added`, `counted` when a known code's count grew, `refused`
 * when `max` lines are already there. The lines are
 * `{ code , count , at , reading }`, newest first.
 *
 * @module helpers/scan/addScan
 *
 * @typedef {Object} ScanLine
 * @property {string} code
 * @property {number} count
 * @property {number} at - When it was last scanned, milliseconds since the epoch.
 * @property {*} [reading] - What the scanner said, kept as it came.
 *
 * @param {ScanLine[]} list
 * @param {string} code
 * @param {Object} [options]
 * @param {boolean} [options.allowDuplicates=false] - A known code makes a new line rather than a count.
 * @param {number} [options.at=Date.now()]
 * @param {number} [options.max=Infinity] - Lines the list may hold.
 * @param {*} [options.reading]
 *
 * @returns {{ list : ScanLine[] , status : 'added'|'counted'|'refused' , line : ?ScanLine }}
 */
const addScan = ( list , code , { allowDuplicates = false , at = Date.now() , max = Infinity , reading } = {} ) =>
{
    const value = String( code ?? '' ).trim() ;
    const lines = Array.isArray( list ) ? list : [] ;

    if ( !value )
    {
        return { line : null , list : lines , status : 'refused' } ;
    }

    if ( !allowDuplicates )
    {
        const index = lines.findIndex( line => line.code === value ) ;

        if ( index !== -1 )
        {
            const line = { ...lines[ index ] , at , count : lines[ index ].count + 1 , reading : reading ?? lines[ index ].reading } ;
            return { line , list : [ line , ...lines.slice( 0 , index ) , ...lines.slice( index + 1 ) ] , status : 'counted' } ;
        }
    }

    if ( lines.length >= max )
    {
        return { line : null , list : lines , status : 'refused' } ;
    }

    const line = { at , code : value , count : 1 , reading } ;

    return { line , list : [ line , ...lines ] , status : 'added' } ;
} ;

/**
 * One less on a line ; the line goes when it reaches zero.
 *
 * @param {ScanLine[]} list
 * @param {string} code
 * @returns {ScanLine[]}
 */
export const decrementScan = ( list , code ) =>
    ( list ?? [] ).flatMap( line => ( line.code !== code ? [ line ] : line.count > 1 ? [ { ...line , count : line.count - 1 } ] : [] ) ) ;

/**
 * A line removed, whatever its count.
 *
 * @param {ScanLine[]} list
 * @param {string} code
 * @returns {ScanLine[]}
 */
export const removeScan = ( list , code ) => ( list ?? [] ).filter( line => line.code !== code ) ;

export default addScan ;
