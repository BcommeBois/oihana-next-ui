/**
 * Drawer layout component for DaisyUI.
 *
 * @module display/Drawer
 * @see https://daisyui.com/components/drawer
 */

'use client' ;

import { useId , useEffect , useRef } from 'react' ;

import cn from '@/themes/helpers/cn' ;

import useResetScroll from '@/hooks/useResetScroll' ;

import { breakpoints } from '@/themes/enums/breakpoints' ;

/**
 * @typedef {'start' | 'end'} DrawerAlign
 */

export const START = 'start' ;
export const END   = 'end' ;

/**
 * @param {Object} props
 * @param {DrawerAlign} [props.align='start'] - Sidebar placement.
 * @param {string} [props.breakpoint='lg'] - Responsive breakpoint for permanent sidebar.
 * @param {React.ReactNode} props.children - Page content.
 * @param {string} [props.className] - Additional class on root.
 * @param {string} [props.closeAriaLabel='close sidebar'] - Aria label for overlay.
 * @param {string} [props.contentClassName] - Additional class on drawer-content.
 * @param {React.ReactNode} [props.navBar] - Navbar element.
 * @param {Function} [props.onClose] - Called when overlay is clicked.
 * @param {boolean} [props.open=false] - Drawer open state (mobile only).
 * @param {React.Ref} [props.ref] - Forwarded ref.
 * @param {React.ReactNode} [props.sideBar] - Sidebar content.
 * @param {string} [props.sideBarClassName] - Additional class on drawer-side.
 */
const Drawer =
({
    align = START ,
    breakpoint = 'lg' ,
    children ,
    className ,
    closeAriaLabel = 'close sidebar' ,
    contentClassName ,
    navBar ,
    onClose ,
    open = false ,
    ref ,
    sideBar ,
    sideBarClassName ,
}) =>
{
    const drawerId   = useId() ;
    const contentRef = useRef( null ) ;
    const sideRef    = useRef( null ) ;

    useResetScroll( contentRef ) ;

    // Handle responsive breakpoint changes
    useEffect( () =>
    {
        const width = breakpoints[ breakpoint ] ;
        if ( !width ) return ;

        const mq = window.matchMedia( `(min-width: ${ width })` ) ;

        const handleChange = ( e ) =>
        {
            // Reset mobile drawer state when entering desktop
            if ( e.matches )
            {
                onClose?.() ;
            }

            // Disable transition during breakpoint change
            const el = sideRef.current ;
            if ( !el ) return ;

            el.style.transition = 'none' ;
            el.querySelectorAll( '*' ).forEach( child =>
            {
                child.style.transition = 'none' ;
            } ) ;

            requestAnimationFrame( () =>
            {
                requestAnimationFrame( () =>
                {
                    el.style.transition = '' ;
                    el.querySelectorAll( '*' ).forEach( child =>
                    {
                        child.style.transition = '' ;
                    } ) ;
                } ) ;
            } ) ;
        } ;

        if ( mq.matches )
        {
            onClose?.() ;
        }

        mq.addEventListener( 'change' , handleChange ) ;

        return () => mq.removeEventListener( 'change' , handleChange ) ;
    }
    , [ breakpoint , onClose ] ) ;

    const breakpointClass =
    {
        md : 'md:drawer-open' ,
        lg : 'lg:drawer-open' ,
        xl : 'xl:drawer-open' ,
    } ;

    const classNames = cn
    (
        'drawer' ,
        breakpointClass[ breakpoint ] ,
        { 'drawer-end' : align === END } ,
        className ,
    ) ;

    const contentClassNames = cn
    (
        'drawer-content flex flex-col h-dvh min-w-0 overflow-y-auto' ,
        contentClassName ,
    ) ;

    const sideBarClassNames = cn
    (
        'drawer-side z-50' ,
        sideBarClassName ,
    ) ;

    return (
        <div className={ classNames } ref={ ref }>

            <input
                id        = { drawerId }
                className = "drawer-toggle"
                type      = "checkbox"
                checked   = { open }
                onChange   = { () => onClose?.() }
            />

            <div className={ contentClassNames } ref={ contentRef }>
                { navBar }
                <main className="flex flex-1 flex-col *:min-w-0">
                    { children }
                </main>
            </div>

            <div className={ sideBarClassNames } ref={ sideRef }>
                <label
                    htmlFor    = { drawerId }
                    className  = "drawer-overlay"
                    aria-label = { closeAriaLabel }
                />
                { sideBar }
            </div>

        </div>
    ) ;
} ;

export default Drawer ;