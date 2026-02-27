'use client' ;

import { useId , useRef } from 'react'

import useBreakpoint from '@/themes/hooks/useBreakpoint'

import Button from '@/components/Button'

import { MdOutlineClose as CloseIcon } from "react-icons/md";

import cn from '@/themes/helpers/cn'

import
{
    getModalClasses,
    getModalBoxClasses,
    getModalActionClasses,
    getModalBackdropClasses,
}
from '@/themes/components/modal' ;

const Modal =
({
    // Header
    closeClassName ,
    closeIcon= <CloseIcon size={20}/>,
    closeTitle = 'Close' ,
    title,
    icon,
    showHeader = true,
    showTitle = true,
    showIcon = true,
    showCloseButton = true,
    headerClassName,
    headerOptions,

    // Footer
    agree = 'OK',
    disagree = 'Cancel',
    agreeColor = 'primary',
    disagreeColor = 'neutral',
    agreeIcon,
    disagreeIcon,
    agreeDisabled,
    disagreeDisabled,
    showFooter = true,
    showAgree = true,
    showDisagree = true,
    footerReverse = false,
    footerClassName,
    footerOptions,
    onAgree,
    onCancel,

    // Layout
    placement = 'middle',
    responsivePlacement,
    maxWidth = 'max-w-2xl',
    fullScreen,
    fullScreenBreakpoint,
    fullWidth,

    // Backdrop
    showBackdrop = true,
    disableBackdropClick = false,
    backdropClassName,

    // Behavior
    disableEscapeKeyDown = false,
    disabled,
    onClose,

    // Content
    children,

    // Styling
    className,
    modalBoxClassName,
    contentClassName,
    titleClassName,

    // Ref
    ref,
}) =>
{
    const dialogRef = useRef( null ) ;
    const titleId   = useId() ;

    const isAboveBreakpoint = fullScreenBreakpoint
                            ? useBreakpoint( fullScreenBreakpoint )
                            : true ;

    const isFullScreen = fullScreen || ( fullScreenBreakpoint ? !isAboveBreakpoint : false ) ;

    const handleRef = node =>
    {
        dialogRef.current = node ;

        if (typeof ref === 'function')
        {
            ref( node ) ;
        }
        else if ( ref )
        {
            ref.current = node ;
        }
    } ;

    const handleAgreeClick = () =>
    {
        dialogRef.current?.close() ;
        onAgree?.() ;
    } ;

    const handleCancelClick = () =>
    {
        dialogRef.current?.close() ;
        onCancel?.() ;
    } ;

    const handleClose = () =>
    {
        onClose?.() ;
    } ;

    const handleBackdropClick = ( e ) =>
    {
        if ( disableBackdropClick )
        {
            e.preventDefault() ;
            return ;
        }

        if ( e.target === e.currentTarget )
        {
            dialogRef.current?.close() ;
        }
    } ;

    const handleEscapeKey = event =>
    {
        if ( disableEscapeKeyDown )
        {
            event.preventDefault() ;
        }
    } ;

    const modalClasses = getModalClasses({
        placement           : responsivePlacement || placement,
        responsivePlacement ,
        className,
    }) ;

    const modalBoxClasses = getModalBoxClasses({
        maxWidth,
        fullScreen : isFullScreen,
        fullWidth,
        placement  : responsivePlacement || placement,
        className  : modalBoxClassName,
    }) ;

    const modalActionClasses = getModalActionClasses({
        reverse   : footerReverse,
        className : footerClassName,
    }) ;

    const backdropClasses = getModalBackdropClasses({
        className : backdropClassName,
    }) ;

    return (
        <dialog
            aria-labelledby = { showTitle && title ? titleId : undefined }
            ref             = { handleRef }
            className       = { modalClasses }
            onClose         = { handleClose }
            onCancel        = { handleEscapeKey }
        >
            {/* Backdrop */}
            { showBackdrop && (
                <div
                    className = { backdropClasses }
                    onClick   = { handleBackdropClick }
                />
            )}

            <div className={ modalBoxClasses }>

                { showHeader && (
                    <div className={`sticky top-0 bg-base-100 border-b border-base-300/60 z-10 p-2 pb-3 ${ headerClassName || '' }`}>
                        <div className="flex items-center gap-3">

                            { showIcon && icon && (
                                <div className="shrink-0">
                                    { icon }
                                </div>
                            )}

                            { showTitle && title && (
                                <h3
                                    className = { cn( "font-bold text-lg flex-1" , titleClassName ) }
                                    id        = { titleId }
                                >
                                    { title }
                                </h3>
                            )}

                            { headerOptions }

                            { showCloseButton && (
                                <button
                                    aria-label = { closeTitle }
                                    className  = { cn( "btn btn-md btn-circle btn-ghost" , closeClassName ) }
                                    onClick    = { handleCancelClick }
                                    disabled   = { disabled }
                                    title      = { closeTitle }
                                >
                                    { closeIcon }
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <div className={`overflow-y-auto h-full p-2 py-4 ${ contentClassName || '' }`}>
                    { children }
                </div>

                { showFooter && (
                    <div className={`sticky bottom-0 bg-base-100 border-t border-base-300/60 p-0 ${ footerClassName || '' }`}>

                        <div className={ modalActionClasses }>

                            { footerOptions }

                            { showDisagree && (
                                <Button
                                    color    = { disagreeColor }
                                    onClick  = { handleCancelClick }
                                    disabled = { disabled || disagreeDisabled }
                                >
                                    { disagreeIcon }
                                    { disagree }
                                </Button>
                            )}

                            { showAgree && (
                                <Button
                                    color    = { agreeColor }
                                    onClick  = { handleAgreeClick }
                                    disabled = { disabled || agreeDisabled }
                                >
                                    { agreeIcon }
                                    { agree }
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </dialog>
    ) ;
} ;

Modal.displayName = 'Modal' ;

export default Modal ;