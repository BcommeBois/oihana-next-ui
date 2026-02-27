import { createContext } from 'react' ;

/**
 * @typedef {Object} LocaleContextValue
 * @property {Object} locale - Current locale data.
 * @property {(path?: string, defaultValue?: any) => any} getLocale - Get locale value by path.
 * @property {(value: Object | string) => void} setLocale - Set locale data.
 */

/**
 * React context for locale/i18n management.
 */
const LocaleContext = createContext (
    /** @type {LocaleContextValue | null} */ ( null )
) ;

LocaleContext.displayName = 'LocaleContext' ;

export default LocaleContext ;