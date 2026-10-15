'use client' ;

import { use } from 'react' ;

import OutboxContext from './context' ;

/**
 * The outbox of the application, or `null` outside an `OutboxProvider` — a
 * screen that only shows the queue then shows nothing, a screen that queues
 * says so.
 *
 * @module contexts/outbox/useOutbox
 *
 * @returns {?{ ready : boolean , online : boolean , draining : boolean , items : Object[] , counts : Object , lastSyncAt : ?number , scope : ?string , enqueue : Function , retry : Function , remove : Function , clear : Function , drain : Function }}
 *
 * @example
 * ```jsx
 * const { enqueue } = useOutbox() ;
 * await enqueue( { kind : 'receipts' , target : order , payload : { body : receipt } } ) ;
 * ```
 */
const useOutbox = () => use( OutboxContext ) ;

export default useOutbox ;
