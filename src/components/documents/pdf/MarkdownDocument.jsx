/**
 * MarkdownDocument — a whole PDF from a Markdown text, with no template to
 * write : pages of the chosen size, margins, the text flowing across them,
 * and « page n / N » at the foot of each.
 *
 * The generic case — a note, a report, the content of a Markdown field
 * printed as it is. A business document with a header of its own puts
 * `PdfMarkdown` in a template instead.
 *
 * ⚠️ This file imports `@react-pdf/renderer` at its top : import it lazily
 * from a page, as any template.
 *
 * @module components/documents/pdf/MarkdownDocument
 *
 * @param {Object} props
 * @param {string} [props.author] - The document's author, in its properties.
 * @param {boolean} [props.breaks=false] - A newline is a line break.
 * @param {React.ReactNode} [props.footer] - Replaces the page numbers. `false` draws no footer.
 * @param {number} [props.margin] - The page margin, in points. Defaults to 20 mm.
 * @param {string} [props.pageLabel='Page {0} / {1}'] - The page numbers' pattern.
 * @param {string|[number,number]} [props.size='A4'] - The page size, as `<Page size>` takes it.
 * @param {string} props.source - The Markdown.
 * @param {Partial<import('./markdownTheme').MarkdownTheme>} [props.theme]
 * @param {string} [props.title] - The document's title, in its properties.
 *
 * @example
 * ```jsx
 * <MarkdownDocument source={ report } title="Visit report" />
 * ```
 */

import { Document , Page , Text , View } from '@react-pdf/renderer' ;

import PdfMarkdown from './PdfMarkdown' ;

import mergeTheme from './markdownTheme' ;

import { mm } from '../../../helpers/pdf/units' ;

const MarkdownDocument =
({
    author ,
    breaks = false ,
    footer ,
    margin = mm( 20 ) ,
    pageLabel = 'Page {0} / {1}' ,
    size = 'A4' ,
    source ,
    theme ,
    title ,
}) =>
{
    const t = mergeTheme( theme ) ;

    const foot = footer === false
               ? null
               : (
                    <View fixed style={ { bottom : margin / 2 , left : margin , position : 'absolute' , right : margin } }>
                        { footer ?? (
                            <Text
                                render = { ( { pageNumber , totalPages } ) => pageLabel.replace( '{0}' , pageNumber ).replace( '{1}' , totalPages ) }
                                style  = { { color : t.quote.color , fontFamily : t.fontFamily , fontSize : t.fontSize * 0.8 , textAlign : 'right' } }
                            />
                        ) }
                    </View>
               ) ;

    return (
        <Document author={ author } title={ title }>
            <Page size={ size } style={ { paddingBottom : margin , paddingHorizontal : margin , paddingTop : margin } }>
                <PdfMarkdown breaks={ breaks } source={ source } theme={ theme } />
                { foot }
            </Page>
        </Document>
    ) ;
} ;

MarkdownDocument.displayName = 'MarkdownDocument' ;

export default MarkdownDocument ;
