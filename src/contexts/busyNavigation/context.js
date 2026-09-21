'use client' ;

/**
 * Busy navigation context — ONE navigation transition, shared by every control
 * of a screen and by the surface those controls reload.
 *
 * 🚨 **A Server Component cannot hand a function to a Client one**, so a shared
 * `startTransition` cannot travel as a prop : a page rendered on the server
 * mounts its pagination, its filters and its sort controls as siblings, and the
 * only channel between them is a context.
 *
 * The default value is what a control reads outside any provider : no shared
 * navigation, no busy state. Every consumer is expected to fall back on its own
 * behaviour then, which keeps the provider purely additive.
 *
 * @module contexts/busyNavigation/context
 */

import { createContext } from 'react' ;

/**
 * @typedef  {Object}    BusyNavigation
 * @property {boolean}   busy     - A navigation started through `navigate` is still in flight — or was, less than the provider's floor ago.
 * @property {?Function} navigate - `( href ) => void`, run inside the shared transition. `null` outside a provider.
 */

/** @type {React.Context<BusyNavigation>} */
const BusyNavigationContext = createContext( { busy : false , navigate : null } ) ;

BusyNavigationContext.displayName = 'BusyNavigationContext' ;

export default BusyNavigationContext ;
