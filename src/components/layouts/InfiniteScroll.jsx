'use client' ;

import { useRef } from 'react' ;

import Loading from '@/components/Loading' ;

import useInfiniteScroll from '@/hooks/useInfiniteScroll' ;

import cn from '@/themes/helpers/cn' ;

/**
 * Default root element type for the InfiniteScroll container.
 * @type {string}
 */
export const DEFAULT_ELEMENT = 'div' ;

/**
 * Class applied to the container when `scrollable` is enabled.
 * @type {string}
 */
export const SCROLLABLE_CLASS = 'overflow-y-auto' ;

/**
 * Class applied to the (visually empty) sentinel element.
 * @type {string}
 */
export const SENTINEL_CLASS = 'h-px w-full' ;

/**
 * Class applied to the default loading indicator wrapper.
 * @type {string}
 */
export const LOADER_WRAPPER_CLASS = 'flex justify-center py-4' ;

/**
 * Class applied to the container in `reverse` mode (chat-like). Lays children
 * out bottom-to-top so the scroll stays anchored at the bottom : prepending
 * older items does not shift the visible content.
 * @type {string}
 */
export const REVERSE_CLASS = 'flex flex-col-reverse' ;

/**
 * InfiniteScroll — renders its children, then watches a sentinel element to
 * load more content when the user scrolls near the edge of the list.
 *
 * Headless by design : it does not render the list itself, it wraps whatever
 * you pass as `children` and manages the sentinel plus the loading / end
 * indicators. Loading is paused while `loading` is true and stops once
 * `hasMore` becomes false.
 *
 * @module components/layouts/InfiniteScroll
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div']           - HTML element or component to render as the container.
 * @param {React.ReactNode}   [props.children]           - The already-loaded content.
 * @param {string}            [props.className]          - Additional class names for the container.
 * @param {React.ReactNode}   [props.endMessage=null]    - Shown when `hasMore` is false.
 * @param {boolean}           [props.hasMore=true]       - Whether more items can be loaded.
 * @param {React.ReactNode}   [props.loader]             - Custom loading indicator (defaults to `<Loading />`).
 * @param {boolean}           [props.loading=false]      - Loading-in-flight state.
 * @param {Function}          [props.onLoadMore]         - Called when the sentinel is reached. Should be stable (`useCallback`).
 * @param {boolean}           [props.reverse=false]      - Reverse / chat mode : lays children out bottom-to-top (`flex flex-col-reverse`) and loads older items when scrolling up. Children must be ordered newest-first.
 * @param {string}            [props.rootMargin]         - Pre-load distance before the sentinel is reached.
 * @param {boolean}           [props.scrollable=false]   - When true, the container is the scroll viewport and the observer root.
 * @param {number}            [props.threshold]          - Visibility threshold (0-1).
 *
 * @example
 * ```jsx
 * // Forward infinite scroll over a List
 * <InfiniteScroll
 *     hasMore={ hasMore }
 *     loading={ loading }
 *     onLoadMore={ loadNextPage }
 *     endMessage={ <p className="text-center opacity-60 py-4">No more items</p> }
 * >
 *     <List>
 *         { items.map( item => <ListRow key={ item.id } title={ item.title } /> ) }
 *     </List>
 * </InfiniteScroll>
 *
 * // Scrollable container with a fixed height (internal scroll viewport)
 * <InfiniteScroll
 *     scrollable
 *     className="max-h-96"
 *     hasMore={ hasMore }
 *     loading={ loading }
 *     onLoadMore={ loadNextPage }
 * >
 *     { rows }
 * </InfiniteScroll>
 *
 * // Reverse / chat mode (older messages load when scrolling up).
 * // `flex flex-col-reverse` is applied automatically ; pass messages newest-first.
 * <InfiniteScroll
 *     reverse
 *     scrollable
 *     className="max-h-96"
 *     hasMore={ hasMore }
 *     loading={ loading }
 *     onLoadMore={ loadOlderMessages }
 * >
 *     { messagesNewestFirst.map( m => <ChatBubble key={ m.id } { ...m } /> ) }
 * </InfiniteScroll>
 * ```
 */
const InfiniteScroll =
({
    as ,
    children ,
    className ,
    endMessage = null ,
    hasMore    = true ,
    loader ,
    loading    = false ,
    onLoadMore ,
    reverse    = false ,
    rootMargin ,
    scrollable = false ,
    threshold ,
}) =>
{
    const Component = as ?? DEFAULT_ELEMENT ;

    /** @type {React.RefObject<HTMLElement>} - Container used as observer root when scrollable. */
    const rootRef = useRef( null ) ;

    const { ref : sentinelRef } = useInfiniteScroll
    ({
        hasMore ,
        loading ,
        onLoadMore ,
        root : scrollable ? rootRef : null ,
        rootMargin ,
        threshold ,
    }) ;

    // --------- Building blocks

    const sentinel = hasMore
        ? <div ref={ sentinelRef } aria-hidden="true" className={ SENTINEL_CLASS } />
        : null ;

    const indicator = loading
        ? ( loader ?? <div className={ LOADER_WRAPPER_CLASS }><Loading /></div> )
        : null ;

    const footer = !hasMore ? endMessage : null ;

    // --------- Render container
    //
    // DOM order is always [ children , indicator , sentinel , footer ].
    // In `reverse` mode the container is laid out bottom-to-top (flex-col-reverse),
    // so the sentinel / indicator / footer naturally end up at the visual top and
    // the scroll stays anchored at the bottom.

    return (
        <Component
            className = { cn( scrollable && SCROLLABLE_CLASS , reverse && REVERSE_CLASS , className ) }
            ref       = { rootRef }
        >
            { children }
            { indicator }
            { sentinel }
            { footer }
        </Component>
    ) ;
} ;

InfiniteScroll.displayName = 'InfiniteScroll' ;

export default InfiniteScroll ;
