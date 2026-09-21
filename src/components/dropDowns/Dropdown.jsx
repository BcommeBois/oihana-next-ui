'use client' ;

/**
 * Generic dropdown menu.
 *
 * Composes the DaisyUI `dropdown` shell with a `<ul class="dropdown-content menu">`
 * panel, driven by an open state (toggle on trigger, close on outside click /
 * Escape / item select). That state is the component's own, unless the caller
 * passes `open` : then the caller owns it — the way `value` works on an input —
 * and every one of those gestures only ASKS, through `onOpenChange`. It is what
 * a menu needs when something else must stay in step with it, such as a sheet
 * that shows the same entries on a small screen. Items are data-driven
 * and reuse the native menu modifiers: `menu-active` for the active row,
 * `menu-disabled` for a disabled one, and `menu-title` for a section
 * heading.
 *
 * Unlike the bespoke `LangDropDown` / `DisplayDropDown` (which render a
 * `card` panel of buttons), this one is a reusable menu-in-a-dropdown.
 *
 * @module components/dropDowns/Dropdown
 *
 * @example
 * ```jsx
 * import Dropdown from 'oihana-next-ui/components/dropDowns/Dropdown' ;
 *
 * <Dropdown
 *     label = "Actions"
 *     items =
 *     {[
 *         { id: 'section' , type: 'title' , label: 'Fichier' } ,
 *         { id: 'open' , label: 'Ouvrir' , icon: <OpenIcon /> , onClick: handleOpen } ,
 *         { id: 'edit' , label: 'Éditer' , href: '/edit' , active: true } ,
 *         { id: 'sep' , type: 'divider' } ,
 *         { id: 'del' , label: 'Supprimer' , onClick: handleDelete , disabled: true } ,
 *     ]}
 *     placement = "end"
 * />
 * ```
 */

import { useEffect , useRef , useState } from 'react' ;

import NextLink from 'next/link' ;

import cn                    from '../../themes/helpers/cn' ;
import getDropdownClassNames from '../../themes/components/dropdown' ;
import getMenuClasses        from '../../themes/navigation/menu' ;
import useDropdownPosition   from '../../themes/hooks/useDropdownPosition' ;

/**
 * Content offset classes based on dropdown opening direction.
 * @type {Object.<string, string>}
 */
const DIRECTION_OFFSET =
{
    top    : 'mb-2' ,
    bottom : 'mt-2' ,
    left   : 'me-2' ,
    right  : 'ms-2' ,
} ;

/**
 * @typedef {Object} DropdownItem
 * @property {string} [id] - Stable key.
 * @property {'item'|'divider'|'title'} [type='item'] - Item kind.
 * @property {React.ReactNode} [label] - Row text.
 * @property {React.ReactNode} [icon] - Leading icon element.
 * @property {string} [href] - When set, the row is a `next/link`.
 * @property {boolean} [native=false] - With `href`, render a native `<a>` instead of a `next/link` : no prefetch, and a full page load. For a route that ACTS rather than shows — a sign-out, which a prefetch would trigger on its own.
 * @property {Function} [onClick] - Click handler (also fired for links).
 * @property {boolean} [active] - Applies `menu-active`.
 * @property {boolean} [disabled] - Applies `menu-disabled` and disables the control.
 * @property {string} [className] - Extra class names for the row control.
 */

