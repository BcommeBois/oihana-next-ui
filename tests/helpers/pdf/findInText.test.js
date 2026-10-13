import { describe , expect , test } from 'bun:test' ;

import findInText , { foldText } from '../../../src/helpers/pdf/findInText' ;

describe( 'findInText' , () =>
{
    test( 'case and accents do not matter, a partial word is found' , () =>
    {
        expect( findInText( 'Facture du 12 — facturée' , 'fact' ) ).toEqual( [ 0 , 16 ] ) ;
        expect( findInText( 'Élodie' , 'elo' ) ).toEqual( [ 0 ] ) ;
        expect( findInText( 'Réception' , 'RÉCEP' ) ).toEqual( [ 0 ] ) ;
    } ) ;

    test( 'occurrences do not overlap, and nothing is found for nothing' , () =>
    {
        expect( findInText( 'aaaa' , 'aa' ) ).toEqual( [ 0 , 2 ] ) ;
        expect( findInText( 'abc' , '' ) ).toEqual( [] ) ;
        expect( findInText( 'abc' , '   ' ) ).toEqual( [] ) ;
        expect( findInText( '' , 'a' ) ).toEqual( [] ) ;
        expect( findInText( undefined , 'a' ) ).toEqual( [] ) ;
    } ) ;

    test( 'folding keeps the length of a composed text, so an index is an index' , () =>
    {
        expect( foldText( 'Élodie' ).length ).toBe( 'Élodie'.length ) ;
        expect( foldText( 'ÀÉÎÕÜ ç' ) ).toBe( 'aeiou c' ) ;
    } ) ;
} ) ;
