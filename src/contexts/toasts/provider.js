'use client' ;

/**
 * Toast notification provider with animations.
 *
 * @module contexts/toasts/ToastProvider
 */

import { useEffect , useRef , useState } from 'react' ;

import { AnimatePresence , motion } from 'motion/react' ;

import Alert from '../../components/Alert' ;

import getToastClasses , { BOTTOM , END } from '../../themes/components/toast' ;

import ToastContext from './context' ;

/**
 * Provides toast notification management.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {string} [props.hAlign='end'] - Horizontal alignment.
 * @param {string} [props.vAlign='bottom'] - Vertical alignment.
 * @param {number} [props.zIndex=99999] - Toast container z-index.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <ToastProvider hAlign="end" vAlign="top">
 *     <App />
 * </ToastProvider>
 * ```
 */
const ToastProvider =
({
    children ,
    hAlign = END ,
    vAlign = BOTTOM ,
    zIndex = 99999 ,
}) =>
{
    const [ toasts , setToasts ] = useState( [] ) ;

    const openToast = ( id , message = null , level = null , options = {} ) =>
    {
        setToasts( prev => [ { id , message , level , options } , ...prev ] ) ;
    } ;

    const closeToast = id => () =>
    {
        setToasts( prev => prev.filter( item => item?.id !== id ) ) ;
    } ;

    const clearAllToasts = () =>
    {
        setToasts( [] ) ;
    } ;

    const popoverRef = useRef( null ) ;

    // Promote the wrapper into the browser's top layer via the HTML Popover
    // API. This is the only reliable way to render above a <dialog> opened
    // with `showModal()` — the top layer trumps every z-index in the page.
    // We re-promote on each new toast so the container stays above the most
    // recently opened modal (later promotions stack above earlier ones).
    //
    // The wrapper only exists for top-layer promotion. Toast positioning
    // happens on the *inner* div with DaisyUI classes — putting `popover`
    // directly on the toast div would let UA stylesheet defaults
    // (inset: 0; margin: auto; background: canvas; …) clobber DaisyUI's
    // layered `.toast-*` rules, since unlayered UA rules beat any @layer.
    useEffect( () =>
    {
        const node = popoverRef.current ;
        if ( !node || typeof node.showPopover !== 'function' ) { return ; }

        if ( toasts.length > 0 )
        {
            try { node.hidePopover() ; } catch {}
            try { node.showPopover() ; } catch {}
        }
        else
        {
            try { node.hidePopover() ; } catch {}
        }
    } , [ toasts.length ]) ;

    const toastClasses = getToastClasses(
    {
        beforeClassName : 'pointer-events-none' ,
        hAlign ,
        vAlign ,
    }) ;

    const contextValue = { toasts , clearAllToasts , closeToast , openToast } ;

    return (
        <ToastContext value={ contextValue }>

            { children }

            <div
                ref     = { popoverRef }
                popover = "manual"
                style   = {{
                    // Neutralize the user-agent popover stylesheet so the
                    // wrapper is a fully transparent, click-through, full
                    // viewport surface that simply hosts the inner toast div.
                    position      : 'fixed' ,
                    inset         : 0 ,
                    width         : '100vw' ,
                    height        : '100vh' ,
                    maxWidth      : '100vw' ,
                    maxHeight     : '100vh' ,
                    margin        : 0 ,
                    padding       : 0 ,
                    border        : 'none' ,
                    background    : 'transparent' ,
                    overflow      : 'visible' ,
                    pointerEvents : 'none' ,
                    ...( zIndex > 0 ? { zIndex } : {} ) ,
                }}
            >
                <div className={ toastClasses }>
                    <AnimatePresence mode="popLayout">
                    {
                        toasts.map( ({ id , message , level , options }) =>
                        (
                            <motion.div
                                key        = { id }
                                className  = "w-80 min-w-80 pointer-events-auto"
                                initial    = {{ opacity: 0 , scale: 0.8 , y: -20 }}
                                animate    = {{ opacity: 1 , scale: 1 , y: 0 }}
                                exit       = {{ opacity: 0 , scale: 0.8 , x: 100 }}
                                transition = {{ duration: 0.2 , ease: 'easeOut' }}
                                layout
                            >
                                <Alert
                                    level           = { level }
                                    onClose         = { closeToast( id ) }
                                    showIcon
                                    showCloseButton
                                    { ...options }
                                >
                                    { message }
                                </Alert>
                            </motion.div>
                        ) )
                    }
                    </AnimatePresence>
                </div>
            </div>

        </ToastContext>
    ) ;
} ;

ToastProvider.displayName = 'ToastProvider' ;

export default ToastProvider ;