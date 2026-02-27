/**
 * Application context module.
 *
 * @module contexts/application
 *
 * @example
 * ```js
 * import useApplication from '@/contexts/application' ;
 *
 * import useApplication , { ApplicationProvider } from '@/contexts/application' ;
 * ```
 */

export { default as ApplicationContext }  from './context' ;
export { default as ApplicationProvider } from './provider' ;
export { default }                        from './useApplication' ;