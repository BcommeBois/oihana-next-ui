/**
 * Application context module.
 *
 * @module contexts/application
 *
 * @example
 * ```js
 * import useApplication from 'oihana-next-ui/contexts/application' ;
 *
 * import useApplication , { ApplicationProvider } from 'oihana-next-ui/contexts/application' ;
 * ```
 */

export { default as ApplicationContext }  from './context' ;
export { default as ApplicationProvider } from './provider' ;
export { default }                        from './useApplication' ;