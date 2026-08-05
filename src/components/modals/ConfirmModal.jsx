'use client' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import Modal from './Modal' ;

/**
 * Confirmation modal variant - Two action buttons with destructive styling.
 *
 * @module components/ConfirmModal
 *
 * The preset owns one label only : `agree`, read from `components.modal.confirm`
 * so a confirmation reads « Confirmer » where a plain `Modal` reads « OK ».
 * `disagree` and the close button are left to {@link Modal}, which resolves them
 * from `components.modal` — declaring them twice is what let a stray English
 * label survive in the first place.
 *
 * @param {Object} props
 * @param {string} [props.path='components.modal.confirm'] - i18n path the `agree` label is read from.
 * @param {React.ReactNode} [props.agree] - Agree button label. Defaults to the i18n `agree` key, then to `Modal`'s own resolution.
 * @param {React.ReactNode} [props.disagree] - Disagree button label. Left to `Modal` when omitted.
 *
 * @example
 * ```jsx
 * <ConfirmModal
 *     ref={confirmRef}
 *     title="Delete Item"
 *     onAgree={handleDelete}
 * >
 *     <p>Are you sure you want to delete this item?</p>
 * </ConfirmModal>
 * ```
 */
const ConfirmModal =
({
    ref,
    agree,
    agreeColor = 'error',
    disagree,
    disagreeColor = 'neutral',
    path = 'components.modal.confirm',
    ...props
}) =>
{
    const { agree : agreeFromI18n } = useI18n( path , NO_LOCALE , false ) ;

    // A `footerNode` replaces the standard footer wholesale, so the preset must not
    // inject its own footer props alongside it : they would be ignored anyway, and
    // they would trip Modal's development warning with names the caller never wrote.
    const hasCustomFooter = props.footerNode !== undefined && props.footerNode !== null ;

    const footerProps = hasCustomFooter ? {} :
    {
        agree         : agree ?? agreeFromI18n ,
        agreeColor    : agreeColor ,
        disagree      : disagree ,
        disagreeColor : disagreeColor ,
        showAgree     : true ,
        showDisagree  : true ,
    } ;

    return (
        <Modal
            ref = { ref }
            { ...footerProps }
            { ...props }
        />
    ) ;
} ;

ConfirmModal.displayName = 'ConfirmModal' ;

export default ConfirmModal ;
