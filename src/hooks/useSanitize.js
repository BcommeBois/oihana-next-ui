import sanitizeHtml from 'sanitize-html'

import useConfig from '../contexts/config'

import notEmpty from 'vegas-js-core/src/strings/notEmpty'
import trim     from 'vegas-js-core/src/strings/trim'

const DEFAULT_SANITIZE_ALL =
{
    allowedTags       : [] ,
    allowedAttributes : {}
} ;

const DEFAULT_SANITIZE_OPTIONS =
{
    allowedTags       : [ 'h1' , 'h2' , 'h3' , 'p' , 'strong' , 'em' , 'a' , 'ul' , 'ol' , 'li' ] ,
    allowedAttributes : { 'a' : [ 'href' , 'target' ] }
} ;

/**
 * React hook that returns a text sanitizer function.
 *
 * @param {Object} params
 * @param {boolean} [params.disabled=false] - Skip sanitization entirely.
 * @param {boolean} [params.html=false] - Use HTML-safe sanitization (keeps some tags).
 * @param {boolean} [params.input=false] - Strip newlines and non-printable characters.
 * @param {Object} [params.options] - Custom sanitize-html options (overrides defaults).
 *
 * @returns {( text: string ) => string} A sanitizer function.
 *
 * @example
 * ```js
 * const sanitize = useSanitize( { html: true } ) ;
 *
 * const clean = sanitize( '<script>alert("xss")</script><p>Hello</p>' ) ;
 * // → '<p>Hello</p>'
 * ```
 *
 * @example
 * ```js
 * const sanitize = useSanitize( { input: true } ) ;
 *
 * const clean = sanitize( 'Hello\nWorld' ) ;
 * // → 'HelloWorld'
 * ```
 */
const useSanitize =
({
     disabled = false ,
     html     = false ,
     input    = false ,
     options   = null
}
= {} ) =>
{
    const config = useConfig() ;

    return ( text ) =>
    {
        if ( disabled || !notEmpty( text ) )
        {
            return text ?? '' ;
        }

        const sanitizeAll     = config?.sanitizeAll     ?? DEFAULT_SANITIZE_ALL ;
        const sanitizeOptions = config?.sanitizeOptions ?? DEFAULT_SANITIZE_OPTIONS ;

        let result = trim( text ) ;

        const sanitizeConfig = options ?? ( html ? sanitizeOptions : sanitizeAll ) ;
        result = sanitizeHtml( result , sanitizeConfig ) ;

        if ( result === '<p></p>' )
        {
            result = '' ;
        }

        if ( input )
        {
            result = result
                   .replace( /[\r\n\t]+/g , '' )
                   .replace( /[^\x20-\x7E]/g , '' )
                   .trim() ;
        }

        return result ;
    } ;
} ;

export default useSanitize ;