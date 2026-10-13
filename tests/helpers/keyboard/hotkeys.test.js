import { describe , expect , test } from 'bun:test' ;

import isEditableTarget from '../../../src/helpers/keyboard/isEditableTarget' ;
import matchesHotkey    from '../../../src/helpers/keyboard/matchesHotkey' ;
import parseHotkey      from '../../../src/helpers/keyboard/parseHotkey' ;

import checkConnection from '../../../src/helpers/net/checkConnection' ;

const press = ( key , modifiers = {} , extra = {} ) => ( { altKey : false , ctrlKey : false , key , metaKey : false , shiftKey : false , ...modifiers , ...extra } ) ;

describe( 'parseHotkey' , () =>
{
    test( 'reads modifiers in any order and the key, a character lowercased, a named key kept' , () =>
    {
        expect( parseHotkey( 'ctrl+shift+S' ) ).toEqual( { alt : false , ctrl : true , key : 's' , keyCode : null , meta : false , shift : true } ) ;
        expect( parseHotkey( 'Shift + Enter' ) ).toEqual( { alt : false , ctrl : false , key : 'Enter' , keyCode : null , meta : false , shift : true } ) ;
        expect( parseHotkey( 'cmd+k' ).meta ).toBe( true ) ;
        expect( parseHotkey( 'option+ArrowDown' ) ).toMatchObject( { alt : true , key : 'ArrowDown' } ) ;
        expect( parseHotkey( 'F1' ) ).toMatchObject( { key : 'F1' , shift : false } ) ;
        expect( parseHotkey( 'esc' ).key ).toBe( 'Escape' ) ;
        expect( parseHotkey( 'space' ).key ).toBe( ' ' ) ;
    } ) ;

    test( 'a number is a keyCode, for a trigger that sends no name' , () =>
    {
        expect( parseHotkey( 120 ) ).toMatchObject( { key : null , keyCode : 120 } ) ;
    } ) ;

    test( 'a modifier alone is a key, not a modifier' , () =>
    {
        expect( parseHotkey( 'shift' ) ).toMatchObject( { key : 'shift' , shift : false } ) ;
    } ) ;
} ) ;

describe( 'matchesHotkey' , () =>
{
    test( 'the same key and exactly the same modifiers' , () =>
    {
        const save = parseHotkey( 'ctrl+s' ) ;

        expect( matchesHotkey( press( 's' , { ctrlKey : true } ) , save ) ).toBe( true ) ;
        expect( matchesHotkey( press( 'S' , { ctrlKey : true } ) , save ) ).toBe( true ) ;
        expect( matchesHotkey( press( 's' ) , save ) ).toBe( false ) ;
        expect( matchesHotkey( press( 's' , { ctrlKey : true , shiftKey : true } ) , save ) ).toBe( false ) ;
        expect( matchesHotkey( press( 'F1' ) , parseHotkey( 'F1' ) ) ).toBe( true ) ;
        expect( matchesHotkey( press( 'Unidentified' , {} , { keyCode : 120 } ) , parseHotkey( 120 ) ) ).toBe( true ) ;
    } ) ;
} ) ;

describe( 'isEditableTarget' , () =>
{
    test( 'fields that type, and nothing else' , () =>
    {
        expect( isEditableTarget( { tagName : 'INPUT' , type : 'text' } ) ).toBe( true ) ;
        expect( isEditableTarget( { tagName : 'INPUT' , type : 'search' } ) ).toBe( true ) ;
        expect( isEditableTarget( { tagName : 'INPUT' , type : 'checkbox' } ) ).toBe( false ) ;
        expect( isEditableTarget( { tagName : 'TEXTAREA' } ) ).toBe( true ) ;
        expect( isEditableTarget( { tagName : 'SELECT' } ) ).toBe( true ) ;
        expect( isEditableTarget( { tagName : 'DIV' , isContentEditable : true } ) ).toBe( true ) ;
        expect( isEditableTarget( { tagName : 'BUTTON' } ) ).toBe( false ) ;
        expect( isEditableTarget( null ) ).toBe( false ) ;
    } ) ;
} ) ;

describe( 'checkConnection' , () =>
{
    test( 'a server that answers, whatever it says, is reached ; a request that fails or waits too long is not' , async () =>
    {
        const calls = [] ;

        expect( await checkConnection( { fetch : async ( url , init ) => { calls.push( { init , url } ) ; return new Response( null , { status : 404 } ) ; } } ) ).toBe( true ) ;
        expect( calls[ 0 ].url.startsWith( '/version.json?ping=' ) ).toBe( true ) ;
        expect( calls[ 0 ].init.method ).toBe( 'HEAD' ) ;
        expect( calls[ 0 ].init.cache ).toBe( 'no-store' ) ;

        expect( await checkConnection( { fetch : async () => { throw new TypeError( 'Failed to fetch' ) ; } } ) ).toBe( false ) ;

        const slow = ( _url , init ) => new Promise( ( _resolve , reject ) => { init.signal.addEventListener( 'abort' , () => reject( new DOMException( 'aborted' , 'AbortError' ) ) ) ; } ) ;
        expect( await checkConnection( { fetch : slow , timeout : 20 } ) ).toBe( false ) ;

        expect( await checkConnection( { fetch : async url => { calls.push( { url } ) ; return new Response() ; } , url : '/api/health?x=1' } ) ).toBe( true ) ;
        expect( calls.at( -1 ).url.startsWith( '/api/health?x=1&ping=' ) ).toBe( true ) ;
    } ) ;
} ) ;
