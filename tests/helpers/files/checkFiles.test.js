import { describe , expect , test } from 'bun:test' ;

import checkFiles , { checkFile , FILE_REFUSALS , needsDimensions } from '../../../src/helpers/files/checkFiles' ;
import formatFileSize from '../../../src/helpers/files/formatFileSize' ;
import matchAccept , { acceptTokens } from '../../../src/helpers/files/matchAccept' ;

const MB = 1024 * 1024 ;

const pdf  = { name : 'Bon de livraison.PDF' , size : 2 * MB , type : 'application/pdf' } ;
const png  = { name : 'colis.png' , size : 800 * 1024 , type : 'image/png' } ;
const docx = { name : 'notes.docx' , size : 40 * 1024 , type : '' } ;
const big  = { name : 'scan.pdf' , size : 7.2 * MB , type : 'application/pdf' } ;

describe( 'matchAccept' , () =>
{
    test( 'nothing to accept accepts everything' , () =>
    {
        expect( matchAccept( pdf ) ).toBe( true ) ;
        expect( matchAccept( pdf , '' ) ).toBe( true ) ;
        expect( matchAccept( pdf , [] ) ).toBe( true ) ;
    } ) ;

    test( 'MIME types, wildcards and extensions, in any case' , () =>
    {
        expect( matchAccept( pdf , 'application/pdf' ) ).toBe( true ) ;
        expect( matchAccept( png , 'image/*' ) ).toBe( true ) ;
        expect( matchAccept( pdf , 'image/*' ) ).toBe( false ) ;
        expect( matchAccept( pdf , '.pdf' ) ).toBe( true ) ;
        expect( matchAccept( png , 'IMAGE/PNG' ) ).toBe( true ) ;
    } ) ;

    test( 'a list, as a string or an array' , () =>
    {
        expect( matchAccept( pdf , 'image/*, .pdf' ) ).toBe( true ) ;
        expect( matchAccept( png , [ 'application/pdf' , 'image/*' ] ) ).toBe( true ) ;
        expect( acceptTokens( ' image/* ,, .PDF ' ) ).toEqual( [ 'image/*' , '.pdf' ] ) ;
    } ) ;

    test( 'a file without a type only matches by its extension' , () =>
    {
        expect( matchAccept( docx , '.docx' ) ).toBe( true ) ;
        expect( matchAccept( docx , 'application/*' ) ).toBe( false ) ;
    } ) ;

    test( 'while dragging, no name : an extension cannot decide' , () =>
    {
        expect( matchAccept( { type : 'application/pdf' } , '.pdf' ) ).toBe( false ) ;
        expect( matchAccept( { type : 'application/pdf' } , '.pdf' , { unknown : true } ) ).toBe( true ) ;
        expect( matchAccept( { type : 'text/plain' } , 'image/*' , { unknown : true } ) ).toBe( false ) ;
    } ) ;
} ) ;

describe( 'checkFile' , () =>
{
    test( 'accepted : null' , () =>
    {
        expect( checkFile( pdf , { accept : '.pdf' , maxSize : 5 * MB } ) ).toBeNull() ;
        expect( checkFile( pdf ) ).toBeNull() ;
    } ) ;

    test( 'type, then weight' , () =>
    {
        expect( checkFile( png , { accept : '.pdf' , maxSize : 1 } ) ).toEqual( { reason : FILE_REFUSALS.TYPE } ) ;
        expect( checkFile( big , { maxSize : 5 * MB } ) ).toEqual( { reason : 'maxSize' } ) ;
        expect( checkFile( docx , { minSize : 100 * 1024 } ) ).toEqual( { reason : 'minSize' } ) ;
    } ) ;

    test( 'dimensions, when given' , () =>
    {
        const rules = { maxWidth : 4000 , minHeight : 600 , minWidth : 800 } ;
        expect( checkFile( png , rules , { height : 900 , width : 1200 } ) ).toBeNull() ;
        expect( checkFile( png , rules , { height : 500 , width : 1200 } ) ).toEqual( { reason : 'minDimensions' } ) ;
        expect( checkFile( png , rules , { height : 900 , width : 5000 } ) ).toEqual( { reason : 'maxDimensions' } ) ;
        expect( checkFile( png , rules , false ) ).toEqual( { reason : 'decode' } ) ;
        expect( checkFile( png , rules ) ).toBeNull() ;
    } ) ;

    test( 'the host’s validate comes last, with its message' , () =>
    {
        const validate = file => !file.name.startsWith( 'Bon' ) || 'Pas de bon de livraison ici.' ;
        expect( checkFile( pdf , { validate } ) ).toEqual( { message : 'Pas de bon de livraison ici.' , reason : 'custom' } ) ;
        expect( checkFile( big , { validate } ) ).toBeNull() ;
        expect( checkFile( pdf , { validate : () => false } ) ).toEqual( { message : undefined , reason : 'custom' } ) ;
        expect( checkFile( png , { accept : '.pdf' , validate } ) ).toEqual( { reason : 'type' } ) ;
    } ) ;
} ) ;

