/**
 * Code block with CopyButton component and toast notifications.
 * Wrapper around CodeBlock with toast functionality.
 *
 * @module components/typography/CodeBlockWithToast
 */

import CodeBlock from './CodeBlock' ;

/**
 * @param {Object} props
 * @param {boolean} [props.showToast=false] - Show toast notifications on copy.
 * @param {number} [props.toastDelay=4000] - Toast notification duration.
 * @param {string} [props.successMessage='Code copied!'] - Success toast message.
 * @param {string} [props.errorMessage='Copy failed'] - Error toast message.
 * @param {Object} [props.rest] - The default code block properties.
 * @returns {React.JSX.Element}
 */
const CodeBlockWithToast =
({
    successMessage = 'Code copied!',
    errorMessage = 'Copy failed',
    showToast = true,
    toastDelay = 4000,
    ...rest
}) =>
{
    // Simply use CodeBlock with showToast enabled
    return (
        <CodeBlock
            { ...rest }
            showToast        = { showToast }
            toastDelay       = { toastDelay }
            successMessage   = { successMessage }
            errorMessage     = { errorMessage }
        />
    ) ;
} ;

CodeBlockWithToast.displayName = 'CodeBlockWithToast' ;

export default CodeBlockWithToast ;