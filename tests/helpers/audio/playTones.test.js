import { describe , expect , test } from 'bun:test' ;

import playTones , { DEFAULT_SIGNALS , RAMP } from '../../../src/helpers/audio/playTones' ;

/**
 * A fake audio context that records what it is asked to do.
 */
const recorder = ( currentTime = 10 ) =>
{
    const log = [] ;

    const param = ( node , name ) => (
    {
        linearRampToValueAtTime : ( value , time ) => log.push( [ node , name , 'ramp' , value , time ] ) ,
        setValueAtTime          : ( value , time ) => log.push( [ node , name , 'set' , value , time ] ) ,
    } ) ;

    let count = 0 ;

    const context =
    {
        createGain : () =>
        {
            const id = `gain${ count++ }` ;
            return { connect : target => log.push( [ id , 'connect' , target ] ) , gain : param( id , 'gain' ) } ;
        } ,
        createOscillator : () =>
        {
            const id = `osc${ count++ }` ;
            const node =
            {
                connect   : target => log.push( [ id , 'connect' , target === context.destination ? 'destination' : 'gain' ] ) ,
                frequency : param( id , 'frequency' ) ,
                start     : time => log.push( [ id , 'start' , time ] ) ,
                stop      : time => log.push( [ id , 'stop' , time ] ) ,
            } ;
            Object.defineProperty( node , 'type' , { set : value => log.push( [ id , 'type' , value ] ) } ) ;
            return node ;
        } ,
        currentTime ,
        destination : 'destination' ,
    } ;

    return { context , log } ;
} ;

const entries = ( log , kind ) => log.filter( entry => entry[ 1 ] === kind ) ;

describe( 'playTones' , () =>
{
    test( 'one oscillator per tone, through a gain, to the speakers' , () =>
    {
        const { context , log } = recorder() ;

        playTones( context , DEFAULT_SIGNALS.warning.tones ) ;

        expect( entries( log , 'start' ) ).toHaveLength( 2 ) ;
        expect( entries( log , 'connect' ) ).toEqual(
        [
            [ 'osc0' , 'connect' , 'gain' ] , [ 'gain1' , 'connect' , 'destination' ] ,
            [ 'osc2' , 'connect' , 'gain' ] , [ 'gain3' , 'connect' , 'destination' ] ,
        ] ) ;
    } ) ;

    test( 'tones follow each other, the gap before each, in seconds from now' , () =>
    {
        const { context , log } = recorder( 10 ) ;

        const end = playTones( context , DEFAULT_SIGNALS.warning.tones ) ;

        expect( entries( log , 'start' ).map( entry => entry[ 2 ] ) ).toEqual( [ 10 , expect.closeTo( 10.14 , 6 ) ] ) ;
        expect( entries( log , 'stop' ).map( entry => entry[ 2 ] ) ).toEqual( [ expect.closeTo( 10.08 , 6 ) , expect.closeTo( 10.22 , 6 ) ] ) ;
        expect( end ).toBeCloseTo( 10.22 , 6 ) ;
    } ) ;

    test( 'every tone fades in and out, so it does not click' , () =>
    {
        const { context , log } = recorder( 0 ) ;

        playTones( context , [ { duration : 100 , frequency : 440 } ] , { volume : 0.5 } ) ;

        expect( log.filter( entry => entry[ 1 ] === 'gain' ).map( entry => entry.slice( 2 ) ) ).toEqual(
        [
            [ 'set'  , 0   , 0 ] ,
            [ 'ramp' , 0.5 , RAMP ] ,
            [ 'set'  , 0.5 , expect.closeTo( 0.1 - RAMP , 6 ) ] ,
            [ 'ramp' , 0   , expect.closeTo( 0.1 , 6 ) ] ,
        ] ) ;
    } ) ;

    test( 'a square wave is played softer than a sine at the same volume' , () =>
    {
        const { context , log } = recorder( 0 ) ;

        playTones( context , [ { duration : 100 , frequency : 220 , type : 'square' } ] , { volume : 1 } ) ;

        expect( log.find( entry => entry[ 2 ] === 'ramp' )[ 3 ] ).toBe( 0.4 ) ;
        expect( log ).toContainEqual( [ 'osc0' , 'type' , 'square' ] ) ;
    } ) ;

    test( 'the volume is held between 0 and 1' , () =>
    {
        const peak = volume =>
        {
            const { context , log } = recorder( 0 ) ;
            playTones( context , [ { duration : 50 , frequency : 440 } ] , { volume } ) ;
            return log.find( entry => entry[ 2 ] === 'ramp' )[ 3 ] ;
        } ;

        expect( peak( 3 ) ).toBe( 1 ) ;
        expect( peak( -1 ) ).toBe( 0 ) ;
        expect( peak( Number.NaN ) ).toBe( 0.6 ) ;
    } ) ;

    test( 'a start time can be given' , () =>
    {
        const { context , log } = recorder( 0 ) ;

        playTones( context , [ { duration : 50 , frequency : 440 } ] , { at : 2 } ) ;

        expect( entries( log , 'start' ) ).toEqual( [ [ 'osc0' , 'start' , 2 ] ] ) ;
    } ) ;

    test( 'no tone, nothing scheduled' , () =>
    {
        const { context , log } = recorder( 5 ) ;

        expect( playTones( context , [] ) ).toBe( 5 ) ;
        expect( log ).toHaveLength( 0 ) ;
    } ) ;
} ) ;

describe( 'DEFAULT_SIGNALS' , () =>
{
    test( 'success, warning and error, each heard and felt' , () =>
    {
        expect( Object.keys( DEFAULT_SIGNALS ) ).toEqual( [ 'success' , 'warning' , 'error' ] ) ;

        for ( const { tones , vibration } of Object.values( DEFAULT_SIGNALS ) )
        {
            expect( tones.length ).toBeGreaterThan( 0 ) ;
            expect( vibration ).toBeDefined() ;
        }
    } ) ;

    test( 'told apart by ear : one high beep, two beeps, one long low buzz' , () =>
    {
        const { error , success , warning } = DEFAULT_SIGNALS ;

        expect( success.tones ).toHaveLength( 1 ) ;
        expect( warning.tones ).toHaveLength( 2 ) ;
        expect( error.tones[ 0 ].frequency ).toBeLessThan( success.tones[ 0 ].frequency ) ;
        expect( error.tones[ 0 ].duration ).toBeGreaterThan( success.tones[ 0 ].duration ) ;
    } ) ;
} ) ;
