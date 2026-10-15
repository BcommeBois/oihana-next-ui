'use client' ;

/**
 * OutboxBanner — what the outbox holds, in a sentence : the actions waiting to
 * be sent, the ones refused, or (on demand) that everything left.
 *
 * Reads `useOutbox()` ; each prop given takes over from it — for a mock-up, a
 * test, or a queue the app keeps elsewhere. Nothing is shown while the queue is
 * empty, unless `showIdle`. Offline it says the actions will leave when the
 * network is back ; with refusals it says the first reason and offers `onOpen`
 * (the screen that lists them). A status read politely, never a toast : the
 * app toasts from `OutboxProvider`'s `onSettle` if it wants to.
 *
 * Place it where the app speaks of the page : under the navbar, over a form.
 *
 * @module display/OutboxBanner
 *
 * @param {Object} props
 * @param {string} [props.className] - Classes on the alert.
 * @param {number|Object[]} [props.conflicts] - Items in conflict, or their number : `[ { id , label , reason } ]`.
 * @param {boolean} [props.draining] - Whether a send is on its way.
 * @param {?number} [props.lastSyncAt] - The time of the last successful send (ms).
 * @param {boolean} [props.online] - The network state.
 * @param {Function} [props.onOpen] - `() => void` : opens the list. Without it, no button.
 * @param {string} [props.openLabel] - The button's label. Defaults to the i18n `banner.open` key.
 * @param {string} [props.path='components.outbox'] - i18n path the words are read from.
 * @param {number} [props.pending] - The actions waiting to be sent.
 * @param {Object<string, string>} [props.reasons] - The app's words for the API's codes.
 * @param {number|Object[]} [props.rejected] - Items refused (or blocked), or their number : `[ { id , label , reason } ]`.
 * @param {boolean} [props.showIdle=false] - Say so when everything left.
 *
 * @example
 * ```jsx
 * <OutboxBanner onOpen={ () => router.push( '/sync' ) } reasons={ { unit_already_consumed : 'colis déjà expédié' } } />
 * ```
 */

import format from 'vegas-js-core/src/strings/fastformat' ;

import Alert  from '../components/Alert' ;
import Button from '../components/Button' ;

import NO_LOCALE from '../contexts/locale/noLocale' ;
import useI18n   from '../contexts/locale/useI18n' ;
import useOutbox from '../contexts/outbox/useOutbox' ;

import outboxErrorText from '../helpers/outbox/outboxErrorText' ;

const FAILED = [ 'rejected' , 'conflict' , 'blocked' ] ;

const asList  = value => Array.isArray( value ) ? value : [] ;
const asCount = value => Array.isArray( value ) ? value.length : ( value ?? 0 ) ;

const OutboxBanner =
({
    className ,
    conflicts ,
    draining ,
    lastSyncAt ,
    online ,
    onOpen ,
    openLabel ,
    path = 'components.outbox' ,
    pending ,
    reasons ,
    rejected ,
    showIdle = false ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;
    const words  = labels.banner ?? {} ;

    const outbox = useOutbox() ;

    const scope = outbox?.scope ?? null ;
    const mine  = ( outbox?.items ?? [] ).filter( item => ( item.scope ?? null ) === scope ) ;

    const given = rejected !== undefined || conflicts !== undefined ;

    const failedCount = given
        ? asCount( rejected ) + asCount( conflicts )
        : mine.filter( item => FAILED.includes( item.status ) ).length ;

    const firstReason = given
        ? [ ...asList( rejected ) , ...asList( conflicts ) ][ 0 ]?.reason
        : outboxErrorText( mine.find( item => FAILED.includes( item.status ) ) , { errors : labels.errors , reasons } ) ;

    const waiting = pending ?? ( outbox ? outbox.counts.pending + outbox.counts.posting : 0 ) ;
    const isOnline = online ?? outbox?.online ?? true ;
    const sending  = draining ?? outbox?.draining ?? false ;
    const last     = lastSyncAt ?? outbox?.lastSyncAt ?? null ;

    let level ;
    let text ;

    if ( failedCount > 0 )
    {
        level = 'error' ;
        text  = failedCount === 1
            ? ( firstReason ? format( words.failedOne ?? '{0}' , firstReason ) : words.failedOneBare )
            : format( words.failedMany ?? '{0}' , failedCount ) ;
        if ( waiting > 0 )
        {
            text = `${ text } ${ format( words.andPending ?? '{0}' , waiting ) }` ;
        }
    }
    else if ( waiting > 0 && !isOnline )
    {
        level = 'warning' ;
        text  = waiting === 1 ? words.offlineOne : format( words.offlineMany ?? '{0}' , waiting ) ;
    }
    else if ( waiting > 0 )
    {
        level = 'info' ;
        text  = waiting === 1 ? words.pendingOne : format( words.pendingMany ?? '{0}' , waiting ) ;
        if ( sending )
        {
            text = `${ text } ${ words.sending ?? '' }` ;
        }
    }
    else if ( showIdle )
    {
        level = 'success' ;
        text  = words.idle ;
        if ( last )
        {
            text = `${ text } ${ format( words.lastSync ?? '{0}' , new Date( last ).toLocaleTimeString( undefined , { hour : '2-digit' , minute : '2-digit' } ) ) }` ;
        }
    }
    else
    {
        return null ;
    }

    return (
        <Alert
            aria-live       = "polite"
            className       = { className }
            level           = { level }
            option          = { onOpen && level !== 'success' && (
                <Button className="shrink-0" onClick={ onOpen } size="sm">{ openLabel ?? words.open }</Button>
            ) }
            role            = "status"
            showCloseButton = { false }
            style           = "soft"
        >
            { text }
        </Alert>
    ) ;
} ;

OutboxBanner.displayName = 'OutboxBanner' ;

export default OutboxBanner ;
