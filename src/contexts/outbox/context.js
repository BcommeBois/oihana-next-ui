'use client' ;

import { createContext } from 'react' ;

/**
 * The outbox of the application : its items, its counts, and what acts on it.
 *
 * `null` outside an `OutboxProvider`.
 *
 * @module contexts/outbox/context
 */
const OutboxContext = createContext( null ) ;

export default OutboxContext ;
