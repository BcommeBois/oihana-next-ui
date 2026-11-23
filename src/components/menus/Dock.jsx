'use client' ;

/**
 * Dock component for DaisyUI 5 (a.k.a. bottom navigation / bottom bar).
 *
 * Sticks to the bottom of the screen (`position: 'fixed'` by default). Supports
 * a data-driven `items` array (the common case) or composable {@link DockItem}
 * children. Items with an `href` render as links (active auto-detected from the
 * pathname); items with only an `onClick` render as buttons.
 *
 * **Two kinds of dock.** `variant="navigation"` (the default) is daisyUI's : an
 * icon over a small label per entry, the one of the current page lit.
 * `variant="actions"` is the bar of a hand-held screen : one to three
 * `Button`s of the library, large, the primary one at the end where the
 * thumb is — « Finish », « Confirm » — with no notion of a current page. The
 * items then take a `Button`'s props : `color`, `style`, `loading`,
 * `disabled`, `type`, `icon`.
 *
 * Fixed, the dock **reserves its place** in the page with a spacer of its
 * own height (`spacer`), so nothing ends up under it ; and it **stays above
 * the virtual keyboard** (`avoidKeyboard`) by following the visual viewport,
 * which a `fixed` element on its own does not on Android or iOS.
 *
 * The container takes `as`, a `ref` and any other prop — `aria-label`, `role`,
 * `data-*`, a `style` (merged with the keyboard lift). `as="nav"` makes a
 * navigation dock a landmark ; `as={ motion.div }` animates the dock ITSELF,
 * which stays fixed and keeps its spacer and its keyboard avoidance — a
 * transform on an ancestor, by contrast, would make that ancestor the
 * containing block of the fixed dock.
 *
 * On iOS, add `<meta name="viewport" content="viewport-fit=cover">` to the root
 * layout so the safe area is counted.
 *
 * @module components/menus/Dock
 * @see https://daisyui.com/components/dock
 *
 * @example
 * ```jsx
 * // Navigation, data-driven
 * <Dock
 *     items={[
 *         { id: 'home',     label: 'Home',     href: '/',        icon: <HomeIcon /> } ,
 *         { id: 'inbox',    label: 'Inbox',    href: '/inbox',   icon: <InboxIcon /> } ,
 *         { id: 'settings', label: 'Settings', onClick: openMe,  icon: <CogIcon /> } ,
 *     ]}
 * />
 *
 * // Actions, the thumb bar of a field screen
 * <Dock
 *     variant="actions"
 *     items={[
 *         { id: 'cancel',  label: 'Cancel',  onClick: cancel,  style: 'ghost' } ,
 *         { id: 'confirm', label: 'Confirm', onClick: confirm, color: 'primary', loading: saving } ,
 *     ]}
 * />
 *
 * // Composable, embedded (not fixed)
 * <Dock position="relative">
 *     <DockItem href="/" icon={ <HomeIcon /> }>Home</DockItem>
 *     <DockItem active icon={ <InboxIcon /> }>Inbox</DockItem>
 * </Dock>
 *
 * // A navigation bar around its main action, rising when it mounts
 * <Dock
 *     animate    = { { y : 0 } }
 *     aria-label = "Main"
 *     as         = { motion.nav }
 *     initial    = { { y : '100%' } }
 *     items      = {[
 *         { id: 'home'     , label: 'Home'     , href: '/'         , icon: <HomeIcon /> } ,
 *         { id: 'contacts' , label: 'Contacts' , href: '/contacts' , icon: <ContactsIcon /> , exact: false } ,
 *         { id: 'create'   , label: 'Create'   , onClick: create   , icon: <AddIcon /> , featured: true } ,
 *         { id: 'cart'     , label: 'Cart'     , onClick: openCart , icon: <CartIcon /> , badge: 3 , 'aria-label': 'Cart, 3 items' } ,
 *         { id: 'stats'    , label: 'Stats'    , href: '/stats'    , icon: <StatsIcon /> , exact: false } ,
 *     ]}
 * />
 * ```
 */

import { useCallback , useEffect , useRef , useState } from 'react' ;

import cn             from '../../themes/helpers/cn' ;
import getDockClasses from '../../themes/components/dock' ;

import Button   from '../Button' ;
import DockItem from './DockItem' ;

export const NAVIGATION = 'navigation' ;
export const ACTIONS    = 'actions' ;

/**
 * @param {Object} props
 * @param {import('react').ElementType} [props.as='div'] - The container : an element (`'nav'`) or a component (`motion.div`).
 * @param {boolean} [props.avoidKeyboard=true] - Fixed, follow the visual viewport so the dock stays above the virtual keyboard.
 * @param {import('react').ReactNode} [props.children] - Composable DockItem children (ignored when `items` is set).
 * @param {string} [props.className] - Additional classes for the dock wrapper.
 * @param {Array<{ id?: string, active?: boolean, label?: import('react').ReactNode, href?: import('next/link').LinkProps['href'], icon?: import('react').ReactNode, onClick?: import('react').MouseEventHandler, className?: string, exact?: boolean, badge?: import('react').ReactNode, badgeClassName?: string, badgeColor?: string, featured?: boolean, color?: string, style?: string, loading?: boolean, disabled?: boolean, type?: string }>} [props.items] - Data-driven dock entries. With `variant="navigation"`, every other key (`exact`, `badge`, `featured`, `color`, `aria-label`, `data-*`…) goes to the `DockItem`. With `variant="actions"`, each is a `Button` : `color`, `style`, `loading`, `disabled`, `type`, `icon` (a component) apply.
 * @param {string} [props.itemClassName] - Additional classes applied to each item.
 * @param {import('../../themes/layout/position').PositionValue} [props.position] - CSS position (default 'fixed'; use 'relative' to embed).
 * @param {import('react').Ref} [props.ref] - Forwarded to the container.
 * @param {boolean} [props.showLabel=true] - Render item labels (navigation).
 * @param {import('../../themes/components/dock').DockSize | Object.<string, import('../../themes/components/dock').DockSize>} [props.size] - Dock size (xs, sm, md, lg, xl).
 * @param {boolean} [props.spacer] - Fixed, reserve the dock's height in the page's flow. Defaults to `true` when fixed.
 * @param {Object} [props.style] - Inline style of the container, merged with the keyboard lift.
 * @param {'navigation'|'actions'} [props.variant='navigation']
 * @returns {React.JSX.Element}
 */
