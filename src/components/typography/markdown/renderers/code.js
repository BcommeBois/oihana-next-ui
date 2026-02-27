/**
 * Markdown code renderer with syntax highlighting.
 *
 * @module components/typography/markdown/renderers/code
 */

import cn from '@/themes/helpers/cn'

import CodeBlock          from '../../CodeBlock'
import CodeBlockWithToast from '../../CodeBlockWithToast'
import MockupCodeBlock    from '../MockupCodeBlock'

const code =
(
    codeBgColor ,
    codeClassName ,
    codeTheme ,
    showCopyButton ,
    showLineNumbers ,
    showToast ,
    toastDelay ,
    copyButtonProps ,
    mockup = false
) => props =>
{
    const match = /language-(\w+)/.exec( props.className || '' ) ;
    const language = match ? match[ 1 ] : '' ;

    const isInline = !props.className && typeof props.children === 'string' && !props.children.includes( '\n' ) ;

    if ( isInline )
    {
        return (
            <code className="badge badge-soft badge-neutral font-mono gap-0 font-semibold">
                { props.children }
            </code>
        ) ;
    }

    const combinedClassName = cn( codeClassName , codeBgColor ) ;

    if ( match )
    {
        if ( mockup )
        {
            return (
                <MockupCodeBlock
                    showCopyButton  = { showCopyButton  }
                    showLineNumbers = { showLineNumbers }
                    className       = { combinedClassName   }
                >
                    { props.children }
                </MockupCodeBlock>
            ) ;
        }

        if ( showToast )
        {
            return (
                <CodeBlockWithToast
                    language        = { language        }
                    style           = { codeTheme       }
                    showLineNumbers = { showLineNumbers }
                    showCopyButton  = { showCopyButton  }
                    showToast       = { showToast       }
                    toastDelay      = { toastDelay      }
                    copyButtonProps = { copyButtonProps }
                    className       = { combinedClassName   }
                >
                    { props.children }
                </CodeBlockWithToast>
            ) ;
        }

        return (
            <CodeBlock
                language        = { language        }
                style           = { codeTheme       }
                showLineNumbers = { showLineNumbers }
                showCopyButton  = { showCopyButton  }
                className       = { combinedClassName   }
            >
                { props.children }
            </CodeBlock>
        ) ;
    }

    return (
        <code className={ cn( 'bg-base-300 text-accent px-1.5 py-0.5 rounded text-sm font-mono' , combinedClassName ) }>
            { props.children }
        </code>
    ) ;
} ;

export default code ;