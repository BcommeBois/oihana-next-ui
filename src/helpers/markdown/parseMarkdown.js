import remarkBreaks from 'remark-breaks' ;
import remarkGfm    from 'remark-gfm' ;
import remarkParse  from 'remark-parse' ;
import { unified }  from 'unified' ;

/**
 * Parses Markdown into its syntax tree — mdast —, with the grammar the
 * screen uses : GitHub Flavored Markdown (tables, strikethrough, task lists,
 * bare links), and optionally a line break at every newline, as
 * `remark-breaks` does in `Markdown`.
 *
 * Pure : no DOM, no React — a route handler parses as the page does.
 *
 * @module helpers/markdown/parseMarkdown
 *
 * @param {string} source - The Markdown.
 * @param {Object} [options]
 * @param {boolean} [options.breaks=false] - A newline is a line break, not a space.
 *
 * @returns {Object} The mdast `root`.
 *
 * @example
 * ```js
 * const tree = parseMarkdown( '# Title\n\nSome **bold** text.' ) ;
 * tree.children[ 0 ].type ; // → 'heading'
 * ```
 */
const parseMarkdown = ( source , { breaks = false } = {} ) =>
{
    let processor = unified().use( remarkParse ).use( remarkGfm ) ;

    if ( breaks )
    {
        processor = processor.use( remarkBreaks ) ;
    }

    return processor.runSync( processor.parse( String( source ?? '' ) ) ) ;
} ;

export default parseMarkdown ;
