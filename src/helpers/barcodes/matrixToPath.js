/**
 * Turns a module grid into the `d` attribute of a single SVG path.
 *
 * Coordinates are in modules, one unit per module, so the path scales through
 * the SVG `viewBox` and never needs to be rebuilt for another size. Neighbouring
 * dark modules of a row are merged into one rectangle, which keeps the path
 * short.
 *
 * Shared by the component and the SVG export, so what is shown and what is
 * exported are drawn by the same code.
 *
 * @module helpers/barcodes/matrixToPath
 *
 * @param {boolean[][]} matrix - The module grid, rows first, `true` for a dark module.
 * @param {Object} [options]
 * @param {number} [options.moduleHeight=1] - The height of a row, in modules : a linear barcode is one row drawn tall.
 *
 * @returns {string} The path data, empty when nothing is dark.
 *
 * @example
 * ```js
 * matrixToPath( [ [ true , true , false , true ] ] ) ;
 * // → 'M0 0h2v1h-2z M3 0h1v1h-1z'
 * ```
 */
const matrixToPath = ( matrix , { moduleHeight = 1 } = {} ) =>
{
    const runs = [] ;

    if ( !Array.isArray( matrix ) )
    {
        return '' ;
    }

    matrix.forEach( ( row , y ) =>
    {
        let x = 0 ;

        while ( x < row.length )
        {
            if ( !row[ x ] )
            {
                x++ ;
                continue ;
            }

            const start = x ;

            while ( x < row.length && row[ x ] )
            {
                x++ ;
            }

            const width = x - start ;

            runs.push( `M${ start } ${ y * moduleHeight }h${ width }v${ moduleHeight }h-${ width }z` ) ;
        }
    } ) ;

    return runs.join( ' ' ) ;
} ;

export default matrixToPath ;
