/**
 * Maps an i18n badge with locale labels.
 *
 * @param {Object} badge - The badge object.
 * @param {string} badge.id - Badge identifier for locale lookup.
 * @param {Object} locale - Locale data.
 * @param {string} [path='badges'] - Path to badges in locale.
 *
 * @returns {Object | null} Mapped badge with label or null.
 */
const mapI18nBadge = ( badge , locale , path = 'badges' ) =>
{
    if ( !badge )
    {
        return null ;
    }

    const { id , ...props } = badge ;
    const i18n = locale?.[ path ] ?? locale ?? {} ;
    const label = i18n?.[ id ] ?? null ;

    return { label , ...props } ;
} ;

export default mapI18nBadge ;