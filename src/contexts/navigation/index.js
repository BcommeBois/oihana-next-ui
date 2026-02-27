/**
 * Navigation context module.
 *
 * @module contexts/navigation
 *
 * @example
 * ```js
 * import useNavigation from '@/contexts/navigation' ;
 *
 * const { navigation , setNavigation } = useNavigation() ;
 * ```
 *
 * @example
 * ```js
 * import useNavigation , { NavigationProvider } from '@/contexts/navigation' ;
 * ```
 */

export { default as NavigationContext }  from './context' ;
export { default as NavigationProvider } from './provider' ;
export { default }                       from './useNavigation' ;