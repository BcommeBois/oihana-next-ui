/**
 * Markdown link with styling.
 *
 * @module components/typography/markdown/MarkdownLink
 */

import getLinkClassName from '../../../themes/navigation/link' ;

/**
 * @param {Object} props
 * @param {string} [props.className] - Additional classes.
 * @param {string} [props.color='primary'] - Link color.
 * @param {boolean} [props.hover=true] - Link hover effect.
 * @param {string} props.href - Link URL.
 * @param {React.ReactNode} props.children - Link content.
 * @returns {React.JSX.Element}
 */
const MarkdownLink =
({
    className ,
    color ,
    hover = true ,
    href ,
    children ,
    ...otherProps
}) =>
{
    const classNames = getLinkClassName({ color , className , hover }) ;

    return (
        <a
            href      = { href }
            className = { classNames }
            { ...otherProps }
        >
            { children }
        </a>
    )
} ;

MarkdownLink.displayName = 'MarkdownLink' ;

export default MarkdownLink ;