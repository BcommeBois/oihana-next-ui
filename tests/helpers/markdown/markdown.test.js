import { describe , expect , test } from 'bun:test' ;

import parseMarkdown from '../../../src/helpers/markdown/parseMarkdown' ;
import tableColumns  from '../../../src/helpers/markdown/tableColumns' ;

import renderMarkdown , { textOf }          from '../../../src/components/documents/pdf/renderMarkdown' ;
import mergeTheme , { DEFAULT_THEME }       from '../../../src/components/documents/pdf/markdownTheme' ;

/** Fake primitives : the engine's are strings too, these just say which. */
const primitives = { Image : 'IMAGE' , Link : 'LINK' , Text : 'TEXT' , View : 'VIEW' } ;

const render = ( source , theme ) => renderMarkdown( parseMarkdown( source ) , { primitives , theme } ) ;

/** Every element of a tree, depth first. */
const walk = node =>
{
    if ( Array.isArray( node ) )
    {
        return node.flatMap( walk ) ;
    }

    if ( !node || typeof node !== 'object' )
    {
        return [] ;
    }

    return [ node , ...walk( node.props?.children ) ] ;
} ;

/** The text an element and its children carry. */
const text = node =>
{
    if ( typeof node === 'string' ) return node ;
    if ( Array.isArray( node ) ) return node.map( text ).join( '' ) ;
    return node?.props?.children ? text( node.props.children ) : '' ;
} ;

describe( 'parseMarkdown' , () =>
{
    test( 'reads GitHub Flavored Markdown : a table, a task, strikethrough' , () =>
    {
        const tree = parseMarkdown( '| a | b |\n|---|---|\n| 1 | 2 |\n\n- [x] done\n\n~~gone~~' ) ;

        expect( tree.children.map( node => node.type ) ).toEqual( [ 'table' , 'list' , 'paragraph' ] ) ;
        expect( tree.children[ 1 ].children[ 0 ].checked ).toBe( true ) ;
        expect( tree.children[ 2 ].children[ 0 ].type ).toBe( 'delete' ) ;
    } ) ;

    test( 'a newline is a space, or a break when asked' , () =>
    {
        expect( parseMarkdown( 'one\ntwo' ).children[ 0 ].children ).toHaveLength( 1 ) ;
        expect( parseMarkdown( 'one\ntwo' , { breaks : true } ).children[ 0 ].children.map( node => node.type ) ).toEqual( [ 'text' , 'break' , 'text' ] ) ;
    } ) ;
} ) ;

describe( 'tableColumns' , () =>
{
    test( 'a column weighs its longest cell, held between min and max' , () =>
    {
        const shares = tableColumns( [ [ 'Description' , 'Qty' ] , [ 'A long description of the item' , '2' ] ] ) ;

        expect( shares ).toHaveLength( 2 ) ;
        expect( shares[ 0 ] ).toBeGreaterThan( shares[ 1 ] * 5 ) ;
        expect( shares[ 0 ] + shares[ 1 ] ).toBeCloseTo( 1 , 10 ) ;

        expect( tableColumns( [ [ '' , 'x'.repeat( 200 ) ] ] ) ).toEqual( [ 3 / 43 , 40 / 43 ] ) ;
        expect( tableColumns( [] ) ).toEqual( [] ) ;
    } ) ;
} ) ;

describe( 'mergeTheme' , () =>
{
    test( 'a partial theme keeps the rest of each group' , () =>
    {
        const theme = mergeTheme( { code : { fontSize : 8 } , fontSize : 11 , headings : [ 30 ] } ) ;

        expect( theme.fontSize ).toBe( 11 ) ;
        expect( theme.code ).toEqual( { ...DEFAULT_THEME.code , fontSize : 8 } ) ;
        expect( theme.headings ).toEqual( [ 30 ] ) ;
        expect( mergeTheme() ).toBe( DEFAULT_THEME ) ;
    } ) ;
} ) ;

