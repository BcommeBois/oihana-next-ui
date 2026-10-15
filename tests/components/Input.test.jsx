import '../support/react' ;

import { describe , expect , test } from 'bun:test' ;

import { renderToStaticMarkup } from 'react-dom/server' ;

import Input     from '../../src/components/inputs/Input' ;
import InputScan from '../../src/components/inputs/InputScan' ;
import TextArea  from '../../src/components/inputs/TextArea' ;

describe( 'Server render of a controlled field' , () =>
{
    test( 'an Input carries its value in the HTML' , () =>
    {
        const markup = renderToStaticMarkup( <Input value="H2-04-B" onChange={ () => {} } /> ) ;

        expect( markup ).toContain( 'value="H2-04-B"' ) ;
    } ) ;

    test( 'format applies from the first render' , () =>
    {
        const markup = renderToStaticMarkup(
            <Input value="h2-04-b" format={ v => v.toUpperCase() } onChange={ () => {} } />
        ) ;

        expect( markup ).toContain( 'value="H2-04-B"' ) ;
    } ) ;

    test( 'a TextArea carries its text in the HTML' , () =>
    {
        const markup = renderToStaticMarkup( <TextArea value="Colis entamé" onChange={ () => {} } /> ) ;

        expect( markup ).toContain( '>Colis entamé</textarea>' ) ;
    } ) ;

    test( 'a composed field (InputScan) carries its value too' , () =>
    {
        const markup = renderToStaticMarkup( <InputScan value="2116318" onChange={ () => {} } /> ) ;

        expect( markup ).toContain( 'value="2116318"' ) ;
    } ) ;

    test( 'an uncontrolled Input still starts on its defaultValue' , () =>
    {
        const markup = renderToStaticMarkup( <Input defaultValue="12" /> ) ;

        expect( markup ).toContain( 'value="12"' ) ;
    } ) ;
} ) ;
