/**
 * Config context module.
 *
 * @module contexts/config
 *
 * @example
 * ```js
 * import useConfig from 'oihana-next-ui/contexts/config' ;
 *
 * // With provider
 * import useConfig , { ConfigProvider } from 'oihana-next-ui/contexts/config' ;
 *
 * // Named imports
 * import { ConfigProvider , useSetConfig } from 'oihana-next-ui/contexts/config' ;
 * ```
 */

/**
 * React context for configuration.
 */
export { default as ConfigContext } from './context' ;

/**
 * Provider component to wrap the app.
 */
export { default as ConfigProvider } from './provider' ;

/**
 *  Hook to update configuration.
 */
export { default as useSetConfig } from './useSetConfig' ;

/**
 *  Hook to access configuration values.
 */
export { default } from './useConfig' ;