/**
 * The other name a thing goes by — a short label, a code, a display name beside a technical one.
 *
 * Reads `alternateName` through {@link module:helpers/i18n/getLocaleProperty}, so a
 * plain string and a `{ lang : text }` map both answer.
 *
 * @module helpers/i18n/getLocaleAlternateName
 *
 * @param {Object} thing - The thing.
 * @param {?string} [lang] - The reader's language.
 * @param {*} [defaultValue=null] - Returned when nothing readable is there.
 * @param {?string} [defaultLang] - The language to fall back to.
 * @returns {string|*}
 */

import getLocaleProperty from './getLocaleProperty' ;

const getLocaleAlternateName = getLocaleProperty( 'alternateName' ) ;

export default getLocaleAlternateName ;
