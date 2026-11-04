'use client' ;

/**
 * The page the reader came from before reaching the records under `scope` —
 * {@link module:helpers/routes/resolveOriginUrl} read off the provider's trail.
 *
 * ⚠️ **It needs a trail** : without a `PreviousPathProvider` kept with a
 * `trailLimit` above zero, it always answers `null`, and a consumer falls back
 * on its link to the list — nothing breaks.
 *
 * Like the previous page, it is state : the destination is known while
 * rendering, so a link built on it says on hover where it goes.
 *
 * @module contexts/previousPath/useOriginUrl
 *
 * @param {string} scope - The pathname the records live under — their list.
 *
 * @returns {?string} The URL of the origin, query included, or `null` when the reader came through the list, or from nowhere.
 *
 * @example
 * ```jsx
 * const originUrl = useOriginUrl( '/articles' ) ;
 *
 * return (
 *     <>
 *         { originUrl && <BackLink href={ originUrl } label="Back" /> }
 *         <BackLink smart href="/articles" label="All articles" />
 *     </>
 * ) ;
 * ```
 */

import { use } from 'react' ;

import resolveOriginUrl from '../../helpers/routes/resolveOriginUrl' ;

import PreviousPathContext from './context' ;

const useOriginUrl = scope => resolveOriginUrl( use( PreviousPathContext ).trail , scope ) ;

export default useOriginUrl ;
