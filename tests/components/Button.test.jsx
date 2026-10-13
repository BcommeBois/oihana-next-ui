import '../support/react' ;

import { describe , expect , test } from 'bun:test' ;

import { renderToStaticMarkup } from 'react-dom/server' ;

import Button from '../../src/components/Button' ;

/** The opening tag of the rendered element, attributes included. */
const openingTag = ( markup , tag ) => markup.match( new RegExp( `<${ tag }\\b[^>]*>` ) )?.[ 0 ] ?? '' ;

describe( 'Button type' , () =>
{
    test( 'a <button> is type="button" unless told otherwise, so it never submits its form by accident' , () =>
    {
        expect( openingTag( renderToStaticMarkup( <Button>Add</Button> ) , 'button' ) ).toContain( 'type="button"' ) ;
    } ) ;

    test( 'the one that should send the form says so' , () =>
    {
        const tag = openingTag( renderToStaticMarkup( <Button type="submit">Save</Button> ) , 'button' ) ;
        expect( tag ).toContain( 'type="submit"' ) ;
        expect( tag ).not.toContain( 'type="button"' ) ;
    } ) ;

    test( 'another element gets no type : the attribute does not mean the same there' , () =>
    {
        expect( openingTag( renderToStaticMarkup( <Button as="label">Toggle</Button> ) , 'label' ) ).not.toContain( 'type=' ) ;
        expect( openingTag( renderToStaticMarkup( <Button as="a" href="/home">Home</Button> ) , 'a' ) ).not.toContain( 'type=' ) ;
    } ) ;

    test( 'a type given with `as` is passed as is' , () =>
    {
        expect( openingTag( renderToStaticMarkup( <Button as="a" href="/file.pdf" type="application/pdf">PDF</Button> ) , 'a' ) ).toContain( 'type="application/pdf"' ) ;
    } ) ;
} ) ;

describe( 'Button accessible name' , () =>
{
    test( 'a button with nothing else to be named by takes its tooltip' , () =>
    {
        expect( openingTag( renderToStaticMarkup( <Button tooltip="Search" /> ) , 'button' ) ).toContain( 'aria-label="Search"' ) ;
    } ) ;

    test( 'a button with text keeps its text as its name' , () =>
    {
        expect( openingTag( renderToStaticMarkup( <Button tooltip="Save the draft">Save</Button> ) , 'button' ) ).not.toContain( 'aria-label=' ) ;
    } ) ;

    test( 'a title wins over the tooltip' , () =>
    {
        expect( openingTag( renderToStaticMarkup( <Button title="Find" tooltip="Search" /> ) , 'button' ) ).toContain( 'aria-label="Find"' ) ;
    } ) ;
} ) ;
