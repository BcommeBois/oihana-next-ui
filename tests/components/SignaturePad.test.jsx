import '../support/react' ;

import { describe , expect , test } from 'bun:test' ;

import { renderToStaticMarkup } from 'react-dom/server' ;

import SignaturePad from '../../src/components/inputs/SignaturePad' ;

const signature = { height : 100 , strokes : [ [ [ 10 , 50 , 0.5 ] , [ 90 , 50 , 0.5 ] ] ] , width : 200 } ;

describe( 'SignaturePad' , () =>
{
    test( 'the pad is an image named by its label, with a baseline and its two buttons' , () =>
    {
        const markup = renderToStaticMarkup( <SignaturePad label="Signature du client" /> ) ;

        expect( markup ).toContain( 'role="img"' ) ;
        expect( markup ).toContain( 'aria-label="Signature du client"' ) ;
        expect( markup ).toContain( '<canvas' ) ;
        expect( markup ).toContain( 'touch-action:none' ) ;
        expect( markup.match( /<button/g ) ).toHaveLength( 2 ) ;
        expect( markup ).toContain( 'type="button"' ) ;
    } ) ;

    test( 'read-only, no buttons and no baseline ; the hidden input is sent only under a name' , () =>
    {
        const readOnly = renderToStaticMarkup( <SignaturePad readOnly value={ signature } /> ) ;

        expect( readOnly ).not.toContain( '<button' ) ;
        expect( readOnly ).not.toContain( 'type="hidden"' ) ;

        const named = renderToStaticMarkup( <SignaturePad name="signature" value={ signature } /> ) ;

        expect( named ).toContain( 'name="signature"' ) ;
        expect( named ).toContain( 'type="hidden"' ) ;
    } ) ;

    test( 'an error names itself for the pad' , () =>
    {
        const markup = renderToStaticMarkup( <SignaturePad error="Signature requise" id="sig" /> ) ;

        expect( markup ).toContain( 'aria-describedby="sig-helper"' ) ;
        expect( markup ).toContain( 'id="sig-helper"' ) ;
        expect( markup ).toContain( 'Signature requise' ) ;
    } ) ;
} ) ;
