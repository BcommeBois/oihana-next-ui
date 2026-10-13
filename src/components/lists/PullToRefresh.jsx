'use client' ;

/**
 * PullToRefresh — pulled down from the top, the list loads again.
 *
 * Wraps a box that scrolls (or follows the window with `target="window"`).
 * At the top, a finger going down brings an indicator out — an arrow that
 * turns as the pull nears `threshold`, a spinner once let go — and
 * `onRefresh` is called ; the indicator stays while its promise runs, then
 * goes. The content follows the finger with resistance, as the native
 * gesture does, never past `max`.
 *
 * 🔑 Chrome on Android has a pull-to-refresh of its own, which reloads the
 * whole page : `overscroll-behavior-y : contain` on the box turns it off
 * there, and this one takes over. In a PWA opened from the home screen
 * there is no native one at all — which is where this is missed most.
 *
 * It accompanies a refresh button, it does not replace it : at a desk, one
 * clicks.
 *
 * @module components/lists/PullToRefresh
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The box that scrolls, or the content when `target="window"`.
 * @param {string} [props.className] - Classes on the wrapper.
 * @param {boolean} [props.disabled=false]
 * @param {number} [props.max=120] - Pixels the content goes down at most.
 * @param {Function} props.onRefresh - `() => Promise` ; the indicator stays until it settles.
 * @param {string} [props.path='components.pullToRefresh'] - i18n path the words are read from.
 * @param {'box'|'window'} [props.target='box'] - What scrolls : the first child box, or the window.
 * @param {number} [props.threshold=64] - Pixels of pull past which letting go refreshes.
 *
 * @example
 * ```jsx
 * <PullToRefresh onRefresh={ reload }>
 *     <div className="h-[50vh] overflow-y-auto">…</div>
 * </PullToRefresh>
 * ```
 */

import { useCallback , useRef , useState } from 'react' ;

import { MdArrowDownward } from 'react-icons/md' ;

import pullDistance from '../../helpers/gestures/pullDistance' ;

import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useI18n   from '../../contexts/locale/useI18n' ;

import cn from '../../themes/helpers/cn' ;

const PullToRefresh =
({
    children ,
    className ,
    disabled = false ,
    max = 120 ,
    onRefresh ,
    path = 'components.pullToRefresh' ,
    target = 'box' ,
    threshold = 64 ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const wrapper = useRef( null ) ;
    const pointer = useRef( null ) ;
    const startY  = useRef( 0 ) ;
    const pulling = useRef( false ) ;

    const [ distance   , setDistance   ] = useState( 0 ) ;
    const [ refreshing , setRefreshing ] = useState( false ) ;

    const scroller = useCallback( () =>
        target === 'window' ? document.scrollingElement ?? document.documentElement : wrapper.current?.firstElementChild
    , [ target ] ) ;

    const atTop = () => ( scroller()?.scrollTop ?? 0 ) <= 0 ;

    const refresh = async () =>
    {
        setRefreshing( true ) ;
        setDistance( Math.min( threshold , max ) ) ;

        try
        {
            await onRefresh?.() ;
        }
        finally
        {
            setRefreshing( false ) ;
            setDistance( 0 ) ;
        }
    } ;

    const onPointerDown = event =>
    {
        if ( disabled || refreshing || event.pointerType === 'mouse' || pointer.current !== null || !atTop() )
        {
            return ;
        }

        pointer.current = event.pointerId ;
        startY.current  = event.clientY ;
        pulling.current = false ;
    } ;

    const onPointerMove = event =>
    {
        if ( pointer.current !== event.pointerId )
        {
            return ;
        }

        const dy = event.clientY - startY.current ;

        if ( !pulling.current )
        {
            if ( dy < 8 || !atTop() )
            {
                if ( dy < -8 ) pointer.current = null ;
                return ;
            }

            pulling.current = true ;
            event.currentTarget.setPointerCapture( event.pointerId ) ;
        }

        setDistance( pullDistance( dy , { max } ) ) ;
    } ;

    const onPointerEnd = event =>
    {
        if ( pointer.current !== event.pointerId )
        {
            return ;
        }

        pointer.current = null ;

        if ( !pulling.current )
        {
            return ;
        }

        pulling.current = false ;

        if ( distance >= threshold )
        {
            refresh() ;
        }
        else
        {
            setDistance( 0 ) ;
        }
    } ;

    const ready = distance >= threshold ;
    const word  = refreshing ? labels.refreshing : ready ? labels.release : labels.pull ;

    return (
        <div
            className       = { cn( 'relative' , className ) }
            onPointerCancel = { onPointerEnd }
            onPointerDown   = { onPointerDown }
            onPointerMove   = { onPointerMove }
            onPointerUp     = { onPointerEnd }
            ref             = { wrapper }
            style           = { { overscrollBehaviorY : 'contain' , touchAction : pulling.current ? 'none' : 'pan-y' } }
        >
            <div
                aria-live = "polite"
                className = { cn( 'pointer-events-none absolute inset-x-0 top-0 flex items-center justify-center gap-2 text-xs text-base-content/70' , distance === 0 && 'invisible' ) }
                style     = { { height : distance } }
            >
                { refreshing
                    ? <span className="loading loading-spinner loading-sm" />
                    : <MdArrowDownward aria-hidden="true" className={ cn( 'size-5 transition-transform' , ready && 'rotate-180' ) } /> }
                <span>{ word }</span>
            </div>
            <div className={ cn( !pulling.current && 'transition-transform duration-200 ease-out' ) } style={ { transform : `translateY(${ distance }px)` } }>
                { children }
            </div>
        </div>
    ) ;
} ;

PullToRefresh.displayName = 'PullToRefresh' ;

export default PullToRefresh ;
