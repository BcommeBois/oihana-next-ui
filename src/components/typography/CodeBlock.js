/**
 * Code block with copy button and optional toast notifications.
 *
 * @module components/typography/CodeBlock
 */

import { useState } from 'react' ;

import cn from '@/themes/helpers/cn' ;

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' ;

import useClipboard from '@/hooks/useClipboard' ;

import useToast, { ERROR, SUCCESS } from '@/contexts/toasts/useToast' ;

/**
 * @param {Object} props
 * @param {string} props.children - Code content.
 * @param {string} [props.className] - Additional classes.
 * @param {string} props.language - Programming language.
 * @param {boolean} [props.showCopyButton=true] - Show copy button.
 * @param {boolean} [props.showLineNumbers=false] - Show line numbers.
 * @param {Object} props.style - Syntax highlighting theme.
 * @param {boolean} [props.showToast=false] - Show toast notifications on copy.
 * @param {number} [props.toastDelay=4000] - Toast notification duration.
 * @param {string} [props.successMessage='Code copied!'] - Success toast message.
 * @param {string} [props.errorMessage='Copy failed'] - Error toast message.
 * @param {string} [props.copyButtonText='📋 Copy'] - Copy button text.
 * @param {string} [props.copiedButtonText='✓ Copied'] - Copied button text.
 * @returns {React.JSX.Element}
 */
const CodeBlock =
({
    children,
    className,
    language,
    showCopyButton = true,
    showLineNumbers = false,
    style,
    showToast = false,
    toastDelay = 4000,
    successMessage = 'Code copied!',
    errorMessage = 'Copy failed',
    copyButtonText = '📋 Copy',
    copiedButtonText = '✓ Copied',
}) =>
{
    const [ copied, setCopied ] = useState( false ) ;
    const { alert } = useToast( { delay: toastDelay, show: showToast } ) ;
    const [ , copyToClipboard ] = useClipboard() ;

    const handleCopy = async () =>
    {
        const text = String( children ).replace( /\n$/, '' ).trim() ;

        if ( !text ) return ;

        if ( showToast )
        {
            // Mode avec toast
            const result = await copyToClipboard( text ) ;

            if ( result === ERROR )
            {
                alert( errorMessage, ERROR ) ;
            }
            else if ( result === SUCCESS )
            {
                alert( successMessage, SUCCESS ) ;
            }
        }
        else
        {
            // Mode simple avec état copied
            await navigator.clipboard.writeText( text ) ;
            setCopied( true ) ;
            setTimeout( () => setCopied( false ), 2000 ) ;
        }
    } ;

    return (
        <div className="relative group">
            {
                showCopyButton && (
                    <button
                        onClick    = { handleCopy }
                        className  = "absolute top-2 right-2 btn btn-xs btn-ghost opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        aria-label = "Copy code"
                    >
                        { copied ? copiedButtonText : copyButtonText }
                    </button>
                )
            }

            <SyntaxHighlighter
                language        = { language }
                style           = { style }
                showLineNumbers = { showLineNumbers }
                className       = { cn( 'p-4! rounded-xl', className ) }
                customStyle     = {{
                    margin       : '1rem 0',
                    borderRadius : '0.75rem',
                    paddingTop   : showCopyButton ? '2.5rem' : '1rem',
                }}
            >
                { String( children ).replace( /\n$/, '' ).trim() }
            </SyntaxHighlighter>
        </div>
    ) ;
} ;

CodeBlock.displayName = 'CodeBlock' ;

export default CodeBlock ;