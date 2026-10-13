import { beforeAll , describe , expect , test } from 'bun:test' ;

import { PDFDocument , StandardFonts } from '@cantoo/pdf-lib' ;

import addPageNumbers from '../../../src/helpers/pdf/edit/addPageNumbers' ;
import extractPages   from '../../../src/helpers/pdf/edit/extractPages' ;
import fillForm       from '../../../src/helpers/pdf/edit/fillForm' ;
import listFormFields from '../../../src/helpers/pdf/edit/listFormFields' ;
import loadPdfBytes   from '../../../src/helpers/pdf/edit/loadPdfBytes' ;
import mergePdfs      from '../../../src/helpers/pdf/edit/mergePdfs' ;
import parsePageRange from '../../../src/helpers/pdf/edit/parsePageRange' ;
import placement      from '../../../src/helpers/pdf/edit/placement' ;
import rotatePages    from '../../../src/helpers/pdf/edit/rotatePages' ;
import stampImage     from '../../../src/helpers/pdf/edit/stampImage' ;
import stampSignature from '../../../src/helpers/pdf/edit/stampSignature' ;
import toPdfFile      from '../../../src/helpers/pdf/edit/toPdfFile' ;
import watermark      from '../../../src/helpers/pdf/edit/watermark' ;

import { mm } from '../../../src/helpers/pdf/units' ;

/** A document of `count` A4 pages, each saying its number. */
const makePdf = async ( count , title ) =>
{
    const pdf  = await PDFDocument.create() ;
    const font = await pdf.embedFont( StandardFonts.Helvetica ) ;

    if ( title ) pdf.setTitle( title ) ;

    for ( let number = 1 ; number <= count ; number++ )
    {
        pdf.addPage( [ 595.28 , 841.89 ] ).drawText( `Page ${ number }` , { font , size : 24 , x : 50 , y : 780 } ) ;
    }

    return pdf.save() ;
} ;

/** A one-page form : a text field, a checkbox, a dropdown. */
const makeForm = async () =>
{
    const pdf  = await PDFDocument.create() ;
    const page = pdf.addPage( [ 400 , 300 ] ) ;
    const form = pdf.getForm() ;

    const name = form.createTextField( 'name' ) ;
    name.addToPage( page , { height : 24 , width : 200 , x : 50 , y : 220 } ) ;

    const agreed = form.createCheckBox( 'agreed' ) ;
    agreed.addToPage( page , { height : 16 , width : 16 , x : 50 , y : 180 } ) ;

    const mode = form.createDropdown( 'mode' ) ;
    mode.addOptions( [ 'home' , 'relay' ] ) ;
    mode.select( 'home' ) ;
    mode.addToPage( page , { height : 24 , width : 120 , x : 50 , y : 130 } ) ;

    return pdf.save() ;
} ;

