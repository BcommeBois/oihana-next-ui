import { createElement as h } from 'react' ;

import tableColumns from '../../../helpers/markdown/tableColumns' ;

import mergeTheme from './markdownTheme' ;

/**
 * Turns a Markdown syntax tree into the elements of a `@react-pdf/renderer`
 * document.
 *
 * The primitives come in as an argument, so this file names no engine : a
 * test hands it strings, `PdfMarkdown` hands it the real `Text`, `View`,
 * `Link` and `Image`. The grammar is mdast, as `parseMarkdown` returns it.
 *
 * What is drawn : headings, paragraphs, bold, italic, strikethrough, inline
 * and block code, lists — bulleted, numbered, nested, task lists —, quotes,
 * links, images (JPEG and PNG, the formats the engine reads ; any other
 * leaves its alternative text), rules and tables, whose columns are weighed
 * by what they hold. Raw HTML and footnotes are left out : a PDF has no DOM.
 *
 * @module components/documents/pdf/renderMarkdown
 *
 * @param {Object} tree - The mdast `root`.
 * @param {Object} options
 * @param {{ Image : *, Link : *, Text : *, View : * }} options.primitives - The engine's components.
 * @param {?Object} [options.theme] - Over {@link module:components/documents/pdf/markdownTheme}.
 *
 * @returns {React.ReactElement[]} The blocks, in order.
 */

