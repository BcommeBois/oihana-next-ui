import '../support/react' ;

import { describe , expect , test } from 'bun:test' ;

import { renderToStaticMarkup } from 'react-dom/server' ;

import Timeline     from '../../src/components/timeline/Timeline' ;
import TimelineItem from '../../src/components/timeline/TimelineItem' ;

const items =
[
    { id : 'a' , status : 'done'    , time : '2026-10-10T09:12:00Z' , title : 'Ordered' } ,
    { id : 'b' , status : 'current' , title : 'Shipped' } ,
    { id : 'c' , title : 'Delivered' } ,
] ;

describe( 'Timeline' , () =>
{
    test( 'a named list, vertical, one li per item, a time element with its ISO value' , () =>
    {
        const markup = renderToStaticMarkup( <Timeline ariaLabel="Order" items={ items } /> ) ;

        expect( markup ).toContain( '<ul aria-label="Order" class="timeline timeline-vertical"' ) ;
        expect( markup.match( /<li/g ) ).toHaveLength( 3 ) ;
        expect( markup ).toContain( 'dateTime="2026-10-10T09:12:00.000Z"' ) ;
        expect( markup ).toContain( 'timeline-box' ) ;
    } ) ;

    test( 'the line is coloured up to a done entry, the current one is announced, the first and last have one hr' , () =>
    {
        const markup = renderToStaticMarkup( <Timeline items={ items } /> ) ;
        const lis    = markup.split( '<li' ).slice( 1 ) ;

        expect( lis[ 0 ].match( /<hr/g ) ).toHaveLength( 1 ) ;
        expect( lis[ 0 ] ).toContain( 'class="bg-primary"' ) ;
        expect( lis[ 1 ] ).toContain( 'aria-current="step"' ) ;
        expect( lis[ 1 ].match( /<hr/g ) ).toHaveLength( 2 ) ;
        expect( lis[ 1 ] ).toContain( 'ring-primary' ) ;
        expect( lis[ 2 ].match( /<hr/g ) ).toHaveLength( 1 ) ;
        expect( lis[ 2 ] ).not.toContain( 'bg-primary' ) ;
    } ) ;

    test( 'orientation, compact, responsive, snap and alternate sides' , () =>
    {
        expect( renderToStaticMarkup( <Timeline items={ items } orientation="horizontal" snapIcon /> ) ).toContain( 'timeline-horizontal timeline-snap-icon' ) ;
        expect( renderToStaticMarkup( <Timeline compact items={ items } /> ) ).toContain( 'timeline-compact' ) ;
        expect( renderToStaticMarkup( <Timeline items={ items } responsive /> ) ).toContain( 'max-md:timeline-compact' ) ;

        const alternate = renderToStaticMarkup( <Timeline items={ items } side="alternate" /> ) ;
        const lis = alternate.split( '<li' ).slice( 1 ) ;

        expect( lis[ 0 ].indexOf( 'timeline-start' ) ).toBeLessThan( lis[ 0 ].indexOf( 'Ordered' ) ) ;
        expect( lis[ 0 ] ).toContain( 'timeline-box' ) ;
        expect( lis[ 0 ].indexOf( 'Ordered' ) ).toBeLessThan( lis[ 0 ].indexOf( 'timeline-middle' ) ) ;
    } ) ;

    test( 'composable children get their rank, and a title with href or onClick is a link or a button' , () =>
    {
        const markup = renderToStaticMarkup(
            <Timeline box={ false }>
                <TimelineItem href="/orders/1" status="done" title="Ordered" />
                <TimelineItem onClick={ () => {} } title="Shipped" />
            </Timeline>
        ) ;

        expect( markup ).toContain( 'href="/orders/1"' ) ;
        expect( markup ).toContain( '<button' ) ;
        expect( markup ).not.toContain( 'timeline-box' ) ;
        expect( markup.match( /<hr/g ) ).toHaveLength( 2 ) ;
    } ) ;
} ) ;
