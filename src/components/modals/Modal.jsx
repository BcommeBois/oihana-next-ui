'use client' ;

import { useId , useRef } from 'react'

import useBreakpoint from '../../themes/hooks/useBreakpoint'

import Button from '../Button'

import { MdOutlineClose as CloseIcon } from "react-icons/md";

import cn from '../../themes/helpers/cn'

import
{
    getModalClasses,
    getModalBoxClasses,
    getModalActionClasses,
    getModalBackdropClasses,
}
from '../../themes/components/modal' ;

const FOOTER_NODE_OVERRIDE_PROPS =
[
    'agree',
    'disagree',
    'agreeColor',
    'disagreeColor',
    'agreeIcon',
    'disagreeIcon',
    'agreeDisabled',
    'disagreeDisabled',
    'showAgree',
    'showDisagree',
    'showFooter',
    'footerReverse',
    'footerClassName',
    'footerOptions',
    'onAgree',
    'onCancel',
] ;

/**
 * Accessible dialog primitive built on top of the native `<dialog>` element and DaisyUI's `modal` styles.
 *
 * Two layout modes:
 *
 * 1. **Standard mode** (default) — header (sticky top), free-flow content area, optional footer
 *    rendered as a `modal-action` row with `agree` / `disagree` buttons (sticky bottom). The whole
 *    modal-box is the scroll container, header and footer stick to its edges as the user scrolls.
 *
 * 2. **Custom-footer mode** — activated by passing a `footerNode`. The modal-box becomes a vertical
 *    flex column: the content area grows and scrolls internally, while `footerNode` is rendered
 *    in a dedicated, non-scrollable, border-topped slot at the bottom. Use this for forms with
 *    a status text + custom action buttons, or any case where the standard footer is too rigid.
 *
 * When `footerNode` is provided, the standard footer (`agree`, `disagree`, `footerOptions`,
 * `showFooter`, `footerReverse`, `footerClassName`, `onAgree`, `onCancel`, etc.) is **fully
 * ignored** — `footerNode` wins. A `console.warn` is emitted in development if overlapping
 * props are passed alongside.
 *
 * @example Standard usage with agree / disagree
 * ```jsx
 * <Modal
 *     ref      = { modalRef }
 *     title    = "Save changes?"
 *     agree    = "Save"
 *     disagree = "Cancel"
 *     onAgree  = { handleSave }
 * >
 *     <p>Your unsaved changes will be lost.</p>
 * </Modal>
 * ```
 *
 * @example Custom footer with scrollable form (no `!important` overrides)
 * ```jsx
 * <Modal
 *     ref        = { modalRef }
 *     title      = "Edit profile"
 *     footerNode = {
 *         <div className="flex items-center gap-3 px-4 py-3">
 *             <span className="text-sm text-base-content/60">Saved 2s ago</span>
 *             <div className="ml-auto flex gap-2">
 *                 <Button color="neutral" onClick={ handleCancel }>Cancel</Button>
 *                 <Button color="primary" onClick={ handleSave }>Save</Button>
 *             </div>
 *         </div>
 *     }
 * >
 *     <form className="flex flex-col gap-4">
 *         { /* many fields, the form scrolls — footer stays visible *\/ }
 *     </form>
 * </Modal>
 * ```
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.title] - Modal title (rendered in the header).
 * @param {React.ReactNode} [props.icon] - Icon shown left of the title.
 * @param {React.ReactNode} [props.headerOptions] - Extra nodes injected in the header row.
 * @param {React.ReactNode} [props.footerOptions] - Extra nodes rendered alongside agree/disagree (standard mode only).
 * @param {React.ReactNode} [props.footerNode] - **Custom footer** that fully replaces the standard footer. Activates the flex-column layout (sticky footer + internal content scroll). When set, all `agree*`/`disagree*`/`footer*`/`onAgree`/`onCancel`/`showFooter` props are ignored.
 * @param {React.ReactNode} [props.children] - Modal body content.
 * @param {string} [props.maxWidth='max-w-2xl'] - Tailwind max-width class for the modal-box.
 * @param {boolean} [props.fullScreen] - Force full-screen modal.
 * @param {string}  [props.fullScreenBreakpoint] - Tailwind breakpoint below which the modal becomes full-screen (e.g. `'md'`).
 * @param {string}  [props.placement='middle'] - `'top'` | `'middle'` | `'bottom'` | `'start'` | `'end'`.
 * @param {string}  [props.responsivePlacement] - Responsive placement (e.g. `'sm:modal-middle'`).
 * @param {boolean} [props.disableBackdropClick=false] - Prevent close on backdrop click.
 * @param {boolean} [props.disableEscapeKeyDown=false] - Prevent close on `Escape`.
 * @param {string}  [props.contentClassName] - Extra classes on the content wrapper. In custom-footer mode, the default is `flex-1 min-h-0 overflow-y-auto p-2 py-4`; in standard mode, `overflow-y-auto h-full p-2 py-4`.
 * @param {string}  [props.modalBoxClassName] - Extra classes on the modal-box.
 *
 * @see https://daisyui.com/components/modal
 */
