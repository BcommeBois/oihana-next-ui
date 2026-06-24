'use client' ;

import { useEffect , useRef } from 'react' ;

import resolveRefElement from '@/helpers/react/resolveRefElement' ;

/**
 * Default distance, before the sentinel is reached, at which loading is triggered.
 * @type {string}
 */
export const DEFAULT_ROOT_MARGIN = '200px' ;

/**
 * Default visibility threshold passed to the IntersectionObserver.
 * @type {number}
 */
export const DEFAULT_THRESHOLD = 0 ;

/**
 * Hook that invokes a callback when a sentinel element scrolls into view.
 *
 * Building block for infinite scrolling / "load more on scroll". Attach the
 * returned `ref` to a sentinel element placed at the edge of your list ; when
 * that sentinel enters the viewport (or the scrollable `root`), `onLoadMore`
 * is called. Observation is paused while `loading` is true and stops once
 * `hasMore` becomes false.
 *
 * Note : `onLoadMore` should be stable (wrap it in `useCallback`), otherwise
 * the observer is recreated on every render.
 *
 * @param {Object} [options]
 * @param {boolean}  [options.hasMore=true]                  - Whether more items can be loaded.
 * @param {boolean}  [options.loading=false]                 - Pauses observation while a load is in flight.
 * @param {Function} [options.onLoadMore]                    - Called when the sentinel becomes visible.
 * @param {React.RefObject<Element>|Element|null} [options.root=null] - Scrollable container used as observer root ; defaults to the viewport.
 * @param {string}   [options.rootMargin=DEFAULT_ROOT_MARGIN]- Pre-load distance before the sentinel is reached.
 * @param {number}   [options.threshold=DEFAULT_THRESHOLD]   - Visibility threshold (0-1).
 *
 * @returns {{ ref: React.RefObject<HTMLElement> }} Ref to attach to the sentinel element.
 *
 * @example
 * ```js
 * const onLoadMore = useCallback( () => loadNextPage() , [ loadNextPage ] ) ;
 * const { ref } = useInfiniteScroll({ hasMore , loading , onLoadMore }) ;
 *
 * <ul>
 *     { items.map( item => <li key={ item.id }>{ item.label }</li> ) }
 *     <li ref={ ref } aria-hidden="true" />
 * </ul>
 * ```
 */
const useInfiniteScroll =
({
    hasMore    = true ,
    loading    = false ,
    onLoadMore ,
    root       = null ,
    rootMargin = DEFAULT_ROOT_MARGIN ,
    threshold  = DEFAULT_THRESHOLD ,
}
= {}) =>
{
    /** @type {React.RefObject<HTMLElement>} */
    const ref = useRef( null ) ;

    useEffect( () =>
    {
        const element = ref.current ;

        if ( !element || !hasMore || loading )
        {
            return ;
        }

        const observer = new IntersectionObserver
        (
            ( [ entry ] ) =>
            {
                if ( entry.isIntersecting )
                {
                    onLoadMore?.() ;
                }
            } ,
            {
                root       : resolveRefElement( root ) ,
                rootMargin ,
                threshold  ,
            }
        ) ;

        observer.observe( element ) ;

        return () => observer.disconnect() ;
    }
    , [ hasMore , loading , onLoadMore , root , rootMargin , threshold ] ) ;

    return { ref } ;
} ;

export default useInfiniteScroll ;
