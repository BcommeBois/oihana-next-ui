/**
 * The name of a thing.
 *
 * Reads `name` through {@link module:helpers/i18n/getLocaleProperty}, so a
 * plain string and a `{ lang : text }` map both answer.
 *
 * @module helpers/i18n/getLocaleName
 *
 * @param {Object} thing - The thing.
 * @param {?string} [lang] - The reader's language.
 * @param {*} [defaultValue=null] - Returned when nothing readable is there.
 * @param {?string} [defaultLang] - The language to fall back to.
 * @returns {string|*}
 */

import getLocaleProperty from './getLocaleProperty' ;

const getLocaleName = getLocaleProperty( 'name' ) ;

export default getLocaleName ;
