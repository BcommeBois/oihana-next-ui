'use client' ;

import Modal from './Modal' ;

/**
 * Alert modal variant - Single action button.
 *
 * @module components/AlertModal
 *
 * @example
 * ```jsx
 * <AlertModal
 *     ref={alertRef}
 *     title="Success"
 *     agree="OK"
 *     agreeColor="success"
 * >
 *     <p>Operation completed successfully!</p>
 * </AlertModal>
 * ```
 */
const AlertModal =
({
    ref,
    agree = 'OK',
    agreeColor = 'primary',
    disagreeColor = 'neutral',
    ...props
}) =>
{
    return (
        <Modal
            ref           = { ref }
            agree         = { agree }
            agreeColor    = { agreeColor }
            disagreeColor = { disagreeColor }
            showAgree     = { true }
            showDisagree  = { false }
            { ...props }
        />
    ) ;
} ;

AlertModal.displayName = 'AlertModal' ;

export default AlertModal ;