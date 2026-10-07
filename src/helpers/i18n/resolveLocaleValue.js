/**
 * The text of a value that may or may not be translated.
 *
 * A schema.org payload spells one field two ways, and both are legitimate :
 *
 * ```js
 * 'Oak'                        // one language, or none worth naming
 * { fr : 'Chêne' , en : 'Oak' } // translated
 * ```
 *
 * This is the primitive both shapes go through.
 * {@link module:helpers/i18n/getLocaleProperty} is this, reached through a
 * field name ; reach for THIS one when the translated map is the value you
 * already hold.
 *
 * 🚨 **Handing a React child the raw value is the defect it prevents** : a
 * translated one is an object, and an object is not valid as a child — the
 * screen goes blank rather than showing the wrong language. The quieter half of
 * the same defect is a value that is tested for emptiness, found to be an
 * object, and silently dropped : a row that simply never draws.
 *
 * @module helpers/i18n/resolveLocaleValue
 *
 * @param {*} value - A string, a `{ lang : text }` map, or anything else.
 * @param {?string} [lang] - The reader's language.
 * @param {*} [defaultValue=null] - Returned when nothing readable is there.
 * @param {?string} [defaultLang] - The language to fall back to — « what this record was written in », which no library can know.
 *
 * @returns {string|*}
 *
 * @example
 * ```js
 * resolveLocaleValue( 'Oak' , 'fr' ) ;                         // 'Oak'
 * resolveLocaleValue( { fr : 'Chêne' , en : 'Oak' } , 'fr' ) ; // 'Chêne'
 * resolveLocaleValue( { en : 'Oak' } , 'fr' , '—' , 'en' ) ;   // 'Oak'
 * resolveLocaleValue( undefined , 'fr' , '—' ) ;               // '—'
 * ```
 */

import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

const resolveLocaleValue = (
    value ,
    lang = null ,
    defaultValue = null ,
    defaultLang = null ,
) =>
{
    if ( !value )
    {
        return defaultValue ;
    }

    // Not translated : the value IS the text.
    if ( notEmpty( value ) )
    {
        return value ;
    }

    if ( notEmpty( value[ lang ] ) )
    {
        return value[ lang ] ;
    }

    if ( notEmpty( value[ defaultLang ] ) )
    {
        return value[ defaultLang ] ;
    }

    return defaultValue ;
} ;

export default resolveLocaleValue ;
