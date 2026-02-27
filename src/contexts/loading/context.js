import { createContext } from 'react' ;

/**
 * @typedef {Object} LoadingContextValue
 * @property {boolean} loading - Whether the app is in a loading state.
 * @property {(loading: boolean) => void} setLoading - Set the loading state.
 */

const LoadingContext = createContext( /** @type {LoadingContextValue | null} */ ( null ) ) ;

LoadingContext.displayName = 'LoadingContext' ;

export default LoadingContext ;