/**
 * @param {Object} props
 * @param {DropdownItem[]} [props.items] - Menu items. Ignored when `children` is provided.
 * @param {React.ReactNode | ((state: { open: boolean, toggle: Function, close: Function }) => React.ReactNode)} [props.children] - Raw `<li>` content, overrides `items`. A function receives the open state, so free content can close the menu — a link inside it calling `close`.
 * @param {React.ReactNode | ((state: { open: boolean, toggle: Function, close: Function }) => React.ReactNode)} [props.trigger] - Custom trigger. A node is wrapped in a `role="button"` element; a function receives the open state.
 * @param {React.ReactNode} [props.label] - Text for the default `btn` trigger (used when no `trigger`).
 * @param {React.ReactNode} [props.triggerIcon] - Leading icon for the default trigger.
 * @param {string} [props.triggerClassName='btn'] - Class names for the default trigger.
 * @param {string} [props.className] - Class names for the root `dropdown` element.
 * @param {string} [props.menuClassName] - Extra class names for the `<ul>` panel.
 * @param {import('../../themes/navigation/menu').MenuSize} [props.size] - Menu size (xs, sm, md, lg).
 * @param {import('../../themes/components/dropdown').DropdownDirection} [props.direction='bottom'] - Opening direction (ignored when autoPosition).
 * @param {import('../../themes/components/dropdown').DropdownPlacement} [props.placement='end'] - Alignment (ignored when autoPosition).
 * @param {boolean} [props.autoPosition=false] - Auto-compute direction + placement from the viewport.
 * @param {number} [props.panelWidth=208] - Estimated panel width for autoPosition (w-52 = 208px).
 * @param {number} [props.panelHeight=200] - Estimated panel height for autoPosition.
 * @param {boolean} [props.closeOnSelect=true] - Close the panel after an item click.
 * @param {boolean} [props.open] - Makes the menu CONTROLLED : the caller owns the open state, and the trigger, an outside click, Escape and an item select call `onOpenChange` instead of changing it. Omitted, the menu keeps its own state.
 * @param {(open: boolean) => void} [props.onOpenChange] - Notified whenever the open state changes — or, when `open` is given, asked to change it.
 *
 * @returns {React.JSX.Element}
 */