const Dock =
({
    as : Component = 'div' ,
    avoidKeyboard = true ,
    children ,
    className ,
    items ,
    itemClassName ,
    position ,
    ref ,
    showLabel = true ,
    size ,
    spacer ,
    style ,
    variant = NAVIGATION ,

    ...rest
}) =>
{
    const fixed = position === undefined || position === 'fixed' ;

    const node = useRef( null ) ;

    // The container is measured here AND handed to the caller : one element, two refs.
    const setNode = useCallback( element =>
    {
        node.current = element ;

        if ( typeof ref === 'function' )
        {
            ref( element ) ;
        }
        else if ( ref )
        {
            ref.current = element ;
        }
    }
    , [ ref ] ) ;

    const [ height , setHeight ] = useState( 0 ) ;
    const [ lift   , setLift   ] = useState( 0 ) ;

    // The dock's height, for the spacer that keeps the page's end out from under it.
    useEffect( () =>
    {
        const element = node.current ;

        if ( !fixed || !element || typeof ResizeObserver === 'undefined' )
        {
            return undefined ;
        }

        const observer = new ResizeObserver( entries => setHeight( Math.round( entries[ 0 ].borderBoxSize?.[ 0 ]?.blockSize ?? entries[ 0 ].contentRect.height ) ) ) ;

        observer.observe( element ) ;

        return () => observer.disconnect() ;
    }
    , [ fixed ] ) ;

    // A `fixed` element sits in the layout viewport, which the virtual keyboard does not shrink :
    // the dock would stay under the keyboard. The visual viewport says how much is really shown.
    useEffect( () =>
    {
        const viewport = typeof window !== 'undefined' ? window.visualViewport : null ;

        if ( !fixed || !avoidKeyboard || !viewport )
        {
            return undefined ;
        }

        const update = () => setLift( Math.max( 0 , Math.round( window.innerHeight - viewport.height - viewport.offsetTop ) ) ) ;

        update() ;
        viewport.addEventListener( 'resize' , update ) ;
        viewport.addEventListener( 'scroll' , update ) ;

        return () =>
        {
            viewport.removeEventListener( 'resize' , update ) ;
            viewport.removeEventListener( 'scroll' , update ) ;
        } ;
    }
    , [ avoidKeyboard , fixed ] ) ;

    const actions = variant === ACTIONS ;

    const classes = getDockClasses(
    {
        className : cn(
            // Embedded, daisyUI's dock is as wide as its content : the bar takes the whole width, so the buttons share it.
            actions && 'w-full flex-row items-stretch gap-2 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] border-t border-base-300 bg-base-100 h-auto' ,
            className ,
        ) ,
        position ,
        size ,
    } ) ;

    const content = Array.isArray( items ) && items.length > 0
        ? items.map( ( item , index ) =>
        {
            const { id , active , label , href , icon , onClick , className : itemCls , ...rest } = item ?? {} ;

            if ( actions )
            {
                // daisyUI lays every direct child of `.dock` out as a column — an icon over a label —
                // and caps it at 8rem. The wrapper takes those rules, lifts the cap, and the button
                // inside keeps its row and the whole share.
                return (
                    <div className="flex min-w-0 max-w-none flex-1" key={ id ?? `item-${ index }` }>
                        <Button
                            className = { cn( 'w-full min-w-0' , itemClassName , itemCls ) }
                            icon      = { icon }
                            onClick   = { onClick }
                            size      = "lg"
                            { ...rest }
                        >
                            { label }
                        </Button>
                    </div>
                ) ;
            }

            // A `Button`'s own keys mean nothing on a dock link : a string `style` would even
            // reach the DOM, where React refuses it. The rest is the item's (`exact`, `badge`,
            // `featured`, `aria-label`, `data-*`…).
            const { loading : _loading , style : itemStyle , ...itemRest } = rest ;

            return (
                <DockItem
                    key       = { id ?? `item-${ index }` }
                    active    = { active }
                    className = { cn( itemClassName , itemCls ) }
                    href      = { href }
                    icon      = { icon }
                    label     = { label }
                    onClick   = { onClick }
                    showLabel = { showLabel }
                    style     = { typeof itemStyle === 'object' ? itemStyle : undefined }
                    { ...itemRest }
                />
            ) ;
        } )
        : children ;

    return (
        <>
            { fixed && ( spacer ?? true ) && height > 0 && <div aria-hidden="true" style={ { height } } /> }
            <Component
                className = { classes }
                role      = { actions ? 'toolbar' : undefined }
                { ...rest }
                ref       = { setNode }
                style     = { lift > 0 ? { ...style , bottom : lift } : style }
            >
                { content }
            </Component>
        </>
    ) ;
} ;

Dock.displayName = 'Dock' ;

export default Dock ;
