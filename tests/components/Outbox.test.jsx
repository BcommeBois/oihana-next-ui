import '../support/react' ;

import { describe , expect , test } from 'bun:test' ;

import { renderToStaticMarkup } from 'react-dom/server' ;

import LocaleContext from '../../src/contexts/locale/context' ;
import OutboxContext from '../../src/contexts/outbox/context' ;

import OutboxBanner from '../../src/display/OutboxBanner' ;
import OutboxList   from '../../src/display/OutboxList' ;

import outboxErrorText from '../../src/helpers/outbox/outboxErrorText' ;

import outboxLocale from '../../src/@locale/components/outbox' ;

const words = outboxLocale.fr ;

const locale = { getLocale : ( path , fallback ) => path === 'components.outbox' ? words : fallback } ;

const counts = ( init = {} ) => ( { blocked : 0 , conflict : 0 , done : 0 , other : 0 , pending : 0 , posting : 0 , rejected : 0 , total : 0 , ...init } ) ;

const item = ( id , init = {} ) => ( { after : [] , attempts : 0 , dependsOn : [] , id , kind : 'receipts' , lastError : null , nextAttemptAt : 0 , scope : null , status : 'pending' , target : null , ...init } ) ;

const render = ( node , outbox = null ) => renderToStaticMarkup(
    <LocaleContext value={ locale }>
        <OutboxContext value={ outbox }>{ node }</OutboxContext>
    </LocaleContext>
) ;

const outbox = ( items , init = {} ) =>
({
    counts     : counts( { pending : items.filter( one => one.status === 'pending' ).length } ) ,
    draining   : false ,
    items ,
    lastSyncAt : null ,
    online     : true ,
    scope      : null ,
    ...init ,
}) ;

describe( 'outboxErrorText' , () =>
{
    const errors = words.errors ;

    test( 'the app’s words first, then the library’s, then the server’s' , () =>
    {
        const refused = item( 'a' , { lastError : { code : 'unit_already_consumed' , message : 'Already shipped' , status : 422 } , status : 'rejected' } ) ;
        expect( outboxErrorText( refused , { errors , reasons : { unit_already_consumed : 'Colis déjà expédié' } } ) ).toBe( 'Colis déjà expédié' ) ;
        expect( outboxErrorText( refused , { errors } ) ).toBe( 'Already shipped' ) ;
        expect( outboxErrorText( item( 'b' , { lastError : { code : 'network' , status : 0 } } ) , { errors } ) ).toBe( errors.network ) ;
        expect( outboxErrorText( item( 'c' , { lastError : { code : 'server_error' , exhausted : true , status : 500 } } ) , { errors } ) ).toBe( errors.exhausted ) ;
        expect( outboxErrorText( item( 'd' , { status : 'blocked' } ) , { errors } ) ).toBe( errors.blocked ) ;
        expect( outboxErrorText( item( 'e' ) , { errors } ) ).toBeNull() ;
    } ) ;
} ) ;

describe( 'OutboxBanner' , () =>
{
    test( 'nothing while the queue is empty ; the idle sentence on demand' , () =>
    {
        expect( render( <OutboxBanner /> , outbox( [] ) ) ).toBe( '' ) ;
        const idle = render( <OutboxBanner showIdle /> , outbox( [] ) ) ;
        expect( idle ).toContain( words.banner.idle ) ;
        expect( idle ).toContain( 'alert-success' ) ;
        expect( idle ).toContain( 'role="status"' ) ;
    } ) ;

    test( 'waiting online is info, offline a warning' , () =>
    {
        const items = [ item( 'a' ) , item( 'b' ) ] ;
        expect( render( <OutboxBanner /> , outbox( items ) ) ).toContain( '2 actions en attente d’envoi.' ) ;
        const away = render( <OutboxBanner /> , outbox( items , { online : false } ) ) ;
        expect( away ).toContain( 'alert-warning' ) ;
        expect( away ).toContain( 'Hors ligne · 2 actions en attente' ) ;
    } ) ;

    test( 'a refusal gives its reason and a button when onOpen is given' , () =>
    {
        const items = [ item( 'a' , { lastError : { code : 'unit_already_consumed' , status : 422 } , status : 'rejected' } ) , item( 'b' ) ] ;
        const markup = render( <OutboxBanner onOpen={ () => {} } reasons={ { unit_already_consumed : 'colis déjà expédié' } } /> , outbox( items ) ) ;
        expect( markup ).toContain( 'alert-error' ) ;
        expect( markup ).toContain( '1 action refusée : colis déjà expédié 1 en attente.' ) ;
        expect( markup ).toContain( `>${ words.banner.open }</button>` ) ;
    } ) ;

    test( 'props take over, without any provider' , () =>
    {
        const markup = render( <OutboxBanner online={ false } pending={ 7 } /> ) ;
        expect( markup ).toContain( 'Hors ligne · 7 actions en attente' ) ;
        const refused = render( <OutboxBanner rejected={ [ { id : 'x' , label : 'Colis 2116318' , reason : 'colis déjà expédié' } ] } /> ) ;
        expect( refused ).toContain( '1 action refusée : colis déjà expédié' ) ;
    } ) ;

    test( 'the items of another account do not count' , () =>
    {
        const items = [ item( 'a' , { scope : 'B' , status : 'rejected' } ) ] ;
        expect( render( <OutboxBanner /> , outbox( items , { scope : 'A' } ) ) ).toBe( '' ) ;
    } ) ;
} ) ;

describe( 'OutboxList' , () =>
{
    test( 'newest first, named by kind, with the actions each status allows' , () =>
    {
        const items =
        [
            item( 'old' , { status : 'done' } ) ,
            item( 'mid' , { lastError : { code : 'network' , status : 0 } , status : 'rejected' , target : 'PO-118' } ) ,
            item( 'new' , { status : 'posting' } ) ,
        ] ;
        const markup = render( <OutboxList labels={ { receipts : 'Réception' } } onOpen={ () => {} } /> , outbox( items ) ) ;

        expect( markup.indexOf( words.statuses.posting ) ).toBeLessThan( markup.indexOf( words.statuses.rejected ) ) ;
        expect( markup.indexOf( words.statuses.rejected ) ).toBeLessThan( markup.indexOf( words.statuses.done ) ) ;
        expect( markup ).toContain( 'Réception' ) ;
        expect( markup ).toContain( 'PO-118' ) ;
        expect( markup ).toContain( words.errors.network ) ;
        expect( markup.match( new RegExp( `>${ words.list.retry }<` , 'g' ) ) ).toHaveLength( 1 ) ;
        expect( markup.match( new RegExp( `>${ words.list.open }<` , 'g' ) ) ).toHaveLength( 1 ) ;
        expect( markup.match( new RegExp( `>${ words.list.remove }<` , 'g' ) ) ).toHaveLength( 1 ) ;
    } ) ;

    test( 'another account apart, untouchable ; an empty queue says so' , () =>
    {
        const markup = render( <OutboxList /> , outbox( [ item( 'a' , { scope : 'B' , status : 'rejected' } ) ] , { scope : 'A' } ) ) ;
        expect( markup ).toContain( words.list.otherScope ) ;
        expect( markup ).not.toContain( words.list.retry ) ;
        expect( render( <OutboxList /> , outbox( [] ) ) ).toContain( words.list.empty ) ;
    } ) ;
} ) ;
