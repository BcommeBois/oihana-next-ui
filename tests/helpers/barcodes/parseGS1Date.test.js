import { describe , expect , test } from 'bun:test' ;

import parseGS1Date , { GS1_DATE_AIS } from '../../../src/helpers/barcodes/parseGS1Date' ;

const today = new Date( 2026 , 9 , 12 ) ;

describe( 'parseGS1Date' , () =>
{
    test( 'YYMMDD → YYYY-MM-DD' , () =>
    {
        expect( parseGS1Date( '261231' , { today } ) ).toBe( '2026-12-31' ) ;
        expect( parseGS1Date( '270115' , { today } ) ).toBe( '2027-01-15' ) ;
    } ) ;

    test( 'day 00 is the last day of the month, leap years included' , () =>
    {
        expect( parseGS1Date( '270400' , { today } ) ).toBe( '2027-04-30' ) ;
        expect( parseGS1Date( '270200' , { today } ) ).toBe( '2027-02-28' ) ;
        expect( parseGS1Date( '280200' , { today } ) ).toBe( '2028-02-29' ) ;
        expect( parseGS1Date( '261200' , { today } ) ).toBe( '2026-12-31' ) ;
    } ) ;

    test( 'the century slides around today, 51 ahead and 50 back' , () =>
    {
        expect( parseGS1Date( '751231' , { today } ) ).toBe( '2075-12-31' ) ;
        expect( parseGS1Date( '770101' , { today } ) ).toBe( '1977-01-01' ) ;
        expect( parseGS1Date( '991231' , { today } ) ).toBe( '1999-12-31' ) ;
        expect( parseGS1Date( '000101' , { today } ) ).toBe( '2000-01-01' ) ;
    } ) ;

    test( 'near the end of a century, early years are the next one' , () =>
    {
        const late = new Date( 2098 , 0 , 1 ) ;
        expect( parseGS1Date( '100101' , { today : late } ) ).toBe( '2110-01-01' ) ;
        expect( parseGS1Date( '500101' , { today : late } ) ).toBe( '2050-01-01' ) ;
        expect( parseGS1Date( '480101' , { today : late } ) ).toBe( '2148-01-01' ) ;
    } ) ;

    test( 'anything that is no date is null' , () =>
    {
        expect( parseGS1Date( '261301' , { today } ) ).toBeNull() ;
        expect( parseGS1Date( '260001' , { today } ) ).toBeNull() ;
        expect( parseGS1Date( '270230' , { today } ) ).toBeNull() ;
        expect( parseGS1Date( '270229' , { today } ) ).toBeNull() ;
        expect( parseGS1Date( '2612' , { today } ) ).toBeNull() ;
        expect( parseGS1Date( 'AB1231' , { today } ) ).toBeNull() ;
        expect( parseGS1Date( undefined , { today } ) ).toBeNull() ;
    } ) ;

    test( 'the AIs that carry a date' , () =>
    {
        expect( GS1_DATE_AIS ).toEqual( [ '11' , '12' , '13' , '15' , '16' , '17' ] ) ;
    } ) ;
} ) ;
