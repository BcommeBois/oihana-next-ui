import mapI18n from './mapI18n' ;

/**
 * Generates locale objects for all languages from an i18n source.
 *
 * @param {Object} source - The i18n source object with nested language keys.
 * @param {string[]} languages - Available language codes.
 *
 * @returns {{ languages: string[] } & Record<string, Object>} Locale data per language.
 *
 * @example
 * const source =
 * {
 *     title :
 *     {
 *         fr : 'Bonjour' ,
 *         en : 'Hello'
 *     } ,
 *     description :
 *     {
 *         fr : 'Description en français' ,
 *         en : 'Description in English'
 *     }
 * } ;
 *
 * const i18n = getLocaleFromI18n( source , [ 'fr' , 'en' ] ) ;
 * // →
 * // {
 * //     languages : [ 'fr' , 'en' ] ,
 * //     fr : { title: 'Bonjour' , description: 'Description en français' } ,
 * //     en : { title: 'Hello' , description: 'Description in English' }
 * // }
 */
const getLocaleFromI18n = ( source , languages ) =>
{
    return languages.reduce(
        ( i18n , lang ) =>
        {
            i18n[ lang ] = mapI18n( source , lang , languages ) ;
            return i18n ;
        } ,
        { languages }
    ) ;
} ;

export default getLocaleFromI18n ;