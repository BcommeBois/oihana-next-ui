'use client' ;

/**
 * Markdown component with syntax highlighting and copy functionality.
 *
 * @module components/typography/markdown/Markdown
 */

import cn from '@/themes/helpers/cn'

import ReactMarkdown from 'react-markdown'

import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import {
    link ,
    blockquote ,
    code ,
    h1 ,
    h2 ,
    h3 ,
    h4 ,
    h5 ,
    h6 ,
    p ,
    ul ,
    ol ,
    li ,
    img ,
    table ,
    hr ,
}
from './markdown/renderers' ;

import breaks        from 'remark-breaks' ;
import gfm           from 'remark-gfm' ;
import externalLinks from 'rehype-external-links' ;
import raw           from 'rehype-raw' ;

const defaultRemarkPlugins = [ gfm , breaks ] ;
const defaultRehypePlugins = [ [ externalLinks , { target: [ '_blank' ] } ] , raw ] ;

/**
 * Markdown component with syntax highlighting, copy functionality, and customizable rendering.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.children - Markdown content to render.
 * @param {string} [props.className] - Additional CSS classes for the wrapper.
 *
 * @param {Object} [props.codeTheme=oneDark] - Syntax highlighting theme from react-syntax-highlighter.
 * @param {string} [props.codeClassName] - Additional CSS classes for code blocks.
 * @param {string} [props.codeBgColor] - Background color for code blocks (CSS class or hex).
 * @param {boolean} [props.showCopyButton=true] - Show copy button on code blocks.
 * @param {Object} [props.copyButtonProps] - Additional props for the copy button.
 * @param {boolean} [props.showLineNumbers=false] - Show line numbers in code blocks.
 * @param {boolean} [props.showToast=false] - Show toast notification on code copy.
 * @param {number} [props.toastDelay=4000] - Toast notification duration in milliseconds.
 * @param {boolean} [props.mockup=false] - Use DaisyUI mockup-code style for code blocks.
 *
 * @param {string} [props.blockquoteClassName] - Additional CSS classes for blockquotes.
 * @param {boolean} [props.blockquoteHtml=true] - Parse HTML inside blockquotes.
 * @param {boolean} [props.blockquoteShowIcon] - Show icon in blockquotes.
 * @param {string} [props.blockquoteSpacing='my-4'] - Vertical spacing for blockquotes.
 *
 * @param {string} [props.linkClassName] - Additional CSS classes for links.
 * @param {string} [props.linkColor='primary'] - Link color (primary, secondary, accent, etc.).
 * @param {boolean} [props.linkHover=true] - Enable hover effect on links.
 *
 * @param {Array} [props.rehypePlugins] - Rehype plugins for HTML processing.
 * @param {Array} [props.remarkPlugins] - Remark plugins for Markdown processing.
 *
 * @returns {React.JSX.Element} Rendered Markdown content.
 *
 * @example
 * // Simple usage
 * <Markdown>
 *     # Hello World
 *     This is **bold** and *italic*.
 * </Markdown>
 *
 * @example
 * // Code with syntax highlighting
 * <Markdown showCopyButton showLineNumbers>
 *     ```javascript
 *     const greeting = 'Hello' ;
 *     console.log( greeting ) ;
 *     ```
 * </Markdown>
 *
 * @example
 * // Mockup style code blocks
 * <Markdown mockup showCopyButton codeBgColor="bg-neutral">
 *     ```bash
 *     npm install
 *     npm run dev
 *     ```
 * </Markdown>
 *
 * @example
 * // Custom blockquote styling
 * <Markdown
 *     blockquoteShowIcon
 *     blockquoteClassName="border-l-primary"
 *     blockquoteSpacing="my-6"
 * >
 *     > This is a **highlighted** quote.
 * </Markdown>
 *
 * @example
 * // Custom link colors
 * <Markdown linkColor="secondary" linkHover={ false }>
 *     [Visit our website](https://example.com)
 * </Markdown>
 *
 * @example
 * // With toast notifications on copy
 * <Markdown showToast toastDelay={ 3000 }>
 *     ```python
 *     def hello():
 *         print("Hello World")
 *     ```
 * </Markdown>
 *
 * @example
 * // Complete configuration
 * <Markdown
 *     className="prose-lg"
 *     codeTheme={ oneDark }
 *     showCopyButton
 *     showLineNumbers
 *     showToast
 *     toastDelay={ 5000 }
 *     blockquoteShowIcon
 *     blockquoteClassName="border-l-accent"
 *     blockquoteSpacing="my-2 sm:my-4"
 *     linkColor="primary"
 *     linkClassName="font-semibold"
 * >
 *     # Documentation
 *
 *     ## Code Example
 *     ```javascript
 *     const app = new App() ;
 *     ```
 *
 *     > **Note**: This is important!
 *
 *     [Read more](https://docs.example.com)
 * </Markdown>
 *
 * @example
 * // From imported markdown file
 * import readme from './README.md' ;
 *
 * <Markdown>{ readme }</Markdown>
 */
const Markdown =
({
    blockquoteClassName ,
    blockquoteHtml = true ,
    blockquoteShowIcon ,
    blockquoteSpacing = 'my-4' ,
    children ,
    className ,
    codeBgColor ,
    codeClassName ,
    codeTheme = oneDark ,
    copyButtonProps ,
    linkClassName ,
    linkColor ,
    linkHover = true ,
    mockup ,
    rehypePlugins = defaultRehypePlugins ,
    remarkPlugins = defaultRemarkPlugins ,
    showCopyButton = true ,
    showLineNumbers = false ,
    showToast = false ,
    toastDelay = 4000 ,
    ...rest
}) =>
{
    const components =
    {
        a          : link( linkClassName , linkColor , linkHover ) ,
        blockquote : blockquote( blockquoteClassName , blockquoteHtml , blockquoteShowIcon , blockquoteSpacing ) ,
        code       : code
        (
            codeBgColor ,
            codeClassName ,
            codeTheme ,
            showCopyButton ,
            showLineNumbers ,
            showToast ,
            toastDelay ,
            copyButtonProps,
            mockup
        ) ,
        h1 ,
        h2 ,
        h3 ,
        h4 ,
        h5 ,
        h6 ,
        p ,
        ul ,
        ol ,
        li ,
        hr ,
        table ,
        img ,
    } ;

    return (
        <div className={ cn( 'markdown-content max-w-none' , className ) }>
            <ReactMarkdown
                components    = { components    }
                rehypePlugins = { rehypePlugins }
                remarkPlugins = { remarkPlugins }
                { ...rest }
            >
                { children }
            </ReactMarkdown>
        </div>
    ) ;
} ;

Markdown.displayName = 'Markdown' ;

export default Markdown ;