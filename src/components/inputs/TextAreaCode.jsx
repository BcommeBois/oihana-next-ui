'use client' ;

import { useState, useRef } from 'react'

import TextArea from './TextArea'

import CodeBlock from '@/components/typography/CodeBlock'

import cn from '@/themes/helpers/cn'

import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

/**
 * TextArea optimized for code editing with tab handling and optional syntax preview.
 *
 * @param {Object} props
 * @param {string} [props.language='javascript'] - Programming language for syntax highlighting
 * @param {number} [props.tabSize=2] - Number of spaces for tab
 * @param {boolean} [props.handleTab=true] - Intercept Tab key to insert spaces
 * @param {boolean} [props.showPreview=false] - Show syntax-highlighted preview
 * @param {string} [props.previewPosition='right'] - 'right' or 'bottom'
 * @param {Object} [props.codeTheme=oneDark] - Syntax highlighting theme
 * @param {boolean} [props.showLineNumbers=true] - Show line numbers in preview
 * @param {Object} props.rest - Other props passed to TextArea
 */
const TextAreaCode =
({
    language = 'javascript',
    tabSize = 2,
    handleTab = true,
    showPreview = false,
    previewPosition = 'right',
    codeTheme = oneDark,
    showLineNumbers = true,
    ...rest
}) =>
{
    const [ value, setValue ] = useState( rest.defaultValue || '' ) ;
    const textareaRef = useRef( null ) ;

    const handleChange = newValue =>
    {
        setValue( newValue ) ;
        rest.onChange?.( newValue ) ;
    } ;

    const handleKeyDown = event =>
    {
        if ( !handleTab || event.key !== 'Tab' )
        {
            rest.onKeyDown?.( event ) ;
            return ;
        }

        event.preventDefault() ;

        const textarea = textareaRef.current ;
        if ( !textarea ) return ;

        const { selectionStart, selectionEnd, value: currentValue } = textarea ;
        const spaces = ' '.repeat( tabSize ) ;

        const newValue =
            currentValue.substring( 0, selectionStart ) +
            spaces +
            currentValue.substring( selectionEnd ) ;

        setValue( newValue ) ;
        rest.onChange?.( newValue ) ;

        // Restore cursor position
        setTimeout( () =>
        {
            textarea.selectionStart = textarea.selectionEnd = selectionStart + tabSize ;
            textarea.focus() ;
        }, 0 ) ;
    } ;

    const isHorizontal = previewPosition === 'right' ;

    if ( !showPreview )
    {
        return (
            <TextArea
                { ...rest }
                className   ="font-mono"
                onChange    = { handleChange }
                onKeyDown   = { handleKeyDown }
                ref         = { textareaRef }
                value       = { value }
            />
        ) ;
    }

    return (
        <div className={ cn(
            'grid gap-4',
            isHorizontal ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
        )}>
            {/* Editor */}
            <div>
                <TextArea
                    { ...rest }
                    className = "font-mono"
                    onChange  = { handleChange }
                    onKeyDown = { handleKeyDown }
                    ref       = { textareaRef }
                    value     = { value }
                />
            </div>

            {/* Preview */}
            <div>
                { rest.label && (
                    <label className="label">
                        <span className="label-text">Preview</span>
                    </label>
                )}
                <CodeBlock
                    language        = { language }
                    style           = { codeTheme }
                    showLineNumbers = { showLineNumbers }
                    showCopyButton  = { false }
                >
                    { value || '// Empty' }
                </CodeBlock>
            </div>
        </div>
    ) ;
} ;

export default TextAreaCode ;