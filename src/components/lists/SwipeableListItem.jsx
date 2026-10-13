'use client' ;

/**
 * SwipeableListItem — a row swiped to act on : to the right to confirm a
 * line, to the left to remove it, the gesture of every phone list.
 *
 * The content slides over a coloured ground where the action shows ; let
 * go past `threshold` of the row's width, the action fires — at once, or,
 * with `confirm`, the row stays open on a button to touch, so a slip does
 * not delete. Short of it, the content springs back. The axis is decided
 * after a few pixels : a finger going down scrolls, the row leaves it alone
 * (`touch-action : pan-y`). One row is open at a time ; Escape or a tap
 * anywhere closes it.
 *
 * 🔑 **The gesture is a convenience, never the only way.** Put the same
 * actions in the row's own buttons — `ListRow`'s `actions` — for the
 * keyboard, a reader, and a desk ; this component adds the swipe, it does
 * not replace them. Where motion is reduced, nothing springs.
 *
 * ⚠️ The row hides its overflow, to clip the ground that slides : a CSS
 * tooltip on a button inside is clipped with it. Give those buttons
 * `tooltipFloat`, as `ScanList` does.
 *
 * @module components/lists/SwipeableListItem
 *
 * @typedef {Object} SwipeAction
 * @property {string} [color='primary'] - A daisyUI colour : the ground, with its content colour.
 * @property {boolean} [confirm] - Stay open on a button rather than fire on release. Defaults to `true` for `trailing`, `false` for `leading`.
 * @property {React.ElementType} [icon]
 * @property {string} label - The action's name : shown on the ground, and the button's text.
 * @property {Function} onAction - What happens.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='li'] - The root element.
 * @param {React.ReactNode} props.children - The row, a `ListRow` most often.
 * @param {string} [props.className] - Classes on the root.
 * @param {boolean} [props.disabled=false] - No gesture.
 * @param {SwipeAction} [props.leading] - The action revealed by a swipe to the right.
 * @param {number} [props.threshold=0.4] - The share of the width past which the action fires.
 * @param {SwipeAction} [props.trailing] - The action revealed by a swipe to the left.
 *
 * @example
 * ```jsx
 * <SwipeableListItem
 *     leading  = { { color : 'success' , icon : MdCheck , label : 'Done' , onAction : () => done( item ) } }
 *     trailing = { { color : 'error' , icon : MdDelete , label : 'Remove' , onAction : () => remove( item ) } }
 * >
 *     <ListRow as="div" title={ item.title } actions={ <Button … /> } />
 * </SwipeableListItem>
 * ```
 */

import { useCallback , useEffect , useRef , useState } from 'react' ;

import Button from '../Button' ;

import swipeDecision from '../../helpers/gestures/swipeDecision' ;

import cn from '../../themes/helpers/cn' ;

const GROUND =
{
    accent    : 'bg-accent text-accent-content' ,
    error     : 'bg-error text-error-content' ,
    info      : 'bg-info text-info-content' ,
    neutral   : 'bg-neutral text-neutral-content' ,
    primary   : 'bg-primary text-primary-content' ,
    secondary : 'bg-secondary text-secondary-content' ,
    success   : 'bg-success text-success-content' ,
    warning   : 'bg-warning text-warning-content' ,
} ;

/** The width a row stays open at, on a confirm button. */
const OPEN = 96 ;

/** The one row open, closed when another opens or the page is touched. */
let opened = null ;

const closeOpened = () => { opened?.() ; opened = null ; } ;

if ( typeof document !== 'undefined' )
{
    document.addEventListener( 'pointerdown' , event => { if ( !event.target.closest?.( '[data-swipe-open]' ) ) closeOpened() ; } , true ) ;
    document.addEventListener( 'keydown' , event => { if ( event.key === 'Escape' ) closeOpened() ; } ) ;
}

