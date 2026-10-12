import { afterAll , describe , expect , test } from 'bun:test' ;

import {
    RESUME_WAIT ,
    getAudioContext ,
    hasAudio ,
    isAudioRunning ,
    resumeAudio ,
    subscribeAudio ,
} from '../../../src/helpers/audio/sharedAudioContext' ;

// The module keeps one context for the whole page : these tests run in order,
// without Web Audio first, then with a fake one.

let resumes = 'pending' ;

class FakeAudioContext
{
    static created = 0 ;

    constructor()
    {
        FakeAudioContext.created++ ;
        this.state = 'suspended' ;
    }

    addEventListener() {}

    resume()
    {
        if ( resumes === 'pending' )
        {
            return new Promise( () => {} ) ;
        }
        this.state = 'running' ;
        return Promise.resolve() ;
    }
}

describe( 'sharedAudioContext' , () =>
{
    afterAll( () =>
    {
        delete globalThis.AudioContext ;
    } ) ;

    test( 'without Web Audio : no context, no sound, no error' , async () =>
    {
        expect( hasAudio() ).toBe( false ) ;
        expect( getAudioContext() ).toBeNull() ;
        expect( await resumeAudio() ).toBe( false ) ;
        expect( isAudioRunning() ).toBe( false ) ;
    } ) ;

    test( 'one context for the page, created on first request' , () =>
    {
        globalThis.AudioContext = FakeAudioContext ;

        const first = getAudioContext() ;

        expect( first ).toBeInstanceOf( FakeAudioContext ) ;
        expect( getAudioContext() ).toBe( first ) ;
        expect( FakeAudioContext.created ).toBe( 1 ) ;
    } ) ;

    test( 'a resume left pending — outside a gesture — is a no, not a sound for later' , async () =>
    {
        resumes = 'pending' ;

        const started = Date.now() ;
        const running = await resumeAudio() ;

        expect( running ).toBe( false ) ;
        expect( Date.now() - started ).toBeGreaterThanOrEqual( RESUME_WAIT - 20 ) ;
    } ) ;

    test( 'a resume allowed runs the context and tells the subscribers' , async () =>
    {
        resumes = 'allowed' ;

        let told = 0 ;
        const unsubscribe = subscribeAudio( () => told++ ) ;

        expect( await resumeAudio() ).toBe( true ) ;
        expect( isAudioRunning() ).toBe( true ) ;
        expect( told ).toBe( 1 ) ;

        unsubscribe() ;
        await resumeAudio() ;
        expect( told ).toBe( 1 ) ;
    } ) ;

    test( 'ignoreSilentMode sets the audio session to playback where there is one' , async () =>
    {
        const audioSession = { type : 'auto' } ;
        const navigator    = globalThis.navigator ;

        Object.defineProperty( globalThis , 'navigator' , { configurable : true , value : { audioSession } } ) ;

        await resumeAudio( { ignoreSilentMode : true } ) ;
        expect( audioSession.type ).toBe( 'playback' ) ;

        Object.defineProperty( globalThis , 'navigator' , { configurable : true , value : navigator } ) ;
    } ) ;
} ) ;
