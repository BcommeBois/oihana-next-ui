import '../support/react' ;

import { describe , expect , test } from 'bun:test' ;

import { renderToStaticMarkup } from 'react-dom/server' ;

import NumberRating from '../../src/components/rating/NumberRating' ;
import Rating       from '../../src/components/rating/Rating' ;

import LangContext from '../../src/contexts/lang/context' ;

/** Every `aria-label` of the markup, in order. */
const labels = markup => [ ...markup.matchAll( /aria-label="([^"]*)"/g ) ].map( match => match[ 1 ] ) ;

describe( 'NumberRating labels' , () =>
{
    test( 'each button says « n out of count », never « stars »' , () =>
    {
        const markup = renderToStaticMarkup( <NumberRating count={ 3 } /> ) ;
        expect( labels( markup ) ).toEqual( [ '1 out of 3' , '2 out of 3' , '3 out of 3' ] ) ;
        expect( markup ).not.toContain( 'star' ) ;
    } ) ;

    test( 'the group is named by ariaLabel, an item by itemLabel' , () =>
    {
        const markup = renderToStaticMarkup( <NumberRating ariaLabel="Quality" count={ 2 } itemLabel={ value => `Level ${ value }` } /> ) ;
        expect( markup ).toContain( 'role="group"' ) ;
        expect( labels( markup ) ).toEqual( [ 'Quality' , 'Level 1' , 'Level 2' ] ) ;
    } ) ;
} ) ;

describe( 'Rating labels' , () =>
{
    test( 'radios in a radiogroup, and a clear radio that says what it does' , () =>
    {
        const markup = renderToStaticMarkup( <Rating count={ 2 } name="quality" /> ) ;
        expect( markup ).toContain( 'role="radiogroup"' ) ;
        expect( labels( markup ) ).toEqual( [ 'Clear the rating' , '1 out of 2' , '2 out of 2' ] ) ;
    } ) ;

    test( 'a half value is written in the language on screen' , () =>
    {
        const markup = renderToStaticMarkup(
            <LangContext value={ { lang : 'fr' } }>
                <Rating count={ 2 } half name="quality" />
            </LangContext>
        ) ;
        expect( labels( markup ) ).toContain( '1,5 out of 2' ) ;
    } ) ;

    test( 'read-only, the value is one image read at once' , () =>
    {
        const markup = renderToStaticMarkup( <Rating count={ 5 } name="quality" readOnly value={ 4 } /> ) ;
        expect( markup ).toContain( 'role="img"' ) ;
        expect( labels( markup ) ).toEqual( [ 'Rated 4 out of 5' ] ) ;
        expect( markup.match( /aria-hidden="true"/g ) ).toHaveLength( 5 ) ;
    } ) ;

    test( 'read-only and named, it says what is rated' , () =>
    {
        const markup = renderToStaticMarkup( <Rating ariaLabel="Quality" count={ 5 } name="quality" readOnly value={ 4 } /> ) ;
        expect( labels( markup ) ).toEqual( [ 'Quality: 4 out of 5' ] ) ;
    } ) ;
} ) ;
