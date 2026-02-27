import { createContext } from 'react' ;

/**
 * @typedef {Object} LangContextValue
 * @property {string} lang - Current language code.
 * @property {string[]} languages - Available language codes.
 * @property {(lang: string) => void} setLang - Function to change language.
 */

/**
 * React context for language/locale management.
 */
const LangContext = createContext(
    /** @type {LangContextValue | null} */ ( null )
) ;

LangContext.displayName = 'LangContext' ;

export default LangContext ;