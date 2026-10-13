/**
 * The receipt of a delivery, as a `@react-pdf/renderer` document : what was
 * expected, what came, the gaps and their reasons, and the signature of the
 * person who received it — as vectors —, the date, and the digest the
 * signature is bound to.
 *
 * A recipe to copy, like the invoice : pure, the words in `labels`, the
 * dates formatted with `Intl` from `locale`.
 *
 * @module demo/documents/pdf/ReceiptDocument
 *
 * @param {Object} props
 * @param {Object} props.labels - The words of the document.
 * @param {string} [props.locale='fr-FR']
 * @param {Object} props.receipt - `{ order , pallet , supplier , at , digest , signature , lines : [ { name , expected , received , reason } ] }`.
 */

import { Document , Page , StyleSheet , Text , View } from '@react-pdf/renderer' ;

import PdfBarcode   from '@/components/documents/pdf/PdfBarcode' ;
import PdfSignature from '@/components/documents/pdf/PdfSignature' ;

import { mm } from '@/helpers/pdf/units' ;

const GREY  = '#f3f4f6' ;
const LINE  = '#d1d5db' ;
const MUTED = '#6b7280' ;

const styles = StyleSheet.create(
{
    page    : { fontFamily : 'Helvetica' , fontSize : 10 , padding : mm( 18 ) } ,
    title   : { fontFamily : 'Helvetica-Bold' , fontSize : 20 , marginBottom : 4 } ,
    muted   : { color : MUTED } ,
    meta    : { flexDirection : 'row' , gap : mm( 10 ) , marginBottom : mm( 8 ) , marginTop : mm( 6 ) } ,
    block   : { backgroundColor : GREY , borderRadius : 4 , flex : 1 , padding : 8 } ,
    label   : { color : MUTED , fontSize : 8 , marginBottom : 3 , textTransform : 'uppercase' } ,
    row     : { borderBottomColor : LINE , borderBottomWidth : 0.5 , flexDirection : 'row' , paddingVertical : 5 } ,
    head    : { backgroundColor : GREY , borderBottomWidth : 0 , fontFamily : 'Helvetica-Bold' } ,
    wide    : { flex : 1 } ,
    cell    : { textAlign : 'right' , width : mm( 22 ) } ,
    reason  : { width : mm( 30 ) } ,
    signed  : { borderTopColor : LINE , borderTopWidth : 0.5 , flexDirection : 'row' , gap : mm( 10 ) , marginTop : mm( 12 ) , paddingTop : mm( 6 ) } ,
    digest  : { color : MUTED , fontFamily : 'Courier' , fontSize : 7 , marginTop : 4 } ,
} ) ;

const ReceiptDocument = ( { labels , locale = 'fr-FR' , receipt } ) =>
{
    const { at , digest , lines = [] , order , pallet , signature , supplier } = receipt ;

    const when = at ? new Intl.DateTimeFormat( locale , { dateStyle : 'long' , timeStyle : 'short' } ).format( new Date( at ) ) : '' ;

    return (
        <Document title={ `${ labels.title } ${ order }` }>
            <Page size="A4" style={ styles.page }>

                <Text style={ styles.title }>{ labels.title }</Text>
                <Text style={ styles.muted }>{ labels.order } { order } — { supplier }</Text>

                <View style={ styles.meta }>
                    <View style={ styles.block }>
                        <Text style={ styles.label }>{ labels.pallet }</Text>
                        <PdfBarcode format="gs1_128" value={ `(00)${ pallet }` } width={ mm( 70 ) } />
                    </View>
                    <View style={ styles.block }>
                        <Text style={ styles.label }>{ labels.date }</Text>
                        <Text>{ when }</Text>
                    </View>
                </View>

                <View style={ [ styles.row , styles.head ] }>
                    <Text style={ styles.wide }>{ labels.product }</Text>
                    <Text style={ styles.cell }>{ labels.expected }</Text>
                    <Text style={ styles.cell }>{ labels.received }</Text>
                    <Text style={ [ styles.reason , { paddingLeft : 8 } ] }>{ labels.reason }</Text>
                </View>

                { lines.map( line => (
                    <View key={ line.gtin ?? line.name } style={ styles.row } wrap={ false }>
                        <Text style={ styles.wide }>{ line.name }</Text>
                        <Text style={ styles.cell }>{ line.expected }</Text>
                        <Text style={ styles.cell }>{ line.received }</Text>
                        <Text style={ [ styles.reason , { paddingLeft : 8 } ] }>{ line.reason ?? '' }</Text>
                    </View>
                ) ) }

                <View style={ styles.signed } wrap={ false }>
                    <View style={ { flex : 1 } }>
                        <Text style={ styles.label }>{ labels.signedBy }</Text>
                        <PdfSignature color="#1f2937" signature={ signature } width={ mm( 60 ) } />
                        <Text style={ styles.muted }>{ when }</Text>
                    </View>
                    <View style={ { flex : 1 } }>
                        <Text style={ styles.label }>{ labels.digest }</Text>
                        <Text style={ styles.muted }>{ labels.digestNote }</Text>
                        <Text style={ styles.digest }>{ digest }</Text>
                    </View>
                </View>

            </Page>
        </Document>
    ) ;
} ;

export default ReceiptDocument ;
