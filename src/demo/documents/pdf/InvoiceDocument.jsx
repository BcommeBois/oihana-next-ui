/**
 * The invoice of an order, as a `@react-pdf/renderer` document : the recipe
 * of a business document, rendered in the browser for the preview and on the
 * server by a route handler — the same file.
 *
 * Pure : the words come in `labels`, the amounts and dates are formatted
 * here with `Intl`, from `locale`, so a server with no React context renders
 * it as the page does. Flexbox, no table : the engine has no `<table>`, and
 * a row of `View`s is what every invoice is made of. The footer is `fixed`,
 * so every page carries the codes and its number.
 *
 * @module demo/documents/pdf/InvoiceDocument
 *
 * @param {Object} props
 * @param {Object} props.invoice - `{ number , date , due , currency , vatRate , seller , buyer , items , note , paymentUrl }` ;
 *        `seller` and `buyer` are `{ name , lines : string[] }`, `items` are `{ label , quantity , price }`.
 * @param {Object} props.labels - The words of the document.
 * @param {string} [props.locale='fr-FR'] - The locale amounts and dates are written in.
 */

import { Document , Page , StyleSheet , Text , View } from '@react-pdf/renderer' ;

import PdfBarcode from '@/components/documents/pdf/PdfBarcode' ;
import PdfQRCode  from '@/components/documents/pdf/PdfQRCode' ;

import formatNumber from '@/helpers/numbers/formatNumber' ;

import { mm } from '@/helpers/pdf/units' ;

const GREY  = '#f3f4f6' ;
const LINE  = '#d1d5db' ;
const MUTED = '#6b7280' ;

const styles = StyleSheet.create(
{
    page     : { fontFamily : 'Helvetica' , fontSize : 10 , paddingBottom : mm( 38 ) , paddingHorizontal : mm( 18 ) , paddingTop : mm( 18 ) } ,
    header   : { flexDirection : 'row' , justifyContent : 'space-between' , marginBottom : mm( 10 ) } ,
    brand    : { fontFamily : 'Helvetica-Bold' , fontSize : 16 , marginBottom : 4 } ,
    title    : { fontFamily : 'Helvetica-Bold' , fontSize : 22 , textAlign : 'right' } ,
    meta     : { color : MUTED , textAlign : 'right' } ,
    bold     : { fontFamily : 'Helvetica-Bold' } ,
    muted    : { color : MUTED } ,
    parties  : { flexDirection : 'row' , gap : mm( 10 ) , marginBottom : mm( 8 ) } ,
    party    : { backgroundColor : GREY , borderRadius : 4 , flex : 1 , padding : 8 } ,
    label    : { color : MUTED , fontSize : 8 , marginBottom : 3 , textTransform : 'uppercase' } ,
    row      : { borderBottomColor : LINE , borderBottomWidth : 0.5 , flexDirection : 'row' , paddingVertical : 5 } ,
    head     : { backgroundColor : GREY , borderBottomWidth : 0 , fontFamily : 'Helvetica-Bold' } ,
    cellWide : { flex : 1 } ,
    cell     : { textAlign : 'right' , width : mm( 26 ) } ,
    totals   : { alignSelf : 'flex-end' , marginTop : mm( 6 ) , width : mm( 70 ) } ,
    total    : { flexDirection : 'row' , justifyContent : 'space-between' , paddingVertical : 3 } ,
    grand    : { borderTopColor : LINE , borderTopWidth : 1 , fontFamily : 'Helvetica-Bold' , fontSize : 12 , marginTop : 3 , paddingTop : 5 } ,
    note     : { color : MUTED , fontSize : 9 , marginTop : mm( 8 ) } ,
    footer   : { alignItems : 'flex-end' , borderTopColor : LINE , borderTopWidth : 0.5 , bottom : mm( 12 ) , flexDirection : 'row' , justifyContent : 'space-between' , left : mm( 18 ) , paddingTop : 6 , position : 'absolute' , right : mm( 18 ) } ,
    pager    : { color : MUTED , fontSize : 8 } ,
} ) ;

