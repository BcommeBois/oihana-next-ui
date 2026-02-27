'use client' ;

import Modal from './Modal' ;

/**
 * Confirmation modal variant - Two action buttons with destructive styling.
 *
 * @module components/ConfirmModal
 *
 * @example
 * ```jsx
 * <ConfirmModal
 *     ref={confirmRef}
 *     title="Delete Item"
 *     agree="Delete"
 *     onAgree={handleDelete}
 * >
 *     <p>Are you sure you want to delete this item?</p>
 * </ConfirmModal>
 * ```
 */
const ConfirmModal =
({
    ref,
    agree = 'Confirm',
    agreeColor = 'error',
    disagree = 'Cancel',
    disagreeColor = 'neutral',
    ...props
}) =>
{
    return (
        <Modal
            ref           = { ref }
            agree         = { agree }
            agreeColor    = { agreeColor }
            disagree      = { disagree }
            disagreeColor = { disagreeColor }
            showAgree     = { true }
            showDisagree  = { true }
            { ...props }
        />
    ) ;
} ;

ConfirmModal.displayName = 'ConfirmModal' ;

export default ConfirmModal ;