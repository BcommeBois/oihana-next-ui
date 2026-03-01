import clean from 'vegas-js-core/src/objects/clean'

import reduceLang from './reduceLang'

/**
 * Maps an i18n object to a single language.
 *
 * Removes all language keys except the target language,
 * then flattens the remaining language structure.
 *
 * @param {Object} source - The i18n source object.
 * @param {string} lang - The target language code.
 * @param {string[]} languages - All available language codes.
 *
 * @returns {Object} The mapped object for the target language.
 *
 * @example
 * ```js
 * const source =
 * {
 *     title :
 *     {
 *         fr : 'Bonjour' ,
 *         en : 'Hello'
 *     } ,
 *     nested :
 *     {
 *         description :
 *         {
 *             fr : 'Description en français' ,
 *             en : 'Description in English'
 *         }
 *     }
 * } ;
 *
 * const result = mapI18n( source , 'fr' , [ 'fr' , 'en' ] ) ;
 * // → { title: 'Bonjour' , nested: { description: 'Description en français' } }
 * ```
 */
const mapI18n = ( source , lang , languages ) =>
{
    const clone = clean( source , ( key , value ) =>
    {
        if ( languages.includes( key ) && key !== lang )
        {
            return undefined ;
        }
        return value ;
    } ) ;

    reduceLang( clone , lang ) ;

    return clone ;
} ;

export default mapI18n ;