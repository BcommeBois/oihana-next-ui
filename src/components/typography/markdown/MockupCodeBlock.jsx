/**
 * DaisyUI mockup-code block component.
 *
 * @module components/typography/markdown/MockupCodeBlock
 */

import { useState } from 'react' ;

import cn from '../../../themes/helpers/cn' ;

/**
 * @param {Object} props
 * @param {string} props.children - Code content.
 * @param {string} [props.className] - Additional classes.
 * @param {boolean} [props.showCopyButton=true] - Show copy button.
 * @param {boolean} [props.showLineNumbers=true] - Show line numbers.
 * @returns {React.JSX.Element}
 */
const MockupCodeBlock =
({
    children ,
    className ,
    showCopyButton = true ,
    showLineNumbers = true ,
}) =>
{
    const [ copied , setCopied ] = useState( false ) ;

    const handleCopy = async () =>
    {
        await navigator.clipboard.writeText( String( children ) ) ;
        setCopied( true ) ;
        setTimeout( () => setCopied( false ) , 2000 ) ;
    } ;

    const lines = String( children ).split( '\n' ).filter( line => line.trim() ) ;

    return (
        <div className={ cn( 'mockup-code bg-base-100 relative group my-1! sm:my-4 text-base-content' , className ) }>
            {
                showCopyButton &&
                (
                    <button
                        onClick    = { handleCopy }
                        className  = "absolute top-4 right-4 btn btn-xs btn-ghost btn-square opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        aria-label = "Copy code"
                    >
                        { copied ? '✓' : '📋' }
                    </button>
                )
            }
            {
                lines.map( ( line , index ) => (
                    <pre
                        className   = 'text-base-content'
                        key         ={ index }
                        data-prefix ={ showLineNumbers ? index + 1 : '$' }
                    >
                        <code>{ line }</code>
                    </pre>
                ))
            }
        </div>
    ) ;
} ;

MockupCodeBlock.displayName = 'MockupCodeBlock' ;

export default MockupCodeBlock ;