describe( 'renderMarkdown' , () =>
{
    test( 'a heading is a bold Text at its level\'s size, a paragraph a Text with a margin' , () =>
    {
        const [ heading , paragraph ] = render( '## Title\n\nBody' ) ;

        expect( heading.type ).toBe( 'TEXT' ) ;
        expect( heading.props.style.fontSize ).toBe( DEFAULT_THEME.headings[ 1 ] ) ;
        expect( heading.props.style.fontWeight ).toBe( 700 ) ;
        expect( text( heading ) ).toBe( 'Title' ) ;

        expect( paragraph.type ).toBe( 'TEXT' ) ;
        expect( paragraph.props.style.marginBottom ).toBe( DEFAULT_THEME.paragraph.marginBottom ) ;
    } ) ;

    test( 'inline marks nest as Texts : bold, italic, strikethrough, code, a link' , () =>
    {
        const [ paragraph ] = render( 'a **b** *c* ~~d~~ `e` [f](https://example.com)' ) ;
        const styles = walk( paragraph ).slice( 1 ).map( node => [ node.type , node.props.style ] ) ;

        expect( styles ).toEqual(
        [
            [ 'TEXT' , { fontWeight : 700 } ] ,
            [ 'TEXT' , { fontStyle : 'italic' } ] ,
            [ 'TEXT' , { textDecoration : 'line-through' } ] ,
            [ 'TEXT' , { backgroundColor : DEFAULT_THEME.code.background , color : DEFAULT_THEME.code.color , fontFamily : 'Courier' , fontSize : DEFAULT_THEME.code.fontSize } ] ,
            [ 'LINK' , { color : DEFAULT_THEME.link.color , textDecoration : 'underline' } ] ,
        ] ) ;

        expect( walk( paragraph ).find( node => node.type === 'LINK' ).props.src ).toBe( 'https://example.com' ) ;
        expect( text( paragraph ) ).toBe( 'a b c d e f' ) ;
    } ) ;

    test( 'lists carry their markers : bullets, numbers from the start, a box for a task' , () =>
    {
        const [ bullets , numbers , tasks ] = render( '- one\n- two\n\n3. three\n4. four\n\n- [x] done\n- [ ] todo' ) ;

        const markers = list => list.props.children.map( item => item.props.children[ 0 ].props.children ) ;

        expect( markers( bullets ).map( text ) ).toEqual( [ '•' , '•' ] ) ;
        expect( markers( numbers ).map( text ) ).toEqual( [ '3.' , '4.' ] ) ;

        const boxes = markers( tasks ) ;
        expect( boxes.map( box => box.type ) ).toEqual( [ 'VIEW' , 'VIEW' ] ) ;
        expect( boxes[ 0 ].props.style.backgroundColor ).toBe( DEFAULT_THEME.color ) ;
        expect( boxes[ 1 ].props.style.backgroundColor ).toBeUndefined() ;
    } ) ;

    test( 'a table has one row per line, columns weighed, the header bold, alignment kept' , () =>
    {
        const [ table ] = render( '| Item | Qty |\n|:---|---:|\n| A long item name here | 2 |' ) ;

        const rows = table.props.children ;
        expect( rows ).toHaveLength( 2 ) ;
        expect( rows[ 0 ].props.wrap ).toBe( false ) ;

        const cells = rows[ 1 ].props.children ;
        expect( Number.parseFloat( cells[ 0 ].props.style.width ) ).toBeGreaterThan( 70 ) ;
        expect( cells[ 1 ].props.children.props.style.textAlign ).toBe( 'right' ) ;
        expect( rows[ 0 ].props.children[ 0 ].props.children.props.style.fontWeight ).toBe( 700 ) ;
    } ) ;

    test( 'a JPEG or PNG image is drawn after its paragraph ; anything else leaves its alt text' , () =>
    {
        const blocks = render( 'See ![a photo](/photo.jpg) and ![a drawing](/drawing.svg)' ) ;

        expect( blocks.map( node => node.type ) ).toEqual( [ 'TEXT' , 'IMAGE' ] ) ;
        expect( blocks[ 1 ].props.src ).toBe( '/photo.jpg' ) ;
        expect( text( blocks[ 0 ] ) ).toBe( 'See  and a drawing' ) ;
    } ) ;

    test( 'raw HTML and footnotes are left out ; a rule and a quote are Views' , () =>
    {
        const blocks = render( '<div>no</div>\n\n---\n\n> quoted[^1]\n\n[^1]: note' ) ;

        expect( blocks.map( node => node.type ) ).toEqual( [ 'VIEW' , 'VIEW' ] ) ;
        expect( blocks[ 0 ].props.style.borderBottomWidth ).toBe( 0.5 ) ;
        expect( text( blocks[ 1 ] ) ).toBe( 'quoted' ) ;
    } ) ;

    test( 'the theme reaches the elements' , () =>
    {
        const [ heading ] = render( '# T' , { fontFamily : 'Inter' , headings : [ 30 ] } ) ;

        expect( heading.props.style.fontFamily ).toBe( 'Inter' ) ;
        expect( heading.props.style.fontSize ).toBe( 30 ) ;
    } ) ;

    test( 'textOf flattens a node' , () =>
    {
        expect( textOf( parseMarkdown( 'a **b** c' ).children[ 0 ] ) ).toBe( 'a b c' ) ;
    } ) ;
} ) ;
