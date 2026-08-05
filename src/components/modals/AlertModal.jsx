'use client' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import Modal from './Modal' ;

/**
 * Alert modal variant - Single action button.
 *
 * @module components/AlertModal
 *
 * The preset owns one label only : `agree`, read from `components.modal.alert`.
 * There is no disagree button to name, and the close button is left to
 * {@link Modal}, which resolves it from `components.modal`.
 *
 * @param {Object} props
 * @param {string} [props.path='components.modal.alert'] - i18n path the `agree` label is read from.
 * @param {React.ReactNode} [props.agree] - Agree button label. Defaults to the i18n `agree` key, then to `Modal`'s own resolution.
 *
 * @example
 * ```jsx
 * <AlertModal
 *     ref={alertRef}
 *     title="Success"
 *     agreeColor="success"
 * >
 *     <p>Operation completed successfully!</p>
 * </AlertModal>
 * ```
 */
const AlertModal =
({
    ref,
    agree,
    agreeColor = 'primary',
    path = 'components.modal.alert',
    ...props
}) =>
{
    const { agree : agreeFromI18n } = useI18n( path , NO_LOCALE , false ) ;

    // See ConfirmModal : a custom footer replaces the standard one entirely.
    const hasCustomFooter = props.footerNode !== undefined && props.footerNode !== null ;

    const footerProps = hasCustomFooter ? {} :
    {
        agree        : agree ?? agreeFromI18n ,
        agreeColor   : agreeColor ,
        showAgree    : true ,
        showDisagree : false ,
    } ;

    return (
        <Modal
            ref = { ref }
            { ...footerProps }
            { ...props }
        />
    ) ;
} ;

AlertModal.displayName = 'AlertModal' ;

export default AlertModal ;
