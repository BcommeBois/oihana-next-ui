import forEach      from 'vegas-js-core/src/objects/forEach'
import isObjectLike from 'vegas-js-core/src/isObjectLike'

/**
 * Recursively flattens language-specific keys in an object.
 *
 * @param {Object} object - The object to reduce.
 * @param {string} lang - The language key to flatten.
 *
 * @example
 * ```js
 * const obj = { title: { fr: 'Bonjour' , en: 'Hello' } } ;
 * reduceLang( obj , 'fr' ) ;
 * // obj → { title: 'Bonjour' }
 * ```
 */
const reduceLang = ( object , lang ) =>
{
    forEach( object , ( value , key , parent ) =>
    {
        if ( key === lang && isObjectLike( value ) )
        {
            reduceLang( value , lang ) ;
            delete parent[ key ] ;
            Object.assign( parent , value ) ;
        }
        else if ( isObjectLike( value ) )
        {
            reduceLang( parent[ key ] , lang ) ;
        }
    } ) ;
} ;

export default reduceLang ;