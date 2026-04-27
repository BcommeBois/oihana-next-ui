'use client' ;

/**
 * Toast notification provider with animations.
 *
 * @module contexts/toasts/ToastProvider
 */

import { useEffect , useRef , useState } from 'react' ;

import { createPortal } from 'react-dom' ;

import { AnimatePresence , motion } from 'motion/react' ;

import Alert from '../../components/Alert' ;

import getToastClasses , { BOTTOM , END } from '../../themes/components/toast' ;

import ToastContext from './context' ;

/**
 * Provides toast notification management.
 *
 * Toasts are rendered through a React portal whose target dynamically
 * follows the topmost open `<dialog>` (if any), so they paint above modal
 * backdrops via the dialog's own top-layer entry. When no dialog is open,
 * the portal target falls back to `document.body`.
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

    // We own a single, stable <div> in the DOM that hosts the toast UI via
    // a React portal. React only ever sees this div as the portal target —
    // it never moves from React's perspective, so the toast subtree is never
    // unmounted and framer-motion animations don't restart.
    //
    // We physically *move* this div between document.body and the topmost
    // open <dialog> via DOM appendChild. When the div is a child of a
    // modal <dialog>, it inherits the dialog's top-layer entry and paints
    // above the dialog's backdrop / contents — no popover trickery needed,
    // and the toast stays interactive (children of a modal aren't inert).
    const [ container , setContainer ] = useState( null ) ;

    // Tracks dialogs in promotion order (topmost = last). We can't query
    // the browser's top-layer order from JS, so we maintain it ourselves
    // by listening for `open`-attribute mutations on every <dialog>.
    const dialogStackRef = useRef( [] ) ;

    useEffect( () =>
    {
        if ( typeof document === 'undefined' ) { return ; }

        const div = document.createElement( 'div' ) ;
        div.setAttribute( 'data-toast-portal' , '' ) ;
        // Take the container out of normal flow so it doesn't become a grid
        // item when living inside a <dialog> with `display: grid` (DaisyUI's
        // .modal layout) — that would push the modal-box off-center. We
        // give it no size and no `inset`, so it's effectively a zero-area
        // anchor; the inner `.toast` div is itself `position: fixed` and
        // positions on the viewport regardless of where this anchor sits.
        div.style.position = 'fixed' ;
        div.style.top      = '0' ;
        div.style.left     = '0' ;
        div.style.width    = '0' ;
        div.style.height   = '0' ;
        div.style.margin   = '0' ;
        div.style.padding  = '0' ;
        if ( zIndex > 0 ) { div.style.zIndex = String( zIndex ) ; }
        document.body.appendChild( div ) ;
        setContainer( div ) ;

        const moveContainer = () =>
        {
            const stack   = dialogStackRef.current ;
            const topmost = stack[ stack.length - 1 ] ;
            const target  = topmost && topmost.isConnected && topmost.hasAttribute( 'open' )
                ? topmost
                : document.body ;

            if ( div.parentNode !== target )
            {
                target.appendChild( div ) ;
            }
        } ;

        // Initial sync (any dialog already open at mount time?).
        const initialOpen = document.body.querySelectorAll( 'dialog[open]' ) ;
        for ( const d of initialOpen ) { dialogStackRef.current.push( d ) ; }
        moveContainer() ;

        const handleOpened = dialog =>
        {
            const stack = dialogStackRef.current ;
            const idx   = stack.indexOf( dialog ) ;
            if ( idx >= 0 ) { stack.splice( idx , 1 ) ; }
            stack.push( dialog ) ;
        } ;

        const handleClosed = dialog =>
        {
            const stack = dialogStackRef.current ;
            const idx   = stack.indexOf( dialog ) ;
            if ( idx >= 0 ) { stack.splice( idx , 1 ) ; }
        } ;

        const observer = new MutationObserver( mutations =>
        {
            let changed = false ;

            for ( const m of mutations )
            {
                if ( m.type === 'attributes' && m.attributeName === 'open' && m.target?.tagName === 'DIALOG' )
                {
                    if ( m.target.hasAttribute( 'open' ) ) { handleOpened( m.target ) ; }
                    else                                   { handleClosed( m.target ) ; }
                    changed = true ;
                }

                if ( m.type === 'childList' )
                {
                    for ( const n of m.removedNodes )
                    {
                        if ( n?.nodeType === 1 && n.tagName === 'DIALOG' )
                        {
                            handleClosed( n ) ;
                            changed = true ;
                        }
                        else if ( n?.nodeType === 1 && n.querySelectorAll )
                        {
                            for ( const d of n.querySelectorAll( 'dialog' ) )
                            {
                                handleClosed( d ) ;
                                changed = true ;
                            }
                        }
                    }
                }
            }

            if ( changed ) { moveContainer() ; }
        }) ;

        observer.observe( document.body ,
        {
            childList       : true ,
            subtree         : true ,
            attributes      : true ,
            attributeFilter : [ 'open' ] ,
        }) ;

        return () =>
        {
            observer.disconnect() ;
            div.remove() ;
            dialogStackRef.current = [] ;
        } ;
    } , [ zIndex ]) ;

    const toastClasses = getToastClasses(
    {
        beforeClassName : 'pointer-events-none' ,
        hAlign ,
        vAlign ,
    }) ;

    const contextValue = { toasts , clearAllToasts , closeToast , openToast } ;

    const toastNode = (
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
    ) ;

    return (
        <ToastContext value={ contextValue }>
            { children }
            { container ? createPortal( toastNode , container ) : null }
        </ToastContext>
    ) ;
} ;

ToastProvider.displayName = 'ToastProvider' ;

export default ToastProvider ;
