import { createContext } from 'react' ;

/**
 * @typedef {Object} NavigationContextValue
 * @property {Object[] | null} navigation - Current navigation items.
 * @property {(value: Object[]) => void} setNavigation - Function to update navigation.
 */

/**
 * React context for navigation management.
 */
const NavigationContext = createContext(
    /** @type {NavigationContextValue | null} */ ( null )
) ;

NavigationContext.displayName = 'NavigationContext' ;

export default NavigationContext ;