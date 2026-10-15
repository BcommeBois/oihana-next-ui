'use client' ;

/**
 * OutboxList — the actions of the outbox, newest first : what each one is, its
 * status, why it did not leave, and what can be done about it.
 *
 * Reads `useOutbox()`. The library knows kinds, not business : `labels` names
 * a kind (`receipts` → « Réception »), `describe( item )` says more (« Réception
 * PO-118, 12 colis »). **Retry** sends a refused, conflicting or blocked action
 * again ; **Abandon** removes one after a second press (no dialog on a hand-held
 * screen) ; **Open** hands a sent one to `onOpen` — the record it created is in
 * `item.result`. The actions of another account are listed apart, untouchable :
 * they leave when that account signs in again.
 *
 * @module display/OutboxList
 *
 * @param {Object} props
 * @param {string} [props.className] - Classes on the list.
 * @param {Function} [props.describe] - `( item ) => ReactNode`, the line of an action.
 * @param {Object[]} [props.items] - The items to list ; the outbox's by default.
 * @param {Object<string, string>} [props.labels] - The name of each kind.
 * @param {Function} [props.onOpen] - `( item ) => void` for a sent action. Without it, no button.
 * @param {string} [props.path='components.outbox'] - i18n path the words are read from.
 * @param {Object<string, string>} [props.reasons] - The app's words for the API's codes.
 * @param {string[]} [props.statuses] - The statuses shown ; all by default.
 *
 * @example
 * ```jsx
 * <OutboxList
 *     labels   = { { receipts : 'Réception' , counts : 'Comptage' } }
 *     onOpen   = { item => router.push( `/receipts/${ item.result.id }` ) }
 *     reasons  = { { unit_already_consumed : 'Colis déjà expédié' } }
 * />
 * ```
 */

import { useEffect , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Badge  from '../components/Badge' ;
import Button from '../components/Button' ;

import NO_LOCALE from '../contexts/locale/noLocale' ;
import useI18n   from '../contexts/locale/useI18n' ;
import useOutbox from '../contexts/outbox/useOutbox' ;

import outboxErrorText from '../helpers/outbox/outboxErrorText' ;

import cn from '../themes/helpers/cn' ;

const COLORS = { blocked : 'neutral' , conflict : 'warning' , done : 'success' , pending : 'info' , posting : 'primary' , rejected : 'error' } ;

const RETRYABLE = [ 'rejected' , 'conflict' , 'blocked' ] ;

const CONFIRM_FOR = 3000 ;

/**
 * A button that asks twice : the first press arms it for a few seconds, the
 * second acts.
 *
 * @param {Object} props
 * @param {string} props.confirmLabel
 * @param {string} props.label
 * @param {Function} props.onConfirm
 */
const ConfirmButton = ( { confirmLabel , label , onConfirm } ) =>
{
    const [ armed , setArmed ] = useState( false ) ;

    useEffect( () =>
    {
        if ( !armed )
        {
            return undefined ;
        }
        const timer = setTimeout( () => setArmed( false ) , CONFIRM_FOR ) ;
        return () => clearTimeout( timer ) ;
    }
    , [ armed ] ) ;

    return (
        <Button
            color   = "error"
            onClick = { () => armed ? onConfirm() : setArmed( true ) }
            size    = "xs"
            style   = { armed ? undefined : 'ghost' }
        >
            { armed ? confirmLabel : label }
        </Button>
    ) ;
} ;

/**
 * The time, ticking every second while an item waits for its next attempt.
 *
 * @param {Object[]} items
 * @returns {number}
 */
const useNow = items =>
{
    const [ now , setNow ] = useState( 0 ) ;

    const waiting = items.some( item => item.status === 'pending' && item.nextAttemptAt > Date.now() ) ;

    useEffect( () =>
    {
        setNow( Date.now() ) ;
        if ( !waiting )
        {
            return undefined ;
        }
        const timer = setInterval( () => setNow( Date.now() ) , 1000 ) ;
        return () => clearInterval( timer ) ;
    }
    , [ waiting ] ) ;

    return now ;
} ;

const OutboxList =
({
    className ,
    describe ,
    items : given ,
    labels : kinds = {} ,
    onOpen ,
    path = 'components.outbox' ,
    reasons ,
    statuses ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;
    const words  = labels.list ?? {} ;

    const outbox = useOutbox() ;

    const scope = outbox?.scope ?? null ;

    const items = ( given ?? outbox?.items ?? [] )
        .filter( item => !statuses || statuses.includes( item.status ) )
        .reverse() ;

    const now = useNow( items ) ;

    const mine   = items.filter( item => ( item.scope ?? null ) === scope ) ;
    const others = items.filter( item => ( item.scope ?? null ) !== scope ) ;

    const row = ( item , own ) =>
    {
        const error   = outboxErrorText( item , { errors : labels.errors , reasons } ) ;
        const seconds = item.status === 'pending' ? Math.ceil( ( item.nextAttemptAt - now ) / 1000 ) : 0 ;

        return (
            <li className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2" key={ item.id }>
                <div className="flex min-w-0 flex-1 flex-col">
                    <span className="font-medium">
                        { describe?.( item ) ?? kinds[ item.kind ] ?? item.kind }
                        { !describe && item.target && <span className="ms-2 font-normal text-base-content/60">{ item.target }</span> }
                    </span>
                    { error && item.status !== 'pending' && <span className="text-xs text-error">{ error }</span> }
                    { item.status === 'pending' && seconds > 0 && (
                        <span className="text-xs text-base-content/60 tabular-nums">
                            { format( words.next ?? '{0}' , seconds ) }
                            { item.attempts > 0 && ` · ${ format( words.attempts ?? '{0}' , item.attempts ) }` }
                        </span>
                    ) }
                </div>

                <Badge color={ COLORS[ item.status ] } size="sm" style="soft">{ labels.statuses?.[ item.status ] ?? item.status }</Badge>

                { own && (
                    <div className="flex gap-1">
                        { RETRYABLE.includes( item.status ) && (
                            <Button onClick={ () => outbox?.retry( item.id ) } size="xs" style="outline">{ words.retry }</Button>
                        ) }
                        { item.status === 'done' && onOpen && (
                            <Button onClick={ () => onOpen( item ) } size="xs" style="outline">{ words.open }</Button>
                        ) }
                        { item.status !== 'done' && item.status !== 'posting' && (
                            <ConfirmButton confirmLabel={ words.confirm } label={ words.remove } onConfirm={ () => outbox?.remove( item.id ) } />
                        ) }
                    </div>
                ) }
            </li>
        ) ;
    } ;

    if ( items.length === 0 )
    {
        return <p className={ cn( 'text-sm text-base-content/60' , className ) }>{ words.empty }</p> ;
    }

    return (
        <div className={ cn( 'flex flex-col gap-4' , className ) }>
            { mine.length > 0 && (
                <ul className="divide-y divide-base-200">
                    { mine.map( item => row( item , true ) ) }
                </ul>
            ) }
            { others.length > 0 && (
                <section className="flex flex-col gap-1">
                    <h4 className="text-sm font-semibold text-base-content/70">{ words.otherScope }</h4>
                    <ul className="divide-y divide-base-200 opacity-70">
                        { others.map( item => row( item , false ) ) }
                    </ul>
                </section>
            ) }
        </div>
    ) ;
} ;

OutboxList.displayName = 'OutboxList' ;

export default OutboxList ;
