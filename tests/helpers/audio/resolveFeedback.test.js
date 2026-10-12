import { describe , expect , test } from 'bun:test' ;

import resolveFeedback , { DEFAULT_VOLUME } from '../../../src/helpers/audio/resolveFeedback' ;

describe( 'resolveFeedback' , () =>
{
    test( 'without settings — no provider — what the screen asks for goes through' , () =>
    {
        expect( resolveFeedback( null ) ).toEqual( { sound : true , vibration : true , volume : DEFAULT_VOLUME } ) ;
        expect( resolveFeedback( null , { sound : false , volume : 0.2 } ) ).toEqual( { sound : false , vibration : true , volume : 0.2 } ) ;
    } ) ;

    test( 'the settings are a master switch : off there is off, whatever the screen asks' , () =>
    {
        expect( resolveFeedback( { sound : false , vibration : false } , { sound : true , vibration : true } ) ).toEqual( { sound : false , vibration : false , volume : DEFAULT_VOLUME } ) ;
    } ) ;

    test( 'a screen can silence what the settings allow' , () =>
    {
        expect( resolveFeedback( { sound : true , vibration : true } , { sound : false } ) ).toEqual( { sound : false , vibration : true , volume : DEFAULT_VOLUME } ) ;
    } ) ;

    test( 'sound and vibration are switched apart' , () =>
    {
        expect( resolveFeedback( { sound : false , vibration : true } ) ).toEqual( { sound : false , vibration : true , volume : DEFAULT_VOLUME } ) ;
        expect( resolveFeedback( { sound : true , vibration : false } ) ).toEqual( { sound : true , vibration : false , volume : DEFAULT_VOLUME } ) ;
    } ) ;

    test( 'the volume is the screen’s when it names one, the settings’ otherwise' , () =>
    {
        expect( resolveFeedback( { volume : 0.3 } , { volume : 0.9 } ).volume ).toBe( 0.9 ) ;
        expect( resolveFeedback( { volume : 0.3 } ).volume ).toBe( 0.3 ) ;
        expect( resolveFeedback( { volume : 0.3 } , { volume : undefined } ).volume ).toBe( 0.3 ) ;
    } ) ;
} ) ;
