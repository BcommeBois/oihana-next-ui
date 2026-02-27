import { createContext } from 'react' ;

/**
 * @typedef {Object} ApplicationContextValue
 * @property {boolean} isLocked - Whether the application is locked.
 * @property {string} rootClassName - Root element className.
 * @property {Object} rootStyle - Root element inline styles.
 * @property {(value: boolean) => void} setIsLocked - Function to set locked state.
 * @property {(value: string) => void} setSidebarHeight - Function to set sidebar height.
 * @property {(value: boolean) => void} setShowNavbar - Function to show/hide navbar.
 * @property {(value: boolean) => void} setShowSidebar - Function to show/hide sidebar.
 * @property {boolean} showNavbar - Whether navbar is visible.
 * @property {boolean} showSidebar - Whether sidebar is visible.
 * @property {string} sidebarHeight - Sidebar height value.
 */

/**
 * React context for application-level state.
 */
const ApplicationContext = createContext(
    /** @type {ApplicationContextValue | null} */ ( null )
) ;

ApplicationContext.displayName = 'ApplicationContext' ;

export default ApplicationContext ;