/** A 1 × 1 red PNG. */
const PNG = Uint8Array.from( atob( 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==' ) , character => character.charCodeAt( 0 ) ) ;

const signature = { height : 100 , strokes : [ [ [ 10 , 50 , 0.5 ] , [ 60 , 20 , 0.6 ] , [ 110 , 60 , 0.5 ] , [ 180 , 40 , 0.4 ] ] ] , width : 200 } ;

const pageCount = async bytes => ( await PDFDocument.load( bytes ) ).getPageCount() ;

let three ;
let two ;

beforeAll( async () =>
{
    three = await makePdf( 3 , 'Three' ) ;
    two   = await makePdf( 2 ) ;
} ) ;

describe( 'parsePageRange' , () =>
{
    test( 'reads what a print dialog reads, in order, each page once, within the count' , () =>
    {
        expect( parsePageRange( '1-3,5' , 10 ) ).toEqual( [ 1 , 2 , 3 , 5 ] ) ;
        expect( parsePageRange( '8-' , 10 ) ).toEqual( [ 8 , 9 , 10 ] ) ;
        expect( parsePageRange( '-2' , 10 ) ).toEqual( [ 1 , 2 ] ) ;
        expect( parsePageRange( '3, 1 ; 3' , 10 ) ).toEqual( [ 3 , 1 ] ) ;
        expect( parsePageRange( '2-99' , 4 ) ).toEqual( [ 2 , 3 , 4 ] ) ;
        expect( parsePageRange( 2 , 4 ) ).toEqual( [ 2 ] ) ;
        expect( parsePageRange( [ 3 , 1 , 3 , 0 , 9 ] , 4 ) ).toEqual( [ 3 , 1 ] ) ;
    } ) ;

    test( 'nothing that names a page is an error' , () =>
    {
        expect( () => parsePageRange( '' , 4 ) ).toThrow( RangeError ) ;
        expect( () => parsePageRange( '12' , 4 ) ).toThrow( RangeError ) ;
        expect( () => parsePageRange( 'abc' , 4 ) ).toThrow( RangeError ) ;
    } ) ;
} ) ;

describe( 'placement' , () =>
{
    const page = { height : mm( 297 ) , width : mm( 210 ) } ;
    const box  = { height : mm( 20 ) , width : mm( 50 ) } ;

    test( 'counts millimetres from the anchor, and answers the bottom-left in points' , () =>
    {
        const bottomRight = placement( page , box , { anchor : 'bottom-right' , x : 15 , y : 20 } ) ;

        expect( bottomRight.x ).toBeCloseTo( mm( 210 - 15 - 50 ) , 6 ) ;
        expect( bottomRight.y ).toBeCloseTo( mm( 20 ) , 6 ) ;

        const topLeft = placement( page , box , { x : 10 , y : 10 } ) ;

        expect( topLeft.x ).toBeCloseTo( mm( 10 ) , 6 ) ;
        expect( topLeft.y ).toBeCloseTo( mm( 297 - 10 - 20 ) , 6 ) ;
        expect( topLeft.top ).toBeCloseTo( mm( 10 ) , 6 ) ;

        const centre = placement( page , box , { anchor : 'center' } ) ;

        expect( centre.x ).toBeCloseTo( mm( 80 ) , 6 ) ;
        expect( centre.y ).toBeCloseTo( mm( ( 297 - 20 ) / 2 ) , 6 ) ;
    } ) ;
} ) ;

describe( 'loadPdfBytes and toPdfFile' , () =>
{
    test( 'bytes, a buffer, a Blob and a File all give the bytes ; a File comes back named' , async () =>
    {
        expect( await loadPdfBytes( three ) ).toBe( three ) ;
        expect( ( await loadPdfBytes( three.buffer.slice( three.byteOffset , three.byteOffset + three.byteLength ) ) ).length ).toBe( three.length ) ;
        expect( ( await loadPdfBytes( new Blob( [ three ] ) ) ).length ).toBe( three.length ) ;

        const file = toPdfFile( three , 'dossier' ) ;

        expect( file.name ).toBe( 'dossier.pdf' ) ;
        expect( file.type ).toBe( 'application/pdf' ) ;
        expect( ( await loadPdfBytes( file ) ).length ).toBe( three.length ) ;
    } ) ;

    test( 'nothing that names a document is an error' , async () =>
    {
        await expect( loadPdfBytes( {} ) ).rejects.toThrow() ;
    } ) ;
} ) ;

describe( 'mergePdfs and extractPages' , () =>
{
    test( 'merged, the pages add up and the first title stays' , async () =>
    {
        const merged = await mergePdfs( [ three , two ] ) ;

        expect( await pageCount( merged ) ).toBe( 5 ) ;
        expect( ( await PDFDocument.load( merged ) ).getTitle() ).toBe( 'Three' ) ;
        expect( ( await PDFDocument.load( await mergePdfs( [ two , three ] , { title : 'Dossier' } ) ) ).getTitle() ).toBe( 'Dossier' ) ;
    } ) ;

    test( 'extracted in the order asked, and a page left out is removed' , async () =>
    {
        expect( await pageCount( await extractPages( three , '1,3' ) ) ).toBe( 2 ) ;
        expect( await pageCount( await extractPages( three , [ 3 , 2 , 1 ] ) ) ).toBe( 3 ) ;
        expect( await pageCount( await extractPages( three , '2-' ) ) ).toBe( 2 ) ;
        await expect( extractPages( three , '9' ) ).rejects.toThrow( RangeError ) ;
    } ) ;
} ) ;

describe( 'rotatePages' , () =>
{
    test( 'turns the pages named, adding to their own rotation' , async () =>
    {
        const once  = await PDFDocument.load( await rotatePages( three , { angle : 90 , pages : 2 } ) ) ;

        expect( once.getPage( 0 ).getRotation().angle ).toBe( 0 ) ;
        expect( once.getPage( 1 ).getRotation().angle ).toBe( 90 ) ;

        const twice = await PDFDocument.load( await rotatePages( await once.save() , { angle : -90 } ) ) ;

        expect( twice.getPage( 0 ).getRotation().angle ).toBe( 270 ) ;
        expect( twice.getPage( 1 ).getRotation().angle ).toBe( 0 ) ;
    } ) ;
} ) ;

describe( 'what is drawn on the pages' , () =>
{
    test( 'page numbers, an image, a signature and a watermark leave the pages as many and as large' , async () =>
    {
        const numbered = await addPageNumbers( three , { pages : '2-' , position : 'bottom-right' } ) ;
        const stamped  = await stampImage( numbered , PNG , { anchor : 'top-right' , page : 3 , width : 20 } ) ;
        const signed   = await stampSignature( stamped , signature , { page : 1 , width : 40 } ) ;
        const marked   = await watermark( signed , 'COPIE' ) ;

        const result = await PDFDocument.load( marked ) ;

        expect( result.getPageCount() ).toBe( 3 ) ;
        expect( result.getPage( 0 ).getSize() ).toEqual( { height : 841.89 , width : 595.28 } ) ;
        expect( marked.length ).toBeGreaterThan( three.length ) ;
    } ) ;

    test( 'an empty signature changes nothing' , async () =>
    {
        const same = await stampSignature( three , { height : 1 , strokes : [] , width : 1 } ) ;

        expect( await pageCount( same ) ).toBe( 3 ) ;
    } ) ;
} ) ;

describe( 'forms' , () =>
{
    test( 'the fields are listed with their kind, value and options' , async () =>
    {
        const fields = await listFormFields( await makeForm() ) ;

        expect( fields ).toEqual(
        [
            { name : 'name'   , type : 'text'     , value : '' } ,
            { name : 'agreed' , type : 'checkbox' , value : false } ,
            { name : 'mode'   , options : [ 'home' , 'relay' ] , type : 'dropdown' , value : [ 'home' ] } ,
        ] ) ;

        expect( await listFormFields( three ) ).toEqual( [] ) ;
    } ) ;

    test( 'filled by name, read back ; a missing name is reported ; flattened, no field is left' , async () =>
    {
        const missing = [] ;

        const filled = await fillForm( await makeForm() , { agreed : true , mode : 'relay' , name : 'Camille Martin' , nope : 'x' } , { onMissing : name => missing.push( name ) } ) ;

        expect( missing ).toEqual( [ 'nope' ] ) ;

        const fields = await listFormFields( filled ) ;

        expect( fields.find( field => field.name === 'name' ).value ).toBe( 'Camille Martin' ) ;
        expect( fields.find( field => field.name === 'agreed' ).value ).toBe( true ) ;
        expect( fields.find( field => field.name === 'mode' ).value ).toEqual( [ 'relay' ] ) ;

        const flat = await fillForm( await makeForm() , { name : 'Flat' } , { flatten : true } ) ;

        expect( await listFormFields( flat ) ).toEqual( [] ) ;
        expect( await pageCount( flat ) ).toBe( 1 ) ;
    } ) ;
} ) ;