describe( 'checkFiles' , () =>
{
    test( 'sorts into accepted and refused, in order' , () =>
    {
        const { accepted , rejected } = checkFiles( [ pdf , png , big ] , { accept : '.pdf' , maxSize : 5 * MB } ) ;
        expect( accepted ).toEqual( [ pdf ] ) ;
        expect( rejected ).toEqual( [ { file : png , reason : 'type' } , { file : big , reason : 'maxSize' } ] ) ;
    } ) ;

    test( 'maxFiles counts the files already there, and keeps the first ones' , () =>
    {
        const files = [ pdf , png , docx ] ;
        expect( checkFiles( files , { maxFiles : 2 } ).accepted ).toEqual( [ pdf , png ] ) ;
        expect( checkFiles( files , { maxFiles : 2 } ).rejected ).toEqual( [ { file : docx , reason : 'maxFiles' } ] ) ;
        expect( checkFiles( files , { maxFiles : 2 } , { count : 2 } ).accepted ).toEqual( [] ) ;
    } ) ;

    test( 'a refused file does not take a place' , () =>
    {
        expect( checkFiles( [ big , pdf ] , { maxFiles : 1 , maxSize : 5 * MB } ).accepted ).toEqual( [ pdf ] ) ;
    } ) ;

    test( 'dimensions are read from the map, keyed by file' , () =>
    {
        const dimensions = new Map( [ [ png , { height : 300 , width : 400 } ] ] ) ;
        expect( checkFiles( [ png , pdf ] , { minWidth : 800 } , { dimensions } ).rejected ).toEqual( [ { file : png , reason : 'minDimensions' } ] ) ;
    } ) ;

    test( 'nothing in, nothing out' , () =>
    {
        expect( checkFiles( undefined ) ).toEqual( { accepted : [] , rejected : [] } ) ;
    } ) ;
} ) ;

describe( 'needsDimensions' , () =>
{
    test( 'only when a dimension is set' , () =>
    {
        expect( needsDimensions( { maxSize : 1 } ) ).toBe( false ) ;
        expect( needsDimensions() ).toBe( false ) ;
        expect( needsDimensions( { minWidth : 0 } ) ).toBe( true ) ;
        expect( needsDimensions( { maxHeight : 2000 } ) ).toBe( true ) ;
    } ) ;
} ) ;

describe( 'formatFileSize' , () =>
{
    test( 'steps of 1024, whole up to kilobytes, a decimal after' , () =>
    {
        expect( formatFileSize( 512 , 'en-US' ) ).toBe( '512 byte' ) ;
        expect( formatFileSize( 2048 , 'en-US' ) ).toBe( '2 kB' ) ;
        expect( formatFileSize( 7.2 * MB , 'en-US' ) ).toBe( '7.2 MB' ) ;
        expect( formatFileSize( 3 * 1024 * MB , 'en-US' ) ).toBe( '3 GB' ) ;
    } ) ;

    // French puts a narrow no-break space between the number and its unit.
    test( 'the locale’s words and separator' , () =>
    {
        expect( formatFileSize( 7.2 * MB , 'fr-FR' ) ).toBe( '7,2\u202fMo' ) ;
        expect( formatFileSize( 2048 , 'fr-FR' ) ).toBe( '2\u202fko' ) ;
    } ) ;

    test( 'nonsense reads as nothing' , () =>
    {
        expect( formatFileSize( -5 , 'en-US' ) ).toBe( '0 byte' ) ;
        expect( formatFileSize( undefined , 'en-US' ) ).toBe( '0 byte' ) ;
    } ) ;
} ) ;
