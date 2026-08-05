'use client' ;


import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import Input  from '../inputs/Input' ;
import Modal  from './Modal' ;
import Button from '../Button' ;

import useModal from './hooks/useModal' ;

/**
 * Input with a modal trigger for complex input scenarios.
 *
 * The preset owns the two labels of its own making — the trigger button
 * (`actionLabel`) and the `agree` button, both read from `components.modal.input`.
 * `disagree` and the close button are left to {@link Modal}, which resolves them
 * from `components.modal`.
 *
 * @param {Object} props
 * @param {string} [props.path='components.modal.input'] - i18n path the `action` / `agree` labels are read from.
 * @param {React.ReactNode} [props.actionLabel] - Trigger button label. Defaults to the i18n `action` key, then `'Browse'`.
 * @param {React.ReactNode} [props.agree] - Agree button label. Defaults to the i18n `agree` key, then to `Modal`'s own resolution.
 * @param {React.ReactNode} [props.disagree] - Disagree button label. Left to `Modal` when omitted.
 *
 * @example
 * ```jsx
 * <InputModal
 *     label="Select Color"
 *     value={color}
 *     onChange={setColor}
 *     modalTitle="Choose a Color"
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

    // i18n
    path = 'components.modal.input',

    // Action button
    actionLabel,
    actionIcon,
    actionColor = 'primary',
    showActionButton = true,

    // Modal props
    modalTitle,
    modalIcon,
    agree,
    agreeColor = 'primary',
    agreeIcon,
    disagree,
    disagreeColor = 'neutral',
    disagreeIcon,
    maxWidth = 'max-w-2xl',
    fullScreen,
    fullScreenBreakpoint,
    placement,
    disableBackdropClick,
    disableEscapeKeyDown,
    portal = false,

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
    const { modalRef, open , isOpen } = useModal({
        onOpen  : onModalOpen,
        onClose : onModalClose,
    }) ;

    const {
        action : actionFromI18n = 'Browse' ,
        agree  : agreeFromI18n ,
    }
    = useI18n( path , NO_LOCALE , false ) ;

    const actionText = actionLabel ?? actionFromI18n ;

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
            { actionText }
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
                agree                = { agree ?? agreeFromI18n }
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
                portal               = { portal }
            >
                { children }
            </Modal>
        </>
    ) ;
} ;

InputModal.displayName = 'InputModal' ;

export default InputModal ;