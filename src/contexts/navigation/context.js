import { createContext } from 'react' ;

/**
 * @typedef {Object} NavigationContextValue
 * @property {Object[] | null} navigation - Current navigation items.
 * @property {(value: Object[]) => void} setNavigation - Function to update navigation.
 * @property {'open' | 'closed' | 'auto'} defaultMode - Default open/closed
 *   mode applied to collapse items that have no persisted state and no
 *   per-item `defaultOpen` override.
 * @property {Record<string, boolean>} collapses - Per-id open/closed map
 *   reflecting explicit user choices (post-hydration).
 * @property {(id: string, open: boolean) => void} setCollapse - Records an
 *   explicit user choice for a single collapse and persists it when a
 *   `storageKey` was supplied to the provider.
 * @property {(id: string, item?: Object) => boolean} getCollapseOpen -
 *   Returns the effective open state for a collapse, applying the
 *   priority chain: persisted → auto(pathname) → item.defaultOpen → defaultMode.
 * @property {string | null} pathname - Current pathname, captured by the
 *   provider so consumers (e.g. `Collapse`) don't have to read it again.
 */

/**
 * React context for navigation management.
 */
const NavigationContext = createContext(
    /** @type {NavigationContextValue | null} */ ( null )
) ;

NavigationContext.displayName = 'NavigationContext' ;

export default NavigationContext ;
