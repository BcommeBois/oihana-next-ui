/**
 * A sheet of labels, as a `@react-pdf/renderer` document : an A4 of
 * self-adhesive labels on the grid of a stationery reference, each with a
 * name, a code and its barcode — what a `print:` stylesheet used to
 * approximate, now a PDF the printer takes as it is.
 *
 * The grid is in millimetres, as the box of labels gives it : the page, the
 * label, the top and left margins, the gaps. Every label is placed
 * absolutely from them, so nothing drifts when a name is long. The default
 * is a common 2 × 7 sheet of 99.1 × 38.1 mm labels.
 *
 * @module demo/documents/pdf/LabelSheetDocument
 *
 * @param {Object} props
 * @param {string} [props.currency='EUR']
 * @param {Object} [props.grid] - `{ columns , rows , width , height , top , left , gapX , gapY }`, in millimetres.
 * @param {Array<{ name : string , price : number , sku : string }>} props.items - One per label, in reading order.
 * @param {string} [props.locale='fr-FR']
 * @param {string} [props.title] - The document's title.
 */

import { Document , Page , StyleSheet , Text , View } from '@react-pdf/renderer' ;

import PdfBarcode from '@/components/documents/pdf/PdfBarcode' ;

import formatNumber from '@/helpers/numbers/formatNumber' ;

import pageSize , { mm } from '@/helpers/pdf/units' ;

/** A 2 × 7 sheet of 99.1 × 38.1 mm labels on A4, the grid of a common stationery reference. */
export const DEFAULT_GRID = { columns : 2 , gapX : 2.5 , gapY : 0 , height : 38.1 , left : 4.65 , rows : 7 , top : 15.15 , width : 99.1 } ;

const styles = StyleSheet.create(
{
    label : { flexDirection : 'row' , fontFamily : 'Helvetica' , fontSize : 9 , gap : 6 , padding : mm( 3 ) , position : 'absolute' } ,
    text  : { flex : 1 , justifyContent : 'space-between' } ,
    name  : { fontFamily : 'Helvetica-Bold' , fontSize : 10 } ,
    sku   : { color : '#6b7280' , fontFamily : 'Courier' } ,
    price : { fontFamily : 'Helvetica-Bold' , fontSize : 12 , textAlign : 'right' } ,
} ) ;

const chunk = ( list , size ) => Array.from( { length : Math.ceil( list.length / size ) } , ( _ , index ) => list.slice( index * size , ( index + 1 ) * size ) ) ;

const LabelSheetDocument = ( { currency = 'EUR' , grid = DEFAULT_GRID , items = [] , locale = 'fr-FR' , title } ) =>
{
    const { columns , gapX , gapY , height , left , rows , top , width } = { ...DEFAULT_GRID , ...grid } ;

    const money = value => formatNumber( value , locale , { currency , style : 'currency' } ) ;

    return (
        <Document title={ title }>
            { chunk( items , columns * rows ).map( ( page , pageIndex ) => (
                <Page key={ pageIndex } size={ pageSize( 'A4' ) }>
                    { page.map( ( item , index ) =>
                    {
                        const column = index % columns ;
                        const row    = Math.floor( index / columns ) ;

                        return (
                            <View
                                key   = { index }
                                style = { [ styles.label , { height : mm( height ) , left : mm( left + column * ( width + gapX ) ) , top : mm( top + row * ( height + gapY ) ) , width : mm( width ) } ] }
                            >
                                <View style={ styles.text }>
                                    <Text style={ styles.name }>{ item.name }</Text>
                                    <PdfBarcode height={ 28 } value={ item.sku } verticalMargin={ 2 } width={ mm( 55 ) } />
                                </View>
                                <View style={ { justifyContent : 'space-between' } }>
                                    <Text style={ styles.sku }>{ item.sku }</Text>
                                    <Text style={ styles.price }>{ money( item.price ) }</Text>
                                </View>
                            </View>
                        ) ;
                    } ) }
                </Page>
            ) ) }
        </Document>
    ) ;
} ;

export default LabelSheetDocument ;
