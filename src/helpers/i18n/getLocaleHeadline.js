/**
 * The headline of an article or a creative work.
 *
 * Reads `headline` through {@link module:helpers/i18n/getLocaleProperty}, so a
 * plain string and a `{ lang : text }` map both answer.
 *
 * @module helpers/i18n/getLocaleHeadline
 *
 * @param {Object} thing - The thing.
 * @param {?string} [lang] - The reader's language.
 * @param {*} [defaultValue=null] - Returned when nothing readable is there.
 * @param {?string} [defaultLang] - The language to fall back to.
 * @returns {string|*}
 */

import getLocaleProperty from './getLocaleProperty' ;

const getLocaleHeadline = getLocaleProperty( 'headline' ) ;

export default getLocaleHeadline ;
