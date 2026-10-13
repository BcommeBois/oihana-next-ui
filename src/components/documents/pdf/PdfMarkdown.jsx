/**
 * PdfMarkdown — Markdown inside a generated PDF : the terms of an invoice,
 * the body of a report, a description typed in a Markdown field, drawn in
 * the page of a template of yours.
 *
 * A primitive of `@react-pdf/renderer`, not of the DOM : it lives in a
 * `<Document>` and nowhere else. The text is parsed as the screen parses it
 * (`parseMarkdown` : GitHub Flavored Markdown) and rendered by
 * `renderMarkdown` into the engine's `Text`, `View`, `Link` and `Image`.
 * Headings, bold, italic, strikethrough, code, lists and task lists, quotes,
 * links, JPEG and PNG images, rules, tables ; raw HTML and footnotes are
 * left out.
 *
 * ⚠️ This file imports `@react-pdf/renderer` at its top : import it from a
 * document template only, which already does, never from a page.
 *
 * @module components/documents/pdf/PdfMarkdown
 *
 * @param {Object} props
 * @param {boolean} [props.breaks=false] - A newline is a line break, as `remark-breaks` does on screen.
 * @param {string} props.source - The Markdown.
 * @param {Object} [props.style] - Style of the block the content is drawn in.
 * @param {Partial<import('./markdownTheme').MarkdownTheme>} [props.theme] - Over the default theme.
 *
 * @example
 * ```jsx
 * <Page size="A4" style={ { padding : mm( 20 ) } }>
 *     <PdfMarkdown source={ terms } theme={ { fontSize : 9 } } />
 * </Page>
 * ```
 */

import { Image , Link , Text , View } from '@react-pdf/renderer' ;

import parseMarkdown from '../../../helpers/markdown/parseMarkdown' ;

import renderMarkdown from './renderMarkdown' ;

const PRIMITIVES = { Image , Link , Text , View } ;

const PdfMarkdown = ( { breaks = false , source , style , theme } ) => (
    <View style={ style }>
        { renderMarkdown( parseMarkdown( source , { breaks } ) , { primitives : PRIMITIVES , theme } ) }
    </View>
) ;

PdfMarkdown.displayName = 'PdfMarkdown' ;

export default PdfMarkdown ;
