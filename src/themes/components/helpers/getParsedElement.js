'use client' ;

import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

import parseHtml from '../../helpers/parseHtml' ;

/**
 * Returns an element, optionally parsing it as HTML.
 *
 * @param {React.ReactNode | string} node - The content to render.
 * @param {boolean} [html=false] - Whether to parse the node as HTML.
 *
 * @returns {React.ReactNode} The original or parsed node.
 *
 * @example
 * ```js
 * // Plain text (no parsing)
 * getParsedElement( 'Hello world' ) ;
 * // → 'Hello world'
 *
 * // HTML parsing
 * getParsedElement( '<b>Hello</b> world' , true ) ;
 * // → React elements
 *
 * // Non-string nodes pass through
 * getParsedElement( <span>Hello</span> , true ) ;
 * // → <span>Hello</span>
 * ```
 */
const getParsedElement = ( node , html = false ) =>
{
    if ( html && notEmpty( node ) )
    {
        return parseHtml( node ) ;
    }

    return node ;
} ;

export default getParsedElement ;