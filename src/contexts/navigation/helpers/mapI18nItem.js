
import { COLLAPSE } from '@/contexts/navigation/types'

import mapI18nBadge from '@/contexts/navigation/helpers/mapI18nBadge'

/**
 * Maps a navigation item with i18n locale data.
 *
 * @param {Object} item - The navigation item.
 * @param {string} [item.id] - Item identifier for locale lookup.
 * @param {string} [item.label] - Default label.
 * @param {string} [item.path] - Navigation path.
 * @param {string} [item.type] - Item type (e.g., 'collapse').
 * @param {string} [item.className] - CSS class name.
 * @param {React.ComponentType} [item.Icon] - Icon component.
 * @param {Object} [item.badge] - Badge configuration.
 * @param {Object[]} [item.items] - Child items (for collapse type).
 * @param {Object} locale - Locale data.
 *
 * @returns {Object} Mapped navigation item with localized label.
 *
 * @example
 * ```js
 * const item =
 * {
 *     id    : 'home' ,
 *     path  : '/' ,
 *     Icon  : HomeIcon ,
 *     badge : { id: 'new' , color: 'primary' }
 * } ;
 *
 * const locale =
 * {
 *     home   : 'Accueil' ,
 *     badges : { new: 'Nouveau' }
 * } ;
 *
 * const result = mapI18nItem( item , locale ) ;
 * // →
 * // {
 * //     id        : 'home' ,
 * //     label     : 'Accueil' ,
 * //     path      : '/' ,
 * //     Icon      : HomeIcon ,
 * //     badge     : { label: 'Nouveau' , color: 'primary' } ,
 * //     className : undefined ,
 * //     items     : undefined ,
 * //     type      : undefined
 * // }
 * ```
 */
const mapI18nItem = ( item , locale ) =>
{
    const { badge , className , Icon , id , items , label , path , type } = item ;

    const mappedItems = type === COLLAPSE && items?.length > 0
        ? items.map( ( child ) => mapI18nItem( child , locale ) )
        : items ;

    const mappedBadge = badge
        ? mapI18nBadge( badge , locale )
        : undefined ;

    const mappedLabel = locale?.[ id ] ?? label ?? '' ;

    return {
        badge     : mappedBadge ,
        className ,
        Icon      ,
        id        ,
        items     : mappedItems ,
        label     : mappedLabel ,
        path      ,
        type      ,
    } ;
} ;

export default mapI18nItem ;