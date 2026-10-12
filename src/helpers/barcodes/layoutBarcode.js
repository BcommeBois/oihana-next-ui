/**
 * The default margin above and below the code, in modules : enough for the
 * light plate to read as a frame when the code sits on a dark surface. The
 * standard asks for no vertical quiet zone — this one is for the eye, and
 * `verticalMargin` changes it.
 *
 * @type {number}
 */
export const VERTICAL_MARGIN = 6 ;

/**
 * How much longer the guards run than the other bars, in the retail layout.
 *
 * @type {number}
 */
export const GUARD_EXTENSION = 5 ;

/**
 * The text sizes, in modules : the retail digits, their small outer siblings
 * of a UPC-A, and the single centred line.
 *
 * @type {{ retail : number , small : number , simple : number }}
 */
export const TEXT_SIZES = { retail : 9 , small : 6.5 , simple : 10 } ;

/**
 * The range `textScale` is held in, by layout. A retail digit has seven
 * modules to itself and the first digit of an EAN-13 lives in the margin :
 * past 1.2 they run into each other. A single centred line has more room.
 *
 * @type {{ retail : [number,number] , simple : [number,number] }}
 */
export const TEXT_SCALE_RANGE = { retail : [ 0.5 , 1.2 ] , simple : [ 0.5 , 2 ] } ;

// The share of the font size a digit stands above its baseline.
const ASCENT = 0.72 ;

const clamp = ( value , [ min , max ] ) => Math.min( max , Math.max( min , Number.isFinite( value ) ? value : 1 ) ) ;

/**
 * Lays an encoded linear barcode out as shapes : rectangles and texts, in modules.
 *
 * The symbol it returns is what every renderer draws — the component, the SVG
 * export and the PNG export — so they cannot disagree.
 *
 * Two text layouts :
 *
 * - `retail` (EAN and UPC) : the guards run longer than the bars, and every
 *   digit sits under its own seven modules, the first one of an EAN-13 outside
 *   on the left, the outer two of a UPC-A small on both sides ;
 * - `simple` : the bars all at one height, the text on one centred line.
 *
 * @module helpers/barcodes/layoutBarcode
 *
 * @param {Object} encoded - What {@link module:helpers/barcodes/encodeBarcode} returns.
 * @param {Object} [options]
 * @param {number} [options.barHeight=40] - The height of the bars, in modules.
 * @param {'frame'|'bars'|'none'} [options.bearer] - The bearer bars of an ITF-14 : a frame around the code and its quiet zone
 *        (the default, as GS1 recommends), the top and bottom bars alone, or none. Ignored by the other formats. The quiet
 *        zone lives inside the bearers, so the plate gets a margin outside them on the left and right, as wide as the top one.
 * @param {number|{left:number,right:number}} [options.quietZone] - The side margins, in modules. Defaults to the format's own.
 * @param {boolean} [options.showText=true] - Draw the human-readable text.
 * @param {'retail'|'simple'} [options.textLayout] - Defaults to `retail` when the format has one, `simple` otherwise.
 * @param {number|{top:number,bottom:number}} [options.verticalMargin=6] - The margin above and below, in modules : one number for both, or each.
 * @param {number} [options.textScale=1] - A multiplier of the text size, held in {@link TEXT_SCALE_RANGE}. The height of the
 *        symbol follows it. The face, weight and colour of the text are the renderers' options, not the layout's.
 *
 * @returns {{ height : number , rects : Array<{x:number,y:number,width:number,height:number}> , texts : Array<{x:number,y:number,value:string,size:number}> , width : number }}
 *
 * @example
 * ```js
 * const symbol = layoutBarcode( encodeBarcode( '96385074' , { format : 'ean_8' } ) , { barHeight : 50 } ) ;
 * symbol.width ; // → 81 : 7 + 67 + 7
 * ```
 */
const layoutBarcode = ( encoded , { barHeight = 40 , bearer = 'frame' , quietZone , showText = true , textLayout , textScale = 1 , verticalMargin = VERTICAL_MARGIN } = {} ) =>
{
    const { modules , retail , text } = encoded ;

    const margins = typeof quietZone === 'number'
        ? { left : quietZone , right : quietZone }
        : { ...encoded.quietZone , ...quietZone } ;

    const layout   = textLayout ?? ( retail ? 'retail' : 'simple' ) ;
    const isRetail = showText && layout === 'retail' && Boolean( retail ) ;

    const vertical = typeof verticalMargin === 'number'
        ? { bottom : verticalMargin , top : verticalMargin }
        : { bottom : VERTICAL_MARGIN , top : VERTICAL_MARGIN , ...verticalMargin } ;

    // The bearer bars touch the top and the bottom of the bars ; a frame also closes the sides, outside the quiet zone.
    const thickness = encoded.bearer && bearer !== 'none' ? encoded.bearer.thickness : 0 ;
    const side      = bearer === 'frame' ? thickness : 0 ;

    const top = Math.max( 0 , vertical.top ) ;

    // The quiet zone lives inside the bearers : the plate needs room of its own outside them, as much as above.
    const outer = thickness > 0 ? top : 0 ;

    const left  = outer + side + margins.left ;
    const width = outer + side + margins.left + modules.length + margins.right + side + outer ;

    const barsTop = top + thickness ;

    const isExtended = index => isRetail && retail.extended.some( ( [ from , to ] ) => index >= from && index < to ) ;

    const rects = [] ;

    let index = 0 ;

    while ( index < modules.length )
    {
        if ( !modules[ index ] )
        {
            index++ ;
            continue ;
        }

        const start = index ;

        while ( index < modules.length && modules[ index ] )
        {
            index++ ;
        }

        rects.push(
        {
            height : barHeight + ( isExtended( start ) ? GUARD_EXTENSION : 0 ) ,
            width  : index - start ,
            x      : left + start ,
            y      : barsTop ,
        } ) ;
    }

    if ( thickness > 0 )
    {
        const frameHeight = barHeight + 2 * thickness ;

        const span = width - 2 * outer ;

        rects.push( { height : thickness , width : span , x : outer , y : top } ) ;
        rects.push( { height : thickness , width : span , x : outer , y : barsTop + barHeight } ) ;

        if ( side > 0 )
        {
            rects.push( { height : frameHeight , width : side , x : outer , y : top } ) ;
            rects.push( { height : frameHeight , width : side , x : width - outer - side , y : top } ) ;
        }
    }

    const texts = [] ;

    let bottom = barsTop + barHeight + thickness ;

    if ( isRetail )
    {
        const scale    = clamp( textScale , TEXT_SCALE_RANGE.retail ) ;
        const size     = TEXT_SIZES.retail * scale ;
        const baseline = top + barHeight + 1 + ASCENT * size ;

        for ( const digit of retail.digits )
        {
            texts.push( { size : digit.small ? TEXT_SIZES.small * scale : size , value : digit.value , x : left + digit.x , y : baseline } ) ;
        }

        bottom = Math.max( top + barHeight + GUARD_EXTENSION , baseline + ( 1 - ASCENT ) * size ) ;
    }
    else if ( showText && text )
    {
        const size     = TEXT_SIZES.simple * clamp( textScale , TEXT_SCALE_RANGE.simple ) ;
        const baseline = bottom + 2 + ASCENT * size ;

        texts.push( { size , value : text , x : left + modules.length / 2 , y : baseline } ) ;

        bottom = baseline + ( 1 - ASCENT ) * size ;
    }

    return {
        height : bottom + Math.max( 0 , vertical.bottom ) ,
        rects ,
        texts ,
        width ,
    } ;
} ;

export default layoutBarcode ;
