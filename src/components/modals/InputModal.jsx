'use client' ;


import Input  from '../inputs/Input' ;
import Modal  from './Modal' ;
import Button from '../Button' ;

import useModal from './hooks/useModal' ;

/**
 * Input with a modal trigger for complex input scenarios.
 *
 * @param {Object} props
 *
 * @example
 * ```jsx
 * <InputModal
 *     label="Select Color"
 *     value={color}
 *     onChange={setColor}
 *     modalTitle="Choose a Color"
 *     actionLabel="Browse"
 *     openOnFocus
 * >
 *     <ColorPicker value={color} onChange={setColor} />
 * </InputModal>
 * ```
 */
const InputModal =
({
    // Input props
    label,
    value,
    onChange,
    placeholder,
    icon,
    disabled,
    readOnly = true,
    error,
    helper,
    className,
    inputClassName,
    size,

    // Action button
    actionLabel = 'Browse',
    actionIcon,
    actionColor = 'primary',
    showActionButton = true,

    // Modal props
    modalTitle,
    modalIcon,
    agree = 'Apply',
    agreeColor = 'primary',
    agreeIcon,
    disagree = 'Cancel',
    disagreeColor = 'neutral',
    disagreeIcon,
    maxWidth = 'max-w-2xl',
    fullScreen,
    fullScreenBreakpoint,
    placement,
    disableBackdropClick,
    disableEscapeKeyDown,

    // Behavior
    openOnFocus = false,

    // Content
    children,

    // Callbacks
    onModalOpen,
    onModalClose,
    onAgree,
    onCancel,
    onFocus: onFocusFromProps,

    // Additional props
    ...inputProps
}) =>
{
    const { modalRef, open , close , isOpen } = useModal({
        onOpen  : onModalOpen,
        onClose : onModalClose,
    }) ;

    // ✅ Modal.jsx ferme déjà le dialog avant d'appeler ces callbacks
    const handleAgree = () =>
    {
        onAgree?.() ;
    } ;

    const handleCancel = () =>
    {
        onCancel?.() ;
    } ;

    const handleFocus = ( e ) =>
    {
        onFocusFromProps?.( e ) ;

        // Guard against the focus-return loop : closing the modal returns focus to
        // this input, which would re-fire `focus` and reopen it. At that moment
        // `isOpen` is still true (the close event updates it afterwards), so we skip.
        if ( openOnFocus && !disabled && !isOpen )
        {
            open() ;
        }
    } ;

    const actionButton = showActionButton ? (
        <Button
            color     = { actionColor }
            onClick   = { open }
            disabled  = { disabled }
            size      = { size }
            className = "join-item"
        >
            { actionIcon }
            { actionLabel }
        </Button>
    ) : null ;

    return (
        <>
            <Input
                label       = { label }
                value       = { value }
                onChange    = { onChange }
                placeholder = { placeholder }
                icon        = { icon }
                disabled    = { disabled }
                readOnly    = { readOnly }
                error       = { error }
                helper      = { helper }
                className   = { className }
                size        = { size }
                actions     = { actionButton }
                onFocus     = { handleFocus }
                { ...inputProps }
            />

            <Modal
                ref                  = { modalRef }
                title                = { modalTitle || label }
                icon                 = { modalIcon }
                agree                = { agree }
                agreeColor           = { agreeColor }
                agreeIcon            = { agreeIcon }
                disagree             = { disagree }
                disagreeColor        = { disagreeColor }
                disagreeIcon         = { disagreeIcon }
                onAgree              = { handleAgree }
                onCancel             = { handleCancel }
                maxWidth             = { maxWidth }
                fullScreen           = { fullScreen }
                fullScreenBreakpoint = { fullScreenBreakpoint }
                placement            = { placement }
                disableBackdropClick = { disableBackdropClick }
                disableEscapeKeyDown = { disableEscapeKeyDown }
            >
                { children }
            </Modal>
        </>
    ) ;
} ;

InputModal.displayName = 'InputModal' ;

export default InputModal ;