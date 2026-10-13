/**
 * A one-page note, as a `@react-pdf/renderer` document : the smallest
 * document worth generating — a title, a text, the day, and a QR code that
 * leads back to a page.
 *
 * @module demo/documents/pdf/NoteDocument
 *
 * @param {Object} props
 * @param {string} [props.body] - The text ; a blank line starts a paragraph.
 * @param {string} [props.locale='fr-FR']
 * @param {string} [props.title]
 * @param {string} [props.url] - What the QR code leads to ; none, no code.
 */

import { Document , Page , StyleSheet , Text , View } from '@react-pdf/renderer' ;

import PdfQRCode from '@/components/documents/pdf/PdfQRCode' ;

import { mm } from '@/helpers/pdf/units' ;

const styles = StyleSheet.create(
{
    page      : { fontFamily : 'Helvetica' , fontSize : 11 , lineHeight : 1.5 , padding : mm( 20 ) } ,
    title     : { fontFamily : 'Helvetica-Bold' , fontSize : 20 , marginBottom : 6 } ,
    date      : { color : '#6b7280' , fontSize : 9 , marginBottom : mm( 8 ) } ,
    paragraph : { marginBottom : 8 } ,
    footer    : { alignItems : 'center' , bottom : mm( 15 ) , flexDirection : 'row' , gap : 8 , left : mm( 20 ) , position : 'absolute' } ,
    url       : { color : '#6b7280' , fontSize : 8 } ,
} ) ;

const NoteDocument = ( { body = '' , locale = 'fr-FR' , title = '' , url } ) => (
    <Document title={ title }>
        <Page size="A5" style={ styles.page }>
            <Text style={ styles.title }>{ title }</Text>
            <Text style={ styles.date }>{ new Intl.DateTimeFormat( locale , { dateStyle : 'full' } ).format( new Date() ) }</Text>
            { body.split( /\n\s*\n/ ).filter( Boolean ).map( ( paragraph , index ) => (
                <Text key={ index } style={ styles.paragraph }>{ paragraph }</Text>
            ) ) }
            { url && (
                <View fixed style={ styles.footer }>
                    <PdfQRCode size={ mm( 16 ) } value={ url } />
                    <Text style={ styles.url }>{ url }</Text>
                </View>
            ) }
        </Page>
    </Document>
) ;

export default NoteDocument ;
