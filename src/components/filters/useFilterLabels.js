'use client' ;

/**
 * The labels of a filter criterion : its own bundle at `path`, read OVER the
 * family's defaults at `components.filter`, over the English last resort.
 *
 * A criterion names itself (« Colour », « All colours ») and leaves the rest —
 * « Apply », « Retry » — to the family. Both bundles are read without throwing :
 * outside a `LocaleProvider`, the English defaults answer.
 *
 * @module components/filters/useFilterLabels
 */

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

/**
 * The i18n path of the family's defaults.
 * @type {string}
 */
export const FILTER_LABELS_PATH = 'components.filter' ;

/**
 * The English last resort.
 * @type {Object<string, string>}
 */
export const FILTER_LABELS =
{
    all          : 'All' ,
    apply        : 'Apply' ,
    clearAll     : 'Clear' ,
    clearFilters : 'Clear all' ,
    close     : 'Close' ,
    empty     : 'No option.' ,
    loadError : 'Failed to load.' ,
    max       : 'Max' ,
    min       : 'Min' ,
    remove    : 'Remove filter' ,
    retry     : 'Retry' ,
    search    : 'Search…' ,
    title     : 'Filter' ,
    unknown   : '{0}' ,
} ;

/**
 * @param {string} [path] - The criterion's own bundle.
 * @returns {Object<string, string>}
 */
const useFilterLabels = ( path ) =>
{
    const family = useI18n( FILTER_LABELS_PATH , NO_LOCALE , false ) ;
    const own    = useI18n( path ?? FILTER_LABELS_PATH , NO_LOCALE , false ) ;

    return { ...FILTER_LABELS , ...( family ?? {} ) , ...( own ?? {} ) } ;
} ;

export default useFilterLabels ;
