import { getServerI18nConfig } from './serverI18nConfig'

/**
 * Returns the static metadata shared across all pages.
 * Spread into generateMetadata to avoid repeating icons, appleWebApp, etc.
 *
 * @returns {Object} The metadatas object from config.
 *
 * @example
 * ```js
 * // app/products/page.js
 * import getServerMetadatas from '@/helpers/i18n/getServerMetadatas' ;
 * import getServerI18n      from '@/helpers/i18n/getServerI18n' ;
 *
 * export async function generateMetadata()
 * {
 *     const i18n      = await getServerI18n() ;
 *     const metadatas = getServerMetadatas() ;
 *
 *     return {
 *         ...metadatas ,
 *         title       : t( 'app.products.seo.title' ) ,
 *         description : t( 'app.products.seo.description' ) ,
 *     } ;
 * }
 * ```
 */
const getServerMetadatas = () => getServerI18nConfig().metadatas ?? {} ;

export default getServerMetadatas ;