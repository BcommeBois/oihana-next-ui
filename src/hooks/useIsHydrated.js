import { useSyncExternalStore } from 'react' ;

/** Nothing ever changes, so the subscription is a formality React still asks for. */
const subscribe = () => () => {} ;

const getSnapshot = () => true ;

const getServerSnapshot = () => false ;

/**
 * React hook telling whether this part of the tree is past hydration.
 *
 * It answers a narrower question than {@link useIsMounted}, and
 * answers it a commit earlier. A `mounted` flag raised from an effect is `false`
 * on the **first render of every mount**, server-side or not, so anything gated
 * behind it costs a commit forever — including the components mounted long after
 * the page was hydrated, which is most of them.
 *
 * `useSyncExternalStore` already knows the difference : React reads the *server*
 * snapshot only while the fiber it is rendering is being hydrated, and the client
 * snapshot otherwise. So the value is
 *
 * - `false` on the server, and `false` again through the hydration pass — the two
 *   renders that must agree ;
 * - `true` on the **first** render of anything mounted afterward, with no extra
 *   commit.
 *
 * The distinction is drawn per root and per `<Suspense>` boundary, which a module
 * flag cannot do : hydration is chunked, and a boundary that hydrates late must
 * still be told it is hydrating.
 *
 * @module hooks/useIsHydrated
 *
 * @returns {boolean} False while rendering on the server or hydrating, true after.
 *
 * @example
 * ```js
 * const hydrated = useIsHydrated() ;
 *
 * if ( !hydrated ) return null ;
 *
 * return createPortal( children , document.body ) ;
 * ```
 */
const useIsHydrated = () => useSyncExternalStore( subscribe , getSnapshot , getServerSnapshot ) ;

export default useIsHydrated ;
