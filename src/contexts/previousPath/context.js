'use client' ;

/**
 * Previous-path context — the URL of the page visited immediately before the
 * current one, across client navigations.
 *
 * App Router navigations happen in the browser, so `document.referrer` does not
 * reflect an in-app move (a list → one of its records). This context carries
 * that move, so a « back » affordance can point AT the page that was left
 * rather than guess a parent.
 *
 * The default value is what a consumer reads outside any provider : no previous
 * page, which every consumer is expected to treat as a fresh entry. The
 * provider stays purely additive.
 *
 * `trail` is empty unless the provider was asked to keep one (`trailLimit`).
 *
 * @module contexts/previousPath/context
 */

import { createContext } from 'react' ;

/**
 * @typedef  {Object}   PreviousPath
 * @property {?string}  previousUrl - Pathname **and query** of the previous page, or `null` on a fresh entry.
 * @property {string[]} trail       - The last pages visited in the tab, oldest first, the current one last. Empty when no trail is kept.
 */

/**
 * The trail read outside a provider, or when none is kept — one shared frozen
 * array, so it never reads as a change.
 * @type {string[]}
 */
export const EMPTY_TRAIL = Object.freeze( [] ) ;

/** @type {React.Context<PreviousPath>} */
const PreviousPathContext = createContext( { previousUrl : null , trail : EMPTY_TRAIL } ) ;

PreviousPathContext.displayName = 'PreviousPathContext' ;

export default PreviousPathContext ;
