'use client' ;

/**
 * The screen's shared navigation transition.
 *
 * Two things come out of it : `navigate`, which every control of the screen
 * pushes through so they all feed ONE pending state, and `busy`, which the
 * surface being reloaded reads to say so ({@link module:components/BusySurface}).
 *
 * ⚠️ **Outside a provider it answers `{ busy : false , navigate : null }`**, and
 * a consumer is written to fall back on its own behaviour when it does.
 *
 * 🚨 **This is `useTransition` underneath, never `useLinkStatus`.** The latter
 * falls back to `false` the moment the new shell commits — when a loading
 * skeleton appears — so it does not cover the part of the wait the reader sees.
 *
 * @module contexts/busyNavigation/useBusyNavigation
 *
 * @returns {import('./context').BusyNavigation}
 *
 * @example
 * ```jsx
 * const { busy , navigate } = useBusyNavigation() ;
 *
 * const goTo = ( href ) => navigate ? navigate( href ) : router.push( href ) ;
 * ```
 */

import { use } from 'react' ;

import BusyNavigationContext from './context' ;

const useBusyNavigation = () => use( BusyNavigationContext ) ;

export default useBusyNavigation ;