const SwipeableListItem =
({
    as : Component = 'li' ,
    children ,
    className ,
    disabled = false ,
    leading ,
    threshold = 0.4 ,
    trailing ,
}) =>
{
    const root    = useRef( null ) ;
    const pointer = useRef( null ) ;
    const start   = useRef( { x : 0 , y : 0 } ) ;
    const axis    = useRef( null ) ;

    const [ offset , setOffset ] = useState( 0 ) ;   // the content's shift, right positive
    const [ open   , setOpen   ] = useState( null ) ; // 'left' | 'right' | null : held on a confirm button
    const [ moving , setMoving ] = useState( false ) ;

    const reduced = typeof window !== 'undefined' && window.matchMedia?.( '(prefers-reduced-motion: reduce)' ).matches ;

    const close = useCallback( () =>
    {
        setOpen( null ) ;
        setOffset( 0 ) ;
    }
    , [] ) ;

    useEffect( () => () => { if ( opened === close ) opened = null ; } , [ close ] ) ;

    const actionFor = direction => ( direction === 'right' ? leading : direction === 'left' ? trailing : null ) ;

    const confirms = ( direction , action ) => action?.confirm ?? ( direction === 'left' ) ;

    const fire = action =>
    {
        close() ;
        action?.onAction?.() ;
    } ;

    const onPointerDown = event =>
    {
        if ( disabled || event.button > 0 || pointer.current !== null )
        {
            return ;
        }

        if ( open )
        {
            return ;
        }

        pointer.current = event.pointerId ;
        start.current   = { x : event.clientX , y : event.clientY } ;
        axis.current    = null ;
    } ;

    const onPointerMove = event =>
    {
        if ( pointer.current !== event.pointerId )
        {
            return ;
        }

        const dx = event.clientX - start.current.x ;
        const dy = event.clientY - start.current.y ;
        const width = root.current?.getBoundingClientRect().width ?? 1 ;

        if ( axis.current === null )
        {
            const { axis : decided } = swipeDecision( { dx , dy , threshold , width } ) ;

            if ( decided === 'y' )
            {
                pointer.current = null ;
                return ;
            }

            if ( decided === 'x' )
            {
                axis.current = 'x' ;
                event.currentTarget.setPointerCapture( event.pointerId ) ;
                closeOpened() ;
                setMoving( true ) ;
            }
            else
            {
                return ;
            }
        }

        // No action on that side : the content barely moves, to say so.
        const action = actionFor( dx > 0 ? 'right' : 'left' ) ;

        setOffset( action ? dx : dx / 6 ) ;
    } ;

    const onPointerEnd = event =>
    {
        if ( pointer.current !== event.pointerId )
        {
            return ;
        }

        pointer.current = null ;
        setMoving( false ) ;

        if ( axis.current !== 'x' )
        {
            return ;
        }

        axis.current = null ;

        const dx    = event.clientX - start.current.x ;
        const width = root.current?.getBoundingClientRect().width ?? 1 ;

        const { beyond , direction } = swipeDecision( { dx , dy : 0 , threshold , width } ) ;
        const action = actionFor( direction ) ;

        if ( !beyond || !action )
        {
            close() ;
            return ;
        }

        if ( confirms( direction , action ) )
        {
            setOpen( direction ) ;
            setOffset( direction === 'left' ? -OPEN : OPEN ) ;
            opened = close ;
        }
        else
        {
            fire( action ) ;
        }
    } ;

    const side = offset > 0 ? 'right' : offset < 0 ? 'left' : null ;
    const action = actionFor( side ) ;
    const Icon   = action?.icon ;

    const progress = Math.min( 1 , Math.abs( offset ) / Math.max( 1 , ( root.current?.getBoundingClientRect().width ?? 1 ) * threshold ) ) ;

    return (
        <Component
            className       = { cn( 'relative overflow-hidden select-none' , className ) }
            data-swipe-open = { open ? '' : undefined }
            onPointerCancel = { onPointerEnd }
            onPointerDown   = { onPointerDown }
            onPointerMove   = { onPointerMove }
            onPointerUp     = { onPointerEnd }
            ref             = { root }
            style           = { { touchAction : 'pan-y' } }
        >
            { action && (
                <div
                    aria-hidden = { open ? undefined : 'true' }
                    className   = { cn( 'absolute inset-y-0 flex items-center gap-2 px-4 text-sm font-medium' , GROUND[ action.color ?? 'primary' ] ?? GROUND.primary , side === 'right' ? 'left-0 justify-start' : 'right-0 justify-end' ) }
                    style       = { { width : open ? OPEN : '100%' , opacity : open ? 1 : 0.4 + 0.6 * progress } }
                >
                    { open
                        ? <Button className="text-inherit" onClick={ () => fire( action ) } size="sm" style="ghost">{ action.label }</Button>
                        : (
                            <>
                                { Icon && <Icon aria-hidden="true" className="size-5" /> }
                                <span>{ action.label }</span>
                            </>
                        ) }
                </div>
            ) }

            <div
                className = { cn( 'relative bg-base-100' , !moving && !reduced && 'transition-transform duration-200 ease-out' ) }
                style     = { { transform : `translateX(${ offset }px)` } }
            >
                { children }
            </div>
        </Component>
    ) ;
} ;

SwipeableListItem.displayName = 'SwipeableListItem' ;

export default SwipeableListItem ;
