/**
 * Markdown link renderer.
 *
 * @module components/typography/markdown/renderers/link
 */

import MarkdownLink from '../MarkdownLink' ;

const link = ( linkClassName , linkColor , linkHover ) => props =>
(
    <MarkdownLink
        href      = { props.href }
        className = { linkClassName }
        color     = { linkColor }
        hover     = { linkHover }
    >
        { props.children }
    </MarkdownLink>
) ;

export default link ;