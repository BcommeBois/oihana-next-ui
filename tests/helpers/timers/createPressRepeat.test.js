import { describe , expect , test } from 'bun:test' ;

import createPressRepeat , { PRESS_REPEAT_DELAY , PRESS_REPEAT_INTERVAL } from '../../../src/helpers/timers/createPressRepeat' ;

/**
 * A clock that only moves when told to.
 */
const fakeTimers = () =>
{
    let now  = 0 ;
    let next = 1 ;
    const pending = new Map() ;

    return {
        advance( ms )
        {
            const until = now + ms ;
            for ( ;; )
            {
                const due = [ ...pending ].filter( ( [ , { at } ] ) => at <= until ).sort( ( a , b ) => a[ 1 ].at - b[ 1 ].at )[ 0 ] ;
                if ( !due )
                {
                    break ;
                }
                const [ id , { at , fn } ] = due ;
                pending.delete( id ) ;
                now = at ;
                fn() ;
            }
            now = until ;
        } ,
        clearTimeout : id => pending.delete( id ) ,
        get pending()
        {
            return pending.size ;
        } ,
        setTimeout( fn , ms )
        {
            const id = next++ ;
            pending.set( id , { at : now + ms , fn } ) ;
            return id ;
        } ,
    } ;
} ;

/**
 * A counter as the action, refusing past `max`.
 */
const counter = ( max = Number.POSITIVE_INFINITY ) =>
{
    const state = { calls : 0 , value : 0 } ;
    state.action = () =>
    {
        state.calls++ ;
        if ( state.value + 1 > max )
        {
            return false ;
        }
        state.value++ ;
        return true ;
    } ;
    return state ;
} ;

describe( 'createPressRepeat' , () =>
{
    test( 'defaults : 400 ms before repeating, then every 100 ms' , () =>
    {
        expect( PRESS_REPEAT_DELAY ).toBe( 400 ) ;
        expect( PRESS_REPEAT_INTERVAL ).toBe( 100 ) ;
    } ) ;

    test( 'a press acts at once — a short tap is one step' , () =>
    {
        const timers = fakeTimers() ;
        const count  = counter() ;
        const repeat = createPressRepeat( { action : count.action , timers } ) ;

        expect( repeat.start() ).toBe( true ) ;
        expect( count.value ).toBe( 1 ) ;

        timers.advance( 150 ) ;
        repeat.stop() ;
        timers.advance( 2000 ) ;

        expect( count.value ).toBe( 1 ) ;
        expect( repeat.running ).toBe( false ) ;
    } ) ;

    test( 'held, it waits for the delay, then steps every interval' , () =>
    {
        const timers = fakeTimers() ;
        const count  = counter() ;
        const repeat = createPressRepeat( { action : count.action , timers } ) ;

        repeat.start() ;
        timers.advance( 399 ) ;
        expect( count.value ).toBe( 1 ) ;

        timers.advance( 1 ) ;
        expect( count.value ).toBe( 2 ) ;

        timers.advance( 1000 ) ;
        expect( count.value ).toBe( 12 ) ;
        expect( repeat.running ).toBe( true ) ;

        repeat.stop() ;
        timers.advance( 1000 ) ;
        expect( count.value ).toBe( 12 ) ;
        expect( timers.pending ).toBe( 0 ) ;
    } ) ;

    test( 'the delay and the interval are options' , () =>
    {
        const timers = fakeTimers() ;
        const count  = counter() ;
        const repeat = createPressRepeat( { action : count.action , delay : 200 , interval : 50 , timers } ) ;

        repeat.start() ;
        timers.advance( 200 + 50 * 4 ) ;
        expect( count.value ).toBe( 6 ) ;
        repeat.stop() ;
    } ) ;

    test( 'a refused step ends the repeat : the refusal happens once' , () =>
    {
        const timers = fakeTimers() ;
        const count  = counter( 3 ) ;
        const repeat = createPressRepeat( { action : count.action , timers } ) ;

        repeat.start() ;
        timers.advance( 5000 ) ;

        expect( count.value ).toBe( 3 ) ;
        expect( count.calls ).toBe( 4 ) ;
        expect( repeat.running ).toBe( false ) ;
        expect( timers.pending ).toBe( 0 ) ;
    } ) ;

    test( 'a press refused at once never starts repeating' , () =>
    {
        const timers = fakeTimers() ;
        const count  = counter( 0 ) ;
        const repeat = createPressRepeat( { action : count.action , timers } ) ;

        expect( repeat.start() ).toBe( false ) ;
        timers.advance( 5000 ) ;
        expect( count.calls ).toBe( 1 ) ;
        expect( timers.pending ).toBe( 0 ) ;
    } ) ;

    test( 'starting again restarts the delay, never runs two clocks' , () =>
    {
        const timers = fakeTimers() ;
        const count  = counter() ;
        const repeat = createPressRepeat( { action : count.action , timers } ) ;

        repeat.start() ;
        timers.advance( 300 ) ;
        repeat.start() ;
        expect( timers.pending ).toBe( 1 ) ;

        timers.advance( 300 ) ;
        expect( count.value ).toBe( 2 ) ;

        timers.advance( 100 ) ;
        expect( count.value ).toBe( 3 ) ;
        repeat.stop() ;
    } ) ;

    test( 'stopping twice, or before starting, is harmless' , () =>
    {
        const timers = fakeTimers() ;
        const repeat = createPressRepeat( { action : () => true , timers } ) ;

        repeat.stop() ;
        repeat.start() ;
        repeat.stop() ;
        repeat.stop() ;
        expect( repeat.running ).toBe( false ) ;
    } ) ;
} ) ;
