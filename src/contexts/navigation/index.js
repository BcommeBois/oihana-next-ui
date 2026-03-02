/**
 * Navigation context module.
 *
 * @module contexts/navigation
 *
 * @example
 * ```js
 * import useNavigation from 'oihana-next-ui/contexts/navigation' ;
 *
 * const { navigation , setNavigation } = useNavigation() ;
 * ```
 *
 * @example
 * ```js
 * import useNavigation , { NavigationProvider } from 'oihana-next-ui/contexts/navigation' ;
 * ```
 */

export { default as NavigationContext }  from './context' ;
export { default as NavigationProvider } from './provider' ;
export { default }                       from './useNavigation' ;