const Modal = ( props ) =>
{
    const
    {
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

        // Footer (standard mode)
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

        // Footer (custom mode)
        footerNode,

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
    }
    = props ;

    const dialogRef = useRef( null ) ;
    const titleId   = useId() ;

    const hasCustomFooter = footerNode !== undefined && footerNode !== null ;

    if ( process.env.NODE_ENV !== 'production' && hasCustomFooter )
    {
        const overlap = FOOTER_NODE_OVERRIDE_PROPS.filter( key => key in props && props[ key ] !== undefined ) ;
        if ( overlap.length > 0 )
        {
            console.warn(
                `[Modal] \`footerNode\` is set, the following overlapping prop(s) are ignored: ${ overlap.join( ', ' ) }. ` +
                `Move this content into \`footerNode\` itself.`
            ) ;
        }
    }

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

    const handleCancelClick = () =>
    {
        dialogRef.current?.close() ;
        onCancel?.() ;
    } ;

    const handleClose = () =>
    {
        onClose?.() ;
    } ;

    const handleEscapeKey = event =>
    {
        if ( disableEscapeKeyDown )
        {
            event.preventDefault() ;
        }
    } ;

    const handleKeyDown = event =>
    {
        if ( disableEscapeKeyDown && event.key === 'Escape' )
        {
            event.preventDefault() ;
            event.stopPropagation() ;
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
        flexLayout : hasCustomFooter,
        className  : modalBoxClassName,
    }) ;

    const modalActionClasses = getModalActionClasses({
        reverse   : footerReverse,
        className : footerClassName,
    }) ;

    const backdropClasses = getModalBackdropClasses({
        className : backdropClassName,
    }) ;

    const contentClasses = hasCustomFooter
        ? cn( 'flex-1 min-h-0 overflow-y-auto p-2 py-4' , contentClassName )
        : cn( 'overflow-y-auto h-full p-2 py-4'         , contentClassName ) ;

    const headerClasses = hasCustomFooter
        ? cn( 'shrink-0 bg-base-100 border-b border-base-300/60 z-10 p-2 pb-3' , headerClassName )
        : cn( 'sticky top-0 bg-base-100 border-b border-base-300/60 z-10 p-2 pb-3' , headerClassName ) ;

    return (
        <dialog
            aria-labelledby = { showTitle && title ? titleId : undefined }
            ref             = { handleRef }
            className       = { modalClasses }
            onClose         = { handleClose }
            onCancel        = { handleEscapeKey }
            onKeyDown       = { handleKeyDown }
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
                    <div className={ headerClasses }>
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

                <div className={ contentClasses }>
                    { children }
                </div>

                { hasCustomFooter ? (
                    <div className="shrink-0 bg-base-100 border-t border-base-300/60">
                        { footerNode }
                    </div>
                ) : showFooter && (
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
