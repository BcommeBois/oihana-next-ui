/**
 * Reads a property of a thing that may or may not be translated.
 *
 * A schema.org payload spells one field two ways, and both are legitimate :
 *
 * ```js
 * { name : 'Oak' }                        // one language, or none worth naming
 * { name : { fr : 'Chêne' , en : 'Oak' } } // translated
 * ```
 *
 * This answers « the text, in the reader's language » for either shape, so a
 * caller never switches on which one it was handed. 🚨 **Handing a React child
 * the raw field is the defect this prevents** : a translated one is an object,
 * and an object is not valid as a child — the screen goes blank rather than
 * showing the wrong language.
 *
 * It is a FACTORY : it takes the field's name and returns the reader for it, so
 * the family below is one line each.
 *
 * ⚠️ **It reads a thing, not a bundle.** The copy of an interface — buttons, labels, sentences — comes from {@link useI18n} ;
 * this is for the DATA, whose languages are whatever was stored.
 *
 * @module helpers/i18n/getLocaleProperty
 *
 * @param {string} key - The field to read.
 * @returns {Function} `( thing , lang , defaultValue , defaultLang ) => string|*`
 *
 * @example
 * ```js
 * const getLocaleName = getLocaleProperty( 'name' ) ;
 *
 * getLocaleName( { name : 'Oak' } , 'fr' ) ;                         // 'Oak'
 * getLocaleName( { name : { fr : 'Chêne' , en : 'Oak' } } , 'fr' ) ; // 'Chêne'
 * getLocaleName( { name : { en : 'Oak' } } , 'fr' , '—' , 'en' ) ;   // 'Oak'
 * getLocaleName( {} , 'fr' , '—' ) ;                                 // '—'
 * ```
 */

import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

const getLocaleProperty = ( key ) => (
    thing ,
    lang = null ,
    defaultValue = null ,
    defaultLang = null ,
) =>
{
    const value = thing?.[ key ] ;

    if ( !value ) { return defaultValue ; }

    // Not translated : the field IS the text.
    if ( notEmpty( value ) )
    {
        return value ;
    }

    if ( notEmpty( value[ lang ] ) )
    {
        return value[ lang ] ;
    }

    // The fallback language is the caller's to name : « what this record was written in », which no library can know.
    if ( notEmpty( value[ defaultLang ] ) )
    {
        return value[ defaultLang ] ;
    }

    return defaultValue ;
} ;

export default getLocaleProperty ;
