/**
 * PdfBarcode — a linear barcode inside a generated PDF : Code 128, GS1-128,
 * EAN-13, EAN-8, UPC-A, ITF-14.
 *
 * A primitive of `@react-pdf/renderer`, not of the DOM : it lives in a
 * `<Document>` and nowhere else. The symbol is laid out by `layoutBarcode`
 * and drawn by `symbolToPath`, as the `Barcode` component and the SVG export
 * are — one encoder, one drawing, whatever the output. The human-readable
 * text is set in Courier, a face every PDF reader has.
 *
 * ⚠️ This file imports `@react-pdf/renderer` at its top : import it from a
 * document template only, which already does, never from a page.
 *
 * The size is the module : `moduleWidth` in points, 0.33 mm by default — the
 * narrowest a laser printer draws cleanly and a scanner reads. `width`
 * sets it from the room the code has instead. The height follows the
 * layout.
 *
 * @module components/documents/pdf/PdfBarcode
 *
 * @param {Object} props
 * @param {?string} [props.background='#ffffff'] - The light colour ; `null` leaves it transparent.
 * @param {'frame'|'bars'|'none'} [props.bearer='frame'] - ITF-14 only : the bearer bars.
 * @param {string} [props.foreground='#000000'] - The colour of the bars and the text.
 * @param {'code_128'|'gs1_128'|'ean_13'|'ean_8'|'upc_a'|'itf_14'} [props.format='code_128']
 * @param {'spaced'|'compact'} [props.gs1Text='spaced'] - GS1-128 only : how the text shows the elements.
 * @param {number} [props.height] - The height of the bars, in modules. Defaults to the layout's.
 * @param {number} [props.moduleWidth] - The width of one module, in points. Defaults to 0.33 mm.
 * @param {number|{left:number,right:number}} [props.quietZone] - The side margins, in modules.
 * @param {boolean} [props.showText=true] - Draw the human-readable text.
 * @param {Object} [props.style] - Style of the `<Svg>`, for its place in the layout.
 * @param {'retail'|'simple'} [props.textLayout]
 * @param {number} [props.textScale=1]
 * @param {string} props.value - The content.
 * @param {number|{top:number,bottom:number}} [props.verticalMargin]
 * @param {number} [props.width] - The width of the whole symbol, in points ; sets the module from it.
 *
 * @example
 * ```jsx
 * <PdfBarcode value={ order.number } width={ mm( 50 ) } />
 * <PdfBarcode format="ean_13" value="9501101530003" />
 * ```
 */

import { Path , Rect , Svg , Text } from '@react-pdf/renderer' ;

import encodeBarcode from '../../../helpers/barcodes/encodeBarcode' ;
import layoutBarcode from '../../../helpers/barcodes/layoutBarcode' ;
import symbolToPath  from '../../../helpers/barcodes/symbolToPath' ;

import { mm } from '../../../helpers/pdf/units' ;

const DEFAULT_MODULE = mm( 0.33 ) ;

const PdfBarcode =
({
    background = '#ffffff' ,
    bearer ,
    foreground = '#000000' ,
    format = 'code_128' ,
    gs1Text ,
    height ,
    moduleWidth ,
    quietZone ,
    showText = true ,
    style ,
    textLayout ,
    textScale ,
    value ,
    verticalMargin ,
    width ,
}) =>
{
    const symbol = layoutBarcode( encodeBarcode( value , { format , gs1Text } ) , { barHeight : height , bearer , quietZone , showText , textLayout , textScale , verticalMargin } ) ;

    const module = width ? width / symbol.width : ( moduleWidth ?? DEFAULT_MODULE ) ;

    return (
        <Svg height={ symbol.height * module } style={ style } viewBox={ `0 0 ${ symbol.width } ${ symbol.height }` } width={ symbol.width * module }>
            { background && <Rect fill={ background } height={ symbol.height } width={ symbol.width } x={ 0 } y={ 0 } /> }
            <Path d={ symbolToPath( symbol.rects ) } fill={ foreground } />
            { symbol.texts.map( ( { size , value : text , x , y } ) => (
                <Text fill={ foreground } key={ `${ x }-${ y }` } style={ { fontFamily : 'Courier' , fontSize : size } } textAnchor="middle" x={ x } y={ y }>{ text }</Text>
            ) ) }
        </Svg>
    ) ;
} ;

PdfBarcode.displayName = 'PdfBarcode' ;

export default PdfBarcode ;
