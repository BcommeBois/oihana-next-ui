'use client' ;

/**
 * The URL of the page visited immediately before this one.
 *
 * ⚠️ **Outside a provider it answers `{ previousUrl : null }`**, which reads as
 * « arrived here from nowhere » — a consumer falls back on its own destination
 * then, and nothing breaks.
 *
 * 🔑 **It is state, not a getter read at click time.** A destination that only
 * becomes true once clicked is a link that lies on hover : it must be known
 * while rendering.
 *
 * @module contexts/previousPath/usePreviousPath
 *
 * @returns {import('./context').PreviousPath}
 *
 * @example
 * ```jsx
 * const { previousUrl } = usePreviousPath() ;
 *
 * // Came straight from the list, its page and its criteria included?
 * const href = resolveSmartHref( previousUrl , '/articles' ) ;
 * ```
 */

import { use } from 'react' ;

import PreviousPathContext from './context' ;

const usePreviousPath = () => use( PreviousPathContext ) ;

export default usePreviousPath ;
