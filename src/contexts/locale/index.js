/**
 * Locale context module for i18n data access.
 *
 * @module contexts/locale
 *
 * @example
 * ```js
 * // Get locale value by path
 * import useI18n from '@/contexts/locale' ;
 *
 * const title = useI18n( 'page.title' ) ;
 * ```
 *
 * @example
 * ```js
 * // Full locale access
 * import { useLocale } from '@/contexts/locale' ;
 *
 * const { locale , getLocale , setLocale } = useLocale() ;
 * ```
 *
 * @example
 * ```js
 * // Provider setup
 * import { LocaleProvider , SPLIT , MERGE } from '@/contexts/locale' ;
 * ```
 */

export { default as LocaleContext }  from './context' ;
export { default as LocaleProvider } from './provider' ;
export { default as useLocale }      from './useLocale' ;
export { default }                   from './useI18n' ;

export { SPLIT , MERGE } from './provider' ;