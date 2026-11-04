import { describe , expect , test } from 'bun:test' ;

import nextTrail        from '../../../src/helpers/routes/nextTrail' ;
import pathnameOf       from '../../../src/helpers/routes/pathnameOf' ;
import resolveOriginUrl from '../../../src/helpers/routes/resolveOriginUrl' ;
import resolveSmartHref from '../../../src/helpers/routes/resolveSmartHref' ;

describe( 'pathnameOf' , () =>
{
    test( 'drops the query and the hash' , () =>
    {
        expect( pathnameOf( '/articles?offset=40#top' ) ).toBe( '/articles' ) ;
        expect( pathnameOf( '/articles' ) ).toBe( '/articles' ) ;
    } ) ;

    test( 'still serves resolveSmartHref' , () =>
    {
        expect( resolveSmartHref( '/articles?offset=40' , '/articles' ) ).toBe( '/articles?offset=40' ) ;
        expect( resolveSmartHref( '/team' , '/articles' ) ).toBe( '/articles' ) ;
    } ) ;
} ) ;

describe( 'nextTrail' , () =>
{
    test( 'pushes a new page' , () =>
    {
        expect( nextTrail( [ '/home' , '/articles' ] , '/articles/12' , 20 ) ).toEqual( [ '/home' , '/articles' , '/articles/12' ] ) ;
    } ) ;

    test( 'replaces the last entry on a query-only move' , () =>
    {
        expect( nextTrail( [ '/home' , '/articles' ] , '/articles?offset=40' , 20 ) ).toEqual( [ '/home' , '/articles?offset=40' ] ) ;
    } ) ;

    test( 'pushes a link to a page seen earlier : a new step, not a return' , () =>
    {
        expect( nextTrail( [ '/home' , '/articles/12' , '/team/7' ] , '/articles/12' , 20 ) ).toEqual( [ '/home' , '/articles/12' , '/team/7' , '/articles/12' ] ) ;
    } ) ;

    test( 'cuts back on a move through the browser history' , () =>
    {
        expect( nextTrail( [ '/home' , '/articles/12' , '/team/7' ] , '/articles/12' , 20 , { pop : true } ) ).toEqual( [ '/home' , '/articles/12' ] ) ;
        expect( nextTrail( [ '/home' , '/articles?offset=40' , '/articles/12' ] , '/articles?offset=0' , 20 , { pop : true } ) ).toEqual( [ '/home' , '/articles?offset=0' ] ) ;
    } ) ;

    test( 'pushes a history move to a page the trail no longer holds' , () =>
    {
        expect( nextTrail( [ '/articles/12' ] , '/home' , 20 , { pop : true } ) ).toEqual( [ '/articles/12' , '/home' ] ) ;
    } ) ;

    test( 'keeps no more than the limit' , () =>
    {
        expect( nextTrail( [ '/a' , '/b' , '/c' ] , '/d' , 3 ) ).toEqual( [ '/b' , '/c' , '/d' ] ) ;
    } ) ;

    test( 'hands the same trail back when nothing changes' , () =>
    {
        const trail = [ '/home' , '/articles?offset=40' ] ;
        expect( nextTrail( trail , '/articles?offset=40' , 20 ) ).toBe( trail ) ;
    } ) ;

    test( 'keeps nothing without a limit' , () =>
    {
        const trail = [] ;
        expect( nextTrail( trail , '/home' , 0 ) ).toBe( trail ) ;
    } ) ;
} ) ;

describe( 'resolveOriginUrl' , () =>
{
    test( 'answers the page before the records, past every sibling' , () =>
    {
        expect( resolveOriginUrl( [ '/team/7' , '/articles/12' , '/articles/31' ] , '/articles' ) ).toBe( '/team/7' ) ;
    } ) ;

    test( 'keeps the query of the origin' , () =>
    {
        expect( resolveOriginUrl( [ '/team?sort=name' , '/articles/12' ] , '/articles' ) ).toBe( '/team?sort=name' ) ;
    } ) ;

    test( 'answers null when the reader came through the list' , () =>
    {
        expect( resolveOriginUrl( [ '/team/7' , '/articles?offset=40' , '/articles/12' ] , '/articles' ) ).toBeNull() ;
        expect( resolveOriginUrl( [ '/articles/' , '/articles/12' ] , '/articles' ) ).toBeNull() ;
    } ) ;

    test( 'answers null on a fresh entry or without a trail' , () =>
    {
        expect( resolveOriginUrl( [ '/articles/12' ] , '/articles' ) ).toBeNull() ;
        expect( resolveOriginUrl( [] , '/articles' ) ).toBeNull() ;
        expect( resolveOriginUrl( undefined , '/articles' ) ).toBeNull() ;
    } ) ;

    test( 'does not take a longer path sharing the prefix for a sibling' , () =>
    {
        expect( resolveOriginUrl( [ '/articles-archive/3' , '/articles/12' ] , '/articles' ) ).toBe( '/articles-archive/3' ) ;
    } ) ;

    test( 'scopes nothing useful under the root' , () =>
    {
        expect( resolveOriginUrl( [ '/team/7' , '/articles/12' ] , '/' ) ).toBeNull() ;
    } ) ;

    test( 'a record opened again from another page comes from that page' , () =>
    {
        let trail = [] ;
        for ( const url of [ '/articles' , '/articles/12' , '/team/7' , '/articles/12' ] )
        {
            trail = nextTrail( trail , url , 20 ) ;
        }
        expect( resolveOriginUrl( trail , '/articles' ) ).toBe( '/team/7' ) ;
    } ) ;

    test( 'the browser back button restores the origin it left' , () =>
    {
        let trail = [] ;
        for ( const url of [ '/team/7' , '/articles/12' , '/articles/31' ] )
        {
            trail = nextTrail( trail , url , 20 ) ;
        }
        trail = nextTrail( trail , '/articles/12' , 20 , { pop : true } ) ;
        expect( trail ).toEqual( [ '/team/7' , '/articles/12' ] ) ;
        expect( resolveOriginUrl( trail , '/articles' ) ).toBe( '/team/7' ) ;

        trail = nextTrail( trail , '/team/7' , 20 , { pop : true } ) ;
        expect( trail ).toEqual( [ '/team/7' ] ) ;
        expect( resolveOriginUrl( trail , '/team' ) ).toBeNull() ;
    } ) ;
} ) ;
