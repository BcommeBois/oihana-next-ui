'use client' ;

import parse from 'html-react-parser' ;

import sanitizeHtml from 'sanitize-html' ;

/**
 * Parse and sanitize HTML string into React elements.
 * Works on both server and client side.
 *
 * @param {string} html - HTML string to parse.
 * @param {Object} [options]
 * @param {boolean} [options.sanitize=true] - Whether to sanitize HTML.
 * @param {Object} [options.config] - sanitize-html configuration.
 *
 * @returns {React.ReactElement | null} Parsed React elements.
 *
 * @example
 * ```jsx
 * <div>{ parseHtml( '<b>Hello</b> world' ) }</div>
 * ```
 */
const parseHtml = ( html ,
{
    sanitize = true ,
    config ,
    ...parseOptions
} = {} ) =>
{
    if ( !html )
    {
        return null ;
    }

    if ( sanitize )
    {
        const defaultConfig =
        {
            allowedTags : [
                'p' , 'br' , 'strong' , 'em' , 'u' , 'a' , 'span' , 'div' ,
                'h1' , 'h2' , 'h3' , 'h4' , 'h5' , 'h6' ,
                'ul' , 'ol' , 'li' ,
                'blockquote' , 'code' , 'pre' ,
            ] ,
            allowedAttributes : {
                'a'    : [ 'href' , 'target' , 'rel' ] ,
                '*'    : [ 'class' , 'id' ] ,
            } ,
            allowedSchemes : [ 'http' , 'https' , 'mailto' ] ,
            ...config ,
        } ;

        html = sanitizeHtml( html , defaultConfig ) ;
    }

    return parse( html , parseOptions ) ;
} ;

export default parseHtml ;