const IMAGE = /^data:image\/(?:png|jpe?g)[;,]|\.(?:png|jpe?g)(?:[?#].*)?$/i ;

/** The plain text of a node and its children. */
export const textOf = node =>
{
    if ( !node )
    {
        return '' ;
    }

    if ( typeof node.value === 'string' )
    {
        return node.value ;
    }

    return ( node.children ?? [] ).map( textOf ).join( '' ) ;
} ;

const renderMarkdown = ( tree , { primitives , theme } ) =>
{
    const { Image , Link , Text , View } = primitives ;

    const t = mergeTheme( theme ) ;

    const body = { color : t.color , fontFamily : t.fontFamily , fontSize : t.fontSize , lineHeight : t.lineHeight } ;

    const inline = ( nodes , key = 'i' ) => ( nodes ?? [] ).map( ( node , index ) => phrase( node , `${ key }${ index }` ) ) ;

    /** One inline node : text, or text with a style, or a link. */
    const phrase = ( node , key ) =>
    {
        switch ( node.type )
        {
            case 'text'       : return node.value ;
            case 'break'      : return '\n' ;
            case 'strong'     : return h( Text , { key , style : { fontWeight : 700 } } , inline( node.children , key ) ) ;
            case 'emphasis'   : return h( Text , { key , style : { fontStyle : 'italic' } } , inline( node.children , key ) ) ;
            case 'delete'     : return h( Text , { key , style : { textDecoration : 'line-through' } } , inline( node.children , key ) ) ;
            case 'inlineCode' : return h( Text , { key , style : { backgroundColor : t.code.background , color : t.code.color , fontFamily : t.code.fontFamily , fontSize : t.code.fontSize } } , node.value ) ;
            case 'link'       : return h( Link , { key , src : node.url , style : { color : t.link.color , textDecoration : 'underline' } } , inline( node.children , key ) ) ;
            case 'image'      : return IMAGE.test( node.url ) ? null : h( Text , { key , style : { fontStyle : 'italic' } } , node.alt ?? '' ) ;
            case 'html'       : return null ;
            case 'footnoteReference' : return null ;
            default           : return node.children ? h( Text , { key } , inline( node.children , key ) ) : ( node.value ?? null ) ;
        }
    } ;

    /** The images of a paragraph are drawn as blocks of their own, after its text. */
    const images = ( nodes , key ) => ( nodes ?? [] )
        .filter( node => node.type === 'image' && IMAGE.test( node.url ) )
        .map( ( node , index ) => h( Image , { key : `${ key }img${ index }` , src : node.url , style : { marginBottom : t.image.marginBottom , maxWidth : '100%' } } ) ) ;

    const blocks = ( nodes , key = 'b' , context = {} ) => ( nodes ?? [] ).flatMap( ( node , index ) => block( node , `${ key }${ index }` , context ) ) ;

    const listItem = ( item , index , list , key , depth ) =>
    {
        const ordered = list.ordered ;
        const number  = ( list.start ?? 1 ) + index ;

        let marker ;

        if ( typeof item.checked === 'boolean' )
        {
            marker = h( View , { style : { backgroundColor : item.checked ? t.color : undefined , borderColor : t.color , borderRadius : 1 , borderWidth : 0.8 , height : t.fontSize * 0.8 , marginTop : t.fontSize * 0.3 , width : t.fontSize * 0.8 } } ) ;
        }
        else
        {
            marker = h( Text , { style : body } , ordered ? `${ number }.` : '•' ) ;
        }

        return h( View , { key , style : { flexDirection : 'row' , marginBottom : list.spread ? t.paragraph.marginBottom / 2 : 1 } } ,
            h( View , { style : { alignItems : ordered ? 'flex-end' : 'center' , paddingRight : 4 , width : t.list.indent } } , marker ) ,
            h( View , { style : { flex : 1 } } , blocks( item.children , `${ key }c` , { depth : depth + 1 , tight : !list.spread } ) ) ,
        ) ;
    } ;

    const table = ( node , key ) =>
    {
        const rows   = node.children ?? [] ;
        const shares = tableColumns( rows.map( row => ( row.children ?? [] ).map( textOf ) ) ) ;
        const aligns = node.align ?? [] ;

        return h( View , { key , style : { borderColor : t.table.borderColor , borderWidth : 0.5 , marginBottom : t.paragraph.marginBottom } } ,
            rows.map( ( row , rowIndex ) =>
            {
                const header = rowIndex === 0 ;

                return h( View , { key : rowIndex , style : { backgroundColor : header ? t.table.headerBackground : undefined , borderBottomColor : t.table.borderColor , borderBottomWidth : rowIndex === rows.length - 1 ? 0 : 0.5 , flexDirection : 'row' } , wrap : false } ,
                    ( row.children ?? [] ).map( ( cell , cellIndex ) =>
                        h( View , { key : cellIndex , style : { padding : t.table.cellPadding , width : `${ ( shares[ cellIndex ] ?? 0 ) * 100 }%` } } ,
                            h( Text , { style : { ...body , fontWeight : header ? 700 : undefined , textAlign : aligns[ cellIndex ] ?? 'left' } } , inline( cell.children , `${ key }r${ rowIndex }c${ cellIndex }` ) ) ,
                        ) ) ,
                ) ;
            } ) ,
        ) ;
    } ;

    /** One block node, as one or several elements. */
    const block = ( node , key , context ) =>
    {
        switch ( node.type )
        {
            case 'heading' :
            {
                const size = t.headings[ Math.min( node.depth , 6 ) - 1 ] ?? t.fontSize ;
                return h( Text , { key , minPresenceAhead : size * 3 , style : { ...body , color : t.heading.color , fontSize : size , fontWeight : 700 , lineHeight : 1.2 , marginBottom : t.heading.marginBottom , marginTop : context.depth ? 0 : t.heading.marginTop } } , inline( node.children , key ) ) ;
            }

            case 'paragraph' :
            {
                const text  = h( Text , { key , style : { ...body , marginBottom : context.tight ? 0 : t.paragraph.marginBottom } } , inline( node.children , key ) ) ;
                const extra = images( node.children , key ) ;
                return extra.length > 0 ? [ text , ...extra ] : text ;
            }

            case 'blockquote' :
                return h( View , { key , style : { borderLeftColor : t.quote.borderColor , borderLeftWidth : 2 , marginBottom : t.paragraph.marginBottom , paddingLeft : 8 } } ,
                    h( View , { style : { color : t.quote.color } } , blocks( node.children , `${ key }q` , context ) ) ) ;

            case 'code' :
                return h( View , { key , style : { backgroundColor : t.code.background , borderRadius : 3 , marginBottom : t.paragraph.marginBottom , padding : 6 } } ,
                    h( Text , { style : { color : t.code.color , fontFamily : t.code.fontFamily , fontSize : t.code.fontSize , lineHeight : 1.3 } } , node.value ?? '' ) ) ;

            case 'list' :
                return h( View , { key , style : { marginBottom : context.depth ? 0 : t.paragraph.marginBottom } } ,
                    ( node.children ?? [] ).map( ( item , index ) => listItem( item , index , node , `${ key }i${ index }` , context.depth ?? 0 ) ) ) ;

            case 'thematicBreak' :
                return h( View , { key , style : { borderBottomColor : t.rule.color , borderBottomWidth : 0.5 , marginVertical : t.paragraph.marginBottom } } ) ;

            case 'table' :
                return table( node , key ) ;

            case 'image' :
                return IMAGE.test( node.url )
                     ? h( Image , { key , src : node.url , style : { marginBottom : t.image.marginBottom , maxWidth : '100%' } } )
                     : h( Text , { key , style : { ...body , fontStyle : 'italic' } } , node.alt ?? '' ) ;

            case 'html' :
            case 'footnoteDefinition' :
            case 'definition' :
            case 'yaml' :
                return [] ;

            default :
                return node.children ? h( Text , { key , style : body } , inline( node.children , key ) ) : [] ;
        }
    } ;

    return blocks( tree?.children ) ;
} ;

export default renderMarkdown ;
