/**
 * The font the human-readable text of a barcode is drawn in.
 *
 * Monospace, so every digit takes the same width and sits square under its
 * bars. Shared by the component and both exports.
 *
 * @type {string}
 */
export const BARCODE_FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace" ;

/**
 * Turns the rectangles of a laid-out barcode into the `d` attribute of one path.
 *
 * Shared by the component and the SVG export, so what is shown and what is
 * exported are drawn by the same code.
 *
 * @module helpers/barcodes/symbolToPath
 *
 * @param {Array<{x:number,y:number,width:number,height:number}>} rects - The rectangles, in modules.
 * @returns {string} The path data.
 *
 * @example
 * ```js
 * symbolToPath( [ { x : 10 , y : 2 , width : 2 , height : 40 } ] ) ;
 * // → 'M10 2h2v40h-2z'
 * ```
 */
const symbolToPath = rects =>
    ( rects ?? [] ).map( ( { height , width , x , y } ) => `M${ x } ${ y }h${ width }v${ height }h-${ width }z` ).join( ' ' ) ;

export default symbolToPath ;