const InvoiceDocument = ( { invoice , labels , locale = 'fr-FR' } ) =>
{
    const { buyer , currency = 'EUR' , date , due , items = [] , note , number , paymentUrl , seller , vatRate = 0.2 } = invoice ;

    const money = value => formatNumber( value , locale , { currency , style : 'currency' } ) ;
    const day   = value => value ? new Intl.DateTimeFormat( locale , { dateStyle : 'long' } ).format( new Date( value ) ) : '' ;

    const subtotal = items.reduce( ( sum , item ) => sum + item.quantity * item.price , 0 ) ;
    const vat      = subtotal * vatRate ;

    return (
        <Document author={ seller?.name } subject={ `${ labels.title } ${ number }` } title={ `${ labels.title } ${ number }` }>
            <Page size="A4" style={ styles.page }>

                <View style={ styles.header }>
                    <View>
                        <Text style={ styles.brand }>{ seller?.name }</Text>
                        { seller?.lines?.map( ( line , index ) => <Text key={ index } style={ styles.muted }>{ line }</Text> ) }
                    </View>
                    <View>
                        <Text style={ styles.title }>{ labels.title }</Text>
                        <Text style={ styles.meta }>{ labels.number } { number }</Text>
                        <Text style={ styles.meta }>{ labels.date } { day( date ) }</Text>
                        <Text style={ styles.meta }>{ labels.due } { day( due ) }</Text>
                    </View>
                </View>

                <View style={ styles.parties }>
                    <View style={ styles.party }>
                        <Text style={ styles.label }>{ labels.seller }</Text>
                        <Text style={ styles.bold }>{ seller?.name }</Text>
                        { seller?.lines?.map( ( line , index ) => <Text key={ index }>{ line }</Text> ) }
                    </View>
                    <View style={ styles.party }>
                        <Text style={ styles.label }>{ labels.buyer }</Text>
                        <Text style={ styles.bold }>{ buyer?.name }</Text>
                        { buyer?.lines?.map( ( line , index ) => <Text key={ index }>{ line }</Text> ) }
                    </View>
                </View>

                <View style={ [ styles.row , styles.head ] }>
                    <Text style={ styles.cellWide }>{ labels.description }</Text>
                    <Text style={ styles.cell }>{ labels.quantity }</Text>
                    <Text style={ styles.cell }>{ labels.unit }</Text>
                    <Text style={ styles.cell }>{ labels.amount }</Text>
                </View>

                { items.map( ( item , index ) => (
                    <View key={ index } style={ styles.row } wrap={ false }>
                        <Text style={ styles.cellWide }>{ item.label }</Text>
                        <Text style={ styles.cell }>{ formatNumber( item.quantity , locale ) }</Text>
                        <Text style={ styles.cell }>{ money( item.price ) }</Text>
                        <Text style={ styles.cell }>{ money( item.quantity * item.price ) }</Text>
                    </View>
                ) ) }

                <View style={ styles.totals } wrap={ false }>
                    <View style={ styles.total }>
                        <Text>{ labels.subtotal }</Text>
                        <Text>{ money( subtotal ) }</Text>
                    </View>
                    <View style={ styles.total }>
                        <Text>{ ( labels.vat ?? 'VAT {0} %' ).replace( '{0}' , formatNumber( vatRate * 100 , locale ) ) }</Text>
                        <Text>{ money( vat ) }</Text>
                    </View>
                    <View style={ [ styles.total , styles.grand ] }>
                        <Text>{ labels.total }</Text>
                        <Text>{ money( subtotal + vat ) }</Text>
                    </View>
                </View>

                { note && <Text style={ styles.note }>{ note }</Text> }

                <View fixed style={ styles.footer }>
                    { paymentUrl
                        ? (
                            <View style={ { alignItems : 'center' , gap : 2 } }>
                                <PdfQRCode size={ mm( 18 ) } value={ paymentUrl } />
                                <Text style={ styles.pager }>{ labels.payment }</Text>
                            </View>
                        )
                        : <View /> }
                    <PdfBarcode value={ String( number ) } width={ mm( 50 ) } />
                    <Text
                        render = { ( { pageNumber , totalPages } ) => ( labels.page ?? 'Page {0} / {1}' ).replace( '{0}' , pageNumber ).replace( '{1}' , totalPages ) }
                        style  = { styles.pager }
                    />
                </View>

            </Page>
        </Document>
    ) ;
} ;

export default InvoiceDocument ;