const Dropdown =
({
    items ,
    children ,
    trigger ,
    label ,
    triggerIcon ,
    triggerClassName = 'btn' ,
    className ,
    menuClassName ,
    size ,
    direction    = 'bottom' ,
    placement    = 'end' ,
    autoPosition = false ,
    panelWidth   = 208 ,
    panelHeight  = 200 ,
    closeOnSelect = true ,
    onOpenChange ,
    open : openProp ,
}) =>
{
    const [ openState , setOpenState ] = useState( false ) ;
    const manualRef                    = useRef( null ) ;

    const controlled = openProp !== undefined ;
    const open       = controlled ? !!openProp : openState ;

    // -------- autoPosition

    const auto = useDropdownPosition
    ({
        panelHeight ,
        panelWidth  ,
        preferredDirection : direction ,
        preferredPlacement : placement ,
    }) ;

    const containerRef      = autoPosition ? auto.ref : manualRef ;
    const resolvedDirection = autoPosition ? auto.direction : direction ;
    const resolvedPlacement = autoPosition ? auto.placement : placement ;

    // -------- Handlers

    const requestOpen = next =>
    {
        if ( !controlled )
        {
            setOpenState( next ) ;
        }
        onOpenChange?.( next ) ;
    } ;

    const close  = () => requestOpen( false ) ;

    const toggle = () =>
    {
        if ( !open && autoPosition )
        {
            auto.recalculate() ;
        }

        requestOpen( !open ) ;
    } ;

    // Opened from outside, a controlled menu has not been through `toggle` :
    // its position is worked out here instead.
    // biome-ignore lint/correctness/useExhaustiveDependencies: on the open transition only.
    useEffect( () =>
    {
        if ( controlled && open && autoPosition )
        {
            auto.recalculate() ;
        }
    }
    , [ open ] ) ;

    // -------- Close on click outside

    useEffect( () =>
    {
        if ( !open )
        {
            return ;
        }

        const handleClickOutside = e =>
        {
            if ( containerRef.current && !containerRef.current.contains( e.target ) )
            {
                close() ;
            }
        } ;

        document.addEventListener( 'click' , handleClickOutside ) ;
        return () => document.removeEventListener( 'click' , handleClickOutside ) ;
    }
    , [ open ] ) ;

    // -------- Close on Escape

    useEffect( () =>
    {
        if ( !open )
        {
            return ;
        }

        const handleEscape = e =>
        {
            if ( e.key === 'Escape' )
            {
                close() ;
            }
        } ;

        document.addEventListener( 'keydown' , handleEscape ) ;
        return () => document.removeEventListener( 'keydown' , handleEscape ) ;
    }
    , [ open ] ) ;

    // -------- Class names

    const containerClassNames = getDropdownClassNames
    ({
        // `w-fit` keeps the root sized to its trigger so the panel anchors
        // on the trigger even inside a stretching flex parent (a flex-col
        // `card-body` would otherwise stretch it full-width and send an
        // `end`-placed panel to the far edge, away from the trigger).
        beforeClassName : 'w-fit' ,
        className ,
        direction : resolvedDirection ,
        open      ,
        placement : resolvedPlacement ,
    }) ;

    const menuClasses = getMenuClasses
    ({
        beforeClassName : 'dropdown-content' ,
        className : cn
        (
            'z-10 w-52 bg-base-200 rounded-box shadow-lg' ,
            DIRECTION_OFFSET[ resolvedDirection ] ?? 'mt-2' ,
            menuClassName ,
        ) ,
        size ,
    }) ;

    // -------- Item rendering

    const renderItem = ( item , index ) =>
    {
        const { id , type = 'item' , label : itemLabel , icon , href , native = false , onClick , active , disabled , className : itemClassName } = item ;

        const key = id ?? `item-${ index }` ;

        if ( type === 'divider' )
        {
            return (
                <li key={ key } className="my-1">
                    <hr className="border-base-content/10" />
                </li>
            ) ;
        }

        if ( type === 'title' )
        {
            return (
                <li key={ key } className={ cn( 'menu-title' , itemClassName ) }>
                    { icon
                        ? <span className="flex flex-row items-center gap-2">{ icon }{ itemLabel }</span>
                        : itemLabel
                    }
                </li>
            ) ;
        }

        const handleClick = e =>
        {
            onClick?.( e ) ;

            if ( closeOnSelect )
            {
                close() ;
            }
        } ;

        const rowClasses = cn( active && 'menu-active' , itemClassName ) ;

        const content =
        (
            <>
                { icon }
                { itemLabel }
            </>
        ) ;

        return (
            <li key={ key } className={ cn( disabled && 'menu-disabled' ) }>
                { href && !disabled && native
                    ? (
                        <a
                            href         = { href }
                            className    = { rowClasses }
                            onClick      = { handleClick }
                            aria-current = { active ? 'page' : undefined }
                        >
                            { content }
                        </a>
                    )
                    : href && !disabled
                    ? (
                        <NextLink
                            href        = { href }
                            className   = { rowClasses }
                            onClick     = { handleClick }
                            aria-current = { active ? 'page' : undefined }
                        >
                            { content }
                        </NextLink>
                    )
                    : (
                        <button
                            type      = "button"
                            className = { rowClasses }
                            disabled  = { disabled }
                            onClick   = { handleClick }
                        >
                            { content }
                        </button>
                    )
                }
            </li>
        ) ;
    } ;

    // -------- Trigger

    const triggerNode = typeof trigger === 'function'
        ? trigger( { open , toggle , close } )
        : trigger
            ? (
                // A real <button> (not a role="button" div): clicking it
                // takes focus, which is what drives DaisyUI's
                // `dropdown-content` reveal (its `@starting-style` opacity
                // transition only fires reliably via `:focus`/`:focus-within`).
                // Kept as a bare inline-flex reset so the caller's own
                // trigger markup provides the visual.
                <button
                    type          = "button"
                    className     = "inline-flex cursor-pointer appearance-none border-0 bg-transparent p-0"
                    onClick       = { toggle }
                    aria-haspopup = "menu"
                    aria-expanded = { open }
                >
                    { trigger }
                </button>
            )
            : (
                <button
                    type          = "button"
                    className     = { triggerClassName }
                    onClick       = { toggle }
                    aria-haspopup = "menu"
                    aria-expanded = { open }
                >
                    { triggerIcon }
                    { label }
                </button>
            ) ;

    // -------- Render

    return (
        <div className={ containerClassNames } ref={ containerRef }>

            { triggerNode }

            { open &&
                <ul className={ menuClasses }>
                    { typeof children === 'function'
                        ? children( { open , toggle , close } )
                        : children ?? items?.map( renderItem ) }
                </ul>
            }

        </div>
    ) ;
} ;

Dropdown.displayName = 'Dropdown' ;

export default Dropdown ;
